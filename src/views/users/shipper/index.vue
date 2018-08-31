<template>
  <div class="shipper">
    <el-tabs v-model="shipperName" type="card" @tab-click="handleClick" >
        <!-- 全部 -->
        <!-- <el-badge :value="12" class="item"> -->
            <el-tab-pane label="全部" name="first">
                <ShipperAll :isvisible="shipperName === 'first'"></ShipperAll>
            </el-tab-pane>
        <!-- </el-badge> -->

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
    import ShipperAll from '../components/ShipperAll.vue'
    import ShipperUnauthorized from '../components/ShipperUnauthorized.vue' 
    import ShipperCertified from '../components/ShipperCertified.vue'
    import ShipperHasCertified from '../components/ShipperHasCertified.vue'
    import ShipperDisqualification from '../components/ShipperDisqualification.vue'
    // import ShipperFreezing from '../components/ShipperFreezing.vue'
    // import ShipperBlacklist from '../components/ShipperBlacklist.vue'
     
    export default {
      name:'shipper',
      components:{
          ShipperAll,
          ShipperUnauthorized,
          ShipperCertified,
          ShipperHasCertified,
          ShipperDisqualification,
        //   ShipperFreezing,
        //   ShipperBlacklist
        },
        data() {
          return {
            shipperName:'first',
          };
        },
        watch:{
            shipperName(newVal,oldVal){
                // console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.shipperName = newVal;
                }else{
                    this.shipperName = oldVal;
                }
            }
        },
        created() {
            this.shipperName = localStorage.getItem('shipperName') || 'first';
        },

        beforeUpdate () {
            localStorage.setItem('shipperName', this.shipperName);
        },

        beforeDestroy () {
            localStorage.setItem('shipperName', 'first');
        },
        methods: {

            handleClick(tab, event) {
                // console.log(tab, event);
                this.shipperName = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    // @import "../../styles/tab.scss";
    .completeinfo{
      .detailinfo{
        margin-left: 26px;
        p{
            width:160px;
            height: 40px;
            line-height: 40px;
            text-align: left;
            display: inline-block;
            vertical-align: top;
            span{
                color:red;
            }
        }
        .upload-demo{
          display: inline-block ;
        }
      }
    }
    .shipper{
        height:100%;    
        position: relative;
        .shipper_searchinfo{
            position: absolute;
            left:0;
            top:0;
            padding:15px 16px;
            height:70px;
            width:100%;
            line-height: 35px;
            .el-form-item{
                margin-right: 15px;
                margin-bottom: 0px;
                .el-form-item__content{
                    .el-input{
                        .el-input__inner{
                            color:#3e9ff1;
                            height:30px;
                            line-height: 30px;
                        }
                    }
                    .el-button{
                        padding:8px 20px;
                    }
                }
            }
        }
        .classify_info{
            height:100%;
            padding:70px 13px 0 0;
            &>.btns_box{
                margin-bottom:10px;
                .el-button{
                    margin-right:20px;
                    padding:10px 20px;
                }
            }
            .info_news{
                height:90%;
            }
            .el-pagination{
                margin-top:13px;
                text-align:right;
            }
        }

        .el-table{
            th,td{
                text-align: center;
            }
            .el-radio__input{
                margin-left: 10px;
            }
        }
    }

    .item {
        margin-top: 10px;
        margin-right: 40px;
    }


    .creatDialog,.freezeDialog,.shipperBlackDialog,.shenghe{
        display: inline-block;
        .el-dialog{
            width: 780px;
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
                        margin-bottom: 0px; 
                        .el-form-item__content{
                            .el-input{
                                width: 250px;
                            }
                        }
                    }
                    .moreLength{
                        .el-form-item__content{
                            .el-input{
                                width: 637px;
                            }
                        }
                    }
                    .el-textarea{
                        width: 637px;
                        vertical-align: top;
                        font-size: 12px;
                        padding-top: 5px;
                    }
                    .textArea{
                        
                    }
                }
            }
        }
    }
</style>