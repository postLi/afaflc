<template>
    <div class="ordersInfo detailsArrange" v-loading="loading">
        <!-- 财务概况 -->
        <div class="cwgk-collapse collapseInfo">
            <h2>财务概况</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">累计充值：</el-col>
                    <el-col :span="3">{{financial.totalEchargeAmountSum ? financial.totalEchargeAmountSum :'0' }}</el-col>
                    <el-col :span="3">充值余额：</el-col>
                    <el-col :span="3">{{financial.totalEchargeAmount ? financial.totalEchargeAmount : '0'}}</el-col>
                    <el-col :span="3">赠送余额：</el-col>
                    <el-col :span="3">{{financial.availableBalance ? financial.availableBalance : '0'}}</el-col>
                    <el-col :span="3">优惠金余额：</el-col>
                    <el-col :span="3">{{financial.rewardBalance ? financial.rewardBalance : '0'}}</el-col>

                    <!-- 第二行 -->
                    <el-col :span="3">优惠券张数：</el-col>
                    <el-col :span="3">{{financial.couponNum ? financial.couponNum : '0'}}</el-col>
                    <el-col :span="3">优惠券抵扣金额：</el-col>
                    <el-col :span="3">{{financial.orderDiscountAmountSum ? financial.orderDiscountAmountSum : '0'}}</el-col>
                </el-row>
            </div>
        </div>
        <!-- 充值记录   -->
        <div class="czjl-collapse collapseInfo">
            <h2>充值记录  </h2>
            <div class="essentialInformation_table" >
                <el-table
                    :data="rechargeData"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="80">
                        <template slot-scope="scope">
                            {{ (rechargeObj.currentPage - 1) * rechargeObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                    prop="rechargeSerial"
                    label="流水号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="rechargeTime"
                    label="充值时间"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="rechargeSum"
                    label="充值金额">
                    </el-table-column>
                    <el-table-column
                    prop="giveSum"
                    label="充值赠送">
                    </el-table-column>
                    <el-table-column
                    prop="rechargeChannelName"
                    label="充值渠道">
                    </el-table-column>
                    <el-table-column
                    prop="rechargeWay"
                    label="充值方式">
                        <template slot-scope="scope">
                            {{ scope.row.rechargeWay == 0 ? '支付宝' : '微信' }}
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeRecharge"
                    layout="total, prev, pager, next, jumper"
                    :total="rechargeTotalCount">
                </el-pagination>
            </div>
        </div>

        <!-- 账户优惠券   -->
        <div class="zhyhq-collapse collapseInfo">
            <h2>账户优惠券  </h2>
            <div class="essentialInformation_table" >
                <el-table
                    :data="couponData"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="80">
                        <template slot-scope="scope">
                            {{ (couponObj.currentPage - 1) * couponObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="couponName"
                    label="优惠券名称"
                    >
                    </el-table-column>
                    <el-table-column
                    width="120"
                    :show-overflow-tooltip="true"
                    prop="couponTypeName"
                    label="优惠券类型"
                    >
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="remissionDiscount"
                    label="金额/折扣">
                    </el-table-column>
                    <el-table-column
                    prop="couponNum"
                    label="优惠券码">
                    </el-table-column>
                    <el-table-column
                    prop="mobile"
                    label="手机号码">
                    </el-table-column>
                    <el-table-column
                    prop="grantTime"
                    label="派发时间">
                    </el-table-column>
                    <el-table-column
                    prop="endTime"
                    label="过期时间">
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="couponStatusName"
                    label="券码状态">
                    </el-table-column>
                    <el-table-column
                    width="250"
                    prop="orderSerial"
                    label="订单号">
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="orderDiscountAmount"
                    label="订单优惠金额">
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeCoupon"
                    layout="total, prev, pager, next, jumper"
                    :total="couponTotalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import { aflcCouponList,aflcRechargeList,aflcFinancialState  } from "@/api/users/shipperDetails/index.js";

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
        listInformation: [],
        dataType:[
            {name:'全部',iscur:true},
            {name:'近7天',iscur:false},
            {name:'近30天',iscur:false},
            {name:'近90天',iscur:false},
        ],
        page:1,
        pagesize:20,
        totalCount:100,
        financial:{},//财务概况
        couponTotalCount:0,//优惠券列表默认总数
        rechargeTotalCount:0,//充值记录列表默认总数
        couponData:[],//优惠券列表
        couponObj:{//优惠券列表查询条件
            "currentPage": 1,
            "pageSize": 10,
            "vo":{
                userId:'',
            }
        },
        rechargeData:[],//充值记录列表
        rechargeObj:{//充值记录列表查询条件
            "currentPage": 1,
            "pageSize": 10,
            "vo":{
                accountId:'',
            }
        },
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
        }]
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
            let userId = this.$route.query.userId;
            this.couponObj.vo.userId = userId;
            this.rechargeObj.vo.accountId = userId;
            this.CouponList();
            this.RechargeList();
            this.financialState(userId);
        },
        //优惠券列表
        CouponList(){
            aflcCouponList(this.couponObj).then(res => {
                this.couponData = res.data.list;
                this.couponTotalCount = res.data.totalCount;
            })
        },
        //充值记录列表
        RechargeList(){
            aflcRechargeList(this.rechargeObj).then(res => {
                this.rechargeData = res.data.list;
                this.rechargeTotalCount = res.data.totalCount;
                this.rechargeData.forEach(el => {
                    switch(el.rechargeChannel){
                        case '0':
                            el.rechargeChannelName = 'app';
                            break;
                        case '1':
                            el.rechargeChannelName = 'web';
                            break;
                        case '2':
                            el.rechargeChannelName = 'TMSWEB';
                            break;                         
                    }
                })
            })
        },
        //财务概况
        financialState(userId){
            aflcFinancialState(userId).then(res=>{
                this.financial = res.data;
            })
        },
        //账户优惠卷当前页
        handleCurrentChangeCoupon(val){
            this.couponObj.currentPage = val;
            this.CouponList();
        },
        //充值记录当前页
        handleCurrentChangeRecharge(val){
            this.rechargeObj.currentPage = val;
            this.RechargeList();
        },
        setCur(index){
            console.log(index)
            this.dataType.forEach((el,idx)=>{
                console.log(idx)
                idx == index ? el.iscur = true : el.iscur = false;
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ordersInfo{
        .collapseInfo{
            .qd-collapse_title{
                padding: 20px 0;
            }
        }
    }
</style>
