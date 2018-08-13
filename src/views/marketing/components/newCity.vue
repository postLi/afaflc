<template>
     <div class="creatcity commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newMarketingCity">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm">
          <el-row v-if="editType=='edit'">
              <el-col>
            <div class="swith">
            启用状态：
            <el-switch
            v-model="formAll.usingStatus"
            active-color="#13ce66"
            inactive-color="#ff4949">
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
             <th width="150">车主抽佣等级</th>                            
             <th width="100">开始抽佣单数</th>
             <th width="100">开始抽佣单数</th>
             <th width="100">每单抽佣（%）</th>
             <th width="100">至少抽佣金额</th>        
            </tr>
             <tr>
             <td>
                 <el-form-item > 
                 <GetCityList  ref="area"  v-model="formAll.areaCode2"></GetCityList>
                 </el-form-item>
            </td>
             <td> 
                 <el-form-item  prop="carType"> 
                 <el-select  v-model="formAll.carType" clearable placeholder="请选择省/市/区/街道" >
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
                 <el-form-item  prop="startNum"> 
                 <el-input min="0" maxlength="5"  v-model="formAll.startNum"></el-input>
                 </el-form-item>
             </td>
             <td>
                 <el-form-item  prop="endNum"> 
                 <el-input v-model="formAll.endNum"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="commissionPer"> 
                 <el-input v-model="formAll.commissionPer"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="commissionLowest"> 
                 <el-input v-model="formAll.commissionLowest"></el-input>
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
          <el-button type="primary"  v-else @click="add_data" >确 定1</el-button>
          <el-button @click="close()" >取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel} from '../../../api/server/areaPrice.js'
import { data_get_Marketingsame_create } from '../../../api/marketing/carmarkting/carmarkting.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
import { eventBus } from '@/eventBus'
import {data_get_shipper_type,data_get_shipper_create,data_get_shipper_change,data_get_shipper_view} from '../../../api/users/shipper/all_shipper.js'
export default {
  components:{
    Upload,
    GetCityList
  },
  props:{
    paramsView:{
        type:Object,
    },
    params:{
      type:Object,
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
            if(this.editType=='add'){
             if(!this.$refs.area.selectedOptions[0]) {
                    cb(new Error('请选择所在地'))
                }
             else{
                cb()
            }   
            }
            else{
                if(!this.vestList.areaCode) {
                    cb(new Error('请选择所在地'))
                }
             else{
                cb()
            } 
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
        const startNumValidator = (rule, val, cb) => {
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
        
    //    结束抽佣单数校验
        const endNumValidator = (rule, val, cb) => {
            var reg= /[^\d.]/g
             if(!val){
            cb(new Error(' 结束抽佣不能为空'))
            }
             else if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else{
                cb()
            }        
        }         

    //    每单抽佣比例校验
        const commissionPerValidator = (rule, val, cb) => {
            var reg= /[^\d.]/g
            if(!val){
            cb(new Error('每单抽佣比例不能为空'))
            }
            else if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else{
                cb()
            }        
        }        


    //    至少抽佣金额校验
        const commissionLowestValidator = (rule, val, cb) => {
            var reg= /[^\d.]/g
            if(!val){
            cb(new Error(' 至少抽佣金额不能为空'))
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
            startNum:null,
            endNum:null,
            commissionPer:null,
            commissionLowest:null,
            },
            rulesForm:{
            areaCode:{trigger:'change',required:true,validator: belongCityNameValidator},
            carType:{trigger:'change',required:true,validator:carTypeValidator},
            commissionGrade:{trigger:'change',required:true,validator:commissionGradeValidator},
            startNum:{trigger:'change',required:true,validator:startNumValidator},
            endNum:{trigger:'change',required:true,validator:endNumValidator},
            commissionPer:{trigger:'change',required:true,validator:commissionPerValidator},
            commissionLowest:{trigger:'change',required:true,validator:commissionLowestValidator},                                    
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
        GetCityList,
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
   openDialog:function(){
       if(this.editType=='edit'){
        this.dialogFormVisible_add = true;
        this.formAll = this.params
        console.log('p',this.params)
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
        data_get_Marketingsame_create(forms).then(res=>{
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
            this.$refs['vestList'].resetFields();
        }).catch(res=>{
            console.log(res)
       });
       }
       }
       )

   }             
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
        width: 934px;
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
        }
        }
</style>

<style lang="scss" >
    .newMarketingCity{
        .el-dialog{
            width: 955px!important;
        }
        .swith{
            margin:0px 10px 10px 10px;
        }
    }
    .creatcity{
        .el-input__inner{
            line-height: 40px !important; 
            height: 40px !important; 
        }
    }
</style>