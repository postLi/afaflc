<template>
    <div class="addclassify commoncss">
        <el-dialog title="冻结" :visible.sync="freezeDialogFlag" :before-close="change()" :modal="false">
          <el-form :model="formFroze" ref="formFroze">
            <el-row>
                <el-col :span="12">
                  <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="formFroze.mobile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系人" :label-width="formLabelWidth">
                    <el-input v-model="formFroze.contacts"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

               <el-row>
               <el-col :span="12">
                 <el-form-item label="所在地" :label-width="formLabelWidth">
                  <!-- <el-cascader
                    :options="options"
                    v-model="formFroze.belongCity"
                    @change="handleChange">
                  </el-cascader> -->
                </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="详细地址" :label-width="formLabelWidth">
                  <el-input v-model="formFroze.address" :maxlength="20"></el-input>
                </el-form-item>
               </el-col>
             </el-row>

              <el-row>
               <el-col :span="12">
                 <el-form-item label="货主类型" :label-width="formLabelWidth">
                  <!-- <el-cascader
                    :options="options"
                    v-model="formFroze.shipperType"
                    @change="handleChange">
                  </el-cascader> -->
                </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="注册来源" :label-width="formLabelWidth">
                  <el-input v-model="formFroze.registerOrigin" :maxlength="20"></el-input>
                </el-form-item>
               </el-col>
             </el-row>
             <div class="shipper_information">
                <h2>冻结原因</h2>
             </div>
             <el-row>
               <el-col :span="24">
                 <el-form-item label="冻结原因" :label-width="formLabelWidth" required>
                  <el-select v-model="formFroze.frozeReason" placeholder="请选择">
                    <el-option
                      v-for="item in optionsReason"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
               </el-col>
             </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="解冻日期" :label-width="formLabelWidth" required>
                    <el-date-picker
                      v-model="formFroze.unfrozeTime"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                    <el-radio-group v-model="formFroze.radio">
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
                  <el-form-item label="解冻原因说明"  :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="2" v-model="formFroze.reason"></el-input>
                  </el-form-item>
               </el-col>
             </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSubmit">确 定</el-button>
            <el-button @click="frozeDialogFlag = false">取 消</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props:{
        freezeDialogFlag:{
            type:Boolean,
            default: false
        },
        params:{
            type:Object
        }
    },
    data(){
        return{
            freezeDialogFlag:false,
            shengheform: { // 认证审核表单
                mobile: '', // 手机号
                companyName: '', // 公司名称
                address:'', // 详细地址
                contacts:'', // 联系人
                belongCity:null, // 所在地
                shehetime:'',
                registerOrigin:'', // 注册来源
                creditCode:'', // 统一社会信用代码
                radio1:'',
                radio2:'',
                radio3:''
            },
        }
    },
    methods:{
        change(){
            this.freezeDialogFlag!=this.freezeDialogFlag
        },

        // 提交数据
        onSubmit(){
            this.$refs['formFroze'].validate((valid)=>{
                if(valid){
                    debugger
                }
            })
        }
    }
}
</script>
<style lang="scss">

</style>


