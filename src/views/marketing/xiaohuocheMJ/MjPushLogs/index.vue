<template>
    <div class="identicalStyle MjD" style="height:100%">
  <div class="classify_info">
   <div class="btns_box">
     <el-button type="primary" plain icon="el-icon-news" @click="pushOrderSerial" :size="btnsize">查看推送详情</el-button>
   </div>
    <div class="info_news">  
    <el-table  ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row>
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
   <el-table-column  label="订单号"  sortable></el-table-column>
   <el-table-column  label="推送时间"  sortable></el-table-column>
   <el-table-column  label="服务类型"  sortable></el-table-column>
   <el-table-column  label="区域"  sortable></el-table-column>
   <el-table-column  label="推送片区"  sortable></el-table-column>
   <el-table-column  label="推送车主认证状态"  sortable></el-table-column>
   <el-table-column  label="推送车主活跃度"  sortable></el-table-column>
   <el-table-column  label="推送车型"  sortable></el-table-column>
   <el-table-column  label="推送车主在线状态"  sortable></el-table-column>
   <el-table-column  label="出发地"  sortable></el-table-column>
   <el-table-column  label="目的地"  sortable></el-table-column>
   <el-table-column  label="里程"  sortable></el-table-column>
   <el-table-column  label="订单价格"  sortable></el-table-column>
   <el-table-column  label="推送车主数量"  sortable></el-table-column>                 
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
        }
        formAll:[]
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
                data_get_pushsheet_list(this.page,this.pagesize,this.formAll).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
                     this.tableDataTree.forEach(item => {
                        item.createTime = parseTime(item.createTime,"{y}-{m}-{d}");
                        item.updateTime = parseTime(item.updateTime,"{y}-{m}-{d}");
                    })
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
            pushOrderSerial(){
            //     if(this.selectRowData.length==undefined){
            //       this.$message.warning('请选择您要操作的用户');
            //       return
            //   }
            //   else if(this.selectRowData.length == 0){
            //       this.$message.warning('请选择您要操作的用户');
            //       return
            //   }else if (this.selectRowData.length > 1) {
            //         this.$message({
            //             message: '每次只能操作单条数据~',
            //             type: 'warning'
            //         })
            //       this.$refs.multipleTable.clearSelection();
            //   }
            // else{
              this.$router.push({name: '推送记录详情',query:{ Id:'1111' }});
            // }
            },
            // 查询
            getdata_search(){
             this.firstblood();
            },
            // 清空
            clearSearch(){
                this.formAll = {
                    areaCode: null,
                    serivceCode:null,
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
</style>
