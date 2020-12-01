<template>
  <div>
    <!--显示头像-->
    <v-card class="mx-3 d-flex d-md-none" flat>
      <v-list-item two-line class="my-3" @click="$router.push('/info')">
        <v-list-item-avatar size="60"
                            style="margin: 10px 9px 10px 0; padding: 15px 0 15px 0; min-width: 60px;height: 80px;overflow:visible !important;"
        >
          <v-badge
              :value="($store.state.getMessage.privateMessage.length > 0 || $store.state.getMessage.publicMessage !== null) && $store.state.messageTotal !== 0"
              color="red"
              :content="$store.state.messageTotal"
              overlap
              offset-x="20"
              style="overflow:visible !important;"
          >
            <v-avatar color="orange" size="60" style="overflow:visible !important;">
              <img :src="avatarUrl" alt="$store.state.userInfo.username"/>
            </v-avatar>
          </v-badge>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-truncate">{{ $store.state.userInfo.username }}</v-list-item-title>
          <v-list-item-subtitle v-if="$store.state.pagination.total">命盘总数：{{ $store.state.pagination.total }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <!--用户组别-->
    <MemberTime/>

    <!--修改密码-->
    <modify-password/>

    <!--设置头像-->
    <v-card class="my-6 mx-6"
            :disabled="avatarCardDisabled"
            :loading="avatarLoading">
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
              mdi-account-box-outline
            </v-icon>
            设置头像
          </span>
          </v-expansion-panel-header>
          <v-divider class="mx-4"></v-divider>
          <v-expansion-panel-content>
            <v-form ref="avatarForm" lazy-validation style="width: 100%; margin: 1.5rem 0 0 0">
              <v-file-input
                  :rules="avatarRules"
                  accept="image/png, image/jpeg"
                  placeholder="jpg png 小于100kb"
                  prepend-icon="mdi-camera"
                  label="选择头像"
                  show-size
                  @change="avatarChange"
              ></v-file-input>
            </v-form>
            <v-btn
                color="orange darken-2"
                class="ma-2 white--text"
                :disabled="avatarButtonDisabled"
                @click="avatarSubmit"
            >
              上 传
              <v-icon
                  right
                  dark
              >
                mdi-cloud-upload
              </v-icon>
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <!--标题-->
    <v-card class="my-6 mx-6" :disabled="titleCardDisabled" :loading="titleLoading">
      <template slot="progress">
        <v-progress-linear color="#FF5722" height="10" indeterminate></v-progress-linear>
      </template>
      <v-expansion-panels accordion hover>
        <v-expansion-panel>
          <v-expansion-panel-header>
          <span><v-icon color="info" class="mr-3">
              mdi-format-title
            </v-icon>修改顶部标题</span>
          </v-expansion-panel-header>
          <v-divider class="mx-4"></v-divider>
          <v-expansion-panel-content>
            <v-form ref="titleForm" lazy-validation style="width: 100%;  margin: 1.5rem 0 0 0;">
              <v-text-field
                  v-model="title"
                  label="自定义标题"
                  :rules="titleRules"
                  :counter="15"
                  maxlength="15"
                  prepend-icon="mdi-format-title"
              ></v-text-field>
            </v-form>
            <v-btn color="orange darken-2" class="ma-2 white--text" :disabled="titleButtonDisabled" @click="titleSubmit">
              确 认
              <v-icon right dark> mdi-comment-edit-outline</v-icon>
            </v-btn>
            <v-switch
                class="float-right"
                v-model="hideFootValue"
                :label="switchLabel"
                color="success"
                :loading="warning"
                @change="hideFoot"
                :disabled="disabled"
                hide-details
            ></v-switch>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <!--订阅-->
    <Sub/>

    <!--站内留言-->
    <UserMessage/>

    <!--其他服务-->
    <Others/>

    <!--系统消息-->
    <SystemMessage/>
  </div>
</template>

<script>
import {post} from "@/utilis/request";
import {base64decode} from "crypto.js";
import Sub from "@/components/profiles/userInfo/Sub";
import MemberTime from "@/components/profiles/userInfo/MemberTime";
import Others from "@/components/profiles/userInfo/Others";
import UserMessage from "@/components/profiles/userInfo/UserMessage";
import ModifyPassword from "@/components/profiles/userInfo/modifyPassword";

const SystemMessage = () => import("@/components/profiles/userInfo/SystemMessage")

export default {
  name: "UserInfo",

  components: {ModifyPassword, UserMessage, Others, MemberTime, Sub, SystemMessage},

  data: () => ({
    avatarShow: false,

    hideFootValue: false,
    warning: false,
    switchLabel: '显示中',

    token: '',
    avatar: '',
    avatarPath: '',
    avatarLoading: false,
    avatarCardDisabled: false,
    avatarButtonDisabled: true,

    title: '',
    titleLoading: false,
    titleCardDisabled: false,
    titleButtonDisabled: true,
  }),

  created() {
    this.token = base64decode(localStorage.getItem('access_token')).toString()
  },

  computed: {
    disabled() {
      return !this.$store.state.userType
    },
    avatarUrl() {
      let avatar = this.$store.state.userInfo.avatar
      let cut = avatar.substring(avatar.length - 3)
      if (cut !== 'peg' && cut !== 'jpg' && cut !== 'png') {
        return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      } else {
        return this.$store.state.userInfo.avatar
      }
    },
    //title验证规则
    titleRules() {
      return [
        v => !!v || '请输入用户名',
        v => (v && v.length <= 15) || '标题最多15位',
      ]
    },
    //验证头像上传
    avatarRules() {
      return [
        value => !value || value.size < 100000 || '图片大小100KB以内!',
        value => !!value || '请选择图片',
      ]
    },
  },

  watch: {
    //监听title验证
    title: 'validateTitle',
    //监听avatar验证
    avatar: 'validateAvatar',
  },

  methods: {
    //title的验证方法 判断提交按钮是否可用
    validateTitle() {
      this.titleButtonDisabled = !this.$refs.titleForm.validate();
    },

    //avatar的验证方法
    validateAvatar() {
      this.avatarButtonDisabled = !this.$refs.avatarForm.validate();
    },

    //自带的change事件 赋值
    avatarChange(v) {
      this.avatar = v
    },

    //头像提交
    avatarSubmit() {
      this.avatarLoading = this.avatarCardDisabled = this.avatarButtonDisabled = true
      let formData = new FormData()
      formData.append('avatar', this.avatar)
      formData.append('avatarPath', localStorage.avatarPath)
      post('avatar', formData,
          {headers: {'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
          .then(response => {
            this.avatarLoading = this.avatarCardDisabled = this.avatarButtonDisabled = false
            if (response.status === 200) {
              localStorage.avatar = response.data.avatar
              localStorage.avatarPath = response.data.avatarPath
              this.avatarPath = localStorage.APP_URL + response.data.avatar
              this.$store.commit('userInfoMuta', {
                username: localStorage.username,
                avatar: this.avatarPath,
                title: localStorage.title
              })
              this.Message('info', response.data.message)
              //清空input
              this.$refs.avatarForm.reset()
            }
          })
          .catch(error => {
            this.Message('error', error)
            this.avatarLoading = this.avatarCardDisabled = this.avatarButtonDisabled = false
          })
    },

    //标题提交
    titleSubmit() {
      this.titleLoading = this.titleCardDisabled = this.titleButtonDisabled = true
      post('title', {title: this.title},
          {headers: {'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
          .then(response => {
            this.titleLoading = this.titleCardDisabled = this.titleButtonDisabled = false
            if (response.status === 200) {
              localStorage.setItem('title', response.data.title)
              this.$store.commit('userInfoMuta', {
                username: localStorage.username,
                avatar: localStorage.APP_URL + localStorage.avatar,
                title: response.data.title
              })
              this.Message('info', response.data.message)
              //清空input
              this.$refs.titleForm.reset()
            }
          })
          .catch(error => {
            this.Message('error', error)
            this.titleLoading = this.titleCardDisabled = this.titleButtonDisabled = false
          })
    },

    //hidefoot
    hideFootHandle() {
      if (this.$store.state.userType2 === 0) {
        this.switchLabel = '显示中'
        this.hideFootValue = false
      } else {
        this.switchLabel = '已隐藏'
        this.hideFootValue = true
      }
    },
    hideFoot(e) {
      //0显示，1隐藏
      this.warning = true
      post('hideFoot', {hideFoot: e}, {headers: {'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
          .then(response => {
            if (response.status === 200) {
              this.$store.commit('userType2Mutations', response.data.hideFoot)
              this.warning = false
              this.hideFootHandle()
            }
          })
          .catch(error => {
            this.warning = false
            this.hideFootValue = false
            this.switchLabel = '显示中'
            this.Message('error', error)
          })
    }
  },

  mounted() {
    this.hideFootHandle()
    this.avatarShow = localStorage.APP_URL + localStorage.avatar
    let cut = this.avatarShow.substring(this.avatarShow.length - 3)
    if (cut !== 'peg' && cut !== 'jpg' && cut !== 'png') {
      this.$store.commit('userInfoMuta', {
        username: localStorage.username,
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        title: localStorage.title,
      })
    } else {
      this.$store.commit('userInfoMuta', {
        username: localStorage.username,
        avatar: (localStorage.APP_URL + localStorage.avatar),
        title: localStorage.title,
      })
    }
    this.$store.commit('paginationMuta', {total: localStorage.getItem('total')})
  },
}
</script>