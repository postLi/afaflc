<template>
    <div class="standarPrice identicalStyle clearfix">
             <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                    <el-form-item label="服务分类" prop="pointName">
                        <el-select v-model="valueService" clearable placeholder="请选择">
                            <el-option
                                v-for="item in optionsService"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code"
                                :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车辆类型" prop="orderSerial">
                        <el-select v-model="valueCarlist" clearable placeholder="请选择">
                            <el-option
                            v-for="item in optionsCar"
                            :key="item.id"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" maxlength="18"  prop="shipperName">
                        <el-select v-model="valueStatus" clearable placeholder="请选择">
                            <el-option
                            v-for="item in optionsStatus"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="btnChoose fr"  style="margin-left:0;">
                        <!-- <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')">搜索</el-button>
                        <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button> -->
                        <el-button type="primary" :size="btnsize"  plain @click="getdata_search">搜索</el-button>
                        <el-button type="info" :size="btnsize" plain >重置</el-button>
                    </el-form-item>
            </el-form>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="addClassfy">新增</el-button>
                    <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleEdit">修改</el-button>
                    <el-button type="primary" :size="btnsize" plain icon="el-icon-delete" @click="handleDelete">删除</el-button>
                    <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleUseStates">启用/禁用</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        @selection-change = "getinfomation"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                             type="selection"
                             width="55">
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
                            <template  slot-scope="scope"> 
                                <img  :src="scope.row.servicePic" />
                            </template>
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
                    <!-- <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" /></div> </div>     -->

                </div>
                
                <!-- 新增分类信息 -->
                 <div class="addclassify commoncss">
                    <el-dialog :title='formtitle'  :visible.sync="dialogFormVisible">
                        <div class="chooseinfo">
                            <div class="chooseinfo-item">
                                <p><span>* </span>选择服务分类 ：</p>
                                <el-radio-group v-model="forms.serivceCode" >
                                    <el-radio  v-for="(obj,key) in optionsServiceM" :label="obj.code" :key='key'>{{obj.name}}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="chooseinfo-item">
                                <p><span>* </span>选择车辆类型 ：</p>
                                <el-radio-group v-model="forms.carType">
                                    <el-radio   v-for="(obj,key) in optionsCarM" :label="obj.code" :key='key'>{{obj.name}}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="chooseinfo-item">
                                <p>&nbsp;&nbsp;选择车辆规格 ：</p>
                                <el-checkbox-group v-model="specList">
                                    <el-checkbox v-for="obj in optionsCarTypeM" :label="obj.code" :key="obj.name" >{{obj.name}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div class="completeinfo">
                            <div class="detailinfo">
                                <p><span>* </span>车长 ：</p>
                                <el-input
                                    placeholder="长"
                                    @blur="valuerules"
                                    maxlength="5"
                                    ref="carLength"
                                    v-model="forms.carLength"
                                    clearable>
                                </el-input>
                                <el-input
                                    placeholder="宽"
                                    maxlength="5"
                                    @blur="valuerules"
                                    ref="carWidth"
                                    v-model="forms.carWidth"
                                    clearable>
                                </el-input>
                                <el-input
                                    placeholder="高"
                                    @blur="valuerules"
                                    maxlength="5"
                                    ref="carHeight"
                                    v-model="forms.carHeight"
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
                                    @blur="valuerules"
                                    class="morewidth"
                                    maxlength="5"
                                    ref="capacityTon"
                                    v-model="forms.capacityTon"
                                    clearable>
                                </el-input>
                                <span class="dotted">吨</span>
                                <el-input
                                    @blur="valuerules"
                                    class="morewidth"   
                                    maxlength="5"
                                    ref="capacitySquare"
                                    v-model="forms.capacitySquare"
                                    clearable>
                                </el-input>
                                <span>方</span>
                            </div>
                        </div>

                        <div class="completeinfo">
                            <div class="detailinfo">
                                <p><span>* </span>标准起步价 ：</p>
                                <el-input
                                    @blur="valuerules"
                                    class="morewidth"
                                    maxlength="5"
                                    ref="standardPrice"
                                    v-model="forms.standardPrice"
                                    clearable>
                                </el-input>
                                <span class="dotted">元</span>
                                <el-input
                                    @blur="valuerules"
                                    class="morewidth"
                                    maxlength="5"
                                    ref="standardKm"
                                    v-model="forms.standardKm"
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
                                    @blur="valuerules"
                                    class="morewidth"
                                    maxlength="5"
                                    ref="outstripPrice"
                                    v-model="forms.outstripPrice"
                                    clearable>
                                </el-input>
                                <span>元/公里</span>
                            </div>
                        </div>
                        <div class="completeinfo">
                            <div class="detailinfo">
                                <p><span>* </span>上传服务图片 ：</p>
                                <upload class="licensePicture" tip="（必须为jpg/png并且小于1M）" @ifError="hint" v-model="forms.servicePic" />
                            </div>
                        </div>
                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="newInfoSave">保 存</el-button>
                        <el-button @click="closeAddNewInfo">取 消</el-button>
                      </div>
                    </el-dialog>
                </div>

                <!-- 修改分类信息 -->
                <div class="addclassify commoncss">
                    <el-dialog title='修改分类信息'  :visible.sync="dialogFormVisible_change">
                        <div class="chooseinfo">
                            <div class="chooseinfo-item">
                                <p><span>* </span>当前服务分类 ：</p>
                                <el-input
                                    v-model="changeforms.serviceName"
                                    disabled
                                    clearable>
                                </el-input>
                            </div>
                            <div class="chooseinfo-item">
                                <p><span>* </span>当前车辆类型 ：</p>
                                 <el-input
                                    v-model="changeforms.carTypeName"
                                    disabled
                                    clearable>
                                </el-input>
                            </div>
                            <div class="chooseinfo-item">
                                <p>&nbsp;&nbsp;当前车辆规格 ：</p>
                                <el-input
                                    v-model="changeforms.specName"
                                    disabled
                                    clearable>
                                </el-input>
                            </div>
                        </div>
                        <div class="completeinfo">
                            <div class="detailinfo">
                                <p><span>* </span>车长 ：</p>
                                <el-input
                                    @blur="valuerules_change"
                                    placeholder="长"
                                    v-model="changeforms.carLength"
                                    clearable>
                                </el-input>
                                <el-input
                                    @blur="valuerules_change"
                                    placeholder="宽"
                                    v-model="changeforms.carWidth"
                                    clearable>
                                </el-input>
                                <el-input
                                    @blur="valuerules_change"
                                    placeholder="高"
                                    v-model="changeforms.carHeight"
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
                                    @blur="valuerules_change"
                                    class="morewidth"
                                    v-model="changeforms.capacityTon"
                                    clearable>
                                </el-input>
                                <span class="dotted">吨</span>
                                <el-input
                                    @blur="valuerules_change"
                                    class="morewidth"                                    
                                    v-model="changeforms.capacitySquare"
                                    clearable>
                                </el-input>
                                <span>方</span>
                            </div>
                        </div>

                        <div class="completeinfo">
                            <div class="detailinfo">
                                <p><span>* </span>标准起步价 ：</p>
                                <el-input
                                    @blur="valuerules_change"
                                    class="morewidth"
                                    v-model="changeforms.standardPrice"
                                    clearable>
                                </el-input>
                                <span class="dotted">元</span>
                                <el-input
                                    @blur="valuerules_change"
                                    class="morewidth"
                                    v-model="changeforms.standardKm"
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
                                    @blur="valuerules_change"
                                    class="morewidth"
                                    v-model="changeforms.outstripPrice"
                                    clearable>
                                </el-input>
                                <span>元/公里</span>
                            </div>
                        </div>
                        <div class="completeinfo">
                            <div class="detailinfo">
                                <p><span>* </span>上传服务图片 ：</p>
                                <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="changeforms.servicePic" />
                            </div>
                        </div>
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
            
        <!-- <spinner v-show="show"></spinner>  -->
        
    </div>
</template>

<script type="text/javascript">

import { data_GetInformation,data_CarList,data_ServerClassList,data_ChangeStatus,data_DeletInfo,data_AddForms,data_NewClassfy,data_changeClassfy } from '@/api/server/standardPrice.js'
import { data_GetCarType } from '@/api/common.js'
import Upload from '@/components/Upload/singleImage'    
import Pager from '@/components/Pagination/index'
import '@/styles/dialog.scss'
// import spinner from '../../spinner/spinner'

    export default{
        data(){
            return{
                btnsize:'mini',
                forms:{
                    serivceCode:null,
                    carType:null,
                    spec:null,
                    carLength:null,
                    carWidth:null,
                    carHeight:null,
                    capacityTon:null,
                    capacitySquare:null,
                    standardPrice:null,
                    standardKm:null,
                    outstripPrice:null,
                    servicePic:'',
                },
                specList:[],
                changeforms:{},
                valueService:null,
                optionsService:[
                    {
                    code:null,
                    name:'全部'
                    }
                ],
                optionsServiceM:null,
                valueCarlist:null,
                optionsCar:[
                    {
                    code:null,
                    name:'全部'
                    }
                ],
                optionsCarM:null,
                optionsCarTypeM:null,
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
                carTypeRules: '请填写完整车长信息',
            }
        },
        components:{
            Upload,
            Pager,

        },
        mounted(){
            this.firstblood();
            this.getMoreInformation();
            // console.log(this.$store)
        },  
        methods: {
            // 获取翻页返回的数据
            handlePageChange (obj) {
                console.log(obj)
                // Object.assign(this.searchForm, obj)
                // this.fetchData()
            },
            //获取  服务和车辆 类型列表
            getMoreInformation(){
                data_CarList().then(res=>{
                    console.log(res.data)
                    res.data.map((item)=>{
                        this.optionsCar.push(item);
                    })
                    this.optionsCarM = res.data;
                });
                data_ServerClassList().then(res=>{
                    console.log(res.data)
                     res.data.map((item)=>{
                         this.optionsService.push(item);
                    })
                    this.optionsServiceM = res.data;
                    
                });
                data_GetCarType().then(res=>{
                    console.log(res.data)
                    this.optionsCarTypeM = res.data;
                })
                // console.log(this.optionsService,this.optionsCar)


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
                this.clearData();
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
                    this.changeforms  = this.checkedinformation[0];
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
            handleUse(index, row) {
                console.log(index, row);
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
                 let data  = {
                    carType : this.valueCarlist,
                    serivceCode : this.valueService,
                    usingStatus: this.valueStatus
                }
                console.log(data)
                data_GetInformation(this.page,this.pagesize,data).then(res=>{
                    this.dataTotal = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                    this.tableDataTree.map((item)=>{
                        item.carTypeClass = item.carLength +'*'+item.carWidth+'*'+item.carHeight+'M';
                        item.capacityTonM = item.capacityTon + '吨,'+' '+item.capacitySquare+'方';
                        item.standardPriceM = item.standardPrice+'元 '+' '+'('+item.standardKm+'公里)';
                        item.outstripPriceM = item.outstripPrice + '元/公里';
                    })
                    console.log(this.tableDataTree)
                })
            },
           
            //模糊查询 分类名称或者code
            getdata_search(event){
                console.log(event)
                this.firstblood();
            },
            //新增分类信息
            addClassfy(){
                this.dialogFormVisible = true;

            },
            //保存信息
            newInfoSave(){
                this.forms.spec = this.specList.join(',');
                if(!this.forms.serivceCode){
                    let information = "请选择服务类型";
                    this.hint(information);
                }
                else if(!this.forms.carType){
                    let information = "请选择车辆类型";
                    this.hint(information);
                } 
                else if(!this.forms.carLength){
                    let information = "请填写完整车长信息";
                    this.hint(information);
                    this.$refs.carLength.focus();
                }
                else if(!this.forms.carWidth){
                    let information = "请填写完整车长信息";
                    this.hint(information);
                    this.$refs.carWidth.focus();
                }
                else if(!this.forms.carHeight){
                    let information = "请填写完整车长信息";
                    this.hint(information);
                    this.$refs.carHeight.focus();
                }
                else if(!this.forms.capacityTon){
                    let information = "请填写负载量";
                    this.hint(information);
                    this.$refs.capacityTon.focus();
                }
                 else if(!this.forms.capacitySquare){
                    let information = "请填写负载量";
                    this.hint(information);
                    this.$refs.capacitySquare.focus();
                }
                else if(!this.forms.standardPrice){
                    let information = "请填写标准起步价";
                    this.hint(information);
                    this.$refs.standardPrice.focus();
                }
                else if(!this.forms.standardKm){
                    let information = "请填写标准起步价";
                    this.hint(information);
                    this.$refs.standardKm.focus();
                }
                else if(!this.forms.outstripPrice){
                    let information = "请填写标准里程费";
                    this.hint(information);
                    this.$refs.outstripPrice.focus();
                }
                else if(!this.forms.servicePic){
                    let information = "请上传服务图片";
                    this.hint(information);
                }
                else(
                    data_NewClassfy(this.forms).then(res=>{
                        // console.log(res)
                        this.firstblood();
                        this.dialogFormVisible = false;
                        this.clearData();
                    })
                )
            },

            //清空数据
            clearData(){
                this.forms={
                            serivceCode:null,
                            carType:null,
                            spec:null,
                            carLength:null,
                            carWidth:null,
                            carHeight:null,
                            capacityTon:null,
                            capacitySquare:null,
                            standardPrice:null,
                            standardKm:null,
                            outstripPrice:null,
                            servicePic:'',
                        };
            },
            //修改保存
            changeInfoSave(){
                console.log(this.changeform)
                data_changeClassfy(this.changeforms).then(res=>{
                    this.firstblood();
                    this.dialogFormVisible_change = false;
                })  
            },
            //验证数据值
            valuerules(event){
                if(!event.target.value){
                    return 
                }else{
                    if(!/^[0-9\.]+$/.test(event.target.value)){
                        let information = "请输入数字类型内容";
                        this.hint(information);
                        for(let item in this.forms){
                            if(this.forms[item] == event.target.value){
                                this.forms[item] = null;
                            }
                        }
                        // event.target.focus()
                    }
                }
            },
            valuerules_change(event){
                if(!event.target.value){
                    return 
                }else{
                    if(!/^[0-9\.]+$/.test(event.target.value)){
                        let information = "请输入数字类型内容";
                        this.hint(information);
                        for(let item in this.changeforms){
                            if(this.changeforms[item] == event.target.value){
                                this.changeforms[item] = null;
                            }
                        }
                        // event.target.focus()
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
    .standarPrice{
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
                                .el-radio{
                                    margin: 5px 20px 5px 0px; 
                                }
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
    }
</style>