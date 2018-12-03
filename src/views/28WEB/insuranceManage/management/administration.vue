<template>
  <div class="identicalStyle " style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="投保">
        <el-input v-model="formAllData.name"></el-input>
      </el-form-item>
      <el-form-item label="投保时间 ">
        <el-date-picker
          value-format="timestamp"
          type="daterange"
          v-model="ExtractTime"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change='cTime'
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class='fr'>
        <el-button type="primary" plain :size="btnsize" icon="el-icon-search" @click="getdata_search">搜索</el-button>
        <el-button type="info"  plain :size="btnsize" icon="fontFamily aflc-icon-qingkong" @click="clearSearch">清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="info_news">
        <el-table style="width: 100%" stripe border height="100%" ref="multipleTable" highlight-current-row  tooltip-effect="dark" :data="tableDataAll">
          <el-table-column label="序号" sortable  width="80">
            <template slot-scope="scope">
              {{ (page - 1)*pagesize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column  label="投保单号" prop="extractTime"></el-table-column>
          <el-table-column  label="保险公司" prop="extractTime"></el-table-column>
          <el-table-column  label="保费金额" prop="extractTime"></el-table-column>
          <el-table-column  label="投保日期" prop="extractTime"></el-table-column>
          <el-table-column  label="运单号" prop="extractTime"></el-table-column>
          <el-table-column  label="状态" prop="extractTime"></el-table-column>
          <el-table-column  label="操作" prop="extractTime">
            <template slot-scope='scope'>
              <el-button type="info" size="small" plain @click="viewDetail(scope.row,'spacialLine')">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>
    </div>
    </div>
</template>

<script>
  import {pickerOptions2} from '@/utils/index.js'
  import Pager from '@/components/Pagination/index'
  export default {
    name: "administration",
    components:{
      Pager
    },
    props: {
      tabsNameFn: {
        type: Object,
        default: () => {
        }
      }
    },
    watch: {
      tabsNameFn: {
        handler(n) {
          if (this.tabsNameFn.firstName === 'first') {
            console.log(this.tabsNameFn.firstName === 'first', this.tabsNameFn.firstName, this.tabsNameFn.firstName.length);
          }
          else if (this.tabsNameFn.secondName === 'second') {
            console.log(this.tabsNameFn.secondName === 'second', this.tabsNameFn.secondName);
          }
          else if (this.tabsNameFn.threeName === 'three') {
            console.log(this.tabsNameFn.threeName === 'three', this.tabsNameFn.threeName);
          }

        }
      }
    },
    data() {
      return {
        tableDataAll:[{},{}],
        btnsize:'mini',
        ExtractTime: null,
        loading: false,
        formAllData: {
          startExtractTime: null,
          endExtractTime: null,
        },
        pickerOptions2: {
          shortcuts: pickerOptions2
        },
        dataTotal:null,
        pagesize:20,//每页显示数
        page:1,//当前页
        sizes:[20,50,100],
      }
    },
    mounted() {
    },
    methods: {
      viewDetail(){
        this.$router.push({path:'/28WEB/insuranceManage/management/detail',query:{
            query:''
          }})
      },
      cTime(i) {
        if (i !== null) {
          this.formAllData.startExtractTime = i[0]
          this.formAllData.endExtractTime = i[1]
        }
        else {
          this.formAllData.startExtractTime = null
          this.formAllData.endExtractTime = null
        }
      },
      getdata_search(){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
        this.firstblood()
      },
      clearSearch(){
        if(this.page!= 1){
          this.page = 1;
          this.$refs.pager.inputval = this.page;
          this.$refs.pager.pageNum = this.page;
        }
      },
      handlePageChange(obj) {
        this.page = obj.pageNum
        this.pagesize = obj.pageSize
        this.firstblood()
      },
    }
  }
</script>

<style scoped>

</style>
