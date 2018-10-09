<template>
    <div class="detailsInfo" v-loading="loading">
        <!-- 基本信息 -->
        <div class="detailsInfo-collapse collapseInfo">
            <h2>概要信息</h2>
            <div class="essentialInformation">
                <el-row>
                    <el-col :span="3">注册日期：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">注册渠道：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">已加入天数：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">最近登录时间：</el-col>
                    <el-col :span="3">1</el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'

export default {
  name: 'detailsInfo',
  components: {
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }

  },
  data() {
    return {
        listInformation: [],
        loading: false,
        dialogVisible: false,
        currentOrderSerial: ''
      }
  },
  watch: {
    isvisible: {
        handler(newVal, oldVal) {
            if (newVal) {
                this.init()
              }
          },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        immediate: true
      },
  },
  mounted() {
        // console.log(this.$route)
  },
  methods: {
    init() {
       
      },
    shuaxin() {
        this.init()
      },
    handlerClick() {
        this.currentOrderSerial = this.$route.query.orderSerial
        this.dialogVisible = true
      }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .detailsInfo{
        .collapseInfo{
            h2{
                border-bottom: solid 2px #e0e0e0;
                line-height: 25px;
                font-size: 18px;
                padding: 18px 0;
                color: #333333;
                font-weight: normal;
	            font-stretch: normal;
            }
            .essentialInformation{

            }
        }
    }
</style>
