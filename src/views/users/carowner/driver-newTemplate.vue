<template> 
    <div class="carNewinfo commoncss">
        <el-button :type="type" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{text}}</el-button>
        <el-dialog :title="title" :visible="driverTemplateDialogFlag" :before-close="change">
             <el-form
              ref="templateModel"
              :model="templateModel"
              inline
              :rules="rulesForm"
             >
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="手机号：" prop="driverMobile" :label-width="formLabelWidth" >
                       <el-input v-model.trim="templateModel.driverMobile" auto-complete="off" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="车主：" prop="driverName" :label-width="formLabelWidth" >
                      <el-input v-model.trim="templateModel.driverName" :maxlength="20" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>

              <el-row>
                  <el-col :span="12">
                    <el-form-item label="身份证号码：" prop="driverCardid"  :label-width="formLabelWidth" >
                        <el-input v-model.trim="templateModel.driverCardid" :disabled="editType=='view'"></el-input>
                    </el-form-item>
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
                                :key="item.value"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="车长(米)：" prop="carLWH" :label-width="formLabelWidth"  >
                      <el-input
                            class="lessWidth"
                            placeholder="长"
                            v-model="templateModel.carLength"
                            clearable
                            ref="lengths"
                            :maxlength="30"
                            :disabled="editType=='view'"
                            >
                        </el-input>
                        <el-input
                            class="lessWidth"
                            placeholder="宽"
                            v-model="templateModel.carWidth"
                            clearable
                            ref="widths"
                            :maxlength="30"
                            :disabled="editType=='view'"
                            >
                        </el-input>
                        <el-input
                            class="lessWidth"
                            placeholder="高"
                            v-model="templateModel.carHeight"
                            clearable
                            ref="heights"
                            :maxlength="30"
                            :disabled="editType=='view'"
                            >
                        </el-input>
                    </el-form-item>
                  </el-col>
              </el-row>

              <el-row>
                  <el-col :span="12">
                    <el-form-item label="车辆规格：" prop="carSpec" :label-width="formLabelWidth">
                        <el-select v-model="templateModel.carSpec" placeholder="请选择" :disabled="editType=='view'">
                            <el-option
                                v-for="item in optionsType"
                                :key="item.value"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">

              <el-form-item label="所在地 ："  v-if = "editType=='view'" :label-width="formLabelWidth" required>
                    <el-input v-model="templateModel.belongCityName" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="所在地 ："  props = "belongCity"  :label-width="formLabelWidth" v-else required>
                <el-input v-model="templateModel.belongCityName" :disabled="editType=='view'" @focus="changeSelect" v-if="editType !='add' && !selectFlag"></el-input>
                <span v-else>
                    <el-input v-model="templateModel.belongCity" auto-complete="off"  v-if = "editType=='view'"   disabled></el-input>
                  	<GetCityList   ref="area"  v-else></GetCityList>
                </span>
              </el-form-item>
                  </el-col>
              </el-row>
              
              <el-row>
                  <el-col :span="12">
                      <el-form-item label="中单等级：" prop="obtainGrade" :label-width="formLabelWidth">
                            <el-select v-model="templateModel.obtainGrade" placeholder="请选择" :disabled="editType=='view'">
                                <el-option
                                    v-for="item in optionsLevel"
                                    :key="item.value"
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
                    <el-form-item :label-width="formLabelWidth" label="特权车：">
                        <el-checkbox v-model="templateModel.isVipCar" @change='aa' label="是" border size="medium" :disabled="editType=='view'" :checked='templateModel.isVipCar!==""'></el-checkbox>
                    </el-form-item>
                  </el-col>
              </el-row>
            
              <el-row>
                  <el-col :span="24">
                    <el-form-item label="上传车辆45°照片：" :label-width="formLabelWidth" prop="carFile" class="b10" required>
                      <div class="upload" v-if="editType == 'view'">
                      <img :src='templateModel.carFile ? templateModel.carFile : defaultImg' alt="" >
                      </div>
                      <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.carFile" v-else/>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                    <el-form-item label="上传车辆行驶证片：" :label-width="formLabelWidth" prop="drivingPermitFile"  class="b10">
                    <div class="upload" v-if="editType == 'view'">
                      <img :src='templateModel.drivingPermitFile ? templateModel.drivingPermitFile : defaultImg' alt="" >
                      </div>
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.drivingPermitFile" v-else/>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                    <el-form-item label="上传驾驶证照片：" :label-width="formLabelWidth" prop="drivingLicenceFile" class="b10">
                       <div class="upload" v-if="editType == 'view'">
                      <img :src='templateModel.drivingLicenceFile ? templateModel.drivingLicenceFile : defaultImg' alt="" >
                      </div>
                       <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.drivingLicenceFile" v-else/>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                    <el-form-item label="上传车主身份证照片：" :label-width="formLabelWidth" prop="idCardFile" class="b10">
                       <div class="upload" v-if="editType == 'view'">
                      <img :src='templateModel.idCardFile ? templateModel.idCardFile : defaultImg' alt="" >
                      </div>
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.idCardFile" v-else/>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                    <el-form-item label="上传车主个人形象照：" :label-width="formLabelWidth" prop="takeIdCardFile" class="b10">
                     <div class="upload" v-if="editType == 'view'">
                      <img :src='templateModel.takeIdCardFile ? templateModel.takeIdCardFile : defaultImg' alt="" >
                      </div>
                       <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.takeIdCardFile" v-else/>
                    </el-form-item>
                  </el-col>
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
import  { data_post_createDriver,data_put_changeDriver,data_CarList,data_Get_carType,data_get_driver_obStatus,data_post_driverAudit,data_post_mobileGetDriver,data_post_checkDriverCardid} from '@/api/users/carowner/total_carowner.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
import { eventBus } from '@/eventBus'
export default {
    name:'template-create-view-change',
    props:{
        templateItem: null,
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
        GetCityList
    },
    data() {
       // 手机号校验
        const mobileValidator = (rule, val, cb) => {
            let phoneTest = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
            !val && cb(new Error('手机号码不能为空'))
            if(!(phoneTest.test(val))){
                cb(new Error('请输入正确的手机号码格式'))
            } 
            else if(this.undpeflag){
                cb()
            }
            else {
                data_post_mobileGetDriver(val).then(res=>{
                    console.log(res)
                        cb()
                }).catch(err=>{
                  if(err){
                       cb(new Error('该手机号已经被注册~'))
                  }
                })
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
             let IdTest = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
            if(!(IdTest.test(val))){
                cb(new Error('请输入正确的身份证'))
            }
            else if(this.undpeflag){
                cb()
            }
            else {
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
            cb(new Error('车主不能为空'))
            }
            else{
                cb()
            }
        }

    //    车型信息校验
        const carTypeValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('车牌不能为空'))
            }
             else{
                cb()
            }
        }
    //    车长信息校验
        const LWHalidator = (rule, val, cb) => {
            let reg=/^\d+(\.\d{0,2})?$/
            let lengths = this.$refs.lengths.value;
            let widths =  this.$refs.widths.value;
            let heights = this.$refs.heights.value;
            if(!reg.test(lengths)||!reg.test(widths)||!reg.test(heights)){
            cb(new Error('请输入车长须数据'))
            }
            else{
                cb()
              
            }
        }

        
    //    选择所在地校验
        const belongCityNameValidator = (rule, val, cb) => {
             if(!this.$refs.area.selectedOptions[0]) {
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
            if(!val){
            cb(new Error('中单等级有效期不能为空'))
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

        // 上传车主身份证照片校验 
        const idCardFileValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('请上传车主身份证照片'))
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

        
   
        return{
            defaultImg:'/static/test.jpg',//默认第一张图片的url
            selectFlag: false,
            type:'primary',
            title:'',
            text:'',
            optionsLevel:[],
            options:[], // 车型列表
            optionsType:[], // 车辆规列表
            templateModel:{
                carType:'',
                driverMobile:'',
                driverName:'',
                carNumber:'',
                driverCardid:'',
                carSpec:'',
                carLength:'',
                carWidth:'',
                carHeight:'',
                belongCity:null,
                obtainGrade:'',
                belongCityName:'',
                obtainGradeTime:null, //中单等级有效时间
                isVipCar:'', //特权车
                carFile:'',
                drivingLicenceFile:'',
                drivingPermitFile:'',
                idCardFile:'',
                takeIdCardFile:'',
                driverId:''
            },
                pickerOptions:{
                disabledDate(time) {
                return time.getTime() < Date.now();
                }
            },
            formLabelWidth:'135px',
            driverTemplateDialogFlag: false,// 弹框控制的控制
            rulesForm:{
            driverMobile:{validator: mobileValidator, trigger:'change',required:true,},
            driverName:{validator: driverNameValidator, trigger:'change',required:true,},
            driverCardid:{validator: driverCardidValidator, trigger:'change',required:true,},
            carNumber:{validator: carNumberValidator, trigger:'change',required:true,},
            carLWH:{validator: LWHalidator, trigger:'change',required:true,},
            carType:{validator: carTypeValidator, trigger:'change',required:true,},
            belongCityName:{validator: belongCityNameValidator, trigger:'change',required:true,},
            obtainGrade:{validator: obtainGradeValidator, trigger:'change',required:true,},
            obtainGradeTime:{validator: obtainGradeTimeValidator, trigger:'change',required:true,},
            carFile:{validator: carFileTimeValidator, trigger:'change',},
            drivingPermitFile:{validator: drivingPermitFileValidator, trigger:'change',required:true,},
            drivingLicenceFile:{validator: drivingLicenceFileValidator, trigger:'change',required:true,},
            idCardFile:{validator: idCardFileValidator, trigger:'change',required:true,},
            takeIdCardFile:{validator: takeIdCardFileValidator, trigger:'change',required:true,},
        },
        }
    },
    watch:{
        driverTemplateDialogFlag:{
        handler: function(val, oldVal) {
            if(!val){
                            console.log('fdffrrrr',this.$refs.area)
                this.selectFlag=false;
                this.$refs.templateModel.resetFields();
                if(this.editType == 'add'){
                    this.templateModel = {
                        registerOrigin:'WEB',
                        isDirectional: '0',
                    }
                }
                if(this.$refs.area){
                    this.$refs.area.selectedOptions = [];
                }
            }
        }
        }
        },
    mounted(){
        //按钮类型text,primary...
        this.type = this.btntype;
        //按钮文本内容
        this.text = this.btntext;
        //弹出框标题
        this.title = this.btntitle;
        this.getMoreInformation()
    },
    methods:{
        changeSelect(){
            if(this.editType === 'add'){
                this.selectFlag=false
            } else{
                this.selectFlag=true
            }
        },
        changeList(){
            eventBus.$emit('changeListtwo')
        },
        aa(val){
            console.log(val)
            console.log(this.templateModel.isVipCar)
            
        },
        // 获取对应的字典列表
        getMoreInformation(){
            // console.log('等数据来')
            //  获取车辆规格
            data_CarList().then(res=>{
                // console.log(res.data)
                res.data.map((item)=>{
                    this.options.push(item);
                })
            }).catch(err =>{
                console.log(err)
            })

            //  获取车型列表
            data_Get_carType().then(res =>{
                res.data.map(item=>{
                    this.optionsType.push(item)
                })
            }).catch(err =>{
                console.log(err)
            })
            // 中单等级的获取
            data_get_driver_obStatus().then(res =>{
                res.data.map(item=>{
                    this.optionsLevel.push(item)
                })
            }).catch(err =>{
                console.log(err)
            })

        },

        openDialog(){

            if (this.editType === 'add') {
                this.driverTemplateDialogFlag = true ;
            }else if(this.editType=== 'valetAuth'||this.editType==='edit'){
              
                if(this.templateItem!= null){
                    this.driverTemplateDialogFlag = true ;
                }else{         
                    this.driverTemplateDialogFlag = false ;    
                }
            }
            if(this.templateItem){
                var obj = JSON.parse(JSON.stringify(this.templateItem));
                this.templateModel = obj ;
            } 
            if(this.editType == 'view'){
                this.driverTemplateDialogFlag = true ;

        }
        },
         completeData(){
             console.log("--------------------------"+this.$refs.area)
            //获取城市name
		if(!this.$refs.area){
			return 
		}  
           if(this.$refs.area.selectedOptions.length > 1){
                let province;
                this.$refs.area.areaData.forEach((item) =>{
                if(item.code == this.$refs.area.selectedOptions[0]){
                    province = item
                }
                })
                province.children.forEach( item => {
                if(item.code == this.$refs.area.selectedOptions[1]){
                    this.templateModel.belongCity = item.code;
                    this.templateModel.belongCityName = item.name;
                }
                })
            }else{
                this.$refs.area.areaData.forEach((item) =>{
                if(item.code == this.$refs.area.selectedOptions[0]){
                    this.templateModel.belongCity = item.code;
                    this.templateModel.belongCityName = item.name;
                }
                })
            }
        },
        
        

        //弹框控制
        change() {
         this.driverTemplateDialogFlag = false;

        },
         // 提交数据
        onSubmit(templateModel){

            this.completeData();
            this.$refs['templateModel'].validate(valid=>{
                if(valid){
                    // console.log('等联调')
                    var forms= Object.assign({}, this.templateModel)
                    console.log('this.templateModel',forms)
                    // 新增数据提交
                    if(this.editType === 'add'){
                        data_post_createDriver(forms).then(res=>{
                            this.driverTemplateDialogFlag = false;
                            this.$message.success('新增成功')
                            this.changeList();
                            this.$emit('getData')
                        })
                    } else if(this.editType=== 'valetAuth') { 
                        data_post_driverAudit(forms).then(res=>{
                            this.driverTemplateDialogFlag = false;
                            this.$message.success('代客认证成功')
                             this.changeList();
                            this.$emit('getData')
                        })
                    } else if(this.editType==='edit'){
                        data_put_changeDriver(forms).then(res=>{
                            this.driverTemplateDialogFlag = false;
                            this.$message.success('修改成功')
                             this.changeList();
                            this.$emit('getData')
                        })
                    }
                }
            })
        }
    }
}
</script>
<style  lang="scss">
.b10{
    padding-bottom: 20px;
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
                height: 100%;
            }
        }
</style>



