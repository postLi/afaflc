<template>
    <div class="workOrder onlineCommonStyle">
        <div class="onlineTitle">
            <div class="onlineTitle_left">订 单 处 理</div>
        </div>
        <div class="onlineService_content">
            <div class="onlineService_content_right workOrder_right">
                <div class="workOrder_right_type workOrder_right_typeBottom" v-for="(item,index) in workOrderType" :key="index" :class="{currentClick:item.iscur}"   @click="setCur(index,'workOrder',item.label)">
                    <span>{{item.count}}</span>
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'workOrder',
    data(){
        return {
            workOrderType:[{
                name:'待处理',
                count:0,
                iscur:false
            },{
                name:'当天已处理',
                count:10,
                iscur:false
            },{
                name:'当月已处理',
                count:250,
                iscur:false
            },{
                name:'待处理',
                count:0,
                iscur:false
            },{
                name:'当天已处理',
                count:10,
                iscur:false
            },{
                name:'当月已处理',
                count:620,
                iscur:false
            }]
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
    },
}
</script>
