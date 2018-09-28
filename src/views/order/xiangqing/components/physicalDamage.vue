<template>
    <div class="trail clearfix" v-loading = "loading">
        <div class="trailData fl">
            <el-table
                :data="listInformation"
                border
                style="width: 100%">
                <el-table-column label="序号"  width="80">
                    <template slot-scope="scope">
                        {{ (page - 1)*pagesize + scope.$index + 1 }}
                    </template>
                </el-table-column>  
                <el-table-column
                    prop="address"
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
            <DriverTrack></DriverTrack>
        </div>
    </div>
</template>

<script>

import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index.js'
import { getOrderCarTrailList } from '@/api/order/ordermange'
import DriverTrack from '@/components/baiduTrack/index'
export default {
    name: 'physicalDamage',
    components:{
        Pager,
        DriverTrack
    },
    props: {
       isvisible: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            page:1,
            pagesize:20,
            loading:true,
            totalCount:0,
            page:1,
            pagesize:20,
            sizes:[20,30,50],
            listInformation:[],
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
            this.loading = true;
            let trailform = Object.assign({},{orderSerial:this.$route.query.orderSerial});
            getOrderCarTrailList(this.page,this.pagesize,trailform).then(res => {
                console.log('details',res)
                this.listInformation = res.data.list;
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
        height: 100%;
        .trailData{
            width: 35%;
            height: 100%;
        }
        .tarilMap{
            width: 63%;
            height: 100%;
        }
    }
    
</style>
