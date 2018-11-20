<template>
    <div class="identicalStyle Marketing" style="height:100%">
        <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
          <!-- <el-form-item label="所属区域" prop="pointName">
            <vregion :ui="true" @values="regionChange" class="form-control">
              <el-input v-model="formAllData.belongCityName" placeholder="请选择所属区域" clearable></el-input>
            </vregion>
          </el-form-item> -->
          <!-- <el-form-item label="所属区域">
            <GetCityList ref="area" v-model="formAllData.belongCityName"  @returnStr="getStr"></GetCityList>
          </el-form-item> -->
          <!-- <el-form-item label="处理状态" prop="">
            <el-select clearable placeholder="请选择处理状态">
              <el-option
              v-for="item in optionsPlantService"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="处理状态">
            <el-select v-model="formAllData.dealStatus" clearable placeholder="请选择处理状态" >
              <el-option
                v-for="item in optionsdealStatus"
                :key="item.code"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>  -->
          <el-form-item label="出发地">
            <el-input v-model="formAllData.startLocation" :maxlength="20" placeholder="请输入出发地" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="到达地">
            <el-input v-model="formAllData.endLocation" :maxlength="20" placeholder="请输入到达地" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="交易时间">
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
          <el-form-item label="发布者">
            <el-input v-model="formAllData.orderSerial" :maxlength="20" placeholder="请输入发布者" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item class="btnChoose fr">
            <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')" icon="el-icon-search">搜索</el-button>
            <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>            
        </el-form>
          <div class="classify_info">
            		<!-- <div class="btns_box">
                <el-button type="primary" :size="btnsize" class="el-icon-circle-plus"  plain @click="doAction('reg')">物损登记</el-button>
                <el-button type="primary" :size="btnsize" class="el-icon-tickets" @click="doAction('shouli')" plain>确认受理</el-button>
                <el-button type="primary" :size="btnsize" icon="el-icon-news" @click="doAction('genjin')" plain>记录物流跟进</el-button>
            		</div> -->
            <div class="info_news">    
              <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="dataset"  tooltip-effect="dark">
                <!-- <el-table-column
                  label="选择"
                  type="selection"
                  width="50">
                </el-table-column> -->
                <el-table-column fixed label="序号" sortable width="80">
                  <template slot-scope="scope">
                  {{ (page - 1)*pagesize + scope.$index + 1 }}
                  </template>
                </el-table-column> 
                <el-table-column  label="出发地-到达地" width="300" sortable :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    {{scope.row.startLocation ? scope.row.startLocation + '-' : ''}}{{ scope.row.endLocation ? scope.row.endLocation : ''}}
                  </template>
                </el-table-column>
                  <el-table-column
                :show-overflow-tooltip="true"
                prop="useCarTime"
                label="发布时间"
                width="200"
                sortable
                >
                <template  slot-scope="scope">
                  <span class="orderSerial">
                    {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
                  </span>
                </template>
                </el-table-column>
                <el-table-column  
                  label="发布者" 
                  prop="publishName" 
                  sortable 
                  :show-overflow-tooltip="true"  
                  width="300">
                  <!-- <template slot-scope="scope">
                    {{scope.row.reporterPhone? scope.row.reporterPhone + '-' : ''}}{{scope.row.reporter ? scope.row.reporter : ''}}
                  </template> -->
                </el-table-column>
                <el-table-column  label="浏览量" prop="browseNumber" sortable :show-overflow-tooltip="true">
                </el-table-column>       
                <el-table-column  label="线路类型" prop="rangeTypeName" sortable :show-overflow-tooltip="true">
                </el-table-column>  
                <el-table-column  label="有效推荐数" prop="recommendCount" sortable :show-overflow-tooltip="true">
                </el-table-column>    
                <el-table-column
                  label="操作"
                  width="300"
                  plain
                  >
              <!-- 待处理的时候显示确认受理，处理中显示记录投诉跟进，已处理两个按钮都不显示 -->
                <template slot-scope="scope">
                  <el-button
                  size="mini"
                  plain
                  type="primary"
                  @click="handleEdit1(scope.$index, scope.row)">删除</el-button>
                  <el-button
                  size="mini"
                  plain
                  type="warning"
                  @click="handleEdit1(scope.$index, scope.row)">查看推荐</el-button>
                  <el-button
                  size="mini"
                  plain
                  type="info"
                  @click="handleEdit1(scope.$index, scope.row)">添加推荐</el-button>
              </template>
          </el-table-column>                                                
              </el-table> 
        	  </div> 
          <!-- addReg -->
          <!-- <addReg :centerDialogVisible="centerDialogVisible" @close="closeAddReg" @success="getsuccess"></addReg> -->
         <!-- 页码 -->
          <div class="info_tab_footer">共计:{{ dataTotal }}<div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
        </div>
      </div>
</template>
<script>
// import { postSelectAflcTransportRangeList } from '@/api/service/claim.js'
import { postSelectAflcTransportRangeList } from '@/api/web/logistics.js'
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/'
// import vregion from '@/components/vregion/Region'
import GetCityList from '@/components/GetCityList/city'
// import addReg from './reg/index'
import { pickerOptions2 } from '@/utils/index.js'
export default {
  data() {
    return {
      value: '',
      btnsize: 'mini',
      selectRowData: {},
      selected: [],
      sizes: [20, 50, 100],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      dataset: [],
      radio: 1,
      centerDialogVisible: false,
      optionsdealStatus: [],
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      formAllData: {
        startLocation: '',
        endLocation: '',
        startTime: '',
        endTime: '',
        publishName: ''
        // belongCity: '', // 区域
        // belongCityName: '', // 区域
        // // AF04801
        // dealStatus: '',
        // shipper: '',
        // driver: '',
        // orderSerial: ''
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  components: {
    // newCity,
    // addReg,
    // vregion,
    GetCityList,
    Pager
  },
  mounted() {
    this.firstblood()
    this.searchCreatTime = this.defaultTime
  },
  methods: {
    getValue(obj) {
      return obj ? obj.value : ''
    },
    // 查询条件
    handleSearch(type) {
      switch (type) {
        case 'search':

          this.firstblood()
          var data = this.searchCreatTime[0]
          const data4 = Date.parse(data)
          console.log(data4)
          break
        case 'clear':
          this.formAllData = {
            belongCity: '',
            belongCityName: '',
            delStatus: '',
            shipper: '',
            driver: '',
            orderSerial: ''
          }
          this.$refs.area.clearData()
          this.firstblood()
          break
      }
    },
    // 添加成功刷新页面
    getsuccess() {
      this.firstblood()
    },
    // 请求接口刷新页面
    firstblood() {
      // this.loading = false
      postSelectAflcTransportRangeList(this.page, this.pagesize, this.formAllData).then(res => {
        this.dataTotal = res.data.totalCount
        this.dataset = res.data.list
        console.log(res)
      })
    },
    handleEdit1() {

    },
    closeAddReg() {
      this.centerDialogVisible = false
    },
         //  查询
    getData_query() {
      this.firstblood()
    },
    getSelection(selected) {
      this.selected = selected
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },
    pushOrderSerial(item) {
      this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
    },
    getDataList() {
      this.firstblood()
      this.$refs.multipleTable.clearSelection()
    }
  }
}
</script>
<style lang="scss">  
.Marketing{
  .el-cascader{
    margin-top:-10px;
  }
}
</style>

