<template>
    <!-- 初始化检查 -->
    <div class="checkout commoncss">
        <el-dialog title='初始化检查' :close-on-click-modal="false" top="10vh"  :visible="dialogFormVisible" @close="close">
            <div class="box_top"  v-if="type == 1">
                <div class="checkout_top">
                    <i class="wzlicon"></i>
                    <h6 v-if="!ischecked">初始化检查中<el-button type="primary"  plain @click="doAction('check')" class="btn_qx">{{ cancelAni ? '继续检查' : '取消'}}</el-button></h6>
                    <h6 v-if="ischecked">初始化检查已完成，有<span class="top_num">{{dataset.totals}}</span>项基础功能没维护<el-button type="primary"   plain @click="doAction('agane')" class="btn_qx">重新检查</el-button></h6>
                </div>
                <progressbar :cancelAni="cancelAni" :isani="showani" />
            </div>
            <div class="top_content" v-else> 
                <h6>初始化检查已完成，有{{dataset.totals}}项基础功能没维护</h6>
            </div>
            <div class="main_checker2">
                <ul>
                    
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import progressbar from './progressbar'
import { aflcCityCheckout } from '@/api/common.js'

export default {
    name: 'appointDriver',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true,
        },
        cityId:{
            type:String,
            required:true,
        }
    },
    components:{
        progressbar
    },
    data() {
        return {
            btnsize:'mini',
            ischecked: false,
            showAni: false,
            cancelAni: false,
            showani:false,
            dataset: {
                totals:0,
            },
            type:1
        };
    },
    computed: {
    　
    },
    watch:{
        dialogFormVisible(newValue,oldValue){
            if(newValue){
                this.init()
            }
        }
    },
    mounted(){
    },
    methods: {
        //初始化选择项数据
        init(){
            console.log('1312313')
            aflcCityCheckout(this.cityId).then(res => {
                console.log('resresresres',res)
            }).catch(err => {
                this.$message({
                    type: 'warning',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        doAction(type) {
            switch (type) {
                
            }
        },
        close(){
            this.$emit('update:dialogFormVisible',false)
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @keyframes showUlAni{
    0%,10%{
        height: 0;
    }
    11%, 21%{
        height: 30px;
    }
    22%, 32%{
        height: 60px;
    }
    33%, 43%{
        height: 90px;
    }
    44%, 54%{
        height: 120px;
    }
    55%, 65%{
        height: 150px;
    }
    66%, 76%{
        height: 180px;
    }
    77%, 87%{
        height: 210px;
    }
    88%, 99%{
        height: 240px;
    }
    100%{
        height: 100%;
    }
    }
    .checkout{
        .el-dialog__body{
            position: relative;
            .box_top{
                .checkout_top{
                    height: 140px;
                    line-height: 24px;
                    padding: 45px 126px;
                    border: 1px solid #bcbcbc;
                    background-image: url('../../../assets/checkImg/bgo1.png');
                    background-repeat:no-repeat;
                    background-size:cover;
                    position: relative;
                    h6{
                        font-size: 30px;
                        color: #fff;
                        font-weight: 400;
                        .btn_qx{
                            padding: 4px 12px;
                            border:1px solid #fff;
                            background:#409EFF;
                            color:#fff;
                            margin-left:12px;
                        }
                        .btn_qx:hover{
                            background:#fff;
                            color:#409EFF;
                        }
                        .top_num{
                            color: red;
                            margin: 0 5px;
                        }
                    }
                    .wzlicon{
                        width: 40px;
                        height:45px;
                        background-image: url(../../../assets/checkImg/anquan.png);
                        font-size: 45px;
                        color: #fff;
                        position: absolute;
                        left: 62px;
                        top: 35px;
                    }
                }
            }
            .top_content{
                border:1px solid rgba(188, 188, 188, 1);
                height: 143px;
                background-image: url(../../../assets/checkImg/bgo1.png);
                background-repeat:no-repeat;
                background-position: center;
                background-size:cover;
                // background-size: 100%;
                padding: 45px 54px;
                box-sizing: border-box;
                h6{
                font-size: 22px;
                font-weight: normal;
                color: #ffffff;
                }
                .top_ts{
                margin-top:8px;
                font-size: 16px;
                font-weight: normal;
                color: #ffffff;
                .top_num{
                    color:#ff0000;
                    margin:0 5px;
                    font-weight: bold
                }
                }
            }

            .main_checker2{
                border:1px solid rgba(188, 188, 188, 1);
                // padding:10px 40px;
                
                h6{
                    height: 46px;
                    line-height: 46px;
                    font-size: 16px;
                    font-weight: normal;
                    border-bottom: 1px solid  rgba(188, 188, 188, 1);
                }
                p{
                    font-size:14px;
                    .el-icon-success{
                    color: rgb(0,204,0);
                    margin-right: 10px;
                    }
                    .el-icon-warning{
                    color:rgb(255,0,0); 
                    margin-right: 10px;
                    }
                }
                .company_content{
                    min-height: 320px;
                    margin-top:-11px;
                    ul{
                    height: 0;
                    margin-top:25px;
                    overflow: hidden;
                    animation: showUlAni 1.2s linear  forwards;
                    animation-play-state: paused;
                    &.showani{
                        animation-play-state: running;
                    }
                    &.cancelAni{
                        animation-play-state: paused;
                    }

                    li{
                        // height: 50px;
                        line-height: 50px;
                        border-bottom:1px solid #ccc;
                        padding:0 60px;
                    }
                    }
                }
                .btn_content{
                    text-align: center;
                    margin: 20px 0;
                    .btn_kd{
                    width:110px;
                    font-size: 16px;
                    }
                    .btn_h{
                    width:110px;
                    font-size: 16px;
                    background-color:#ccc;
                    border:1px solid #ccc;
                    }
                }
            }
            
        }

    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .checkout{
        .el-dialog{
            width: 1300px;
            .el-dialog__body{
                padding:20px 10px;
                border-bottom:0 none;
                position: relative;
                // .el-form-item__content{
                //     width:200px;
                //     .el-select{
                //         width: 100%;
                //     }
                // }
            }
        }
        // .el-dialog .el-dialog__body .el-form .el-form-item .el-form-item__content .el-input .el-input__inner{
        //     height: 30px;
        //     line-height:30px;
        // }

    }
</style>

<style lang="scss">

.check_box{
  min-width: 1100px;
  .el-header{
     margin-top:20px;
    .top_content{
        border:1px solid rgba(188, 188, 188, 1);
        height: 143px;
        background-image: url('../../../assets/checkImg/bgo1.png');
        background-repeat:no-repeat;
        background-position: center;
        background-size:cover;
        // background-size: 100%;
        padding: 45px 54px;
        box-sizing: border-box;
        h6{
          font-size: 22px;
          font-weight: normal;
          color: #ffffff;
        }
        .top_ts{
          margin-top:8px;
          font-size: 16px;
          font-weight: normal;
          color: #ffffff;
          .top_num{
            color:#ff0000;
            margin:0 5px;
            font-weight: bold
          }
        }
    }
    .box_top{
      .top_content2{
        height: 100px;
        line-height: 24px;
        padding: 40px 126px;
        border: 1px solid #bcbcbc;
        background-image: url('../../../assets/checkImg/bgo1.png');
        background-repeat:no-repeat;
        background-size:cover;
        position: relative;
        h6{
          font-size: 30px;
          color:#fff;
          font-weight: normal;
          .btn_qx{
            padding: 4px 12px;
            border:1px solid #fff;
            background:#409EFF;
            color:#fff;
            margin-left:12px;
          }
          .btn_qx:hover{
            background:#fff;
            color:#409EFF;
          }
          .top_num{
            color:#ff0000;
            margin:0 5px;
          }
        }
        .top_ts{
          width: 144px;
          height: 20px;
          font-size: 16px;
          font-weight: normal;
          color: #fff;
          overflow: hidden;
          margin-top: 10px;
          .center_title{
            color:#fff;
          }
        }
        .wzlicon{
          width: 40px;
          height:45px;
          background-image: url(../../../assets/checkImg/anquan.png);
          font-size: 45px;
          color: #fff;
          position: absolute;
          left: 62px;
          top: 28px;
        }
      }
    }
    
  }
  .el-main{
    .btn_qx{
      padding: 3px 10px;
      margin:14px 0;
      font-size:14px;
      width:58px;
      float:right;
    }
    .btn_qx1{
      width:58px;
      padding: 3px 10px;
      margin:14px 0;
      font-size:14px;
      float:right;
      border:1px solid rgba(188, 188, 188, 1);
      color:rgba(188, 188, 188, 1);
      display: block;
    }
    :hover.btn_qx1{
      border:1px solid #3e9ff1;
      background:#fff;
      color:#3e9ff1;
    }
    padding:0 20px;
    .main_checker{
      text-align: center;
      margin-top: 50px;
      .el-button{
        // width:300px;
        // height:66px;
        width: 260px;
        height: 60px;
        background-color: #07a6f9;
        font-size:30px;
        margin-top:20%;
      }
    }
    .main_checker2{
      border:1px solid rgba(188, 188, 188, 1);
      // padding:10px 40px;
     
      h6{
        height: 46px;
        line-height: 46px;
        font-size: 16px;
        font-weight: normal;
         border-bottom: 1px solid  rgba(188, 188, 188, 1);
      }
      p{
        font-size:14px;
        .el-icon-success{
          color: rgb(0,204,0);
          margin-right: 10px;
        }
        .el-icon-warning{
          color:rgb(255,0,0); 
          margin-right: 10px;
        }
      }
      .company_content{
        min-height: 320px;
        // padding:10px 20px;
        // display:none;
        margin-top:-11px;
        ul{
          height: 0;
          margin-top:25px;
          overflow: hidden;
          animation: showUlAni 1.2s linear  forwards;
          animation-play-state: paused;
          &.showani{
            animation-play-state: running;
          }
          &.cancelAni{
            animation-play-state: paused;
          }

          li{
            // height: 50px;
            line-height: 50px;
            border-bottom:1px solid #ccc;
            padding:0 60px;
          }
          // li{
          //   width: 100%;
          //   animation:myfirst 4s;
          //   -moz-animation:myfirst 4s; /* Firefox */
          //   -webkit-animation:myfirst 4s; /* Safari and Chrome */
          //   -o-animation:myfirst 4s; /* Opera */
          // }
          // @keyframes myfirst
          // {
          // from {width: 0%;height: 0%;}
          // to {width: 100%;}
          // }
          // @-moz-keyframes myfirst /* Firefox */
          // {
          // from {width: 0%;height: 0%;}
          // to {width: 100%;}
          // }
          // @-webkit-keyframes myfirst /* Safari and Chrome */
          // {
          // from {width: 0%;height: 0%;}
          // to {width: 100%;}
          // }
          // @-o-keyframes myfirst /* Opera */
          // {
          // from {width: 0%;height: 0%;}
          // to {width: 100%;}
          // }
        }
      }
      .btn_content{
        text-align: center;
        margin: 20px 0;
        .btn_kd{
          width:110px;
          font-size: 16px;
        }
        .btn_h{
          width:110px;
          font-size: 16px;
          background-color:#ccc;
          border:1px solid #ccc;
        }
      }
      // .btn_content .btn_h:hover{
      //   opacity: 0.8;
      //   background:#fff;
      //   color:#3e9ff1;
      //   border:1px solid #3e9ff1;
      // }
    }
  }
}
</style>
