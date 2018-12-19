<template>
     <div class="shoppingDialog commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle" top=5vh v-dialogDrag>
        <el-form ref="formAll" :label-width="formLabelWidth">          
          <el-row>
            <el-col :span="24">
                <div class="manageShopping_table" v-for="(form,keys) in formAll.aflcPartnerAreaList" :key='keys'>
                 <div v-if="keys == 0" class="manageShopping_tr">
                     <div class="manageShopping_th table_w1">序号</div>
                     <div class="manageShopping_th table_w2">分类名称</div>
                     <div class="manageShopping_th table_w3">分类简要说明</div>
                     <div class="manageShopping_th table_w4">货物名称</div>
                     <div class="manageShopping_th table_w5">分类单位</div>
                     <div class="manageShopping_th table_w6">体积（方）</div>
                     <div class="manageShopping_th table_w7">重量(KG)</div>
                     <div class="manageShopping_th table_w8">上传分类简图</div>
                     <div class="manageShopping_th table_w9">与标准分类比例</div>
                     <div class="manageShopping_th table_w10">操作</div>
                 </div>
                 <div class="manageShopping_tr">
                     <div class="manageShopping_td table_w1" @click="changeInput(keys)">
                         {{keys+1}}
                      </div>
                     <div class="manageShopping_td table_w2">
                         <el-input> </el-input>
                     </div>
                     <div class="manageShopping_td table_w3">
                         <el-input> </el-input>
                     </div>
                     <div class="manageShopping_td table_w4">
                         <el-input> </el-input>
                     </div>
                     <div class="manageShopping_td table_w5">
                         <el-input> </el-input>
                     </div>
                     <div class="manageShopping_td table_w6">
                         <el-input> </el-input>
                     </div>
                     <div class="manageShopping_td table_w7">
                         <el-input> </el-input>
                     </div>
                     <div class="manageShopping_td table_w8">
                         <el-input> </el-input>
                     </div>
                     <div class="manageShopping_td table_w9">
                         <el-input> </el-input>
                     </div>
                     <div class="manageShopping_td Item_position table_w10">
                         <span  class="addItem" @click="addItem()" v-if="keys==0"> </span><span  class="reduceItem" @click="reduceItem(keys)" v-else> </span>
                     </div>
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
import {data_get_aflcTradeArea_create,data_get_aflcTradeArea_Id} from '@/api/users/district/shoppingDistrict.js'
import GetCityList from '@/components/GetCityList/city'
import ShoppingMap from '@/components/map/shoppingMap'
import { eventBus } from '@/eventBus'
export default {
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
  },
  data(){

        return{
        selectFlag:null,
        dialogFormVisible_add: false,
        formLabelWidth:'190px',
        formAll:{
            aflcPartnerAreaList:[{
            areaName: null,
            areaCode: null,
            province:null,
            city:null,
            area:null,
            contractStartDate:null,
            contractEndDate:null,
            selectFlag:null,
            }],
        },
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
            }
        },
    },
  },
  mounted(){
  },
  computed:{
    
  },
  components:{

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
   changeList(){
            eventBus.$emit('pushListtwo')
    },
    // 增加分类
    addItem(){
            if(this.editType=='view'){
            return false
            }else{        
           this.formAll.aflcPartnerAreaList.push({
            areaName: [],
            areaCode: [],
            province:null,
            city:null,
            area:null,
            contractStartDate:null,
            contractEndDate:null,
            }) 
            }
        },    
    // 减少分类
    reduceItem(i){
            if(this.formAll.aflcPartnerAreaList.length>1){
            this.formAll.aflcPartnerAreaList.splice(i,1);
            }
            else{
                return
        }
    },  

   add_data(){

    },

  }
}
</script>


<style lang="scss">
.shoppingDialog{
     display: inline-block;
        .el-dialog{
         width: 1200px!important;
     }
    .el-button{
        padding: 7px 15px 7px;
        }
        .manageShopping_table{
            width: 100%;
            border-top: 1px solid #d0d7e5;
            border-left: 1px solid #d0d7e5;
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
            .manageShopping_tr{
             height: 40px;
             line-height: 40px;
             overflow: hidden;
             border-bottom: 1px solid #d0d7e5;
            }
            .manageShopping_th{
            float: left;
            display: inline-block;
            background: #EAF0FF;
            text-align: center;
            border-right: 1px solid #d0d7e5;
           }
            .manageShopping_td{
            float: left;
            display: inline-block;
            text-align: center;
            border-right: 1px solid #d0d7e5;   
            box-sizing: border-box;
            .el-cascader{
                width: 100%;
            }
            .el-input{
                width:100%;
            }
           }
            .viewWidth{width: 100%;display: inline-block;
                    a{
                        color: #409EFF
                    }
           }
           .table_w1{width: 5%}
           .table_w2{width: 12%}
           .table_w3{width: 10%}
           .table_w4{width: 12%}
           .table_w5{width: 10%}
           .table_w6{width: 10%}
           .table_w7{width: 10%}
           .table_w8{width: 11%}
           .table_w9{width: 10%}
           .table_w10{width: 10%;height: 40px;}
        }
}
.info_news .shoppingDialog .el-button{
        padding: 0px 15px 0px;
}
</style>
