<template>
    <div class="identicalStyle clearfix Manage_400" v-loading="loading">
            <searchInfo @change="getSearchParam"></searchInfo>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain @click="handleSearch('export')" size="mini">导出Exce</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        border
                        align = "center"
                        height="100%"
                        @selection-change = "getinfomation"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column label="序号" sortable  width="80">
                            <template slot-scope="scope">
                            {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            prop="orderSerial"
                            label="主叫号码"
                            width="150"
                            sortable
                            >
                                <template  slot-scope="scope">
                                    {{ scope.row.workSerial}}
                                </template>
                        </el-table-column>
                        <el-table-column
                            prop="complainTypeName"
                            label="用户类型"
                            width="120"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            prop="orderSerial"
                            label="联系人"
                            width="160"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="complainDes"
                            label="被叫号码"
                            width="160"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            prop="complainTime"
                            label="开始时间"
                            width="160"
                            sortable
                            >
                        </el-table-column>
                         <el-table-column
                            prop="complainName"
                            label="结束时间"
                            width="160"
                            sortable
                            >
                        </el-table-column> 
                        <el-table-column
                            prop="complainStatusName"
                            label="类型"
                            width="120"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            label="客户号码归属地"
                            width="200"
                            sortable
                            >
                            <template  slot-scope="scope">
                               {{scope.row.platformTime ? scope.row.platformTime : '无'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="满意度"
                            width="120"
                            sortable
                            >
                            <template  slot-scope="scope">
                               {{scope.row.replyName ? scope.row.replyName : '无'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="通话时长"
                            width="120"
                            sortable
                            >
                            <template  slot-scope="scope">
                                {{scope.row.reply ? scope.row.reply : '无'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            label="跟进内容"
                            width="160"
                            sortable
                            >
                            <template  slot-scope="scope">
                                {{scope.row.reply ? scope.row.reply : '无'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="120"
                            sortable
                            >
                            <template  slot-scope="scope">
                                <!-- <el-button-group> -->
                                    <el-button type="primary" plain icon="el-icon-document" :size="btnsize" @click="handleClick(scope.row,'reply')">回复</el-button>
                                    <el-button type="primary" plain icon="el-icon-delete" :size="btnsize" @click="handleClick(scope.row,'delet')">删除</el-button>
                                <!-- </el-button-group> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
                <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"/></div> </div>    
    </div>
</template>

<script type="text/javascript">

import { getListCouseComplain } from '@/api/service/index.js'
import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import searchInfo from './searchInfo'

    export default{
        components:{
            Pager,
            searchInfo,
        },
        data(){
            return{
                serviceType:'couse',
                loading: false,//加载
                pagesize:20,//初始化加载数量
                page:1,//初始化页码
                dataTotal:0,
                searchInfo:{
                    complainType:'',//类型
                    workSerial:'',//工单号                    
                },
                tableData:[],
                dialogFormVisible_details:false,//详情弹窗
                DetailsOrderSerial:'',
                dialogVisible:false,//取消订单弹框
                checkedinformation:[],//选中数据
            }
        },
        watch:{

        },
        created(){

        },
        mounted(){
            // this.firstblood();
        },  
        beforeDestroy(){
            // clearInterval(this.timeOut);
        },
        methods: {
            handlePageChange(obj) {
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.firstblood();
            },
            //刷新页面  
            firstblood(){
                this.loading = true;
                getListCouseComplain(this.page,this.pagesize,this.searchInfo).then(res => {
                    console.log('是否刷新',res.data)
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.loading = false;
                })
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                // console.log(this.chooseTime)
                switch(type){
                    case 'cancel':

                        break;
                    case 'export':
                        
                }
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
                this.dialogFormVisible_details = true;
                this.DetailsOrderSerial = item.orderSerial;
            },
            getSearchParam(obj) {
                console.log(obj)
                this.searchInfo = Object.assign(this.searchInfo, obj)
                this.loading = true ;
                this.firstblood();
            },
            shuaxin(){
                this.firstblood();
            },
            handleClick(){

            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .Manage_400{
        height: 100%;
        // .info_news{
        //     .el-table .cell {
        //         white-space: inherit;
        //         overflow: hidden;
        //         text-overflow: ellipsis;
        //     }
        //     .reMark{
        //         padding: 5px 15px;
        //         border-radius: 20%  / 50%;
        //         background: #eca438;
        //         color: #fff;
        //     }
        //     .sussces{
        //         padding: 5px 15px;
        //         border-radius: 20%  / 50%;
        //         background: skyblue;
        //         color: #fff;
        //     }
        // }
    }
</style>
