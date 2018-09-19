<template>
    <div class="ordertrack clearfix">
        <div class="orderTrackTitle orderTrackStyle">
            <h2>时间</h2>
            <h2>操作事项</h2>
            <h2>定位</h2>
            <h2>备注</h2>
            <h2>实际行驶时间</h2>
            <h2>与装卸点距离</h2>
        </div>
        <div class="orderTrackInfo orderTrackStyle" v-for="(item,key) in listInformation" :key="key">
            <p :class="{current: key == 0 ,cancel:key ==  (listInformation.length-1)}"><i></i><span>{{item.createTime | parseTime}}</span></p>
            <p>{{item.remark}}</p>
            <p>{{item.address}}</p>
            <p>{{item.remark}}</p>  
            <p>{{item.runException}}</p>
            <p>{{item.loadAndUnloadException}}</p>
        </div>
    </div>
</template>

<script>

import { orderDetailsList } from '@/api/order/ordermange'
import { parseTime } from '@/utils/index.js'
export default {
    name: 'ordertrack',
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
            totalCount:0,
            page:1,
            pagesize:20,
            sizes:[20,30,50],
            listInformation: []
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
                this.listInformation = res.data.aflcOrderFollowingFiles;
                this.loading = false;
            })
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ordertrack{
        padding: 10px 20px;
        .orderTrackStyle{
           
            p,h2{
                width: 15%;
                margin: 0 1%;
            }
            p:last-child,h2:last-child{
                width: 200px;
                margin: 0;
            }
            h2{
                display: inline-block;
                font-size: 16px;
                color: #666666;
                line-height: 20px;
            }
            p{
                display: inline-block;
                font-size: 14px;
                color: #333;
                line-height: 24px;
            }
            
            h2:first-child{
                padding-left:50px; 
            }
            .current{
                i{
                    background: url("../../../../assets/zhishi2.png") no-repeat center !important;
                }
                span{
                    background: url("../../../../assets/jiantou1.png") no-repeat !important;
                    color: #ffffff !important;
                }
                &::before{
                    background-color: #3e9ff1 !important;
                }
            }
            p:first-child{
                padding-left:26px; 
                position: relative;
                i{
                    display: block;
                    width: 18px;
                    height: 18px;
                    position: absolute;
                    left: 0;
                    top: 4px;
                    background: url("../../../../assets/zhishi1.png") no-repeat center;
                    background-size:100% 100%;
                }
                span{
                    display: inline-block;
                    line-height: 24px;
                    vertical-align: middle;
                    background:  #3e9ff1;
                    color: #333;
                    padding: 0 20px;
                    background: url("../../../../assets/jiantou2.png") no-repeat;
                    background-size:100% 100%;
                }
                // span:first-child{
                //     display: inline-block;
                //     width:0px;
                //     height:0px;
                //     background: none;
                //     border-top:12px solid rgba(0,0,0,0);
                //     border-right:19px solid  #3e9ff1;
                //     border-bottom:12px solid rgba(0,0,0,0);
                //     border-left:12px solid  rgba(0,0,0,0);
                // }
                // span:nth-child(2){
                //     padding: 0 10px;
                // }

                &::before{
                    content: '';
                    position: absolute;
                    top: 22px;
                    left: 8px;
                    width: 2px;
                    height: 22px;
                    background-color: #e2e2e2;
                }
            }

            .cancel{
                &::before{
                    width: 0 !important;
                }
            }
          
        }
        .orderTrackInfo{
            margin: 15px 0;
        }
    }
    
</style>
