<template>
    <div class="DIC clearfix">
        <div class="side_left">
            <el-tree
              :data="treeData"
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
                           <el-option :label="pidname" :value="pid" v-if="pidname != null && pidname!= undefined && pidname !='无'"></el-option>
                           <el-option label="无" value=''></el-option>
                         </el-select>
                       </el-form-item>
                         <div  v-for="(form,idx) in forms"> 
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
                        <el-button @click="dialogFormVisible_change = false">取 消</el-button>
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

import { data_Dic,data_Trees,data_Search,data_CreatCode,data_AddForms,data_Delet,data_ChangeForms,data_CreatCode_top } from '../../../api/company/data_dic.js'
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
                waitchange:{},
                delID:[],
                delIDTree:'',
                checkedinformation:[],
                formLabelWidth: '80px',
                input_search: null,
                tableDataTree:[],
                treeData:[],
                defaultProps: {
                  children: 'children',
                  label: 'label'
                },
                rules: {
                    dev: [
                        { required: true, message: '请输入手机号码', trigger: 'change' },
                    ]
                }
            }
        },
        mounted(){
            // this.getdata_dic();
            this.firstblood()
        },  
        methods: {
            //shuangji
            moreinfo(row, event){
                console.log(row, event)
                data_Trees(this.page,this.pagesize,row.id).then(res =>{
                    console.log(res)
                    if(res.status == 200 && res.data.list){
                        let num = 0;
                        res.data.list.forEach(function(item){
                            num++;
                            if(item.pid == null){
                                item.uplabel = '无';
                            }else{
                                item.uplabel = name;
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
                        this.dataTotal= num;
                        console.log(this.pidname)
                    }else{
                        return
                    }
                })
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
                this.waitchange = row;
                if(row.status == "启用"){
                    this.dataStatus = false;
                }
                if(row.status == "禁用"){
                    this.dataStatus = true;
                }
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
                console.log(idx)
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

                }else{
                    console.log(this.checkedinformation)
                    this.dialogFormVisible_change = true;
                    this.changeform.id = this.checkedinformation[0].id;
                    this.changeform.pid = this.checkedinformation[0].pid;
                    this.changeform.code = this.checkedinformation[0].code;
                    this.changeform.name = this.checkedinformation[0].name;
                    this.changeform.value = this.checkedinformation[0].value;
                    this.changeform.remark = this.checkedinformation[0].remark;
                }
            },
            // 禁用/启用
            handleUseStates(){
                if(this.checkedinformation.length === 0){
                    //未选择任何修改内容的提示
                    let information = "未选中任何更改状态内容";
                    this.hint(information);
                }else{
                    let statusform = {
                        id:this.checkedinformation.id,
                        status:this.dataStatus
                    }
                    // console.log(statusform)
                    data_ChangeForms(statusform).then( res=>{
                        if(res.status == 200){
                           console.log(res)
                           this.getdata_dic();
                        }
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
                    let isMore = false;
                    this.checkedinformation.map((item)=>{
                        if(item.isDefault == '是'){
                            isOK = false;
                        }
                        // data_Trees(this.page,this.pagesize,item.id).then(res =>{
                        //     console.log(res.data)
                        //     if(res.data.list){
                        //         console.log('321')
                        //         isMore = true;
                        //         console.log(isMore)
                        //         return isMore
                        //     }else{
                        //         console.log('123')
                        //     }
                        // })
                        return delID.push(item.id)
                    })
                    console.log(isOK,isMore)
                    if(!isOK){
                        let information = "存在初始化数据不能删除";
                        this.hint(information);
                    }else{
                        this.delDialogVisible = true;
                        this.delID = delID;
                    }
                    console.log(this.delID)
                }
            },
            //确认删除
            delDataInformation(){
                this.delDialogVisible = false;
                data_Delet(this.delID).then(res => {
                    if(res.status == 200){
                      this.getdata_dic();
                    }
                }).catch(res=>{
                    let information = res.text;
                    this.hint(information);
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
            handleNodeClick(data,checked){  
                console.log(data)
                this.pid = data.id;
                this.pidname = data.label;
                this.forms[0].pid = this.pid;
                this.delIDTree = data.id;
                data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                    console.log(res)
                    if( res.data.list){
                        res.data.list.forEach(function(item){
                            if(checked.data.pid){
                                item.uplabel = checked.data.label;
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
                })
            },
            //刷新页面
            firstblood(){
                 data_Dic().then(res =>{ 
                     console.log(res)
                    if(res.status == 200 && res.data.length !=0){
                        this.treeData = res.data;
                        this.pid = null;
                        this.pidname = '无';
                        data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                            console.log(666)
                            console.log(res)
                            if(res.status == 200 && res.data.list){
                                let num = 0;
                                res.data.list.forEach(function(item){
                                    num++;
                                    if(item.pid == null){
                                        item.uplabel = '无';
                                    }else{
                                        item.uplabel = name;
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
                                this.dataTotal= num;
                                console.log(this.pidname)
                            }else{
                               return
                            }
                        })
                    }else{
                        console.log('000')
                    }
                })
            },
            //进入数据字典页面获取和刷新数据
            getdata_dic(){
                data_Dic().then(res =>{ 
                    if(res.status == 200 && res.data.length !=0){
                        this.treeData = res.data;
                        if(res.data[0].pid == null){
                            this.pid = res.data[0].id;
                        }else{
                            this.pid = res.data[0].pid;
                        }
                        this.pidname = res.data[0].label;
                        this.forms[0].pid = this.pid;
                        let name = this.pidname;
                        console.log(this.pidname)
                        data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                            console.log(res)
                            if(res.status == 200 && res.data.list){
                                let num = 0;
                                res.data.list.forEach(function(item){
                                    num++;
                                    if(item.pid == null){
                                        item.uplabel = '无';
                                    }else{
                                        item.uplabel = name;
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
                                this.dataTotal= num;
                                console.log(this.pidname)
                            }else{
                               return
                            }
                        })
                    }else{
                        console.log('000')
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
            //新增分类信息获取code值
            addClassfy(){
                this.dialogFormVisible = true;
                data_CreatCode(this.pid).then(res => {
                    if(res.status == 200){
                        this.forms[0].code = res.data;
                        this.nowcode = res.data;
                    }
                })
            },
            //添加最高层获取code
            currentValue(val){
                console.log(val)
                if(val == ''){
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
                        if(res.status == 200){
                            this.forms[0].code = res.data;
                            this.nowcode = res.data;
                        }
                    })
                }
            },
            //保存信息
            newInfoSave(){
                if(this.forms[0].pid){
                    data_AddForms(this.forms).then(res=>{
                        if(res.status == 200){
                            this.dialogFormVisible = false;
                            this.getdata_dic();
                        }
                    })
                }else{
                    this.forms.map((item)=>{
                        item.pid = null;
                    })
                    data_AddForms(this.forms).then(res=>{
                        if(res.status == 200){
                            this.dialogFormVisible = false;
                            this.getdata_dic();
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
                        this.getdata_dic();
                    }
                })
            },
            //验证分类名称
            namerules(event){
                console.log(event.target.value)
                if(!event.target.value){
                    let information = "请输入最少1个字最多20个字分类名称";
                    this.hint(information);
                    event.target.focus();
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
            width: 10%;
            height:100%;
            float:left;
            padding-top:10px;
            border-right:1px solid #ccc;
            border-top:2px solid #ccc;
        }
        .side_right{
            height:100%;
            width:90%;
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
                height:100%;
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