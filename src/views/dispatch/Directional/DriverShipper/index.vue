<template>
    <div class="driverShipper clearfix">
             <div class="classify_searchinfo">
                <label>货主账号&nbsp;
                   <el-input v-model="data.shipperName" placeholder="请输入内容" clearable></el-input>
                </label>
                <label>车主账号&nbsp;
                   <el-input v-model="data.driverName" placeholder="请输入内容" clearable></el-input>
                </label>    
                <el-button type="primary"  plain @click="getdata_search">查询</el-button>
                <el-button type="primary"  plain @click="reset">重置</el-button>
            </div>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain icon="el-icon-news" @click="addClassfy">新增</el-button>
                    <el-button type="primary" plain icon="el-icon-edit" @click="handleEdit">修改</el-button>
                    <!-- <el-button type="primary" plain icon="el-icon-delete" @click="handleDelete">删除</el-button> -->
                    <el-button type="primary" plain icon="el-icon-bell" @click="handleUseStates">启用/禁用</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        align = "center"
                        height="93%"
                        @selection-change = "getinfomation"
                        @row-dblclick="moreinfo"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                        align = "center"

                            fixed
                             type="selection"
                             width="55">
                           </el-table-column>
                        <el-table-column
                        align = "center"

                        fixed
                          prop="shipperInfo"
                          label="货主账号">
                        </el-table-column>
                        <el-table-column
                        align = "center"

                          prop="carInfo"
                          label="车主账号">
                        </el-table-column>
                        <el-table-column
                        align = "center"

                          prop="startTime"
                          label="绑定开始时间">
                        </el-table-column>
                        <el-table-column
                        align = "center"

                          prop="endTime"
                          label="绑定结束时间">
                        </el-table-column>
                        <el-table-column
                        align = "center"

                          prop="bindingSource"
                          label="绑定来源">
                            <template  slot-scope="scope">
                                {{ scope.row.bindingSource === '1' ? '收藏绑定' : '平台绑定' }}
                            </template>
                        </el-table-column>
                        <el-table-column
                        align = "center"

                          prop="usingStatus"
                          label="状态">
                            <template  slot-scope="scope">
                                {{ scope.row.usingStatus === '1' ? '启用' : '禁用' }}
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
                
                <!-- 新增数据 -->
                <addClassfy :dialogFormVisible.sync = "dialogFormVisible" :formtitle = "formtitle" @renovate="Onrenovate" @ifError="hint" ></addClassfy>
                <!-- 修改数据 -->
                <changeclassify :dialogFormVisibleChange.sync = "dialogFormVisibleChange" :formtitle = "formtitle_change" @ifError="hint" @renovate="Onrenovate" :changeforms = 'changeforms'></changeclassify>

                <!-- 新增分类提示不可为空 -->
                <div class="cue">
                    <el-dialog
                    :visible.sync="centerDialogVisible"
                    center>
                    <span>{{information}}</span>
                    </el-dialog>
                </div>
                <!-- 删除信息提示 -->
                <div class="delData">
                    <el-dialog
                    title="提示"
                    :visible.sync="delDialogVisible">
                    <span class="delwarn"></span>
                    <span class="delinfo">确认删除信息吗 ?</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="delDataInformation">确 定</el-button>
                        <el-button @click="delDialogVisible = false" type="info" plain>取 消</el-button>
                    </span>
                    </el-dialog>
                </div>
            </div>
        <!-- loading   -->
        <!-- <spinner v-show="show"></spinner>  -->
        
    </div>
</template>

<script type="text/javascript">

import { data_dispatchList,data_ChangeStatus } from '@/api/dispatch/Directional.js'
import '@/styles/dialog.scss'
import spinner from '../../../spinner/spinner'
import { parseTime,formatTime } from '../../../../utils/index.js'
import addClassfy from './addclassify'
import changeclassify from './changeclassify'

    export default{

        data(){
            return{
                carNumber:null,//车主账号
                shipperNumber:null,//货主账号
                data:{
                    shipperName:null,
                    driverName:null,
                },//获取页面数据 后端要求传参{}
                changeforms:{},
                page:1,
                pagesize:20,
                formtitle:'新增绑定车主',
                formtitle_change:'修改绑定车主',
                currentPage4:1,
                dialogFormVisible: false,//新增弹窗
                dialogFormVisibleChange:false,//修改弹窗
                dialogFormVisible_change:false,
                centerDialogVisible:false,
                delDialogVisible:false,
                dataTotal:null,
                information:'你想知道什么',
                delIDTree:'',
                checkedinformation:[],
                tableDataTree:[],
            }
        },
        components:{
            spinner,
            addClassfy,
            changeclassify

        },
        mounted(){
            this.firstblood();
            
            // console.log(this.$store)
        },  
        methods: {
            //子组件调用父组件刷新页面  
            Onrenovate(){
                this.firstblood();
                this.dialogFormVisible = false;
            },
            // 获取翻页返回的数据
            handlePageChange (obj) {
                console.log(obj)
                // Object.assign(this.searchForm, obj)
                // this.fetchData()
            },
            //shuangji
            moreinfo(row, event){
                // console.log(row, event)
               
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
                    this.hint(information);
                }else if(this.checkedinformation.length >1){
                    let information = "不可修改多个内容";
                    this.hint(information);

                }else{
                    console.log(this.checkedinformation)
                    this.dialogFormVisibleChange = true;
                    this.changeforms= this.checkedinformation[0];
                    console.log('开始：',this.changeforms.bindingStartDate,this.changeforms.bindingEndDate)
                    
                }
            },
            // 禁用/启用
            handleUseStates(){
                if(this.checkedinformation.length === 0){
                    //未选择任何修改内容的提示
                    let information = "未选中任何更改状态内容";
                    this.hint(information);
                }else{
                    let statusID = [];
                    console.log(this.checkedinformation)
                    this.checkedinformation.map((item)=>{
                        return statusID.push(item.id)
                    })
                    console.log(statusID)
                    statusID = statusID.join(',');
                    console.log(statusID)
                    data_ChangeStatus(statusID).then(res=>{
                        console.log(res)
                        this.firstblood();
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            // 是否删除
            handleDelete() {
                if(this.checkedinformation.length === 0){
                    //未选择任何修改内容的提示
                    let information = "未选中任何删除内容";
                    this.hint(information);
                }else{
                    console.log(this.checkedinformation)
                    let delID = [];
                    this.checkedinformation.map((item)=>{
                        return delID.push(item.standardPid)
                    })
                    this.delID = delID;
                    this.delDialogVisible = true;
                    console.log(this.delID)
                }
            },
            //确认删除
            delDataInformation(){
                this.delDialogVisible = false;
                data_DeletInfo(this.delID).then(res => {
                    if(res.status == 200){
                      this.firstblood();
                    }
                }).catch(res=>{
                    let information = res.text;
                    this.hint(information);
                })
                
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
            handleNodeClick(data,checked){  
                console.log(data)
            },
            //刷新页面  
            firstblood(){
                data_dispatchList(this.page,this.pagesize,this.data).then(res=>{
                    console.log('res:',res.data.list)
                    this.tableDataTree = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.tableDataTree.forEach(item => {
                        item.carInfo = item.driverPhone +'/'+item.driverName;
                        item.shipperInfo = item.shipperPhone+ '/' +item.shipperName;
                        
                        item.startTime = parseTime(item.bindingStartDate,"{y}-{m}-{d}");
                        item.endTime = parseTime(item.bindingEndDate,"{y}-{m}-{d}");
                    })
                    // console.log(parseTime("1528710180","{y}-{m}-{d}"))
                    // console.log(formatTime("1528710180"))
                })
            },
           
            //模糊查询 分类名称或者code
            getdata_search(){
                this.firstblood();
            },
            //重置
            reset(){
                this.data = {
                    shipperName:null,
                    driverName:null,
                };
                this.firstblood();
            },
            //新增分类信息
            addClassfy(){
                this.dialogFormVisible = true;
            },
            hint(val){
                this.information = val;
                this.centerDialogVisible = true;
                let timer = setTimeout(()=>{
                    this.centerDialogVisible = false;
                    clearTimeout(timer)
                },2000)
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .driverShipper{
        height:100%;    
        position: relative;
        margin-left:7px;
        .classify_searchinfo{
            position: absolute;
            left:0;
            top:0;
            padding:15px 16px;
            border-bottom:2px dashed #ccc;
            height:70px;
            width:100%;
            line-height: 35px;
            label{
                margin-right:50px;
                color: #666;
                font-size:14px;
                .el-input{
                    width:300px;
                    .el-input__inner{
                        color:#3e9ff1;
                        height:30px;
                        line-height: 30px;
                    }
                }
            }
            .el-button{
               padding:8px 20px;
            }
        }
        .addclassify{
            .el-dialog{
                position: relative;
                width: 760px;
                .el-dialog__body{
                        margin:0 40px;
                        .el-input__inner{
                            height: 24px;
                            line-height: 24px;
                            color: #3e9ff1;
                        }
                    .chooseinfo{
                        border:1px solid #d2d2d2;
                        margin-bottom: 20px;
                        .chooseinfo-item{
                            padding: 20px 10px;
                            p{
                                display: inline-block;
                                span{
                                    color:red;
                                }
                            }
                            .el-input{
                                width: 150px;
                            }
                            .el-radio-group{
                                display: inline-block;
                                margin:0 9px;
                            }
                            .el-checkbox-group{
                                display: inline-block;
                                margin-left: 10px;
                            }
                        }
                    }
                    .completeinfo{
                        .detailinfo{
                            margin-bottom: 12px;
                            p{
                                width:120px;
                                text-align: right;
                                display: inline-block;
                                vertical-align: top;
                                span{
                                    color:red;
                                }
                            }
                            
                            .el-input{
                                width: 70px;
	                            height: 24px;
                                margin-right:6px;
                                .el-input__inner{
                                    height:24px;
                                    line-height: 24px;
                                    padding:5px;
                                    font-size: 12px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    line-height: 20px;
                                    letter-spacing: 0px;
                                    color: #3e9ff1;
                                }
                            }
                            .dotted{
                                margin-right:9px;
                            }
                            .node{
                                display: inline-block;
                                width:28px;
                                text-align: left;
                                margin-right: 12px;
                            }
                            .morewidth{
                                width: 96px;
                            }
                            .remarks{
                                height: 14px;
                                font-family: MicrosoftYaHei;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #999999;
                            }
                            .licensePicture{
                                width: 180px;
                                height: 116px;
                                line-height: 1.2;
                                display: inline-block;
                                .el-upload-dragger{
                                    width: 180px;
                                    height: 116px;
                                    .el-icon-upload{
                                        margin: 15px 0 16px;
                                    }
                                    .el-upload__text{
                                        font-size: 12px;
                                    }
                                }

                            }
                        }
                    }
                }
            }
            
        }
        .classify_info{
            height:100%;
            padding:90px 13px 18px;
            .btns_box{
                margin-bottom:10px;
                .el-button{
                    margin-right:20px;
                    padding:10px 20px;
                }
            }
            .info_news{
                height:89%;
                .el-table{
                    table{
                        width: 100% !important;
                        th,td{
                            text-align:center;
                        }
                    }
                    .cell{
                        img{
                            display: inline-block;
                            width: 100px;
                            height: 50px;
                        }
                    }
                }
            }
            .Pagination{
                margin-top:13px;
                text-align:right;
            }
        }
    }
</style>