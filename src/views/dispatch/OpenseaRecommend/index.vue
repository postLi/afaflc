<template>
    <div class="OpenseaRecommend clearfix">
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain icon="el-icon-news" @click="addClassfy">新增</el-button>
                    <el-button type="primary" plain icon="el-icon-edit" @click="handleEdit">修改</el-button>
                    <el-button type="primary" plain icon="el-icon-delete" @click="handleDelete">删除</el-button>
                    <el-button type="primary" plain icon="el-icon-bell" @click="handleUseStates">启用/禁用</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        @selection-change = "getinfomation"
                        @row-dblclick="moreinfo"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                            fixed
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                          prop="areaCode"
                          label="地区">
                        </el-table-column>
                        <el-table-column
                          prop="serivceCode"
                          label="服务类型">
                        </el-table-column>
                        <el-table-column
                          prop="shipperCarType"
                          label="货主用车类型">
                        </el-table-column>
                        <el-table-column
                          prop="firstPush"
                          label="第一轮推送">
                        </el-table-column>
                        <el-table-column
                          prop="secondPush"
                          label="第二轮及之后推送">
                        </el-table-column>
                        <el-table-column
                          prop="visualCarType"
                          label="可见车主类型">
                        </el-table-column>
                        <el-table-column
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
                </div>
                  
                <addClassfy :dialogFormVisible.sync = "dialogFormVisible" :formtitle = "formtitle" ></addClassfy>
                <changeclassify :dialogFormVisibleChange.sync = "dialogFormVisibleChange" :formtitle = "formtitle_change" @renovate="Onrenovate" :changeforms = 'changeforms'></changeclassify>

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
        <!-- loading -->
        <!-- <spinner v-show="show"></spinner>  -->
    </div>
</template>

<script type="text/javascript">

import { data_dispatchList,data_ChangeStatus,data_DeletInfo } from '@/api/dispatch/OpenseaRecommend.js'

import '@/styles/dialog.scss'
import spinner from '../../spinner/spinner'
import addClassfy from './addclassify'
import changeclassify from './changeclassify'

    export default{

        data(){
            return{
                AddVisible:null,
                config:null,
                show:false,//遮罩层
                page:1,//页码
                pagesize:20,//每页显示数量
                formtitle:'新增额外服务',
                formtitle_change:'修改分类信息',
                currentPage4: 1,//显示当前页面
                dialogFormVisible: false,//新增弹窗
                dialogFormVisibleChange:false,//修改弹窗
                centerDialogVisible:false,//提示弹窗
                delDialogVisible:false,//删除提示弹窗
                dataTotal:null,//当前页面数据总数
                data:{},//获取页面数据 后端要求传参{}
                forms: [{
                    "extraDes":null,
                    "extraName":null,
                    "isFree":"0",
                    "extraPrice" :0,
                }],
                changeforms:{},
                information:'你想知道什么',
                waitchange:{},
                delID:[],
                delIDTree:'',
                checkedinformation:[],
                formLabelWidth: '80px',
                input_search: null,
                tableDataTree:[],
                defaultProps: {
                  children: 'children',
                  label: 'label'
                },
            }
        },
        components:{
            spinner,
            addClassfy,
            changeclassify
        },
        
        mounted(){
            this.firstblood()
        },  
        methods: {
            //子组件调用父组件刷新页面
            Onrenovate(){
                this.firstblood()
            },
            //
            changeformprice(val){
                console.log(val)
            },
            //
            chooseradio(label){
                console.log(label)
            },
            //shuangji
            moreinfo(row, event){
                console.log(row, event)
              
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //添加子节点新增
            addItem(){
                // 业务逻辑判断
                this.forms.push({
                    extraDes:null,
                    extraName:null,
                    isFree:null,
                    serivceCode:null,
                }); 
            },
            //删除子节点新增
            reduceItem(idx){
                console.log(idx)
                this.forms.splice(idx,1);
            },
            //新增关闭返回初始内容
            closeAddNewInfo(){
                this.dialogFormVisible = false;
                this.forms = [{
                    "extraDes":null,
                    "extraName":null,
                    "isFree":"0",
                    "extraPrice" :0,
                }];
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
                    this.changeforms.areaCode = this.checkedinformation[0].areaCode;
                    this.changeforms.serivceCode = this.checkedinformation[0].serivceCode;
                    this.changeforms.firstRecommendKm = this.checkedinformation[0].firstRecommendKm;
                    this.changeforms.firstRecommendTime = this.checkedinformation[0].firstRecommendTime;
                    this.changeforms.secondRecommendKm = this.checkedinformation[0].secondRecommendKm;
                    this.changeforms.secondRecommendTime = this.checkedinformation[0].secondRecommendTime;
                    this.changeforms.shipperCarType = this.checkedinformation[0].shipperCarType;
                    this.changeforms.visualCarType = this.checkedinformation[0].visualCarType;
                    this.changeforms.usingStatus = this.checkedinformation[0].usingStatus;
                    
                    
                }
            },
            // 禁用/启用
            handleUseStates(){
                if(this.checkedinformation.length === 0){
                    //未选择任何修改内容的提示
                    let information = "未选中任何更改状态内容";
                    this.hint(information);
                }else{
                    console.log(this.checkedinformation)
                    let statusID = [];
                    this.checkedinformation.map((item)=>{
                        return statusID.push(item.id)
                    })
                    console.log(statusID)
                    statusID = statusID.join(',');
                    console.log(statusID)
                    data_ChangeStatus(statusID).then(res=>{
                        console.log(res)
                       this.firstblood();
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
                        return delID.push(item.id)
                    })
                    this.delID  = delID.join(',');
                    this.delDialogVisible = true;
                    console.log(this.delID)
                }
            },
            //确认删除
            delDataInformation(){
                this.delDialogVisible = false;
                data_DeletInfo(this.delID).then(res => {
                    console.log(res)
                    
                    this.firstblood();
                    
                }).catch(res=>{
                    let information = res.text;
                    this.hint(information);
                })
                
            },
            handleUse(index, row) {
                console.log(index, row);
            },
            handleSizeChange(val) {
                this.pagesize = val ;
                this.firstblood();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.firstblood();
            },
            //刷新页面和初始化数据
            firstblood(){
                this.show = true;
                data_dispatchList(this.page,this.pagesize,this.data).then(res=>{
                    console.log(res)
                    this.dataTotal = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                    this.tableDataTree.map(item=>{
                        item.firstPush = item.firstRecommendKm +'公里/'+item.firstRecommendTime+'秒';
                        item.secondPush = item.secondRecommendKm +'公里/'+item.secondRecommendTime+'秒';
                    })
                    this.show = false;
                    // console.log(this.tableDataTree)
                })
            },
            //模糊查询 分类名称或者code
            getdata_search(event){
                // console.log(event)
                this.show = true;
               
            },
            //新增分类信息
            addClassfy(){
                this.dialogFormVisible = true;
            },
            //保存信息
            newInfoSave(event){
                if(!this.classfyradio){
                    let information = "请选择标准服务类型";
                    this.hint(information);
                }else{
                    let isOK = true;
                    this.forms.map((item)=>{
                        if(item.isFree === '1' && item.extraPrice == 0){
                            isOK = false;
                            let information = "请填写额外收费价格";
                            this.hint(information);
                            this.$refs.pricefocus[0].focus();
                        }
                        if(!item.extraDes){
                            isOK = false;
                            let information = "请填写额外服务描述";
                            this.hint(information);
                            this.$refs.infofocus[0].focus();
                        }
                            item.serivceCode = this.classfyradio
                    })
                    console.log(this.forms)
                    console.log(isOK)
                    if(isOK){
                        data_AddForms(this.forms).then(res=>{
                            // console.log(res)
                            this.dialogFormVisible = false;
                            this.firstblood();
                            this.forms = [{
                                "extraDes":null,
                                "extraName":null,
                                "isFree":"0",
                                "extraPrice" :0,
                            }];
                        })
                    }
                }
            },
            //修改保存
            changeInfoSave(){
                console.log(this.changeform)
                if(this.changeform.isFree == "0"){
                    this.changeform.extraPrice = 0;
                }
                let arr = [];
                arr.push(this.changeform)
                data_AddForms(arr).then(res=>{
                    console.log(res)
                    this.dialogFormVisibleChange = false;   
                    this.firstblood();
                })
            },
             //验证数据值
            valuerules(event){
                // console.log(event)
                if(!event.target.value){
                    return 
                }else{
                    if(!/^[0-9]+$/.test(event.target.value)){
                        let information = "请输入数字类型内容";
                        this.hint(information);
                        event.target.focus()
                    }
                }
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

<style type="text/css" lang="scss">
    .OpenseaRecommend{
        height:100%;    
        position: relative;
        margin-left:7px;
        .addclassify,.changeclassify{
            .el-dialog{
                position: relative;
                .el-dialog__body{
                    margin:0 20px;
                    margin-bottom: 20px;
                    .chooseinfo-item{
                        font-size: 12px;
                        line-height: 20px;
                        color:#666;
                        p{
                            display: inline-block;
                            span{
                                color:red;
                            }
                        }
                        .el-input{
                            .el-input__inner{
                                height: 24px;
                                line-height:24px;
                            }
                        }
                    }
                    .extrainfo{
                        border:1px solid #e6e6e6;
                        width:680px;
                        padding:16px 0;
                        position: relative;
                        margin-top:15px;
                        p{
                            width: 100px;
                            text-align: right;
                            padding-right: 12px;
                            display: inline-block;
                            font-size: 12px;
                            line-height: 20px;
                            color:#666;
                            span{
                                color:red;
                            }
                        }
                        .ifprice{
                            width:200px;
                            text-align: left;
                            span{
                                color:#666;
                                margin-left:5px;
                            }
                        }
                        .nomore{
                            margin-top:14px;
                            .el-input{
                                width:560px;
                            }
                        }
                        .el-input{
                            height:22px;
                            width: 150px;
                            input{
                                height:22px;
                                line-height: 22px;
                                font-size:12px;
                                color: #3e9ff1;
                                padding:0 10px;
                            }
                        }
                        .el-textarea{
                            width: 560px;   
                            vertical-align: middle;
                            .el-textarea__inner{
                                font-size:12px;
                                line-height: 20px;
                                color: #3e9ff1;
                            }
                        }
                        .el-checkbox{
                            margin:0 10px;
                            .el-checkbox__input{
                                .el-checkbox__inner{
                                    width:12px;
                                    height:12px;
                                }
                            }
                            .el-checkbox__label{
                                padding-left:5px;
                                font-size: 12px;
                                line-height: 20px;
                                color:#666;
                            }
                        }
                        .addItem,.reduceItem{
                            top:0px;
                            left: 101%;
                        }
                    }
                }
            }
            
        }
        .classify_info{
            height:100%;
            padding:20px 13px 18px;
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
                }
            }
            .Pagination{
                margin-top:13px;
                text-align:right;
            }
        }
    }
</style>