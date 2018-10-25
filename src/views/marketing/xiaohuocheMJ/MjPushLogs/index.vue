<template>
    <div class="identicalStyle Mypushlogs" style="height:100%">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
                <el-form-item label="订单号" >
                   <el-input v-model="formAll.orderSerial"></el-input>
                 </el-form-item>
                  <el-form-item label="出发地" >
                   <el-input v-model="formAll.startAddressName"></el-input>
                 </el-form-item>
         <el-form-item class="fr">
         <el-button type="primary"  plain  @click="getdata_search()" :size="btnsize">查询</el-button> 
         <el-button type="primary"  plain  @click="clearSearch" :size="btnsize">清空</el-button>
         </el-form-item>
           </el-form> 
  <div class="classify_info">
    <div class="info_news">  
    <el-table  ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="tableDataTree">
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
   <el-table-column  label="订单号"  sortable prop="orderSerial" width="250">
   <template slot-scope="scope">
   <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
   </template>
   </el-table-column>
   <el-table-column  label="推送时间"  sortable prop="createTime" width="150"></el-table-column>
   <el-table-column  label="服务类型"  sortable prop="serivceCode" width="150"></el-table-column>
   <el-table-column  label="区域"  sortable prop="areaName" width="150"></el-table-column>
   <el-table-column  label="推送片区"  sortable prop="districtName" width="150"></el-table-column>
   <el-table-column  label="推送车主认证状态"  sortable prop="authStateName" width="150"></el-table-column>
   <el-table-column  label="推送车主活跃度"  sortable prop="liveness" width="150"></el-table-column>
   <el-table-column  label="推送车型"  sortable prop="carType" width="150"></el-table-column>
   <el-table-column  label="推送车主在线状态"  sortable prop="isLineName" width="150"></el-table-column>
   <el-table-column  label="出发地"  sortable prop="startAddressName" width="150"></el-table-column>
   <el-table-column  label="目的地"  sortable prop="endAddressName" width="150"></el-table-column>
   <el-table-column  label="里程"  sortable prop="mileage" width="150"></el-table-column>
   <el-table-column  label="订单价格"  sortable prop="totalAmount" width="150"></el-table-column>
   <el-table-column  label="推送车主数量"  sortable prop="pushDriverCout" width="150"></el-table-column>                 
  </el-table> 
    </div>
      <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
   </div>
   <div>
   </div>
  </div>
</template>

<script>
import { data_ServerClassList} from '@/api/server/areaPrice.js'
import { parseTime,formatTime } from '@/utils/index.js'
import  { data_get_MjPushLogs_list} from '@/api/vest/MjPushLogs/MjPushLogs.js'
import Pager from '@/components/Pagination/index'
import { eventBus } from '@/eventBus'
export default {
    data(){
        return{
        btnsize:'mini',
        selectRowData:{},
        sizes: [20, 50, 100],
        pagesize:20,//每页显示数
        page:1,//当前页
        dataTotal:null,//总记录数
        tableDataTree:[],//定义列表记录
        formAll:{
            orderSerial:null,
            startAddressName:null,
        }
        }

    },
    components:{
        Pager
    },
    mounted(){
    this.firstblood();
     },  
     methods:{
            //刷新页面  
            firstblood(){
                data_get_MjPushLogs_list(this.page,this.pagesize,this.formAll).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
                    //  this.tableDataTree.forEach(item => {
                    //     item.createTime = parseTime(item.createTime,"{y}-{m}-{d}");
                    //     item.updateTime = parseTime(item.updateTime,"{y}-{m}-{d}");
                    // })
                })
            },
            // 判断选中与否
            getSelection(val){
            console.log('选中内容',val)
            this.selectRowData = val;
           },
            //点击选中当前行
            clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row);
            },
            // 进入详情
            pushOrderSerial(val){
              this.$router.push({name: '推送记录详情',query:{ orderSerial:val.orderSerial}});
            },
            // 查询
            getdata_search(){
             this.firstblood();
            },
            // 清空
            clearSearch(){
                this.formAll = {
                    orderSerial:null,
                    startAddressName:null,
                },
                this.firstblood();
            },
            // 每页显示数据量变更
            handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
            },
            getDataList(){
                this.firstblood()
                this.$refs.multipleTable.clearSelection();
            }
     }
}
</script>

<style lang="scss">
.Mypushlogs{
    .BtnInfo{
    font-weight: bold;
    font-size: 14px;
    color: #3e9ff1;
    cursor: pointer;
    }   
}

</style>
