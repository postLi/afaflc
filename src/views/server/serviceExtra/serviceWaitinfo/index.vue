<template>
    <div class="serviceArea clearfix">
        <div class="side_left">
            <el-tree
            :data="areadata"
            :props="props"
            :load="loadNode"
            lazy
            :highlight-current = "true"
            @node-click="handleNodeClick"
            @check-change="handleCheckChange">
            </el-tree>
        </div>
        <div class="side_right">
            <div class="classify_searchinfo">
                <label>服务分类&nbsp;
                    <el-select v-model="valueService" clearable placeholder="请选择">
                        <el-option
                            v-for="item in optionsService"
                            :key="item.value"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </label>
                <label>车辆类型&nbsp;
                    <el-select v-model="valueCarlist" clearable placeholder="请选择">
                        <el-option
                        v-for="item in optionsCar"
                        :key="item.value"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </label>    
                <label>状态&nbsp;
                    <el-select v-model="valueStatus" clearable placeholder="请选择">
                        <el-option
                        v-for="item in optionsStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
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
                        height="93%"
                        @row-click="clickDetails"
                        @selection-change = "getinfomation"
                        @row-dblclick="moreinfo"
                        tooltip-effect="dark"
                        style="width: 100%"> 
                        <el-table-column
                            fixed
                             type="selection"
                             width="55">
                           </el-table-column>
                        <el-table-column
                        fixed
                          prop="areaName"
                          label="区域">
                        </el-table-column>
                        <el-table-column
                          prop="serviceName"
                          label="服务分类">
                        </el-table-column>
                        <el-table-column
                          prop="carTypeName"
                          label="车辆类型">
                        </el-table-column>
                        <el-table-column
                          prop="freeTime"
                          label="免费时间(分钟)">
                        </el-table-column>
                        <el-table-column
                          prop="outstripPrice"
                          label="每间隔时长(分钟)">
                        </el-table-column>
                        <el-table-column
                          prop="areaPrice"
                          label="区域起步价">
                        </el-table-column>
                        <el-table-column
                          prop="areaOutstripPrice"
                          label="区域超里程费">
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
                
                <!-- 新增分类信息 -->
                <div class="addclassify commoncss">
                    <el-dialog :visible.sync="dialogFormVisible">
                        <div class="infoinner clearfix">
                            <div class="slot_info clearfix">
                                <div class="newarea area_left">
                                    <span class="slot_head">新增区域定价</span>
                                    <div class="area_left_server area_server">
                                        <h4><span>* </span> 选择标准服务类型</h4>
                                        <div class="eltree_search">
                                            <label>服务分类&nbsp;
                                                <el-select v-model="valueService" clearable placeholder="请选择">
                                                    <el-option
                                                        v-for="item in optionsService"
                                                        :key="item.value"
                                                        :label="item.name"
                                                        :value="item.code"
                                                        :disabled="item.disabled">
                                                    </el-option>
                                                </el-select>
                                            </label>
                                            <label>服务分类&nbsp;
                                                <el-select v-model="valueService" clearable placeholder="请选择">
                                                    <el-option
                                                        v-for="item in optionsService"
                                                        :key="item.value"
                                                        :label="item.name"
                                                        :value="item.code"
                                                        :disabled="item.disabled">
                                                    </el-option>
                                                </el-select>
                                            </label>
                                        </div>
                                        <label>
                                            <span class="control">标准起步价</span>
                                            <el-input
                                                placeholder="请输入内容"
                                                v-model="input_search"
                                                clearable>
                                            </el-input>
                                            <span>元</span>
                                            <el-input
                                                placeholder="请输入内容"
                                                v-model="input_search"
                                                clearable>
                                            </el-input>
                                            <span>公里</span>
                                        </label>
                                        <label>
                                            <span class="control">超里程费</span>         
                                            <el-input
                                                placeholder="请输入内容"
                                                v-model="input_search"
                                                clearable>
                                            </el-input>
                                            <span>元 / 公里</span>
                                        </label>       
                                    </div>
                                    
                                </div>
                                <div class="newarea area_right">
                                    <span class="slot_head">设置区域价</span>
                                     <div class="area_right_server area_server">
                                        <h4><span>* </span> 选择省市</h4>
                                        <div class="eltree_search">
                                            <el-input
                                            class="el_search"
                                            placeholder=""
                                            suffix-icon="el-icon-search"
                                            v-model="filterText">
                                            </el-input>
                                            <el-tree
                                            class="filter-tree"
                                            node-key="id"
                                            show-checkbox
                                            :data="data1"
                                            :props="defaultProps"
                                            default-expand-all
                                            :expand-on-click-node = "false"
                                            @node-click="handleNodeClick"
                                            :highlight-current = "true"
                                            :filter-node-method="filterNode"
                                            ref="tree2">
                                            </el-tree>
                                        </div>
                                        <label>
                                            <span class="control">区域起步价</span>
                                            <el-input
                                                placeholder="请输入内容"
                                                v-model="input_search"
                                                clearable>
                                            </el-input>
                                            <span>元</span>
                                            <el-input
                                                placeholder="请输入内容"
                                                v-model="input_search"
                                                clearable>
                                            </el-input>
                                            <span>公里</span>
                                        </label>
                                        <label>
                                            <span class="control">区域超里程费</span>         
                                            <el-input
                                                placeholder="请输入内容"
                                                v-model="input_search"
                                                clearable>
                                            </el-input>
                                            <span>元 / 公里</span>
                                        </label>       
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
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

import { data_Area,data_CarList,data_ServerClassList,data_GetCityList,data_GetBeginInfo,data_GetCityInfo } from '../../../../api/server/serverWaitinfo.js'
import '../../../../styles/dialog.scss'


    export default{

        data(){
            return{
                areadata:[],
                citylist:[],
                citywide:null,
                provinceId:null,
                cityId:null,
                props: {
                label: 'name',
                children: 'children'
                },
                valueService:null,
                optionsService:[
                    {
                    code:null,
                    name:'全部'
                    }
                ],
                valueCarlist:null,
                optionsCar:[
                    {
                    code:null,
                    name:'全部'
                    }
                ],
                valueStatus:null,
                optionsStatus:[
                    {
                    value:null,
                    label:'全部'
                    },
                    {
                    value: '0',
                    label: '启用'
                    },
                    {
                    value: '1',
                    label: '禁用'
                    }
                ],
                value2:'',
                filterText: '',
                    data1: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                        label: '三级 1-1-1'
                        }]
                    }]
                    }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                        label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                        label: '三级 2-2-1'
                        }]
                    }]
                    }],
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
                formlist: [{
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
                pid:null,
                pidname:null,
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
            }
        },
        mounted(){
            //...
            this.firstblood();
            //..

            // this.getMoreInformation();
        },  
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        methods: {
            //获取  服务和车辆 类型列表
            getMoreInformation(){
                data_CarList().then(res=>{
                    // console.log(res.data)
                    res.data.map((item)=>{
                        this.optionsCar.push(item);
                    })
                });
                data_ServerClassList().then(res=>{
                    // console.log(res.data)
                     res.data.map((item)=>{
                        this.optionsService.push(item);
                    })
                });
                console.log(this.optionsService,this.optionsCar)
            },
            //刷新页面
            firstblood(){
                data_Area().then(res=>{
                    this.areadata = res.data.list;
                    this.provinceId = this.areadata[0].code ;
                    this.getCommonFunction();
                })
            },
            //模糊查询 分类名称或者code
            getdata_search(event){
                this.getCommonFunction()
            },
            //查询和获取对应区域的数据
            getCommonFunction(){
                let data  = {
                    cityId: this.cityId,
                    provinceId: this.provinceId,
                    carType : this.valueCarlist,
                    serviceCode : this.valueService,
                    usingStatus: this.valueStatus
                }
                console.log(data);
                data_GetCityInfo(this.page,this.pagesize,data).then(res=>{
                    console.log(res)
                    this.tableDataTree = res.data.list;
                    this.dataTotal = res.data.totalCount;
                })
            },
            //
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            handleNodeClick(data,checked) {
                // console.log(data,checked);
                data_GetCityList(data.code).then(res=>{
                    this.citylist = res.data.list;
                })

                if(checked.level === 1){
                    this.provinceId  = data.code;
                    this.cityId = null ;
                }
                
                if(checked.level === 2){
                    this.cityId  = data.code;
                    this.provinceId = null ;
                }
                
                this.getCommonFunction();
                

            },
            loadNode(node, resolve) {
                if (Node.level === 0) {
                // 不会触发事件
                }else{
                    setTimeout(() => {
                    resolve(this.citylist);
                    }, 500);
                }
            },
            //sousuodizhi
            filterNode(value, data){
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //shuangji
            moreinfo(row, event){
                console.log(row, event)
                
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
                this.waitchange = row;
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
                    console.log(this.checkedinformation)
                    
                    this.checkedinformation.forEach((item)=>{
                        if(item.usingStatus === '1'){
                            console.log('123')
                            data_Frobidden(item.areaPid).then(res=>{
                                cosnole.log(res)
                            })
                        }
                        if(item.usingStatus === '0'){
                            console.log('321')
                            
                            data_Open(item.areaPid).then(res=>{
                                cosnole.log(res)
                            })
                        }
                    })
                    // this.getCommonFunction();
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
                        return delID.push(item.areaPid)
                    })
                    this.delID = delID;
                    this.delDialogVisible = true;
                    console.log(this.delID)
                }
            },
            //确认删除
            delDataInformation(){
                this.delDialogVisible = false;
                data_Delete(this.delID).then(res => {
                    console.log(res)
                    this.getCommonFunction();
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


            //新增分类信息获取code值
            addClassfy(){
                this.dialogFormVisible = true;

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
       .serviceArea{
        height:100%;    
        position: relative;
        margin-left:7px;
        .side_left{
            width: 10%;
            height:100%;
            float:left;
            padding-top:10px;
            border-right:1px solid #ccc;
            border-top:2px solid #ccc;
            overflow:auto;
        }
        .side_right{
            height:99%;
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
        .addclassify{
            .el-dialog{
                position: relative;
                width: 820px;
                .el-dialog__headerbtn{
                    z-index: 99;
                }
            }
            .infoinner{
                height:350px;
                .slot_info{
                    position:absolute;
                    top:0;
                    left:0;
                    width:100%;
                    border-bottom: 1px solid #d0d7e5;
                    .newarea{
                        float:left;
                        width:50%;
                        padding:0 0 0 33px;
                        .slot_head{
                            display: inline-block;
                            text-align: center;
                            width:100%;
                            height: 40px;
                            font-family: MicrosoftYaHei;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 40px;
                            letter-spacing: 0px;
                            color: #ffffff;
                        }
                        .area_server{
                            padding-top:17px;
                            padding-bottom: 14px;
                            h4{
                                span{
                                    color:red;
                                }
                                font-family: MicrosoftYaHei;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #666;
                                margin-bottom: 13px;
                            }
                            .eltree_search{
                                width: 198px;
                                height: 256px;
                                margin-bottom: 12px;
                                overflow: auto;
                                p{
                                    margin:9px 0 0 33px;
                                    font-size: 12px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    line-height: 20px;
                                    letter-spacing: 0px;
                                    color: #333333;
                                }
                                .el-radio-group{
                                    margin-left:34px;
                                    font-size: 12px;
                                    line-height: 20px;
                                    color:#333;
                                    .el-radio{
                                        margin:6px 0 0 0;
                                    }
                                }
                                .el_search{
                                    width: 100%;
                                    padding:6px 5px;
                                    .el-input__inner{
                                        height: 26px;
                                        line-height: 26px;
                                    }

                                }
                            }
                            label{
                                display: block;
                                margin-top:12px;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #666666;
                                .control{
                                    display: inline-block;
                                    text-align: right;
                                    width: 75px;
                                }
                                .el-input{
                                    width: 96px;
                                    height:24px;
                                    margin:0 6px;
                                    .el-input__inner{
                                        display: inline-block;
                                        width: 96px;
                                        height: 24px;
                                        font-size: 12px;
                                        background-color: #e6e6e6;
                                        border-radius: 2px;
                                        border: solid 1px #d4d4d4;
                                        padding:8px;
                                        color: #3e9ff1;
                                    }
                                }
                            }
                        }
                    }
                    .area_left{
                        .slot_head{
                            border-right:1px solid #fff;
                        }
                        .area_left_server{
                            border-right:1px solid #d0d7e5;
                        }
                    }

                    .area_right{
                        .area_right_server{
                            .el-tree{
                                overflow:auto;
                            }
                        }
                    }
                    
                }
            }
            .el-dialog__footer{
                padding:10px 20px;
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