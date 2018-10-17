<template>
     <div class="shoppingDialog commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle" top=5vh v-dialogDrag>
        <el-form ref="formAll" :model="formAll" :rules="rulesForm" :inline="true">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="区代公司名称 ：" :label-width="formLabelWidth" prop="partnerCompany">
                        <el-autocomplete
                        class="inline-input"
                        v-model="formAll.partnerCompany"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        @keyup.native = "handblur"
                        ></el-autocomplete>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="联系人 ：" :label-width="formLabelWidth" prop="partnerName">
                    <el-input v-model="formAll.partnerName" :disabled="inputdisabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号码 ：" :label-width="formLabelWidth" prop="mobile">
                    <el-input v-model="formAll.mobile" :disabled="inputdisabled"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <span v-if='inputdisabled'>
                        <el-form-item label="所在地 ：" :label-width="formLabelWidth" prop="">
                        <el-input v-model="areaName" :disabled="inputdisabled"></el-input>
                        </el-form-item>
                    </span>
                    <span v-else>
                    <el-form-item label="所在地 ：" :label-width="formLabelWidth" prop="areaName">
                    <GetCityList ref="area" v-model="formAll.areaName"  @returnStr="getStr"></GetCityList>
                    </el-form-item>
                    </span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="签约时间 ：" :label-width="formLabelWidth" prop="signingDate">
                    <el-date-picker
                    v-model="formAll.signingDate"
                    type="datetime"
                    value-format="timestamp"

                    placeholder="请选择日期">
                    </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否开通28货运后台 ：" :label-width="formLabelWidth">
                        <el-radio-group v-model="isVip" >
                            <el-radio  v-for="(obj,key) in optionsStatus" :label="obj.value" :key='key'>{{obj.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="合同开始日期 ：" :label-width="formLabelWidth" prop="contractStartDate">
                    <el-date-picker
                    v-model="formAll.contractStartDate"
                    type="datetime"
                    value-format="timestamp"
                    default-time="00:00:00"
                    placeholder="请选择日期">
                    </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="合同结束日期 ：" :label-width="formLabelWidth" prop="contractEndDate">
                    <el-date-picker
                    v-model="formAll.contractEndDate"
                    type="datetime"
                    value-format="timestamp"
                    default-time="23:59:59"
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
                     <div class="manageDistrict_td table_w1" @click="changeInput(keys)">
                      <GetCityList ref="area" v-model="formAll.aflcPartnerAreaList[keys].areaName"  @returnStr="getStr1"></GetCityList>
                      </div>
                     <div class="manageDistrict_td table_w2">
                    <el-date-picker
                    v-model="formAll.aflcPartnerAreaList[keys].contractStartDate"
                    type="datetime"
                    value-format="timestamp"
                    default-time="00:00:00"
                    placeholder="请选择日期">
                    </el-date-picker>  
                     </div>
                     <div class="manageDistrict_td table_w3">
                 <el-date-picker
                    v-model="formAll.aflcPartnerAreaList[keys].contractEndDate"
                    type="datetime"
                    value-format="timestamp"
                    default-time="23:59:59"
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
                    <span  @click="selectUpload(keys)">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="formAll.aflcPartnerFileList[keys].saveAddress"  @fileNmeChange = 'fileNmeChange' />
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
</template>
<script>
import {data_get_aflcPartner_create,data_get_aflcTradeArea_Id,data_get_aflcPartner_findAuthCompany} from '@/api/users/district/manageDistrict.js'
import GetCityList from '@/components/GetCityList/city'
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
            else if(val<this.formAll.contractStartDate){
                cb(new Error('合同结束日期必须大于合同开始日期'))
            }
            else{
                cb()
            }        
        }        

    //    手机号校验
        const ownerPhoneValidator = (rule, val, cb) => {
            let phoneTest = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
            !val && cb(new Error('手机号码不能为空'))
            if(!(phoneTest.test(val))){
                cb(new Error('请输入正确的手机号码格式'))
            } 
            else{
               cb()
            }  
        }

        return{
        companyId:null,    
        areaName:null,
        areaCode:null,
        companyNameObject:{
            companyName:null,
        },
        inputdisabled:false,
        restaurants:[],
        isVip:'0',
        areaStatus:null,    
        selectFlag:null,
        dialogFormVisible_add: false,
        formLabelWidth:'160px',
        inputKey:null,
        formAll:{
            partnerCompany:null,
            partnerName:null,
            mobile:null,
            areaName:null,
            areaCode: null,
            province:null,
            city:null,
            area:null,
            signingDate:null,
            contractStartDate:null,
            contractEndDate:null,
            aflcPartnerAreaList:[{
            areaName: null,
            areaCode: null,
            province:null,
            city:null,
            area:null,
            contractStartDate:null,
            contractEndDate:null,
            }],
            aflcPartnerFileList:[{
                saveAddress:'',    
                fileName:'',   
            }]       
        },
          optionsStatus: [
              {
                value: '1',
                name: '是'
              },
              {
                value: '0',
                name: '否'
              }
            ],
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
      Upload,
      GetCityList
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
                console.log('val',val)
                 this.$refs['formAll'].resetFields();
                 this.formAll.address = null;
                 this.selectFlag = null;
                this.formAll.aflcPartnerAreaList=[{
                areaName: null,
                areaCode: null,
                province:null,
                city:null,
                area:null,
                contractStartDate:null,
                contractEndDate:null,
                }]
                this.formAll.aflcPartnerFileList=[{
                saveAddress:'',    
                fileName:'',    
                }]   
                this.areaStatus = null
                this.areaName =null,
                this.areaCode =null,
                this.companyId = null,
                this.companyNameObject.companyName = null;
                }
                else{
                this.getMoreInformation();
                }
        },
    },
  },
  mounted(){
  },
  methods:{
    //   区代公司名称
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString) === 0);
        };
      },
      handleSelect(item) {
          this.companyNameObject.companyName = item.value
          this.inputdisabled = true
        data_get_aflcPartner_findAuthCompany(1, 10, this.companyNameObject).then(res=>{
            this.formAll.partnerName = res.data[0].contactsName
            this.formAll.mobile = res.data[0].mobile
            this.areaCode = res.data[0].belongCity
            this.formAll.province = res.data[0].provinceCode
            this.formAll.city = res.data[0].cityCode
            this.formAll.area = res.data[0].areaCode
            this.areaName = res.data[0].belongCityName
            this.companyId = res.data[0].id
        })
      },
      handblur(i){
     this.formAll.partnerName = null
     this.formAll.mobile = null
     this.formAll.areaName = null
     this.inputdisabled = false
     this.companyId = null
      },
      changeInput:function(i){
        this.inputKey = i;
        console.log(i)
        },
      selectUpload(i){
        this.selectIndex = i;
      },
      fileNmeChange(i){
      this.formAll.aflcPartnerFileList[this.selectIndex].fileName = i
      },
    getStr(val,name){
                console.log('this.cityarr',val,name)
                this.formAll.areaCode = val.split(',')[2];
                this.formAll.areaName = name.split(',')[2];
                this.formAll.province = name.split(',')[0];
                this.formAll.city = name.split(',')[1];
                this.formAll.area = name.split(',')[2];
            }, 
    getStr1(val,name){
                console.log('this.cityarr',val,name)
                this.formAll.aflcPartnerAreaList[this.inputKey].areaCode = val.split(',')[2];
                this.formAll.aflcPartnerAreaList[this.inputKey].areaName = name.split(',')[2];
                this.formAll.aflcPartnerAreaList[this.inputKey].province = name.split(',')[0];
                this.formAll.aflcPartnerAreaList[this.inputKey].city = name.split(',')[1];
                this.formAll.aflcPartnerAreaList[this.inputKey].area = name.split(',')[2];
            }, 

   openDialog:function(){
         this.dialogFormVisible_add = true;
   },
   change:function(){
      this.dialogFormVisible_add = false;
   },
   close:function(){
      this.dialogFormVisible_add = false;
       },
       
    getMoreInformation(){
         let FromData = {
             companyName:null,
        }
        data_get_aflcPartner_findAuthCompany(1, 1000, FromData).then(res=>{
         let restaurantsData = res.data;
         restaurantsData.map(res=>{
             this.restaurants.push({
                 value:res.companyName})
             console.log(this.restaurants)
         })
         
        })
        }, 
    changeList(){
            eventBus.$emit('pushListtwo')
        },  
    // 合作区域新增
    addItem(){
           this.formAll.aflcPartnerAreaList.push({
            areaName: null,
            areaCode: null,
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

   completeData(){
   for(var i=0;i<this.formAll.aflcPartnerAreaList.length;i++)
   {
     if(!this.formAll.aflcPartnerAreaList[i].province){
        this.$message.warning('合作区域都不能为空');
        return false
      }
     if(!this.formAll.aflcPartnerAreaList[i].contractStartDate){
        this.$message.warning('合作区域开始日期都不能为空');
        return false
      }
     if(!this.formAll.aflcPartnerAreaList[i].contractEndDate){
        this.$message.warning('合作区域截止日期都不能为空');
        return false
      }      
     if(this.formAll.aflcPartnerAreaList[i].contractStartDate<this.formAll.contractStartDate){
        this.$message.warning('合作区域开始日期必须大于合同开始日期');
        return false
     }
     if(this.formAll.aflcPartnerAreaList[i].contractStartDate>this.formAll.contractEndDate){
        this.$message.warning('合作区域开始日期必须小于合同结束日期');
        return false
     }
     if(this.formAll.aflcPartnerAreaList[i].contractStartDate>this.formAll.aflcPartnerAreaList[i].contractEndDate){
        this.$message.warning('合作区域结束日期必须大于合作区域开始日期');
        return false
     }
   }
   },
    add_data(){
            this.completeData(); 
            if(this.completeData()==false)
            {
               return
            }
            else{        
       this.$refs['formAll'].validate(valid=>{
           console.log('fdfdf',this.formAll)
        if(valid){
        let forms=[
            {
            companyId:this.companyId,
            openAdminManage: this.isVip,
            areaCode:this.formAll.areaCode,
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
            aflcPartnerFileList:this.formAll.aflcPartnerFileList,
            aflcPartnerAreaList:this.formAll.aflcPartnerAreaList,
        }] 
        data_get_aflcPartner_create(forms).then(res=>{
           this.$message.success('新增成功');
           this.changeList();
           this.dialogFormVisible_add = false;       
        }).catch(res=>{
            console.log('res',res.text)
            if(res.text == '区代公司已存在'){
                this.$message.error(res.text)
            }else{
            this.$message.error('新增失败')
            this.changeList();
            }

        })
       }
       })
    }
    }
  }
}
</script>


<style lang="scss">
.shoppingDialog{
     display: inline-block;
    .el-button{
        padding: 7px 15px 7px;
        }
        .el-input{
            width: 220px;
        }
        .manageDistrict_h2{
            margin:10px 10px; 
            text-align: left;
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
                    left:40%;
                }                
                .reduceItem{
                    top: 7px;
                    left:40%;
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
            .viewWidth{width: 100%;display: inline-block;
                    a{
                        color: #409EFF
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
.info_news .shoppingDialog .el-button{
        padding: 0px 15px 0px;
}
</style>
