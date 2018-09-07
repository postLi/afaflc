<template>
    <div class="identicalStyle clearfix waitpayment" v-loading="loading">
            <el-form :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                    <el-form-item label="区域" prop="pointName">
                        <vregion :ui="true" @values="regionChange" class="form-control">
                            <el-input v-model="searchInfo.belongCityName" placeholder="请选择出发地" clearable></el-input>
                        </vregion>
                    </el-form-item>
                    <el-form-item label="标题" prop="orderSerial">
                        <el-input v-model="searchInfo.orderSerial" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="btnChoose fr"  style="margin-left:0;">
                        <el-button type="primary" plain @click="handleSearch('search')">搜索</el-button>
                        <el-button type="info" plain @click="handleSearch('clear')">清空</el-button>
                    </el-form-item>
            </el-form>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain @click="handleSearch('outExce')" size="mini">导出Exce</el-button>
                </div>
                <div class="info_news" style="height:89%;">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        :key="tablekey"
                        border
                        @row-click="clickDetails"
                        @selection-change="getSelection"
                        height="100%"
                        tooltip-effect="dark"
                        :default-sort = "{prop: 'id', order: 'ascending'}"
                        style="width: 100%">
                        <el-table-column
                            fixed
                            sortable
                            type="selection"
                            width="50">
                        </el-table-column>
                        <template v-for="column in tableColumn">
                            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column>
                            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width || ''">
                            <template slot-scope="scope">
                                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                                <span v-else v-html="column.slot(scope)"></span>
                            </template>
                            </el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
                    <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>    
    </div>
</template>

<script type="text/javascript">

import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import '@/styles/dialog.scss'
import { orderStatusList } from '@/api/order/ordermange'
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
// import Details from '../components/detailsInformations'
import vregion from '@/components/vregion/Region'


    export default{
        components:{
            Pager,
            // Details,
            vregion
        },
        data(){
            return{
                tablekey: '',
                timeOutWaitPay:null,
                loading: false,//加载
                sizes:[20,50,100],
                pagesize:20,//初始化加载数量
                page:1,//初始化页码
                dataTotal:0,
                searchInfo:{
                    belongCity:'',//区域
                    belongCityName:'',//区域
                    shipperName:'',//货主
                    startOrderDate:'',//下单起始时间
                    endOrderDate:'',//下单结束时间
                    orderSerial:'',//订单号
                    parentOrderStatus:'AF00801',//订单状态
                },
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                chooseTime:'',
                tableData:[],
                dialogFormVisible_details:false,//详情弹窗
                DetailsOrderSerial:'',
                tableColumn: [{
                    label: '序号',
                    prop: 'id',
                    width: '80',
                    fixed: true,
                    slot: (scope) => {
                    return ((this.page - 1) * this.pagesize) + scope.$index + 1
                    }
                }, {
                    label: '区域',
                    prop: 'carrierName',
                    width: '120',
                    fixed: false
                }, {
                    label: '标题',
                    prop: 'orgName',
                    width: '400',
                    fixed: false
                }, {
                    label: '有效期',
                    prop: 'carrierSn',
                    width: '250',
                    fixed: false
                }, {
                    label: '操作人',
                    prop: 'liableName',
                    width: '150',
                    fixed: false
                }, {
                    label: '操作时间',
                    prop: 'liablePhone',
                    width: '250',
                    fixed: false,
                    slot: (scope) => {
                        return parseTime(scope.row.contractStarttime, '{y}-{m}-{d} {h}:{i}:{s}')
                    }
                }, {
                    label: '操作',
                    prop: 'carrierRemarks',
                    fixed: false,
                    slot: (scope) => {
                        return parseTime(scope.row.contractStarttime, '{y}-{m}-{d} {h}:{i}:{s}')
                    }
                }]
            }
        },
        watch:{

        },
        created(){

        },
        mounted(){
            // this.firstblood();

            console.log('```````````',process.env.NODE_ENV)
        },  
        beforeDestroy(){
            clearInterval(this.timeOutWaitPay);
        },
        methods: {
            exportExcel () {
                /* generate workbook object from table */
                var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                console.log(wb)
                console.log(wbout)
                // try {
                //     FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
                // } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                // return wbout
            },
            regionChange(d) {
                console.log('data:',d)
                this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                if(d.city){
                    this.searchInfo.belongCity = d.city.code;
                }else{
                    this.searchInfo.belongCity = d.province.code;
                }
            },
             getValue(obj){
                return obj ? obj.value:'';
            },
            handlePageChange(obj) {
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.firstblood();
            },
            //刷新页面  
            firstblood(){
                this.loading = true;

                orderStatusList(this.page,this.pagesize,this.searchInfo).then(res => {
                    console.log('待付款',res)
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;

                    this.tableData.forEach(item => {
                        item.aflcOrderAddresses.sort(function(a,b){  
                            return a.viaOrder - b.viaOrder;  
                        })  

                        // item.useCar = parseTime(item.useCarTime)
                    })
                    this.loading = false;
                })

            },
           
            //模糊查询 分类名称或者code
            handleSearch(type){
                // console.log(this.chooseTime)
                switch(type){
                    case 'search':
                        if(this.chooseTime){
                            this.searchInfo.startOrderDate = this.chooseTime[0];
                            this.searchInfo.endOrderDate = this.chooseTime[1];
                       
                        }else{
                            this.searchInfo.startOrderDate ='' ;
                            this.searchInfo.endOrderDate = '';
                        }

                        this.firstblood();
                        break;
                    case 'clear':
                        this.searchInfo = {
                            belongCity:'',//区域
                            shipperName:'',//货主
                            startOrderDate:'',//下单起始时间
                            endOrderDate:'',//下单结束时间
                            orderSerial:'',//订单号
                            parentOrderStatus:'AF00801',//订单状态待支付
                        };
                        this.chooseTime = '';
                        this.firstblood();
                    case 'outExce':
                        this.exportExcel();
                        break;
                }
                // 清除选中状态，避免影响下个操作
                this.$refs.multipleTable.clearSelection()
            },
                 //判断是否选中
            getinfomation(selection){
                this.checkedinformation = selection;
            },
             //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //详情弹窗
            pushOrderSerial(item){
                // console.log(item)
                // this.dialogFormVisible_details = true;
                // this.DetailsOrderSerial = item.orderSerial;
                this.$router.push({name: '订单详情',query:{ orderSerial:item.orderSerial }});
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .waitpayment{
       
    }
</style>