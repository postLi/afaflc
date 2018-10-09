<template>
     <div class="cashAuditingDetail commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()"><span :class="editType=='view'?'BtnInfo':''">{{btntext}}</span ></el-button>
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">

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
          if(!this.params.length){
               this.$message.warning('请选择您要操作的用户');
               return
          }
          else if(this.params.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的用户');
               return false
          }else if (this.params.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
                return false
          }
          else{
             this.dialogFormVisible_add = true;
             this.formData = this.params[0]
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
        data_aflcExtractCashList_update(this.params[0].extractSerial,this.formAll).then(res=>{
           this.changeList();
            this.$message.success('修改成功');
        }).catch(res=>{
            this.$message.error('修改失败')
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
}
</style>
