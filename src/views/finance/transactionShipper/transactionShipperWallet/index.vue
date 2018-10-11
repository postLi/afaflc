<template>
    <div class="identicalStyle transactionCar" style="height:100%">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="所属区域:">
                    <vregion :ui="true"  @values="regionChange" class="form-control">
                        <el-input v-model="belongCityName" placeholder="请选择"></el-input>
                    </vregion>
            </el-form-item> 
            <el-form-item label="货主账号:">
            <el-input placeholder="请输入内容" clearable v-model="formAllData.accountId"></el-input>
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
            <el-table-column  label="所属区域" prop="areaCode">
            </el-table-column>
            <el-table-column  label="货主账号" prop="mobile" >
                <template  slot-scope="scoped">
                    <shipperwallet
                    btntype="text"  
                    :btntext="scoped.row.mobile"
                    editType="add"
                    btntitle="详情"
                    :templateItem="scoped.row"
                   >
                    </shipperwallet>    
                </template>
            </el-table-column>
            <el-table-column  label="可用余额" prop="balance">
            </el-table-column>
            <el-table-column  label="充值赠送余额" prop="availableBalance">
            </el-table-column>
            <el-table-column  label="在线交易奖励金（已奖励 / 额度）">
            <template  slot-scope="scoped">
             {{scoped.gainAwardReward}}/{{scoped.awardRewardMax}}
            </template>
            </el-table-column> 
            <el-table-column  label="优惠券数" prop="couponCount" >
            </el-table-column>                    
            <el-table-column  label="优惠券金额" prop="couponAmount" >
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
import vregion from '@/components/vregion/Region'
import {parseTime} from '@/utils/'
import shipperwallet from './shipperwallet'
export default {
  data(){
    return{
      btnsize:'mini',
      belongCityName:null,
      sizes:[20,50,100],
      pagesize:20,//初始化加载数量
      page:1,//初始化页码
      tableDataAll:[],
      dataTotal:null,
      selectRowData:{},
      formAllData:{
            accountId: null,
            areaCode: null,              
            }
     }
    },
    components:{
      vregion,
      shipperwallet,
      Pager
    },
    methods:{
            regionChange(d) {
                console.log('data:',d)
                this.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                if(d.area){
                    this.formAllData.areaCode = d.area.code;
                }else if(d.city){
                    this.formAllData.areaCode = d.city.code;
                }
                else{
                    this.formAllData.areaCode = d.province.code;
                }
            },
             getValue(obj){
                return obj ? obj.value:'';
            },
    // 列表刷新页面  
    firstblood(){
     data_findShipperMywalletList(this.page,this.pagesize,this.formAllData).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
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
                    accountId: null,
                    areaCode: null,  
               },
         this.firstblood();
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
    .info_tab_footer1{
    padding-left: 20px;
    text-align: left;
    background: #eee;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;
    width: 100%;
    margin-top:10px;
    .el-input--suffix{
        margin-top:5px!important;
    }
    }
}
</style>


