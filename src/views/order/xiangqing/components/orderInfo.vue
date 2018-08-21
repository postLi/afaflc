<template>
    <div class="TCorderInfo clearfix">
        <div class="orderInfo-collapse">
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
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>订单类型：</span>
                    <span>{{listInformation.orderClass === '1' ? '实时订单' : '预约订单'}}</span>
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
                    <span class="fontRed">{{listInformation.shipperMobile}}</span>
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
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import { orderDetailsList } from '@/api/order/ordermange'


export default {
    name: 'TCorderInfo',
    components:{

    },
    props: {
        isvisible: {
            type: Boolean,
            default: false
        },
       
    },
    data() {
        return {
            listInformation:[],
        };
    },
    watch:{
       
    },
    mounted(){
        this.init();
    },
    methods: {
        init(){
           orderDetailsList(this.$route.query.orderSerial).then(res => {
                console.log('details',res)
                this.listInformation = res.data;
                this.listInformation.aflcOrderAddresses.sort(function(a,b){  
                    return a.viaOrder - b.viaOrder;  
                })
                this.loading = false;
            })
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .TCorderInfo{
        .orderInfo-collapse{
            border: 1px solid #e2e2e2;
            background: #ffffff;
            color: #333;
            padding: 0 24px;
            h2{
                font-size: 16px;
                line-height: 20px;
                padding: 19px 0 10px 0;
                border-bottom: 1px solid #e2e2e2; 
            }
            .essentialInformation{
                font-size: 14px;
                margin: 5px;
                p{
                    display: inline-block;
                    color:#333333;
                    line-height: 30px;
                    vertical-align: top;
                    width: 24%;
                    font-size: 14px;
                    .spanDiv{
                        display: block;
                    }
                    span{
                        color:#333;
                        display: inline-block;
                    }
                    span:first-child{
                        text-align: center;
                        // width: 30%;
                    }
                    // span:nth-child(2){
                    //     color: #333;
                    // }
                    .fontRed{
                        color: red;
                    }
                }
                .minwidth{
                    width: 200px;
                }
                .morewidth{
                    width: 100%;
                }
                .lesswidth{
                    width: 521px;
                }
            }
        }
    }
</style>
