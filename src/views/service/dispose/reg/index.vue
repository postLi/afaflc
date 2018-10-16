<template>
  <div  class="wzldisReg">
    <el-dialog
      title="物损登记"
      :visible.sync="isShow"
      width="30%"
      center
      @close="closeMe"
      :close-on-click-modal="false" 
      :before-close="closeMe">
      <el-form :model="formAllData" :rules="rules"  ref="ruleForm" class="demo-ruleForm classify_searchinfo" :inline="true"  label-position="right">
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
        <el-form-item label="货主">
          <el-input v-model="formAllData.shipperName" :maxlength="20" placeholder="账户/姓名" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="车主">
          <el-input v-model="formAllData.driverName" :maxlength="20" placeholder="账户/姓名/车号牌" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="formAllData.orderSerial" :maxlength="20" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
          <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')" icon="el-icon-search">搜索</el-button>
          <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')" icon="fontFamily aflc-icon-qingkong">清空</el-button>
        </el-form-item>
      </el-form>
      <div class="classify_info">
        <div class="info_news" style="min-height:700px">    
          <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" @row-click="clickDetails" @selection-change="getSelection" highlight-current-row :data="dataset"  tooltip-effect="dark">
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
            <!-- <el-table-column fixed label="订单号" prop="orderSerial" sortable :show-overflow-tooltip="true" width="300">
            </el-table-column> -->
            <el-table-column
              :show-overflow-tooltip="true"
              prop="orderSerial"
              label="订单号"
              sortable
              width="300"
              >
              <template  slot-scope="scope">
                <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
              </template>
            </el-table-column>
            <el-table-column 
              sortable 
              prop="belongCityName" 
              label="所属区域"  
              width="300">
            </el-table-column>
            <el-table-column  
              label="货主"
              sortable 
              :show-overflow-tooltip="true" 
              width="200">
              <template slot-scope="scope">
                {{scope.row.shipperPhone ? scope.row.shipperPhone : ''}}{{ scope.row.shipperName ? scope.row.shipperName : ''}}
              </template>
            </el-table-column>
            <el-table-column  
              label="车主" 
              sortable 
              :show-overflow-tooltip="true"  
              width="200">
              <template slot-scope="scope">
                {{scope.row.driverMobile ? scope.row.driverMobile : ''}}{{ scope.row.driverName ? scope.row.driverName : ''}}
              </template>
            </el-table-column>
            <el-table-column  
              label="提货地" 
              prop="startAddress" 
              sortable 
              :show-overflow-tooltip="true"  
              width="300">
            </el-table-column>
            <el-table-column  
              label="目的地" 
              prop="endAddress" 
              sortable 
              :show-overflow-tooltip="true"  
              width="300">
            </el-table-column>   
            <el-table-column
            :show-overflow-tooltip="true"
            prop="useTime"
            label="下单时间"
            width="200"
            sortable
            >
            <template  slot-scope="scope">
              <span class="orderSerial">
                {{ scope.row.useTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
              </span>
            </template>
            <!-- <template slot-scope="scope">{{ scope.row.commissionTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template> -->
            </el-table-column>
          </el-table> 
        </div> 
        <div class="info_bottom">
          <!-- class="demo-ruleForm classify_searchinfo" -->
          <el-form  label-position="right" :model="searchForm" :rules="rules"  ref="ruleForm" :inline="true">
            <el-form-item label="投诉分类" prop="claimType">
              <el-select v-model="searchForm.claimType" clearable placeholder="请选择处理状态">
                <el-option
                  v-for="item in optionsclaimType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item> 
            <el-form-item label="投诉人类型" prop="reporterType">
              <el-select v-model="searchForm.reporterType" placeholder="请选择" @change="changeCode">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投诉时间" prop="createTime">
              <el-date-picker
                disabled="disabled"
                v-model="searchCreatTime1"
                align="right"
                type="date"
                :picker-options="pickOption2"
                placeholder="选择日期"
                value-format="timestamp">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="discrabel" label="投诉内容" prop="claimDes">
              <el-input v-model="searchForm.claimDes" type="textarea" :maxlength="200" style="width:100%" placeholder="物损描述最多输入200个字符"></el-input>
            </el-form-item>
            <!-- <el-form-item class="clearfix imgbox" label="物损图片" prop="claimPic1">
              <div class="clearfix uploadcard">
                <upload v-model="formAllData.claimPic1" :title="'本地上传'" :showFileList="true" :limit="4" listtype="picture"/>
              </div>
            </el-form-item> -->
          </el-form>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }}
          <div class="show_pager"><Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div>
        </div> 
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="closeMe">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import { postOrderManager, postReportClaim } from '@/api/service/claim.js'
import Pager from '@/components/Pagination/index'
import Upload from '@/components/Upload/multImage'
import { DicComplainatusType } from '@/api/common'
import { objectMerge2 } from '@/utils/index'
export default {
  computed: {
    isShow: {
      get() {
        return this.centerDialogVisible
      },
      set() {}
    }
  },
  components: {
    Pager,
    Upload
  },
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      btnsize: 'mini',
      sizes: [20, 50, 100],
      dataset: [],
      dataTotal: 0,
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      value: '',
      pickOption2: '',
      selected: [],
      optionsclaimType: [],
      options: [{
        value: 0,
        label: '货主'
      }, {
        value: 1,
        label: '车主'
      }],
      form: {
      },
      rules: {
        reporterType: [
          { required: true, message: '请输入上报人' }
        ],
        claimDes: [
          { required: true, message: '请输入物损描述' }
        ],
        claimType: [
          { required: true, message: '请选择物损类型' }
        ],
        claimPic1: [
          { required: true, message: '至少上传一张图片' }
        ]
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      searchCreatTime1: +new Date(),
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      formAllData: {
        orderSerial: '',
        startTime: '',
        endTime: '',
        shipperName: '',
        driverName: ''
      },
      searchForm: {
        createTime: '',
        claimDes: '',
        claimPic1: '',
        reporterType: '',
        claimType: '',
        orderSerial: ''
      }
    }
  },
  watch: {
    isShow: {
      handler(newVal) {
        if (newVal) {
          this.searchForm = {}
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.searchCreatTime = this.defaultTime
    this.firstblood()
    this.getclaimstatus()
  },
  methods: {
    // 请求接口刷新页面
    firstblood() {
      // this.loading = false
      postOrderManager(this.page, this.pagesize, this.formAllData).then(res => {
        this.dataTotal = res.data.totalCount
        this.dataset = res.data.list
        console.log(res)
      })
    },
    // 查询条件
    handleSearch(type) {
      switch (type) {
        case 'search':
          if (this.searchCreatTime) {
            this.formAllData.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d}') + '00:00:00' : null
            this.formAllData.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d}') + '23:59:59' : null
          } else {
            this.formAllData.startTime = null
            this.formAllData.endTime = null
          }
          this.firstblood()
          break
        case 'clear':
          this.formAllData = {
            orderSerial: '',
            startTime: '',
            endTime: '',
            shipperName: '',
            driverName: ''
          }
          this.firstblood()
          break
      }
    },
    reset() {
      this.$refs['ruleForm'].resetFields()
    },
    closeMe(done) {
      this.$emit('close')
      this.reset()
      if (typeof done === 'function') {
        done()
      }
    },
    getclaimstatus() {
      DicComplainatusType().then(res => {
        console.log(res.data)
        res.data.map((item) => {
          this.optionsclaimType.push(item)
        })
      })
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },
     // 详情弹窗
    pushOrderSerial(item) {
        // console.log(item)
        // this.dialogFormVisible_details = true;
        // this.DetailsOrderSerial = item.orderSerial;
      this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
    },
    // 查询上报人类型
    changeCode(obj) {
      this.searchForm.reporterType = obj
      console.log('sdfsdfs', obj, this.searchForm)
    },
    getSelection(selected) {
      this.selected = selected
      console.log(this.selected.length, this.selected[0])
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    submitForm(ruleForm) {
      if (!this.selected.length) {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
      } else if (this.selected.length > 1) {
        this.$message({
          message: '每次只能登记一条数据',
          type: 'warning'
        })
        return false
      } else {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.searchForm.createTime = parseTime(this.searchCreatTime1, '{y}-{m}-{d} {h}:{i}:{s}')
            this.searchForm.orderSerial = this.selected[0].orderSerial
            console.log(this.selected)
            const data = objectMerge2({}, this.searchForm)
            console.log(data)
            postReportClaim(data).then(res => {
              this.$message({
                message: '保存成功~',
                type: 'success'
              })
              this.closeMe()
              this.$emit('success')
            }).catch(err => {
              this.$message({
                type: 'error',
                message: err.errorInfo || err.text || '未知错误，请重试~'
              })
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.wzldisReg{
  .el-dialog__wrapper{
    overflow-y: hidden;
    min-height: 700px;
  }
  .classify_info{
    padding-bottom:0 !important;
  }
  .el-dialog{
    max-width: 100%;
    min-width: 71%;
    margin-top: 6vh !important;
    .el-dialog__header{
      background:#0b4b7c;
      text-align: left;
      height: 40px;
      line-height: 40px;
      // padding-left: 20px;
      padding:0 20px;
      .el-dialog__headerbtn {
        position: absolute;
        top: 13px;
        right: 20px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
      }
      .el-dialog__headerbtn :hover{
        color:#fff !important;
        transform:scale(1.5)
      }
      span{
        color:#fff;
      }
    }
    .el-dialog__body{
      max-height: 700px;
      overflow-y: scroll;
    }
    .el-dialog__footer{
      padding-bottom: 6%;
      .el-button{
        padding: 8px 35px;
      }
    }
    .info_bottom{
      padding-top:2%;
      max-width:100%;
      min-width: 20%;
      .el-form-item{
        width:408px;
        float:left;
      }
      .imgbox{
        // height:183px;
        // line-height: 183px;
        width: 100%;
        min-height: 200px;
        .el-upload-list--picture .el-upload-list__item{
          width:232px;
          float:left;
          margin-right:6px;
        }
      }
      .discrabel{
        // height: 100px;
        width:100%;
        .el-form-item__content{
          // height: 100px;
          min-width: 62%;
          .el-textarea__inner{
            // min-height:100px;
          }
        }
      }
      .el-form-item__content {
        .el-input {
          width: 217px;
          .el-input--suffix{
            margin-left:13px !important;
          }
        }
        .el-textarea{
          width: 80% !important;
        }
      }
      .el-form-item {
        margin-right: 5px;
      }
    }
  }
  
}
</style>

