<template>
  <div  class="wzlReg">
    <el-dialog
      :title='popTitle'
      :visible.sync="isShow"
      width="30%"
      center
      @close="closeMe"
      :close-on-click-modal="false" 
      :before-close="closeMe">
      <el-form :model="formAllData" :rules="rules"  ref="ruleForm" :inline="true"  label-position="right">
        <el-form-item label="登记时间">
          <el-date-picker
            disabled="disabled"
            v-model="searchCreatTime"
            align="right"
            type="date"
            :picker-options="pickOption2"
            placeholder="选择日期"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上报人类型" prop="reporterType">
          <el-select v-model="formAllData.reporterType" placeholder="请选择" @change="changeCode">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物损类型" prop="claimType">
          <el-select v-model="formAllData.claimType" clearable placeholder="请选择物损类型">
            <el-option
              v-for="item in optionsclaimType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item> 
        <el-form-item class="goodsclaimDes" label="物损描述" prop="claimDes">
          <el-input v-model="formAllData.claimDes" type="textarea" :maxlength="200" style="width:100%" placeholder="物损描述最多输入200个字符"></el-input>
        </el-form-item>
        <el-form-item class="clearfix imgbox" label="物损图片" prop="claimPic1">
          <div class="clearfix uploadcard">
            <upload v-model="formAllData.claimPic1" :title="'本地上传'" :showFileList="true" :limit="4" listtype="picture"/>
          </div>
        </el-form-item>
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
import { DicClaimStatusType } from '@/api/common'
import { postReportClaim } from '@/api/service/claim.js'
import { objectMerge2 } from '@/utils/index'
export default {
  computed: {
    isShow: {
      get() {
        return this.centerDialogVisibleReg
      },
      set() {}
    }
  },
  components: {
    Pager,
    Upload
  },
  props: {
    centerDialogVisibleReg: {
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
      searchCreatTime: +new Date(),
      pickOption2: '',
      checked: false,
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
      formAllData: {
        reporterType: '',
        orderSerial: '', // 订单号
        createTime: '', // 登记时间
        // reporter: '', // 上报人
        claimType: '', // 物损类型
        claimDes: '', // 物损描述
        claimPic1: '' // 物损图片
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
          this.popTitle = '物损登记'
          this.$set(this.formAllData, 'id', this.rowid)
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
          console.log(this.isComreg)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.getclaimstatus()
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
    changeCode(obj) {
      this.formAllData.reporterType = obj
      console.log('sdfsdfs', obj, this.formAllData)
    },
    getclaimstatus() {
      DicClaimStatusType().then(res => {
        console.log(res.data)
        res.data.map((item) => {
          this.optionsclaimType.push(item)
        })
      })
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
    getFileInfo(obj) {
      console.log('pageUpFile:', obj, obj.name)
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
      console.log('getFileList', this.formAllData)
    },
    handleChange() {},
    uploadHandleFile(_this) {
      const file = _this.file
      console.log('downfile :', file)
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
          this.formAllData.createTime = parseTime(this.searchCreatTime, '{y}-{m}-{d} {h}:{i}:{s}')
          // this.$set(this.formAllData, 'goodsclaimId', this.rowid)
          this.formAllData.orderSerial = this.$route.query.orderSerial
          const data = objectMerge2({}, this.formAllData)
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
</script>
<style lang="scss">
.wzlReg{
  .classify_info{
    padding-bottom:0 !important;
  }
  .el-dialog{
    max-width: 100%;
    min-width: 35%;
    margin-top: 18vh !important;
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

