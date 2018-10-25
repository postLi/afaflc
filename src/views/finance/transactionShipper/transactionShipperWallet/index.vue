<template>
    <div class="identicalStyle transactionCar" style="height:100%" v-loading="loading">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="所属区域：">
              <GetCityList v-model="formAllData.areaCode" ref="area" @returnStr="getStr"></GetCityList>
          </el-form-item>
            <el-form-item label="货主账号:">
            <el-input placeholder="请输入内容" clearable v-model="formAllData.account"></el-input>
            </el-form-item>             
            <el-form-item class="fr">       
          <el-button type="primary" plain :size="btnsize" @click="getData_query" icon="el-icon-search">搜索</el-button> 
          <el-button type="info"  plain @click="clearSearch" :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
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
            <el-table-column  label="所属区域" prop="areaCode" sortable>
            </el-table-column>
            <el-table-column  label="货主账号" prop="mobile" sortable>
                <template  slot-scope="scoped">
                    <h4 class="needMoreInfo" @click="pushOrderSerial(scoped.row)">{{ scoped.row.mobile}}</h4>
                </template>
            </el-table-column>
            <el-table-column  label="可用余额" prop="balance" sortable>
            </el-table-column>
            <el-table-column  label="充值赠送余额" prop="availableBalance" sortable>
            </el-table-column>
            <el-table-column  label="在线交易奖励金（已奖励 / 额度）" sortable>
            <template  slot-scope="scoped">
             {{scoped.gainAwardReward}}/{{scoped.awardRewardMax}}
            </template>
            </el-table-column> 
            <el-table-column  label="优惠券数" prop="couponCount" sortable>
            </el-table-column>                    
            <el-table-column  label="优惠券金额" prop="couponAmount" sortable>
            </el-table-column>                                                  
            </el-table> 
        	</div> 
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
         <!-- 页码 -->
          </div>
      </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel} from '@/api/server/areaPrice.js'
import Pager from '@/components/Pagination/index'
import { data_findShipperMywalletList,} from '@/api/finance/transactionShipper'
import GetCityList from '@/components/GetCityList'
import {parseTime} from '@/utils/'
import shipperwallet from './shipperwallet'
export default {
  data(){
    return{
      loading:true,  
      btnsize:'mini',
      sizes:[20,50,100],
      pagesize:20,//初始化加载数量
      page:1,//初始化页码
      tableDataAll:[],
      dataTotal:null,
      selectRowData:{},
      formAllData:{
            account: null,
            areaCode: null,              
            }
     }
    },
    components:{
      GetCityList,
      shipperwallet,
      Pager
    },
    methods:{
            getStr(val){
                this.formAllData.areaCode = val.city.code
            },
    // 列表刷新页面  
    firstblood(){
        this.loading =true
     data_findShipperMywalletList(this.page,this.pagesize,this.formAllData).then(res => {
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
      this.firstblood()
    },
    // 清空查询
     clearSearch(){
            this.belongCityName = null,
               this.formAllData = {
                    account: null,
                    areaCode: null,  
               },
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
                this.$router.push({name: '货主账户详情',query:{ accountId:item.accountId }});

            }
   },
    mounted(){
       this.firstblood();      
    },
}
</script>
<style lang="scss">
.transactionCar{
    .el-cascader{
        margin-top: -10px;
    }
    .info_news{
        .el-button{
                padding: 4px 0px;
                span{
                    font-weight: bold
                }
        }
    }
}
</style>


