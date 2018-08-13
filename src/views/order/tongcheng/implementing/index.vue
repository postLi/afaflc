<template>
    <div class="implement">
        <el-tabs v-model="orderName" type="card" @tab-click="handleClick" >
            <el-tab-pane  
            v-for="item in visibleTabs"
            :key="item.name"
            :label="item.label"
            :name="item.name">
                <implementComponent :isvisible="orderName === item.name" :status = "item.type"></implementComponent>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/javascript">

    import implementComponent from './implementOrder.vue'

    export default {
      name:'orderTrack',
      components:{
          implementComponent
        },
        data() {
          return {
            orderName:'tihuo',
            visibleTabs:[
                {label:"待提货",name:"tihuo",type:'AF0080601PT'},
                {label:"待到车",name:"daoche",type:'AF0080602PT'},
                {label:"待装货",name:"zhuanghuo",type:'AF0080603PT'},
                {label:"完成装货",name:"wczhuanghuo",type:'AF0080604PT'},
                {label:"运输中",name:"yunshu",type:'AF0080605PT'},
                {label:"待卸货",name:"xiehuo",type:'AF0080606PT'},
                {label:"完成卸货",name:"wcxiehuo",type:'AF0080607PT'},
            ]
          };
        },
        watch:{
            orderName(newVal,oldVal){
                // console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.orderName = newVal;
                }else{
                    this.orderName = oldVal;
                }
            }
        },
        created() {
            this.orderName = localStorage.getItem('orderName') || 'tihuo';
        },

        beforeUpdate () {
            localStorage.setItem('orderName', this.orderName);
        },

        beforeDestroy () {
            localStorage.setItem('orderName', 'tihuo');
        },
        methods: {

            handleClick(tab, event) {
                // console.log(tab, event);
                this.orderName = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    .implement{
        height:100%;    
      
    }
</style>