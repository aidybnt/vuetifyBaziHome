<template>
  <div>
    <v-card :disabled="processing" :loading="processing" class="my-6 mx-6" elevation="0">
      <!--        进度条loading-->
      <template slot="progress">
        <v-progress-linear
            color="#FF5722"
            height="10"
            indeterminate
        ></v-progress-linear>
      </template>
      <!--    搜索栏-->
      <v-card-title>
        <v-row>
          <v-col xl="4" sm="6" md="6" lg="4" xs="12">
            <v-text-field
                class="xl12 sm4"
                v-model="search"
                label="查询"
                clearable
                append-outer-icon="mdi-magnify"
                :hide-details="false"
                autocomplete="off"
                hint="空白查询即可刷新数据"
                @click:append-outer="sendSearch"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <!--数据列表-->
      <v-data-table
          :calculate-widths=true
          :headers="headers"
          :items="desserts"
          :search="search"
          disable-sort
          @click:row="rowClick"
          disable-pagination
          hide-default-footer
          class="elevation-3"
      >
        <!--没有数据的情况-->
        <template slot="no-data">
          <div>
            没有数据
          </div>
        </template>
        <!--单独显示生辰-->
        <template v-slot:item.bak_1="{ value:bak_1 }">
          <v-btn text class="ma-0 pa-0" color="#43A047"> {{ bak_1 }}</v-btn>
        </template>
        <!--单独输出本命特征-->
        <template v-slot:item.type="{ item:type, value:text }">
            <span v-for="(item2, index) in types(text)" :key="index">
              <v-chip v-for="(item3, index) in types(item2)"
                      :key="index"
                      small
                      style="cursor: pointer"
                      class="white--text mr-1"
                      :color="item3.color">
              {{ item3.text }}
            </v-chip>
            </span>
        </template>
        <!--单独输出创建时间-->
        <template v-slot:item.created_at="{ value:created_at }">
          <span v-text="created_at"></span>
        </template>
        <!--单独列出操作-->
        <template v-slot:item.control="props">
          <v-btn
              v-for="(item2, index) in controls" :key="index"
              class="mx-2 white--text"
              max-width="2.1rem"
              max-height="2.1rem"
              fab
              text
              elevation="0"
              :color="item2.color"
              @click.stop="buttonClick(props.item,item2.type)"
          >
            <v-icon>
              {{ item2.icon }}
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <!--        删除对话框-->
    <template>
      <v-row justify="center">
        <v-dialog
            v-model="delDialog"
            persistent
            max-width="300"
        >
          <v-card>
            <v-card-title class="headline">
            </v-card-title>
            <v-card-text class="warning--text">
              删除数据无法恢复，确定嘛？
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="green darken-1"
                  text
                  @click="delDialog = false"
              >
                取 消
              </v-btn>
              <v-btn
                  color="green darken-1"
                  text
                  @click="delComfirm"
              >
                删 除
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!--分页-->
    <template>
      <div class="text-center">
        <v-pagination
            :disabled="processing"
            v-model="currentPage"
            :length="pageLength"
            :total-visible="5"
            circle
            class="mb-6"
            @input="input"
        ></v-pagination>
      </div>
    </template>
  </div>
</template>

<script>
import {post} from "@/utilis/request";
import {base64decode} from 'crypto.js'

export default {
  name: "List",

  data() {
    return {
      cTime: '',
      token: '',

      delDialog: false,
      delIndex: '',
      dataId: '',

      currentPage: 1,

      processing: false,
      search: '',
      //table数据相关
      headers: [
        {text: '称呼', value: 'call', align: 'start', width: 90, sortable: false,},
        {text: '性别', value: 'sex', align: 'start', width: 80,},
        {text: '姓名', value: 'name', align: 'start', width: 90,},
        {text: '生辰', value: 'bak_1', align: 'start', width: 170,},
        {text: '出生地', value: 'born', align: 'start', width: 120, sortable: false,},
        {text: '常住区域', value: 'area', align: 'start', width: 110,},
        {text: '本命特征', value: 'type', align: 'start', width: 200, sortable: false,},
        {text: '备注', value: 'desc', align: 'start', width: 200, sortable: false,},
        {text: '添加日期', value: 'created_at', align: 'start', divider: true, width: 160,},
        {text: '操作', align: 'start', value: 'control', width: 140, sortable: false,},
      ],
      desserts: [],
      controls: [
        {icon: 'mdi-pencil', color: 'primary', type: 'edit'},
        {icon: 'mdi-delete', color: 'grey', type: 'del'}
      ],
    }
  },

  computed: {
    pageLength: function () {
      return Math.ceil(this.$store.state.pagination.total / 15)
    },
  },

  created() {
    //解密token和id
    this.token = base64decode(localStorage.getItem('access_token')).toString()
    //加载数据
    if (localStorage.getItem('tableData') === null) {
      this.desserts = []
      this.sendSearch()
    } else {
      this.desserts = JSON.parse(localStorage.getItem('tableData'))
    }
  },

  methods: {
    //默认查询数据
    sendSearch(pages) {
      if (Number(localStorage.getItem('page'))) {
        pages = Number(localStorage.getItem('page'))
      } else {
        pages = 1
      }
      this.processing = true
      post('mingpan/show', {page: pages, input: this.search},
          {headers: {'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
          .then(response => {
            if (response.status === 200) {
              this.Message('success', response.data.message)
              localStorage.setItem('tableData', JSON.stringify(response.data.data.data))
              this.desserts = JSON.parse(localStorage.getItem('tableData'))
              if (this.search === '') {
                localStorage.setItem('total', response.data.data.total)
              }
              this.$store.commit('paginationMuta', {total: localStorage.getItem('total')})
            }
            this.processing = false
          })
          .catch(error => {
            this.Message('error', error)
            this.processing = false
          })
    },
    //转换格式
    types(v) {
      return eval(v)
    },
    //点击列跳转SHOW
    rowClick(v) {
      this.$router.push('/show')
      this.$store.commit('showDataMuta', {
        year: v.year,
        month: v.month,
        day: v.day,
        hour: v.hour,
        minute: v.minute,
        sex: v.sex,
      })
      this.$store.commit('openShowFromListMuta', {openShowFromList: true})

    },
    //修改删除统一点击加以判断
    buttonClick(item, type) {
      if (type === 'edit') {
        this.edit(item)
      }
      if (type === 'del') {
        this.del(item)
      }
    },
    //  修改
    edit(item) {
      let editedIndex = this.desserts.indexOf(item)
      this.$store.commit('editMuta', {edit: true})
      localStorage.setItem('editData', JSON.stringify(this.desserts[editedIndex]))
      localStorage.setItem('tableIndex', editedIndex)
      this.$router.push('/add')
    },
    //  删除
    del(item) {
      this.dataId = item.id
      this.delIndex = this.desserts.indexOf(item)
      this.delDialog = true
    },
    delComfirm() {
      post('mingpan/del',
          {id: this.dataId},
          {headers: {'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json', 'Accept': 'application/json'}})
          .then(response => {
            if (response.status === 200) {
              this.Message('success', response.data.message)
              //踢掉该行
              this.desserts.splice(this.delIndex, 1)
              //重新给localStorage赋值
              let tableDta = JSON.parse(localStorage.getItem('tableData'))
              tableDta.splice(this.delIndex, 1)
              localStorage.setItem('tableData', JSON.stringify(tableDta))
              this.delDialog = false
              //命盘总数-1
              this.$store.commit('paginationMuta', {total: this.$store.state.pagination.total - 1})
              let total = Number(localStorage.getItem('total'))
              total = total - 1
              localStorage.setItem('total', total)
            }
            this.processing = false
          })
          .catch(error => {
            this.Message('error', error)
            this.processing = false
          })
    },
    //分页
    input(v) {
      localStorage.setItem('page', v)
      this.sendSearch(v)
      this.currentPage = v
    },
  },

  mounted() {
    if (Number(localStorage.getItem('page'))) {
      this.currentPage = Number(localStorage.getItem('page'))
    } else {
      this.currentPage = 1
      localStorage.setItem('page', '1')
    }
  }
}
</script>

<style scoped>
>>> .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 0.9rem !important;
}

>>> .v-data-table-header-mobile label {
  font-weight: lighter;
  font-size: 14px;
}

>>> .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 1rem !important;
  height: 54px !important;
  cursor: pointer;
}

/*移动端只有这样*/
>>> .v-data-table__mobile-row__cell {
  max-width: 200px !important;
  display: inline-block !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 1 !important;
  -webkit-box-orient: vertical !important;
  white-space: nowrap !important;
}

>>> .text-start {
  text-align: start !important;
  max-width: 1px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

>>> .v-data-table-header-mobile {
  display: none;
}
</style>