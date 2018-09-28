<template>
    <div class="identicalStyle " style="height:100%">
          <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
             <el-form-item label="用户姓名：">
               <el-input></el-input>
            </el-form-item>     
              <el-form-item label="电话号码：">
               <el-input></el-input>
            </el-form-item>     
                <el-form-item label="申请时间：">
                 <el-date-picker
                    value-format="timestamp"
                    type="daterange"
                    v-model="aa"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
            </el-form-item>   
                <el-form-item label="完成时间：">
                 <el-date-picker
                    value-format="timestamp"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
            </el-form-item>   
               <el-form-item label="收款方式：">
               <el-input></el-input>
            </el-form-item>     
               <el-form-item label="处理结果：">
               <el-input></el-input>
            </el-form-item>     
                <el-form-item class='fr'> 
                  <el-button type="primary"  plain :size="btnsize">查询</el-button>
                  <el-button type="primary"  plain :size="btnsize">重置</el-button>
               </el-form-item>     
            </el-form>
          	<div class="classify_info">
            <div class="info_news">    
            <el-table style="width: 100%" stripe border height="100%" highlight-current-row  tooltip-effect="dark">
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="流水号" >
            </el-table-column>
            <el-table-column  label="申请时间" >
            </el-table-column>
            <el-table-column  label="用户姓名" >
            </el-table-column>
            <el-table-column  label="用户账号" >
            </el-table-column>
            <el-table-column  label="提现金额" >
            </el-table-column>       
            <el-table-column  label="手续费" >
            </el-table-column>                                                       
            <el-table-column  label="收款方式" >
            </el-table-column>
            <el-table-column  label="收款账号" >
            </el-table-column>
            <el-table-column  label="处理结果" >
            </el-table-column>
            <el-table-column  label="提现结果" >
            </el-table-column>    
            <el-table-column  label="处理时间" >
            </el-table-column>                                                
            <el-table-column  label="操作" >
            <template  slot-scope="scope">
              {{ scope.row.usingStatus == 1 ? '启用' : '停用' }}
            </template>
            </el-table-column>          
            </el-table> 
        	</div> 
         <!-- 页码 -->
    
          </div>
      </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel} from '@/api/server/areaPrice.js'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import {parseTime} from '@/utils/'
export default {
  data(){
    return{
      aa:null,
      btnsize:'mini',
     }
  },
    components:{

    },
    methods:{
        
   },
  mounted(){
    },
}
</script>
<style lang="scss">  
</style>


