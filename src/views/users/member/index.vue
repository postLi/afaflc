<template>
    <div class="member tabsWrap">
        <el-tabs v-model="memberName" type="card" @tab-click="handleClick" >
            <!-- 全部 -->
                <el-tab-pane label="全部" name="first">
                    <ShipperAll :isvisible="memberName === 'first'"></ShipperAll>
                </el-tab-pane>

            <!-- 未认证 -->
                <el-tab-pane label="未认证" name="second">
                    <ShipperUnauthorized :isvisible="memberName === 'second'"></ShipperUnauthorized>
                </el-tab-pane>

            <!-- 待认证 -->
                <el-tab-pane label="待认证" name="third">
                    <ShipperCertified :isvisible="memberName === 'third'"></ShipperCertified>
                </el-tab-pane>
                
            <!-- 已认证部分 -->
                <el-tab-pane label="已认证" name="fourth">
                    <ShipperHasCertified :isvisible="memberName === 'fourth'"></ShipperHasCertified>
                </el-tab-pane>

            <!-- 认证不通过 -->
                <el-tab-pane label="认证不通过" name="fifth">
                    <ShipperDisqualification :isvisible="memberName === 'fifth'"></ShipperDisqualification>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/javascript">
    import '@/styles/dialog.scss'
    import '@/styles/tab.scss'
    import ShipperAll from './ShipperAll.vue'
    import ShipperUnauthorized from './ShipperUnauthorized.vue'
    import ShipperCertified from './ShipperCertified.vue'
    import ShipperHasCertified from './ShipperHasCertified.vue'
    import ShipperDisqualification from './ShipperDisqualification.vue'

    export default {
      name: 'shipper',
      components: {
        ShipperAll,
        ShipperUnauthorized,
        ShipperCertified,
        ShipperHasCertified,
        ShipperDisqualification
      },
      data() {
        return {
          memberName: 'first'
        }
      },
      watch: {
        memberName(newVal, oldVal) {
                // console.log('newVal,oldVal',newVal,oldVal)
          if (newVal) {
            this.memberName = newVal
          } else {
            this.memberName = oldVal
          }
        }
      },
      created() {
        this.memberName = sessionStorage.getItem('memberName') || 'first'
      },

      beforeUpdate() {
        sessionStorage.setItem('memberName', this.memberName)
      },

      beforeDestroy() {
        sessionStorage.setItem('memberName', 'first')
      },
      methods: {

        handleClick(tab, event) {
                // console.log(tab, event);
          this.memberName = tab.name
        }
      }
    }
</script>

<style type="text/css" lang="scss">
    .member{
        .identicalStyle{
            padding-right: 0;
        }
        .el-tabs__content{
            .el-tab-pane{
                .classify_searchinfo{
                    padding: 0;
                }
            }
        }

        .el-table{
            th,td{
                text-align: center;
            }
            .el-radio__input{
                margin-left: 10px;
            }
            td .cell {
                white-space: initial;
                overflow: hidden;
            }
            .otherServiceTD{
                text-align: left;
              
            }
            .otherService{
                text-align: center;
                display: inline-block;
                margin: 2px 5px;
                padding: 5px 15px;
                background: #d0d7e5;
                width: 90px;
                color: #333333;
            }
            .isTMS{
                color: #0da0e4;
                font-weight: bold;
            }

            .noTMS{
                color: red;
                font-weight: bold;
            }
        }
        .wuliucreatDialog,.freezeDialog,.shipperBlackDialog,.shenghe{
            display: inline-block;
            .el-dialog{
                width: 810px;
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
                            margin-left: 10px;
                            margin-right: 10px;
                            .el-form-item__content{
                                .el-input{
                                    width: 250px;
                                }
                            }
                        }
                        .moreLength{
                            text-align: left;
                            .el-form-item__content{
                                .el-input{
                                    width: 650px;
                                }
                                .el-radio-group{
                                    margin-left: 0;
                                }
                            }
                        }
                        .el-textarea{
                            width: 650px;
                            vertical-align: top;
                            font-size: 12px;
                            padding-top: 5px;
                        }
                    }
                }
            }
        }
    }
</style>
