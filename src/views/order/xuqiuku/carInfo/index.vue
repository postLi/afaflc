<template>
    <div class="identicalStyle clearfix">
            <div class="classify_searchinfo">
                <label>标题&nbsp;
                   <el-input v-model="searchInfo.title" placeholder="请输入内容"></el-input>
                </label>
                <label>发布时间&nbsp;
                    <el-date-picker
                        v-model="chooseTime"
                        type="datetimerange"
                        :picker-options="pickerOptions2"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        :default-time="['00:00:00', '23:59:59']"
                        value-format="timestamp">
                    </el-date-picker>
                </label>    
                <label>发布者&nbsp;
                   <el-input v-model="searchInfo.belongDriver" placeholder="请输入内容"></el-input>
                </label>    
                <el-button type="primary"  plain @click="getdata_search">查询</el-button>
            </div>
            <div class="classify_info">
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableExecute"
                        stripe
                        border
                        highlight-current-row
                        @current-change="handleCurrentTask"
                        align = "center"
                        height="100%"
                        tooltip-effect="dark"
                        style="width: 100%"> 
                        <el-table-column
                            align = "center"
                            fixed
                            label="排序"
                            prop="order"
                            width="55">
                           </el-table-column>
                        <el-table-column
                            align = "center"
                            prop="title"
                            label="标题">
                        </el-table-column>
                        <el-table-column
                            align = "center"
                            prop="time"
                            label="发布时间">
                        </el-table-column>
                        <el-table-column
                            align = "center"
                            prop="belongDriver"
                            label="发布者">
                        </el-table-column>
                        <el-table-column
                            align = "center"
                            prop="browseNumber"
                            label="浏览量">
                        </el-table-column>
                         <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                      <!-- 页码 -->
                    <div class="Pagination ">
                        <div class="block">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="dataTotal">
                            </el-pagination>
                        </div>
                    </div>
                    <!-- <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" /></div> </div>     -->

                </div>
                
            </div>
        <!-- loading   -->
        <!-- <spinner v-show="show"></spinner>  -->
        
    </div>
</template>

<script type="text/javascript">

import '@/styles/dialog.scss'
import { data_CarInfoList,data_DelCarInfo } from '@/api/users/logistics/TransportRange.js'
import { parseTime,formatTime } from '@/utils/index.js'
// import spinner from '../../../spinner/spinner'

    export default{
        data(){
            return{
                formtitle:'新增执行器',//新增任务
                dialogFormVisible:false,
                tableExecute:[],
                currentPage4:1,
                pagesize:20,
                page:1,
                dataTotal:null,
                searchInfo:{
                    title:null,
                    belongDriver:null,

                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                chooseTime:null,

            }
        },
        components:{
            // spinner,

        },
        mounted(){
            this.firstblood();
            
            // console.log(this.$store)
        },  
        methods: {
            // 获取翻页返回的数据
            handlePageChange (obj) {
                console.log(obj)
                // Object.assign(this.searchForm, obj)
                // this.fetchData()
            },
            //单选中当前数据
            handleCurrentTask(val){
                // console.log(val)
                this.tasktest = val;
            },
            
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagesize = val ;
                this.firstblood();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page = val;
                this.firstblood();
            },
          
            //刷新页面  
            firstblood(){
                data_CarInfoList(this.page,this.pagesize,this.searchInfo).then(res => {
                    console.log(res)
                    this.tableExecute = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.tableExecute.forEach(el => {
                        // el.title =  el.strartAddressName +'->'+ el.endAddressName;
                        el.time = parseTime(el.createTime);
                    })
                })
            },
           
            //模糊查询 分类名称或者code
            getdata_search(){
                // console.log(this.chooseTime)
                if(this.chooseTime){
                    this.searchInfo.beginTime  = this.chooseTime[0];
                    this.searchInfo.endTime = this.chooseTime[1];
                }
                this.firstblood();
            },
            //删除
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('确定要删除'+ row.title +' 该条线路吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    data_DelCarInfo(row.id).then(res=>{
                        console.log(res)
                        this.$alert('操作成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                               this.firstblood();
                            }
                        });
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + err.text ? err.text : err
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            }
           

        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .identicalStyle{
       
    }
</style>