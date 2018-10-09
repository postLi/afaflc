<template>
    <div class="identicalStyle MjD" style="height:100%">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
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
                   <el-input @focus="()=>{showMap('vestdistrictName')}" v-model="formAll.districtName"></el-input>
                 </el-form-item>
         <el-form-item class="fr">
         <el-button type="primary" plain @click="getdata_search()" :size="btnsize" icon="el-icon-search">搜索</el-button> 
         <el-button type="info"  plain  @click="clearSearch" :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
         </el-form-item>
           </el-form> 
  <div class="classify_info">
   <div class="btns_box">
  <!-- 马甲单新增 -->
  <div class="onceDialogBox commoncss">
    <el-button  type="primary" value="value" plain icon="el-icon-circle-plus" @click="openDialog()">新增</el-button>
            <el-dialog title="马甲单源" :visible="driverTemplateDialogFlag" :before-close="change">
            <div class="vestOrder">
            <el-form :inline="true" :model="vestAll" ref="vestAll" :rules="rulesForm1">
             <el-row>
            <el-col :span="12">
          <el-form-item label="服务类型：" :label-width="formLabelWidth" v-if='creadFlag'>
            <el-input v-model="vestAll.serivceCode" disabled></el-input>
           </el-form-item>
          <el-form-item label="服务类型：" :label-width="formLabelWidth" prop="serivceCode" v-else>
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
           <el-form-item label="片区名称：" :label-width="formLabelWidth" v-if='creadFlag'>
            <el-input v-model="vestAll.districtName" disabled></el-input>
           </el-form-item>                
            <el-form-item label="片区名称：" :label-width="formLabelWidth" prop="districtName" v-else>
            <el-input @focus="()=>{showMap('districtName')}" v-model="vestAll.districtName"></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">
            <el-form-item label="片区名称：" :label-width="formLabelWidth" v-if='creadFlag'>
            <el-input v-model="vestAll.districtAddress" disabled></el-input>
           </el-form-item>      
            <el-form-item label="中心地址：" :label-width="formLabelWidth" prop="districtAddress" v-else>
            <el-input @focus="()=>{showMap('districtAddress')}" v-model="vestAll.districtAddress"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">
                <span v-if="creadFlag">
               <el-form-item label="省市：" :label-width="formLabelWidth">
                <el-input v-model="vestAll.areaName" disabled></el-input>
                </el-form-item>
                 </span>
                 <span v-else>
            <el-form-item label="省市：" :label-width="formLabelWidth" prop="areaCode">
                <GetCityList v-model="vestAll.areaCode" ref="area1" @returnStr="getStr"></GetCityList>
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
                       <div class="vest_section" v-for="(value,keys) in totalAeraData" :key='keys'>
                         <div class="vest_tree">
                             <span class="vest_tree_span">{{value.endAddress}}-{{value.startAddress}}</span>
                       </div>     
                       </div>                  
                   </div>
               </div>

           </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="changeInfoSave1" v-if='!creadFlag'>保 存</el-button>
                        <el-button type="primary" @click="changeInfoSavaAdress" v-else>保 存</el-button>
                        <el-button @click="close1()">取 消</el-button>
                    </div> 

            </el-dialog>
    </div>


<!-- 详情修改 -->
<div class="onceDialogBox commoncss">
        <el-button  type="primary"  value="value2" plain icon="el-icon-news" @click="openDialogView()">详情</el-button>
            <el-dialog title="马甲单源" :visible="driverTemplateDialogFlag2" :before-close="changeview">
            <div class="vestOrder">
            <el-form :inline="true">
             <el-row>
            <el-col :span="12">
            <el-form-item label="服务类型：" :label-width="formLabelWidth">
         <el-select v-model="selectRowData3.serivceCode" clearable placeholder="请选择" :disabled="openFlag==0">
                        <el-option
                         v-for="item in serviceCardList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        >
                        </el-option>
          </el-select>
           </el-form-item>
            </el-col>
            <el-col :span="12">
           <el-form-item label="片区名称：" :label-width="formLabelWidth">
          <el-input @focus="()=>{showMap('selectdistrictName')}" v-model="selectRowData3.districtName" :disabled="openFlag==0"></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">
             <el-form-item label="中心地址：" :label-width="formLabelWidth">
             <el-input @focus="()=>{showMap('selectdistrictAddress')}" v-model="selectRowData3.districtAddress" :disabled="openFlag==0"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">

            
                 <span v-if="openFlag==0">
                      <el-form-item label="省市：" :label-width="formLabelWidth">
                <el-input v-model="selectRowData3.areaName" disabled></el-input>
                      </el-form-item>
                 </span>
                 <span v-else>
                    <el-form-item label="省市：" :label-width="formLabelWidth" prop="areaCode">
                 <el-input v-model="selectRowData3.areaName"  @focus="changeSelect" v-if="openFlag !==0 && !selectFlag"></el-input>
                <GetCityList ref="area2" v-model="selectRowData3.areaCode"  @focus="changeSelect" v-else @returnStr="getStr1"></GetCityList>
                    </el-form-item>
                 </span>
            </el-col>
            </el-row>
             </el-form>    
             </div>
             
           <div class="vestdetail">
            <el-form :inline="true">
             <el-row>
            <el-col :span="9">
            <el-form-item label="提货地：" :label-width="formLabelWidth" class="adressstart">
           <el-input @focus="()=>{showMap('areaCode2')}" v-model="formAll2.startAddress"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="9">
           <el-form-item label="目的地：" class="adressend">
            <el-input @focus="()=>{showMap('districtName2')}" v-model="formAll2.endAddress"></el-input>
                 </el-form-item>
            </el-col>
            <el-col :span="6">
        <el-form-item :label-width="formLabelWidth">       
         <el-button type="primary"   @click="getdata_search2()">搜索</el-button> 
         <el-button type="info"  plain  @click="clearSearch2">清空</el-button>
         </el-form-item>
            </el-col>
             </el-row>
             <el-row>
                 <el-row :span="24">
                <el-form-item :label-width="formLabelWidth" >       
                    <el-button  type="primary"  plain icon="el-icon-news" @click="openDialog1()" class="view_btn">新增</el-button>
                    <el-button  type="danger" plain icon="el-icon-delete" @click="handleDelete2" :size="btnsize">删除</el-button>
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
                    <div slot="footer" class="dialog-footer" v-if="openFlag==1" >
                        <el-button type="primary" @click="changeInfoSave2" >保 存</el-button>
                        <el-button @click="close2()">取 消</el-button>
                    </div> 
            </el-dialog>
    </div>
    <el-button  type="primary" value="value" plain icon="el-icon-edit" @click="openDialogView0()" :size="btnsize">修改</el-button>
    <el-button type="primary" plain icon="el-icon-bell"  @click="handleUseStates" :size="btnsize">启用/禁用</el-button>
    <el-button type="danger" plain icon="el-icon-delete" @click="handleDelete" :size="btnsize">删除</el-button>
   </div>
  
    <div class="info_news">  
    <el-table style="width: 100%"  ref="multipleTable" stripe border :data="tableDataTree" height="100%" highlight-current-row @selection-change="getSelection" @row-click="clickDetails">
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
   <el-table-column  label="片区名称" prop="districtName" sortable>
       
   </el-table-column>
   <el-table-column  label="省市" prop="areaName" sortable>
       
   </el-table-column>

   <el-table-column  label="服务类型" prop="serivceCode" sortable>
       
   </el-table-column>
   <el-table-column  label="片区中心" prop="districtAddress" sortable >
       
   </el-table-column>
   <el-table-column  label="马甲单源数量" prop="orderNum" sortable>
       
   </el-table-column>
   <el-table-column  label="状态" prop="usingStatus" sortable>
        <template  slot-scope="scope">
          {{ scope.row.usingStatus == 1 ? '启用' : '禁用' }}
         </template>
   </el-table-column>              

  </el-table> 
           <!-- 页码 -->
 <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
   </div>
   </div>
       <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" />
  </div>

</template>

<script>
import { data_ServerClassList} from '@/api/server/areaPrice.js'
import  { data_get_onesource_list,data_add_onesource_list,data_Del_onesource,data_UseStates_onesource,data_get_onesourceAddress_list,data_Del_onesourceAddress,data_get_onesource_Id,data_get_onesource_update,data_get_onesource_addDetailAddress,data_get_aflcVestUnisource_Id} from '@/api/vest/onesource/onesource.js'
import { parseTime,formatTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import GetCityList from '@/components/GetCityList'
import vestdetail from './vestdetail'
import tmsmap from '@/components/map/index'
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
        btnsize:'mini',
        creadFlag:false,   //详情修改新增状态
        selectFlag:false,
        openFlag:'',   //0详情,1修改
        popVisible:false,
        serviceCardList:[],
        viewStatus:'add',
        selectRowData:{},
        selectRowData2:{},
        selectRowData3:{},
        selectId:[],
        driverTemplateDialogFlag:false,
        driverTemplateDialogFlag2: false,
        formLabelWidth:'120px',
        sizes:[20,50,100],
        pagesize:20,//大表每页显示数
        page:1,//大表当前页
        dataTotal:null,//大表总记录数
        tableDataTree:[],//大表定义列表记录
        pagesize1:4,//详情表每页显示数
        page1:1,//详情表当前页
        dataTotal1:null,//详情表总记录数
        tableDataTree1:[],//详情表定义列表记录
        pickAera:[{
            }],
        destinationAera:[{
            }],
        pickaddAera:'',
        destinationaddAera:'',
        endAddressName:'',
        startAddressName:'',
        endAddressCoordinate:'',
        startAddressCoordinate:'',
		formAll:{
            areaCode: null,
            serivceCode:null,
            districtName: null,
            },
        formAll2:{
            endAddress: null,
            startAddress:null,
            vestId:null
            },    
        vestAll:{
            serivceCode:null,
            districtName:null,
            districtAddress:null,
            areaCode:null,
            startAddressCoordinate:null,
            endAddressCoordinate:null,
            longitude:null,
            latitude:null,
            flcVestUnisourceAddressaList:[]
            },
        vestAdree:{
            id:null,
            flcVestUnisourceAddressaList:[]
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
        vestdetail,
        tmsmap,
        Pager
    },
    computed:{
     totalAeraData(){
        let AeraData=[];
        for(var i = 1; i<this.pickAera.length;i++){
            for(var j = 1;j<this.destinationAera.length;j++)
            {
                  AeraData.push(
                      {
                          startAddress:this.pickAera[i].pickAeratree,
                          startAddressCoordinate:this.pickAera[i].startAddressCoordinate,
                          startAddressName:this.pickAera[i].startAddressName,
                          endAddressCoordinate:this.destinationAera[j].endAddressCoordinate,
                          endAddressName:this.destinationAera[j].endAddressName,
                          endAddress:this.destinationAera[j].destinationAeratree,
                      }
                  )

            }
        }
        return AeraData
     },
    },
    watch:{
        driverTemplateDialogFlag:{
            handler: function(val, oldVal){
            if (!val) {
            this.$refs['vestAll'].resetFields();
             this.destinationaddAera='';
             this.pickaddAera='';
             this.pickAera=[{}];
             this.destinationAera=[{}];
                 if(this.$refs.area1){
                    this.$refs.area1.selectedOptions = [];
                }
            this.$refs.multipleTable.clearSelection();                
             }
             }
        },
        driverTemplateDialogFlag2:{
             handler: function(val, oldVal){
            if (!val) {
             this.destinationaddAera='';
             this.pickaddAera='';
             this.pickAera=[{}];
             this.destinationAera=[{}];
                 if(this.$refs.area1){
                    this.$refs.area1.selectedOptions = [];
                }
            this.$refs.multipleTable.clearSelection();                
             }
             }
        }

    },
    methods:{
            getStr(val,name){
                console.log('this.cityarr',val,name)
                this.vestAll.areaCode = val.split(',')[1];
                this.vestAll.areaName = name.split(',')[1];
            },
            getStr1(val,name){
                console.log('this.cityarr',val,name)
                this.selectRowData3.areaCode = val.split(',')[1];
                this.selectRowData3.areaName = name.split(',')[1];
            },

            // 省市状态表
            changeSelect(){
            if(this.editType=='0'){
                this.selectFlag=false
            } else{
                this.selectFlag=true
            }
            },
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
                data_get_onesourceAddress_list(this.page1,this.pagesize1,this.formAll2).then(res => {
                    this.dataTotal1 = res.data.totalCount;
                    this.tableDataTree1 = res.data.list;
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
        showMap(name) {
            this.popVisible = true ;
            this.current = name;
        },
            getInfo(pos, name, info) {
                console.log('in',info)
            switch (this.current) {
                case 'districtName':
                this.vestAll.districtName = info.formattedAddress;
                break;
                case 'districtAddress':
                this.vestAll.districtAddress = info.formattedAddress;
                let tude= pos.split(",");
                let longitude=tude[0]
                let latitude=tude[1]
                this.vestAll.longitude = longitude;
                this.vestAll.latitude = latitude;
                break;
                case 'vestdistrictName':
                this.formAll.districtName = info.formattedAddress;
                break;
                case 'pickaddAera':
                this.pickaddAera = info.formattedAddress;
                this.startAddressCoordinate = pos
                this.startAddressName = info.addressComponent.district
                break;
                case 'destinationaddAera':
                this.destinationaddAera = info.formattedAddress;
                this.endAddressName = info.addressComponent.district
                this.endAddressCoordinate = pos;
                break;
                case 'areaCode2':
                this.formAll2.startAddress = info.formattedAddress;
                break;
                case 'districtName2':
                this.formAll2.endAddress = info.formattedAddress;
                break;
                case 'selectdistrictName':
                this.selectRowData3.districtName = info.formattedAddress;
                break;
                case 'selectdistrictAddress':
                this.selectRowData3.districtAddress = info.formattedAddress;
                break;
            }
        },
        openDialog(){
         this.firstblood2()
         this.driverTemplateDialogFlag=true;
         this.driverTemplateDialogFlag2 = false;
        },
        openDialog1(){
         this.firstblood2()
         this.vestAll = this.selectRowData[0];
         this.creadFlag = true;
         this.driverTemplateDialogFlag=true;
         this.driverTemplateDialogFlag2 = false;
        },
        //弹框控制
        change() {
         this.driverTemplateDialogFlag = false;
         this.openFlag='';
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
            this.creadFlag = false;
        },
        // 详情控制
        openDialogView(){
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
         this.formAll2.vestId = this.selectRowData[0].id
        data_get_aflcVestUnisource_Id(this.selectRowData[0].id).then(res=>{
            this.selectRowData3 = res.data
         })
         this.openFlag='0';
         this.firstblood2()
         this.driverTemplateDialogFlag2=true;
         }
        },
        // 修改控制
        openDialogView0(){
            this.formAll2.vestId = this.selectRowData.id
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
         this.openFlag='1';
         data_get_aflcVestUnisource_Id(this.selectRowData[0].id).then(res=>{
            this.selectRowData3 = res.data
         })
         this.firstblood2()
         this.driverTemplateDialogFlag2=true;
         }

        },
        //详情弹框控制
        changeview() {
         this.driverTemplateDialogFlag2 = false;
         this.selectFlag=false
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
                    endAddressCoordinate:this.endAddressCoordinate,
                    endAddressName:this.endAddressName
            }); 
            this.destinationaddAera =''
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
                this.formAll2.endAddress=null
                this.formAll2.startAddress=null
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

        //  大表选择行   
            // 判断选中与否
            getSelection(val){
            console.log('选中内容',val)
            this.selectRowData = val;
           },
            //点击选中当前行
            clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row);
            },
            
        //  详情表选择行   
         clickDetails2(i){
                 this.selectRowData2 = i;
        }, 

        //  大表删除行
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
      //  详情表删除行
            handleDelete2(){
             if(!this.selectRowData2.id){
                        this.$message.info('未选中任何删除内容');
                }else{
                this.delDataInformation2();
            }  
            },
        //大表确认删除
        delDataInformation(){         
                   this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    data_Del_onesource(this.selectRowData[0].id).then(res=>{
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

        //详情确认删除
        delDataInformation2(){         
                   this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    data_Del_onesourceAddress(this.selectRowData2.id).then(res=>{
                          this.$message.success('删除成功');
                        this.firstblood();       
                        this.firstblood2();       
                        this.$refs.multipleTable.clearSelection();
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
            },
          completeData1(){
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
                this.selectId.push(this.selectRowData[0].id)
                    
                 data_UseStates_onesource(this.selectId).then(res=>{
                     console.log('dsds',this.selectId)
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

        // 新增保存
        changeInfoSave1(){
          this.completeData();
            this.vestAll.flcVestUnisourceAddressaList=this.totalAeraData;
            if(this.totalAeraData.length==0){
                this.$message.warning('请输入至少一组提货地和目的地');
                return;
            }
            else{
            this.$refs['vestAll'].validate(valid=>{
            var forms= Object.assign({}, this.vestAll)
              console.log(forms)
                if(valid){
                data_add_onesource_list(forms).then(res=>{
                console.log('res',res);
                 this.driverTemplateDialogFlag=false;
                    this.$message.success('新增成功');
                this.firstblood()
                }).catch(res=>{
                    console.log(res)
                  this.driverTemplateDialogFlag=false;
                   this.$message.warning(res.text);
                });
                }
                })
            }
        },
        // 新增地址表
        changeInfoSavaAdress(){
            this.vestAdree.id = this.vestAll.id;
            this.vestAdree.flcVestUnisourceAddressaList=this.totalAeraData;
            data_get_onesource_addDetailAddress(this.vestAdree).then(res=>{
                console.log(res)
                 this.$message.success('新增成功');
                 this.driverTemplateDialogFlag=false;
            }).catch(res=>{
                this.driverTemplateDialogFlag=false;
                 this.$message.success('新增失败');
            })
        },
        // 修改保存
        changeInfoSave2(){
            this.completeData1()
            this.selectRowData3.flcVestUnisourceAddressaList=this.tableDataTree1;
            data_get_onesource_update(this.selectRowData3).then(res=>{
            console.log(res)
                this.firstblood()
                this.driverTemplateDialogFlag2 = false;
                this.selectFlag=false
                this.$message.success('修改成功');
                }).catch(res=>{
                this.driverTemplateDialogFlag2 = false;
                this.selectFlag=false                    
                this.$message.success('修改失败');
        });
        },
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
            },
        // 关闭小表窗
        close1(){
        this.creadFlag = false;
        this.driverTemplateDialogFlag=false;
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
        },
        // 关闭小表窗
        close2(){
         this.creadFlag = false;
         this.driverTemplateDialogFlag2=false;
         this.selectFlag=false;
         this.selectRowData={};
        }
    },
    mounted(){
        this.firstblood()
        this.getMoreInformation();
    }
}
</script>

<style lang="scss">
.onceDialogBox{
    display: inline-block;
    .el-button {
        margin-right:0px;
        padding: 7px 15px 7px;
        font-size:12px;
        }
    .view_btn{
        margin-left:50px;
    }    
    .el-tableTree1{
            width: 90%;
            margin:0px auto;
        }
    .el-pagination{
            text-align: right;
    }  
    .el-input__inner{
       height: 30px!important;
   }
   .vestAddress{
        display: flex;
        margin-top:10px;
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
                    margin-left:10px;
                }
                }

            }
        }
    }
    }
}
</style>