<template>
  <div class="drivercertify commoncss">
    <el-button type="primary" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
    <el-dialog :title="btntext" :visible.sync="freezeDialogFlag" :before-close="change()" v-dialogDrag top=5vh>
 <el-form :model="templateModel" ref="templateModel" :rules="rulesForm" inline modal-append-to-body>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号：" :label-width="formLabelWidth" prop="driverMobile">
                        <el-input v-model="templateModel.driverMobile" disabled v-numberOnly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车主：" :label-width="formLabelWidth" prop="driverName">
                        <el-input v-model="templateModel.driverName" :maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="身份证号码：" :label-width="formLabelWidth" prop="driverCardid">
                        <el-input v-model="templateModel.driverCardid" :maxlength="18"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
              <el-form-item label="所在地 ："  :label-width="formLabelWidth" prop="belongCityName">
                    <vregion :ui="true"  @values="regionChange" class="form-control" >
                        <el-input v-model="templateModel.belongCityName" placeholder="请选择" ></el-input>
                    </vregion>
              </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="车牌号：" :label-width="formLabelWidth" prop="carNumber">
                        <el-input v-model="templateModel.carNumber" :maxlength="8"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车型：" :label-width="formLabelWidth" prop="carType">
                        <el-select v-model="templateModel.carType" placeholder="请选择">
                            <el-option
                                v-for="item in optionscarType"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="车长(米)：" :label-width="formLabelWidth"  prop="carLength">
                      <el-input
                            class="lessWidth"
                            placeholder="长"
                            v-model="templateModel.carLength"
                            clearable
                            ref="lengths"
                            :maxlength="5"
                            >
                        </el-input>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth" prop="carWidth">
                        <el-input
                            class="lessWidth"
                            placeholder="宽"
                            v-model="templateModel.carWidth"
                            clearable
                            ref="widths"
                            :maxlength="5"
                            >
                        </el-input>
                    </el-form-item>
                    <el-form-item  :label-width="formLabelWidth" prop="carHeight">
                        <el-input
                            class="lessWidth"
                            placeholder="高"
                            v-model="templateModel.carHeight"
                            clearable
                            ref="heights"
                            :maxlength="5"
                            >
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车辆规格："  :label-width="formLabelWidth">
                        <el-select v-model="templateModel.carSpec" placeholder="请选择">
                            <el-option
                                v-for="item in optionscarSpec"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
            </el-row>
              <el-row>
                  <el-col :span="12">
                      <el-form-item label="中单等级：" :label-width="formLabelWidth" prop="obtainGrade">
                            <el-select v-model="templateModel.obtainGrade" placeholder="请选择" >
                                <el-option
                                    v-for="item in optionsLevel"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="中单等级有效期至：" :label-width="formLabelWidth" prop="obtainGradeTime">
                        <el-date-picker
                            v-model="templateModel.obtainGradeTime"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            >
                        </el-date-picker>
                    </el-form-item>
                  </el-col>
              </el-row>
                  <el-row>
                  <el-col :span="12">
                      <el-form-item label="车主抽佣等级：" prop="commisionLevel" :label-width="formLabelWidth">
                            <el-select v-model="templateModel.commisionLevel" placeholder="请选择">
                                <el-option
                                    v-for="item in MaidLevelType"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="车主奖励等级：" prop="rewardgrade" :label-width="formLabelWidth">
                            <el-select v-model="templateModel.rewardgrade" placeholder="请选择">
                                <el-option
                                    v-for="item in carOwnerType"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code"
                                    >
                                </el-option>
                            </el-select>
                        </el-form-item>
                  </el-col>
            </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-form-item :label-width="formLabelWidth" label="特权车：">
                        <el-checkbox v-model="templateModel.isVipCar" true-label="1" false-label='0' @change='isVip' label="是" border size="medium" ></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="活跃值：" :label-width="formLabelWidth">
                        <el-select v-model="templateModel.activeValue" placeholder="请选择" :disabled="editType=='view'">
                            <el-option
                                v-for="item in activeValueList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
              </el-row>

            <el-row>
                <el-col :span="12">
                <el-form-item label="提交认证时间：" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="templateModel.authenticationTime"
                    type="datetime"
                    placeholder="选择日期"
                    disabled>
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="注册来源：" :label-width="formLabelWidth">
                  <el-input v-model="templateModel.registerOriginName" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="等待时长：" :label-width="formLabelWidth">
                  {{templateModel.authenticationTime|remainData}}
                </el-form-item>
              </el-col>
            </el-row>

            <div class="data_pic">
                <div class="data_pic_callingcode data_pic_c" v-viewer>
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                <div class="uploadImgBox"><img  class="picURL" :src="templateModel.carFile ? templateModel.carFile : defaultImg" /></div>
                    </el-tooltip>
                    <h2>车辆45°</h2>
                    <el-form-item prop="radio1">
                      <el-radio-group v-model="radio1" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item> 
                </div>
                <div class="data_pic_callingcode data_pic_c" v-viewer>
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
              <div class="uploadImgBox"><img  class="picURL" :src="templateModel.drivingPermitFile ? templateModel.drivingPermitFile : defaultImg" /></div>
                    </el-tooltip>
                    <h2>行驾证</h2>
                    <el-form-item prop="radio2">
                      <el-radio-group v-model="radio2" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item>
                </div>
                </div>
                <div class="data_pic">
                <div class="data_pic_callingcode data_pic_c" v-viewer>
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                 <div class="uploadImgBox"><img  class="picURL" :src="templateModel.drivingLicenceFile ? templateModel.drivingLicenceFile : defaultImg" /></div>
                    </el-tooltip>
                    <h2>驾驶证</h2>
                    <el-form-item prop="radio3">
                      <el-radio-group v-model="radio3" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item>
                </div>
                <div class="data_pic_callingcode data_pic_c" v-viewer>
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                  <div class="uploadImgBox"> <img  class="picURL" :src="templateModel.takeIdCardFile ? templateModel.takeIdCardFile : defaultImg" /></div>
                    </el-tooltip>
                    <h2>手持身份证</h2>
                    <el-form-item prop="radio3">
                      <el-radio-group v-model="radio5" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item>
                </div>
                 </div>
                <div class="data_pic">
                <div class="data_pic_callingcode data_pic_c" v-viewer>
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                  <div class="uploadImgBox"><img  class="picURL" :src="templateModel.idCardFile ? templateModel.idCardFile : defaultImg" /></div>
                    </el-tooltip>
                    <h2>身份证正面</h2>
                    <el-form-item prop="radio3">
                      <el-radio-group v-model="radio4" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item>
                </div>
                <!-- <div class="data_pic_callingcode data_pic_c" v-viewer>
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                  <div class="uploadImgBox"><img  class="picURL" :src="templateModel.idCardFileOpposite ? templateModel.idCardFileOpposite : defaultImg" /></div>
                    </el-tooltip>
                    <h2>身份证反面</h2>
                    <el-form-item prop="radio3">
                      <el-radio-group v-model="radio6" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item>
                </div> -->

            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click="handlerPass">确认审核通过</el-button>
            <el-button type="primary" plain @click="handlerOut">审核不通过</el-button>
            <el-button type="info" plain @click="freezeDialogFlag = false">取 消</el-button>
          </div>
    </el-dialog>
  </div>
</template>
<script>
import {data_post_checkDriverCardid,data_get_driver_obStatus,data_CarList,data_Get_carType,data_post_audit,data_get_shipper_carmaid,data_get_shipper_carOwner,data_get_car_ActiveValue} from '../../../api/users/carowner/total_carowner.js'
import {parseTime} from '@/utils/'
import { eventBus } from '@/eventBus'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList/city'
import vregion from '@/components/vregion/Region'
export default {
  name:'create-Change-ViewDialog',
  components:{
    Upload,
    GetCityList,
    vregion
  },
  props:{
    params:{
      type:[Object,Array],
    },
    icon:{
      type: String,
      default: ''
    },
    btntype: {
      type: String,
      default: ''
    },
    btntitle: {
      type: String,
      default: ''
    },
    plain:{
      type: Boolean,
      default: false
    },
    btntext: {
      type: String,
      default: ''
    },
    value:{
      type: String,
      default:''
    },
     editType: {
      type: String,
      default: 'edit'
    },
  },
  data(){
       // 手机号校验
        const mobileValidator = (rule, val, cb) => {
            let phoneTest = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
            !val && cb(new Error('手机号码不能为空'))
            if(!(phoneTest.test(val))){
                cb(new Error('请输入正确的手机号码格式'))
            } 
            else{
                cb()
            }
        }

    //    车主信息校验
        const driverNameValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('车主不能为空'))
            }
            else{
                cb()
            }
        }

    //    身份证信息校验
        const driverCardidValidator = (rule, val, cb) => {
            !val && cb(new Error('身份证不能为空'))
             let IdTest = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
            if(!(IdTest.test(val))){
                cb(new Error('请输入正确的身份证'))
            }
            else{
                data_post_checkDriverCardid(val).then(res=>{
                 cb()
                }).catch(err=>{
                    console.log(err)
                        cb(new Error('该身份证已经注册~'))
                })
        }
        }
    //    选择所在地校验
        const belongCityNameValidator = (rule, val, cb) => {
             if(!val) {
                cb(new Error('请选择所在地'))
                }
             else{
                cb()
            }                
        }
   //    车牌号信息校验
        const carNumberValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('车牌号不能为空'))
            }
            else{
                cb()
            }
        }
    //   抽佣等级校验
        const rewardGradeValidator = (rule, val, cb) => {
             if(!val){
            cb(new Error('抽佣等级不能为空'))
            }
            else{
                cb()
            }
        }      
    //    车主奖励校验
        const commisionLevelValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error(' 车主奖励不能为空'))
            }
            else{
                cb()
            }
        }
    //   车主奖励等级校验    
        const rewardgradeValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('车主奖励等级不能为空'))
            }
            else{
                cb()
            }
        }

    //    车型信息校验
        const carTypeValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error(' 车型信息不能为空'))
            }
             else{
                cb()
            }
        }
    //    车长信息校验
        const carLengthValidator = (rule, val, cb) => {
            let reg=/^([0-9]|1[0-9]|2[0-9])(\.\d{1,3})?$/
            let reg2 = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/
            if(!reg2.test(val)){
            cb(new Error('输入车长须为数字'))
            }
            if(!reg.test(val)){
            cb(new Error('输入30以内数字'))
            }
            else{
                cb()
            }
        }
    //    车宽信息校验
        const carWidthValidator = (rule, val, cb) => {
            let reg=/^([0-9]|1[0-9]|2[0-9])(\.\d{1,3})?$/
            let reg2 = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/
            if(!reg2.test(val)){
            cb(new Error('输入车宽须为数字'))
            }
            if(!reg.test(val)){
            cb(new Error('输入30以内数字'))
            }
            else{
                cb()
            }
        }
    //    车高信息校验
        const carHeightValidator = (rule, val, cb) => {
            let reg=/^([0-9]|1[0-9]|2[0-9])(\.\d{1,3})?$/
            let reg2 = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/
            if(!reg2.test(val)){
            cb(new Error('输入车高须为数字'))
            }
            if(!reg.test(val)){
            cb(new Error('输入30以内数字'))
            }
            else{
                cb()
            }
        }            
    //    车辆规格校验  
        const carSpecValidator = (rule, val, cb) => {
             if(!val) {
                    cb(new Error('请选择车辆规格'))
                }
             else{
                cb()
            }                
        }
      // 上传中单等级校验 
        const obtainGradeValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('请填写中单等级'))
            }
            else{
                cb()
            }
        }   

      // 中单等级有效期校验 
        const obtainGradeTimeValidator = (rule,val,cb)=>{
            let timestamp = (new Date()).getTime();
            if(!val){
            cb(new Error('中单等级有效期不能为空'))
            }
            else if(val<timestamp){
            cb(new Error('中单等级有效期不能早于当天'))
            }
            else{
                cb()
            }
        }   
    return{
        pickerOptions:{
        disabledDate(time) {
        return time.getTime() < Date.now();}},
        defaultImg:'/static/test.jpg',//默认第一张图片的url   
        freezeDialogFlag:false,
        templateModel:{
        driverMobile:null,
        driverName:null,
        driverCardid:null,
        belongCity:null,
        carNumber:null,
        carType:null,
        carLength:null,
        carWidth:null,
        carHeight:null,
        optionscarSpec:null,
        optionsLevel:null,
        obtainGradeTime:null,
        isVipCar:'0',
        authenticationTime:null,
        registerOriginName:null,
        carFile:null,
        drivingPermitFile:null,
        drivingLicenceFile:null,
        idCardFile:null,
        takeIdCardFile:null,
        rewardGrade:null,
        commisionLevel:null,
        },   // 认证审核表单
        formLabelWidth:'150px',
        activeValueList:[],
        optionscarType:[],
        optionscarSpec:[],
        optionsLevel:[],
        MaidLevelType:[], //抽佣等级列表
        carOwnerType:[],  //奖励等级列表
        radio1:'',
        radio2:'',
        radio3:'',
        radio4:'',
        radio5:'',   
        radio6:'',     
        rulesForm:{
        driverMobile:{validator: mobileValidator, trigger:'change',required:true,},
        driverName:{validator: driverNameValidator, trigger:'change',required:true,},
        driverCardid:{validator: driverCardidValidator, trigger:'change',required:true,},
        carNumber:{validator: carNumberValidator, trigger:'change',required:true,},
        carLength:{validator: carLengthValidator, trigger:'change',required:true,},
        carWidth:{validator: carWidthValidator, trigger:'change',required:true,},
        carHeight:{validator:carHeightValidator, trigger:'change',required:true,},
        carSpec:{validator: carSpecValidator, trigger:'change',required:true,},
        carType:{validator: carTypeValidator, trigger:'change',required:true,},
        belongCity:{validator: belongCityNameValidator, trigger:'change',required:true,},     
        belongCityName:{validator: belongCityNameValidator, trigger:'change',required:true,},           
        obtainGrade:{validator:obtainGradeValidator, trigger:'change',required:true,},
        obtainGradeTime:{validator: obtainGradeTimeValidator, trigger:'change',required:true,},
        rewardGrade:{validator: rewardGradeValidator, trigger:'change',required:true,},
        commisionLevel:{validator: commisionLevelValidator, trigger:'change',required:true,},        
        rewardgrade:{validator: rewardgradeValidator, trigger:'change',required:true,},
        },        
      }
  },
  computed: {
            pictureValue () {
            return {'车辆45°':this.radio1 ,'行驾证': this.radio2,'驾驶证':this.radio3 , '手持身份证':this.radio5,'身份证正面':this.radio4}
            // return {'车辆45°':this.radio1 ,'行驾证': this.radio2,'驾驶证':this.radio3 , '手持身份证':this.radio5,'身份证正面':this.radio4,'身份证反面':this.radio6}
            }
        },  
  mounted(){
  },
    watch:{
        freezeDialogFlag:{
        handler: function(val, oldVal) {
            if(!val){
                this.$refs.templateModel.resetFields();
                this.templateModel.provinceCode=null
                this.templateModel.cityCode=null
                this.templateModel.areaCode=null
                this.radio1 = ''
                this.radio2 = ''
                this.radio3 = ''
                this.radio4 = ''
                this.radio5 = ''
                this.radio6 = ''
                if(this.$refs.area)
                {
                this.$refs.area.clearData()
                }
            }
            else{
                this.getMoreInformation()
            }
        }
        }
        },
  methods:{
    regionChange(d) {
        console.log('data:',d)
        this.templateModel.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
        if(d.area){
            this.templateModel.areaCode = d.area.name;
            this.templateModel.belongCity = d.area.code;
        }else if(d.city){
            this.templateModel.belongCity = d.city.code;
            this.templateModel.cityCode = d.city.name;
        }
        else{
            this.templateModel.belongCity = d.province.code;
            this.templateModel.provinceCode = d.province.name;
        }
    },
    getValue(obj){
        return obj ? obj.value:'';
    },    
    change(){
      this.freezeDialogFlag!=this.freezeDialogFlag
    },
    getMoreInformation(){
           // 中单等级的获取
            data_get_driver_obStatus().then(res =>{
                    this.optionsLevel = res.data
                })
            data_CarList().then(res=>{
                    this.optionscarType = res.data
                })
            data_Get_carType().then(res=>{
                this.optionscarSpec = res.data
                })         
          // 抽佣等级
            data_get_shipper_carmaid().then(res=>{
                  this.MaidLevelType = res.data
            }).catch(err =>{
                console.log(err)
            })
            // 车主奖励等级
            data_get_shipper_carOwner().then(res=>{
                  this.carOwnerType = res.data
            }).catch(err =>{
                console.log(err)
            })
            data_get_car_ActiveValue().then(res=>{
                this.activeValueList = res.data
            }).catch(err =>{
                console.log(err)
            })
    },
    // 图片质量拼接传给后台
     pictureTypeChange(){

            },            
    isVip(val){
            if(this.templateModel.isVipCar == '1'){
                this.templateModel.isVipCar = '1'
                 console.log(this.templateModel.isVipCar)
            }
            else{
                this.templateModel.isVipCar = '0'
                 console.log(this.templateModel.isVipCar)
            }   
        },      
    changeList(){
      eventBus.$emit('changeListtwo')
    },
    openDialog(){
      //冻结
        if(!this.params && this.editType !== 'add')
          {
               this.$message.warning('请选择您要操作的用户');
               return false
          }
       else if(this.params.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的用户');
               return
        }else if (this.params.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
                return
            }
        else{
        this.templateModel=this.params[0];
        this.templateModel.obtainGradeTime = parseTime(this.templateModel.obtainGradeTime,"{y}-{m}-{d}");
        this.freezeDialogFlag=true
        }
      },
            completeData(){
                //   if(this.radio6==''){
                //       this.$message.info('请勾选身份证反面照片审核结果');
                //       return false
                //   }   
                  if(this.radio4==''){
                      this.$message.info('请勾选身份证照片审核结果');
                      return false
                  }         
                  if(this.radio5==''){
                      this.$message.info('请勾选手持身份证正面照片审核结果');
                      return false
                  }    
                  if(this.radio3==''){
                      this.$message.info('请勾选驾驶证照片审核结果');
                      return false
                  }
                  if(this.radio2==''){
                      this.$message.info('请勾选行驶证照片审核结果');
                      return false
                  }
                  if(this.radio1==''){
                      this.$message.info('请勾选车辆45°照片审核结果');
                      return false
                  }
                },

  // 审核不通过
    handlerOut(){
        this.completeData()
                    if(this.completeData()==false)
                    {
                    return
                    }
                    else{
                this.$refs['templateModel'].validate((valid)=>{
                console.log(this.radio1,this.radio2,this.radio3,this.radio4,this.radio5)
                if(valid){
                    if(this.radio1=='上传合格'&&this.radio2=='上传合格'&&this.radio3=='上传合格'&&this.radio4=='上传合格'&&this.radio5=='上传合格')
                    {
                     this.$message.error('图片审核中图片全部合格，不能进行审核不通过处理')
                    }

                    // if(this.radio1=='上传合格'&&this.radio2=='上传合格'&&this.radio3=='上传合格'&&this.radio4=='上传合格'&&this.radio5=='上传合格'&&this.radio6=='上传合格')
                    // {
                    //  this.$message.error('图片审核中图片全部合格，不能进行审核不通过处理')
                    // }
                    else{
                    this.templateModel.carLength=parseFloat(this.templateModel.carLength).toFixed(2)
                    this.templateModel.carWidth=parseFloat(this.templateModel.carWidth).toFixed(2)
                    this.templateModel.carHeight= parseFloat(this.templateModel.carHeight).toFixed(2)
                    var forms=Object.assign({},this.templateModel,{driverStatus:"AF0010404"},{authNoPassCause:JSON.stringify(this.pictureValue)})
                    this.freezeDialogFlag = false;
                    data_post_audit(forms).then(res=>{
                        this.$message.success('审核不通过提交')
                        this.$emit('getData') 
                    }).catch(err=>{
                        console.log(err)
                    })
                    }
                    }
                    else{
                         this.$message.error('内容未填写完整')
                    }
                })
                }
    },         
// 审核通过
    handlerPass(){
                this.completeData()
                    if(this.completeData()==false)
                    {
                    return
                    }
                    else{
                this.$refs['templateModel'].validate((valid)=>{
                    if(valid){
                    // if(this.radio1=='上传合格'&&this.radio2=='上传合格'&&this.radio3=='上传合格'&&this.radio4=='上传合格'&&this.radio5=='上传合格'&&this.radio6=='上传合格')
                    // {

                    if(this.radio1=='上传合格'&&this.radio2=='上传合格'&&this.radio3=='上传合格'&&this.radio4=='上传合格'&&this.radio5=='上传合格')
                    {

                        this.templateModel.carLength=parseFloat(this.templateModel.carLength).toFixed(2)
                        this.templateModel.carWidth=parseFloat(this.templateModel.carWidth).toFixed(2)
                        this.templateModel.carHeight= parseFloat(this.templateModel.carHeight).toFixed(2)
                        var forms=Object.assign({},this.templateModel,{driverStatus:"AF0010403",authNoPassCause:JSON.stringify(this.pictureValue)})
                        this.freezeDialogFlag = false;
                        data_post_audit(forms).then(res=>{
                            this.$message.success('审核通过成功')
                            this.$emit('getData') 
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                    else{
                         this.$message.error('图片审核中图片有不合格的，不能进行审核通过处理')
                    }
                    }
                    else{
                         this.$message.error('内容未填写完整')
                    }
                })
                }     

    }   
    }, 
    filters:{
        remainData:(val=>{
            if(!val){
            return ''
            }
            else{
            let timeData = new Date() - val
            let timeD = timeData/1000 / 60 / 60 / 24
            let timeH = (timeData/ 1000 / 60 / 60 % 24);
           return  parseInt(timeD)+ '天'+ parseInt(timeH)+ '小时'
           }
        })
    }
}
</script>
<style lang="scss">
.drivercertify{
    .el-dialog{
       overflow: unset!important;
       width: 1200px;
       max-height: none;
       .certifyless{
         width:62px;
       }
.el-date-editor{
    width: 192px;
    .el-input__inner{
       padding-right: 0px!important;
    }
}
.data_pic{
   margin: 0 15px;
   overflow: hidden;
.data_pic_c{
    float: left;
    width: 49%;
    margin-right:2%;
    &:nth-of-type(2n) {
    margin-right:0px;
    }
    .uploadImgBox{
    width: 100%;
    height: 100%;
    }
    h2{
    line-height: 40px;
    text-align: center; 
    }
    .el-radio-group{
    width: 100%;
    margin-left: 220px;
    .el-radio{
    margin: 2px 0px;
    }
    }
    .picURL{
        width: 100%;
        height: 340px;
        cursor: pointer;
    }
    }
    }
    }
    .el-form-item__error 
    {
        z-index: 10
    }
}
</style>




