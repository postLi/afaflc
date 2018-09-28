<template>
  <div class="freezeInfo commoncss">
    <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()"><span :class="editType=='view'?'BtnInfo':''">{{btntext}}</span ></el-button>
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
              <el-form-item label="车型：" :label-width="formLabelWidth">
                <el-input v-model="formFroze.carTypeName" disabled></el-input>
            </el-form-item>
            </el-col>
          </el-row>
             <el-row>
            <el-col :span="12">
              <el-form-item label="中单等级：" :label-width="formLabelWidth">
                    <el-select v-model="formFroze.obtainGrade" placeholder="请选择" disabled>
                                <el-option
                                    v-for="item in optionsLevel"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code"
                                    
                                    >
                                </el-option>
                    </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中单等级有效期至：" :label-width="formLabelWidth">
                        <el-date-picker
                            v-model="formFroze.obtainGradeTime"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder="选择日期"
                             :picker-options="pickerOptions"
                             disabled
                            >
                        </el-date-picker>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="车长(米)：" :label-width="formLabelWidth">
                      <el-input
                            class="lessWidth"
                            placeholder="长"
                            v-model="formFroze.carLength" disabled
                            clearable>
                        </el-input>
                        <el-input
                            class="lessWidth"
                            placeholder="宽"
                            v-model="formFroze.carWidth" disabled
                            clearable>
                        </el-input>
                        <el-input
                            class="lessWidth"
                            placeholder="高"
                            v-model="formFroze.carHeight" disabled
                            clearable>
                        </el-input>
                    </el-form-item>
              </el-col>
            <el-col :span="12">
              <el-form-item label="注册来源：" :label-width="formLabelWidth">
                <el-input v-model="formFroze.registerOriginName" :maxlength="20" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="shipper_information">
            <h2>冻结原因</h2>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="冻结原因：" prop="freezeCause" :label-width="formLabelWidth">
              <el-select v-model="formFroze.freezeCause" placeholder="请选择" v-if=" editType == 'edit'|| editType == 'edit-two'" clearable>
                <el-option
                  v-for="item in optionsReason"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select >
              <el-select v-model="formFroze.freezeCause" placeholder="请选择" v-else-if=" editType == 'edit-three'" disabled>
                <el-option
                  v-for="item in optionsReason"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code" >
                </el-option>
              </el-select >
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="解冻日期：" :label-width="formLabelWidth" prop="freezeTime">
                <el-date-picker
                  v-model="formFroze.freezeTime"
                  type="datetime"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  :picker-options="pickerOptions" v-if=" editType == 'edit'|| editType == 'edit-two'">
                </el-date-picker>
                <el-radio-group v-model="radio" @change="timeChange" v-if=" editType == 'edit'|| editType == 'edit-two'">
                  <el-radio :label="1">1天</el-radio>
                  <el-radio :label="3">3天</el-radio>
                  <el-radio :label="7">一周</el-radio>
                  <el-radio :label="9">一个月</el-radio>
                  <el-radio :label="10">永久</el-radio>
                </el-radio-group>
                 <el-date-picker
                  v-model="formFroze.freezeTime"
                  type="datetime"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  :picker-options="pickerOptions" v-else-if=" editType == 'edit-three'" disabled>
                </el-date-picker>
                <el-radio-group v-model="radio" @change="timeChange" v-else-if=" editType == 'edit-three'" disabled>
                  <el-radio :label="1">1天</el-radio>
                  <el-radio :label="3">3天</el-radio>
                  <el-radio :label="7">一周</el-radio>
                  <el-radio :label="9">一个月</el-radio>
                  <el-radio :label="10">永久</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="冻结原因说明：" :label-width="formLabelWidth">
                <el-input type="textarea" class="textArea" :rows="2" :maxlength="100" v-model="formFroze.freezeCauseRemark "  v-if=" editType == 'edit'|| editType == 'edit-two'" ></el-input>
                <el-input type="textarea" class="textArea" :rows="2" :maxlength="100" v-model="formFroze.freezeCauseRemark " v-else-if=" editType == 'edit-three'" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="shipper_information" v-if=" editType == 'edit-three'">
            <h2>解冻</h2>
          </div>
          <el-row v-if=" editType == 'edit-three'"> 
            <el-col :span="24">
              <el-form-item label="解冻原因说明：" :label-width="formLabelWidth">
                    <el-input type="textarea" class="textArea" :rows="2" :maxlength="100"  v-model="formFroze.unfreezeCauseRemark "></el-input>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit" v-if=" editType == 'edit'">确 定</el-button>
        <el-button type="primary" @click="onSubmit2" v-else-if=" editType == 'edit-two'">确定2</el-button>
        <el-button type="primary" @click="onSubmit3" v-else-if=" editType == 'edit-three'">确定3</el-button>
        <el-button @click="freezeDialogFlag = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import GetCityList from '@/components/GetCityList'
import {parseTime} from '@/utils/'
import { eventBus } from '@/eventBus'
import  {data_put_freezeDriver,data_get_freezeDriverchange,data_unbind_freezeDriverchange,data_Get_carType,data_get_car_freezeType,data_get_driver_obStatus} from '@/api/users/carowner/total_carowner.js'
export default {
  name:'create-Change-ViewDialog',
  components:{
    GetCityList
  },
  props:{
    params:{
      type:[Object,Array],
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
      optionsLevel:[],
      options:[], 
      formLabelWidth:'150px',
      freezeDialogFlag:false,
      formFroze: { // 冻结弹框表单
        driverMobile:null, // 手机号
        driverName: null, // 公司名称
        carTypeName:null,
        carNumber:null, // 详细地址
        driverCardid:null, // 身份证号码
        belongCity:null, // 所在地
        registerOrigin:'', // 注册来源
        creditCode:null, // 统一社会信用代码
        freezeTime:null,
        freezeCause:null,
        freezeCauseRemark :null,
        belongCityName:null,
        obtainGrade:null,
        obtainGradeName:null,
        obtainGradeTime:null,
        unfreezeCauseRemark:null
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
  },
    watch:{
        freezeDialogFlag:{
        handler: function(val, oldVal) {
            if(!val){
                this.$refs.formFroze.resetFields();
                this.$emit('getData') 
            }
            else{
                this.getMoreInformation()
            }
        }
        }
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
    changeList(){
      eventBus.$emit('changeListtwo')
    },
    openDialog(){
      //冻结
            if(this.params.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的用户');
               return
            }else if (this.params.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
            }
        else{
        this.formFroze = this.params[0];
        console.log('111', this.formFroze)
          if(this.formFroze.accountStatusName == '冻结中' && this.editType == 'edit'){
            this.$message.info('您选中的车主已被冻结，不需多次冻结！');
            this.$emit('getData')
            return
        }
        else if(this.formFroze.accountStatusName != '冻结中' && this.editType == 'edit-two'){
            this.$message.info('您选中的车主未被冻结，不可做此操作！');
            this.$emit('getData')
            return
        }
        else if(this.formFroze.accountStatusName != '冻结中' && this.editType == 'edit-three'){
            this.$message.info('您选中的车主未被冻结，无需移除！');
            this.$emit('getData')
            return
        }
        this.freezeDialogFlag=true
        }
    },

    getMoreInformation(){
      //获取车主类型
      data_Get_carType().then(res=>{
        this.options = res.data
      }),
      // 获取车主冻结原因下拉
      data_get_car_freezeType().then(res=>{
          this.optionsReason = res.data
      })
            // 中单等级的获取
            data_get_driver_obStatus().then(res =>{
                    this.optionsLevel = res.data
            }).catch(err =>{
                console.log(err)
            })      
    },
    // 冻结提交数据
    onSubmit(){
      this.$refs['formFroze'].validate((valid)=>{
        if(valid){
          var forms= Object.assign({}, this.formFroze)
            this.freezeDialogFlag = false;
          data_put_freezeDriver(forms).then(res=>{
            this.$message.success('冻结修改成功')
            this.changeList();
          }).catch(err=>{
            console.log(err)
          })
        }
      })
    },
    //冻结修改
    onSubmit2(){
        this.$refs['formFroze'].validate((valid)=>{
        if(valid){
          var forms= Object.assign({}, this.formFroze)
          this.freezeDialogFlag = false;
          data_get_freezeDriverchange(forms).then(res=>{
            this.changeList();
            this.$message.success('冻结修改成功')
          }).catch(err=>{
            console.log(err)
          })
        }
      })
    },
    //解冻
    onSubmit3(){
        this.$refs['formFroze'].validate((valid)=>{
        if(valid){
          var forms= Object.assign({}, this.formFroze)
                      this.freezeDialogFlag = false;
         data_unbind_freezeDriverchange(forms).then(res=>{
            this.$message.success('解冻修改成功')
            this.changeList();
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
.freezeInfo{
  margin-left:10px;
}
</style>




