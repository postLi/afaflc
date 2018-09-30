<template>
  <div  class="wzlAddReg">
    <el-dialog
      title="物损登记"
      :visible.sync="isShow"
      width="30%"
      center
      @close="closeMe"
      :close-on-click-modal="false" 
      :before-close="closeMe">
      <el-form :model="form" :rules="rules"  ref="ruleForm" class="demo-ruleForm classify_searchinfo" :inline="true"  label-position="right">
        <el-form-item label="交易时间">
          <el-date-picker
            type="daterange"
            :picker-options="pickerOptions2"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            value-format="timestamp">
          </el-date-picker>
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
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
          <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')">搜索</el-button>
          <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
      </el-form>
      <div class="classify_info">
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
            <el-table-column fixed label="订单号" v-model="dataset.orderSerial" prop="orderSerial" sortable :show-overflow-tooltip="true" width="200">
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
        <div class="info_bottom">
          <!-- class="demo-ruleForm classify_searchinfo" -->
          <el-form  label-position="right" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="上报人" >
              <el-select v-model="value" placeholder="请选择" style="margin-left:13px;width:230px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上报时间">
              <el-date-picker
                style="width:200px"
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                value-format="timestamp">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="物损类型">
              <el-select v-model="formAllData.claimType" clearable placeholder="请选择处理状态">
                <el-option
                  v-for="item in optionsclaimType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item> 
            <el-form-item class="clearfix imgbox" label="上传图片">
              <div class="clearfix uploadcard">
                <upload :title="'本地上传'" :showFileList="true" :limit="5" listtype="picture"/>
              </div>
            </el-form-item>
          
            <el-form-item class="discrabel" label="物损描述">
              <el-input type="textarea" :maxlength="200"></el-input>
            </el-form-item>
            
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
import { postOrderGoodsclaimlist } from '@/api/service/claim.js'
import Pager from '@/components/Pagination/index'
import Upload from '@/components/Upload/singleImage2'
import { DicClaimStatusType } from '@/api/common'
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
      sizes: [30, 50, 100],
      dataset: [],
      dataTotal: 0,
      pagesize: 30, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      value: '',
      optionsclaimType: [{ code: null, name: '全部' }],
      options: [{
        value: '选项1',
        label: '货主'
      }, {
        value: '选项2',
        label: '车主'
      }],
      form: {
      },
      rules: {

      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      formAllData: {

      }
    }
  },
  mounted() {
    this.firstblood()
    this.getclaimstatus()
  },
  methods: {
    // 请求接口刷新页面
    firstblood() {
      // this.loading = false
      postOrderGoodsclaimlist(this.page, this.pagesize, this.formAllData).then(res => {
        this.dataTotal = res.data.totalCount
        this.dataset = res.data.list
        console.log(res)
      })
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
      DicClaimStatusType().then(res => {
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
     // 判断选中与否
    getSelection(val) {
      console.log('选中内容', val)
      this.selectRowData = val
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          console.log('3')
          this.closeMe()
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.wzlAddReg{
  .classify_info{
    padding-bottom:0 !important;
  }
  .el-dialog{
    max-width: 100%;
    min-width: 70%;
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
      .imgbox{
        height:183px;
        line-height: 183px;
      }
      .discrabel{
        height: 100px;
        .el-form-item__content{
          height: 100px;
          .el-textarea__inner{
            min-height:100px;
          }
        }
      }
      .el-form-item__content {
        .el-input {
          width: 200px;
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
        margin-bottom: 10px;
      }
    }
  }
  
}
</style>

