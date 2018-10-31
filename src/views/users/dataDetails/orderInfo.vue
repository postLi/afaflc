<template>
    <div class="ordersInfo detailsArrange" v-loading="loading">
        <!-- 信息概要 -->
        <div class="xxgy-collapse collapseInfo">
            <h2>信息概要</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="4">发布订单：</el-col>
                    <el-col :span="4">{{orderState.puliclishOrder}}</el-col>
                    <el-col :span="4">成交订单：</el-col>
                    <el-col :span="4">{{orderState.dealOrder}}</el-col>
                    <el-col :span="4">未成交订单：</el-col>
                    <el-col :span="4">{{orderState.nonTradedOrder}}</el-col>

                    <!-- 第二行 -->
                    <el-col :span="4">线上支付订单：</el-col>
                    <el-col :span="4">{{orderState.onlinePayOrder}}</el-col>
                    <el-col :span="4">线下支付订单：</el-col>
                    <el-col :span="4">{{orderState.offlinePayOrder}}</el-col>
                    <el-col :span="4">已取消订单：</el-col>
                    <el-col :span="4">{{orderState.cancelOrder}}</el-col>
                </el-row>
            </div>
        </div>
        <!-- 交易订单 -->
        <div class="qd-collapse collapseInfo">
            <h2>交易订单</h2>
            <div class="qd-collapse_title ">
                <ul class="classfyTitle">
                   <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,item.label)">{{item.name}}</li>
                </ul>
            </div>
            <div class="essentialInformation_table" style="padding-top:0;">
                <el-table
                    :data="orderData"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="80">
                        <template slot-scope="scope">
                            {{ (orderObj.currentPage - 1) * orderObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                    prop="orderSerial"
                    label="订单号"
                    width="230">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="driverName"
                    label="车主">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="driverMobile"
                    label="车主账号">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="orderType"
                    label="服务类型">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="startAddress"
                    label="始发地">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="endAddress"
                    label="目的地">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="payWay"
                    label="付款方式">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="payTimeType"
                    label="支付方式">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    width="160"
                    label="发单时间">
                        <template slot-scope="scope">
                            {{scope.row.createTime | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="totalAmount"
                    label="订单金额">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="parentOrderStatus"
                    label="订单状态">
                    </el-table-column>
                    <el-table-column
                    width="160"
                    prop="updateTime"
                    label="完成时间">
                        <template slot-scope="scope">
                            {{scope.row.updateTime | parseTime}}
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :page-sizes="size"
                    layout="total,prev, pager, next, jumper"
                    :total="orderTotalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
// import Pager from '@/components/Pagination/index'
import { aflcOrderState,aflcOrderList } from '@/api/users/shipperDetails/index.js'

export default {
  name: 'ordersInfo',
  components: {
    //   Pager
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
        orderState:{},//信息概要
        dataType:[
            {name:'全部',label:'',iscur:true},
            {name:'近7天',label:'-7',iscur:false},
            {name:'近30天',label:'-30',iscur:false},
            {name:'近90天',label:'-90',iscur:false},
        ],
        page:1,
        pagesize:20,
        totalCount:100,
        orderObj:{
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "shipperId": "",
                "timeDay": "",
            }
        },
        orderData:[],//订单列表
        orderTotalCount:0,//订单列表初始数量
        loading: false,
        dialogVisible: false,
        currentOrderSerial: '',
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
            this.orderObj.vo.shipperId = userId;
            this.OrderState(userId);
            this.OrderList();
        },
        //信息概要
        OrderState(userId){
            aflcOrderState(userId).then(res => {
                this.orderState = res.data;
            })
        },
        //根据时间显示订单列表
        OrderList(){
            aflcOrderList(this.orderObj).then(res => {
                this.orderData = res.data.list;
                this.orderTotalCount = res.data.totalCount;
            })
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.orderObj.currentPage = val;
            this.OrderList();
        },
        setCur(index,label){
            console.log(index,label)
            this.dataType.forEach((el,idx)=>{
                idx == index ? el.iscur = true : el.iscur = false;
            })
            this.orderObj.vo.timeDay = label;
            this.OrderList();
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ordersInfo{
        .collapseInfo{
            .qd-collapse_title{
                padding: 10px 0;
            }
        }
    }
</style>
