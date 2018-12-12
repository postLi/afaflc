<template>
 <div class="TCorderInfo clearfix" v-if="formData.length != 0">
        <!-- 照片信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>照片信息</h2>
            <div class="essentialInformationPhoto">
                <p>
                    <span>回单照片：</span>
                    <span v-if="formData.receiptUrls">          
                        <span v-for="(form,keys) in formAllData.receiptUrls" :key='keys'>        
                       <div class="upload" v-viewer >
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img :src="formData.receiptUrls[keys]">
                        </el-tooltip> 
                      </div>
                      </span>     
                    </span>
                    <span v-else></span>
                 </p>
            </div>
        </div>
 
         <!-- 评价信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>评价信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>货主评价物流公司：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>评价内容：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>评价标签：</span>
                    <span>1</span>
                </p>                  
            </div>
            <div class="essentialInformation">
                <p>
                    <span>物流公司评价货主：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>评价内容：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>评价标签：</span>
                    <span>1</span>
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
                     <i class="orderExtraStyle">{{formData.orderExtraCodesName}}</i>
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
import {findByOrderSerial,getFCLOrderByOrderSerial} from '@/api/order/logistics/logistics.js'
export default {
    data(){
        return{
        formData:[]
        }
    },
    methods:{
    firstblood(){   
        // findByOrderSerial(this.$route.query.orderSerial).then(res=>{
        //  console.log('data111111111111:',res)
        // })
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
            width: 50%
        }
    }
    }
}
</style>
