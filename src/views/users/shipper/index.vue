<template>
  <div class="huozhu tabsWrap">
    <el-tabs v-model="shipperName" type="card" @tab-click="handleClick" >
        <!-- 全部 -->
            <el-tab-pane label="全部" name="first">
                <ShipperAll :isvisible="shipperName === 'first'"></ShipperAll>
            </el-tab-pane>

        <!-- 未认证 -->
            <el-tab-pane label="未认证" name="second">
                <ShipperUnauthorized :isvisible="shipperName === 'second'"></ShipperUnauthorized>
            </el-tab-pane>

        <!-- 待认证 -->
            <el-tab-pane label="待认证" name="third">
                <ShipperCertified :isvisible="shipperName === 'third'"></ShipperCertified>
            </el-tab-pane>
            
        <!-- 已认证部分 -->
            <el-tab-pane label="已认证" name="fourth">
                <ShipperHasCertified :isvisible="shipperName === 'fourth'"></ShipperHasCertified>
            </el-tab-pane>

        <!-- 认证不通过 -->
            <el-tab-pane label="认证不通过" name="fifth">
                <ShipperDisqualification :isvisible="shipperName === 'fifth'"></ShipperDisqualification>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
    import '@/styles/dialog.scss'
    import '@/styles/tab.scss'

import ShipperAll from '../components/ShipperAll.vue'
    import ShipperUnauthorized from '../components/ShipperUnauthorized.vue'
    import ShipperCertified from '../components/ShipperCertified.vue'
    import ShipperHasCertified from '../components/ShipperHasCertified.vue'
    import ShipperDisqualification from '../components/ShipperDisqualification.vue'
    
    export default {
      name: 'huozhu',
      components: {
        ShipperAll,
        ShipperUnauthorized,
        ShipperCertified,
        ShipperHasCertified,
        ShipperDisqualification
      },
      data() {
        return {
          shipperName: 'first'
        }
      },
      watch: {
        shipperName(newVal, oldVal) {
          if (newVal) {
            this.shipperName = newVal
          } else {
            this.shipperName = oldVal
          }
        }
      },
      created() {
        this.shipperName = sessionStorage.getItem('shipperName') || 'first'
      },

      beforeUpdate() {
        sessionStorage.setItem('shipperName', this.shipperName)
      },

      beforeDestroy() {
        sessionStorage.setItem('shipperName', 'first')
      },
      methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
            this.shipperName = tab.name
        }
      }
    }
</script>

<style type="text/css" lang="scss">
  
    .huozhu{
        height:100%;    
        position: relative;
        .identicalStyle{
            padding-right: 0;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
            background: rgba(236, 233, 230, 0.445);
            border-bottom-color: #ffffff;
        }
        .creatDialog,.freezeDialog,.shipperBlackDialog,.shenghe{
            display: inline-block;
            .el-dialog{
                width: 820px;
                min-height: 700px;
                position: relative;
                .el-dialog__body{
                    .el-form{
                        .shipper_information{
                            h2{ 
                                margin:10px 20px;
                                padding-bottom: 10px;
                                border-bottom: 2px solid #ccc;
                            }
                        }
                        .el-form-item{
                            margin-bottom: 10px; 
                            .el-form-item__content{
                                .el-input{
                                    width: 250px;
                                }
                            }
                        }
                        .moreLength{
                            .el-form-item__content{
                                .el-input{
                                    width: 660px;
                                }
                            }
                        }
                        .el-textarea{
                            width: 660px;
                            vertical-align: top;
                            font-size: 12px;
                            padding-top: 5px;
                        }
                        .v-region{
                            .v-dropdown-container{
                                // left: -151px !important;
                                // top: 38px !important;
                            }
                        }
                    }
                }
                // .el-dialog__footer{
                //     position: absolute;
                //     bottom: 0;
                //     left: 40%;
                // }
            }
        }
    }
</style>
