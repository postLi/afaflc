<template>
  <div class="detailsCompnent">
    <el-tabs v-model="pointName" type="card" @tab-click="handleClick" >
        <!-- 平台定向 -->
            <el-tab-pane label="基本信息" name="plantOrigin">
                <div class="imgbox">

                    <img src="../../../assets/zanshi/jiben.png" alt="">
                </div>
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

    export default {
      name:'detailsCompnent',
      components:{
           
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
    .detailsCompnent{
        height: 100%;
        .el-tab-pane{
            overflow: auto;
        }
        .imgbox{
            overflow: auto;
        }
    }
</style>