<template>
    <div>
        <!-- 指派司机 -->
        <div class="newAnnounce commoncss">
            <el-dialog title='指派司机' :close-on-click-modal="false"   :visible="dialogFormVisible" @close="close">
                <el-form :model="announce" :label-position="labelPosition" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="发布区域" prop="noticeLocation">
                        <vregion :ui="true" :area="false" @values="regionChange" class="form-control">
                            <el-input v-model="announce.noticeLocation" placeholder="请选择出发地" clearable></el-input>
                        </vregion>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="announce.title" maxlength="30" clearable >
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="titleLogo" label="标题图片">
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="announce.titleLogo"  />
                    </el-form-item>
                    <el-form-item label="内容" class="editors">
                        <div>
                            <editor
                                class="editor"
                                :value="announce.noticeContent"
                                :setting="editorSetting"
                                @show="editors"
                                :url              = "Url"
                                :max-size         = "MaxSize"
                                :accept           = "Accept"
                                :with-credentials = "withCredentials"
                                @on-upload-fail         = "onEditorReady"
                                @on-upload-success= "onEditorUploadComplete"></editor>
                        </div>
                    </el-form-item>
                    <el-form-item label="链接" prop="noticeUrl">
                        <el-input v-model="announce.noticeUrl"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-checkbox v-model="releaseDriver" >发布到车主端</el-checkbox>
                        <el-checkbox v-model="releaseShipper" >发布到货主端</el-checkbox>
                    </el-form-item>
                     <el-form-item label="公告分组" prop="noticeGroupCode" v-if="releaseDriver">
                        <el-select v-model="announce.noticeGroupCode" clearable placeholder="请选择">
                            <el-option
                            v-for="item in optionsGroupCode"
                            :key="item.id"
                            :label="item.name"
                            :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="有效期">
                       <el-date-picker
                        v-model="announce.startTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp">
                        </el-date-picker>
                        <span> 至 </span>
                        <el-date-picker
                        v-model="announce.endTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp">
                        </el-date-picker>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </div> 
            </el-dialog>
        </div>
    </div>
</template>
<script>

import { getDictionary } from '@/api/common.js'
import { appointDriverList,nearDriverList, } from '@/api/order/ordermange.js'
import vregion from '@/components/vregion/Region'
import editor from '@/components/tinymac/index'
import { getUploadPolicy } from '@/api/common'
import upload from '@/components/Upload/singleImage'
import { newNotice } from '@/api/company/announcement.js'

export default {
    name: 'newAnnounce',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true,
        },
    },
    components:{
        vregion,
        editor,
        upload

    },
    data() {
        return {
            releaseDriver:false,//发布到车主分组
            releaseShipper:false,//发布到货主分组
            noticeGroupCode:'AF045',
            labelPosition:'left',
            announce:{
                province:'',//省
                city:'',//市
                title:'',//标题
                titleLogo:'',//标题图片
                noticeLocation:'',//发布区域
                noticeContent:'',//公告内容// 富文本编辑器双向绑定的内容
                noticeUrl:'',//公告链接
                releaseDriver:'0',//发布到车主分组
                releaseShipper:'0',//发布到货主分组
                noticeGroupCode:'',//车主端公告分组
                startTime:'',
                endTime:null,
            },
            optionsGroupCode:[],
            announceTime:[],
            editorSetting: { // 配置富文本编辑器高
                height: 300
            },
            Url: '', // 图片对应的上传地址
            MaxSize: 2097152, // 文件大小
            Accept: 'image/jpeg, image/png', // 文件格式
            withCredentials: true,
           
        };
    },
    computed: {
    　
    },
    watch:{
        dialogFormVisible(newValue,oldValue){
            if(newValue){
                this.init();
            }
        },
        releaseDriver:{
            handler(curVal,oldVal){
                console.log(curVal);
                if(curVal){
                    this.announce.releaseDriver = '1'
                }else{
                    this.announce.releaseDriver = '0'
                }
            },
            deep: true, 
        },
        releaseShipper:{
            handler(curVal,oldVal){
                console.log(curVal);
                if(curVal){
                    this.announce.releaseShipper = '1'
                }else{
                    this.announce.releaseShipper = '0'
                }
            },
            deep: true, 
        }
    },
    mounted(){

    },
    methods: {
        regionChange(d) {
            console.log('data:',d)
            this.announce.noticeLocation = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            this.announce.province = d.province ? d.province.code : '';
            this.announce.city = d.city ? d.city.code : '';
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        //初始化选择项数据
        init(){
            getUploadPolicy().then(res => {
                console.log('upload',res)
                this.Url = res.host
            });
            getDictionary(this.noticeGroupCode).then(res => {
                this.optionsGroupCode = res.data;
            });

            this.announce.startTime = Date.parse(new Date());;
            console.log('this.announce.startTime',this.announce.startTime)
        },
        editors(content) { // editor组件传过来的值赋给content
            console.log(content)
            this.announce.noticeContent = content;
        },
        onEditorReady(ins, ina) { // 上传失败的函数
            console.log('ins')
            console.log(ins)
            console.log(ina)
        },
        onEditorUploadComplete(json) { // 处理上传图片后返回数据，添加img标签到编辑框内
            console.log('json')
            console.log(json)
            console.log(json[0].data.filePath)
            this.announce.noticeContent = this.announce.noticeContent + '<img src=' + json[0].data.filePath + '>';
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                newNotice(this.announce).then(res => {
                    console.log(res)
                })
            // if (valid) {
            //     alert('submit!');
            // } else {
            //     console.log('error submit!!');
            //     return false;
            // }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        close(){
            this.$emit('update:dialogFormVisible',false)
            this.$refs.ruleForm.resetFields();
            this.iftequan = false;
            this.$emit('close');
            if (typeof done === 'function') {
                done()
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .newAnnounce{
        .el-dialog{
            .el-dialog__body{
                position: relative;
                .el-form-item{
                    display: block;
                    margin-right: 30%;
                }
                .el-button{
                   padding:12px 20px;
                }
                .editors{
                    margin-right: 5%;
                }
                #mceu_417-body{
                    display: none;
                }
            }
        }

    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .newAnnounce{
         .el-dialog{
            .el-dialog__body{
                padding:20px 10px 20px 50px;
                border-bottom:0 none;
                .el-form-item__content{
                   
                }
            }
        }
    }
</style>

