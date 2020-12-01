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
          <v-btn @click="openSubDialog" color="orange darken-2" class="white--text"> 订 阅
            <v-icon right dark>
              mdi-account-reactivate
            </v-icon>
          </v-btn>
          <v-btn class="float-right" text color="primary" @click="openDialog">
            站内留言
          </v-btn>
          <v-btn class="float-right" text color="primary" @click="bottomSheetShow" @click:outside="outSideBottomSheetShow">
            联系方式
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!--dialog-->
    <v-dialog v-model="dialog" max-width="90%">
      <v-card
          :disabled="$store.state.userMessageLoading.dialogDisabled"
          :loading="$store.state.userMessageLoading.dialogLoading">
        <template slot="progress">
          <v-progress-linear
              color="#FF5722"
              height="10"
              indeterminate
          ></v-progress-linear>
        </template>
        <v-card-title class="body-1">
          <v-list class="pa-0 ma-0">
            <v-list-item v-for="(item,index) in payDesc.payDesc" :key="index" class="body-2 pa-0 ma-0">
              <v-icon color="pink" class="float-left mr-1">{{ item.icon }}</v-icon>
              {{ item.content }}
            </v-list-item>
          </v-list>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <v-img class="ma-auto elevation-9" max-width="300" :src="wx"></v-img>
              </v-col>
              <v-col cols="12" sm="4">
                <v-img class="ma-auto elevation-9" max-width="300" :src="paypal"></v-img>
              </v-col>
              <v-col cols="12" sm="4">
                <v-img class="ma-auto elevation-9" max-width="300" :src="zfb"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog=false" color="gray" icon class="mr-3">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
export default {
  name: "Sub",
  data() {
    return {
      dialog: '',
    }
  },
  computed: {
    subText() {
      return this.$store.state.staticData.subDesc
    },
    payDesc() {
      return this.$store.state.payDesc
    },
    wx() {
      return localStorage.APP_URL + '/storage/wx.jpg'
    },
    zfb() {
      return localStorage.APP_URL + '/storage/zfb.jpg'
    },
    paypal() {
      return localStorage.APP_URL + '/storage/paypal.jpg'
    },
  },
  methods: {
    openSubDialog() {
      this.dialog = true
    },
    //底部版权
    bottomSheetShow() {
      this.$store.commit('isBottomSheetShowMutations', true)
    },
    outSideBottomSheetShow() {
      this.$store.commit('isBottomSheetShowMutations', false)
    },
    //发送留言
    openDialog() {
      // this.$store.commit('userMessageDialogMutations', true)
      this.$store.commit('userMessageOpenPanelMutations', 0)
    },
  },
}
</script>

<style scoped>
>>> .v-list-item {
  min-height: 1px;
}
</style>