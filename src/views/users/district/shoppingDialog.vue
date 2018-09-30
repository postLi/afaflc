<template>
     <div class="shoppingDialog commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()"><span :class="editType=='view'?'BtnInfo':''">{{btntext}}</span ></el-button>
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
        <el-form ref="formAll" :model="formAll" :rules="rulesForm" :inline="true">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商圈名称 ：" :label-width="formLabelWidth" prop="tradeName">
                    <el-input v-model="formAll.tradeName" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                     <span v-if="!selectFlag">
                    <el-form-item label="所在区域 ：" :label-width="formLabelWidth">
                    <el-input v-model="formAll.areaName1" @focus="changeSelect()" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                     </span>
                     <span v-else>
                    <el-form-item label="所在区域 ：" :label-width="formLabelWidth" prop="areaName">
                   <el-cascader
                    size="large"
                    :options="options"
                    v-model="formAll.areaName"
                    @change="handleChange">
                    </el-cascader>
                    </el-form-item>
                     </span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="详细地址 ：" :label-width="formLabelWidth">
                    <el-input v-model="formAll.address" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="商圈场主 ：" :label-width="formLabelWidth" prop="tradeOwner">
                    <el-input v-model="formAll.tradeOwner" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="场主手机号 ：" :label-width="formLabelWidth" prop="ownerPhone">
                    <el-input v-model="formAll.ownerPhone" :disabled="editType=='view'"></el-input>
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
import {data_get_aflcTradeArea_update,data_get_aflcTradeArea_Id} from '@/api/users/district/shoppingDistrict.js'
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
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
          //    选择省市校验
        const areaNameValidator = (rule, val, cb) => {
            if(val){
            if(val.length<1){
            cb(new Error('所属地区不能为空'))
            }
            else{
                cb()
            }                 
            }else{
            cb(new Error('所属地区不能为空'))
            }
        }

    //    选择商圈地区校验
        const tradeNameValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('商圈地区不能为空'))
            }
            else{
                cb()
            }        
        }

    //    选择商圈场主校验
        const tradeOwnerValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('商圈场主不能为空'))
            }
            else{
                cb()
            }        
        }
    //    选择场主手机号校验
        const ownerPhoneValidator = (rule, val, cb) => {
            let phoneTest = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
            !val && cb(new Error('场主手机号码不能为空'))
            if(!(phoneTest.test(val))){
                cb(new Error('请输入正确的手机号码格式'))
            } 
            else{
               cb()
            }  
        }

        return{
        selectFlag:null,
        options:regionDataPlus,
        dialogFormVisible_add: false,
        formLabelWidth:'120px',
        formAll:{
            tradeName:null,
            areaName1:null,
            areaName:[],
            areaCode: [],
            province:null,
            city:null,
            area:null,
            address:null,
            tradeOwner:null,
            ownerPhone:null,            
        },
         rulesForm:{
            tradeName:{trigger:'change',required:true,validator: tradeNameValidator},            
            areaName:{trigger:'change',required:true,validator: areaNameValidator},         
            tradeOwner:{trigger:'change',required:true,validator: tradeOwnerValidator},            
            ownerPhone:{trigger:'change',required:true,validator: ownerPhoneValidator},                                      
            },
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
                console.log('val',val)
                 this.$refs['formAll'].resetFields();
                 this.formAll.address = null;
                 this.selectFlag = null;
                 this.$emit('getData') 
            }
        },
    },
  },
  mounted(){
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
    if(this.editType=='view'){
        data_get_aflcTradeArea_Id(this.params.id).then(res=>{
           this.formAll.tradeName = res.data.tradeName
           this.formAll.address = res.data.address
           this.formAll.province = res.data.province
           this.formAll.city = res.data.city
           this.formAll.area = res.data.area
           this.formAll.tradeOwner = res.data.tradeOwner
           this.formAll.ownerPhone = res.data.ownerPhone
           this.formAll.areaName1 = res.data.areaName
           this.formAll.areaCode = res.data.areaCode
        })
     this.dialogFormVisible_add = true;
    }
    else{
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
        data_get_aflcTradeArea_Id(this.params[0].id).then(res=>{
           this.formAll.tradeName = res.data.tradeName
           this.formAll.address = res.data.address
           this.formAll.province = res.data.province
           this.formAll.city = res.data.city
           this.formAll.area = res.data.area
           this.formAll.tradeOwner = res.data.tradeOwner
           this.formAll.ownerPhone = res.data.ownerPhone
           this.formAll.areaName1 = res.data.areaName
           this.formAll.areaCode = res.data.areaCode
        })
         this.dialogFormVisible_add = true;
    }
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
   // 省市状态表
     changeSelect(){
            if(this.editType=='add'){
                this.selectFlag=null
            } else{
                this.selectFlag='1'
            }
            },         
    edit_data(){
       this.$refs['formAll'].validate(valid=>{
        if(valid){
            if(typeof(this.formAll.areaCode)!=='string')
            {
            if(this.formAll.area){
               this.areaStatus = this.formAll.areaCode[2]
            }
            else{
               this.areaStatus = this.formAll.areaCode[1]
            }
            }
      else{
           this.areaStatus = this.formAll.areaCode
          }
           let forms={
            areaCode:this.areaStatus,
            province:this.formAll.province,
            city:this.formAll.city,
            area:this.formAll.area,
            tradeName:this.formAll.tradeName,
            address:this.formAll.address,
            tradeOwner:this.formAll.tradeOwner,
            ownerPhone:this.formAll.ownerPhone,
            id:this.params[0].id,
        }
           this.dialogFormVisible_add = false;
        data_get_aflcTradeArea_update(forms).then(res=>{
           this.changeList();
            this.$message.success('修改成功');
        }).catch(res=>{
            this.$message.error('修改失败')
        })
       }
       })
    }
  }
}
</script>


<style lang="scss">
.shoppingDialog{
     display: inline-block;
    .BtnInfo{
    font-weight: bold
    }     
     .el-dialog{
         width: 1000px;
     }
     .btns_box{
    .el-button{
        padding: 7px 15px 7px;
        }
    }
}
</style>
