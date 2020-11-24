<template>
  <v-card class="my-6 mx-6">
    <template slot="progress">
      <v-progress-linear
          color="#FF5722"
          height="10"
          indeterminate
      ></v-progress-linear>
    </template>

    <v-expansion-panels accordion hover>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span>
            <v-icon color="info" class="mr-3">
              mdi-wallet-membership
            </v-icon>
            订阅网站 增值服务
          </span>
        </v-expansion-panel-header>
        <v-divider class="mx-4"></v-divider>
        <v-expansion-panel-content>
          <div v-html="subText" style="width: 100%; margin: 1.5rem 0 0 0"></div>
          <v-btn color="orange darken-2" class="white--text"> 订 阅
            <v-icon right dark>
              mdi-account-reactivate
            </v-icon>
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </v-card>
</template>

<script>
export default {
  name: "Sub",
  computed: {
    subText() {
      return this.$store.state.staticData.subDesc
    }
  },
}
</script>

<style scoped>

</style>