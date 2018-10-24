<template>
    <div class="vestdetail commoncss">
   <el-button  :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialogView()"><span :class="editType=='view'?'BtnInfo':''">{{btntext}}</span ></el-button>
            <el-dialog title="马甲单源" :visible="driverTemplateDialogFlag2" :before-close="change1">
            <div class="vestOrder">
            <el-form :inline="this.editType=='edit'" :rules="rulesForm1" :model="selectRowData" ref="selectRowData">
             <el-row>
            <el-col :span="12">
            <el-form-item label="服务类型：" :label-width="formLabelWidth" prop="serivceCode" >
         <el-select v-model="selectRowData.serivceCode" clearable placeholder="请选择" :disabled="editType=='view'">
                        <el-option
                         v-for="item in serviceCardList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
          </el-select>
           </el-form-item>
            </el-col>
            <el-col :span="12">
           <el-form-item label="片区名称：" :label-width="formLabelWidth" prop="districtName">
               <el-input v-model="selectRowData.districtName" :maxlength='50' :disabled="editType=='view'"></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">
             <el-form-item label="中心地址：" :label-width="formLabelWidth" prop="districtAddress">
             <el-input @focus="()=>{showMap('selectdistrictAddress')}" v-model="selectRowData.districtAddress" :disabled="editType=='view'"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">
             <el-form-item  label="省市：" :label-width="formLabelWidth" v-if="editType !=='add'&&!selectFlag" prop="areaName"> 
                    <el-input v-model="selectRowData.areaName" @focus="changeSelect" :disabled="editType=='view'"></el-input>
             </el-form-item>  
            <el-form-item label="省市：" :label-width="formLabelWidth" prop="areaName" v-else>
                <GetCityList v-model="selectRowData.areaName" ref="area" @returnStr="getStr"></GetCityList>
            </el-form-item>
            </el-col>
            </el-row>
             </el-form>    
             </div>
             
           <div class="vestadresss">
            <el-form :inline="true">
             <el-row>
            <el-col :span="8">
            <el-form-item label="提货地：" class="adressstart">
           <el-input @focus="()=>{showMap('areaCode2')}" v-model="formAll2.startAddress"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="8">
           <el-form-item label="目的地：" class="adressend">
            <el-input @focus="()=>{showMap('districtName2')}" v-model="formAll2.endAddress"></el-input>
                 </el-form-item>
            </el-col>
            <el-col :span="8">
        <el-form-item >       
         <el-button type="primary"  plain  @click="getdata_search2()">查询</el-button> 
         <el-button type="primary"  plain  @click="clearSearch2">清空</el-button>
         </el-form-item>
            </el-col>
             </el-row>
             <el-row>
                 <el-row :span="24" v-if="editType=='edit'">
                <el-form-item :label-width="formLabelWidth" >       
                    <el-button  type="primary"  plain icon="el-icon-news" @click="openDialog1()" class="view_btn" >新增</el-button>
                    <el-button  type="primary" plain icon="el-icon-delete" @click="handleDelete2" >删除</el-button>
                </el-form-item>
                 </el-row>
             </el-row>
           </el-form>
        <div class="el-tableTree1">
        <el-table  stripe border :data="tableDataTree1"   highlight-current-row @row-click="clickDetails2">
        <el-table-column  label="序号" width="80px" type="index">
            
        </el-table-column>
        <el-table-column  label="提货地"  prop="endAddress">
            
        </el-table-column>
        <el-table-column  label="目的地" prop="startAddress">
            
        </el-table-column>
        <el-table-column  label="里程（公里）" prop="distance">
            
        </el-table-column>          
        </el-table> 
            <div class="Pagination ">
                <div class="block">
                <el-pagination 
                @size-change='handleSizeChange1'
                @current-change="handleCurrentChange1"
                :current-page="page1"
                :page-sizes="[4, 10, 20, 30]"
                :page-size="pagesize1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="dataTotal1"
                >
                </el-pagination>
                </div>
            </div>
            </div>
           </div>
           <div slot="footer" class="dialog-footer" >
                        <el-button type="primary" @click="changeInfoSave2" >保 存</el-button>
                        <el-button @click="close2()">取 消</el-button>
                    </div> 
            </el-dialog>

             <el-dialog title="马甲单源" :visible="driverTemplateDialogFlag3" :before-close="change2">
            <div class="vestOrder">
            <el-form :inline="true">
             <el-row>
            <el-col :span="12">
          <el-form-item label="服务类型：" :label-width="formLabelWidth">
                    <el-select v-model="selectRowData1.serivceCode" clearable placeholder="请选择" disabled>
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
            <el-form-item label="片区名称：" :label-width="formLabelWidth" >
            <el-input v-model="selectRowData1.districtName" :maxlength='50' disabled ></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">   
            <el-form-item label="中心地址：" :label-width="formLabelWidth" >
            <el-input @focus="()=>{showMap('districtAddress')}" v-model="selectRowData1.districtAddress" disabled></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">
            <span >
            <el-form-item label="省市：" :label-width="formLabelWidth" >
                <el-input v-model="selectRowData1.areaName" disabled></el-input>
            </el-form-item>
                 </span>
            </el-col>
            </el-row>
             </el-form>    
             </div>
           <div class="vestAddress">
               <div class="vestAera">
                   <h4>提货地</h4>
                   <div class="el_vestsearch">
                       <div class="vest_section"  v-for="(form,keys) in pickAera" :key='keys'>
                         <div class="vest_tree" v-if="keys == 0" >
                             <el-input @focus="()=>{showMap('pickaddAera')}" v-model="pickaddAera"></el-input>
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
                       <div class="vest_section"  v-for="(form,keys) in destinationAera" :key='keys'>
                         <div class="vest_tree" v-if="keys == 0" >
                             <el-input @focus="()=>{showMap('destinationaddAera')}" v-model="destinationaddAera"></el-input>
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
                       <div class="vest_section" v-for="(value,keys) in totalAeraData1" :key='keys'>
                         <div class="vest_tree">
                        <span class="vest_tree_span">{{value.startAddressName}}-{{value.endAddressName}}</span>
                       </div>     
                       </div>                  
                   </div>
               </div>

           </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="changeInfoSavaAdress">保 存</el-button>
                        <el-button >取 消</el-button>
                    </div>
             </el-dialog>
            <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" />
    </div>
</template>
<script>
import { data_ServerClassList} from '@/api/server/areaPrice.js'
import  { data_get_aflcVestUnisource_Id,data_get_onesourceAddress_list,data_get_onesource_update,data_Del_onesourceAddress,data_get_onesource_addDetailAddress} from '@/api/vest/onesource/onesource.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
import newonesource from './newonesource'
import { eventBus } from '@/eventBus'
import vregion from '@/components/vregion/Region'
import tmsmap from '@/components/map/index'
export default {
data(){
        //    选择省市校验
            const belongCityNameValidator = (rule, val, cb) => {
             if(!val) {
                    cb(new Error('请选择所在地'))
                }
             else{
                cb()
            }                   
            }

        //    选择服务类型校验
            const serivceCodeValidator = (rule, val, cb) => {
                if(!val){
                cb(new Error('服务类型不能为空'))
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
                cb(new Error('片区中心不能为空'))
                }
                else{
                    cb()
                }
            }

    return{
            driverTemplateDialogFlag2: false,// 弹框控制的控制
            driverTemplateDialogFlag3:false,
            popVisible:false,
            selectFlag:false,
            pagesize1:4,//详情表每页显示数
            page1:1,//详情表当前页
            dataTotal1:null,//详情表总记录数
            tableDataTree1:[],//详情表定义列表记录
            formLabelWidth:'100px',
            selectRowData:{},
            selectRowData1:{},
            serviceCardList:[],
            serviceValue:null,
            vestAll:{
            serivceCode:null,
            districtName:null,
            districtAddress:null,
            areaCode:null,
            longitude:null,
            latitude:null,
            areaName:null,
            areaCode:null,
            flcVestUnisourceAddressaList:[
            ]
            },
            pickAera:[{
            }],
            destinationAera:[{
            }],
            pickaddAera:'',
            destinationaddAera:'',
            vestAdree:{
                id:null,
                flcVestUnisourceAddressaList:[]
            }, 
    	 	formAll2:{},
            rulesForm1:{
            areaName:{trigger:'change',required:true,validator: belongCityNameValidator},
            serivceCode:{trigger:'change',required:true,validator:serivceCodeValidator},
            districtName:{trigger:'change',required:true,validator:districtNameValidator},
            districtAddress:{trigger:'change',required:true,validator:districtAddressValidator},
            },  

    }
},
props:{
        value:{
            type: String,
            default:''
        },
        btntype: {
            type: String,
            default: ''
        },
        btntext: {
            type: String,
            default: ''
        },
        btntitle: {
            type: String,
            default: ''
        },
        icon:{
            type: String,
            default: ''
        },
        plain:{
            type: Boolean,
            default: false
        },
        params:{
            type:[Object,String,Array],
            default: ''
         },
        paramsdata:{
            type:[Object,String,Array],
            default: ''
         },
        /* add新增，edit编辑，view查看*/
        editType: {
        type: String
        }

},
components:{
    GetCityList,
    tmsmap
},
watch:{
   driverTemplateDialogFlag2:{
        handler: function(val, oldVal) {
            if(!val){
                this.selectFlag=false
                this.$emit('getData') 
            }
        }
   },
     driverTemplateDialogFlag3:{
        handler: function(val, oldVal) {
            if(!val){
            this.vestAll={
                serivceCode:null,
                districtName:null,
                districtAddress:null,
                areaCode:null,
                latitude:null,
                longitude:null,
                flcVestUnisourceAddressaList:[
                ]
                }
                this.pickaddAera = ''
                this.destinationaddAera =''
                this.pickAera = [
                    {
                    pickAeratree:null,
                    startAddressCoordinate:null,
                    startAddressName:null,   
                    }
                ]
                this.destinationAera = [
                    {
                    destinationAeratree:null,
                    endAddressCoordinate:null,
                    endAddressName:null
                    }
                ]
                this.$emit('getData') 
            }
        },
    },
   },
    computed:{
     totalAeraData1(){
        let AeraData=[];
        for(var i = 1; i<this.pickAera.length;i++){
            for(var j = 1;j<this.destinationAera.length;j++)
            {
                  AeraData.push(
                      {
                          startAddressName:this.pickAera[i].pickAeratree,
                          startAddressCoordinate:this.pickAera[i].startAddressCoordinate,
                          startAddress:this.pickAera[i].startAddressName,
                          endAddressCoordinate:this.destinationAera[j].endAddressCoordinate,
                          endAddress:this.destinationAera[j].endAddressName,
                          endAddressName:this.destinationAera[j].destinationAeratree,
                      }
                  )

            }
        }
        return AeraData
     },
    },
methods:{
      // 省市
       getStr(val){
                this.selectRowData.areaCode = val.city.code
                this.selectRowData.areaName = val.city.name
        },
      // 省市
       getStr2(val){
                this.vestAll.areaCode = val.city.code
                this.vestAll.areaName = val.city.name
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
        //弹框控制
        change1() {
         this.driverTemplateDialogFlag2 = false;
         this.driverTemplateDialogFlag3 = false;

        },
       //弹框控制
        change2() {
         this.driverTemplateDialogFlag3 = false;
        },
        changeSelect(){
            if(this.editType==='add'){
                this.selectFlag=false
            } else{
                this.selectFlag=true
            }
        },
        // 详情列表
        firstblood2(){
                data_get_onesourceAddress_list(this.page1,this.pagesize1,this.formAll2).then(res => {
                    this.dataTotal1 = res.data.totalCount;
                    this.tableDataTree1 = res.data.list;
                })
         },     
        //详情弹框控制
        changeview() {
         this.driverTemplateDialogFlag2 = false;
        },                 
        showMap(name) {
            this.popVisible = true ;
            this.current = name;
        },
          getInfo(pos, name, info) {
        console.log('info',info.addressComponent)
            switch (this.current) {
                case 'pickaddAera':
                let posstartArray = pos.split(',');
                this.startAddressCoordinate = posstartArray[1]+','+posstartArray[0]
                if(info.addressComponent.street){
                  this.startAddressName= info.addressComponent.street + info.addressComponent.streetNumber
                }
                else{
                  this.startAddressName = info.pois[0].address
                }
                if(info.addressComponent.building){
                  this.pickaddAera = info.addressComponent.building
                }
                else{
                  if(info.aois.length>0){
                  this.pickaddAera = info.aois[0].name
                  }
                  else{
                  this.pickaddAera = info.pois[0].name
                  }        
                }
                break;
                case 'destinationaddAera':
                let posendArray = pos.split(',');
                this.endAddressCoordinate = posendArray[1]+','+posendArray[0]
                if(info.addressComponent.street){
                  this.endAddressName= info.addressComponent.street + info.addressComponent.streetNumber
                }
                else{
                  this.endAddressName = info.pois[0].address
                }
                if(info.addressComponent.building){
                  this.destinationaddAera = info.addressComponent.building
                }
                else{
                  if(info.aois.length>0){
                  this.destinationaddAera = info.aois[0].name
                  }
                  else{
                  this.destinationaddAera = info.pois[0].name
                  }    
                }
                break;
            }
        },  
        //详情表查询
            getdata_search2(){

             this.firstblood2();
            },
        // 详情表清空
            clearSearch2(){
                this.formAll2.endAddress=null
                this.formAll2.startAddress=null
                this.firstblood2();
            },
      //  详情表删除行
            handleDelete2(){
             if(!this.selectRowData2){
              this.$message.info('未选中任何删除内容');
                }else{
                this.delDataInformation2();
            }  
            },
        //详情确认删除
        delDataInformation2(){       
                   this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    data_Del_onesourceAddress(this.selectRowData2.id).then(res=>{
                        console.log('fdfd')
                          this.$message.success('删除成功');   
                        this.firstblood2();       
                        this.selectRowData2=''; 
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

        // 修改保存
        changeInfoSave2(){
            this.selectRowData.flcVestUnisourceAddressaList=this.tableDataTree1;
            this.driverTemplateDialogFlag2=false;
            data_get_onesource_update(this.selectRowData).then(res=>{
            this.$message.success('修改成功');
                }).catch(res=>{
            this.$message.error('修改失败');
        });
        },
        //  详情表选择行   
         clickDetails2(i){
                 this.selectRowData2 = i;
        },         
         //详情表页码变更
        handleCurrentChange1: function(val) {
                this.page1 = val;
                this.firstblood2()
            },   
        //详情表每页显示数据量变更
        handleSizeChange1: function(val) {
                this.pagesize1 = val;
                this.firstblood2()
            },
        // 详情控制
        openDialogView(){
          if(this.editType == 'view')
          {
         this.formAll2.vestId = this.paramsdata.id
         data_get_aflcVestUnisource_Id(this.paramsdata.id).then(res=>{
            this.selectRowData = res.data
            this.selectRowData1 = res.data
         })
         this.firstblood2()
         this.driverTemplateDialogFlag2=true;
          }
          else{
           if(this.params.length==undefined){
              this.$message.warning('请选择您要操作的用户');
               return
           }
          else if(this.params.length == 0){
               this.$message.warning('请选择您要操作的用户');
               return
          }else if (this.params.length > 1) {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
          }
         else{
         this.formAll2.vestId = this.params[0].id
         data_get_aflcVestUnisource_Id(this.params[0].id).then(res=>{
            this.selectRowData = res.data
            this.selectRowData1 = res.data
         })
         this.firstblood2()
         this.driverTemplateDialogFlag2=true;
         }
          }

        },
         // 关闭小表窗
        close2(){
         this.driverTemplateDialogFlag2=false;
        },
        openDialog1(){
        this.driverTemplateDialogFlag2=false;
        this.driverTemplateDialogFlag3=true;
        },

        // 提货地增加
        addpickAera(){
            if(this.pickaddAera=='')
            {
                return
            }
                this.pickAera.push({
                    pickAeratree:this.pickaddAera,
                    startAddressCoordinate:this.startAddressCoordinate,
                    startAddressName:this.startAddressName,
                }); 
                this.pickaddAera = ''
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
                    endAddressCoordinate:this.endAddressCoordinate,
                    endAddressName:this.endAddressName
                }); 
          this.destinationaddAera =''
        },
        // 目的地减少
        reduceItemdestination(i){
          this.destinationAera.splice(i,1);
        },
        // 新增地址表
        changeInfoSavaAdress(){
            this.vestAdree.id = this.formAll2.vestId
            this.vestAdree.flcVestUnisourceAddressaList=this.totalAeraData1;
            this.driverTemplateDialogFlag3=false;
            data_get_onesource_addDetailAddress(this.vestAdree).then(res=>{
                console.log(res)
                 this.$message.success('新增成功');
            }).catch(res=>{
                 this.$message.success('新增失败');
            })
        },

},
mounted(){
 this.getMoreInformation();
 this.firstblood2();
}
}
</script>
<style  lang="scss">
  .vestdetail{
    display: inline-block;
    .el-dialog{
        width: 980px;
    }
    .el-button {
        margin-right:0px;
        padding: 7px 15px 7px;
        font-size:12px;
        }
        .vestOrder{
            border-bottom: 1px solid #eee
        }
        .vestadresss{
            margin-left:20px;margin-top:20px;
            .el-input__inner{
            height: 30px!important;
            line-height: 30px!important;
        }
        }
   .vestAddress{
        display: flex;
        margin-top:10px;
        .el-input__inner{
       height: 30px!important;
   }
    .vestAera{
        flex-basis: 230px;
        margin-left:50px;
        h4{
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
                    margin:0px 10px;
                }
                }

            }
        }
    }
    }
     .BtnInfo{
    font-weight: bold;
    font-size: 14px;
    }   
  }
</style>
