<template>
  <div class="addclassify commoncss">
    <el-button :type="type" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{text}}</el-button>
    <el-dialog :title="title" :visible.sync="freezeDialogFlag" :before-close="change()" :modal="false">
      <el-form :model="formFroze" ref="formFroze" :rules="formFrozeRules">
        <el-row>
            <el-col :span="12">
              <el-form-item label="手机号码" :label-width="formLabelWidth">
                <el-input v-model="formFroze.mobile" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司名称" :label-width="formLabelWidth">
                <el-input v-model="formFroze.companyName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人" :label-width="formLabelWidth">
                <el-input v-model="formFroze.contacts" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在地" :label-width="formLabelWidth">
              <el-input v-model="formFroze.belongCityName" disabled></el-input>
            </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="formFroze.address" :maxlength="20" disabled></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
              	<el-form-item label="货主类型" :label-width="formLabelWidth">
				<el-input
				v-if="freeze == true"
				placeholder="请输入内容"
				v-model="formFroze.shipperType"
				:disabled="true">
				</el-input>
              	<el-select v-model="formFroze.shipperType" placeholder="请选择" v-else>
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
              <el-form-item label="注册来源" :label-width="formLabelWidth">
                <el-input v-model="formFroze.registerOrigin" :maxlength="20" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="shipper_information">
            <h2>冻结原因</h2>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="冻结原因" prop="freezeCause" :label-width="formLabelWidth">
              <el-select v-model="formFroze.freezeCause" placeholder="请选择" clearable>
                <el-option
                  v-for="item in optionsReason"
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
              <el-form-item label="解冻日期" :label-width="formLabelWidth" prop="freezeTime">
                <el-date-picker
                  v-model="formFroze.freezeTime"
                  placeholder="选择日期"
                  type="date"
                  format="yyyy-MM-dd" 
                  :picker-options="pickerOptions">
                </el-date-picker>
                <el-radio-group v-model="radio" @change="timeChange">
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
                <el-input type="textarea" :rows="2" :maxlength="100" v-model="formFroze.freezeCauseRemark "></el-input>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
        <el-button @click="freezeDialogFlag = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import GetCityList from '@/components/GetCityList'
import {parseTime} from '@/utils/'
import {data_get_shipper_type,data_get_shipper_change,data_get_shipper_freezeType} from '@/api/users/shipper/all_shipper.js'
export default {
  name:'create-Change-ViewDialog',
  components:{
    // GetCityList
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
	freeze:{
		type:Boolean
	}
  },
  data(){
    return{
      type:'primary',
      title:'',
      text:'',
      optionsReason:[],
      options:[], 
      formLabelWidth:'120px',
      freezeDialogFlag:false,
      formFroze: { // 冻结弹框表单
        // mobile: '', // 手机号
        // companyName: '', // 公司名称
        // shipperType:null,
        // address:'', // 详细地址
        // contacts:'', // 联系人
        // belongCity:null, // 所在地
        // belongCityName:'',
        // registerOrigin:'', // 注册来源
        // creditCode:'', // 统一社会信用代码
        // freezeTime:'',
        // freezeCause:null,
        // freezeCauseRemark :''
      },
      radio: '',
      currentRow:null,
      pickerOptions:{
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      formFrozeRules:{
        freezeCause:{required: true,message:'请选择冻结原因',trigger:['blur', 'change']},
        freezeTime:{required:true,message:'请选择解冻日期',trigger:['blur', 'change']}
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
      console.log(val)
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
      console.log(time)
    },
    change(){
      this.freezeDialogFlag!=this.freezeDialogFlag
    },

    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    openDialog(){
      if(this.editType ==="edit"){
        if(this.params.companyName || this.params.contacts){
          this.freezeDialogFlag = true ;
        }else{
          this.$message.error('选中一个才可以操作')
        }
      }
      
      if(this.params){
        var obj = JSON.parse(JSON.stringify(this.params));
        this.formFroze = obj ;
      }else{
        this.formFroze = {};
      }
    },

    getMoreInformation(){
      //获取货主类型
      data_get_shipper_type().then(res=>{
        // console.log(res)
        res.data.map((item)=>{
        this.options.push(item)
        })
      }),

      // 获取冻结原因下拉
      data_get_shipper_freezeType().then(res=>{
        // console.log(res)
        res.data.map((item)=>{
          this.optionsReason.push(item)
        })
      })
    },
    // 提交数据
    onSubmit(){
      this.$refs['formFroze'].validate((valid)=>{
        if(valid){
          // this.formFroze.belongCity = this.$refs.area.selectedOptions.pop();
          var forms= Object.assign({}, this.formFroze,{attestationStatus:"AF0010405"})
          forms.freezeTime = parseTime(forms.freezeTime);
          //冻结写死冻结code（根据后端要求）
          forms.accountStatus = 'AF0010502';
          console.log('forms.freezeTime:',forms.freezeTime)
          data_get_shipper_change(forms).then(res=>{
            console.log(res)
            console.log('test')
            this.$message.success('冻结修改成功')
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
.addclassify{
  display: inline-block;
}
</style>


