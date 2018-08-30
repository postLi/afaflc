<template>
    <div class="operatingAccount clearfix" style="height:100%">
        <div class="shipper_cashAuditing">
                <label><span>订单流水号:&nbsp;</span>                   
                  <el-input  placeholder="" clearable></el-input>
                </label>
                <label><span>交易流水号:&nbsp;</span>                   
                  <el-input placeholder="" clearable></el-input>
                </label>
                <label><span>车主账号:&nbsp;</span>
                   <el-input placeholder="" clearable></el-input>
                </label> 
                <label><span>交易类型:&nbsp;</span>
                   <el-input placeholder="" clearable></el-input>
                </label>   
                <label><span>服务分类:&nbsp;</span>
                   <el-input placeholder="" clearable></el-input>
                </label>   
                <label><span>收支类型:&nbsp;</span>
                   <el-input placeholder="" clearable></el-input>
                </label>                                                                     
                <label><span>交易时间:&nbsp;</span>
                    <el-date-picker
                    value-format="timestamp"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </label>     
                <label>
                  <el-button type="primary"  plain>搜索</el-button>
                  <el-button type="primary"  plain>重置</el-button>
                </label>                                                
         </div>
          	<div class="classify_cityinfo">
            <div class="info_city">    
            <el-table style="width: 100%" stripe border height="100%" highlight-current-row  tooltip-effect="dark">
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="订单流水号" >
            </el-table-column>
            <el-table-column  label="交易流水号" >
            </el-table-column>
            <el-table-column  label="交易时间" >
            </el-table-column>
            <el-table-column  label="车主账号" >
            </el-table-column>  
            <el-table-column  label="交易金额" >
            </el-table-column>                                                       
            <el-table-column  label="收支类型" >
            </el-table-column>
            <el-table-column  label="交易类型" >
            </el-table-column>
            <el-table-column  label="服务分类" >
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
import {parseTime} from '@/utils/'
export default {
  data(){
    return{
      options:regionDataPlus,
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
.operatingAccount{
    position: relative;
.shipper_cashAuditing{
    position: absolute;
    left: 0;
    top: 0;
    padding: 15px 16px;
    height: 70px;
    width: 100%;
    line-height: 35px;
            label{
                  width: 24%;
                  color: #666;
                  font-size: 14px;
                  overflow: hidden;
                  display: inline-block;
                  text-align:center;
                span{
                      width: 100px;
                      display: inline-block;
                      text-align: right;
                      float: left;
                }
                .el-button{
                  span{
                    width:auto;
                  }
                }
                .el-input{
                    width:calc(100% - 100px);
                    display: inline-block;
                    .el-input__inner{
                        color:#3e9ff1;
                        height:30px;
                        line-height: 30px;
                        width:100%;
                    }
                }
                .el-select {
                    display: inline-block;
                    position: relative;
                    width: calc(100% - 100px);
                    display: inline-block;
                    float: left;
                    .el-input{
                      width:100%;
                    }
                }
                .el-date-editor--daterange.el-input__inner{
                    width: calc(100% - 100px);
                }
                .el-date-editor{
                    height: 30px;
                    line-height: 30px;
                    vertical-align: middle;
                    .el-range-separator{
                        width: 10%;
                        margin-top:-10px; 
                    }
                    .el-input__icon{
                        margin-top:-10px; 
                    }
                }
            }
            .el-button{
               padding:8px 20px;
            }
}
.classify_cityinfo{
    height: 100%;
    padding: 120px 15px 0 15px;
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


