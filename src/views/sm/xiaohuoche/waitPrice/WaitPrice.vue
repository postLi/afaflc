<template>
    <div class="commoncss areaPrice">
        <el-dialog :title="formtitle" :close-on-click-modal="false" :visible="dialogWaitPrice" @close="close" v-loading="loading">
            <el-form :inline="true" v-if="!isModify" :model="standForm" :rules="newrules"  ref="ruleForm"  label-position="left" size="mini">
                <div class="newWait">
                    <div class="threePass">
                        <div class="chooseAera chooseCommon">
                            <h4><span>* </span> 选择省市</h4>
                            <div class="eltree_search lesscommon">
                                <el-input
                                class="el_search"
                                placeholder=""
                                suffix-icon="el-icon-search"
                                v-model="filterText">
                                </el-input>
                                <el-tree
                                    show-checkbox
                                    :data="cityTree"
                                    :props="defaultProps"
                                    node-key="code"
                                    ref = 'tree'
                                    :highlight-current = "true"
                                    :filter-node-method="filterNode"
                                    >
                                </el-tree>
                            </div>
                            <div class="infowrite">
                                <!-- <p><span>* </span>免费</p> -->
                                <el-form-item class="nowCity" label="免费：" prop="carType">
                                    <el-input  
                                        v-number-only:point
                                        placeholder="请输入内容"
                                        v-model="standForm.freeTime"
                                        clearable>
                                        <template slot="append">小时</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="chooseServer chooseCommon">
                            <h4><span>* </span> 选择服务分类</h4>
                            <div class="lesscommon">
                                <el-checkbox-group v-model="serverCheckList">
                                    <el-checkbox v-for="item in optionsService" :label="item.code" :key="item.id" >{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="infowrite">
                                <p><span>* </span>每间隔</p>
                                <el-input  
                                    v-number-only:point
                                    placeholder="请输入内容"
                                    v-model="standForm.intervalTime"
                                    clearable>
                                    <template slot="append">分钟</template>
                                </el-input>
                            </div>
                        </div>
                        <div class="chooseCar chooseCommon">
                            <h4><span>* </span> 选择车辆类型</h4>
                            <div class="lesscommon ">
                                <el-checkbox-group v-model="carCheckList">
                                    <el-checkbox v-for="item in optionsCar" :label="item.code" :key="item.id">{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="infowrite">
                                <p><span>* </span>超时费用</p>
                                <el-input  
                                    v-number-only:point
                                    placeholder="请输入内容"
                                    v-model="standForm.timeOutstripPrice"
                                    clearable>
                                    <template slot="append">元</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="additional ">
                        <p>{{remarkinfo}}</p>
                        <p>费用说明</p>
                        <el-input
                            placeholder="少于500字符"
                            type="textarea"
                            :rows="2"
                            maxlength="500"
                            clearable
                            v-model="standForm.waitPriceDes">
                        </el-input>
                    </div>
                </div>
            </el-form>

            <el-form  :inline="true" v-else :model="reviseForm" :rules="reviserules"  ref="ruleForm"  label-position="right">
                
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify? '保存' : '确定'}}</el-button>
                <el-button @click="close">取 消</el-button>
            </div>
        </el-dialog>    
    </div>
</template>

<script>
import { DicServiceType,DicCartype,aflcProvinceCode } from '@/api/common.js'

import { objectMerge2, parseTime } from '@/utils/'
export default {
    name:'WaitPrice',
    props:{
        dialogWaitPrice:{
            type:Boolean,
            default:false
        },
        isModify:{
            type:Boolean,
            default:false
        },
        formtitle:{
            type:String,

        },
        reviseForm:{
            type:Object
        }
    },
    components:{

    },
    data(){
        return {
            cityTree:[],//省市区树形结构
            filterText: '',
            maxlengthNum:200,
            formLabelWidth:'110px',
            loading:false,
            btnShow:false,
            optionsService: [],
            optionsCar: [],
            standForm:{
                waitPriceDes:'',
                freeTime:'',
                intervalTime:'',
                carType:'',
                serviceCode:'',
                timeOutstripPrice:'',
                cityId:''
            },
            serverCheckList:[],//服务分类
            carCheckList:[],//车辆类型
            defaultProps: {
                label: 'name',
                children: 'children'
            },
            newrules: {
                serivceCode: [
                    { required: true, message:"请选择服务类型", trigger: 'blur' },
                ],
                carType:[
                    { required: true, message:"请选择车辆类型", trigger: 'blur' },
                ],
                standardPriceId:[
                    { required: true, message:"请选择车长规格", trigger: 'blur' },
                ],
                areaPrice:[
                    {required:true,message:"请输入区域起步价",trigger:'blur'},
                ],
                areaKm:[
                    {required:true,message:"请输入区域起步公里",trigger:'blur'},
                ],
                areaOutstripPrice:[
                    {required:true,message:"请输入区域超里程费",trigger:'blur'},
                ]
            },
            reviserules:{
                areaPrice:[
                    {required:true,message:"请输入区域起步价",trigger:'blur'},
                ],
                areaKm:[
                    {required:true,message:"请输入区域起步公里",trigger:'blur'},
                ],
                areaOutstripPrice:[
                    {required:true,message:"请输入区域超里程费",trigger:'blur'},
                ]
            }
        }
    },
    watch:{
        dialogWaitPrice:{
            handler(newVal,oldVal){
                console.log('this.isModify',this.isModify)
                if(newVal && !this.isModify){
                    this.init()
                }else{
                    console.log('test',this.reviseForm)
                }
            },  
            deep:true
        },
        filterText(val) {
            // this.$refs.tree.filter(val)
        }

    },
    mounted(){
    },
    methods:{
        init(){
            Promise.all([DicServiceType(),DicCartype(),aflcProvinceCode()]).then(resArr => {
                this.optionsService = resArr[0].data;
                this.optionsCar = resArr[1].data;
                this.cityTree = resArr[2].data;
            })
        },
        filterNode(value, data) {
            // console.log(value,data)
            if (!value) return true
            return data.name.indexOf(value) !== -1
        },
        submitForm() {
            // if(!this.isModify){
            //     this.$refs.ruleForm.validate((valid) => {
            //         let getNodeId = this.$refs.tree.getCheckedNodes();
            //         let ifCity =  getNodeId.length>0 ?  true : false;
            //         if (valid && ifCity) {
            //             this.btnShow = true;
            //             let cityArr =[];
            //             getNodeId.forEach(el =>{
            //                 cityArr.push(el.code);
            //             })
            //             let forms = objectMerge2({},this.standForm,{cityId:cityArr.join(',')})
            //             data_NewOrChange(forms).then(res =>{
            //                  this.close();
            //              }).catch(err => {
            //                  this.$message({
            //                      type: 'info',
            //                      message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
            //                  })
            //                 this.btnShow = false;

            //              })
            //         } else if(!ifCity){
            //             return this.$message({
            //                 type: 'warning',
            //                 message: '请选择省市'
            //             });
            //         }
            //         else {
            //             return this.$message({
            //                 type: 'warning',
            //                 message: '请填写完整数据'
            //             });
            //         }
            //      });
            // }else{
            //     this.$refs.ruleForm.validate((valid) => {
            //         if (valid ) {
            //             this.btnShow = true;
            //             let forms =  objectMerge2({},this.reviseForm);
            //             data_OnlyChange(forms).then(res =>{
            //                  this.close();
            //              }).catch(err => {
            //                  this.$message({
            //                      type: 'info',
            //                      message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
            //                  })
            //                 this.btnShow = false;
            //              })
            //         } 
            //         else {
            //             return this.$message({
            //                 type: 'warning',
            //                 message: '请填写完整数据'
            //             });
            //         }
            //      });
            // }
        },  
        close(){
            this.$refs.ruleForm.resetFields();
            this.$emit('update:dialogWaitPrice', false);
            this.$emit('close');
            this.btnShow = false; 
            if (typeof done === 'function') {
                done()
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    .waitPrice{
        .newWait{
            padding:0 30px;
            .threePass{
                display: flex;
                .chooseCommon{
                    flex: 1;
                    h4{
                        span{
                            color:red;
                        }
                        font-family: MicrosoftYaHei;
                        font-size: 12px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 20px;
                        letter-spacing: 0px;
                        color: #666;
                        margin-bottom: 5px;
                    }
                    .lesscommon{
                        height: 300px;
                        margin-bottom: 20px;
                        overflow: auto;
                        border:1px solid #d2d2d2;
                        
                        &>.el-checkbox-group{
                            .el-checkbox{
                                display: block;
                                margin-top:12px;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #666666;
                                margin-left:15px;
                            }
                        }
                    }
                    .el_search{
                        width: 100%;
                        padding:6px 5px;
                        .el-input__inner{
                            height: 26px;
                            line-height: 26px;
                        }
                    }
                    .infowrite{
                        // p{
                        //     display: inline-block;
                        //     width:60px;
                        //     text-align: right;
                        //     font-family: MicrosoftYaHei;
                        //     font-size: 12px;
                        //     font-weight: normal;
                        //     font-stretch: normal;
                        //     line-height: 20px;
                        //     letter-spacing: 0px;
                        //     color: #666;
                        //     span{
                        //         color:red;
                        //     }
                        // }
                        // span{
                        //     font-size:12px;
                        //     line-height: 20px;
                        //     color:#666;
                        // }
                        .el-input{
                            margin:0 5px;
                            width: 155px;
                            .el-input__inner{
                                height: 24px;
                                line-height: 24px;
                                padding:0 7px;
                                font-family: MicrosoftYaHei;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #3e9ff1;
                            }
                        }
                    }
                   
                }
                .chooseServer{
                    margin: 0 30px;
                }
            }
            .additional{
                p:first-child{
                    padding:10px 0 10px 70px;
                    font-size: 12px;
                    line-height: 20px;
                    letter-spacing: 0px;
                    color: #999999;
                }
                p:nth-child(2){
                    display: inline-block;
                    width: 60px;
                    text-align: right;
                    margin-right: 5px;
                }
                .el-textarea{
                    vertical-align:middle; 
                    width: 680px;
                    font-size: 12px;
                    line-height: 20px;
                    vertical-align: top;
                    .el-textarea__inner{
                        color: #3e9ff1;
                    }
                }

            }
        }
    }
</style>
