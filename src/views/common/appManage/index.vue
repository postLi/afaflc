<template>
    <div class="identicalStyle Marketing" style="height:100%" v-loading="loading">
          	<div class="classify_info">
            	<div class="btns_box">
                   <add
                    btntext="新增"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-circle-plus"
                    editType="add"
                    @getData="getDataList"
                    btntitle="创建">
                    </add>
                <el-button  type="primary" plain icon="el-icon-bell" @click="handleUseStates" :size="btnsize" v-has:MARKETING_DRIVER_MANAGE_ORDER_NUM_REWARD_USE>启用/停用</el-button>
                <el-button type="primary" plain icon="el-icon-delete" @click="delete_data" :size="btnsize" v-has:MARKETING_DRIVER_MANAGE_ORDER_NUM_REWARD_DELETE>删除</el-button>
            	</div>
            <div class="info_news">    
               <el-table style="width: 100%" ref="multipleTable" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="tableDataAll"  >
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
            <el-table-column  label="app下载量" prop="appDownloadNum" sortable>
            </el-table-column>
            <el-table-column  label="app下载地址" prop="appDownloadUrl" sortable>
            </el-table-column>
            <el-table-column  label="app名称" prop="appName" sortable>
            </el-table-column>
            <el-table-column  label="app类型" prop="appType" sortable>
            </el-table-column>
            <el-table-column  label="app上传时间" prop="appUploadTime" sortable>
            </el-table-column>
            <el-table-column  label="app版本号" prop="appVersion" sortable>
            </el-table-column>
            <el-table-column  label="更新内容" prop="remark" sortable>
            </el-table-column>
            <el-table-column  label="版本发布时间" prop="versionDate" sortable>
            </el-table-column>
            </el-table> 
                <!-- 页码 -->
       <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>  
        	</div> 
          </div>
      </div>
</template>
<script>
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import {parseTime} from '@/utils/'
import add from './add.vue'
export default {
  data(){
    return{
      loading:false,
      btnsize:'mini',
      sizes:[20,50,100],
      information:'操作不正确',
      pagesize:20,//每页显示数
      page:1,//当前页
      totalCount:null,
      dataTotal:null,
      tableDataAll:[],
	  formAllData:{
            areaCode: null,
            carType:null,
            commissionGrade:null,
            },
    }
  },
    components:{
        Pager,
        add
    },
    methods:{
          // 列表刷新页面  
            firstblood(){
            },
         //  查询
         getData_query(){
          this.page = 1;
          this.$refs.pager.inputval = this.page;
          this.$refs.pager.pageNum = this.page;             
          this.firstblood();
          },
        // 清空
        clearSearch(){
        this.formAllData =  {
        }
       if(this.page!= 1){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
            this.firstblood()    
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
        //每页显示数据量变更
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood();
        },
        // 选择删除
        delete_data(){
          if(this.selectRowData.length == 0){
               this.$message.warning('请选择您要操作的用户');
               return
          }else if (this.selectRowData.length > 1) {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
               this.$refs.multipleTable.clearSelection();
          }else {
                this.delDataInformation()
            }
        },
       //确认删除
            delDataInformation(){         
                   this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    data_Del_orderFromsame(this.selectRowData[0].id).then(res=>{
                        this.$message.success('删除成功');
                        this.firstblood();       
                        this.selectRowData=''; 
                    }).catch(err => {
                      console.log('rr',res)
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + err.text ? err.text : err
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })   
            },
      // 启用禁用
        handleUseStates(){
                if(this.selectRowData.length == 0){
                    this.$message.warning('请选择您要操作的用户');
                    return
                }else if (this.selectRowData.length > 1) {
                        this.$message({
                            message: '每次只能操作单条数据~',
                            type: 'warning'
                        })
                    this.$refs.multipleTable.clearSelection();
                }
                else {
                    this.selectId.push(this.selectRowData[0].id)
                    
                  data_Able_orderFromsame(this.selectId).then(res=>{
                     this.selectId.splice(0,1);
                     if(this.selectRowData[0].usingStatus==1)
                     {
                         this.$message.warning('已禁用');
                     }
                     else{
                         this.$message.success('已启用');
                     }
                        this.firstblood();       
                        this.$refs.multipleTable.clearSelection();
                    })
                }
        },
           getDataList(){
                this.firstblood()
                this.$refs.multipleTable.clearSelection();
    }
   },
  mounted(){
     eventBus.$on('pushListtwo', () => {
                this.firstblood()
    })
    this.firstblood();
    },
}
</script>
<style lang="scss" >
.Marketing{
  .el-cascader{
    margin-top:-10px;
  }
}
</style>