<template>
  <v-dialog v-model="this.$store.state.findPasswordReset.reset" max-width="600" @click:outside="resetClickOutside">
    <v-card class="mx-auto" elevation="6" :disabled="processing" :loading="processing">
      <!--        进度条loading-->
      <template slot="progress">
        <v-progress-linear color="#FF5722" height="10" indeterminate></v-progress-linear>
      </template>
      <v-card-title class="title font-weight-regular justify-space-between text-body-1">
        <span>{{ currentTitle }}</span>
        <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
      </v-card-title>
      <!--重置密码-->
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-form ref="formPassword">
            <v-card-text class="px-12">
              <v-text-field
                  v-model="password"
                  label="输入新密码"
                  :rules="passwordRules"
                  :counter="30"
                  maxlength="30"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  prepend-icon="mdi-form-textbox-password"
              ></v-text-field>
              <v-text-field
                  v-model="passwordConfirm"
                  label="再次输入密码"
                  :counter="30"
                  maxlength="30"
                  :rules="passwordCheck"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  prepend-icon="mdi-key-plus"
              ></v-text-field>
              <span class="d-inline-block mt-6 caption grey--text text--darken-1">请重置您的密码，并牢记。</span>
            </v-card-text>
          </v-form>
        </v-window-item>

        <v-window-item :value="2">
          <div class="py-12 text-center">
            <v-btn color="blue" class="white--text" @click="backLogin">返回登陆</v-btn>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="step === 1" text @click="step--"> Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="step === 2" color="primary" depressed @click="reset"> Next</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {post} from "@/utilis/request";

export default {
  name: "ResetPassword",
  data: () => ({
        step: 2,
        processing: false,
        show1: false,
        show2: false,
        password: '',
        passwordConfirm: '',
        passwordRules: [
          v => !!v || '请输入密码',
          v => v.length >= 6 || '密码不能少于6位',
          v => v.length <= 30 || '密码最多30位',
        ],
      }
  ),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return '开始重置密码'
        default:
          return '密码重置成功，请重新登陆。'
      }
    },
    passwordCheck() {
      return [
        v => !!v || '请再次输入密码',
        v => v.length >= 6 || '密码不能少于6位',
        v => v.length <= 30 || '密码最多30位',
        v => (!!v && v) === this.password || '密码不匹配'
      ]
    },
  },

  watch: {
    //监听确认密码验证
    passwordConfirm: 'validateField',
  },

  methods: {
    //验证确认密码
    validateField() {
      this.$refs.formPassword.validate()
    },
    reset() {
      if (!this.$refs.formPassword.validate()) {
        return false
      }
      this.processing = true
      post('doChangePassword',
          {
            'password': this.password,
            'token': this.$route.query.token,
            'created_at': this.$route.query.created_at,
            'email': this.$route.query.email,
          },
          {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
          .then(response => {
            this.processing = false
            if (response.status === 200) {
              this.Message('success', response.data.message)
              setTimeout(() => {
                this.step++
              }, 900)
            }
          })
          .catch(error => {
            this.Message('error', error)
            this.processing = false
          })
    },
    backLogin() {
      this.$store.commit('findPasswordResetMuta', {reset: false})
      setTimeout(() => {
        this.$store.commit('loginDialogMuta', {dialog: true, title: '登陆'})
      }, 600)
    },
    resetClickOutside() {
      this.$store.commit('findPasswordResetMuta', {reset: false})
    },
  },
}
</script>