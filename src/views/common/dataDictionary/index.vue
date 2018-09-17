<template>
    <div class="DIC TwoColumns clearfix" v-loading="loading">
        <div class="columnsContainer">
            <div class="side_left">
                <el-tree
                    :data="treeData"
                    node-key="code"
                    :accordion = 'true'
                    :highlight-current = "true"
                    :expand-on-click-node = "false"
                    :default-expanded-keys="defaultexpanded"
                    @node-click="handleNodeClick"
                    :default-checked-keys="[]"
                    :props="defaultProps">
                </el-tree>
            </div>
            <div class="side_right">
                <!-- <transition name="show"> -->
                    <el-form :inline="true" ref="ruleForm" class="demo-ruleForm classify_searchinfo" v-show="!showSearch">
                        <el-form-item label="关键词查询" prop="pointName">
                            <el-input
                            placeholder="请输入内容"
                            v-model="input_search"
                            clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="btnChoose fr"  style="margin-left:0;">
                            <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')">查询</el-button>
                            <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')">重置</el-button>
                        </el-form-item>
                    </el-form>
                <!-- </transition> -->
                <div class="side_right_bottom clearfix">
                    <div class="btns_box clearfix">
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-news" @click="handleClick('add')">新增</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')">修改</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-delete" @click="handleClick('delet')">删除</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('status')">启用/禁用</el-button>
                    </div>
                    <p class="current"></p>
                    <div class="info_news">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            stripe
                            border
                            height="100%"
                            @selection-change = "getinfomation"
                            @row-dblclick="moreinfo"
                            tooltip-effect="dark"
                            @row-click="clickDetails"
                            style="width: 100%"> 
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            :show-overflow-tooltip="true"
                            label="分类名称">
                            </el-table-column>
                            <el-table-column
                            prop="pidName"
                            label="上级分类">
                            <template  slot-scope="scope">
                                    {{ scope.row.pidName ? scope.row.pidName: '无'   }}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="code"
                            label="编码">
                            </el-table-column>
                            <el-table-column
                            prop="value"
                            label="数据值">
                            </el-table-column>
                            <el-table-column
                            prop="status"
                            label="状态">
                                <template  slot-scope="scope">
                                    {{ scope.row.status == true ? '启用' : '禁用' }}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="描述">
                            </el-table-column>
                            <el-table-column
                            prop="isDefault"
                            label="是否初始值">
                                <template  slot-scope="scope">
                                    {{ scope.row.isDefault == true ? '是' : '否' }}
                                </template>
                            </el-table-column>
                        </el-table>

                    </div>
                     <!-- 页码 -->
                    <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 

                    <DicDialog :dialogAddDic.sync="dialogVisible" :reviseForm = 'reviseForm' :pid="pid" :pidName="pidname" :formtitle = 'formtitle' :isModify = "isModify"   @close = "shuaxin"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">

import { data_Dic,data_Trees,data_Search,data_CreatCode,data_AddForms,data_Delet,data_ChangeForms,data_CreatCode_top,data_changeStatus } from '@/api/company/data_dic.js'
import '@/styles/dialog.scss'
import Pager from '@/components/Pagination/index'
import DicDialog from './component/addDictionary'

    export default{
        data(){
            return{
                loading:true,
                sizes:[20,50,100,200],
                defaultexpanded:['1'],
                btnsize:'mini',
                isModify:false,
                dialogVisible:false,
                showSearch:true,
                reviseForm:{},
                pid:null,
                pidname:'无',
                page:1,
                pagesize:20,
                formtitle:'新增分类信息',
                dataTotal:0,
                checkedinformation:[],
                input_search: '',
                tableData:[],
                treeData:[
                    {
                        name:'全部',
                        id:null,
                        code:'1',
                        children:[],
                    }
                ],
                defaultProps: {
                  children: 'children',
                  label: 'name'
                },
            }
        },
        components:{
            Pager,
            DicDialog
        },
        watch:{
            pid:{
                handler(newValue,oldValue){
                    if(newValue){
                        this.showSearch = true;
                    }else{
                        this.showSearch = false;
                    }
                    // console.log(this.showSearch)
                },
                immediate: true
            }
          
        },
        mounted(){
            this.firstblood()
        },  
        methods: {
            handlePageChange(obj) {
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.getInformation();
            },
            //双击
            moreinfo(row, event){
                // console.log('doubleClick',row)
                this.pid = row.id;
                this.pidname = row.name ? row.name:'无';
                this.getInformation();
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            handleClick(type){
                if(this.checkedinformation.length === 0 && type != 'add'){
                    //未选择任何修改内容的提示
                    this.$message({
                        message: '请选择要操作的数据~',
                        type: 'warning'
                    })
                    return false
                }
                switch(type){
                    case 'add':
                        this.formtitle = '新增分类信息';
                        this.dialogVisible = true;
                        break;
                    case 'revise':
                        if(this.checkedinformation.length >1){
                            this.$message({
                                message: '不可修改多个内容~',
                                type: 'warning'
                            })
                            return false
                        }else{
                            this.formtitle = '修改分类信息';
                            this.reviseForm =Object.assign({},this.checkedinformation[0]);
                            this.isModify = true;
                            this.dialogVisible = true;
                        }
                        break;
                    case 'delet':
                        let delID = [];
                        let isOK = true;
                        this.checkedinformation.map((item)=>{
                            if(item.isDefault == true){
                                isOK = false;
                            }
                            return delID.push(item.id)
                        })
                        if(!isOK){
                            this.$message({
                                message: '存在初始数据不可删除~',
                                type: 'warning'
                            })
                        }else{
                            console.log(this.checkedinformation[0].pid)
                            let config = delID.length>1 ?  delID.length + '条' : this.checkedinformation[0].name+'这条';
                            let currentForm = Object.assign({},this.checkedinformation[0])
                            this.$confirm('确定要删除'+config+'数据吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then( ()=>{
                                data_Delet(delID).then(res => {
                                    this.$alert('操作成功', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            if(currentForm.pid){
                                                this.getInformation();
                                            }else{
                                                this.firstblood();
                                            }
                                        }
                                    });
                                }).catch(res=>{
                                    this.$message.error('操作失败，失败原因：',err.errorInfo)
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消'
                                })
                            })
                        }
                        break;
                    case 'status':
                        let statusID = [];
                        let ifdefault = true;
                        this.checkedinformation.map((item)=>{
                            if(item.isDefault == true){
                                ifdefault = false;
                            }
                            return statusID.push(item.id)
                        })
                        if(!ifdefault){
                            this.$message({
                                message: '存在初始数据不可更改状态~',
                                type: 'warning'
                            })
                        }else{
                            data_changeStatus(statusID).then( res=>{
                                this.getInformation();
                            })
                        }
                        break;
                }
                // 清除选中状态，避免影响下个操作
                this.$refs.multipleTable.clearSelection()
            },
            shuaxin(){
                if(this.pid){
                    this.getInformation()
                }else{
                    this.firstblood();
                }
            },
            handleSearch(type){
                switch(type){
                    case 'search':
                        this.getdata_search();
                        break;
                    case 'clear' :
                        this.input_search = '';
                        this.getdata_search();
                        break;
                }
            },
            //判断是否选中
            getinfomation(selection){
                this.checkedinformation = selection;
                console.log(this.checkedinformation)
            },
            //数结构选择  渲染数据
            handleNodeClick(data,checked){  
                this.pid = data.id;
                this.pidname = data.name;
                // console.log(this.pid);
                this.getInformation();
            },
            //初始化渲染数据
            firstblood(){
                data_Dic().then(res =>{ 
                    this.treeData[0].children = res.data;
                    this.getInformation();
                })
            },  
            //刷新数据
            getInformation(){
                // console.log(this.page,this.pagesize,this.pid)
                this.loading = true;
                data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                    // console.log(res)
                    if(res.data.length !=0){
                        this.tableData = res.data.list;
                        this.dataTotal= res.data.totalCount;
                    }else{
                        this.tableData = [];
                        this.dataTotal= 0;
                    }
                    this.loading = false;
                })
            },
            //模糊查询 分类名称或者code
            getdata_search(){
                data_Search(this.page,this.pagesize,this.pid,this.input_search).then(res=>{
                    // console.log('查询',res)
                    if(res.data.length !=0){
                        this.tableData = res.data.list;
                        this.dataTotal= res.data.totalCount;
                    }else{
                        this.tableData = [];
                        this.dataTotal= 0;
                    }
                    // console.log(this.tableData)
                })
            },
        }
    }
</script>

<style type="text/css" lang="scss">
    .DIC{
        .side_left {
            flex: 0 0 300px;
        }
       .side_left .el-tree .el-tree-node {
            width: 95%;
        }
        .show-enter-active,.show-leave-active{
            transition:all .5s;
        }
        .show-enter,.show-leave-to{
            margin-left: 100%;
        }
        .show-enter-to,.show-leave{
            margin-left:0px;
        }

        .side_right_bottom{
            transition:all .5s linear;
        }
    }
</style>