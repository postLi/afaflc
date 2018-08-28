<template>
    <div>
        <!-- 指派司机 -->
            <div class="appoint commoncss">
                <el-dialog title='指派司机' :close-on-click-modal="false"  :visible="dialogFormVisible" @close="close">
                    <div class="pointSearch">
                         <el-form :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                            <el-form-item label="车主" prop="pointName">
                                <el-input v-model="searchInfo.orderSerial" clearable placeholder="车主姓名/手机账号/车牌号码">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="车型" prop="orderSerial">
                                
                            </el-form-item>
                            <el-form-item>
                               
                            </el-form-item>
                            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                                <el-button type="primary" plain @click="pointSearch('search')">搜索</el-button>
                                <el-button type="info" plain @click="pointSearch('clear')">清空</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
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

import { data_findAflcDriverList,data_findAflcShipperList,data_NewData } from '@/api/dispatch/Directional.js'
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
        activeNames: ['1','2','3'],
        searchInfo:{
            orderSerial:'',
        },
        tableData_point:[],//车主列表
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      };
    },
     computed: {
    　　newValue() {
    　　　　return this.b.c
    　　}
    },
    watch:{
       
        
    },
    mounted(){
        // this.init();
    },
    methods: {
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
        ifWrong(val){
            console.log(val)
        },
        close(){
            this.$emit('update:dialogFormVisible',false)
        },
        //初始化选择项数据
        init(){
           
        },
        closeAddNewInfo(){
            this.close();  
            
        },
        
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
                padding: 20px 10px 0 ;
                
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

    }
</style>

