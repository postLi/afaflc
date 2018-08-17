<template>
     <div class="creatOrder commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newMarketingOrder">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm">
          <el-row >
            <el-col :span="24">
            <table class="ht_table">
            <tbody>
             <tr>
             <th >所属区域</th>
             <th >区域奖励额度上限</th>                   
             <th >服务分类</th>
             <th >车辆类型</th>
             <th >启用状态</th>
            </tr>     
            <tr>
             <td><el-input v-model="formAll.areaCode2" disabled></el-input></td>
             <td><el-input v-model="formAll.rewardMax" placeholder="请选择"></el-input></td>   
             <td><el-input v-model="formAll.serivceCode"  disabled></el-input></td>
             <td><el-input v-model="formAll.carType"  disabled></el-input></td>
             <td> 
            <el-switch
            style="display: block"
            v-model="formAll.usingStatus"
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="停用"
            active-value="1"
            inactive-value="0"
            inactive-text="启用"
            >
            </el-switch></td>           
            </tr>
            </tbody>
            </table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
             <table class="ht_table">
            <tbody>
             <tr>
             <th width="100"  rowspan="2">车主奖励等级</th>
             <th colspan="8">订单金额范围</th>                   
             <th width="80"   rowspan="2">一天限量</th>
            </tr>
            <tr>
              <td><el-form-item prop="reward1" size = '50'><el-input class="Order_input" v-model="formAll.reward1" ref='reward1'></el-input></el-form-item>-<el-form-item prop="reward2"><el-input class="Order_input" v-model="formAll.reward2" ref='reward2'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward3"><el-input class="Order_input" v-model="formAll.reward3" ref='reward3'></el-input></el-form-item>-<el-form-item prop="reward4"><el-input class="Order_input" v-model="formAll.reward4" ref='reward4'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward5"><el-input class="Order_input" v-model="formAll.reward5" ref='reward5'></el-input></el-form-item>-<el-form-item prop="reward6"><el-input class="Order_input" v-model="formAll.reward6" ref='reward6'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward7"><el-input class="Order_input" v-model="formAll.reward7" ref='reward7'></el-input></el-form-item>-<el-form-item prop="reward8"><el-input class="Order_input" v-model="formAll.reward8" ref='reward8'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward9"><el-input class="Order_input" v-model="formAll.reward9" ref='reward9'></el-input></el-form-item>-<el-form-item prop="reward10"><el-input class="Order_input" v-model="formAll.reward10" ref='reward10'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward11"><el-input class="Order_input" v-model="formAll.reward11" ref='reward11'></el-input></el-form-item>-<el-form-item prop="reward12"><el-input class="Order_input" v-model="formAll.reward12" ref='reward12'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward13"><el-input class="Order_input" v-model="formAll.reward13" ref='reward13'></el-input></el-form-item>-<el-form-item prop="reward14"><el-input class="Order_input" v-model="formAll.reward14" ref='reward14'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward15"><el-input class="Order_input" v-model="formAll.reward15" ref='reward15'></el-input></el-form-item>-<el-form-item prop="reward16"><el-input class="Order_input" v-model="formAll.reward16" ref='reward16'></el-input></el-form-item></td> 
                 
            </tr>
            <tr>
              <td>未分类</td>
              <td><el-form-item prop="data1" size = '50'><el-input v-model="formAll.data1"></el-input></el-form-item></td>
              <td><el-form-item prop="data2" size = '50'><el-input v-model="formAll.data2"></el-input></el-form-item></td> 
              <td><el-form-item prop="data3" size = '50'><el-input v-model="formAll.data3"></el-input></el-form-item></td> 
              <td><el-form-item prop="data4" size = '50'><el-input v-model="formAll.data4"></el-input></el-form-item></td> 
              <td><el-form-item prop="data5" size = '50'><el-input v-model="formAll.data5"></el-input></el-form-item></td> 
              <td><el-form-item prop="data6" size = '50'><el-input v-model="formAll.data6"></el-input></el-form-item></td> 
              <td><el-form-item prop="data7" size = '50'><el-input v-model="formAll.data7"></el-input></el-form-item></td> 
              <td><el-form-item prop="data8" size = '50'><el-input v-model="formAll.data8"></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum1" size = '50'><el-input v-model="formAll.maxnum1"></el-input></el-form-item></td>   
            </tr>
             <tr>
              <td>普通</td>
              <td><el-form-item prop="data9" size = '50'><el-input v-model="formAll.data9"></el-input></el-form-item></td>
              <td><el-form-item prop="data10" size = '50'><el-input v-model="formAll.data10"></el-input></el-form-item></td>
              <td><el-form-item prop="data11" size = '50'><el-input v-model="formAll.data11"></el-input></el-form-item></td> 
              <td><el-form-item prop="data12" size = '50'><el-input v-model="formAll.data12"></el-input></el-form-item></td> 
              <td><el-form-item prop="data13" size = '50'><el-input v-model="formAll.data13"></el-input></el-form-item></td> 
              <td><el-form-item prop="data14" size = '50'><el-input v-model="formAll.data14"></el-input></el-form-item></td> 
              <td><el-form-item prop="data15" size = '50'><el-input v-model="formAll.data15"></el-input></el-form-item></td> 
              <td><el-form-item prop="data16" size = '50'><el-input v-model="formAll.data16"></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum2" size = '50'><el-input v-model="formAll.maxnum2"></el-input></el-form-item></td> 

            </tr>
            <tr>
              <td>银牌</td>
              <td><el-form-item prop="data17" size = '50'><el-input v-model="formAll.data17"></el-input></el-form-item></td>
              <td><el-form-item prop="data18" size = '50'><el-input v-model="formAll.data18"></el-input></el-form-item></td>   
              <td><el-form-item prop="data19" size = '50'><el-input v-model="formAll.data19"></el-input></el-form-item></td>
              <td><el-form-item prop="data20" size = '50'><el-input v-model="formAll.data20"></el-input></el-form-item></td> 
              <td><el-form-item prop="data21" size = '50'><el-input v-model="formAll.data21"></el-input></el-form-item></td> 
              <td><el-form-item prop="data22" size = '50'><el-input v-model="formAll.data22"></el-input></el-form-item></td> 
              <td><el-form-item prop="data23" size = '50'><el-input v-model="formAll.data23"></el-input></el-form-item></td> 
              <td><el-form-item prop="data24" size = '50'><el-input v-model="formAll.data24"></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum3" size = '50'><el-input v-model="formAll.maxnum3"></el-input></el-form-item></td>  
            </tr>
             <tr>
              <td>金牌</td>
              <td><el-form-item prop="data25" size = '50'><el-input v-model="formAll.data25"></el-input></el-form-item></td> 
              <td><el-form-item prop="data26" size = '50'><el-input v-model="formAll.data26"></el-input></el-form-item></td> 
              <td><el-form-item prop="data27" size = '50'><el-input v-model="formAll.data27"></el-input></el-form-item></td>                
              <td><el-form-item prop="data28" size = '50'><el-input v-model="formAll.data28"></el-input></el-form-item></td>
              <td><el-form-item prop="data29" size = '50'><el-input v-model="formAll.data29"></el-input></el-form-item></td> 
              <td><el-form-item prop="data30" size = '50'><el-input v-model="formAll.data30"></el-input></el-form-item></td> 
              <td><el-form-item prop="data31" size = '50'><el-input v-model="formAll.data31"></el-input></el-form-item></td> 
              <td><el-form-item prop="data32" size = '50'><el-input v-model="formAll.data32"></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum4" size = '50'><el-input v-model="formAll.maxnum4"></el-input></el-form-item></td>   
            </tr>
            <tr>
              <td>钻石</td>
              <td><el-form-item prop="data33" size = '50'><el-input v-model="formAll.data33"></el-input></el-form-item></td> 
              <td><el-form-item prop="data34" size = '50'><el-input v-model="formAll.data34"></el-input></el-form-item></td> 
              <td><el-form-item prop="data35" size = '50'><el-input v-model="formAll.data35"></el-input></el-form-item></td> 
              <td><el-form-item prop="data36" size = '50'><el-input v-model="formAll.data36"></el-input></el-form-item></td>
              <td><el-form-item prop="data37" size = '50'><el-input v-model="formAll.data37"></el-input></el-form-item></td>
              <td><el-form-item prop="data38" size = '50'><el-input v-model="formAll.data38"></el-input></el-form-item></td> 
              <td><el-form-item prop="data39" size = '50'><el-input v-model="formAll.data39"></el-input></el-form-item></td> 
              <td><el-form-item prop="data40" size = '50'><el-input v-model="formAll.data40"></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum5" size = '50'><el-input v-model="formAll.maxnum5"></el-input></el-form-item></td>  
            </tr>
             <tr>
              <td>皇冠</td>
              <td><el-form-item prop="data41" size = '50'><el-input v-model="formAll.data41"></el-input></el-form-item></td> 
              <td><el-form-item prop="data42" size = '50'><el-input v-model="formAll.data42"></el-input></el-form-item></td> 
              <td><el-form-item prop="data43" size = '50'><el-input v-model="formAll.data43"></el-input></el-form-item></td>
              <td><el-form-item prop="data44" size = '50'><el-input v-model="formAll.data44"></el-input></el-form-item></td>  
              <td><el-form-item prop="data45" size = '50'><el-input v-model="formAll.data45"></el-input></el-form-item></td>   
              <td><el-form-item prop="data46" size = '50'><el-input v-model="formAll.data46"></el-input></el-form-item></td> 
              <td><el-form-item prop="data47" size = '50'><el-input v-model="formAll.data47"></el-input></el-form-item></td> 
              <td><el-form-item prop="data48" size = '50'><el-input v-model="formAll.data48"></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum6" size = '50'><el-input v-model="formAll.maxnum6"></el-input></el-form-item></td>   
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
import { data_Commission ,data_CarList,data_MaidLevel,data_ServerClassList} from '@/api/server/areaPrice.js'
import { data_get_ownerFromsame1_Id,data_get_ownerFromsame_update,data_get_ownerFromsame2_Id} from '@/api/marketing/carmarkting/carOwner.js'
import Upload from '@/components/Upload/singleImage'
import vregion from '@/components/vregion/Region'
import { eventBus } from '@/eventBus'
import {data_get_shipper_type,data_get_shipper_create,data_get_shipper_change,data_get_shipper_view} from '@/api/users/shipper/all_shipper.js'
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

    //    服务类型等级校验
        const serivceCodeValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('服务类型不能为空'))
            }
            else{
                cb()
            }        
        }

    //    区域奖励上限校验
        const rewardMaxValidator = (rule, val, cb) => {
            var reg= /[^\d.]/g
            if(!val){
            cb(new Error('区域奖励上限不能为空'))
            }
            else if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }            
            else{
                cb()
            }        
        }

    //   参数校验
        const rewardValidator = (rule, val, cb) => {
            var reg= /[^\d.]/g
            if(!val){
            cb(new Error('数据不能为空'))
            }
            else if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else{
                cb()
            }        
        }   

        const reward2Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward1'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }   
        const reward3Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward2'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }   
        const reward4Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward3'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }   
        const reward5Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward4'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }           
        const reward6Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward5'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }   
        const reward7Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward6'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }       
        const reward8Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward7'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }   
        const reward9Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward8'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }       
        const reward10Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward9'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }   
        const reward11Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward10'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }   
        const reward12Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward11'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }   
        const reward13Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward12'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }       
        const reward14Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward13'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }   
        const reward15Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward14'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }   
        const reward16Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(parseInt(val)<parseInt(this.$refs['reward15'].value)){
            cb(new Error('不能小于前框值'))}else{cb()} }       

        return{
        formLabelWidth:'130px',
        dialogFormVisible_add: false,
        MaidLevelValueCar:'',
        optionsCar:[{ code:null,name:'全部'}],
        serviceCardList:[{ code:null,name:'全部'}],
        FormData:null,
        formAll:{
            areaCode2: null,
            rewardMax:null,
            carType:null,
            serivceCode:null,
            usingStatus:null,
            reward1:null,reward2:null,reward3:null,reward4:null,reward5:null,reward6:null,reward7:null,reward8:null, reward9:null,reward10:null,reward11:null,reward12:null,reward13:null,reward14:null,reward15:null,reward16:null,
            maxnum1:null,maxnum2:null,maxnum3:null,maxnum4:null,maxnum5:null,maxnum6:null,
            data1:null,data2:null,data3:null,data4:null,data5:null,data6:null,data7:null,data8:null,data9:null,data10:null,data11:null,data12:null,data13:null,data14:null,data15:null,data16:null,data17:null,data18:null,data19:null,data20:null,
            data21:null,data22:null,data23:null,data24:null,data25:null,data26:null,data27:null,data28:null,data29:null,data30:null,data31:null,data32:null,data33:null,data34:null,data35:null,data36:null,data37:null,data38:null,data39:null,data40:null,
            data41:null,data42:null,data43:null,data44:null,data45:null,data46:null,data47:null,data48:null
            },
            
            rulesForm:{
            areaCode2:{trigger:'change',required:true,validator: belongCityNameValidator},
            carType:{trigger:'change',required:true,validator:carTypeValidator},
            serivceCode:{trigger:'change',required:true,validator:serivceCodeValidator},
            rewardMax:{trigger:'change',required:true,validator:rewardMaxValidator},
            reward1:{trigger:'change',required:true,validator:rewardValidator},
            reward2:{trigger:'change',required:true,validator:reward2Validator},
            reward3:{trigger:'change',required:true,validator:reward3Validator},
            reward4:{trigger:'change',required:true,validator:reward4Validator},
            reward5:{trigger:'change',required:true,validator:reward5Validator},
            reward6:{trigger:'change',required:true,validator:reward6Validator},
            reward7:{trigger:'change',required:true,validator:reward7Validator},
            reward8:{trigger:'change',required:true,validator:reward8Validator},
            reward9:{trigger:'change',required:true,validator:reward9Validator},
            reward10:{trigger:'change',required:true,validator:reward10Validator},
            reward11:{trigger:'change',required:true,validator:reward11Validator},
            reward12:{trigger:'change',required:true,validator:reward12Validator},
            reward13:{trigger:'change',required:true,validator:reward13Validator},
            reward14:{trigger:'change',required:true,validator:reward14Validator},
            reward15:{trigger:'change',required:true,validator:reward15Validator},
            reward16:{trigger:'change',required:true,validator:reward16Validator},
            maxnum1:{trigger:'change',required:true,validator:rewardValidator},
            maxnum2:{trigger:'change',required:true,validator:rewardValidator},
            maxnum3:{trigger:'change',required:true,validator:rewardValidator},
            maxnum4:{trigger:'change',required:true,validator:rewardValidator},
            maxnum5:{trigger:'change',required:true,validator:rewardValidator},
            maxnum6:{trigger:'change',required:true,validator:rewardValidator},
            data1:{trigger:'change',required:true,validator:rewardValidator},data2:{trigger:'change',required:true,validator:rewardValidator},
            data3:{trigger:'change',required:true,validator:rewardValidator},data4:{trigger:'change',required:true,validator:rewardValidator},
            data5:{trigger:'change',required:true,validator:rewardValidator},data6:{trigger:'change',required:true,validator:rewardValidator},
            data7:{trigger:'change',required:true,validator:rewardValidator},data8:{trigger:'change',required:true,validator:rewardValidator},
            data9:{trigger:'change',required:true,validator:rewardValidator},data10:{trigger:'change',required:true,validator:rewardValidator},
            data11:{trigger:'change',required:true,validator:rewardValidator},data12:{trigger:'change',required:true,validator:rewardValidator},
            data13:{trigger:'change',required:true,validator:rewardValidator},data14:{trigger:'change',required:true,validator:rewardValidator},
            data15:{trigger:'change',required:true,validator:rewardValidator},data16:{trigger:'change',required:true,validator:rewardValidator},
            data17:{trigger:'change',required:true,validator:rewardValidator},data18:{trigger:'change',required:true,validator:rewardValidator},
            data19:{trigger:'change',required:true,validator:rewardValidator},data20:{trigger:'change',required:true,validator:rewardValidator},
            data21:{trigger:'change',required:true,validator:rewardValidator},data22:{trigger:'change',required:true,validator:rewardValidator},
            data23:{trigger:'change',required:true,validator:rewardValidator},data24:{trigger:'change',required:true,validator:rewardValidator},
            data25:{trigger:'change',required:true,validator:rewardValidator},data26:{trigger:'change',required:true,validator:rewardValidator},
            data27:{trigger:'change',required:true,validator:rewardValidator},data28:{trigger:'change',required:true,validator:rewardValidator},
            data29:{trigger:'change',required:true,validator:rewardValidator},data30:{trigger:'change',required:true,validator:rewardValidator},
            data31:{trigger:'change',required:true,validator:rewardValidator},data32:{trigger:'change',required:true,validator:rewardValidator},
            data33:{trigger:'change',required:true,validator:rewardValidator},data34:{trigger:'change',required:true,validator:rewardValidator},
            data35:{trigger:'change',required:true,validator:rewardValidator},data36:{trigger:'change',required:true,validator:rewardValidator},
            data37:{trigger:'change',required:true,validator:rewardValidator},data38:{trigger:'change',required:true,validator:rewardValidator},
            data39:{trigger:'change',required:true,validator:rewardValidator},data40:{trigger:'change',required:true,validator:rewardValidator},
            data41:{trigger:'change',required:true,validator:rewardValidator},data42:{trigger:'change',required:true,validator:rewardValidator},
            data43:{trigger:'change',required:true,validator:rewardValidator},data44:{trigger:'change',required:true,validator:rewardValidator},  
            data45:{trigger:'change',required:true,validator:rewardValidator},data46:{trigger:'change',required:true,validator:rewardValidator},
            data47:{trigger:'change',required:true,validator:rewardValidator},data48:{trigger:'change',required:true,validator:rewardValidator},             
            },
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            this.$forceUpdate()
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
           if(!this.params.id){
               
            this.$message.info('未选中需要修改内容');
           }
           else{
            this.update1();
            this.$forceUpdate()
            this.dialogFormVisible_add = true;
            data_get_ownerFromsame1_Id(this.params.id).then(res=>{
            console.log('res',res)
            this.formAll.areaCode2=res.data.areaCode2
            this.formAll.rewardMax=res.data.rewardMax
            this.formAll.carType=res.data.carType
            this.formAll.serivceCode=res.data.serivceCode
            this.formAll.usingStatus=res.data.usingStatus
           })

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
                data_ServerClassList().then(res=>{
                      res.data.map((item)=>{
                       this.serviceCardList.push(item);
                    })     
                }).catch(res=>{
                    console.log(res)
                });         
                
          }, 
          update1:function(){
              data_get_ownerFromsame2_Id(this.params.id).then(res=>{
            this.formAll.reward1 = res.data[0].startPrice;this.formAll.reward2 = res.data[0].endPrice;
            this.formAll.reward3 = res.data[1].startPrice;this.formAll.reward4 = res.data[1].endPrice;
            this.formAll.reward5 = res.data[2].startPrice;this.formAll.reward6 = res.data[2].endPrice;
            this.formAll.reward7 = res.data[3].startPrice;this.formAll.reward8 = res.data[3].endPrice;
            this.formAll.reward9 = res.data[4].startPrice;this.formAll.reward10 = res.data[4].endPrice;
            this.formAll.reward11 = res.data[5].startPrice;this.formAll.reward12 = res.data[5].endPrice;
            this.formAll.reward13 = res.data[6].startPrice;this.formAll.reward14 = res.data[6].endPrice;
            this.formAll.reward15 = res.data[7].startPrice;this.formAll.reward16 = res.data[7].endPrice;
            this.formAll.maxnum1 = res.data[0].orderNum;this.formAll.maxnum2 = res.data[8].orderNum;
            this.formAll.maxnum3 = res.data[16].orderNum;this.formAll.maxnum4 = res.data[24].orderNum;
            this.formAll.maxnum5 = res.data[32].orderNum;this.formAll.maxnum6 = res.data[40].orderNum;
            this.formAll.data1 = res.data[0].reward;this.formAll.data2 = res.data[1].reward;this.formAll.data3 = res.data[2].reward;this.formAll.data4 = res.data[3].reward;
            this.formAll.data5 = res.data[4].reward;this.formAll.data6 = res.data[5].reward;this.formAll.data7 = res.data[6].reward;this.formAll.data8 = res.data[7].reward;
            this.formAll.data9 = res.data[8].reward;this.formAll.data10 = res.data[9].reward;this.formAll.data11 = res.data[10].reward;this.formAll.data12 = res.data[11].reward;
            this.formAll.data13 = res.data[12].reward;this.formAll.data14 = res.data[13].reward;this.formAll.data15 = res.data[14].reward;this.formAll.data16 = res.data[15].reward;
            this.formAll.data17 = res.data[16].reward;this.formAll.data18 = res.data[17].reward;this.formAll.data19 = res.data[18].reward;this.formAll.data20 = res.data[19].reward;
            this.formAll.data21 = res.data[20].reward;this.formAll.data22 = res.data[21].reward;this.formAll.data23 = res.data[22].reward;this.formAll.data24 = res.data[23].reward;
            this.formAll.data25 = res.data[24].reward;this.formAll.data26 = res.data[25].reward;this.formAll.data27 = res.data[26].reward;this.formAll.data28 = res.data[27].reward;
            this.formAll.data29 = res.data[28].reward;this.formAll.data30 = res.data[29].reward;this.formAll.data31 = res.data[30].reward;this.formAll.data32 = res.data[31].reward;
            this.formAll.data33 = res.data[32].reward;this.formAll.data34 = res.data[33].reward;this.formAll.data35 = res.data[34].reward;this.formAll.data36 = res.data[35].reward;
            this.formAll.data37 = res.data[36].reward;this.formAll.data38 = res.data[37].reward;this.formAll.data39 = res.data[38].reward;this.formAll.data40 = res.data[39].reward;
            this.formAll.data41 = res.data[40].reward;this.formAll.data42 = res.data[41].reward;this.formAll.data43 = res.data[42].reward;this.formAll.data44 = res.data[43].reward;
            this.formAll.data45 = res.data[44].reward;this.formAll.data46 = res.data[45].reward;this.formAll.data47 = res.data[46].reward;this.formAll.data48 = res.data[47].reward;
            this.formAll.id1 = res.data[0].id;this.formAll.id2 = res.data[1].id;this.formAll.id3 = res.data[2].id;this.formAll.id4 = res.data[3].id;
            this.formAll.id5 = res.data[4].id;this.formAll.id6 = res.data[5].id;this.formAll.id7 = res.data[6].id;this.formAll.id8 = res.data[7].id;
            this.formAll.id9 = res.data[8].id;this.formAll.id10 = res.data[9].id;this.formAll.id11 = res.data[10].id;this.formAll.id12 = res.data[11].id;
            this.formAll.id13 = res.data[12].id;this.formAll.id14 = res.data[13].id;this.formAll.id15 = res.data[14].id;this.formAll.id16 = res.data[15].id;
            this.formAll.id17 = res.data[16].id;this.formAll.id18 = res.data[17].id;this.formAll.id19 = res.data[18].id;this.formAll.id20 = res.data[19].id;
            this.formAll.id21 = res.data[20].id;this.formAll.id22 = res.data[21].id;this.formAll.id23 = res.data[22].id;this.formAll.id24 = res.data[23].id;
            this.formAll.id25 = res.data[24].id;this.formAll.id26 = res.data[25].id;this.formAll.id27 = res.data[26].id;this.formAll.id28 = res.data[27].id;
            this.formAll.id29 = res.data[28].id;this.formAll.id30 = res.data[29].id;this.formAll.id31 = res.data[30].id;this.formAll.id32 = res.data[31].id;
            this.formAll.id33 = res.data[32].id;this.formAll.id34 = res.data[33].id;this.formAll.id35 = res.data[34].id;this.formAll.id36 = res.data[35].id;
            this.formAll.id37 = res.data[36].id;this.formAll.id38 = res.data[37].id;this.formAll.id39 = res.data[38].id;this.formAll.id40 = res.data[39].id;
            this.formAll.id41 = res.data[40].id;this.formAll.id42 = res.data[41].id;this.formAll.id43 = res.data[42].id;this.formAll.id44 = res.data[43].id;
            this.formAll.id45 = res.data[44].id;this.formAll.id46 = res.data[45].id;this.formAll.id47 = res.data[46].id;this.formAll.id48 = res.data[47].id;
                      
           })
         },

    changeList(){
            eventBus.$emit('pushListtwo')
        },   
//    修改
   updata_data(){
        this.FormData = {aflcDriverOrderamountDetailList:[
           {startPrice:this.formAll.reward1,endPrice:this.formAll.reward2,rewardGrade:'未分类',reward:this.formAll.data1,orderNum:this.formAll.maxnum1,id:this.formAll.id1},
           {startPrice:this.formAll.reward3,endPrice:this.formAll.reward4,rewardGrade:'未分类',reward:this.formAll.data2,orderNum:this.formAll.maxnum1,id:this.formAll.id2},
           {startPrice:this.formAll.reward5,endPrice:this.formAll.reward6,rewardGrade:'未分类',reward:this.formAll.data3,orderNum:this.formAll.maxnum1,id:this.formAll.id3},
           {startPrice:this.formAll.reward7,endPrice:this.formAll.reward8,rewardGrade:'未分类',reward:this.formAll.data4,orderNum:this.formAll.maxnum1,id:this.formAll.id4},
           {startPrice:this.formAll.reward9,endPrice:this.formAll.reward10,rewardGrade:'未分类',reward:this.formAll.data5,orderNum:this.formAll.maxnum1,id:this.formAll.id5},
           {startPrice:this.formAll.reward11,endPrice:this.formAll.reward12,rewardGrade:'未分类',reward:this.formAll.data6,orderNum:this.formAll.maxnum1,id:this.formAll.id6},
           {startPrice:this.formAll.reward13,endPrice:this.formAll.reward14,rewardGrade:'未分类',reward:this.formAll.data7,orderNum:this.formAll.maxnum1,id:this.formAll.id7},
           {startPrice:this.formAll.reward15,endPrice:this.formAll.reward16,rewardGrade:'未分类',reward:this.formAll.data8,orderNum:this.formAll.maxnum1,id:this.formAll.id8},
                      {startPrice:this.formAll.reward1,endPrice:this.formAll.reward2,rewardGrade:'普通',reward:this.formAll.data9,orderNum:this.formAll.maxnum2,id:this.formAll.id9},
           {startPrice:this.formAll.reward3,endPrice:this.formAll.reward4,rewardGrade:'普通',reward:this.formAll.data10,orderNum:this.formAll.maxnum2,id:this.formAll.id10},
           {startPrice:this.formAll.reward5,endPrice:this.formAll.reward6,rewardGrade:'普通',reward:this.formAll.data11,orderNum:this.formAll.maxnum2,id:this.formAll.id11},
           {startPrice:this.formAll.reward7,endPrice:this.formAll.reward8,rewardGrade:'普通',reward:this.formAll.data12,orderNum:this.formAll.maxnum2,id:this.formAll.id12},
           {startPrice:this.formAll.reward9,endPrice:this.formAll.reward10,rewardGrade:'普通',reward:this.formAll.data13,orderNum:this.formAll.maxnum2,id:this.formAll.id13},
           {startPrice:this.formAll.reward11,endPrice:this.formAll.reward12,rewardGrade:'普通',reward:this.formAll.data14,orderNum:this.formAll.maxnum2,id:this.formAll.id14},
           {startPrice:this.formAll.reward13,endPrice:this.formAll.reward14,rewardGrade:'普通',reward:this.formAll.data15,orderNum:this.formAll.maxnum2,id:this.formAll.id15},
           {startPrice:this.formAll.reward15,endPrice:this.formAll.reward16,rewardGrade:'普通',reward:this.formAll.data16,orderNum:this.formAll.maxnum2,id:this.formAll.id16},
                      {startPrice:this.formAll.reward1,endPrice:this.formAll.reward2,rewardGrade:'银牌',reward:this.formAll.data17,orderNum:this.formAll.maxnum3,id:this.formAll.id17},
           {startPrice:this.formAll.reward3,endPrice:this.formAll.reward4,rewardGrade:'银牌',reward:this.formAll.data18,orderNum:this.formAll.maxnum3,id:this.formAll.id18},
           {startPrice:this.formAll.reward5,endPrice:this.formAll.reward6,rewardGrade:'银牌',reward:this.formAll.data19,orderNum:this.formAll.maxnum3,id:this.formAll.id19},
           {startPrice:this.formAll.reward7,endPrice:this.formAll.reward8,rewardGrade:'银牌',reward:this.formAll.data20,orderNum:this.formAll.maxnum3,id:this.formAll.id20},
           {startPrice:this.formAll.reward9,endPrice:this.formAll.reward10,rewardGrade:'银牌',reward:this.formAll.data21,orderNum:this.formAll.maxnum3,id:this.formAll.id21},
           {startPrice:this.formAll.reward11,endPrice:this.formAll.reward12,rewardGrade:'银牌',reward:this.formAll.data22,orderNum:this.formAll.maxnum3,id:this.formAll.id22},
           {startPrice:this.formAll.reward13,endPrice:this.formAll.reward14,rewardGrade:'银牌',reward:this.formAll.data23,orderNum:this.formAll.maxnum3,id:this.formAll.id23},
           {startPrice:this.formAll.reward15,endPrice:this.formAll.reward16,rewardGrade:'银牌',reward:this.formAll.data24,orderNum:this.formAll.maxnum3,id:this.formAll.id24},
                      {startPrice:this.formAll.reward1,endPrice:this.formAll.reward2,rewardGrade:'金牌',reward:this.formAll.data25,orderNum:this.formAll.maxnum4,id:this.formAll.id25},
           {startPrice:this.formAll.reward3,endPrice:this.formAll.reward4,rewardGrade:'金牌',reward:this.formAll.data26,orderNum:this.formAll.maxnum4,id:this.formAll.id26},
           {startPrice:this.formAll.reward5,endPrice:this.formAll.reward6,rewardGrade:'金牌',reward:this.formAll.data27,orderNum:this.formAll.maxnum4,id:this.formAll.id27},
           {startPrice:this.formAll.reward7,endPrice:this.formAll.reward8,rewardGrade:'金牌',reward:this.formAll.data28,orderNum:this.formAll.maxnum4,id:this.formAll.id28},
           {startPrice:this.formAll.reward9,endPrice:this.formAll.reward10,rewardGrade:'金牌',reward:this.formAll.data29,orderNum:this.formAll.maxnum4,id:this.formAll.id29},
           {startPrice:this.formAll.reward11,endPrice:this.formAll.reward12,rewardGrade:'金牌',reward:this.formAll.data30,orderNum:this.formAll.maxnum4,id:this.formAll.id30},
           {startPrice:this.formAll.reward13,endPrice:this.formAll.reward14,rewardGrade:'金牌',reward:this.formAll.data31,orderNum:this.formAll.maxnum4,id:this.formAll.id31},
           {startPrice:this.formAll.reward15,endPrice:this.formAll.reward16,rewardGrade:'金牌',reward:this.formAll.data32,orderNum:this.formAll.maxnum4,id:this.formAll.id32},
                      {startPrice:this.formAll.reward1,endPrice:this.formAll.reward2,rewardGrade:'钻石',reward:this.formAll.data33,orderNum:this.formAll.maxnum5,id:this.formAll.id33},
           {startPrice:this.formAll.reward3,endPrice:this.formAll.reward4,rewardGrade:'钻石',reward:this.formAll.data34,orderNum:this.formAll.maxnum5,id:this.formAll.id34},
           {startPrice:this.formAll.reward5,endPrice:this.formAll.reward6,rewardGrade:'钻石',reward:this.formAll.data35,orderNum:this.formAll.maxnum5,id:this.formAll.id35},
           {startPrice:this.formAll.reward7,endPrice:this.formAll.reward8,rewardGrade:'钻石',reward:this.formAll.data36,orderNum:this.formAll.maxnum5,id:this.formAll.id36},
           {startPrice:this.formAll.reward9,endPrice:this.formAll.reward10,rewardGrade:'钻石',reward:this.formAll.data37,orderNum:this.formAll.maxnum5,id:this.formAll.id37},
           {startPrice:this.formAll.reward11,endPrice:this.formAll.reward12,rewardGrade:'钻石',reward:this.formAll.data38,orderNum:this.formAll.maxnum5,id:this.formAll.id38},
           {startPrice:this.formAll.reward13,endPrice:this.formAll.reward14,rewardGrade:'钻石',reward:this.formAll.data39,orderNum:this.formAll.maxnum5,id:this.formAll.id39},
           {startPrice:this.formAll.reward15,endPrice:this.formAll.reward16,rewardGrade:'钻石',reward:this.formAll.data40,orderNum:this.formAll.maxnum5,id:this.formAll.id40},
                      {startPrice:this.formAll.reward1,endPrice:this.formAll.reward2,rewardGrade:'皇冠',reward:this.formAll.data41,orderNum:this.formAll.maxnum6,id:this.formAll.id41},
           {startPrice:this.formAll.reward3,endPrice:this.formAll.reward4,rewardGrade:'皇冠',reward:this.formAll.data42,orderNum:this.formAll.maxnum6,id:this.formAll.id42},
           {startPrice:this.formAll.reward5,endPrice:this.formAll.reward6,rewardGrade:'皇冠',reward:this.formAll.data43,orderNum:this.formAll.maxnum6,id:this.formAll.id43},
           {startPrice:this.formAll.reward7,endPrice:this.formAll.reward8,rewardGrade:'皇冠',reward:this.formAll.data44,orderNum:this.formAll.maxnum6,id:this.formAll.id44},
           {startPrice:this.formAll.reward9,endPrice:this.formAll.reward10,rewardGrade:'皇冠',reward:this.formAll.data45,orderNum:this.formAll.maxnum6,id:this.formAll.id45},
           {startPrice:this.formAll.reward11,endPrice:this.formAll.reward12,rewardGrade:'皇冠',reward:this.formAll.data46,orderNum:this.formAll.maxnum6,id:this.formAll.id46},
           {startPrice:this.formAll.reward13,endPrice:this.formAll.reward14,rewardGrade:'皇冠',reward:this.formAll.data47,orderNum:this.formAll.maxnum6,id:this.formAll.id47},
           {startPrice:this.formAll.reward15,endPrice:this.formAll.reward16,rewardGrade:'皇冠',reward:this.formAll.data48,orderNum:this.formAll.maxnum6,id:this.formAll.id48},           
           ]}
       var forms= Object.assign({}, this.FormData,{areaCode2:this.formAll.areaCode2},{rewardMax:this.formAll.rewardMax},{carType:this.formAll.carType},{serivceCode:this.formAll.serivceCode},{id:this.params.id},{usingStatus:this.formAll.usingStatus});
       this.$refs['formAll'].validate(valid=>{
        if(valid){
        data_get_ownerFromsame_update(forms).then(res=>{
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
<style lang="scss" >
    .newMarketingOrder{
        .el-dialog{
            width: 1000px!important;
            max-height: 100%;
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
          z-index:101!important;
        }
        .el-dialog__footer{
            padding: 20px 20px 20px;
        }
       .el-dialog{
           overflow: unset;
       }
    }
    .creatOrder{
        .el-button {
                margin-right: 20px;
                padding: 10px 20px;
        }
        .el-dialog__footer{
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
        .ht_table{
        width: 980px;
        margin:10px 10px;
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
                width:90%;
                .el-input__inner{
                    line-height: 30px;
                    height: 30px;
                    padding:0px!important;
                    text-indent:5px;
                }
            }
            .Order_input{
                width: 40px;
            }
            .el-form-item__error{
                z-index:100;
            }
        }
        }
    }
</style>