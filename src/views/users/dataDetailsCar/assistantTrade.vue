<template>
    <div class="detailsInfo detailsArrange" v-loading="loading">
        <!-- 辅助信息 -->
        <div class="fzInfo-collapse collapseInfo">
            <h2>辅助信息</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">常驻地：</el-col>
                    <el-col :span="21">1</el-col>

                    <!-- 第二行 -->
                    <el-col :span="3">用户所属省份：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">用户所属城市：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">常驻商圈：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">常驻区域：</el-col>
                    <el-col :span="3">1</el-col>

                    <!-- 第三行 -->
                    <el-col :span="3">进行中订单数量：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">可接服务：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">是否广告车：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">是否开启接单：</el-col>
                    <el-col :span="3">1</el-col>

                    <!-- 第四行 -->
                    <el-col :span="3">每日订单目标：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">每日收入目标：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">可接用车类型：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">最近交易成功时间：</el-col>
                    <el-col :span="3">1</el-col>
  
                    <!-- 第五行 -->
                    <el-col :span="3">预约单限制数量：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">预约单间隔限制：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">已抢订单数：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">已中订单数：</el-col>
                    <el-col :span="3">1</el-col>
                </el-row>
            </div>
        </div>
        <!-- 偏好信息 -->
        <div class="phInfo-collapse collapseInfo">
            <h2>偏好信息</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="序号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="货主名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="货主号码">
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
                <!-- <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div> -->
            </div>
        </div>
        <!-- 修改日志 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>修改日志</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="操作模块"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="操作人"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作时间">
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
                <!-- <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div> -->
            </div>
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
// import Pager from '@/components/Pagination/index'

export default {
  name: 'detailsInfo',
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
