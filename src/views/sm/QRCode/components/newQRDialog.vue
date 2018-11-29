<template>
     <div class="commoncss">
        <el-dialog
        title="生成二维码"
        :modal="false"
        :visible="dialogVisible"
        custom-class="add-review"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        v-loading="loading"
        v-el-drag-dialog
        :before-close="close">
            <el-form   :model="standForm" :rules="newrules"  ref="ruleForm"  :label-width="formLabelWidth" label-position="right">

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="handleSearch('sure')">确认</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="handleSearch('cancel')">取消</el-button>
            </div>
        </el-dialog>
     </div>
</template>

<script type="text/javascript">
import { getDictionary } from '@/api/common.js'
import { cancelOrder } from '@/api/order/ordermange.js'
    export default{
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:false
            },
        },
        watch:{
            dialogVisible(newVal,oldVal){
                if(newVal){
                    // this.init();
                }
            }
        },
        data(){
            return{
                cancelReason:'AF00512',//取消原因
                formLabelWidth:'25%',
                loading:false,
                standForm:{
                    cancelRemark:'',//取消说明
                    cancelCode:'',//取消原因code
                    cancelCause:'',//取消原因
                    cancelType:'AF0051302',
                    orderSerial:'',//订单流水号
                },
                optionsCancel:[],
                newrules:{
                    cancel: [
                        { required: true, message: '请选择取消原因', trigger: 'blur' },
                    ],
                },
            }
        },
        methods: {
            init(){
                // getDictionary(this.cancelReason).then(res => {
                //     // console.log('cancel',res)
                //     this.optionsCancel = res.data;
                //     this.form.cancelCode = res.data[0].code;
                //     this.loading = false;
                // })
            },
            handleSearch(type){
                switch(type){
                    case 'cancel':
                        this.close();
                        break;
                    case 'sure':
                        this.form.cancelCause = this.optionsCancel.find(item => item.code == this.form.cancelCode)['name'];
                        let cancelForm = Object.assign({},this.form,{orderSerial:this.orderSerial})
                        cancelOrder(cancelForm).then(res => {
                            this.close();
                            this.$message({
                                type: 'success',
                                message: '操作成功~'
                            })
                        }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + err.text ? err.text : err.errorInfo
                            })
                        })
                        break;
                }
            },
            close(done) {
                this.$refs.ruleForm.resetFields();
                this.$emit('update:dialogVisible', false);
                this.$emit('close');
                if (typeof done === 'function') {
                    done()
                }
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .cancel{
        .ifcancel{
            p{
                text-align: center;
                margin-bottom: 20px;
                font-size: 16px;
                font-weight: bold;
                .delwarn{
                    vertical-align: middle;
                    margin-right:20px; 
                }
            }
            .el-form{
                padding: 0 20px;
                .el-select {
                    width: 100%;
                }
            }
        }
    }
</style>

