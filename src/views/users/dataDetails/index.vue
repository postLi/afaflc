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

        <!-- 权限配置 -->
            <el-tab-pane label="权限配置" name="overTime">
                <!-- <div class="imgbox">

                    <img src="../../../assets/zanshi/hzqy.png" alt="">
                </div> -->
                <authorityConfigure :isvisible="detailsName === 'authority'" />
            </el-tab-pane>

        <!-- 行为轨迹 -->
            <el-tab-pane label="行为轨迹" name="noDriver">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/hzxwgj.png" alt="">
                </div> -->

                <actionTrail :isvisible="detailsName === 'actionTrail'" />

            </el-tab-pane>
            
        <!-- 订单信息 -->
            <el-tab-pane label="订单信息" name="assignCar">
                <!-- <div class="imgbox">

                <img src="../../../assets/zanshi/hzdd.png" alt="">
                </div> -->

                <orderInfo :isvisible="detailsName === 'orderInfo'" />

            </el-tab-pane>

        <!-- 业务关系 -->
            <el-tab-pane label="业务关系" name="passOverTime">
                <div class="imgbox">

                <img src="../../../assets/zanshi/hzyw.png" alt="">
                </div>

                <!-- <orderInfo :isvisible="detailsName === 'orderInfo'" /> -->

            </el-tab-pane>

             <!-- 财务情况 -->
            <el-tab-pane label="财务情况" name="hzcw">
                <div class="imgbox">

                <img src="../../../assets/zanshi/hzcw.png" alt="">
                </div>

            </el-tab-pane>

             <!-- 其他信息 -->
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
import authorityConfigure from './authorityConfigure'
import actionTrail from './actionTrail'
import orderInfo from './orderInfo'

    export default {
        name:'detailsCompnent',
        components:{
           essential,
           authorityConfigure,
           actionTrail,
           orderInfo
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
            }
        }
    }

</style>
