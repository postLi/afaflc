<template>
    <div class="vestdetailDialog commoncss">
   <el-button  type="primary"  value="value2" plain icon="el-icon-news" @click="openDialogView()">修改</el-button>
            <el-dialog title="马甲单源" :visible="driverTemplateDialogFlag2" :before-close="changeview">
            <div class="vestOrder">
            <el-form :inline="true">
             <el-row>
            <el-col :span="12">

            <el-form-item label="服务类型：" :label-width="formLabelWidth">
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
           <el-form-item label="片区名称：" :label-width="formLabelWidth" >
          <el-input @focus="()=>{showMap('selectdistrictName')}" v-model="selectRowData.districtName"></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">

             <el-form-item label="中心地址：" :label-width="formLabelWidth" >
             <el-input @focus="()=>{showMap('selectdistrictAddress')}" v-model="selectRowData.districtAddress"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">

            <el-form-item label="省市：" :label-width="formLabelWidth" prop="areaCode">
                    <vregion :ui="true" @values="regionChange" class="form-control">
                        <el-input v-model="selectRowData.areaName" placeholder="请选择省/市/区/街道"></el-input>
                    </vregion>
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
                    <el-button  type="primary"  plain icon="el-icon-news" @click="openDialog1()" class="view_btn">新增</el-button>
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
                    <div slot="footer" class="dialog-footer" >
                        <el-button type="primary" @click="changeInfoSave2" >保 存</el-button>
                        <el-button @click="close2()">取 消</el-button>
                    </div> 
            </el-dialog>
            <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" />
    </div>
</template>
<script>
import { data_ServerClassList} from '@/api/server/areaPrice.js'
import  { data_get_onesource_list,data_add_onesource_list,data_Del_onesource,data_UseStates_onesource,data_get_onesourceAddress_list,data_Del_onesourceAddress,data_get_onesource_Id,data_get_onesource_update} from '@/api/vest/onesource/onesource.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
import newonesource from './newonesource'
import { eventBus } from '@/eventBus'
import vregion from '@/components/vregion/Region'
import tmsmap from '@/components/map/index'
export default {
data(){
    return{
            driverTemplateDialogFlag2: false,// 弹框控制的控制
            title:'',
            text:'',
            popVisible:false,
            shipperTypeName:'',
            shipperType:'',
            pagesize1:4,//详情表每页显示数
            page1:1,//详情表当前页
            dataTotal1:null,//详情表总记录数
            tableDataTree1:[],//详情表定义列表记录
            formLabelWidth:'100px',
            selectRowData:{},
            serviceCardList:[],
            serviceValue:null,
    	 	formAll:{
            belongCity: null,
            },
            pickAera:[{
            }],
            destinationAera:[{
            }],
            pickaddAera:'',
            formAll2:{
            endAddress: null,
            startAddress:null,
            vestId:null
            },  
            destinationaddAera:'',
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
},
components:{
    GetCityList,
    newonesource,
    vregion,
    tmsmap
},
computed:{

},
methods:{
            // 省市区
        regionChange(d) {
                this.selectRowData.areaCode = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                this.selectRowData.areaName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
        },
       getValue(obj){
                return obj ? obj.value:'';
        },
        openDialog(){
            this.driverTemplateDialogFlag=true;
        },
        // 类型列表
        getMoreInformation(){
                data_ServerClassList().then(res=>{
                     res.data.map((item)=>{
                         console.log('fd');
                        this.serviceCardList.push(item);
                    })
                }).catch(res=>{
                    console.log(res)
                });
            },
        //弹框控制
        change() {
         this.driverTemplateDialogFlag = false;
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
        //详情弹框控制
        changeview() {
         this.driverTemplateDialogFlag2 = false;
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
            console.log('this.tableDataTree1',this.tableDataTree1)
            this.selectRowData.flcVestUnisourceAddressaList=this.tableDataTree1;
             console.log('this.selectRowData',this.selectRowData);
            data_get_onesource_update(this.selectRowData).then(res=>{
            console.log(res)
                this.$emit('getData')
                this.driverTemplateDialogFlag2 = false;
                this.selectFlag=false
                }).catch(res=>{
          console.log(res)
        });
        },
        //  详情表选择行   
         clickDetails2(i){
                 this.selectRowData2 = i;
                 console.log('ddd11',i)
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
            this.selectRowData = this.params;
            console.log(this.params)
        if(!this.selectRowData.id){
            this.$message.info('未选中内容');
         }
         else{
         this.formAll2.vestId = this.selectRowData.id
         this.firstblood2()
         this.driverTemplateDialogFlag2=true;
         }
        },
         // 关闭小表窗
        close2(){
         this.driverTemplateDialogFlag2=false;
         this.selectRowData={};
        },
        openDialog1(){
        this.$emit("btn1")
        this.driverTemplateDialogFlag2=false;

        }
},
watch:{

},
mounted(){
 this.getMoreInformation();
 this.firstblood2();
}
}
</script>
<style  lang="scss">
    .vestdetailDialog{
        display: inline-block;
        .el-dialog{
            width: 880px;
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
    .view_btn{
        margin-left:40px;
    }
    .el-tableTree1{
        width: 800px;
        margin:0px auto;
    }
    .Pagination{
        padding: 10px;
        text-align: right
    }
    }
</style>
