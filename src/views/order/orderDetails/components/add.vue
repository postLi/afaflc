<template>
  <div  class="wzlAddgenjing">
    <el-dialog
      :title='popTitle'
      :visible.sync="isShow"
      width="30%"
      center
      @close="closeMe"
      :close-on-click-modal="false" 
      :before-close="closeMe">
      <el-form :model="formAllData" :rules="rules"  ref="ruleForm" :inline="true"  label-position="right">
        <el-form-item label="跟进人" prop="followName" style="margin-left:15px;">
          <el-input v-model="formAllData.followName" :maxlength="20" placeholder="请输入跟进人" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item prop="code" >
          <el-checkbox v-model="formAllData.code">是否处理完毕</el-checkbox>
        </el-form-item>
        <el-form-item class="goodsclaimDes" :label="isClaim?'物损跟进':'投诉跟进'" prop="goodsclaimDes">
          <el-input v-model="formAllData.goodsclaimDes" type="textarea" :maxlength="200" style="width:100%" placeholder="投诉跟进最多输入200个字符"></el-input>
        </el-form-item>
        <el-form-item class="clearfix imgbox" label="上传附件" prop="fileAddress">
          <div class="clearfix uploadcard">
            <upload :title="'本地上传'" @filelist="getFileList" v-model="formAllData.fileAddress" :showFileList="true" :limit="4" listtype="picture" @fileInfo="getFileInfo" />
          </div>
        </el-form-item>
        <!-- <el-form-item class="clearfix imgbox" label="上传附件">
          <div class="clearfix uploadcard">
            <upload :title="'本地上传'" v-model="formAllData.fileAddress" :showFileList="true" :limit="4" listtype="picture" @fileInfo="getFileInfo" />
            <el-upload :show-file-list="false" :on-change="handleChange" action="" :http-request="uploadHandleFile">
            <div class="bigIconBtn_primary" >
              <i class="icon-export-btn"></i>
              <br>
              <span>上传文件</span>
            </div>
          </el-upload>
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
// import { postOrderGoodsclaimlist } from '@/api/service/claim.js'
import Pager from '@/components/Pagination/index'
import Upload from '@/components/Upload/multImage'
import { DicClaimStatusType } from '@/api/common'
import { postReportClaimAdd } from '@/api/service/claim.js'
import { postAddComplain } from '@/api/service/dispose.js'
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
    rowid: {
      type: [Number, String]
    },
    isDispose: {
      type: Boolean,
      default: false
    },
    isClaim: {
      type: Boolean,
      default: false
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
        followName: [
          { required: true, message: '请输入跟进人' }
        ],
        goodsclaimDes: [
          { required: true, message: '投诉跟进内容最多可输入200个字符' }
        ],
        fileAddress: [
          { required: true, message: '至少上传一张图片' }
        ]
      },
      formAllData: {
        // goodsclaimId: '',
        code: false,
        fileAddress: '', // 附件地址
        followName: '', // 跟进人
        // followupTime: '', // 跟进时间
        fileName: '', // 附件名称
        goodsclaimDes: ''// 投诉跟进描述
      }
    }
  },
  watch: {
    // isShow: {
    //   handler(newVal) {
    //     if (newVal) {
    //       // this.$set(this.formAllData, 'goodsclaimId', this.rowid)
    //       // this.formAllData.goodsclaimId = this.rowid
    //       this.formAllData = {}
    //       console.log(this.formAllData.goodsclaimId)
    //     }
    //   }
    // }
    isClaim: {
      handler(newVal) {
        if (this.isClaim) {
          this.popTitle = '记录物损跟进'
        }
      }
    },
    isDispose: {
      handler(newVal) {
        if (this.isDispose) {
          this.popTitle = '记录投诉跟进'
        }
      }
    }
  },
  mounted() {
    // this.firstblood()
    this.getclaimstatus()
  },
  methods: {
    // 请求接口刷新页面
    // firstblood() {
    //   // this.loading = false
    //   postOrderGoodsclaimlist(this.page, this.pagesize, this.formAllData).then(res => {
    //     this.dataTotal = res.data.totalCount
    //     this.dataset = res.data.list
    //     console.log(res)
    //   })
    // },
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
        // console.log(res.data)
        res.data.map((item) => {
          this.optionsclaimType.push(item)
        })
      })
    },
    // 每页显示数据量变更
    // handlePageChange(obj) {
    //   this.page = obj.pageNum
    //   this.pagesize = obj.pageSize
    //   this.firstblood()
    // },
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
    //   console.log(list, 'list==================')

      const address = []
      const name = []
      list.forEach((e, index) => {
        address.push(e.url)
        name.push(e.name)
      })
      this.$set(this.formAllData, 'fileAddress', address.join(','))
      this.$set(this.formAllData, 'fileName', name.join(','))
      // this.formAllData.fileName = name.join(',')
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
          // this.formAllData.followupTime = parseTime(this.searchCreatTime, '{y}-{m}-{d} {h}:{i}:{s}')
          if (this.formAllData.code === true) {
            this.formAllData.code = 1
          } else {
            this.formAllData.code = 0
          }
          this.$set(this.formAllData, 'goodsclaimId', this.rowid)
          const data = objectMerge2({}, this.formAllData)
          // console.log(this.formAllData)
          let promiseObj
          if (this.isClaim) {
            promiseObj = postReportClaimAdd(data)
          } else if (this.isDispose) {
            promiseObj = postAddComplain(data)
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
.wzlAddgenjing{
  // .bigIconBtn_primary {
  //   padding: 40px 0;
  //   cursor: pointer;
  //   text-align: center;
  //   i {
  //     margin: 10px auto;
  //   }
  // }
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
    .imgbox{
        // width:400px;
        // height:183px;
        // line-height: 183px;
      }
    // .info_bottom{
    //   padding-top:2%;
    //   max-width:100%;
    //   min-width: 20%;
    //   .imgbox{
    //     height:183px;
    //     line-height: 183px;
    //   }
    //   .discrabel{
    //     height: 100px;
    //     .el-form-item__content{
    //       height: 100px;
    //       .el-textarea__inner{
    //         min-height:100px;
    //       }
    //     }
    //   }
    //   .el-form-item__content {
    //     .el-input {
    //       width: 200px;
    //       .el-input--suffix{
    //         margin-left:13px !important;
    //       }
    //     }
    //     .el-textarea{
    //       width: 80% !important;
    //     }
    //   }
    //   .el-form-item {
    //     margin-right: 5px;
    //     margin-bottom: 10px;
    //   }
    // }
  }
  
}
</style>

