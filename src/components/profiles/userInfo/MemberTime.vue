<template>
  <v-alert border="left" colored-border elevation="2" class="ma-6"
           :type="$store.state.userType ? 'success' : 'info'">
    <div v-if="$store.state.userType===1">订阅用户
      <div v-if="$store.state.membertime" class="float-right body-2" style="height:1.5rem !important;line-height: 1.5rem !important;">
        到期时间 : {{ $store.state.membertime.substring(-1, 10) }}
      </div>
    </div>
    <div v-else-if="$store.state.userType===8">永久会员</div>
    <div v-else>普通用户</div>
  </v-alert>
</template>

<script>
export default {
  name: "MemberTime"
}
</script>

<style scoped>

</style>