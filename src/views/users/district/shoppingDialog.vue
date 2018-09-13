<template>
     <div class="shoppingDialog commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" @click="openDialog()">{{btntext}}</el-button>
      <div class="newshoppingDialog">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change">
        <el-form>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商圈名称 ：" :label-width="formLabelWidth" >
                    <el-input></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="所在区域 ：" :label-width="formLabelWidth" >
                    <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="详细地址 ：" :label-width="formLabelWidth" >
                    <el-input></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="商圈场主 ：" :label-width="formLabelWidth" >
                    <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="场主手机号 ：" :label-width="formLabelWidth" >
                    <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>                        
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" >确 定</el-button>
          <el-button @click="close()">取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
export default {
  components:{
  },
  props:{
    params:{
      type:[Object,String,Array],
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
  data(){
        return{
        options:regionDataPlus,
        dialogFormVisible_add: false,
        formLabelWidth:'120px',
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
            }
        },
    },
  },
  mounted(){
    this.getMoreInformation();
  },
  methods:{
        handleChange(d){
           console.log('d',d)
           if(d.length<3){
                this.$message.info('请选择具体的城市');
                this.formAll.areaName = [];
                this.formAll.areaCode = [];
                this.formAll.province = null
                this.formAll.city = null
                this.formAll.area = null
           }
           else{
                this.formAll.areaCode = d
                this.formAll.province = CodeToText[d[0]]
                this.formAll.city =  CodeToText[d[1]]
                if(d[2]==''){
                this.formAll.area = null
                }
                else{
                this.formAll.area = CodeToText[d[2]]
                }
           }
        },
   openDialog:function(){
    this.dialogFormVisible_add = true;
   },
   change:function(){
      this.dialogFormVisible_add = false;
   },
   close:function(){
      this.dialogFormVisible_add = false;
       },
            //获取  服务和车辆 类型列表
    getMoreInformation(){

          }, 
    changeList(){
            eventBus.$emit('pushListtwo')
        },   
    // 同城新增     
  }
}
</script>


<style lang="scss">
.shoppingDialog{
     display: inline-block;
    .el-button{
            padding: 5px 15px 7px;

        }
    .newshoppingDialog{
        display: inline-block;
    }
}
</style>
