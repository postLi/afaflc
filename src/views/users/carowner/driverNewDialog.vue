<template>
    <div>
        <el-dialog
            size="standard"
            :title="myTitle"
            v-model="showMe"
            @close="handleClose"
        >
            <el-form
              ref="templateForm"
              :model="templateModel"
              label-width="78px"
              label-position="right"
              inline
             >
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="templateModel.driverMobile"></el-input>
                </el-form-item>
                <el-form-item label="车主" :label-width="formLabelWidth">
                    <el-input v-model="templateModel.driverName"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="templateModel.driverMobile"></el-input>
                </el-form-item>
                <el-form-item label="车牌号" :label-width="formLabelWidth">
                    <el-input v-model="templateModel.driverMobile"></el-input>
                </el-form-item>
                <el-form-item label="车型" :label-width="formLabelWidth">
                    <el-select v-model="templateModel.carType" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车长(米)" :label-width="formLabelWidth"></el-form-item>
                <el-form-item label="车辆规格">
                    <el-select v-model="templateModel.carType" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在地" :label-width="formLabelWidth">
                    <GetCityList v-model="templateModel.belongCity" ref="area"></GetCityList>
                </el-form-item>
                <el-form-item label="中单等级" :label-width="formLabelWidth">
                     <el-select v-model="templateModel.carType" placeholder="请选择">
                        <el-option
                            v-for="item in optionsLevel"
                            :key="item.value"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="中单等级有效期至">
                    <el-date-picker
                        v-model="templateModel.carType"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="templateModel.carType">是特权车</el-checkbox>
                </el-form-item>
                <el-form-item label="上传车辆45°照片">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.drivingLicenceFile" />
                </el-form-item>
                <el-form-item label="上传车辆行驶证片">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.drivingPermitFile" />
                </el-form-item>
                <el-form-item label="上传驾驶证照片">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.takeIDCardFile" />
                </el-form-item>
                <el-form-item label="上传车主身份证照片">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.idCardFile" />
                </el-form-item>
                <el-form-item label="上传车主个人形象照">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.takeIDCardFile" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit">确 定</el-button>
                <el-button @click="done()">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'

export default {
    name:'dirveNew',
    components:{
        Upload,
        GetCityList
    },
    props:{
        showMe: {
            type: Boolean,
            default: false,
            required: true
        },
        templateItem: {
            type: Object,
            default: {}
        },
        myType: {
            type: String,
            default: 'add',
            required: true
        }
    },
    data (){
        return{
            optionsLevel:[], //中单等级列表
            options:[],
            templateModel:{
                carType:'',
                driverMobile:'',
                driverName:'',
                drivingLicenceFile:'',
                drivingPermitFile:'',
                idCardFile:'',
                takeIDCardFile:''
            },
            formLabelWidth:'120px'
        }
    },
    computed:{
        myTitle () {
            return (this.myType === 'add' ? '新增': this.myType === 'modify'? '修改': '查看') + '详情'
        }
    },
    methods:{
        handleClose(){
            this.showme= false
            this.$emit('update:showMe',false)
        },

        // 提交数据
        onSubmit(){
            this.$refs.templateForm.validate(valid=>{
                
            })
        }
    }
}
</script>
<style>

</style>