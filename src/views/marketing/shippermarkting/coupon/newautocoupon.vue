<template>
     <div class="newcouponBox commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newcoupon1">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
        <el-form :model="formAllData" ref="formAllData" :rules="rulesForm">
          <el-row v-if="editType=='one'">
            <el-col>
               <el-form-item  label="触发条件：" :label-width="formLabelWidth" prop="activityType"> 
                    <el-radio-group v-model="formAllData.activityType" size="small">
                       <el-radio label="AF046102" border>新用户注册</el-radio>
                       <el-radio label="AF046103" border>认证通过</el-radio>
                    </el-radio-group>
               </el-form-item>  
            </el-col>
          </el-row>
            <el-row >
            <el-col :span="10">
               <el-form-item  label="活动名称：" :label-width="formLabelWidth" prop="activityName">
                   <el-input v-model="formAllData.activityName" maxlength="20"></el-input>
               </el-form-item>  
            </el-col>
            <el-col :span="14">
            <el-form-item label="活动时效："  :label-width="formLabelWidth" prop="createTime">
                    <el-date-picker
                        is-range
                        type="daterange"
                        v-model="formAllData.createTime"
                        range-separator="至" 
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        value-format="timestamp"
                        :default-time="['00:00:00', '23:59:59']"
                        @change='cTime'
                        >
                    </el-date-picker>
            </el-form-item> 
            </el-col>                      
          </el-row>
          <el-row>
              <el-col :span="20">
               <el-form-item  label="活动说明：" :label-width="formLabelWidth" prop="activityDes">
                   <div class="textareaBox">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="1-100间的字符"
                                    maxlength="100"
                                    ref="infofocus"
                                    v-model="formAllData.activityDes"
                                    clearable>
                                </el-input>
                                </div>
               </el-form-item>                   
              </el-col>
          </el-row>
          <el-row >
            <el-col>
               <el-form-item  label="所属区域：" :label-width="formLabelWidth"  prop="areaName"> 
                   <el-cascader
                    size="large"
                    :options="options"
                    v-model="formAllData.areaName"
                    @change="handleChange"
                     >
                    </el-cascader>
               </el-form-item>  
            </el-col>
          </el-row>
         <el-row >
            <el-col :span="24" >
              <div class="table_box">
            <div class="ht_table" v-for="(form,keys) in formAllData.aflcCouponList" :key='keys'>
             <div class="ht_table_tr" v-if="keys == 0">
             <div class="ht_table_th1"><span  class="addItem" @click="addItem"> </span></div>
             <div class="ht_table_th table_th1" >派发数量</div>
             <div class="ht_table_th table_th2">优惠券名称</div> 
             <div class="ht_table_th table_th3">优惠券类型</div>
             <div class="ht_table_th table_th4">满减/折扣</div>
             <div class="ht_table_th table_th5">满减条件/最高抵扣</div>
             <div class="ht_table_th table_th8">支付方式</div>
             <div class="ht_table_th table_th7">时效类型</div>
             <div class="ht_table_th table_th9">开始时间</div>
             <div class="ht_table_th table_th10">过期时间</div>
             <div class="ht_table_th table_th11">适用服务类型</div>
             <div class="ht_table_th table_th12">适用车辆类型</div>
             <div class="ht_table_th table_th13">所属区域</div>
             <div class="ht_table_th table_th14">能否与大户券叠加</div>
            </div>
             <div  class="ht_table_tr1">
             <div class="ht_table_td1"><span  class="reduceItem" @click="reduceItem(keys)"> </span></div>
             <div class="ht_table_td table_th1"><el-input v-model="formAllData.aflcCouponList[keys].couponNum" maxlength='2'></el-input></div>
             <div class="ht_table_td table_th2"><el-input v-model="formAllData.aflcCouponList[keys].couponName"></el-input></div> 
             <div class="ht_table_td table_th3">
                     <el-select v-model="formAllData.aflcCouponList[keys].couponType" clearable placeholder="请选择" >
                         <el-option
                              v-for="item in couponList"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                     </el-select>
             </div>
             <div class="ht_table_td table_th4"><el-input v-model="formAllData.aflcCouponList[keys].remissionDiscount"></el-input></div> 
             <div class="ht_table_td table_th5"><el-input v-model.number="formAllData.aflcCouponList[keys].conditionDeduction"></el-input></div>
             <div class="ht_table_td table_th8">在线支付</div>
             <div class="ht_table_td table_th7">
                     <el-select v-model="formAllData.aflcCouponList[keys].timeType" clearable placeholder="请选择" @change='TimeType(keys)'>
                         <el-option
                              v-for="item in couponTimeList"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                     </el-select>
             </div>
             <div class="ht_table_td table_th9">
                 <span v-if="formAllData.aflcCouponList[keys].timeType =='AF046301'">/</span>
                     <span v-else>
                         <el-date-picker v-model="formAllData.aflcCouponList[keys].startTime"
                                type="date"
                                value-format="timestamp"
                                placeholder="选择日期">
                         </el-date-picker>
                     </span>
                   </div> 
             <div class="ht_table_td table_th10">
                     <span v-if="formAllData.aflcCouponList[keys].timeType =='AF046301'">
                         <el-input v-model="formAllData.aflcCouponList[keys].overTime" placeholder="过期天数" maxlength="3"></el-input>
                     </span>
                     <span v-else>
                               <el-date-picker
                                v-model="formAllData.aflcCouponList[keys].endTime"
                                type="date"
                                value-format="timestamp"
                                placeholder="选择日期">
                                </el-date-picker>
                     </span>
              </div>
             <div class="ht_table_td table_th11">
                         <el-select v-model="formAllData.aflcCouponList[keys].serivceCode" clearable placeholder="请选择" >
                          <el-option
                              v-for="item in serviceCardList"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
            </div>
             <div class="ht_table_td table_th12">
                    <el-select v-model="formAllData.aflcCouponList[keys].carType" clearable placeholder="请选择" >
                          <el-option
                             v-for="item in optionsCar"
                             :key="item.code"
                             :label="item.name"
                             :value="item.code"
                             :disabled="item.disabled">
                         </el-option>
                 </el-select>
                 </div>  
             <div class="ht_table_td table_th13">
                   <el-cascader
                    size="large"
                    :options="options"
                    v-model="formAllData.aflcCouponList[keys].areaName"
                    @change="handleChange1"
                    @focus="changeInput(keys)"
                     >
                    </el-cascader>
              </div>
             <div class="ht_table_td table_th14">
                 <el-select v-model="formAllData.aflcCouponList[keys].ifvouchersuperposition" clearable placeholder="请选择" >
                          <el-option
                             v-for="item in vouchersuperposition"
                             :key="item.code"
                             :label="item.name"
                             :value="item.code"
                             :disabled="item.disabled">
                         </el-option>
                 </el-select>
             </div>               
            </div>
            </div>

              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add_data">创 建</el-button>
          <el-button  @click="close">取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel,data_ServerClassList} from '@/api/server/areaPrice.js'
import {data_get_couponActive_list,data_get_couponActive_create,data_couponActive,data_couponActiveTime} from '@/api/marketing/shippermarkting/couponActive.js'
import Upload from '@/components/Upload/singleImage'
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import { eventBus } from '@/eventBus'
import GetCityList from '@/components/GetCityList'
export default {
  components:{
    Upload,
  },
  props:{
    paramsView:{
      type:Object,
    },
    params:{
      type:[Object,String],
    },
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
    /*one自动，two手动*/
    editType: {
      type: String,
    }
  },
  components:{
      GetCityList,
  },
  data(){
        const activityTypeValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('触发条件不能为空'))
            }
            else{
                cb()
            }       
        }
        const activityNameValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('活动名称不能为空'))
            }
            else{
                cb()
            }        
        }
        const createTimeValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('活动时效不能为空'))
            }
            else{
                cb()
            }        
        }
        const activityDesValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('活动说明不能为空'))
            }
            else{
                cb()
            }        
        }
        const areaCodeValidator = (rule, val, cb) => {
            if(val){
            if(val.length<1){
            cb(new Error('所属地区不能为空'))
            }
            else{
                cb()
            }                 
            }else{
            cb(new Error('所属地区不能为空'))
            }   
        }        
    return{
        options:regionDataPlus,   
        inputKey:null,
        optionsCar:[],
        MaidLevel:[],
        serviceCardList:[],
        vouchersuperposition:[
        {    
          code:'0',
          name:'不能'
        },
        {
          code:'1',
          name:'能'
        }
        ],
        couponList:[],
        couponTimeList:[],          
        dialogFormVisible_add:false,
        formLabelWidth:'120px',
        formLabelWidth2:'80px',
        formAllData:{
            activityDes:null,
            activityName:null,
            activityType:null,
            usingStatus:null,
            areaName:[],
            areaCode: [],
            province:null,
            city:null,
            area:null,
            startTime:null,
            createTime:null,
            endTime:null,
            aflcCouponList:[{
            couponNum:null,
            couponName:null,
            couponType:null,
            remissionDiscount:null,
            timeType:null,
            conditionDeduction:null,
            startTime:null,
            overTime:null,
            endTime:null,
            serivceCode:null,
            carType:null,
            areaName:[],
            areaCode:[],            
            province:null,
            city:null,
            area:null,
            ifvouchersuperposition:null,
        }]
        },
         rulesForm:{
            activityType:{trigger:'change',required:true,validator: activityTypeValidator},
            activityName:{trigger:'change',required:true,validator: activityNameValidator},
            createTime:{trigger:'change',required:true,validator:createTimeValidator},
            activityDes:{trigger:'change',required:true,validator:activityDesValidator},
            areaName:{trigger:'change',required:true,validator:areaCodeValidator},
            },
    }
 },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
            this.$refs['formAllData'].resetFields();
          this.formAllData.aflcCouponList=[{
           province:null,
           city:null,
           area:null,     
           couponNum:null,
           couponName:null,
           couponType:null,
           remissionDiscount:null,
           timeType:null,
           conditionDeduction:null,
           startTime:null,
           endTime:null,
           overTime:null,
           serivceCode:null,
           carType:null,
           areaCode:[],
           areaName:[],
           ifvouchersuperposition:null,
           }]
            }
        },
    },
  },
  methods:{
        handleChange(d){
           console.log('d',d)
           if(d.length<3){
                this.$message.info('请选择具体的城市');
                this.formAllData.areaName = [];
                this.formAllData.areaCode = [];
                this.formAllData.province = null
                this.formAllData.city = null
                this.formAllData.area = null
           }
           else{
                this.formAllData.areaCode = d
                this.formAllData.province = CodeToText[d[0]]
                this.formAllData.city =  CodeToText[d[1]]
                if(d[2]==''){
                this.formAllData.area = null
                }
                else{
                this.formAllData.area = CodeToText[d[2]]
                }
           }
        },
         handleChange1(d){
           console.log('d',d)
           if(d.length<3){
                this.$message.error('请选择具体的城市');
                this.formAllData.aflcCouponList[this.inputKey].areaName = [];
                this.formAllData.aflcCouponList[this.inputKey].areaCode = [];
                this.formAllData.aflcCouponList[this.inputKey].province = null
                this.formAllData.aflcCouponList[this.inputKey].city = null
                this.formAllData.aflcCouponList[this.inputKey].area = null
           }
           else{
                this.formAllData.aflcCouponList[this.inputKey].areaCode = d
                this.formAllData.aflcCouponList[this.inputKey].province = CodeToText[d[0]]
                this.formAllData.aflcCouponList[this.inputKey].city =  CodeToText[d[1]]
                if(d[2]==''){
                this.formAllData.aflcCouponList[this.inputKey].area = null
                }
                else{
                this.formAllData.aflcCouponList[this.inputKey].area = CodeToText[d[2]]
                }
           }
        },    
    //获取  服务和车辆 类型列表
            getMoreInformation(){
                data_CarList().then(res=>{
                    // console.log(res.data)
                    res.data.map((item)=>{
                        this.optionsCar.push(item);
                    })
                    })
                data_MaidLevel().then(res=>{
                      res.data.map((item)=>{
                        this.MaidLevel.push(item);
                    })
                }).catch(res=>{
                    console.log(res)
                });    
                data_ServerClassList().then(res=>{
                      res.data.map((item)=>{
                       this.serviceCardList.push(item);
                    })     
                }).catch(res=>{
                    console.log(res)
                });            
                data_couponActive().then((res)=>{
                     res.data.map((item)=>{
                       this.couponList.push(item);
                    })   
                })
                 data_couponActiveTime().then((res)=>{
                     res.data.map((item)=>{
                       this.couponTimeList.push(item);
                    })   
                })
          },
    changeInput:function(i){
       this.inputKey = i;
       console.log(i)
    },
    openDialog:function(){
        this.dialogFormVisible_add = true;
   },
    change:function(){
      this.dialogFormVisible_add = false;
   },
    close:function(){
      this.dialogFormVisible_add = false;
       },
    //添加子节点新增
        addItem(){
           this.formAllData.aflcCouponList.push({
           province:null,
           city:null,
           area:null,     
           couponNum:null,
           couponName:null,
           couponType:null,
           remissionDiscount:null,
           timeType:null,
           conditionDeduction:null,
           startTime:null,
           endTime:null,
           overTime:null,
           serivceCode:null,
           carType:null,
           areaCode:[],
           areaName:[],
           ifvouchersuperposition:null,
           }) 
        },
    reduceItem(i){
            if(this.formAllData.aflcCouponList.length>1){
            this.formAllData.aflcCouponList.splice(i,1);
            }
            else{
                return
    }
   },
     cTime(i){
                this.formAllData.startTime = i[0]
                this.formAllData.endTime = i[1]
     },
    TimeType(i){
     console.log('this.formAllData.endTime',i)
    },
    completeData(){
             let reg= /^[1-9]\d*$/  //输入正整数正则
             let reg2=/^(\d|9)(\.\d)?$/  //输入0到9
             let reg3=/^(\d|10)(\.\d)?$/  //输入0到10
                for(var i=0;i<this.formAllData.aflcCouponList.length;i++){
                  if(!this.formAllData.aflcCouponList[i].couponNum){
                     this.$message.warning('派发数量都不能为空');
                     return false
                   }
                  if(!reg3.test(this.formAllData.aflcCouponList[i].couponNum)&&this.formAllData.aflcCouponList[i].couponNum!==null){
                   this.$message.warning('派发数量仅能输入0-10之间正整数');
                     return false
                   }                   
                  if(!this.formAllData.aflcCouponList[i].couponName){
                     this.$message.warning('优惠券名称都不能为空');
                     return false
                   }  
                  if(!this.formAllData.aflcCouponList[i].couponType){
                     this.$message.warning('优惠券类型都不能为空');
                     return false
                   } 
                  if(!this.formAllData.aflcCouponList[i].remissionDiscount){
                     this.$message.warning('满减/折扣都不能为空');
                     return false
                   }
                  if(!this.formAllData.aflcCouponList[i].conditionDeduction){
                     this.$message.warning('满减条件/最高抵扣都不能为空');
                     return false
                   }
                  if(!this.formAllData.aflcCouponList[i].timeType){
                     this.$message.warning('时效类型都不能为空');
                     return false
                   }
                  if(!this.formAllData.aflcCouponList[i].timeType){
                     this.$message.warning('时效类型都不能为空');
                     return false
                   }
                  if(this.formAllData.aflcCouponList[i].timeType=='AF046301'){
                      if(!this.formAllData.aflcCouponList[i].overTime){
                     this.$message.warning('过期时间不能为空');  
                     return false  
                      }
                  }
                  if(this.formAllData.aflcCouponList[i].timeType=='AF046302'){
                      if(!this.formAllData.aflcCouponList[i].startTime){
                     this.$message.warning('开始时间不能为空');  
                     return false  
                      }
                      if(!this.formAllData.aflcCouponList[i].endTime){
                     this.$message.warning('过期时间不能为空');  
                     return false  
                      }
                  }
                  if(!this.formAllData.aflcCouponList[i].serivceCode){
                     this.$message.warning('适用服务类型不能为空');  
                     return false  
                  }
                  if(!this.formAllData.aflcCouponList[i].carType){
                     this.$message.warning('适用车辆类型不能为空');  
                     return false  
                  }
                  if(!this.formAllData.aflcCouponList[i].areaCode){
                     this.$message.warning('所属区域不能为空');  
                     return false  
                  }     
                  if(!this.formAllData.aflcCouponList[i].ifvouchersuperposition){
                     this.$message.warning('能否与大户券叠加不能为空');  
                     return false  
                  }                                 
                    if(this.formAllData.aflcCouponList[i].remissionDiscount){
                   if(this.formAllData.aflcCouponList[i].couponType==null){
                       this.$message.warning('请选择优惠卷类型');
                        return false
                    }  
                    }
                  if(this.formAllData.aflcCouponList[i].couponType=='AF046201'){
                   if(!reg.test(this.formAllData.aflcCouponList[i].remissionDiscount))
                   {
                       this.$message.warning('满减卷输入0以上的正整数');
                        return false
                   }
                   else if(this.formAllData.aflcCouponList[i].remissionDiscount>this.formAllData.aflcCouponList[i].conditionDeduction){
                       this.$message.warning('满减卷不能大于最高满减条件');
                        return false
                   }
                    }
                   if(this.formAllData.aflcCouponList[i].couponType=='AF046202')   
                   {
                   if(!reg2.test(this.formAllData.aflcCouponList[i].remissionDiscount))
                   {
                       this.$message.warning('折扣卷输入数字，输入的范围值为 0<x<10，精确到小数点后一位');
                        return false
                   }      
                   }
                    if(!reg.test(this.formAllData.aflcCouponList[i].conditionDeduction)&&this.formAllData.aflcCouponList[i].conditionDeduction!==null){
                     this.$message.warning('满减条件/最高抵扣仅能输入正整数');
                     return false
                    }
                 }
                 
    },
     add_data(){
            console.log('this.formAllData.endTime',this.formAllData)     
            this.completeData(); 
            if(this.completeData()==false)
            {
               return
            }
            else{
            this.$refs['formAllData'].validate(valid=>{        
              if(valid){
                if(this.editType=='two'){
                  this.formAllData.activityType = 'AF046101';
                } 
                else if(this.formAllData.area){
                    this.formAllData.areaCode.splice(0,2)
                }
                else{
                    this.formAllData.areaCode.splice(0,1)
                    this.formAllData.areaCode.pop()
                }
                this.formAllData.areaCode =String(this.formAllData.areaCode)
                    let aflcCouponList = []
                    this.formAllData.aflcCouponList.map((list,index)=>{
                    if(list.area){
                       list.areaCode.splice(0,2)
                    }
                    else{
                      list.areaCode.splice(0,1)
                      list.areaCode.pop()
                    }
                      list.areaCode  = String(list.areaCode)
                      console.log(list.areaCode)
                        aflcCouponList.push(
                            {
                                province:list.province,
                                city:list.city,
                                area:list.area,     
                                couponNum:list.couponNum,
                                couponName:list.couponName,
                                couponType:list.couponType,
                                remissionDiscount:list.remissionDiscount,
                                timeType:list.timeType,
                                conditionDeduction:list.conditionDeduction,
                                startTime:list.startTime,
                                overTime:list.overTime,
                                endTime:list.endTime,
                                serivceCode:list.serivceCode,
                                carType:list.carType,
                                areaCode:list.areaCode,
                                ifvouchersuperposition:list.ifvouchersuperposition,                              
                            }
                        )
                        })
                    let forms=[{
                        activityType:this.formAllData.activityType,
                        activityName:this.formAllData.activityName,
                        startTime:this.formAllData.startTime,
                        endTime:this.formAllData.endTime,
                        activityDes:this.formAllData.activityDes,
                        areaCode:this.formAllData.areaCode,
                        province:this.formAllData.province,
                        city:this.formAllData.city,
                        area:this.formAllData.area,
                        aflcCouponList:aflcCouponList
                    }]
              data_get_couponActive_create(forms).then((res)=>{
              
              this.$refs['formAllData'].resetFields();
              eventBus.$emit('changeListtwo')
              this.dialogFormVisible_add = false;
              this.$message.success('新增成功');
                }).catch(res=>{
                    console.log(res)
                    this.dialogFormVisible_add = false;
                    this.$message.error('新增失败')
            });
              }
         })
        }
     }       
  },
  mounted(){
      this.getMoreInformation();
  }
}

</script>
<style lang="scss">
.newcouponBox{
    .el-dialog{
        width: 80%!important;
        overflow:unset;
    }
    .el-row{
        padding-bottom: 10px;
    }
    .el-radio.is-bordered{
        height: 30px;
        padding: 7px 20px 0 10px;
    }
     .textareaBox {
        width: 500px;
    }
    .el-input__icon{
        line-height: 24px;
        height: 24px;
    }
    .el-range__icon{
      line-height: 24px;
    }
    .el-date-editor .el-range-separator{
        line-height: 24px;
        width: 7%
    }
    .couponcost{
        margin-left:50px;
    }
    .el-radio-group{
            margin-left:0px;
        }    
    .table_box{
    .ht_table{
        width: 95%;
        margin:0px 10px;
        color: #333;
        .ht_table_tr{
            width: 100%;
            overflow: hidden;
            line-height: 32px;
                        display: flex;
        }
         .ht_table_tr1{
            width: 100%;
            line-height: 31px;
            height: 32px;
            display: flex;
        }
        .ht_table_th1{

            padding: 5px 5px;
            width: 35px;
            height: 45px;
            line-height: 45px;
            position: relative;
             .addItem{
                 top:10px;
                 left:0px;
             }
        }
        .ht_table_th{
            padding: 5px 5px;
            display: inline-block;
            background: #EAF0FF;
            text-align: center;
            border-top:1px solid #d0d7e5;
            border-left:1px solid #d0d7e5;
            border-right:1px solid #d0d7e5;
            border-bottom:1px solid #d0d7e5;
        }
        .table_th1{width: 7%;}
        .table_th2{width: 10%;}
        .table_th3{width: 7%;}
        .table_th4{width: 6%;}
        .table_th5{width: 12%;}
        .table_th6{width: 4%;}
        .table_th7{width: 6%;}
        .table_th8{width: 8%;}
        .table_th9{width: 11%;}
        .table_th10{width: 11%;}
        .table_th11{width: 8%;}
        .table_th12{width: 8%;}
        .table_th13{width: 9%}
        .table_th14{width: 11%}
        .ht_table_td1{
            float: left;
            padding: 5px 5px;
            width: 35px;
            height: 45px;
            line-height: 45px;
            position: relative;
             .reduceItem{
                 top:3px;
                 left:0px;
             }
        }
        .ht_table_td{
            float: left;
            text-align: center;
            display: inline-block;
            border-left:1px solid #d0d7e5;
            border-bottom:1px solid #d0d7e5;
            border-right:1px solid #d0d7e5;
            position: relative;
            text-align: center;
            height: 32px;
            .reduceItem{
                 top:5px;
                 left:25px;  
             }
            .el-form-item{
            margin-bottom: 0px;
            }
            .el-input{
                width:100%;
            }
            .el-cascader{
                line-height: 30px;  
            }
        }
        .el-input__icon{
            display:none;
        }
        .htable_div{
            display: block
        }
        .el-form-item{
            width: 100%;
            padding-top:10px;
            padding-bottom: 10px;
        }
        .el-input{
                 width: 98%;
                 .el-input__inner{
                  padding: 0px 5px;
                 }
                
             } 
        }
        }
}
</style>