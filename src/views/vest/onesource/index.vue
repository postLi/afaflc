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
                <el-form-item label="片区名称" >
                   <el-input v-model="formAll.districtName"></el-input>
                 </el-form-item>
         <el-form-item>       
         <el-button type="primary"  plain  @click="getdata_search()">查询</el-button> 
         <el-button type="primary"  plain  @click="clearSearch">清空</el-button>
         </el-form-item>
           </el-form> 
  </div>
  <div class="classify_info">
   <div class="btns_box">

  <!-- 马甲单新增修改 -->
  <div class="vestDialogBox">
 <div class="vestonceDialog commoncss">
    <el-button  type="primary" value="value" plain icon="el-icon-news" @click="openDialog()">新增</el-button>
            <el-dialog title="马甲单源" :visible="driverTemplateDialogFlag" :before-close="change">
            <div class="vestOrder">
            <el-form :inline="true" :model="vestAll" ref="vestAll" :rules="rulesForm1">
             <el-row>
            <el-col :span="12">
          <el-form-item label="服务类型" :label-width="formLabelWidth" prop="serivceCode">
                    <el-select v-model="vestAll.serivceCode" clearable placeholder="请选择">
                        <el-option
                        v-for="item in serviceCardList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
           </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="片区名称：" :label-width="formLabelWidth" prop="districtName">
            <el-input v-model="vestAll.districtName"></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">
            <el-form-item label="中心地址：" :label-width="formLabelWidth" prop="districtAddress">
            <el-input v-model="vestAll.districtAddress"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">
            <el-form-item label="省市：" :label-width="formLabelWidth" prop="areaCode">
             <GetCityList v-model="vestAll.areaCode" ref="area1"></GetCityList>
          </el-form-item>
            </el-col>
            </el-row>
             </el-form>    
             </div>
             
           <div class="vestAddress">
               <div class="vestAera">
                   <h4>提货地</h4>
                   <div class="el_vestsearch">
                       <!-- <el-button type="primary" class="vest_rbut">批量添加</el-button> -->
                       <div class="vest_section"  v-for="(form,keys) in pickAera" :key='keys'>
                         <div class="vest_tree" v-if="keys == 0" >
                             <el-input v-model="pickaddAera"></el-input>
                             <el-button class="el-icon-plus" @click="addpickAera"></el-button>
                             </div>
                         <div class="vest_tree" v-else>
                             <span class="vest_tree_span">{{form.pickAeratree}}</span>
                             <el-button class="el-icon-minus"  @click="reduceItempick(keys)"></el-button>
                       </div>     
                       </div>                  
                   </div>
               </div>

               <div class="vestAera">
                   <h4>目的地</h4>
                   <div class="el_vestsearch">
                       <!-- <el-button type="primary" class="vest_rbut">批量添加</el-button> -->
                       <div class="vest_section"  v-for="(form,keys) in destinationAera" :key='keys'>
                         <div class="vest_tree" v-if="keys == 0" >
                             <el-input v-model="destinationaddAera"></el-input>
                             <el-button class="el-icon-plus" @click="adddestinationAera"></el-button>
                             </div>
                         <div class="vest_tree" v-else>
                             <span class="vest_tree_span">{{form.destinationAeratree}}</span>
                             <el-button class="el-icon-minus"  @click="reduceItemdestination(keys)"></el-button>
                       </div>     
                       </div>                  
                   </div>
               </div>

               <div class="vestAera">
                   <h4>马甲单源预览</h4>
                   <div class="el_vestsearch">
                       <!-- <el-button type="primary" class="vest_rbut">批量添加</el-button> -->
                       <div class="vest_section" v-for="(value,keys) in totalAeraData" :key='keys'>
                         <div class="vest_tree">
                             <span class="vest_tree_span">{{value.AeraDatalist}}</span>
                       </div>     
                       </div>                  
                   </div>
               </div>

           </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="changeInfoSave1">保 存</el-button>
                        <el-button @click="close1()">取 消</el-button>
                    </div> 

            </el-dialog>
    </div>
  </div>


<!-- 详情 -->
<div class="vestDialogBox">
<div class="vestDialog commoncss">
        <el-button  type="primary"  value="value2" plain icon="el-icon-news" @click="openDialogView()">详情</el-button>
            <el-dialog title="马甲单源" :visible="driverTemplateDialogFlag2" :before-close="changeview">
            <div class="vestOrder">
            <el-form :inline="true">
             <el-row>
            <el-col :span="12">
          <el-form-item label="服务类型" :label-width="formLabelWidth" >
            <el-input v-model="selectRowData.serivceCode"  disabled></el-input>
           </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="片区名称：" :label-width="formLabelWidth">
             <el-input v-model="selectRowData.districtName" disabled></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">
            <el-form-item label="中心地址：" :label-width="formLabelWidth">
             <el-input v-model="selectRowData.districtAddress"  disabled></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">
            <el-form-item label="省市：" :label-width="formLabelWidth">
              <el-input v-model="selectRowData.areaName" disabled></el-input>
          </el-form-item>
            </el-col>
            </el-row>
             </el-form>    
             </div>
             
           <div class="vestdetail">
            <el-form :inline="true">
             <el-row>
            <el-col :span="8">
            <el-form-item label="提货地：" :label-width="formLabelWidth" class="adressstart">
            <el-input class="" v-model="formAll2.areaCode"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="8">
           <el-form-item label="目的地：" class="adressend">
            <el-input v-model="formAll2.districtName" ></el-input>
                 </el-form-item>
            </el-col>
            <el-col :span="8">
        <el-form-item :label-width="formLabelWidth">       
         <el-button type="primary"  plain  @click="getdata_search2()">查询</el-button> 
         <el-button type="primary"  plain  @click="clearSearch2">清空</el-button>
         </el-form-item>
            </el-col>
             </el-row>
             <el-row>
                 <el-row :span="24">
                <el-form-item :label-width="formLabelWidth" >       
                    <el-button  type="primary"  plain icon="el-icon-news" @click="openDialog()" class="view_btn">新增</el-button>
                </el-form-item>
                 </el-row>
             </el-row>
           </el-form> 

        <el-table style="width: 100%" stripe border :data="tableDataTree1" height="87%" @row-click="clickDetails" highlight-current-row>
        <el-table-column  label="序号" width="80px" type="index">
            
        </el-table-column>
        <el-table-column  label="提货地"  prop="districtName">
            
        </el-table-column>
        <el-table-column  label="目的地" prop="areaName">
            
        </el-table-column>
        <el-table-column  label="里程（公里）" prop="orderNum">
            
        </el-table-column>          
        <el-table-column  label="操作">
             <template slot-scope="scope">
              <el-button>删除</el-button>
              </template>
        </el-table-column>    
        </el-table> 

            <div class="Pagination ">
                <div class="block">
                <el-pagination 
                @size-change='handleSizeChange1'
                @current-change="handleCurrentChange1"
                :current-page="page1"
                :page-sizes="[20, 50, 200, 400]"
                :page-size="pagesize1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="dataTotal"
                >
                </el-pagination>
                </div>
            </div>
           </div>

            </el-dialog>
    </div>
</div>


    <el-button type="primary" plain icon="el-icon-bell"  @click="handleUseStates">启用/禁用</el-button>
     <div class="vestonceDialog commoncss">
         <el-button  type="primary" value="value" plain icon="el-icon-edit" @click="openDialog()">修改</el-button>
     </div>
    <el-button type="primary" plain icon="el-icon-delete" @click="handleDelete">删除</el-button>
   </div>


    <el-table style="width: 100%" stripe border :data="tableDataTree" height="87%" highlight-current-row @row-click="clickDetails">
   <el-table-column  label="序号" width="80px" type="index">
       
   </el-table-column>
   <el-table-column  label="片区名称" prop="districtName">
       
   </el-table-column>
   <el-table-column  label="省市" prop="areaName">
       
   </el-table-column>

   <el-table-column  label="服务类型" prop="serivceCode">
       
   </el-table-column>
   <el-table-column  label="片区中心" prop="districtAddress" >
       
   </el-table-column>
   <el-table-column  label="马甲单源数量" prop="orderNum">
       
   </el-table-column>
   <el-table-column  label="状态" prop="usingStatus">
        <template  slot-scope="scope">
          {{ scope.row.usingStatus == 0 ? '启用' : '禁用' }}
         </template>
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
import  { data_get_onesource_list,data_add_onesource_list,data_Del_onesource,data_UseStates_onesource} from '@/api/vest/onesource/onesource.js'
import { parseTime,formatTime } from '@/utils/index.js'
import GetCityList from '@/components/GetCityList'
import vestdetail from './vestdetail'
export default {
    data(){
        //    选择省市校验
            const belongCityNameValidator = (rule, val, cb) => {
             if(!this.$refs.area1.selectedOptions[0]) {
                    cb(new Error('请选择所在地'))
                }
             else{
                cb()
            }                   
            }

        //    选择服务类型校验
            const serivceCodeValidator = (rule, val, cb) => {
                        if(!val){
                cb(new Error('车主不能为空'))
                }
                else{
                    cb()
                }        
            }

        //    片区名称校验
            const districtNameValidator = (rule, val, cb) => {
                if(!val){
                cb(new Error('片区名称不能为空'))
                }
                else{
                    cb()
                }
            }

        //    片区名称校验
            const districtAddressValidator = (rule, val, cb) => {
                if(!val){
                cb(new Error('片区名称不能为空'))
                }
                else{
                    cb()
                }
            }

        return{
        serviceCardList:[],
        viewStatus:'add',
        selectRowData:{},
        selectId:[],
        driverTemplateDialogFlag:false,
        driverTemplateDialogFlag2: false,
        formLabelWidth:'120px',
        pagesize:20,//大表每页显示数
        page:1,//大表当前页
        dataTotal:null,//大表总记录数
        tableDataTree:[],//大表定义列表记录
        pagesize1:20,//详情表每页显示数
        page1:1,//详情表当前页
        dataTotal1:null,//详情表总记录数
        tableDataTree1:[],//详情表定义列表记录
        pickAera:[{
            }],
        destinationAera:[{
            }],
        pickaddAera:'',
        destinationaddAera:'',
		formAll:{
            areaCode: null,
            serivceCode:null,
            districtName: null,
            },
        formAll2:{
            areaCode: null,
            serivceCode:null,
            districtName: null,
            },    
        vestAll:{
            serivceCode:null,
            districtName:null,
            districtAddress:null,
            areaCode:null,
            flcVestUnisourceAddressaList:[
            ]
            },
        rulesForm1:{
            areaCode:{trigger:'change',required:true,validator: belongCityNameValidator},
            serivceCode:{trigger:'change',required:true,validator:serivceCodeValidator},
            districtName:{trigger:'change',required:true,validator:districtNameValidator},
            districtAddress:{trigger:'change',required:true,validator:districtAddressValidator},
            },        
        }
    },
    components:{
        GetCityList,
        vestdetail
    },
    computed:{
     totalAeraData(){
        let AeraData=[];
        console.log('this.pickAera.length',this.pickAera.length)
        console.log('this.destinationAera.length',this.destinationAera.length)
        for(var i = 1; i<this.pickAera.length;i++){


            for(var j = 1;j<this.destinationAera.length;j++)
            {
                console.log(i*j)
                  AeraData.push(
                      {
                          AeraDatalist:this.pickAera[i].pickAeratree+'-'+this.destinationAera[j].destinationAeratree,
                      }
                  )
                  console.log('AeraData',AeraData.length)
                  this.vestAll.flcVestUnisourceAddressaList.push({
                    'endAddress':this.pickAera[i].pickAeratree,
                    
                  }
                  )
               console.log('this.vestAll.flcVestUnisourceAddressaList',this.vestAll.flcVestUnisourceAddressaList)
            }
        }
        return AeraData

     }
    },
    methods:{
           //刷新页面  
            firstblood(){
                data_get_onesource_list(this.page,this.pagesize,this.formAll).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
                    console.log(this.tableDataTree)
                })
            },
            // 详情列表
            firstblood2(){
                data_get_onesource_list(this.page1,this.pagesize1,this.formAll2).then(res => {
                    this.dataTotal1 = res.data.totalCount
                    this.tableDataTree1 = res.data.list;
                    console.log('this.tableDataTree1',this.tableDataTree1)
                })
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

        openDialog(){
         this.driverTemplateDialogFlag=true;
         this.driverTemplateDialogFlag2 = false;
        },
        //弹框控制
        change() {
         this.driverTemplateDialogFlag = false;
        },
        // 详情控制
        openDialogView(){
         this.firstblood2()
         this.driverTemplateDialogFlag2=true;
        },
        //详情弹框控制
        changeview() {
         this.driverTemplateDialogFlag2 = false;
        },        
         // 提货地增加
        addpickAera(){
            if(this.pickaddAera=='')
            {
                return
            }
                this.pickAera.push({
                    pickAeratree:this.pickaddAera,
                }); 
            console.log(this.pickAera)
        },
        // 提货地减少
        reduceItempick(i){
          this.pickAera.splice(i,1);
        },
        // 目的地增加
        adddestinationAera(){
            if(this.destinationaddAera=='')
            {
                return
            }
            this.destinationAera.push({
                    destinationAeratree:this.destinationaddAera,
            }); 
        },
        // 目的地减少
        reduceItemdestination(i){
          this.destinationAera.splice(i,1);
        },
         //大表查询
            getdata_search(){
            this.formAll.areaCode = this.$refs.area.selectedOptions.pop();
             this.firstblood();
            },
        // 大表清空
            clearSearch(){
                this.$refs.area.selectedOptions = [];
                this.formAll = {
                    areaCode: null,
                    serivceCode:null,
                    districtName: null,
                },
                this.firstblood();
            },
         //详情表查询
            getdata_search2(){
             this.firstblood2();
            },
        // 详情表清空
            clearSearch2(){
                this.formAll2 = {
                    areaCode: null,
                    serivceCode:null,
                    districtName: null,
                },
                this.firstblood2();
            },

        //大表每页显示数据量变更
        handleSizeChange: function(val) {
                this.pagesize = val;
                this.firstblood()
            },

         //大表页码变更
        handleCurrentChange: function(val) {
                this.page = val;
                this.firstblood()
            },

        //详情表每页显示数据量变更
        handleSizeChange1: function(val) {
                this.pagesize1 = val;
                this.firstblood2()
            },

         //详情表页码变更
        handleCurrentChange1: function(val) {
                this.page1 = val;
                this.firstblood2()
            },    

        //  选择行   
         clickDetails(i){
                 this.selectRowData = i;
                 console.log('ddd',i)
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
                    data_Del_onesource(this.selectRowData.id).then(res=>{
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
        //完善数据
        completeData(){
            //获取城市name
                if(!this.$refs.area1){
                    return
                } 
                else if(this.$refs.area1.selectedOptions.length > 1){
                    let province;
                    this.$refs.area1.areaData.forEach((item) =>{
                        if(item.code == this.$refs.area1.selectedOptions[0]){
                            province = item
                        }
                    })
                    province.children.forEach( item => {
                        if(item.code == this.$refs.area1.selectedOptions[1]){
                            this.vestAll.areaCode = item.code;
                            this.vestAll.areaName = item.name;
                            console.log('item.name',item.name)
                        }
                    })
                }else{
                    this.$refs.area1.areaData.forEach((item) =>{
                        if(item.code == this.$refs.area1.selectedOptions[0]){
                            this.vestAll.areaCode = item.code;
                            this.vestAll.areaName = item.name;
                            console.log('item.name',item.name)
                        }
                    })
                }
            },
        // 启用禁用
            handleUseStates(){
                if(!this.selectRowData.id){
                    //未选择任何修改内容的提示
                        this.$message.info('未选中内容');
                        return
                }else{
                    this.selectId.push(this.selectRowData.id)
                    console.log(this.selectId)
                 data_UseStates_onesource(this.selectId).then(res=>{
                     this.selectId.splice(0,1);
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
                    console.log('this.selectId',this.selectId);
                }
            },    

        // 保存
        changeInfoSave1(){
          this.completeData();
            this.$refs['vestAll'].validate(valid=>{
            var forms= Object.assign({}, this.vestAll,)
              console.log(forms)

                if(valid){
                // data_add_onesource_list(forms).then(res=>{
                // console.log('res',res);
                //  this.driverTemplateDialogFlag=false;
                // this.firstblood()
                // }).catch(res=>{
                //     console.log(res)
                // });
                }
                })
        },
        // 关闭小表窗
        close1(){
         this.driverTemplateDialogFlag=false;
        }
        
        
    },
    mounted(){
        this.firstblood()
        this.getMoreInformation();
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
.vestonceDialog{
        display: inline-block;
    }
    .el-dialog{border-radius: 10px 10px 0px 0px;}
    .commoncss .el-dialog .el-input {
    width: 250px;
    }
    .el-dialog .el-dialog__header{
            border-bottom: 1px solid #ccc;
    text-align: center;
    height: 40px;
    padding: 10px 0;
    color: #fff;
    font-weight: bold;
    background-color: #0b4b7c;
    }
    .price_one{
            width:105px!important;
            margin-right: 10px;
    }
    .price_two{
            width:105px!important;
            margin-left: 10px;
    }    
    .vestOrder{
        width: 100%;
        border-bottom: 2px dashed #ccc;
    }
    .vestAddress{
        display: flex;
        margin-top:10px;
    .vestAera{
        flex-basis: 230px;
        margin-left:50px;
        h4{
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #666;
            margin-bottom: 5px;
        }
        .el_vestsearch{
            width: 230px;
            height: 356px;
            margin-bottom: 12px;
            overflow: auto;
            border: 1px solid #d2d2d2;
            overflow: auto;
            .vest_rbut{
                float: right;
                margin:10px 5px 0px 10px;
            }
            .vest_section{
                width: 100%;
                float: left;
                .vest_tree{
                    display: flex;
                    align-items: center;
                    margin-top:10px;
                 .el-input{
                    flex:10;
                    margin-left:10px;   
                 }
                .vest_tree_span{
                    flex:10;
                    margin-left:15px;
                }
                button{
                    flex:1;
                    margin-left:10px;
                }
                }

            }
        }
    }
    }
        .vestDialog{
        display: inline-block;
        .el-dialog{
            width: 780px;
                  }
        .vestdetail{
            margin-top:10px;
            height: 340px;
            padding-bottom: 80px;
        }
        .addvestbtn{
            margin-left:30px;
        }
    
    .el-button{
            margin-right:20px;
            padding:10px 20px;
    }
    .commoncss .el-dialog .el-input {
    width: 250px;
    }
    .price_one{
            width:105px!important;
            margin-right: 10px;
    }
    .price_two{
            width:105px!important;
            margin-left: 10px;
    }    
    .vestOrder{
        width: 100%;
        border-bottom: 2px dashed #ccc;
    }
    .vestAddress{
        display: flex;
        margin-top:10px;
    .vestAera{
        flex-basis: 230px;
        margin-left:50px;
        h4{
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #666;
            margin-bottom: 5px;
        }
        .el_vestsearch{
            width: 230px;
            height: 356px;
            margin-bottom: 12px;
            overflow: auto;
            border: 1px solid #d2d2d2;
            overflow: auto;
            .vest_rbut{
                float: right;
                margin:10px 5px 0px 10px;
            }
            .vest_section{
                width: 100%;
                float: left;
                .vest_tree{
                    display: flex;
                    align-items: center;
                    margin-top:10px;
                 .el-input{
                    flex:10;
                    margin-left:10px;   
                 }
                .vest_tree_span{
                    flex:10;
                    margin-left:15px;
                }
                button{
                    flex:1;
                    margin-left:10px;
                }
                }

            }
        }
    }

    }
    .adressstart 
    {
        .el-input{width:110px}
    } 
    .adressend {
        .el-input{width:110px}
       .el-form-item__label{
          text-align: left;
        }
    }
    }
    .vestDialogBox {
        display: inline;

        .el-pagination{
            margin-bottom: 13px;
             }
          .el-pagination__sizes .el-input{
                width: 100px!important;
            }
           .el-pagination__jump .el-input{
                width: 50px!important;
            }
}
</style>
<style  lang="scss" scoped>

.vestDialog .el-dialog {
    width:880px!important;
    .chooseCityList .el-cascader .el-input {
    width: 250px;
}
    .adressstart 
    {
        .el-input{width:120px}
    } 
    .adressend {
        .el-input{width:120px}
    } 
}
.commoncss .el-dialog .el-input {
    width: 250px;
}
    .el-button{
            margin-right:20px;
            padding:10px 20px;
    }
    .view_btn{
        margin-left:20px;
    }
</style>