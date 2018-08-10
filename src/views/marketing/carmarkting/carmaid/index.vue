<template>
  <div class="shipper">
    <el-tabs v-model="shipperName" type="border-card"  >
        <!-- 同城 -->
            <el-tab-pane label="同城" name="first">
                <SameCity ></SameCity>
            </el-tab-pane>

        <!-- 城际 -->
            <el-tab-pane label="城际" name="second">
                <InterCity ></InterCity>
            </el-tab-pane>

        <!-- 零担 -->
            <el-tab-pane label="零担" name="third">
                <IoadCity ></IoadCity>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import SameCity from './sameCity.vue'
import InterCity from './interCity.vue'
import IoadCity from './loadCity.vue'
export default {
    data(){
        return{
            shipperName:'first',
        }
    },
    components:{    
            SameCity,
            InterCity,
            IoadCity
    },
    watch:{
     shipperName(newVal,oldVal){
        if(newVal){
            this.shipperName = newVal;
          }else{
        this.shipperName = oldVal;
          }
        }
        },
     methods: {
     handleClick(tab, event) {
      this.shipperName = tab.name;
       }
     }
}
</script>

<style lang="scss">
    @import "../../../../styles/tab.scss";
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
            border-bottom:2px dashed #ccc;
            height:70px;
            width:100%;
            line-height: 35px;
            .el-form-item{
                margin-right: 15px;
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
            padding:90px 13px 0 0;
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
