<template>
  <div class="addclassify commoncss">
    <el-button :type="type" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{text}}</el-button>
    <el-dialog :title="title" :visible.sync="freezeDialogFlag" :before-close="change()" :modal="false">
      <el-form :model="formFroze" ref="formFroze" :rules="formFrozeRules">
        <el-row>
            <el-col :span="12">
              <el-form-item label="手机号码：" :label-width="formLabelWidth">
                <el-input v-model="formFroze.driverMobile" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车主：" :label-width="formLabelWidth">
                <el-input v-model="formFroze.driverName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证号码：" :label-width="formLabelWidth">
                <el-input v-model="formFroze.driverCardid" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在地" :label-width="formLabelWidth">
              <el-input type="text" v-model="formFroze.belongCityName" disabled ></el-input>
          
            </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="车牌号：" :label-width="formLabelWidth">
              <el-input v-model="formFroze.carNumber" :maxlength="20" disabled></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车型" :label-width="formLabelWidth">
              <el-select v-model="formFroze.carTypeName" placeholder="请选择" disabled>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
              </el-option>
              </el-select>
            </el-form-item>
            </el-col>
          </el-row>
             <el-row>
            <el-col :span="12">
              <el-form-item label="中单等级" :label-width="formLabelWidth">
              <el-select v-model="formFroze.obtainGradeName" placeholder="请选择"  disabled>
                <el-option
                  v-for="item in midoptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled">
                </el-option>
              </el-select >
             
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中单等级有效期至" :label-width="formLabelWidth">
               <el-input v-model="formFroze.obtainGradeTime" :maxlength="20" disabled></el-input>
              
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="车长(米)：" :label-width="formLabelWidth">
                      <el-input
                            placeholder="长"
                            v-model="formFroze.carLength" disabled
                            clearable>
                        </el-input>
                        <el-input
                            placeholder="宽"
                            v-model="formFroze.carWidth" disabled
                            clearable>
                        </el-input>
                        <el-input
                            placeholder="高"
                            v-model="formFroze.carHeight" disabled
                            clearable>
                        </el-input>
                        <span class="node">米</span>
                    </el-form-item>
              </el-col>
            <el-col :span="12">
              <el-form-item label="注册来源" :label-width="formLabelWidth">
                <el-input v-model="formFroze.registerOrigin" :maxlength="20" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="shipper_information">
            <h2>{{text}}信息</h2>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="移入原因：" prop="freezeCause" :label-width="formLabelWidth">
              <el-select v-model="formFroze.putBlackCause" placeholder="请选择" clearable>
                <el-option
                  v-for="item in putBlackCauseoptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select >
            </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="24">
              <el-form-item label="移入黑名单原因说明：" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="2" :maxlength="100" v-model="formFroze.putBlackCauseRemark "></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        
      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button type="primary" @click="onSubmit3" >确定3</el-button>
        <el-button @click="freezeDialogFlag = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import GetCityList from '@/components/GetCityList'
import {parseTime} from '@/utils/'
import {data_get_shipper_type,data_get_shipper_change,data_get_shipper_freezeType,data_get_freeze_change,data_get_freeze, data_get_shipper_BlackType,data_unbind_freeze_change,data_blacklist} from '@/api/users/shipper/all_shipper.js'
export default {
  name:'create-Change-ViewDialog',
  components:{
    GetCityList
  },
  props:{
    params:{
      type:Object
    },
    icon:{
      type: String,
      default: ''
    },
    btntype: {
      type: String,
      default: ''
    },
    btntitle: {
      type: String,
      default: ''
    },
    plain:{
      type: Boolean,
      default: false
    },
    btntext: {
      type: String,
      default: ''
    },
    value:{
      type: String,
      default:''
    },
     editType: {
      type: String,
      default: 'edit'
    },
    count:{
        type:Number
    }
  },
  data(){
    return{
      type:'primary',
      title:'',
      text:'',
      optionsReason:[],
      midoptions:[],
      putBlackCauseoptions:[],
      options:[], 
      formLabelWidth:'120px',
      freezeDialogFlag:false,
      formFroze: { // 冻结弹框表单
        driverMobile: '', // 手机号
        driverName: '', // 公司名称
        carTypeName:null,
        carNumber:'', // 详细地址
        driverCardid:'', // 身份证号码
        belongCity:null, // 所在地
        registerOrigin:'', // 注册来源
        creditCode:'', // 统一社会信用代码
        freezeTime:'',
        freezeCause:null,
        freezeCauseRemark :'',
        belongCityName:'',
        obtainGrade:'',
        obtainGradeName:'',
        obtainGradeTime:'',
        unfreezeCauseRemark:'',
        
        putBlackCause:'',
        putBlackCauseRemark:''
        // radio1:'',
        // radio2:'',
        // radio3:''
      },
      radio: '',
      currentRow:null,
      pickerOptions:{
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      formFrozeRules:{
        freezeCause:{required: true,message:'请选择冻结原因',trigger:'change'},
        freezeTime:{required:true,message:'请选择解冻日期',trigger:'change'}
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
    this.getMoreInformation()
  },
  methods:{
    timeChange(val){
      let currentTime = this.formFroze.freezeTime || new Date()
      let oneDay = 1* 24 * 60 * 60 * 1000
      let time = +new Date()
      switch(val){
        case 1:
          time += 1 * oneDay
          break
        case 3:
          time += 3 * oneDay
          break
        case 7:
          time += 7 * oneDay
          break
        case 9:
          time += 30 * oneDay
          break
        case 10:
          time += 100000 * oneDay
          break
      }

      this.formFroze.freezeTime = time
    },
    change(){
      this.freezeDialogFlag!=this.freezeDialogFlag
    },

    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    openDialog(){
 
      if(this.editType ==="edit-four" ){

        if(this.params.driverMobile!= undefined){
          this.freezeDialogFlag=true 
        }else{
         
          this.freezeDialogFlag=false
         
          
        }
      }
      if(this.params){

     
        var obj = JSON.parse(JSON.stringify(this.params));
       
        this.formFroze=obj;
        console.log(this.formFroze)
        this.formFroze.obtainGradeTime = parseTime(this.formFroze.obtainGradeTime,"{y}-{m}-{d}");
       /* this.formFroze.forEach(item => {
            item.obtainGradeTime = parseTime(item.obtainGradeTime,"{y}-{m}-{d}");
        })*/
       
      }else{
        this.formFroze=null
       
      }
    },

    getMoreInformation(){
      //获取货主类型
      data_get_shipper_type().then(res=>{
        res.data.map((item)=>{
        this.options.push(item)
        })
      }),
      // 获取冻结原因下拉
      data_get_shipper_freezeType().then(res=>{
       
        res.data.map((item)=>{
          this.optionsReason.push(item)
        })
      })
      // 获取移入黑名单原因下拉
      data_get_shipper_BlackType().then(res=>{
       
        res.data.map((item)=>{
          this.putBlackCauseoptions.push(item)
        })
      })
    },

    //解冻
    onSubmit3(){
        this.$refs['formFroze'].validate((valid)=>{
        if(valid){
          var forms= Object.assign({}, this.formFroze)
          
          data_blacklist(forms).then(res=>{
         
            this.$message.success('解冻修改成功')
            this.freezeDialogFlag = false;
            this.$emit('getData') 
          }).catch(err=>{
            console.log(err)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">

</style>




