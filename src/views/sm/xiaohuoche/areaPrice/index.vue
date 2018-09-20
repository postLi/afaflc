<template>
    <div class="TwoColumns serviceArea clearfix">
        <div class="columnsContainer">
            <div class="side_left">
                <el-tree
                :data="areadata"
                :props="props"
                :load="loadNode"
                lazy
                :highlight-current = "true"
                @node-expand="handleNodeClick"
                >
                </el-tree>
            </div>
            <div class="side_right">
                <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                    <el-form-item label="服务分类" prop="pointName">
                       <el-select v-model="searchInfo.valueService" clearable placeholder="请选择">
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
                        <el-select v-model="searchInfo.valueCarlist" clearable placeholder="请选择">
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
                        <el-select v-model="searchInfo.valueStatus" clearable placeholder="请选择">
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
                        <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')">查询</el-button>
                        <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')">重置</el-button>
                    </el-form-item>
                </el-form>

                <!-- <searchInfo @change="getSearchParam"></searchInfo> -->

                <div class="side_right_bottom clearfix">
                    <div class="btns_box clearfix">
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
                            sortable
                            prop="areaName"
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
                            prop="standardPriceM"
                            sortable
                            label="标准起步价">
                            </el-table-column>
                            <el-table-column
                            prop="outstripPriceM"
                            sortable
                            label="标准超里程费   ">
                            </el-table-column>
                            <el-table-column
                            prop="areaPriceM"
                            sortable
                            label="区域起步价">
                            </el-table-column>
                            <el-table-column
                            prop="areaOutstripPriceM"
                            sortable
                            label="区域超里程费">
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
                </div>

                <!-- 页码 -->
                <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>    

                    <!-- 新增分类信息 -->
                    <div class="addclassify commoncss">
                        <el-dialog :visible.sync="dialogFormVisible"  :before-close = "beforClose">
                            <div class="infoinner clearfix">
                                <div class="slot_info clearfix">
                                    <div class="newarea area_left">
                                        <span class="slot_head">新增区域定价</span>
                                        <div class="area_left_server area_server">
                                            <h4><span>* </span> 选择标准服务类型</h4>
                                            <div class="eltree_search chooseclassfy">
                                                <div class="chose">
                                                    <p><span>* </span>选择服务分类 ：</p>
                                                    <el-select v-model="newValueService" clearable placeholder="请选择" @change="choseStyle">
                                                        <el-option
                                                            v-for="item in optionsService"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.code"
                                                            :disabled="item.disabled">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                                <div class="chose">
                                                    <p><span>* </span>选择车辆类型 ：</p>
                                                    <el-select v-model="newValueCar" clearable placeholder="请选择" @change="choseStyle">
                                                        <el-option
                                                            v-for="item in optionsCar"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.code"
                                                            :disabled="item.disabled">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                                <div class="chose">
                                                    <p><span>* </span>车长 ：</p>
                                                    <el-select v-model="newValueStyle" clearable placeholder="请选择"   @change="choseVule">
                                                        <el-option
                                                            v-for="item in optionsStyle"
                                                            :key="item.id"
                                                            :label="item.carStyle"
                                                            :value="item.standardPid"
                                                            :disabled="item.disabled">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <label>
                                                <span class="control">标准起步价</span>
                                                <el-input
                                                    disabled
                                                    v-model="standPrice"
                                                    clearable>
                                                </el-input>
                                                <span>元</span>
                                                <el-input
                                                    disabled
                                                    v-model="standKm"
                                                    clearable>
                                                </el-input>
                                                <span>公里</span>
                                            </label>
                                            <label>
                                                <span class="control">超里程费</span>         
                                                <el-input
                                                    disabled
                                                    v-model="standMorePrice"
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
                                            :props="propsAdd"
                                                show-checkbox
                                                node-key="code"
                                                ref = 'trees'
                                                lazy
                                                :load="loadNodeMore"
                                                :highlight-current = "true"
                                                @node-expand="handleNodeClickMore"
                                                :filter-node-method="filterNode"
                                                >
                                                </el-tree>
                                            </div>
                                            <label>
                                                <span class="control">区域起步价</span>
                                                <el-input
                                                    @blur="valuerules"
                                                    placeholder="请输入内容"
                                                    v-model="newPrice"
                                                    ref="newPrice"
                                                    clearable>
                                                </el-input>
                                                <span>元</span>
                                                <el-input
                                                    placeholder="请输入内容"
                                                    @blur="valuerules"
                                                    v-model="newInfoKm"
                                                    ref="newInfoKm"
                                                    clearable>
                                                </el-input>
                                                <span>公里</span>
                                            </label>
                                            <label>
                                                <span class="control">区域超里程费</span>         
                                                <el-input
                                                    @blur="valuerules"
                                                    placeholder="请输入内容"
                                                    v-model="newMorePrice"
                                                    ref="newMorePrice"
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
                            <el-button @mouseover.native="setCanClose" @mouseout.native="canclose=false" @click="closeAddNewInfo">取 消</el-button>
                            </div>
                        </el-dialog>
                    </div>

                    <!-- 修改分类信息 -->
                    <div class="changeclassify commoncss">
                        <el-dialog title='修改分类信息'  :visible.sync="dialogFormVisible_change">
                            <div class="changeInforMation">
                                <div class="nowCity">
                                    <h4><span>* </span>当前城市</h4>
                                    <el-input
                                        v-model="changeforms.areaName"
                                        disabled
                                        clearable>
                                    </el-input>
                                </div>
                                <div class="chose">
                                    <p><span>* </span>当前服务分类 ：</p>
                                    <el-input
                                        v-model="changeforms.serviceName"
                                        :disabled="true">
                                    </el-input>
                                </div>
                                    <div class="chose">
                                    <p><span>* </span>当前车辆类型 ：</p>
                                    <el-input
                                        v-model="changeforms.carTypeName"
                                        :disabled="true">
                                    </el-input>
                                </div>
                                <div class="chose">
                                    <p><span>* </span>车长 ：</p>
                                    <el-input
                                    
                                        v-model="changeforms.carTypeStyle"
                                        :disabled="true">
                                    </el-input>
                                </div>
                                <div class="reference">
                                    <div class="referenceM">
                                            <span class="control">标准起步价</span>
                                            <el-input
                                                disabled
                                                v-model="changeforms.standardPrice"
                                                clearable>
                                            </el-input>
                                            <span>元</span>
                                            <el-input
                                                disabled
                                                v-model="changeforms.standardKm"
                                                clearable>
                                            </el-input>
                                            <span>公里</span>
                                        </div>
                                        <div class="referenceM">
                                            <span class="control">超里程费</span>         
                                            <el-input
                                                disabled
                                                v-model="changeforms.outstripPrice"
                                                clearable>
                                            </el-input>
                                            <span>元 / 公里</span>
                                        </div>       
                                </div>
                                <div class="nowChange">
                                    <span class="control">区域起步价</span>
                                    <el-input
                                        @blur="valuerules"
                                        placeholder="请输入内容"
                                        v-model="changeforms.areaPrice"
                                        ref="newPrice"
                                        clearable>
                                    </el-input>
                                    <span>元</span>
                                    <el-input
                                        @blur="valuerules"
                                        placeholder="请输入内容"
                                        v-model="changeforms.areaKm"
                                        ref="newInfoKm"
                                        clearable>
                                    </el-input>
                                    <span>公里</span>
                                </div>
                                <div class="nowChange nowChangeInfo">
                                    <span class="control">区域超里程费</span>         
                                    <el-input
                                        @blur="valuerules"
                                    
                                        placeholder="请输入内容"
                                        v-model="changeforms.areaOutstripPrice"
                                        ref="newMorePrice"
                                        clearable>
                                    </el-input>
                                    <span>元 / 公里</span>
                                </div>       
                            </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="changeInfoSave">保 存</el-button>
                                <el-button  @click="dialogFormVisible_change = false">取 消</el-button>
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

import { data_Area, data_GetCityList, data_GetCityInfo, data_CarList, data_ServerClassList, data_ChangeStatus, data_Delete, data_GetCarStyle, data_NewOrChange, data_OnlyChange } from '@/api/server/areaPrice.js'
import Pager from '@/components/Pagination/index'
import searchInfo from '../component/searchInfo'

import '@/styles/dialog.scss'
import '@/styles/side.scss'

export default{
      data() {
          return {
              btnsize: 'mini',
              sizes: [20, 50, 100],
              canclose: false,
              cacheData: {},
              catchData: {},
              show: false, // 遮罩层
              areadata: [], // 左侧树结构数据
              citylist: [], // 城市列表
              provinceId: null, // 省级列表
                // 左侧树结构tree数据定义
              props: {
                  label: 'name',
                  children: 'children'
                },
                // 新增树结构数据定义
              propsAdd: {
                  label: 'name',
                  children: 'children'
                },
              searchInfo: {
                  valueService: '', // 服务分类
                  valueCarlist: '',
                  valueStatus: ''
                },
              newValueService: null, // 新增服务分类
              newValueCar: null, // 车辆分类
              newValueStyle: null, // 车长
              standPrice: null, // 标准起步价
              standKm: null, // 标准起步价公里
              standMorePrice: null, //  标准起步价超里程费
              newPrice: null, // 区域起步价
              newInfoKm: null, // 区域起步价公里
              newMorePrice: null, // 区域超里程费
              optionsStyle: [], // 车长分类
              optionsService: [
                  {
                    code: null,
                    name: '全部'
                  }
                ],
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
              formtitle: '新增分类信息',
              currentPage4: 1,
              dialogFormVisible: false,
              dialogFormVisible_change: false,
              centerDialogVisible: false,
              delDialogVisible: false,
              dataTotal: 0,
              changeforms: {
                  areaKm: null,
                  areaName: null,
                  areaOutstripPrice: null,
                  areaPid: null,
                  areaPrice: null,
                  carType: null,
                  cityId: null,
                  outstripPrice: null,
                  serivceCode: null,
                  standardKm: null,
                  standardPrice: null,
                  standardPriceId: null
                },
              information: '你想知道什么',
              delID: [],
              delIDTree: '',
              checkedinformation: [],
              tableDataTree: [],
              defaultProps: {
                  children: 'children',
                  label: 'label'
                }
            }
        },
      components: {
          Pager,
          searchInfo
        },

      mounted() {
          this.firstblood()


            this.getMoreInformation()
        },
      watch: {
          filterText(val) {
              this.$refs.tree2.filter(val)
            }

        },
      methods: {
          getSearchParam(obj) {
              console.log(obj)
              this.searchInfo = Object.assign(this.searchInfo, obj)
                // this.loading = false
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
            // 根据服务分类和车辆类型选择车长
          choseStyle(val) {
              console.log(val)
                // this.newValueStyle = null;
              if (val) {
                  data_GetCarStyle(this.newValueService, this.newValueCar).then(res => {
                      console.log(res)
                      if (res.data.length > 0) {
                         this.newValueStyle = null
                            this.standPrice = null
                            this.standKm = null
                            this.standMorePrice = null
                            this.optionsStyle = res.data
                            this.optionsStyle.map((item) => {
                              item.carStyle = item.carLength + '*' + item.carWidth + '*' + item.carHeight + 'M'
                           })
                       }else {
                         this.optionsStyle = res.data
                            this.newValueStyle = null
                            this.standPrice = null
                            this.standKm = null
                            this.standMorePrice = null
                       }
                    }).catch(res => {
                     console.log(res)
                        // if(res.status == 40001)
                     const information = res.text
                        this.hint(information)
                    })
                }
            },
            // 根据车长显示标准定价
          choseVule(val) {
              this.optionsStyle.map((item) => {
                  if (item.standardPid == val) {
                      this.standPrice = item.standardPrice
                        this.standKm = item.standardKm
                        this.standMorePrice = item.outstripPrice
                    }
                })
              console.log(this.optionsStyle)
            },
            // 获取  服务和车辆 类型列表
          getMoreInformation() {
              data_CarList().then(res => {
                    // console.log(res.data)
                  res.data.map((item) => {
                      this.optionsCar.push(item)
                    })
                })
                data_ServerClassList().then(res => {
                    // console.log(res.data)
                  res.data.map((item) => {
                       this.optionsService.push(item)
                    })
                }).catch(res => {
                  console.log(res)
                })
            },
            // 刷新页面
          firstblood() {
              this.show = true
                data_Area().then(res => {
                  this.areadata = res.data.list
                    this.provinceId = this.areadata[0].code 
                    this.getCommonFunction()
                })
            },
          handleSearch(type) {
              switch (type) {
                  case 'search':
                    this.getCommonFunction()
                    break
                    case 'clear' :
                    this.search = {
                          valueService: '',
                          valueCarlist: '',
                          valueStatus: ''
                        },
                        this.getCommonFunction()
                    break
                }
            },
            // 查询和获取对应区域的数据
          getCommonFunction() {
              const data = Object.assign({}, { cityId: this.cityId, provinceId: this.provinceId }, this.searchInfo)
                // console.log(data);
              data_GetCityInfo(this.page, this.pagesize, data).then(res => {
                  console.log(res.data.list)
                  this.tableDataTree = res.data.list
                    this.dataTotal = res.data.totalCount
                     this.tableDataTree.map((item) => {
                       item.capacityTonM = item.capacityTon + '吨,' + ' ' + item.capacitySquare + '方'
                        item.standardPriceM = item.standardPrice + '元 ' + ' ' + '(' + item.standardKm + '公里)'
                        item.outstripPriceM = item.outstripPrice + '元/公里'
                        item.areaPriceM = item.areaPrice + '元' + '' + '(' + item.areaKm + '公里)'
                        item.areaOutstripPriceM = item.areaOutstripPrice + '元/公里'
                    })
                }).catch(res => {
                  console.log(res)
                  const information = res.text
                    this.hint(information)
                })
            },
          handleNodeClick(data, checked) {
                // console.log(data,checked);
              data_GetCityList(data.code).then(res => {
                  this.citylist = res.data.list
                    this.cacheData[data.code] = res.data.list
                }).catch(res => {
                  console.log('res', res)
                })
              if (checked.level === 1) {
                  this.provinceId = data.code
                    this.cityId = null 
                }
              if (checked.level === 2) {
                  this.cityId = data.code
                    this.provinceId = null 
                }
              this.getCommonFunction()
            },
          loadNode(node, resolve) {
              if (node.level === 0) {
                // 不会触发事件
                }else {
                  setTimeout(() => {
                    // resolve(this.citylist);
                      resolve(this.cacheData[node.data.code] || [])
                    }, 500)
                }
            },
             // 弹窗Tree节点
          handleNodeClickMore(data, checked) {
                // console.log(data)
              data_GetCityList(data.code).then(res => {
                  console.log(res)
                  if (!res.errorInfo) {
                      this.newCityList = res.data.list
                        this.catchData[data.code] = res.data.list
                    } else{
                      this.newCityList = []
                    }
                    // console.log(this.newCityList)
                }).catch(res => {
                    // this.newCityList = [];
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
                }                else {

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
              this.dialogFormVisible = false
                this.newPrice = null//区域起步价
                this.newInfoKm = null//区域起步价公里
                this.newMorePrice = null//区域超里程费
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
                    this.checkedinformation.map((item) => {
                      this.changeforms = item
                        if (item.cityId) {
                          this.changeforms.cityId = item.cityId
                        }else {
                          this.changeforms.cityId = item.provinceId
                        }
                      this.changeforms.carTypeStyle = item.carLength + '*' + item.carWidth + '*' + item.carHeight + 'M'
                    })
                }
            },
            // 禁用/启用
          handleUseStates() {
              if (this.checkedinformation.length === 0) {
                    // 未选择任何修改内容的提示
                  const information = '未选中任何更改状态内容';
                  this.hint(information)
                } else{
                  console.log(this.checkedinformation)
                    // this.show = true;
                  const statusID = []
                    this.checkedinformation.map((item) => {
                      return statusID.push(item.areaPid)
                    })
                  data_ChangeStatus(statusID).then(res => {
                      this.getCommonFunction()
                    })
                }
            },
            // 是否删除
          handleDelete() {
              if (this.checkedinformation.length === 0) {
                    // 未选择任何修改内容的提示
                  const information = '未选中任何删除内容';
                  this.hint(information)
                } else{
                  const delID = []
                    this.checkedinformation.map((item) => {
                      return delID.push(item.areaPid)
                    })
                  this.delID = delID
                    this.delDialogVisible = true
                }
            },
            // 确认删除
          delDataInformation() {
              this.show = true
                this.delDialogVisible = false
                data_Delete(this.delID).then(res => {
                  this.getCommonFunction()
                })
            },
            // 新增分类信息获取code值
          addClassfy() {
              this.dialogFormVisible = true
            },
            // 保存信息
          newInfoSave() {
              this.NewOrChange()
            },
             // 新增和修改Common
          NewOrChange() {
              const data = {
                  standardPrice: this.standPrice,
                  standardKm: this.standKm,
                  outstripPrice: this.standMorePrice,
                  serivceCode: this.newValueService,
                  carType: this.newValueCar,
                  areaKm: this.newInfoKm,
                  areaPrice: this.newPrice,
                  standardPriceId: this.newValueStyle,
                  areaOutstripPrice: this.newMorePrice,
                  cityId: this.$refs.trees.getCheckedKeys().join(',')
                }
                console.log(data)

              if (!data.serivceCode) {
                  const information = '请选择服务类型';
                  this.hint(information)
                }                else if (!data.carType) {
                  const information = '请选择车辆类型';
                  this.hint(information)
                }
              else if (!data.standardPriceId) {
                  const information = '请选择车长';
                  this.hint(information)
                }                else if (!data.cityId) {
                  const information = '请选择省市';
                  this.hint(information)
                }                else if (!data.areaPrice) {
                  const information = '请填写区域起步价格';
                  this.hint(information)
                }                else if (!data.areaKm) {
                  const information = '请填写区域起步公里数';
                  this.hint(information)
                }                else if (!data.areaOutstripPrice) {
                  const information = '区域超里程费';
                  this.hint(information)
                }                else {(
                    data_NewOrChange(data).then(res=>{
                        console.log(res)
                        this.getCommonFunction();
                        this.dialogFormVisible = false;
                        this.clearData();
                    }).catch(res=>{
                        console.log(res)
                        // if(res.status == 40001)
                        let information = res.text;
                        this.hint(information);
                    })
                )}
            },
            // 清空数据
          clearData() {
              this.standPrice = null
                this.standKm = null
                this.standMorePrice = null
                this.newValueService = null
                this.newValueCar = null
                this.newInfoKm = null
                this.newPrice = null
                this.newValueStyle = null
                this.newMorePrice = null
            },
            // 修改保存
          changeInfoSave() {
              console.log(this.changeforms)
              data_OnlyChange(this.changeforms).then(res => {
                  console.log(res)
                  this.dialogFormVisible_change = false
                    this.getCommonFunction()
                    
                }).catch(res => {
                  console.log(res)
                    // if(res.status == 40001)
                  const information = res.text
                    this.hint(information)
                })
            },
            // 验证数据值
          valuerules(event) {
              const _this = this
              console.log('this.canclose', this.canclose)
              if (!event.target.value || this.canclose) {
                  return
                } else{
                  if (!/^[0-9\.]+$/.test(event.target.value)) {
                      const information = '请输入数字类型内容';
                      _this.hint(information)
                        // event.target.focus()
                    }
                }
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
    .serviceArea{
        height:100%;    
        position: relative;
        margin-left:7px;
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
                                width: 250px;
                                height: 256px;
                                margin-bottom: 12px;
                                overflow: auto;
                                border: 1px solid #ccc;
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
                                .el-tree{
                                    .el-checkbox{
                                        margin-top:0;
                                        .el-checkbox__inner{
                                            width: 12px;
                                            height: 12px;
                                        }
                                    }
                                }
                            }
                            .chooseclassfy{
                                width: 250px;
                                .chose{
                                    p{
                                        margin-left: 10px; 
                                        span{
                                            color:red;
                                        }
                                    }
                                    .el-select{
                                        margin:5px 0;
                                        padding-left: 80px;
                                        .el-input{
                                            width: 150px;
                                            .el-input__inner{
                                                padding: 5px;
                                                height: 24px;
                                                line-height: 24px;
                                                font-size: 12px;
                                                color:#3e9ff1;
                                            }
                                        }
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
        .changeclassify{
            .el-dialog{
                width: 40%;
            }
            .el-dialog__body{
                .changeInforMation{
                    padding: 0 20px;
                    .el-input{
                        width: 110px;
                        .el-input__inner{
                            height: 24px;
                            line-height: 24px;
                            font-size: 12px;
                            color: #3e9ff1;
                        }
                    }
                    .nowCity{
                        h4{
                            display: inline-block;
                            width: 111px;
                            span{
                                color: red;
                            }
                        }
                    }
                    .chose{
                        display: inline-block;
                        margin:10px 30px 10px 0; 
                        p{
                            display: inline-block;
                            height: 24px;
                            line-height: 24px;
                            span{
                                color: red;
                            }
                        }
                        
                    }
                    .reference{
                        border: 1px dashed #ccc;
                        margin:10px; 
                        padding: 10px;
                        font-size: 12px;
                        .referenceM{
                            display: inline-block;
                            padding: 5px; 
                            margin-left: 65px;
                        }
                        .el-input {
                            width: 90px;
                        }
                    }
                    .nowChange{
                        display: inline-block;
                        margin-left: 80px;
                        .el-input{
                            width: 90px;
                        }
                    }
                    .nowChangeInfo{
                        margin-left: 32px;
                    }
                    
                }
            }
        }
    }
</style>
