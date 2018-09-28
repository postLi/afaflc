<template>
    <div class="identicalStyle Marketing" style="height:100%">
        <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
          <el-form-item label="所属区域" prop="pointName">
            <vregion :ui="true" @values="regionChange" class="form-control">
              <el-input v-model="formAllData.belongCityName" placeholder="请选择所属区域" clearable></el-input>
            </vregion>
          </el-form-item>
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
          <el-form-item label="处理状态">
            <el-select v-model="formAllData.dealStatus" clearable placeholder="请选择处理状态" >
              <el-option
                v-for="item in optionsdealStatus"
                :key="item.code"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item> 
          <el-form-item label="货主">
            <el-input :maxlength="20" placeholder="账户/姓名" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="车主">
            <el-input :maxlength="20" placeholder="账户/姓名/车号牌" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input :maxlength="20" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item class="btnChoose fr">
            <el-button type="primary" @click="handleSearch('search')" :size="btnsize">搜索</el-button>
            <el-button type="info" @click="handleSearch('clear')" plain :size="btnsize">清空</el-button>
          </el-form-item>            
        </el-form>
          	<div class="classify_info">
            		<div class="btns_box">
                <!-- <newCity
                  btntext="新增"
                  :plain="true"
                  type="primary" 
                  btntype="primary"
                  icon="el-icon-news"
                  editType="add"
                  btntitle="创建"
                  @getData="getDataList"
                  >
                </newCity>
                <newCity
                  btntext="修改"
                  :plain="true"
                  type="primary" 
                  btntype="primary"
                  icon="el-icon-news"
                  editType="edit"
                  btntitle="修改"
                  @getData="getDataList"
                  :params="selectRowData"
                  >
                </newCity> -->
                <el-button type="primary" :size="btnsize" class="el-icon-circle-plus"  plain @click="doAction('reg')">物流登记</el-button>
                <el-button type="primary" :size="btnsize" class="el-icon-tickets" @click="doAction('shouli')" plain>物流受理</el-button>
                <el-button type="primary" :size="btnsize" icon="el-icon-news" @click="doAction('genjin')" plain>记录物流跟进</el-button>
            		</div>
            <div class="info_news">    
            <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="dataset"  tooltip-effect="dark">
              <el-table-column
                label="选择"
                type="selection"
                width="50">
              </el-table-column>
              <el-table-column fixed label="序号" sortable  width="80">
                <template slot-scope="scope">
                {{ (page - 1)*pagesize + scope.$index + 1 }}
                </template>
              </el-table-column> 
              <el-table-column fixed label="订单号" v-model="dataset.orderSerial" prop="orderSerial" sortable :show-overflow-tooltip="true" width="300">
              </el-table-column>
              <el-table-column sortable prop="belongCity" v-model="dataset.belongCity" label="区域"  width="300">
              </el-table-column>
              <el-table-column  label="货主" v-model="dataset.shipper" prop="shipper" sortable :show-overflow-tooltip="true" width="200">
              </el-table-column>
              <el-table-column  label="车主" v-model="dataset.driver" prop="driver" sortable :show-overflow-tooltip="true"  width="200">
              </el-table-column>
              <el-table-column  label="处理状态" v-model="dataset.dealStatus" prop="dealStatus" sortable :show-overflow-tooltip="true" width="120">
              </el-table-column>       
              <el-table-column  label="物损类型" v-model="dataset.claimType" prop="claimType" sortable :show-overflow-tooltip="true" width="120">
              </el-table-column>                                                       
              <el-table-column  label="上报人" v-model="dataset.reporter" prop="reporter" sortable :show-overflow-tooltip="true"  width="300">
              </el-table-column>
              <el-table-column
              :show-overflow-tooltip="true"
              prop="createTime"
              label="上报时间"
              width="200"
              sortable
              >
              <template  slot-scope="scope">
                <span class="orderSerial">
                  {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
                </span>
              </template>
              <!-- <template slot-scope="scope">{{ scope.row.commissionTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template> -->
              </el-table-column>
              <el-table-column  label="订单状态" v-model="dataset.orderStatus" prop="orderStatus" sortable  width="120">
              </el-table-column> 
              <el-table-column
              :show-overflow-tooltip="true"
              prop="useCarTime"
              label="用车时间"
              width="120"
              sortable
              >
              <template  slot-scope="scope">
                <span class="orderSerial">
                  {{ scope.row.useCarTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
                </span>
              </template>
              <!-- <template slot-scope="scope">{{ scope.row.commissionTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template> -->
              </el-table-column>
              <el-table-column  label="提货地" v-model="dataset.startAddress" prop="startAddress" sortable :show-overflow-tooltip="true"  width="300">
              </el-table-column>
              <el-table-column  label="目的地" v-model="dataset.endAddress" prop="endAddress" sortable :show-overflow-tooltip="true"  width="300">
              </el-table-column>   
            </el-table> 
        	</div> 
         <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
        </div>
      </div>
</template>
<script>
// import { data_Commission, data_CarList, data_MaidLevel } from '@/api/server/areaPrice.js'
import {postOrderGoodsclaimlist} from '@/api/service/claim.js'
// import { data_get_Marketingsame_list, data_Del_Marketingsame, data_Able_Marketingsame } from '@/api/marketing/carmarkting/carmarkting.js'
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
// import newCity from '../../components/newCity.vue'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/'
import vregion from '@/components/vregion/Region'
import {DicDelStatusType} from '@/api/common'
export default {
  data() {
    return {
      value: '',
      btnsize: 'mini',
      options: regionDataPlus,
      selectRowData: {},
      selectId: [],
      sizes: [30, 50, 100],
      pagesize: 30, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      dataset: [],
      radio: 1,
      optionsdealStatus:[{ code: null, name: '全部' }],
      // optionsCar: [{ code: null, name: '全部' }],
      // MaidLevel: [{ code: null, name: '全部' }],
      optionsPlantService: [
        {
          id: '0',
          label: '待处理',
          value:'待处理'
        },
        {
          id: '1',
          label: '处理中',
          value:'处理中'
        },
        {
          id: '2',
          label: '已处理',
          value:'已处理'
        }
      ],
      formAllData: {
        // belongCityName:'',
        // areaCode: null,
        // areaName: null,
        // carType: null,
        // commissionGrade: null
        // belongCity:''
      }
      
    }
  },
  components: {
    // newCity,
    vregion,
    Pager
  },
  mounted() {
    // this.searchCreatTime = this.defaultTime
    this.firstblood()
    this.getdelstatus()
  },
  methods: {
    //搜索区域
    regionChange(d) {
      console.log('data:', d)
      this.formAllData.belongCityName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      if (d.area) {
        this.formAllData.belongCity = d.area.code
      } else if (d.city) {
        this.formAllData.belongCity = d.city.code
      } else {
        this.formAllData.belongCity = d.province.code
      }
    },
    //查询条件
    handleSearch(type){
      switch(type){
        case 'search':
        break
        case 'clear':
        break
      }
    },
    // 请求接口刷新页面
    firstblood() {
      // this.loading = false
      postOrderGoodsclaimlist(this.page, this.pagesize,this.formAllData).then(res => {
        this.dataset = res.data.list
        console.log(res)
      })
    },
    getdelstatus(){
      DicDelStatusType().then(res => {
        console.log(res.data)
        res.data.map((item) => {
          this.optionsdealStatus.push(item)
        })
      })
    },
    // 获取  服务和车辆 类型列表
    // getMoreInformation() {
    //   data_CarList().then(res => {
    //                 // console.log(res.data)
    //     res.data.map((item) => {
    //       this.optionsCar.push(item)
    //     })
    //   })
    //   data_MaidLevel().then(res => {
    //     res.data.map((item) => {
    //       this.MaidLevel.push(item)
    //     })
    //   }).catch(res => {
    //     console.log(res)
    //   })
    // },
          // 列表刷新页面
    // firstblood() {
    //   let FromData = {}
    //   if (this.formAllData.area) {
    //     FromData = {
    //       area: this.formAllData.area,
    //       city: null,
    //       carType: this.formAllData.carType,
    //       commissionGrade: this.formAllData.commissionGrade
    //     }
    //   } else if (this.formAllData.city) {
    //     FromData = {
    //       area: null,
    //       city: this.formAllData.city,
    //       carType: this.formAllData.carType,
    //       commissionGrade: this.formAllData.commissionGrade
    //     }
    //   } else {
    //     FromData = {
    //       area: null,
    //       city: this.formAllData.city,
    //       carType: this.formAllData.carType,
    //       commissionGrade: this.formAllData.commissionGrade
    //     }
    //   }
    //   // data_get_Marketingsame_list(this.page, this.pagesize, FromData).then(res => {
    //   //   console.log(res)
    //   //   this.dataTotal = res.data.totalCount
    //   //   this.dataset = res.data.list
    //   // })
    // },
         //  查询
    getData_query() {
      this.firstblood()
    },

     // 判断选中与否
    getSelection(val) {
      console.log('选中内容', val)
      this.selectRowData = val
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
        // 选择删除
    delete_data() {
      if (this.selectRowData.length == 0) {
        this.$message.warning('请选择您要操作的用户')
        return
      } else if (this.selectRowData.length > 1) {
            this.$message({
              message: '每次只能操作单条数据~',
              type: 'warning'
            })
            this.$refs.multipleTable.clearSelection()
          } else {
            this.delDataInformation()
          }
    },
       // 确认删除
    delDataInformation() {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        data_Del_Marketingsame(this.selectRowData[0].id).then(res => {
          this.$message.success('删除成功')
          this.firstblood()
          this.$refs.multipleTable.clearSelection()
        }).catch(err => {
          this.firstblood()
          this.$refs.multipleTable.clearSelection()
          this.$message({
            type: 'info',
            message: '操作失败，原因：' + err.text ? err.text : err
          })
        })
      }).catch(() => {
        this.firstblood()
        this.$refs.multipleTable.clearSelection()
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
      // 启用禁用
    handleUseStates() {
      if (this.selectRowData.length == 0) {
        this.$message.warning('请选择您要操作的用户')
        return
      } else if (this.selectRowData.length > 1) {
            this.$message({
              message: '每次只能操作单条数据~',
              type: 'warning'
            })
            this.$refs.multipleTable.clearSelection()
          } else {
            this.selectId.push(this.selectRowData[0].id)

            data_Able_Marketingsame(this.selectId).then(res => {
              this.selectId.splice(0, 1)
              if (this.selectRowData[0].usingStatus == 1) {
            this.$message.warning('已禁用')
          } else {
            this.$message.success('已启用')
          }
              this.firstblood()
              this.$refs.multipleTable.clearSelection()
            })
          }
    },
    getDataList() {
      this.firstblood()
      this.$refs.multipleTable.clearSelection()
    }
  },

  // mounted() {
  //   eventBus.$on('pushListtwo', () => {
  //     this.firstblood()
  //   })
  //   this.getMoreInformation()
  //   this.firstblood()
  // }
}
</script>
<style lang="scss">  
.Marketing{
  .el-cascader{
    margin-top:-10px;
  }
}
</style>

