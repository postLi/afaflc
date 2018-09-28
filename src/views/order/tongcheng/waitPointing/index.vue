<template>
  <div class="pointing tabsWrap">
    <el-tabs v-model="pointName" type="card" @tab-click="handleClick" >
        <!-- 平台定向 -->
            <el-tab-pane label="平台定向" name="plantOrigin" v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_PLATFORM')">
                <plantOrigin :isvisible="pointName === 'plantOrigin'"></plantOrigin>
            </el-tab-pane>

        <!-- 超时无人人接单 -->
            <el-tab-pane label="超时无人接单" name="overTime" v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_TIMEOUT_NO_DRIVER')">
                <overTime :isvisible=" pointName === 'overTime'"></overTime>
            </el-tab-pane>

        <!-- 公海无司机 -->
            <el-tab-pane label="公海无司机" name="noDriver" v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_OPEN_NO_DRIVER')">
                <noDriver :isvisible="pointName === 'noDriver'"></noDriver>
            </el-tab-pane>
            
        <!-- 车主改派 -->
            <el-tab-pane label="车主改派" name="assignCar" v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_DRIVER_CHANGE')">
                <assignCar :isvisible="pointName === 'assignCar'"></assignCar>
            </el-tab-pane>

        <!-- 中单后联系货主超时 -->
            <el-tab-pane label="中单后联系货主超时" name="passOverTime" v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_SHIPPER_TIMEOUT')">
                <passOverTime :isvisible="pointName === 'passOverTime'"></passOverTime>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script type="text/javascript">

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
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .pointing{
        height: 100%;
    }
</style>