<template>
    <div>
        <!-- 指派司机 -->
            <div class="appoint commoncss">
                <el-dialog title='指派司机' :close-on-click-modal="false"  :visible="dialogFormVisible" @close="close">
                    <el-form :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                        <el-form-item label="车主" prop="pointName">
                            <el-input v-model="searchInfo.orderSerial" clearable placeholder="车主姓名/手机账号/车牌号码">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="车型" prop="orderSerial">
                            <el-select v-model="searchInfo.orderSerial" clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionsCarType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox v-model="iftequan" @change = "ifTequan">特权车</el-checkbox>
                            {{searchInfo.if}}
                        </el-form-item>
                        <el-form-item class="btnChoose fr"  style="margin-left:0;">
                            <el-button type="primary" plain @click="pointSearch('search')">搜索</el-button>
                            <el-button type="info" plain @click="pointSearch('clear')">清空</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="pointInfo">
                        <div class="pointChoose">
                            <el-button type="primary" class="el-icon-edit" plain  @click="pointXX">指派给选中车主</el-button>
                            <el-table
                            ref="multipleTable"
                            :data="tableData_point"
                            stripe
                            border
                            align = "center"
                            @selection-change = "getinfomation"
                            tooltip-effect="dark"
                            @row-click="clickDetails"
                            style="width: 100%"> 
                                <el-table-column
                                    align = "center"
                                    fixed
                                    type="selection"
                                    width="55">
                                </el-table-column>
                                <el-table-column
                                    align = "center"
                                    fixed
                                    prop="shipperInfo"
                                    label="车主姓名">
                                </el-table-column>
                                <el-table-column
                                align = "center"
                                prop="carInfo"
                                label="车主账号">
                                </el-table-column>
                                <el-table-column
                                align = "center"
                                prop="startTime"
                                label="车牌号码">
                                </el-table-column>
                                <el-table-column
                                align = "center"
                                prop="endTime"
                                label="距离(KM)">
                                </el-table-column>
                                <el-table-column
                                align = "center"
                                prop="endTime"
                                label="本日与该货主交易次数">
                                </el-table-column>
                                <el-table-column
                                align = "center"
                                prop="endTime"
                                label="本月与该货主交易次数">
                                </el-table-column>
                                <el-table-column
                                align = "center"
                                prop="bindingSource"
                                label="本月累计交易次数">
                                </el-table-column>
                                <el-table-column
                                    align = "center"
                                prop="usingStatus"
                                label="本月交易成功订单量">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <!-- <detailsComponent v-if="Object.keys(listInformation).length != 0" :listInformation = "listInformation"></detailsComponent> -->
                </el-dialog>
            </div>

    </div>
</template>

<script>

import { getDictionary } from '@/api/common.js'
import { appointDriverList,nearDriverList } from '@/api/order/ordermange.js'
// import detailsComponent from './details';

export default {
    name: 'appointDriver',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
    },
   
    components:{
      
    },
    data() {
        return {
            carType:'AF018',//车型
            iftequan:false,
            searchInfo:{
                orderSerial:'',
                if:''
            },
            optionsCarType:[
              
            ],
            tableData_point:[],//车主列表
        };
    },
     computed: {
    　　newValue() {
    　　　　return this.b.c
    　　}
    },
    watch:{
        dialogFormVisible(newValue,oldValue){
            if(newValue){
                this.init()
            }
        }
        
    },
    mounted(){
    },
    methods: {
        //初始化选择项数据
        init(){
            getDictionary(this.carType).then(res => {
                console.log('```````',res)
                this.optionsCarType = res.data;
            });

        },
        handleChange(val) {
            console.log(val);
        },
        //判断是否选中
        getinfomation(selection){

        },
         //点击选中当前行
        clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row);
        },
        pointSearch(){

        },
        pointXX(){

        },
        close(){
            this.$emit('update:dialogFormVisible',false)
        },
        ifTequan(value){
            this.searchInfo.if = value == true ? '1' : '0';
        }
        
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .appoint{
        .el-dialog__body{
            position: relative;
            .el-button{
               padding:12px 20px;
            }
            .pointSearch{
                padding-left: 10px;
                >span{
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 20px;
                    letter-spacing: 0px;
                    color: #333333;
                }
                .el-input{
                    width: 213px;
                    margin-left: 5px;
                }
                .el-button{
                    margin-left: 5px;
                }
            }
            .pointInfo{
                padding: 40px 10px 0 ;
                .pointChoose{
                    .el-button{
                        span{
                            margin-left: 5px;
                        }
                    }
                    .el-table{
                        margin-top: 10px;
                    }
                }
            }
           
        }

    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .appoint{
         .el-dialog{
            width: 1380px;
            .el-dialog__body{
                padding:20px 2px;
                border-bottom:0 none;
                position: relative;
                .el-form-item__content{
                    width:200px;
                    .el-select{
                        width: 100%;
                    }
                }
                .el-form-item__content:last-child{
                 }
                .pointInfo{
                    .pointChoose{
                        margin-bottom:14px;
                        .el-button{
                            span{
                                margin-left: 5px;
                            }
                        }
                        .el-table{
                            th,td{
                                padding: 2px 0;
                            }
                            th{
                                color:#333;
                            }
                        }
                    }
                }
               
            }
        }

        .el-dialog .el-dialog__body .el-form .el-form-item .el-form-item__content .el-input .el-input__inner{
            height: 30px;
            line-height:30px;
        }

    }
</style>

