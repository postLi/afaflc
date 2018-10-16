<template>
  <div class="detailsCompnent tabsWrap">
    <el-tabs v-model="HZdetailsName" type="card" @tab-click="handleClick" >
        <!-- 基本信息 -->
            <el-tab-pane label="基本信息" name="essential">
                <!-- <div class="imgbox">
                    <img src="../../../assets/zanshi/jiben.png" alt="">
                </div> -->

                <essential :isvisible="HZdetailsName === 'essential'" />
            </el-tab-pane>

        <!-- 权限配置 -->
            <el-tab-pane label="权限配置" name="overTime">
                <!-- <div class="imgbox">

                    <img src="../../../assets/zanshi/hzqy.png" alt="">
                </div> -->
                <authorityConfigure :isvisible="HZdetailsName === 'authority'" />
            </el-tab-pane>

        <!-- 行为轨迹 -->
            <el-tab-pane label="行为轨迹" name="noDriver">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/hzxwgj.png" alt="">
                </div> -->

                <actionTrail :isvisible="HZdetailsName === 'actionTrail'" />

            </el-tab-pane>
            
        <!-- 订单信息 -->
            <el-tab-pane label="订单信息" name="assignCar">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/hzdd.png" alt="">
                </div> -->

                <orderInfo :isvisible="HZdetailsName === 'orderInfo'" />

            </el-tab-pane>

        <!-- 业务关系 -->
            <el-tab-pane label="业务关系" name="passOverTime">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/hzyw.png" alt="">
                </div> -->

                <businessRelation :isvisible="HZdetailsName === 'business'" />

            </el-tab-pane>

             <!-- 财务情况 -->
            <el-tab-pane label="财务情况" name="hzcw">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/hzcw.png" alt="">
                </div> -->

                <financialRelations :isvisible="HZdetailsName === 'financial'" />

            </el-tab-pane>

             <!-- 其他信息 -->
            <el-tab-pane label="其他信息" name="hzqt">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/hzqt.png" alt="">
                </div> -->

                <otherInfo :isvisible="HZdetailsName === 'otherInfo'" />
                
            </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script type="text/javascript">
import essential from './essential'
import authorityConfigure from './authorityConfigure'
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
           actionTrail,
           orderInfo,
           businessRelation,
           financialRelations,
           otherInfo
        },
        data() {
          return {
            HZdetailsName:'essential',
          };
        },
        watch:{
            HZdetailsName(newVal,oldVal){
                // console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.HZdetailsName = newVal;
                }else{
                    this.HZdetailsName = oldVal;
                }
            }
        },
        created() {
            this.HZdetailsName = sessionStorage.getItem('HZdetailsName') || 'essential';
        },

        beforeUpdate () {
            sessionStorage.setItem('HZdetailsName', this.HZdetailsName);
        },

        beforeDestroy () {
            sessionStorage.setItem('HZdetailsName', 'essential');
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
                this.HZdetailsName = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .detailsCompnent{
        height: 100%;
        .el-tab-pane{
            overflow: auto;
            // padding: 0 10px;
            background: #f2f2f2;
           
        }
        .imgbox{
            overflow: auto;
        }
    }
</style>

<style type="text/css" lang="scss">

    .detailsCompnent{
        .detailsArrange{
            .collapseInfo{
                background: #ffffff;
                margin-top: 18px;
                padding: 0 20px;
                h2{
                    border-bottom: solid 2px #e0e0e0;
                    line-height: 25px;
                    font-size: 18px;
                    padding: 36px 0 18px 0;
                    color: #333333;
                    font-weight: bold;
                    font-stretch: normal;
                }
                .essentialInformation{
                    padding:  20px 0 40px 0;
                    .basicInfo{
                        border-top: 1px solid #e6e6e6;
                        border-left: 1px solid #e6e6e6;
                        .el-col{
                            font-size: 14px;
                            line-height: 20px;
                            padding: 12px 10px;
                            border-right: 1px solid #e6e6e6;
                            border-bottom: 1px solid #e6e6e6;
                            &:nth-child(odd){
                                background: #fafafa;
                                font-weight: bold;
                                text-align: right;
                            }
                            &:nth-child(even){
                                text-align: left;
                            }
                        }
                    }
                }
                .essentialInformation_img{
                    padding: 0 20px;
                    img{
                        cursor: pointer;
                        max-height:378px;
                        max-width:638px;
                    }
                    h6{
                        font-size:14px;
                        color:#333;
                        line-height:20px;
                        margin-bottom:5px;
                        font-weight:normal;
                    }
                    &>.basicInfo_img{
                        padding-bottom:40px;
                    }
                }
                .essentialInformation_table{
                    position:relative;
                    padding:24px 0 40px 0; 
                    .el-table thead th, .el-table thead tr {
                        background-color: #fafafa;
                    }
                    .el-pagination{
                        text-align:right;
                        padding-top:10px;
                    }
                }
                .classfyTitle{
                    overflow: hidden;
                     li{
                        float: left;
                        font-size: 14px;
                        line-height: 20px;
                        color: #666;
                        margin-right: 30px;
                        cursor: pointer;
                    }
                    .currentClick{
                        color: #1890ff;
                    }
                }
                .lengandInfo{
                    overflow: hidden;
                    padding: 20px 0;
                    li{
                        float: left;
                        color: #333;
                        line-height: 20px;
                        margin-right: 47px;
                        span{
                            color: #1890ff;
                        }
                    }
                }
            }
        }
    }

</style>
