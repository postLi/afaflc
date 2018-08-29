<template>
     <div class="Carwallet commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newcoupon1">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
          <el-tabs v-model="autocheck" type="border-card"  >
        <!-- 钱包明细 -->
            <el-tab-pane label="钱包明细" name="first">
        <div class="Carwalletdetails">
       <el-form ref="formAllData">
          <el-row >
            <el-col :span="6">
               <el-form-item  label="交易类型：" label-width="80px"> 
                    <el-input placeholder="" clearable></el-input>
               </el-form-item>  
            </el-col>
            <el-col :span="6">
               <el-form-item  label="收支类型：" :label-width="formLabelWidth"> 
                    <el-input placeholder="" clearable></el-input>
               </el-form-item>  
            </el-col>
            <el-col :span="6" >
               <el-form-item  label="交易时间：" :label-width="formLabelWidth"> 
                    <el-input placeholder="" clearable></el-input>
               </el-form-item>  
            </el-col>
            <el-col :span="6">
               <el-form-item   label-width="50px"> 
                   <el-button type="primary" >搜 索</el-button>
               </el-form-item>  
            </el-col>                                    
          </el-row>
          <el-row >
              <el-col :span="6">
               <el-form-item  label="收入金额：" label-width="80px"> 
                   360
               </el-form-item>  
               
              </el-col>
              <el-col :span="6">
               <el-form-item  label="支出金额： " :label-width="formLabelWidth"> 
                   330
               </el-form-item>  

              </el-col>
          </el-row>
       </el-form>
            <el-table style="width: 100%"  border height="80%"  >
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="订单流水号" prop="">
            </el-table-column>
            <el-table-column  label="交易流水号" prop="">
            </el-table-column> 
            <el-table-column  label="车主账号" prop="">
            </el-table-column>        
            <el-table-column  label="服务分类" prop="">
            </el-table-column>       
            <el-table-column  label="交易类型" prop="">
            </el-table-column>     
            <el-table-column  label="收支类型" prop="">
            </el-table-column>
            <el-table-column  label="交易金额" prop="">
            </el-table-column>     
            <el-table-column  label="交易时间" prop="">
            </el-table-column>                                                                                               
            </el-table> 
        </div>
            </el-tab-pane>

        <!-- 提现记录 -->
            <el-tab-pane label="提现记录"  name="second">
           <div class="CarwalletRecord">
       <el-form ref="formAllData">
          <el-row >
            <el-col :span="6" >
               <el-form-item  label="收款方式：" label-width="80px"> 
                    <el-input placeholder="" clearable></el-input>
               </el-form-item>  
            </el-col>
            <el-col :span="6">
               <el-form-item   label-width="50px"> 
                   <el-button type="primary" >搜 索</el-button>
               </el-form-item>  
            </el-col>                                    
          </el-row>
          <el-row >
              <el-col :span="6">
               <el-form-item  label="提现金额：" label-width="80px"> 
                   360
               </el-form-item>  
               
              </el-col>
              <el-col :span="6">
               <el-form-item  label="手续费： " :label-width="formLabelWidth"> 
                   330
               </el-form-item>  
              </el-col>
          </el-row>
       </el-form>
            <el-table style="width: 100%"  border height="80%"  >
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="流水号" prop="">
            </el-table-column>
            <el-table-column  label="处理时间" prop="">
            </el-table-column> 
            <el-table-column  label="用户账号" prop="">
            </el-table-column>        
            <el-table-column  label="提现金额" prop="">
            </el-table-column>       
            <el-table-column  label="手续费" prop="">
            </el-table-column>     
            <el-table-column  label="收款方式" prop="">
            </el-table-column>
            <el-table-column  label="收款账号" prop="">
            </el-table-column>                                                                                                 
            </el-table> 
             </div>
            </el-tab-pane>            
    </el-tabs>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel,data_ServerClassList} from '@/api/server/areaPrice.js'
import { eventBus } from '@/eventBus'
export default {
  props:{
    params:{
      type:[Object,String],
    },
    value:{
      type: String,
      default:''
    },
    btntype: {
      type: String,
      default: ''
    },
    btntext: {
      type: String,
      default: ''
    },
    btntitle: {
    type: String,
    default: ''
    },
    icon:{
      type: String,
      default: ''
    },
    plain:{
      type: Boolean,
      default: false
    }, 
  },
  components:{
  },
 watch:{
     autocheck(newVal,oldVal){
        if(newVal){
            this.autocheck = newVal;
          }else{
        this.autocheck = oldVal;
          }
        }
        },
  data(){
    return{
            dialogFormVisible_add:false,
            autocheck:'first',
            formLabelWidth:'120px',
       }
 },
  methods:{
   change:function(){
         this.dialogFormVisible_add = false;
   },
   close:function(){
    eventBus.$emit('changeDia')
   },
   openDialog(){
       this.dialogFormVisible_add = true;
   },
   },     
   mounted(){
  
    }
    }
</script>
<style lang="scss">
.automationcheck{
    .el-dialog{
        width: 80%!important;
        overflow:unset;
    }
    .el-button{
        margin-right:0px!important;
    }
    .v-dropdown-container{
        top:35px!important;
        left:0px!important;
    }
    .el-radio.is-bordered{
        height: 30px;
        padding: 7px 20px 0 10px;
    }
     .textareaBox {
        width:100%;
    }
    .el-input__inner{
        line-height: 30px;
        height: 30px;
    }
    .el-range__icon{
      line-height: 24px;
    }
    .el-date-editor .el-range-separator{
        line-height: 24px;
        width: 7%
    }
    .el-dialog__body{
    padding: 0px!important;
    }
}
</style>