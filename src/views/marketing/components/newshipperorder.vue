<template>
     <div class="creatOrder commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newMarketingOrder">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm">
          <el-row >
              <el-col :span="12">
                <el-form-item label="所属区域：" :label-width="formLabelWidth" prop="areaCode2">
                    <vregion :ui="true" @values="regionChange" class="form-control">
                        <el-input v-model="formAll.areaCode2" placeholder="请选择省/市/区/街道"></el-input>
                    </vregion>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="区域奖励额度上限：" :label-width="formLabelWidth" prop="rewardMax">
                        <el-input v-model="formAll.rewardMax" placeholder="请选择区域奖励额度上限" maxlength='7'></el-input>
                </el-form-item>
                </el-col>
            </el-row>
              <el-row>
                  <el-col :span="12">
                <el-form-item label="服务分类：" :label-width="formLabelWidth" prop="serivceCode">
                 <el-select v-model="formAll.serivceCode" clearable placeholder="请选择" >
                          <el-option
                             v-for="item in serviceCardList"
                              :key="item.code"
                             :label="item.name"
                              :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
                </el-form-item>
                 </el-col>
                <el-col :span="12">
                <el-form-item label="车辆类型：" :label-width="formLabelWidth" prop="carType">
                 <el-select v-model="formAll.carType" clearable placeholder="请选择" >
                          <el-option
                             v-for="item in optionsCar"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
                </el-form-item>                                
                  </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
             <table class="ht_table">
            <tbody>
             <tr>
             <th width="100"  rowspan="2">货主奖励等级</th>
             <th colspan="8">订单金额范围</th> 
             <th width="80"   rowspan="2">一天限量</th>
            </tr>
            <tr>
              <td><el-form-item prop="reward1"><el-input class="Order_input" v-model="formAll.reward1" ref='reward1' maxlength='5'></el-input></el-form-item>-<el-form-item prop="reward2"><el-input class="Order_input" v-model="formAll.reward2" ref='reward2'  maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward3"><el-input class="Order_input" v-model="formAll.reward3" ref='reward3' maxlength='5'></el-input></el-form-item>-<el-form-item prop="reward4"><el-input class="Order_input" v-model="formAll.reward4" ref='reward4'  maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward5"><el-input class="Order_input" v-model="formAll.reward5" ref='reward5' maxlength='5'></el-input></el-form-item>-<el-form-item prop="reward6"><el-input class="Order_input" v-model="formAll.reward6" ref='reward6'  maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward7"><el-input class="Order_input" v-model="formAll.reward7" ref='reward7' maxlength='5'></el-input></el-form-item>-<el-form-item prop="reward8"><el-input class="Order_input" v-model="formAll.reward8" ref='reward8'  maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward9"><el-input class="Order_input" v-model="formAll.reward9" ref='reward9' maxlength='5'></el-input></el-form-item>-<el-form-item prop="reward10"><el-input class="Order_input" v-model="formAll.reward10" ref='reward10'  maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward11"><el-input class="Order_input" v-model="formAll.reward11" ref='reward11' maxlength='5'></el-input></el-form-item>-<el-form-item prop="reward12"><el-input class="Order_input" v-model="formAll.reward12" ref='reward12'  maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward13"><el-input class="Order_input" v-model="formAll.reward13" ref='reward13' maxlength='5'></el-input></el-form-item>-<el-form-item prop="reward14"><el-input class="Order_input" v-model="formAll.reward14" ref='reward14'  maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward15"><el-input class="Order_input" v-model="formAll.reward15" ref='reward15' maxlength='5'></el-input></el-form-item>-<el-form-item prop="reward16"><el-input class="Order_input" v-model="formAll.reward16" ref='reward16'  maxlength='5'></el-input></el-form-item></td> 
            </tr>
            <tr>
              <td>未分类</td>
              <td><el-form-item prop="data1" size = '50'><el-input v-model="formAll.data1" maxlength='3'></el-input></el-form-item></td>
              <td><el-form-item prop="data2" size = '50'><el-input v-model="formAll.data2" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data3" size = '50'><el-input v-model="formAll.data3" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data4" size = '50'><el-input v-model="formAll.data4" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data5" size = '50'><el-input v-model="formAll.data5" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data6" size = '50'><el-input v-model="formAll.data6" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data7" size = '50'><el-input v-model="formAll.data7" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data8" size = '50'><el-input v-model="formAll.data8" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum1" size = '50'><el-input v-model="formAll.maxnum1" maxlength='5'></el-input></el-form-item></td>   
            </tr>
             <tr>
              <td>普通</td>
              <td><el-form-item prop="data9" size = '50'><el-input v-model="formAll.data9" maxlength='3'></el-input></el-form-item></td>
              <td><el-form-item prop="data10" size = '50'><el-input v-model="formAll.data10" maxlength='3'></el-input></el-form-item></td>
              <td><el-form-item prop="data11" size = '50'><el-input v-model="formAll.data11" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data12" size = '50'><el-input v-model="formAll.data12" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data13" size = '50'><el-input v-model="formAll.data13" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data14" size = '50'><el-input v-model="formAll.data14" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data15" size = '50'><el-input v-model="formAll.data15" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data16" size = '50'><el-input v-model="formAll.data16" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum2" size = '50'><el-input v-model="formAll.maxnum2" maxlength='5'></el-input></el-form-item></td> 

            </tr>
            <tr>
              <td>银牌</td>
              <td><el-form-item prop="data17" size = '50'><el-input v-model="formAll.data17" maxlength='3'></el-input></el-form-item></td>
              <td><el-form-item prop="data18" size = '50'><el-input v-model="formAll.data18" maxlength='3'></el-input></el-form-item></td>   
              <td><el-form-item prop="data19" size = '50'><el-input v-model="formAll.data19" maxlength='3'></el-input></el-form-item></td>
              <td><el-form-item prop="data20" size = '50'><el-input v-model="formAll.data20" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data21" size = '50'><el-input v-model="formAll.data21" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data22" size = '50'><el-input v-model="formAll.data22" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data23" size = '50'><el-input v-model="formAll.data23" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data24" size = '50'><el-input v-model="formAll.data24" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum3" size = '50'><el-input v-model="formAll.maxnum3" maxlength='5'></el-input></el-form-item></td>  
            </tr>
             <tr>
              <td>金牌</td>
              <td><el-form-item prop="data25" size = '50'><el-input v-model="formAll.data25" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data26" size = '50'><el-input v-model="formAll.data26" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data27" size = '50'><el-input v-model="formAll.data27" maxlength='3'></el-input></el-form-item></td>                
              <td><el-form-item prop="data28" size = '50'><el-input v-model="formAll.data28" maxlength='3'></el-input></el-form-item></td>
              <td><el-form-item prop="data29" size = '50'><el-input v-model="formAll.data29" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data30" size = '50'><el-input v-model="formAll.data30" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data31" size = '50'><el-input v-model="formAll.data31" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data32" size = '50'><el-input v-model="formAll.data32" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum4" size = '50'><el-input v-model="formAll.maxnum4" maxlength='5'></el-input></el-form-item></td>   
            </tr>
            <tr>
              <td>钻石</td>
              <td><el-form-item prop="data33" size = '50'><el-input v-model="formAll.data33" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data34" size = '50'><el-input v-model="formAll.data34" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data35" size = '50'><el-input v-model="formAll.data35" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data36" size = '50'><el-input v-model="formAll.data36" maxlength='3'></el-input></el-form-item></td>
              <td><el-form-item prop="data37" size = '50'><el-input v-model="formAll.data37" maxlength='3'></el-input></el-form-item></td>
              <td><el-form-item prop="data38" size = '50'><el-input v-model="formAll.data38" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data39" size = '50'><el-input v-model="formAll.data39" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data40" size = '50'><el-input v-model="formAll.data40" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum5" size = '50'><el-input v-model="formAll.maxnum5" maxlength='5'></el-input></el-form-item></td>  
            </tr>
             <tr>
              <td>皇冠</td>
              <td><el-form-item prop="data41" size = '50'><el-input v-model="formAll.data41" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data42" size = '50'><el-input v-model="formAll.data42" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data43" size = '50'><el-input v-model="formAll.data43" maxlength='3'></el-input></el-form-item></td>
              <td><el-form-item prop="data44" size = '50'><el-input v-model="formAll.data44" maxlength='3'></el-input></el-form-item></td>  
              <td><el-form-item prop="data45" size = '50'><el-input v-model="formAll.data45" maxlength='3'></el-input></el-form-item></td>   
              <td><el-form-item prop="data46" size = '50'><el-input v-model="formAll.data46" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data47" size = '50'><el-input v-model="formAll.data47" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="data48" size = '50'><el-input v-model="formAll.data48" maxlength='3'></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum6" size = '50'><el-input v-model="formAll.maxnum6" maxlength='5'></el-input></el-form-item></td>   
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
import { data_get_shipperOwnerFrom_create} from '@/api/marketing/shippermarkting/shipperOwner.js'
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
        optionsCar:[],
        serviceCardList:[],
        FormData:null,
        formAll:{
            areaCode2: null,
            rewardMax:null,
            carType:null,
            serivceCode:null,
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
      this.$refs['formAll'].resetFields();  
   },
   close:function(){
      this.dialogFormVisible_add = false;
      this.$refs['formAll'].resetFields();
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
                          console.log('a',item)
                       this.serviceCardList.push(item);
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
       this.FormData = {aflcShipperPreferentialtDetailList:[
           {startPrice:this.formAll.reward1,endPrice:this.formAll.reward2,rewardGrade:'未分类',reward:this.formAll.data1,orderNum:this.formAll.maxnum1},
           {startPrice:this.formAll.reward3,endPrice:this.formAll.reward4,rewardGrade:'未分类',reward:this.formAll.data2,orderNum:this.formAll.maxnum1},
           {startPrice:this.formAll.reward5,endPrice:this.formAll.reward6,rewardGrade:'未分类',reward:this.formAll.data3,orderNum:this.formAll.maxnum1},
           {startPrice:this.formAll.reward7,endPrice:this.formAll.reward8,rewardGrade:'未分类',reward:this.formAll.data4,orderNum:this.formAll.maxnum1},
           {startPrice:this.formAll.reward9,endPrice:this.formAll.reward10,rewardGrade:'未分类',reward:this.formAll.data5,orderNum:this.formAll.maxnum1},
           {startPrice:this.formAll.reward11,endPrice:this.formAll.reward12,rewardGrade:'未分类',reward:this.formAll.data6,orderNum:this.formAll.maxnum1},
           {startPrice:this.formAll.reward13,endPrice:this.formAll.reward14,rewardGrade:'未分类',reward:this.formAll.data7,orderNum:this.formAll.maxnum1},
           {startPrice:this.formAll.reward15,endPrice:this.formAll.reward16,rewardGrade:'未分类',reward:this.formAll.data8,orderNum:this.formAll.maxnum1},
                      {startPrice:this.formAll.reward1,endPrice:this.formAll.reward2,rewardGrade:'普通',reward:this.formAll.data9,orderNum:this.formAll.maxnum2},
           {startPrice:this.formAll.reward3,endPrice:this.formAll.reward4,rewardGrade:'普通',reward:this.formAll.data10,orderNum:this.formAll.maxnum2},
           {startPrice:this.formAll.reward5,endPrice:this.formAll.reward6,rewardGrade:'普通',reward:this.formAll.data11,orderNum:this.formAll.maxnum2},
           {startPrice:this.formAll.reward7,endPrice:this.formAll.reward8,rewardGrade:'普通',reward:this.formAll.data12,orderNum:this.formAll.maxnum2},
           {startPrice:this.formAll.reward9,endPrice:this.formAll.reward10,rewardGrade:'普通',reward:this.formAll.data13,orderNum:this.formAll.maxnum2},
           {startPrice:this.formAll.reward11,endPrice:this.formAll.reward12,rewardGrade:'普通',reward:this.formAll.data14,orderNum:this.formAll.maxnum2},
           {startPrice:this.formAll.reward13,endPrice:this.formAll.reward14,rewardGrade:'普通',reward:this.formAll.data15,orderNum:this.formAll.maxnum2},
           {startPrice:this.formAll.reward15,endPrice:this.formAll.reward16,rewardGrade:'普通',reward:this.formAll.data16,orderNum:this.formAll.maxnum2},
                      {startPrice:this.formAll.reward1,endPrice:this.formAll.reward2,rewardGrade:'银牌',reward:this.formAll.data17,orderNum:this.formAll.maxnum3},
           {startPrice:this.formAll.reward3,endPrice:this.formAll.reward4,rewardGrade:'银牌',reward:this.formAll.data18,orderNum:this.formAll.maxnum3},
           {startPrice:this.formAll.reward5,endPrice:this.formAll.reward6,rewardGrade:'银牌',reward:this.formAll.data19,orderNum:this.formAll.maxnum3},
           {startPrice:this.formAll.reward7,endPrice:this.formAll.reward8,rewardGrade:'银牌',reward:this.formAll.data20,orderNum:this.formAll.maxnum3},
           {startPrice:this.formAll.reward9,endPrice:this.formAll.reward10,rewardGrade:'银牌',reward:this.formAll.data21,orderNum:this.formAll.maxnum3},
           {startPrice:this.formAll.reward11,endPrice:this.formAll.reward12,rewardGrade:'银牌',reward:this.formAll.data22,orderNum:this.formAll.maxnum3},
           {startPrice:this.formAll.reward13,endPrice:this.formAll.reward14,rewardGrade:'银牌',reward:this.formAll.data23,orderNum:this.formAll.maxnum3},
           {startPrice:this.formAll.reward15,endPrice:this.formAll.reward16,rewardGrade:'银牌',reward:this.formAll.data24,orderNum:this.formAll.maxnum3},
                      {startPrice:this.formAll.reward1,endPrice:this.formAll.reward2,rewardGrade:'金牌',reward:this.formAll.data25,orderNum:this.formAll.maxnum4},
           {startPrice:this.formAll.reward3,endPrice:this.formAll.reward4,rewardGrade:'金牌',reward:this.formAll.data26,orderNum:this.formAll.maxnum4},
           {startPrice:this.formAll.reward5,endPrice:this.formAll.reward6,rewardGrade:'金牌',reward:this.formAll.data27,orderNum:this.formAll.maxnum4},
           {startPrice:this.formAll.reward7,endPrice:this.formAll.reward8,rewardGrade:'金牌',reward:this.formAll.data28,orderNum:this.formAll.maxnum4},
           {startPrice:this.formAll.reward9,endPrice:this.formAll.reward10,rewardGrade:'金牌',reward:this.formAll.data29,orderNum:this.formAll.maxnum4},
           {startPrice:this.formAll.reward11,endPrice:this.formAll.reward12,rewardGrade:'金牌',reward:this.formAll.data30,orderNum:this.formAll.maxnum4},
           {startPrice:this.formAll.reward13,endPrice:this.formAll.reward14,rewardGrade:'金牌',reward:this.formAll.data31,orderNum:this.formAll.maxnum4},
           {startPrice:this.formAll.reward15,endPrice:this.formAll.reward16,rewardGrade:'金牌',reward:this.formAll.data32,orderNum:this.formAll.maxnum4},
                      {startPrice:this.formAll.reward1,endPrice:this.formAll.reward2,rewardGrade:'钻石',reward:this.formAll.data33,orderNum:this.formAll.maxnum5},
           {startPrice:this.formAll.reward3,endPrice:this.formAll.reward4,rewardGrade:'钻石',reward:this.formAll.data34,orderNum:this.formAll.maxnum5},
           {startPrice:this.formAll.reward5,endPrice:this.formAll.reward6,rewardGrade:'钻石',reward:this.formAll.data35,orderNum:this.formAll.maxnum5},
           {startPrice:this.formAll.reward7,endPrice:this.formAll.reward8,rewardGrade:'钻石',reward:this.formAll.data36,orderNum:this.formAll.maxnum5},
           {startPrice:this.formAll.reward9,endPrice:this.formAll.reward10,rewardGrade:'钻石',reward:this.formAll.data37,orderNum:this.formAll.maxnum5},
           {startPrice:this.formAll.reward11,endPrice:this.formAll.reward12,rewardGrade:'钻石',reward:this.formAll.data38,orderNum:this.formAll.maxnum5},
           {startPrice:this.formAll.reward13,endPrice:this.formAll.reward14,rewardGrade:'钻石',reward:this.formAll.data39,orderNum:this.formAll.maxnum5},
           {startPrice:this.formAll.reward15,endPrice:this.formAll.reward16,rewardGrade:'钻石',reward:this.formAll.data40,orderNum:this.formAll.maxnum5},
                      {startPrice:this.formAll.reward1,endPrice:this.formAll.reward2,rewardGrade:'皇冠',reward:this.formAll.data41,orderNum:this.formAll.maxnum6},
           {startPrice:this.formAll.reward3,endPrice:this.formAll.reward4,rewardGrade:'皇冠',reward:this.formAll.data42,orderNum:this.formAll.maxnum6},
           {startPrice:this.formAll.reward5,endPrice:this.formAll.reward6,rewardGrade:'皇冠',reward:this.formAll.data43,orderNum:this.formAll.maxnum6},
           {startPrice:this.formAll.reward7,endPrice:this.formAll.reward8,rewardGrade:'皇冠',reward:this.formAll.data44,orderNum:this.formAll.maxnum6},
           {startPrice:this.formAll.reward9,endPrice:this.formAll.reward10,rewardGrade:'皇冠',reward:this.formAll.data45,orderNum:this.formAll.maxnum6},
           {startPrice:this.formAll.reward11,endPrice:this.formAll.reward12,rewardGrade:'皇冠',reward:this.formAll.data46,orderNum:this.formAll.maxnum6},
           {startPrice:this.formAll.reward13,endPrice:this.formAll.reward14,rewardGrade:'皇冠',reward:this.formAll.data47,orderNum:this.formAll.maxnum6},
           {startPrice:this.formAll.reward15,endPrice:this.formAll.reward16,rewardGrade:'皇冠',reward:this.formAll.data48,orderNum:this.formAll.maxnum6},           
           ]}
       var forms= Object.assign({}, this.FormData,{areaCode2:this.formAll.areaCode2},{rewardMax:this.formAll.rewardMax},{carType:this.formAll.carType},{serivceCode:this.formAll.serivceCode});
       console.log('forms',forms)
       this.$refs['formAll'].validate(valid=>{
        if(valid){
        data_get_shipperOwnerFrom_create(forms).then(res=>{
            console.log('res',res);
            this.$refs['formAll'].resetFields();
            this.dialogFormVisible_add = false;
            this.changeList();
        }).catch(res=>{
            console.log(res)
       });

       }
       }
       )
   },
//    车主奖励修改
   updata_data(){
       this.$refs['formAll'].validate(valid=>{
        var forms= Object.assign({}, this.formAll);
        if(valid){

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
            text-align:center;
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