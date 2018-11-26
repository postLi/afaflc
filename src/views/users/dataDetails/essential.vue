<template>
    <div class="detailsInfo detailsArrange" v-loading="loading">
        <!-- 基本信息 -->
        <div class="detailsInfo-collapse collapseInfo">
            <h2>概要信息</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">注册日期：</el-col>
                    <el-col :span="3">{{shipperInformation.createTime | parseTime}}</el-col>
                    <el-col :span="3">注册渠道：</el-col>
                    <el-col :span="3">{{shipperInformation.registerOriginName}}</el-col>
                    <el-col :span="3">已加入天数：</el-col>
                    <el-col :span="3"></el-col>
                    <el-col :span="3">最近登录时间：</el-col>
                    <el-col :span="3"></el-col>
                    <!-- 第二行 -->
                    <el-col :span="3">用户姓名：</el-col>
                    <el-col :span="3">{{shipperInformation.shipperName}}</el-col>
                    <el-col :span="3">手机号码：</el-col>
                    <el-col :span="3">{{shipperInformation.mobile}}</el-col>
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
                    <el-col :span="3">货主审核通过：</el-col>
                    <el-col :span="3">{{shipperInformation.shipperStatusName}}</el-col>  
                    <el-col :span="3">身份状态：</el-col>
                    <el-col :span="3">{{shipperInformation.shipperTypeName}}</el-col>
                    <el-col :span="3">审核通过时间：</el-col>
                    <el-col :span="9">{{shipperInformation.registerTime | parseTime}}</el-col>

                    <!-- 第二行 -->
                    <el-col :span="3">企业名称：</el-col>
                    <el-col :span="3">{{shipperInformation.companyName}}</el-col>
                    <el-col :span="3">统一社会信用代码：</el-col>
                    <el-col :span="3">{{shipperInformation.creditCode}}</el-col>
                    <el-col :span="3">企业地址：</el-col>
                    <el-col :span="9">{{shipperInformation.belongCityName}}</el-col> 

                    <!-- 第三行 -->
                    <el-col :span="3">所属商圈：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">主营业务：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">业务覆盖：</el-col>                                        
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">常用车型：</el-col>
                    <el-col :span="3">暂无</el-col>

                    <!-- 第四行 -->
                    <el-col :span="3">业务联系人：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">联系电话：</el-col>
                    <el-col :span="3">{{shipperInformation.mobile}}</el-col>
                </el-row>
            </div>
            <div class="essentialInformation_img" v-viewer>
                <el-row class="basicInfo_img" :span='24'>
                    <el-col :span="12">
                        <h6>公司或档口门头照：</h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='shipperInformation.companyFacadeFile  ? shipperInformation.companyFacadeFile : defaultImg45' alt="">
                        </el-tooltip>   

                    </el-col>
                    <el-col :span="12">
                        <h6>发货人名片：</h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='shipperInformation.shipperCardFile ? shipperInformation.shipperCardFile : defaultImgCarCard' alt="">
                        </el-tooltip>   
                    </el-col>
                </el-row>
                <el-row class="basicInfo_img" :span='24'>
                    <el-col :span="12">
                        <h6>营业执照：</h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='shipperInformation.businessLicenceFile ? shipperInformation.businessLicenceFile : defaultImgDriverCard' alt="">
                        </el-tooltip>   
                    </el-col>
                    <el-col :span="12">
                        <h6>其他照片：</h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='defaultImgIdCard' alt="">
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
                    :page-sizes="size"
                    layout="total, prev, pager, next, jumper"
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
import { aflcShipperInfo  } from "@/api/users/shipperDetails/index.js";



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
        defaultImg:'/static/test.jpg',//默认第一张图片的url
        defaultImg45:'/static/45du.png',
        defaultImgCarCard:'/static/carcard.png',
        defaultImgDriverCard:'/static/drivercard.png',
        defaultImgIdCard:'/static/idcard.png',
        defaultImgGeRen:'/static/geren.png',
        shipperInformation: {},
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
            let userId = this.$route.query.userId;
            this.ShipperInfo(userId);

        },
        ShipperInfo(userId){
            aflcShipperInfo(userId).then(res => {
                this.shipperInformation = res.data;
            })
        },
        handlerClick() {
            
        },
        // handlePageChange(obj) {
        //     this.page = obj.pageNum
        //     this.pagesize = obj.pageSize
        //     this.init();
        // },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
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
