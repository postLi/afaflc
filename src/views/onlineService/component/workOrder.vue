<template>
    <div class="workOrder onlineCommonStyle">
        <div class="onlineTitle">
            <div class="onlineTitle_left">工 单 处  理</div>
        </div>
        <div class="onlineService_content">
            <div class="onlineService_content_left">
                <div class="onlineService_content_left_top onlineService_icon">
                    <img src="../../../assets/onlineService/xiehuo_kefu.png" alt="">
                    <span>咨询投诉</span>
                </div>
                <div class="onlineService_content_left_bottom onlineService_icon">
                    <img src="../../../assets/onlineService/sijijd_wusunlp.png" alt="">
                    <span>物损理赔</span>
                </div>
            </div>
            <div class="onlineService_content_right workOrder_right">
                <div class="workOrder_right_type" v-for="(item,index) in complain" :key="index + item.parentName" :class="{currentClick:item.iscur}"   @click="setCur(index,'complain',item.label)">
                    <span>{{item.count}}</span>
                    <span>{{item.name}}</span>
                </div>
                <div class="workOrder_right_type" v-for="(item,index) in goodsClaim" :key="index + item.parentName" :class="{currentClick:item.iscur}"   @click="setCur(index,'goodsClaim',item.label)">
                    <span>{{item.count}}</span>
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { aflcWorkOrderDealController } from '@/api/onlineService.js'

export default {
    name:'workOrder',
    data(){
        return {
            complain:[{
                name:'待处理',
                label:"pendingCount",
                count:0,
                parentName:'complain',
                iscur:false
            },{
                name:'当天已处理',
                label:"dealDayCount",
                count:0,
                parentName:'complain',
                iscur:false
            },{
                name:'当月已处理',
                label:"dealMonthCount",
                count:0,
                parentName:'complain',
                iscur:false
            }],
            goodsClaim:[{
                name:'待处理',
                label:"pendingCount",
                count:0,
                parentName:'goodsclaim',
                iscur:false
            },{
                name:'当天已处理',
                label:"dealDayCount",
                count:0,
                parentName:'goodsclaim',
                iscur:false
            },{
                name:'当月已处理',
                label:"dealMonthCount",
                count:0,
                parentName:'goodsclaim',
                iscur:false
            }],
            workOrderList:{},
        }
    },
    methods:{
        setCur(index,classfy,label){
            console.log(index)
            // switch(classfy){
            //     case 'workOrder':
                this.workOrderType.forEach((el,idx)=>{
                    idx == index ? el.iscur = true : el.iscur = false;
                })
                    // break;
            // }
        },
        WorkOrderDealController(){
            aflcWorkOrderDealController().then(res => {
                for (const item in this.complain) {
                    // console.log(item,this.complain[item],res.data.complain[this.complain[item].label])
                    this.complain[item].count = res.data.complain[this.complain[item].label] ? res.data.complain[this.complain[item].label] : 0;
                }

                for (const item in this.goodsClaim) {
                    console.log(item,this.goodsClaim[item],res.data.goodsclaim[this.goodsClaim[item].label])
                    this.goodsClaim[item].count = res.data.goodsclaim[this.goodsClaim[item].label] ? res.data.goodsclaim[this.goodsClaim[item].label] : 0;
                }
            })
        }
    },
    mounted(){
        this.WorkOrderDealController();
    }
}
</script>
