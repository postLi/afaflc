<template>
    <div class="ordersInfo detailsArrange" v-loading="loading">
        <!-- 财务概况 -->
        <div class="cwgk-collapse collapseInfo">
            <h2>财务概况</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">累计充值：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">充值余额：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">赠送余额 ：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">优惠券金额 ：</el-col>
                    <el-col :span="3">1</el-col>

                    <!-- 第二行 -->
                    <el-col :span="3">优惠券张数：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">优惠券价值：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">优惠券抵扣金额   ：</el-col>
                    <el-col :span="9">1</el-col>
                </el-row>
            </div>
        </div>
        <!-- 充值记录   -->
        <div class="czjl-collapse collapseInfo">
            <h2>充值记录  </h2>
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
                    label="充值时间"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="充值金额">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="充值赠送">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="充值渠道">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="充值方式">
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

        <!-- 账户优惠券   -->
        <div class="zhyhq-collapse collapseInfo">
            <h2>账户优惠券  </h2>
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
                    label="优惠券名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="优惠券类型"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="金额/折扣">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="优惠券码">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="手机号码">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="派发时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="过期时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="券码状态">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="订单号">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="订单优惠金额">
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
