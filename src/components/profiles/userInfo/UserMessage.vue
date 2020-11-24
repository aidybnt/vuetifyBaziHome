<template>
  <v-card
      v-if="$store.state.userMessageGet.length > 0 || $store.state.userMessageOpenPanel.length > 0"
      class="my-6 mx-6" style="border-top: 9px #09f solid"
      :disabled="$store.state.userMessageLoading.dialogDisabled"
      :loading="$store.state.userMessageLoading.dialogLoading">
    <template slot="progress">
      <v-progress-linear
          color="#FF5722"
          height="10"
          indeterminate
      ></v-progress-linear>
    </template>

    <v-expansion-panels accordion hover multiple class="ExPanels" v-model="$store.state.userMessageOpenPanel">
      <v-expansion-panel :key="0">
        <v-expansion-panel-header @click="readReply">
          <span>
            <v-icon class="mr-3 effectColor" :class="effect">mdi-message-processing-outline</v-icon>
            站内留言
          </span>
        </v-expansion-panel-header>
        <v-divider class="mx-4"></v-divider>
        <v-expansion-panel-content>

          <v-timeline dense clipped align-top>

            <!--输入留言-->
            <v-timeline-item fill-dot class="white--text" color="orange" small>
              <template v-slot:icon>
                <span>{{ username }}</span>
              </template>
              <v-form ref="form">
                <v-textarea label="输入留言" auto-grow rows="1" row-height="48" v-model="content" :rules="rule">
                  <template v-slot:append>
                    <v-icon class="mx-0" depressed @click="send"> mdi-send</v-icon>
                  </template>
                </v-textarea>
              </v-form>
            </v-timeline-item>

            <!--默认得到数据-->
            <v-slide-y-transition group>
              <div v-for="(item,index) in userMessageGet" :key="index">
                <v-timeline-item color="pink" small class="py-6">
                  <v-row justify="space-between">
                    <v-col style="line-height: 1.5rem;" cols="8" class="pt-0">
                      <span v-html="item.message_content" style="letter-spacing: 2px;"></span>
                    </v-col>
                    <v-col class="text-right body-2 pt-0" cols="4">
                      <span class="d-none d-sm-inline">{{ item.message_time.substring(-1, 16).substring(2, item.message_time.substring(-1, 16).length) }}</span>
                      <v-btn style="height: 0" icon @click="delMessage(index, item.id)">
                        <v-icon style="cursor: pointer">mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-timeline-item>
                <!--admin-->
                <v-timeline-item v-for="(item2,index2) in item.reply" :key="index2" style="line-height: 1.5rem; margin-top: .6rem" hide-dot>
                  <v-row no-gutters justify="space-between">
                    <v-col cols="8" class="ma-0 pa-0">
                      <v-chip class="white--text ml-0 mr-2" color="info" label small>admin</v-chip>
                      <p style="letter-spacing: 2px; text-align: justify !important;" v-html="item2.reply_message_content"></p>
                    </v-col>
                    <v-col class="text-right ma-0 pa-0 body-2" cols="4">
                      <span style="margin-right: 2.2rem">
                      {{ item2.reply_message_time.substring(-1, 16).substring(2, item2.reply_message_time.substring(-1, 16).length) }}
                      </span>
                    </v-col>
                  </v-row>
                </v-timeline-item>
              </div>
            </v-slide-y-transition>

          </v-timeline>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </v-card>
</template>

<script>
export default {
  name: "UserMessage",
  data: () => ({
    content: '',
    effect: false,
    rule: [
      v => !!v || '留言不能为空！',
    ],
  }),

  computed: {
    userMessageGet() {
      return this.$store.state.userMessageGet
    },
    username() {
      return localStorage.getItem('username').substring(0, 1)
    },
  },

  watch: {
    '$store.state.userMessageTextArea'() {
      this.$refs.form.reset()
    },
    '$store.state.userNoReadReplyCount': {
      handler: function (n) {
        if (n > 0) {
          this.effect = 'effect'
        }
        if (n === 0) {
          this.effect = false
        }
      },
      immediate: true
    }
  },

  methods: {
    send() {
      if (!this.$refs.form.validate()) {
        return false
      }
      this.$store.dispatch('userMessageSendActions', {
        value: {message_content: this.content},
        methods: 'userMessageSend',
      })
    },

    clear: async function () {
      await this.send()
      this.content = ''
      console.log(11);
    },

    delMessage(index, id) {
      this.$store.dispatch('userMessageSendActions', {
        value: {id: id,},
        methods: 'userMessageDel',
        spliceIndex: index
      })
    },

    readReply() {
      this.effect = false
      this.$store.commit('userNoReadReplyCountMutations', 0)
      this.$store.dispatch('userNoReadReplyCountActions', 'read')
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.$store.state.userNoReadReplyCount.data > 0) {
        this.effect = 'effect'
      }
    })
  }
}
</script>

<style scoped>
.sd {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 5px 0 rgba(0, 0, 0, 0.3) !important;
}

>>> .v-timeline-item {
  display: flex;
  padding-bottom: 0 !important;
}

>>> .ExPanels .v-timeline--dense:not(.v-timeline--reverse):before {
  left: calc(15px - 1px) !important;
}

>>> .ExPanels .v-timeline--dense .v-timeline-item__body {
  max-width: calc(100% - 30px) !important;
}

>>> .ExPanels .v-timeline-item__divider {
  min-width: 30px !important;
  margin-right: .6rem;
}

.effectColor {
  color: #2196f3;
}

.effect {
  animation: myColor .6s linear infinite;
}

@keyframes myColor {
  0% {
    color: #c0c0c0;
    transform: scale(1.2);
  }
  50% {
    color: red;
    transform: scale(.9);
  }
  100% {
    color: #2196f3;
    transform: scale(1.2);
  }
}
</style>