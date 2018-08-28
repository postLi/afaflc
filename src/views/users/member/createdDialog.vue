<template>
     <div class="creatDialog commoncss">
      <el-button :type="type" :value="value" :plain="plain" :icon="icon" @click="openDialog">{{text}}</el-button>
      <el-dialog :title="title" :visible.sync="dialogFormVisible_add" :before-close="change" :close-on-click-modal="false" >
        <el-form :model="xinzengform" ref="xinzengform" :rules="rulesForm">
            <el-row>
                <!-- <el-col :span="12">
                    <el-form-item label="会员账号 ：" :label-width="formLabelWidth" required>
                        <el-select v-model="xinzengform.account" placeholder="请选择" v-if="editType=='add'" >
                            <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code"
                                :disabled="item.disabled">
                            </el-option>
                        </el-select>
                        <el-input v-model="cc" auto-complete="off" v-else-if="editType=='identification'" disabled></el-input>
                        <el-input v-model="xinzengform.shipperTypeName" auto-complete="off" v-else disabled></el-input>
                    </el-form-item>
                </el-col> -->
                <el-col :span="12">
                    <el-form-item label="会员手机号码 ：" :label-width="formLabelWidth" required  v-if="editType !='add'">
                        <el-input v-model="xinzengform.mobile" auto-complete="off"  disabled></el-input>
                    </el-form-item>
                    <el-form-item label="会员手机号码 ：" prop="mobile" :label-width="formLabelWidth" required v-else>
                        <el-input v-model="xinzengform.mobile" auto-complete="off" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="注册人姓名 ：" :label-width="formLabelWidth">
                        <el-input v-model="xinzengform.contactsName" auto-complete="off"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司名称 ：" :label-width="formLabelWidth">
                        <el-input :maxlength="20" v-model="xinzengform.companyName"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所在地 ："  v-if = "editType=='view'" :label-width="formLabelWidth" required>
                        <el-input v-model="xinzengform.belongCityName" auto-complete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所在地 ："  props = "belongCity"  :label-width="formLabelWidth" v-else required>
                        <vregion :ui="true" @values="regionChange" class="form-control">
                            <el-input v-model="xinzengform.belongCityName" placeholder="请选择出发地"></el-input>
                        </vregion>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="注册来源 ：" :label-width="formLabelWidth">
                        <el-input :maxlength="20" v-model="xinzengform.registerOriginName"  disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="注册日期 ：" :label-width="formLabelWidth">
                        <el-input :maxlength="20" v-model="xinzengform.registerTime"  disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="账户状态 ：" :label-width="formLabelWidth">
                        <el-input :maxlength="20" v-model="xinzengform.accountStatusName"  disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="认证状态 ：" :label-width="formLabelWidth">
                        <el-input :maxlength="20" v-model="xinzengform.authStatusName"  disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>        
                <el-col :span="24" class="moreLength">
                    <el-form-item label="会员服务承诺 ：" :label-width="formLabelWidth">
                        <p v-if="editType == 'view'">
                            <span v-for="(item,key) in otherService" :key="key" class="serviceChoose">
                                {{item}}
                            </span>
                        </p>
                        <el-checkbox-group v-model="otherServiceCode" v-else>
                            <span>
                                <el-checkbox v-for="obj in optionsLogisticsCompany" :label="obj.code" :key="obj.id" >{{obj.name}}</el-checkbox>
                            </span>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="moreLength">
                    <el-form-item label="是否开通TMS ：" :label-width="formLabelWidth">
                        <el-input :maxlength="20"  v-model="xinzengform.isOpenTmsName"  v-if="editType=='view'" disabled></el-input>
                        <el-radio-group v-model="xinzengform.isOpenTms" v-else>
                            <el-radio  v-for="(obj,key) in optionsStatus" :label="obj.value" :key='key'>{{obj.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
            <el-col :span="9">
              <el-form-item label="上传营业执照照片 ：" label-width="165px">
                    <div class="upload">
                        <img :src='xinzengform.businessLicenceFile ? xinzengform.businessLicenceFile : defaultImg' alt="" v-if="editType == 'view'">
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-else v-model="xinzengform.businessLicenceFile" />
                    </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="上传公司或者档口照片 ：" label-width="165px" prop="companyFacadeFile" :rules="companyFlag === false ? {} : companyFacadeFileRules">
                <div class="upload">
                    <img :src='xinzengform.companyFacadeFile ? xinzengform.companyFacadeFile : defaultImg' alt="" v-if="editType == 'view'">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-else v-model="xinzengform.companyFacadeFile" />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="上传发货人名片照片 ：" label-width="165px" prop="shipperCardFile" :rules="companyFlag === false ? {} : shipperCardFileRules" >
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
          <el-button @click="close('xinzengform')" v-show="editType!='view'">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
import { eventBus } from '@/eventBus'
import {data_get_shipper_type} from '@/api/users/shipper/all_shipper.js'
import {data_ChangeLogisticsCompany} from '@/api/users/logistics/LogisticsCompany.js'
import vregion from '@/components/vregion/Region.vue'

import { data_LogisticsCompany } from '@/api/common.js'
export default {
  components:{
    Upload,
    GetCityList,
    vregion
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
      default: null,
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
            // }else{
                // return
            // }
        }
        return{
            defaultImg:'/static/test.jpg',//默认第一张图片的url
            cc:'企业货主',
            selectFlag:false,
            dialogFormVisible_add: false,
            type:'primary',
            title:'',
            text:'',
            otherService:[],
            optionsLogisticsCompany:[],//会员服务承诺
            otherServiceCode:[],//选择增值服务
            citylist:[],
            belongCity: [],
            areadata:[],  
            formLabelWidth:'120px',
            companyFlag:false,
            xinzengform:{
                registerOrigin:'WEB',
                isDirectional: '0',
            },
            optionsStatus:[
                {
                    value:'1',
                    name:"是"
                },
                    {
                    value:'0',
                    name:"否"
                }
            ],
            rulesForm:{
                shipperType:{required: true, message:'请选择货主类型', trigger:'change'},
                // mobile:{validator: mobileValidator, trigger:'change'},
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
        dialogFormVisible_add:{
            handler: function(val, oldVal) {
                if(!val){
                    this.selectFlag=false;
                    this.$refs.xinzengform.resetFields();
                    if(this.editType == 'add'){
                        this.xinzengform = {
                            registerOrigin:'WEB',
                            isDirectional: '0',
                        }
                    }
                    if(this.$refs.area){
                        this.$refs.area.selectedOptions = [];
                    }
                }
            },
        },
        btntext(newVal,oldVal){
            // console.log(newVal,oldVal)
            this.text = newVal;
        },
        otherServiceCode:{
            handler(newVal,oldVal){
                if(newVal){
                    this.xinzengform.otherServiceCode = JSON.stringify(newVal);
                    let otherService = [];
                    this.optionsLogisticsCompany.find((item)=>{
                        this.otherServiceCode.forEach(el => {
                            if(item.code == el ){
                                otherService.push(item.name)    
                            }
                        })
                    })
                    this.xinzengform.otherService = JSON.stringify(otherService);
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

        // console.log('btntitle',this.text)
        this.getMoreInformation()
    },
    methods:{
        regionChange(d) {
            console.log('data:',d)
            this.xinzengform.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();

            
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        //关闭弹框
        close(formName){
            this.dialogFormVisible_add = false;
        },
        //事件分发
        changeList(){
            eventBus.$emit('changeList')
        },
        openDialog(){
            // console.log('parmas:',this.params)
            console.log(this.editType)
            if(this.editType == 'edit'){
                    this.xinzengform = JSON.parse(JSON.stringify(this.params))
                    this.dialogFormVisible_add = true;
                    if(this.xinzengform.otherServiceCode != ''){
                        this.otherServiceCode = JSON.parse(this.xinzengform.otherServiceCode) 
                    }

                    this.xinzengform.isOpenTms = this.xinzengform.isOpenTms == 1 ? '1' : '0'
            }
            else if(this.editType == 'view'){
                    this.dialogFormVisible_add = true;
                    this.xinzengform  = Object.assign({},this.paramsView) ;
                    if(this.xinzengform.otherService != ''){
                        this.otherService = JSON.parse(this.xinzengform.otherService) 
                    }
                    this.xinzengform.isOpenTmsName = this.xinzengform.isOpenTms == 1 ? '是' : '否';
                    console.log(this.xinzengform)

                    console.log(this.xinzengform.isOpenTmsName)
            }

        },
        change() {
            this.dialogFormVisible_add = false;
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
            // data_get_shipper_type().then(res=>{
            //     // console.log('货主类型',res)
            //     this.options = res.data;
            
            // }),
            data_LogisticsCompany().then(res=>{

                this.optionsLogisticsCompany = res.data;

                // console.log(this.optionsLogisticsCompany)
            })
        },
        // 保存
        onSubmit(){
            this.$refs['xinzengform'].validate((valid)=>{
                if(valid){
                    var forms=Object.assign({},this.xinzengform)
                    switch  (this.editType){
                        case 'edit':
                            data_ChangeLogisticsCompany(forms).then(res=>{
                                // console.log(res)
                                this.$alert('操作成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.dialogFormVisible_add = false;
                                        this.$emit('getData')
                                        this.changeList();
                                    }
                                });
                            }).catch(err=>{
                                this.$message({
                                    type: 'info',
                                    message: '操作失败，原因：' + err.text ? err.text : err.errinfo
                                })
                            })
                            break;
                    }
                }else{
                    this.$message({
                        type: 'info',
                        message: '请填写完整信息' 
                    })
                    return false
                }
            })
        },
    }
    }
</script>
<style lang="scss">
    .creatDialog{
        
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

        .moreLength{
            .el-checkbox-group{
                span:nth-child(2n){
                    margin-right: 20px;
                }
                .el-checkbox{
                    margin-left: 0;
                }
            }
        }

        .el-form-item__content{
            .v-region{
                .v-dropdown-container{
                    top: 38px !important;
                    left: -151px !important;
                }
            }
        }

        .serviceChoose{
            display: inline-block;
            padding: 0px 10px;
            margin-right: 10px;
            color: #fff;
            background: rgb(44, 193, 219);
            -webkit-box-shadow:3px 3px 30px #888888;;
            -moz-box-shadow:3px 3px 30px #888888;;

        }
    }
</style>