<template>
  <div class="detailsCompnent tabsWrap">
    <el-tabs v-model="detailsName" type="card" @tab-click="handleClick" >
        <!-- 基本信息 -->
            <el-tab-pane label="基本信息" name="essential">
                <!-- <div class="imgbox">

                    <img src="../../../assets/zanshi/jiben.png" alt="">
                </div> -->

                <essential :isvisible="detailsName === 'essential'" />
            </el-tab-pane>

        <!-- 超时无人人接单 -->
            <el-tab-pane label="权限配置" name="overTime">
                <div class="imgbox">

                <img src="../../../assets/zanshi/hzqy.png" alt="">
                </div>
            </el-tab-pane>

        <!-- 公海无司机 -->
            <el-tab-pane label="行为轨迹" name="noDriver">
                <div class="imgbox">

                <img src="../../../assets/zanshi/hzxwgj.png" alt="">
                </div>

            </el-tab-pane>
            
        <!-- 车主改派 -->
            <el-tab-pane label="订单信息" name="assignCar">
                <div class="imgbox">

                <img src="../../../assets/zanshi/hzdd.png" alt="">
                </div>

            </el-tab-pane>

        <!-- 中单后联系货主超时 -->
            <el-tab-pane label="业务关系" name="passOverTime">
                <div class="imgbox">

                <img src="../../../assets/zanshi/hzyw.png" alt="">
                </div>

            </el-tab-pane>

             <!-- 中单后联系货主超时 -->
            <el-tab-pane label="财务情况" name="hzcw">
                <div class="imgbox">

                <img src="../../../assets/zanshi/hzcw.png" alt="">
                </div>

            </el-tab-pane>

             <!-- 中单后联系货主超时 -->
            <el-tab-pane label="其他信息" name="hzqt">
                <div class="imgbox">

                <img src="../../../assets/zanshi/hzqt.png" alt="">
                </div>

            </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script type="text/javascript">
import essential from './essential'

    export default {
        name:'detailsCompnent',
        components:{
           essential,
        },
        data() {
          return {
            detailsName:'essential',
          };
        },
        watch:{
            detailsName(newVal,oldVal){
                // console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.detailsName = newVal;
                }else{
                    this.detailsName = oldVal;
                }
            }
        },
        created() {
            this.detailsName = sessionStorage.getItem('detailsName') || 'essential';
        },

        beforeUpdate () {
            sessionStorage.setItem('detailsName', this.detailsName);
        },

        beforeDestroy () {
            sessionStorage.setItem('detailsName', 'essential');
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
                this.detailsName = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .detailsCompnent{
        height: 100%;
        .el-tab-pane{
            overflow: auto;
            padding: 0 10px;
        }
        .imgbox{
            overflow: auto;
        }
    }
</style>