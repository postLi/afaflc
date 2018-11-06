<template>
     <div class="newcouponBox commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newcoupon1">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle" modal-append-to-body>
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
                        unlink-panels
                        :picker-options="pickerOptions2"
                        type="daterange"
                        align="right"
                        v-model="formAllData.createTime"
                        range-separator="-" 
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
               <el-form-item  label="活动说明：" :label-width="formLabelWidth" prop="activityDes" class="textArea" > 
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="1-100间的字符" 
                                    maxlength="100"
                                    ref="infofocus"
                                    v-model="formAllData.activityDes"
                                    clearable>
                                </el-input>
                              <p class="countNum">
                             <span class="">{{formAllData.activityDes.length}}</span> <span>/ {{maxlengthNum}}</span> 
                        </p>
               </el-form-item>                    
              </el-col>
          </el-row>
          <el-row >
            <el-col>
                <el-form-item  label="所属区域：" :label-width="formLabelWidth" v-if="editType !=='add'&&!selectFlag"> 
                    <el-input v-model="formAllData.areaName1" @focus="changeSelect"></el-input>
               </el-form-item>  
               <el-form-item  label="所属区域：" :label-width="formLabelWidth"  prop="areaName" v-else> 
                     <GetCityList ref="area" v-model="formAllData.areaName"  @returnStr="getStr"></GetCityList>
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
             <div class="ht_table_th table_th6">支付方式</div>
             <div class="ht_table_th table_th7">时效类型</div>
             <div class="ht_table_th table_th8">开始时间</div>
             <div class="ht_table_th table_th9">过期时间</div>
             <div class="ht_table_th table_th10">适用服务类型</div>
             <div class="ht_table_th table_th11">适用车辆类型</div>
             <div class="ht_table_th table_th12">所属区域
                <checkboxarea ref="areas" @returnStr="getStr1" :positiondata="positiondata"></checkboxarea>
             </div>
             <div class="ht_table_th table_th13">能否与大户券叠加</div>
            </div>
             <div  class="ht_table_tr1">
             <div class="ht_table_td1"><span  class="reduceItem" @click="reduceItem(keys)"> </span></div>
             <div class="ht_table_td table_th1"><el-input v-model="formAllData.aflcCouponList[keys].couponNum" maxlength="2"></el-input></div>
             <div class="ht_table_td table_th2"><el-input v-model="formAllData.aflcCouponList[keys].couponName" maxlength="20"></el-input></div> 
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
             <div class="ht_table_td table_th6">在线支付</div>
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
             <div class="ht_table_td table_th8">
                 <span v-if="formAllData.aflcCouponList[keys].timeType =='AF046301'">/</span>
                     <span v-else>
                         <el-date-picker v-model="formAllData.aflcCouponList[keys].startTime"
                                type="datetime"
                                value-format="timestamp"
                                default-time="00:00:00"
                                placeholder="选择日期">
                         </el-date-picker>
                     </span>
                   </div> 
             <div class="ht_table_td table_th9">
                     <span v-if="formAllData.aflcCouponList[keys].timeType =='AF046301'">
                         <el-input v-model="formAllData.aflcCouponList[keys].overTime" placeholder="过期天数" maxlength="3"></el-input>
                     </span>
                     <span v-else>
                               <el-date-picker
                                v-model="formAllData.aflcCouponList[keys].endTime"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择日期"
                                default-time="23:59:59">
                                </el-date-picker>
                     </span>
                                </div>
             <div class="ht_table_td table_th10">
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
             <div class="ht_table_td table_th11">
                    <el-select v-model="formAllData.aflcCouponList[keys].carType" clearable placeholder="请选择" multiple collapse-tags>
                          <el-option
                             v-for="item in optionsCar"
                              :key="item.code"
                             :label="item.name"
                             :value="item.code"
                             :disabled="item.disabled">
                         </el-option>
                 </el-select>
                 </div>  
             <div class="ht_table_td table_th12" @click="changeInput(keys,$event)">
                <span v-if="editType=='types'">
                    <el-input placeholder="" v-model="formAllData.aflcCouponList[keys].area"  disabled></el-input>
                </span>
                <span v-else>
                <el-input placeholder="" v-model="formAllData.aflcCouponList[keys].area"  id="inputArea"></el-input>
                <el-tooltip class="item" effect="dark" :content="formAllData.aflcCouponList[keys].area" placement="top-start" :disabled="!formAllData.aflcCouponList[keys].area">
                <div class="moke" @click='open' id="moke"></div>
                </el-tooltip>
                </span>
              </div>
             <div class="ht_table_td table_th13">
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
import {data_get_couponActive_list,data_get_couponActive_create,data_couponActive,data_couponActiveTime,data_get_couponActive_Id,data_get_couponActive2_Id,data_get_couponActive_update,data_get_aflcCoupon_add} from '@/api/marketing/shippermarkting/couponActive.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList/city'
import { eventBus } from '@/eventBus'
import checkboxarea from '@/components/GetCityList/checkboxarea'
import {parseTime,pickerOptions2} from '@/utils/'
export default {
  components:{
    Upload,
    GetCityList,
    checkboxarea
  },
  props:{
    paramsView:{
      type:Object,
    },
    params:{
      type:[Object,String,Array],
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
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
    }
  },
     dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
            this.$refs['formAllData'].resetFields();
            }
        },
    },
  data(){
        const activityTypeValidator = (rule, val, cb) => {
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
            if(!val){
            cb(new Error('所属区域不能为空'))
            }
            else{
                cb()
            }        
        }        
    return{
        positiondata:{
            left:'',
            top:'',
        },
        maxlengthNum:100,
        pickerOptions2: {
        shortcuts: pickerOptions2},
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
        selectFlag:false,
        areaStatus:null,
        couponList:[],
        couponTimeList:[],          
        dialogFormVisible_add:false,
        formLabelWidth:'120px',
        formLabelWidth2:'80px',
        formAllData:{
            activityDes:'',
            activityName:null,
            activityType:null,
            usingStatus:null,
            areaName:null,
            areaCode: null,
            areaName1:null,
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
            carType:[],
            areaName:null,
            areaCode:null,
            selectFlag:null,
            areaName1:null,            
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
            areaCode:{trigger:'change',required:true,validator:areaCodeValidator},
            },
    }
 },
   watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
          if(!val){
          this.$refs['formAllData'].resetFields();
          this.$emit('getData') 
          this.areaStatus = null;
          this.selectFlag=false;
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
           carType:[],
           selectFlag:null,
           areaCode:[],
           areaName:[],
           areaName1:null,
           ifvouchersuperposition:null,
           }]
            if(this.$refs.area){
            this.$refs.area.clearData();
            }
            this.$refs.areas[0].clearData();
            this.$refs.areas[0].close()
            }
         else{
           this.getMoreInformation();
            }
        },
    },
  },
  methods:{
     // 省市状态表
    changeSelect(){
            if(this.editType==='add'){
                this.selectFlag=false
            } else{
                this.selectFlag=true
            }
            },
    getStr(val){
                this.formAllData.areaCode= val.area.code
                this.formAllData.areaName = val.area.name
                this.formAllData.province = val.province.name
                this.formAllData.city = val.city.name
                this.formAllData.area = val.area.name
            },  
    getStr1(val){
                this.formAllData.aflcCouponList[this.inputKey].areaCode= val.ItemDataCode
                this.formAllData.aflcCouponList[this.inputKey].areaName = val.ItemDataName
                this.formAllData.aflcCouponList[this.inputKey].province = val.ItemDataProvince
                this.formAllData.aflcCouponList[this.inputKey].city = val.ItemDataCity
                this.formAllData.aflcCouponList[this.inputKey].area = val.ItemDataName
            },  
    //获取  服务和车辆 类型列表
            getMoreInformation(){
                data_CarList().then(res=>{
                        this.optionsCar = res.data
                    })
                data_MaidLevel().then(res=>{
                        this.MaidLevel = res.data
                }).catch(res=>{
                    console.log(res)
                });    
                data_ServerClassList().then(res=>{
                       this.serviceCardList = res.data
                }).catch(res=>{
                    console.log(res)
                });            
                data_couponActive().then((res)=>{
                       this.couponList = res.data
                })
                 data_couponActiveTime().then((res)=>{
                       this.couponTimeList = res.data
                })
          },
    changeInput:function(i,e){
        console.log('1',)
       this.inputKey = i;
       this.positiondata.top =e.currentTarget.offsetTop+41
    },
    changeSelect1:function(i){
            if(this.editType==='add'){
                this.formAllData.aflcCouponList[i].selectFlag=null
            } else{
                this.formAllData.aflcCouponList[i].selectFlag='1'
            }
     this.$forceUpdate()
     console.log( this.formAllData.aflcCouponList[0].selectFlag)
    },
    open(){
        if(this.$refs.areas){
            this.$refs.areas[0].open()
        }
        
    },
    openDialog:function(){
          if(this.params.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的用户');
               return
          }
          else if (this.params.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
                return
          }
          else if(this.params.length == undefined && this.editType !== 'add')
          {
                this.$message.warning('请选择您要操作的用户');
               return false
          }          
           else{
            if(this.params[0].usingStatus==0){
            this.$message.info('选中内容被已禁用，不能进行修改操作');
            this.$emit('getData') 
            return
           }
           else{
      data_get_couponActive_Id(this.params[0].id).then((res)=>{
          let now1 = new Date(res.data.startTime);
          let now2 = new Date(res.data.endTime);
          let Ctime = [];
          this.formAllData.id = res.data.id
          this.formAllData.activityName= res.data.activityName
          this.formAllData.activityDes= res.data.activityDes
          this.formAllData.areaCode=res.data.areaCode
          this.formAllData.activityType= res.data.activityType
          Ctime.push(now1.getTime(),now2.getTime())
          this.formAllData.createTime = Ctime
          this.formAllData.startTime = res.data.startTime
          this.formAllData.endTime = res.data.endTime
          this.formAllData.province = res.data.province
          this.formAllData.city = res.data.city
          this.formAllData.area = res.data.area
          if(res.data.area==null){
          this.formAllData.areaName1 =res.data.province+res.data.city
          }
          else{
          this.formAllData.areaName1 =res.data.province+res.data.city+res.data.area
          }
      })
      data_get_couponActive2_Id(this.params[0].id).then((res)=>{
          console.log('122',res.data)
          this.formAllData.aflcCouponList = res.data
          for(var i= 0;i<this.formAllData.aflcCouponList.length;i++){
              let carString= []
                 if(res.data[i].carType.length>7){
                     carString =  res.data[i].carType.split(',')
                 }
                 else{
                   carString =  res.data[i].carType.split(' ')
                 }
              this.formAllData.aflcCouponList[i].carType = carString
              this.formAllData.aflcCouponList[i].startTime  = new Date(this.formAllData.aflcCouponList[i].startTime).getTime()
              this.formAllData.aflcCouponList[i].endTime  = new Date(this.formAllData.aflcCouponList[i].endTime).getTime()
        }
         })
         this.dialogFormVisible_add = true;
        }
        }
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
           carType:[],
           areaCode:null,
           areaName1:null,
           areaName:null,
           selectFlag:null,
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
             let reg3=/^([1-9]|1[0-9]|20)(\.\d)?$/  //输入0到10
                for(var i=0;i<this.formAllData.aflcCouponList.length;i++){
                  if(!this.formAllData.aflcCouponList[i].couponNum){
                     this.$message.warning('派发数量都不能为空');
                     return false
                   }
                  if(!reg3.test(this.formAllData.aflcCouponList[i].couponNum)&&this.formAllData.aflcCouponList[i].couponNum!==null){
                   this.$message.warning('派发数量仅能输入1-20之间正整数');
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
                     var overTimeReg= /[^\d]/g
                     if(!this.formAllData.aflcCouponList[i].overTime){
                     this.$message.warning('派发过期时间不能为空');  
                     return false  
                      }
                    else if(overTimeReg.test(this.formAllData.aflcCouponList[i].overTime)){
                     this.$message.warning('过期时间必须为正整数');  
                     return false 
                    }   
                  }
                  if(this.formAllData.aflcCouponList[i].timeType=='AF046302'){
                      if(!this.formAllData.aflcCouponList[i].startTime){
                     this.$message.warning('派发开始时间不能为空');  
                     return false  
                      }
                      if(this.formAllData.startTime>this.formAllData.aflcCouponList[i].startTime)
                      {
                     this.$message.warning('派发开始时间必须大于活动时效的开始时间');  
                     return false  
                      }
                      if(this.formAllData.aflcCouponList[i].endTime<this.formAllData.aflcCouponList[i].startTime)
                      {
                      this.$message.warning('派发过期时间必须大于派发开始时间');  
                      return false  
                      }                      
                      if(!this.formAllData.aflcCouponList[i].endTime){
                     this.$message.warning('派发过期时间不能为空');  
                     return false  
                      }
                  }
                  if(!this.formAllData.aflcCouponList[i].serivceCode){
                     this.$message.warning('适用服务类型不能为空');  
                     return false  
                  }
                  if(!this.formAllData.aflcCouponList[i].carType.length>0){
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
            this.completeData(); 
            if(this.completeData()==false)
            {
               return
            }
            else{
            this.$refs['formAllData'].validate(valid=>{
              if(valid){

                    let aflcCouponList = []
                    this.formAllData.aflcCouponList.map((list,index)=>{
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
                                carType:list.carType.join(','),
                                areaCode:list.areaCode,
                                ifvouchersuperposition:list.ifvouchersuperposition,                              
                            }
                        )
                        })
                    let forms={
                        id:this.params[0].id,
                        activityType:this.formAllData.activityType,
                        activityName:this.formAllData.activityName,
                        startTime:this.formAllData.startTime,
                        endTime:this.formAllData.endTime,
                        activityDes:this.formAllData.activityDes,
                        areaCode: this.formAllData.areaCode,
                        province:this.formAllData.province,
                        city:this.formAllData.city,
                        area:this.formAllData.area,
                        aflcCouponList:aflcCouponList
                    }
              this.dialogFormVisible_add = false;
              data_get_couponActive_update(forms).then((res)=>{
              this.$emit('getData');
              this.$message.success('修改成功')
           }).catch(res=>{
              this.$emit('getData');
                    console.log('res',res.text)
                    if(res.text='已发放过优惠卷不能进行修改')
                    {
                    this.$message.error('已发放过优惠卷不能进行修改')
                    }
                    else{
                    this.$message.error('修改失败')
                    }   
            });
              }
         })
        }
     }       
  },
  mounted(){
    var _this = this
    document.addEventListener('click',function(e){
    e.stopPropagation();
    if(_this.$refs.areas){
    if(_this.$refs.areas.length>0){
    if(e.target.id=='checkboxCityList'||e.target.id=="moke")
    {
    _this.$refs.areas[0].open()
    }
    else{
    _this.$refs.areas[0].close()
    }    
    }
    }
    })
  }
}
</script>
<style lang="scss">
</style>