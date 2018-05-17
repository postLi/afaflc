<template>
    <div class="DIC clearfix">
        <div class="side_left">
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="id"
              :highlight-current = "true"
              :expand-on-click-node = "false"
              @node-click="handleNodeClick"
              default-expand-all
              :default-checked-keys="[]"
              :props="defaultProps">
            </el-tree>
        </div>
        <div class="side_right">
            <div class="classify_searchinfo">
                <label>关键词查询：
                    <el-input
                      placeholder="请输入内容"
                      v-model="input_search"
                      clearable>
                    </el-input>
                </label>    
                <el-button type="info" plain @click="getdata_search">查询</el-button>
            </div>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain @click="addClassfy">新增</el-button>
                    <el-button type="primary" plain @click="handleEdit">修改</el-button>
                    <el-button type="primary" plain @click="handleDelete">删除</el-button>
                    <el-button type="primary" plain @click="handleUseStates">启用/禁用</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                             type="selection"
                             width="55">
                           </el-table-column>
                        <el-table-column
                          prop="name"
                          label="分类名称">
                        </el-table-column>
                        <el-table-column
                          prop="uplabel"
                          label="上级分类">
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
                        </el-table-column>
                        <el-table-column
                          prop="remark"
                          label="描述">
                        </el-table-column>
                        <el-table-column
                          prop="isDefault"
                          label="是否初始值">
                        </el-table-column>
                      </el-table>
                </div>
                <!-- 页码 -->
                <div class="Pagination ">
                    <div class="block">
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="currentPage4"
                          :page-sizes="[100, 200, 300, 400]"
                          :page-size="100"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="400">
                        </el-pagination>
                      </div>
                </div>
                <!-- 新增分类信息 -->
                <div class="addclassify commoncss">
                    <el-dialog :title='formtitle'  :visible.sync="dialogFormVisible">
                      <el-form>
                        <el-form-item label="上级分类" :label-width="formLabelWidth">
                         <el-select v-model="forms[0].pid" >
                           <el-option :label="pidname" :value="pid" selected></el-option>
                           <el-option label="无" value={null}></el-option>
                         </el-select>
                       </el-form-item>
                         <div  v-for="form in forms">
                            <el-form-item label="编码" :label-width="formLabelWidth">
                              <el-input v-model="form.code" auto-complete="off" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="分类名称" :label-width="formLabelWidth">
                              <el-input v-model="form.name" auto-complete="off" placeholder="最多100个字符，必填"></el-input>
                            </el-form-item>
                            <el-form-item label="数据值" :label-width="formLabelWidth">
                              <el-input v-model="form.value" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="描述" :label-width="formLabelWidth">
                              <el-input v-model="form.remark" auto-complete="off"></el-input>
                            </el-form-item>
                        </div>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                      
                        <el-button type="primary" @click="addItem">+</el-button>

                        <el-button type="primary" @click="newInfoSave">保 存</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
                            <el-form-item label="分类名称" :label-width="formLabelWidth">
                              <el-input v-model="changeform.name" auto-complete="off" ></el-input>
                            </el-form-item>
                            <el-form-item label="数据值" :label-width="formLabelWidth">
                              <el-input v-model="changeform.value" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="描述" :label-width="formLabelWidth">
                              <el-input v-model="changeform.remark" auto-complete="off"></el-input>
                            </el-form-item>
                       </div>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="changeInfoSave">保 存</el-button>
                        <el-button @click="dialogFormVisible_change = false">取 消</el-button>
                      </div>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">

import { data_Dic,data_Trees,data_Search,data_CreatCode,data_AddForms,data_Delet,data_ChangeForms } from '../../../api/company/data_dic.js'
import '../../../styles/dialog.scss'


    export default{
        data(){

            return{
                pid:null,
                pidname:null,
                labelName:null,
                page:1,
                pagesize:20,
                formtitle:'新增分类信息',
                currentPage4: 100,
                dialogFormVisible: false,
                dialogFormVisible_change:false,
                nowcode:null,
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
                waitchange:{},
                delID:null,
                formLabelWidth: '120px',
                // rules: {
                //   name: [
                //     { required: true,validator: checkName, trigger: 'blur' },
                //     { min: 2,  message: '用户姓名最少2个字符', trigger: 'blur' },
                //     { max: 10, message: '用户姓名不可超过10个字符', trigger: 'blur' }
                //   ],
                //   phone: [
                //     { required: true,validator: checkPhone, trigger: ['blur', 'change'] },
                //   ],
                //   username: [
                //     { required: true, validator: checkUsername, trigger: ['blur', 'change'] },
                //     { min: 6,  message: '用户账号最少6个字符', trigger: 'blur' },
                //     { max: 15, message: '用户账号不可超过15个字符', trigger: 'blur' }

                //   ],
                //   password: [
                //     { validator: checkPassword, trigger: ['blur', 'change'] },
                //     { min: 6,  message: '密码最少6个字符', trigger: 'blur' },
                //     { min: 3, max: 30, message: '密码不可超过30个字符', trigger: 'blur' }

                //   ]
                // },
                value8: '',
                input_search: null,
                input10: '',
                tableDataTree:[],
                treeData:[],
                defaultProps: {
                  children: 'children',
                  label: 'label'
                }
            }
        },
        mounted(){
            this.getdata_dic();
        },
        methods: {
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
                this.waitchange = row;
                this.delID = row.id;
                if(row.status == "启用"){
                    this.dataStatus = false;
                }
                if(row.status == "禁用"){
                    this.dataStatus = true;
                }
                console.log(row)
            },
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
            //修改
            handleEdit() {
                this.dialogFormVisible_change = true;
                this.changeform.id = this.waitchange.id;
                this.changeform.pid = this.waitchange.pid;
                this.changeform.code = this.waitchange.code;
                this.changeform.name = this.waitchange.name;
                this.changeform.value = this.waitchange.value;
                this.changeform.remark = this.waitchange.remark;

            },
            // 禁用/启用
            handleUseStates(){
                let statusform = {
                    id:this.waitchange.id,
                    status:this.dataStatus
                }

                console.log(statusform)
                data_ChangeForms(statusform).then( res=>{
                    console.log(res)
                    if(res.status == 200){
                        data_Dic().then(res =>{ 
                            if(res.status == 200){
                                this.treeData = res.data;
                                data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                                    res.data.list.forEach(function(item){
                                        if(item.uplabel == undefined){
                                            item.uplabel = '无';
                                        }
                                        if(item.status == true){
                                            item.status = '启用'
                                        }
                                        if(item.status == false){
                                            item.status = '禁用'
                                        }
                                        if(item.isDefault == true){
                                            item.isDefault = '是'
                                        }
                                        if(item.isDefault == false){
                                            item.isDefault = '否'
                                        }
                                    })
                                    this.tableDataTree = res.data.list;
                                    this.pidname = res.data.list[0].name;
                                    this.dialogFormVisible = false;
                                }).catch(()=>{
                                    console.log('321')
                                })
                            }
                            // this.pid = res.data.id;
                        }).catch(()=>{
                            console.log('错误')
                        })
                    }
                })
            },
            // 删除
            handleDelete() {
                let id = this.delID;
                data_Delet(id).then(res => {
                    if(res.status == 200){
                        console.log(this)
                        data_Dic().then(res =>{ 
                            if(res.status == 200){
                                this.treeData = res.data;
                                data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                                    res.data.list.forEach(function(item){
                                        if(item.uplabel == undefined){
                                            item.uplabel = '无';
                                        }
                                        if(item.status == true){
                                            item.status = '启用'
                                        }
                                        if(item.status == false){
                                            item.status = '禁用'
                                        }
                                        if(item.isDefault == true){
                                            item.isDefault = '是'
                                        }
                                        if(item.isDefault == false){
                                            item.isDefault = '否'
                                        }
                                    })
                                    this.tableDataTree = res.data.list;
                                    this.pidname = res.data.list[0].name;
                                    console.log(res.data)
                                }).catch(()=>{
                                    console.log('321')
                                })
                            }
                            // this.pid = res.data.id;
                        }).catch(()=>{
                            console.log('错误')
                        })
                    }
                })
            },
            handleUse(index, row) {
                console.log(index, row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // 点击树节点获取对应节点id
            handleNodeClick(data,checked){  
                this.pid = data.id;
                this.pidname = data.label;
                console.log(this.pidname,checked)
                this.forms[0].pid = this.pid;
                data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                    if( res.data){
                        res.data.list.forEach(function(item){
                            if(checked.data.pid){
                                item.uplabel = checked.parent.data.label;
                            }else{
                                item.uplabel = checked.data.label;
                            }
                            if(item.status == true){
                                item.status = '启用'
                            }
                            if(item.status == false){
                                item.status = '禁用'
                            }
                            if(item.isDefault == true){
                                item.isDefault = '是'
                            }
                            if(item.isDefault == false){
                                item.isDefault = '否'
                            }
                        })
                        this.tableDataTree = res.data.list;
                    }else{
                         this.tableDataTree = [];
                    }
                }).catch(()=>{
                    console.log('树节点错误')
                })
            },
            //进入数据字典页面获取和刷新数据
            getdata_dic(){
                data_Dic().then(res =>{ 
                    if(res.status == 200){
                        console.log(res.data)
                        this.treeData = res.data;
                        this.pid = res.data[0].pid;
                        this.forms[0].pid = this.pid;
                        console.log(res.data)
                        data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                            res.data.list.forEach(function(item){
                                if(item.uplabel == undefined){
                                    item.uplabel = this.pidname;
                                }
                                if(item.status == true){
                                    item.status = '启用'
                                }
                                if(item.status == false){
                                    item.status = '禁用'
                                }
                                if(item.isDefault == true){
                                    item.isDefault = '是'
                                }
                                if(item.isDefault == false){
                                    item.isDefault = '否'
                                }
                            })
                            this.tableDataTree = res.data.list;
                            this.pidname = res.data.list[0].name;
                            console.log(res.data)
                        }).catch(()=>{
                            console.log('321')
                        })
                    }
                    // this.pid = res.data.id;
                }).catch(()=>{
                    console.log('错误')
                })
            },
            //模糊查询 分类名称或者code
            getdata_search(){
                data_Search(this.page,this.pagesize,this.pid,this.input_search).then(res=>{
                    res.data.list.forEach(function(item){
                        if(item.uplabel == undefined || !item.uplabel){
                            item.uplabel = '无';
                        }
                        if(item.status == true){
                            item.status = '启用'
                        }
                        if(item.status == false){
                            item.status = '禁用'
                        }
                        if(item.isDefault == true){
                            item.isDefault = '是'
                        }
                        if(item.isDefault == false){
                            item.isDefault = '否'
                        }
                    })
                    this.tableDataTree = res.data.list;
                })
            },
            //新增分类信息
            addClassfy(){
                this.dialogFormVisible = true;
                data_CreatCode(this.pid).then(res => {
                    if(res.status == 200){
                        this.forms[0].code = res.data;
                        this.nowcode = res.data;
                    }
                })
            },
            //保存信息
            newInfoSave(){
                // console.log(this.forms)
                data_AddForms(this.forms).then(res=>{
                    if(res.status == 200){
                        data_Dic().then(res =>{ 
                            if(res.status == 200){
                                this.treeData = res.data;
                                data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                                    res.data.list.forEach(function(item){
                                        if(item.uplabel == undefined){
                                            item.uplabel = '无';
                                        }
                                        if(item.status == true){
                                            item.status = '启用'
                                        }
                                        if(item.status == false){
                                            item.status = '禁用'
                                        }
                                        if(item.isDefault == true){
                                            item.isDefault = '是'
                                        }
                                        if(item.isDefault == false){
                                            item.isDefault = '否'
                                        }
                                    })
                                    this.tableDataTree = res.data.list;
                                    this.pidname = res.data.list[0].name;
                                    this.dialogFormVisible = false;
                                }).catch(()=>{
                                    console.log('321')
                                })
                            }
                            // this.pid = res.data.id;
                        }).catch(()=>{
                            console.log('错误')
                        })
                    }
                })
            },
            //修改保存
            changeInfoSave(){
                console.log(this.changeform)
                data_ChangeForms(this.changeform).then(res=>{
                    console.log(res)
                    if(res.status == 200){
                        data_Dic().then(res =>{ 
                            if(res.status == 200){
                                this.treeData = res.data;
                                data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                                    res.data.list.forEach(function(item){
                                        if(item.uplabel == undefined){
                                            item.uplabel = '无';
                                        }
                                        if(item.status == true){
                                            item.status = '启用'
                                        }
                                        if(item.status == false){
                                            item.status = '禁用'
                                        }
                                        if(item.isDefault == true){
                                            item.isDefault = '是'
                                        }
                                        if(item.isDefault == false){
                                            item.isDefault = '否'
                                        }
                                    })
                                    this.tableDataTree = res.data.list;
                                    this.pidname = res.data.list[0].name;
                                    this.dialogFormVisible_change = false;

                                }).catch(()=>{
                                    console.log('321')
                                })
                            }
                            // this.pid = res.data.id;
                        }).catch(()=>{
                            console.log('错误')
                        })
                    }
                })
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
        }
        .side_right{
            height:100%;
            width:85%;
            float:left;
            padding-top:18px;
        }
        .classify_searchinfo{
            padding:10px 30px;
            border-bottom:1px solid #ccc;
            label{
                margin-right:50px;
                .el-input{
                    width:300px;
                }
            }
        }
        .classify_info{
            padding:10px 50px 10px 30px;
            .btns_box{
                margin-bottom:20px;
                .el-button{
                    margin-right:20px;
                }
            }
            .info_news{
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
                margin-top:20px;
                text-align:right;
            }
        }
    }
</style>