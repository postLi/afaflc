<template>
    <div>
        <!-- 指派司机 -->
        <div class="newAnnounce commoncss">
            <el-dialog title='指派司机' :close-on-click-modal="false"   :visible="dialogFormVisible" @close="close">
                <!-- <el-form :model="announce" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                 
                    <el-form-item label="发布区域" prop="search">
                        <vregion :ui="true" :area="false" @values="regionChange" class="form-control">
                            <el-input v-model="announce.search" placeholder="请选择出发地" clearable></el-input>
                        </vregion>
                    </el-form-item>
                    <el-form-item label="标题" prop="carType">
                        <el-input v-model="announce.search" clearable placeholder="车主姓名/手机账号/车牌号码">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="iftequan" label="标题图片">
                        
                    </el-form-item>
                    <el-form-item label="内容">

                    </el-form-item>
                    <el-form-item label="链接">
                        <el-input v-model="announce.search"></el-input>
                    </el-form-item>
                </el-form> -->
                <div style="margin:0 5%; width: 90%;">
                    <editor
                        class="editor"
                        :value="content"
                        :setting="editorSetting"
                        @show="editors"
                        :url              = "Url"
                        :max-size         = "MaxSize"
                        :accept           = "Accept"
                        :with-credentials = "withCredentials"
                        @on-upload-fail         = "onEditorReady"
                        @on-upload-success= "onEditorUploadComplete"></editor>
                </div>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" plain @click="pointSearch('search')">保存</el-button>
                    <el-button type="info" plain @click="pointSearch('clear')">取消</el-button>
                </div> 
            </el-dialog>
        </div>
    </div>
</template>
<script>

import { getDictionary } from '@/api/common.js'
import { appointDriverList,nearDriverList } from '@/api/order/ordermange.js'
import vregion from '@/components/vregion/Region'
import editor from '@/components/tinymac/index'

export default {
    name: 'newAnnounce',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true,
        },
        orderSerial:{
            type:String,
        }
    },
   
    components:{
        vregion,
        editor

    },
    data() {
        return {
            announce:{
                search:''
            },
            editorSetting: { // 配置富文本编辑器高
            height: 300
            },
            Url: 'http://localhost:9528/api/PublicTransaction-SYS-Web/upload/singleUpload', // 图片对应的上传地址
            MaxSize: 75765, // 文件大小
            Accept: 'image/jpeg, image/png', // 文件格式
            withCredentials: true,
            content: '' // 富文本编辑器双向绑定的内容

            };
    },
    computed: {
    　
    },
    watch:{
        dialogFormVisible(newValue,oldValue){
            if(newValue){

            }
        }
    },
    mounted(){

    },
    methods: {
        regionChange(d) {
            console.log('data:',d)
            this.announce.search = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        //初始化选择项数据
        init(){

        },
        editors(content) { // editor组件传过来的值赋给content
            console.log(content)
            this.content = content
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
            this.content = this.content + '<img src=' + json[0].data.filePath + '>'
        },

        pointSearch(type){
            switch(type){
                case 'search':
                    break;
                case 'clear':
                    this.$refs.ruleForm.resetFields();
                    break;
            }
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
                
            }
        }

    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .newAnnounce{
         .el-dialog{
            .el-dialog__body{
                padding:20px 2px;
                border-bottom:0 none;
                .el-form-item__content{
                   
                }
            }
        }
    }
</style>

