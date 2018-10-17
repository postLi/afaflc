<template>
    <div class="identicalStyle MjD" style="height:100%">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="所属区域：">
              <GetCityList v-model="formAll.areaCode" ref="area"></GetCityList>
          </el-form-item>
           <el-form-item label="服务类型">
                    <el-select v-model="formAll.serivceCode" clearable placeholder="请选择">
                        <el-option
                        v-for="item in serviceCardList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                 </el-form-item>
        <el-form-item class="fr">       
         <el-button type="primary" plain @click="getdata_search()" :size="btnsize" icon="el-icon-search">搜索</el-button>
         <el-button type="info"  plain  @click="clearSearch" :size="btnsize" icon="fontFamily aflc-icon-qingkong"> 清空</el-button>
         </el-form-item>
           </el-form> 
  <div class="classify_info">
   <div class="btns_box">
    <newpushsheet  btntext="新增" :plain="true" type="primary" btntype="primary" icon="el-icon-circle-plus" editType="add" btntitle="新增"  @getData="getDataList"></newpushsheet>
    <uppushsheet  btntext="修改" :plain="true" type="primary" btntype="primary" icon="el-icon-edit" editType="edit" :params="selectRowData"  @getData="getDataList"></uppushsheet>
     <el-button type="primary" plain icon="el-icon-bell" @click="handleUseStates" :size="btnsize">启用/禁用</el-button>
     <el-button type="primary" plain icon="el-icon-delete" @click="handleDelete" :size="btnsize">删除</el-button>
   </div>
    <div class="info_news">  
    <el-table  ref="multipleTable" style="width: 100%" stripe border :data="tableDataTree" height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row>
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
   <el-table-column  label="所属区域" prop="areaName" sortable>
   </el-table-column>
   <el-table-column  label="服务类型" prop="serivceCodeName" sortable>
   </el-table-column>
   <el-table-column  label="价格上浮(倍)" sortable>
       <template slot-scope="scoped">
       <span>{{scoped.row.priceStart}} - {{scoped.row.priceEnd}}</span>
       </template>
   </el-table-column>
   <el-table-column  label="状态" prop="usingStatus" sortable>
        <template  slot-scope="scope">
          {{ scope.row.usingStatus == 1 ? '启用' : '禁用' }}
         </template>
   </el-table-column>
   <el-table-column  label="操作人"  prop="creater" sortable>
       
   </el-table-column>   
   <el-table-column  label="操作时间" prop="updateTime" sortable>
       
   </el-table-column>               
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
import  { data_get_pushsheet_list,data_Del_pushsheet,data_UseStates_pushsheet,data_get_pushsheet_Id} from '@/api/vest/pushsheet/pushsheetList.js'
import { parseTime,formatTime } from '@/utils/index.js'
import GetCityList from '@/components/GetCityList'
import newpushsheet from './newpushsheet'
import Pager from '@/components/Pagination/index'
import uppushsheet from './newpushsheet'
import { eventBus } from '@/eventBus'
export default {
    data(){
        return{
        btnsize:'mini',
        delDialogVisible:false,          //删除控制弹框
        centerDialogVisible:false,
        selectRowData:{},
        sizes: [20, 50, 100],
        pagesize:20,//每页显示数
        page:1,//当前页
        dataTotal:null,//总记录数
        tableDataTree:[],//定义列表记录
        searchInfo:{
        title:null,
        belongDriver:null,
         },
		formAll:{
            areaCode: null,
            serivceCode:null,
            },
        serviceCardList:[
        ],
        serviceValue:null,
        formAllId:'',
        setting:{
                createTime:null,
                startTime:null,
                endTime:null,
        sett:{}
            }    
        }
    },
    components:{
        GetCityList,
        newpushsheet,
        uppushsheet,
        Pager
    },
    mounted(){
        eventBus.$on('pushListtwo', () => {
        this.firstblood()
        })
    this.firstblood();          
    this.getMoreInformation();
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
            //  删除行
            handleDelete(){
            if(this.selectRowData.length==undefined){
                this.$message.warning('请选择您要操作的用户');
                return
            }
            else if(this.selectRowData.length == 0){
                this.$message.warning('请选择您要操作的用户');
                return
            }else if (this.selectRowData.length > 1) {
                    this.$message({
                        message: '每次只能操作单条数据~',
                        type: 'warning'
                    })
                this.$refs.multipleTable.clearSelection();
            }
            else{
                this.delDataInformation();
            }
            },
            //确认删除
            delDataInformation(){         
                   this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    var forms=JSON.parse(JSON.stringify(this.formAllId))
                    console.log('forms',forms)
                    data_Del_pushsheet(this.selectRowData[0].id).then(res=>{
                        this.$message.success('删除成功');
                        this.firstblood();       
                         this.$refs.multipleTable.clearSelection();
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + err.text ? err.text : err
                        })
                         this.$refs.multipleTable.clearSelection();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                     this.$refs.multipleTable.clearSelection();
                })   
            },
            // 启用禁用
            handleUseStates(){
                if(this.selectRowData.length==undefined){
                    this.$message.warning('请选择您要操作的用户');
                    return
                }
                else if(this.selectRowData.length == 0){
                    this.$message.warning('请选择您要操作的用户');
                    return
                }else if (this.selectRowData.length > 1) {
                        this.$message({
                            message: '每次只能操作单条数据~',
                            type: 'warning'
                        })
                    this.$refs.multipleTable.clearSelection();
                }
                else{
                 data_UseStates_pushsheet(this.selectRowData[0].id).then(res=>{
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
            // 类型列表
            getMoreInformation(){
                data_ServerClassList().then(res=>{
                     res.data.map((item)=>{
                        this.serviceCardList.push(item);
                    })
                }).catch(res=>{
                    console.log(res)
                });
            },
           
            // 查询
            getdata_search(){
            this.formAll.areaCode = this.$refs.area.selectedOptions.pop();
             this.firstblood();
            },
            // 清空
            clearSearch(){
                this.$refs.area.selectedOptions = [];
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
.MjD{
    .el-cascader{
        margin-top: -10px;
    }
}
</style>
