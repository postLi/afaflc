<template>
     <div class="cashAuditingDetail commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()"><span :class="editType=='view'?'BtnInfo':''">{{btntext}}</span ></el-button>
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
        <el-form ref="formAll">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户姓名 ：" :label-width="formLabelWidth" >
                    <span>{{formData.name}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话号码 ：" :label-width="formLabelWidth" >
                    <span class="mobileInfo" @click="pushOrderSerial">{{formData.mobile}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="提现金额 ：" :label-width="formLabelWidth" >
                    <span>{{formData.extractSum}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="申请时间 ：" :label-width="formLabelWidth" >
                    <span>{{formData.extractTime}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="收款方式 ：" :label-width="formLabelWidth" >
                    <span>{{formData.extractWay}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收款账号 ：" :label-width="formLabelWidth" >
                    <span>{{formData.extractAccount}}</span>
                    </el-form-item>
                </el-col>
            </el-row>   
            <el-row>
                <el-col :span="12">
                    <el-form-item label="处理结果 ：" :label-width="formLabelWidth" >
                    <span>{{formData.auditOpinion}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="审核时间 ：" :label-width="formLabelWidth" >
                     <span>{{formData.extractTime}}</span>
                    </el-form-item>
                </el-col>
            </el-row>  
            <el-row>
                <el-col :span="12">
                    <el-form-item label="提现结果 ：" :label-width="formLabelWidth" >
                    <span>{{formData.extractStatus}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注信息 ：" :label-width="formLabelWidth" >
                    <span>{{formData.extractDes}}</span>
                    </el-form-item>
                </el-col>
            </el-row>    
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close()" type="primary">关 闭</el-button>
        </div>
      </el-dialog> 
      </div>
</template>
<script>
import {data_aflcExtractCashList_update} from '@/api/finance/transactionCash.js'
import { eventBus } from '@/eventBus'
export default {
  components:{
  },
  props:{
    params:{
      type:[Object,String,Array,Number],
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
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
    }    
  },
  data(){

        return{
        dialogFormVisible_add: false,
        formLabelWidth:'120px',
        formData:{},
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
                 this.$emit('getData') 
            }
        },
    },
  },
  mounted(){
  },
  methods:{
   openDialog:function(){
            this.dialogFormVisible_add = true;
             this.formData = this.params
    },
   change:function(){
      this.dialogFormVisible_add = false;
   },
   close:function(){
      this.dialogFormVisible_add = false;
       }, 
    // 进入账户概况
    pushOrderSerial(item) {
      this.$router.push({ name: '车主账户详情', query: { accountId: this.formData.accountId }})
    }   

   },
}
</script>


<style lang="scss">
.cashAuditingDetail{
     display: inline-block;
    .el-button{
        padding: 6px 15px 6px;
        }
    .el-form-item__content{
        text-align: left;
    }
    .BtnInfo{
        font-weight: bold;
    }
    .mobileInfo{
        color: #0da0e4;
        cursor: pointer;
    }
}
</style>
