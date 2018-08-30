<template>
    <div class="transactionCash">
          	<div class="classify_cityinfo">
            	<div class="btns_box">
                <modcashSet  btntext="修改" :plain="true" type="primary" btntype="primary" icon="el-icon-edit" editType="edit"></modcashSet>
                <el-button type="primary" plain icon="el-icon-delete" >停用</el-button>
            	</div>
          	
      <div class="info_city">    
               <el-table style="width: 100%" stripe border height="100%"  highlight-current-row >
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="车主等级">
            </el-table-column>
            <el-table-column  label="每个月免费提现金额" >
            </el-table-column>
            <el-table-column  label="提现手续费（%）" >
            </el-table-column>                                               
            <el-table-column  label="启用状态" >
            <template  slot-scope="scope">
              {{ scope.row.usingStatus == 1 ? '启用' : '禁用' }}
            </template>
            </el-table-column>
            <el-table-column  label="操作人" >
            </el-table-column>
            <el-table-column  label="操作时间" >
            </el-table-column>                               
            </el-table> 
                <!-- 页码 -->
       <div class="info1_tab_footer">共计: <div class="show_pager"> <Pager /></div> </div>  
        	</div> 
            </div>
          </div>          
</template>

<script>
import Pager from '@/components/Pagination/index'
import modcashSet from './modcashSet'
export default {
    data(){
        return{
            
        }
    },
    components:{
        Pager,
        modcashSet
    }
}
</script>

<style lang="scss">
.transactionCash{
        height:100%;    
        position: relative;
.classify_cityinfo{
    height: 100%;
    padding: 20px 15px 0 15px;
    .commoncss{
      display: inline-block!important;
    }
    .btns_box{
    margin-bottom: 10px;
    }
    .info_city{
      height:89%;
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

