<template>
  <div class="identicalStyle clearfix waitpayment" v-loading="loading">
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" :rules="rules" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="所属区域" prop="areaName">
        <vregion :ui="true"  @values="regionChange" class="form-control">
          <el-input  v-model="areaName" placeholder="请选择省/市/区" clearable @clear="clearName"></el-input>
        </vregion>
      </el-form-item>
      <el-form-item label="交易时间" prop="searchCreatTime">
        <el-date-picker
          v-model="searchCreatTime"
          type="daterange"
          :picker-options="pickerOptions2"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          :default-time="['00:00:00', '23:59:59']"
          value-format="timestamp">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="btnChoose fr"  style="margin-left:0;">
        <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')">搜索</el-button>
        <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" plain @click="handleSearch('outExce')">导出Exce</el-button>
      </div>
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
          @selection-change = "getinfomation"
          tooltip-effect="dark"
          @row-click="clickDetails"
          style="width: 100%"> 
          <el-table-column
            type="selection"
            width="100">
          </el-table-column>
          <el-table-column label="序号" 
            width="100">
            <template slot-scope="scope">
              {{ (page - 1)*pagesize + scope.$index + 1 }}
            </template>
          </el-table-column>  
          <el-table-column
            prop="orderSerial"
            label="订单号"
            width="250">
              <template  slot-scope="scope">
                <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
              </template>
          </el-table-column>
          <el-table-column
            prop="areaName"
            label="所属区域"
            width="250">
          </el-table-column>
          <el-table-column
            prop="shipper"
            label="货主"
            width="200">
          </el-table-column>
          <el-table-column
            prop="driver"
            label="车主"
            width="250">
          </el-table-column>
          <el-table-column
            prop="carType"
            label="车型"
            width="200">
          </el-table-column>
          <el-table-column
            prop="totalAmount"
            label="订单金额"
            width="160">
          </el-table-column>
          <el-table-column
            prop="commissionAmount"
            label="佣金金额"
            width="160">
          </el-table-column> 
          <el-table-column
            prop="commissionTime"
            label="交易时间"
            width="250">
            <template  slot-scope="scope">
              <span class="orderSerial">
                {{ scope.row.commissionTime | parseTime}}    
              </span>
            </template>
            <!-- <template slot-scope="scope">{{ scope.row.commissionTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template> -->
          </el-table-column>
        </el-table>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>    
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import '@/styles/dialog.scss'
import { orderStatusList } from '@/api/order/ordermange'
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import vregion from '@/components/vregion/Region'
import { postDriverCommissionTransaction } from '@/api/marketing/carmarkting/operating'
import GetCityList from '@/components/GetCityList'
import { REGEX } from '@/utils/validate'
export default{
  components: {
    Pager,
    vregion
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateareaName = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('请输入异常件数'))
      } else if (REGEX.ONLY_NUMBER_GT.test(value)) {
        callback()
      } else {
        callback(new Error('只能输入数字从1开始'))
      }
    }
    const validatorNull = (rule, value, callback) => {
      if (value === undefined ) {
         console.log(value)
        callback(new Error('导出时不能为空'))
      }else {
        callback()
      }
    }
    return {
      areaCodeList1: [],
      btnsize: 'mini',
      timeOutWaitPay: null,
      loading: true, // 加载
      sizes: [30, 50, 100],
      pagesize:20,//初始化加载数量
      page:1,//初始化页码
      dataTotal: 0,
      areaName:'',
      isEport: false,
      searchInfo: {
        startTime: '', // 下单起始时间
        endTime: '', // 下单结束时间
        areaCodeList:[]//
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      searchCreatTime: '',
      tableData:[],
      dialogFormVisible_details: false, // 详情弹窗
      rules: {
        // areaName: [
        //   {  trigger: 'blur', validator: validatorNull  }
        // ],
        // searchCreatTime: [
        //   { trigger: 'blur', validator: validatorNull }
        // ],
      }
    }
  },
//   watch: {
// areaName (newVal) {
//   if (this.isEport) {
//  if (!this.areaName && !this.searchCreatTime ) {
//      console.log('sdjfisdjfi', this.$refs.ruleForm.validateField('areaName'), this.areaName)
//      this.$refs.ruleForm.validateField('areaName')
//      this.$refs.ruleForm.validateField('searchCreatTime')
//    }else {
//       this.$refs.ruleForm.resetFields('areaName')
//       this.isEport = false
//    }
//   }
  
// },
  created() {

  },
  mounted() {
    this.firstblood()
  },
  beforeDestroy() {
    clearInterval(this.timeOutWaitPay)
  },
  methods: {
    exportExcel() {
      this.isEport = true
      // var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })

  
      
      // this.$refs.ruleForm.validateField('searchCreatTime')
    },
    clearName(){
      this.areaName = ''
      this.searchInfo.areaCodeList = []
      this.areaCodeList1 = []
    },
    regionChange(d) {
      console.log('data:',d)
      this.areaName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
      if(d.area){
        this.areaCodeList1[d.area.code] = this.areaName
        let arr = []
        let code = []
        for(let item in this.areaCodeList1){
          arr.push(this.areaCodeList1[item])
          code.push(item)
        }
        this.searchInfo.areaCodeList = Object.assign([], code)
        // console.log('areaCodeList1',this.areaCodeList1)
        this.areaName = arr.join(',')
        console.log('areaName',this.areaName)
        arr = []
        code = []
      }else if(d.city){
        // this.searchInfo.areaCodeList = d.city.code
        this.areaCodeList1[d.city.code] = this.areaName
        let arr = []
        let code = []
        for(let item in this.areaCodeList1){
          arr.push(this.areaCodeList1[item])
          code.push(item)
        }
        this.searchInfo.areaCodeList = Object.assign([], code)
        // console.log('areaCodeList1',this.areaCodeList1)
        this.areaName = arr.join(',')
        console.log('areaName',this.areaName)
        arr = []
        code = []
      }
      else if (d.province){
        // this.searchInfo.areaCodeList = d.province.code ? d.province.code : ''
        this.areaCodeList1[d.province.code] = this.areaName
        let arr = []
        let code = []
        for(let item in this.areaCodeList1){
          arr.push(this.areaCodeList1[item])
          code.push(item)
        }
        this.searchInfo.areaCodeList = Object.assign([], code)
        // console.log('areaCodeList1',this.areaCodeList1)
        this.areaName = arr.join(',')
        console.log('areaName',this.areaName)
        arr = []
        code = []
      }else {
        this.clearName()
        console.log('sdfsd',d)
        
      }
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
      this.loading = false
      postDriverCommissionTransaction(this.page,this.pagesize,this.searchInfo).then(res => {
        console.log(res)
        this.tableData = res.data.list
        this.loading = false
      })
    },
     // 模糊查询 分类名称或者code
    handleSearch(type) {
      console.log(this.searchCreatTime)
      switch (type) {
        case 'search':
          if (this.searchCreatTime) {
            this.searchInfo.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
            this.searchInfo.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
          } else {
            this.searchInfo.startTime = ''
            this.searchInfo.endTime = ''
          }
          this.firstblood()
          break
        case 'clear':
          this.searchInfo = {
            startTime: '', // 下单起始时间
            endTime: '', // 下单结束时间
            areaCodeList:[]
          }
          this.searchCreatTime = ''
          this.firstblood()
        case 'outExce':
          this.exportExcel()
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
