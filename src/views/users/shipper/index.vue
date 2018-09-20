<template>
  <div class="huozhu tabsWrap">
    <el-tabs v-model="shipperName" type="card" @tab-click="handleClick" >
        <!-- 全部 -->
            <el-tab-pane label="全部" v-if="$_has_permission('SHIPPER_MANAGE_LIST_ALL')" name="first">
                <ShipperAll :isvisible="shipperName === 'first'"></ShipperAll>
            </el-tab-pane>

        <!-- 未认证 -->
            <el-tab-pane label="未认证" v-if="$_has_permission('SHIPPER_MANAGE_LIST_UNVALIDAT')"  name="second">
                <ShipperUnauthorized :isvisible="shipperName === 'second'"></ShipperUnauthorized>
            </el-tab-pane>

        <!-- 待认证 -->
            <el-tab-pane label="待认证" v-if="$_has_permission('SHIPPER_MANAGE_LIST_VALIDATING')" name="third" >
                <ShipperCertified :isvisible="shipperName === 'third'"></ShipperCertified>
            </el-tab-pane>
            
        <!-- 已认证部分 -->
            <el-tab-pane label="已认证" v-if="$_has_permission('SHIPPER_MANAGE_LIST_VALIDATED')" name="fourth" >
                <ShipperHasCertified :isvisible="shipperName === 'fourth'"></ShipperHasCertified>
            </el-tab-pane>

        <!-- 认证不通过 -->
            <el-tab-pane label="认证不通过"  v-if="$_has_permission('SHIPPER_MANAGE_LIST_VALIDATFAIL')" name="fifth" >
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
    import { getUserInfo } from '@/utils/auth.js'

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
            shipperName: 'first',
            secondBoolen:false
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
      mounted(){
          let authInfo = getUserInfo();
          console.log('authInfo',authInfo)

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
        .shippercreatDialog,.freezeDialog,.shipperBlackDialog,.shippercertifed{
            .el-dialog{
                width: 810px;
                min-height: 400px;
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
                        .el-textarea{
                            width: 660px;
                            vertical-align: top;
                            font-size: 12px;
                            padding-top: 5px;
                        }
                        .v-region{
                            .v-dropdown-container{
                                height: 300px !important;
                                overflow: auto;
                            }
                        }
                       
                    }
                }
            }
        }
    }
</style>
