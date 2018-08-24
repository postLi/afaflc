<template>
    <div class="rate clearfix" v-loading = "loading">
        <h2>照片信息</h2>
        <div class="essentialInformation">
            <h6>
                <span>车主账号：</span>
            </h6>
            <h6>
                <span>车主姓名：</span>
            </h6>
            <h6>
                <span>车牌号：</span>
            </h6>
            <h6>
                <span>车型：</span>
            </h6>
        </div>
        <h2>照片信息</h2>
        <div class="essentialInformation">
            <h6>
                <span>车主账号：</span>
            </h6>
            <h6>
                <span>车主姓名：</span>
            </h6>
            <h6>
                <span>车牌号：</span>
            </h6>
            <h6>
                <span>车型：</span>
            </h6>
        </div>
        <h2>照片信息</h2>
        <div class="essentialInformation">
            <h6>
                <span>车主账号：</span>
            </h6>
            <h6>
                <span>车主姓名：</span>
            </h6>
            <h6>
                <span>车牌号：</span>
            </h6>
            <h6>
                <span>车型：</span>
            </h6>
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
                this.tableData = res.data.aflcOrderGrabs;
                this.loading = false;
            })
        },
      
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .rate{

    }
    
</style>
