<template>
  <v-row class="blue-grey">
    <Message/>
    <!--topHead-->
    <v-app-bar
        app
        color="blue-grey darken-2"
        elevation="9"
    >
      <v-spacer class="text-center">
        <span class="text-h5 white--text"
              @click="backHome"
              style="letter-spacing: 5px !important;font-weight: lighter;cursor: pointer">
          科学五行八字
        </span>
      </v-spacer>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row class="text-center justify-center">
          <!--太级-->
          <v-col cols="12">
            <TaiJi class="mt-9 mb-6" :widthAndHeight="widthAndHeight"></TaiJi>
          </v-col>
          <!--大标题-->
          <v-col cols="12" class="mb-0 mb-sm-4">
            <div
                class="text-h3
                font-weight-bold
                 mb-2
                white--text"
                v-text="textSta"
            ></div>
          </v-col>
          <!--按钮-->
          <v-col
              cols="12" class="mb-2"
          >
            <v-btn class="ma-3 white--text"
                   elevation="3"
                   large
                   color="deep-orange darken-1"
                   style="min-width:228px"
                   @click="login"
            >
              <v-icon class="mr-2">mdi-launch</v-icon>
              立即使用
            </v-btn>
            <v-btn class="white--text ma-3"
                   elevation="3"
                   large
                   color="blue"
                   style="min-width:228px"
                   @click="register"
            >
              <v-icon class="mr-2">mdi-account-arrow-right</v-icon>
              注册账号
            </v-btn>
            <!--文字说明-->
            <p
                style="min-width: 300px"
                class="white--text mt-12 font-weight-light text-subtitle-1">
              沉浸式命盘展示 <br>
              实时排盘，实时显示确认 <br>
              精确到时，考试、婚嫁、择日等体验完美 <br>
              数据存储，查询修改随心所欲<br>
              邮箱注册，不用手机号<br>
              互联网服务器，确保隐私和数据安全<br>
            </p>
          </v-col>
        </v-row>
        <Login/>
        <FindPassword/>
        <ResetPassword/>
      </v-container>
    </v-main>
    <Foot></Foot>
  </v-row>
</template>

<script>
const Message = () => import("@/common/Message")
const TaiJi = () => import("@/common/TaiJi")
const Login = () => import("@/views/Login")
const FindPassword = () => import("@/components/home/FindPassword")
const ResetPassword = () => import("@/components/home/ResetPassword")
const Foot = () => import("@/common/Foot")

export default {
  name: 'Home',

  components: {Message, TaiJi, Login, FindPassword, ResetPassword, Foot,},

  data: () => ({
    textSta: 'Welcome',
    loginDialog: false,
    widthAndHeight: {
      width: '90px',
      height: '90px',
      boxShadow: '0 0 30px 9px rgba(255, 255, 255, 0.6)',
    },
  }),

  methods: {
    login() {
      this.$store.commit('loginDialogMuta', {dialog: true, title: '登陆'})
    },
    register() {
      this.$store.commit('loginDialogMuta', {dialog: true, title: '注册'})
    },
    backHome() {
      this.$router.push('/')
    },
  },

  mounted() {
    this.$nextTick(function () {
      if (this.$route.query.active) {
        if (this.$route.query.active === '1') {
          this.Message('success', '账号已成功激活，请登陆。');
          this.login()
        } else {
          this.Message('error', this.$route.query.active);
        }
      }
      if (this.$route.query.token) {
        setTimeout(() => {
          this.$store.commit('findPasswordResetMuta', {reset: true})
        }, 600)
      }
    })
  }
};
</script>