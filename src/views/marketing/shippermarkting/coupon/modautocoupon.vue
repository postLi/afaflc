<template>
     <div class="newcouponBox commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newcoupon1">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
        <el-form :model="formAllData" ref="formAllData" :rules="rulesForm">
          <el-row >
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
               <el-form-item  label="所属区域：" :label-width="formLabelWidth"  prop="areaCode"> 
                <vregion :ui="true" @values="regionChange" class="form-control" >
                    <el-input v-model="formAllData.areaCode" placeholder="请选择出发地"></el-input>
                </vregion>
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
             <div class="ht_table_td table_th1"><el-input v-model="formAllData.aflcCouponList[keys].couponNum"></el-input></div>
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
                         <el-input v-model="formAllData.aflcCouponList[keys].overTime" placeholder="过期天数" max="3"></el-input>
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
             <vregion :ui="true" @values="regionChange1" class="form-control">
                <el-input v-model="formAllData.aflcCouponList[keys].areaCode" placeholder="请选择出发地" @focus="changeInput(keys)"></el-input>
            </vregion>
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
import {data_get_couponActive_list,data_get_couponActive_create,data_couponActive,data_couponActiveTime,data_get_couponActive_Id,data_get_couponActive2_Id,data_get_couponActive_update,data_get_aflcCoupon_add} from '@/api/marketing/shippermarkting/couponActive.js'
import Upload from '@/components/Upload/singleImage'
import vregion from '@/components/vregion/Region'
import { eventBus } from '@/eventBus'
import GetCityList from '@/components/GetCityList'
export default {
  components:{
    Upload,
    vregion,
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
  components:{
      GetCityList,
        vregion
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
            if(!val){
            cb(new Error('所属区域不能为空'))
            }
            else{
                cb()
            }        
        }        
    return{
        inputKey:null,
        optionsCar:[
        {
          code:null,
          name:'全部'
        }
         ],
        MaidLevel:[
        {    
          code:null,
          name:'全部'
        }
        ],
         serviceCardList:[
        {    
          code:null,
          name:'全部'
        }
        ],
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
            areaCode: null,
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
            areaCode:null,
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
  methods:{
    regionChange(d) {
                console.log('data:',d)
                this.formAllData.areaCode = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
    },
    regionChange1(d) {
                console.log('data:',d)
               this.formAllData.aflcCouponList[this.inputKey].areaCode = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
    },
    getValue(obj){
        console.log('dd',obj)
                return obj ? obj.value:'';
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
    },
    openDialog:function(){
        if(!this.params.id){
               
            this.$message.info('未选中需要修改内容');
        }
        else{
      data_get_couponActive_Id(this.params.id).then((res)=>{
          
          let now1 = new Date(res.data.startTime);
          let now2 = new Date(res.data.endTime);
          let Ctime = [];
          this.formAllData.id = this.params.id
          this.formAllData.activityName= res.data.activityName
          this.formAllData.activityDes= res.data.activityDes
          this.formAllData.areaCode= res.data.areaCode
          this.formAllData.activityType= res.data.activityType
          Ctime.push(now1.getTime(),now2.getTime())
          this.formAllData.createTime = Ctime
      })
      data_get_couponActive2_Id(this.params.id).then((res)=>{
          console.log('fddddddd',res )
          this.formAllData.aflcCouponList = res.data
          for(var i= 0;i<this.formAllData.aflcCouponList.length;i++){
              this.formAllData.aflcCouponList[i].startTime  = new Date(this.formAllData.aflcCouponList[i].startTime).getTime()
              this.formAllData.aflcCouponList[i].endTime  = new Date(this.formAllData.aflcCouponList[i].endTime).getTime()
          }
      })
      this.dialogFormVisible_add = true;
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
           couponNum:null,
           couponName:null,
           couponType:null,
           remissionDiscount:null,
           timeType:null,
           conditionDeduction:null,
           startTime:null,
           overTime:null,
           serivceCode:null,
           carType:null,
           areaCode:null,
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
             let reg2=/^(\d|10)(\.\d)?$/  //输入0到10正数正则
                for(var i=0;i<this.formAllData.aflcCouponList.length;i++){
                  if(!reg.test(this.formAllData.aflcCouponList[i].couponNum)&&this.formAllData.aflcCouponList[i].couponNum!==null){
                   this.$message.warning('派发数量仅能输入正整数');
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
                       this.$message.warning('减免卷输入正整数');
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
              delete this.formAllData["createTime"];  
              data_get_couponActive_update(this.formAllData).then((res)=>{
              this.dialogFormVisible_add = false;
              this.$refs['formAllData'].resetFields();
              this.formAllData.aflcCouponList=[{
                couponNum:null,
                couponName:null,
                couponType:null,
                remissionDiscount:null,
                timeType:null,
                conditionDeduction:null,
                startTime:null,
                overTime:null,
                serivceCode:null,
                carType:null,
                areaCode:null,
                ifvouchersuperposition:null,
              }]
              eventBus.$emit('changeListtwo')
           })
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
</style>