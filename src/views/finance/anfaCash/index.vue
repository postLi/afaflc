<template>
    <div class="detailsCompnent ANFACash">
        <div class="anfaCsh detailsArrange" v-loading="loading">
            <!-- 用户钱包 -->
            <div class="detailsInfo-collapse collapseInfo">
                <h2>用户钱包</h2>
                <div class="essentialInformation">
                    <el-row class="basicInfo" :span='24'>
                        <!-- 第一行 -->
                        <el-col :span="4">货主充值余额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.shipperRechargeAmountCount ? anfaCashInfo.shipperRechargeAmountCount : 0}}</el-col>
                        <el-col :span="4">货主赠送余额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.shipperAvailableBalanceCount ? anfaCashInfo.shipperAvailableBalanceCount : 0}}</el-col>
                        <el-col :span="4">车主可提现金额余额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.driverAvailableAmountCount ? anfaCashInfo.driverAvailableAmountCount : 0}}</el-col>

                        <!-- 第二行 -->
                        <el-col :span="4">车主提现审核中金额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.driverExtractCashCount ? anfaCashInfo.driverExtractCashCount : 0}}</el-col>
                        <el-col :span="4">车主冻结金额：</el-col>
                        <el-col :span="4">0</el-col>
                        <el-col :span="4">车主保证金：</el-col>
                        <el-col :span="4">0</el-col>
                    </el-row>
                </div>
            </div>
            <!-- 营销收支 -->
            <div class="zizhiInfo-collapse collapseInfo">
                <h2>营销收支</h2>
                <div class="qd-collapse_title clearfix">
                    <ul class="classfyTitle fl">
                        <li v-for="(item,index) in tradeListDataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,'transaction',item.label)">{{item.name}}</li>
                    </ul>
                    <searchInfo searchType = "transaction"/>
                </div>
                <div class="essentialInformation" style="padding-top:0;">
                    <el-row class="basicInfo" :span='24'>
                        <!-- 第一行 -->
                        <el-col :span="4">优惠券：</el-col>
                        <el-col :span="4">1</el-col>  
                        <el-col :span="4">优惠金：</el-col>
                        <el-col :span="4">1</el-col>
                        <el-col :span="4">奖励金：</el-col>
                        <el-col :span="4">1</el-col>

                        <!-- 第二行 -->
                        <el-col :span="4">达量奖励：</el-col>
                        <el-col :span="4">1</el-col>
                        <el-col :span="4">充值赠送：</el-col>
                        <el-col :span="4">1</el-col>
                        <el-col :span="4">平台抽佣：</el-col>
                        <el-col :span="4">1</el-col> 
                    </el-row>
                </div>
            </div>
            <!-- 交易构成 -->
            <div class="logInfo-collapse collapseInfo">
                <h2>交易构成</h2>
                <div class="qd-collapse_title clearfix">
                    <ul class="classfyTitle fl">
                        <li v-for="(item,index) in tradeListDataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,'transaction',item.label)">{{item.name}}</li>
                    </ul>
                    <searchInfo searchType = "transaction" />
                </div>
                <div class="essentialInformation_table">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="date"
                        label=""
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="date"
                        label="运费收入"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="待结算运费"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="退运费">
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        label="运费支出">
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        label="理赔收入">
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        label="理赔支出">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import '@/styles/detailsStyle.scss'

import { parseTime } from '@/utils/index.js'
import { userMywalletSurvey } from '@/api/finance/anfaZhangHU.js'
// import Pager from '@/components/Pagination/index'
import searchInfo from './components/searchInfo'

export default {
  name: 'detailsInfo',
  components: {
    //   Pager
    searchInfo
  },
  props: {
  }, 
  data() {
    return {
        page:1,
        pagesize:20,
        totalCount:100,
        loading: false,
        dialogVisible: false,
        anfaCashInfo:{},
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
        tradeListDataType:[
            {name:'全部',label:'',iscur:true},
            {name:'自然天',label:'-7',iscur:false},
            {name:'自然月',label:'-30',iscur:false},
        ],
      }
  },
    watch: {
      
    },
     mounted() {
        // console.log(this.$route)
        this.init();
    },
    methods: {
        init() {
            userMywalletSurvey().then(res => {
                this.anfaCashInfo = res.data;
            })
        },
        shuaxin() {
            this.init()
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        setCur(index,classfy,label){
        switch(classfy){
            // case 'grap':
            //     this.grapListDataType.forEach((el,idx)=>{
            //         idx == index ? el.iscur = true : el.iscur = false;
            //     })
            //     this.grapListObj.vo.timeDay = label;
            //     this.GrapList();
            //     break;
            case 'transaction':
                this.tradeListDataType.forEach((el,idx)=>{
                    idx == index ? el.iscur = true : el.iscur = false;
                })
                // this.tradOrdeListObj.vo.timeDay = label;
                // this.TradOrdeList();
                break;
        }
    },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ANFACash{
        background: #f2f2f2;
        overflow: auto;
        .anfaCsh{
            .collapseInfo{
                .qd-collapse_title{
                    padding: 10px 0;
                }
                .essentialInformation_table{
                    padding-top: 0;
                }
            }
        }
    }
</style>
