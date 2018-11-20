<template>
  <div class="commoncss lll-addGarden">
    <el-dialog :title="formtitle" :close-on-click-modal="false" :visible="isVisibleDialog" @close="close"
               v-loading="loading" width="40%">
      <el-form :model="form" :rules="newrules" ref="ruleForm" class="clearfix" label-width="100px">
        <div class="message-left clearfix">
          <el-form-item label="园区名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input></el-input>
          </el-form-item>

          <el-form-item label="所在地">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input></el-input>
          </el-form-item>
        </div>
        <div class="message-right clearfix">
          <el-form-item label="联系人">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="固话">
            <el-input></el-input>
          </el-form-item>


          <el-form-item label="详细地址">
            <el-input></el-input>
          </el-form-item>
        </div>
        <div class="message-text clearfix">
          <el-form-item label="园区介绍">
          <el-input></el-input>
          </el-form-item>
        </div>
        <div class="message-center clearfix">

          <el-form-item label="">
            <p>名片图像</p>
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="">
            <p>园区招牌图像</p>
            <el-input></el-input>
          </el-form-item>


        </div>
        <el-form-item label="园区内景图像">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" label="1">备选项</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "add-garden",
    props: {
      isVisibleDialog: {
        type: Boolean,
        default: false
      },
      isModify: {
        type: Boolean,
        default: false
      },
    },
    watch: {
      isVisibleDialog: {
        handler(n) {

        }
      }
    },
    data() {
      return {
        formLabelWidth: '120px',
        radio: '1',
        loading: false,
        formtitle: '新增',
        form: {},
        newrules: {}
      }
    },
    methods: {
      submitForm() {

      },
      close(done) {
        // this.$refs.ruleForm.resetFields();
        // for (const i in this.standForm) {
        //   this.standForm[i] = ''
        // }
        // this.specList = [];
        this.$emit('update:isVisibleDialog', false);
        this.$emit('close');
        this.btnShow = false;
        if (typeof done === 'function') {
          done()
        }
      }
    }
  }
</script>

<style lang="scss">
  .lll-addGarden {
    .el-dialog__wrapper {
      .el-dialog__header {

      }
      .el-dialog__body {
        .el-form {
          .message-left {
            float: left;
          }
          .message-right {
            float: left;
            margin-bottom: 70px;
          }
          .message-center {
            display: inline-flex;
            .el-form-item{
              /*display: grid;*/
            }
          }
          .message-text{
            float: left;
          }
          .el-form-item {

            .el-form-item__content {
              display: inline-block;
              margin-left: 0 !important;
            }
          }

        }
      }
      .el-dialog__header {

      }
    }
  }
</style>
