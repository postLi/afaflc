<template> 
    <div class="carNewinfo commoncss">
        <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" ><span :class="editType=='view'?'BtnInfo':''">{{btntext}}</span ></el-button>
        <el-dialog :title="btntitle" :visible="driverTemplateDialogFlag" top=5vh :before-close="change" modal-append-to-body v-dialogDrag>
             <el-form
              ref="templateModel"
              :model="templateModel"
              inline
              :rules="rulesForm"
             >
              <el-row>
                  <el-col :span="12">
                      <span v-if="editType=='view'||editType=='edit'||editType=='valetAuth'">
                    <el-form-item label="手机号：" :label-width="formLabelWidth" >
                       <el-input v-model.trim="templateModel.driverMobile" auto-complete="off" disabled></el-input>
                    </el-form-item>
                    </span>
                    <span v-else>
                    <el-form-item label="手机号：" prop="driverMobile" :label-width="formLabelWidth" >
                       <el-input v-model.trim="templateModel.driverMobile" auto-complete="off" :maxlength="11" v-numberOnly></el-input>
                    </el-form-item>
                    </span>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="车主：" prop="driverName" :label-width="formLabelWidth" >
                      <el-input v-model.trim="templateModel.driverName" :maxlength="20" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="12">
                      <span v-if="editType=='view'||editType=='edit'">
                    <el-form-item label="身份证号码："  :label-width="formLabelWidth">
                        <el-input v-model.trim="templateModel.driverCardid" disabled ></el-input>
                    </el-form-item>
                    </span>
                    <span v-else>
                     <el-form-item label="身份证号码："  :label-width="formLabelWidth" prop="driverCardid" >
                        <el-input v-model.trim="templateModel.driverCardid" :maxlength="18" ></el-input>
                    </el-form-item>
                    </span>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="车牌号：" prop="carNumber" :label-width="formLabelWidth" >
                      <el-input v-model.trim="templateModel.carNumber" :maxlength="8" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>

              <el-row>
                  <el-col :span="12">
                    <el-form-item label="车型：" prop="carType" :label-width="formLabelWidth" >
                        <el-select v-model="templateModel.carType" placeholder="请选择" :disabled="editType=='view'">
                            <el-option
                                v-for="item in options"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="车长(米)：" prop="carLength" :label-width="formLabelWidth"  >
                      <el-input
                            class="lessWidth"
                            placeholder="长"
                            v-model="templateModel.carLength"
                            clearable
                            ref="lengths"
                            :maxlength="5"
                            :disabled="editType=='view'"
                            >
                        </el-input>
                         </el-form-item>
                         <el-form-item prop="carWidth" :label-width="formLabelWidth"  >
                        <el-input
                            class="lessWidth"
                            placeholder="宽"
                            v-model="templateModel.carWidth"
                            clearable
                            ref="widths"
                            :maxlength="5"
                            :disabled="editType=='view'"
                            >
                        </el-input>
                         </el-form-item>
                         <el-form-item prop="carHeight" :label-width="formLabelWidth"  >
                        <el-input
                            class="lessWidth"
                            placeholder="高"
                            v-model="templateModel.carHeight"
                            clearable
                            ref="heights"
                            :maxlength="5"
                            :disabled="editType=='view'"
                            >
                        </el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="车辆规格：" :label-width="formLabelWidth">
                        <el-select v-model="templateModel.carSpec" placeholder="请选择" :disabled="editType=='view'">
                            <el-option
                                v-for="item in optionsType"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
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
                      <el-form-item label="中单等级：" prop="obtainGrade" :label-width="formLabelWidth">
                            <el-select v-model="templateModel.obtainGrade" placeholder="请选择" :disabled="editType=='view'">
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
                    <el-form-item label="中单等级有效期至：" prop="obtainGradeTime" :label-width="formLabelWidth" >
                        <el-date-picker
                            v-model="templateModel.obtainGradeTime"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder="选择日期"
                             :picker-options="pickerOptions"
                             :disabled="editType=='view'"
                            >
                        </el-date-picker>
                    </el-form-item>
                  </el-col>
              </el-row>

              <el-row>       
                  <el-col :span="12">
                      <el-form-item label="车主抽佣等级：" prop="commisionLevel" :label-width="formLabelWidth">
                            <el-select v-model="templateModel.commisionLevel" placeholder="请选择" :disabled="editType=='view'">
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
                            <el-select v-model="templateModel.rewardgrade" placeholder="请选择" :disabled="editType=='view'">
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
                        <el-checkbox v-model="templateModel.isVipCar" true-label="1" false-label='0' @change='isVip' label="是" border size="medium" :disabled="editType=='view'" ></el-checkbox>
                    </el-form-item>
                  </el-col>
              </el-row>
            
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="上传车辆45°照片：" :label-width="formLabelWidth" prop="carFile" class="b10" required>
                      <div class="upload" v-if="editType == 'view'" v-viewer>
                          <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                      <img :src='templateModel.carFile ? templateModel.carFile : defaultImg' alt="" >
                          </el-tooltip>
                      </div>
                      <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.carFile" v-else/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="上传车辆行驶证片：" :label-width="formLabelWidth" prop="drivingPermitFile"  class="b10">
                    <div class="upload" v-if="editType == 'view'" v-viewer>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                      <img :src='templateModel.drivingPermitFile ? templateModel.drivingPermitFile : defaultImg' alt="" >
                        </el-tooltip>
                      </div>
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.drivingPermitFile" v-else/>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="上传驾驶证照片：" :label-width="formLabelWidth" prop="drivingLicenceFile" class="b10">
                       <div class="upload" v-if="editType == 'view'" v-viewer>
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                      <img :src='templateModel.drivingLicenceFile ? templateModel.drivingLicenceFile : defaultImg' alt="" >
                    </el-tooltip>
                      </div>
                       <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.drivingLicenceFile" v-else/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="上传车主个人形象照：" :label-width="formLabelWidth" prop="takeIdCardFile" class="b10">
                     <div class="upload" v-if="editType == 'view'" v-viewer>
                         <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                      <img :src='templateModel.takeIdCardFile ? templateModel.takeIdCardFile : defaultImg' alt="" >
                         </el-tooltip>
                      </div>
                       <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.takeIdCardFile" v-else/>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="上传车主身份证正面照片：" :label-width="formLabelWidth" prop="idCardFile" class="b10">
                       <div class="upload" v-if="editType == 'view'" v-viewer>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                      <img :src='templateModel.idCardFile ? templateModel.idCardFile : defaultImg' alt="" >
                        </el-tooltip>
                      </div>
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.idCardFile" v-else/>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="12">
                    <el-form-item label="上传车主身份证反面照片：" :label-width="formLabelWidth" prop="idCardFileOpposite" class="b10">
                       <div class="upload" v-if="editType == 'view'" v-viewer>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                      <img :src='templateModel.idCardFileOpposite ? templateModel.idCardFileOpposite : defaultImg' alt="" >
                        </el-tooltip>
                      </div>
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.idCardFileOpposite" v-else/>
                    </el-form-item>
                  </el-col> -->
              </el-row>
    
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit(templateModel)" v-show="editType!='view'">确 定</el-button>
                <el-button @click="driverTemplateDialogFlag=false" v-show="editType!='view'">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import  { data_post_createDriver,data_put_changeDriver,data_CarList,data_Get_carType,data_get_driver_obStatus,data_post_driverAudit,data_post_mobileGetDriver,data_post_checkDriverCardid,data_get_shipper_carmaid,data_get_shipper_carOwner,data_get_driverName_id} from '@/api/users/carowner/total_carowner.js'
import Upload from '@/components/Upload/singleImage'
import { eventBus } from '@/eventBus'
import GetCityList from '@/components/GetCityList/city'
import vregion from '@/components/vregion/Region'
import { getDictionary } from '@/api/common.js'
export default {
    name:'template-create-view-change',
    props:{
        templateItem: {
            type:[Object,Array],
        },
        paramsView:{
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
            default: ''
        },
        count:{//数组长度
            type:Number
        },
        updataflag:{
            type: Boolean,
            default: false
        }
        
    },
    components:{
        Upload,
        GetCityList,
        vregion
    },
    data() {
       // 手机号校验
        const mobileValidator = (rule, val, cb) => {
            let phoneTest = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
            !val && cb(new Error('手机号码不能为空'))
            if(!(phoneTest.test(val))){
                cb(new Error('请输入正确的手机号码格式'))
            }
            else{
            if(this.editType=='add') {
                 data_post_mobileGetDriver(val).then(res=>{
                        cb()
                }).catch(err=>{
                  if(err){
                       cb(new Error('该手机号已经被注册~'))
                  }
                })
            }
            else{
             cb()
            }
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
    //    车牌号信息校验
        const carNumberValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('车牌号不能为空'))
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

    //    选择所在地校验
        const belongCityNameValidator = (rule, val, cb) => {
             if(!val) {
                    cb(new Error('请选择所在地'))
                }
             else{
                cb()
            }                
        }
    //    中单等级校验
        const obtainGradeValidator = (rule, val, cb) => {
             if(!val){
            cb(new Error('中单等级不能为空'))
            }
            else{
                cb()
            }
        }      
    //    中单等级有效期校验
        const obtainGradeTimeValidator = (rule, val, cb) => {
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

    //    车主奖励校验
        const rewardGradeValidator = (rule, val, cb) => {
             if(!val){
            cb(new Error('车主奖励不能为空'))
            }
            else{
                cb()
            }
        }      
    //   抽佣等级校验    
        const commisionLevelValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('抽佣等级不能为空'))
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


    // 上传车辆45°照片校验
        const carFileTimeValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('请上传车辆45°照片'))
            }
            else{
                cb()
            }
        }
        // 上传车辆行驶证片校验 
        const drivingPermitFileValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('请上传车辆行驶证片'))
            }
            else{
                cb()
            }
        }

        // 上传车辆行驶证片校验 
        const drivingLicenceFileValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('请上传车辆行驶证片'))
            }
            else{
                cb()
            }
        }
        // 上传车主个人形象照校验 
        const takeIdCardFileValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('请上传车主个人形象照'))
            }
            else{
                cb()
            }
        }   

        // 上传车主身份证正面照片校验 
        const idCardFileValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('请上传车主身份证正面照片'))
            }
            else{
                cb()
            }
        }   

        // 上传车主身份证反面照片校验 
        // const idCardFileOppositeValidator = (rule,val,cb)=>{
        //     if(!val){
        //     cb(new Error('请上传车主身份证反面照片'))
        //     }
        //     else{
        //         cb()
        //     }
        // }   
        return{
            defaultImg:'/static/test.jpg',//默认第一张图片的url
            type:'primary',
            title:null,
            text:null,
            optionsLevel:[],
            options:[], // 车型列表
            optionsType:[], // 车辆规列表
            MaidLevelType:[], //抽佣等级列表
            carOwnerType:[],  //奖励等级列表
            templateModel:{
                carType:null,
                driverMobile:null,
                driverName:null,
                carNumber:null,
                driverCardid:null,
                carSpec:null,
                carLength:null,
                carWidth:null,
                carHeight:null,
                belongCity:null,
                obtainGrade:null,
                belongCityName:null,
                obtainGradeTime:null, //中单等级有效时间
                isVipCar:'0', //特权车
                carFile:null,
                drivingLicenceFile:null,
                drivingPermitFile:null,
                idCardFile:null,
                // idCardFileOpposite:null,
                takeIdCardFile:null,
                driverId:null,
                provinceCode:null,
                cityCode:null,
                areaCode:null,
                rewardGrade:null,
                commisionLevel:null,
            },
                pickerOptions:{
                disabledDate(time) {
                return time.getTime() < Date.now();
                }
            },
            formLabelWidth:'190px',
            driverTemplateDialogFlag: false,// 弹框控制的控制
            rulesForm:{
            driverMobile:{validator: mobileValidator, trigger:'change',required:true,},
            driverName:{validator: driverNameValidator, trigger:'change',required:true,},
            driverCardid:{validator: driverCardidValidator, trigger:'change',required:true,},
            carNumber:{validator: carNumberValidator, trigger:'change',required:true,},
            carLength:{validator: carLengthValidator, trigger:'change',required:true,},
            carWidth:{validator: carWidthValidator, trigger:'change',required:true,},
            carHeight:{validator:carHeightValidator, trigger:'change',required:true,},
            carType:{validator: carTypeValidator, trigger:'change',required:true,},
            belongCity:{validator: belongCityNameValidator, trigger:'change',required:true,},
            belongCityName:{validator: belongCityNameValidator, trigger:'change',required:true,},
            obtainGrade:{validator: obtainGradeValidator, trigger:'change',required:true,},
            obtainGradeTime:{validator: obtainGradeTimeValidator, trigger:'change',required:true,},
            carFile:{validator: carFileTimeValidator, trigger:'change',},
            drivingPermitFile:{validator: drivingPermitFileValidator, trigger:'change',required:true,},
            drivingLicenceFile:{validator: drivingLicenceFileValidator, trigger:'change',required:true,},
            idCardFile:{validator: idCardFileValidator, trigger:'change',required:true,},
            // idCardFileOpposite:{validator: idCardFileOppositeValidator, trigger:'change',required:true,},
            takeIdCardFile:{validator: takeIdCardFileValidator, trigger:'change',required:true,},
            rewardGrade:{validator: rewardGradeValidator, trigger:'change',required:true,},
            commisionLevel:{validator: commisionLevelValidator, trigger:'change',required:true,},
            rewardgrade:{validator: rewardgradeValidator, trigger:'change',required:true,},
        },
        }
    },
    watch:{
        driverTemplateDialogFlag:{
        handler: function(val, oldVal) {
            if(!val){
                this.$refs.templateModel.resetFields()
                this.templateModel.belongCity = null
                this.templateModel.provinceCode=null
                this.templateModel.cityCode=null
                this.templateModel.areaCode=null
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
    mounted(){
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
        isVip(val){
            if(this.templateModel.isVipCar == '1'){
                this.templateModel.isVipCar = '1'
            }
            else{
                this.templateModel.isVipCar = '0'
            }   
        },
        // 获取对应的字典列表
        getMoreInformation(){
            data_CarList().then(res=>{
                  this.options = res.data
            }).catch(err =>{
                console.log(err)
            })
            //  获取车型列表
            data_Get_carType().then(res =>{
                    this.optionsType=res.data
            }).catch(err =>{
                console.log(err)
            })
            // 中单等级的获取
            data_get_driver_obStatus().then(res =>{
                    this.optionsLevel=res.data
            }).catch(err =>{
                console.log(err)
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

        },

        openDialog(){
            if(this.editType == 'view'){
                console.log('this.templateItem',this.paramsView)
                 this.templateModel = this.paramsView
                this.driverTemplateDialogFlag = true ;
            }
             else{
            if (this.editType === 'add') {
                this.templateModel.carSpec = null;
                this.templateModel.isVipCar = '0'
                this.driverTemplateDialogFlag = true ;
            }else if(this.editType=== 'valetAuth'||this.editType==='edit'||this.editType==='view'){
            if(!this.templateItem && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的用户');
               return
            }
            else if(this.templateItem.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的用户');
               return
            }else if (this.templateItem.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
            }
            else{ 
                console.log()
                    data_get_driverName_id(this.templateItem[0].driverId).then(res=>{
                    this.templateModel = res.data;
                    }).catch(err=>{
                        console.log('err',err)
                    })
                   
                    this.driverTemplateDialogFlag = true ;
                }
            }
            }
        },

        //弹框控制
        change() {
         this.driverTemplateDialogFlag = false;

        },
         // 提交数据
        onSubmit(templateModel){
            this.$refs['templateModel'].validate(valid=>{
                if(valid){
                this.templateModel.carLength=parseFloat(this.templateModel.carLength).toFixed(2)
                this.templateModel.carWidth=parseFloat(this.templateModel.carWidth).toFixed(2)
                this.templateModel.carHeight= parseFloat(this.templateModel.carHeight).toFixed(2)
                    var forms= Object.assign({}, this.templateModel)
                     this.driverTemplateDialogFlag = false;
                    // 新增数据提交
                    if(this.editType === 'add'){
                        data_post_createDriver(forms).then(res=>{
                            this.$message.success('新增成功')
                            this.$emit('getData')
                        }).catch(res=>{
                            this.$message.error('新增失败')
                        })
                    } else if(this.editType=== 'valetAuth') {
                        data_post_driverAudit(forms).then(res=>{
                            this.$message.success('代客认证成功')
                            this.$emit('getData')
                        }).catch(res=>{
                            this.$message.error('代客认证失败')
                        })
                    } else if(this.editType==='edit'){
                        data_put_changeDriver(forms).then(res=>{
                            this.$message.success('修改成功')
                            this.$emit('getData')
                        }).catch(res=>{
                            this.$message.error('修改失败')
                        })
                    }
                }
            })
        }
    }
}
</script>
<style  lang="scss">
.carNewinfo{
    display: inline-block;
    .BtnInfo{
    font-weight: bold
    }
    .el-dialog{
        overflow: unset;
        max-height: inherit;
    }
    .b10{
        padding-bottom: 20px;
    } 
    .el-button{   
        margin-right:0px;
        padding: 0px 15px 0px;
    }
    .carOwner .el-checkbox{
        margin-left:0px!important;
    }
    .el-col-12{
        text-align: left;
    }
    .el-col-24{
        text-align: left;
    }
    .upload{
                width: 300px;
                line-height: 20px;
                img{
                    display: block;
                    width: 100%;
                    height: 250px;
                }
            }
    .el-form-item__error 
    {
        z-index: 10
    }
    }
</style>



