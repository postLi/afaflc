<template>
  <div class="identicalStyle clearfix waitpayment" v-loading="loading">
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
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
          value-format="timestamp">
      </el-date-picker>
      </el-form-item>
      <el-form-item class="btnChoose fr"  style="margin-left:0;">
        <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')">搜索</el-button>
        <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
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
            prop="orderSerial"
            :show-overflow-tooltip="true"
            label="订单号"
            sortable
            >
              <template  slot-scope="scope">
                <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
              </template>
          </el-table-column>
          <el-table-column
            prop="areaName"
            :show-overflow-tooltip="true"
            label="所属区域"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipper"
            :show-overflow-tooltip="true"
            label="货主"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="driver"
            :show-overflow-tooltip="true"
            label="车主"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="carType"
            :show-overflow-tooltip="true"
            label="车型"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="totalAmount"
            :show-overflow-tooltip="true"
            label="订单金额"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="rewardSum"
            :show-overflow-tooltip="true"
            label="奖励金"
            sortable
            width="120">
          </el-table-column> 
          <el-table-column
            prop="tradeTime"
            :show-overflow-tooltip="true"
            label="交易时间"
            sortable
            >
            <template  slot-scope="scope">
              <span class="orderSerial">
                {{ scope.row.tradeTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
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
import '@/styles/dialog.scss'
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import vregion from '@/components/vregion/Region'
import { postUserRewardDriverTransaction } from '@/api/marketing/carmarkting/operating'
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
    return {
      areaCodeList1: [],
      btnsize: 'mini',
      timeOutWaitPay: null,
      loading: true, // 加载
      sizes: [30, 50, 100],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      isEport: false,
      searchCreatTime: [],
      // defaultTime:[parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      areaName: '',
      searchInfo: {
        startTime: null, // 下单起始时间
        endTime: null, // 下单结束时间
        areaCodeList: null//
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      tableData: [],
      dialogFormVisible_details: false // 详情弹窗
    }
  },
  created() {

  },
  mounted() {
    this.firstblood()
  },
  beforeDestroy() {
  },
  methods: {
    clearName() {
      this.areaName = ''
      this.searchInfo.areaCodeList = []
      this.areaCodeList1 = []
    },
    regionChange(d) {
      this.areaName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      if (d.area) {
        this.areaCodeList1.push(d.area.code)
        this.areaCodeList1 = this.areaCodeList1.filter(e => {
          return e !== d.city.code
        })
        this.searchInfo.areaCodeList = Object.assign([], this.areaCodeList1)
        // console.log('------searchInfo---', this.areaCodeList1)
      } else if (d.city) {
        this.areaCodeList1.push(d.city.code)
        this.areaCodeList1 = this.areaCodeList1.filter(e => {
          return e !== d.province.code
        })
        this.searchInfo.areaCodeList = Object.assign([], this.areaCodeList1)
      } else if (d.province) {
        this.areaCodeList1 = this.areaCodeList1.filter(e => {
          return e !== d.province.code
        })
        this.areaCodeList1.push(d.province.code)
        this.searchInfo.areaCodeList = Object.assign([], this.areaCodeList1)
      } else {
        this.clearName()
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
      // this.loading = false
      postUserRewardDriverTransaction(this.page, this.pagesize, this.searchInfo).then(res => {
        if (res) {
          this.tableData = res.data.list
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
            areaCodeList: []
          }
          this.searchCreatTime = ''
          this.firstblood()
        case 'outExce':
          if (this.searchCreatTime) {
            this.searchInfo.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
            this.searchInfo.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
          } else {
            this.searchInfo.startTime = ''
            this.searchInfo.endTime = ''
          }
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
