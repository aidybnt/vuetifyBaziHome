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
              mdi-help-circle-outline
            </v-icon>
            其他服务
          </span>
        </v-expansion-panel-header>
        <v-divider class="mx-4"></v-divider>
        <v-expansion-panel-content>
          <div style="width: 100%; margin: 1.5rem 0 0 0">
            <p>...</p>
            <v-btn
                class="ma-2 float-right"
                text
                color="primary"
                @click="openDialog"
            >
              站内留言
            </v-btn>
            <v-btn
                class="ma-2 float-right"
                text
                color="primary"
                @click="bottomSheetShow"
                @click:outside="outSideBottomSheetShow"
            >
              联系方式
            </v-btn>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!--dialog
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600"
    >
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
        <v-card-title class="body-1"></v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-textarea
                label="输入留言"
                auto-grow
                rows="2"
                row-height="48"
                v-model="content"
                :rules="rule"
            >
            </v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="gray"
              icon
              @click="closeDialog"
              class="mr-3"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn
              color="green darken-1"
              icon
              @click="send"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    -->
  </v-card>
</template>

<script>
export default {
  name: "Others",
  data() {
    return {
      content: '',
      rule: [
        v => !!v || '留言不能为空！',
      ],
    }
  },
  computed: {
    dialog() {
      return this.$store.state.userMessageDialog
    }
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
      // this.$store.commit('userMessageDialogMutations', true)
      this.$store.commit('userMessageOpenPanelMutations', 0)
    },
    closeDialog() {
      this.$store.commit('userMessageDialogMutations', false)
    },
    send() {
      this.$store.commit('userMessageOpenPanelMutations', 0)
    }
  },
}
</script>

<style scoped>

</style>