<template>
 <div class="identicalStyle sendlogistics" style="height:100%" >
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label='订单号' v-model="formAllData.orderSerial">
             <el-input></el-input>
            </el-form-item>          
            <el-form-item label="货主" v-model="formAllData.shipperId">
             <el-input></el-input>
            </el-form-item>   
            <el-form-item label="物流公司" v-model="formAllData.transportRangePublishId">
             <el-input></el-input>
            </el-form-item>   
            <el-form-item label="付款状态">
                 <el-select clearable placeholder="请选择" v-model="formAllData.payStatus">
                          <el-option
                              v-for="item in paymentList"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               >
                         </el-option>
                 </el-select>
            </el-form-item>   
            <el-form-item label="下单时间" >
            <el-date-picker
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                unlink-panels
                align="right"
                :default-time="['00:00:00', '23:59:59']"
                value-format="timestamp">
            </el-date-picker>
            </el-form-item>              
            <el-form-item label="订单来源">
                 <el-select clearable placeholder="请选择" v-model="formAllData.payStatus">
                          <el-option
                              v-for="item in orderSerialList"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               >
                         </el-option>
                 </el-select>
            </el-form-item>    
         <el-form-item class="fr">
         <el-button type="primary"  plain  @click="getdata_search()" :size="btnsize" icon="el-icon-search">查询</el-button> 
         <el-button type="primary"  plain  @click="clearSearch" :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
         </el-form-item> 
          </el-form>
            <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" highlight-current-row :data="tableDataTree">
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
            <el-table-column  label="订单号" prop="orderSerial" sortable width="230">
             <template  slot-scope="scope">
            <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
            </template>
            </el-table-column>
            <el-table-column  label="订单状态" prop="orderStatus" sortable >
            </el-table-column>            
            <el-table-column  label="货主" prop="" sortable show-overflow-tooltip>
            </el-table-column>           
            <el-table-column  label="物流公司" prop="companyName" sortable show-overflow-tooltip>
            </el-table-column>           
            <el-table-column  label="货物名称" prop="goodsName" sortable show-overflow-tooltip>
            </el-table-column>           
            <el-table-column  label="运费总额" prop="totalAmount" sortable>
            </el-table-column>   
            <el-table-column  label="付款状态" prop="payStatus" sortable >
            </el-table-column>                            
            <el-table-column  label="提货地" prop="" sortable show-overflow-tooltip>
            </el-table-column>                                                           
            <el-table-column  label="目的地" prop="" sortable show-overflow-tooltip>
            </el-table-column>   
            <el-table-column  label="下单时间" prop="useTime" sortable width="150">
            </el-table-column>   
            <el-table-column  label="订单来源" prop="" sortable>
            </el-table-column>                              
            </el-table>
    <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>
 </div>   
  
</template>

<script>
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import {orderSerialFun,findFCLOrderInfoList} from '@/api/order/logistics/logistics.js'
export default {
        props: {
            isvisible: {
                type: Boolean,
                default: false
            },
            status: {
                type: String,
                required : true
            }
        },
    data(){
        return{
            loading:true,
            btnsize: 'mini',
            pickerOptions2:{shortcuts:pickerOptions2},
            tableDataTree:[],
            dataTotal:null,
            sizes:[20,50,100],
            pagesize:20,//每页显示数
            page:1,//当前页
            orderSerialList:[],
            paymentList:[{name:'待付款',code:'AF0370901'},{name:'已付款',code:'AF0370902'},{name:'已退款',code:'AF0370903'}],
            formAllData:{
                payStatus:null,
                orderStatus:'AF05101'
            }
        }
    },
    components:{
        Pager
    },
    methods:{
            // 列表
            firstblood(){
                this.formAllData.orderStatus = this.status
              findFCLOrderInfoList(this.page,this.pagesize,this.formAllData).then(res=>{
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
                     this.tableDataTree.forEach(item => {
                        item.useTime = parseTime(item.useTime,"{y}-{m}-{d} {h}:{i}:{s}");
                    })
              })
            },
            // 页码改变
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            getMoreInformation(){
            orderSerialFun().then(res=>{
                this.orderSerialList = res.data
            })
            },
            // 查询
            getdata_search(){
            this.page = 1;
            this.$refs.pager.inputval = this.page;
            this.$refs.pager.pageNum = this.page;
            this.firstblood();
            },
            // 清空
            clearSearch(){
                this.formAll = {

                }
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.firstblood();
            },
            pushOrderSerial(val){
                 this.$router.push({name: '发物流订单详情',query:{ orderSerial:val.orderSerial}});
            }
             
    },
    mounted(){
        this.getMoreInformation();
        this.firstblood()
    }
}
</script>

<style lang="scss">
.sendlogistics{
    .BtnInfo{
    font-weight: bold;
    font-size: 14px;
    color: #3e9ff1;
    cursor: pointer;
    }  
    .el-form-item{
    &:nth-of-type(1){
        label{
            text-indent: 13px;
        }
    }
    }
}
</style>

