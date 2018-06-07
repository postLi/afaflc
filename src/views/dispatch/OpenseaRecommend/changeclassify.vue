<template>
    <!-- 新增分类信息 -->
        <div class="addclassify commoncss">
            <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisibleChange" @close="close">
                <div class="chooseArea">
                    <p><span>* </span>所在地 ：</p>
                    <el-input v-model="changeforms.areaCode" disabled></el-input>
                </div>
                <div class="chooseServer chooseStyle">
                    <p><span>* </span>服务类型 ：</p>
                    <el-input v-model="changeforms.serivceCode" disabled></el-input>
                </div>
                <div class="chooseCarType chooseStyle">
                    <p><span>* </span>货主用车类型 ：</p>
                    <el-input v-model="changeforms.shipperCarType" disabled></el-input>
                </div>
                <div class="firstPush choosePush">
                    <p><span>* </span>第一轮推送 ：</p>
                    <el-input v-model="changeforms.firstRecommendKm"></el-input>
                    <span>公里/</span>
                    <el-input v-model="changeforms.firstRecommendTime"></el-input>
                    <span>秒</span>                    
                </div>
                 <div class="secondPush choosePush">
                    <p><span>* </span>第二轮及之后推送 ：</p>
                     <el-input v-model="changeforms.secondRecommendKm"></el-input>
                    <span>公里/</span>
                    <el-input v-model="changeforms.secondRecommendTime"></el-input>
                    <span>秒</span>                    
                </div>
                <div class="chooseVisual chooseStyle">
                    <p><span>* </span>可见车主类型 ：</p>
                    <el-select v-model="visualCarType" multiple  clearable placeholder="请选择">
                        <el-option
                            v-for="item in optionsVisualCarType"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </div><br/>
                
                <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changeInfoSave">保 存</el-button>
                <el-button @click="closeChangeInfo">取 消</el-button>
                </div> 
            </el-dialog>
        </div>
</template>

<script>
import { data_CarList } from '@/api/common.js'

export default {
    name: 'getCityList',
    props: {
        dialogFormVisibleChange:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true
        },
        changeforms:{
            type:Object,
            required:true
        }
    },
    data() {
      return {
            optionsVisualCarType:[],
            visualCarType:[],
      };
    },
    watch:{
        
    },
    methods: {
        close(){
            this.$emit('update:dialogFormVisibleChange',false)
        },
        init(){
            data_CarList().then(res=>{
                this.optionsVisualCarType =res.data;
            }).catch(err => {
                
            })
        },
        //修改保存
        changeInfoSave(){
            console.log(this.changeform)
            data_changeClassfy(this.changeforms).then(res=>{
                this.firstblood();
                this.dialogFormVisible_change = false;
            })  
        },
        //修改关闭
        closeChangeInfo(){
            this.close();
        }
    },
    mounted(){
        this.init();
        // console.log(changeforms)
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    
</style>
