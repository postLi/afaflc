<template>
    <div class="ordersInfo detailsArrange" v-loading="loading">
        <!-- 信息概要 -->
        <div class="xxgy-collapse collapseInfo">
            <h2>信息概要</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="4">发布订单：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">成交订单：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">未成交订单：</el-col>
                    <el-col :span="4">1</el-col>


                    <!-- 第二行 -->
                    <el-col :span="4">线上支付订单：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">线下支付订单：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">已成交订单：</el-col>
                    <el-col :span="4">1</el-col>
                </el-row>
            </div>
        </div>
        <!-- 抢单信息 -->
        <div class="qd-collapse collapseInfo">
            <h2>抢单信息</h2>
            <div class="qd-collapse_title ">
                <ul class="classfyTitle">
                   <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index)">{{item.name}}</li>
                </ul>
            </div>
            <div class="essentialInformation_table" style="padding-top:0;">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="序号"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="流水号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="车主"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="车主账号">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="服务类型">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="始发地">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="目的地">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="付款方式">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="支付方式">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="发单时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="订单金额">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="订单状态">
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
// import Pager from '@/components/Pagination/index'

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
        defaultImg:'/static/test.jpg',//默认第一张图片的url
        defaultImg45:'/static/45du.png',
        defaultImgCarCard:'/static/carcard.png',
        defaultImgDriverCard:'/static/drivercard.png',
        defaultImgIdCard:'/static/idcard.png',
        defaultImgGeRen:'/static/geren.png',
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
