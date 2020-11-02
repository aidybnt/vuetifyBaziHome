<template>
  <v-app>
    <Header/>
    <!--    本命-->
    <div class="stickyTop">
      <v-row no-gutters>
        <!--        出生时间-->
        <v-col cols="12" style="background-color:#595757;">
          <v-card class="mx-6">
            <Eldivider :baziTime="baziTime"/>
          </v-card>
        </v-col>
        <!--        本命展示-->
        <v-col cols="12">
          <v-card elevation="12" flat class="mx-6 pt-3 pb-6">
            <div class="d-flex justify-center align-center">
              <v-img :class="ma" :max-width="maxWidth" :src="timeGan"></v-img>
              <v-img :class="ma" :max-width="maxWidth" :src="dayGan"
                     style="box-shadow: 0 -2px 0 0 rgba(200,200,200,0.3) inset"></v-img>
              <v-img :class="ma" :max-width="maxWidth" :src="monthGan"></v-img>
              <v-img :class="ma" :max-width="maxWidth" :src="yearGan"></v-img>
              <v-divider v-show="isShowDivider" vertical class="mx-2"></v-divider>
              <v-img v-show="isShowDaYun" :class="ma" :max-width="maxWidth" :src="myDaYunGan"></v-img>
              <v-img v-show="isShowLiuNian" :class="ma" :max-width="maxWidth" :src="myLiuNianGan"></v-img>
              <v-img v-show="isShowLiuYue" :class="ma" :max-width="maxWidth" :src="myLiuYueGan"></v-img>
              <v-img v-show="isShowLiuRi" :class="ma" :max-width="maxWidth" :src="myLiuRiGan"></v-img>
              <v-img v-show="isShowLiuShi" :class="ma" :max-width="maxWidth" :src="myLiuShiGan"></v-img>
            </div>
            <div class="d-flex justify-center align-center">
              <v-img :class="ma" :max-width="maxWidth" :src="timeZhi"></v-img>
              <v-img :class="ma" :max-width="maxWidth" :src="dayZhi"></v-img>
              <v-img :class="ma" :max-width="maxWidth" :src="monthZhi"></v-img>
              <v-img :class="ma" :max-width="maxWidth" :src="yearZhi"></v-img>
              <v-divider v-show="isShowDivider" vertical class="mx-2"></v-divider>
              <v-img v-show="isShowDaYun" :class="ma" :max-width="maxWidth" :src="myDaYunZhi"></v-img>
              <v-img v-show="isShowLiuNian" :class="ma" :max-width="maxWidth" :src="myLiuNianZhi"></v-img>
              <v-img v-show="isShowLiuYue" :class="ma" :max-width="maxWidth" :src="myLiuYueZhi"></v-img>
              <v-img v-show="isShowLiuRi" :class="ma" :max-width="maxWidth" :src="myLiuRiZhi"></v-img>
              <v-img v-show="isShowLiuShi" :class="ma" :max-width="maxWidth" :src="myLiuShiZhi"></v-img>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <!--    其他展示-->
    <v-main>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card class="ma-6">
            <v-expansion-panels multiple hover v-model="panel" style="margin-bottom: 210px">
              <!--大运-->
              <v-expansion-panel class="noRadius">
                <v-expansion-panel-header class="font1" color="#595757" @click="daYunHeadClick">
                  运
                  <span style="text-align: center;" v-show="huanYunTimeShow">
                  出生后{{ this.qiYunTime.year }}{{ this.qiYunTime.month }}{{ this.qiYunTime.day }}起运 公历:{{ this.qiYunTime.date }}
                </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content color="#595757" class="font1">
                  <v-card flat class="mx-6 py-3 imgPointer">
                    <div class="d-flex justify-center align-center">
                      <v-tooltip top v-for="(item,index) in this.daYunGanZhiImg" :key="index">
                        <template v-slot:activator="{ on, attrs }">
                          <v-hover v-slot="{ hover }">
                            <v-card
                                style="cursor: pointer;"
                                :style="{display: first(index)}"
                                :elevation="hover ? 3 : 0" class="mx-1" v-bind="attrs" v-on="on" @click="daYunClick(item,index)">
                              <v-img :class="ma" :max-width="maxWidthDaYun" :src="item.gan"></v-img>
                              <v-img :class="ma" :max-width="maxWidthDaYun" :src="item.zhi"></v-img>
                            </v-card>
                          </v-hover>
                        </template>
                        <span>{{ item.startAge }}-{{ item.startYear }}</span>
                      </v-tooltip>
                    </div>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!--流年-->
              <v-expansion-panel class="noRadius">
                <v-expansion-panel-header class="font1" color="#595757">
                  年
                </v-expansion-panel-header>
                <v-expansion-panel-content color="#595757">
                  <v-card flat class="mx-6 py-3 imgPointer">
                    <div class="d-flex justify-center align-center">
                      <v-tooltip top v-for="(item,index) in this.liuNianGanZhiImg" :key="index">
                        <template v-slot:activator="{ on, attrs }">
                          <v-hover v-slot="{ hover }">
                            <v-card @click="liuNianClick(item,index)" :elevation="hover ? 3 : 0" class="mx-1" v-bind="attrs" v-on="on"
                                    style="cursor: pointer">
                              <v-img :class="ma" :max-width="maxWidthLiuNian" :src="item.gan"></v-img>
                              <v-img :class="ma" :max-width="maxWidthLiuNian" :src="item.zhi"></v-img>
                            </v-card>
                          </v-hover>
                        </template>
                        <span>{{ item.age }}-{{ item.year }}</span>
                      </v-tooltip>
                    </div>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!--流月-->
              <v-expansion-panel class="noRadius">
                <v-expansion-panel-header class="font1" color="#595757">
                  月
                </v-expansion-panel-header>
                <v-expansion-panel-content color="#595757">
                  <v-card flat class="mx-6 py-3 imgPointer">
                    <div class="d-flex justify-center align-center">
                      <v-tooltip top v-for="(item,index) in this.liuYueGanZhiImg" :key="index">
                        <template v-slot:activator="{ on, attrs }">
                          <v-hover v-slot="{ hover }">
                            <v-card @click="liuYueClick(item,index)" :elevation="hover ? 3 : 0" class="mx-1" v-bind="attrs" v-on="on" style="cursor: pointer">
                              <v-img :class="mLiuYue" :max-width="maxWidthLiuYue" :src="item.gan"></v-img>
                              <v-img :class="mLiuYue" :max-width="maxWidthLiuYue" :src="item.zhi"></v-img>
                            </v-card>
                          </v-hover>
                        </template>
                        <span>{{ item.jie }}</span>
                      </v-tooltip>
                    </div>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!--流日-->
              <v-expansion-panel class="noRadius">
                <v-expansion-panel-header class="font1" color="#595757" @click="liuRiHeadClick">
                  日
                  <div style="text-align:center" v-show="kuaJieNianShow" v-if="this.liuRiYearMonth.year">
                    注意跨节与跨年
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content color="#595757">
                  <v-banner
                      v-show="this.liuRiYearMonth.year"
                      class="text-center mb-3 body-2"
                      color="white--text"
                      style="padding: 0"
                  >
                    <v-btn :disabled="preMonthDisable" @click="preMonth" outlined small color="white">上 月</v-btn>
                    <span class="d-inline-block mx-3">公历:{{ this.liuRiYearMonth.year }}年{{ this.liuRiYearMonth.month }}月</span>
                    <v-btn :disabled="nextMonthDisable" @click="nextMonth" outlined small color="white">下 月</v-btn>
                  </v-banner>
                  <v-row no-gutters>
                    <v-col cols="3" md="1" v-for="(item,index) in this.liuRi" :key="index">
                      <v-hover v-slot="{ hover }">
                        <v-card flat class="mx-6 py-3 imgPointer">
                          <div class="d-flex justify-center align-center">
                            <v-badge
                                :value="item.jie"
                                color="success"
                                :content="item.jie"
                                overlap
                            >
                              <v-card @click="liuRiClick(item)"
                                      :elevation="hover ? 3 : 0"
                                      class="mx-1 text-center overline"
                                      style="cursor: pointer">

                                {{ item.day }}
                                <v-img class="mx-2" :max-width="maxWidthLiuRi" :src="item.gan"></v-img>
                                <v-img class="mx-2" :max-width="maxWidthLiuRi" :src="item.zhi"></v-img>
                              </v-card>
                            </v-badge>
                          </div>
                        </v-card>
                      </v-hover>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!--流时-->
              <v-expansion-panel class="noRadius">
                <v-expansion-panel-header class="font1" color="#595757">
                  时
                </v-expansion-panel-header>
                <v-expansion-panel-content color="#595757">
                  <v-card flat class="mx-6 py-3 imgPointer">
                    <div class="d-flex justify-center align-center">
                      <v-hover v-slot="{ hover }" v-for="(item,index) in this.liuShi" :key="index">
                        <v-card @click="liuShiClick(item)" :elevation="hover ? 3 : 0" class="mx-1" style="cursor: pointer">
                          <v-img :class="mLiuYue" :max-width="maxWidthLiuYue" :src="item.gan"></v-img>
                          <v-img :class="mLiuYue" :max-width="maxWidthLiuYue" :src="item.zhi"></v-img>
                        </v-card>
                      </v-hover>
                    </div>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <Foot/>
  </v-app>
</template>

<script>
const Foot = () => import("@/common/Foot")
const Header = () => import("@/components/profiles/Header")
const Eldivider = () => import("@/components/show/Eldivider")

export default {
  name: "Show",

  components: {Eldivider, Header, Foot},

  data() {
    return {
      //各种实例
      solar: '',
      lunar: '',
      bazi: '',
      Yun: '',
      daYun: '',

      //初始化
      baziTime: {
        //这个没有一岁起运
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
        //带一岁起运
        // year: 2019,
        // month: 12,
        // day: 7,
        // hour: 23,
        // minute: 1,
      },
      daYunGanZhiImg: [],
      qiYunTime: {
        year: '',
        month: '',
        day: '',
        date: '',
      },

      //本命
      yearGan: '',
      yearZhi: '',
      monthGan: '',
      monthZhi: '',
      dayGan: '',
      dayZhi: '',
      timeGan: '',
      timeZhi: '',

      //计算图片尺寸
      maxWidth: '',
      maxWidthDaYun: '',
      maxWidthLiuNian: '',
      maxWidthLiuYue: '',
      maxWidthLiuRi: '',

      //大运数组
      daYunArr: [],
      startAge: [],
      startYear: [],

      //流年数组
      jie: ['立春', '惊蛰', '清明', '立夏', '芒种', '小暑', '立秋', '白露', '寒露', '立冬', '大雪', '小寒'],
      liuNian: [],
      liuNianGanZhiImg: [],

      //流月数组
      liuYue: [],
      liuYueGanZhiImg: [],

      //流日数组
      liuRi: {},
      liuRiGanZhiImg: [],
      liuRiYearMonth: {
        year: '',
        month: '',
      },

      //流时数组
      liuShi: [],

      //各种状态 显示换运时间
      huanYunTimeShow: false,
      kuaJieNianShow: false,

      isShowDivider: false,
      isShowDaYun: false,
      isShowLiuNian: false,
      isShowLiuYue: false,
      isShowLiuRi: false,
      isShowLiuShi: false,

      preMonthDisable: false,
      nextMonthDisable: false,

      //保存状态 便于切换清空后面的
      daYunIndex: '',
      liuNianIndex: '',
      liuYueIndex: '',
      currentYear: '',

      //本命显示 大运 年 月 日 时
      myDaYunGan: '',
      myDaYunZhi: '',
      myLiuNianGan: '',
      myLiuNianZhi: '',
      myLiuYueGan: '',
      myLiuYueZhi: '',
      myLiuRiGan: '',
      myLiuRiZhi: '',
      myLiuShiGan: '',
      myLiuShiZhi: '',

      panel: [],
    }
  },

  created() {
    //如果没有数据返回列表
    if (!this.$store.state.showData.year) {
      this.$router.push('/list')
    }

    this.baziTime.year = this.$store.state.showData.year
    this.baziTime.month = this.$store.state.showData.month
    this.baziTime.day = this.$store.state.showData.day
    this.baziTime.hour = this.$store.state.showData.hour
    this.baziTime.minute = this.$store.state.showData.minute

    //开始计算八字
    this.solar = this.Solar.fromYmdHms(this.baziTime.year, this.baziTime.month, this.baziTime.day, this.baziTime.hour, this.baziTime.minute, 0)
    this.lunar = this.solar.getLunar() //阴历实例
    this.bazi = this.lunar.getEightChar() //八字实例
    this.Yun = this.bazi.getYun(1)  //1男 运实例
    this.daYun = this.Yun.getDaYun() //得到所有大运(包含大运，流年，流月）实例

    //大运转换成新数组
    for (let i = 0, j = this.daYun.length; i < j; i++) {
      let d = this.daYun[i];
      this.startAge.push(d.getStartAge())
      this.startYear.push(d.getStartYear())
      this.daYunArr.push(d.getGanZhi())
    }

    let self = this
    //文字转换成图像，变成新数组
    this.daYunGanZhiImg = this.daYunArr.map(function (item, index) {
      let newObj = {}
      newObj.gan = self.GetImg(item.substr(0, 1))
      newObj.zhi = self.GetImg(item.substr(1, 1))
      newObj.startAge = self.startAge[index]
      newObj.startYear = self.startYear[index]
      return newObj
    })

    //计算起运时间
    if (this.Yun.getStartYear() > 0) {
      this.qiYunTime.year = this.Yun.getStartYear() + '年'
    }
    if (this.Yun.getStartMonth() > 0) {
      this.qiYunTime.month = this.Yun.getStartMonth() + '月'
    }
    if (this.Yun.getStartDay() > 0) {
      this.qiYunTime.day = this.Yun.getStartDay() + '日'
    }

    //起运公历
    this.qiYunTime.date = this.Yun.getStartSolar().toYmd()
  },

  computed: {
    //计算margin
    ma: function () {
      return this.$vuetify.breakpoint.xs ? 'ma-1' : 'ma-2'
    },
    mLiuYue: function () {
      return this.$vuetify.breakpoint.xs ? 'mLiuYue' : 'ma-2'
    }
  },

  watch: {
    //监听图片高度
    '$vuetify.breakpoint.name': 'maxHeightImg',
    //切换大运，清空 年 月等后面的显示
    daYunIndex: function () {
      this.myLiuNianGan = ''
      this.myLiuNianZhi = ''
      this.myLiuYueGan = ''
      this.myLiuYueZhi = ''
      this.isShowLiuNian = false
      this.isShowLiuYue = false
    },
    liuNianIndex: function () {
      this.myLiuYueGan = ''
      this.myLiuYueZhi = ''
      this.isShowLiuYue = false
    }
  },

  methods: {
    //隐藏大运第一个
    first(index) {
      if (index === 0) {
        return 'none'
      }
    },
    //计算图片宽度
    maxHeightImg() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          this.maxWidth = '21px'
          this.maxWidthDaYun = '18px'
          this.maxWidthLiuNian = '15px'
          this.maxWidthLiuYue = '15px'
          this.maxWidthLiuRi = '15px'
          break
        case "sm":
          this.maxWidth = '42px'
          this.maxWidthDaYun = '36px'
          this.maxWidthLiuNian = '30px'
          this.maxWidthLiuYue = '24px'
          this.maxWidthLiuRi = '18px'
          break
        case "md":
          this.maxWidth = '72px'
          this.maxWidthDaYun = '48px'
          this.maxWidthLiuNian = '36px'
          this.maxWidthLiuYue = '30px'
          this.maxWidthLiuRi = '24px'
          break
        case "lg":
          this.maxWidth = '100px'
          this.maxWidthDaYun = '65px'
          this.maxWidthLiuNian = '54px'
          this.maxWidthLiuYue = '42px'
          this.maxWidthLiuRi = '30px'
          break
        case "xl":
          this.maxWidth = '120px'
          this.maxWidthDaYun = '75px'
          this.maxWidthLiuNian = '60px'
          this.maxWidthLiuYue = '48px'
          this.maxWidthLiuRi = '36px'
          break
        default:
          this.maxWidth = '21px'
          this.maxWidthDaYun = '72px'
          this.maxWidthLiuNian = '60px'
          this.maxWidthLiuYue = '60px'
          this.maxWidthLiuRi = '18px'
      }
    },
    //点击大运折叠面板head显示起运时间
    daYunHeadClick() {
      this.huanYunTimeShow = !this.huanYunTimeShow;
    },
    //点击大运展示 同时计算流年 月 日 时 要清掉
    daYunClick(item, index) {
      this.daYunIndex = index
      this.isShowDivider = true
      this.isShowDaYun = true
      this.myDaYunGan = item.gan
      this.myDaYunZhi = item.zhi

      this.isShowLiuYue = false
      this.isShowLiuRi = false
      this.isShowLiuShi = false
      this.liuYueGanZhiImg = {}
      this.liuRi = {}
      this.liuRiYearMonth = {}
      this.liuShi = []

      this.computeLiuNian(index)
    },
    //计算流年 通过大运传过来index============================================
    computeLiuNian(index) {
      let self = this
      this.liuNian = this.daYun[index].getLiuNian()
      let liuNianYearArr = []
      let liuNianAgeArr = []
      let liuNianGanZhiArr = []
      //计算大运匹配的流年流月 转换新数组
      for (let i = 0, j = this.liuNian.length; i < j; i++) {
        let d = this.liuNian[i];
        liuNianYearArr.push(d.getYear())
        liuNianAgeArr.push(d.getAge())
        liuNianGanZhiArr.push(d.getGanZhi())
      }
      //转换成可循环图像
      this.liuNianGanZhiImg = liuNianGanZhiArr.map(function (item, index) {
        let newObj = {}
        newObj.gan = self.GetImg(item.substr(0, 1))
        newObj.zhi = self.GetImg(item.substr(1, 1))
        newObj.year = liuNianYearArr[index]
        newObj.age = liuNianAgeArr[index]
        return newObj
      })
    },
    //点击流年展示 同时计算流月 清掉 日 时
    liuNianClick(item, index) {
      this.liuNianIndex = index
      this.isShowLiuNian = true
      this.myLiuNianGan = item.gan
      this.myLiuNianZhi = item.zhi

      this.isShowLiuYue = false
      this.isShowLiuRi = false
      this.isShowLiuShi = false
      this.liuRi = {}
      this.liuRiYearMonth = {}
      this.liuShi = []

      this.computeLiuYue(index, item)
    },
    //计算流月 通过流年传过来index============================================
    computeLiuYue(index, item) {
      let self = this
      this.liuYue = this.liuNian[index].getLiuYue()
      let year = []
      let liuYueGanZhiArr = []
      let liuYueIndex = []
      let liuYueMonthInChinese = []
      for (let i = 0, j = this.liuYue.length; i < j; i++) {
        let d = this.liuYue[i]
        liuYueGanZhiArr.push(d.getGanZhi())
        liuYueIndex.push(d.getIndex())
        liuYueMonthInChinese.push(d.getMonthInChinese())
        year.push(item.year)
      }
      //转换成图像
      this.liuYueGanZhiImg = liuYueGanZhiArr.map(function (item, index) {
        let newObj = {}
        newObj.gan = self.GetImg(item.substr(0, 1))
        newObj.zhi = self.GetImg(item.substr(1, 1))
        newObj.index = liuYueIndex[index]
        newObj.jie = self.jie[index]
        newObj.year = year[index]
        newObj.MonthInChinese = liuYueMonthInChinese[index]
        return newObj
      })
    },
    //点击流月展示 同时计算流日 清掉时
    liuYueClick(item, index) {
      this.isShowLiuRi = false
      this.isShowLiuShi = false
      this.liuRi = {}
      this.liuRiYearMonth = {}
      this.liuShi = []

      this.isShowLiuYue = true
      this.myLiuYueGan = item.gan
      this.myLiuYueZhi = item.zhi
      //把年月存一下
      this.currentYear = item.year
      //计算流日
      this.computeLiuRi(item, index)
    },
    //计算流日    ==========================================================
    computeLiuRi(item, index, next) {
      let y = item.year
      let m = index + 2
      if (m > 12) {
        m = 1
        y = y + 1
      }
      //下一个月按钮逻辑
      if (next == 1) {
        if (m == 12) {
          m = 1
          y = y + 1
        } else {
          m = m + next
        }
      }
      //上一个月按钮逻辑
      if (next == -1) {
        if (m == 1) {
          m = 12
          y = y - 1
        } else {
          m = m + next
        }
      }
      //下一个月的按钮逻辑 第二年的立春月禁止
      if (m == 2 && y > this.currentYear) {
        this.nextMonthDisable = true
      } else {
        this.nextMonthDisable = false
      }
      //上个月的按钮逻辑 当年的立春月禁止点击
      if (m == 2 && y == this.currentYear) {
        this.preMonthDisable = true
      } else {
        this.preMonthDisable = false
      }

      this.liuRiYearMonth.year = y
      this.liuRiYearMonth.month = m

      let self = this
      let d = this.SolarMonth.fromYm(y, m);
      let days = d.getDays()
      let everyDay = []
      let dayLunar = []
      let jie = []
      let lunarFestivals = []
      let dGan = []
      let dZhi = []
      for (let i = 0, j = days.length; i < j; i++) {
        let d = days[i]
        let dl = d.getLunar() //阴历对象
        let dg = dl.getDayGan()
        let dz = dl.getDayZhi()
        let lf = dl.getFestivals(); //阴历节日
        let j = dl.getJie() //节
        everyDay.push(d.getDay())
        dayLunar.push(dl)
        jie.push(j)
        lunarFestivals.push(lf)
        dGan.push(dg)
        dZhi.push(dz)
      }
      this.liuRi = jie.map(function (item, index) {
        let newObj = {}
        newObj.jie = item
        newObj.day = everyDay[index]
        newObj.lf = lunarFestivals[index]
        newObj.gan = self.GetImg(dGan[index])
        newObj.zhi = self.GetImg(dZhi[index])
        newObj.year = d.getYear()
        newObj.month = d.getMonth()
        return newObj
      })
    },
    //上一个月
    preMonth() {
      let pre = -1
      this.liuRiYearMonth.month = this.liuRiYearMonth.month - 2
      this.computeLiuRi(this.liuRiYearMonth, this.liuRiYearMonth.month, pre)
    },
    //下一个月
    nextMonth() {
      let next = 1
      this.liuRiYearMonth.month = this.liuRiYearMonth.month - 2
      this.computeLiuRi(this.liuRiYearMonth, this.liuRiYearMonth.month, next)
    },
    //点击流日折叠面板Head显示和隐藏提示
    liuRiHeadClick() {
      this.kuaJieNianShow = !this.kuaJieNianShow
    },
    //流日点击 同时计算流时
    liuRiClick(item) {
      this.isShowLiuShi = false

      this.isShowLiuRi = true
      this.myLiuRiGan = item.gan
      this.myLiuRiZhi = item.zhi

      this.computeLiuShi(item)
    },
    //计算流时
    computeLiuShi(item) {
      let self = this
      let shiChen = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
      let gan = []
      let zhi = []
      for (let i = 0, j = shiChen.length; i < j; i++) {
        let solar = this.Solar.fromYmdHms(item.year, item.month, item.day, shiChen[i], 0, 0)
        let l = solar.getLunar()
        gan.push(l.getTimeGan())
        zhi.push(l.getTimeZhi())
      }
      this.liuShi = gan.map(function (item, index) {
        let newObj = {}
        newObj.gan = self.GetImg(item)
        newObj.zhi = self.GetImg(zhi[index])
        return newObj
      })
    },
    //流时点击
    liuShiClick(item) {
      this.isShowLiuShi = true
      this.myLiuShiGan = item.gan
      this.myLiuShiZhi = item.zhi
    }
  },

  mounted() {
    //计算图片高度
    this.maxHeightImg()
    //初始化
    this.yearGan = this.GetImg(this.lunar.getYearGanByLiChun())
    this.yearZhi = this.GetImg(this.lunar.getYearZhiByLiChun())
    this.monthGan = this.GetImg(this.lunar.getMonthGanExact())
    this.monthZhi = this.GetImg(this.lunar.getMonthZhiExact())
    this.dayGan = this.GetImg(this.lunar.getDayGanExact())
    this.dayZhi = this.GetImg(this.lunar.getDayZhiExact())
    //hour
    this.timeGan = this.GetImg(this.lunar.getTimeGan())
    this.timeZhi = this.GetImg(this.lunar.getTimeZhi())
    //minute
    this.timeGan = this.GetImg(this.lunar.getTimeGan())
    this.timeZhi = this.GetImg(this.lunar.getTimeZhi())
  },

  beforeRouteLeave(to, from, next) {
    //离开页面移除编辑
    this.$store.commit('userInfoMuta', {
      username: localStorage.getItem('username'),
      avatar: (localStorage.APP_URL + localStorage.avatar),
      title: localStorage.getItem('title')
    })
    next()
  }
}
</script>

<style scoped>
.v-application {
  background: #595757 !important;
}

.stickyTop {
  min-height: 100px;
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 72px !important;
  z-index: 2;
}

>>> .v-card {
  background-color: #595757;
  color: white;
}

.font1 {
  font-size: 0.6rem !important;
  color: white;
}

.noRadius {
  border-radius: 0 !important;
}

>>> .v-expansion-panels .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon {
  color: white !important;
}


.theme--light.v-divider {
  border-color: #c2a36a;
}

.imgPointer {
  cursor: pointer;
}

.mLiuYue {
  margin-bottom: 0.3rem;
}

>>> .v-banner__wrapper {
  padding: 16px 0 16px 0;
}

</style>