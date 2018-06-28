<template>
     <div class="creatDialog commoncss">
      <el-button :type="type" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{text}}</el-button>
      <el-dialog :title="title" :visible="dialogFormVisible_add" :before-close="change">
        <el-form :model="xinzengform" ref="xinzengform" :rules="rulesForm">
          <el-row>
            <el-col :span="12">
                <el-form-item label="货主类型 ：" prop="shipperType" :label-width="formLabelWidth" required>
                    <el-select v-model="xinzengform.shipperType" placeholder="请选择" v-if="editType=='add'" >
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                    <el-input v-model="cc" auto-complete="off" v-else-if="editType=='identification'" disabled></el-input>
                    <el-input v-model="xinzengform.shipperTypeName" auto-complete="off" v-else disabled></el-input>
                </el-form-item>
                <!-- <el-form-item label="货主类型 ：" prop="shipperType" :label-width="formLabelWidth" required>
                    <el-input v-model="cc" auto-complete="off" v-else-if="editType=='identification'" disabled></el-input>
                </el-form-item> -->
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码 ：" prop="mobile" :label-width="formLabelWidth" required>
                <el-input v-model="xinzengform.mobile" auto-complete="off"  :disabled="editType=='view' || editType=='identification' "></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人 ：" :label-width="formLabelWidth">
                <el-input v-model="xinzengform.contacts" auto-complete="off"  :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在地 ：" prop="belongCity" :label-width="formLabelWidth">
                <!-- <el-input v-model="xinzengform.belongCityName" :disabled="editType=='view'" @focus="changeSelect"  v-if="editType!='add' && !selectFlag"></el-input> -->
                <!-- <span v-if="selectFlag || editType=='add'"> -->
                    <el-input v-model="xinzengform.belongCityName" auto-complete="off"  v-if = "editType=='view'"   disabled></el-input>

                  	<GetCityList v-model="xinzengform.belongCity"  ref="area"  v-else></GetCityList>
                <!-- </span> -->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" class="moreLength">
              <el-form-item label="详细地址 ：" :label-width="formLabelWidth" >
                <el-input :maxlength="20" v-model="xinzengform.address" auto-complete="off"  :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="是否定向:" :label-width="formLabelWidth">
                <el-radio-group v-model="xinzengform.isDirectional"  :disabled="editType!='add'">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col> -->
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="公司名称 ：" :label-width="formLabelWidth" v-show="companyFlag">
                <el-input :maxlength="20" v-model="xinzengform.companyName"  :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="统一社会信用代码 ：" :label-width="formLabelWidth" v-show="companyFlag">
              <el-input :maxlength="20" v-model="xinzengform.creditCode"  :disabled="editType=='view'"></el-input>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="上传营业执照照片 ：" label-width="125px" v-show="companyFlag">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）"  v-model="xinzengform.businessLicenceFile" :showFileList = "editType == 'view' ? true : false"/>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="9">
              <el-form-item label="上传公司或者档口照片 ：" label-width="125px" prop="companyFacadeFile" v-show="companyFlag" :rules="companyFlag === false ? {} : companyFacadeFileRules">
                <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="xinzengform.companyFacadeFile" />
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="9">
              <el-form-item label="上传发货人名片照片 ：" label-width="125px" prop="shipperCardFile" v-show="companyFlag" :rules="companyFlag === false ? {} : shipperCardFileRules" >
                <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="xinzengform.shipperCardFile" />
              </el-form-item>
            </el-col>
          </el-row>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit" v-show="editType!='view'" >确 定</el-button>
          <el-button @click="dialogFormVisible_add = false" v-show="editType!='view'">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
import { eventBus } from '@/eventBus'
import {data_get_shipper_type,data_get_shipper_create,data_get_shipper_change,data_get_shipper_view,data_GetCityList} from '../../../api/users/shipper/all_shipper.js'
export default {
  components:{
    Upload,
    GetCityList
  },
  props:{
    params:{
      type:Object
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
    }
  },
  data(){
    // 手机号校验
        const mobileValidator = (rule, val, cb) => {
        let phoneTest = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
        !val && cb(new Error('手机号码不能为空'))
        if(!(phoneTest.test(val))){
            cb(new Error('请输入正确的手机号码格式'))
        } else {
            data_get_shipper_view(val).then(res=>{
            console.log(res)
            if(res.data){
                cb(new Error('该手机号已经被注册~'))
            } else {
            cb()
            }
            })
        }
        setTimeout(function () {
            !(phoneTest.test(val)) ? cb(new Error('请输入正确的手机号码格式')) : cb()
        }, 0)
        
        }
        const companyNameValidator = (rule, val, cb)=>{
        // console.log(val)
        if(!this.xinzengform.companyFacadeFile){
            cb(new Error('请上传公司或者档口照片'))
        }else{
            cb()
        }
        }
        const shipperCardFileValidator=(rule,val,cb) => {
        if(!this.xinzengform.shipperCardFile){
            cb(new Error('请上传发货人名片照片'))
        } else {
            cb()
        }
        }
        const belongCityValidator = (rule, val, cb) => {
        if(!this.xinzengform.belongCity) {
            cb(new Error('请选择所在地'))
        } else {
            cb()
        }
        }
        return{
        cc:'企业货主',
        selectFlag:false,
        dialogFormVisible_add: false,
        type:'primary',
        title:'',
        text:'',
        citylist:[],
        options:[],
        belongCity: [],
        areadata:[],  
        formLabelWidth:'120px',
        companyFlag:false,
        xinzengform:{
            shipperType:null,
            shipperTypeName:null,
            belongCity:null,
            mobile:null,
            contacts:null,
            address:null,
            companyName:null,
            creditCode:null,
            registerOrigin:'WEB',
            businessLicenceFile:'',
            shipperCardFile:'',
            companyFacadeFile:'',
            shipperId:'',
            isDirectional: '0',
            belongCityName:null,
        },
        currentRow: null,
        props: {
            label: 'name',
            children: 'children',
            value:'code'
        },
        rulesForm:{
            shipperType:{required: true, message:'请选择货主类型', trigger:'change'},
            mobile:{validator: mobileValidator, trigger:'change'},
            belongCity:{required:true,validator:belongCityValidator, trigger:'change'}
        },

        // 上传公司或者档口照片校验
        companyFacadeFileRules:{required:true,validator: companyNameValidator,trigger:'change'},

        // 上传发货人名片照片
        shipperCardFileRules:{required:true,validator: shipperCardFileValidator, trigger: 'change'}
        }
  },
  watch:{
    'xinzengform.shipperType': {
     handler: function(val, oldVal) {
        // console.log(val)
        if(val === 'AF0010202'){
            this.companyFlag= true
        }else{
            this.companyFlag= false
        }
     },
     deep:true
    },

    'xinzengform.mobile':{
      handler:function(val, oldVal){
        //用户输入校验合法后发送请求判断是否已注册

        // data_get_shipper_view().then(res=>{
        //   if(){

        //   }
        // })
      }
    },
    editType:{
        handler(newVal,oldVal){
            if(newVal == 'identification'){
                this.getMoreInformation();
            }
        },
        immediate: true
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
    // this.getArea()
  },
  methods:{
    openDialog(){
		// console.log('parmas:',this.params)
		if(this.editType==='add'||this.editType==='view' || this.editType==='identification'){
			this.dialogFormVisible_add=true
		} else if(this.editType==="edit"){
			if(this.params.address){
                this.dialogFormVisible_add=true;
                this.companyFlag= false;
			} else{
				this.$message.error('必须选中一个才可操作')
			}
		}
		
		if(this.params){
		var obj = JSON.parse(JSON.stringify(this.params));
			this.xinzengform = obj ;
		}else{
			this.xinzengform = {
				shipperType:null,
				belongCity:null,
				mobile:null,
				contacts:null,
				address:null,
				companyName:null,
				creditCode:null,
				registerOrigin:'WEB',
				businessLicenceFile:'',
				shipperCardFile:'',
				companyFacadeFile:'',
				shipperId:'',
				isDirectional: '0',
				belongCityName:null,
			}
        }
        
        console.log('this.xinzengform',this.xinzengform)
    },
    change() {
      	this.dialogFormVisible_add = !this.dialogFormVisible_add;
    },
    changeSelect(){
		if(this.editType==='add'){
			this.selectFlag=false
		} else{
			this.selectFlag=true
		}
    },
    //获取货主类型
    getMoreInformation(){
      data_get_shipper_type().then(res=>{
        console.log('货主类型',res)
        
        this.options = res.data
        
        if(this.editType==='identification'){
            this.options.filter( el => {
                if(el.name == "企业货主" ){
                    this.xinzengform.shipperTypeName = el.name;
                    this.xinzengform.shipperType = el.code;
                }
            })
        }
        console.log(this.options)
        console.log(this.xinzengform.shipperTypeName,this.xinzengform.shipperType)
      })
    },
    //完善数据
    completeData(){
	  //获取城市name
		console.log(this.$refs.area)
		if(!this.$refs.area){
			return
		}  
		else if(this.$refs.area.selectedOptions.length > 1){
			let province;
			this.$refs.area.areaData.forEach((item) =>{
				if(item.code == this.$refs.area.selectedOptions[0]){
					province = item
				}
			})
			province.children.forEach( item => {
				if(item.code == this.$refs.area.selectedOptions[1]){
					this.xinzengform.belongCity = item.code;
					this.xinzengform.belongCityName = item.name;
				}
			})
		}else{
			this.$refs.area.areaData.forEach((item) =>{
				if(item.code == this.$refs.area.selectedOptions[0]){
					this.xinzengform.belongCity = item.code;
					this.xinzengform.belongCityName = item.name;
				}
			})
		}
		
    },
    // 保存
    onSubmit(){
      // this.xinzengform.belongCity = this.$refs.area.selectedOptions.pop();
	  this.completeData();
    //   console.log(this.xinzengform.belongCity)
    //   if(this.editType === 'identification'){
    //       console.log('789789')
    //   }else{
    //       conosle.log('987987')
    //   }
      this.$refs['xinzengform'].validate((valid)=>{
        eventBus.$emit('changeList')
        console.log('resVAILD',valid)
        if(valid){
            console.log(this.xinzengform)
			var forms=Object.assign({},this.xinzengform)
			if(this.editType === 'add'){
                // 新增
                console.log('xinzeng')
				if(!forms.companyName){
					forms.companyName = '个人业务' ;
				}
				console.log('onSubmit',forms)	

				data_get_shipper_create(forms).then(res=>{
				// console.log(res)
				this.dialogFormVisible_add = !this.dialogFormVisible_add;
				this.$message.success('新增成功')
				this.$emit('getData')
				}).catch(err=>{
				console.log(err)
            	})
          	}else if(this.editType === 'edit'){
				// 修改 
				console.log('onSubmit','xiugai')
				data_get_shipper_change(forms).then(res=>{
				// console.log(res)
					this.dialogFormVisible_add = !this.dialogFormVisible_add;
					this.$message.success('修改成功')
					this.$emit('getData')
					}).catch((err)=>{
					console.log(err)
				})
          	}else if(this.editType === 'identification'){
                console.log('identification:' ,forms)
                forms.currentShipperStatus = forms.shipperStatus;
                forms.shipperStatus =  "AF0010403";

                this.options.filter( el => {
                    if(el.name == "企业货主" ){
                        forms.shipperTypeName = el.name;
                        forms.shipperType = el.code;
                    }
                })
                console.log('identificationChange:' ,forms)
                data_get_shipper_change(forms).then(res => {
                    console.log(res)
                })

		  	} 
        }
      })
    },
  }
}
</script>
<style lang="scss">
    .creatDialog{
        display: inline-block;
        .el-dialog{
            width: 780px;
            .el-dialog__body{
                .el-form{
                    .el-form-item{
                        .el-form-item__content{
                            .el-input{
                                width: 180px;
                            }
                        }
                    }
                    .moreLength{
                        .el-form-item__content{
                            .el-input{
                                width: 570px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>