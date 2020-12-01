import Vue from 'vue'
import Vuex from 'vuex'
import {post} from "@/utilis/request";
import {base64decode} from "crypto.js"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginDialog: {
      dialog: false,
      title: '',
    },
    /*
    错误提示：red   mdi-alert-decagram-outline
    成功提示：success    mdi-check-circle
    警告提示：#ff6d00    mdi-shield-alert
     */
    alert: {
      color: '',
      message: '',
      isShow: false,
      icon: '',
    },
    findPasswordInputEmail: {
      email: false
    },
    findPasswordReset: {
      reset: false
    },
    //分页
    pagination: {
      total: '',
    },
    //用户信息
    userInfo: {
      username: '',
      avatar: '',
      title: '',
    },
    //编辑命盘状态
    edit: false,
    //点击列表row前往Show,列表页右上角财显示按钮
    openShowFromList: false,
    //展示页面数据
    showData: {
      year: '',
      month: '',
      day: '',
      hour: '',
      minute: '',
    },
    getMessage: {
      publicMessage: '',
      privateMessage: '',
    },
    messageTotal: '',

    userType: '',
    userType2: '',
    membertime: '',

    staticData: {
      homeDesc: '',
      subDesc: '',
    },
    payDesc: [],

    isBottomSheetShow: '',
    outSideBottomSheetShow: '',

    //用户发送留言
    userMessageOpenPanel: [],
    userMessageGet: [],
    //清空用户发送留言文本框
    userMessageTextArea: 0,
    userMessageSend: {},
    userMessageLoading: {
      dialogDisabled: false,
      dialogLoading: false,
    },
    userMessageDialog: false,
    //获取未读回复
    userNoReadReplyCount: '',

    //首次登陆
    firstLogin: {
      snackbar: false,
      firstLogin: '',
    },
  },
  mutations: {
    //打开登陆和注册界面
    loginDialogMuta(state, v) {
      state.loginDialog = v
    },
    //Message
    alertMuta(state, payload) {
      state.alert.color = payload.color
      state.alert.message = payload.message
      state.alert.icon = payload.icon
      state.alert.isShow = payload.isShow
    },
    //找回密码 输入Email
    findPasswordInputEmailMuta(state, v) {
      state.findPasswordInputEmail = v
    },
    //找回密码 重置密码
    findPasswordResetMuta(state, v) {
      state.findPasswordReset = v
    },
    //分页信息
    paginationMuta(state, payload) {
      state.pagination.total = payload.total
    },
    //用户信息
    userInfoMuta(state, payload) {
      state.userInfo.username = payload.username
      state.userInfo.avatar = payload.avatar
      state.userInfo.title = payload.title
    },
    //编辑命盘状态
    editMuta(state, payload) {
      state.edit = payload.edit
    },

    openShowFromListMuta(state, payload) {
      state.openShowFromList = payload.openShowFromList
    },

    showDataMuta(state, payload) {
      state.showData.year = payload.year
      state.showData.month = payload.month
      state.showData.day = payload.day
      state.showData.hour = payload.hour
      state.showData.minute = payload.minute
      state.showData.sex = payload.sex
    },

    getMessageMutations(state, v) {
      state.getMessage.publicMessage = v.publicMessage
      state.getMessage.privateMessage = v.privateMessage
      state.getMessage.publicTotal = v.publicTotal
    },

    messageTotalMutations(state, v) {
      state.messageTotal = v
    },

    userTypeMutations(state, v) {
      state.userType = v
    },
    userType2Mutations(state, v) {
      state.userType2 = v
    },
    membertimeMutations(state, v) {
      state.membertime = v
    },

    homeDescMutations(state, v) {
      state.staticData = v
    },
    payDescMutations(s, v) {
      s.payDesc = v
    },

    isBottomSheetShowMutations(state, v) {
      state.isBottomSheetShow = v
    },

    outSideBottomSheetShowMutations(state, v) {
      state.outSideBottomSheetShow = v
    },

    //用户留言
    userMessageOpenPanelMutations(s, v) {
      if (s.userMessageOpenPanel[0] === 0) {
        s.userMessageOpenPanel = []
      } else {
        s.userMessageOpenPanel = [v]
      }
    },
    userMessageSendMutations(state, v) {
      state.userMessageSend = v
    },
    userMessageLoadingMutations(state, v) {
      state.userMessageLoading.dialogLoading = v.dialogLoading
      state.userMessageLoading.dialogDisabled = v.dialogDisabled
    },
    userMessageDialogMutations(s, v) {
      s.userMessageDialog = v
    },
    userMessageGetMutations(s, v) {
      s.userMessageGet = v
    },
    userMessageTextAreaMutations(s) {
      s.userMessageTextArea = s.userMessageTextArea + 1
    },
    userNoReadReplyCountMutations(s, v) {
      s.userNoReadReplyCount = v
    },

    firstLoginMutations(s, v) {
      s.firstLogin.snackbar = v.snackbar
      s.firstLogin.firstLogin = v.firstLogin
    }
  },
  actions: {
    getMessage({commit}) {
      post('getMessage',
        {id: base64decode(localStorage.getItem('id')).toString()},
        {
          headers: {
            'Authorization': 'Bearer ' + base64decode(localStorage.getItem('access_token')).toString(),
            'Content-Type': 'application/json', 'Accept': 'application/json'
          }
        }
      )
        .then(response => {
          if (response.status === 200) {
            commit('getMessageMutations', response.data.data)
            commit('messageTotalMutations', response.data.data.publicTotal)
          }
        })
        .catch(error => {
          commit('alertMuta', {
            isShow: true,
            color: '#FF5252',
            icon: 'mdi-alert-decagram-outline',
            message: error,
          })
        })
    },

    getStaticData({commit}) {
      post('getStatic', {}, {})
        .then(response => {
          if (response.status === 200) {
            commit('homeDescMutations', response.data.data)
          }
        })
    },
    payDescActions({commit}) {
      post('getPayDesc', {}, {})
        .then(response => {
          if (response.status === 200) {
            commit('payDescMutations', response.data.data)
          }
        })
    },

    //得到留言
    userMessageGetActions({commit}) {
      post('userMessageGet', {}, {
        headers: {
          'Authorization': 'Bearer ' + base64decode(localStorage.getItem('access_token')).toString(),
          'Content-Type': 'application/json', 'Accept': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 200) {
            commit('userMessageGetMutations', response.data.data.messages)
          }
        })
    },

    //用户发送留言
    userMessageSendActions({commit}, v) {
      commit('userMessageLoadingMutations', {
        dialogDisabled: true,
        dialogLoading: true,
      })
      post(v.methods, v.value, {
        headers: {
          'Authorization': 'Bearer ' + base64decode(localStorage.getItem('access_token')).toString(),
          'Content-Type': 'application/json', 'Accept': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 200) {
            if (v.methods === 'userMessageSend') {
              setTimeout(() => {
                this.state.userMessageGet.unshift(response.data.data[0])
                commit('userMessageTextAreaMutations')
              }, 900)
            }
            if (v.methods === 'userMessageDel') {
              this.state.userMessageGet.splice(v.spliceIndex, 1)
            }
            commit('alertMuta', {
              isShow: true,
              color: '#4CAF50',
              icon: 'mdi-check-circle',
              message: response.data.message,
            })
            commit('userMessageLoadingMutations', {
              dialogDisabled: false,
              dialogLoading: false,
            })
          }
        })
        .catch(error => {
          commit('alertMuta', {
            isShow: true,
            color: '#FF5252',
            icon: 'mdi-alert-decagram-outline',
            message: error,
          })
          commit('userMessageLoadingMutations', {
            dialogDisabled: false,
            dialogLoading: false,
          })
        })
    },

    userNoReadReplyCountActions({commit}, v) {
      post('noReadReplyCount', {read: v}, {
        headers: {'Authorization': 'Bearer ' + base64decode(localStorage.getItem('access_token')).toString(), 'Content-Type': 'application/json', 'Accept': 'application/json'}
      })
        .then(response => {
          if (response.status === 200) {
            commit('userNoReadReplyCountMutations', response.data.data)
            if (this.state.userNoReadReplyCount > 0) {
              setTimeout(() => {
                commit('firstLoginMutations', {
                  snackbar: true,
                  firstLogin: '您的留言，有新的回复等待查看。'
                })
              }, 3000)
            }
          }
        })
    }
  },
  modules: {},
  plugins: [createPersistedState({
    reducer(val) {
      return {
        // 只储存state中的usertype
        userType: val.userType,
        userType2: val.userType2,
        userInfo: val.userInfo,
        staticData: val.staticData,
        userMessageSend: val.userMessageSend,
        userMessageGet: val.userMessageGet,
        userNoReadReplyCount: val.userNoReadReplyCount,
        pagination: val.pagination,
        membertime: val.membertime,
      }
    }
  })],
})
