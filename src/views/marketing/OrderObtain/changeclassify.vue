<template>
    <div>
        
    <!-- 新增分类信息 -->
        <div class="changeOrderObtain commoncss">
            <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisibleChange" @close="close">
                <div class="chooseArea">
                    <p><span>* </span>当前区域 ：</p>
                    <el-input v-model="changeforms.areaCodeName" disabled></el-input>

                </div>
                <div class="chooseServer chooseStyle">
                    <p><span>* </span>当前服务类型 ：</p>
                    <el-input v-model="changeforms.serivceCodeName" disabled></el-input>
                   
                </div>
                <div class="chooseCarType chooseStyle">
                    <p><span>* </span>当前用车类型 ：</p>
                    <el-input v-model="changeforms.carTypeName" disabled></el-input>
                </div>

                 <div class="ifBang"  >
                    <p class="needMoreWidth"><span>* </span>当前中单公布时间及距离</p>
                    <div class="publishSet">
                        <div class="chooseTime publishStyle">
                            <span>公布中单时间 ：</span>
                            <el-input v-model="changeforms.obtainTime" placeholder="请输入内容" maxlength="4" clearable></el-input>
                            <span>/秒</span>
                        </div>
                        <div class="chooseKM publishStyle">
                            <span>公布中单距离 ：</span>
                            <el-input v-model="changeforms.obtainKm" placeholder="请输入内容" maxlength="4" clearable></el-input>
                            <span>/公里</span>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changeInfoSave">保 存</el-button>
                <el-button @click="closeChangeInfo">取 消</el-button>
                </div> 
            </el-dialog>
        </div>
        <cue ref="cue"></cue>
    </div>
        
</template>

<script>
import { data_CarList } from '@/api/common.js'
import { data_ChangeData } from '@/api/dispatch/OrderObtain.js'
import cue from "@/components/Message/cue";


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
        
           
      };
    },
    components:{
        cue
    },
    watch:{
        
    },
    mounted(){
      
    },
    methods: {
        close(){
            this.$emit('update:dialogFormVisibleChange',false)
        },
        init(){
           
        },
        //修改保存
        changeInfoSave(){
            
        //    if(!this.changeforms.firstRecommendKm || !this.changeforms.firstRecommendTime ){
        //         let information = "第一轮推送公里数和秒数必填且为数字整数";
        //         this.$refs.cue.hint(information) 
        //     }
        //     else if(!this.changeforms.secondRecommendKm || !this.changeforms.secondRecommendTime ){
        //         let information = "第二轮及以后推送公里数和秒数必填且为数字整数";
        //         this.$refs.cue.hint(information)
        //     }
        //     else if(!this.changeforms.visualCarType){
        //         let information = "请选择可见车主类型";
        //         this.$refs.cue.hint(information)
        //     }else{

                console.log(this.changeforms)    
                data_ChangeData(this.changeforms).then(res=>{
                    console.log(res)
                    this.$emit('renovate')
                    this.close()
                }).catch(res=>{
                    this.$emit('ifError', res.text)
                })  
            // }
        },
        //修改关闭
        closeChangeInfo(){
            this.close();
            
        },
        //验证数据值
        valuerules(event){
            if(!event.target.value){
                return 
            }else{
                if(!/^[0-9]+$/.test(event.target.value)){
                    let information = "请输入数字类型内容";
                    this.$refs.cue.hint(information)
                    event.target.focus()
                }
            }
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .changeOrderObtain{
        .el-dialog__wrapper{
            .el-dialog{
                width: 700px;
                .el-dialog__body{
                    border-bottom:1px solid #ccc;   
                    margin-bottom: 0; 
                    margin: 0 10px;
                    p{
                        display: inline-block;
                        font-size: 12px;
                        line-height: 20px;
                        color: #666666;
                        width: 100px;
                        text-align: right;
                        span{
                            color: red;
                        }
                    }
                    .chooseArea{
                        .chooseItem{
                            display: inline-block;
                            .el-input{
                                width: 150px;
                            }
                        }
                    }
                    .chooseStyle{
                        display: inline-block;
                        margin: 5px 0;
                        margin-right: 70px;
                        .el-select{
                            .el-input{
                                width: 150px;
                            }
                        }
                        
                    }
                    .ifBang{
                        position: relative;
                        .needMoreWidth{
                            display: block;
                            width: 150px;
                        }
                        .publishSet{
                            border: 1px solid #ccc;
                            margin: 5px 50px;
                            padding: 10px;
                            .publishStyle{
                                display: inline-block;
                                span{
                                    font-size: 12px;
                                    line-height: 20px;
                                    color: #666666;
                                    text-align: right;
                                }
                            }
                            .chooseTime{
                                padding:0 0 0 55px; 
                            }
                        }
                        .addItem,.reduceItem{
                            top: 35px;
                            left: 94%;
                        }
                    }
                }
            }
        }
    }
</style>
