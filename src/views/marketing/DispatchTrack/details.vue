<template>
    <!-- 详情 -->
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="订单基本信息" name="1">
            <div class="essentialInformation">
                <h6>
                    <span>订单号：</span>
                    <span>{{listInformation.orderBaseInfo.orderSerial}}</span>
                </h6>
                <h6>
                    <span>货主账号：</span>
                    <span>{{listInformation.orderBaseInfo.shipperMobile}}</span>
                </h6>
                <h6>
                    <span>货主姓名：</span>
                    <span>{{listInformation.orderBaseInfo.shipperName}}</span>
                </h6>
                <h6>
                    <span>订单分布区域：</span>
                    <span>{{listInformation.orderBaseInfo.belongCity}}</span>
                </h6>
                <h6 class="minwidth">
                    <span>订单分类：</span>
                    <span>{{listInformation.orderBaseInfo.orderTypeName}}</span>
                </h6>
            </div>
            <div class="essentialInformation">
                <h6>
                    <span>订单类型：</span>
                    <span>{{listInformation.orderBaseInfo.orderClass === '1' ? '实时用车' : '预约用车'}}</span>
                </h6>
                <h6>
                    <span>用车时间：</span>
                     <span>{{listInformation.orderBaseInfo.useCarTime}}</span>
                </h6>
                <h6>
                    <span>货主用车类型：</span>
                    <span>{{listInformation.orderBaseInfo.carTypeName}} - {{listInformation.orderBaseInfo.spec}}</span>
                </h6>
                <h6>
                    <span>发货地址：</span>
                    <span>{{listInformation.orderBaseInfo.aflcOrderAddresses[0].viaAddress}}</span>
                </h6>
            </div>
            <div class="essentialInformation">
                <h6>
                    <span>货物名称：</span>
                    <span>{{listInformation.orderBaseInfo.goodsName}}  {{listInformation.orderBaseInfo.goodsWeight}}吨  {{listInformation.orderBaseInfo.goodsVolume}}方</span>
                </h6>
                <h6>
                    <span>额外服务：</span>
                    <span>{{listInformation.orderBaseInfo.extraName}}</span>
                </h6>
                <h6>
                    <span>收货联系人：</span>
                    <span>{{listInformation.orderBaseInfo.receiverPhone}}</span>
                </h6>
                <h6>
                    <span>收货人电话：</span>
                    <span>{{listInformation.orderBaseInfo.receiverPhone}}</span>
                </h6>
                <h6 class="minwidth">
                    <span>我的司机 优选接单：</span>
                    <span>{{listInformation.orderBaseInfo.isFirst == 1 ? '已选':'未选'}}</span>
                </h6>
            </div>
            <div class="essentialInformation">
                <h6 v-if="listInformation.orderBaseInfo.aflcOrderAddresses.length > 2" class="morewidth">
                    <span>途径地址：</span>
                        <p >
                            <span class="spanDiv" v-for="(obj,idx) in listInformation.orderBaseInfo.aflcOrderAddresses.slice(1,-1)" :key="obj.id">途径地{{idx+1}}：{{obj.viaAddress}}</span>
                        </p>
                </h6>
                <h6 v-else class="morewidth">
                    <span>途径地址：</span>
                    <span>暂无途径地点</span>
                </h6>
                <h6 class="lesswidth">
                    <span>收货地址：</span>
                    <span>{{listInformation.orderBaseInfo.receiverAddress}}</span>
                </h6>
                <h6>
                    <span>给司机捎句话：</span>
                    <span>{{listInformation.orderBaseInfo.remark}}</span>
                </h6>
            </div>
        </el-collapse-item>
        <el-collapse-item title="运费信息" name="2">
            <div class="">
                <h6>
                    <span>运费总额：</span>
                    <span>￥{{listInformation.expenses.orderPrice.toFixed(2)}}</span>
                </h6>
                <h6>
                    <span>已优惠：</span>
                    <span></span>
                </h6>
                <h6>
                    <span>起步价：</span>
                    <span>￥{{listInformation.expenses.startPrice.toFixed(2)}}</span>
                </h6>
                <h6>
                    <span>里程数：</span>
                    <span></span>
                </h6>
                <h6>
                    <span>超里程价：</span>
                    <span>￥{{listInformation.expenses.outMileagePrice.toFixed(2)}}</span>
                </h6>
            </div>
            <div class="">
                <h6>
                    <span>超里程数：</span>
                    <span></span>
                </h6>
                <h6>
                    <span>给司机小费：</span>
                    <span></span>
                </h6>
                <h6>
                    <span>支付方式：</span>
                    <span></span>
                </h6>
                <h6>
                    <span>付款状态：</span>
                    <span></span>
                </h6>
            </div>
        </el-collapse-item>
        <el-collapse-item title="抢单记录" name="3" v-if="record == true">
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="操作时间"
                >
            </el-table-column>
            <el-table-column
                prop="name"
                label="操作事项"
                >
            </el-table-column>
            <el-table-column
                prop="address"
                label="抢单时间">
            </el-table-column>
            <el-table-column
                prop="address"
                label="距离">
            </el-table-column>
            <el-table-column
                prop="address"
                label="本日与该货主交易次数"
                width="110">
            </el-table-column>
            <el-table-column
                prop="address"
                label="本月与该货主交易次数"
                width="110">
            </el-table-column>
            <el-table-column
                prop="address"
                label="本月累计交易次数"
            >
            </el-table-column>
            </el-table>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
export default {
    name: 'detailsComponent',
    props: {
        listInformation:{
            type:Object,
            required:true
        },
        record:{
            type:Boolean,
            
        }
    },
    components:{
    },
    data() {
      return {
        activeNames: ['1','2','3'],
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
      };
    },
     // computed: {
    // 　　newValue() {
    // 　　　　return this.b.c
    // 　　}
    // },
    watch:{
      
        
    },
    mounted(){
        // this.init();

        console.log('this.listInformation:',this.listInformation)
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },
        init(){

        }

    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .el-collapse{
        border-bottom:0 none ;
        padding: 0 10px;
        .el-collapse-item{
            margin-bottom:5px;
            .el-collapse-item__header{
                text-align: center;
                background-color: #e9f3fa;
                font-size:16px;
                color: #333333;
                .el-icon-arrow-right{
                    margin-right:0;
                    float: left;
                    margin-left:15px;
                }
            }
            .el-collapse-item__wrap{
                background-color: #f0f0f0;
                margin:4px 0;
                border:0 none ;
                width:100%;
                padding:20px;
                font-size: 13px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 20px;
                letter-spacing: 0px;
                color: #666666;
                h6{
                    display: inline-block;
                    color:#333333;
                    vertical-align: top;
                    p{
                        display: inline-block;
                        vertical-align: top;
                        span{
                            color: #333;
                        }
                    }
                    span{
                        color:#666;
                    }
                    span:nth-child(2){
                        color: #333;
                    }
                }
                .el-collapse-item__content{
                    padding-bottom:0;
                    &>div{
                        margin-top: 3px;
                    }
                    & div:nth-child(2n-1){
                        background: #f8f0e5;
                    }
                    .essentialInformation{
                        line-height: 30px;
                        h6{
                            width: 259px;
                            .spanDiv{
                                display: block;
                            }
                        }
                        .minwidth{
                            width: 200px;
                        }
                        .morewidth{
                            width: 522px;
                        }
                        .lesswidth{
                            width: 521px;
                        }
                    }
                }
            }
            .el-table{
                position:static;    
                th,td{
                    border-bottom:0 none;
                    border-color:none;
                    background:#f0f0f0;
                    text-align:center;
                }
                &::before {
                    height:0px;
                    width:0px;
                }
            }
        }
    }
</style>