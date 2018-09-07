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
                            :key="item.id"
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
                        :key="item.id"
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
                        :key="item.id"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </label>        
                <el-button type="primary"  plain @click="getdata_search">查询</el-button>
                <el-button type="info" plain >清空</el-button>

            </div>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain icon="el-icon-circle-plus" @click="addClassfy">新增</el-button>
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
                          prop="intervalTime"
                          label="每间隔时长(分钟)">
                        </el-table-column>
                        <el-table-column
                          prop="timeOutstripPrice"
                          label="超时费用(元)">
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
                <div class="waitAdd commoncss">
                    <el-dialog title='新增等待费用'  :visible.sync="dialogFormVisible" :before-close = "beforClose">
                        <div class="newWait">
                            <div class="clearfix">
                                <div class="chooseAera chooseCommon fl">
                                    <h4><span>* </span> 选择省市</h4>
                                    <div class="eltree_search lesscommon">
                                        <el-input
                                        class="el_search"
                                        placeholder=""
                                        suffix-icon="el-icon-search"
                                        v-model="filterText">
                                        </el-input>
                                        <el-tree
                                        :props="propsAdd"
                                        show-checkbox
                                        node-key="code"
                                        ref = 'trees'
                                        lazy
                                        :load="loadNodeMore"
                                        :highlight-current = "true"
                                        @node-expand="handleNodeClickMore"
                                        :filter-node-method="filterNode">
                                        </el-tree>
                                    </div>
                                    <div class="infowrite">
                                        <p><span>* </span>免费</p>
                                        <el-input  
                                           @blur="valuerules"
                                            placeholder="请输入内容"
                                            v-model="freeTime"
                                            ref="freetime"
                                            clearable>
                                            <template slot="append">小时</template>
                                        </el-input>
                                    </div>
                                </div>
                                <div class="chooseServer chooseCommon fl">
                                    <h4><span>* </span> 选择服务分类</h4>
                                    <div class="lesscommon">
                                        <el-checkbox-group v-model="serverCheckList">
                                            <el-checkbox v-for="item in optionsServiceNew" :label="item.code" :key="item.id" >{{item.name}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                    <div class="infowrite">
                                        <p><span>* </span>每间隔</p>
                                        <el-input  
                                            @blur="valuerules"
                                            placeholder="请输入内容"
                                            v-model="intervalTime"
                                            ref="intervaltime"
                                            clearable>
                                            <template slot="append">分钟</template>
                                        </el-input>
                                    </div>
                                </div>
                                <div class="chooseCar chooseCommon fr">
                                    <h4><span>* </span> 选择车辆类型</h4>
                                    <div class="lesscommon ">
                                        <el-checkbox-group v-model="carCheckList">

                                            <el-checkbox v-for="item in optionsCarNew" :label="item.code" :key="item.id">{{item.name}}</el-checkbox>
                                            
                                        </el-checkbox-group>
                                    </div>
                                    <div class="infowrite">
                                        <p><span>* </span>超时费用</p>
                                        <el-input  
                                            @blur="valuerules"
                                            placeholder="请输入内容"
                                            v-model="timeOutstripPrice"
                                            ref="timeoutstripprice"
                                            clearable>
                                            <template slot="append">元</template>
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="additional ">
                                <p>{{remarkinfo}}</p>
                                <p>费用说明</p>
                                <el-input
                                    placeholder="少于500字符"
                                    type="textarea"
                                    :rows="2"
                                    maxlength="500"
                                    clearable
                                    v-model="waitPriceDes">
                                </el-input>
                            </div>
                        </div>
                        <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="newInfoSave">保 存</el-button>
                        <el-button @click="closeAddNewInfo"  @mouseover.native="setCanClose" @mouseout.native="canclose=false">取 消</el-button>
                        </div>
                    </el-dialog>
                </div>

                <!-- 修改分类信息 -->
                <div class="changeclassify commoncss" :before-close = "beforClose">
                    <el-dialog title='修改分类信息'  :visible.sync="dialogFormVisible_change">
                        <div class="changeWait">
                            <div class="changeifno">
                                <h4><span>* </span>当前城市</h4>
                                 <el-input
                                    v-model="changeforms.areaName"
                                    disabled
                                    clearable>
                                </el-input>
                            </div>
                            <div class="changeifno serverClass">
                                <h4><span>* </span> 当前服务分类</h4>
                                <el-input
                                    v-model="changeforms.serviceName"
                                    disabled
                                    clearable>
                                </el-input>
                            </div>
                            <div class="changeifno carTypeClass">
                                <h4><span>* </span> 当前车辆类型</h4>
                                <el-input
                                    v-model="changeforms.carTypeName"
                                    disabled
                                    clearable>
                                </el-input>
                            </div>
                            <br/>
                            <div class="infowrite">
                                <p><span>* </span>免费</p>
                                <el-input  
                                    @blur="valuerules"
                                    placeholder="请输入内容"
                                    v-model="changeforms.freeTime"
                                    clearable>
                                    <template slot="append">小时</template>
                                </el-input>
                            </div>
                            <div class="infowrite">
                                <p><span>* </span>每间隔</p>
                                <el-input  
                                    @blur="valuerules"
                                    placeholder="请输入内容"
                                    v-model="changeforms.intervalTime"
                                    clearable>
                                    <template slot="append">分钟</template>
                                </el-input>
                            </div>
                            <div class="infowrite">
                                <p><span>* </span>超时费用</p>
                                <el-input  
                                    @blur="valuerules"
                                    placeholder="请输入内容"
                                    v-model="changeforms.timeOutstripPrice"
                                    clearable>
                                    <template slot="append">元</template>
                                </el-input>
                            </div>
                            <div class="additional ">
                                <p>{{remarkinfo}}</p>
                                <p>费用说明</p>
                                 <el-input
                                    placeholder="少于500字符"
                                    type="textarea"
                                    :rows="8"
                                    maxlength="500"
                                    clearable
                                    v-model="changeforms.waitPriceDes">
                                </el-input>
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
        </div>
        <!-- <spinner v-show="show"></spinner>  -->
    </div>
</template>

<script type="text/javascript">

import { data_Area,data_CarList,data_ServerClassList,data_GetCityList,data_GetBeginInfo,data_GetCityInfo,data_ChangeStatus,data_DeletInfo,data_NewOrChange } from '@/api/server/serverWaitinfo.js'
import '@/styles/dialog.scss'
// import spinner from '../../../spinner/spinner'
import { REGEX }  from '@/utils/validate'


    export default{

        data(){
            return{
                canclose: false,
                cacheData: {},
                catchData:{},
                show:false,//遮罩层
                areadata:[],//树结构数据
                newAreaData:[],//新增界面树结构数据
                newCityList:[],
                citylist:[],
                provinceId:null,
                cityId:null,
                chooseAllKeys:[],
                freeTime:null,
                intervalTime:null,
                timeOutstripPrice:null,
                waitPriceDes:null,
                newWaitInfo:{},
                props: {
                    label: 'name',
                    children: 'children'
                },
                propsAdd: {
                    label: 'name',
                    children: 'children'
                },
                serverCheckList:[],
                carCheckList:[],
                carBoxs:[],
                valueService:null,
                optionsServiceNew:null,
                optionsService:[
                    {
                    code:null,
                    name:'全部'
                    }
                ],
                valueCarlist:null,
                optionsCarNew:null,
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
                filterText: '',
                page:1,
                pagesize:20,
                remarkinfo:'例：免费0.25小时，每15分钟加收5元，不足15分钟按15分钟计价',
                formtitle:'新增分类信息',
                currentPage4: 1,
                dialogFormVisible: false,
                dialogFormVisible_change:false,
                centerDialogVisible:false,
                delDialogVisible:false,
                dataTotal:0,
                changeforms:{},
                information:'你想知道什么',
                delID:[],
                checkedinformation:[],
                tableDataTree:[],
                treeData:[],
                defaultProps: {
                  children: 'children',
                  label: 'label'
                },
            }
        },
        components:{

        },
        mounted(){
            //...初始化获取数据
            this.firstblood();
            this.getMoreInformation();
            
        },  
        watch: {
            filterText(val) {
                this.$refs.trees.filter(val);
            }
        },
        methods: {
             //关闭前事件
            beforClose(done){
                // console.log(done)
                this.setCanClose();
                done()
            },
            setCanClose(){
                this.canclose = true;
                console.log(this.canclose)
            },
            //获取  服务和车辆 类型列表
            getMoreInformation(){
                data_CarList().then(res=>{
                    // console.log(res.data)

                    res.data.map((item)=>{
                        this.optionsCar.push(item);
                    })
                    this.optionsCarNew = res.data;
                });
                data_ServerClassList().then(res=>{
                    // console.log(res.data)
                     res.data.map((item)=>{
                        this.optionsService.push(item);
                    })
                    this.optionsServiceNew = res.data;
                    
                });

                
                // console.log(this.optionsService,this.optionsCar)
            },
            //刷新页面
            firstblood(){
                this.show = true;
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
                // console.log(data);
                data_GetCityInfo(this.page,this.pagesize,data).then(res=>{
                    // console.log(res)
                    this.tableDataTree = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.show = false;
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
                    this.cacheData[data.code] = res.data.list;
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
                if (node.level === 0) {
                // 不会触发事件
                }else{
                    setTimeout(() => {
                    resolve(this.cacheData[node.data.code] || []);
                    }, 500);
                }
            },
            //弹窗Tree节点
            handleNodeClickMore(data,checked){
                console.log(data)
                data_GetCityList(data.code).then(res=>{
                    this.newCityList = res.data.list;
                    this.catchData[data.code] = res.data.list;
                    
                }).catch(res=>{
                    console.log(res)
                })
            },
            loadNodeMore(node, resolve) {
                // console.log(node)
                if (node.level === 0){
                // 不会触发事件
                    resolve([{name:'全部'}])
                }else if(node.level === 1){
                    setTimeout(() => {
                    resolve(this.areadata);
                    }, 500);
                }else if(node.level >1 ){
                    setTimeout(() => {
                    resolve(this.catchData[node.data.code] || []);
                    }, 500);
                }
                else{
                   
                }
            },
            //sousuodizhi
            filterNode(value, data){
                // console.log(value,data)
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            //shuangji
            moreinfo(row, event){
                // console.log(row, event)
                 console.log(this.$store)
                
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //新增关闭返回初始内容
            closeAddNewInfo(){
                this.getCommonFunction();
                this.dialogFormVisible = false;
                this.serverCheckList = null;
                this.carCheckList = null;
                this.waitPriceDes= null;
                this.freeTime = null ;
                this.timeOutstripPrice = null;
                this.intervalTime = null;
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
                    this.changeforms = this.checkedinformation[0];
                    if(this.checkedinformation[0].cityId){
                        this.changeforms.cityId = this.checkedinformation[0].cityId;
                    }else{
                        this.changeforms.cityId = this.checkedinformation[0].provinceId;
                    }
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
                        return statusID.push(item.waitPid)
                    })

                    data_ChangeStatus(statusID).then(res=>{
                        // console.log(res)
                        // this.firstblood();
                        this.getCommonFunction();

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
                        return delID.push(item.waitPid)
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
                    console.log(res)
                    this.getCommonFunction();
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
            //新增
            addClassfy(){
                this.dialogFormVisible = true;
                this.inited = true
                this.newAreaData = this.areadata;
            },
            //保存信息
            newInfoSave(){
                this.NewOrChange()
            },
            //新增和修改Common
            NewOrChange(){
                let data = {
                    waitPriceDes:this.waitPriceDes,
                    freeTime:this.freeTime,
                    intervalTime:this.intervalTime,
                    carType:this.carCheckList.join(','),
                    serviceCode:this.serverCheckList.join(','),
                    timeOutstripPrice:this.timeOutstripPrice,
                    cityId:this.$refs.trees.getCheckedKeys().join(',')
                };
                if(!data.cityId){
                    let information = "请选择省市";
                    this.hint(information);
                }
                else if(!data.serviceCode){
                    let information = "请选择服务类型";
                    this.hint(information);
                }
                else if(!data.carType){
                    let information = "请选择车辆类型";
                    this.hint(information);
                }
                else if(!data.freeTime){
                    let information = "请填写免费时长";
                    this.hint(information);
                }
                else if(!data.intervalTime){
                    let information = "请填写每间隔分钟数";
                    this.hint(information);
                }
                else if(!data.timeOutstripPrice){
                    let information = "请填写超时费用";
                    this.hint(information);
                }
                else if(!/^[0-9\.]+$/.test(data.freeTime)){
                    let information = "请输入整形数字";
                    this.hint(information);
                    this.$refs.freetime.focus();
                }
                else if(!/^[0-9\.]+$/.test(data.intervalTime)){
                    let information = "请输入整形数字";
                    this.hint(information);
                    this.$refs.intervaltime.focus();
                }
                else if(!/^[0-9\.]+$/.test(data.timeOutstripPrice)){
                    let information = "请输入整形数字";
                    this.hint(information);
                    this.$refs.timeoutstripprice.focus();
                }
                else(
                        data_NewOrChange(data).then(res=>{
                            console.log(res)
                            if(res.status == 200){
                                this.getCommonFunction();
                                this.dialogFormVisible = false;
                                this.serverCheckList = null;
                                this.carCheckList = null;
                                this.waitPriceDes= null;
                                this.freeTime = null ;
                                this.timeOutstripPrice = null;
                                this.intervalTime = null;
                            }
                        })
                )
            },
            //修改保存
            changeInfoSave(){
                console.log(this.changeforms)
                data_NewOrChange(this.changeforms).then(res=>{
                    console.log(res)
                    if(res.status == 200){
                        this.getCommonFunction();
                        this.dialogFormVisible_change = false;
                    }
                })
            },
            //验证数据值
            valuerules(event){
                console.log(this.canclose)
                if(!event.target.value || this.canclose){
                    return 
                }else{
                    if(!REGEX.ONLY_NUMBER.test(event.target.value)){
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
            // border-bottom:2px dashed #ccc;
            // height:70px;
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
        .waitAdd,.changeclassify{
            .el-dialog{
                position: relative;
                width: 820px;
                .el-dialog__headerbtn{
                    z-index: 99;
                }
            }
            .newWait{
                padding:0 30px;
                .chooseCommon{
                    width: 230px;
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
                        margin-bottom: 5px;
                    }
                    .lesscommon{
                        width: 230px;
                        height: 256px;
                        margin-bottom: 12px;
                        overflow: auto;
                        border:1px solid #d2d2d2;

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
                    .eltree_search{
                        .checkedAll{
                            margin-top:5px;
                            .el-checkbox__input{
                                margin-left: 24px;
                                .el-checkbox__inner{
                                    width:12px;
                                    height:12px;
                                }
                            }
                            .el-checkbox__label{
                                padding-left: 8px;
                            }
                        }
                        .el-tree{
                            .el-tree-node__content{
                                
                                .el-checkbox{
                                    margin-top:0;
                                    .el-checkbox__inner{
                                        width: 12px;
                                        height: 12px;
                                    }
                                }
                            }
                        }
                    } 
                    .infowrite{
                            p{
                                display: inline-block;
                                width:60px;
                                text-align: right;
                                font-family: MicrosoftYaHei;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #666;
                                span{
                                    color:red;
                                }
                            }
                            span{
                                font-size:12px;
                                line-height: 20px;
                                color:#666;
                            }
                            .el-input{
                                margin:0 5px;
                                width: 155px;
                                .el-input__inner{
                                    height: 24px;
                                    line-height: 24px;
                                    padding:0 7px;
                                    font-family: MicrosoftYaHei;
                                    font-size: 12px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    line-height: 20px;
                                    letter-spacing: 0px;
                                    color: #3e9ff1;
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
                .chooseServer{
                    margin: 0 30px;
                }
                .chooseServer,.chooseCar{
                    .el-checkbox{
                        margin-left:15px;
                    }
                    .el-checkbox__inner{
                        width:12px;
                        height: 12px;
                    }
                }
                .additional{
                   p:first-child{
                        padding:10px 0 10px 70px;
                        font-size: 12px;
                        line-height: 20px;
                        letter-spacing: 0px;
                        color: #999999;
                   }
                   p:nth-child(2){
                       display: inline-block;
                       width: 60px;
                       text-align: right;
                       margin-right: 5px;
                   }
                   .el-textarea{
                        vertical-align:middle; 
                        width: 680px;
                        font-size: 12px;
                        line-height: 20px;
                        vertical-align: top;
                        .el-textarea__inner{
                            color: #3e9ff1;
                        }
                   }

                }
            }
            .changeWait{
                padding:0 30px;
                .changeifno{
                    margin:10px 0;
                    h4{
                        display: inline-block;
                        width: 95px;
                        text-align: right;
                        margin-right: 10px;
                        font-family: MicrosoftYaHei;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 20px;
                        letter-spacing: 0px;
                        color: #666;
                        span{
                            color:red;
                        }

                    }
                    .el-input{
                        width: 240px;
                    }
                    .el-input__inner{
                        height: 24px;
                        line-height: 24px;
                        
                    }
                    .el-select{
                        .el-input{
                             width: 150px;
                        }
                    }
                }
                .serverClass,.carTypeClass{
                    display: inline-block;
                }
                .carTypeClass{
                    margin: 0 0 0 32px;
                }
                .infowrite{
                    display: inline-block;
                    p{
                        display: inline-block;
                        width:95px;
                        margin-right: 10px;
                        text-align: right;
                        font-family: MicrosoftYaHei;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 20px;
                        letter-spacing: 0px;
                        color: #666;
                        span{
                            color:red;
                        }
                    }

                    .el-input{
                        width: 138px;

                        .el-input__inner{
                            height: 24px;
                            line-height: 24px;
                            padding: 0 7px;
                            font-size: 12px;
                            line-height: 20px;
                            color: #3e9ff1;
                        }
                    }
                }
                .additional {
                    p:first-child{
                        padding:10px 0 10px 70px;
                        font-size: 12px;
                        line-height: 20px;
                        letter-spacing: 0px;
                        color: #999999;
                   }
                    p:nth-child(2){
                       display: inline-block;
                       width: 60px;
                       text-align: right;
                   }
                    .el-textarea{
                        vertical-align:top; 
                        width: 685px;
                        font-size: 12px;
                        line-height: 20px;
                        .el-textarea__inner{
                            color: #3e9ff1;
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
            padding:70px 13px 18px;
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