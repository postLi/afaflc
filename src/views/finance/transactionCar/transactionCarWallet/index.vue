<template>
    <div class="transactionCarWallet clearfix" style="height:100%">
        <div class="shipper_transactionCarWallet">
          <el-form :inline="true">
            <el-form-item label="所属区域:">
            <el-input placeholder="请输入内容" clearable v-model="formAllData.areaCode"></el-input>
            </el-form-item> 
            <el-form-item label="车主账号:">
            <el-input placeholder="请输入内容" clearable v-model="formAllData.account"></el-input>
            </el-form-item>             
            <el-form-item>
          <el-button type="primary"  plain>搜索</el-button> 
          </el-form-item>
          </el-form>                                         
         </div>
          	<div class="classify_cityinfo">
                    <!-- <Carwallet
                    btntext="详情"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    editType="add"
                    btntitle="详情"
                   >
                    </Carwallet>     -->
            <div class="info_city">    
            <el-table style="width: 100%" stripe border height="100%" highlight-current-row  tooltip-effect="dark" :data="tableDataAll">
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="所属区域" prop="areaCode">
            </el-table-column>
            <el-table-column  label="车主账号" prop="accountId">
            </el-table-column>
            <el-table-column  label="可提现余额" prop="availableAmount">
            </el-table-column>
            <el-table-column  label="待处理提现金额" prop="waitAvailableAmount">
            </el-table-column>
            <el-table-column  label="在线交易奖励金（已奖励 / 额度）">
            <template  slot-scope="scoped">
             {{scoped.gainAwardReward}}/{{scoped.awardRewardMax}}
            </template>
            </el-table-column>       
            <el-table-column  label="保证金" prop="pledgeAmount" >
            </el-table-column>                                                  
            </el-table> 
        	</div> 
         <!-- 页码 -->
          </div>
      </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel} from '@/api/server/areaPrice.js'
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import { data_findDriverMywalletList } from '@/api/finance/transactionCar'
import {parseTime} from '@/utils/'
import Carwallet from './Carwallet'
export default {
  data(){
    return{
      options:regionDataPlus,
      sizes:[10,50,100],
      pagesize:10,//初始化加载数量
      page:1,//初始化页码
      tableDataAll:[],
      dataTotal:null,
      formAllData:{
            account: null,
            areaCode: null,
            cityCode: null,
            provinceCode: null,                
            }
     }
    },
    components:{
        Carwallet
    },
    methods:{
    // 列表刷新页面  
    firstblood(){
     data_findDriverMywalletList(this.page,this.pagesize,this.formAllData).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                    console.log('01',this.tableDataAll)
       })
       },          
   },
    mounted(){
       this.firstblood();      
    },
}
</script>
<style lang="scss">  
.transactionCarWallet{
    position: relative;
.shipper_transactionCarWallet{
    position: absolute;
    left: 0;
    top: 0;
    padding: 15px 16px;
    height: 70px;
    width: 100%;
    line-height: 35px;
    .el-input__inner{
      height: 30px;
      line-height: 30px;
    }
    .el-date-editor{
        width: 280px;
    }
    .v-dropdown-container{
        top:35px!important;
        left:0px!important;
    }
    .el-button{
      margin-right: 20px;
      padding: 8px 20px;
    }
}
.classify_cityinfo{
    height: 100%;
    padding: 70px 15px 0 15px;
    .commoncss{
      display: inline-block!important;
    }
    .btns_box{
    margin-bottom: 10px;
    }
    .info_city{
      height:88%;
      .cell{
      color: #333;
      font-size: 14px;
      }
    }
    .el-button{
      margin-right: 20px;
      padding: 8px 20px!important;
    }
}
}
</style>


