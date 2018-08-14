<template>
    <div class="track">
        <el-tabs v-model="activeNameDispatch" type="border-card" @tab-click="handleClick" >
            <el-tab-pane  
            v-for="item in visibleTabs"
            :key="item.name"
            :label="item.label"
            :name="item.name">
                <TrackTableComponent :isvisible="activeNameDispatch == item.name"></TrackTableComponent>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/javascript">
    import '@/styles/dialog.scss'
    import TrackTableComponent from './TrackTableComponent.vue'

    export default {
      name:'orderTrack',
      components:{
          TrackTableComponent
        },
        data() {
          return {
            activeNameDispatch:'platform',
            visibleTabs:[
                {label:"平台定向",name:"platform"},
                {label:"超时无人接单",name:"overtime"},
                {label:"中单后联系货主超时",name:"contactovertime"},
                {label:"车主改派",name:"reassignment"},
            ]
          };
        },
        watch:{
            activeNameDispatch(newVal,oldVal){
                // console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.activeNameDispatch = newVal;
                }else{
                    this.activeNameDispatch = oldVal;
                }
            }
        },
        created() {
            this.activeNameDispatch = localStorage.getItem('activeNameDispatch') || 'platform';
        },

        beforeUpdate () {
            localStorage.setItem('activeNameDispatch', this.activeNameDispatch);
        },

        beforeDestroy () {
            localStorage.setItem('activeNameDispatch', 'platform');
        },
        methods: {

            handleClick(tab, event) {
                // console.log(tab, event);
                this.activeNameDispatch = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    @import "../../../styles/tab.scss";

    .track{
        height:100%;    
        
    }
    

    
</style>