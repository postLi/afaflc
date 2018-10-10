<template>
    <div class="newAnnounce commoncss">
        <el-dialog title='指派司机' :close-on-click-modal="false" top="5vh"  :visible="dialogFormVisible" @close="close">
            <el-form :model="announce" :rules="rules" :label-position="labelPosition" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="发布区域" prop="noticeLocation">
                    <vregion :ui="true" :area="false" @values="regionChange" class="form-control">
                        <el-input v-model="announce.noticeLocation" placeholder="请选择出发地" clearable></el-input>
                    </vregion>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="announce.title" maxlength="30" clearable></el-input>
                </el-form-item>
                <el-form-item prop="titleLogo" label="标题图片" >
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="announce.titleLogo"  />
                </el-form-item>
                <el-form-item label="内容" class="editors" prop="noticeContent">
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
                <el-form-item prop="release">
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
                <el-form-item label="有效期" prop="startTime">
                    <el-date-picker
                    v-model="announce.startTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    :picker-options="pickerOptions"
                    value-format="timestamp">
                    </el-date-picker>
                    <span> 至 </span>
                    <el-date-picker
                    v-model="announce.endTime"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp">
                    </el-date-picker>
                    <el-checkbox v-model="isTop" >置顶</el-checkbox> 
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">{{operateType == 'publish' ? '立即发布' : '保存修改'}}</el-button>
                <el-button @click="close">重置</el-button>
            </div> 
        </el-dialog>
    </div>
</template>
<script>

import { getDictionary } from '@/api/common.js'
import vregion from '@/components/vregion/Region'
import editor from '@/components/tinymac/index'
import upload from '@/components/Upload/singleImage'
import { newNotice,updateNotice } from '@/api/company/announcement.js'

export default {
    name: 'newAnnounce',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true,
        },
        announceForm:{
            type:Object,
        },
        operateType:{
            type:String,
            default:'publish'
        }
    },
    components:{
        vregion,
        editor,
        upload

    },
    data() {
        var checkRelease = (rule, value, callback) => {
            if (!this.releaseDriver && !this.releaseShipper) {
                callback(new Error('至少选择一项'));
            } else {
                callback();
            }
        };
        return {
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() < Date.now();
                },
            },
            releaseDriver:false,//发布到车主分组
            releaseShipper:false,//发布到货主分组
            isTop:false,//是否置顶
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
                isTop:'0',//是否置顶
            },
            optionsGroupCode:[],
            announceTime:[],
            editorSetting: { // 配置富文本编辑器高
                height: 300
            },
            Url: '', // 图片对应的上传地址,不传!
            MaxSize: 2097152, // 文件大小
            Accept: 'image/jpeg, image/png', // 文件格式
            withCredentials: true,
            rules: {
                noticeLocation: [
                    { required: true, message: '请选择发布区域', trigger: 'change' },
                ],
                title: [
                    { required: true, message: '请填写标题', trigger: 'change' }
                ],
                titleLogo: [
                    { required: true, message: '请上传标题图片', trigger: 'change' }
                ],
                noticeContent: [
                    { required: true, message: '请填写公告内容', trigger: 'change' }
                ],
                noticeGroupCode: [
                    { required: true, message: '请选择车主端公告分组', trigger: 'change' }
                ],
                startTime: [
                    { required: true, message: '请选择有效期开始时间', trigger: 'change' }
                ],
                release:[
                    {required: true, validator: checkRelease, trigger: 'blur'}
                ]
            }
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
        announceForm(newValue,oldValue){
            console.log('+++++++++',newValue,oldValue)
            if(Object.keys(newValue).length != 0){
                this.announce = newValue;
                this.releaseDriver= newValue.releaseDriver == '0' ? false :true;//发布到车主分组
                this.releaseShipper= newValue.releaseShipper == '0' ? false :true;//发布到货主分组
                this.isTop= newValue.isTop == '0' ? false :true;//是否置顶
            }
        },
        releaseDriver:{
            handler(curVal,oldVal){
                // console.log(curVal);
                if(curVal){
                    this.announce.releaseDriver = '1'
                }else{
                    this.announce.releaseDriver = '0';
                    this.announce.noticeGroupCode = '';
                }
            },
            deep: true, 
        },
        releaseShipper:{
            handler(curVal,oldVal){
                // console.log(curVal);
                if(curVal){
                    this.announce.releaseShipper = '1'
                }else{
                    this.announce.releaseShipper = '0'
                }
            },
            deep: true, 
        },
        isTop:{
            handler(curVal,oldVal){
                // console.log(curVal);
                if(curVal){
                    this.announce.isTop = '1'
                }else{
                    this.announce.isTop = '0'
                }
            },
            deep: true, 
        },
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
            getDictionary(this.noticeGroupCode).then(res => {
                this.optionsGroupCode = res.data;
            });

            this.announce.startTime = Date.parse(new Date());;
            // console.log('this.announce.startTime',this.announce.startTime)
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
            // console.log(json[0].data.filePath)
            this.announce.noticeContent = this.announce.noticeContent + '<img src=' + json[0].data.filePath + '>';
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let announceform = Object.assign({},this.announce);
                console.log('announceform',announceform);
                let config = this.operateType == 'publish' ? '确定要将发布该条公告吗？' : '确定要修改该条公告吗？'
                this.$confirm(config, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    let noticeFuncton;
                    if(this.operateType == 'publish'){
                        noticeFuncton = newNotice(announceform);
                    }else{
                        noticeFuncton = updateNotice(announceform);
                    }
                    noticeFuncton.then(res => {
                        console.log('发布',res)
                        this.close()
                    }).catch(err=>{
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            } else {
                // console.log('error submit!!');
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：未填写完整内容！' 
                })
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        close(){
            this.$emit('update:dialogFormVisible',false)
            this.$refs.ruleForm.resetFields();
            this.releaseDriver = false;//发布到车主分组
            this.releaseShipper = false;//发布到货主分组
            this.isTop = false;//是否置顶
            this.announce.endTime = null;
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
                position:relative;
                .el-form-item{
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
                    .licensePicture{
                        .el-upload__text{
                            line-height:18px;
                        }
                        .upload__tip{
                            line-height:16px;
                        }
                    }
                }
            }
        }
    }
</style>

