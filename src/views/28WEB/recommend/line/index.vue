<template>
    <div class="identicalStyle Marketing" style="height:100%">
        <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
          <!-- <el-form-item label="所属区域" prop="pointName">
            <vregion :ui="true" @values="regionChange" class="form-control">
              <el-input v-model="formAllData.belongCityName" placeholder="请选择所属区域" clearable></el-input>
            </vregion>
          </el-form-item> -->
          <el-form-item label="推荐栏目" prop="recommendColumn">
          <el-select v-model="formAllData.recommendColumn" placeholder="请选择" @change="changeColumn">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐位置" prop="recommendPosition">
          <el-select v-model="formAllData.recommendPosition" placeholder="请选择" @change="changePosition">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="置顶状态" prop="settopStatus">
          <el-select v-model="formAllData.settopStatus" placeholder="请选择" @change="changeStatus">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="推荐时效" prop="recommendPrescription">
          <el-select v-model="formAllData.recommendPrescription" placeholder="请选择" @change="changePrescription">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="出发地">
            <GetCityList ref="start" @returnStr="getStart"></GetCityList>
          </el-form-item>
          <el-form-item label="到达地">
            <GetCityList ref="end" @returnStr="getEnd"></GetCityList>
          </el-form-item>
          <el-form-item label="创建时间">
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
          <el-form-item label="账号">
            <el-input v-model="formAllData.account" :maxlength="20" placeholder="请输入账号" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item class="btnChoose fr">
            <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')" icon="el-icon-search">搜索</el-button>
            <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>            
        </el-form>
          <div class="classify_info">
              <!-- <div class="btns_box">
              <el-button type="primary" :size="btnsize" class="el-icon-circle-plus"  plain @click="doAction('sold')">上架</el-button>
              <el-button type="primary" :size="btnsize" class="el-icon-tickets" @click="doAction('soldout')" plain>下架</el-button>
              <el-button type="primary" :size="btnsize" icon="el-icon-delete"  @click="doAction('genjin')" plain>删除</el-button>
              </div> -->
            <div class="info_news">    
              <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="dataset"  tooltip-effect="dark">
                <el-table-column
                  label="选择"
                  type="selection"
                  width="50">
                </el-table-column>
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
                <el-table-column width="200" label="推荐栏目" prop="recommendColumn" sortable :show-overflow-tooltip="true">
                </el-table-column>   
                <el-table-column  width="200" label="推荐位置" prop="recommendPosition" sortable :show-overflow-tooltip="true">
                </el-table-column>   
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="recommendStarttime"
                  label="开始时间"
                  width="200"
                  sortable
                  >
                <template  slot-scope="scope">
                  <span class="orderSerial">
                    {{ scope.row.recommendStarttime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
                  </span>
                </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="recommendEndtime"
                  label="结束时间"
                  width="200"
                  sortable
                  >
                <template  slot-scope="scope">
                  <span class="orderSerial">
                    {{ scope.row.recommendEndtime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
                  </span>
                </template>
                </el-table-column>
                <el-table-column width="200" label="广告主" prop="publishName" sortable :show-overflow-tooltip="true">
                </el-table-column> 
                <el-table-column width="200" label="广告主账号" prop="account" sortable :show-overflow-tooltip="true">
                </el-table-column>   
                <el-table-column
                  prop="settopStatus"
                  label="状态"
                  width="120"
                  sortable
                  >
                  <template slot-scope="scope">
                    {{ scope.row.settopStatus === 0 ? "不置顶" : "置顶" }}
                  </template>
                </el-table-column>
               
                <!-- <el-table-column  label="曝光量" prop="browseNumber" sortable :show-overflow-tooltip="true">
                </el-table-column>        -->
                <!-- <el-table-column  label="点击量" prop="rangeTypeName" sortable :show-overflow-tooltip="true">
                </el-table-column>   -->
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="createTime"
                  label="创建时间"
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
                  @click="handleEdit1(scope.$index, scope.row,'delete')">删除</el-button>
                  <el-button
                  size="mini"
                  plain
                  type="warning"
                  @click="handleEdit1(scope.$index, scope.row,'amend')">修改</el-button>
                  <!-- <el-button
                  size="mini"
                  plain
                  type="info"
                  @click="handleEdit(scope.$index, scope.row,'soldout')">下架</el-button> -->
                  <el-button
                  size="mini"
                  plain
                  type="info"
                  @click="handleEdit1(scope.$index, scope.row,'cancel')">{{scope.row.settopStatus=== 1 ? '取消置顶': (scope.row.settopStatus === 0 ? '置顶': '')}}</el-button>
              </template>
          </el-table-column>                                                
              </el-table> 
        	  </div> 
          <!-- addReg -->
          <add :selectInfo="selectInfo" :isMatreg="isMatreg" :centerDialogVisible="centerDialogVisible" @close="closeAddReg" @success="getsuccess"></add>
         <!-- 页码 -->
          <div class="info_tab_footer">共计:{{ dataTotal }}<div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
        </div>
      </div>
</template>
<script>
import { postGetLists, deleteLine, putCancel } from '@/api/web/recommend.js'
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/'
import GetCityList from '@/components/GetCityList/city'
import add from './components/add'
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
      isMatreg: false,
      selectInfo: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      formAllData: {
        associatedId: '', // 专线id
        createStartTime: '', // 开始时间
        createEndTime: '', // 结束时间
        account: '', // 账号
        startProvince: '', // 出发省
        startCity: '',
        startArea: '',
        endProvince: '', // 到达省
        endCity: '',
        endArea: '',
        recommendColumn: '', // 推荐栏目
        recommendPosition: '', // 推荐位置
        settopStatus: '', // 置顶状态（0-不置顶 1-置顶）
        recommendPrescription: '' // 推荐时效（0-全部 1-未开始 2-进行中 3-已结束）
      },
      options: [{
        value: '首页',
        label: '首页'
      }, {
        value: '物流专线栏目',
        label: '物流专线栏目'
      }, {
        value: '专线详情页',
        label: '专线详情页'
      }],
      options1: [{
        value: '找物流专线',
        label: '找物流专线'
      }, {
        value: '物流专线列表',
        label: '物流专线列表'
      }, {
        value: '右侧专线列表',
        label: '右侧专线列表'
      }, {
        value: '此路线其他专线',
        label: '此路线其他专线'
      }],
      options3: [{
        value: '全部',
        label: '全部'
      }, {
        value: '已置顶',
        label: '已置顶'
      }, {
        value: '未置顶',
        label: '未置顶'
      }],
      options4: [{
        value: '全部',
        label: '全部'
      }, {
        value: '未开始',
        label: '未开始'
      }, {
        value: '进行中',
        label: '进行中'
      }, {
        value: '已结束',
        label: '已结束'
      }],
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  components: {
    add,
    GetCityList,
    Pager
  },
  mounted() {
    this.formAllData.associatedId = this.$route.query.associatedId
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
          this.formAllData.createStartTime = Date.parse(this.searchCreatTime[0] + ' 00:00:00')
          this.formAllData.createEndTime = Date.parse(this.searchCreatTime[1] + ' 23:59:59')
          console.log(this.formAllData.startTime, this.formAllData.endTime)
          break
        case 'clear':
          this.searchCreatTime = [],
          this.formAllData = {
            associatedId: '',
            publishName: '',
            startProvince: '',
            startCity: '',
            startArea: '',
            endProvince: '',
            endCity: '',
            endArea: '',
            recommendColumn: '', // 推荐栏目
            recommendPosition: '', // 推荐位置
            settopStatus: '', // 置顶状态（0-不置顶 1-置顶）
            recommendPrescription: '' // 推荐时效（0-全部 1-未开始 2-进行中 3-已结束）
          }
          this.$refs.start.clearData()
          this.$refs.end.clearData()
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
      postGetLists(this.page, this.pagesize, this.formAllData).then(res => {
        this.dataTotal = res.data.totalCount
        this.dataset = res.data.list
        console.log(res)
      })
    },
    getStart(val) {
      this.formAllData.startProvince = val.province.name
      this.formAllData.startCity = val.city.name
      this.formAllData.startArea = val.area.name
      console.log('this.cityarr', val, val.province.name, val.city.name, val.area.name)
    },
    getEnd(val) {
      this.formAllData.endProvince = val.province.name
      this.formAllData.endCity = val.city.name
      this.formAllData.endArea = val.area.name
      console.log('this.cityarr', val, val.province.name, val.city.name, val.area.name)
    },
    // 选择搜索列表的值
    changeColumn(obj) {
      this.formAllData.recommendColumn = obj
      console.log('sdfsdfs', obj)
    },
    changePosition(obj) {
      this.formAllData.recommendPosition = obj
    },
    changeStatus(obj) {
      this.formAllData.settopStatus = obj
    },
    // changeStatus(obj) {
    //   this.formAllData.Prescription = obj
    // },
    changePrescription(obj) {
      this.formAllData.recommendPrescription = obj
    },
    handleEdit1(index, row, type) {
      switch (type) {
        case 'amend':
          this.selectInfo = row
          this.centerDialogVisible = true
          this.isMatreg = true
          console.log('isMatreg', this.isMatreg)
          break
        case 'cancel':
          putCancel(row.id).then(res => {
            this.firstblood()
          })
          console.log(row.settopStatus)
          break
        case 'delete':
          console.log(index, row, row.id)
          deleteLine(row.id).then(res => {
            this.$confirm('确定要删除此物流专线吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.firstblood()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }).catch(err => {
            this.$message({
              type: 'error',
              message: err.errorInfo || err.text || '未知错误，请重试~'
            })
          })
          break
        default:
          break
      }
    },
    closeAddReg() {
      this.centerDialogVisible = false
      this.isMatreg = false
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

