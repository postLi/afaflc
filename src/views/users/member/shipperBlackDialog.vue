<template>
    <div class="shipperBlackDialog commoncss">
      <el-dialog :title="title" :visible="BlackDialogFlag" :before-close="close" :close-on-click-modal="false" >
        <el-form :model="formBlack" ref="formBlack" :rules="formBlackRules">
            <div class="shipper_information">
                <el-row>
                    <el-form-item label="移入原因：" :label-width="formLabelWidth" prop="putBlackCause">
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
                </el-row>
                <el-row>
                    <el-form-item label="移入原因说明：" :label-width="formLabelWidth"  prop="putBlackCauseRemark">
                        <el-input v-model="formBlack.putBlackCauseRemark" :rows="5" :disabled="editType != 'add'" placeholder="请输入内容" type="textarea"></el-input>
                    </el-form-item>
                </el-row>
                <div class="shipper_information" v-show="editType == 'edit'" prop="popBlackRemark">
					<h2>移出黑名单信息</h2>
					<el-form-item label="移出原因说明：" :label-width="formLabelWidth">
					    <el-input v-model="formBlack.popBlackRemark" :maxlength="100" :rows="5" placeholder="请输入内容" type="textarea"></el-input>
					</el-form-item>
				</div>
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
import {  DicBlackType } from '@/api/common.js'
import { data_ChangeLogisticsCompany }  from '@/api/users/logistics/LogisticsCompany.js'
import { eventBus } from '@/eventBus'

export default {
    name:'shipper_blackList-diaolog',
    components:{
    },
    props:{
        params:{
            type:Object,
        },
        editType: {
            type: String,
        },
        BlackDialogFlag:{
            type:Boolean,
            required:true,
        },
        title:{
            type:String,
            required:true
        }
    },
    data(){
        return{
            optionsFormBlack:[],
            options:[],
            type:'primary',
            text:'',
            formLabelWidth:'120px',
            formBlack:{},
            currentRow:{},
            formBlackRules:{
                putBlackCause:{required:true,message:'请选择移入原因',trigger:"change"}
            }
        }
    },
    watch:{
        BlackDialogFlag:{
            handler: function(val, oldVal) {
                if(val){
                    this.openDialog();
                    this.getMoreInformation()
                }
            },
        },
    },
    mounted(){
      
    },
    methods:{
        close(done) {
            this.$emit('update:BlackDialogFlag', false);
            this.$emit('getData');
            this.$refs.formBlack.resetFields();
            if (typeof done === 'function') {
                done()
            }
        },
          //事件分发
        changeList(){
            eventBus.$emit('changeList')
        },
        openDialog(){
            this.formBlack = Object.assign({},this.params);
        },
        getMoreInformation(){
            // 移入原因列表
            DicBlackType().then(res=>{
                this.optionsFormBlack = res.data;
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

                        let item =  forms.account;
                        this.$confirm('确定要将'+ item +' 货主移入黑名单吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                             data_ChangeLogisticsCompany(forms).then(res=>{
                                // console.log(res)
                                this.$message({
                                    type: 'success',
                                    message: '该货主已被移入黑名单',
                                    duration:2000
                                })
                                this.changeList();
                                this.close();
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
                                this.$message({
                                    type: 'success',
                                    message: '该货主已被移出黑名单',
                                    duration:2000
                                })
                                this.close();
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
      
    }
</style>


