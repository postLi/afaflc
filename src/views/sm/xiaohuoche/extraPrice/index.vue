<template>
    <div class="serviceOrder identicalStyle clearfix">
            <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                    <el-form-item label="关键字查询：" prop="pointName">
                        <el-input
                        placeholder="请输入内容"
                        v-model="searchInfo.keyword"
                        clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="btnChoose fr"  style="margin-left:0;">
                        <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')">搜索</el-button>
                        <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')">重置</el-button>
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
                        :data="tableData"
                        stripe
                        border
                        @selection-change = "getinfomation"
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
                          sortable
                          label="服务分类">
                        </el-table-column>
                        <el-table-column
                          prop="extraName"
                          sortable
                          label="额外服务名称">
                        </el-table-column>
                        <el-table-column
                          prop="extraPrice"
                          sortable
                          label="额外服务金额">
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
                <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  /></div> </div>   
                </div>
                <!-- 新增分类信息 -->
                 <div class="addclassify commoncss">
                    <el-dialog :title='formtitle'  :visible.sync="dialogFormVisible">
                        <div class="chooseinfo-item">
                            <p><span>* </span>服务一级分类 ：</p>
                            <el-radio-group v-model="classfyradio" >
                                <el-radio   v-for="(obj,key) in formclassfy" :label="obj.code" :key='key' >{{obj.name}}</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="extrainfo"  v-for="(form,keys) in forms" :key='keys'>
                            <p><span>* </span>额外服务名称</p>
                            <el-input
                                placeholder="请输入内容"
                                v-model="form.extraName"
                                clearable>
                            </el-input>
                            <el-checkbox v-model="form.isFree" true-label="1" false-label="0">收费</el-checkbox>
                            <p class="ifprice" v-if = "form.isFree === '1'">
                                <el-input
                                    v-number-only:point
                                    placeholder="请输入价格"
                                    maxlength="4"
                                    v-model="form.extraPrice"
                                    ref="pricefocus"
                                    clearable>
                                </el-input>
                                <span> 元</span>
                            </p>
                            <div class="nomore">
                                <p>描述</p>
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="5-300间的字符"
                                    maxlength="200"
                                    ref="infofocus"
                                    v-model="form.extraDes"
                                    clearable>
                                </el-input>
                            </div>
                            <span  @click="addItem" class="addItem" v-if="keys == 0">
                            </span>
                            <span  @click="reduceItem(keys)" class="reduceItem" v-else>
                            </span>
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
                        <div class="chooseinfo-item">
                            <p><span>* </span>服务一级分类 ：</p>
                            <el-input
                                placeholder="请输入内容"
                                v-model="changeform.serviceName"
                                disabled
                                clearable>
                            </el-input>
                        </div>
                        <div class="extrainfo">
                            <p><span>* </span>额外服务名称</p>
                            <el-input
                                placeholder="请输入内容"
                                v-model="changeform.extraName"
                                clearable>
                            </el-input>
                            <el-checkbox v-model="changeform.isFree" true-label="1" false-label="0"  >收费</el-checkbox>
                            <p class="ifprice" v-if = "changeform.isFree === '1'">
                                <el-input
                                    v-number-only:point
                                    placeholder="请输入价格"
                                    maxlength="4"
                                    v-model="changeform.extraPrice"
                                     ref="pricefocus"
                                    clearable>
                                </el-input>
                                <span> 元</span>
                            </p>
                            <div class="nomore">
                                <p>描述</p>
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="5-300间的字符"
                                    maxlength="200"
                                    ref="infofocus"
                                    v-model="changeform.extraDes"
                                    clearable>
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
</template>

<script type="text/javascript">

import { data_GetInformation, data_ServerClassList, data_AddForms, data_DeletInfo, data_ChangeStatus } from '@/api/server/serverExtra.js'
import '@/styles/dialog.scss'
import Pager from '@/components/Pagination/index'

export default{
      data() {
          return {
              btnsize: 'mini',
              searchInfo: {
                  keywords: ''
                },
              formclassfy: [],
              classfyradio: null,
              page: 1,
              pagesize: 20,
              formtitle: '新增额外服务',
              currentPage4: 1,
              dialogFormVisible: false,
              dialogFormVisible_change: false,
              centerDialogVisible: false,
              delDialogVisible: false,
              nowcode: null,
              dataTotal: null,
              forms: [{
                  'extraDes': null,
                  'extraName': null,
                  'isFree': '0',
                  'extraPrice': 0
                }],
              changeform: {
                  'extraId': null,
                  'serivceCode': null,
                  'extraDes': null,
                  'extraName': null,
                  'isFree': '0',
                  'extraPrice': 0
                },
              information: '你想知道什么',
              waitchange: {},
              delID: [],
              delIDTree: '',
              checkedinformation: [],
              formLabelWidth: '80px',
              input_search: null,
              tableData: [],
              defaultProps: {
                  children: 'children',
                  label: 'label'
                }
            }
        },
      components: {
          Pager
        },

      mounted() {
          this.firstblood()
        },
      methods: {
            // 获取翻页返回的数据
          handlePageChange(obj) {
              this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            // 点击选中当前行
          clickDetails(row, event, column) {
              this.$refs.multipleTable.toggleRowSelection(row)
                this.waitchange = row
                if (row.status == '启用') {
                  this.dataStatus = false
                }
              if (row.status == '禁用') {
                  this.dataStatus = true
                }
            },
            // 添加子节点新增
          addItem() {
                // 业务逻辑判断
              this.forms.push({
                  extraDes: null,
                  extraName: null,
                  isFree: null,
                  serivceCode: null
                }) 
            },
            // 删除子节点新增
          reduceItem(idx) {
              console.log(idx)
              this.forms.splice(idx, 1)
            },
            // 新增关闭返回初始内容
          closeAddNewInfo() {
              this.dialogFormVisible = false
                this.forms = [{
                  'extraDes': null,
                  'extraName': null,
                  'isFree': '0',
                  'extraPrice': 0
                }]
            },
            // 判断是否选中
          getinfomation(selection) {
              this.checkedinformation = selection
            },
          handleSearch(type) {
              switch (type) {
                  case 'search':
                    this.firstblood()
                    break
                    case 'clear' :
                    this.searchInfo = {
                          keywords: ''
                        },
                        this.firstblood()
                    break
                }
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
                } else{
                  console.log(this.checkedinformation)
                  this.dialogFormVisible_change = true 
                    this.changeform = this.checkedinformation[0]
                }
            },
            // 禁用/启用
          handleUseStates() {
              if (this.checkedinformation.length === 0) {
                    // 未选择任何修改内容的提示
                  const information = '未选中任何更改状态内容';
                  this.hint(information)
                }else {
                  console.log(this.checkedinformation)
                  const statusID = []
                    this.checkedinformation.map((item) => {
                      return statusID.push(item.extraId)
                    })

                  data_ChangeStatus(statusID).then(res => {
                      console.log(res)
                      this.firstblood()
                    })
                }
            },
            // 是否删除
          handleDelete() {
              if (this.checkedinformation.length === 0) {
                    // 未选择任何修改内容的提示
                  const information = '未选中任何删除内容';
                  this.hint(information)
                }else {
                  console.log(this.checkedinformation)
                  const delID = []
                    this.checkedinformation.map((item) => {
                      return delID.push(item.extraId)
                    })

                  this.delDialogVisible = true
                    this.delID = delID

                    console.log(this.delID)
                }
            },
            // 确认删除
          delDataInformation() {
              this.delDialogVisible = false
                data_DeletInfo(this.delID).then(res => {
                  console.log(res)
                  if (res.status == 200) {
                      this.firstblood()
                    }
                }).catch(res => {
                  const information = res.text
                    this.hint(information)
                })
            },
            // 刷新页面
          firstblood() {
              data_GetInformation(this.page, this.pagesize, this.searchInfo).then(res => {
                  this.dataTotal = res.data.totalCount
                    this.tableData = res.data.list
                    // console.log(this.tableData)
                })
            },
            // 新增分类信息
          addClassfy() {
              this.dialogFormVisible = true
                 data_ServerClassList().then(res => {
                   console.log(res.data)
                   this.formclassfy = res.data
                })
            },
            // 保存信息
          newInfoSave(event) {
              if (!this.classfyradio) {
                  const information = '请选择标准服务类型';
                  this.hint(information)
                }else {
                  let isOK = true
                    this.forms.map((item) => {
                      if (item.isFree === '1' && item.extraPrice == 0) {
                          isOK = false
                            let information = '请填写额外收费价格';
                          this.hint(information)
                            this.$refs.pricefocus[0].focus()
                        }
                      if (!item.extraDes) {
                          isOK = false
                            let information = '请填写额外服务描述';
                          this.hint(information)
                            this.$refs.infofocus[0].focus()
                        }
                      item.serivceCode = this.classfyradio
                    })
                    // console.log(this.forms)
                    // console.log(isOK)
                  if (isOK) {
                      data_AddForms(this.forms).then(res => {
                            // console.log(res)
                          this.dialogFormVisible = false
                            this.firstblood()
                            this.forms = [{
                              'extraDes': null,
                              'extraName': null,
                              'isFree': '0',
                              'extraPrice': 0
                            }]
                        })
                    }
                }
            },
            // 修改保存
          changeInfoSave() {
              console.log(this.changeform)
              if (this.changeform.isFree == '0') {
                  this.changeform.extraPrice = 0
                }
              const arr = []
                arr.push(this.changeform)
              data_AddForms(arr).then(res => {
                  console.log(res)
                  this.dialogFormVisible_change = false   
                    this.firstblood()
                })
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
    .serviceOrder{
        .addclassify,.changeclassify{
            .el-dialog{
                position: relative;
                width: 760px;
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
                            width: 250px;
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
    }
</style>
