<template>
<div class="detailsCompnent MJDpushlogs" style="height:100%">
    <div class="detailsInfo detailsArrange" v-loading="loading" style="height:100%">
        <!-- 基本信息 -->
        <div class="detailsInfo-collapse collapseInfo">
            <h2>马甲单推送详情</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="4">推单时间</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">服务类型</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">区域</el-col>
                    <el-col :span="4">1</el-col>
                    <!-- 第二行 -->
                    <el-col :span="4">推送片区</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">推送车主认证状态</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">推送车主活跃度</el-col>
                    <el-col :span="4">1</el-col>
                    <!-- 第三行 -->
                    <el-col :span="4">推送车型</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">推送车主在线状态</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">出发地</el-col>
                    <el-col :span="4">1</el-col>
                    <!-- 第四行 -->
                    <el-col :span="4">目的地</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">里程</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">订单价格</el-col>
                    <el-col :span="4">1</el-col>
                    <!-- 第四行 -->
                    <el-col :span="4">推送车主数量</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">抢单车主数量</el-col>
                    <el-col :span="4">1</el-col>
                </el-row>
            </div>
        </div>

        <!-- 修改日志 -->
        <div class="logInfo-collapse collapseInfo" style="height:50%">
            <h2>推送车辆</h2>
            <div class="essentialInformation_table" style="height:100%">
                <el-table
                    :data="tableDataTree"
                    border
                   height="100%"
                    style="width: 100%">
                    <el-table-column
                                    label="选择"
                                    type="selection"
                                    width="50">
                    </el-table-column>
                <el-table-column label="序号" sortable  width="80">
                                    <template slot-scope="scope">
                                    {{ (page - 1)*pagesize + scope.$index + 1 }}
                                    </template>
                    </el-table-column>
                            <el-table-column
                    label="用户"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="车辆信息">
                    </el-table-column>
                    <el-table-column
                    label="距离提货地(KM)">
                    </el-table-column>
                    <el-table-column
                    label="当前地址">
                    </el-table-column>                    
                    <el-table-column
                    label="用户认证状态">
                    </el-table-column>
                    <el-table-column
                    label="用户账户状态">
                    </el-table-column>
                    <el-table-column
                    label="是否抢入">
                    </el-table-column>                    
                </el-table>
      <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
            </div>
        </div>
    </div>
</div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import  { data_get_MjPushLogs_list,data_get_RecordList_list} from '@/api/vest/MjPushLogs/MjPushLogs.js'
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
        sizes: [10, 50, 100],
        pagesize:10,//每页显示数
        page:1,//当前页
        dataTotal:null,//总记录数
        tableDataTree:[],//定义列表记录
        loading: false,
        dialogVisible: false,
        currentOrderSerial: '',
        formAll:{
        orderSerial:null,
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
      this.formAll.orderSerial = this.$route.query.orderSerial
      this.firstblood();
      this.firstblood2();
    },
    methods: {
            //刷新页面  
            firstblood(){
                data_get_MjPushLogs_list(1,1,this.formAll).then(res => {
                })
            },
            //刷新页面  
            firstblood2(){
                data_get_RecordList_list(this.page,this.pagesize,this.formAll).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
                })
            },
    // 每页显示数据量变更
    handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
            },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.MJDpushlogs{
 .detailsArrange{
    .collapseInfo h2{
        padding: 18px 0 18px 0;
 } 
}
.collapseInfo{
 .essentialInformation {
    padding: 20px 0 0 0;
}
}
}

</style>
