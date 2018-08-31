<template>
    <div class="trail clearfix">
        <div class="trailData fl">
            <el-table
                :data="listInformation"
                border
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="序号"
                    width="80"
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="定位地址"
                    >
                </el-table-column>
                <el-table-column
                    prop="coordinateTime"
                    label="定位时间"
                    width="200"
                    >
                    <template slot-scope="scope">
                            {{scope.row.coordinateTime |parseTime}}
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>     -->
        </div>
        <div class="tarilMap fr">

        </div>
    </div>
</template>

<script>

import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index.js'
import { orderDetailsList } from '@/api/order/ordermange'

export default {
    name: 'trail',
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
            listInformation:[],
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
    watch:{
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal){
                    this.init();
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted(){
    },
    methods: {
        init(){
            orderDetailsList(this.$route.query.orderSerial).then(res => {
                console.log('details',res)
                this.listInformation = res.data.aflcOrderCarTrails;
                this.loading = false;
            })
            // this.totalCount = this.driverTrailData.length;
            // let pageStart =  (this.page - 1) * this.pagesize;
            // let pageEnd = this.page * this.pagesize;
            // this.tableData = this.driverTrailData.slice(pageStart,pageEnd)
        },
        handlePageChange(obj) {
            this.page = obj.pageNum;
            this.pagesize = obj.pageSize;
            this.init();
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .trail{
        .trailData,.tarilMap{
            width: 50%;
        }
    }
    
</style>
