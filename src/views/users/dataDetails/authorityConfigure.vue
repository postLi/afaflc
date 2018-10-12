<template>
    <div class="detailsInfo detailsArrange" v-loading="loading">
        <!-- 基础权益 -->
        <div class="detailsInfo-collapse collapseInfo">
            <h2>基础权益</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="4">发单功能：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">可用车型：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">发单数量限制：</el-col>
                    <el-col :span="4">1</el-col>
                    <!-- <el-col :span="3">最近登录时间：</el-col>
                    <el-col :span="3">1</el-col> -->
                    <!-- 第二行 -->
                    <el-col :span="4">月结权益：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">可月结金额上限：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">拦截结束时间：</el-col>
                    <el-col :span="4">1</el-col>
                    <!-- <el-col :span="3">性别：</el-col>
                    <el-col :span="3">1</el-col> -->
                    <!-- 第三行 -->
                    <el-col :span="4">推单拦截：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">拦截开始时间：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">操作人员：</el-col>
                    <el-col :span="4">1</el-col>
                </el-row>
            </div>
        </div>
        <!-- 绑定车主 -->
        <div class="zizhiInfo-collapse collapseInfo">
            <h2>绑定车主</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址">
                    </el-table-column>
                </el-table>
                <!-- <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div> -->
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <!-- 营销权益 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>营销权益</h2>
            <div class="essentialInformation_table">

            </div>
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'

export default {
  name: 'detailsInfo',
  components: {
      Pager
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
        shuaxin() {
            this.init()
        },
        handlerClick() {
            this.currentOrderSerial = this.$route.query.orderSerial
            this.dialogVisible = true
        },
        // handlePageChange(obj) {
        //     this.page = obj.pageNum
        //     this.pagesize = obj.pageSize
        //     this.init();
        // },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .detailsInfo{
        .collapseInfo{
            .essentialInformation_img{

            }
        }
    }
</style>
