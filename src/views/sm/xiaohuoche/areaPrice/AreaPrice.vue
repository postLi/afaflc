<template>
    <div class="commoncss areaPrice">
        <el-dialog :title="formtitle" :close-on-click-modal="false" :visible="dialogAreaPrice" @close="close" v-loading="loading">
            <el-form :inline="true" v-if="!isModify" :model="standForm"  ref="ruleForm"  label-position="left" size="mini">
                  <div class="infoinner clearfix">
                        <div class="slot_info clearfix">
                            <div class="newarea area_left">
                                <span class="slot_head">新增区域定价</span>
                                <div class="area_left_server area_server">
                                    <h4><span>* </span> 选择标准服务类型</h4>
                                    <div class="eltree_search chooseclassfy">
                                         <el-form-item class="chose" label="选择服务分类:" prop="serivceCode">
                                            <el-select v-model="standForm.serivceCode" clearable placeholder="请选择" @change="choseStyle">
                                                <el-option
                                                    v-for="item in optionsService"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.code"
                                                    :disabled="item.disabled">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item class="chose" label="选择车辆类型:" prop="carType">
                                            <el-select v-model="standForm.carType" clearable placeholder="请选择" @change="choseStyle">
                                                <el-option
                                                    v-for="item in optionsCar"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.code"
                                                    :disabled="item.disabled">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item class="chose" label="车长:" prop="standardPriceId">
                                           <el-select v-model="standForm.standardPriceId" clearable placeholder="请选择"   @change="choseVule">
                                                <el-option
                                                    v-for="item in optionsCarStyle"
                                                    :key="item.id"
                                                    :label="item.carStyle"
                                                    :value="item.standardPid"
                                                    :disabled="item.disabled">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                    <label>
                                        <span class="control">标准起步价</span>
                                        <el-input
                                            disabled
                                            v-model="standForm.standardPrice"
                                            clearable>
                                        </el-input>
                                        <span>元</span>
                                        <el-input
                                            disabled
                                            v-model="standForm.standardKm"
                                            clearable>
                                        </el-input>
                                        <span>公里</span>
                                    </label>
                                    <label>
                                        <span class="control">超里程费</span>         
                                        <el-input
                                            disabled
                                            v-model="standForm.outstripPrice"
                                            clearable>
                                        </el-input>
                                        <span>元 / 公里</span>
                                    </label>       
                                </div>
                            </div>
                            <div class="newarea area_right">
                                <span class="slot_head">设置区域价</span>
                                <div class="area_right_server area_server">
                                    <h4><span>* </span> 选择省市</h4>
                                    <div class="eltree_search">
                                        <el-input
                                        class="el_search"
                                        placeholder=""
                                        suffix-icon="el-icon-search"
                                        v-model="filterText">
                                        </el-input>
                                        <el-tree
                                        show-checkbox
                                        :data="cityTree" :props="defaultProps"
                                        node-key="code"
                                        ref = 'tree'
                                        :highlight-current = "true"
                                        @node-expand="handleNodeClickMore"
                                        :filter-node-method="filterNode"
                                        >
                                        </el-tree>
                                    </div>
                                    <label>
                                        <span style="color:red;">* </span><span class="control">区域起步价</span>
                                        <el-input
                                            v-numberOnly
                                            placeholder="请输入内容"
                                            v-model="standForm.areaPrice"
                                            clearable>
                                        </el-input>
                                        <span>元</span>
                                        <el-input
                                            placeholder="请输入内容"
                                            v-numberOnly
                                            v-model="standForm.areaKm"
                                            clearable>
                                        </el-input>
                                        <span>公里</span>
                                    </label>
                                    <label>
                                        <span style="color:red;">* </span><span class="control">区域超里程费</span>         
                                        <el-input
                                            v-numberOnly
                                            placeholder="请输入内容"
                                            v-model="standForm.areaOutstripPrice"
                                            clearable>
                                        </el-input>
                                        <span>元 / 公里</span>
                                    </label>       
                                </div>
                            </div>
                        </div>
                    </div>

            </el-form>

            <el-form :inline="true" v-else :model="standForm"  ref="ruleForm"  label-position="left" size="mini">
                <div class="changeInforMation">
                    <div class="nowCity">
                        <h4><span>* </span>当前城市</h4>
                        <el-input
                            v-model="changeforms.areaName"
                            disabled
                            clearable>
                        </el-input>
                    </div>
                    <div class="chose">
                        <p><span>* </span>当前服务分类 ：</p>
                        <el-input
                            v-model="changeforms.serviceName"
                            :disabled="true">
                        </el-input>
                    </div>
                        <div class="chose">
                        <p><span>* </span>当前车辆类型 ：</p>
                        <el-input
                            v-model="changeforms.carTypeName"
                            :disabled="true">
                        </el-input>
                    </div>
                    <div class="chose">
                        <p><span>* </span>车长 ：</p>
                        <el-input
                            v-model="changeforms.carTypeStyle"
                            :disabled="true">
                        </el-input>
                    </div>
                    <div class="reference">
                        <div class="referenceM">
                                <span class="control">标准起步价</span>
                                <el-input
                                    disabled
                                    v-model="changeforms.standardPrice"
                                    clearable>
                                </el-input>
                                <span>元</span>
                                <el-input
                                    disabled
                                    v-model="changeforms.standardKm"
                                    clearable>
                                </el-input>
                                <span>公里</span>
                            </div>
                            <div class="referenceM">
                                <span class="control">超里程费</span>         
                                <el-input
                                    disabled
                                    v-model="changeforms.outstripPrice"
                                    clearable>
                                </el-input>
                                <span>元 / 公里</span>
                            </div>       
                    </div>
                    <div class="nowChange">
                        <span class="control">区域起步价</span>
                        <el-input
                            v-numberOnly
                            placeholder="请输入内容"
                            v-model="changeforms.areaPrice"
                            ref="newPrice"
                            clearable>
                        </el-input>
                        <span>元</span>
                        <el-input
                            v-numberOnly                                   
                            placeholder="请输入内容"
                            v-model="changeforms.areaKm"
                            ref="newInfoKm"
                            clearable>
                        </el-input>
                        <span>公里</span>
                    </div>
                    <div class="nowChange nowChangeInfo">
                        <span class="control">区域超里程费</span>         
                        <el-input
                            v-numberOnly                                    
                            placeholder="请输入内容"
                            v-model="changeforms.areaOutstripPrice"
                            ref="newMorePrice"
                            clearable>
                        </el-input>
                        <span>元 / 公里</span>
                    </div>       
                </div>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify? '保存' : '确定'}}</el-button>
                <el-button @click="close">取 消</el-button>
            </div>
        </el-dialog>    
    </div>
</template>

<script>

import { DicServiceType,DicCartype,GetCarStyle,aflcProvinceCode } from '@/api/common.js'
import { objectMerge2, parseTime } from '@/utils/'
import { data_NewOrChange, data_OnlyChange } from '@/api/server/areaPrice.js'
export default {
    name:'AddDictionary',
    props:{
        dialogAreaPrice:{
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
            optionsCarStyle: [], // 车长分类
            standForm:{
                serivceCode:'',
                carType:'',
                standardPriceId:'',
                standardPrice:'',
                standardKm:'',
                outstripPrice:'',
                cityId:'',
                areaOutstripPrice:'',
                areaKm:'',
                areaPrice:'',
            },
            changeforms: {
                areaKm: '',
                areaName: '',
                areaOutstripPrice: '',
                areaPid: '',
                areaPrice: '',
                carType: '',
                cityId: '',
                outstripPrice: '',
                serivceCode: '',
                standardKm: '',
                standardPrice: '',
                standardPriceId: ''
            },
            defaultProps: {
                label: 'name',
                children: 'children'
            },
        }
    },
    watch:{
        dialogAreaPrice:{
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
            this.$refs.tree.filter(val)
        }

    },
    mounted(){
    },
    methods:{
        init(){
            Promise.all([DicServiceType(),DicCartype(),aflcProvinceCode()]).then(resArr => {
                console.log('resArr:',resArr)
                this.optionsService = resArr[0].data;
                this.optionsCar = resArr[1].data;
                this.cityTree = resArr[2].data;
            })
        },
        choseStyle(val) {
            console.log(val)
            if (this.standForm.serivceCode && this.standForm.carType){
                GetCarStyle(this.standForm.serivceCode, this.standForm.carType).then(res => {
                    console.log('cartype',res)
                    if (res.data.length > 0) {
                        this.standForm.standardPriceId = '';
                        this.standForm.standardPrice = '';
                        this.standForm.standardKm = '';
                        this.standForm.outstripPrice = '';
                        this.optionsCarStyle = res.data;
                        this.optionsCarStyle.map((item) => {
                            item.carStyle = item.carLength + '*' + item.carWidth + '*' + item.carHeight + 'M'
                        })
                    }else{
                        for (const i in this.fostandFormrm) {
                            this.form[i] = ''
                        }
                    }
                }).catch(res => {
                    
                })
            }else{
               
            }
        },
        filterNode(value, data) {
            // console.log(value,data)
            if (!value) return true
            return data.name.indexOf(value) !== -1
        },
        // 弹窗Tree节点
        handleNodeClickMore(data, checked) {
            console.log(data)
         
        },
        // 根据车长显示标准定价
        choseVule(val) {
            this.optionsCarStyle.map((item) => {
                if (item.standardPid == val) {
                    this.standForm.standardPrice = item.standardPrice
                    this.standForm.standardKm = item.standardKm
                    this.standForm.outstripPrice = item.outstripPrice
                }
            })
            console.log(this.optionsCarStyle)
        },
        submitForm() {
            this.btnShow = true;
            let required = false;
            if(this.isModify){
              
            }else{
                const getNodeId = this.$refs.tree.getCheckedNodes();
                let cityArr =[];
                getNodeId.forEach(el =>{
                    cityArr.push(el.code);
                })
                // let cityId = this.$refs.tree.getCheckedNodes().join(',');
                let form = objectMerge2({},this.standForm,{cityId:cityArr.join(',')})
                console.log(form)
                data_NewOrChange(form).then(res=>{
                    this.close()
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                })
            }
        },  
        close(){
            this.$emit('update:dialogAreaPrice', false);
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
    .areaPrice{
            .el-dialog{
                position: relative;
                width: 820px;
                .el-dialog__headerbtn{
                    z-index: 99;
                }
            }
            .infoinner{
                height:350px;
                .slot_info{
                    position:absolute;
                    top:0;
                    left:0;
                    width:100%;
                    border-bottom: 1px solid #d0d7e5;
                    .newarea{
                        float:left;
                        width:50%;
                        padding:0 0 0 33px;
                        .slot_head{
                            display: inline-block;
                            text-align: center;
                            width:100%;
                            height: 40px;
                            font-family: MicrosoftYaHei;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 40px;
                            letter-spacing: 0px;
                            color: #ffffff;
                        }
                        .area_server{
                            padding-top:17px;
                            padding-bottom: 14px;
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
                                margin-bottom: 13px;
                            }
                            .eltree_search{
                                width: 250px;
                                height: 256px;
                                margin-bottom: 12px;
                                overflow: auto;
                                border: 1px solid #ccc;
                                p{
                                    margin:9px 0 0 33px;
                                    font-size: 12px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    line-height: 20px;
                                    letter-spacing: 0px;
                                    color: #333333;
                                }
                                .el-radio-group{
                                    margin-left:34px;
                                    font-size: 12px;
                                    line-height: 20px;
                                    color:#333;
                                    .el-radio{
                                        margin:6px 0 0 0;
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
                                .el-tree{
                                    .el-checkbox{
                                        margin-top:0;
                                        .el-checkbox__inner{
                                            width: 12px;
                                            height: 12px;
                                        }
                                    }
                                }
                            }
                            .chooseclassfy{
                                width: 250px;
                                .chose{
                                    margin-bottom: 0;
                                    .el-form-item__label{
                                        margin-left: 10px; 
                                        text-align: left;
                                    }
                                    .el-select{
                                        margin:5px 0;
                                        padding-left: 80px;
                                        .el-input{
                                            width: 150px;
                                            .el-input__inner{
                                                padding: 5px;
                                                height: 24px;
                                                line-height: 24px;
                                                font-size: 12px;
                                                color:#3e9ff1;
                                            }
                                        }
                                    }
                                }
                            }
                            label{
                                display: block;
                                margin-top:12px;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #666666;
                                .control{
                                    display: inline-block;
                                    text-align: right;
                                    width: 75px;
                                }
                                .el-input{
                                    width: 96px;
                                    height:24px;
                                    margin:0 6px;
                                    .el-input__inner{
                                        display: inline-block;
                                        width: 96px;
                                        height: 24px;
                                        font-size: 12px;
                                        border-radius: 2px;
                                        border: solid 1px #d4d4d4;
                                        padding:8px;
                                        color: #3e9ff1;
                                    }
                                }
                            }
                        }
                    }
                    .area_left{
                        .slot_head{
                            border-right:1px solid #fff;
                        }
                        .area_left_server{
                            border-right:1px solid #d0d7e5;
                        }
                    }

                    .area_right{
                        .area_right_server{
                            .el-tree{
                                overflow:auto;
                            }
                        }
                    }
                    
                }
            }
            .el-dialog__footer{
                padding:10px 20px;
            }
        }
</style>
