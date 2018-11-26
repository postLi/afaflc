<template>
    <div class="detailsInfo detailsArrange" v-loading="loading">
        <!-- 基本信息 -->
        <div class="detailsInfo-collapse collapseInfo">
            <h2>概要信息</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">注册日期：</el-col>
                    <el-col :span="3">{{driverInformation.createTime | parseTime}}</el-col>
                    <el-col :span="3">注册渠道：</el-col>
                    <el-col :span="3">{{driverInformation.registerOriginName ? driverInformation.registerOriginName : '暂无'}}</el-col>
                    <el-col :span="3">已加入天数：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">最近登录时间：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <!-- 第二行 -->
                    <el-col :span="3">用户姓名：</el-col>
                    <el-col :span="3">{{driverInformation.driverName}}</el-col>
                    <el-col :span="3">手机号码：</el-col>
                    <el-col :span="3">{{driverInformation.driverMobile}}</el-col>
                    <el-col :span="3">年龄：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">性别：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <!-- 第三行 -->
                    <el-col :span="3">身份证号码：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">生日：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">居住地：</el-col>
                    <el-col :span="9">暂无</el-col>
                    <!-- 第四行 -->
                    <el-col :span="3">微信号：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">支付宝：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">账号启用状态：</el-col>
                    <el-col :span="9">暂无</el-col>
                </el-row>
            </div>
        </div>
        <!-- 资质信息 -->
        <div class="zizhiInfo-collapse collapseInfo">
            <h2>资质信息</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">车主审核通过：</el-col>
                    <el-col :span="3">{{driverInformation.driverStatusName ? driverInformation.driverStatusName : '暂无'}}</el-col>  
                    <el-col :span="3">身份状态：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">车主审核通过时间：</el-col>
                    <el-col :span="3">{{driverInformation.registerTime ? driverInformation.registerTime : '暂无'}}</el-col>
                    <el-col :span="3">驾驶证号码 ：</el-col>
                    <el-col :span="3">暂无</el-col>

                    <!-- 第二行 -->
                    <el-col :span="3">驾驶证有效期：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">驾驶证是否过期：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">发证所在地：</el-col>
                    <el-col :span="9">暂无</el-col> 

                    <!-- 第三行 -->
                    <el-col :span="3">车牌号：</el-col>
                    <el-col :span="3">{{driverInformation.carNumber ? driverInformation.carNumber : '暂无'}}</el-col>
                    <el-col :span="3">车型：</el-col>
                    <el-col :span="3">{{driverInformation.carTypeName ? driverInformation.carTypeName : '暂无'}}</el-col>
                    <el-col :span="3">车架号：</el-col>                                        
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">交强险到期时间：</el-col>
                    <el-col :span="3">暂无</el-col>

                    <!-- 第四行 -->
                    <el-col :span="3">车辆规格：</el-col>
                    <el-col :span="3">{{driverInformation.carSpecName ? driverInformation.carSpecName :'暂无'}}</el-col>
                    <el-col :span="3">车长：</el-col>
                    <el-col :span="3">{{driverInformation.carLength}}*{{driverInformation.carWidth}}*{{driverInformation.carHeight}}</el-col>
                    <el-col :span="3">商业险到期时间：</el-col>
                    <el-col :span="9">暂无</el-col>

                    <!-- 第五行 -->
                    <el-col :span="3">是否有商业险：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">保险公司名称：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">年检到期时间：</el-col>
                    <el-col :span="9">暂无</el-col>
                </el-row>
            </div>
            <div class="essentialInformation_img" v-viewer>
                <el-row class="basicInfo_img" :span='24'>
                    <el-col :span="12">
                        <h6>上传车辆45°照片：<span class="">({{driverInformation.authNoPassCause ? driverInformation.authNoPassCause['车辆45°'] :'上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='driverInformation.carFile ? driverInformation.carFile :defaultImg45' alt="">
                        </el-tooltip>   
                    </el-col>
                    <el-col :span="12">
                        <h6>上传车辆行驶照片：<span class="">({{driverInformation.authNoPassCause ? driverInformation.authNoPassCause['行驾证'] : '上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='driverInformation.drivingPermitFile ? driverInformation.drivingPermitFile : defaultImgCarCard' alt="">
                        </el-tooltip>   
                    </el-col>
                </el-row>
                <el-row class="basicInfo_img" :span='24'>
                    <el-col :span="12">
                        <h6>上传驾驶证照片：<span class="">({{driverInformation.authNoPassCause ? driverInformation.authNoPassCause['驾驶证'] :'上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='driverInformation.drivingLicenceFile ? driverInformation.drivingLicenceFile : defaultImgDriverCard' alt="">
                        </el-tooltip>   
                    </el-col>
                    <el-col :span="12">
                        <h6>上传车主身份证照片：<span class="">({{driverInformation.authNoPassCause ? driverInformation.authNoPassCause['身份证正面'] : '上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='driverInformation.idCardFile ? driverInformation.idCardFile : defaultImgIdCard' alt="">
                        </el-tooltip>   
                    </el-col>
                </el-row>
                <el-row class="basicInfo_img" :span='24'>
                    <el-col :span="12">
                        <h6>上传车主个人形象照片：<span class="">({{driverInformation.authNoPassCause ? driverInformation.authNoPassCause['手持身份证'] : '上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='driverInformation.takeIdCardFile ? driverInformation.takeIdCardFile : defaultImgGeRen' alt="">
                        </el-tooltip>   
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 修改日志 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>修改日志</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="操作模块"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="操作人"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作时间">
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="total,prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
                <!-- <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div> -->
            </div>
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
// import Pager from '@/components/Pagination/index'
import {  aflcDriverInfo } from '@/api/users/carDetails/index.js'

export default {
  name: 'detailsInfo',
  components: {
    //   Pager
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }

  }, 
  data() {
    return {
        size:[20,30,50],
        totalCount:100,
        defaultImg:'/static/test.jpg',//默认第一张图片的url
        defaultImg45:'/static/45du.png',
        defaultImgCarCard:'/static/carcard.png',
        defaultImgDriverCard:'/static/drivercard.png',
        defaultImgIdCard:'/static/idcard.png',
        defaultImgGeRen:'/static/geren.png',
        driverInformation: {},
        loading: false,
           tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
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
            let driverId = this.$route.query.driverId;
            this.DriverInfo(driverId);
        },
        DriverInfo(driverId){
            aflcDriverInfo(driverId).then(res => {
                console.log(res)
                this.driverInformation = res.data;
                this.driverInformation.registerTime = parseTime(this.driverInformation.registerTime);
                this.driverInformation.authNoPassCause = this.driverInformation.authNoPassCause ? this.driverInformation.authNoPassCause : {"车辆45°":"上传合格","行驾证":"上传合格","驾驶证":"上传合格","手持身份证":"上传合格","身份证正面":"上传合格"};
                this.driverInformation.authNoPassCause = JSON.parse(this.driverInformation.authNoPassCause);
                console.log('this.driverInformation.authNoPassCause',this.driverInformation.authNoPassCause)
            })
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .detailsInfo{
        .collapseInfo{
            .essentialInformation_img{

            }
        }
    }
</style>
