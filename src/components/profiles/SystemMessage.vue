<template>
  <!--系统消息-->
  <v-card
      class="my-6 mx-6"
      v-if="sysMsg"
  >
    <v-card-title class="body-1">系统消息<span class="caption"></span></v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-list-item :key="index">
          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle class="body-1" v-html="item.msg"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-delete</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import Echo from 'laravel-echo'

window.io = require('socket.io-client');

export default {
  name: "SystemMessage",
  data: () => ({
    items: [],
    model: 0,
    sysMsg: '',
    // port: ':2053',
    port: ':6001',
  }),
  created() {
    window.Echo = new Echo({
      broadcaster: 'socket.io',
      // host: 'https://data.water555.xyz' + this.port
      host: 'http://data.com' + this.port
    });
    window.Echo.channel('laravel_database_sysMsg')
        .listen('SystemMessage', (e) => {
          console.log(e.msg);
          this.sysMsg = e.msg
        })
  },
  watch: {
    sysMsg() {
      this.items.push(this.sysMsg)
      console.log(eval(this.items))
    }
  },
  mounted() {
    console.log(window.location.hostname);
  }
}
</script>

<style scoped>

</style>