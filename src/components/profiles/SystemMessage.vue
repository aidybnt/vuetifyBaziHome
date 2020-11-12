<template>
  <!--系统消息-->
  <v-card
      class="my-6 mx-6"
      v-if="$store.state.getMessage.privateMessage.length > 0 || $store.state.getMessage.publicMessage !== null"
      style="box-shadow: none"
  >
    <v-card-title class="blue white--text body-1 sd">系统消息<span class="caption"></span></v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-expansion-panels multiple>
      <!--      public-->
      <v-expansion-panel
          v-for="(item, index) in $store.state.getMessage.publicMessage"
          :key="index"
          @change="publicClickChange(item,index)"
          :readonly="index===currentNum"
      >
        <div v-show="item.not_bak_1 == '1'">
          <v-expansion-panel-header
              disable-icon-rotate
              class="overline text-body-1 text--black"
          >
            {{ item.title }}
            <template v-slot:actions>
              <div :class="{active:index===currentNum}">
                <v-icon v-if="item.not_isread === '0'" color="error">
                  mdi-email-alert-outline
                </v-icon>
                <v-icon v-else color="teal">
                  mdi-check
                </v-icon>
              </div>
              <v-progress-circular
                  :width="3"
                  size="18"
                  color="orange"
                  indeterminate
                  v-show="currentNum===index"
              ></v-progress-circular>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row no-gutters>
              <v-col cols="11" v-html="item.message"></v-col>
              <v-col cols="1">
                <v-icon
                    class="float-right"
                    style="cursor: pointer"
                    v-if="item.not_isread == '1'"
                    @click="delPublic(item,index)"
                >mdi-delete
                </v-icon>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </div>
      </v-expansion-panel>
      <!--      private-->
      <v-expansion-panel
          v-for="(item, index) in $store.state.getMessage.privateMessage"
          :key="index+item.id"
          @change="privateClickChange(item,index)"
          :readonly="index===currentNum2"
      >
        <v-expansion-panel-header
            disable-icon-rotate
            class="text-body-1 text--black"
        >
          {{ item.title }}
          <template v-slot:actions>
            <div :class="{active:index===currentNum2}">
              <v-icon v-if="item.isread === '0'" color="error">
                mdi-email-alert-outline
              </v-icon>
              <v-icon v-else color="teal">
                mdi-check
              </v-icon>
            </div>
            <v-progress-circular
                :width="3"
                size="18"
                color="#0099ff"
                indeterminate
                v-show="currentNum2===index"
            ></v-progress-circular>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row no-gutters>
            <v-col cols="11" v-html="item.message"></v-col>
            <v-col cols="1">
              <v-icon
                  class="float-right"
                  style="cursor: pointer"
                  v-if="item.isread == '1'"
                  @click="delPrivate(item, index)"
              >mdi-delete
              </v-icon>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import {base64decode} from "crypto.js";
import {post} from "@/utilis/request";

export default {
  name: "SystemMessage",
  data: () => ({
    messageList: [],
    model: 0,
    // port: ':2053',
    port: ':6001',
    id: '',
    token: '',

    currentNum: -1,
    currentNum2: -1,
  }),
  created() {
    this.token = base64decode(localStorage.getItem('access_token')).toString()
    this.id = base64decode(localStorage.getItem('id')).toString()
  },
  // computed: {
  //   panel() {
  //     return [...Array(this.$store.state.getMessage.privateMessage).keys()].map((k, i) => i)
  //   }
  // },
  methods: {
    publicClickChange(item, index) {
      if (item.not_isread === '0') {
        this.currentNum = index
        post('isread', {id: item.not_statu_id}, {headers: {'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
            /*eslint no-unused-vars: ["error", { "args": "none" }]*/
            .then(response => {
              this.$store.state.getMessage.publicMessage[index].not_isread = 1
              this.currentNum = -1
              this.$store.state.messageTotal--
            })
      }
    },
    privateClickChange(item, index) {
      if (item.isread === '0') {
        this.currentNum2 = index
        post('pisread', {id: item.id}, {headers: {'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
            .then(response => {
              this.$store.state.getMessage.privateMessage[index].isread = 1
              this.currentNum2 = -1
              this.$store.state.messageTotal--
            })
      }
    },
    delPublic(item, index) {
      this.currentNum = index
      post('isrevoke', {id: item.not_statu_id}, {headers: {'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
          /*eslint no-unused-vars: ["error", { "args": "none" }]*/
          .then(response => {
            this.$store.state.getMessage.publicMessage[index].not_bak_1 = 0
            this.currentNum = -1
          })
    },
    delPrivate(item, index) {
      this.currentNum2 = index
      post('pisrevoke', {id: item.id}, {headers: {'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
          /*eslint no-unused-vars: ["error", { "args": "none" }]*/
          .then(response => {
            this.$store.state.getMessage.privateMessage.splice(index, 1);
            this.currentNum2 = -1
          })
    },
  },
}
</script>

<style scoped>
.active {
  display: none;
}

.sd {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
}
</style>