<template>
  <v-card class="my-6 mx-6">
    <template slot="progress">
      <v-progress-linear color="#FF5722" height="10" indeterminate></v-progress-linear>
    </template>

    <v-expansion-panels accordion hover>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span><v-icon color="info" class="mr-3">mdi-help-circle-outline</v-icon>其他服务</span>
        </v-expansion-panel-header>
        <v-divider class="mx-4"></v-divider>
        <v-expansion-panel-content>
          <div style="width: 100%; margin: 1.5rem 0 0 0">
            <v-list class="pa-0 ma-0">
              <v-list-item v-for="(item,index) in other.other" :key="index" class="body-2 pa-0 ma-0">
                <v-icon color="orange" class="float-left mr-1">{{ item.icon }}</v-icon>
                {{ item.content }}
              </v-list-item>
            </v-list>
            <v-btn class="ma-2 float-right" text color="primary" @click="openDialog">站内留言</v-btn>
            <v-btn class="ma-2 float-right" text color="primary" @click="bottomSheetShow" @click:outside="outSideBottomSheetShow">联系方式</v-btn>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  name: "Others",
  data() {
    return {}
  },
  computed: {
    other() {
      return this.$store.state.payDesc
    },
  },
  methods: {
    //底部版权
    bottomSheetShow() {
      this.$store.commit('isBottomSheetShowMutations', true)
    },
    outSideBottomSheetShow() {
      this.$store.commit('isBottomSheetShowMutations', false)
    },
    //发送留言
    openDialog() {
      this.$store.commit('userMessageOpenPanelMutations', 0)
    },
  },
}
</script>

<style scoped>

</style>