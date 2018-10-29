<template>
    <div style="height:100%;"  class="identicalStyle District" v-loading="loading">
          <el-form :inline="true" class="classify_searchinfo">
            <el-form-item label="所在地：">
                <GetCityList ref="area" v-model="formAllData.areaName"  @returnStr="getStr"></GetCityList>
            </el-form-item>
            <el-form-item label="商圈名称：">
                <el-input v-model="formAllData.tradeName"></el-input>
            </el-form-item>
            <el-form-item label="商圈场主：">
                <el-input v-model="formAllData.tradeOwner"></el-input>
            </el-form-item>
            <el-form-item class="fr"> 
                <el-button type="primary" plain :size="btnsize"  @click="getdata_search" icon="el-icon-search">搜索</el-button>
                <el-button type="info" plain :size="btnsize" @click="clearSearch" icon="fontFamily aflc-icon-qingkong">清空</el-button>
            </el-form-item>            
    </el-form>
		<div class="classify_info" >
			<div class="btns_box">
                   <shoppingCread
                    btntext="新增"
                    :plain="true"
                    btntype="primary" 
                    editType="add"
                    btntitle="创建"
                    icon="el-icon-circle-plus"
                    v-has:BUSINESS_AREA_MANAGE_BUSINESS_ADD
                    > 
                    </shoppingCread>
                   <shoppingDialog
                    btntext="修改"
                    :plain="true"
                    btntype="primary"
                    editType="edit"
                    btntitle="修改"
                    icon="el-icon-edit"
                    @getData="getDataList"
                    :params="selectRowData"
                    v-has:BUSINESS_AREA_MANAGE_BUSINESS_UPDATE
                    >
                    </shoppingDialog>
                <el-button type="primary" plain :size="btnsize" @click="handleUseStates" icon="el-icon-bell" v-has:BUSINESS_AREA_MANAGE_BUSINESS_USE>启用/停用</el-button>
                <el-button type="primary" plain :size="btnsize" @click="delete_data" icon="el-icon-delete" v-has:BUSINESS_AREA_MANAGE_BUSINESS_DELETE>删除</el-button>
			</div>
            <div class="info_news">
            <el-table style="width: 100%" stripe border height="100%" :data="tableDataAll" ref="multipleTable"  @selection-change="getSelection" @row-click="clickDetails" highlight-current-row tooltip-effect="dark">
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
            <el-table-column  label="商圈名称" sortable>
                        <template slot-scope="scoped">
                        <shoppingDialog
                            :btntext='scoped.row.tradeName'
                            btntype="text"
                            :plain="false"
                            editType="view"
                            btntitle="详情"
                            :params="scoped.row"
                            >
                            </shoppingDialog>
                        </template>
            </el-table-column>
            <el-table-column  label="所在地" prop="areaName" sortable>
            </el-table-column>    
            <el-table-column  label="商圈场主" prop="tradeOwner" sortable>
            </el-table-column> 
            <el-table-column  label="场主手机号" prop="ownerPhone" sortable>
            </el-table-column>
            <el-table-column  label="商圈货主数量" prop="" sortable>
            </el-table-column>       
            <el-table-column  label="状态" sortable>
            <template  slot-scope="scope">
              {{ scope.row.usingStatus == 1 ? '启用' : '停用' }}
            </template>
            </el-table-column>                                                                                                           
            </el-table> 
        </div>
		</div>
         <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>
    </div>
</template>

<script>
import {data_get_aflcTradeArea_list,data_Del_aflcTradeArea,data_Able_aflcTradeArea} from '@/api/users/district/shoppingDistrict.js'
import GetCityList from '@/components/GetCityList/city'
import shoppingCread from './shoppingCread.vue'
import shoppingDialog from './shoppingDialog.vue'
import Pager from '@/components/Pagination/index'
import { eventBus } from '@/eventBus'
export default {
    data(){
        return{
            loading:true,
            templateRadio: '',
            btnsize:'mini',
            selectRowData:{},
            page:1,
            pagesize:20,
            dataTotal:0,
            tableDataAll:[],
            selectId:[],
            formAllData:{
                areaCode: null,
                tradeName:null,
                tradeOwner:null,
                areaCode:null,
                areaName:null,
            }
        }
    },
    components:{
    shoppingCread,
    shoppingDialog,
    Pager,
    GetCityList
    },
    mounted(){
        this.firstblood();
        eventBus.$on('pushListtwo', () => {
                this.firstblood()
          })
    },
    methods:{
    getStr(val){
                this.formAllData.areaCode = val.area.code;
            },  

    // 列表刷新页面  
    firstblood(){
        this.loading =true
        data_get_aflcTradeArea_list(this.page,this.pagesize,this.formAllData).then(res=>{
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                    this.loading = false
        })
    },
    // 查询
    getdata_search(){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
        this.firstblood();
    },
    // 清空查询
    clearSearch(){
                this.formAllData.areaCode = null;
                this.formAllData.areaName = null;
                this.formAllData.tradeName=null,
                this.formAllData.tradeOwner=null,
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
                this.firstblood();
                this.$refs.area.clearData();
                
    },
    getSelection(val){
     console.log('选中内容',val)
     this.selectRowData = val;
   },
    //点击选中当前行
    clickDetails(row, event, column){
      this.$refs.multipleTable.toggleRowSelection(row);
    }, 
    // 选择删除
        delete_data(){
                    if(!this.selectRowData.length){
                        this.$message.warning('请选择您要操作的用户');
                        return
                    }
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
                    data_Del_aflcTradeArea(this.selectRowData[0].id).then(res=>{
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
                    if(!this.selectRowData.length){
                        this.$message.warning('请选择您要操作的用户');
                        return
                    }
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
                  data_Able_aflcTradeArea(this.selectId).then(res=>{
                     this.selectId.splice(0,1);
                     if(this.selectRowData[0].usingStatus==1)
                     {
                         this.$message.warning('已停用');
                     }
                     else{
                         this.$message.success('已启用');
                     }
                        this.firstblood();       
                        this.$refs.multipleTable.clearSelection(); 
                    })
                }
        },  
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
.District{
.el-cascader{
        margin-top:-10px;
}
.btns_box{
    .el-button{
        font-size:12px;
    }
}
}
</style>

