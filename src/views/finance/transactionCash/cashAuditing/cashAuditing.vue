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
                  <el-button type="primary" plain :size="btnsize" icon="el-icon-search">搜索</el-button>
                  <el-button type="primary"  plain :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
               </el-form-item>     
            </el-form>
          	<div class="classify_info">
            <div class="info_news">    
            <el-table style="width: 100%" stripe border height="100%" ref="multipleTable" highlight-current-row  tooltip-effect="dark" :data="tableDataAll" @selection-change="getSelection" @row-click="clickDetails">
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
            <el-table-column  label="流水号" prop="extractSerial">
            </el-table-column>
            <el-table-column  label="申请时间" prop="extractTime">
            </el-table-column>
            <el-table-column  label="用户姓名" prop="name">
            </el-table-column>
            <el-table-column  label="用户账号" prop="mobile">
            </el-table-column>
            <el-table-column  label="提现金额" prop="extractSum">
            </el-table-column>       
            <el-table-column  label="手续费" prop="">
            <template  slot-scope="scope">
             <span>0</span>
            </template>
            </el-table-column>                                                       
            <el-table-column  label="收款方式" prop="extractWay">
            </el-table-column>
            <el-table-column  label="收款账号" prop="extractAccount">
            </el-table-column>
            <el-table-column  label="处理结果" prop="auditOpinion">
            </el-table-column>
            <el-table-column  label="提现结果" prop="extractStatus">
            </el-table-column>    
            <el-table-column  label="处理时间" prop="updateTime">
            </el-table-column>                                                
            <!-- <el-table-column  label="操作" prop="">
            <template  slot-scope="scope">
              {{ scope.row.usingStatus == 1 ? '启用' : '停用' }}
            </template>
            </el-table-column>           -->
            </el-table> 
        	</div> 
         <!-- 页码 -->
    <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>  
          </div>
      </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel} from '@/api/server/areaPrice.js'
import {data_aflcExtractCashList} from '@/api/finance/transactionCash.js'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import {parseTime} from '@/utils/'
export default {
  data(){
    return{
      aa:null,
      btnsize:'mini',
      formAllData:{},
      tableDataAll:[],
      dataTotal:null,    
      pagesize:20,//每页显示数
      page:1,//当前页      
      sizes:[20,50,100],       
     }
  },
    components:{
    Pager
    },
    methods:{
      // 列表刷新页面  
    firstblood(){
     data_aflcExtractCashList(this.page,this.pagesize,this.formAllData).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
       })
       },   
     // 判断选中与否
    getSelection(val){
     console.log('选中内容',val)
     this.selectRowData = val;
   },
    //点击选中当前行
    clickDetails(row, event, column){
      this.$refs.multipleTable.toggleRowSelection(row);
    },       
   },
  mounted(){
    this.firstblood()
    },
}
</script>
<style lang="scss">  
</style>


