<template>
     <div class="shoppingDialog commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" @click="openDialog()">{{btntext}}</el-button>
      <div class="newmanageDistrict">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
        <el-form ref="formAll" :model="formAll" :rules="rulesForm" :inline="true">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="区代公司名称 ：" :label-width="formLabelWidth" prop="partnerCompany">
                    <el-input v-model="formAll.partnerCompany" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="联系人 ：" :label-width="formLabelWidth" prop="partnerName">
                    <el-input v-model="formAll.partnerName" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号码 ：" :label-width="formLabelWidth" prop="mobile">
                    <el-input v-model="formAll.mobile" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item  label="所在地 ：" :label-width="formLabelWidth" v-if="!selectFlag"> 
                            <el-input v-model="AreaName" @focus="changeSelect" :disabled="editType=='view'"></el-input>
                    </el-form-item>  
                    <el-form-item label="所在地 ：" :label-width="formLabelWidth" prop="areaName" v-else>
                   <el-cascader
                    size="large"
                    :options="options"
                    v-model="formAll.areaName"
                    @change="handleChange"
                    >
                    </el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="签约时间 ：" :label-width="formLabelWidth" prop="signingDate">
                    <el-date-picker
                    :disabled="editType=='view'"
                    v-model="formAll.signingDate"
                    type="date"
                    value-format="timestamp"
                    placeholder="请选择日期">
                    </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="合同开始日期 ：" :label-width="formLabelWidth" prop="contractStartDate">
                    <el-date-picker
                    :disabled="editType=='view'"
                    v-model="formAll.contractStartDate"
                    type="date"
                    value-format="timestamp"
                    placeholder="请选择日期">
                    </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="合同结束日期 ：" :label-width="formLabelWidth" prop="contractEndDate">
                    <el-date-picker
                    :disabled="editType=='view'"
                    v-model="formAll.contractEndDate"
                    type="date"
                    value-format="timestamp"
                    placeholder="请选择日期">
                    </el-date-picker>                        
                    </el-form-item>
                </el-col>                
            </el-row>
           <el-row>
            <el-col :span="24">
                <h2 class="manageDistrict_h2">合作区域</h2>
            </el-col>   
            </el-row>  
           <el-row>
            <el-col :span="24">
                <div class="manageDistrict_table" v-for="(form,keys) in formAll.aflcPartnerAreaList" :key='keys'>
                 <div v-if="keys == 0" class="manageDistrict_tr">
                     <div class="manageDistrict_th table_w1">合作区域</div>
                     <div class="manageDistrict_th table_w2">合作开始日期</div>
                     <div class="manageDistrict_th table_w3">合作截止日期</div>
                     <div class="manageDistrict_th table_w4">操作</div>
                 </div>
                 <div class="manageDistrict_tr">
                     <div class="manageDistrict_td table_w1"> 
                   <span  v-if="!formAll.aflcPartnerAreaList[keys].selectFlag">
                    <el-input v-model="formAll.aflcPartnerAreaList[keys].belongCity" @focus="changeSelect1(keys)" :disabled="editType=='view'"></el-input>
                  </span>
                  <span v-else>
                    <el-cascader
                    size="large"
                    :options="options"
                    v-model="formAll.aflcPartnerAreaList[keys].areaName"
                    @change="handleChange1"
                    @focus="changeInput(keys)"
                    >
                    </el-cascader></span></div>
                     <div class="manageDistrict_td table_w2">
                    <el-date-picker
                    :disabled="editType=='view'"
                    v-model="formAll.aflcPartnerAreaList[keys].contractStartDate"
                    type="date"
                    value-format="timestamp"
                    placeholder="请选择日期">
                    </el-date-picker>  
                     </div>
                     <div class="manageDistrict_td table_w3">
                 <el-date-picker
                    :disabled="editType=='view'"
                    v-model="formAll.aflcPartnerAreaList[keys].contractEndDate"
                    type="date"
                    value-format="timestamp"
                    placeholder="请选择日期">
                    </el-date-picker>  
                     </div>
                     <div  class="manageDistrict_td Item_position table_w4"><span  class="addItem" @click="addItem()" v-if="keys==0"> </span><span  class="reduceItem" @click="reduceItem(keys)" v-else> </span></div>
                 </div>
                </div>
            </el-col>   
            </el-row>
           <el-row>
            <el-col :span="24">
                <h2 class="manageDistrict_h2">合作附件</h2>
            </el-col>   
            </el-row>  
           <el-row>
            <el-col :span="24">
                <div class="manageDistrict_table" v-for="(form,keys) in formAll.aflcPartnerFileList" :key='keys'>
                 <div v-if="keys == 0" class="manageDistrict_tr">
                     <div class="manageDistrict_th table_w5">附件</div>
                     <div class="manageDistrict_th table_w4">操作</div>
                 </div>
                 <div class="manageDistrict_tr">
                     <div class="manageDistrict_td table_w5">
                    <span v-if="editType=='view'">
                    <a :href="formAll.aflcPartnerFileList[keys].saveAddress" target="_blank">{{formAll.aflcPartnerFileList[keys].fileName}}</a>
                    </span>
                    <span  @click="selectUpload(keys)" v-else>
                    <div class="fileNameCss" v-if="formAll.aflcPartnerFileList[keys].fileName&&!formAll.aflcPartnerFileList[keys].selectFlag">{{formAll.aflcPartnerFileList[keys].fileName}}</div>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="formAll.aflcPartnerFileList[keys].saveAddress"  @fileNmeChange = 'fileNmeChange' v-else/>
                    </span>
                    </div>
                     <div  class="manageDistrict_td Item_position table_w4"><span  class="addItem" @click="addItemFile()" v-if="keys==0"> </span><span  class="reduceItem" @click="reduceItemFile(keys)" v-else> </span></div>
                 </div>
                </div>
            </el-col>   
            </el-row>               

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="add_data">确 定</el-button>
          <el-button @click="close()">取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import {data_get_aflcPartner_update,data_get_aflcPartner_Id} from '@/api/users/district/manageDistrict.js'
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import { eventBus } from '@/eventBus'
import Upload from '@/components/Upload/singlei'
export default {
  components:{
  },
  props:{
    params:{
      type:[Object,String,Array,Number],
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
        const areaNameValidator = (rule, val, cb) => {
            if(val){
            if(val.length<1){
            cb(new Error('所属地区不能为空'))
            }
            else{
                cb()
            }                 
            }else{
            cb(new Error('所属地区不能为空'))
            }
        }

    //    选择区代公司名称校验
        const partnerCompanyValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('区代公司名称不能为空'))
            }
            else{
                cb()
            }        
        }

    //    选择区代公司名称校验
        const partnerNameValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('联系人不能为空'))
            }
            else{
                cb()
            }        
        }

    //    选择签约日期校验
        const signingDateValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('签约日期不能为空'))
            }
            else{
                cb()
            }        
        }
    //    选择合同开始日期校验
        const contractStartDateValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('合同开始日期不能为空'))
            }
            else{
                cb()
            }        
        }
    //    选择合同结束日期校验
        const contractEndDateValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('合同结束日期不能为空'))
            }
            else{
                cb()
            }        
        }        

    //    手机号校验
        const ownerPhoneValidator = (rule, val, cb) => {
            let phoneTest = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
            !val && cb(new Error('场主手机号码不能为空'))
            if(!(phoneTest.test(val))){
                cb(new Error('请输入正确的手机号码格式'))
            } 
            else{
               cb()
            }  
        }

        return{
        AreaName:null,    
        areaStatus:null,
        selectFlag:null,
        options:regionDataPlus,
        dialogFormVisible_add: false,
        formLabelWidth:'120px',
        inputKey:null,
        formAll:{
            partnerCompany:null,
            partnerName:null,
            mobile:null,
            areaName:[],
            areaCode: [],
            province:null,
            city:null,
            area:null,
            signingDate:null,
            contractStartDate:null,
            contractEndDate:null,
            aflcPartnerAreaList:[{
            areaName: [],
            areaCode: [],
            province:null,
            city:null,
            area:null,
            contractStartDate:null,
            contractEndDate:null,
            selectFlag:null,
            }],
            aflcPartnerFileList:[{
            saveAddress:null,    
            fileName:null,    
            selectFlag:null,
            }]       
        },
         rulesForm:{
            partnerCompany:{trigger:'change',required:true,validator: partnerCompanyValidator},     
            mobile:{trigger:'change',required:true,validator: ownerPhoneValidator},
            partnerName:{trigger:'change',required:true,validator: partnerNameValidator},            
            areaName:{trigger:'change',required:true,validator: areaNameValidator},         
            signingDate:{trigger:'change',required:true,validator: signingDateValidator},
            contractStartDate:{trigger:'change',required:true,validator: contractStartDateValidator},  
            contractEndDate:{trigger:'change',required:true,validator: contractEndDateValidator},                                             
            },
        }
  },
  components:{
      Upload
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
                console.log('val',val)
                 this.$refs['formAll'].resetFields();
                 this.formAll.address = null;
                 this.selectFlag = null;
                 this.AreaName = null;
                this.formAll.aflcPartnerAreaList=[{
                areaName: [],
                areaCode: [],
                province:null,
                city:null,
                area:null,
                contractStartDate:null,
                contractEndDate:null,
                selectFlag:null,
                }]
                this.formAll.aflcPartnerFileList=[{
                saveAddress:null,    
                fileName:null,    
                selectFlag:null,
                }]   
                this.areaStatus = null 
                }
        },
    },
  },
  mounted(){
    this.getMoreInformation();
  },
  methods:{
   // 省市状态表
     changeSelect(){
            if(this.editType=='add'){
                this.selectFlag=null
            } else{
                this.selectFlag='1'
            }
            },  
    changeSelect1:function(i){
            if(this.editType==='add'){
                this.formAll.aflcPartnerAreaList[i].selectFlag=null
            } else{
                this.formAll.aflcPartnerAreaList[i].selectFlag='1'
            }
            this.$forceUpdate()
    },              
      changeInput:function(i){
        this.inputKey = i;
        console.log(i)
        },
      selectUpload(i){
        this.selectIndex = i;
            if(this.editType=='add'){
                this.formAll.aflcPartnerFileList[i].selectFlag=null
            } else{
                this.formAll.aflcPartnerFileList[i].selectFlag='1'
            }
            this.$forceUpdate()
      },
      fileNmeChange(i){
      this.formAll.aflcPartnerFileList[this.selectIndex].fileName = i
      },
        handleChange(d){
           console.log('d',d)
           if(d.length<3){
                this.$message.info('请选择具体的城市');
                this.formAll.areaName = [];
                this.formAll.areaCode = [];
                this.formAll.province = null
                this.formAll.city = null
                this.formAll.area = null
           }
           else{
                this.formAll.areaCode = d
                this.formAll.province = CodeToText[d[0]]
                this.formAll.city =  CodeToText[d[1]]
                if(d[2]==''){
                this.formAll.area = null
                }
                else{
                this.formAll.area = CodeToText[d[2]]
                }
           }
        },
         handleChange1(d){
           console.log('d',d)
           if(d.length<3){
                this.$message.error('请选择具体的城市');
                this.formAll.aflcPartnerAreaList[this.inputKey].areaName = [];
                this.formAll.aflcPartnerAreaList[this.inputKey].areaCode = [];
                this.formAll.aflcPartnerAreaList[this.inputKey].province = null
                this.formAll.aflcPartnerAreaList[this.inputKey].city = null
                this.formAll.aflcPartnerAreaList[this.inputKey].area = null
           }
           else{
                this.formAll.aflcPartnerAreaList[this.inputKey].areaCode = d
                this.formAll.aflcPartnerAreaList[this.inputKey].province = CodeToText[d[0]]
                this.formAll.aflcPartnerAreaList[this.inputKey].city =  CodeToText[d[1]]
                if(d[2]==''){
                this.formAll.aflcPartnerAreaList[this.inputKey].area = null
                }
                else{
                this.formAll.aflcPartnerAreaList[this.inputKey].area = CodeToText[d[2]]
                }
           }
        },  

   openDialog:function(){
    if(this.editType=='view'){
        data_get_aflcPartner_Id(this.params.id).then(res=>{
        console.log('1',res)
            this.formAll.partnerCompany=res.data.partnerCompany
             this.formAll.partnerName=res.data.partnerName
             this.formAll.mobile=res.data.mobile
             this.formAll.areaCode=res.data.areaCode
             this.formAll.province=res.data.province
             this.formAll.city=res.data.city
             this.formAll.area=res.data.area
             this.formAll.signingDate=res.data.signingDate
             this.formAll.contractStartDate=res.data.contractStartDate
             this.formAll.contractEndDate=res.data.contractEndDate
             this.formAll.aflcPartnerAreaList = res.data.aflcPartnerAreaList
             this.formAll.aflcPartnerFileList = res.data.aflcPartnerFileList
             this.AreaName = res.data.belongCity
        })
     this.dialogFormVisible_add = true;
    }
    else{
    if(!this.params.id){
        this.$message.info('未选中需要修改内容');
    }
    else{
        data_get_aflcPartner_Id(this.params.id).then(res=>{
        console.log('2',res)
            this.formAll.partnerCompany=res.data.partnerCompany
             this.formAll.partnerName=res.data.partnerName
             this.formAll.mobile=res.data.mobile
             this.formAll.areaCode=res.data.areaCode
             this.formAll.province=res.data.province
             this.formAll.city=res.data.city
             this.formAll.area=res.data.area
             this.formAll.signingDate=res.data.signingDate
             this.formAll.contractStartDate=res.data.contractStartDate
             this.formAll.contractEndDate=res.data.contractEndDate
             this.formAll.aflcPartnerAreaList = res.data.aflcPartnerAreaList
             this.formAll.aflcPartnerFileList = res.data.aflcPartnerFileList
             this.AreaName = res.data.belongCity
             console.log('2', this.formAll.contractStartDate)
        })
        
         this.dialogFormVisible_add = true;
    }
    }
   },
   change:function(){
      this.dialogFormVisible_add = false;
   },
   close:function(){
      this.dialogFormVisible_add = false;
       },
    getMoreInformation(){
    
          }, 
    changeList(){
            eventBus.$emit('pushListtwo')
        },  
    // 合作区域新增
    addItem(){
           this.formAll.aflcPartnerAreaList.push({
            areaName: [],
            areaCode: [],
            province:null,
            city:null,
            area:null,
            contractStartDate:null,
            contractEndDate:null,
           }) 
        },
//    合作区域删除
    reduceItem(i){
            if(this.formAll.aflcPartnerAreaList.length>1){
            this.formAll.aflcPartnerAreaList.splice(i,1);
            }
            else{
                return
    }
   },   
    // 区域附件新增
    addItemFile(){
           this.formAll.aflcPartnerFileList.push({
            fileName:null,       
           }) 
        },
//    区域附件删除
    reduceItemFile(i){
            if(this.formAll.aflcPartnerFileList.length>1){
            this.formAll.aflcPartnerFileList.splice(i,1);
            }
            else{
                return
    }
   },     
   // 省市状态表
     changeSelect(){
                this.selectFlag='1'
            },         
    add_data(){
       this.$refs['formAll'].validate(valid=>{
        if(valid){
            if(typeof(this.formAll.areaCode)!=='string')
            {
            if(this.formAll.area){
               this.areaStatus = this.formAll.areaCode[2]
            }
            else{
               this.areaStatus = this.formAll.areaCode[1]
            }
            }
           else{
           this.areaStatus = this.formAll.areaCode
          }
            let aflcPartnerAreaList = []
            let aflcPartnerFileList = []
            this.formAll.aflcPartnerAreaList.map((list,index)=>{
                    if(typeof(this.formAll.aflcPartnerAreaList[index].areaCode)!=='string')
                     {   
                    if(list.area){
                    this.formAll.aflcPartnerAreaList[index].areaCode = this.formAll.aflcPartnerAreaList[index].areaCode[2]
                    }
                    else{
                       this.formAll.aflcPartnerAreaList[index].areaCode = this.formAll.aflcPartnerAreaList[index].areaCode[1]
                    }
                    }
                    else{
                    this.formAll.aflcPartnerAreaList[index].areaCode = this.formAll.aflcPartnerAreaList[index].areaCode
                   }                    
                        aflcPartnerAreaList.push(
                            {
                                province:list.province,
                                city:list.city,
                                area:list.area,     
                                areaCode:list.areaCode,          
                                contractStartDate:list.contractStartDate,
                                contractEndDate:list.contractEndDate,       
                            }
                        )
            })
            this.formAll.aflcPartnerFileList.map((list,index)=>{
            aflcPartnerFileList.push({
                saveAddress:list.saveAddress,   
                fileName:list.fileName,    
            })
            })
        let forms=
            {
            areaCode:this.areaStatus,
            province:this.formAll.province,
            city:this.formAll.city,
            area:this.formAll.area,
            tradeName:this.formAll.tradeName,
            address:this.formAll.address,
            partnerCompany:this.formAll.partnerCompany,
            mobile:this.formAll.mobile,            
            partnerName:this.formAll.partnerName,
            signingDate:this.formAll.signingDate,
            contractStartDate:this.formAll.contractStartDate, 
            contractEndDate:this.formAll.contractEndDate,
            aflcPartnerFileList:aflcPartnerFileList,
            aflcPartnerAreaList:aflcPartnerAreaList,
            id:this.params.id
        }
        
        data_get_aflcPartner_update(forms).then(res=>{
           this.$message.success('修改成功');
           this.changeList();
           this.dialogFormVisible_add = false;
           console.log(res);

        }).catch(res=>{
            this.$message.error('修改失败')
            this.changeList();
            this.dialogFormVisible_add = false;
           console.log(res);
        })
       }
       })
    }
  }
}
</script>


<style lang="scss">
.shoppingDialog{
     display: inline-block;
    .el-button{
            padding: 5px 15px 7px;
        }
    .newmanageDistrict{
        display: inline-block;
        .el-input{
            width: 220px;
        }
        .manageDistrict_h2{
            margin:10px 10px; 
        }
        .manageDistrict_table{
            width: 80%;
            border-top: 1px solid #d0d7e5;
            border-left: 1px solid #d0d7e5;
            margin-left:10%;
            .Item_position{
                position: relative;
                .addItem{
                    top: 7px;
                    left:35%;
                }                
                .reduceItem{
                    top: 7px;
                    left:35%;
                }
            }
            .manageDistrict_tr{
             height: 40px;
             line-height: 40px;
             overflow: hidden;
             border-bottom: 1px solid #d0d7e5;
            }
            .manageDistrict_th{
            float: left;
            display: inline-block;
            background: #EAF0FF;
            text-align: center;
            border-right: 1px solid #d0d7e5;
           }
            .manageDistrict_td{
            float: left;
            display: inline-block;
            text-align: center;
            border-right: 1px solid #d0d7e5;   
            box-sizing: border-box;
            .el-input{
                width:100%;
            }
           }
           .table_w1{width: 30%}
           .table_w2{width: 30%}
           .table_w3{width: 30%}
           .table_w4{width: 10%;height: 40px;}
           .table_w5{width: 90%}
        }
        .fileNameCss{
            width: 100%;
            height: 40px;
            color: #3e9ff1;
        }
    }
}
</style>
