<template>
    <div class="physicalDamage clearfix">
        <el-table
            :data="tableData"
            border
            row-key="id"
            :expand-row-keys="expands"
            @row-click="rowClick"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table
                        :data="props.row.tableData1"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="跟进人"
                            width="180">
                            <template slot-scope="scope">
                                    {{scope.row.data}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="跟进时间"
                            width="180">
                             <template slot-scope="scope">
                                    {{scope.row.name}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="物损跟进">
                             <template slot-scope="scope">
                                    {{scope.row.address}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="是否处理完毕">
                             <template slot-scope="scope">
                                    {{scope.row.address}}
                            </template>
                        </el-table-column>
                         <el-table-column
                            prop="address"
                            label="附件">
                             <template slot-scope="scope">
                                    {{scope.row.address}}
                            </template>
                        </el-table-column>
                         <el-table-column
                            prop="address"
                            label="操作">
                             <template slot-scope="scope">
                                    {{scope.row.address}}
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
                type="index"
                label="序号"
                width="80"
                >
            </el-table-column>
             <el-table-column
                prop="date"
                label="处理状态"
                width="150"
                >
                <template slot-scope="scope">
                    {{scope.row.createTime | parseTime}}
                </template>
            </el-table-column>
            <el-table-column
                label="投诉分类"
                width="180"
                >
                <template slot-scope="scope">
                    {{scope.row.driverName}} - {{scope.row.driverPhone}}
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="address"
                label="投诉内容"
                >
                <template slot-scope="scope">
                    {{scope.row.driverName}} - {{scope.row.driverPhone}}
                </template>
            </el-table-column>
            <el-table-column
                prop="driverDistance"
                label="投诉人"
                width="200"
                >
            </el-table-column>
             <el-table-column
                prop="address"
                label="投诉人类型"
                width="120">
            </el-table-column>
            <el-table-column
                prop="address"
                label="投诉时间"
                width="160">
            </el-table-column>
            <el-table-column
                label="操作"
                width="150">
                 <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">记录投诉跟进</el-button>
                   
                </template>
            </el-table-column>
        </el-table>
        <!-- <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>     -->
    </div>
</template>

<script>

import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index.js'
import { orderDetailsList } from '@/api/order/ordermange'

export default {
    name: 'pushOrderList',
    components:{
        Pager,
    },
    props: {
       isvisible: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            totalCount:0,
            page:1,
            pagesize:20,
            sizes:[20,30,50],
            tableData: null,
            expands:[],
            tableData: [{
                id:'1',
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            tableData1: [{
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
          }, {
                id:'2',
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            tableData1: [{
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
          }, {
                id:'3',
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            tableData1: [{
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
          }, {
                id:'4',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            tableData1: [{
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
          }]
        };
    },
    watch:{
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal){
                    // this.init();
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted(){
        console.log(this.tableData)
    },
    methods: {
        init(){
            orderDetailsList(this.$route.query.orderSerial).then(res => {
                console.log('details',res)
                this.tableData = res.data.aflcOrderPushes;
                this.expands.push(this.tableData[0].id);

                this.loading = false;
            })
            // this.totalCount = this.pushOrderData.length;
            // let pageStart =  (this.page - 1) * this.pagesize;
            // let pageEnd = this.page * this.pagesize;
            // this.tableData = this.pushOrderData.slice(pageStart,pageEnd)
        },
        handlePageChange(obj) {
            this.page = obj.pageNum;
            this.pagesize = obj.pageSize;
            this.init();
        },
        handleEdit(){

        },
        rowClick(row, event, column) {
            Array.prototype.remove = function (val) {
                let index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };

            if (this.expands.indexOf(row.id) < 0) {
                this.expands.push(row.id);
            } else {
                this.expands.remove(row.id);
            }

        }
        
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .physicalDamage{
        .el-table{
            .el-table__expanded-cell{
                .el-table__header-wrapper{
                    th{
                        background-color: #fff;
                    }
                }
            }
        }
    }
    
</style>
