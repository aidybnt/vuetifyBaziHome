<template>
  <v-dialog v-model="this.$store.state.loginDialog.dialog" persistent max-width="600px">
    <v-card :disabled="processing" :loading="processing">
      <!--进度条loading-->
      <template slot="progress">
        <v-progress-linear
            color="#FF5722"
            height="10"
            indeterminate
        ></v-progress-linear>
      </template>
      <!--对话框标题-->
      <v-card-title>
        <span class="headline" v-text="this.$store.state.loginDialog.title"></span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <!--表单-->
            <v-form ref="form" lazy-validation style="width: 100%">
              <v-col cols="12">
                <v-text-field
                    label="用户名"
                    v-model="formData.username"
                    :rules="nameRules"
                    :counter="24"
                    maxlength="24"
                    required
                    prepend-icon="mdi-account-arrow-right-outline"
                ></v-text-field>
              </v-col>
              <v-col v-if="this.$store.state.loginDialog.title === '注册'" cols="12">
                <v-text-field
                    label="邮箱"
                    v-model="formData.email"
                    :rules="emailRules"
                    required
                    prepend-icon="mdi-email-edit-outline"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="密码"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    v-model="formData.password"
                    :rules="passwordRules"
                    :counter="30"
                    maxlength="30"
                    required
                    prepend-icon="mdi-form-textbox-password"
                    @keyup.enter.native="save"
                ></v-text-field>
              </v-col>
              <v-col v-if="this.$store.state.loginDialog.title === '注册'" cols="12">
                <v-text-field
                    label="再次输入密码"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    v-model="formData.passwordConfirm"
                    :counter="30"
                    maxlength="30"
                    :rules="passwordCheck"
                    required
                    prepend-icon="mdi-key-plus"
                ></v-text-field>
              </v-col>
            </v-form>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="#607D8B" text @click="findPassword">
          忘记密码
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">
          取消
        </v-btn>
        <v-btn color="blue darken-1" text @click="save">
          确定
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {post} from "@/utilis/request";
import {base64encode} from 'crypto.js'

export default {
  name: "Login",
  data: () => {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      show1: false,
      show2: false,
      processing: false,
      nameRules: [
        v => !!v || '请输入用户名',
        v => v.length >= 2 || '用户名不能少于2位',
        v => v.length <= 24 || '用户名最多24位',
      ],
      emailRules: [
        v => !!v || '请输入Email',
        v => /.+@.+/.test(v) || 'Email格式错误',
      ],
      passwordRules: [
        v => !!v || '请输入密码',
        v => v.length >= 6 || '密码不能少于6位',
        v => v.length <= 30 || '密码最多30位',
      ],
    }
  },
  computed: {
    passwordCheck() {
      return [
        v => !!v || '请再次输入密码',
        v => v.length >= 6 || '密码不能少于6位',
        v => v.length <= 30 || '密码最多30位',
        v => (!!v && v) === this.formData.password || '密码不匹配'
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
      this.$refs.form.validate()
    },
    //取消按钮
    closeDialog() {
      this.$store.commit('loginDialogMuta', {dialog: false})
    },
    //请求
    save() {
      //提交前调用表单验证
      if (!this.$refs.form.validate()) {
        return false
      }
      this.processing = true
      //登陆请求
      if (this.$store.state.loginDialog.title === '登陆') {
        post('login',
            {
              'username': this.formData.username,
              'password': this.formData.password,
              'user_ip': localStorage.ip
            },
            {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
            .then(response => {
              this.processing = false
              if (response.status === 200) {
                //首次登陆
                setTimeout(() => {
                  if (response.data.firstLogin !== 0) {
                    this.$store.commit('firstLoginMutations', {
                      snackbar: true,
                      firstLogin: response.data.firstLogin
                    })
                  }
                }, 3000)

                this.Message('success', response.data.message)
                //本地存储
                localStorage.setItem('access_token', base64encode(response.data.data.access_token))
                localStorage.setItem('id', base64encode((response.data.user.id + '')))
                localStorage.setItem('username', response.data.user.username)
                localStorage.setItem('title', response.data.user.title)
                localStorage.setItem('avatar', response.data.user.avatar)
                localStorage.setItem('avatarPath', response.data.user.avatarPath)
                localStorage.setItem('user_type', response.data.user.user_type)
                localStorage.setItem('APP_URL', response.data.user.APP_URL)

                this.$store.commit('userInfoMuta', {
                  username: response.data.user.username,
                  avatar: (response.data.user.APP_URL + response.data.user.avatar),
                  title: response.data.user.title,
                })

                this.$store.commit('paginationMuta', {total: localStorage.getItem('total')})

                this.$store.commit('userTypeMutations', response.data.user.user_type)
                this.$store.commit('userType2Mutations', response.data.user.user_type2)

                if (response.data.user.user_type === 9) {
                  this.$router.push('/')
                  this.Message('error', '用户受限，请联系管理员。')
                  this.closeDialog()
                  localStorage.clear()
                }

                if (response.data.user.membertime) {
                  this.$store.commit('membertimeMutations', response.data.user.membertime)
                }

                setTimeout(() => {
                  this.$router.push('/add')
                  this.closeDialog()
                }, 500)
              }
            })
            .catch(error => {
              this.Message('error', error)
              this.processing = false
            })
      }
      //注册请求
      if (this.$store.state.loginDialog.title === '注册') {
        post('register',
            {
              'username': this.formData.username,
              'password': this.formData.password,
              'email': this.formData.email,
              'user_ip': localStorage.ip
            },
            {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
            .then(response => {
              this.processing = false
              if (response.status === 200) {
                this.closeDialog()
                this.Message('success', response.data.message)
              } else {
                this.Message('error', '数据传输异常，请重试。')
              }
            })
            .catch(error => {
              this.Message('error', error)
              this.processing = false
            })
      }
    },
    //找回密码
    findPassword() {
      this.closeDialog()
      this.$store.commit('findPasswordInputEmailMuta', {email: true})
    },
  },
}
</script>