<template>
  <div class="member tabsWrap">
    <el-tabs v-model="memberName" type="card" @tab-click="handleClick" >
        <!-- 全部 -->
        <!-- <el-badge :value="12" class="item"> -->
            <el-tab-pane label="全部" name="first">
                <ShipperAll :isvisible="memberName === 'first'"></ShipperAll>
            </el-tab-pane>
        <!-- </el-badge> -->

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
    import "@/styles/tab.scss";

    import ShipperAll from './ShipperAll.vue'
    import ShipperUnauthorized from './ShipperUnauthorized.vue' 
    import ShipperCertified from './ShipperCertified.vue'
    import ShipperHasCertified from './ShipperHasCertified.vue'
    import ShipperDisqualification from './ShipperDisqualification.vue'

     
    export default {
      name:'shipper',
      components:{
          ShipperAll,
          ShipperUnauthorized,
          ShipperCertified,
          ShipperHasCertified,
          ShipperDisqualification,
        },
        data() {
          return {
            memberName:'first',
          };
        },
        watch:{
            memberName(newVal,oldVal){
                // console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.memberName = newVal;
                }else{
                    this.memberName = oldVal;
                }
            }
        },
        created() {
            this.memberName = sessionStorage.getItem('memberName') || 'first';
        },

        beforeUpdate () {
            sessionStorage.setItem('memberName', this.memberName);
        },

        beforeDestroy () {
            sessionStorage.setItem('memberName', 'first');
        },
        methods: {

            handleClick(tab, event) {
                // console.log(tab, event);
                this.memberName = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    // @import "@/styles/tab.scss";
    .member{
        .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
           
            border-bottom-color: #ffffff;
        }
        .shipper_searchinfo{
            position: absolute;
            left:0;
            top:0;
            padding:15px 16px;
            // border-bottom:2px dashed #ccc;
            // height:70px;
            width:100%;
            line-height: 35px;
            .el-form-item{
                margin-right: 30px;
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
            padding:70px 0 0 0;
            &>.btns_box{
                margin-bottom:10px;
                .el-button{
                    margin-right:20px;
                    padding:10px 20px;
                }
            }
            .info_news{
                height:88%;
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
            td .cell {
                white-space: initial;
                overflow: hidden;
            }

            .freezeName{
                color: #e6a23c;
                font-weight: bold;
            }

            .blackName{
                color: red;
                font-weight: bold;
            }

            .normalName{
                color: #0da0e4;
                font-weight: bold;
            }

            .otherServiceTD{
                text-align: left;
                // white-space: nowrap;  
                // text-overflow:ellipsis; 
                // overflow:hidden;
            }
            .otherService{
                text-align: left;
                display: inline-block;
                margin: 2px 5px;
                padding: 5px 15px;
                background: #d0d7e5;
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
    }

    .item {
        margin-top: 10px;
        margin-right: 40px;
    }
    .creatDialog,.freezeDialog,.shipperBlackDialog,.shenghe{
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
                    .textArea{
                        
                    }
                }
            }
        }
    }
</style>