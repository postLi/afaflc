<template>
    <div class="ordersInfo detailsArrange" v-loading="loading">
        <!-- 财务概况 -->
        <div class="cwgk-collapse collapseInfo">
            <h2>财务概况</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">订单交易总额：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">线上交易总额：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">线下交易总额：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">平台补贴金额：</el-col>
                    <el-col :span="3">1</el-col>

                    <!-- 第二行 -->
                    <el-col :span="3">已提现金额：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">钱包余额：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">可提现金额：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">冻结金额：</el-col>
                    <el-col :span="3">1</el-col>
 
                    <!-- 第二行 -->
                    <el-col :span="3">保证金：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">待支付理赔：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">免费金额上限：</el-col>
                    <el-col :span="9">1</el-col>
                </el-row>
            </div>
        </div>
        <!-- 提现金额 -->
        <div class="czjl-collapse collapseInfo">
            <h2>提现金额  </h2>
            <div class="authority_legal clearfix">
                <ul class="lengandInfo fl">
                    <li>提现金额：<span>{{cashData.extractSumAll}}</span></li>
                    <li>手续费：<span>0</span></li>
                </ul>
                <dir class="timeChoose fr">
                    <span>提现时间：</span>
                    <!-- <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp"
                        :default-time="['00:00:00', '23:59:59']"
                        :picker-options="pickerOptions2">
                    </el-date-picker> -->
                    <el-date-picker
                    v-model="cashObj.vo.extractTime"
                    type="month"
                    @change ="cashTimeChange"
                    value-format="yyyy-MM"
                    placeholder="选择月">
                    </el-date-picker>
                    {{cashObj.vo.extractTime}}
                </dir>
            </div>
            <div class="essentialInformation_table" >
                <el-table
                    :data="cashData.aflcExtractCash"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="80">
                        <template slot-scope="scope">
                            {{ (cashObj.currentPage - 1) * cashObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                    prop="extractSerial"
                    label="流水号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="extractSum"
                    label="提现金额"
                    >
                    </el-table-column>
                    <el-table-column
                    prop=""
                    label="手续费">
                    </el-table-column>
                    <el-table-column
                    prop="extractWay"
                    label="提现方式">
                    </el-table-column>
                    <el-table-column
                    prop=""
                    label="钱包余额">
                    </el-table-column>
                    <el-table-column
                    prop="extractStatus"
                    label="提现状态">
                    </el-table-column>
                     <el-table-column
                    prop="extractTime"
                    label="申请提现时间">
                        <template slot-scope="scope">
                            {{ scope.row.extractTime | parseTime }}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="auditTime"
                    label="处理时间">
                        <template slot-scope="scope">
                            {{ scope.row.auditTime | parseTime }}
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeCash"
                    :page-sizes="size"
                    layout="total,prev, pager, next, jumper"
                    :total="cashTotalCount">
                </el-pagination>
            </div>
        </div>

        <!-- 交易记录   -->
        <div class="zhyhq-collapse collapseInfo">
            <h2>交易记录  </h2>
            <div class="authority_legal clearfix">
                <ul class="lengandInfo fl">
                    <li>钱包收入：<span>135</span></li>
                    <li>支出：<span>150</span></li>
                </ul>
                <dir class="timeChoose fr">
                    <span>交易时间：</span>
                    <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp"
                        :default-time="['00:00:00', '23:59:59']"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                </dir>
            </div>
            <div class="essentialInformation_table" >
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="序号">
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="流水号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="交易时间"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="收支类型">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="交易类型">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="金额">
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import {  extractCashlist } from '@/api/users/carDetails/index.js'
export default {
  name: 'ordersInfo',
  components: {
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }
  }, 
  data() {
    return {
        size:[20,30,50],
        value7:[],
        listInformation: [],
        dataType:[
            {name:'全部',iscur:true},
            {name:'近7天',iscur:false},
            {name:'近30天',iscur:false},
            {name:'近90天',iscur:false},
        ],
        cashObj:{//提现金额列表查询条件
            "currentPage": 1,
            "pageSize": 10,
            "vo":{
                accountId:'',
                extractTime:null,
            }
        },
        value4:'',
        cashTotalCount:0,//提现金额初始数量
        cashTime:[],//提现时间选择
        cashData:[],
        page:1,
        pagesize:20,
        totalCount:100,
        loading: false,
        dialogVisible: false,
        currentOrderSerial: '',
           tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
         pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
  },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.init()
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        },
    },
     mounted() {
        // console.log(this.$route)
    },
    methods: {
        init() {
            let driverId = this.$route.query.driverId;
            this.cashObj.vo.accountId = driverId;
            this.Cashlist();
        },
        Cashlist(){
            extractCashlist(this.cashObj).then(res => {
                this.cashData = res.data.list[0];
                this.cashTotalCount = res.data.totalCount;
            })
        },
        //提现金额当前页
        handleCurrentChangeCash(val){
            this.cashObj.currentPage = val;
            this.Cashlist();
        },
        cashTimeChange(){
            this.Cashlist();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        setCur(index){
            console.log(index)
            this.dataType.forEach((el,idx)=>{
                console.log(idx)
                idx == index ? el.iscur = true : el.iscur = false;
            })
        },

    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ordersInfo{
        .collapseInfo{
            .qd-collapse_title{
                padding: 20px 0;
            }
            .timeChoose{
                margin: 10px 0;
            }
        }
    }
</style>
