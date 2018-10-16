<template>
    <div class="ordersInfo detailsArrange" v-loading="loading">
        <!-- 信息概要 -->
        <div class="xxgy-collapse collapseInfo">
            <h2>信息概要</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">总抢单数：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">总中单数：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">订单交易总额：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">取消订单：</el-col>
                    <el-col :span="3">1</el-col>

                    <!-- 第二行 -->
                    <el-col :span="3">同城订单数：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">城际订单数：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">零担订单数：</el-col>
                    <el-col :span="9">1</el-col>
                </el-row>
            </div>
        </div>
        <!-- 抢单信息 -->
        <div class="qd-collapse collapseInfo">
            <h2>抢单信息</h2>
            <div class="qd-collapse_title clearfix">
                <ul class="classfyTitle fl">
                   <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index)">{{item.name}}</li>
                </ul>
                <searchInfo />
            </div>
            <div class="authority_legal">
                <ul class="lengandInfo">
                    <li>抢单数量：<span>135</span></li>
                    <li>中单数量：<span>33</span></li>
                    <li>同城：<span>150</span></li>
                    <li>城际：<span>150</span></li>
                    <li>零担：<span>150</span></li>
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
                    label="货主姓名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="货主账号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="发布时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="抢单时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="抢入速度">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="距离提货地">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="是否收藏司机">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="是否定向司机">
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

          <!-- 交易订单 -->
        <div class="qd-collapse collapseInfo">
            <h2>交易订单</h2>
            <div class="qd-collapse_title clearfix">
                <ul class="classfyTitle fl">
                   <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index)">{{item.name}}</li>
                </ul>
                <searchInfo />
            </div>
            <div class="authority_legal">
                <ul class="lengandInfo">
                    <li>交易订单数：<span>135</span></li>
                    <li>订单金额：<span>33</span></li>
                    <li>同城：<span>150</span></li>
                    <li>同城交易：<span>150</span></li>
                    <li>城际：<span>150</span></li>
                    <li>城际交易：<span>150</span></li>
                    <li>零担：<span>150</span></li>
                    <li>零担交易：<span>150</span></li>
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
                    label="订单号">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="货主名称">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="货主账号">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="承运时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="服务类型">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="货物名称">
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
                    label="联系人">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="联系人电话">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="付款方式">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="付款状态">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="交易时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="订单金额">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="订单状态">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="完成时间">
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

         <!-- 取消订单 -->
        <div class="qd-collapse collapseInfo">
            <h2>取消订单</h2>
            <div class="qd-collapse_title clearfix">
                <ul class="classfyTitle fl">
                   <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index)">{{item.name}}</li>
                </ul>
                <searchInfo />
            </div>
            <div class="authority_legal">
                <ul class="lengandInfo">
                    <li>取消订单：<span>135</span></li>
                    <li>同城：<span>150</span></li>
                    <li>城际：<span>150</span></li>
                    <li>零担：<span>150</span></li>
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
                    label="订单号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="货主名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="货主账号">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="服务类型">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="中单时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="取消时间">
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
                    label="取消原因">
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
import searchInfo from './components/searchInfo'

export default {
  name: 'ordersInfo',
  components: {
    //   Pager
    searchInfo,
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }
  }, 
  data() {
    return {
        btnsize:'mini',
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
        loading: false,
        dialogVisible: false,
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
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
