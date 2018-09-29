<template>
    <div style="height:100%;"  class="identicalStyle District">
          <el-form :inline="true" class="classify_searchinfo">
            <el-form-item label="所在地：">
                   <el-cascader
                    size="large"
                    :options="options"
                    v-model="formAllData.areaName"
                    @change="handleChange">
                    </el-cascader>
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
                    >
                    </shoppingDialog>
                <el-button type="primary" plain :size="btnsize" @click="handleUseStates" icon="el-icon-bell">启用/停用</el-button>
                <el-button type="danger" plain :size="btnsize" @click="delete_data" icon="el-icon-delete">删除</el-button>
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
         <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" /></div> </div>
    </div>
</template>

<script>
import {data_get_aflcTradeArea_list,data_Del_aflcTradeArea,data_Able_aflcTradeArea} from '@/api/users/district/shoppingDistrict.js'
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import shoppingCread from './shoppingCread.vue'
import shoppingDialog from './shoppingDialog.vue'
import Pager from '@/components/Pagination/index'
import { eventBus } from '@/eventBus'
export default {
    data(){
        return{
            templateRadio: '',
            options:regionDataPlus,
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
            }
        }
    },
    components:{
    shoppingCread,
    shoppingDialog,
    Pager
    },
    mounted(){
        this.firstblood();
        eventBus.$on('pushListtwo', () => {
                this.firstblood()
          })
    },
    methods:{
        handleChange(d){
           console.log('d',d)
           if(d.length<3){
                if(d.length==2){
                this.$message.error('请选择具体的城市');
                }
                this.formAllData.areaCode = null;
                this.formAllData.province = null,
                this.formAllData.city = null,
                this.formAllData.area = null,
                this.formAllData.areaName = [];
           }
           else{
                this.formAllData.areaCode = d
                this.formAllData.province = CodeToText[d[0]]
                this.formAllData.city =  CodeToText[d[1]]
                if(d[2]==''){
                this.formAllData.area = ''
                }
                else{
                this.formAllData.area = CodeToText[d[2]]
                }
           }
        },
    // 列表刷新页面  
        firstblood(){
                let FromData = {}
                if(this.formAllData.area) {
                    FromData = {
                     area:this.formAllData.area,
                     city:null,
                     tradeName:this.formAllData.tradeName,
                     tradeOwner:this.formAllData.tradeOwner,               
                    }
                }
                else if(this.formAllData.city){
                    FromData = {
                     area:null,
                     city:this.formAllData.city,
                     tradeName:this.formAllData.tradeName,
                     tradeOwner:this.formAllData.tradeOwner,                 
                    }                    
                }   
                else{
                    FromData = {
                     area:null,
                     city:null,
                     tradeName:this.formAllData.tradeName,
                     tradeOwner:this.formAllData.tradeOwner,
                                      
                    }  
                }     

        data_get_aflcTradeArea_list(this.page,this.pagesize,FromData).then(res=>{
            console.log('res',res)
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
        })
    },
    // 查询
    getdata_search(){
        this.firstblood();
    },
    // 清空查询
    clearSearch(){
                this.formAllData.areaCode = null;
                this.formAllData.province = null,
                this.formAllData.city = null,
                this.formAllData.area = null,
                this.formAllData.areaName = [];
                this.formAllData.tradeName=null,
                this.formAllData.tradeOwner=null,
                this.firstblood();
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

