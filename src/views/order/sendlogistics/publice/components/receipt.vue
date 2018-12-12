<template>
 <div class="TCorderInfo clearfix" v-if="formData.length != 0">
        <!-- 照片信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>照片信息</h2>
            <div class="essentialInformationPhoto">
                <p>
                    <span>回单照片：</span>
                    <span v-if="formData.receiptUrls">          
                        <i v-for="(form,keys) in formData.receiptUrls" :key='keys'>        
                       <div class="upload" v-viewer >
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img :src="formData.receiptUrls[keys]">
                        </el-tooltip> 
                      </div>
                      </i>     
                    </span>
                    <span v-else></span>
                 </p>
            </div>
        </div>

         <!-- 评价信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>评价信息</h2>
            <div class="essentialInformation rateformation">
                <p>
                    <span>货主评价物流公司：</span>
                    <span>
                        <el-rate
                                v-if="TransportEvaluation.serverStarLevel"
                                v-model="TransportEvaluation.serverStarLevel"
                                disabled
                                score-template="{value}"
                                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                >
                         </el-rate>
                    </span>
                 </p>
                <p>
                    <span>评价内容：</span>
                    <span>{{TransportEvaluation.evaluationDes}}</span>
                 </p>         
            </div>
            <div class="essentialInformation rateformation">
                <p>
                    <span>物流公司评价货主：</span>
                    <span>
                        <el-rate
                                v-if="ShipperEvaluation.serverStarLevel"
                                v-model="ShipperEvaluation.serverStarLevel"
                                disabled
                                score-template="{value}"
                                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                >
                         </el-rate>                        
                    </span>
                 </p>
                <p>
                    <span>评价内容：</span>
                    <span>{{ShipperEvaluation.evaluationDes}}</span>
                 </p>                
            </div>
        </div>
 
        <!-- 回单信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>回单信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>是否需要回单：</span>
                    <span>{{formData.isDoorPickUp=='1'?'是':'否'}}</span>
                    <i class="orderExtraStyle">{{formData.orderExtraCodesName}}</i>
                 </p>
                <p>
                    <span>物流公司回单时间：</span>
                    <span>{{formData.companyConfirmReceiptTime}}</span>
                 </p>
                <p>
                    <span>货主收到回单时间：</span>
                    <span>{{formData.shipperConfirmReceiptTime}}</span>
                </p>                 
            </div>
        </div>

        <!-- 回款信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>回款信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>是否需要回款：</span>
                    <span>{{formData.orderExtraCodes=='1'?'是':'否'}}
                     <i class="orderExtraStyle">{{formData.extraRrice}}</i>
                    </span>
                 </p>
                <p>
                    <span>物流公司回款时间：</span>
                    <span>{{formData.companyConfirmReceivableTime}}</span>
                 </p>
                <p>
                    <span>货主收到回款时间：</span>
                    <span>{{formData.shipperConfirmReceivableTime}}</span>
                </p>                 
            </div>
        </div>
 </div>
</template>

<script>
import {aflcTransportEvaluation,getFCLOrderByOrderSerial,aflcShipperEvaluation} from '@/api/order/logistics/logistics.js'
export default {
    data(){
        return{
        formData:[],
        TransportEvaluation:{
         serverStarLevel:0,
         evaluationDes:null,
        },
        ShipperEvaluation:{
         serverStarLevel:0,
         evaluationDes:null,
        }
        }
    },
    methods:{
    firstblood(){   
        aflcTransportEvaluation(this.$route.query.orderSerial).then(res=>{
         console.log('data1:',res)
        if(res.data){
        this.TransportEvaluation = {
        serverStarLevel:Math.floor((parseInt(res.data.dockStarLevelScore)+parseInt(res.data.goodsStarLevelScore)+parseInt(res.data.payStarLevelScore))/3),
        evaluationDes:res.data.evaluationDes
        }   
         }else{
        this.TransportEvaluation = {
        serverStarLevel:4.9,
        evaluationDes:null,
        }
         }
        })
        aflcShipperEvaluation(this.$route.query.orderSerial).then(res=>{
         console.log('data2:',res)
         if(res.data){
            this.TransportEvaluation = {
            serverStarLevel:Math.floor((parseInt(res.data.dockStarLevelScore)+parseInt(res.data.goodsStarLevelScore)+parseInt(res.data.payStarLevelScore))/3),
            evaluationDes:res.data.evaluationDes,
            }
         }else{
        this.TransportEvaluation = {
        serverStarLevel:0,
        evaluationDes:null,
        }
         }

        })
        getFCLOrderByOrderSerial(this.$route.query.orderSerial).then(res=>{
        this.formData = res.data
        })
    }
    },
    mounted(){
     this.firstblood()
    }    
}
</script>

<style lang="scss">
.orderExtraStyle{
        font-style: normal;
        color: red
    }
.essentialInformationPhoto{
    p{
    display: inline-block;
    color: #333333;
    line-height: 30px;
    vertical-align: top;
    width: 49%;
    font-size: 14px;
    margin-right: 10px;
    span{
        display: inline-block;
        vertical-align:top;
        &:nth-of-type(2){
        width: 70%
        }        
        img{
            width: 208px;
        }
    }
    }
    }
    .rateformation{
        .el-rate__decimal{
            line-height: 30px;
        }
    }

</style>
