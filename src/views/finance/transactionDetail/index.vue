<template>
    <div class="identicalStyle transactionDetail" style="height:100%">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="订单流水号">
            <el-input v-model="data.orderSerial" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="交易流水号">
            <el-input v-model="data.tradeSerial" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="用户姓名/账号">
            <el-input v-model="data.accountName" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="账号类型">
                   <el-select v-model="data.accountType" clearable placeholder="请选择">
                       <el-option label="货主" value="AF00101"></el-option>
                       <el-option label="车主" value="AF00102"></el-option>
                       <el-option label="现金账户" value="AF01601"></el-option>
                       <el-option label="运营账户" value="AF01602"></el-option>
                       <el-option label="合伙人" value="AF00103"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="交易方式">
                   <el-select v-model="data.payWay" clearable placeholder="请选择">
                       <el-option label="支付宝" value="AF0041803"></el-option>
                       <el-option label="微信" value="AF0041802"></el-option>
                       <el-option label="钱包" value="AF0041801"></el-option>
                    </el-select>
            </el-form-item>
                        <br>
            <el-form-item label=" 交易类型" label-width='70px'>
                   <el-select v-model="data.tradeType" clearable placeholder="请选择">
                        <el-option
                          v-for="item in optionsAccountType2"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                          >
                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="服务分类" label-width='70px'>
                   <el-select v-model="data.orderType" clearable placeholder="请选择">
                        <el-option
                          v-for="item in optionsAccountType"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                          >
                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="收支类型" label-width='88px'>
                   <el-select v-model="data.incomeExpendType" clearable placeholder="请选择">
                          <el-option label="收入" value="1"></el-option>
                          <el-option label="支出" value="0"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="付款时间">
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
                  <el-button type="primary" plain @click="getdata_search" :size="btnsize" icon="el-icon-search">搜索</el-button>
                  <el-button type="info"  plain @click="reset" :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
                </el-form-item>    
          </el-form>
            <div class="classify_info">
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        highlight-current-row
                        border
                        align = "center"
                        height="100%"
                        @selection-change = "getinfomation"
                        @row-dblclick="moreinfo"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
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
                        <el-table-column
                            align = "center"
                            prop="orderSerial"
                            label="订单流水号"
                             show-overflow-tooltip
                            width="180"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                          align = "center"
                          prop="tradeSerial"
                          label="交易流水号"
                           show-overflow-tooltip
                          width="180"
                          sortable
                          >
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="createTime"
                          label="交易时间"
                          width="170"
                          sortable
                          >
                             
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="accountName"
                          label="用户账号 / 姓名"
                          width="150"
                          sortable
                          >
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="accountTypeName"
                          label="账号类型"
                          width="110"
                          sortable
                          >
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="payTotal"
                          width="110"
                          label="交易金额"
                          sortable
                          >
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="incomeExpendTypeName"
                          width="110"
                          label="收支类型"
                          sortable
                          >
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="payWayName"
                          width="110"
                          label="交易方式"
                          sortable
                          >
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="tradeTypeName"
                          label="交易类型"
                          width="110"
                          sortable
                          >
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="orderTypeName"
                          width="110"
                          label="服务分类"
                          sortable
                          >
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="payTime"
                           show-overflow-tooltip
                          label="付款时间"
                          sortable
                          >
                        </el-table-column>
                        
                        <el-table-column
                        align = "center"
                          prop="totalAmount"
                          label="操作"
                          width="80"
                          sortable
                          >
                          <template slot-scope="scope">
                              <el-button @click="handleClick(scope.row)" type="text" size="small">相关信息</el-button>
                              
                            </template>
                        </el-table-column>
                    </el-table>
                      <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
                </div>
            </div>
    </div>
</template>

<script type="text/javascript">
import {data_financeList,data_GetServerType,data_GetServerType2,data_GetServerType3} from '@/api/finance/financeServer.js'
import {data_GetCarStyle} from '@/api/server/areaPrice.js'
import '@/styles/dialog.scss'
import Pager from '@/components/Pagination/index'
import { parseTime,formatTime,pickerOptions2 } from '@/utils/index.js'

    export default{
        data(){
            return{
                pickerOptions2: {
                shortcuts: pickerOptions2
                    },   
                data:{                 
                  orderSerial:null,
                  tradeSerial:null,
                  tradeStatus:null,
                  accountName:null,
                  accountType:null,                 
                  payWay:null,
                  tradeType:null,
                  orderType:null,
                  tradeStartTime:null,
                  tradeEndTime:null,
                  incomeExpendType:null,
                },
                btnsize:'mini',
                payTime:null,
                sizes: [20, 50, 100],
                currentPage4:1,
                page:1,
                pagesize:20,
                dataTotal:null,
                tableDataTree:[],
                optionsAccountType: [
                    {code:'AF01701',name:'同城'},
                    {code:'AF01702',name:'零担'},
                    {code:'AF01703',name:'城际'},                    
                ],
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
                alloption1:{},
                alloption2:{},
            }
        },
        components:{
            Pager
        },
        mounted(){
            this.load();
            this.getMoreInformation();
        },  
        methods: {
          //翻页
           handleSizeChange(val){

                this.pagesize = val ;
                this.load();
           },
           //跳转当前页
           handleCurrentChange(val){

                this.page = val;
                this.load();
           },
            //点击查询
            getdata_search(event){
               this.load()
            },
            
           //重置
            reset(){
                this.data = {
                  orderSerial:null,
                  tradeSerial:null,
                  tradeStatus:null,
                  accountName:null,
                  accountType:null,                 
                  payWay:null,
                  tradeType:null,
                  orderType:null,
                  tradeStartTime:null,
                  tradeEndTime:null,
                  incomeExpendType:null,
                  tradeStartTime:null,
                  tradeEndTime:null,
                };
                  this.payTime=null
                this.load();
            },
             //点击选中当前行
           clickDetails(row, event, column){
               console.log(row)
                this.$refs.multipleTable.toggleRowSelection(row);
           },
           //双击
            moreinfo(row, event){
              
               
            },
            //获取信息列表
            getMoreInformation(){    
            },
            //相关信息
            handleClick(row){
                this.data.orderSerial = row.orderSerial;
                this.load();
            },
            //判断是否选中
            getinfomation(selection){
              console.log('选中内容',selection)
            },
            cTime(i){
            this.data.tradeStartTime = i[0];
            this.data.tradeEndTime = i[1];
            },
            //刷新页面  
            load(){                   
                data_financeList(this.page,this.pagesize,this.data).then(res=>{              
                    this.tableDataTree = res.data.list;
                    this.dataTotal = res.data.totalCount;
                     for(var i = 0;i<this.tableDataTree.length;i++){
                        this.tableDataTree[i].payTime = parseTime(this.tableDataTree[i].payTime,"{y}-{m}-{d} {h}:{i}:{s}");
                    }  
                })
            },
            // 每页显示数据量变更
            handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.load()
            },
         
        }
    }
</script>

<style type="text/css" lang="scss">
.transactionDetail{
    .el-button--small{
            padding: 4px 0px;
    }
    .el-date-editor--daterange{
        width: 218px!important;
        .el-range-input{
            width: 50%
        }
    }
}
</style>