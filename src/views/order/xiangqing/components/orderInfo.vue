<template>
    <div class="TCorderInfo clearfix" v-loading="loading" v-if="listInformation.length != 0">
        <!-- 基本信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>基础信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>订单编号：</span>
                    <span>{{listInformation.orderSerial}}</span>
                 </p>
                <p>
                    <span>所属区域：</span>
                    <span>{{listInformation.belongCity}}</span>
                </p>
                <p>
                    <span>服务分类：</span>
                    <span>{{listInformation.orderType}}</span>
                </p>
                <p>
                    <span>订单状态：</span>
                    <span>{{listInformation.orderStatus}}</span>
                    <el-button class="ifzhipai fr" icon="el-icon-edit" v-if="listInformation.parentOrderStatus == 'AF00805'" @click="handlerClick('appoint')"  type="primary" size="mini" plain>指派司机</el-button>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>订单类型：</span>
                    <span>{{listInformation.orderClass}}</span>
                </p>
                <p>
                    <span>用车时间：</span>
                    <span>{{listInformation.useCarTime | parseTime}}</span>
                </p>
                <p>
                    <span>下单时间：</span>
                    <span>{{listInformation.useTime | parseTime}}</span>
                </p>
                <p>
                    <span>货主账号：</span>
                    <span class="fontRed routerJump" @click="pushOrderSerial(listInformation.shipperId,'shipper')">{{listInformation.shipperMobile}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>货主姓名：</span>
                    <span class="fontRed">{{listInformation.shipperName}}</span>
                </p>        
                <p>
                    <span>所需车型：</span>
                    <span>{{listInformation.usedCarType}} </span>
                    <span v-if="listInformation.spec">- {{listInformation.spec}}</span>
                </p>
                <p>
                    <span>我的司机优先接单：</span>
                    <span>{{listInformation.isFirst == 1 ? '已选' : '未选'}}</span>
                </p>
                <p>
                    <span>订单来源：</span>
                    <span>{{listInformation.orderFrom}}</span>
                </p>
            </div>
        </div>
        <!-- 地址信息 -->
        <div class="address-collapse collapseInfo">
            <h2>地址信息</h2>
            <div class="essentialInformation" v-for="(obj,idx) in listInformation.aflcOrderAddresses" :key="obj.id">
                <p class="morewidth">
                    <span v-if="idx == 0">发货地：</span>
                    <span v-else-if="idx == listInformation.aflcOrderAddresses.length-1">收货地：</span>
                    <span v-else>途径地{{ listInformation.aflcOrderAddresses.length >3 ? idx : ''}}：</span>
                    <span>{{obj.viaAddressName}}({{obj.provinceCityArea}}{{obj.viaAddress}})</span>
                </p>
                <p>
                    <span v-if="idx == 0">发货人：</span>
                    <span v-else>收货人：</span>
                    <span>{{obj.contacts ? obj.contacts : obj.contactsPhone}}</span>
                </p>
                    <p>
                    <span>联系方式：</span>
                    <span>{{obj.contactsPhone}}</span>
                </p>
            </div>
        </div>
        <!-- 货物及备注 -->
        <div class="mark-collapse collapseInfo">
            <h2>货物及备注</h2>
            <div class="essentialInformation">
                <p>
                    <span>货物名称：</span>
                    <span v-if="listInformation.goodsName">{{listInformation.goodsName}}</span>
                    <span v-else>未填写</span>
                 </p>
                <p>
                    <span>重量体积：</span>
                    <span v-if="listInformation.goodsWeight || listInformation.goodsVolume">{{listInformation.goodsWeight ? listInformation.goodsWeight+'吨' : ''}} {{listInformation.goodsVolume ? listInformation.goodsVolume + '方':''}}</span>
                    <span v-else>未填写</span>
                </p>
                <p>
                    <span>额外服务：</span>
                    <span v-if="listInformation.extraName" class="fontRed">{{listInformation.extraName}}</span>
                    <span v-else>未填写</span>
                </p>
                <p>
                    <span>备注：</span>
                    <span v-if="listInformation.remark">{{listInformation.remark}}</span>
                    <span v-else>未填写</span>
                </p>
            </div>
        </div>

        <!-- 运费信息 -->
        <div class="yunfei-collapse collapseInfo">
            <h2>运费信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>运费总额：</span>
                    <span class="fontRed">￥{{listInformation.totalAmount}}</span>
                 </p>
                <p>
                    <span>货主支付：</span>
                    <span class="fontRed">{{listInformation.aflcOrderExpenses.factPay ? '￥' + listInformation.aflcOrderExpenses.factPay :'暂未结算'}}</span>
                    <span v-if="listInformation.payWay">({{listInformation.payWay}})</span>
                </p>
                <p> 
                    <span>车主收入：</span>
                    <span class="fontRed" v-if="listInformation.aflcOrderExpenses.driverIncome">￥{{listInformation.aflcOrderExpenses.driverIncome}}</span>
                    <span v-else>暂未结算</span>
                </p>
                <p>
                    <span>付款状态：</span>
                    <span class="fontRed">{{listInformation.payStatus}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>里程数：</span>
                    <span>{{listInformation.aflcOrderExpenses.totalMileage}}公里</span>
                </p>
                <p>
                    <span>起步价：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.startPrice}}</span>
                </p>
                <p>
                    <span>超里程费：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.outMileagePrice}}</span>
                    <span v-if="listInformation.aflcOrderExpenses.outMileagePrice != 0">({{listInformation.outMileage}} 公里)</span>
                </p>
                <p>
                    <span>额外服务费：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.totalExtraCharge}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>等候费：</span>
                    <span v-if="listInformation.aflcOrderExpenses.unloadingFee">￥{{listInformation.aflcOrderExpenses.unloadingFee}}</span>
                    <span class="noneNun" v-else>无</span>

                </p>
                <p>
                    <span>小费：</span>
                    <span v-if="listInformation.aflcOrderExpenses.tip">￥{{listInformation.aflcOrderExpenses.tip}} </span>
                    <span class="noneNun" v-else>无</span>
                   
                </p>
                <p>
                    <span>车主改价：</span>
                    <span v-if="listInformation.aflcOrderExpenses.driverChangeFee">￥{{listInformation.aflcOrderExpenses.driverChangeFee}}</span>
                    <span class="noneNun" v-else>无</span>
                </p>
                <p>
                    <span>优惠券抵扣：</span>
                    <span v-if="listInformation.aflcOrderExpenses.preferentialPrice">￥{{listInformation.aflcOrderExpenses.preferentialPrice}}</span>
                    <span class="noneNun" v-else>无</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>在线交易优惠金：</span>
                    <span v-if="listInformation.aflcOrderExpenses.reward">￥{{listInformation.aflcOrderExpenses.reward}}</span>
                    <span class="noneNun" v-else>无</span>
                </p>
                <p>
                    <span>在线交易奖励金：</span>
                    <!-- <span v-if="listInformation.aflcOrderExpenses.reward">￥{{listInformation.aflcOrderExpenses.reward}}</span> -->
                    <!-- <span class="noneNun" v-else>无</span> -->
                </p>
                <p>
                    <span>平台抽佣：</span>
                    <!-- <span v-if="listInformation.aflcOrderExpenses.reward">￥{{listInformation.aflcOrderExpenses.reward}}</span> -->
                    <!-- <span class="noneNun" v-else>无</span> -->
                </p>
            </div>
        </div>

        <!--  车主信息 -->
        <div class="mark-collapse collapseInfo">
            <h2> 车主信息</h2>
            <div v-if="listInformation.aflcDriverStatus">
                <div class="essentialInformation">
                    <p>
                        <span>车主账号：</span>
                        <span class="routerJump"  @click="pushOrderSerial(listInformation.aflcDriverStatus.driverId,'car')">{{listInformation.aflcDriverStatus.driverMobile}}</span>
                    </p>
                    <p>
                        <span>车主姓名：</span>
                        <span>{{listInformation.aflcDriverStatus.driverName}}</span>
                    </p>
                    <p>
                        <span>车牌号：</span>
                        <span>{{listInformation.aflcDriverStatus.carNumber}}</span>
                    </p>
                    <p>
                        <span>车型：</span>
                        <span>{{listInformation.aflcDriverStatus.carType}}</span>
                    </p>
                </div>
            
                <div class="essentialInformation">
                    <p>
                        <span>中单等级：</span>
                        <span>{{listInformation.aflcDriverStatus.obtainGrade}}</span>
                    </p>
                    <p>
                        <span>派单方式：</span>
                        <span>{{listInformation.aflcDriverStatus.dispatchWay? listInformation.aflcDriverStatus.dispatchWay : '未知'}}</span>
                    </p>
                </div>
            </div>

            <div class="essentialInformationNull" v-else>
                <img src="../../../../assets/icom/25xinxi.png" alt="">
                <span>车主未接单!</span>
            </div>
        </div>

        <!--  客服备注 -->
        <div class="mark-collapse collapseInfo">
            <h2> 
                客服备注
                <el-button icon="el-icon-circle-plus" @click="handlerClick('remark')"  type="primary" size="mini" plain>添加备注</el-button>
            </h2>
            <div v-if="listInformation.aflcOrderRemarks.length != 0">
                <div class="essentialInformation"  v-for="item in listInformation.aflcOrderRemarks" :key="item.remarkId">
                    <p>
                        <span>客服：</span>
                        <span>{{item.userName}}</span>
                    </p>
                    <p>
                        <span>备注时间：</span>
                        <span>{{item.createTime | parseTime}}</span>
                    </p>
                    <p class="markInfo remakInfo">
                        <span>备注内容：</span>
                        <el-tooltip placement="top-start" effect="light">
                            <div slot="content">{{item.remark}}</div>
                            <span>{{item.remark}}</span>    
                        </el-tooltip>
                    </p>
                </div>
            </div>
            <div class="essentialInformationNull" v-else>
                <img src="../../../../assets/icom/25xinxi.png" alt="">
                <span>客服未备注!</span>
            </div>
        </div>
        <remarkerInfo :dialogVisible.sync="dialogVisible" :orderSerial = "currentOrderSerial"   @close = "shuaxin"/>
        <appointDriver :dialogFormVisible.sync = "dialogFormVisible" :orderSerial = "appontOrderSerial" @close = "shuaxin" ></appointDriver>

    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import { orderDetailsList,getOrderDetail } from '@/api/order/ordermange'
import remarkerInfo from './remakInfo'
import appointDriver from '../../tongcheng/components/appointDriver'

export default {
  name: 'TCorderInfo',
  components: {
    remarkerInfo,
    appointDriver
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
        loading: true,
        dialogVisible: false,
        currentOrderSerial: '',
        appontOrderSerial: '',
        dialogFormVisible: false
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
    $route(to, from) {
        console.log('to.path', to.path)
      }

  },
  mounted() {
        // console.log(this.$route)
  },
  methods: {
    init() {
        const orderSerial = this.$route.query.orderSerial
        this.loading = true
        orderDetailsList(orderSerial).then(res => {
              console.log('details', res)
              this.listInformation = res.data
              this.listInformation.aflcOrderAddresses.sort(function(a, b) {
                  return a.viaOrder - b.viaOrder
                })
              this.loading = false
            }).catch(err => {
              this.$message({
                type: 'info',
                message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err.text
              })
              this.loading = false
            })
      },
    shuaxin() {
        this.init()
      },
    handlerClick(type) {
        switch(type){
            case 'appoint':
                this.appontOrderSerial = this.$route.query.orderSerial;
                this.dialogFormVisible = true
                break;
            case 'remark':
                this.currentOrderSerial = this.$route.query.orderSerial;
                this.dialogVisible = true;
                break;
        }
      },
    pushOrderSerial(userId,type){
        switch(type){
            case 'shipper':
                this.$router.push({name: '货主详情',query:{ userId:userId}});
                break;
            case 'car':
                this.$router.push({name: '车主详情',query:{ userId:userId}});
                break;
        }
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .TCorderInfo{
        .mark-collapse{
            h2{
                position: relative;
                .el-button{
                    position: absolute;
                    right: 0;
                    bottom:8px;
                }
            }
        }
        .remakInfo{
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss">
    .TCorderInfo{
        .collapseInfo .essentialInformation .ifzhipai span{
            overflow: inherit; 
            height: auto; 
            color: #0588c3;
        }
        .collapseInfo .essentialInformation .ifzhipai:hover {
            background: #0588c3;
            border-color: #0588c3;
            color: #fff;
            span{
                color:#fff;
            }
        }
    }
</style>
