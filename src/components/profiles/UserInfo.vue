<template>
  <div>
    <!--显示头像-->
    <v-card
        class="my-6 mx-6 d-flex d-md-none"
        flat
    >
      <v-list-item two-line class="my-3" @click="$router.push('/info')">
        <v-list-item-avatar size="60">
          <v-avatar color="orange" size="60">
            <img :src="$store.state.userInfo.avatar" alt="$store.state.userInfo.username"/>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-truncate">{{ $store.state.userInfo.username }}</v-list-item-title>
          <v-list-item-subtitle v-if="$store.state.pagination.total">命盘总数：{{ $store.state.pagination.total }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <!--设置头像-->
    <v-card
        :disabled="avatarCardDisabled"
        :loading="avatarLoading"
        class="my-6 mx-6"
    >
      <template slot="progress">
        <v-progress-linear
            color="#FF5722"
            height="10"
            indeterminate
        ></v-progress-linear>
      </template>
      <v-card-title class="body-1">设置头像</v-card-title>

      <v-divider class="mx-4"></v-divider>

      <v-card-text>
        <template>
          <v-form ref="avatarForm" lazy-validation style="width: 100%">
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
        </template>
      </v-card-text>

      <v-card-actions>
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
      </v-card-actions>
    </v-card>
    <!--标题-->
    <v-card
        :disabled="titleCardDisabled"
        :loading="titleLoading"
        class="my-6 mx-6"
    >
      <template slot="progress">
        <v-progress-linear
            color="#FF5722"
            height="10"
            indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title class="body-1">修改顶部标题<span class="caption"></span></v-card-title>

      <v-divider class="mx-4"></v-divider>

      <v-card-text>
        <template>
          <v-form ref="titleForm" lazy-validation style="width: 100%">
            <v-text-field
                v-model="title"
                label="自定义标题"
                :rules="titleRules"
                :counter="15"
                maxlength="15"
                prepend-icon="mdi-format-title"
            ></v-text-field>
          </v-form>
        </template>
      </v-card-text>

      <v-card-actions>
        <v-btn
            color="orange darken-2"
            class="ma-2 white--text"
            :disabled="titleButtonDisabled"
            @click="titleSubmit"
        >
          确 认
          <v-icon
              right
              dark
          >
            mdi-comment-edit-outline
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <!--系统消息-->
    <SystemMessage/>
  </div>
</template>

<script>
import {post} from "@/utilis/request";
import {base64decode} from "crypto.js";

const SystemMessage = () => import("@/components/profiles/SystemMessage")

export default {
  name: "UserInfo",
  components: {SystemMessage},
  data: () => ({
    avatarShow: false,

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
    }
  },

  watch: {
    //监听title验证
    title: 'validateTitle',
    //监听avatar验证
    avatar: 'validateAvatar'
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
  },
  mounted() {
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