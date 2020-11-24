<template>
  <v-footer app class="blue-grey darken-4 pa-0" elevation="6">
    <!--    底部导航-->
    <v-bottom-navigation
        :value="value"
        :background-color="color"
        dark
        shift
        :class="footClass"
        style="position: relative"
    >
      <div class="dot"
           v-if="($store.state.getMessage.privateMessage.length > 0 || $store.state.getMessage.publicMessage !== null) && $store.state.messageTotal !== 0"
           v-text="$store.state.messageTotal"
      ></div>
      <v-btn v-for="(item,i) in items" :key="i" :to="item.url" min-width="32%">
        <span>{{ item.title }}</span>
        <v-icon>
          {{ item.icon }}
        </v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!--    版权-->
    <v-spacer class="d-flex justify-center" v-if="$store.state.userType===1 && $store.state.userType2===0 || $store.state.userType===0">
      <v-btn @click="bottomSheetShow" text color="white" class="caption pa-0">
        <v-icon small class="mr-2"> mdi-copyright</v-icon>
        {{ new Date().getFullYear() }}
        <v-icon v-for="(item, i) in bottomSheets"
                :key="i"
                small
                class="mx-2"
                v-text="item.icon"
        ></v-icon>
      </v-btn>
    </v-spacer>

    <!--   底部弹出层-->
    <v-bottom-sheet
        :value="$store.state.isBottomSheetShow"
        @click="bottomSheetShow"
        @click:outside="outSideBottomSheetShow"
        inset
    >
      <v-card
          class="mx-auto"
      >
        <v-list>
          <v-list-item-group>
            <v-list-item
                v-for="(item, i) in bottomSheets"
                :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-bottom-sheet>

  </v-footer>
</template>

<script>
export default {
  name: "Foot",
  data: () => {
    return {
      footClass: 'd-flex',
      bottomSheets: [
        {'icon': 'mdi-google', 'text': 'aidybnt@gmail.com'},
        {'icon': 'mdi-twitter', 'text': 'aidybnt'},
        {'icon': 'mdi-facebook', 'text': '白小飞'},
        {'icon': 'mdi-youtube', 'text': 'aidybnt@gmail.com'},
        {'icon': 'mdi-telegram', 'text': 'Aidy Bnt'},
        {'icon': 'mdi-discord', 'text': 'aidybnt#3272'},
      ],
      items: [
        {title: '添加命盘', url: '/add', icon: 'mdi-comment-edit-outline', message: '',},
        {title: '命盘列表', url: '/list', icon: 'mdi-format-list-bulleted', message: '',},
        {title: '个人信息', url: '/info', icon: 'mdi-account-box', message: '',},
      ],
    }
  },
  computed: {
    value() {
      switch (this.$route.name) {
        case 'Add':
          return 0
        case 'List':
          return 1
        case 'UserInfo':
          return 2
        default:
          return 0
      }
    },
    color() {
      switch (this.value) {
        case 0:
          return 'blue-grey'
        case 1:
          return 'teal'
        case 2:
          return 'indigo'
        default:
          return 'blue-grey'
      }
    }
  },
  methods: {
    bottomSheetShow() {
      this.$store.commit('isBottomSheetShowMutations', true)
    },
    outSideBottomSheetShow() {
      this.$store.commit('isBottomSheetShowMutations', false)
    },
  },
  watch: {
    '$route.name': function () {
      if (this.$route.name === '/' || this.$route.name === 'Home' || this.$route.name === 'Show') {
        this.footClass = 'd-none'
      } else {
        this.footClass = 'd-flex d-md-none'
      }
    },
  },
  mounted() {
    switch (this.$route.name) {
      case '/':
        this.footClass = 'd-none'
        break
      case 'Home':
        this.footClass = 'd-none'
        break
      case 'Show':
        this.footClass = 'd-none'
        break
      default:
        this.footClass = 'd-flex d-md-none'
    }
  }
}
</script>

<style scoped>
.dot {
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: #F44336;
  text-align: center;
  line-height: 20px;
  right: 42px;
  top: 3px;
  font-size: 12px;
  z-index: 999;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 1 !important;
  -webkit-box-orient: vertical !important;
  white-space: nowrap !important;
}
</style>