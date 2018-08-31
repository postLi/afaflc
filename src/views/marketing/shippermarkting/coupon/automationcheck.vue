<template>
     <div class="automationcheck commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newcoupon1">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
          <el-tabs v-model="autocheck" type="border-card"  >
        <!-- 活动配置 -->
            <el-tab-pane label="活动配置" name="first">
                <div class="automationcheckTab">
        <el-form :model="formAllData" ref="formAllData">
          <el-row v-if="editType=='one'">
            <el-col >
               <el-form-item  label="触发条件：" :label-width="formLabelWidth"> 
                    <el-radio-group v-model="formAllData.activityType" size="small" disabled>
                       <el-radio label="AF046102" border>新用户注册</el-radio>
                       <el-radio label="AF046103" border>认证通过</el-radio>
                    </el-radio-group>
               </el-form-item>  
            </el-col>
          </el-row>
            <el-row >
            <el-col :span="8">
               <el-form-item  label="活动名称：" :label-width="formLabelWidth">
                   <el-input v-model="formAllData.activityName" disabled></el-input>
               </el-form-item>  
            </el-col>
            <el-col :span="5">
            <el-form-item label="活动时效："  :label-width="formLabelWidth">
                    <el-date-picker
                        disabled
                        is-range
                        type="daterange"
                        v-model="createTime"
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
               <el-form-item  label="活动说明：" :label-width="formLabelWidth">
                   <div class="textareaBox">
                                <el-input
                                    disabled
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
            <el-col :span="10">
               <el-form-item  label="所属区域：" :label-width="formLabelWidth"> 
                    <el-input v-model="formAllData.areaName1"  disabled></el-input>
               </el-form-item>  
            </el-col>
          </el-row>
         <el-row >
            <el-col :span="24" >
              <div class="table_box">
            <div class="ht_table" v-for="(form,keys) in formAllData.aflcCouponList" :key='keys'>
             <div class="ht_table_tr" v-if="keys == 0">
             <div class="ht_table_th1"></div>
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
             <div class="ht_table_td1"></div>
             <div class="ht_table_td table_th1"><el-input v-model="formAllData.aflcCouponList[keys].couponNum" disabled></el-input></div>
             <div class="ht_table_td table_th2"><el-input v-model="formAllData.aflcCouponList[keys].couponName" disabled></el-input></div> 
             <div class="ht_table_td table_th3">
                     <el-select v-model="formAllData.aflcCouponList[keys].couponType" clearable placeholder="" disabled>
                         <el-option
                              v-for="item in couponList"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                     </el-select>
             </div>
             <div class="ht_table_td table_th4"><el-input v-model="formAllData.aflcCouponList[keys].remissionDiscount" disabled></el-input></div> 
             <div class="ht_table_td table_th5"><el-input v-model.number="formAllData.aflcCouponList[keys].conditionDeduction" disabled></el-input></div>
             <div class="ht_table_td table_th8"><el-input placeholder="在线支付" disabled></el-input></div>
             <div class="ht_table_td table_th7">
                      <el-select v-model="formAllData.aflcCouponList[keys].timeType" clearable placeholder="请选择" @change='TimeType(keys)' disabled>
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
                                placeholder=""
                                disabled
                                >
                         </el-date-picker>
                     </span>
                   </div> 
             <div class="ht_table_td table_th10">
                     <span v-if="formAllData.aflcCouponList[keys].timeType =='AF046301'">
                         <el-input v-model="formAllData.aflcCouponList[keys].overTime" placeholder="过期天数" max="3" disabled></el-input>
                     </span>
                     <span v-else>
                               <el-date-picker
                                v-model="formAllData.aflcCouponList[keys].endTime"
                                type="date"
                                value-format="timestamp"
                                placeholder=""
                                disabled
                                >
                                </el-date-picker>
                     </span>
                                </div>
             <div class="ht_table_td table_th11">
            <el-select v-model="formAllData.aflcCouponList[keys].serivceCode" clearable placeholder="" disabled>
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
                <el-select v-model="formAllData.aflcCouponList[keys].carType" clearable placeholder="" disabled>
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
                 <el-tooltip :content="formAllData.aflcCouponList[keys].areaName1" placement="top">
                <el-input v-model="formAllData.aflcCouponList[keys].areaName1" placeholder="" disabled></el-input>
                 </el-tooltip>
              </div>
             <div class="ht_table_td table_th14">
                  <el-input v-model="formAllData.aflcCouponList[keys].ifvouchersuperposition" placeholder="" disabled></el-input>
                 </div>                     
            </div>
            </div>

              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close">关 闭</el-button>
        </div>
    </div>
            </el-tab-pane>

        <!-- 使用记录 -->
            <el-tab-pane label="生成/发放 使用记录"  name="second">
      <div class="automationcheckTabTwo">
            <el-row >
            <el-col :span="15">
                <el-form>
               <el-form-item  label="手机号码：" :label-width="formLabelWidth">
                   <el-input v-model="searchData.mobile"></el-input>
               </el-form-item>
                 <el-form-item label="派发时间："  :label-width="formLabelWidth">
                        <el-date-picker
                        v-model="grantTimeAll"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        @change='cTime2'                        
                        >
                        </el-date-picker>
            
                  </el-form-item> 
                    <el-form-item  label="卷码状态：" :label-width="formLabelWidth">
                        <el-select v-model="searchData.couponStatus" clearable placeholder="">
                          <el-option
                             v-for="item in couponStatusLists"
                              :key="item.code"
                             :label="item.name"
                             :value="item.code"
                             :disabled="item.disabled">
                         </el-option>
                 </el-select>
               </el-form-item>  
          <el-form-item>       
          <el-button type="primary"  plain   @click="getData_query">查询</el-button> 
          </el-form-item> 
                </el-form>  
            </el-col>
            </el-row>
            <div class="tableDataAllBox">
            <el-table style="width: 100%"  border height="80%"  :data="tableDataAll">
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="优惠券名称" prop="couponName">
            </el-table-column>
            <el-table-column  label="优惠券类型" prop="couponTypeName">
            </el-table-column>  
            <el-table-column  label="优惠券码" prop="couponNum">
            </el-table-column>        
            <el-table-column  label="手机号码" prop="mobile">
            </el-table-column>       
            <el-table-column  label="派发时间" prop="grantTime">
            </el-table-column>     
            <el-table-column  label="过期时间" prop="endTime">
            </el-table-column>
            <el-table-column  label="券码状态" prop="couponStatusName">
            </el-table-column>     
            <el-table-column  label="订单号" prop="orderSerial">
            </el-table-column>    
            <el-table-column  label="订单优惠金额" prop="orderDiscountAmount">
            </el-table-column>                                                                                              
            </el-table> 
            </div>
         <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"></Pager></div> </div>
             </div>
            </el-tab-pane>            
    </el-tabs>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel,data_ServerClassList} from '@/api/server/areaPrice.js'
import {data_get_couponActive2_Id,data_get_couponActive_Id,data_get_aflcCouponUse_list,data_couponStatus,data_couponActive,data_couponActiveTime} from '@/api/marketing/shippermarkting/couponActive.js'
import Upload from '@/components/Upload/singleImage'
import vregion from '@/components/vregion/Region'
import { eventBus } from '@/eventBus'
import GetCityList from '@/components/GetCityList'
import Pager from '@/components/Pagination/index'
export default {
  props:{
    templateItem:{
      type:Object,
    },
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
    },
    optionsCarList:{
    type: Array,
    },
    MaidLevelList:{
    type: Array,
    },
    serviceCardList:{
    type: Array,
    },
    couponLists:{
    type: Array, 
    },
    couponTimeLists:{
    type: Array, 
    },
    couponStatusLists:{
    type: Array, 
    }      
  },
  components:{
      GetCityList,
      vregion,
      Pager
  },
 watch:{
     autocheck(newVal,oldVal){
        if(newVal){
            this.autocheck = newVal;
          }else{
        this.autocheck = oldVal;
          }
        }
        },
  data(){
    return{
        sizes:[10,50,100],
        pagesize:10,//初始化加载数量
        page:1,//初始化页码
        tableDataAll:[],
        dataTotal:null,
        autocheck:'first',
        dialogFormVisible_add:false,
        createTime:[],
        inputKey:null,   
        dialogFormVisible_add:false,
        formLabelWidth:'120px',
        formLabelWidth2:'80px',
        vouchersuperpositionList:[
        {    
          code:0,
          name:'不能'
        },
        {
          code:1,
          name:'能'
        }
        ],        
        optionsCar:[],
        MaidLevel:[],
        serviceCard:[],
        couponList:[],
        couponTimeList:[],
        formAllData:{
            activityDes:null,
            activityName:null,
            activityType:null,
            usingStatus:null,
            areaCode: null,
            startTime:null,
            endTime:null,
            areaName1:null,
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
           areaName1:null,
           ifvouchersuperposition:null,
        }]
        },
       grantTimeAll:null,
       searchData:{
        mobile:'',
        grantTime:null,
        endTime:null,
        couponStatus:'',
       },
    }
 },
  methods:{
   change:function(){
         this.dialogFormVisible_add = false;
   },
   close:function(){
    eventBus.$emit('changeDia')
   },
    cTime(i){
        if(i!==null){
        this.formAllData.startTime = i[0]
        this.formAllData.endTime = i[1]
        }
        else{
        this.formAllData.startTime = null
        this.formAllData.endTime = null
        }        
      },  
    cTime2(i){
        if(i!==null){
        this.searchData.grantTime = i[0]
        this.searchData.endTime = i[1]
        }
        else{
        this.searchData.grantTime = null
        this.searchData.endTime = null
        }        
    },
    getData_query(){
        this.firstblood();
    },    
    
   openDialog(){
       this.dialogFormVisible_add = true;
      data_get_couponActive_Id(this.templateItem.id).then((res)=>{
          let now1 = new Date(res.data.startTime);
          let now2 = new Date(res.data.endTime);
          let Ctime = [];
          this.formAllData.activityName= res.data.activityName
          this.formAllData.activityDes= res.data.activityDes
          this.formAllData.areaCode= res.data.areaCode
          this.formAllData.activityType= res.data.activityType
          Ctime.push(now1.getTime(),now2.getTime())
          this.createTime = Ctime
          this.formAllData.areaName1 =res.data.province+res.data.city+res.data.area
      })
      data_get_couponActive2_Id(this.templateItem.id).then((res)=>{
              this.formAllData.aflcCouponList = res.data
        for(var i= 0;i<this.formAllData.aflcCouponList.length;i++){
              this.formAllData.aflcCouponList[i].startTime  = new Date(this.formAllData.aflcCouponList[i].startTime).getTime()
              this.formAllData.aflcCouponList[i].endTime  = new Date(this.formAllData.aflcCouponList[i].endTime).getTime()
              if(this.formAllData.aflcCouponList[i].ifvouchersuperposition=='0'){
                  this.formAllData.aflcCouponList[i].ifvouchersuperposition='不能'
              }
              else{
                   this.formAllData.aflcCouponList[i].ifvouchersuperposition='能'
              }
               this.formAllData.aflcCouponList[i].areaName1 = this.formAllData.aflcCouponList[i].province+ this.formAllData.aflcCouponList[i].city+ this.formAllData.aflcCouponList[i].area
          }
      })
     this.firstblood();
   },
   change(){
        this.dialogFormVisible_add = false;
   },
   radioGroup(i){
      this.formAllData.activityType = i
   },
     // 列表刷新页面  
    firstblood(){
     data_get_aflcCouponUse_list(this.page,this.pagesize,this.searchData).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                })
       },
       //每页显示数据量变更
    handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood();
        },          
    // 卷码状态    
    getMoreInformation(){
                         this.optionsCar=this.optionsCarList
                         this.MaidLevel=this.MaidLevelList
                         this.serviceCard=this.serviceCardList
                         this.couponList=this.couponLists
                         this.couponTimeList=this.couponTimeLists
    },   
   },     
   mounted(){
    this.getMoreInformation();
    eventBus.$on('changeDia', () => {
    this.dialogFormVisible_add = false;
    })
    }
    }
</script>
<style lang="scss">
.automationcheck{
    .el-dialog{
        width: 80%!important;
        overflow:unset;
    }
    .el-button{
        margin-right:0px!important;
    }
    .v-dropdown-container{
        top:35px!important;
        left:0px!important;
    }
    .el-radio.is-bordered{
        height: 30px;
        padding: 7px 20px 0 10px;
    }
     .textareaBox {
        width:100%;
    }
    .el-input__inner{
        line-height: 30px;
        height: 30px;
    }
    .el-range__icon{
      line-height: 24px;
    }
    .el-date-editor .el-range-separator{
        line-height: 24px;
        width: 7%
    }
    .el-dialog__body{
    padding: 0px!important;
    }
    .automationcheckTab{
    padding-top:20px;
    .el-dialog{
        width: 1200px!important;
        overflow:unset;
    }
    .v-dropdown-container{
        top:35px!important;
        left:0px!important;
    }
    .el-radio.is-bordered{
        height: 30px;
        padding: 7px 20px 0 10px;
    }
     .textareaBox {
        width: 500px;
    }
    .el-radio-group{
            margin-left:0px;
        }    
    .el-input__inner{
        line-height: 30px;
        height: 30px;
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
    .el-form-item{
        float: left;
    }
    .table_box{
    .ht_table{
        width: 95%!important;
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
            text-align: center;
            padding: 5px 5px;
            display: inline-block;
            background: #EAF0FF;
            border-top:1px solid #d0d7e5;
            border-left:1px solid #d0d7e5;
            border-right:1px solid #d0d7e5;
            border-bottom:1px solid #d0d7e5;
        }
        .table_th1{width: 5%;}
        .table_th2{width: 10%;}
        .table_th3{width: 6%;}
        .table_th4{width: 6%;}
        .table_th5{width: 10%;}
        .table_th6{width: 4%;}
        .table_th7{width: 6%;}
        .table_th8{width: 6%;}
        .table_th9{width: 11%;}
        .table_th10{width: 11%;}
        .table_th11{width: 7%;}
        .table_th12{width: 7%;}
        .table_th13{width: 9%}
        .table_th14{width: 11%}
        .ht_table_td1{
            text-align: center;
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
                        height: 32px;
            .reduceItem{
                 top:5px;
                 left:25px;  
             }
            .el-form-item{
            margin-bottom: 0px!important;
            }
            .el-input{
                width:100%;
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
            padding-bottom: 10px!important;
        }
        .el-input{
                 width: 98%!important;
                 .el-input__inner{
                  padding: 0px 2px!important;
                 }
             }
        }
        }
        .dialog-footer{
            padding:10px;
        }
        .el-input__inner{
            height: 30px!important;
        }
}
        .automationcheckTabTwo{
         padding-top: 20px;
         .tableDataAllBox{
             padding-bottom: 50px;
             height: 88%
         }
         .info_tab_footer{
            padding-left: 20px;
            background: #eee;
            height: 40px;
            line-height: 40px;
            box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
            z-index: 10;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: left;
            .show_pager{float: right}
            .page-select{top:5px;
            .el-input__inner{
            height: 30px;
            line-height: 30px; 
            
            }
         }
        }}

}
</style>