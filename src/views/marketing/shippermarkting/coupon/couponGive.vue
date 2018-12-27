<template>
     <div class="couponGive commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="couponGive">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
           <div class="couponBuild" v-if="editType=='Build'">
              <el-form :inline="true">
            <el-form-item label="生成张数：" :label-width="formLabelWidth">
               <el-input v-model="num"></el-input>
            </el-form-item>     
            <el-form-item :label-width="formLabelWidth">
              <el-button type="primary" plain icon="el-icon-circle-plus-outline" @click="produceCoupon">生成</el-button>
              </el-form-item>
              </el-form>
           </div>
           <div :class="editType=='Build'?'tableDataAllBox2':'tableDataAllBox1'">
            <el-table style="width: 100%" stripe border height="77%" :data="tableDataAll" >
            <el-table-column  label="优惠券名称" prop="couponName">
            </el-table-column>
            <el-table-column  label="派发数量" prop="couponNum" width="80">
            </el-table-column>    
            <el-table-column  label="优惠券类型" prop="couponType">
            </el-table-column> 
            <el-table-column  label="满减/折扣" prop="remissionDiscount" width="90">
            </el-table-column> 
            <el-table-column  label="满减条件/最高抵扣" prop="conditionDeduction" width="150">
            </el-table-column> 
            <el-table-column  label="时效类型" prop="timeType" width="100">
            </el-table-column>       
            <el-table-column  label="开始时间" prop="startTime" show-overflow-tooltip>
            </el-table-column>    
            <el-table-column  label="过期时间" prop="endTime" show-overflow-tooltip>
            </el-table-column>        
            <el-table-column  label="适用服务类型" prop="serivceCode" width="120">
            </el-table-column>  
            <el-table-column  label="适用车辆类型" prop="carType">
            </el-table-column>     
            <el-table-column  label="所属区域" prop="areaName" show-overflow-tooltip>
            </el-table-column>      
            <el-table-column  label="能否与大户券叠加" prop="ifvouchersuperposition">
            <template  slot-scope="scope">
              {{ scope.row.ifvouchersuperposition == 1 ? '能' : '不能' }}
            </template>
            </el-table-column>                  

            </el-table> 
            </div>
            <div class="couponGive_fun"  v-if="editType=='Give'">
            <el-tabs v-model="shipperName" type="border-card"  >
            <!-- 填写手机号 -->
            <el-tab-pane label="填写手机号" name="first">
                <div class="couponGive_piece">
                 <h3 class="couponGive_piece_H3">请填写用户手机号</h3>
                 <p class="couponGive_piece_P">一行一个手机号，优惠券将会发放到选中手机号</p>
                <el-input
                 type="textarea"
                 ref="infofocus"
                 clearable
                v-model="mobile"
                :autosize="{ minRows: 2}"
                 >
                </el-input>
                <el-button type="primary" @click="grantCoupon">确认发放</el-button>
                </div>
            </el-tab-pane>

           <!-- 模板批量发放 -->
            <el-tab-pane label="模板批量发放"  name="second">
                <div class="couponGive_piece">
                 <h3 class="couponGive_piece_H3">请上传模板批量发放</h3>
                 <p class="couponGive_piece_P">格式：txt文档，一行一个手机号</p>
                    <input type="file" ref="inputer">
                    <el-button type="primary" @click="BatchDistribution">确认发放</el-button>
                </div>
            </el-tab-pane>            
          </el-tabs>
            </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import XLSX from 'xlsx'
import Cookies from 'js-cookie'
const TokenKey = 'TMS-Token'
import { data_Commission ,data_CarList,data_MaidLevel,data_ServerClassList} from '@/api/server/areaPrice.js'
import { data_get_couponActive3_Id,data_get_produceCoupon,data_get_BatchDistribution,data_get_grantCoupon,data_get_produceCouponExcel} from '@/api/marketing/shippermarkting/couponActive.js'
import Upload from '@/components/Upload/singleImage'
import vregion from '@/components/vregion/Region'
import { eventBus } from '@/eventBus'
import {exportWithIframe} from '@/utils/'

export default {
  components:{
    Upload,
    vregion,
  },
  props:{
    paramsView:{
      type:Object,
    },
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
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
    }
  },
  data(){
        return{
        num:null,
        mobile:null,
        formLabelWidth:'120px',    
        shipperName:'first',
        tableDataAll:[],
        dialogFormVisible_add: false,
        MaidLevelValueCar:'',
        optionsCar:[],
        MaidLevel:[],
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
             if(!val){
            this.num= null;
            this.mobile = null;
            this.$emit('getData');
             }
             else{
            this.getMoreInformation();
             }
        },
    },
  },
  components:{
        vregion,
  },
  mounted(){
  },
  methods:{
       openDialog:function(){
          if(this.params.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的数据');
               return
          }else if (this.params.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
          }
          else if(this.params.length == undefined && this.editType !== 'add')
          {
                this.$message.warning('请选择您要操作的数据');
               return false
          }
           else{
               
            data_get_couponActive3_Id(this.params[0].id).then(res=>{
            this.tableDataAll = res.data;
                  console.log('111', res.data)
            })
            this.dialogFormVisible_add = true;
           }
           
   },
   change:function(){
      this.dialogFormVisible_add = false;
   },
   close:function(){
      this.dialogFormVisible_add = false;
       },
            //获取  服务和车辆 类型列表
            getMoreInformation(){
                data_CarList().then(res=>{
                       this.optionsCar =res.data
                    })
                data_MaidLevel().then(res=>{
                        this.MaidLevel = res.data
                }).catch(res=>{
                    console.log(res)
                });    
          },
       changeList(){
            eventBus.$emit('pushListtwo')
        },   
       produceCoupon(){
           let reg= /^[1-9]\d*$/  //输入正整数正则
           if(!reg.test(this.num))
           {
               this.$message.warning('生成张数输入框仅能输入大于0的正整数');
           }
           else{
                this.$message.success('生成成功');
               location.href = ('/api/aflcsmservice/sm/aflcCouponUse/v1/produceCoupon/?id='+this.params[0].id+'&num='+this.num+'&access_token=' + Cookies.get(TokenKey))
               this.dialogFormVisible_add = false;
               this.$emit('getData');
        // exportWithIframe('/api/aflcsmservice/sm/aflcCouponUse/v1/produceCoupon/?id='+this.params.id+'&num='+this.num+'&access_token=' + Cookies.get(TokenKey))
        }        
       },
    
       BatchDistribution(){
        let inputFile = this.$refs.inputer;
        var formdata = new FormData()
        console.log(inputFile.files)
        formdata.append('id',this.params[0].id);
        formdata.append('multipartFile',inputFile.files[0]);
        this.dialogFormVisible_add = false;
        data_get_BatchDistribution(this.params[0].id,formdata).then(res=>{
             this.$emit('getData');
             this.$message.success('发放成功');
             this.$forceUpdate()
        }).catch(res=>{
             this.$emit('getData');
             this.$message.error(res.text)
             this.$forceUpdate()
        })
       },
       grantCoupon(){
           let mobile_Araay = this.mobile.split('\n')
           console.log('mobile_Araay',mobile_Araay);
           for(var i = 0;i<mobile_Araay.length;i++)
           {
            let phoneTest = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
            if(!(phoneTest.test(mobile_Araay[i].replace(/(^\s+)|(\s+$)/g, "")))){
            this.$message.warning('第'+(i+1)+'行手机号输入有误');
            return
            }
           }
           this.dialogFormVisible_add = false;
          data_get_grantCoupon(this.params[0].id,mobile_Araay).then(res=>{
              this.$emit('getData');
              this.$message.success('发放成功');
         }).catch(res=>{
             this.$emit('getData');
             this.$message.error(res.text)
         })   
       },
  }
}
</script>
<style lang="scss" >
    .couponGive{
        display: inline-block;
        .el-button {
        margin-right:0px;
        padding: 7px 15px 7px;
        font-size:12px;
        }
        height: 100%;
        .el-dialog{
            height: 100%;
            width:80%!important;
        }
        .el-button{
            display: inline-block;
        }
        .el-dialog__body{
            padding: 30px 20px!important;
        }
        .swith{
            margin:0px 0px 10px 10px;
            .el-switch{
                display: inline-block!important;
            }
        }
        .el-dialog__footer{
            padding: 20px 20px 20px;
        }
       .el-dialog{
           overflow: unset;
       }
       .tableDataAllBox1{
           height: 40%;
       }
       .tableDataAllBox2{
          height: 90%;
       }
       .el-dialog__body{
           height: 100%
       }
       .couponGive_piece{
           padding:20px;
           .el-textarea__inner{
               min-height:120px!important;
           }
           .el-button{
               margin-top:20px;
           }
       }
       .couponBuild{
           .el-input__inner{
               height: 30px!important;
               line-height: 30px!important;
           }
       }
    }
</style>