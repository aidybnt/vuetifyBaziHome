<template>
  <v-app>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

