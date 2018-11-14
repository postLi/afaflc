<template>
    <div class="trail clearfix" v-loading = "loading">
        <div class="trailData fl">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column label="序号"  width="80">
                    <template slot-scope="scope">
                        {{ (Page - 1)*Pagesize + scope.$index + 1 }}
                    </template>
                </el-table-column>  
                <el-table-column
                    :show-overflow-tooltip="true"
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
            <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>    
        </div>
        <div class="tarilMap fr">
            <DriverTrack :trackInfo="trackInfo"></DriverTrack>
        </div>
    </div>
</template>

<script>

import Pager from '@/components/Pagination/index'
import { parseTime,objectMerge2 } from '@/utils/index.js'
import { getOrderCarTrailList } from '@/api/order/ordermange'
import DriverTrack from '@/components/gaodeTrack/index'
export default {
    name: 'trail',
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
            pagesize:10000,
            Page:1,
            Pagesize:22,
            loading:true,
            totalCount:0,
            sizes:[22,30,50],
            listInformation:[],
            tableData:[],
            trackInfo:[],
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
                let trackInfo = objectMerge2(res.data.list);
                this.listInformation = res.data.list;
                this.trackInfo = trackInfo.reverse();
                this.loading = false;
                this.nowTable();
                console.log(this.trackInfo)
            })
        },
        nowTable(){
            this.listInformation = this.listInformation;
            this.totalCount = this.listInformation.length;
            let pageStart =  (this.Page - 1) * this.Pagesize;
            let pageEnd = this.Page * this.Pagesize;
            this.tableData = this.listInformation.slice(pageStart,pageEnd);
        },
        handlePageChange(obj) {
            this.Page = obj.pageNum;
            this.Pagesize = obj.pageSize;
            this.nowTable();
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
            display: flex;
            flex-direction:column;
            padding-bottom: 40px;
            position: relative;
            .el-table{
                flex: 1;
            }

        }
        .tarilMap{
            width: 64%;
            height: 100%;
        }
    }
    
</style>
