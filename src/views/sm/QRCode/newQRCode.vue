<template>
    <div class="identicalStyle creatQRCode" v-loading="loading">
            <el-form  :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                <el-form-item label="姓名" prop="pointName">
                    <el-input v-model="searchInfo.orderSerial" clearable>
                    </el-input>            
                </el-form-item>
                <el-form-item label="主题" prop="orderSerial">
                    <el-input v-model="searchInfo.orderSerial" maxlength="20" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="渠道名称"   prop="shipperName">
                    <el-input v-model="searchInfo.shipperName" clearable placeholder="账户/姓名">
                    </el-input>
                </el-form-item>
                <el-form-item class="btnChoose fr"  style="margin-left:0;">
                    <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                    <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
                </el-form-item>
            </el-form>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize">新增</el-button>
                    <el-button type="primary" icon="el-icon-delete" plain @click="handleClick('cancel')" :size="btnsize">删除</el-button>
                </div>
                <div class="info_news" style="height:89%">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        border
                        align = "center"
                        height="100%"
                        @selection-change = "getinfomation"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column label="序号" sortable width="80">
                            <template slot-scope="scope">
                                {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            sortable
                            prop="orderSerial"
                            label="姓名"
                            width="250">
                                <!-- <template  slot-scope="scope">
                                        <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
                                </template> -->
                        </el-table-column>
                        <el-table-column
                            prop="orderType"
                            :show-overflow-tooltip="true"
                            sortable
                            label="主题"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="belongCity"
                            :show-overflow-tooltip="true"
                            sortable
                            label="渠道名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="shipperMobile"
                            :show-overflow-tooltip="true"
                            sortable
                            label="链接"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="shipperName"
                            sortable
                            label="二维码"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="usedCarType"
                            sortable
                            label="创建时间"
                            width="160">
                        </el-table-column>
                    </el-table>
                </div>
            </div>   
                <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"  ref="pager"/></div> </div>    

            <newQRCode :dialogVisible.sync = "dialogVisible"/>
    </div>
</template>

<script type="text/javascript">

import { orderStatusList } from '@/api/order/ordermange'
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import newQRCode from './components/newQRDialog'  
export default{
      props: {
          isvisible: {
              type: Boolean,
              default: false
            }
        },
      components: {
            Pager,
            newQRCode
        },
      data() {
          return {
              btnsize: 'mini',
              dialogVisible: false,
              timeOutAss: null,
              loading: false, // 加载
              sizes: [20, 50, 100],
              pagesize: 20, // 初始化加载数量
              page: 1, // 初始化页码
              dataTotal: 0,
              searchInfo: {
                  belongCity: '', // 区域
                  shipperName: '', // 货主
                  startOrderDate: '', // 下单起始时间
                  endOrderDate: '', // 下单结束时间
                  orderSerial: '', // 订单号
                  orderStatus: 'AF0080502', // 公海无司机
                  parentOrderStatus: 'AF00805' // 订单状态
                },
              tableData: [],
              checkedinformation: [],
              dialogFormVisible: false
            }
        },
      watch: {
          isvisible: {
              handler(newVal, oldVal) {
                  if (newVal) {
                        // this.firstblood()
                    } else{
                    }
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
              immediate: true
            }
        },
      created() {

        },
      mounted() {
            // this.firstblood();

        },
      beforeDestroy() {
        },
      methods: {
          handlePageChange(obj) {
              this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            // 刷新页面
          firstblood() {
              this.loading = true

                orderStatusList(this.page, this.pagesize, this.searchInfo).then(res => {
                  console.log('车主改派', res)
                  this.tableData = res.data.list
                    this.dataTotal = res.data.totalCount

                    this.tableData.forEach(item => {
                      item.aflcOrderAddresses.sort(function(a, b) {
                          return a.viaOrder - b.viaOrder  
                        })
                    })

                  this.loading = false

                })
            },

            // 模糊查询 分类名称或者code
          handleSearch(type) {
                switch (type) {
                    case 'search':
                        
                        break
                    case 'clear':

                        break
                }
                    this.firstblood()
            },
            handleClick(type){
                switch (type) {
                    case 'new':
                        this.dialogVisible = true;
                        break
                    case 'clear':

                        break
                }
            },
             // 判断是否选中
            getinfomation(selection) {
              this.checkedinformation = selection
            },
             // 点击选中当前行
            clickDetails(row, event, column) {
              this.$refs.multipleTable.toggleRowSelection(row)
            },
            // 详情弹窗
            pushOrderSerial(item) {
              this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
            },
            shuaxin() {
              this.firstblood()
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .creatQRCode{
        height: 100%;
    }
</style>
