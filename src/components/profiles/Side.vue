<template>
  <!--    permanent 1260像素-->
  <v-navigation-drawer
      app
      fixed
      width="210"
      color="grey lighten-5"
      mobile-breakpoint="960"
  >
    <template v-slot:prepend>
      <!--        占位-->
      <v-list-item two-line class="transparent"></v-list-item>
      <!--        头像-->
      <v-list-item two-line class="my-3" @click="$router.push('/info')">
        <v-list-item-avatar style="margin: 10px 9px 10px 0; padding: 15px 0 15px 0; min-width: 60px;height: 80px;overflow:visible !important;">
          <v-badge
              :value="($store.state.getMessage.privateMessage.length > 0 || $store.state.getMessage.publicMessage !== null) && $store.state.messageTotal !== 0"
              color="green"
              :content="$store.state.messageTotal"
              overlap
              offset-x="24"
              style="overflow:visible !important;"
          >
            <v-avatar color="orange" size="60" style="overflow:visible !important;">
              <img :src="$store.state.userInfo.avatar" alt="$store.state.userInfo.username"/>
            </v-avatar>
          </v-badge>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-truncate">{{ $store.state.userInfo.username }}</v-list-item-title>
          <v-list-item-subtitle v-if="$store.state.pagination.total">命盘总数：{{ $store.state.pagination.total }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <!--        导航按钮-->
    <v-list shaped>
      <v-list-item-group
          color="primary"
          v-model="listId"
      >
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.url"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Side",
  data() {
    return {
      avatar: false,
      listId: '',
      items: [
        {title: '添加命盘', url: '/add', icon: 'mdi-comment-edit-outline'},
        {title: '命盘列表', url: '/list', icon: 'mdi-format-list-bulleted'},
        {title: '个人信息', url: '/info', icon: 'mdi-account-box'},
      ],
    }
  },
  mounted() {
    this.avatar = localStorage.APP_URL + localStorage.avatar
    let cut = this.avatar.substring(this.avatar.length - 3)
    if (cut !== 'peg' && cut !== 'jpg' && cut !== 'png') {
      this.$store.commit('userInfoMuta', {
        username: localStorage.username,
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        title: localStorage.title,
      })
    } else {
      this.$store.commit('userInfoMuta', {
        username: localStorage.username,
        avatar: (localStorage.APP_URL + localStorage.avatar),
        title: localStorage.title,
      })
    }
    this.$store.commit('paginationMuta', {total: localStorage.getItem('total')})
  },
}
</script>

<style scoped>
.v-navigation-drawer--fixed {
  z-index: 3;
}
</style>