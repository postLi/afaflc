<template>
    <div class="implement tabsWrap">
        <el-tabs type="card" @tab-click="handleClick" v-model="orderTabName">
            <el-tab-pane  
            v-for="item in visibleTabs"
            :key="item.name"
            :label="item.label"
            :name="item.name">
            <publiceComponent></publiceComponent> 
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
                {label:"待提货",name:"tihuo"},
                {label:"待发车",name:"fache"},
                {label:"待签收",name:"qianshou"},
                {label:"待确认收货",name:"shouhuo"},
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

