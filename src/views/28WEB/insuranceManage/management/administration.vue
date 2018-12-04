<template>
  <div class="identicalStyle " style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="投保">
        <el-input v-model="formAllData.insuranceName" placeholder="保险公司/产品名称/被保险人" class="lll-pl"></el-input>
      </el-form-item>
      <el-form-item label="投保时间 ">
        <el-date-picker
          v-model="searchCreatTime"
          :default-value="defaultTime"
          type="daterange"
          align="right"
          popper-class='searchCreatTime'
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          :picker-options="pickerOptions2"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item class='fr'>
        <el-button type="primary" plain :size="btnsize" icon="el-icon-search" @click="getdata_search">搜索</el-button>
        <el-button type="info" plain :size="btnsize" icon="fontFamily aflc-icon-qingkong" @click="clearSearch">清空
        </el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="info_news">
        <el-table style="width: 100%" stripe border height="100%" ref="multipleTable" highlight-current-row
                  tooltip-effect="dark" :data="tableDataAll">
          <el-table-column label="序号" sortable width="80">
            <template slot-scope="scope">
              {{ (page - 1)*pagesize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="投保单号" prop="extractTime"></el-table-column>
          <el-table-column label="保险公司" prop="extractTime"></el-table-column>
          <el-table-column label="保费金额" prop="extractTime"></el-table-column>
          <el-table-column label="投保日期" prop="extractTime"></el-table-column>
          <el-table-column label="运单号" prop="extractTime"></el-table-column>
          <el-table-column label="状态" prop="extractTime"></el-table-column>
          <el-table-column label="操作" prop="extractTime">
            <template slot-scope='scope'>
              <el-button type="info" size="small" plain @click="viewDetail(scope.row,'spacialLine')">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ dataTotal }}
        <div class="show_pager">
          <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {pickerOptions2, parseTime} from '@/utils/index.js'
  import Pager from '@/components/Pagination/index'
  import {postInsuranceList} from '@/api/web/insurance'

  export default {
    name: "administration",
    components: {
      Pager
    },
    props: {
      tabsNameFn: {
        type: String,
        default: 'first'
      },
      isvisible: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isvisible: {
        handler(newVal, oldVal) {
          // console.log(this.tabsNameFn, 'isvisibleisvisibleisvisible');
          if (newVal) {
            // if (this.tabsNameFn === 'first') {
            //   this.fetchData()
            // }
            // else if (this.tabsNameFn === 'second') {
            //   this.$set(this.formAllData, 'paymentState', 0)
            //   this.fetchData()
            // }
            // else if (this.tabsNameFn === 'three') {
            //   this.$set(this.formAllData, 'paymentState', 1)
            //   this.fetchData()
            // }
            // this.firstblood()
            // this.timeOutNoDriver = setInterval(this.firstblood,10*1000);

          } else {
            // clearInterval(this.timeOutNoDriver)
          }
        },
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        immediate: true
      },
      // tabsNameFn(n,o){
      //       if (this.tabsNameFn === 'first') {
      //         this.$set(this.formAllData, 'paymentState', 0)
      //         this.fetchData()
      //       }
      //       else if (this.tabsNameFn === 'second') {
      //         this.$set(this.formAllData, 'paymentState', 0)
      //         this.fetchData()
      //       }
      //       else if (this.tabsNameFn === 'three') {
      //         this.$set(this.formAllData, 'paymentState', 1)
      //         this.fetchData()
      //       }
      // }
      tabsNameFn: {
        handler(n) {
          // switch ()
          // if (/first/.test(this.tabsNameFn)) {
          //   console.log(this.tabsNameFn,this.tabsNameFn);
          // }
          console.log(n,'nnnn');
          console.log(/f/.test(this.tabsNameFn),'/first/.test(this.tabsNameFn)');
          if (this.tabsNameFn === 'first') {
            this.$set(this.formAllData, 'paymentState', 0)
            this.fetchData()
          }
          else if (this.tabsNameFn === 'second') {
            this.$set(this.formAllData, 'paymentState', 0)
            this.fetchData()
          }
          else if (this.tabsNameFn === 'three') {
            this.$set(this.formAllData, 'paymentState', 1)
            this.fetchData()
          }

        },
        immediate: true
      }
    },
    data() {
      return {
        timeOutNoDriver: null,
        searchCreatTime: [],
        defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
        tableDataAll: [{}, {}],
        btnsize: 'mini',
        ExtractTime: null,
        loading: false,
        formAllData: {
          beginTime: '',
          endTime: '',
          insuranceName: '',
        },
        dataTotal: 0,
        pagesize: 20,//每页显示数
        page: 1,//当前页
        sizes: [20, 50, 100],
        pickerOptions2: {
          shortcuts: pickerOptions2
        }
      }
    },
    mounted() {

      this.searchCreatTime = this.defaultTime
      // if (this.tabsNameFn === 'first') {
      //   this.fetchData()
      //   // console.log(this.tabsNameFn,'this.tabsNameFnthis.tabsNameFn');
      // } else if (this.tabsNameFn === 'second') {
      //   this.$set(this.formAllData, 'paymentState', 0)
      //   this.fetchData()
      // } else if (this.tabsNameFn === 'three') {
      //   this.$set(this.formAllData, 'paymentState', 1)
      //   this.fetchData()
      // }

    },
    methods: {
      fetchList() {
        postInsuranceList(this.page, this.pagesize, this.formAllData).then(data => {
          console.log(data, 'ddaada');
          // this.loading = false
        }).catch(err => {
          this.$message.warning(err.text || err.errorInfo || '无法获取服务端数据~')
          this.loading = true
        })
      },
      fetchData() {
        this.fetchList()
      },
      viewDetail() {
        this.$router.push({
          path: '/28WEB/insuranceManage/management/detail', query: {
            query: ''
          }
        })
      },
      getdata_search() {
        this.formAllData.beginTime = Date.parse(this.searchCreatTime[0] + ' 00:00:00')
        this.formAllData.endTime = Date.parse(this.searchCreatTime[1] + ' 23:59:59')
      },
      clearSearch() {
        this.searchCreatTime = []
      },
      handlePageChange(obj) {
        this.page = obj.pageNum
        this.pagesize = obj.pageSize
        this.firstblood()
      },
    }
  }
</script>

<style lang="scss">
  .lll-pl.el-input {
    .el-input__inner {
      width: 104% !important;
    }
  }
</style>
