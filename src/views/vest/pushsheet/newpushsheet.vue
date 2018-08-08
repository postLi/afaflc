<template>
    <div class="vestDialogBox">
    <div class="vestDialog commoncss">
    <el-button  :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
            <el-dialog :title="btntitle" :visible="driverTemplateDialogFlag" :before-close="change">
            <div class="vestOrder">
            <el-form :inline="true" :model="vestList" ref="vestList" :rules="rulesForm">
             <el-row>
            <el-col :span="12">
            <el-form-item label="省市：" :label-width="formLabelWidth" prop="areaCode"> 
               <GetCityList ref="area" v-model="vestList.areaCode"></GetCityList>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="服务类型：" :label-width="formLabelWidth" prop="serivceCode"> 
                    <el-select v-model="vestList.serivceCode" clearable placeholder="请选择">
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
              </el-row>
            <el-row>
            <el-col :span="24">
            <el-form-item label="价格上浮（倍）：" :label-width="formLabelWidth" prop="price"> 
             <el-input auto-complete="off" class="price_one" v-model="vestList.priceStart" ref="priceStart"></el-input>至
             <el-input auto-complete="off" class="price_two" v-model="vestList.priceEnd" ref="priceEnd"></el-input>
            </el-form-item>
            </el-col>
            </el-row>
             </el-form>    
             </div>
            
            <div class="table_box" v-for="(form,keys) in vestList.setting" :key='keys'>
           <el-form>
            <el-row> 
            <el-col :span="18">
            <el-form-item label="推送时段：" :label-width="formLabelWidth"> 
                    <el-date-picker
                    v-model="vestList.setting[keys].createTime"
                    value-format="timestamp"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="6">
           <el-form-item>       
           <el-button type="primary" @click="addItem" plain  v-if="keys == 0" >继续添加推送时段</el-button>
           <el-button type="danger" @click="reduceItem(keys)" plain class='reduceItem1'  v-else>删除推送时段</el-button> 
           </el-form-item>
            </el-col>
              </el-row> 
             </el-form> 
            <table class="ht_table">
            <tbody>
             <tr>
             <th width="150" colspan="2" rowspan="2">时间段内推单单数</th>
             <th width="100" rowspan="2">未认证</th>
             <th width="150" colspan="5">已认证用户活跃度</th>                            
            </tr>
             <tr>
             <th width="100">僵尸</th>
             <th width="100">低</th>
             <th width="100">中</th>
             <th width="100">高</th>
             <th width="100">活跃</th>               
            </tr>
            <tr>
             <th  rowspan="2">小面包</th>
             <td class="Online">在线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.zero.AF0010401" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.zero.AF0010402" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.zero.AF0010403" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.zero.AF0010404" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.zero.AF0010405" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.zero.AF0010406" class="Pushinput" type="number"></el-input> </td>                                                                       
            </tr>
             <tr>
             <td class="Offline">离线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.one.AF0010401" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.one.AF0010402" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.one.AF0010403" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.one.AF0010404" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.one.AF0010405" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.one.AF0010406" class="Pushinput" type="number"></el-input> </td>             
            </tr>
             <tr>
             <th  rowspan="2">金杯</th>
             <td class="Online">在线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.zero.AF0010401" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.zero.AF0010402" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.zero.AF0010403" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.zero.AF0010404" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.zero.AF0010405" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.zero.AF0010406" class="Pushinput" type="number"></el-input> </td>             
            </tr>
             <tr>
             <td class="Offline">离线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.one.AF0010401" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.one.AF0010402" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.one.AF0010403" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.one.AF0010404" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.one.AF0010405" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.one.AF0010406" class="Pushinput" type="number"></el-input> </td>             
            </tr>
             <tr>
             <th  rowspan="2">小货车</th>
             <td class="Online">在线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.zero.AF0010401" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.zero.AF0010402" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.zero.AF0010403" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.zero.AF0010404" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.zero.AF0010405" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.zero.AF0010406" class="Pushinput" type="number"></el-input> </td>                     
            </tr>
             <tr>
             <td class="Offline">离线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.one.AF0010401" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.one.AF0010402" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.one.AF0010403" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.one.AF0010404" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.one.AF0010405" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.one.AF0010406" class="Pushinput" type="number"></el-input> </td>           
            </tr>
            <tr>
             <th  rowspan="2">大货车</th>
             <td class="Online">在线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.zero.AF0010401" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.zero.AF0010402" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.zero.AF0010403" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.zero.AF0010404" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.zero.AF0010405" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.zero.AF0010406" class="Pushinput" type="number"></el-input> </td>                    
            </tr>
             <tr>
             <td class="Offline">离线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.one.AF0010401" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.one.AF0010402" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.one.AF0010403" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.one.AF0010404" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.one.AF0010405" class="Pushinput" type="number"></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.one.AF0010406" class="Pushinput" type="number"></el-input> </td>         
            </tr>
            </tbody>    
            </table>
             
            </div>    
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="changeInfoSave">保 存</el-button>
                        <el-button @click="close()">取 消</el-button>
                    </div> 
            </el-dialog>
    </div>
    </div>
</template>
<script>
import { data_ServerClassList} from '../../../api/server/areaPrice.js'
import  { data_Add_pushsheet} from '@/api/vest/pushsheet/pushsheetList.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
import { eventBus } from '@/eventBus'
export default {
data(){
    //    选择省市校验
        const belongCityNameValidator = (rule, val, cb) => {
             if(!this.$refs.area.selectedOptions[0]) {
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

    //    选择价格上浮校验
        const priceValidator = (rule, val, cb) => {
            let reg= /^[0-9]+([.]{1}[0-9]+){0,1}$/
            let priceStart = this.$refs.priceStart.value;
            let priceEnd =  this.$refs.priceEnd.value;
            if(!reg.test(priceStart)||!reg.test(priceEnd)){
            cb(new Error('请输入车长须数据,小数最多保留两位'))
            }
            else{
                cb()
              
            }
        }

    return{
            driverTemplateDialogFlag: false,// 弹框控制的控制
            title:'',
            text:'',
            shipperTypeName:'',
            shipperType:'',
            formLabelWidth:'120px',
            createTime:'',
            serviceCardList:[],
            serviceValue:null,
            // 保存数据
            constVestList:{
                createTime:null,
                startTime:null,
                endTime:null,
                sett:{
                  AF01801:{
                      zero:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                      one:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                  },
                  AF01802:{
                      zero:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                      one:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                  },
                  AF01803:{
                      zero:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                     one:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                  },
                  AF01804:{
                     zero:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                      one:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                  },
                }
                },

    	 	vestList:{
            serivceCode: null,
            areaCode:null,
            areaName:null,
            priceEnd:null,
            priceStart:null,
            setting:[{
                createTime:null,
                startTime:null,
                endTime:null,
                sett:{
                  AF01801:{
                      zero:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                      one:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                  },
                  AF01802:{
                      zero:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                      one:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                  },
                  AF01803:{
                      zero:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                     one:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                  },
                  AF01804:{
                     zero:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                      one:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                  },
                }
            }]
            },

            CvestList:{
            serivceCode: null,
            areaCode:null,
            areaName:null,
            priceEnd:null,
            priceStart:null,
            setting:[{
                createTime:null,
                startTime:null,
                endTime:null,
                sett:{
                  AF01801:{
                      zero:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                      one:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                  },
                  AF01802:{
                      zero:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                      one:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                  },
                  AF01803:{
                      zero:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                     one:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                  },
                  AF01804:{
                     zero:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                      one:{
                        AF0010401: null,
                        AF0020402: null,
                        AF0020403: null,
                        AF0020404: null,
                        AF0020405: null,
                        AF0020406: null,
                      },
                  },
                }
            }]
            },

            rulesForm:{
            areaCode:{trigger:'change',required:true,validator: belongCityNameValidator},
            serivceCode:{trigger:'change',required:true,validator:serivceCodeValidator},
            price:{trigger:'change',required:true,validator:priceValidator}
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
            type:[Object,String],
            default: ''
         },
        editType: {
            type: String,
            default: 'edit'
         },
},
components:{
    GetCityList
},
methods:{
        openDialog(){
             console.log('this.params',this.params)
            if(this.params==null)
            {
            this.driverTemplateDialogFlag=true;
            }
            else{
            if(this.editType == 'add')
            {
            this.driverTemplateDialogFlag=true;
            }
            if(!this.params.id&&this.editType == 'edit'){
            this.$message.info('请选择您要冻结的用户');
            return
            }
            if(this.editType == 'edit'){
            this.driverTemplateDialogFlag=true; 
            this.vestList = this.params;
            // if(this.vestList.setting==null){
            //   this.vestList.setting.push(this.constVestList); 
            // }
            }
            }
        },
        changeList(){
            eventBus.$emit('pushListtwo')
        },
        //弹框控制
        change() {
         this.driverTemplateDialogFlag = false;
         this.vestList=this.CvestList;
        },
        //添加子节点新增
        addItem(){
         // 业务逻辑判断
                this.vestList.setting.push(this.constVestList); 
                console.log(this.vestList.setting)
            },
        reduceItem(i){
            console.log(i)
            this.vestList.setting.splice(i,1);
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
        //关闭弹框
        close(formName){
            this.driverTemplateDialogFlag = false;
            this.vestList=this.CvestList;
        },
            //完善数据
            completeData(){
                if(this.$refs.priceStart.value&&this.$refs.priceEnd.value){
                this.vestList.priceEnd= this.$refs.priceStart.value.substr(0,this.$refs.priceStart.value.indexOf(".")+3)
                this.vestList.priceStart=this.$refs.priceEnd.value.substr(0,this.$refs.priceEnd.value.indexOf(".")+3)
                }
                for(var i=0;i<this.vestList.setting.length;i++){
                    if(this.vestList.setting[i].createTime==null){
                this.vestList.setting[i].startTime = null;
                this.vestList.setting[i].endTime = null;
                    }
                    else{
                this.vestList.setting[i].startTime = this.vestList.setting[i].createTime[0];
                this.vestList.setting[i].endTime = this.vestList.setting[i].createTime[1];
                    }

                        
                }
                

            //获取城市name
                if(!this.$refs.area){
                    return
                }  
                else if(this.$refs.area.selectedOptions.length > 1){
                    let province;
                    this.$refs.area.areaData.forEach((item) =>{
                        if(item.code == this.$refs.area.selectedOptions[0]){
                            province = item
                        }
                    })
                    province.children.forEach( item => {
                        if(item.code == this.$refs.area.selectedOptions[1]){
                            this.vestList.areaCode = item.code;
                            this.vestList.areaName = item.name;
                            console.log('item.name',item.name)
                        }
                    })
                }else{
                    this.$refs.area.areaData.forEach((item) =>{
                        if(item.code == this.$refs.area.selectedOptions[0]){
                            this.vestList.areaCode = item.code;
                            this.vestList.areaName = item.name;
                            console.log('item.name',item.name)
                        }
                    })
                }
            },

        // 保存
        changeInfoSave(){
          this.completeData();
            this.$refs['vestList'].validate(valid=>{
            var forms= Object.assign({}, this.vestList)
            console.log('dddd',forms)
                if(valid){
                    forms.setting = JSON.stringify(forms.setting)
                    console.log('dddd',forms)
                  data_Add_pushsheet(forms).then(res=>{
                console.log('res',res);
                 this.driverTemplateDialogFlag=false;
                this.changeList();
                }).catch(res=>{
                    console.log(res)
                });
                         this.vestList=this.cvestList;
                         this.driverTemplateDialogFlag=true;
                }
                })

        }
},
watch:{

},
mounted(){
this.getMoreInformation();
}
}
</script>
<style  lang="scss" scoped>
    .vestDialog{
        display: inline-block;
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
        padding-bottom: 10px;
        border-bottom: 2px dashed #ccc;
    }
    .table_box{
    margin-top: 10px;
    .ht_table{
        width: 934px;
        margin:0px 10px;
        color: #333;
        border-left:1px solid #d0d7e5;
        border-bottom:1px solid #d0d7e5;
        tr{
            width: 100%;
            line-height: 34px;
            height: 34px;
        }
        th{
            background: #EAF0FF;
            border-top:1px solid #d0d7e5;
            border-right:1px solid #d0d7e5;
        }
        td{
            border-top:1px solid #d0d7e5;
            text-align: center;
            border-right:1px solid #d0d7e5;
        }
        .Online{
            color: #409EFF;
        }
         .Offline{
            color:red;
         }
        }
             .reduceItem1{
             width: 154px!important;
             height: 34px!important;
         }
         .el-date-editor .el-range-separator {
            padding: 0 0px;
            line-height: 25px;
            width: 5%;
            color: #303133;
     }

    }
        .el-date-editor .el-range__icon {
        line-height: 24px!important;
    }
</style>

<style  lang="scss">
.vestDialogBox {
    display: inline-block;
    .commoncss{
                .el-dialog{
               width:960px!important;
                  }
    }
    .vestDialog .el-dialog {

.chooseCityList .el-cascader .el-input {
    width: 250px;
}
}
.commoncss .el-dialog .el-input {
    width: 250px;
}

.commoncss .el-date-editor .el-range__icon {
        line-height: 24px!important;
}
.commoncss .el-date-editor .el-range-separator {
    padding: 0 0px;
    line-height: 24px;
}
.commoncss .Pushinput{
    width: 100px!important;
    height:100%;

}
.commoncss .Pushinput .el-input__inner{
    border-radius:0px;
    width: 100px;
    height:35px;
    border:none
}
}


</style>
