<template>
  <div class="detailsCompnent tabsWrap">
    <el-tabs v-model="CZdetailsName" type="card" @tab-click="handleClick" >
        <!-- 基本信息 -->
            <el-tab-pane label="基本信息" name="essential">
                <!-- <div class="imgbox">

                    <img src="../../../assets/zanshi/jiben.png" alt="">
                </div> -->
                <essential :isvisible="CZdetailsName === 'essential'" />

            </el-tab-pane>

        <!-- 权限配置 -->
            <el-tab-pane label="权限配置" name="authority">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/quanyi.png" alt="">
                </div> -->
                <authorityConfigure :isvisible="CZdetailsName === 'authority'" />

            </el-tab-pane>

        <!-- 辅助交易 -->
            <el-tab-pane label="辅助交易" name="noDriver">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/fuzhu.png" alt="">
                </div> -->
                <assistantTrade :isvisible="CZdetailsName === 'assistantTrade'" />

            </el-tab-pane>
            
        <!-- 订单信息 -->
            <el-tab-pane label="订单信息" name="orderInfo">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/dingdan.png" alt="">
                </div> -->
                <orderInfo :isvisible="CZdetailsName === 'orderInfo'" />

            </el-tab-pane>
        
        <!-- 交易轨迹 -->
            <el-tab-pane label="交易轨迹" name="actionTrail">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/jiaoyi.png" alt="">
                </div> -->
                <actionTrail :isvisible="CZdetailsName === 'actionTrail'" />

            </el-tab-pane>

         <!-- 业务关系 -->
            <el-tab-pane label="业务关系" name="business">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/czyw.png" alt="">
                </div> -->
                <businessRelation :isvisible="CZdetailsName === 'business'" />

            </el-tab-pane>

         <!-- 财务信息 -->
            <el-tab-pane label="财务信息" name="financial">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/czcw.png" alt="">
                </div> -->
                <financialRelations :isvisible="CZdetailsName === 'financial'" />

            </el-tab-pane>

         <!-- 其他信息 -->
            <el-tab-pane label="其他信息" name="otherInfo">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/czqt.png" alt="">
                </div> -->
                <otherInfo :isvisible="CZdetailsName === 'otherInfo'" />

            </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script type="text/javascript">
import '@/styles/detailsStyle.scss'
import essential from './essential'
import authorityConfigure from './authorityConfigure'
import assistantTrade from './assistantTrade'
import actionTrail from './actionTrail'
import orderInfo from './orderInfo'
import businessRelation from './businessRelation'
import financialRelations from './financialRelations'
import otherInfo from './otherInfo'
    export default {
      name:'detailsCompnent',
      components:{
            essential,
            authorityConfigure,
            assistantTrade,
            actionTrail,
            orderInfo,
            businessRelation,
            financialRelations,
            otherInfo
        },
        data() {
          return {
            CZdetailsName:'essential',
          };
        },
        watch:{
            CZdetailsName(newVal,oldVal){
                // console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.CZdetailsName = newVal;
                }else{
                    this.CZdetailsName = oldVal;
                }
            }
        },
        created() {
            this.CZdetailsName = localStorage.getItem('CZdetailsName') || 'essential';
        },

        beforeUpdate () {
            localStorage.setItem('CZdetailsName', this.CZdetailsName);
        },

        beforeDestroy () {
            localStorage.setItem('CZdetailsName', 'essential');
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
                this.CZdetailsName = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .detailsCompnent{
        height: 100%;
        .el-tab-pane{
            overflow: auto;
            background: #f2f2f2;
        }
        .imgbox{
            overflow: auto;
        }
    }
</style>