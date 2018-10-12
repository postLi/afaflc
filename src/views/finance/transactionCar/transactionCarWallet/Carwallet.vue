<template>
	<div class="Carwallet tabsWrap">
          <el-tabs v-model="autocheck" type="card">
        <!-- 钱包明细 -->
            <el-tab-pane label="钱包明细" name="first">
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
               <el-form-item  label="交易时间：">
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
            <el-table-column  label="订单流水号" prop="orderSerial" sortable show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column  label="交易流水号" prop="tradeSerial" sortable show-overflow-tooltip sortable>
            </el-table-column> 
            <el-table-column  label="货主账号" prop="accountName" sortable show-overflow-tooltip sortable>
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
            <el-tab-pane label="提现记录"  name="second">
        <div style="height:100%;" class="identicalStyle">
       <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
               <el-form-item  label="收款方式："> 
                    <el-select v-model="formAllData.extractWay" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in extractWayList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled"
                            >
                        </el-option>
                    </el-select>
               </el-form-item>  
               <el-form-item  label="处理时间：" > 
                     <el-date-picker
                    v-model="payTime2"
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
                         @change='cTime2'
                    >
                    </el-date-picker>
               </el-form-item>  
                <el-form-item class="fr">
                    <el-button type="primary" plain @click="getdata_search2"  :size="btnsize" icon="el-icon-search">搜索</el-button>
                    <el-button type="info" plain  @click="clearSearch2"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
                </el-form-item> 
       </el-form>
            <div class="classify_info">
            <div class="info_news">
            <el-table style="width: 100%" border height="100%"  ref="multipleTable2" :data="tableDataAll2">
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
            <el-table-column  label="流水号" prop="extractSerial" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column  label="处理时间" prop="auditTime" sortable>
            </el-table-column> 
            <el-table-column  label="用户账号" prop="mobile" sortable>
            </el-table-column>        
            <el-table-column  label="提现金额" prop="extractSum" sortable>
            </el-table-column>       
            <el-table-column  label="手续费" prop="" sortable>
             <template  slot-scope="scope">
             <span>0</span>
            </template>
            </el-table-column>     
            <el-table-column  label="收款方式" prop="extractWay" sortable>
            </el-table-column>
            <el-table-column  label="收款账号" prop="extractAccount" sortable show-overflow-tooltip sortable>
            </el-table-column>                                                                                                 
            </el-table> 
            </div>
             <div class="info_tab_footer">共计:{{ dataTotal2}} <div class="show_pager"> <Pager :total="dataTotal2" @change="handlePageChange2"  :sizes="sizes"/></div> </div> 
             </div>
             </div>
            </el-tab-pane>            
    </el-tabs>
    </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel,data_ServerClassList} from '@/api/server/areaPrice.js'
import { data_aflcOrderPaymentList} from '@/api/finance/transactionShipper'
import { eventBus } from '@/eventBus'
import {data_aflcExtractCashList} from '@/api/finance/transactionCash.js'
import {parseTime,pickerOptions2} from '@/utils/'
import Pager from '@/components/Pagination/index'
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
        }
        },
  data(){
    return{
            pickerOptions2:{shortcuts: pickerOptions2},
            btnsize:'mini',
            dialogFormVisible_add:false,
            autocheck:'first',
            formLabelWidth:'120px',
            payTime:null,
            payTime2:null,
            sizes:[20,50,100],
            pagesize:20,//初始化加载数量
            page:1,//初始化页码
            tableDataAll:[],
            dataTotal:null,
            pagesize2:20,//初始化加载数量
            page2:1,//初始化页码
            tableDataAll2:[],
            dataTotal2:null,
            formAllData:{
            userId: null,
            accountType:'AF00102',
            payWay:'AF0041801',
            tradeType:null,
            incomeExpendType:null,
            tradeStartTime:null,
            tradeEndTime:null,
            },
            formAllData2:{
                startExtractTime:null,
                endExtractTime:null,
                extractWay:null,
                accountId:null,
            },
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
            extractWayList:[
            {code:null,name:'全部'},
            {code:'0',name:'支付宝'},
            {code:'1',name:'微信'}
            ],
       }
 },
  methods:{
    cTime(i){
            this.formAllData.tradeStartTime = i[0];
            this.formAllData.tradeEndTime = i[1];
    },
      // 处理时间处理
    cTime2(i){
        if(i!==null){
        this.formAllData2.startAuditTime = i[0]
        this.formAllData2.endAuditTime = i[1]
        }
        else{
        this.formAllData2.startAuditTime = null
        this.formAllData2.endAuditTime = null
        }      
    },   
    // 钱包记录每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },  
    // 提现记录每页显示数据量变更
    handlePageChange2(obj) {
      this.page2 = obj.pageNum
      this.pagesize2 = obj.pageSize
      this.firstblood2()
    },  
    getdata_search(event){
            this.firstblood()
    },    
    clearSearch(){
            this.payTime = null
            this.formAllData={
            userId: this.templateItem.accountId,
            accountType:'AF00101',
            payWay:'AF0041801',
            tradeType:null,
            incomeExpendType:null,
            tradeStartTime:null,
            tradeEndTime:null,
            },
            this.firstblood()
            },  
    getdata_search2(event){
            this.firstblood2()
    },    
    clearSearch2(){
         this.payTime2 = null
            this.formAllData2={
                startExtractTime:null,
                endExtractTime:null,
                extractWay:null,
                accountId:this.templateItem.accountId,
            },
            this.firstblood2()
            },  
    // 钱包明细
    firstblood(){
     data_aflcOrderPaymentList(this.page,this.pagesize,this.formAllData).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
       })
       },
    // 提现记录  
    firstblood2(){
     data_aflcExtractCashList(this.page2,this.pagesize2,this.formAllData2).then(res => {
                    this.dataTotal2 = res.data.totalCount
                    this.tableDataAll2 = res.data.list;
                    this.tableDataAll2.forEach(item => {
                        item.auditTime = parseTime(item.auditTime,"{y}-{m}-{d} {h}:{i}:{s}");
                        item.extractTime = parseTime(item.extractTime,"{y}-{m}-{d} {h}:{i}:{s}");
                    })
       })
       },   

     // 获取对应的字典列表
    getMoreInformation(){

        },
   },
   mounted(){
     this.formAllData.userId = this.$route.query.accountId
     this.formAllData2.accountId = this.$route.query.accountId
     this.firstblood()
     this.firstblood2()
    }
    }
</script>
<style lang="scss">
.Carwallet{
    .classify_info{
    padding-bottom: 0px;
}}
</style>