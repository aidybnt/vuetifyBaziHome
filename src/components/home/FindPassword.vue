<template>
  <v-dialog
      v-model="this.$store.state.findPasswordInputEmail.email"
      max-width="600"
      @click:outside="findPasswordClickOutside"
  >
    <v-card
        class="mx-auto"
        elevation="6"
        :disabled="processing"
        :loading="processing"
    >
      <!--        进度条loading-->
      <template slot="progress">
        <v-progress-linear
            color="#FF5722"
            height="10"
            indeterminate
        ></v-progress-linear>
      </template>
      <v-card-title class="title font-weight-regular justify-space-between text-body-1">
        <span>{{ currentTitle }}</span>
        <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
        ></v-avatar>
      </v-card-title>
      <!--发送Email-->
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text class="px-12">
            <v-form
                ref="formEmail"
                lazy-validation>
              <v-text-field
                  label="Email"
                  v-model="email"
                  :rules="emailRules"
                  required
                  prepend-icon="mdi-email-edit-outline"
              ></v-text-field>
            </v-form>
            <span class="d-inline-block mt-3 caption grey--text text--darken-1">
            输入您的注册Email
          </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <div class="py-12 text-center">
            <v-btn color="blue" class="white--text">请到注册邮箱查看密码重置链接</v-btn>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
            :disabled="step === 1"
            text
            @click="step--"
        >
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            :disabled="step === 2"
            color="primary"
            depressed
            @click="sendEmail"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {post} from "@/utilis/request";

export default {
  name: "FindPassword",
  data: () => ({
        step: 1,
        email: '',
        processing: false,
        emailRules: [
          v => !!v || '请输入Email',
          v => /.+@.+/.test(v) || 'Email格式错误',
        ],
      }
  ),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return '输入Email'
        default:
          return '查看重置密码链接'
      }
    },
  },

  methods: {
    //发送Email
    sendEmail() {
      if (!this.$refs.formEmail.validate()) {
        return false
      }
      this.processing = true
      post('changePassword',
          {'email': this.email},
          {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
          .then(response => {
            if (response.status === 200) {
              this.Message('success', response.data.message)
              setTimeout(() => {
                this.step++
              }, 900)
            }
            this.processing = false
          })
          .catch(error => {
            this.Message('error', error)
            this.processing = false
          })
    },
    findPasswordClickOutside() {
      this.$store.commit('findPasswordInputEmailMuta', {email: false})
    },
  },
}
</script>