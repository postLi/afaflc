<template>
    <div class="finance clearfix">
             <div class="classify_searchinfo">
                <label><span>订单流水号&nbsp;</span>                   
                  <el-input v-model="data.orderSerial" placeholder="请输入内容" clearable></el-input>
                </label>
                <label><span>交易流水号&nbsp;</span>                   
                  <el-input v-model="data.tradeSerial" placeholder="请输入内容" clearable></el-input>
                </label>
                <label><span>用户姓名/账号&nbsp;</span>
                   <el-input v-model="data.accountName" placeholder="请输入内容" clearable></el-input>
                </label> 
                
                <label><span>账号类型&nbsp;</span>
                   <el-select v-model="data.accountType" clearable placeholder="请选择">
                        <el-option label="货主" value="0"></el-option>
                       <el-option label="车主" value="1"></el-option>
                       <el-option label="平台" value="2"></el-option>
                    </el-select>
                </label> 
                <label><span>交易方式&nbsp;</span>
                   <el-select v-model="data.payWay" clearable placeholder="请选择">
                      
                       <el-option label="支付宝" value="0"></el-option>
                       <el-option label="微信" value="1"></el-option>
                       <el-option label="余额支付" value="2"></el-option>
                    </el-select>
                </label>
                <label><span>交易类型&nbsp;</span>
                   <el-select v-model="data.tradeType" clearable placeholder="请选择">
                        <el-option
                          v-for="item in optionsAccountType2"
                          :key="item.name"
                          :label="item.name"
                          :value="item.code"
                          >
                        </el-option>
                    </el-select>
                </label> 
                <label><span>服务分类&nbsp;</span>
                   <el-select v-model="data.orderType" clearable placeholder="请选择">
                        <el-option
                          v-for="item in optionsAccountType"
                          :key="item.name"
                          :label="item.name"
                          :value="item.code"
                          >
                        </el-option>
                    </el-select>
                </label>
                <label><span>收支类型&nbsp;</span>
                   <el-select v-model="data.incomeExpendType" clearable placeholder="请选择">
                          <el-option label="入账" value="AF014"></el-option>
                          <el-option label="出帐" value="AF015"></el-option>
                    </el-select>
                </label>         
                <label ><span>付款时间&nbsp;</span>
                    <el-date-picker
                    v-model="payTime"
                    value-format="timestamp"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </label>    
                <!-- {{value6}}  -->
                <label>
                  <el-button type="primary"  plain @click="getdata_search">查询</el-button>
                  <el-button type="primary"  plain @click="reset">重置</el-button>
                </label>
                
            </div>
            <div class="classify_info">
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        align = "center"
                        height="93%"
                        @selection-change = "getinfomation"
                        @row-dblclick="moreinfo"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                            align = "center"
                            fixed
                             type="selection"
                             width="55">
                           </el-table-column>
                        <el-table-column
                            align = "center"
                            fixed
                            prop="orderSerial"
                            label="订单流水号"
                            width="100">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="tradeSerial"
                          label="交易流水号"
                          width="80">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="createTime"
                          label="创建时间"
                          width="120">
                             
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="accountName"
                          label="用户账号 / 姓名"
                          width="120">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="accountTypeName"
                          label="账号类型"
                          width="110">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="payTotal"
                          label="交易金额">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="incomeExpendTypeName"
                          label="收支类型">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="payWayName"
                          label="交易方式">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="tradeTypeName"
                          label="交易类型"
                          width="110">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="orderTypeName"
                          label="服务分类">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="tradeStatusName"
                          label="交易状态">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="payTime"
                          label="付款时间">
                        </el-table-column>
                        
                        <el-table-column
                        align = "center"
                          prop="totalAmount"
                          label="操作"
                          width="80">
                          <template slot-scope="scope">
                              <el-button @click="handleClick(scope.row)" type="text" size="small">相关信息</el-button>
                              
                            </template>
                        </el-table-column>
                    </el-table>
                    
                      <!-- 页码 -->
                    <div class="Pagination ">
                        <div class="block">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="dataTotal">
                            </el-pagination>
                        </div>
                    </div>
                    
                </div>
                
                
            </div>
     
        
    </div>
</template>

<script type="text/javascript">
import {data_financeList,data_GetServerType,data_GetServerType2,data_GetServerType3} from '@/api/finance/financeServer.js'
import {data_GetCarStyle} from '@/api/server/areaPrice.js'
import '@/styles/dialog.scss'
import { parseTime,formatTime } from '@/utils/index.js'

    export default{
        data(){
            return{
                data:{
                  orderSerial:'',
                  tradeSerial:'',
                  tradeStatus:'',
                  accountName:'',
                  accountType:'',                 
                  payWay:'',
                  tradeType:'',
                  orderType:'',
                  tradeStartTime:'',
                  tradeEndTime:'',
                  incomeExpendType:'',
                },
                payTime:'',
                currentPage4:1,
                page:1,
                pagesize:20,
                dataTotal:null,
                tableDataTree:[],
                optionsAccountType: [],
                optionsAccountType2: [],
                alloption1:{},
                alloption2:{},
            }
        },
        components:{
            

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
                    accountName:null,
                    accountType:null,
                    payWay:null,
                    tradeType:null,
                    payTime:null,
                    incomeExpendType:null,
                    optionsAccountType:[],
                    optionsAccountType2: [],
                };
                 this.payTime=null
                this.load();
            },
             //点击选中当前行
           clickDetails(row, event, column){
               
           },
           //双击
            moreinfo(row, event){
              
               
            },
            //获取信息列表
            getMoreInformation(){
                data_GetServerType().then(res=>{
                    res.data.map((item)=>{
                        this.optionsAccountType.push(item);
                    })
                })              
                data_GetServerType2().then(res=>{                 
                    this.alloption1 = res.data;                 
                })
                data_GetServerType3().then(res=>{                 
                  this.alloption2 = res.data;
                  for(var i in this.alloption2){
                    this.alloption1.push(this.alloption2[i])
                  }
                  this.alloption1.map((item)=>{                     
                      this.optionsAccountType2.push(item);
                  })
                })
            },
            //相关信息
            handleClick(row){
                
                this.data.orderSerial = row.orderSerial;
                this.load();
            },
            //判断是否选中
            getinfomation(selection){
               
            },
            //刷新页面  
            load(){                   
             
                this.data.tradeStartTime = parseTime(this.payTime[0],"{y}-{m}-{d}");
                this.data.tradeEndTime = parseTime(this.payTime[1]+24*60*60*1000,"{y}-{m}-{d}");
                data_financeList(this.page,this.pagesize,this.data).then(res=>{                   
                    this.tableDataTree = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.tableDataTree.forEach(item => {
                        item.createTime = parseTime(item.createTime,"{y}-{m}-{d}");
                    })
                    this.tableDataTree.forEach(item => {
                        switch(item.accountType){
                            case "0":
                                item.accountType = "货主";
                                break;
                            case "1":
                                item.accountType = "车主";
                                break;
                            case "2":
                                item.accountType = "平台";
                                break;

                    }
                    })
                     this.tableDataTree.forEach(item => {
                        switch(item.payWay){
                            case "0":
                                item.payWay = "支付宝";
                                break;
                            case "1":
                                item.payWay = "微信";
                                break;
                            case "2":
                                item.payWay = "余额支付";
                                break;
                            
                    }
                   }) 
                 

                })
            },
            
        }
    }
</script>

<style type="text/css" lang="scss">
    .finance{
        height:100%;    
        position: relative;
        margin-left:7px;
        .classify_searchinfo{
            
            position: absolute;
            left:0;
            top:0;
            padding:15px 16px;
            border-bottom:2px dashed #ccc;
            height:160px;
            width:100%;
            line-height: 35px;

            label{
                  width: 24%;
                  color: #666;
                  font-size: 14px;
                  overflow: hidden;
                  display: inline-block;
                  text-align:center;
                span{
                      width: 100px;
                      display: inline-block;
                      text-align: right;
                      float: left;
                }
                .el-button{
                  span{
                    width:auto;
                  }
                }
                .el-input{
                    width:calc(100% - 100px);
                    display: inline-block;
                    .el-input__inner{
                        color:#3e9ff1;
                        height:30px;
                        line-height: 30px;
                        width:100%;
                    }
                }
                .el-select {
                    display: inline-block;
                    position: relative;
                    width: calc(100% - 100px);
                    display: inline-block;
                    float: left;
                    .el-input{
                      width:100%;
                    }
                }
                .el-date-editor--daterange.el-input__inner{
                    width: calc(100% - 100px);
                }
                .el-date-editor{
                    height: 30px;
                    line-height: 30px;
                    vertical-align: middle;
                    .el-range-separator{
                        width: 10%;
                        margin-top:-10px; 
                    }
                    .el-input__icon{
                        margin-top:-10px; 
                    }
                }
            }
            .el-button{
               padding:8px 20px;
            }
        }
        .classify_info{
            
            padding:170px 13px 18px;
            height:100%;
            .btns_box{
                margin-bottom:10px;
                .el-button{
                    margin-right:20px;
                    padding:10px 20px;
                }
            }
            .info_news{
                height:90%;
            }
            .Pagination{
                margin-top:13px;
                text-align:right;
            }
        }
    }
</style>