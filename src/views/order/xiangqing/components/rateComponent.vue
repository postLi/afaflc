<template>
    <div class="rate clearfix" v-loading = "loading">
        <div class="ratePicture collapseInfo">
            <h2>照片信息</h2>   
            <div class="essentialInformation">
                <p>
                    <span>装货照片：</span>
                    <img src="../../../../../static/test.jpg" v-showPicture imgurl="../../../../../static/test.jpg" alt="">
                </p>
                <p>
                    <span>回单照片：</span>
                    <img src="../../../../../static/test.jpg" v-showPicture imgurl="../../../../../static/test.jpg" alt="">
                    <img src="../../../../../static/test.jpg" v-showPicture imgurl="../../../../../static/test.jpg" alt="">
                    <img src="../../../../../static/test.jpg" v-showPicture imgurl="../../../../../static/test.jpg" alt="">
                    <img src="../../../../../static/test.jpg" v-showPicture imgurl="../../../../../static/test.jpg" alt="">
                </p>
            </div>
        </div>
        <div class="rateInfo collapseInfo">
            <h2>评价信息</h2>   
            <div class="essentialInformation">
                <p>
                    <span>货主评价车主：</span>
                </p>
                <p>
                    <span>评价内容：</span>
                </p>
                <p>
                    <span>评价标签：</span>
                </p>
            </div>
             <div class="essentialInformation">
                <p>
                    <span>车主评价货主：</span>
                </p>
                <p>
                    <span>评价内容：</span>
                </p>
                <p>
                    <span>评价标签：</span>
                </p>
            </div>
        </div>
        <div class="rateHuidan collapseInfo">
            <h2>回单信息</h2>   
            <div class="essentialInformation">
                <p>
                    <span>车主回单时间：</span>
                </p>
                <p>
                    <span>快递公司：</span>
                </p>
                 <p>
                    <span>快递单号：</span>
                </p> 
                <p>
                    <span>货主收到回单时间：</span>
                </p>
            </div>
        </div>
        <div class="rateHuikuan collapseInfo">
            <h2>汇款信息信息</h2>   
            <div class="essentialInformation">
                <p>
                    <span>车主回款时间：</span>
                </p>
                <p>
                    <span>货主收到回款时间：</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { orderDetailsList } from '@/api/order/ordermange'

export default {
    name: 'rate',
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
            loading:true,
        };
    },
    watch:{
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal){
                    this.init();
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted(){
        // this.init();
    },
    methods: {
        init(){
            orderDetailsList(this.$route.query.orderSerial).then(res => {
                console.log('details',res)
                this.tableData = res.data.aflcOrderEvaluations;
                this.loading = false;
            })
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .rate{
        .ratePicture{
            .essentialInformation{
                img{
                    vertical-align: top;
                    display: inline-block;
                    width: 208px;
                    height: 118px;
                    margin-top: 10px;
                    // margin-right: 10px;
                }
                
                p:nth-child(2){
                    width: 70%;
                }
            }
        }
    }
    
</style>
