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
                   <el-input @focus="()=>{showMap('vestdistrictName')}" v-model="formAll.districtName"></el-input>
                 </el-form-item>
         <el-form-item>       
         <el-button type="primary"  plain  @click="getdata_search()">查询</el-button> 
         <el-button type="primary"  plain  @click="clearSearch">清空</el-button>
         </el-form-item>
           </el-form> 
  </div>
  <div class="classify_info">
   <div class="btns_box">

  <!-- 马甲单新增 -->
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
            <el-input @focus="()=>{showMap('districtName')}" v-model="vestAll.districtName"></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">
            <el-form-item label="中心地址：" :label-width="formLabelWidth" prop="districtAddress">
            <el-input @focus="()=>{showMap('districtAddress')}" v-model="vestAll.districtAddress"></el-input>
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
                        <el-button type="primary" @click="changeInfoSave1">保 存</el-button>
                        <el-button @click="close1()">取 消</el-button>
                    </div> 

            </el-dialog>
    </div>
  </div>


<!-- 详情修改 -->
<div class="vestDialogBox">
<div class="vestDialog commoncss">
        <el-button  type="primary"  value="value2" plain icon="el-icon-news" @click="openDialogView()">详情</el-button>
            <el-dialog title="马甲单源" :visible="driverTemplateDialogFlag2" :before-close="changeview">
            <div class="vestOrder">
            <el-form :inline="true">
             <el-row>
            <el-col :span="12">
          <el-form-item label="服务类型：" :label-width="formLabelWidth" v-if='openFlag==0'>
            <el-input v-model="selectRowData.serivceCode" disabled></el-input>
           </el-form-item>
            <el-form-item label="服务类型：" :label-width="formLabelWidth" v-else>
         <el-select v-model="selectRowData.serivceCode" clearable placeholder="请选择">
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
            <el-form-item label="片区名称：" :label-width="formLabelWidth" v-if='openFlag==0'>
             <el-input v-model="selectRowData.districtName" disabled></el-input>
           </el-form-item>
           <el-form-item label="片区名称：" :label-width="formLabelWidth" v-else>
          <el-input @focus="()=>{showMap('selectdistrictName')}" v-model="selectRowData.districtName"></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">
            <el-form-item label="中心地址：" :label-width="formLabelWidth" v-if='openFlag==0'>
             <el-input v-model="selectRowData.districtAddress"  disabled></el-input>
            </el-form-item>
             <el-form-item label="中心地址：" :label-width="formLabelWidth" v-else>
             <el-input @focus="()=>{showMap('selectdistrictAddress')}" v-model="selectRowData.districtAddress"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">

            <el-form-item label="省市：" :label-width="formLabelWidth" prop="areaCode" > 
                <el-input v-model="selectRowData.areaName"  @focus="changeSelect" v-if="openFlag !==0 && !selectFlag"></el-input>
                 <span v-else-if="openFlag==0">
                <el-input v-model="selectRowData.areaName" disabled></el-input>
                 </span>
                 <span v-else>
                <GetCityList ref="area2" v-model="selectRowData.areaCode"  @focus="changeSelect" v-if="openFlag !==0 && selectFlag"></GetCityList>
                 </span>
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
           <el-input @focus="()=>{showMap('areaCode2')}" v-model="formAll2.startAddress"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="8">
           <el-form-item label="目的地：" class="adressend">
            <el-input @focus="()=>{showMap('districtName2')}" v-model="formAll2.endAddress"></el-input>
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
                    <el-button  type="primary" plain icon="el-icon-delete" @click="handleDelete2">删除</el-button>
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
</div>


    <el-button type="primary" plain icon="el-icon-bell"  @click="handleUseStates">启用/禁用</el-button>
     <div class="vestonceDialog commoncss">
         <el-button  type="primary" value="value" plain icon="el-icon-edit" @click="openDialogView0()">修改</el-button>
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
 <div class="info1_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
   </div>
   <div>

   </div>
       <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" />
  </div>

</template>

<script>
import { data_ServerClassList} from '../../../api/server/areaPrice.js'
import  { data_get_onesource_list,data_add_onesource_list,data_Del_onesource,data_UseStates_onesource,data_get_onesourceAddress_list,data_Del_onesourceAddress,data_get_onesource_Id,data_get_onesource_update} from '@/api/vest/onesource/onesource.js'
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
        selectFlag:false,
        openFlag:'',   //0详情,1修改
        popVisible:false,
        serviceCardList:[],
        viewStatus:'add',
        selectRowData:{},
        selectRowData2:{},
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
                          endAddress:this.destinationAera[j].destinationAeratree,
                          startAddressCoordinate:this.pickAera[i].startAddressCoordinate,
                          endAddressCoordinate:this.destinationAera[j].endAddressCoordinate
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
             this.$refs.vestAll.resetFields();
             this.destinationaddAera='';
             this.pickaddAera='';
             this.pickAera=[{}];
             this.destinationAera=[{}];
                 if(this.$refs.area1){
                    this.$refs.area1.selectedOptions = [];
                }
             }

        }
    },
    methods:{
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
                    console.log('fdf',res);
                    this.dataTotal1 = res.data.totalCount;
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
        showMap(name) {
            this.popVisible = true ;
            this.current = name;
        },
            getInfo(pos, name, info) {
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
                break;
                case 'destinationaddAera':
                this.destinationaddAera = info.formattedAddress;
                this.endAddressCoordinate = pos;
                break;
                case 'areaCode2':
                this.formAll2.startAddress = info.formattedAddress;
                break;
                case 'districtName2':
                this.formAll2.endAddress = info.formattedAddress;
                break;
                case 'selectdistrictName':
                this.selectRowData.districtName = info.formattedAddress;
                break;
                case 'selectdistrictAddress':
                this.selectRowData.districtAddress = info.formattedAddress;
                break;
            }
        },
        openDialog(){

         this.firstblood2()
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
        },
        // 详情控制
        openDialogView(){

            if(!this.selectRowData.id){
            this.$message.info('未选中内容');
         }
         else{
         this.formAll2.vestId = this.selectRowData.id
         this.openFlag='0';
         this.firstblood2()
         this.driverTemplateDialogFlag2=true;
         }
        },
        // 修改控制
        openDialogView0(){
            this.formAll2.vestId = this.selectRowData.id
            if(!this.selectRowData.id){
            this.$message.info('未选中内容');
         }
         else{
         this.openFlag='1';
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
                    endAddressCoordinate:this.endAddressCoordinate,

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
                this.formAll2 = {
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
         clickDetails(i){
             console.log('id',i)
                 this.selectRowData = i;
            }, 
        //  详情表选择行   
         clickDetails2(i){
                 this.selectRowData2 = i;
                 console.log('ddd11',i)
        }, 

        //  大表删除行
            handleDelete(){
             if(!this.selectRowData.id){
                        this.$message.info('未选中任何删除内容');
                }else{
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

          completeData1(){
            //获取城市name
                if(!this.$refs.area2){
                    return
                } 
                else if(this.$refs.area2.selectedOptions.length > 1){
                    let province;
                    this.$refs.area2.areaData.forEach((item) =>{
                        if(item.code == this.$refs.area2.selectedOptions[0]){
                            province = item
                        }
                    })
                    province.children.forEach( item => {
                        if(item.code == this.$refs.area2.selectedOptions[1]){
                            this.selectRowData.areaCode = item.code;
                            this.selectRowData.areaName = item.name;
                            console.log('item.name',item.name)
                        }
                    })
                }else{
                    this.$refs.area2.areaData.forEach((item) =>{
                        if(item.code == this.$refs.area2.selectedOptions[0]){
                            this.selectRowData.areaCode = item.code;
                            this.selectRowData.areaName = item.name;
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
                    
                 data_UseStates_onesource(this.selectId).then(res=>{
                     console.log('dsds',this.selectId)
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

                this.firstblood()
                }).catch(res=>{
                    console.log(res)
                   this.$message.warning('片区名称已存在');
                });
                }
                })
            }

        },

        // 修改保存
        changeInfoSave2(){
            this.completeData1()
            console.log('this.tableDataTree1',this.tableDataTree1)
            this.selectRowData.flcVestUnisourceAddressaList=this.tableDataTree1;
             console.log('this.selectRowData',this.selectRowData);
            data_get_onesource_update(this.selectRowData).then(res=>{
            console.log(res)
                this.firstblood()
                this.driverTemplateDialogFlag2 = false;
                this.selectFlag=false
                }).catch(res=>{
          console.log(res)
        });
        },
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
            },
        // 关闭小表窗
        close1(){
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
        .el-dialog{
                width: 980px;
        }
        .commoncss .el-dialog .el-dialog__body{
                 padding: 5px 0px 0px 0px;
        }
        .chooseCityList .el-cascader .el-input
        {
            width:250px;
        }
        .el-tableTree1{
            width: 90%;
            margin:0px auto;
        }
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
.info1_tab_footer{
    padding-left: 20px;
    background: #eee;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .show_pager{float: right}
    .page-select{top:5px}
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
        .el-input{width:180px}
    } 
    .adressend {
        .el-input{width:180px}
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
        margin-left:50px;
    }
</style>