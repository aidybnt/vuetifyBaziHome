import Vue from 'vue'
import Vuex from 'vuex'
import {post} from "@/utilis/request";
import {base64decode} from "crypto.js"

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
          this.Message('error', error)
        })
    }
  },
  modules: {}
})
