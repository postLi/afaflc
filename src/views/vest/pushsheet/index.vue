<template>
  <div class="shipper clearfix">
        <div class="shipper_searchinfo" >
          <el-form :inline="true">
            <el-form-item label="所在地：">
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
        <el-form-item>       
         <el-button type="primary"  plain @click="getdata_search()">查询</el-button> 
         <el-button type="primary"  plain  @click="clearSearch">清空</el-button>
         </el-form-item>
           </el-form> 
  </div>

  <div class="classify_info">
   <div class="btns_box">
    <newpushsheet  btntext="新增" :plain="true" type="primary" btntype="primary" icon="el-icon-news" editType="add" btntitle="新增货主"></newpushsheet>
    <el-button type="primary" plain icon="el-icon-bell" @click="handleUseStates">启用/禁用</el-button>
    <newpushsheet  btntext="修改" :plain="true" type="primary" btntype="primary" icon="el-icon-edit" editType="edit" btntitle="修改" :params="selectRowData" ></newpushsheet>
    <el-button type="primary" plain icon="el-icon-delete" @click="handleDelete">删除</el-button>
   </div>
    <el-table style="width: 100%" stripe border :data="tableDataTree" height="87%" @row-click="clickDetails" highlight-current-row>
   <el-table-column  label="序号" width="80px" type="index">
       
   </el-table-column>
   <el-table-column  label="省市" prop="areaName">
       
   </el-table-column>

   <el-table-column  label="服务类型" prop="serivceCode">
       
   </el-table-column>
   <el-table-column  label="价格上浮(倍)">
       <template slot-scope="scoped">
       <span>{{scoped.row.priceStart}} - {{scoped.row.priceEnd}}</span>
       </template>
   </el-table-column>
   <el-table-column  label="状态" prop="usingStatus">
        <template  slot-scope="scope">
          {{ scope.row.usingStatus == 0 ? '启用' : '禁用' }}
         </template>
   </el-table-column>
   <el-table-column  label="操作人"  prop="creater">
       
   </el-table-column>   
   <el-table-column  label="操作时间" prop="updateTime">
       
   </el-table-column>               
  </el-table> 
      <!-- 页码 -->
     <div class="Pagination ">
          <div class="block">
           <el-pagination 
           @size-change='handleSizeChange'
           @current-change="handleCurrentChange"
           :current-page="page"
           :page-sizes="[20, 50, 200, 400]"
           :page-size="pagesize"
           layout="total, sizes, prev, pager, next, jumper"
           :total="dataTotal"
           >
           </el-pagination>
          </div>
     </div>
   </div>
   <div>
   </div>
  </div>

</template>

<script>
import { data_ServerClassList} from '../../../api/server/areaPrice.js'
import  { data_get_pushsheet_list,data_Del_pushsheet,data_UseStates_pushsheet} from '@/api/vest/pushsheet/pushsheetList.js'
import { parseTime,formatTime } from '@/utils/index.js'
import GetCityList from '@/components/GetCityList'
import newpushsheet from './newpushsheet'
import { eventBus } from '@/eventBus'
export default {
    data(){
        return{
        delDialogVisible:false,          //删除控制弹框
        centerDialogVisible:false,
        selectRowData:{},
        information:'操作不正确',
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
        }
    },
    components:{
        GetCityList,
        newpushsheet
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
             clickDetails(i){
                 this.selectRowData = i;
                 console.log(i)
             },
        
            //  删除行
            handleDelete(){
             if(!this.selectRowData.id){
                        this.$message.info('未选中任何删除内容');
                }else{
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
                    data_Del_pushsheet(this.selectRowData.id).then(res=>{
                        this.$message.success('删除成功');
                        this.firstblood();       
                        this.selectRowData=''; 
                    }).catch(err => {
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
                if(!this.selectRowData.id){
                    //未选择任何修改内容的提示
                        this.$message.info('未选中内容');
                        return
                }else{
                 data_UseStates_pushsheet(this.selectRowData.id).then(res=>{
                     if(this.selectRowData.usingStatus==0)
                     {
                         this.$message.warning('已禁用');
                     }
                     else{
                         this.$message.success('已启用');
                     }
                        this.firstblood();       
                        this.selectRowData='';   
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

            //每页显示数据量变更
            handleSizeChange: function(val) {
                this.pagesize = val;
                this.firstblood()
            },

            //页码变更
            handleCurrentChange: function(val) {
                this.page = val;
                this.firstblood()
            },

     }

}
</script>

<style lang="scss">
.el-input__inner{line-height: 30px!important;height: 30px!important;}
.shipper{
        height:100%;    
        position: relative;
        .el-tabs{
            height: 100%;
            .el-tabs__content{
                height: 93%;
                .el-tab-pane{
                    height: 100%;
                }
            }
        }
        .shipper_searchinfo{
            position: absolute;
            left:0;
            top:0;
            padding:15px 16px;
            border-bottom:2px dashed #ccc;
            height:70px;
            width:100%;
            line-height: 35px;
            .el-form-item{
                .el-form-item__content{
                    .el-input{
                        .el-input__inner{
                            color:#3e9ff1;
                            height:30px;
                            line-height: 30px;
                        }
                    }
                    .el-button{
                        padding:8px 20px;
                    }
                }
            }
        }
        .classify_info{
            height:100%;
            padding:90px 15px 0 15px!important;
            .btns_box{
                margin-bottom:10px;
                .el-button{
                    margin-right:20px;
                    padding:10px 20px;
                }
            }
            .info_news{
                height:90%;
            }
            .el-pagination{
                margin-top:13px;
                text-align:right;
            }
        }
        .carNewinfo,.freezeInfo,.blackInfo{
            display: inline-block;
            .el-dialog{
                width: 780px;
                .el-dialog__body{
                    .el-form{
                        .shipper_information{
                            h2{ 
                                margin:10px 20px;
                                padding-bottom: 10px;
                                border-bottom: 2px solid #ccc;
                            }
                        }
                        .el-form-item{
                            .el-form-item__content{
                                .el-input{
                                    width: 250px;
                                }
                                .lessWidth{
                                    width: 80px;
                                }
                                &>.el-checkbox{
                                    margin-left: 130px;
                                }
                            }
                        }    
                        .licensePicture{
                            width: 300px;
                            line-height: 20px;
                        }
                        .moreLength{
                            .el-form-item__content{
                                .el-input{
                                    width: 637px;
                                }
                            }
                        }
                        .el-textarea{
                            width: 637px;
                            vertical-align: top;
                            font-size: 12px;
                            padding-top: 5px;
                        }
                      
                    }
                }
            }
        }
    }
   .el-table thead {
    color: #333;
}
</style>
