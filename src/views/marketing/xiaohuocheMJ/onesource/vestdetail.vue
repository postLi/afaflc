<template>
    <div class="vestDialog commoncss">
    <el-button  :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
            <el-dialog :title="btntitle" :visible="driverTemplateDialogFlag" :before-close="change">
            <div class="vestOrder">
            <el-form :inline="true">
             <el-row>
            <el-col :span="12">
          <el-form-item label="服务类型" :label-width="formLabelWidth">
                    <el-select v-model="serviceValue" clearable placeholder="请选择">
                        <el-option
                        v-for="item in serviceCard"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
           </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="片区名称：" :label-width="formLabelWidth">
            <el-input></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">
            <el-form-item label="中心地址：" :label-width="formLabelWidth">
            <el-input ></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">
            <el-form-item label="省市：" :label-width="formLabelWidth">
             <GetCityList v-model="formAll.belongCity" ref="area"></GetCityList>
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
            <el-input class=""></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="8">
           <el-form-item label="目的地：" :label-width="formLabelWidth" class="adressend">
            <el-input class=""></el-input>
                 </el-form-item>
            </el-col>
            <el-col :span="8">
        <el-form-item :label-width="formLabelWidth">       
         <el-button type="primary"  plain >查询</el-button> 
         <el-button type="primary"  plain >清空</el-button>
         </el-form-item>
            </el-col>
             </el-row>
             <el-row>
                 <el-row :span="24">
                <el-form-item :label-width="formLabelWidth" >       
                 <newonesource  btntext="新增马甲单" :plain="true" type="primary" btntype="primary" icon="el-icon-news" editType="add" btntitle="马甲单源" @click="change" class="addvestbtn"></newonesource>
                </el-form-item>
                 </el-row>
             </el-row>
           </el-form> 

        <el-table style="width: 100%" stripe border>
        <el-table-column  label="序号" width="80px">
            
        </el-table-column>
        <el-table-column  label="提货地">
            
        </el-table-column>
        <el-table-column  label="目的地">
            
        </el-table-column>
        <el-table-column  label="里程（公里）">
            
        </el-table-column>          
        <el-table-column  label="操作">
             <template slot-scope="scope">
              <el-button>删除</el-button>
              </template>
        </el-table-column>    
        </el-table> 

           </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" >保 存</el-button>
                        <el-button >取 消</el-button>
                    </div> 

            </el-dialog>
    </div>
</template>
<script>
import  { data_post_createDriver,data_put_changeDriver,data_CarList,data_Get_carType,data_get_driver_obStatus,data_post_driverAudit} from '@/api/users/carowner/total_carowner.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
import newonesource from './newonesource'
import { eventBus } from '@/eventBus'
export default {
data(){
    return{
            driverTemplateDialogFlag: false,// 弹框控制的控制
            title:'',
            text:'',
            shipperTypeName:'',
            shipperType:'',
            formLabelWidth:'100px',
            serviceCard:[
            {
            value:1,
            name:'小货车'
            },
            {
            value:2,
            name:'大货车'
            },
            {
            value:3,
            name:'小货车'
            },
            ],
            serviceValue:null,
    	 	formAll:{
            belongCity: null,
            },
            pickAera:[{
            }],
            destinationAera:[{
            }],
            pickaddAera:'',
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
},
components:{
    GetCityList,
    newonesource
},
computed:{
     totalAeraData(){
        let AeraData=[];
 
        for(var i = 1; i<this.pickAera.length;i++){


            for(var j = 1;j<this.destinationAera.length;j++)
            {
                
                  AeraData.push(
                      {
                          AeraDatalist:this.pickAera[i].pickAeratree+'-'+this.destinationAera[j].destinationAeratree,
                      }
                  )
            }
        }
        return AeraData
     }
},
methods:{
        openDialog(){
            this.driverTemplateDialogFlag=true;
        },
        //弹框控制
        change() {
         this.driverTemplateDialogFlag = false;
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
            console.log('totalAeraData',this.totalAeraData)
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
                        console.log('totalAeraData',this.totalAeraData)
        },
        // 目的地减少
        reduceItemdestination(i){
          this.destinationAera.splice(i,1);
        },
        closeone(){

        }
},
watch:{

},
mounted(){

}
}
</script>
<style  lang="scss" scoped>
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
    }
</style>

<style  lang="scss">
.vestDialog .el-dialog {
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

</style>
