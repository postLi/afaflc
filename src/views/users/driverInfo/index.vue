<template>
    <div class="identicalStyle clearfix">
            <div class="classify_searchinfo">
                <label>标题&nbsp;
                   <el-input v-model="searchInfo.name" placeholder="请输入内容"></el-input>
                </label>
                <label>发布时间&nbsp;
                   <el-input v-model="searchInfo.name" placeholder="请输入内容"></el-input>
                </label>    
                <label>发布者&nbsp;
                   <el-input v-model="searchInfo.name" placeholder="请输入内容"></el-input>
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
                            prop="startLocation"
                          label="标题">
                        </el-table-column>
                             <!-- <template  slot-scope="scope">
                                <p>{{ scope.row.startLocation}} -> {{scope.row.endLocation}}</p>
                            </template> -->
                        <el-table-column
                        align = "center"
                          prop="createTime"
                          label="发布时间">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="logisticsCompanyName"
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
import { data_TransportRangeList } from '../../../api/users/logistics/TransportRange.js'
// import spinner from '../../../spinner/spinner'

    export default{
        data(){
            return{
                formtitle:'新增执行器',//新增任务
                dialogFormVisible:false,
                tableExecute:[],
                currentPage4:1,
                pagesize:1,
                dataTotal:null,
                searchInfo:{
                    title:null,
                    createTime:null,
                    logisticsCompanyName:null,
                }

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
                console.log(val)
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
                data_TransportRangeList(this.page,this.pagesize,this.searchInfo).then(res => {
                    console.log(res)
                    this.tableExecute = res.data.list;
                    this.dataTotal = res.data.totalCount;
                })
            },
           
            //模糊查询 分类名称或者code
            getdata_search(){
                this.firstblood();
            },
            //删除
            handleDelete(index, row) {
                console.log(index, row);
            }
           

        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .identicalStyle{
       
    }
</style>