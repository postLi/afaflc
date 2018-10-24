<template>
     <div class="cashAuditingDetail commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()"><span :class="editType=='view'?'BtnInfo':''">{{btntext}}</span ></el-button>
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
        <el-form ref="formAll" :model="formAll">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户姓名 ：" :label-width="formLabelWidth" >
                    <span>{{formData.name}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话号码 ：" :label-width="formLabelWidth" >
                    <span>{{formData.mobile}}</span>
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
                    <el-radio v-model="formAll.auditOpinion" label="1">审核通过</el-radio>
                    <el-radio v-model="formAll.auditOpinion" label="2">审核不通过</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>                   
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注信息 ：" :label-width="formLabelWidth" >
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="1-100间的字符" 
                                    maxlength="100"
                                    ref="infofocus"
                                    v-model="formAll.remark"
                                    clearable>
                                </el-input>
                    </el-form-item>
                </el-col>
            </el-row>    
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="edit_data" v-if="editType!=='view'">确 定</el-button>
          <el-button @click="close()" v-if="editType!=='view'">取 消</el-button>
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
        formAll:{
          auditOpinion:'1',
          remark:null,
        },
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
                 this.$refs['formAll'].resetFields();
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
             if(this.params.auditOpinion=='审核通过')
             {
                this.formAll.auditOpinion = '1'
             }
             else if(this.params.auditOpinion=='审核不通过'){
                this.formAll.auditOpinion = '2'
             }
            else{
                this.formAll.auditOpinion = '0'
            }
    },
   change:function(){
      this.dialogFormVisible_add = false;
   },
   close:function(){
      this.dialogFormVisible_add = false;
       },
    changeList(){
            eventBus.$emit('pushListtwo')
        },      
    edit_data(){
       this.$refs['formAll'].validate(valid=>{
        if(valid){
        this.dialogFormVisible_add = false;
        data_aflcExtractCashList_update(this.params.extractSerial,this.formAll).then(res=>{
            this.$message.success('修改成功');
            this.$emit('getData') 
        }).catch(res=>{
            this.$message.error('修改失败')
            this.$emit('getData') 
        })
       }
       })
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
}
</style>
