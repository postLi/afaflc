<template>
     <div class="shoppingDialog commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newshoppingDialog">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
        <el-form ref="formAll" :model="formAll" :rules="rulesForm" :inline="true">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商圈名称 ：" :label-width="formLabelWidth" prop="tradeName">
                    <el-input v-model="formAll.tradeName"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="所在区域 ：" :label-width="formLabelWidth" prop="areaName">
                   <el-cascader
                    size="large"
                    :options="options"
                    v-model="formAll.areaName"
                    @change="handleChange">
                    </el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="详细地址 ：" :label-width="formLabelWidth" >
                    <el-input v-model="formAll.address"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="商圈场主 ：" :label-width="formLabelWidth" prop="tradeOwner">
                    <el-input v-model="formAll.tradeOwner"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="场主手机号 ：" :label-width="formLabelWidth" prop="ownerPhone">
                    <el-input v-model="formAll.ownerPhone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>                        
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="add_data">确 定</el-button>
          <el-button @click="close()">取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import {data_get_aflcTradeArea_create,data_get_aflcTradeArea_Id} from '@/api/users/district/shoppingDistrict.js'
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
            let phoneTest = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
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
    getMoreInformation(){
    
          }, 
    changeList(){
            eventBus.$emit('pushListtwo')
        },  
   // 省市状态表
     changeSelect(){
                this.selectFlag='1'
            },         
    add_data(){
       this.$refs['formAll'].validate(valid=>{
        if(valid){
            if(this.formAll.area){
               this.areaStatus = this.formAll.areaCode[2]
            }
            else{
               this.areaStatus = this.formAll.areaCode[1]
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
        }
        data_get_aflcTradeArea_create(forms).then(res=>{
           this.$message.success('新增成功');
           this.changeList();
           this.dialogFormVisible_add = false;
           console.log(res);

        }).catch(res=>{
            this.$message.error('新增失败')
            this.changeList();
            this.dialogFormVisible_add = false;
           console.log(res);
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
        .el-dialog{
         width: 1000px;
     }
    .el-button{
        padding: 7px 15px 7px;
        }
    .newshoppingDialog{
        display: inline-block;
    }
}
</style>
