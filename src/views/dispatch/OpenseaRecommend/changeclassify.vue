<template>
    <div>
        
    <!-- 新增分类信息 -->
        <div class="addclassify commoncss">
            <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisibleChange" @close="close">
                <div class="chooseArea">
                    <p><span>* </span>所在地 ：</p>
                    <el-input v-model="changeforms.areaCodeName" disabled></el-input>
                </div>
                <div class="chooseServer chooseStyle">
                    <p><span>* </span>服务类型 ：</p>
                    <el-input v-model="changeforms.serivceCodeName" disabled></el-input>
                </div>
                <div class="chooseCarTypeList chooseStyle">
                    <p><span>* </span>货主用车类型 ：</p>
                    <el-input v-model="changeforms.shipperCarTypeName" disabled></el-input>
                </div>
                <div class="firstPush choosePush">
                    <p><span>* </span>第一轮推送 ：</p>
                    <el-input v-model="changeforms.firstRecommendKm" maxlength="4" @blur="valuerules"></el-input>
                    <span>公里/</span>
                    <el-input v-model="changeforms.firstRecommendTime" maxlength="4" @blur="valuerules"></el-input>
                    <span>秒</span>                    
                </div>
                 <div class="secondPush choosePush">
                    <p><span>* </span>第二轮及之后推送 ：</p>
                     <el-input v-model="changeforms.secondRecommendKm" maxlength="4" @blur="valuerules"></el-input>
                    <span>公里/</span>
                    <el-input v-model="changeforms.secondRecommendTime" maxlength="4" @blur="valuerules"></el-input>
                    <span>秒</span>                    
                </div>
                <div class="chooseVisual chooseStyle">
                    <p><span>* </span>可见车主类型 ：</p>
                    <el-select v-model="visualCarTypeM" multiple  clearable placeholder="请选择">
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
                    <el-radio-group v-model="usingStatus" >
                        <el-radio  v-for="(obj,key) in optionsStatus" :label="obj.value" :key='key'>{{obj.name}}</el-radio>
                    </el-radio-group>
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
import { data_ChangeData } from '@/api/dispatch/OpenseaRecommend.js'
import cue from "../../../components/Message/cue";


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
            visualCarTypeM:[],
            optionsStatus:[
            {
                value:'1',
                name:"启用"
            },
                {
                value:'0',
                name:"禁用"
            },
            ],
            usingStatus:null,
      };
    },
    components:{
        cue
    },
    watch:{
        dialogFormVisibleChange:function(){
            this.visualCarTypeM = this.changeforms.visualCarType.split(',')
            this.usingStatus = this.changeforms.usingStatus
        }
    },
    mounted(){
        this.init();
        // console.log(this.changeforms)
        // console.log("this.visualCarTypeM:",this.visualCarTypeM)
        
        
    },
    methods: {
        close(){
            this.$emit('update:dialogFormVisibleChange',false)
        },
        init(){
            // console.log(this.props.changeforms)
            
            data_CarList().then(res=>{
                this.optionsVisualCarType =res.data;
            }).catch(err => {
                
            })
        },
        //修改保存
        changeInfoSave(){
            this.changeforms.usingStatus = this.usingStatus;

            // console.log("this.visualCarTypeM:",this.visualCarTypeM)

            let visualCar = [];
            this.optionsVisualCarType.forEach(item => {
                for(var i = 0; i<this.visualCarTypeM.length;i++){
                    if(item.code == this.visualCarTypeM[i]){
                        visualCar.push(item.name)
                    }
                }
            })
            // console.log(visualCar)
            this.changeforms.visualCarTypeName = visualCar.join(',');
            this.changeforms.visualCarType = this.visualCarTypeM.join(',') ;

           if(!this.changeforms.firstRecommendKm || !this.changeforms.firstRecommendTime ){
                let information = "第一轮推送公里数和秒数必填且为数字整数";
                this.$refs.cue.hint(information);
                return 
            }
            else if(!this.changeforms.secondRecommendKm || !this.changeforms.secondRecommendTime ){
                let information = "第二轮及以后推送公里数和秒数必填且为数字整数";
                this.$refs.cue.hint(information)
                return
            }
            else if(!this.changeforms.visualCarType){
                let information = "请选择可见车主类型";
                this.$refs.cue.hint(information)
                return
            }else{

                // console.log(this.changeforms)           
                data_ChangeData(this.changeforms).then(res=>{
                    console.log(res)
                    this.$emit('renovate')
                    this.close()
                }).catch(res=>{
                    this.$emit('ifError', res.text)
                })  
            }
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
                    for(let item in this.changeforms){
                        if(this.changeforms[item] == event.target.value){
                            this.changeforms[item] = null;
                        }
                    }
                    event.target.focus()
                }
            }
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .addclassify{
        
        .chooseCarTypeList{
            margin-left: 37px;
        }
    }
    
</style>
