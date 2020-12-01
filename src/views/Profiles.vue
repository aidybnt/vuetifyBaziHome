<template>
  <div>
    <Message/>
    <Header></Header>
    <Side></Side>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Foot></Foot>
    <v-snackbar v-model="snackbar" timeout="-1" vertical="vertical">
      <div v-html="$store.state.firstLogin.firstLogin"></div>
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="$store.commit('firstLoginMutations',{snackbar:false})">确 认</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
const Foot = () => import("@/common/Foot")
const Header = () => import("@/components/profiles/Header")
const Message = () => import("@/common/Message")
const Side = () => import("@/components/profiles/Side")
import {base64decode} from "crypto.js"
import Echo from 'laravel-echo'

export default {
  name: "Profiles",
  components: {Message, Side, Foot, Header},
  data() {
    return {
      model: 0,
      port: ':2053',
      localport: ':6001',
      id: '',
      token: '',
    }
  },
  created() {
    this.token = base64decode(localStorage.getItem('access_token')).toString()
    this.id = base64decode(localStorage.getItem('id')).toString()

    this.$store.dispatch('getMessage')
    this.$store.dispatch('userMessageGetActions')
    this.$store.dispatch('userNoReadReplyCountActions')
    this.$store.dispatch('payDescActions')
  },
  computed: {
    snackbar() {
      return this.$store.state.firstLogin.snackbar
    }
  },
  methods: {},
  mounted() {
    window.io = require('socket.io-client');
    window.Echo = new Echo({
      broadcaster: 'socket.io',
      host: 'https://data.water555.xyz' + this.port,
      // host: 'http://192.168.1.163' + this.localport,
      auth: {
        headers: {
          'Authorization': 'Bearer ' + this.token
        },
      },
    });
    //私有
    window.Echo.private(`user.${this.id}`)
        .listen('RegisterUserEvent', (e) => {
          if (e.msg === 'privateMessage') {
            this.$store.dispatch('getMessage')
          }
          if (e.msg.type === 'reply') {
            this.$store.dispatch('userMessageGetActions')
            this.$store.commit('userNoReadReplyCountMutations', 1)
            setTimeout(() => {
              this.$store.commit('firstLoginMutations', {
                snackbar: true,
                firstLogin: '您的留言，有新的回复等待查看。'
              })
            }, 3000)
          }
          if (e.msg.type === 'member') {
            this.$store.commit('firstLoginMutations', {
              snackbar: true,
              firstLogin: e.msg.msg
            })
            this.$store.commit('membertimeMutations', e.msg.time)
            this.$store.commit('userTypeMutations', e.msg.ini)
          }

          if (e.msg.type === 'membertime') {
            setTimeout(() => {
              this.$store.commit('firstLoginMutations', {
                snackbar: true,
                firstLogin: e.msg.msg
              })
              this.$store.commit('userTypeMutations', e.msg.ini)
            }, 3000)
          }
        })
    //公共
    window.Echo.channel('sysMsg')
        .listen('SystemMessage', (e) => {
          if (e.msg === 'publicMessage') {
            this.$store.dispatch('getMessage')
          }
        })
  },
}
//https://paypal.me/aidybnt?locale.x=zh_XC
//paypal.me/aidybnt
</script>