<template>
  <div class="pointing tabsWrap">
    <el-tabs v-model="pointName" type="card" @tab-click="handleClick" >
        <!-- 平台定向 -->
            <el-tab-pane  name="plantOrigin" v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_PLATFORM')">
                <span slot="label">平台定向 ( <span style="color:red;">{{tabsNum.platFormCounts > 99 ? '99+' : tabsNum.platFormCounts}} </span> )</span>
                <plantOrigin :isvisible="pointName === 'plantOrigin'"></plantOrigin>
            </el-tab-pane>

        <!-- 超时无人人接单 -->
            <el-tab-pane label="超时无人接单" name="overTime" v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_TIMEOUT_NO_DRIVER')">
                <span slot="label">超时无人接单 ( <span style="color:red;">{{tabsNum.outTimeNoDriverCounts > 99 ? '99+' : tabsNum.outTimeNoDriverCounts}}</span> ) </span>
                <overTime :isvisible=" pointName === 'overTime'"></overTime>
            </el-tab-pane>
        <!-- 公海无司机 -->
            <el-tab-pane label="公海无司机" name="noDriver" v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_OPEN_NO_DRIVER')">
                <span slot="label">公海无司机 ( <span style="color:red;">{{tabsNum.publicSeaNoDriverCounts > 99 ? '99+' : tabsNum.publicSeaNoDriverCounts}}</span> ) </span>
                <noDriver :isvisible="pointName === 'noDriver'"></noDriver>
            </el-tab-pane>
            
        <!-- 车主改派 -->
            <el-tab-pane label="车主改派" name="assignCar" v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_DRIVER_CHANGE')">
                <span slot="label">车主改派 ( <span style="color:red;">{{tabsNum.driverReassignmentCounts > 99 ? '99+' : tabsNum.driverReassignmentCounts}}</span> ) </span>
                <assignCar :isvisible="pointName === 'assignCar'"></assignCar>
            </el-tab-pane>

        <!-- 中单后联系货主超时 -->
            <el-tab-pane label="中单后联系货主超时" name="passOverTime" v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_SHIPPER_TIMEOUT')">
                <span slot="label">中单后联系货主超时 ( <span style="color:red;">{{tabsNum.winOrderContactsOutTimeCounts > 99 ? '99+' : tabsNum.winOrderContactsOutTimeCounts}}</span> ) </span>
                <passOverTime :isvisible="pointName === 'passOverTime'"></passOverTime>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script type="text/javascript">

import { eventBus } from '@/eventBus'
import { getCountByStatus } from '@/api/order/ordermange'
import plantOrigin from './PlantOrientation'
import overTime from './overTime'
import noDriver from './noDriver'
import assignCar from './assignCar'
import passOverTime from './passOverTime'

    export default {
      name:'pointing',
      components:{
            plantOrigin,
            overTime,
            noDriver,
            assignCar,
            passOverTime
        },
        data() {
          return {
            pointName:'plantOrigin',
            tabsNum:{},
          };
        },
        watch:{
            pointName(newVal,oldVal){
                // console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.pointName = newVal;
                }else{
                    this.pointName = oldVal;
                }
            }
        },
        created() {
            this.pointName = localStorage.getItem('pointName') || 'plantOrigin';
            this.getCount();
        },

        beforeUpdate () {
            localStorage.setItem('pointName', this.pointName);
        },

        beforeDestroy () {
            localStorage.setItem('pointName', 'plantOrigin');
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
                this.pointName = tab.name;
            },
            getCount(){
                getCountByStatus().then(res => {
                    console.log('getCount',res.data)
                    this.tabsNum = res.data;
                })
            }
        },
        mounted(){
            eventBus.$on('getOrderCount', () => {
                this.getCount();
            })
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .pointing{
        height: 100%;
    }
</style>