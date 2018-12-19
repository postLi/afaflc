<template>
    <div class="workOrder onlineCommonStyle">
        <div class="onlineTitle">
            <div class="onlineTitle_left">账 号 审 核</div>
        </div>
        <div class="onlineService_content">
            <div class="onlineService_content_right workOrder_right">
                <div class="workOrder_right_typeBottom workOrder_right_type" v-for="(item,index) in workOrderType" :key="index" :class="{currentClick:item.iscur}"   @click="setCur(index,'workOrder',item.label)">
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
                name:'货主待认证',
                count:0,
                iscur:false
            },{
                name:'车主待认证',
                count:10,
                iscur:false
            },{
                name:'物流公司待认证',
                count:250,
                iscur:false
            },{
                name:'货主认证不通过',
                count:0,
                iscur:false
            },{
                name:'车主认证不通过',
                count:10,
                iscur:false
            },{
                name:'物流公司认证不通过',
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
