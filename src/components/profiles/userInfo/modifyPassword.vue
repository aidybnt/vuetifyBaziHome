<template>
  <v-card class="my-6 mx-6" :disabled="cardDisabled" :loading="loading">
    <template slot="progress">
      <v-progress-linear color="#FF5722" height="10" indeterminate></v-progress-linear>
    </template>
    <v-expansion-panels accordion hover>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span><v-icon color="info" class="mr-3">mdi-form-textbox-password</v-icon>修改密码</span>
        </v-expansion-panel-header>
        <v-divider class="mx-4"></v-divider>
        <v-expansion-panel-content>
          <v-form ref="form" lazy-validation style="width: 100%;  margin: 1.5rem 0 0 0;">
            <v-text-field :rules="passRules" v-model="subData.password" label="输入原密码" type="password" :counter="30" maxlength="30"
                          prepend-icon="mdi-form-textbox-password"></v-text-field>
            <v-text-field :rules="passRules" v-model="subData.resetPassword" label="输入新密码" type="password" :counter="30" maxlength="30"
                          prepend-icon="mdi-form-textbox-password"></v-text-field>
          </v-form>
          <v-btn color="orange darken-2" class="ma-2 white--text" @click="save"> 确 认
            <v-icon right dark> mdi-comment-edit-outline</v-icon>
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import {post} from "@/utilis/request";
import {base64decode} from "crypto.js";

export default {
  name: "modifyPassword",

  data() {
    return {
      cardDisabled: false,
      loading: false,
      subData: {
        password: '',
        resetPassword: '',
      },
      passRules: [
        v => !!v || '不能为空',
      ],
    }
  },

  methods: {
    save() {
      if (!this.$refs.form.validate()) {
        return false
      }
      this.cardDisabled = this.loading = true
      post('resetPassword', this.subData, {
        headers: {
          'Authorization': 'Bearer ' + base64decode(localStorage.getItem('access_token')).toString(),
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
          .then(response => {
            this.cardDisabled = this.loading = false
            this.Message('info', response.data.message)
            this.$router.push('/')
          })
          .catch(error => {
            this.cardDisabled = this.loading = false
            this.Message('info', error)
          })
    }
  },

}
</script>

<style scoped>

</style>