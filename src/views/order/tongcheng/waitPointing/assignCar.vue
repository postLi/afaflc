<template>
    <div class="identicalStyle clearfix plantOrigin" v-loading="loading">
            <searchInfo></searchInfo>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain @click="handleSearch('appoint')" :size="btnsize">指派司机</el-button>
                    <el-button type="primary" plain @click="handleSearch('cancel')" :size="btnsize">取消订单</el-button>
                    <el-button type="primary" plain @click="handleSearch('search')" :size="btnsize">新增订单</el-button>
                    <!-- <el-button type="primary" plain @click="handleSearch('search')" :size="btnsize">导出Exce</el-button> -->
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
                            label="订单号"
                            width="250">
                                <template  slot-scope="scope">
                                        <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
                                </template>
                        </el-table-column>
                        <el-table-column
                            prop="orderType"
                            sortable
                            label="服务分类"
                            width="110">
                        </el-table-column>
                        <el-table-column
                            prop="belongCity"
                            sortable
                            label="区域"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="shipperMobile"
                            sortable
                            label="货主账号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="shipperName"
                            sortable
                            label="货主姓名"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="usedCarType"
                            sortable
                            label="所需车型"
                            width="150">
                        </el-table-column>
                         <el-table-column
                            prop="totalAmount"
                            sortable
                            label="运费总额（元）"
                            width="150">
                        </el-table-column> 
                        <el-table-column
                            prop="useCarTime"
                            sortable
                            label="用车时间"
                            width="250">
                                <template  slot-scope="scope">
                                    <span class="timeChoose">
                                        {{ scope.row.useCarTime | parseTime}}    
                                    </span>
                                </template>
                        </el-table-column>
                         <el-table-column
                            label="订单类型"
                            sortable
                            width="120">
                                <template  slot-scope="scope">
                                    {{ scope.row.orderClass == '1' ? '即时订单' : '预约订单' }}
                                </template>
                        </el-table-column>
                        <el-table-column
                            label="付款状态"
                            sortable
                            width="150">
                                <template  slot-scope="scope">
                                    {{ scope.row.payStatus == 'AF00801' ? '待付款' : '已付款' }}
                                </template>
                        </el-table-column>
                         <el-table-column
                            label="提货地"
                            sortable
                            :show-overflow-tooltip="true"
                            width="250">
                            <template  slot-scope="scope">
                                {{ scope.row.aflcOrderAddresses[0].viaAddress }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="目的地"
                            sortable
                            :show-overflow-tooltip="true"
                            width="250">
                            <template  slot-scope="scope">
                                {{ scope.row.aflcOrderAddresses[scope.row.aflcOrderAddresses.length-1].viaAddress }}
                            </template>
                        </el-table-column>
                        <!-- <el-table-column
                            prop="aflcOrderAddresses"
                            label="配送路径"
                            width="500">
                            <template  slot-scope="scope">
                                <p class="aflcOrderAddresses" v-for="(obj,idx) in scope.row.aflcOrderAddresses" :key="obj.id">
                                    <span v-if="idx == 0">发货地：</span>
                                    <span v-else-if="idx == scope.row.aflcOrderAddresses.length-1">收货地：</span>
                                    <span v-else>途径地{{ scope.row.aflcOrderAddresses.length >3 ? idx : ''}}：</span>
                                    {{obj.viaAddress}}
                                </p>
                            </template>
                        </el-table-column> -->
                        <el-table-column
                            label="下单时间"
                            sortable
                            width="250">
                            <template  slot-scope="scope">
                                {{ scope.row.useTime | parseTime}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
                <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>    

            <!-- <Details :dialogFormVisible_details.sync = "dialogFormVisible_details" :orderSerial="DetailsOrderSerial" ></Details> -->
            <cancelCompnent :dialogVisible.sync="dialogVisible" :orderSerial = "currentOrderSerial"   @close = "shuaxin"/>
            <appointDriver :dialogFormVisible.sync = "dialogFormVisible" :orderSerial = "appontOrderSerial" @close = "shuaxin" ></appointDriver>

    </div>
</template>

<script type="text/javascript">

import { orderStatusList } from '@/api/order/ordermange'
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
// import Details from '../components/detailsInformations'
import searchInfo from './components/searchInfo'
import cancelCompnent from '../components/cancel'
import appointDriver from '../components/appointDriver'

export default{
      props: {
          isvisible: {
              type: Boolean,
              default: false
            }
        },
      components: {
          Pager,
            // Details,
          searchInfo,
          cancelCompnent,
          appointDriver
        },
      data() {
          return {
              btnsize: 'mini',
              dialogVisible: false,
              currentOrderSerial: '',
              timeOutAss: null,
              loading: true, // 加载
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
              dialogFormVisible_details: false, // 详情弹窗
              DetailsOrderSerial: '',
              checkedinformation: [],
              appontOrderSerial: '',
              dialogFormVisible: false
            }
        },
      watch: {
          isvisible: {
              handler(newVal, oldVal) {
                  if (newVal) {
                      this.firstblood()
                        // this.timeOutAss = setInterval(this.firstblood,30000);

                    } else{
                      clearInterval(this.timeOutAss)
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
          clearInterval(this.timeOutAss)
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
                // console.log(this.chooseTime)
              switch (type) {
                  case 'appoint':
                    if (this.checkedinformation.length == 0) {
                          return this.$message({
                              type: 'info',
                              message: '请选择一个订单'
                            })
                        } else if (this.checkedinformation.length > 1) {
                          return this.$message({
                              type: 'info',
                              message: '只能选择一个订单'
                            })
                        } else{
                          this.appontOrderSerial = this.checkedinformation[0].orderSerial
                            this.dialogFormVisible = true
                        }
                    break
                    case 'search':
                    if (this.chooseTime) {
                          this.searchInfo.startOrderDate = this.chooseTime[0]
                            this.searchInfo.endOrderDate = this.chooseTime[1]
                        }
                    break
                    case 'clear':
                    this.searchInfo = {
                          belongCity: '', // 区域
                          shipperName: '', // 货主
                          startOrderDate: '', // 下单起始时间
                          endOrderDate: '', // 下单结束时间
                          orderSerial: '', // 订单号
                          parentOrderStatus: 'AF00801' // 订单状态待支付
                        }
                    break
                    case 'cancel':
                    console.log(this.checkedinformation.length)
                    if (this.checkedinformation.length == 0) {
                          return this.$message({
                              type: 'info',
                              message: '请选择一个订单'
                            })
                        } else if (this.checkedinformation.length > 1) {
                          return this.$message({
                              type: 'info',
                              message: '只能选择一个订单'
                            })
                        } else{
                          this.currentOrderSerial = this.checkedinformation[0].orderSerial
                            this.dialogVisible = true
                        }
                    break
                    
                }
              this.firstblood()
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
                // console.log(item)
                // this.dialogFormVisible_details = true;
                // this.DetailsOrderSerial = item.orderSerial;
              this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})

            },
          shuaxin() {
              this.firstblood()
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .plantOrigin{
        height: 100%;
    }
</style>
