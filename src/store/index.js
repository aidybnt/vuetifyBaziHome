import Vue from 'vue'
import Vuex from 'vuex'

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
    },
  },
  actions: {},
  modules: {}
})
