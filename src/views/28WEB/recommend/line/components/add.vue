<template>
  <div  class="wzlReg" v-if="isMatreg">
    <el-dialog
      :title='popTitle'
      :visible.sync="isShow"
      width="30%"
      center
      @close="closeMe"
      :close-on-click-modal="false" 
      :before-close="closeMe">
      <el-form :model="formAllData" :rules="rules"  ref="ruleForm" :inline="true"  label-position="right" label-width="100px">
        <!-- <el-form-item label="推荐有效期">
          <el-date-picker
            v-model="searchCreatTime"
            align="right"
            type="date"
            :picker-options="pickOption2"
            placeholder="选择日期"
            value-format="timestamp">
          </el-date-picker>
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
        <el-form-item label="推荐有效期" prop="searchCreatTime">
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
        <el-form-item label="自定义属性" prop="code" style="width:100%">
          <el-checkbox v-model="formAllData.code">置顶</el-checkbox>
        </el-form-item>
        <el-form-item label="推荐费" prop="recommendFee">
          <el-input v-model="formAllData.recommendFee" :maxlength="20" placeholder="请输入推荐费" auto-complete="off" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="物损类型" prop="claimType">
          <el-select v-model="formAllData.claimType" clearable placeholder="请选择物损类型">
            <el-option
              v-for="item in optionsclaimType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>  -->
        <el-form-item class="goodsclaimDes" label="备注" prop="claimDes">
          <el-input v-model="formAllData.remarks" type="textarea" :maxlength="200" style="width:100%" placeholder="请输入备注信息"></el-input>
        </el-form-item>
        <!-- <el-form-item label="推荐状态" prop="complainType" >
          <el-switch
            style="display: block;margin-top:10px"
            v-model="formAllData.settopStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="上架"
            inactive-text="下架">
          </el-switch>
        </el-form-item> -->
        <!-- <el-form-item class="clearfix imgbox" label="物损图片" prop="claimPic1">
          <div class="clearfix uploadcard">
            <upload v-model="formAllData.claimPic1" :title="'本地上传'" :showFileList="true" :limit="4" listtype="picture"/>
          </div>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="closeMe">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>
<script>
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import Upload from '@/components/Upload/multImage'
import { DicClaimStatusType, DicComplainatusType } from '@/api/common'
import { postReportClaim } from '@/api/service/claim.js'
import {postAddline} from '@/api/web/logistics.js'
import {postAmend} from '@/api/web/recommend.js'
import { postReportComplain } from '@/api/service/dispose.js'
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
    },
    isMatreg: {
      type: Boolean,
      default: false
    },
    isComreg: {
      type: Boolean,
      default: false
    },
    selectInfo:{
      type: [Array, Object]
    },
    belongCity: {
      type: [Number, String]
    }
  },
  data() {
    return {
      popTitle: '',
      btnsize: 'mini',
      sizes: [30, 50, 100],
      dataset: [],
      dataTotal: 0,
      pagesize: 30, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      value: '',
      
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      checked: false,
      optionsclaimType: [],
      optionsComplainatusType: [],
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      value3: true,
      value4: true,
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
      form: {

      },
      rules: {
        // searchCreatTime:[
        //   { required: true, message: '请输入有效日期' }
        // ],
        recommendColumn: [
          { required: true, message: '请选择推荐栏目' }
        ],
        // claimDes: [
        //   { required: true, message: '请输入物损描述' }
        // ],
        // claimType: [
        //   { required: true, message: '请选择物损类型' }
        // ],
        claimPic1: [
          { required: true, message: '至少上传一张图片' }
        ],
        // complainDes: [
        //   { required: true, message: '请输入投诉内容' }
        // ],
        // complainType: [
        //   { required: true, message: '请选择投诉分类' }
        // ]
      },

      formAllData: {
        recommendColumn:'',//推荐栏目
        recommendPosition:'',//推荐位置
        recommendStarttime:'',//推荐开始时间
        recommendEndtime:'',//推荐结束时间
        settopStatus:false, //置顶状态（0-不置顶 1-置顶）
        recommendFee:'',//推荐费用
        remarks:'',//备注

        
      },
      formAlldicData: {
        orderSerial: '', // 订单号
        complainType: '', // 投诉分类
        reporterType: '', // 投诉人类型
        complainDes: ''// 投诉内容

      }
    }
  },
  watch: {
    // isShow: {
    //   handler(newVal) {
    //     if (newVal) {
    //       this.$set(this.formAllData, 'id', this.rowid)
    //       this.formAllData = {}
    //       console.log(this.formAllData.id)
    //        console.log(this.isMatreg)
    //     }
    //   },
    //   immediate: true
    // },
    isMatreg: {
      handler(newVal) {
        if (this.isMatreg) {
          this.searchCreatTime = this.defaultTime
          this.popTitle = '推荐设置'
          this.formAllData = {}
          console.log(this.isMatreg)
        }
      },
      immediate: true
    },
    isComreg: {
      handler(newVal) {
        if (this.isComreg) {
          this.popTitle = '投诉登记'
          this.formAllData = {}
        //   console.log(this.isComreg)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.getclaimstatus()
    this.getComplainatus()
    // console.log(this.isMatreg)
  },
  methods: {
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
    changeColumn(obj) {
      this.formAllData.recommendColumn = obj
      console.log('sdfsdfs', obj)
    },
     changePosition(obj) {
      this.formAllData.recommendPosition = obj
    //   console.log('sdfsdfs', obj, this.formAllData)
    },
    getclaimstatus() {
      DicClaimStatusType().then(res => {
        // console.log(res.data)
        res.data.map((item) => {
          this.optionsclaimType.push(item)
        })
      })
    },
    getComplainatus() {
      DicComplainatusType().then(res => {
        res.data.map((item) => {
          this.optionsComplainatusType.push(item)
        })
      })
    },
     // 判断选中与否
    getSelection(val) {
    //   console.log('选中内容', val)
      this.selectRowData = val
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getFileInfo(obj) {
    //   console.log('pageUpFile:', obj, obj.name)
    },
    getFileList(list) {
      const address = []
      const name = []
      list.forEach((e, index) => {
        address.push(e.url)
        name.push(e.name)
      })
      this.formAllData.fileAddress = address.join(',')
      this.formAllData.fileName = name.join(',')
    //   console.log('getFileList', this.formAllData)
    },
    handleChange() {},
    uploadHandleFile(_this) {
      const file = _this.file
    //   console.log('downfile :', file)
      let extension = ''
      const fileName = file.name.toLowerCase()
      const i = fileName.lastIndexOf('.')
      if (i > -1) {
        extension = fileName.substring(i)
      }
      if (!extension || extension !== '.txt') {
        this.$message({
          type: 'info',
          message: '只能上传 .txt 模板文件'
        })
        return
      }
      const data = new FormData()
      data.append('uploadfile', file)
      data.append('excelSign', this.info)
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            if (this.formAllData.settopStatus === true) {
              this.formAllData.settopStatus = 0
            } else {
              this.formAllData.settopStatus = 1
            }
            this.formAllData.recommendStarttime = Date.parse(this.searchCreatTime[0] + ' 00:00:00')
            this.formAllData.recommendEndtime = Date.parse(this.searchCreatTime[1] + ' 23:59:59')
            this.formAllData.associatedId = this.selectInfo.id
            // this.$set(this.formAllData, 'goodsclaimId', this.rowid)
            const data1 = objectMerge2({}, this.formAllData)
            // this.$set(data1, 'address', data1.claimPic1)
            const data2 = objectMerge2({}, this.formAlldicData)
            // console.log(data)
            let promiseObj
            if (this.isMatreg) {
              promiseObj = postAmend(this.selectInfo.id,data1)
            } else {
              promiseObj = postReportComplain(data2)
            }
            promiseObj.then(res => {
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
              // this.closeMe()
            })
          } else {
            return false
          }
        })
    }
  }
}
</script>
<style lang="scss">
.wzlReg{
  .classify_info{
    padding-bottom:0 !important;
  }
  .el-message-box .showPictureWrapper .el-message-box--center{
          overflow: hidden !important;
        }
  .el-dialog{
    max-width: 100%;
    min-width: 40%;
    margin-top: 18vh !important;
    .el-dialog__header{
      background:#0b4b7c;
      text-align: center;
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
    .el-input__inner{
      height:35px;
      line-height: 35px;
    }
    .picklist{
      width: 217px;
    }
    .goodsclaimDes{
      width:100%;
      .el-form-item__content{
        width:80%;
      }
    }
    .uploadcard{
      width:500px;
    }
    .el-upload-list--picture .el-upload-list__item{
      width:48%;
      float:left;
      margin-right:2%;
    }
  }
  
}
</style>

