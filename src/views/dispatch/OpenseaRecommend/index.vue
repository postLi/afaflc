<template>
    <div class="OpenseaRecommend identicalStyle clearfix" v-loading="loading">
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain icon="el-icon-circle-plus" :size="btnsize" @click="handleClick('new')" v-has:DISPATCH_OPENSEA_RECOMMEND_ADD>新增</el-button>
                    <el-button type="primary" plain icon="el-icon-edit" :size="btnsize" @click="handleClick('revise')" v-has:DISPATCH_OPENSEA_RECOMMEND_UPDATE>修改</el-button>
                    <el-button type="danger" plain icon="el-icon-delete" :size="btnsize" @click="handleClick('delet')" v-has:DISPATCH_OPENSEA_RECOMMEND_DELETE>删除</el-button>
                    <el-button type="primary" plain icon="el-icon-bell" :size="btnsize" @click="handleClick('status')" v-has:DISPATCH_OPENSEA_RECOMMEND_USE>启用/禁用</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        :default-sort = "{prop: 'areaCodeName', order: 'descending'}"
                        height="100%"
                        border
                        @selection-change = "getinfomation"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                         <el-table-column label="序号" width="80px">
                            <template slot-scope="scope">
                                {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            sortable
                          prop="areaCodeName"
                          label="地区">
                        </el-table-column>
                        <el-table-column
                            sortable
                          prop="serivceCodeName"
                          label="服务类型">
                        </el-table-column>
                        <el-table-column
                            sortable
                          prop="shipperCarTypeName"
                          label="货主用车类型">
                        </el-table-column>
                        <el-table-column
                            sortable
                          prop="firstPush"
                          label="推送距离/推送时间">
                        </el-table-column>
                        <!-- <el-table-column
                          prop="secondPush"
                          label="第二轮及之后推送">
                        </el-table-column> -->
                        <el-table-column
                            sortable
                          prop="visualCarTypeName"
                          label="可见车主类型">
                        </el-table-column>
                        <el-table-column
                            sortable
                          prop="usingStatus"
                          label="状态">
                             <template  slot-scope="scope">
                                {{ scope.row.usingStatus === '1' ? '启用' : '禁用' }}
                            </template>
                        </el-table-column>
                      </el-table>
                </div>

                <!-- 新增数据 -->
                <addClassfy :dialogFormVisible.sync = "dialogFormVisible" :formtitle = "formtitle" @renovate="Onrenovate" ></addClassfy>
                <!-- 修改数据 -->
                <changeclassify :dialogFormVisibleChange.sync = "dialogFormVisibleChange" :formtitle = "formtitle_change" @renovate="Onrenovate" :changeforms = 'changeforms'></changeclassify>
            </div>
            <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>
    </div>
</template>

<script type="text/javascript">

import { data_dispatchList,data_ChangeStatus,data_DeletInfo } from '@/api/dispatch/OpenseaRecommend.js'

import '@/styles/dialog.scss'
import addClassfy from './addclassify'
import changeclassify from './changeclassify'
import Pager from '@/components/Pagination/index'

    export default{
        data(){
            return{
                btnsize:'mini',
                loading:true,//遮罩层
                page:1,//页码
                pagesize:20,//每页显示数量
                formtitle:'新增额外服务',
                formtitle_change:'修改分类信息',
                currentPage4: 1,//显示当前页面
                dialogFormVisible: false,//新增弹窗
                dialogFormVisibleChange:false,//修改弹窗
                centerDialogVisible:false,//提示弹窗
                delDialogVisible:false,//删除提示弹窗
                totalCount:0,//当前页面数据总数
                data:{},//获取页面数据 后端要求传参{}
                changeforms:{},
                information:'你想知道什么',
                delID:[],
                checkedinformation:[],
                tableDataTree:[],
            }
        },
        components:{
            Pager,
            addClassfy,
            changeclassify
        },
        
        mounted(){
            this.firstblood()
        },  
        methods: {
            handlePageChange(obj) {
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.firstblood();
            },
            //子组件调用父组件刷新页面  
            Onrenovate(){
                this.firstblood();
                this.dialogFormVisible = false;
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //判断是否选中
            getinfomation(selection){
                this.checkedinformation = selection;
            },
            handleClick(type){
                if(Object.keys(this.checkedinformation).length == 0 && type != 'new'){
                    //未选择任何修改内容的提示
                    return this.$message({
                        type: 'warning',
                        message: '请选择您要操作的内容~'
                    })
                }else if(this.checkedinformation.length >1 && type == 'revise'){
                    return this.$message({
                        type: 'warning',
                        message: '不可同时操作多项内容~'
                    })
                }
                else{
                    switch(type){
                        case 'new':
                            this.dialogFormVisible = true;
                            break;
                        case 'revise':
                            this.dialogFormVisibleChange = true; 
                            this.changeforms = Object.assign({},this.checkedinformation[0]) ;
                            break;
                        case 'delet':
                            let delID = [];
                            this.checkedinformation.map((item)=>{
                                return delID.push(item.id)
                            });
                            let item = delID.length > 1 ? '这些' : '该条';
                            let config = delID.length>1 ?  delID.length + '条' : this.checkedinformation[0].areaCodeName+'这条';

                            this.$confirm('确定要删除'+ config +'设置吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then( ()=>{
                                data_DeletInfo(delID).then(res=>{
                                    this.$message({
                                        type: 'success',
                                        message: '您选中的内容已被删除！',
                                        duration:2000
                                    })
                                    this.firstblood();
                                }).catch(err => {
                                    this.$message({
                                        type: 'warning',
                                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                                    })
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消'
                                })
                            })
                            break;
                        case 'status':
                            let statusID = [];
                            this.checkedinformation.map((item)=>{
                                return statusID.push(item.id)
                            })
                            statusID = statusID.join(',');
                            data_ChangeStatus(statusID).then(res=>{
                                this.firstblood();
                            })
                            break;
                    }
                }
                //清空选中内容以免影响其他操作
                this.$refs.multipleTable.clearSelection();
            },
            //刷新页面和初始化数据
            firstblood(){
                this.loading = true;
                data_dispatchList(this.page,this.pagesize,this.data).then(res=>{
                    // console.log(res)
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                    this.tableDataTree.map(item=>{
                        item.firstPush = item.firstRecommendKm +'公里/'+item.firstRecommendTime+'秒';
                        // item.secondPush = item.secondRecommendKm +'公里/'+item.secondRecommendTime+'秒';
                    })
                    this.loading = false;
                })
            },
        }
    }
</script>

<style type="text/css" lang="scss">
    .OpenseaRecommend{
      
    }
</style>