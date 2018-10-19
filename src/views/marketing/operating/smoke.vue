<template>
  <div class="identicalStyle clearfix waitpayment" v-loading="loading">
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
      <!-- <el-form-item label="所属区域" prop="areaName">
        <vregion :ui="true"  @values="regionChange" class="form-control">
          <el-input  v-model="areaName" placeholder="请选择省/市/区" clearable @clear="clearName"></el-input>
        </vregion>
      </el-form-item> -->
      <el-form-item label="所属区域">
        <GetCityList ref="area" v-model="searchInfo.areaName"  @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="交易时间">
        <el-date-picker
          v-model="searchCreatTime"
          :default-value="defaultTime"
          type="daterange"
          align="right"
          popper-class='searchCreatTime'
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          :picker-options="pickerOptions2"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单号" prop="orderSerial">
        <el-input v-model="searchInfo.orderSerial" clearable placeholder="请输入要查询的订单号"></el-input>
      </el-form-item>
      <el-form-item class="btnChoose fr"  style="margin-left:0;">
        <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')" icon="el-icon-search">搜索</el-button>
        <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')" icon="fontFamily aflc-icon-qingkong">清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <!-- <div class="btns_box">
        <el-button type="primary" :size="btnsize" plain @click="handleSearch('outExce')">导出Excel</el-button>
      </div> -->
      <div class="info_news">
        <!-- tabel内容 -->
        <el-table
          id="out-table"
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          align = "center"
          height="100%"
          @selection-change="getinfomation"
          tooltip-effect="dark"
          @row-click="clickDetails"
          style="width: 100%"> 
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column label="序号" 
          sortable
            width="80">
            <template slot-scope="scope">
              {{ (page - 1)*pagesize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="orderSerial"
            label="订单号"
            sortable
            >
              <template  slot-scope="scope">
                <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
              </template>
          </el-table-column>
          <el-table-column
            prop="areaName"
            label="所属区域"
            sortable
            :show-overflow-tooltip="true"
            >
          </el-table-column>
          <el-table-column
            prop="shipper"
            label="货主"
            sortable
            :show-overflow-tooltip="true"
            >
          </el-table-column>
          <el-table-column
            prop="driver"
            label="车主"
            sortable
            :show-overflow-tooltip="true"
            >
          </el-table-column>
          <el-table-column
            prop="carType"
            :show-overflow-tooltip="true"
            label="车型"
            sortable
            width="140">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="totalAmount"
            label="订单金额"
            sortable
            width="120"
            >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="commissionAmount"
            label="佣金金额"
            sortable
            width="120">
          </el-table-column> 
          <el-table-column
            :show-overflow-tooltip="true"
            prop="commissionTime"
            label="交易时间"
            sortable
            >
            <template  slot-scope="scope">
              <span class="orderSerial">
                {{ scope.row.commissionTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
              </span>
            </template>
            <!-- <template slot-scope="scope">{{ scope.row.commissionTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template> -->
          </el-table-column>
          
        </el-table>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }}<div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>     
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import '@/styles/dialog.scss'
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
// import vregion from '@/components/vregion/Region'
// import GetCityList from '@/components/GetCityList/area'
import GetCityList from '@/components/GetCityList/city'
import { postDriverCommissionTransaction } from '@/api/marketing/carmarkting/operating'
export default{
  components: {
    Pager,
    GetCityList
    // vregion
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      areaCodeList1: [],
      btnsize: 'mini',
      timeOutWaitPay: null,
      loading: true, // 加载
      sizes: [20, 50, 100],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      isEport: false,
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      areaName: '',
      searchInfo: {
        areaName: null,
        orderSerial: null,
        startTime: null, // 下单起始时间
        endTime: null, // 下单结束时间
        areaCodeList: null// 地区code
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      tableData: [],
      dialogFormVisible_details: false // 详情弹窗
    }
  },
  // watch:{
  //   areaName(newVal){
  //     if(this.isEport){
  //       if (!this.areaName && !this.searchCreatTime ) {
  //         // console.log('验证消息', this.$refs.ruleForm.validateField('areaName'), this.areaName)
  //         this.$refs.ruleForm.validateField('areaName')
  //         this.$refs.ruleForm.validateField('searchCreatTime')
  //         console.log(5555,this.isEport)
  //       }else {
  //           // this.$refs.ruleForm.resetFields('areaName')
  //           this.isEport = false
  //           console.log(6666,this.isEport)
  //       }
  //     }
  //   }
  // },
  created() {
  },
  mounted() {
    this.searchCreatTime = this.defaultTime
    this.firstblood()
  },
  beforeDestroy() {
    // clearInterval(this.timeOutWaitPay)
  },
  methods: {
    // exportExcel() {
    //   this.isEport = true
    //   if (this.areaName === '' || this.areaName === null || this.areaName === undefined || this.searchCreatTime === '' || this.searchCreatTime === null || this.searchCreatTime === undefined) {
    //     // console.log(6666)
    //     // this.$refs.ruleForm.validateField('areaName')
    //     // this.$refs.ruleForm.validateField('searchCreatTime')
    //     this.$message.warning('搜索条件不能为空')
    //   } else {
    //     console.log(7777)
    //     postCommissionTransactionExcel(this.page, this.pagesize, this.searchInfo).then(res => {
    //       const blob = new Blob([res], {
    //         type: 'application/octet-stream'
    //       })
    //       if (window.navigator.msSaveOrOpenBlob) {
    //         navigator.msSaveBlob(blob)
    //       } else {
    //         const elink = document.createElement('a')
    //         elink.download = '报表.xls'
    //         elink.style.display = 'none'
    //         elink.href = URL.createObjectURL(blob)
    //         document.body.appendChild(elink)
    //         elink.click()
    //         document.body.removeChild(elink)
    //       }
    //     })
    //   }
    // },
    clearName() {
      this.areaName = ''
      this.searchInfo.areaCodeList = []
      this.areaCodeList1 = []
    },
    // regionChange(d) {
    //   // console.log('11111', d, typeof this.searchInfo.areaCodeList)
    //   this.areaName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
    //   if (d.area) {
    //     // this.searchInfo.areaCodeList = d.area.code
    //     // this.areaCodeList.push(d.area.code)
    //     // this.searchInfo.argetManageTypeInfoaCodeList)
    //     // console.log('2222', typeof this.searchInfo.areaCodeList, d.area.code)

    //     this.searchInfo.areaCodeList.push(d.area.code)
    //     this.searchInfo.areaCodeList = this.searchInfo.areaCodeList.filter(e => {
    //       return e !== d.city.code
    //     })
    //     console.log('------searchInfo---', this.searchInfo.areaCodeList)
    //     // this.areaCodeList1[d.area.code] = this.areaName
    //     // let arr = []
    //     // let code = []
    //     // for (const item in this.areaCodeList1) {
    //     //   arr.push(this.areaCodeList1[item])
    //     //   code.push(item)
    //     // }
    //     // this.searchInfo.areaCodeList = Object.assign(code)
    //     // // console.log('areaCodeList1',this.areaCodeList1)
    //     // this.areaName = arr.join(',')
    //     // console.log('areaName', this.areaName)
    //     // arr = []
    //     // code = []
    //   } else if (d.city) {
    //     // this.areaCodeList1.push(d.city.code)
    //     this.searchInfo.areaCodeList.push(d.city.code)
    //     this.searchInfo.areaCodeList = this.searchInfo.areaCodeList.filter(e => {
    //       return e !== d.province.code
    //     })
    //   } else if (d.province) {
    //     this.searchInfo.areaCodeList = this.searchInfo.areaCodeList.filter(e => {
    //       return e !== d.province.code
    //     })
    //     this.searchInfo.areaCodeList.push(d.province.code)
    //   } else {
    //     this.clearName()
    //   }
    // },
    // regionChange(d) {
    //   this.areaName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
    //   if (d.area) {
    //     this.areaCodeList1.push(d.area.code)
    //     this.areaCodeList1 = this.areaCodeList1.filter(e => {
    //       return e !== d.city.code
    //     })
    //     this.searchInfo.areaCodeList = Object.assign([], this.areaCodeList1)
    //     // console.log('------searchInfo---', this.areaCodeList1)
    //   } else if (d.city) {
    //     this.areaCodeList1.push(d.city.code)
    //     this.areaCodeList1 = this.areaCodeList1.filter(e => {
    //       return e !== d.province.code
    //     })
    //     this.searchInfo.areaCodeList = Object.assign([], this.areaCodeList1)
    //   } else if (d.province) {
    //     this.areaCodeList1 = this.areaCodeList1.filter(e => {
    //       return e !== d.province.code
    //     })
    //     this.areaCodeList1.push(d.province.code)
    //     this.searchInfo.areaCodeList = Object.assign([], this.areaCodeList1)
    //   } else {
    //     this.clearName()
    //   }
    // },
    // regionChange(d) {
    //   console.log('data:', d)
    //   this.formAllData.belongCityName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
    //   if (d.area) {
    //     this.formAllData.belongCity = d.area.code
    //   } else if (d.city) {
    //     this.formAllData.belongCity = d.city.code
    //   } else if (d.province) {
    //     this.formAllData.belongCity = d.province.code
    //   }
    // },
    // getStr(val, name) {
    //   const arr = []
    //   arr.push(val.split(',')[2])
    //   this.searchInfo.areaCodeList = Object.assign([], arr)
    //   this.searchInfo.areaName = name.split(',')[2]
    //   console.log('this.cityarr', val, name, arr)
    // },
    // getStr(val, name) {
    //   const arr = []
    //   // var str = val.split(',')[val.split(',').length - 1]
    //   arr.push(val.split(',')[val.split(',').length - 1])
    //   this.searchInfo.areaCodeList = Object.assign([], arr)
    //   this.searchInfo.areaName = name.split(',')[name.split(',').length - 1]
    //   console.log('this.cityarr', val, name, arr, this.searchInfo.areaName)
    // },
    getStr(val) {
      const arrCode = []
      const arrName = []
      arrCode.push(val.area.code)
      arrName.push(val.area.name)
      this.searchInfo.areaCodeList = Object.assign([], arrCode)
      this.searchInfo.areaName = Object.assign([], arrName)
      console.log('this.cityarr', val, val.area, val.area.code, val.area.name)
    },
    getValue(obj) {
      return obj ? obj.value : ''
    },
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },
    // 刷新页面
    firstblood() {
      // this.loading = false
      postDriverCommissionTransaction(this.page, this.pagesize, this.searchInfo).then(res => {
        if (res) {
          this.tableData = res.data.list
          this.dataTotal = res.data.totalCount
          this.loading = false
          console.log(res)
        }
      })
    },
     // 模糊查询 分类名称或者code
    handleSearch(type) {
      // console.log(this.searchCreatTime)
      switch (type) {
        case 'search':
          if (this.searchCreatTime) {
            this.searchInfo.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d}') + ' 00:00:00' : null
            this.searchInfo.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d}') + ' 23:59:59' : null
          } else {
            this.searchInfo.startTime = null
            this.searchInfo.endTime = null
          }
          this.firstblood()
          break
        case 'clear':
          this.searchInfo = {
            orderSerial: '',
            areaName: '',
            startTime: '', // 下单起始时间
            endTime: '', // 下单结束时间
            areaCodeList: []
          }
          this.searchCreatTime = ''
          this.$refs.area.returnArr({})
          console.log(this.$refs.area, 66666)
          // this.$refs.area.nowData.province.name = ''
          // this.$refs.area.nowData.province.city = ''
          // this.$refs.area.nowData.province.area = ''
          console.log(this.$refs.area.nowData)
          this.firstblood()
        case 'outExce':
          // if (this.searchCreatTime) {
          //   this.searchInfo.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
          //   this.searchInfo.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
          // } else {
          //   this.searchInfo.startTime = ''
          //   this.searchInfo.endTime = ''
          // }
          // this.exportExcel()
          break
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    // 判断是否选中
    getinfomation(selection) {
      this.checkedinformation = selection
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 详情弹窗
    pushOrderSerial(item) {
      this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
</style>
