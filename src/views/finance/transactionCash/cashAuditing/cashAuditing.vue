<template>
    <div class="cashAuditing clearfix" style="height:100%">
        <div class="shipper_cashAuditing">
                <label><span>用户姓名:&nbsp;</span>                   
                  <el-input  placeholder="" clearable></el-input>
                </label>
                <label><span>电话号码:&nbsp;</span>                   
                  <el-input placeholder="" clearable></el-input>
                </label>
                <label><span>收款方式:&nbsp;</span>
                   <el-input placeholder="" clearable></el-input>
                </label> 
                <label><span>处理结果:&nbsp;</span>
                   <el-input placeholder="" clearable></el-input>
                </label>     
                <label><span>申请时间:&nbsp;</span>
                 <el-date-picker
                    value-format="timestamp"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </label> 
                <label><span>完成时间:&nbsp;</span>
                    <el-date-picker
                    value-format="timestamp"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </label>     
                <label>
                  <el-button type="primary"  plain>查询</el-button>
                  <el-button type="primary"  plain>重置</el-button>
                </label>                                                
         </div>
          	<div class="classify_cityinfo">
            <div class="info_city">    
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
.cashAuditing{
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


