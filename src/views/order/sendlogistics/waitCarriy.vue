<template>
 <div class="identicalStyle sendlogistics" style="height:100%" >
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label='订单号'>
             <el-input></el-input>
            </el-form-item>          
            <el-form-item label="货主">
             <el-input></el-input>
            </el-form-item>   
            <el-form-item label="物流公司">
             <el-input></el-input>
            </el-form-item>   
            <el-form-item label="付款状态">
                 <el-select clearable placeholder="请选择" v-model="formAllData.payment">
                          <el-option
                              v-for="item in paymentList"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               >
                         </el-option>
                 </el-select>
            </el-form-item>   
            <el-form-item label="下单时间">
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
                 <el-select clearable placeholder="请选择" v-model="formAllData.activityType">
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
          <el-button type="primary" plain  :size="btnsize" icon="el-icon-search">搜索</el-button>
          <el-button type="info" plain   :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>   
          </el-form>
            <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" highlight-current-row>
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
            <el-table-column  label="订单号" prop="" sortable>
            </el-table-column>
            <el-table-column  label="订单状态" prop="" sortable>
            </el-table-column>            
            <el-table-column  label="货主" prop="" sortable>
            </el-table-column>           
            <el-table-column  label="物流公司" prop="" sortable>
            </el-table-column>           
            <el-table-column  label="货物名称" prop="" sortable>
            </el-table-column>           
            <el-table-column  label="运费总额" prop="" sortable>
            </el-table-column>   
            <el-table-column  label="付款状态" prop="" sortable>
            </el-table-column>                            
            <el-table-column  label="提货地" prop="" sortable>
            </el-table-column>                                                           
            <el-table-column  label="目的地" prop="" sortable>
            </el-table-column>   
            <el-table-column  label="下单时间" prop="" sortable>
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
import {orderSerialFun} from '@/api/order/logistics/logistics.js'
export default {
    data(){
        return{
            loading:true,
            btnsize: 'mini',
            pickerOptions2:{shortcuts:pickerOptions2},
            tableDataAll:[],
            dataTotal:null,
            sizes:[20,50,100],
            pagesize:20,//每页显示数
            page:1,//当前页
            orderSerialList:[],
            paymentList:[{name:'待付款',code:'AF0370901'},{name:'已付款',code:'AF0370902'},{name:'已退款',code:'AF0370903'}],
            formAllData:{
                payment:null,
                activityType:null,
            }
        }
    },
    components:{
        Pager
    },
    methods:{
            // 列表
            firstblood(){

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
            }

    },
    mounted(){
        this.getMoreInformation();
    }
}
</script>

<style lang="scss">
.sendlogistics{
    .el-form-item{
    &:nth-of-type(1){
        label{
            text-indent: 13px;
        }
    }
    }
}
</style>

