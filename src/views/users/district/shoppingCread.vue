<template>
     <div class="shoppingDialog commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle" top=5vh v-dialogDrag>
        <el-form ref="formAll" :model="formAll" :rules="rulesForm" :label-width="formLabelWidth">

            <el-row>
                <el-col :span="12">
                    <el-form-item label="商圈名称 ："  prop="tradeName">
                    <el-input v-model="formAll.tradeName"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="所在区域 ："  prop="areaName">
                    <GetCityList ref="area" v-model="formAll.areaName"  @returnStr="getStr"></GetCityList>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="详细地址 ："  >
                    <el-input v-model="formAll.address"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="商圈场主 ："  prop="tradeOwner">
                    <el-input v-model="formAll.tradeOwner"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="场主手机号 ："  prop="ownerPhone">
                    <el-input v-model="formAll.ownerPhone" maxlength="11"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>    
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商圈地理围栏（多边形） ："  prop="ownerPhone">
                     <ShoppingMap></ShoppingMap>
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
</template>
<script>
import {data_get_aflcTradeArea_create,data_get_aflcTradeArea_Id} from '@/api/users/district/shoppingDistrict.js'
import GetCityList from '@/components/GetCityList/city'
import ShoppingMap from '@/components/map/shoppingMap'
import { eventBus } from '@/eventBus'
export default {
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
        dialogFormVisible_add: false,
        formLabelWidth:'190px',
        formAll:{
            tradeName:null,
            areaName:null,
            areaCode: null,
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
                 this.$refs.area.clearData();
            }
        },
    },
  },
  mounted(){
  },
  computed:{
    
  },
  components:{
    GetCityList,
    ShoppingMap
  },
  methods:{
    getStr(val){
                this.formAll.areaCode= val.area.code
                this.formAll.areaName = val.area.name
                this.formAll.province = val.province.name
                this.formAll.city = val.city.name
                this.formAll.area = val.area.name
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
            
        let forms={
            areaCode:this.formAll.areaCode,
            areaName:this.formAll.areaName,
            province:this.formAll.province,
            city:this.formAll.city,
            area:this.formAll.area,
            tradeName:this.formAll.tradeName,
            address:this.formAll.address,
            tradeOwner:this.formAll.tradeOwner,
            ownerPhone:this.formAll.ownerPhone,                  
        }
        this.dialogFormVisible_add = false;
        data_get_aflcTradeArea_create(forms).then(res=>{
           this.$message.success('新增成功');
           this.changeList();
           console.log(res);

        }).catch(res=>{
            this.$message.error('新增失败')
            this.changeList();
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
         width: 1200px!important;
     }
    .el-button{
        padding: 7px 15px 7px;
        }

}
.info_news .shoppingDialog .el-button{
        padding: 0px 15px 0px;
}
</style>
