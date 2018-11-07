<template>
    <div class="identicalStyle transactionCar" style="height:100%" v-loading="loading">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="所属区域">
              <GetCityList v-model="formAllData.areaCode" ref="area" @returnStr="getStr"></GetCityList>
          </el-form-item>
            <el-form-item label="车主账号">
            <el-input placeholder="请输入内容" clearable v-model="formAllData.account"></el-input>
            </el-form-item>             
            <el-form-item class="fr">
          <el-button type="primary" plain :size="btnsize" @click="getData_query" icon="el-icon-search">搜索</el-button> 
          <el-button type="info"  plain @click="clearSearch" :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>
          </el-form>                                         
          	<div class="classify_info">
            <div class="info_news">    
            <el-table style="width: 100%" stripe border ref="multipleTable" height="100%" highlight-current-row  tooltip-effect="dark" :data="tableDataAll" @selection-change="getSelection" @row-click="clickDetails">
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
            <el-table-column  label="所属区域" prop="areaCode" sortable>
            </el-table-column>
            <el-table-column  label="车主账号" prop="driverMobile" sortable >
                <template  slot-scope="scoped">
                    <h4 class="needMoreInfo" @click="pushOrderSerial(scoped.row)">{{ scoped.row.driverMobile}}</h4>
                </template>
            </el-table-column>
            <el-table-column  label="可提现余额" prop="availableAmount" sortable>
            </el-table-column>
            <el-table-column  label="待处理提现金额" prop="waitAvailableAmount" sortable>
            </el-table-column>
            <el-table-column  label="在线交易奖励金（已奖励 / 额度）" sortable>
            <template  slot-scope="scoped">
             {{scoped.row.gainAwardReward}}/{{scoped.row.awardRewardMax}}
            </template>
            </el-table-column>       
            <el-table-column  label="保证金" prop="pledgeAmount" sortable>
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
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import { data_findDriverMywalletList } from '@/api/finance/transactionCar'
import {parseTime} from '@/utils/'
import GetCityList from '@/components/GetCityList'
import Carwallet from './Carwallet'
export default {
  data(){
    return{
      loading:true,  
      belongCityName:null,
      selectRowData: {},
      btnsize:'mini',
      options:regionDataPlus,
      sizes:[20,50,100],
      pagesize:20,//初始化加载数量
      page:1,//初始化页码
      tableDataAll:[],
      dataTotal:null,
      formAllData:{
            account: null,
            areaCode: null,         
            }
     }
    },
    components:{
        Carwallet,
        Pager,
        GetCityList
    },
    methods:{
    getStr(val){
                this.formAllData.areaCode = val.city.code
            },

    // 列表刷新页面  
    firstblood(){
        this.loading = true
     data_findDriverMywalletList(this.page,this.pagesize,this.formAllData).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                    this.loading = false
       })
       },  
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },       
     //  查询
    getData_query() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood()
    },
        // 清空查询
        clearSearch(){
            this.belongCityName = null,
               this.formAllData = {
                    account: null,
                    areaCode: null,  
               }
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
         this.firstblood();
         this.$refs.area.clearData();
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
    //详情弹窗
            pushOrderSerial(item){
                this.$router.push({name: '车主账户详情',query:{ accountId:item.accountId }});
            }
   },
    mounted(){
       this.firstblood();      
    },
}
</script>
<style lang="scss">
.transactionCar{
    .info_news{
        .el-button{
                padding: 4px 0px;
                span{
                    font-weight: bold
                }
        }
    }
    .el-cascader{
        margin-top: -10px;
    }
}
</style>


