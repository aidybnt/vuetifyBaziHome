import store from './../store'

function message(type, msg) {
  if (store.state.alert.isShow === true) {
    store.commit('alertMuta', {isShow: false})
  }
  setTimeout(() => {
    switch (type) {
      case "success":
        store.commit('alertMuta', {
          isShow: true,
          color: '#4CAF50',
          icon: 'mdi-check-circle',
          message: msg,
        })
        break
      case "error":
        store.commit('alertMuta', {
          isShow: true,
          color: '#FF5252',
          icon: 'mdi-alert-decagram-outline',
          message: msg,
        })
        break
      case "warning":
        store.commit('alertMuta', {
          isShow: true,
          color: '#795548',
          icon: 'mdi-shield-alert',
          message: msg,
        })
        break
      case "info":
        store.commit('alertMuta', {
          isShow: true,
          color: '#2196F3',
          icon: 'mdi-information-outline',
          message: msg,
        })
        break
    }
  }, 300)
}

export default {
  install: function (Vue) {
    Vue.prototype.Message = (type, msg) => message(type, msg)
  }
}