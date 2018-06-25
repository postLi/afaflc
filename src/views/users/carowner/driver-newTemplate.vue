<template>
    <div class="addclassify commoncss">
        <el-button :type="type" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{text}}</el-button>
        <el-dialog :title="title" :visible="driverTemplateDialogFlag" :before-close="change" :modal=false size="">
             <el-form
              ref="templateForm"
              :model="templateModel"
              inline
             >
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="手机号：" :label-width="formLabelWidth">
                       <el-input v-model="templateModel.driverMobile"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="车主：" :label-width="formLabelWidth">
                      <el-input v-model="templateModel.driverName" :maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>

              <el-row>
                  <el-col :span="12">
                    <el-form-item label="身份证号码：" :label-width="formLabelWidth">
                        <el-input v-model="templateModel.driverCardid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="车牌号：" :label-width="formLabelWidth">
                      <el-input v-model="templateModel.carNumber" :maxlength="8"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>

              <el-row>
                  <el-col :span="12">
                    <el-form-item label="车型：" :label-width="formLabelWidth">
                        <el-select v-model="templateModel.carType" placeholder="请选择">
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
                    <el-form-item label="车长(米)：" :label-width="formLabelWidth">
                      <el-input
                            placeholder="长"
                            v-model="templateModel.carLength"
                            clearable>
                        </el-input>
                        <el-input
                            placeholder="宽"
                            v-model="templateModel.carWidth"
                            clearable>
                        </el-input>
                        <el-input
                            placeholder="高"
                            v-model="templateModel.carHeight"
                            clearable>
                        </el-input>
                        <span class="node">米</span>
                    </el-form-item>
                  </el-col>
              </el-row>

              <el-row>
                  <el-col :span="12">
                    <el-form-item label="车辆规格："  :label-width="formLabelWidth">
                        <el-select v-model="templateModel.carSpec" placeholder="请选择">
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
                    <el-form-item label="所在地：" :label-width="formLabelWidth">
                        <!-- <GetCityList v-model="templateModel.belongCity" ref="area"></GetCityList> -->
                        <el-input v-model="templateModel.belongCityName" :disabled="editType=='view'" @focus="changeSelect"  v-if="editType!='add' && !selectFlag"></el-input>
                        <span v-if="selectFlag || editType=='add'">
                        <GetCityList v-model="templateModel.belongCity" ref="area" :disabled="editType=='view'"></GetCityList>
                        </span>
                    </el-form-item>
                  </el-col>
              </el-row>
              
              <el-row>
                  <el-col :span="12">
                      <el-form-item label="中单等级" :label-width="formLabelWidth">
                            <el-select v-model="templateModel.obtainGrade" placeholder="请选择">
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
                    <el-form-item label="中单等级有效期至"  :label-width="formLabelWidth">
                        <el-date-picker
                            v-model="templateModel.obtainGradeTime"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                  </el-col>
              </el-row>

              <el-row  :gutter="20">
                  <el-col :span="12">
                    <el-form-item :label-width="formLabelWidth">
                        <el-checkbox v-model="templateModel.isVipCar">是特权车</el-checkbox>
                    </el-form-item>
                  </el-col>
              </el-row>
            
              <el-row>
                  <el-col :span="9">
                    <el-form-item label="上传车辆45°照片：" :label-width="formLabelWidth">
                      <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.carFile" />
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="9">
                    <el-form-item label="上传车辆行驶证片：" :label-width="formLabelWidth">
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.drivingPermitFile" />
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="9">
                    <el-form-item label="上传驾驶证照片：" :label-width="formLabelWidth">
                       <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.drivingLicenceFile" />
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="9">
                    <el-form-item label="上传车主身份证照片：" :label-width="formLabelWidth">
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.idCardFile" />
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="9">
                    <el-form-item label="上传车主个人形象照：" :label-width="formLabelWidth">
                       <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.takeIdCardFile" />
                    </el-form-item>
                  </el-col>
              </el-row>
    
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit">确 定</el-button>
                <el-button @click="driverTemplateDialogFlag=false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import  { data_post_createDriver,data_put_changeDriver,data_CarList,data_Get_carType,data_get_driver_obStatus,data_post_driverAudit} from '@/api/users/carowner/total_carowner.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
export default {
    name:'template-create-view-change',
    props:{
        templateItem: {
            type: Object
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
        }
    },
    components:{
        Upload,
        GetCityList
    },
    data() {
        return{
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
            formLabelWidth:'130px',
            driverTemplateDialogFlag: false,// 弹框控制的控制
        }
    },
    watch:{

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
            if(this.editType==='add'){
                this.selectFlag=false
            } else{
                this.selectFlag=true
            }
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
            this.driverTemplateDialogFlag=true
            if(this.templateItem){
                var obj = JSON.parse(JSON.stringify(this.templateItem));
                this.templateModel.driverMobile=obj.driverMobile
                this.templateModel.driverName=obj.driverName
                this.templateModel.driverCardid=obj.driverCardid
                this.templateModel.carNumber=obj.carNumber
                this.templateModel.carType=obj.carType
                this.templateModel.carLength=obj.carLength
                this.templateModel.carWidth=obj.carWidth
                this.templateModel.carHeight=obj.carHeight
                this.templateModel.carSpec=obj.carSpec
                this.templateModel.belongCity=obj.belongCity
                this.templateModel.belongCityName=obj.belongCityName
                this.templateModel.carFile=obj.carFile
                this.templateModel.drivingPermitFile=obj.drivingPermitFile
                this.templateModel.drivingLicenceFile=obj.drivingLicenceFile
                this.templateModel.idCardFile=obj.idCardFile
                this.templateModel.takeIdCardFile=obj.takeIdCardFile    
                this.templateModel.obtainGrade=obj.obtainGrade
                this.templateModel.obtainGradeTime=obj.obtainGradeTime    
                this.templateModel.isVipCar=obj.isVipCar
                this.templateModel.driverId=obj.driverId
            } else {
                 this.templateModel.driverMobile=null
                this.templateModel.driverName=null
                this.templateModel.driverCardid=null
                this.templateModel.carNumber=null
                this.templateModel.carType=null
                this.templateModel.carLength=null
                this.templateModel.carWidth=null
                this.templateModel.carHeight=null
                this.templateModel.carSpec=null
                this.templateModel.belongCity=null
                this.templateModel.carFile=null
                this.templateModel.drivingPermitFile=null
                this.templateModel.drivingLicenceFile=null
                this.templateModel.idCardFile=null
                this.templateModel.takeIdCardFile=null
                this.templateModel.obtainGrade=null
                this.templateModel.obtainGradeTime=null
                this.templateModel.isVipCar=null
                this.templateModel.driverId=null
            }
        },
         completeData(){
             console.log("--------------------------"+this.$refs.area)
            //获取城市name
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
         this.driverTemplateDialogFlag = !this.driverTemplateDialogFlag;
        },
         // 提交数据
        onSubmit(){
            this.completeData();
            this.$refs['templateForm'].validate(valid=>{
                if(valid){
                    // console.log('等联调')
                    var forms= Object.assign({}, this.templateModel)
                    
                    // 新增数据提交
                    if(this.editType === 'add'){
                        data_post_createDriver(forms).then(res=>{
                            this.driverTemplateDialogFlag = !this.driverTemplateDialogFlag;
                            this.$message.success('新增成功')
                            this.$emit('getData')
                        })
                    } else if(this.editType=== 'valetAuth') { 
                        data_post_driverAudit(forms).then(res=>{
                            this.driverTemplateDialogFlag = !this.driverTemplateDialogFlag;
                            this.$message.success('代客认证成功')
                            this.$emit('getData')
                        })
                    } else if(this.editType==='edit'){
                        data_put_changeDriver(forms).then(res=>{
                            this.driverTemplateDialogFlag = !this.driverTemplateDialogFlag;
                            this.$message.success('修改成功')
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

</style>


