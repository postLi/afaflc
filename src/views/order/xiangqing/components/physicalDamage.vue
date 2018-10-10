<template>
    <div class="physicalDamage clearfix">
        <el-table
            :data="tableData"
            border
            row-key="id"
            :expand-row-keys="expands"
            @row-click="rowClick"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table
                        :data="tableData1"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="followName"
                            label="跟进人"
                            width="180">
                            <!-- <template slot-scope="scope">
                                    {{scope.row.data}}
                            </template> -->
                        </el-table-column>
                        <el-table-column
                            prop="followupTime"
                            label="跟进时间"
                            width="180">
                             <!-- <template slot-scope="scope">
                                    {{scope.row.name}}
                            </template> -->
                        </el-table-column>
                        <el-table-column
                            prop="goodsclaimDes"
                            label="物损跟进">
                             <!-- <template slot-scope="scope">
                                    {{scope.row.address}}
                            </template> -->
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="是否处理完毕">
                             <!-- <template slot-scope="scope">
                                    {{scope.row.address}}
                            </template> -->
                        </el-table-column>
                         <el-table-column
                            prop="fileName"
                            label="附件">
                             <!-- <template slot-scope="scope">
                                    {{scope.row.address}}
                            </template> -->
                        </el-table-column>
                         <el-table-column
                            prop=""
                            label="操作">
                             <!-- <template slot-scope="scope">
                                    {{scope.row.address}}
                            </template> -->
                            <template slot-scope="scope">
                              <el-button
                              size="mini"
                              @click="handleEdit3(scope.$index, scope.row)">保存</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
                type="index"
                label="序号"
                width="80"
                >
            </el-table-column>
             <el-table-column
                prop="dealStatus"
                label="处理状态"
                width="150"
                >
                <!-- <template slot-scope="scope">
                    {{scope.row.createTime | parseTime}}
                </template> -->
            </el-table-column>
            <el-table-column
                prop="claimDes"
                label="物损描述"
                width="180"
                >
                <!-- <template slot-scope="scope">
                    {{scope.row.driverName}} - {{scope.row.driverPhone}}
                </template> -->
            </el-table-column>
            <el-table-column
                prop="claimPic1"
                :show-overflow-tooltip="true"
                label="破损图片"
                >
                <el-tooltip class="item" effect="dark" content="点击图片查看原图" placement="top">
                  <img :src='claimPic1' alt="" v-showPicture>
                </el-tooltip>
                <!-- <template slot-scope="scope">
                    {{scope.row.driverName}} - {{scope.row.driverPhone}}
                </template> -->
            </el-table-column>
            <el-table-column
                prop="reporter"
                label="上报人"
                width="200"
                >
            </el-table-column>
             <el-table-column
                prop="reporterType"
                label="上报人类型"
                width="120">
            </el-table-column>
            <!-- 这里没有相应的字段 -->
            <el-table-column
                prop="createTime"
                label="上报时间"
                width="160">
            </el-table-column>
            <el-table-column
                label="操作"
                width="300">
                 <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit1(scope.$index, scope.row)">记录投诉跟进</el-button>
                   <el-button
                    size="mini"
                    @click="handleEdit2(scope.$index, scope.row)">物损登记</el-button>
                </template>
            </el-table-column>
        </el-table>
        <add :centerDialogVisible="centerDialogVisible" @close="closeAdd"></add>
        <!-- <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>     -->
    </div>
</template>

<script>

import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index.js'
import { orderDetailsList } from '@/api/order/ordermange'
import { getGoodsclaimAll, getGoodsfollowupAll } from '@/api/service/claim.js'
import add from './add'

export default {
  name: 'pushOrderList',
  components: {
    Pager,
    add
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      totalCount: 0,
      page: 1,
      pagesize: 20,
      sizes: [20, 30, 50],
      // tableData: null,
      expands: [],
      tableData: [],
      tableData1: []
      // formAllData: {
      //   orderSerial: ''
      // },
      // tableData: [{
      //   id: '1',
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄',
      //   tableData1: [{
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   }, {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   }, {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   }, {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }]
      // }, {
      //   id: '2',
      //   date: '2016-05-04',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1517 弄',
      //   tableData1: [{
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   }, {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   }, {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   }, {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }]
      // }, {
      //   id: '3',
      //   date: '2016-05-01',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1519 弄',
      //   tableData1: [{
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   }, {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   }, {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   }, {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }]
      // }, {
      //   id: '4',
      //   date: '2016-05-03',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1516 弄',
      //   tableData1: [{
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   }, {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   }, {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   }, {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }]
      // }]
    }
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
                    // this.init();
          this.firstblood()
          this.getListSmall()
        }
      },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  mounted() {
    // console.log(this.tableData)
    this.firstblood()
    this.getListSmall()
  },
  methods: {
    init() {
      orderDetailsList(this.$route.query.orderSerial).then(res => {
        console.log('details', res)
        this.tableData = res.data.aflcOrderPushes
        this.expands.push(this.tableData[0].id)
        this.loading = false
      })
            // this.totalCount = this.pushOrderData.length;
            // let pageStart =  (this.page - 1) * this.pagesize;
            // let pageEnd = this.page * this.pagesize;
            // this.tableData = this.pushOrderData.slice(pageStart,pageEnd)
    },
    firstblood() {
      // this.loading = false
      const orderSerial = this.$route.query.orderSerial
      // console.log(this.$route.query.orderSerial)
      getGoodsclaimAll(orderSerial).then(res => {
        // this.dataTotal = res.data.totalCount
        this.tableData = res.data
        // console.log(res.data)
      })
    },
    getListSmall() {
      const orderSerial = this.$route.query.orderSerial
      getGoodsfollowupAll(orderSerial).then(res => {
        // console.log(res.data)
        this.tableData1 = res.data
      })
    },
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.init()
    },
    handleEdit1() {
      this.centerDialogVisible = true
    },
    handleEdit2() {

    },
    handleEdit3() {

    },
    closeAdd() {
      this.centerDialogVisible = false
    },
    rowClick(row, event, column) {
      Array.prototype.remove = function(val) {
        const index = this.indexOf(val)
        if (index > -1) {
          this.splice(index, 1)
        }
      }

      if (this.expands.indexOf(row.id) < 0) {
        this.expands.push(row.id)
      } else {
        this.expands.remove(row.id)
      }
    }

  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .physicalDamage{
        .el-table{
            .el-table__expanded-cell{
                .el-table__header-wrapper{
                    th{
                        background-color: #fff;
                    }
                }
            }
        }
    }
    
</style>
