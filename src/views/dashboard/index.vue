<template>
    <div class="dashboard-container">
        <!-- <div class='dashboard-text'>用户名:{{name}}</div>
        <div class='dashboard-text'>权限组:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
        <div class="list-tab-title clearfix">
            <span :class="{'active': component === item.name}" @click="component = item.name" v-for="(item,index) in tabs" :key="index">{{item.title}}</span>
            </div>
            <div class="list-tab-content">
            <keep-alive>
                <component :key="component" :listtype="component"  v-bind:is="component"></component>
            </keep-alive>
        </div>
        <div class="dashboard-content clearfix">
            <div class="echartsLine fl">
                <echartsLine></echartsLine>
            </div>
            <div class="echartsPie fl">

            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import now from './compnents/data'
import jinqi from './compnents/data'
import echartsLine from './compnents/echarts'

export default {
    name: 'dashboard',
    components: {
        echartsLine,
        now,
        jinqi,
    
    },
    computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
    },
    data(){
        return{
            tabs: [
                {
                    title: '今天',
                    name: 'now',
                    type: 'AF03701',
                    num: 0,
                }, {
                    title: '近期',
                    name: 'jinqi',
                    type: 'AF03702',
                    num: 0,
                }, 
            ],
            component: 'now',
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
