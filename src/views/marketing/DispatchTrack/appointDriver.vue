<template>
    <div>
        <!-- 指派司机 -->
            <div class="appoint commoncss">
                <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisible" @close="close" :show-close = "false">
                    <i class="xx el-icon-close" @click="close"></i>
                    <div class="pointSearch">
                        <span>车主信息</span>
                        <el-input
                        placeholder="车主姓名/手机账号/车牌号码"
                        v-model="inputSearch"
                        clearable>
                        </el-input>
                        <el-button type="primary"  plain  @click="pointSearch">查询</el-button>
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
                    <detailsComponent v-if="Object.keys(listInformation).length != 0" :listInformation = "listInformation"></detailsComponent>
                </el-dialog>
            </div>

            <cue ref="cue"></cue>
    </div>
</template>

<script>

import { data_findAflcDriverList,data_findAflcShipperList,data_NewData } from '@/api/dispatch/Directional.js'
import cue from "@/components/Message/cue";
import detailsComponent from './details';

export default {
    name: 'appointDriver',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true
        },
        listInformation:{
            type:Object,
            required:true
        }
    },
   
    components:{
        cue,
        detailsComponent
    },
    data() {
      return {
        activeNames: ['1','2','3'],
        tableData_point:[],//车主列表
        inputSearch:null,//车主信息搜索
        forms:{
            bindingStartDate:null,//绑定开始时间
            bindingEndDate:null,//绑定结束时间
            driverId:null,//车主
            driverName:null,//
            driverPhone:null,//
            shipperId:null,//货主
            shipperName:null,//
            shipperPhone:null,//
            
        },
        searchInfo:'暂无此内容查看',
        optionsShipper:[],//选择货主
        optionsCar:[],//选择车主
        optionsVisualCarType:[],
        checkListShpper:[],//货主选中内容
        checkListCar:[],//车主选中内容
        filterOptionsShipper:{
            search:''
        },//筛选货主
        information:null,
        filterOptionsCar:{
            search:''
        },//筛选车主
        data:{ search: ''},
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
     // computed: {
    // 　　newValue() {
    // 　　　　return this.b.c
    // 　　}
    // },
    watch:{
        filterOptionsShipper:{
            handler(val, oldVal){
                this.getAflcShipperList();
            },
            deep:true
        },
        filterOptionsCar:{
            handler(val, oldVal){
                this.getAflcDriverList();
            },
            deep:true
        },
        
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
             this.getAflcDriverList();
             this.getAflcShipperList();
        },
        getAflcDriverList(){
            data_findAflcDriverList(this.filterOptionsCar).then(res=>{
                this.optionsCar = res.data;
                if(res.data.length == 0){
                    this.$refs.cue.hint(this.searchInfo)
                    this.filterOptionsCar.search = '';
                    this.$refs.filterOptionsCar.focus();
                }else{
                    this.optionsCar.map(el=>{
                        el.label =  el.driverName +'/'+el.driverMobile;
                    })
                }

            })
        },
        getAflcShipperList(){
            data_findAflcShipperList(this.filterOptionsShipper).then(res=>{
                this.optionsShipper = res.data;
                if(res.data.length == 0){
                    this.$refs.cue.hint(this.searchInfo)
                    this.filterOptionsShipper.search = '';
                    this.$refs.filterOptionsShipper.focus();
                   
                }else{
                    this.optionsShipper.map(el=>{
                        el.label =  el.contacts +'/'+el.mobile;
                    })
                }

            })
        },
        newInfoSave(){

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
               padding:8px 20px;
            }
            .pointSearch{
                border-bottom: 2px dashed #c8c8c8;
                padding-left: 10px;
                padding-bottom: 15px;
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
                    height: 24px;
                    margin-left: 5px;
                }
                .el-button{
                    padding:4px 20px;
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

