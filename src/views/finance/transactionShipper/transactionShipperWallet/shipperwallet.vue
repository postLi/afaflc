<template>
	<div class="Shipperwallet tabsWrap">
          <el-tabs v-model="autocheck" type="card">
        <!-- 钱包明细 -->
            <el-tab-pane label="交易明细" name="first">
        <div style="height:100%;" class="identicalStyle">
       <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
               <el-form-item  label="交易类型："> 
                   <el-select v-model="formAllData.tradeType" clearable placeholder="请选择">
                        <el-option
                          v-for="item in optionsAccountType2"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                          >
                        </el-option>
                    </el-select>
               </el-form-item>  
               <el-form-item  label="收支类型："> 
                   <el-select v-model="formAllData.incomeExpendType" clearable placeholder="请选择">
                          <el-option label="收入" value="1"></el-option>
                          <el-option label="支出" value="0"></el-option>
                    </el-select>
               </el-form-item>  
                   <el-form-item label="交易时间">
                    <el-date-picker
                    v-model="payTime"
                        is-range
                        unlink-panels
                        type="daterange"
                        :picker-options="pickerOptions2"
                        range-separator="-"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
                         @change='cTime'
                    >
                    </el-date-picker>
               </el-form-item>  
                <el-form-item class="fr">
                    <el-button type="primary" plain @click="getdata_search"  :size="btnsize" icon="el-icon-search">搜索</el-button>
                    <el-button type="info" plain  @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
                </el-form-item>
       </el-form>
         <div class="classify_info">
            <div class="info_news">
            <el-table style="width: 100%"  border height="100%"  ref="multipleTable" :data="tableDataAll">
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
            <el-table-column  label="订单流水号" prop="orderSerial" sortable>
            </el-table-column>
            <el-table-column  label="交易流水号" prop="tradeSerial" sortable>
            </el-table-column> 
            <el-table-column  label="货主账号" prop="accountName" sortable>
            </el-table-column>        
            <el-table-column  label="服务分类" prop="orderTypeName" sortable>
            </el-table-column>       
            <el-table-column  label="交易类型" prop="tradeTypeName" sortable>
            </el-table-column>     
            <el-table-column  label="收支类型" prop="incomeExpendTypeName" sortable>
            </el-table-column>
            <el-table-column  label="交易金额" prop="payTotal" sortable>
            </el-table-column>     
            <el-table-column  label="交易时间" prop="createTime" sortable>
            </el-table-column>                                                                                               
            </el-table> 
             </div>
             <div class="info_tab_footer">共计:{{ dataTotal}} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
            </div>
            </div>
            </el-tab-pane>

        <!-- 提现记录 -->
            <el-tab-pane label="充值记录"  name="second">
        <div style="height:100%;" class="identicalStyle">
       <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
               <el-form-item  label="收款方式："> 
                    <el-date-picker
                        is-range
                        unlink-panels
                        type="daterange"
                        :picker-options="pickerOptions2"
                        v-model="createTime"
                        range-separator="-"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
                        @change='cTime2'
                        >
                    </el-date-picker>
               </el-form-item>  
            <el-form-item label="充值渠道：">
                  <el-select v-model="formAllData2.rechargeChannel" clearable placeholder="请选择" >
                          <el-option
                              v-for="item in rechargeChannelList"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>               
            </el-form-item>
            <el-form-item label="充值方式：">
                  <el-select v-model="formAllData2.rechargeWay" clearable placeholder="请选择" >
                          <el-option
                              v-for="item in rechargeWayList"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>                  
            </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" plain @click="getdata_search2"  :size="btnsize" icon="el-icon-search">搜索</el-button>
                    <el-button type="info" plain  @click="clearSearch2"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
                </el-form-item>
       </el-form>
         <div class="classify_info">
            <div class="info_news">
            <el-table style="width: 100%"  border height="100%" stripe ref="multipleTable2" :data="tableDataAll2">
              <el-table-column
                            label="选择"
                            type="selection"
                            width="50">
              </el-table-column>
           <el-table-column label="序号" sortable  width="80">
                            <template slot-scope="scope">
                             {{ (page2 - 1)*pagesize2 + scope.$index + 1 }}
                            </template>
            </el-table-column>
            <el-table-column  label="流水号" prop="rechargeSerial" sortable>
            </el-table-column>
            <el-table-column  label="充值时间" prop="rechargeTime" sortable>
            </el-table-column>             
            <el-table-column  label="充值金额" prop="enterSum" sortable>
            </el-table-column>        
            <el-table-column  label="充值赠送" prop="giveSum" sortable>
            </el-table-column>       
            <el-table-column  label="充值渠道" prop="rechargeChannelName" sortable>
            </el-table-column>     
            <el-table-column  label="充值方式" prop="rechargeWayName" sortable>
            </el-table-column>                                                                                               
            </el-table> 
            </div>
             <div class="info_tab_footer">共计:{{ dataTotal2 }} <div class="show_pager"> <Pager :total="dataTotal2" @change="handlePageChange2"  :sizes="sizes"/></div> </div> 
             </div>
             </div>
            </el-tab-pane>     

        <!-- 账户优惠卷 -->
        <el-tab-pane label="账户优惠卷"  name="three">
        <div style="height:100%;" class="identicalStyle">
       <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
               <el-form-item  label="优惠券名称："> 
                    <el-input v-model="formAllData3.couponName" clearable></el-input>
               </el-form-item>  
               <el-form-item  label="卷码状态："> 
                        <el-select v-model="formAllData3.couponStatus" placeholder="请选择" >
                            <el-option
                                v-for="item in couponStatusList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
               </el-form-item>  
                <el-form-item class="fr">
                    <el-button type="primary" plain @click="getdata_search3"  :size="btnsize" icon="el-icon-search">搜索</el-button>
                    <el-button type="info" plain  @click="clearSearch3"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
                </el-form-item>
       </el-form>
         <div class="classify_info">
            <div class="info_news">
            <el-table style="width: 100%"  border height="100%" stripe ref="multipleTable2" :data="tableDataAll3">
              <el-table-column
                            label="选择"
                            type="selection"
                            width="50">
              </el-table-column>
           <el-table-column label="序号" sortable  width="80">
                            <template slot-scope="scope">
                             {{ (page3 - 1)*pagesize3 + scope.$index + 1 }}
                            </template>
            </el-table-column>
            <el-table-column  label="优惠券名称" prop="couponName" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column  label="优惠券类型" prop="couponTypeName" sortable>
            </el-table-column> 
            <el-table-column  label="金额/折扣" prop="remissionDiscount" sortable>
            </el-table-column>        
            <el-table-column  label="优惠券码" prop="couponNum" sortable>
            </el-table-column>       
            <el-table-column  label="手机号码" prop="mobile" sortable>
            </el-table-column>     
            <el-table-column  label="派发时间" prop="grantTime" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column  label="过期时间" prop="endTime" show-overflow-tooltip sortable>
            </el-table-column>   
            <el-table-column  label="券码状态" prop="couponStatusName" sortable>
            </el-table-column>    
            <el-table-column  label="订单号" prop="orderSerial" show-overflow-tooltip sortable>
            </el-table-column>                            
            <el-table-column  label="订单优惠金额" prop="orderDiscountAmount" sortable>
            </el-table-column>         
            </el-table>
            </div>
              <div class="info_tab_footer">共计:{{ dataTotal3 }} <div class="show_pager"> <Pager :total="dataTotal3" @change="handlePageChange3"  :sizes="sizes"/></div> </div> 
             </div>
             </div>
            </el-tab-pane>            
    </el-tabs>
      </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel,data_ServerClassList} from '@/api/server/areaPrice.js'
import { eventBus } from '@/eventBus'
import { data_aflcCouponUseList,data_couponActive,data_aflcOrderPaymentList} from '@/api/finance/transactionShipper'
import {data_aflcRechargeList} from '@/api/finance/transactionRecharge.js'
import Pager from '@/components/Pagination/index'
import {parseTime,pickerOptions2} from '@/utils/'
import {data_financeList,data_GetServerType,data_GetServerType2,data_GetServerType3} from '@/api/finance/financeServer.js'
export default {
  props:{
    templateItem:{
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
  },
  components:{
      Pager
  },
 watch:{
    dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
            }
            else{
            this.getMoreInformation()
            }
        }
        },
   autocheck(newVal,oldVal){
        if(newVal){
            this.autocheck = newVal;
          }else{
        this.autocheck = oldVal;
          }
        },     
        },
  data(){
    return{
            pickerOptions2:{shortcuts: pickerOptions2},
            createTime:null,
            payTime:null,
            rechargeChannelList:[{code:null,name:'全部'},{code:'0',name:'APP',},{code:'1',name:'WEB',}],
            rechargeWayList:[{code:null,name:'全部'},{code:'0', name:'支付宝',},{code:'1',name:'微信',}],   
            btnsize:'mini',
            dialogFormVisible_add:false,
            autocheck:'first',
            formLabelWidth:'120px',
            sizes:[20,50,100],
            pagesize:20,//初始化加载数量
            page:1,//初始化页码
            tableDataAll:[],
            dataTotal:null,
            pagesize2:20,//初始化加载数量
            page2:1,//初始化页码
            tableDataAll2:[],
            dataTotal2:null,
            pagesize3:20,//初始化加载数量
            page3:1,//初始化页码
            tableDataAll3:[],
            dataTotal3:null,
            formAllData:{
            userId: null,
            accountType:'AF00101',
            payWay:'AF0041801',
            tradeType:null,
            incomeExpendType:null,
            tradeStartTime:null,
            tradeEndTime:null,
            },
            formAllData2:{
            name:null,
            mobile:null,
            rechargeChannel:null,
            rechargeWay:null,
            rechargeTime:null,
            accountId:null,
            },
            formAllData3:{
            userId: null,
            couponName:null,
            couponStatus:null,
            },
            couponStatusList:[],
            optionsAccountType2: [
                    {code:'AF01403',name:'订单多退'},
                    {code:'AF01404',name:'理赔收入'},
                    {code:'AF01407',name:'退运费'},
                    {code:'AF01408',name:'运费收入'},
                    {code:'AF01411',name:'支付运费'},
                    {code:'AF01412',name:'支付理赔'},
                    {code:'AF01414',name:'平台抽佣'},
                    {code:'AF01501',name:'支付运费'},
                    {code:'AF01503',name:'支付理赔'},
                    {code:'AF01505',name:'优惠券'},
                    {code:'AF01508',name:'运费收入'},
                    {code:'AF01509',name:'理赔收入'},
                    {code:'AF01510',name:'订单多退'},
                    {code:'AF01511',name:'退运费'},
                    {code:'AF01515',name:'优惠金'},
                    {code:'AF01516',name:'奖励金'},                    
                    ],

       }
 },
  methods:{
    // 钱包明细
    firstblood(){
     data_aflcOrderPaymentList(this.page,this.pagesize,this.formAllData).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
       })
       },

    // 充值记录
    firstblood2(){
     data_aflcRechargeList(this.page2,this.pagesize2,this.formAllData2).then(res => {
                    this.dataTotal2 = res.data.totalCount
                    this.tableDataAll2 = res.data.list;
       })
       },
    // 优惠卷领用
    firstblood3(){
     data_aflcCouponUseList(this.page3,this.pagesize3,this.formAllData3).then(res => {
                    this.dataTotal3 = res.data.totalCount
                    this.tableDataAll3 = res.data.list;
       })
       },
    // 钱包记录每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },  
    // 充值记录每页显示数据量变更
    handlePageChange2(obj) {
      this.page2 = obj.pageNum
      this.pagesize2 = obj.pageSize
      this.firstblood2()
    },  
    // 优惠卷领用细表每页显示数据量变更
    handlePageChange3(obj) {
      this.page3 = obj.pageNum
      this.pagesize3 = obj.pageSize
      this.firstblood3()
    },   
    //钱包明细表查询按纽，按条件查询列表
    getdata_search(event){
            this.firstblood()
    },    
    clearSearch(){
            this.formAllData={
            userId: this.$route.query.accountId,
            accountType:'AF00101',
            payWay:'AF0041801',
            tradeType:null,
            incomeExpendType:null,
            tradeStartTime:null,
            tradeEndTime:null,
            },
            this.firstblood()
            },  
    //充值记录表查询按纽，按条件查询列表
    getdata_search2(event){
            this.firstblood2()
    },    
    clearSearch2(){
            this.formAllData2={
            name:null,
            mobile:null,
            rechargeChannel:null,
            rechargeWay:null,
            rechargeTime:null,
            accountId:this.$route.query.accountId
            },
            this.firstblood2()
            },  

    //点击优惠卷领用细表查询按纽，按条件查询列表
    getdata_search3(event){
                this.firstblood3()
    },    
    clearSearch3(){
            this.formAllData3={
            couponName:null,
            couponStatus:null,
            userId:this.$route.query.accountId
            },
            this.firstblood3()
            },  
    cTime(i){
            this.formAllData.tradeStartTime = i[0];
            this.formAllData.tradeEndTime = i[1];
            },            
    cTime2(i){
            this.formAllData2.startRechargeTime = i[0];
            this.formAllData2.endRechargeTime = i[1];
        },            
     // 获取对应的字典列表
    getMoreInformation(){
            data_couponActive().then(res=>{
            this.couponStatusList = res.data
            }).catch(err =>{
                console.log(err)
            })
        },
   },
   mounted(){
     this.getMoreInformation();
     this.formAllData3.userId = this.$route.query.accountId
     this.formAllData2.accountId = this.$route.query.accountId
     this.formAllData.userId = this.$route.query.accountId
     this.firstblood()
     this.firstblood2()
     this.firstblood3()
    }
    }
</script>
<style lang="scss">
.Shipperwallet{
    .classify_info{
    padding-bottom: 0px;
    }
}
</style>