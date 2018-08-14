<template>
     <div class="creatcity commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newMarketingOrder">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm">
          <el-row v-if="editType=='edit'">
              <el-col>
            <div class="swith">
            启用状态：
            <el-switch
            style="display: block"
            v-model="formAll.usingStatus"
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="停用"
            active-value="1"
            inactive-value="0"
            inactive-text="启用">
            </el-switch>
             </div>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
             <table class="ht_table">
            <tbody>
             <tr>
             <th width="150">所属区域</th>
             <th width="100">车辆类型</th>
             <th width="100">车主抽佣等级</th>                            
             <th width="70">1单/ 天</th>
             <th width="70">2单/ 天</th>
             <th width="70">3单/ 天</th>  
             <th width="70">4单/ 天</th>
             <th width="70">5单/ 天</th>
             <th width="70">6单/ 天</th>
             <th width="70">7单/ 天</th>
             <th width="70">8单/ 天</th>
            </tr>
             <tr>
             <td>
                 <el-form-item  prop="areaCode2"> 
                    <vregion :ui="true" @values="regionChange" class="form-control">
                        <el-input v-model="formAll.areaCode2" placeholder="请选择省/市/区/街道"></el-input>
                    </vregion>
                 </el-form-item>
            </td>
             <td> 
                 <el-form-item  prop="carType"> 
                 <el-select  v-model="formAll.carType" clearable placeholder="请选择" >
                          <el-option
                             v-for="item in MaidLevel"
                              :key="item.code"
                             :label="item.name"
                              :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
                 </el-form-item>
            </td>
             <td>
                 <el-form-item  prop="commissionGrade"> 
                  <el-select v-model="formAll.commissionGrade" clearable placeholder="请选择" >
                          <el-option
                             v-for="item in optionsCar"
                              :key="item.code"
                             :label="item.name"
                              :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>  
                 </el-form-item>
             </td>
             <td>
                 <el-form-item  prop="reward1"> 
                 <el-input min="0" maxlength="3"  v-model="formAll.reward1"></el-input>
                 </el-form-item>
             </td>
             <td>
                 <el-form-item  prop="reward2"> 
                 <el-input v-model="formAll.reward2" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="reward3"> 
                 <el-input v-model="formAll.reward3" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="reward4"> 
                 <el-input v-model="formAll.reward4" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="reward5"> 
                 <el-input v-model="formAll.reward5" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="reward6"> 
                 <el-input v-model="formAll.reward6" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="reward7"> 
                 <el-input v-model="formAll.reward7" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="reward8"> 
                 <el-input v-model="formAll.reward8" maxlength="3"></el-input>
                 </el-form-item>
                 </td> 
            </tr>
            </tbody>
             </table>
            </el-col>
          </el-row>

          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  v-if="editType=='add'" @click="add_data" >确 定</el-button>
          <el-button type="primary"  v-else @click="updata_data" >确 定1</el-button>
          <el-button @click="close()" >取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel} from '../../../api/server/areaPrice.js'
import { data_get_orderFromsame_create,data_get_orderFromsame_update} from '../../../api/marketing/carmarkting/orderFrom.js'
import Upload from '@/components/Upload/singleImage'
import vregion from '@/components/vregion/Region'
import { eventBus } from '@/eventBus'
import {data_get_shipper_type,data_get_shipper_create,data_get_shipper_change,data_get_shipper_view} from '../../../api/users/shipper/all_shipper.js'
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
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
    }
  },
  data(){
    //    选择省市校验
        const belongCityNameValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('所属地区不能为空'))
            }
            else{
                cb()
            }        
        }

    //    选择车辆类型校验
        const carTypeValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('车辆类型不能为空'))
            }
            else{
                cb()
            }        
        }

    //    车主抽佣等级校验
        const commissionGradeValidator = (rule, val, cb) => {
                    if(!val){
            cb(new Error('车主抽佣等级不能为空'))
            }
            else{
                cb()
            }        
        }

    //    开始抽佣单数校验
        const rewardValidator = (rule, val, cb) => {
            var reg= /[^\d.]/g
            if(!val){
            cb(new Error('开始抽佣不能为空'))
            }
            else if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else{
                cb()
            }        
        }     
    

        return{
        dialogFormVisible_add: false,
        MaidLevelValueCar:'',
        optionsCar:[{ code:null,name:'全部'}],
        MaidLevel:[{ code:null,name:'全部'}],
        formAll:{
            areaCode2: null,
            carType:null,
            commissionGrade:null,
            reward1:null,
            reward2:null,
            reward3:null,
            reward4:null,
            reward5:null,
            reward6:null,
            reward7:null,
            reward8:null,
            },
            rulesForm:{
            areaCode2:{trigger:'change',required:true,validator: belongCityNameValidator},
            carType:{trigger:'change',required:true,validator:carTypeValidator},
            commissionGrade:{trigger:'change',required:true,validator:commissionGradeValidator},
            reward1:{trigger:'change',required:true,validator:rewardValidator}, 
            reward2:{trigger:'change',required:true,validator:rewardValidator},
            reward3:{trigger:'change',required:true,validator:rewardValidator},
            reward4:{trigger:'change',required:true,validator:rewardValidator},
            reward5:{trigger:'change',required:true,validator:rewardValidator},   
            reward6:{trigger:'change',required:true,validator:rewardValidator}, 
            reward7:{trigger:'change',required:true,validator:rewardValidator}, 
            reward8:{trigger:'change',required:true,validator:rewardValidator},                                    
            },
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
    //按钮类型text,primary...
    this.type = this.btntype;
    //按钮文本内容
    this.text = this.btntext;
    //弹出框标题
    this.title = this.btntitle;
    this.getMoreInformation();
  },
  methods:{
     regionChange(d) {
                console.log('data:',d)
                this.formAll.areaCode2 = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            },
             getValue(obj){
                return obj ? obj.value:'';
            },
   openDialog:function(){
       if(this.editType=='edit'){
           if(!this.params.id){
               
            this.$message.info('未选中需要修改内容');
           }
           else{
            this.dialogFormVisible_add = true;
            this.formAll = this.params
           }

       }
       else{
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
    // 同城新增    
   add_data(){
       this.$refs['formAll'].validate(valid=>{
        var forms= Object.assign({}, this.formAll);
        if(valid){
        data_get_orderFromsame_create(forms).then(res=>{
            console.log('res',res);
            this.dialogFormVisible_add = false;
            this.changeList();
            this.formAll={
            areaCode2: null,
            carType:null,
            commissionGrade:null,
            startNum:null,
            endNum:null,
            commissionPer:null,
            commissionLowest:null,
            }
            this.$refs['formAll'].resetFields();
        }).catch(res=>{
            console.log(res)
       });
       }
       }
       )
   },
//    同城修改
   updata_data(){
       this.$refs['formAll'].validate(valid=>{
        var forms= Object.assign({}, this.formAll);
        if(valid){
        data_get_orderFromsame_update(forms).then(res=>{
            console.log('res',res);
            this.dialogFormVisible_add = false;
            this.changeList();
            this.$refs['formAll'].resetFields();
        }).catch(res=>{
            console.log(res)
            this.$message.error('车辆类型车主抽佣等级已存在');
       });
       }
       }
       )
   },    
  }
}
</script>
<style lang="scss" scoped>
    .creatcity{
        .el-button {
                margin-right: 20px;
                padding: 10px 20px;
        }
        .el-dialog__footer{
            border-top:1px solid #ccc;   
            margin: 0 10px;
        }
        .upload{
            width: 300px;
            line-height: 20px;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
    .ht_table{
        width: 980px;
        margin:0px 10px;
        color: #333;
        border-left:1px solid #d0d7e5;
        border-bottom:1px solid #d0d7e5;
        tr{
            width: 100%;
            line-height: 34px;
            height: 34px;
        }
        th{
            background: #EAF0FF;
            border-top:1px solid #d0d7e5;
            border-right:1px solid #d0d7e5;
        }
        td{
            border-top:1px solid #d0d7e5;
            text-align: center;
            border-right:1px solid #d0d7e5;
            .el-form-item{
            margin-bottom: 0px!important;
            }
            .el-input{
                width:100%;
            }
        }
        }
</style>

<style lang="scss" >
    .newMarketingOrder{
        .el-dialog{
            width: 1000px!important;
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
    }
    .creatcity{
        .el-input__inner{
            line-height: 40px !important; 
            height: 40px !important; 
        }
    }
</style>