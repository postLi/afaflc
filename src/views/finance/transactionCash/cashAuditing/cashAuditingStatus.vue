<template>
    <div class="identicalStyle " style="height:100%">
          <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
             <el-form-item label="用户姓名">
               <el-input v-model="formAllData.name"></el-input>
            </el-form-item>     
              <el-form-item label="用户账号">
               <el-input v-model="formAllData.mobile"></el-input>
            </el-form-item>
               <el-form-item label="收款方式">
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
                <el-form-item label="申请时间">
                 <el-date-picker
                    value-format="timestamp"
                    type="daterange"
                    v-model="ExtractTime"
                    unlink-panels
                    :picker-options="pickerOptions2"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change='cTime'
                    >
                    </el-date-picker>
            </el-form-item>
                <el-form-item class='fr'>
                  <el-button type="primary" plain :size="btnsize" icon="el-icon-search" @click="getdata_search">搜索</el-button>
                  <el-button type="info"  plain :size="btnsize" icon="fontFamily aflc-icon-qingkong" @click="clearSearch">清空</el-button>
               </el-form-item>     
            </el-form>
          	<div class="classify_info">
            <div class="info_news">    
             <div class="btns_box">
                   <cashAuditingEdit
                    btntext="审核"
                    :plain="true"
                    btntype="primary"
                    editType="edit"
                    icon="el-icon-check"
                    btntitle="审核"
                    @getData="getDataList"
                    :params="selectRowData"
                    > 
                   </cashAuditingEdit>
            </div>

            <el-table style="width: 100%" stripe border height="94%" ref="multipleTable" highlight-current-row  tooltip-effect="dark" :data="tableDataAll" @selection-change="getSelection" @row-click="clickDetails">
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
            <el-table-column  label="流水号" prop="extractSerial" width="280" sortable>
            <template  slot-scope="scope">
                   <cashAuditingDetail
                    :btntext="scope.row.extractSerial"
                    type="primary" 
                    btntype="text"
                    editType="view"
                    btntitle="查看"
                    @getData="getDataList"
                    :params="scope.row"
                    >
                    </cashAuditingDetail>
            </template>
            </el-table-column>
            <el-table-column  label="申请时间" prop="extractTime" sortable>
            </el-table-column>
            <el-table-column  label="用户姓名" prop="name" sortable>
            </el-table-column>
            <el-table-column  label="用户账号" prop="mobile" sortable>
            <template  slot-scope="scope">
                          <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
            </template>
            </el-table-column>
            <el-table-column  label="提现金额" prop="extractSum" width="100" sortable>
            </el-table-column>       
            <el-table-column  label="手续费" prop="" width="100" sortable>
            <template  slot-scope="scope">
             <span>0</span>
            </template>
            </el-table-column>
            <el-table-column  label="收款方式" prop="extractWay" width="100" sortable>
            </el-table-column>
            <el-table-column  label="收款账号" prop="extractAccount" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column  label="处理结果" prop="auditOpinion" width="120" sortable>
               <template slot-scope="scope">
              <span :class="{freezeName: scope.row.auditOpinion == '待处理' ,blackName: scope.row.auditOpinion == '审核不通过',normalName :scope.row.auditOpinion == '审核通过'}">{{scope.row.auditOpinion}}</span>
               </template>
            </el-table-column>
            <el-table-column  label="提现结果" prop="extractStatus" width="120" sortable>
               <template slot-scope="scope">
              <span :class="{freezeName: scope.row.extractStatus == '提现中' ,blackName: scope.row.extractStatus == '提现失败',normalName :scope.row.extractStatus == '提现成功'}">{{scope.row.extractStatus}}</span>
               </template>
            </el-table-column>    
            <el-table-column  label="处理时间" prop="auditTime" sortable>
            </el-table-column>                                                 
            </el-table> 
        	</div> 
         <!-- 页码 -->
       <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>  
          </div>
      </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel} from '@/api/server/areaPrice.js'
import {data_aflcExtractCashList} from '@/api/finance/transactionCash.js'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import {parseTime} from '@/utils/'
import cashAuditingEdit from "./cashAuditingEdit.vue";
import cashAuditingDetail from './cashAuditingDetail.vue'
import {pickerOptions2 } from '@/utils/index.js'
export default {
  data(){
    return{
      pickerOptions2: {
         shortcuts: pickerOptions2
          },  
      btnsize:'mini',
      ExtractTime:null,
      AuditTime:null,
      formAllData:{
      name:null,
      mobile:null,
      startExtractTime:null,
      endExtractTime:null,
      startAuditTime:null,
      endAuditTime:null,
      extractWay:null,
      auditOpinion:'0',
      extractStatus:null,
      },
      extractWayList:[
       {code:null,name:'全部'},
       {code:'0',name:'支付宝'},
       {code:'1',name:'微信'}
      ],
      auditOpinionList:[
       {code:null,name:'全部'},
       {code:'0',name:'待处理'},
       {code:'1',name:'审核通过'},
       {code:'2',name:'审核不通过'}
      ],
      extractStatusList:[
       {code:null,name:'全部'},
       {code:'0',name:'提现中'},
       {code:'1',name:'提现成功'},        
       {code:'2',name:'提现失败'}       
      ],
      tableDataAll:[],
      selectRowData:{},
      dataTotal:null,    
      pagesize:20,//每页显示数
      page:1,//当前页      
      sizes:[20,50,100],
     }
  },
    components:{
    Pager,
    cashAuditingDetail,
    cashAuditingEdit
    },
    methods:{
        handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
        },     
      // 申请时间处理
    cTime(i){
        if(i!==null){
        this.formAllData.startExtractTime = i[0]
        this.formAllData.endExtractTime = i[1]
        }
        else{
        this.formAllData.startExtractTime = null
        this.formAllData.endExtractTime = null
        }      
    },
      // 处理时间处理
    cTime2(i){
        if(i!==null){
        this.formAllData.startAuditTime = i[0]
        this.formAllData.endAuditTime = i[1]
        }
        else{
        this.formAllData.startAuditTime = null
        this.formAllData.endAuditTime = null
        }      
    },    
      // 列表刷新页面  
    firstblood(){
     data_aflcExtractCashList(this.page,this.pagesize,this.formAllData).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                    this.tableDataAll.forEach(item => {
                        item.auditTime = parseTime(item.auditTime,"{y}-{m}-{d} {h}:{i}:{s}");
                        item.extractTime = parseTime(item.extractTime,"{y}-{m}-{d} {h}:{i}:{s}");
                    })
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
   //  搜索
    getdata_search(){
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood()
    },
    // 清空
     clearSearch(){
              this.ExtractTime=null,
              this.AuditTime=null,
                this.formAllData={
                    name:null,
                    mobile:null,
                    startExtractTime:null,
                    endExtractTime:null,
                    startAuditTime:null,
                    endAuditTime:null,
                    extractWay:null,
                    auditOpinion:'0',
                    extractStatus:null,
                }
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.firstblood()
            },

    getDataList(){
            this.firstblood()
            this.$refs.multipleTable.clearSelection();
            },           
    // 进入账户概况
    pushOrderSerial(item) {
      this.$router.push({ name: '车主账户详情', query: { accountId: item.accountId }})
    }     
   },
  mounted(){
    this.firstblood()
    },
}
</script>
<style lang="scss" scoped>

</style>


