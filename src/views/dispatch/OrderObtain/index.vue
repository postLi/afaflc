<template>
    <div class="OpenseaRecommend identicalStyle clearfix" v-loading="loading">
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain icon="el-icon-circle-plus" :size="btnsize" @click="addClassfy">新增</el-button>
                    <el-button type="primary" plain icon="el-icon-edit" :size="btnsize" @click="handleEdit">修改</el-button>
                    <el-button type="primary" plain icon="el-icon-delete" :size="btnsize" @click="handleDelete">删除</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        height="100%"
                        border
                        @selection-change = "getinfomation"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                            fixed
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                          prop="areaCodeName"
                          label="地区">
                        </el-table-column>
                        <el-table-column
                          prop="serivceCodeName"
                          label="服务类型">
                        </el-table-column>
                        <el-table-column
                          prop="carTypeName"
                          label="用车类型">
                        </el-table-column>
                        <el-table-column
                          prop="obtainTimeM"
                          label="公布中单时间">
                        </el-table-column>
                        <el-table-column
                          prop="obtainKmM"
                          label="公布中单距离">
                        </el-table-column>
                        <!-- <el-table-column
                          prop="usingStatus"
                          label="状态">
                             <template  slot-scope="scope">
                                {{ scope.row.usingStatus === '1' ? '启用' : '禁用' }}
                            </template>
                        </el-table-column> -->
                      </el-table>
                </div>
                <!-- 新增数据 -->
                <addClassfy :dialogFormVisible.sync = "dialogFormVisible" :formtitle = "formtitle" @renovate="Onrenovate" ></addClassfy>
                <!-- 修改数据 -->
                <changeclassify :dialogFormVisibleChange.sync = "dialogFormVisibleChange" :formtitle = "formtitle_change" @renovate="Onrenovate" :changeforms = 'changeforms'></changeclassify>

                <!-- 删除信息提示 -->
                <div class="delData">
                    <el-dialog
                    title="提示"
                    :visible.sync="delDialogVisible">
                    <span class="delwarn"></span>
                    <span class="delinfo">确认删除信息吗 ?</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button :size="btnsize" type="primary" @click="delDataInformation">确 定</el-button>
                        <el-button :size="btnsize" @click="delDialogVisible = false" type="info" plain>取 消</el-button>
                    </span>
                    </el-dialog>
                </div>
            </div>
            <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>
        <cue ref="cueInfo"></cue>
    </div>
</template>
<script type="text/javascript">

import { data_dispatchList,data_DeletInfo } from '@/api/dispatch/OrderObtain.js'

import '@/styles/dialog.scss'
import addClassfy from './addclassify'
import changeclassify from './changeclassify'
import cue from '../../../components/Message/cue'
import Pager from '@/components/Pagination/index'

    export default{
        data(){
            return{
                btnsize:'mini',
                loading:true,
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
            changeclassify,
            cue
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
             regionChange(data){
                console.log(data);
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
            //修改
            handleEdit() {
                if(Object.keys(this.checkedinformation).length == 0){
                    //未选择任何修改内容的提示
                    let information = "未选中任何修改内容";
                    this.$refs.cueInfo.hint(information)
                }else if(this.checkedinformation.length >1){
                    let information = "不可修改多个内容";
                    this.$refs.cueInfo.hint(information)
                }else{
                    console.log(this.checkedinformation)
                    this.dialogFormVisibleChange = true; 
                    this.changeforms = this.checkedinformation[0]
                    this.$refs.multipleTable.clearSelection()

                }
            },
            // 禁用/启用
            handleUseStates(){
                if(this.checkedinformation.length === 0){
                    //未选择任何修改内容的提示
                    let information = "未选中任何更改状态内容";
                    this.$refs.cueInfo.hint(information)
                }else{
                    console.log(this.checkedinformation)
                    let statusID = [];
                    this.checkedinformation.map((item)=>{
                        return statusID.push(item.id)
                    })
                    statusID = statusID.join(',');
                    data_ChangeStatus(statusID).then(res=>{
                        // console.log(res)
                       this.firstblood();
                    })
                }
            },
            // 是否删除
            handleDelete() {
                if(this.checkedinformation.length === 0){
                    //未选择任何修改内容的提示
                    let information = "未选中任何删除内容";
                    this.$refs.cueInfo.hint(information)
                }else{
                    console.log(this.checkedinformation)
                    let delID = [];
                    this.checkedinformation.map((item)=>{
                        return delID.push(item.id)
                    })
                    this.delID  = delID.join(',');
                    this.delDialogVisible = true;
                    this.$refs.multipleTable.clearSelection()

                    console.log(this.delID)
                }
            },
            //确认删除
            delDataInformation(){
                this.delDialogVisible = false;
                data_DeletInfo(this.delID).then(res => {
                    this.firstblood();
                }).catch(res=>{
                    let information = res.text;
                    this.hint(information);
                })
            },
            //刷新页面和初始化数据
            firstblood(){
                this.loading = true;
                data_dispatchList(this.page,this.pagesize,this.data).then(res=>{
                    console.log('res:',res)
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                    this.tableDataTree.forEach(item=>{
                        item.obtainTimeM = item.obtainTime +'秒';
                        item.obtainKmM = item.obtainKm +'公里';
                    })
                    this.loading = false;
                    // console.log(this.tableDataTree)
                })
            },
            //新增分类信息
            addClassfy(){
                this.dialogFormVisible = true;
                this.$refs.multipleTable.clearSelection()

            },
            
           
        }
    }
</script>

<style type="text/css" lang="scss">
    .OpenseaRecommend{
        height:100%;    
        position: relative;
        margin-left:7px;
        .classify_info{
            height:100%;
            padding:20px 13px 40px 0px;
            .info_news{
                height:94%;
            }
        }
    }
</style>