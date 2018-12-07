<template>
    <div class="implement tabsWrap">
        <el-tabs type="card" @tab-click="handleClick" v-model="orderTabName">
            <el-tab-pane  
            v-for="item in visibleTabs"
            :key="item.name"
            :label="item.label"
            :name="item.name">
            <publiceComponent :status = "item.type"></publiceComponent> 
            </el-tab-pane>
        </el-tabs>
            </div>
</template>

<script>
  import publiceComponent from './publice/component.vue'
export default {
    data(){
        return{
            orderTabName:'tihuo',
            visibleTabs:[
                {label:"待提货",name:"tihuo",type:'AF0510201'},
                {label:"待发货",name:"fache",type:'AF0510202'},
                {label:"待签收",name:"qianshou",type:'AF0510203'},
                {label:"待确认收货",name:"shouhuo",type:'AF0510204'},
            ]
        }
    },
    components:{
        publiceComponent
    },
    methods:{
         handleClick(tab, event) {
        this.orderTabName = tab.name;
    }
    }
}
</script>

<style lang="sass" scoped>

</style>

