<template>
    <div class="serviceOrder clearfix">
        <!-- <div class="side_left"> -->
            <!-- <el-tree
              :data="data1"
              node-key="id"
              :highlight-current = "true"
              :expand-on-click-node = "false"
              @node-click="handleNodeClick"
              default-expand-all
              :default-checked-keys="[]"
              :props="defaultProps">
            </el-tree> -->
        <!-- </div> -->
        <!-- <div class="side_right"> -->
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
                    <el-button type="primary" plain icon="el-icon-bell" @click="handleUseStates">启用/禁用</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        height="93%"
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
                          prop="serviceName"
                          label="服务分类">
                        </el-table-column>
                        <el-table-column
                          prop="carTypeName"
                          label="车辆类型">
                        </el-table-column>
                        <el-table-column
                          prop="specName"
                          label="车辆规格">
                        </el-table-column>
                        <el-table-column
                          prop="carTypeClass"
                          label="车长">
                        </el-table-column>
                        <el-table-column
                          prop="capacityTonM"
                          label="负载量">
                        </el-table-column>
                        <el-table-column
                          prop="standardPriceM"
                          label="标准起步价">
                        </el-table-column>
                        <el-table-column
                          prop="outstripPriceM"
                          label="标准超里程费">
                        </el-table-column>
                        <el-table-column
                          prop="servicePic"
                          label="服务图片">
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
                    <el-dialog :title='formtitle'  :visible.sync="dialogFormVisible">
                        <div class="chooseinfo">
                            <div class="chooseinfo-item">
                                <p><span>* </span>选择服务分类 ：</p>
                                <el-radio-group v-model="radio2" >
                                    <el-radio  v-for="(obj,key) in optionsServiceM" :label="obj" :key='key'></el-radio>
                                </el-radio-group>
                            </div>
                            <div class="chooseinfo-item">
                                <p><span>* </span>选择车辆类型 ：</p>
                                <el-radio-group v-model="radio2">
                                    <el-radio   v-for="(obj,key) in optionsServiceM" :label="obj" :key='key'></el-radio>
                                </el-radio-group>
                            </div>
                            <div class="chooseinfo-item">
                                <p>&nbsp;&nbsp;选择车辆规格 ：</p>
                                <el-radio-group v-model="radio2" >
                                    <el-radio  v-for="(obj,key) in formclassfy" :label="obj" :key='key'></el-radio >
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="completeinfo">
                            <div class="detailinfo">
                                <p><span>* </span>车长 ：</p>
                                <el-input
                                    placeholder="长"
                                    v-model="input_search"
                                    clearable>
                                </el-input>
                                <el-input
                                    placeholder="宽"
                                    v-model="input_search"
                                    clearable>
                                </el-input>
                                <el-input
                                    placeholder="高"
                                    v-model="input_search"
                                    clearable>
                                </el-input>
                                <span class="node">米</span>
                                <span class="remarks">(例如：长/宽/高 1.8*1.3*.1.2米)</span>
                            </div>
                        </div>

                        <div class="completeinfo">
                            <div class="detailinfo">
                                <p><span>* </span>负载量 ：</p>
                                <el-input
                                    class="morewidth"
                                    placeholder="长"
                                    v-model="input_search"
                                    clearable>
                                </el-input>
                                <span class="dotted">吨</span>
                                <el-input
                                    class="morewidth"                                    
                                    placeholder="高"
                                    v-model="input_search"
                                    clearable>
                                </el-input>
                                <span>方</span>
                            </div>
                        </div>

                        <div class="completeinfo">
                            <div class="detailinfo">
                                <p><span>* </span>标准起步价 ：</p>
                                <el-input
                                    class="morewidth"
                                    placeholder="长"
                                    v-model="input_search"
                                    clearable>
                                </el-input>
                                <span class="dotted">元</span>
                                <el-input
                                    class="morewidth"
                                    placeholder="宽"
                                    v-model="input_search"
                                    clearable>
                                </el-input>
                                <span class="node">公里</span>
                                <span class="remarks">(例如：16元/3公里)</span>
                            </div>
                        </div>
                        <div class="completeinfo">
                            <div class="detailinfo">
                                <p><span>* </span>标准超里程费 ：</p>
                                <el-input
                                    class="morewidth"
                                    placeholder="长"
                                    v-model="input_search"
                                    clearable>
                                </el-input>
                                <span>元/公里</span>
                            </div>
                        </div>
                        <div class="completeinfo">
                            <div class="detailinfo">
                                <p><span>* </span>上传服务图片 ：</p>
                                <upload class="licensePicture" tip="（有年检章，jpg/png。小于5M）" v-model="form.licensePicture" />
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
        <!-- </div> -->
        <!-- loading   -->
        <!-- <spinner v-show="show"></spinner>  -->
        
    </div>
</template>

<script type="text/javascript">

import { data_GetInformation,data_CarList,data_ServerClassList,data_ChangeStatus,data_DeletInfo,data_AddForms } from '../../../api/server/standardPrice.js'
import Upload from '@/components/Upload/singleImage'
import '../../../styles/dialog.scss'
import spinner from '../../spinner/spinner'


    export default{

        data(){
            return{
                    formclassfy:['同城','零担','省级'],
                    radio2:'',
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
                    value: '1',
                    label: '启用'
                    },
                    {
                    value: '0',
                    label: '禁用'
                    }
                ],
                value2:null,
                pid:null,
                pidname:null,
                labelName:null,
                page:1,
                pagesize:20,
                formtitle:'新增定价',
                currentPage4:1,
                dialogFormVisible: false,
                dialogFormVisible_change:false,
                centerDialogVisible:false,
                delDialogVisible:false,
                nowcode:null,
                dataTotal:null,
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
        components:{
            spinner,
            Upload,

        },
        mounted(){
            // this.getdata_dic();
            this.firstblood();
            this.getMoreInformation();
        },  
        methods: {
            //获取  服务和车辆 类型列表
            getMoreInformation(){
                data_CarList().then(res=>{
                    console.log(res.data)
                    res.data.map((item)=>{
                        this.optionsCar.push(item);
                    })
                });
                data_ServerClassList().then(res=>{
                    console.log(res.data)
                     res.data.map((item)=>{
                        this.optionsService.push(item);
                    })
                });
                console.log(this.optionsService,this.optionsCar)
            },
            //shuangji
            moreinfo(row, event){
                console.log(row, event)
               
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
                    let statusID = [];
                    this.checkedinformation.map((item)=>{
                        return statusID.push(item.standardPid)
                    })
                    data_ChangeStatus(statusID).then(res=>{
                        console.log(res)
                        this.firstblood();
                        // this.getCommonFunction();

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
                   
                    return delID.push(item.id)
                    
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
            },
            //刷新页面  
            firstblood(){
                data_GetInformation(this.page,this.pagesize).then(res=>{
                    this.dataTotal = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                    this.tableDataTree.map((item)=>{
                        item.carTypeClass = item.carLength +'*'+item.carWidth+'*'+item.carHeight+'M';
                        item.capacityTonM = item.capacityTon + '吨,'+' '+item.capacitySquare+'方';
                        item.standardPriceM = item.standardPrice+'元 '+' '+'('+item.standardKm+'公里)';
                        item.outstripPriceM = item.outstripPrice + '元/公里';
                    })
                    // this.tableDataTree[carTypeClass] = carLength +'*'+carWidth+'*'+carHeight+'M'
                    console.log(this.tableDataTree)
                })
            },
           
            //模糊查询 分类名称或者code
            getdata_search(event){
                console.log(event)
                
            },
            //新增分类信息获取code值
            addClassfy(){
                this.dialogFormVisible = true;
               
            },
            //保存信息
            newInfoSave(){
        
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
    .serviceOrder{
        height:100%;    
        position: relative;
        margin-left:7px;
        // .side_left{
        //     width: 10%;
        //     height:100%;
        //     float:left;
        //     padding-top:10px;
        //     border-right:1px solid #ccc;
        //     border-top:2px solid #ccc;
        // }
        // .side_right{
        //     height:100%;
        //     width:90%;
        //     padding-bottom: 20px;
        //     float:left;
        //     position: relative;
        //     border-top:2px solid #ccc;
        // }
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
                            .el-radio-group{
                                display: inline-block;
                                margin:0 9px;
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
                                    color: #999999;
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
                            .upload-demo{
                                    display: inline-block;
                                    width: 180px;
                                    height: 116px;

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
                }
            }
            .Pagination{
                margin-top:13px;
                text-align:right;
            }
        }
    }
</style>