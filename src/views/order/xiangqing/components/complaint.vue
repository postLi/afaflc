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
                    class="animated fadeInRight"
                      :data="tableData1"
                      border
                      style="width: 100%">
                      <el-table-column
                          prop="followName"
                          label="跟进人"
                          width="180">
                      </el-table-column>
                      <el-table-column
                          prop=""
                          label="跟进时间"
                          width="180">
                          <template  slot-scope="scope">
                            <span class="orderSerial">
                              {{ scope.row.followupTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
                            </span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="goodsclaimDes"
                          label="投诉跟进">
                      </el-table-column>
                      <el-table-column
                          prop="name"
                          label="是否处理完毕">
                      </el-table-column>
                      <el-table-column
                        prop="fileAddress"
                        label="附件">
                        <!-- <el-tooltip content="Top center" placement="top">
                        </el-tooltip> -->
                        <template slot-scope="scope">
                            <img :src='item.url' alt="" v-showPicture v-for="item in scope.row.imgArr" :key="item.name" />
                            <el-button type="text" v-for="txtitem in scope.row.txtArr" :key="txtitem.name" @click="openTxt(txtitem.url)">{{txtitem.name}}</el-button>
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
                prop="complainStatusName"
                label="处理状态"
                width="150"
                >
            </el-table-column>
            <el-table-column
                prop="complainTypeName"
                label="投诉分类"
                width="180"
                >
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="complainDes"
                label="投诉内容"
                >
            </el-table-column>
            <el-table-column
                prop=""
                label="投诉人"
                width="200"
                >
                <template slot-scope="scope">
                  {{scope.row.complainName ? scope.row.complainName + '-' : ''}}{{ scope.row.phone ? scope.row.phone : ''}}
                </template>
            </el-table-column>
             <el-table-column
                prop="reporterType"
                label="投诉人类型"
                width="120">
            </el-table-column>
            <el-table-column
                prop="complainTime"
                label="投诉时间"
                width="160">
                <template  slot-scope="scope">
                  <span class="orderSerial">
                    {{ scope.row.complainTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
                  </span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="300">
                 <template slot-scope="scope">
                    <el-button
                    plain
                    :type="scope.row.complainStatusName === '处理中' ? 'warning': 'primary'"
                    v-if="scope.row.complainStatusName ==='待处理' || scope.row.complainStatusName === '处理中'"
                    size="mini"
                    @click="handleEdit1(scope.$index, scope.row)">{{scope.row.complainStatusName==='待处理' ? '确认受理': (scope.row.complainStatusName === '处理中' ? '记录投诉跟进': '')}}</el-button>
                </template>
                 <!-- <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">记录投诉跟进</el-button>
                   
                </template> -->
            </el-table-column>
        </el-table>
        <el-button type="success" class="btnReg" size="mini" @click="handleEdit3" id="bigBtn">投诉登记</el-button>
        <add :rowid="rowid" :isDispose="isDispose" :centerDialogVisible="centerDialogVisible" @close="closeAdd" @success="getSuccess"></add>
        <addcomReg :isComreg="isComreg" :centerDialogVisibleReg="centerDialogVisibleReg" @close="closecomReg" @success="getSuccess"></addcomReg>
    </div>
</template>

<script>
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index.js'
import { orderDetailsList } from '@/api/order/ordermange'
import { getGoodsfollowupAll } from '@/api/service/claim.js'
import { getListAppShipperComplainByOrderSerial, getUpdateDealStatus } from '@/api/service/dispose.js'
import add from './add'
import addcomReg from './addReg'
export default {
  name: 'pushOrderList',
  components: {
    Pager,
    add,
    addcomReg
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
      centerDialogVisibleReg: false,
      totalCount: 0,
      page: 1,
      pagesize: 20,
      sizes: [20, 30, 50],
      // tableData: null,
      expands: [],
      tableData: [],
      tableData1: [],
      rowid: '',
      belongCity: '',
      buttonText: '',
      isComreg: false,
      isDispose: false
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
          console.log(this.$route.query.orderSerial)
          this.firstblood()
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
    // this.scrollFix()
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
    getSuccess() {
      this.firstblood()
      this.getListSmall()
    },
    firstblood() {
      // this.loading = false
      const orderSerial = this.$route.query.orderSerial
      // console.log(this.$route.query.orderSerial)
      getListAppShipperComplainByOrderSerial(orderSerial).then(res => {
        // this.dataTotal = res.data.totalCount
        this.tableData = res.data
        // console.log(res.data)
      })
    },
    // 滚动条
    scrollFix() {
      window.onscroll = function() {
        console.log(document.getElementsByClassName('el-tabs__content'), document.getElementById('bigBtn'))
        const topscroll = document.body.scrollTop
        const bigBtn = document.getElementById('bigBtn')
        if (topscroll > 800) {
          bigBtn.style.position = 'fixed'
          bigBtn.style.right = '0'
          bigBtn.style.zIndex = '9999'
        } else {
          bigBtn.style.position = 'static'
        }
      }
    },
    getListSmall() {
      // const orderSerial = this.$route.query.orderSerial
    //   console.log(this.rowid)
    if(this.rowid){
        getGoodsfollowupAll(this.rowid).then(res => {
          console.log(res.data)
          this.tableData1 = res.data
          this.tableData1.forEach((e, index) => {
            let arr = []
            let imgArr = []
            let txtArr = []
            arr = e.fileAddress.split(',')
            arr.forEach((el, elindex) => {
              const name = el.lastIndexOf('/')
              let nameExtension = ''
              if (name > -1) {
                nameExtension = el.substring(name + 1)
              }
              console.log('nameExtension', nameExtension)
              const i = nameExtension.lastIndexOf('.')
              let extension = ''
              if (i > -1) {
                extension = nameExtension.substring(i + 1)
              }
              console.log('extension', extension)
              if (extension === 'txt') {
                txtArr.push({
                  url: el,
                  name: nameExtension
                })
              } else {
                imgArr.push({
                  url: el,
                  name: nameExtension
                })
              }
            })
            this.$set(e, 'txtArr', txtArr)
            this.$set(e, 'imgArr', imgArr)
            arr = []
            imgArr = []
            txtArr = []
          })
          console.log('tableData1----------', this.tableData1)
        })
    }
    },
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.init()
    },
    handleEdit1(index, row) {
      if (row.complainStatusName === '待处理') {
        console.log(row.id)
        getUpdateDealStatus(row.id).then(res => {
          this.firstblood()
          this.$message({
            message: '受理成功~',
            type: 'success'
          })
        })
      } else {
        this.centerDialogVisible = true
        this.isDispose = true
      }
    },
    handleEdit2() {

    },
    handleEdit3() {
      this.centerDialogVisibleReg = true
      this.isComreg = true
    },
    closecomReg() {
      this.centerDialogVisibleReg = false
    },
    closeAdd() {
      this.centerDialogVisible = false
    },
    closeAddReg() {
      this.centerDialogVisibleReg = false
    },
    openTxt(url) {
      window.open(url)
    },
    rowClick(row, event, column) {
      if (row.id === this.rowid && this.expands.length > 0) {
        this.expands = []
      } else if (row.id !== this.rowid && this.expands.length > 0 || this.expands.length === 0) {
        this.rowid = row.id
        this.getListSmall()
        this.$nextTick(() => {
          this.expands = []
          this.expands.push(row.id)
        })
      }
      // else {
      //   this.rowid = row.id
      //   this.getListSmall()
      //   console.log('expands', this.expands)
      //   this.$nextTick(() => {
      //     this.expands.push(row.id)
      //   })
      // }

      // Array.prototype.remove = function(val) {
      //   const index = this.indexOf(val)
      //   if (index > -1) {
      //     this.splice(index, 1)
      //   }
      // }
      // if (this.expands.indexOf(row.id) < 0) {
      //   this.expands.push(row.id)
      // } else {
      //   this.expands.remove(row.id)
      // }
    }

  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
  .physicalDamage{
    img{
      display:block;
      width:100px;
      float:left;
      margin-right:5px;
    }
    .el-table{
        .el-table__expanded-cell{
            .el-table__header-wrapper{
                th{
                    background-color: #fff;
                }
            }
        }
    }
    .btnReg{
      margin-top:20px;
      float: right;
      padding:10px 20px;
      font-size: 16px;
    }
  }
.animated {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}

</style>
