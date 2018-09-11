<template>
    <div class="DIC clearfix">
        <div class="side_left">
            <el-tree
                :data="treeData"
                node-key="key"
                :highlight-current = "true"
                :expand-on-click-node = "false"
                :default-expanded-keys="[1]"
                @node-click="handleNodeClick"
                :default-checked-keys="[]"
                :props="defaultProps">
            </el-tree>
        </div>
        <div class="side_right">
            <div class="classify_searchinfo">
                <label>关键词查询 &nbsp;
                    <el-input
                      placeholder="请输入内容"
                      v-model="input_search"
                      clearable>
                    </el-input>
                </label>    
                <el-button type="primary"  plain @click="getdata_search">查询</el-button>
            </div>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain icon="el-icon-news" @click="addClassfy">新增</el-button>
                    <el-button type="primary" plain icon="el-icon-edit" @click="handleEdit">修改</el-button>
                    <el-button type="primary" plain icon="el-icon-delete" @click="handleDelete">删除</el-button>
                    <el-button type="primary" plain icon="el-icon-edit" @click="handleUseStates">启用/禁用</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        height="90%"
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
                        fixed
                          prop="name"
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
                
                <!-- 新增分类信息 -->
                <div class="addclassify commoncss">
                    <el-dialog :title='formtitle'  :visible.sync="dialogFormVisible">
                      <el-form :rules="rules">
                        <el-form-item label="上级分类" :label-width="formLabelWidth">
                         <el-select v-model="forms[0].pid"  @change="currentValue">
                           <el-option :label="pidname" :value="pid" v-if="pidname != null && pidname!= undefined && pidname !='无' && pidname !='全部'"></el-option>
                           <el-option label="无" value=''></el-option>
                         </el-select>
                       </el-form-item>
                         <div  v-for="(form,idx) in forms" :key="idx"> 
                            <el-form-item label="编码" :label-width="formLabelWidth">
                              <el-input v-model="form.code" auto-complete="off" :disabled="true" ></el-input>
                            </el-form-item>
                            <el-form-item label="分类名称" :label-width="formLabelWidth" class="morewidth">
                              <el-input v-model="form.name" auto-complete="off" placeholder="少于20字" @blur="namerules" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item label="数据值" :label-width="formLabelWidth">
                              <el-input v-model="form.value" auto-complete="off" @blur="valuerules" maxlength="6" ></el-input>
                            </el-form-item>
                            <el-form-item label="描述" :label-width="formLabelWidth" class="morewidth">
                              <el-input v-model="form.remark" auto-complete="off" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span  @click="addItem" class="addItem" v-if="idx == 0">
                                </span>
                                <span  @click="reduceItem(idx)" class="reduceItem" v-else>
                                </span>
                            </el-form-item>
                        </div>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="newInfoSave">保 存</el-button>
                        <el-button @click="closeAddNewInfo">取 消</el-button>
                      </div>
                    </el-dialog>
                </div>

                <!-- 修改分类信息 -->
                <div class="changeclassify commoncss">
                    <el-dialog title='修改分类信息'  :visible.sync="dialogFormVisible_change">
                      <el-form>
                        <el-form-item label="上级分类" :label-width="formLabelWidth">
                         <el-select v-model="changeform.pid" >
                           <el-option :label="pidname" :value="pid"></el-option>
                           <el-option label="无" value=null></el-option>
                         </el-select>
                       </el-form-item>
                       <div>
                            <el-form-item label="编码" :label-width="formLabelWidth">
                              <el-input v-model="changeform.code" auto-complete="off" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="分类名称" :label-width="formLabelWidth" class="morewidth">
                              <el-input v-model="changeform.name" auto-complete="off" ></el-input>
                            </el-form-item>
                            <el-form-item label="数据值" :label-width="formLabelWidth">
                              <el-input v-model="changeform.value" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="描述" :label-width="formLabelWidth" class="morewidth">
                              <el-input v-model="changeform.remark" auto-complete="off"></el-input>
                            </el-form-item>

                       </div>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="changeInfoSave">保 存</el-button>
                        <el-button @click="closeChangeInfo">取 消</el-button>
                      </div>
                    </el-dialog>
                </div>

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
        </div>
    </div>
</template>

<script type="text/javascript">

import { data_Dic,data_Trees,data_Search,data_CreatCode,data_AddForms,data_Delet,data_ChangeForms,data_CreatCode_top,data_changeStatus } from '@/api/company/data_dic.js'
import '../../../styles/dialog.scss'

    export default{

        data(){
            return{
                ifclose:false,
                pid:null,
                pidname:null,
                labelName:'无',
                page:1,
                pagesize:20,
                formtitle:'新增分类信息',
                currentPage4: 1,
                dialogFormVisible: false,
                dialogFormVisible_change:false,
                centerDialogVisible:false,
                delDialogVisible:false,
                nowcode:null,
                dataTotal:0,
                forms: [{
                    code: null,
                    name: null,
                    pid: null,
                    remark: null,
                    value: null
                }],
                changeform:{
                    id:null,
                    code: null,
                    name: null,
                    pid: null,
                    remark: null,
                    value: null
                },
                information:'你想知道什么',
                delID:[],
                delIDTree:null,
                checkedinformation:[],
                formLabelWidth: '80px',
                input_search: null,
                tableDataTree:[],
                treeData:[
                    {
                        name:'全部',
                        id:null,
                        key:1,
                        children:[],
                    }
                ],
                defaultProps: {
                  children: 'children',
                  label: 'name'
                },
                rules: {
                    dev: [
                        { required: true, message: '请输入手机号码', trigger: 'change' },
                    ]
                }
            }
        },
        watch:{
            // treeData:{
            //     handler(newValue, oldValue){
            //         console.log("newValue, oldValue:",newValue, oldValue)
            //         //  this.firstblood()
            //     },
            //     deep:true
            // }
        },
        mounted(){
            this.firstblood()
        },  
        methods: {
            //shuangji
            moreinfo(row, event){
                console.log(row, event)
                data_Trees(this.page,this.pagesize,row.id).then(res =>{
                    console.log(res)
                    if(res.status == 200 && res.data.list){
                        res.data.list.forEach(function(item){
                            if(item.pid == null){
                                item.uplabel = '无';
                            }else{
                                item.uplabel = name;
                            }
                        })
                        this.tableDataTree = res.data.list;
                        this.dataTotal= res.data.totalCount;
                        console.log(this.pidname)
                    }else{
                        this.tableDataTree =[];
                        return
                    }
                })
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //添加子节点新增
            addItem(){
                // 业务逻辑判断
                let strCode = this.nowcode.slice(2);
                let strCodenub = strCode *1 + 1;
                let len = String(strCodenub).length;
                let str = this.nowcode.slice(0,-len);
                let newCode = str + strCodenub;
                this.nowcode = newCode;
                this.forms.push({
                    code: newCode,
                    name: null,
                    pid: this.pid,
                    remark: null,
                    value: null
                }); 
            },
            //删除子节点新增
            reduceItem(idx){
                this.forms.splice(idx,1);
            },
            //新增关闭返回初始内容
            closeAddNewInfo(){
                this.dialogFormVisible = false;
                this.forms = [{
                    code: null,
                    name: null,
                    pid: null,
                    remark: null,
                    value: null
                }]
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

                }else if(this.checkedinformation[0].isDefault){
                    let information = "初始数据不可修改";
                    this.hint(information);
                }else{
                    console.log(this.checkedinformation)
                    this.dialogFormVisible_change = true;
                    this.changeform = this.checkedinformation[0];
                }
            },
            //修改关闭恢复数据
            closeChangeInfo(){
                this.dialogFormVisible_change = false;
            },
            // 禁用/启用
            handleUseStates(){
                if(this.checkedinformation.length === 0){
                    //未选择任何修改内容的提示
                    let information = "未选中任何更改状态内容";
                    this.hint(information);
                }else{

                    let statusID = [];

                    this.checkedinformation.map((item)=>{
                        return statusID.push(item.id)
                    })
        
                    data_changeStatus(statusID).then( res=>{
                        console.log(res)
                        this.getInformation();
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
                    let isOK = true;
                    this.checkedinformation.map((item)=>{
                        if(item.isDefault == true){
                            isOK = false;
                        }
                        return delID.push(item.id)
                    })
                    if(!isOK){
                        let information = "存在初始化数据不能删除";
                        this.hint(information);
                    }else{
                        this.delDialogVisible = true;
                        this.delID = delID;
                    }
                }
            },
            //确认删除
            delDataInformation(){
                this.delDialogVisible = false;
                data_Delet(this.delID).then(res => {
                    console.log(res)
                    if(res.status == 200){
                        this.getInformation();
                    }
                }).catch(res=>{
                    let information = res.text;
                    this.hint(information);
                })
                
            },
            handleSizeChange(val) {
                this.pagesize = val ;
                this.getInformation();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page = val;
                this.getInformation();
            },
            //数结构选择  渲染数据
            handleNodeClick(data,checked){  
                console.log(data)
                this.pid = data.id;
                this.pidname = data.name;
                this.forms[0].pid = this.pid;
                console.log(this.pid)
                data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                    console.log(res)
                    if(res.data.list){
                        this.tableDataTree = res.data.list;
                    }else{
                         this.tableDataTree = [];
                    }
                    this.dataTotal = res.data.totalCount;

                })
            },
            //初始化渲染数据
            firstblood(){
                 data_Dic().then(res =>{ 
                    console.log(res)
                    if(res.data.length !=0){
                        this.treeData[0].children = res.data;
                        console.log(this.treeData)
                        this.getInformation();
                    }else{
                        console.log('000')
                    }
                })
            },  
            //刷新数据
            getInformation(){
                console.log(this.page,this.pagesize,this.pid)
                data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                    console.log(res)
                    if(res.status == 200 && res.data.list){
                        this.tableDataTree = res.data.list;
                        this.dataTotal= res.data.totalCount;
                        // console.log(this.pidname)
                    }else{
                        this.tableDataTree = [];
                       return
                    }
                })
            },
            //模糊查询 分类名称或者code
            getdata_search(event){
                console.log(event)
                data_Search(this.page,this.pagesize,this.pid,this.input_search).then(res=>{
                    res.data.list.forEach(function(item){
                        if(item.uplabel == undefined || !item.uplabel){
                            item.uplabel = '无';
                        }
                    })
                    this.tableDataTree = res.data.list;
                    this.dataTotal= res.data.totalCount;
                })
            },
            //新增分类信息获取code值
            addClassfy(){
                this.dialogFormVisible = true;
                console.log('this.pid:',this.pid)
                this.currentValue(this.pid);
            },
            //添加最高层获取code
            currentValue(val){
                if(val == '' || val == null){
                    data_CreatCode_top().then(res => {
                        console.log(res)
                        if(res.status == 200){
                            console.log(res)
                            this.forms[0].code = res.data;
                            this.nowcode = res.data;
                        }   
                    })
                }else{
                    data_CreatCode(this.pid).then(res => {
                        console.log()
                        if(res.status == 200){
                            this.forms[0].code = res.data;
                            this.nowcode = res.data;
                        }
                    })
                }
            },
            //保存信息
            newInfoSave(){
                console.log(this.forms)
                if(this.forms[0].pid){
                    data_AddForms(this.forms).then(res=>{
                        if(res.status == 200){
                            this.dialogFormVisible = false;
                            this.getInformation();
                        }
                    })
                }else{
                    this.forms.map((item)=>{
                        item.pid = null;
                    })
                    data_AddForms(this.forms).then(res=>{
                        if(res.status == 200){
                            this.dialogFormVisible = false;
                            this.getInformation();
                        }
                    })
                    
                }
               
            },
            //修改保存
            changeInfoSave(){
                // console.log(this.changeform)
                data_ChangeForms(this.changeform).then(res=>{
                    if(res.status == 200){
                        this.dialogFormVisible_change = false;
                        this.getInformation();
                    }
                }).catch(res => {
                    let information = res.text;
                    this.hint(information);
                    
                })
            },
            //验证分类名称
            namerules(event){
                console.log(event.target.value)
                if(!event.target.value){
                    let information = "请输入最少1个字最多20个字分类名称";
                    this.hint(information);
                    // event.target.focus();
                }else{
                    data_Search(this.page,this.pagesize,this.pid,event.target.value).then(res=>{
                        console.log(res)
                        if(res.data.length != 0){
                            let information = "该分类名称已存在，请重新输入";
                            this.hint(information);
                            event.target.focus();
                        }
                    })
                }
            },
            //验证数据值
            valuerules(event){
                console.log(event.target.value)
                if(!/^[0-9]+$/.test(event.target.value)){
                    let information = "请输入数字类型内容";
                    this.hint(information);
                    event.target.focus()
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
    .DIC{
        height:100%;
        
        .side_left{
            width: 15%;
            height:100%;
            float:left;
            padding-top:10px;
            border-right:1px solid #ccc;
            border-top:2px solid #ccc;
            overflow:auto;
        }
        .side_right{
            height:100%;
            width:85%;
            padding-bottom: 20px;
            float:left;
            position: relative;
            border-top:2px solid #ccc;
        }
        .classify_searchinfo{
            position: absolute;
            left:0;
            top:0;
            padding:15px 16px;
            width:100%;
            line-height: 35px;
            label{
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
            .el-form{
                .el-select{
                    .el-input{
                        width: 150px;
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
                }
            }
            .Pagination{
                margin-top:13px;
                text-align:right;
            }
        }
    }
</style>