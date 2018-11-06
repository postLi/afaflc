<template>
    <div class="authority detailsArrange" v-loading="loading">
        <!-- 基础权益 -->
        <div class="authorityBasic-collapse collapseInfo">
            <h2>基础权益</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">查单类型：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">查单等级：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">见单类型：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">见单等级：</el-col>
                    <el-col :span="3">1</el-col>

                    <!-- 第二行 -->
                    <el-col :span="3">抢单类型：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">抢单等级：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">中单类型：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">中单等级：</el-col>
                    <el-col :span="3">1</el-col>

                    <!-- 第三行 -->
                    <el-col :span="3">身份状态：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">是否开启接单：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">是否广告车：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">可接服务：</el-col>
                    <el-col :span="3">1</el-col>

                    <!-- 第四行 -->
                    <el-col :span="3">可接用车类型：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">预约单限制数量：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">即时单与预约单时间间隔：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">多个预约单间隔限制：</el-col>
                    <el-col :span="3">1</el-col>

                    <!-- 第五行 -->
                    <el-col :span="3">公海课件订单范围：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">公海可抢订单范围：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">每天改派次数上限：</el-col>
                    <el-col :span="9">1</el-col>

                </el-row>
            </div>
        </div>
        <!-- 奖励金权益 -->
        <!-- <div class="legalInfo-collapse collapseInfo">
            <h2>奖励金权益</h2>
            <div class="authority_legal">
                <ul class="lengandInfo">
                    <li>奖励金：<span>允许使用</span></li>
                    <li>启用状态：<span>启用</span></li>
                </ul>
            </div>
            <div class="essentialInformation_table_title">
                <ul>
                   <li v-for="(item,index) in serviceType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index)">{{item.name}}</li>
                </ul>
            </div>
            <div class="essentialInformation_table" style="padding-top:1px;">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="车辆类型"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="订单金额范围"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    width="180"
                    label="一天限量">
                    </el-table-column>
                </el-table>
            </div>
        </div> -->

        <!-- 抽佣权益 -->
        <div class="legalInfo-collapse collapseInfo">
            <h2>抽佣权益</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">所属区域：</el-col>
                    <el-col :span="3">{{commission.areaName ? commission.areaName :'暂无'}}</el-col>
                    <el-col :span="3">车辆类型：</el-col>
                    <el-col :span="3">{{commission.carType ? commission.carType :'暂无'}}</el-col>
                    <el-col :span="3">车主抽佣等级：</el-col>
                    <el-col :span="3">{{commission.commissionGrade ? commission.commissionGrade : '暂无'}}</el-col>
                    <el-col :span="3">开始抽佣单数：</el-col>
                    <el-col :span="3">{{commission.startNum ? commission.startNum :'0'}}</el-col>

                    <!-- 第二行 -->
                    <el-col :span="3">结束抽佣单数：</el-col>
                    <el-col :span="3">{{commission.endNum ? commission.endNum :'0'}}</el-col>
                    <el-col :span="3">每单抽佣（%）：</el-col>
                    <el-col :span="3">{{commission.commissionPer ? commission.commissionPer:'0'}}</el-col>
                    <el-col :span="3">最低抽佣(元)：</el-col>
                    <el-col :span="3">{{commission.commissionLowest ? commission.commissionLowest : '0'}}</el-col>
                    <el-col :span="3">启用状态：</el-col>
                    <el-col :span="3">{{commission.usingStatus ? commission.usingStatus : '启用'}}</el-col>
                </el-row>
            </div>
          
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import { closest } from '@/utils/index'
import {  queryCommission } from '@/api/users/carDetails/index.js'


export default {
  name: 'authority',
  components: {
      Pager
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
        commission:{},//抽佣权益
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
    },
    methods: {
        init() {
            let driverId = this.$route.query.driverId;
            this.Commission(driverId);
        },
        Commission(userId){
            queryCommission(userId).then(res => {
                this.commission = res.data;
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .authority{
        .collapseInfo{
            .essentialInformation_table_title{
                ul{
                    overflow: hidden;
                    li{
                        float: left;
                        font-size: 16px;
                        line-height: 44px;
                        background: #d9d9d9;
                        color: #ffffff;
                        width: 120px;
                        text-align: center;
                        margin-right: 1px;
                        cursor: pointer;
                    }
                    .currentClick{
                        background: #1890ff;
                    }
                }
            }
           
        }
    }
</style>
