<template>
 <div class="transactionRecharge clearfix">
  <div class="finance_searchinfo">
   <el-form :inline="true">
            <el-form-item label="用户姓名：">
            <el-input v-model="fromData.a1" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="电话号码：">
                  <el-input v-model="fromData.a2" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="充值渠道：">
                  <el-input v-model="fromData.a3" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="充值方式：">
                  <el-input v-model="fromData.a4" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="充值时间：">
                    <el-date-picker
                        is-range
                        type="daterange"
                        v-model="fromData.a5"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
                        >
                    </el-date-picker>
            </el-form-item>                  
            <el-form-item>       
          <el-button type="primary"  plain>查询</el-button> 
          </el-form-item>
          </el-form>
            </div>
            <div class="classify_info">
           <el-table style="width: 100%" stripe border height="100%" highlight-current-row :data="tableDataAll">
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="用户账号" prop="name">
            </el-table-column>
            <el-table-column  label="充值赠送" prop="giveSum">
            </el-table-column>
            <el-table-column  label="充值渠道" prop="rechargeChannel">
            </el-table-column>
            <el-table-column  label="充值方式" prop="rechargeWay">
            </el-table-column>
            <el-table-column  label="流水号" prop="rechargeSerial">
            </el-table-column>
            <el-table-column  label="充值时间" prop="rechargeTime">
            </el-table-column>    
           </el-table>                                                                
                <div class="info_news">
                      <!-- 页码 -->
        <div class="info1_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>  
                </div>
            </div>
     
        
    </div>
</template>

<script type="text/javascript">
import '@/styles/dialog.scss'
import Pager from '@/components/Pagination/index'
import {data_aflcRechargeList} from '@/api/finance/transactionRecharge.js'
import {data_financeList,data_GetServerType,data_GetServerType2,data_GetServerType3} from '@/api/finance/financeServer.js'
 export default{
        data(){
            return{
              sizes:[30,50,100],
              tableDataAll:[],
              totalCount:null,
              dataTotal:0,                
              fromData:{
               a1:null,
               a2:null,
               a3:null,
               a4:null,
               a5:null,
              },
               pagesize:30,//每页显示数
               page:1,//当前页     
               formAllData:{
                   name:null,
                   mobile:null,
                   rechargeChannel:null,
                   rechargeWay:null,
                   rechargeTime:null,
               },
            }
        },
        components:{
        Pager
        },
        mounted(){
            this.firstblood()
        },  
        methods: {
          // 列表刷新页面  
            firstblood(){
                data_aflcRechargeList(this.page,this.pagesize,this.formAllData).then(res => {
                  console.log(res)
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                })
            }, 
        //每页显示数据量变更
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood();
        },      
        }
    }
</script>

<style lang="scss">
.transactionRecharge{
        height:100%;    
        position: relative;
.finance_searchinfo{
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
    .el-range-editor{
        margin-left:0px;
        margin-top:5px;
        .el-range__icon{
            line-height: 24px;
        }
        .el-range-separator{
             line-height: 24px;
             width:7%;
        }
         .el-range__close-icon{
             line-height: 24px;
         }
         width: 280px;
    }   
    .el-button{
      margin-right: 20px;
      padding: 8px 20px!important;
    }
}
.classify_info{
    height: 94%;
    padding: 70px 15px 0 15px;
    .commoncss{
      display: inline-block!important;
    }
    .btns_box{
    margin-bottom: 10px;
    }
    .info_city{
      height:89%
    }
    .cell{
      color: #333;
      font-size: 14px;
      }    
    .el-button{
      margin-right: 20px;
      padding: 8px 20px!important;
    } 
}
.info1_tab_footer{
    padding-left: 20px;
    background: #eee;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .show_pager{float: right}
    .page-select{top:5px;
    .el-input__inner{
      height: 30px;
      line-height: 30px; 
    }
    }
}
}
</style>