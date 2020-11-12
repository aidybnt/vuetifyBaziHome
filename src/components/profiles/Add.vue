<template>
  <div>
    <MingPanRules/>
    <!--命盘实时展示-->
    <v-row
        no-gutters
        style="min-height: 100px;
         position: -webkit-sticky !important;
         position: sticky !important;
         top: 75px !important;
         z-index: 2"
    >
      <v-col align-self="center">
        <v-card
            class="mx-6 text-center py-6 justify-center"
            color="#595757"
        >
          <v-card-text>
            <div class="d-flex justify-center align-center">
              <v-img :class="ma" :max-width="maxWidth" :src="timeGan"></v-img>
              <v-img :class="ma" :max-width="maxWidth" :src="dayGan"
                     style="box-shadow: 0 -2px 0 0 rgba(200,200,200,0.3) inset"></v-img>
              <v-img :class="ma" :max-width="maxWidth" :src="monthGan"></v-img>
              <v-img :class="ma" :max-width="maxWidth" :src="yearGan"></v-img>
            </div>
            <div class="d-flex justify-center align-center">
              <v-img :class="ma" :max-width="maxWidth" :src="timeZhi"></v-img>
              <v-img :class="ma" :max-width="maxWidth" :src="dayZhi"></v-img>
              <v-img :class="ma" :max-width="maxWidth" :src="monthZhi"></v-img>
              <v-img :class="ma" :max-width="maxWidth" :src="yearZhi"></v-img>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--    输入信息-->
    <v-card
        class="my-6 mx-6"
        min-height="100"
        :disabled="processing"
        :loading="processing"
    >
      <!--      进度条-->
      <template slot="progress">
        <v-progress-linear
            color="light-blue"
            height="10"
            indeterminate
        ></v-progress-linear>
      </template>
      <!--      数据录入-->
      <v-card-title class="red--text" v-if="$store.state.edit">
        <v-btn color="success" class="text-body-1">正在编辑命盘</v-btn>
        <v-divider class="ml-3"></v-divider>
      </v-card-title>
      <v-form>
        <v-card-text>
          <v-row>
            <!--性别-->
            <v-col cols="6" md="2">
              <v-select :items="sex" label="性别" v-model="formData.sex"></v-select>
            </v-col>
            <!--年-->
            <v-col cols="6" md="2">
              <v-select
                  v-model="formData.year"
                  :items="years()"
                  menu-props="auto"
                  @change="changeYear"
                  label="年"
              ></v-select>
            </v-col>
            <!--月-->
            <v-col cols="6" md="2">
              <v-select
                  v-model="formData.month"
                  :items="months()"
                  menu-props="auto"
                  @change="changeMonth"
                  label="月"
              ></v-select>
            </v-col>
            <!--日-->
            <v-col cols="6" md="2">
              <v-select
                  v-model="formData.day"
                  :items="days()"
                  menu-props="auto"
                  @change="changeDay"
                  label="日"
              ></v-select>
            </v-col>
            <!--时-->
            <v-col cols="6" md="2">
              <v-select
                  v-model="formData.hour"
                  :items="hours()"
                  menu-props="auto"
                  @change="changeHour"
                  label="时"
              ></v-select>
            </v-col>
            <!--分-->
            <v-col cols="6" md="2">
              <v-select
                  v-model="formData.minute"
                  :items="minutes()"
                  menu-props="auto"
                  @change="changeMinute"
                  label="分"
              ></v-select>
            </v-col>
            <!--称呼-->
            <v-col cols="6" md="3">
              <v-text-field
                  v-model="formData.call"
                  label="称呼"
              ></v-text-field>
            </v-col>
            <!--姓名-->
            <v-col cols="6" md="3">
              <v-text-field
                  v-model="formData.name"
                  label="姓名"
              ></v-text-field>
            </v-col>
            <!--出生地-->
            <v-col cols="8" md="3">
              <v-text-field
                  v-model="formData.born"
                  label="出生地"
              ></v-text-field>
            </v-col>
            <!--区域-->
            <v-col cols="4" md="3">
              <v-select
                  v-model="formData.area"
                  :items="areas"
                  label="区域"
                  clearable
              ></v-select>
            </v-col>
            <!--本命特征-->
            <v-col cols="12">
              <v-select
                  v-model="formData.type"
                  :items="types"
                  label="本命特征"
                  multiple
                  chips
                  deletable-chips
              ></v-select>
            </v-col>
            <!--备注信息-->
            <v-col cols="12">
              <v-textarea
                  v-model="formData.desc"
                  class="descClass"
                  name="input-7-4"
                  label="备注信息"
                  counter="1000"
                  auto-grow
                  rows="3"
                  row-height="48"
                  value=""
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text class="mb-3" @click="cancel">
            取 消
          </v-btn>
          <v-btn color="blue" text class="mb-3" @click="save">
            确 认
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
const MingPanRules = () => import("@/components/profiles/MingPanRules")
import {post} from "@/utilis/request";
import {base64decode} from 'crypto.js'

export default {
  name: "Add",

  components: {MingPanRules},

  data() {
    return {
      token: '',
      requestUrl: 'store',
      processing: false,
      maxWidth: '66px',
      ma: 'ma-1',

      //初始化
      today: '',
      years: '',
      months: '',
      days: '',
      hours: '',
      minutes: '',

      //各种实例
      solar: '',
      lunar: '',
      bazi: '',
      Yun: '',
      daYun: '',

      //八个字取值
      yearGan: '',
      yearZhi: '',
      monthGan: '',
      monthZhi: '',
      dayGan: '',
      dayZhi: '',
      timeGan: '',
      timeZhi: '',

      sex: ['男', '女'],
      types: [
        {text: '五行流通', value: [{text: '五行流通', color: 'success'}]},
        {text: '本命纯阳', value: [{text: '本命纯阳', color: 'success'}]},
        {text: '本命纯阴', value: [{text: '本命纯阴', color: 'success'}]},
        {text: '日主受克', value: [{text: '日主受克', color: 'error'}]},
        {text: '地支落空', value: [{text: '地支落空', color: 'error'}]},
        {text: '官克比劫', value: [{text: '官克比劫', color: 'orange'}]},
        {text: '比劫克财', value: [{text: '比劫克财', color: 'orange'}]},
        {text: '财星克印', value: [{text: '财星克印', color: 'orange'}]},
        {text: '印克食伤', value: [{text: '印克食伤', color: 'orange'}]},
        {text: '食伤克官', value: [{text: '食伤克官', color: 'orange'}]},
        {text: '官杀被合', value: [{text: '官杀被合', color: 'light-blue'}]},
        {text: '比劫被合', value: [{text: '比劫被合', color: 'light-blue'}]},
        {text: '财星被合', value: [{text: '财星被合', color: 'light-blue'}]},
        {text: '印星被合', value: [{text: '印星被合', color: 'light-blue'}]},
        {text: '食伤被合', value: [{text: '食伤被合', color: 'light-blue'}]},
        {text: '官杀过旺', value: [{text: '官杀过旺', color: 'pink'}]},
        {text: '比劫成林', value: [{text: '比劫成林', color: 'pink'}]},
        {text: '财星满盘', value: [{text: '财星满盘', color: 'pink'}]},
        {text: '印星过旺', value: [{text: '印星过旺', color: 'pink'}]},
        {text: '食伤过旺', value: [{text: '食伤过旺', color: 'pink'}]},
        {text: '本命无官', value: [{text: '本命无官', color: '#546E7A'}]},
        {text: '本命无印', value: [{text: '本命无印', color: '#546E7A'}]},
        {text: '本命无比', value: [{text: '本命无比', color: '#546E7A'}]},
        {text: '本命无食', value: [{text: '本命无食', color: '#546E7A'}]},
        {text: '本命无财', value: [{text: '本命无财', color: '#546E7A'}]},
      ],
      areas: ['大陆', '台湾', '美国', '加拿大', '英国', '法国', '日本', '韩国', '印度', '东南亚', '海外其他'],

      formData: {
        sex: '男',
        area: '',
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
        name: '',
        call: '陈平安',
        born: '',
        type: [],
        desc: '',
        id: '',
        baZiTime: '',
      },
    }
  },

  created() {
    //解密token和id
    this.formData.id = base64decode(localStorage.getItem('id')).toString()
    this.token = base64decode(localStorage.getItem('access_token')).toString()
    //年
    this.years = function () {
      return Array.from(new Array(2099 + 1).keys()).slice(1901)
    }
    //月
    this.months = function () {
      return Array.from(new Array(12 + 1).keys()).slice(1)
    }
    //日
    this.days = function () {
      return Array.from(new Array(31 + 1).keys()).slice(1)
    }
    //小时
    this.hours = function () {
      return Array.from(new Array(23 + 1).keys()).slice(0)
    }
    //分钟
    this.minutes = function () {
      return Array.from(new Array(59 + 1).keys()).slice(0)
    }
    //默认时间
    this.today = this.Solar.fromDate(new Date())
    //页面渲染 默认
    this.formData.year = this.today.getYear()
    this.formData.month = this.today.getMonth()
    this.formData.day = this.today.getDay()
    this.formData.hour = this.today.getHour()
    this.formData.minute = this.today.getMinute()
    //接收编辑数据
    let formData = JSON.parse(localStorage.getItem('editData'))
    if (formData !== null) {
      this.formData = formData
      this.formData.year = parseInt(formData.year)
      this.formData.month = parseInt(formData.month)
      this.formData.day = parseInt(formData.day)
      this.formData.hour = parseInt(formData.hour)
      this.formData.minute = parseInt(formData.minute)
      this.formData.type = eval(formData.type)
      this.requestUrl = 'edit'
    }
  },

  watch: {
    //计算默认称呼
    'formData.sex': function () {
      if (this.formData.sex === '女') {
        this.formData.call = '陈美满'
      } else {
        this.formData.call = '陈平安'
      }
    },
  },

  methods: {
    //开始计算八字
    computeBaZi() {
      this.solar = this.Solar.fromYmdHms(
          this.formData.year,
          this.formData.month,
          this.formData.day,
          this.formData.hour,
          this.formData.minute,
          0)
      this.lunar = this.solar.getLunar()
      return this.lunar
    },
    //改变年
    changeYear() {
      this.yearGan = this.GetImg(this.computeBaZi().getYearGanByLiChun())
      this.yearZhi = this.GetImg(this.computeBaZi().getYearZhiByLiChun())
      this.monthGan = this.GetImg(this.computeBaZi().getMonthGanExact())
      this.monthZhi = this.GetImg(this.computeBaZi().getMonthZhiExact())
      this.dayGan = this.GetImg(this.computeBaZi().getDayGanExact())
      this.dayZhi = this.GetImg(this.computeBaZi().getDayZhiExact())
      this.timeGan = this.GetImg(this.computeBaZi().getTimeGan())
      this.timeZhi = this.GetImg(this.computeBaZi().getTimeZhi())
    },
    //改变月
    changeMonth() {
      this.yearGan = this.GetImg(this.computeBaZi().getYearGanByLiChun())
      this.yearZhi = this.GetImg(this.computeBaZi().getYearZhiByLiChun())
      this.monthGan = this.GetImg(this.computeBaZi().getMonthGanExact())
      this.monthZhi = this.GetImg(this.computeBaZi().getMonthZhiExact())
      this.dayGan = this.GetImg(this.computeBaZi().getDayGanExact())
      this.dayZhi = this.GetImg(this.computeBaZi().getDayZhiExact())
      this.timeGan = this.GetImg(this.computeBaZi().getTimeGan())
      this.timeZhi = this.GetImg(this.computeBaZi().getTimeZhi())
    },
    //改变日
    changeDay() {
      this.yearGan = this.GetImg(this.computeBaZi().getYearGanByLiChun())
      this.yearZhi = this.GetImg(this.computeBaZi().getYearZhiByLiChun())
      this.monthGan = this.GetImg(this.computeBaZi().getMonthGanExact())
      this.monthZhi = this.GetImg(this.computeBaZi().getMonthZhiExact())
      this.dayGan = this.GetImg(this.computeBaZi().getDayGanExact())
      this.dayZhi = this.GetImg(this.computeBaZi().getDayZhiExact())
      this.timeGan = this.GetImg(this.computeBaZi().getTimeGan())
      this.timeZhi = this.GetImg(this.computeBaZi().getTimeZhi())
    },
    //改变时
    changeHour() {
      this.yearGan = this.GetImg(this.computeBaZi().getYearGanByLiChun())
      this.yearZhi = this.GetImg(this.computeBaZi().getYearZhiByLiChun())
      this.monthGan = this.GetImg(this.computeBaZi().getMonthGanExact())
      this.monthZhi = this.GetImg(this.computeBaZi().getMonthZhiExact())
      this.dayGan = this.GetImg(this.computeBaZi().getDayGanExact())
      this.dayZhi = this.GetImg(this.computeBaZi().getDayZhiExact())
      this.timeGan = this.GetImg(this.computeBaZi().getTimeGan())
      this.timeZhi = this.GetImg(this.computeBaZi().getTimeZhi())
    },
    //改变分
    changeMinute() {
      this.yearGan = this.GetImg(this.computeBaZi().getYearGanByLiChun())
      this.yearZhi = this.GetImg(this.computeBaZi().getYearZhiByLiChun())
      this.monthGan = this.GetImg(this.computeBaZi().getMonthGanExact())
      this.monthZhi = this.GetImg(this.computeBaZi().getMonthZhiExact())
      this.dayGan = this.GetImg(this.computeBaZi().getDayGanExact())
      this.dayZhi = this.GetImg(this.computeBaZi().getDayZhiExact())
      this.timeGan = this.GetImg(this.computeBaZi().getTimeGan())
      this.timeZhi = this.GetImg(this.computeBaZi().getTimeZhi())
    },
    //提交表单
    save() {
      this.processing = true
      this.formData.baZiTime = this.formData.year + '-' + this.formData.month + '-' + this.formData.day + ' ' + this.formData.hour + ':' + this.formData.minute
      post('mingpan/' + this.requestUrl,
          this.formData,
          {headers: {'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
          .then(response => {
            this.processing = false
            if (response.status === 200) {
              this.Message('success', response.data.message)
              //如果第一次进入，没有数据，直接跳转
              if (localStorage.getItem('tableData') === null) {
                this.$router.push('/list')
              }
              //如果已经有数据，并且是新增数据
              else if (!this.$store.state.edit) {
                //新数据压入tableData
                let tableDta = JSON.parse(localStorage.getItem('tableData'))
                tableDta.splice(14, 1)
                tableDta.unshift(JSON.parse(response.data.data))
                localStorage.setItem('tableData', JSON.stringify(tableDta))
                //命盘总数+1
                this.$store.commit('paginationMuta', {total: Number(this.$store.state.pagination.total) + 1})
                let total = Number(localStorage.getItem('total'))
                total = total + 1
                localStorage.setItem('total', total)
              } else {
                //如果是修改数据
                let index = parseInt(localStorage.getItem('editedIndex'))
                let tableData = JSON.parse(localStorage.getItem('tableData'))
                tableData.splice(index, 1, response.data.data)
                localStorage.setItem('tableData', JSON.stringify(tableData))
              }
              this.$router.push('/list')
            }
          })
          .catch(error => {
            this.Message('error', error)
            this.processing = false
          })
    },
    cancel() {
      this.$router.push('/list')
      this.$store.commit('editMuta', {edit: false})
    },
  },

  mounted() {
    //初始化
    this.yearGan = this.GetImg(this.computeBaZi().getYearGanByLiChun())
    this.yearZhi = this.GetImg(this.computeBaZi().getYearZhiByLiChun())
    this.monthGan = this.GetImg(this.computeBaZi().getMonthGanExact())
    this.monthZhi = this.GetImg(this.computeBaZi().getMonthZhiExact())
    this.dayGan = this.GetImg(this.computeBaZi().getDayGanExact())
    this.dayZhi = this.GetImg(this.computeBaZi().getDayZhiExact())
    //hour
    this.timeGan = this.GetImg(this.computeBaZi().getTimeGan())
    this.timeZhi = this.GetImg(this.computeBaZi().getTimeZhi())
    //minute
    this.timeGan = this.GetImg(this.computeBaZi().getTimeGan())
    this.timeZhi = this.GetImg(this.computeBaZi().getTimeZhi())
  },

  beforeRouteLeave(to, from, next) {
    //离开页面移除编辑
    this.$store.commit('editMuta', {edit: false})
    localStorage.removeItem('editData')
    next()
  },

  beforeRouteEnter(to, from, next) {
    if (typeof localStorage.getItem('access_token') === 'string') {
      if (localStorage.getItem('access_token') === 'null') {
        next('/')
      }
      if (localStorage.getItem('access_token') === '') {
        next('/')
      }
      if (localStorage.getItem('access_token') === 'undefined') {
        next('/')
      }
      next()
    } else {
      next('/')
    }
  }
}
</script>

<style scoped>
>>> .descClass textarea {
  padding: 9px 0 9px 0;
  letter-spacing: 2px !important;
}
</style>