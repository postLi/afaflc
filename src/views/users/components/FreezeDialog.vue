<template>
  <div class="freezeDialog commoncss">
    <el-dialog :title="freezetitle" :visible="freezeDialogFlag"  :before-close="close" v-dialogDrag :close-on-click-modal="false" >
      <el-form :model="formFroze" ref="formFroze" :rules="formFrozeRules">
        <el-row>
            <el-col :span="12">
              <el-form-item label="手机号码：" :label-width="formLabelWidth">
                <span class="onlyShow">{{formFroze.mobile}}</span>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司名称：" :label-width="formLabelWidth">
                <span class="onlyShow">{{formFroze.companyName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="12">
                <el-form-item label="联系人：" :label-width="formLabelWidth">
                    <span class="onlyShow">{{formFroze.contacts}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="所在地：" :label-width="formLabelWidth">
                    <span class="onlyShow">{{formFroze.belongCityName}}</span>
                </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" class="moreLength">
                <el-form-item label="详细地址：" :label-width="formLabelWidth">
                    <span class="onlyShow">{{formFroze.address}}</span>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              	<el-form-item label="货主类型：" :label-width="formLabelWidth">
                    <span class="onlyShow">{{formFroze.shipperTypeName}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册来源：" :label-width="formLabelWidth">
                <span class="onlyShow">{{formFroze.registerOrigin}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="shipper_information">
            <h2>冻结信息</h2>
          </div>
          <el-row>
            <el-col :span="24">
                <el-form-item label="冻结原因：" prop="freezeCause" :label-width="formLabelWidth">
                    <span class="onlyShow" v-if="editType == 'remove'">{{formFroze.freezeCauseName}}</span>
                    <el-select v-model="formFroze.freezeCause" v-else placeholder="请选择" clearable>
                        <el-option
                        v-for="item in optionsReason"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select >
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="解冻日期：" :label-width="formLabelWidth" prop="freezeTime">
                <span class="onlyShow" v-if="editType == 'remove'">{{formFroze.freezeTime | parseTime}}</span>
                <div v-else>
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
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="冻结说明：" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="2" :maxlength="100" v-model="formFroze.freezeCauseRemark " :disabled="editType == 'remove'" class="textArea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="editType == 'remove'">
            <div class="shipper_information">
                <h2>解冻</h2>
            </div>
            <el-row>
                <el-col :span="24">
                <el-form-item label="解冻说明：" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="2" :maxlength="100" v-model="formFroze.unfreezeRemark " class="textArea"></el-input>
                </el-form-item>
                </el-col>
            </el-row>
          </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import {data_get_shipper_change} from '@/api/users/shipper/all_shipper.js'
import { DicfreezeType } from '@/api/common.js'
import { eventBus } from '@/eventBus'
import { parseTime } from '@/utils/'

export default {
  name:'shipperfreezeDialog',
  components:{

  },
  props:{
    freezetitle:{
        type:String,
        default:'冻结'
    },
    paramsView:{
        type:Object,
    },
    freezeDialogFlag:{
        type:Boolean,
        default:false
    },
    editType: {
        type: String,
        default: 'edit'
    },
    freeze:{
        type:Boolean
    },
  },
  data(){
    return{
      type:'primary',
      title:'',
      text:'',
      optionsReason:[],
      formLabelWidth:'120px',
      formFroze: { // 冻结弹框表单
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
        freezeTime:{required:true,message:'请选择解冻日期',trigger:['change']}
      }
    }
  },
  watch:{
       freezeDialogFlag:{
        handler: function(val, oldVal) {
            if(val){
                this.openDialog();
                if(this.editType != 'remove'){
                    this.getMoreInformation();
                }
            }
        },
    },
  },
  mounted(){

  },
  methods:{
    close(done) {
        this.$emit('update:freezeDialogFlag', false);
        this.$emit('getData');
        this.$refs.formFroze.resetFields();
        this.formFroze = { // 冻结弹框表单
            freezeCause:null,
            unfreezeTime:null,
            freezeCauseRemark:null,
            unfreezeRemark:null
        }
        if (typeof done === 'function') {
            done()
        }
    },
    //事件分发
    changeList(){
        eventBus.$emit('changeList')
    },
    timeChange(val){
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
    openDialog(){
        console.log('this.paramsView',this.paramsView)
        this.formFroze = Object.assign({},this.paramsView) ;
        this.formFroze.freezeTime = this.formFroze.freezeTime ? this.formFroze.freezeTime : Date.parse(new Date());;
        if(this.editType == 'add'){
            // this.formFroze.unfreezeTime = this.formFroze.unfreezeTime ? this.formFroze.unfreezeTime : new Date();
            this.formFroze.id = this.paramsView.id;
            this.formFroze.mobile = this.paramsView.mobile;
        }else{
            this.formFroze = Object.assign({},this.paramsView) ;
            this.formFroze.unfreezeTime = this.formFroze.unfreezeTime ? this.formFroze.unfreezeTime : new Date();
        }
    },

    getMoreInformation(){
      // 获取冻结原因下拉
        DicfreezeType().then(res=>{
            // console.log(res)
            this.optionsReason = res.data;
        })
    }, 
    // 提交数据
    onSubmit(){
        this.$refs['formFroze'].validate((valid)=>{
            if(valid){
                switch (this.editType){
                    case 'add' :
                        var forms= Object.assign({}, this.formFroze,{accountStatus:"AF0010502",accountStatusName:'冻结中'});
                        forms.freezeCauseName = this.optionsReason.find(item => item.code === forms.freezeCause)['name'];
                        // console.log(forms)
                        let item =  forms.contacts;
                        this.$confirm('确定要将'+ item +' 货主冻结吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                            data_get_shipper_change(forms).then(res=>{
                                // console.log(res)
                                this.$message({
                                    type: 'success',
                                    message: '该货主已被冻结',
                                    duration:2000
                                })
                                this.close()
                            }).catch(err => {
                                this.$message.error('操作失败，失败原因：',err.text)
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                    case 'remove':
                        var forms= Object.assign({}, this.formFroze,{accountStatus:"AF0010501",accountStatusName:'正常'})
                        let itemMove =  forms.contacts;
                        this.$confirm('确定要将'+ itemMove +' 货主解冻吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                            data_get_shipper_change(forms).then(res=>{
                                // console.log(res)
                                this.$message({
                                    type: 'success',
                                    message: '该货主已被解冻',
                                    duration:2000
                                })
                                this.close()
                            }).catch(err => {
                                this.$message.error('操作失败，失败原因：',err.text)
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                    case 'edit' :
                        var forms= Object.assign({}, this.formFroze)
                        data_get_shipper_change(forms).then(res=>{
                            // console.log(res)
                            this.$alert('修改成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.close()
                                }
                            });
                        }).catch(err => {
                            this.$message.error('操作失败，失败原因：',err.text)
                        })
                }
            }
        })
    }
  }
}
</script>
<style lang="scss">
    
</style>


