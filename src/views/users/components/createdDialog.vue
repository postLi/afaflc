<template>
     <div class="shippercreatDialog commoncss">
      <el-dialog :title="typetitle" :visible="dialogFormVisible_add" :before-close="close" :close-on-click-modal="false">
        <el-form :model="xinzengform" ref="xinzengform" :rules="rulesForm">
          <el-row>
            <el-col :span="12">
                <el-form-item label="货主类型 ：" prop="shipperType" :label-width="formLabelWidth" required>
                    <el-select v-model="xinzengform.shipperType" placeholder="请选择" v-if="editType=='add'" >
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                    <el-input v-model="identifiy" auto-complete="off" v-else-if="editType=='identification'" disabled></el-input>
                    <el-input v-model="xinzengform.shipperTypeName" auto-complete="off" v-else disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码 ：" :label-width="formLabelWidth" required  v-if="editType !='add'">
                <el-input v-model="xinzengform.mobile" auto-complete="off" maxlength="11" disabled></el-input>
              </el-form-item>
              <el-form-item label="手机号码 ：" prop="mobile" :label-width="formLabelWidth" required v-else>
                <el-input v-model="xinzengform.mobile" auto-complete="off" maxlength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
                <el-form-item label="所在地 ：" :label-width="formLabelWidth" required prop="belongCityName">
                    <el-input v-model="xinzengform.belongCityName" auto-complete="off" disabled v-if="editType=='view'"></el-input>
                    <vregion :ui="true"  @values="regionChange" class="form-control" v-else>
                        <el-input v-model="xinzengform.belongCityName" placeholder="请选择" ></el-input>
                    </vregion>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人 ：" :label-width="formLabelWidth" prop="contacts">
                <el-input v-model="xinzengform.contacts" auto-complete="off"  :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" class="moreLength">
              <el-form-item label="详细地址 ：" :label-width="formLabelWidth" prop="address">
                <el-input :maxlength="40" v-model="xinzengform.address" auto-complete="off"  :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司名称 ：" prop="companyName" :label-width="formLabelWidth" v-show="companyFlag || editType=='identification'">
                <el-input :maxlength="20" v-model="xinzengform.companyName"  :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="统一社会信用代码 ：" prop="creditCode" :label-width="formLabelWidth" v-show="companyFlag || editType=='identification'">
              <el-input :maxlength="20" v-model="xinzengform.creditCode"  :disabled="editType=='view'"></el-input>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9"> 
              <el-form-item label="上传营业执照照片 ：" prop="businessLicenceFile" label-width="165px" v-show="companyFlag || editType=='identification'">
                    <div class="upload">
                        <img :src='xinzengform.businessLicenceFile ? xinzengform.businessLicenceFile : defaultImg' alt="" v-if="editType == 'view'">
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-else v-model="xinzengform.businessLicenceFile" />
                    </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="上传公司或者档口照片 ："  label-width="165px" prop="companyFacadeFile" v-show="companyFlag || editType=='identification'" :rules="companyFlag === false ? {} : companyFacadeFileRules">
                <div class="upload">
                    <img :src='xinzengform.companyFacadeFile ? xinzengform.companyFacadeFile : defaultImg' alt="" v-if="editType == 'view'">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-else v-model="xinzengform.companyFacadeFile" />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="9">
              <el-form-item label="上传发货人名片照片 ：" label-width="165px" prop="shipperCardFile" v-show="companyFlag || editType=='identification'" :rules="companyFlag === false ? {} : shipperCardFileRules" >
                <div class="upload">
                    <img :src='xinzengform.shipperCardFile ? xinzengform.shipperCardFile : defaultImg' alt="" v-if="editType == 'view'">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-else v-model="xinzengform.shipperCardFile" />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.stop="onSubmit" v-show="editType!='view'" >确 定</el-button>
          <el-button @click="close" v-show="editType!='view'">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import { eventBus } from '@/eventBus'
import {data_get_shipper_create,data_get_shipper_change,data_get_shipper_view} from '@/api/users/shipper/all_shipper.js'
import { getDictionary } from '@/api/common.js'
import vregion from '@/components/vregion/Region'

export default {
  components:{
    Upload,
    vregion
  },
  props:{
    paramsView:{
        type:Object,
    },
    typetitle: {
        type: String,
        default: ''
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
    },
    dialogFormVisible_add:{
        type:Boolean,
        default:false
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
            // if(this.$refs.area){
                if(!this.$refs.area.selectedOptions[0]) {
                    cb(new Error('请选择所在地'))
                } else {
                    cb()
                }
        }
        return{
        defaultImg:'/static/test.jpg',//默认第一张图片的url
        identifiy:'企业货主',
        selectFlag:false,
        // dialogFormVisible_add: false,
        shipperType:'AF00101',
        type:'primary',
        title:'',
        text:'',
        citylist:[],
        options:[],
        belongCity: [],
        areadata:[],  
        formLabelWidth:'135px',
        companyFlag:false,
        xinzengform:{
            shipperType:'',//货主类型code
            shipperTypeName:'',//货主类型名称
            mobile:'',//手机
            contacts:'',//联系人
            belongCityName:'',
            belongCity:'',//所属地区
            address:'',//详细地址
            companyName:'',//公司名称
            creditCode:'',//统一社会代码
            businessLicenceFile:'',//上传营业执照照片
            companyFacadeFile:'',//上传公司或者档口照片
            shipperCardFile:'',//上传发货人名片照片
            registerOrigin:'AF0030103',
            registerOriginName:'WEB',
            isDirectional: '0',
        },
        rulesForm:{
            shipperType:{required: true, message:'请选择货主类型', trigger:'change'},
            mobile:{validator: mobileValidator, trigger:'change'},
            belongCity:{required:true,validator:belongCityValidator, trigger:'change'},
            demo:{}
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
            // console.log('this.com',this.companyFlag,val)
            if(val === 'AF0010102'){
                this.companyFlag = true;
            }else{
                this.companyFlag = false;
            }
        },
        deep:true
    },
    dialogFormVisible_add:{
        handler: function(val, oldVal) {
            this.openDialog();
            this.getMoreInformation()
        },
        deep:true
    },
    btntext(newVal,oldVal){
        // console.log(newVal,oldVal)
        this.text = newVal;
    }
  },
  mounted(){
    //按钮类型text,primary...
    this.type = this.btntype;
    //按钮文本内容
    this.text = this.btntext;
  },
  methods:{
    regionChange(d) {
        console.log('data:',d)
        this.xinzengform.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
        if(d.area){
            this.xinzengform.belongCity = d.area.code;
        }else if(d.city){
            this.xinzengform.belongCity = d.city.code;
        }
        else{
            this.xinzengform.belongCity = d.province.code;
        }
    },
    getValue(obj){
        return obj ? obj.value:'';
    },
    //事件分发
    changeList(){
        eventBus.$emit('changeList')
    },
    openDialog(){
        console.log(this.editType)
        if(this.editType  == 'add'){
            return false
        }else {
            this.xinzengform = Object.assign({},this.xinzengform,this.paramsView)
        }
    },
    close(done) {
        if(this.editType != 'view'){
            this.$emit('getData');
            this.$refs.xinzengform.resetFields();
            this.changeList();
            if (typeof done === 'function') {
                done()
            }
        }
        this.$emit('update:dialogFormVisible_add', false);
    },
    //获取货主类型
    getMoreInformation(){
        getDictionary(this.shipperType).then(res=>{
            // console.log('货主类型',res)
            this.options = res.data
        })
    },
    //完善数据
    completeData(){
	  //获取城市name
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
	    this.completeData();
        this.$refs['xinzengform'].validate((valid)=>{
            if(valid){
                var forms=Object.assign({},this.xinzengform)
                switch  (this.editType){
                    case 'add':
                        if(!forms.companyName){
                            forms.companyName = '个人业务' ;
                        }
                        data_get_shipper_create(forms).then(res=>{
                            this.$alert('操作成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.close()
                                }
                            });
                        }).catch(err=>{
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + err.text ? err.text : err
                            })
                        })
                        break;
                    case 'edit':
                        data_get_shipper_change(forms).then(res=>{
                            this.$alert('操作成功', '提示', {
                                 confirmButtonText: '确定',
                                callback: action => {
                                    this.close()
                                }
                            });
                        }).catch(err=>{
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + err.text ? err.text : err
                            })
                        })
                        break;
                    case 'identification':
                        let item =  forms.contacts;
                        this.$confirm('确定要认证通过'+ item +' 该货主吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            forms.currentShipperStatus = forms.shipperStatus;
                            forms.shipperStatus =  "AF0010403";
                            forms.shipperStatusName =  "已认证";
                            this.options.filter( el => {
                                if(el.name == "企业货主" ){
                                    forms.shipperTypeName = el.name;
                                    forms.shipperType = el.code;
                                }
                            })
                            data_get_shipper_change(forms).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '该货主已认证成功',
                                    duration:2000
                                })
                                this.close();
                            }).catch(err => {
                                this.$message.error('操作失败，失败原因：',err.text)
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                }
            }else{
                
                return  this.$message({
                    type: 'warning',
                    message: '请填写完整数据'
                })
            }
        })
    },
  }
}
</script>
<style lang="scss" scoped>
    .shippercreatDialog{
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
</style>