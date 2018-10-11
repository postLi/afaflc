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
      <el-form :model="form" :rules="rules"  ref="ruleForm" :inline="true"  label-position="right">
        <el-form-item label="登记时间">
          <el-date-picker
            v-model="searchCreatTime"
            align="right"
            type="date"
            :picker-options="pickOption2"
            placeholder="选择日期"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上报人">
          <el-input v-model="formAllData.reporter" :maxlength="20" placeholder="请输入跟进人" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="物损类型">
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
        <el-form-item class="goodsclaimDes" label="物损描述">
          <el-input v-model="formAllData.claimDes" type="textarea" :maxlength="200" style="width:100%" placeholder="物损描述最多输入200个字符"></el-input>
        </el-form-item>
        <el-form-item class="clearfix imgbox" label="物损图片">
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
import { getReportClaim } from '@/api/service/claim.js'
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
    rowid: {
      type: [Number, String]
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
      searchCreatTime: +new Date(),
      pickOption2: '',
      checked: false,
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
      formAllData: {
        createTime: '', // 登记时间
        reporter: '', // 上报人
        claimType: '', // 物损类型
        claimDes: '', // 物损描述
        claimPic1: '' // 物损图片
      }
    }
  },
  watch: {
    isShow: {
      handler(newVal) {
        if (newVal) {
          this.$set(this.formAllData, 'id', this.rowid)
          // console.log(this.formAllData.id)
        }
      }
    }
  },
  mounted() {
    this.getclaimstatus()
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
          // const data = objectMerge2({}, this.formAllData)
          console.log(this.formAllData)
          getReportClaim(this.formAllData).then(res => {
            console.log(res)
          })
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
    // .uploadcard{
    //   width:500px;
    // }
    .el-upload-list--picture .el-upload-list__item{
      width:48%;
      float:left;
      margin-right:2%;
    }
  }
  
}
</style>

