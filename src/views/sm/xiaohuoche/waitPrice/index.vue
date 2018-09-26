<template>
    <div class="waitPrice TwoColumns clearfix">
        <div class="columnsContainer">
            <div class="side_left">
                <el-tree
                :data="cityTree"
                :props="defaultProps"
                default-expand-all
                :highlight-current = "true"
                 @node-click="handleNodeClick"
                >
                </el-tree>
            </div>
            <div class="side_right">
                <searchInfo @change="getSearchParam"></searchInfo>

                <div class="side_right_bottom clearfix">
                    <div class="btns_box">
                        <!-- <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="addClassfy">新增</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleEdit">修改</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-delete" @click="handleDelete">删除</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleUseStates">启用/禁用</el-button> -->

                        <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="handleClick('add')">新增</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')">修改</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-delete" @click="handleClick('delet')">删除</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status')">启用/禁用</el-button>
                    </div>
                    <div class="info_news">
                        <el-table
                            ref="multipleTable"
                            :data="tableDataTree"
                            stripe
                            border
                            height="100%"
                            @row-click="clickDetails"
                            @selection-change = "getinfomation"
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
                            sortable
                            label="区域">
                            </el-table-column>
                            <el-table-column
                            prop="serviceName"
                            sortable
                            label="服务分类">
                            </el-table-column>
                            <el-table-column
                            prop="carTypeName"
                            sortable
                            label="车辆类型">
                            </el-table-column>
                            <el-table-column
                            prop="freeTime"
                            sortable
                            label="免费时间(分钟)">
                            </el-table-column>
                            <el-table-column
                            prop="intervalTime"
                            sortable
                            label="每间隔时长(分钟)">
                            </el-table-column>
                            <el-table-column
                            prop="timeOutstripPrice"
                            sortable
                            label="超时费用(元)">
                            </el-table-column>
                            <el-table-column
                            prop="usingStatus"
                            sortable
                            label="状态">
                            <template  slot-scope="scope">
                                    {{ scope.row.usingStatus === '1' ? '启用' : '禁用' }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                      <!-- 页码 -->
                    <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>    


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
                </div>
            </div>
        </div>
         <WaitPrice :dialogWaitPrice.sync="dialogWaitPrice" :reviseForm = 'reviseForm' :formtitle = 'formtitle' :isModify = "isModify"   @close = "shuaxin"/>
    </div>
</template>

<script type="text/javascript">

import { data_Area, data_CarList, data_ServerClassList, data_GetCityList, data_GetBeginInfo, data_GetCityInfo, data_ChangeStatus, data_DeletInfo, data_NewOrChange } from '@/api/server/serverWaitinfo.js'

import { aflcProvinceCode } from '@/api/common.js'
import '@/styles/dialog.scss'
import Pager from '@/components/Pagination/index'
import searchInfo from '../component/searchInfo'
import { objectMerge2, parseTime } from '@/utils/'
import WaitPrice from './WaitPrice'
export default{
      data() {
          return {
                loading:false,
                isModify:false,
                dialogWaitPrice:false,
                sizes: [20, 50, 100],
                btnsize: 'mini',
                reviseForm:{},
                cityTree:[],
                canclose: false,
                catchData: {},
                areadata: [], // 树结构数据
                newAreaData: [], // 新增界面树结构数据
                newCityList: [],
                citylist: [],
                provinceId: null,
                cityId: null,
                chooseAllKeys: [],
                freeTime: null,
                intervalTime: null,
                timeOutstripPrice: null,
                waitPriceDes: null,
                searchInfo: {
                    carType: '',
                    serivceCode: '',
                    usingStatus: ''
                },
                defaultProps: {
                    label: 'name',
                    children: 'children'
                },
                propsAdd: {
                    label: 'name',
                    children: 'children'
                    },
                serverCheckList: [],
                carCheckList: [],
                carBoxs: [],
                optionsServiceNew: null,
                optionsService: [
                    {
                        code: null,
                        name: '全部'
                    }
                    ],
                optionsCarNew: null,
                optionsCar: [
                    {
                        code: null,
                        name: '全部'
                    }
                    ],
                optionsStatus: [
                    {
                        value: null,
                        label: '全部'
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
                page: 1,
                pagesize: 20,
                remarkinfo: '例：免费0.25小时，每15分钟加收5元，不足15分钟按15分钟计价',
                formtitle: '',
                currentPage4: 1,
                dialogFormVisible: false,
                dialogFormVisible_change: false,
                centerDialogVisible: false,
                delDialogVisible: false,
                dataTotal: 0,
                changeforms: {},
                information: '你想知道什么',
                delID: [],
                checkedinformation: [],
                tableDataTree: [],
                treeData: [],
            }
        },
        components: {
          Pager,
          searchInfo,
          WaitPrice
        },
        mounted() {
            // ...初始化获取数据
            this.firstblood()
            this.getMoreInformation()
        },
        watch: {
          filterText(val) {
              this.$refs.trees.filter(val)
            }
        },
        methods: {
            shuaxin(){
                this.getCommonFunction();
            },
            getSearchParam(obj) {
              console.log(obj)
              this.searchInfo = Object.assign(this.searchInfo, obj)
              this.getCommonFunction()
            },
            handlePageChange(obj) {
               this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.getCommonFunction()
            },
             // 关闭前事件
            beforClose(done) {
                // console.log(done)
              this.setCanClose()
                done()
            },
            setCanClose() {
              this.canclose = true
                console.log(this.canclose)
            },
            // 获取  服务和车辆 类型列表
            getMoreInformation() {
              data_CarList().then(res => {
                    // console.log(res.data)
                  res.data.map((item) => {
                      this.optionsCar.push(item)
                    })
                  this.optionsCarNew = res.data
                })
                data_ServerClassList().then(res => {
                    // console.log(res.data)
                  res.data.map((item) => {
                       this.optionsService.push(item)
                    })
                  this.optionsServiceNew = res.data
                    
                })
            },
            handleClick(type){
                if (this.checkedinformation.length == 0 && type != 'add') {
                    // 未选择任何修改内容的提示
                   return this.$message({
                        message: '请选择要操作的数据~',
                        type: 'warning'
                    })
                } else if (this.checkedinformation.length > 1  && type == 'revise') {
                    return this.$message({
                        message: '不可同时修改多条数据~',
                        type: 'warning'
                    })
                }
                switch(type){
                    case 'add':
                        this.isModify = false;
                        this.dialogWaitPrice = true;
                        // this.dialogFormVisible = true

                        break;
                    case 'revise':
                        // this.dialogFormVisible_change = true
                        this.reviseForm =objectMerge2({},this.checkedinformation[0]);
                        this.isModify = true;
                        // this.dialogWaitPrice = true;
                        this.dialogFormVisible_change = true;
                        break;
                    case 'delet':
                        const delID = []
                        this.checkedinformation.map((item) => {
                            return delID.push(item.waitPid)
                        })
                        let config = delID.length>1 ?  delID.length + '条' : this.checkedinformation[0].areaName+'这条';
                        this.$confirm('确定要删除'+config+'数据吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                            data_DeletInfo(delID).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.getCommonFunction();
                            }).catch(err=>{
                                this.$message({
                                    type: 'info',
                                    message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                                })
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                    case 'status':
                        const statusID = []
                        this.checkedinformation.map((item) => {
                            return statusID.push(item.waitPid)
                        })
                        data_ChangeStatus(statusID).then(res=>{
                            this.getCommonFunction();
                        }).catch(err=>{
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                            })
                        })
                        break;
                }
            },
            // 刷新页面
            firstblood() {
                aflcProvinceCode().then(res => {
                    console.log('aflcProvinceCode',res)
                    this.cityTree = res.data;
                    this.provinceId = this.cityTree[0].code; 
                    this.getCommonFunction();
                })
            },
            // 查询和获取对应区域的数据
            getCommonFunction() {
              const data = Object.assign({}, { cityId: this.cityId, provinceId: this.provinceId }, this.searchInfo)
                // console.log(data);
                data_GetCityInfo(this.page, this.pagesize, data).then(res => {
                    // console.log(res)
                  this.tableDataTree = res.data.list
                    this.dataTotal = res.data.totalCount
                    this.show = false
                })
            },
            handleNodeClick(data, checked) {
              console.log(data)
                if (checked.level === 1) {
                    this.provinceId = data.code;
                    this.cityId = '' ;
                }
                if (checked.level === 2) {
                    this.cityId = data.code;
                    this.provinceId = '' ;
                }
                this.getCommonFunction()
            },
            // 弹窗Tree节点
          handleNodeClickMore(data, checked) {
              console.log(data)
              data_GetCityList(data.code).then(res => {
                  this.newCityList = res.data.list
                    this.catchData[data.code] = res.data.list
                    
                }).catch(res => {
                  console.log(res)
                })
            },
          loadNodeMore(node, resolve) {
                // console.log(node)
              if (node.level === 0) {
                // 不会触发事件
                  resolve([{ name: '全部' }])
                } else if (node.level === 1) {
                  setTimeout(() => {
                      resolve(this.areadata)
                    }, 500)
                } else if (node.level > 1) {
                  setTimeout(() => {
                      resolve(this.catchData[node.data.code] || [])
                    }, 500)
                }else {

                }
            },
            // sousuodizhi
          filterNode(value, data) {
                // console.log(value,data)
              if (!value) return true
                return data.name.indexOf(value) !== -1
            },
            // 点击选中当前行
          clickDetails(row, event, column) {
              this.$refs.multipleTable.toggleRowSelection(row)
            },
            // 新增关闭返回初始内容
          closeAddNewInfo() {
              this.getCommonFunction()
                this.dialogFormVisible = false
                this.serverCheckList = null
                this.carCheckList = null
                this.waitPriceDes = null
                this.freeTime = null 
                this.timeOutstripPrice = null
                this.intervalTime = null
            },
            // 判断是否选中
          getinfomation(selection) {
              this.checkedinformation = selection
            },
            // 修改
          handleEdit() {
              if (Object.keys(this.checkedinformation).length == 0) {
                    // 未选择任何修改内容的提示
                  const information = '未选中任何修改内容';
                  this.hint(information)
                } else if (this.checkedinformation.length > 1) {
                  const information = '不可修改多个内容';
                  this.hint(information)
                }else {
                  console.log(this.checkedinformation)
                    this.dialogFormVisible_change = true
                    this.changeforms = this.checkedinformation[0]
                    if (this.checkedinformation[0].cityId) {
                      this.changeforms.cityId = this.checkedinformation[0].cityId
                    }else {
                      this.changeforms.cityId = this.checkedinformation[0].provinceId
                    }
                }
            },
            // 新增
          addClassfy() {
              this.dialogFormVisible = true
              this.newAreaData = this.areadata
            },
            // 保存信息
          newInfoSave() {
              this.NewOrChange()
            },
            // 新增和修改Common
          NewOrChange() {
              const data = {
                  waitPriceDes: this.waitPriceDes,
                  freeTime: this.freeTime,
                  intervalTime: this.intervalTime,
                  carType: this.carCheckList.join(','),
                  serviceCode: this.serverCheckList.join(','),
                  timeOutstripPrice: this.timeOutstripPrice,
                  cityId: this.$refs.trees.getCheckedKeys().join(',')
                }
                if (!data.cityId) {
                  const information = '请选择省市';
                  this.hint(information)
                }                else if (!data.serviceCode) {
                  const information = '请选择服务类型';
                  this.hint(information)
                }                else if (!data.carType) {
                  const information = '请选择车辆类型';
                  this.hint(information)
                }                else if (!data.freeTime) {
                  const information = '请填写免费时长';
                  this.hint(information)
                }                else if (!data.intervalTime) {
                  const information = '请填写每间隔分钟数';
                  this.hint(information)
                }                else if (!data.timeOutstripPrice) {
                  const information = '请填写超时费用';
                  this.hint(information)
                }                else if (!/^[0-9\.]+$/.test(data.freeTime)) {
                  const information = '请输入整形数字';
                  this.hint(information)
                    this.$refs.freetime.focus()
                }                else if (!/^[0-9\.]+$/.test(data.intervalTime)) {
                  const information = '请输入整形数字';
                  this.hint(information)
                    this.$refs.intervaltime.focus()
                }                else if (!/^[0-9\.]+$/.test(data.timeOutstripPrice)) {
                  const information = '请输入整形数字';
                  this.hint(information)
                    this.$refs.timeoutstripprice.focus()
                }                else {(
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
                )}
            },
            // 修改保存
          changeInfoSave() {
              console.log(this.changeforms)
              data_NewOrChange(this.changeforms).then(res => {
                  console.log(res)
                  if (res.status == 200) {
                      this.getCommonFunction()
                        this.dialogFormVisible_change = false
                    }
                })
            },
            // 验证数据值
          valuerules(event) {
             
            },
          hint(val) {
              this.information = val
                this.centerDialogVisible = true
                let timer = setTimeout(() => {
                  this.centerDialogVisible = false
                    clearTimeout(timer)
                }, 2000)
            }
        }
    }
</script>

<style type="text/css" lang="scss">
       .waitPrice{
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
    }
</style>
