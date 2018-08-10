<template>
     <div class="creatDialog commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newMarketingCity">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change">
        <el-form>
          <el-row>
              <el-col>
            <div class="swith">
            启用状态：
            <el-switch
            v-model="switchTab"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
             </div>
              </el-col>
          </el-row>
 
          <el-row>
            <el-col :span="24">
             <table class="ht_table">
            <tbody>
             <tr>
             <th width="150">所属区域</th>
             <th width="100">车辆类型</th>
             <th width="150">车主抽佣等级</th>                            
             <th width="100">开始抽佣单数</th>
             <th width="100">开始抽佣单数</th>
             <th width="100">每单抽佣比例</th>
             <th width="100">至少抽佣金额</th>        
            </tr>
             <tr>
             <td><GetCityList  ref="area"></GetCityList></td>
             <td> 
                 <el-select v-model="MaidLevelValueCar" clearable placeholder="请选择" >
                          <el-option
                             v-for="item in MaidLevel"
                              :key="item.code"
                             :label="item.name"
                              :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
            </td>
             <td>
                  <el-select v-model="newValueCar" clearable placeholder="请选择" >
                          <el-option
                             v-for="item in optionsCar"
                              :key="item.code"
                             :label="item.name"
                              :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>  
             </td>
             <td><el-input min="0" maxlength="5" v-model.number="age"></el-input></td>
             <td><el-input></el-input></td>
             <td><el-input></el-input></td>
             <td><el-input></el-input></td>
            </tr>
            </tbody>
             </table>
            </el-col>
          </el-row>

          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.stop="onSubmit" v-show="editType!='view'" >确 定</el-button>
          <el-button @click="close('xinzengform')" v-show="editType!='view'">取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel} from '../../../api/server/areaPrice.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
import { eventBus } from '@/eventBus'
import {data_get_shipper_type,data_get_shipper_create,data_get_shipper_change,data_get_shipper_view} from '../../../api/users/shipper/all_shipper.js'
export default {
  components:{
    Upload,
    GetCityList
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
        return{
        dialogFormVisible_add: false,
        switchTab:0,
        newValueCar:'',
        MaidLevelValueCar:'',
        optionsCar:[{ code:null,name:'全部'}],
        MaidLevel:[{ code:null,name:'全部'}],
        age:null
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
    
    dialogFormVisible_add:{
        handler: function(val, oldVal) {
           
            // if(!val){
            //     this.selectFlag=false;
            //     this.$refs.xinzengform.resetFields();
            //     if(this.editType == 'add'){
            //         this.xinzengform = {
            //             registerOrigin:'WEB',
            //             isDirectional: '0',
            //         }
            //     }
            //     if(this.$refs.area){
            //         this.$refs.area.selectedOptions = [];
            //     }
            // }
        },
    },
  },
  components:{
        GetCityList,
  },
  mounted(){
    //按钮类型text,primary...
    this.type = this.btntype;
    //按钮文本内容
    this.text = this.btntext;
    //弹出框标题
    this.title = this.btntitle;
    this.getMoreInformation();
  },
  methods:{
   openDialog:function(){
       this.dialogFormVisible_add = true;
   },
   change:function(){
      this.dialogFormVisible_add = false;
   },
   close:function(){
      this.dialogFormVisible_add = false;
       },
            //获取  服务和车辆 类型列表
    getMoreInformation(){
                data_CarList().then(res=>{
                    // console.log(res.data)
                    res.data.map((item)=>{
                        this.optionsCar.push(item);
                    })
                    })
                data_MaidLevel().then(res=>{
                      res.data.map((item)=>{
                        this.MaidLevel.push(item);
                    })
                
                      
                }).catch(res=>{
                    console.log(res)
                });    
                
          }       
  }
}
</script>
<style lang="scss" scoped>
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
    }
    .ht_table{
        width: 934px;
        margin:0px 10px;
        color: #333;
        border-left:1px solid #d0d7e5;
        border-bottom:1px solid #d0d7e5;
        tr{
            width: 100%;
            line-height: 34px;
            height: 34px;
        }
        th{
            background: #EAF0FF;
            border-top:1px solid #d0d7e5;
            border-right:1px solid #d0d7e5;
        }
        td{
            border-top:1px solid #d0d7e5;
            text-align: center;
            border-right:1px solid #d0d7e5;
        }
        }
</style>

<style lang="scss" >
    .newMarketingCity{
        .el-dialog{
            width: 955px!important;
        }
        .swith{
            margin:0px 10px 10px 10px;
        }
    }
</style>