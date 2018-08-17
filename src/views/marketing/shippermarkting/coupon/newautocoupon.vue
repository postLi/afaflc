<template>
     <div class="newcoupon commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newcoupon">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
        <el-form >
          <el-row >
            <el-col>
               <el-form-item  label="触发条件：" :label-width="formLabelWidth"> 
                       <el-radio v-model="formAllData.radio1" label="1" border>新用户注册</el-radio>
                       <el-radio v-model="formAllData.radio1" label="2" border>认证通过</el-radio>
               </el-form-item>  
            </el-col>
          </el-row>
            <el-row >
            <el-col :span="10">
               <el-form-item  label="活动名称：" :label-width="formLabelWidth">
                   <el-input></el-input>
               </el-form-item>  
            </el-col>
            <el-col :span="10">
               <el-form-item  label="活动时效：" :label-width="formLabelWidth">
                     <el-date-picker
                    v-model="formAllData.date"
                    value-format="timestamp"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']"
                    >
                    </el-date-picker>
               </el-form-item>  
            </el-col>                      
          </el-row>
          <el-row>
              <el-col :span="20">
                  
               <el-form-item  label="活动说明：" :label-width="formLabelWidth">
                   <div class="textareaBox">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="1-100间的字符"
                                    maxlength="100"
                                    ref="infofocus"
                                    v-model="formAllData.extraDes"
                                    clearable>
                                </el-input>
                                </div>
               </el-form-item>                   
              </el-col>
          </el-row>
          <el-row >
            <el-col>
               <el-form-item  label="所属区域：" :label-width="formLabelWidth"> 
                       <el-radio v-model="area" label="1" border @change="areaFlag">市级</el-radio>
                       <el-radio v-model="area" label="2" border @change="areaFlag">区级</el-radio>  
               </el-form-item>  
            </el-col>
          </el-row>
         <el-row >
            <el-col>
               <el-form-item   :label-width="formLabelWidth"> 
                 <span v-if="!areaFlags">
                <GetCityList ref="area" v-model="formAllData.areaCode" ></GetCityList>
                 </span>
                 <span v-else>
                <vregion :ui="true" @values="regionChange" class="form-control">
                    <el-input v-model="formAllData.areaCode2" placeholder="请选择出发地"></el-input>
                </vregion>
                 </span>
               </el-form-item>  
            </el-col>
          </el-row>
         <el-row >
            <el-col :span="24" >
              <div class="table_box">
            <div class="ht_table" v-for="(form,keys) in formAll" :key='keys'>
             <div class="ht_table_tr" v-if="keys == 0">
             <div class="ht_table_th1"><span  class="addItem" @click="addItem"> </span></div>
             <div class="ht_table_th table_th1" >派发数量</div>
             <div class="ht_table_th table_th2">优惠券名称</div> 
             <div class="ht_table_th table_th3">优惠券类型</div>
             <div class="ht_table_th table_th4">满减/折扣</div>
             <div class="ht_table_th table_th5">满减条件/最高抵扣</div>
             <div class="ht_table_th table_th6">支付方式</div>
             <div class="ht_table_th table_th7">开始时间</div>
             <div class="ht_table_th table_th8">过期时间</div>
             <div class="ht_table_th table_th9">适用服务类型</div>
             <div class="ht_table_th table_th10">适用车辆类型</div>
             <div class="ht_table_th table_th11">所属区域</div>
             <div class="ht_table_th table_th12">能否与大户券叠加</div>
            </div>
             <div  class="ht_table_tr">
             <div class="ht_table_td1"><span  class="reduceItem" @click="reduceItem(keys)"> </span></div>
             <div class="ht_table_td table_th1"><el-input v-model="formAll[keys].da1"></el-input></div>
             <div class="ht_table_td table_th2"><el-input v-model="formAll[keys].da2"></el-input></div> 
             <div class="ht_table_td table_th3"><el-input v-model="formAll[keys].da3"></el-input></div>
             <div class="ht_table_td table_th4"><el-input v-model="formAll[keys].da4"></el-input></div> 
             <div class="ht_table_td table_th5"><el-input v-model="formAll[keys].da5"></el-input></div>
             <div class="ht_table_td table_th6"><el-input v-model="formAll[keys].da6"></el-input></div>     
             <div class="ht_table_td table_th7"><el-input v-model="formAll[keys].da7"></el-input></div>
             <div class="ht_table_td table_th8"><el-input v-model="formAll[keys].da8"></el-input></div> 
             <div class="ht_table_td table_th9"><el-input v-model="formAll[keys].da9"></el-input></div>
             <div class="ht_table_td table_th10"><el-input v-model="formAll[keys].da10"></el-input></div>
             <div class="ht_table_td table_th11"><el-input v-model="formAll[keys].da11"></el-input></div>  
             <div class="ht_table_td table_th12"><el-input v-model="formAll[keys].da12"></el-input></div>
             <div class="ht_table_td table_th13">
                 <el-form-item  label="优惠券说明：" :label-width="formLabelWidth2"> 
                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="5-300间的字符"
                                    maxlength="200"
                                    ref="infofocus"
                                    v-model="formAll[keys].da13"
                                    clearable>
                </el-input>  
                 </el-form-item>  
                 </div>                             
            </div>
            </div>

              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary">确 定1</el-button>
          <el-button  @click="close">取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import vregion from '@/components/vregion/Region'
import { eventBus } from '@/eventBus'
import GetCityList from '@/components/GetCityList'
export default {
  components:{
    Upload,
    vregion,
  },
  props:{
    paramsView:{
      type:Object,
    },
    params:{
      type:[Object,String],
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
  components:{
      GetCityList,
        vregion
  },
  data(){
    return{
        dialogFormVisible_add:false,
        formLabelWidth:'120px',
        formLabelWidth2:'80px',
        formAllData:{
            radio1:'1',
            radio2:'2',
            date:null,
            extraDes:null,
            areaCode:null,
        },
        area:'1',
        areaFlags:false,
        formAll:[{
           da1:null,
           da2:null,
           da3:null,
           da4:null,
           da5:null,
           da6:null,
           da7:null,
           da8:null,
           da9:null,
           da10:null,
           da11:null,
           da12:null,
           da13:null,
        }]
    }
 },
  methods:{
    regionChange(d) {
                console.log('data:',d)
                this.formAllData.areaCode2 = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
    },
    getValue(obj){
                return obj ? obj.value:'';
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
    //添加子节点新增
        addItem(){
           this.formAll.push({
           da1:null,
           da2:null,
           da3:null,
           da4:null,
           da5:null,
           da6:null,
           da7:null,
           da8:null,
           da9:null,
           da10:null,
           da11:null,
           da12:null,
           }) 
        },
    reduceItem(i){
            if(this.formAll.length>1){
            this.formAll.splice(i,1);
            }
            else{
                return
    }
   },
    areaFlag(i){
        if(i==1){
         this.areaFlags = false;
        }
        else{
        this.areaFlags = true;
        }
    }
  },
}

</script>
<style lang="scss">
.newcoupon{
    .el-dialog{
        width: 1100px;
        overflow:unset;
    }
    .v-dropdown-container{
        top:35px!important;
        left:0px!important;
    }
    .el-radio.is-bordered{
        height: 30px;
        padding: 7px 20px 0 10px;
    }
     .textareaBox {
        width: 750px;
    }
    .el-input__inner{
        line-height: 30px;
        height: 30px;
    }
    .el-range__icon{
      line-height: 24px;
    }
    .el-date-editor .el-range-separator{
        line-height: 24px;
        width: 7%
    }
    .couponcost{
        margin-left:50px;
    }
    .table_box{
    .ht_table{
        width: 1080px!important;
        margin:0px 10px;
        color: #333;
        .ht_table_tr{
            width: 100%;
            overflow: hidden;
            line-height: 32px;
        }
        .ht_table_th1{
            float: left;
            padding: 5px 5px;
            width: 55px;
            height: 45px;
            line-height: 45px;
            position: relative;
             .addItem{
                 top:10px;
                 left:15px;
             }
        }
        .ht_table_th{
            float: left;
            padding: 5px 5px;
            display: inline-block;
            background: #EAF0FF;
            border-top:1px solid #d0d7e5;
            border-left:1px solid #d0d7e5;
            border-right:1px solid #d0d7e5;
            border-bottom:1px solid #d0d7e5;
        }
        .table_th1{width: 68px;}
        .table_th2{width: 82px;}
        .table_th3{width: 82px;}
        .table_th4{width: 72px;}
        .table_th5{width: 128px;}
        .table_th6{width: 68px;}
        .table_th7{width: 68px;}
        .table_th8{width: 68px;}
        .table_th9{width: 96px;}
        .table_th10{width: 96px;}
        .table_th11{width: 68px;}
        .table_th12{width: 124px;}
        .table_th13{width: 1020px}
        .ht_table_td1{
            float: left;
            padding: 5px 5px;
            width: 55px;
            height: 45px;
            line-height: 45px;
            position: relative;
             .reduceItem{
                 top:5px;
                 left:15px;
             }
        }
        .ht_table_td{
            float: left;
            text-align: center;
            display: inline-block;
            border-left:1px solid #d0d7e5;
            border-bottom:1px solid #d0d7e5;
            border-right:1px solid #d0d7e5;
            position: relative;
            .reduceItem{
                 top:5px;
                 left:25px;  
             }
            .el-form-item{
            margin-bottom: 0px!important;
            }
            .el-input{
                width:100%;
            }
        }
        .htable_div{
            display: block
        }
        .el-form-item{
            width: 100%;
            padding-top:10px;
            padding-bottom: 10px!important;
        }
        }
        }
}
</style>