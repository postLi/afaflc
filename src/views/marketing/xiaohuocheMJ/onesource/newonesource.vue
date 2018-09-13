<template>
    <div class="vestonceDialog commoncss">
       <el-button  :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">新增</el-button>
            <el-dialog title="马甲单源" :visible="driverTemplateDialogFlag" :before-close="change">
            <div class="vestOrder">
            <el-form :inline="true" :model="vestAll" ref="vestAll" :rules="rulesForm1">
             <el-row>
            <el-col :span="12">
          <el-form-item label="服务类型" :label-width="formLabelWidth" prop="serivceCode">
                    <el-select v-model="vestAll.serivceCode" clearable placeholder="请选择">
                        <el-option
                        v-for="item in serviceCardList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
           </el-form-item>
            </el-col>
            <el-col :span="12">            
            <el-form-item label="片区名称：" :label-width="formLabelWidth" prop="districtName">
            <el-input @focus="()=>{showMap('districtName')}" v-model="vestAll.districtName"></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">   
            <el-form-item label="中心地址：" :label-width="formLabelWidth" prop="districtAddress">
            <el-input @focus="()=>{showMap('districtAddress')}" v-model="vestAll.districtAddress"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">
            <span >
            <el-form-item label="省市：" :label-width="formLabelWidth" prop="areaName">
                    <vregion :ui="true" @values="regionChange" class="form-control">
                        <el-input v-model="vestAll.areaName" placeholder="请选择省/市/区/街道"></el-input>
                    </vregion>
            </el-form-item>
                 </span>
            </el-col>
            </el-row>
             </el-form>    
             </div>
           <div class="vestAddress">
               <div class="vestAera">
                   <h4>提货地</h4>
                   <div class="el_vestsearch">
                       <div class="vest_section"  v-for="(form,keys) in pickAera" :key='keys'>
                         <div class="vest_tree" v-if="keys == 0" >
                             <el-input @focus="()=>{showMap('pickaddAera')}" v-model="pickaddAera"></el-input>
                             <el-button class="el-icon-plus" @click="addpickAera"></el-button>
                             </div>
                         <div class="vest_tree" v-else>
                             <span class="vest_tree_span">{{form.pickAeratree}}</span>
                             <el-button class="el-icon-minus"  @click="reduceItempick(keys)"></el-button>
                       </div>     
                       </div>                  
                   </div>
               </div>

               <div class="vestAera">
                   <h4>目的地</h4>
                   <div class="el_vestsearch">

                       <div class="vest_section"  v-for="(form,keys) in destinationAera" :key='keys'>
                         <div class="vest_tree" v-if="keys == 0" >
                             <el-input @focus="()=>{showMap('destinationaddAera')}" v-model="destinationaddAera"></el-input>
                             <el-button class="el-icon-plus" @click="adddestinationAera"></el-button>
                             </div>
                         <div class="vest_tree" v-else>
                             <span class="vest_tree_span">{{form.destinationAeratree}}</span>
                             <el-button class="el-icon-minus"  @click="reduceItemdestination(keys)"></el-button>
                       </div>     
                       </div>                  
                   </div>
               </div>

               <div class="vestAera">
                   <h4>马甲单源预览</h4>
                   <div class="el_vestsearch">
                       <div class="vest_section" v-for="(value,keys) in totalAeraData" :key='keys'>
                         <div class="vest_tree">
                             <span class="vest_tree_span">{{value.endAddress}}-{{value.startAddress}}</span>
                       </div>     
                       </div>                  
                   </div>
               </div>

           </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="changeInfoSave1">保 存</el-button>
                        <el-button @click="close1()">取 消</el-button>
                    </div>
                    
            </el-dialog>
            <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" />
    </div>
</template>
<script>
import { data_ServerClassList} from '@/api/server/areaPrice.js'
import  { data_get_onesource_list,data_add_onesource_list,data_Del_onesource,data_UseStates_onesource,data_get_onesourceAddress_list,data_Del_onesourceAddress,data_get_onesource_Id,data_get_onesource_update} from '@/api/vest/onesource/onesource.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
import { eventBus } from '@/eventBus'
import vregion from '@/components/vregion/Region'
import tmsmap from '@/components/map/index'
export default {
data(){
        //    选择省市校验
            const belongCityNameValidator = (rule, val, cb) => {
             if(!val) {
                    cb(new Error('请选择所在地'))
                }
             else{
                cb()
            }                   
            }

        //    选择服务类型校验
            const serivceCodeValidator = (rule, val, cb) => {
                if(!val){
                cb(new Error('服务类型不能为空'))
                }
                else{
                    cb()
                }        
            }

        //    片区名称校验
            const districtNameValidator = (rule, val, cb) => {
                if(!val){
                cb(new Error('片区名称不能为空'))
                }
                else{
                    cb()
                }
            }

        //    片区名称校验
            const districtAddressValidator = (rule, val, cb) => {
                if(!val){
                cb(new Error('片区名称不能为空'))
                }
                else{
                    cb()
                }
            }
    return{
            popVisible:false,
            driverTemplateDialogFlag: false,// 弹框控制的控制
            title:'',
            text:'',
            shipperTypeName:'',
            shipperType:'',
            formLabelWidth:'120px',
            serviceCardList:[],
            serviceValue:null,
            vestAll:{
            serivceCode:null,
            districtName:null,
            districtAddress:null,
            areaCode:null,
            longitude:null,
            latitude:null,
            areaName:null,
            areaCode:null,
            flcVestUnisourceAddressaList:[
            ]
            },
            pickAera:[{
            }],
            destinationAera:[{
            }],
            pickaddAera:'',
            destinationaddAera:'',
            endAddressName:'',
            endAddress:'',
            startAddress:'',
            rulesForm1:{
            areaCode:{trigger:'change',required:true,validator: belongCityNameValidator},
            serivceCode:{trigger:'change',required:true,validator:serivceCodeValidator},
            districtName:{trigger:'change',required:true,validator:districtNameValidator},
            districtAddress:{trigger:'change',required:true,validator:districtAddressValidator},
            },    
    }
},
props:{
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
        openbtn:{
            type: Boolean,
            default: false
        },
},
components:{
    GetCityList,
    tmsmap,
    vregion
},
    computed:{
     totalAeraData(){
        let AeraData=[];
        for(var i = 1; i<this.pickAera.length;i++){
            for(var j = 1;j<this.destinationAera.length;j++)
            {
                  AeraData.push(
                      {
                          startAddress:this.pickAera[i].pickAeratree,
                          startAddressName:this.pickAera[i].startAddress,
                          startAddressCoordinate:this.pickAera[i].startAddressCoordinate,
                          endAddress:this.destinationAera[j].endAddress,
                          endAddressCoordinate:this.destinationAera[j].endAddressCoordinate,
                          endAddressName:this.destinationAera[j].destinationAeratree,

                      }
                  )
            }
        }
        return AeraData
     },
    },
methods:{
        // 省市区
        regionChange(d) {
                this.vestAll.areaCode = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                this.vestAll.areaName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
        },
             getValue(obj){
                return obj ? obj.value:'';
        },
     // 类型列表
        getMoreInformation(){
                data_ServerClassList().then(res=>{
                     res.data.map((item)=>{
                         console.log('fd');
                        this.serviceCardList.push(item);
                    })
                }).catch(res=>{
                    console.log(res)
                });
            },
        openDialog(){
            this.driverTemplateDialogFlag=true;
        },
        //弹框控制
        change() {
         this.driverTemplateDialogFlag = false;
        },
        // 提货地增加
        addpickAera(){
            if(this.pickaddAera=='')
            {
                return
            }
                this.pickAera.push({
                    pickAeratree:this.pickaddAera,
                    startAddress:this.startAddress,
                    startAddressCoordinate:this.startAddressCoordinate,
                }); 
            console.log(this.pickAera)
            console.log('totalAeraData',this.totalAeraData)
        },
        // 提货地减少
        reduceItempick(i){
          this.pickAera.splice(i,1);
        },
        // 目的地增加
        adddestinationAera(){
            if(this.destinationaddAera=='')
            {
                return
            }
                this.destinationAera.push({
                    destinationAeratree:this.destinationaddAera,
                    endAddress:this.endAddress,
                    endAddressCoordinate:this.endAddressCoordinate
                }); 
                        console.log('totalAeraData',this.totalAeraData)
        },
        // 目的地减少
        reduceItemdestination(i){
          this.destinationAera.splice(i,1);
        },
      showMap(name) {
            this.popVisible = true ;
            this.current = name;
        },
      getInfo(pos, name, info) {
        console.log('info',info.addressComponent)
            switch (this.current) {
                case 'districtName':
                this.vestAll.districtName = info.formattedAddress;
                break;
                case 'districtAddress':
                this.vestAll.districtAddress = info.formattedAddress;
                let tude= pos.split(",");
                let longitude=tude[0]
                let latitude=tude[1]
                this.vestAll.longitude = longitude;
                this.vestAll.latitude = latitude;
                break;
                case 'vestdistrictName':
                this.formAll.districtName = info.formattedAddress;
                break;
                case 'pickaddAera':
                this.pickaddAera = info.addressComponent.province+info.addressComponent.township;
                this.startAddress = info.formattedAddress
                this.startAddressCoordinate = pos
                  
                break;
                case 'destinationaddAera':
                this.destinationaddAera = info.addressComponent.province+info.addressComponent.township;
                this.endAddress = info.formattedAddress;
                this.endAddressCoordinate = pos;
                break;
                case 'areaCode2':
                this.formAll2.startAddress = info.formattedAddress;
                break;
                case 'districtName2':
                this.formAll2.endAddress = info.formattedAddress;
                break;
                case 'selectdistrictName':
                this.selectRowData.districtName = info.formattedAddress;
                break;
                case 'selectdistrictAddress':
                this.selectRowData.districtAddress = info.formattedAddress;
                break;
            }
        },  
        //弹框控制
        change() {
         this.driverTemplateDialogFlag = false;
         this.openFlag='';
         this.vestAll={
            serivceCode:null,
            districtName:null,
            districtAddress:null,
            areaCode:null,
            longitude:null,
            latitude:null,
            areaName:null,
            areaCode:null,
            flcVestUnisourceAddressaList:[
            ]
            }
            this.creadFlag = false;
        },
        // 关闭小表窗
        close1(){
        this.driverTemplateDialogFlag=false;
        this.vestAll={
            serivceCode:null,
            districtName:null,
            districtAddress:null,
            areaCode:null,
            latitude:null,
            longitude:null,
            flcVestUnisourceAddressaList:[
            ]
            }
        },
        //完善数据
        completeData(){
            },
      // 新增保存
        changeInfoSave1(){
            this.vestAll.flcVestUnisourceAddressaList=this.totalAeraData;
            if(this.totalAeraData.length==0){
                this.$message.warning('请输入至少一组提货地和目的地');
                return;
            }
            else{
            this.$refs['vestAll'].validate(valid=>{
            var forms= Object.assign({}, this.vestAll)
              console.log(forms)
                if(valid){
                data_add_onesource_list(forms).then(res=>{
                console.log('res',res);
                 this.driverTemplateDialogFlag=false;
                 this.$message.success('新增成功');
                 this.$emit('getData')
                })
                }
                })
            }
        },
},
watch:{

},
created(){
if(this.openbtn){
   this.openDialog();
}
    },
mounted(){
this.getMoreInformation();
}
}
</script>
<style  lang="scss" scoped>
    .vestonceDialog{
        display: inline-block;
    }
    .el-button{
            margin-right:20px;
            padding:10px 20px;
    }
    .commoncss .el-dialog .el-input {
    width: 250px;
    }
    .price_one{
            width:105px!important;
            margin-right: 10px;
    }
    .price_two{
            width:105px!important;
            margin-left: 10px;
    }    
    .vestOrder{
        width: 100%;
        border-bottom: 2px dashed #ccc;
    }
    .vestAddress{
        display: flex;
        margin-top:10px;
    .vestAera{
        flex-basis: 230px;
        margin-left:50px;
        h4{
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #666;
            margin-bottom: 5px;
        }
        .el_vestsearch{
            width: 230px;
            height: 356px;
            margin-bottom: 12px;
            overflow: auto;
            border: 1px solid #d2d2d2;
            overflow: auto;
            .vest_rbut{
                float: right;
                margin:10px 5px 0px 10px;
            }
            .vest_section{
                width: 100%;
                float: left;
                .vest_tree{
                    display: flex;
                    align-items: center;
                    margin-top:10px;
                 .el-input{
                    flex:10;
                    margin-left:10px;   
                 }
                .vest_tree_span{
                    flex:10;
                    margin-left:15px;
                }
                button{
                    flex:1;
                    margin-left:10px;
                }
                }

            }
        }
    }
    }
</style>

<style  lang="scss">
.vestonceDialog {
    .el-dialog {
        width: 880px;
        overflow:unset!important;
        .el-input{
        width: 250px;
        }
.chooseCityList .el-cascader .el-input {
    width: 250px;
}
}
}

</style>
