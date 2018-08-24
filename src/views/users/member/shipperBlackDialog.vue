<template>
    <div class="shipperBlackDialog commoncss">
      <el-button :type="type" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{text}}</el-button>
      <el-dialog :title="title" :visible.sync="BlackDialogFlag" :before-close="change()" :close-on-click-modal="false" >
        <el-form :model="formBlack" ref="formBlack" :rules="formBlackRules">
            <!-- <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.mobile" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司名称" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.companyName" disabled></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                
                <el-row>
                <el-col :span="12">
                    <el-form-item label="联系人" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.contacts" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所在地" :label-width="formLabelWidth">
                        <el-input v-model="formBlack.belongCityName" disabled></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                
                 <el-row>
                    <el-col :span="24" class="moreLength">
                        <el-form-item label="详细地址：" :label-width="formLabelWidth">
                            <el-input v-model="formBlack.address" :maxlength="20" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="货主类型" :label-width="formLabelWidth">
                            <el-input v-model="formBlack.shipperTypeName" disabled :maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册来源" :label-width="formLabelWidth">
                            <el-input v-model="formBlack.registerOrigin" disabled :maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <div class="shipper_information">
                <!-- <h2>移入黑名单信息</h2> -->
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="移入原因:" :label-width="formLabelWidth" prop="putBlackCause">
                        <el-input v-model="formBlack.putBlackCauseName" disabled v-if="editType != 'add'" ></el-input>
                        <el-select v-model="formBlack.putBlackCause" placeholder="请选择" v-else>
                            <el-option
                                v-for="item in optionsFormBlack"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="移入黑名单原因说明:" :label-width="formLabelWidth">
                        <el-input v-model="formBlack.putBlackCauseRemark" :rows="2" :disabled="editType != 'add'" placeholder="请输入内容" type="textarea"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <div class="shipper_information" v-show="editType == 'edit'">
					<h2>移出黑名单信息</h2>
					<el-form-item label="移出黑名单原因说明:" :label-width="formLabelWidth">
					    <el-input v-model="formBlack.popBlackRemark" :maxlength="100" :rows="2" placeholder="请输入内容" type="textarea"></el-input>
					</el-form-item>
				</div>
            </div>
        </el-form>
        
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSubmit">确 定</el-button>
            <el-button @click="BlackDialogFlag = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import {data_get_shipper_BlackType} from '@/api/users/shipper/all_shipper.js'
import { data_ChangeLogisticsCompany }  from '../../../api/users/logistics/LogisticsCompany.js'

import { eventBus } from '@/eventBus'

export default {
    name:'shipper_blackList-diaolog',
    components:{
        // GetCityList
    },
    props:{
        params:{
        type:Object,
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
        }
    },
    data(){
        return{
            optionsFormBlack:[],
            options:[],
            type:'primary',
            title:'',
            text:'',
            BlackDialogFlag: false, // 弹框控制
            formLabelWidth:'120px',
            formBlack:{},
            currentRow:{},
            formBlackRules:{
                putBlackCause:{required:true,message:'请选择移入原因',trigger:"change"}
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
          //事件分发
        changeList(){
            eventBus.$emit('changeList')
        },
        change(){
          this.BlackDialogFlag!=this.BlackDialogFlag
        },
        openDialog(){
        
            this.formBlack = this.params;
            if(!this.formBlack.accountStatusName){
                this.$message.info('请选择您要移入黑名单的用户');
                return
            }
            if(this.formBlack.accountStatusName == '黑名单' && this.editType == 'add'){
                this.$message.info('您选中的货主已被移入黑名单，不需多次拉黑！');
                return
            }
            else if(this.formBlack.accountStatusName != '黑名单' && this.editType == 'edit'){
                this.$message.info('您选中的货主未被移入黑名单，不可做此操作！');
                return
            }
            else{
                this.BlackDialogFlag = true ;
                // this.formBlack.freezeTime = this.formBlack.freezeTime ? this.formBlack.freezeTime : new Date();
            }
        
        },

        getMoreInformation(){
            // 移入原因列表
            data_get_shipper_BlackType().then(res=>{
                res.data.map(item=>{
                    this.optionsFormBlack.push(item)
                })
            })
        },
        // 提交数据
        onSubmit(){

        this.$refs['formBlack'].validate((valid)=>{
            if(valid){
                switch (this.editType){
                    case 'add' :
                        var forms= Object.assign({}, this.formBlack,{accountStatus:"AF0010503",accountStatusName:'黑名单'});
                        forms.putBlackCauseName = this.optionsFormBlack.find(item => item.code === forms.putBlackCause)['name'];

                        let item =  forms.contacts;
                        this.$confirm('确定要将'+ item +' 货主移入黑名单吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                             data_ChangeLogisticsCompany(forms).then(res=>{
                                // console.log(res)
                                this.BlackDialogFlag = false;
                                this.$message({
                                    type: 'success',
                                    message: '该货主已被移入黑名单',
                                    duration:2000
                                })
                                this.$emit('getData')
                                this.changeList();
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
                        var forms= Object.assign({}, this.formBlack,{accountStatus:"AF0010501",accountStatusName:'正常'})
                        let itemMove =  forms.contacts;
                        this.$confirm('确定要将'+ itemMove +' 货主移出黑名单吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                             data_ChangeLogisticsCompany(forms).then(res=>{
                                // console.log(res)
                                this.BlackDialogFlag = false;
                                this.$message({
                                    type: 'success',
                                    message: '该货主已被移出黑名单',
                                    duration:2000
                                })
                                this.$emit('getData')
                                this.changeList();
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
                }
            }
        })
    }
  }
}
</script>
<style lang="scss">
    .shipperBlackDialog{
        .el-textarea{
            width: 637px;
        }
    }
</style>


