<template>
  <div>
    <v-overlay :value="overflow">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-app-bar app color="#595757" elevation="9" style="left: 0;">
      <v-icon @click="exit" color="white">mdi-power-standby</v-icon>
      <v-spacer class="text-center">
        <span v-if="$store.state.userInfo.title === 'null'" class="white--text text-xs-body-1 text-sm-h5"
              style="letter-spacing: 3px !important;font-weight: lighter;">
          {{ title }}
        </span>
        <span v-else class="white--text text-xs-body-1 text-sm-h5"
              style="letter-spacing: 3px !important;font-weight: lighter;">
          {{ $store.state.userInfo.title }}
        </span>
      </v-spacer>
      <v-icon v-if="this.$route.name === 'Show'" @click="list" color="white">mdi-format-list-bulleted</v-icon>
      <v-icon v-else-if="this.$store.state.openShowFromList" @click="show" color="white">mdi-view-day-outline</v-icon>
    </v-app-bar>
  </div>
</template>

<script>

import {post} from "@/utilis/request";
import {base64decode} from "crypto.js";

export default {
  name: "Header",
  components: {},
  data() {
    return {
      token: '',
      title: '白小飞命盘管理系统',
      overflow: false,
    }
  },
  methods: {
    exit() {
      this.$router.push({name: 'Home'})
      this.$store.commit('userNoReadReplyCountMutations', 0)
      //解密token和id
      this.token = base64decode(localStorage.getItem('access_token')).toString()
      this.overflow = true
      post('logout', {}, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token}})
          .then(response => {
            this.overflow = false
            this.Message('success', response.data.message)
            this.$store.commit('paginationMuta', {total: ''})
            localStorage.clear()
            localStorage.setItem('access_token', 'null')
          })
          .catch(error => {
            this.Message('error', error)
            this.overflow = false
          })
    },
    show() {
      this.$router.push('/show')
    },
    list() {
      this.$router.push('/list')
    }
  },
  mounted() {
    this.$store.commit('userInfoMuta', {
      username: localStorage.username,
      avatar: (localStorage.APP_URL + localStorage.avatar),
      title: localStorage.title,
    })
  },
}
</script>