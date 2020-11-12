<template>
  <div>
    <Message/>
    <Header></Header>
    <Side></Side>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Foot></Foot>
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
      // port: ':2053',
      port: ':6001',
      id: '',
      token: '',
    }
  },
  created() {
    this.token = base64decode(localStorage.getItem('access_token')).toString()
    this.id = base64decode(localStorage.getItem('id')).toString()

    this.$store.dispatch('getMessage')
  },
  methods: {},
  mounted() {
    window.io = require('socket.io-client');
    window.Echo = new Echo({
      broadcaster: 'socket.io',
      // host: 'https://data.water555.xyz' + this.port
      host: 'http://192.168.1.163' + this.port,
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
</script>