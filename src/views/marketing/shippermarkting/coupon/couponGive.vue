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
            <el-table-column  label="派发数量" prop="couponNum">
            </el-table-column>    
            <el-table-column  label="优惠券类型" prop="couponType">
            </el-table-column> 
            <el-table-column  label="满减/折扣" prop="remissionDiscount">
            </el-table-column> 
            <el-table-column  label="满减条件/最高抵扣" prop="conditionDeduction">
            </el-table-column> 
            <el-table-column  label="时效类型" prop="timeType">
            </el-table-column>       
            <el-table-column  label="开始时间" prop="startTime">
            </el-table-column>    
            <el-table-column  label="过期时间" prop="endTime">
            </el-table-column>        
            <el-table-column  label="适用服务类型" prop="serivceCode">
            </el-table-column>  
            <el-table-column  label="适用车辆类型" prop="carType">
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
import { data_Commission ,data_CarList,data_MaidLevel,data_ServerClassList} from '@/api/server/areaPrice.js'
import { data_get_couponActive2_Id,data_get_produceCoupon,data_get_BatchDistribution,data_get_grantCoupon} from '@/api/marketing/shippermarkting/couponActive.js'
import Upload from '@/components/Upload/singleImage'
import vregion from '@/components/vregion/Region'
import { eventBus } from '@/eventBus'
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
        optionsCar:[{ code:null,name:'全部'}],
        MaidLevel:[{ code:null,name:'全部'}],
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
        },
    },
  },
  components:{
        vregion,
  },
  mounted(){
    this.getMoreInformation();
  },
  methods:{
       openDialog:function(){
           if(!this.params.id){
            this.$message.info('未选中需要生成优惠卷的活动');
           }
           else{
            data_get_couponActive2_Id(this.params.id).then(res=>{
                console.log(res)
            this.tableDataAll = res.data;
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
                    // console.log(res.data)
                    res.data.map((item)=>{
                        this.optionsCar.push(item);
                    })
                    })
                data_MaidLevel().then(res=>{
                      res.data.map((item)=>{
                        this.MaidLevel.push(item);
                    })
                
                      
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
               this.$message.warning('生成张数输入框仅能输入正整数');
           }
           else{
         data_get_produceCoupon(this.params.id,this.num).then(res=>{
             this.$message.success('生成成功');
             this.dialogFormVisible_add = false;
         }).catch(res=>{
             this.dialogFormVisible_add = false;
             this.$message.error('生成失败')
        })
        }        
       },
    
       BatchDistribution(){
        let inputFile = this.$refs.inputer;
        var formdata = new FormData()
        console.log('inputFile',inputFile.files[0]);
        formdata.append('id',this.params.id);
        formdata.append('multipartFile',inputFile.files[0]);
        console.log('formdata',formdata);
        data_get_BatchDistribution(this.params.id,formdata).then(res=>{
             console.log('res',res)
             this.$message.success('发放成功');
             this.dialogFormVisible_add = false;
        }).catch(res=>{
             this.dialogFormVisible_add = false;
             this.$message.error('发放失败')
        })
       },
       grantCoupon(){
           let mobile_Araay = this.mobile.split('\n')
          data_get_grantCoupon(this.params.id,mobile_Araay).then(res=>{
              this.$message.success('发放成功');
              this.dialogFormVisible_add = false;
         }).catch(res=>{
              this.$message.success('发放失败');
              this.dialogFormVisible_add = false; 
         })   
       },

  }
}
</script>
<style lang="scss" >
    .couponGive{
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
        .v-dropdown-container{
          top: 41px!important;
          left: 0px!important;
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
    }
    .creatcity{
        .el-input__inner{
            line-height: 40px!important; 
            height: 40px !important; 
        }
    }
</style>