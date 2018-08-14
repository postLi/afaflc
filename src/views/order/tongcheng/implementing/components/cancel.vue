<template>
    <el-dialog
    title="取消订单"
    class="delData cancel"
    top="35vh"
    :modal="false"
    :visible="dialogVisible"
    custom-class="add-review"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-loading="loading"
    width="25%"
    :before-close="close">
        <div class="ifcancel">
            <p>
                <span class="delwarn"></span>
                <span class="delinfo">是否确认取消订单 ?</span>
            </p>
            <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" label-position="right" size="mini">
                <el-form-item label="取消原因：" prop="cancel">
                    <el-select v-model="form.cancel" placeholder="请选择">
                        <el-option
                        v-for="item in optionsCancel"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注：" prop="evaluationDes">
                    <el-input :autosize="{ minRows: 3, maxRows: 10}" type="textarea" :maxlength="400" v-model="form.evaluationDes"></el-input>
                <!-- <div class="last-input-num">还可输入<span>{{ 400 - form.evaluationDes.length}}</span>字</div> -->
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" icon="el-icon-success" @click="handleSearch('sure')">确认</el-button>
            <el-button type="danger" icon="el-icon-error" @click="handleSearch('cancel')">取消</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/javascript">
import { getDictionary } from '@/api/common.js'

    export default{
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:false
            }
        },
        watch:{
            dialogVisible(newVal,oldVal){
                console.log('newVal',newVal)
                if(newVal){
                    this.init();
                }
            }
        },
        data(){
            return{
                cancelReason:'AF00512',
                formLabelWidth:'25%',
                loading:true,
                cancelForm:{

                },
                form:{
                    evaluationDes:'',
                    cancel:'',
                },
                optionsCancel:[],
                rules:{
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },
            }
        },
        methods: {
            init(){
                getDictionary(this.cancelReason).then(res => {
                    console.log('cancel',res)
                    this.optionsCancel = res.data;
                    this.form.cancel = res.data[0].code;
                    this.loading = false;
                })
            },
            handleSearch(type){
                switch(type){
                    case 'cancel':
                        this.close();
                        break;
                    case 'sure':
                        this.close();
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
            .el-form{
                padding: 0 20px;
                .el-select {
                    width: 100%;
                }
            }
        }
    }
</style>

