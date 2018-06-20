<template>
    <div>
        <!-- 新增分类信息 -->
            <div class="addclassify commoncss">
                <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisible" @close="close">
                    <div class="chooseArea">
                        <p><span>* </span>所在地 ：</p>
                        <getCityList class="chooseItem" v-model="forms.areaCode" ref="area"></getCityList>
                    </div>
                    <div class="chooseServer chooseStyle">
                        <p><span>* </span>服务类型 ：</p>
                        <el-select v-model="forms.serivceCode" clearable placeholder="请选择">
                            <el-option
                                v-for="item in optionsService"
                                :key="item.value"
                                :label="item.name"
                                :value="item.code"
                                :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="chooseCarType chooseStyle">
                        <p><span>* </span>货主用车类型 ：</p>
                        <el-select v-model="forms.shipperCarType" clearable placeholder="请选择">
                            <el-option
                                v-for="item in optionsCarType"
                                :key="item.value"
                                :label="item.name"
                                :value="item.code"
                                :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="firstPush choosePush">
                        <p><span>* </span>第一轮推送 ：</p>
                                   
                        <el-input v-model="forms.firstRecommendKm"  maxlength="4" @blur="valuerules"></el-input>
                        <span>公里/</span>
                        <el-input v-model="forms.firstRecommendTime" maxlength="4" @blur="valuerules"></el-input>
                        <span>秒</span>                    
                    </div>
                    <div class="secondPush choosePush">
                        <p><span>* </span>第二轮及之后推送 ：</p>
                        <el-input v-model="forms.secondRecommendKm" maxlength="4" @blur="valuerules"></el-input>
                        <span>公里/</span>
                        <el-input v-model="forms.secondRecommendTime" maxlength="4" @blur="valuerules"></el-input>
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
                    <div class="chooseCarType chooseStyle">
                        <p><span>* </span>状态 ：</p>
                        <el-radio-group v-model="forms.usingStatus" >
                            <el-radio  v-for="(obj,key) in optionsStatus" :label="obj.value" :key='key'>{{obj.name}}</el-radio>
                        </el-radio-group>
                    </div>
                    <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="newInfoSave">保 存</el-button>
                    <el-button @click="closeAddNewInfo">取 消</el-button>
                    </div> 
                </el-dialog>
            </div>

            <cue ref="cue"></cue>
    </div>
</template>

<script>

import getCityList from '@/components/GetCityList/index'
import { data_CarList,data_ServerClassList } from '@/api/common.js'
import { data_NewData } from '@/api/dispatch/OpenseaRecommend.js'
import cue from "../../../components/Message/cue";


export default {
    name: 'addClassfy',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true
        }
    },
    components:{
        getCityList,
        cue
    },
    data() {
      return {
        forms:{
            areaCode:null,//地区code
            areaCodeName:null,
            firstRecommendKm:null,//第一次推送公里
            firstRecommendTime:null,//第一次推送时间
            secondRecommendKm:null,//第二次
            secondRecommendTime:null,//第二次
            serivceCode:null,//服务类型
            serivceCodeName:null,
            shipperCarType:null,//货主用车类型
            shipperCarTypeName:null,
            visualCarType:null,//可见车主类型
            visualCarTypeName:null,
            usingStatus:'1',//起始状态
        },
        optionsService:null,//服务选项
        optionsCarType:null,//车辆类型选项
        optionsVisualCarType:[],
        visualCarType:[],
        information:null,
    //可见车主类型
        optionsStatus:[
            {
                value:'1',
                name:"启用"
            },
                {
                value:'0',
                name:"禁用"
            }
        ]
      };
    },
    watch:{
        
    },
    mounted(){
        this.init();
        console.log("this.$refs.area",this.$refs.area)

    },
    methods: {
        close(){
            this.$emit('update:dialogFormVisible',false)
        },
        //初始化选择项数据
        init(){
             return Promise.all([data_CarList(), data_ServerClassList()]).then(resArr => {
                 console.log(resArr)
                 this.optionsCarType = resArr[0].data;
                 this.optionsService =resArr[1].data;
                 this.optionsVisualCarType =resArr[0].data;
            }).catch(err => {
                
            })
        },
        newInfoSave(){
            if(this.$refs.area.selectedOptions.length > 1){
                let province;
                this.$refs.area.areaData.forEach((item) =>{
                    if(item.code == this.$refs.area.selectedOptions[0]){
                        province = item
                    }
                })
                province.children.forEach( item => {
                    if(item.code == this.$refs.area.selectedOptions[1]){
                        this.forms.areaCode = item.code;
                        this.forms.areaCodeName = item.name;
                    }
                })
            }else{
                this.$refs.area.areaData.forEach((item) =>{
                    if(item.code == this.$refs.area.selectedOptions[0]){
                        this.forms.areaCode = item.code;
                        this.forms.areaCodeName = item.name;
                    }
                })
            }
            let visualCar = [];
            this.optionsVisualCarType.forEach(item => {
                for(var i = 0; i<this.visualCarType.length;i++){
                    if(item.code == this.visualCarType[i]){
                        visualCar.push(item.name)
                    }
                }
            })
            console.log(visualCar)
            this.forms.visualCarTypeName = visualCar.join(',');
            this.forms.visualCarType = this.visualCarType.join(',');

            if(this.forms.serivceCode){
                
                this.forms.serivceCodeName = this.optionsService.find(item => item.code === this.forms.serivceCode)['name'];
            }
            if(this.forms.shipperCarType){

                this.forms.shipperCarTypeName = this.optionsCarType.find(item => item.code === this.forms.shipperCarType)['name'];
            }


            if(!this.forms.areaCode){
                let information = "请选择地区";
                this.$refs.cue.hint(information)
            }
            else if(!this.forms.serivceCode){
                let information = "请选择服务类型";
                this.$refs.cue.hint(information)
            }
            else if(!this.forms.shipperCarType){
                let information = "请选择车辆类型";
                this.$refs.cue.hint(information)
            }
            else if(!this.forms.firstRecommendKm || !this.forms.firstRecommendTime ){
                let information = "第一轮推送公里数和秒数必填且为数字整数";
                this.$refs.cue.hint(information) 
            }
            else if(!this.forms.secondRecommendKm || !this.forms.secondRecommendTime ){
                let information = "第二轮及以后推送公里数和秒数必填且为数字整数";
                this.$refs.cue.hint(information)
            }
            else if(!this.forms.visualCarType){
                let information = "请选择可见车主类型";
                this.$refs.cue.hint(information)
            }else{
                data_NewData(this.forms).then(res=>{
                    console.log(res)
                    this.$emit('renovate')
                })
            }
            console.log(this.forms)
        },
        closeAddNewInfo(){
            this.close();  
            this.forms = {
                areaCode:null,//地区code
                firstRecommendKm:null,//第一次推送公里
                firstRecommendTime:null,//第一次推送时间
                secondRecommendKm:null,//第二次
                secondRecommendTime:null,//第二次
                serivceCode:null,//服务类型
                shipperCarType:null,//货主用车类型
                visualCarType:null,//可见车主类型
                usingStatus:'1',//起始状态
            };        
            
            console.log(this.forms)
        },
        valuerules(){
            if(!event.target.value){
                return 
            }else{
                if(!/^[0-9]+$/.test(event.target.value)){
                    let information = "请输入数字类型内容";
                    this.$refs.cue.hint(information)
                    for(let item in this.forms){
                        if(this.forms[item] == event.target.value){
                            this.forms[item] = null;
                        }
                    }
                    event.target.focus()
                }
            }
        }
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .addclassify{
        .el-dialog{
            width: 700px;
        }
        .el-dialog__body{
            border-bottom:1px solid #ccc;   
            margin-bottom: 0; 
        }
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
            .el-radio-group{
                .el-radio{
                    .el-radio__input{
                        .el-radio__inner{
                            // width: 12px;
                            // height: 12px;
                        }
                    }
                    .el-radio__label{
                        font-size: 12px;
                    }
                }
            }
        }
        .chooseVisual{
            .el-select{
                .el-input{
                   width: 478px;
               }
            }
        }
        .choosePush{
            display: inline-block;
            margin: 5px 0;
            margin-right: 48px;
            .el-input{
                width: 50px;
            }
            span{
                font-size: 12px;
                line-height: 20px;
            }
        }
        .secondPush{
            p{
                width: 120px;
            }
        }

    }
</style>
