<template>
    <div class="ordersInfo detailsArrange" v-loading="loading">
        <!-- 积分概况 -->
        <div class="jfgk-collapse collapseInfo">
            <h2>积分概况</h2>
            <div class="authority_legal">
                <ul class="lengandInfo">
                    <li>积分等级：<span>皇冠</span></li>
                    <li>累计积分：<span>1530</span></li>
                    <li>剩余积分：<span>1500</span></li>
                    <li>被扣积分：<span>0</span></li>
                </ul>
            </div>
            <div class="essentialInformation_table" style="padding-top:0;">
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
                    label="积分变更时间"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="积分变化"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="变化原因   ">
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
        <!-- 评价记录   -->
        <div class="pjjl-collapse collapseInfo">
            <h2>评价记录</h2>
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
                    label="评价时间"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="服务类型"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address" 
                    label="获评星级">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="获评标签">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="货主账号">
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

        <!-- 投诉记录   -->
        <div class="tsjl-collapse collapseInfo">
            <h2>投诉记录  </h2>
            <div class="essentialInformation_table" >
                <el-table
                    :data="complainData"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="80">
                        <template slot-scope="scope">
                            {{ (complainObj.currentPage - 1) * complainObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                    width="160"
                    prop="complainTime"
                    label="投诉时间"
                    >
                    </el-table-column>
                    <el-table-column
                    width="250"
                    prop="complainTypeName"
                    label="投诉类型"
                    >
                    </el-table-column>
                    <el-table-column
                    width="250"
                    prop="orderSerial"
                    label="订单编号">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="complainDes"
                    label="投诉描诉">
                    </el-table-column>
                    <!-- <el-table-column
                    prop=""
                    width="120"
                    label="跟进状态">
                    </el-table-column> -->
                    <el-table-column
                    width="120"
                    prop="complainStatusName"
                    label="处理状态 ">
                    </el-table-column>
                    <!-- <el-table-column
                    prop="address"
                    label="客服跟进结果">
                    </el-table-column>
                    <el-table-column
                    width="160"
                    prop="address"
                    label="处理时间">
                    </el-table-column> -->
                    <!-- <el-table-column
                    width="120"
                    prop="address"
                    label="跟进人">
                    </el-table-column> -->
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :page-sizes="size"
                    layout="total,prev, pager, next, jumper"
                    :total="complainTotalCount">
                </el-pagination>
            </div>
        </div>

         <!-- 邀请记录 -->
        <div class="yqjl-collapse collapseInfo">
            <h2>邀请记录</h2>
            <div class="authority_legal">
                <ul class="lengandInfo">
                    <li>邀请人数：<span>35</span></li>
                    <li>认证数量：<span>33</span></li>
                    <li>认证奖励金：<span>150</span></li>
                    <li>完成首单数：<span>150</span></li>
                    <li>首单奖励金：<span>150</span></li>
                </ul>
            </div>
            <div class="essentialInformation_table" style="padding-top:0;">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="80">
                        <template slot-scope="scope">
                            {{ (page - 1)*pagesize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                    prop="date"
                    label="注册时间"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="用户账号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="是否认证">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="是否首单">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="认证奖励（元）">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="首单奖励（元）">
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
import { aflcOrderComplain } from '@/api/users/shipperDetails/index.js'

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
        complainObj:{
            "currentPage": 1,
            "pageSize": 10,
            "vo":{
                complainId:'',
            }
        },
        complainData:[],
        page:1,
        pagesize:20,
        totalCount:100,
        complainTotalCount:0,
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
            this.complainObj.vo.complainId = this.$route.query.userId;
            this.Complain();
        },
        Complain(){
            aflcOrderComplain(this.complainObj).then(res => {
                this.complainData = res.data.list;
                this.complainTotalCount = res.data.totalCount;
            })
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
