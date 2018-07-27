<template>
  <div class="shipper">
        <div class="shipper_searchinfo" >
          <el-form :inline="true">
            <el-form-item label="所在地：">
              <GetCityList v-model="formAll.belongCity" ref="area"></GetCityList>
          </el-form-item>
           <el-form-item label="服务类型">
                    <el-select v-model="serviceValue" clearable placeholder="请选择">
                        <el-option
                        v-for="item in serviceCard"
                        :key="item.value"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                 </el-form-item>
        <el-form-item>       
         <el-button type="primary"  plain >查询</el-button>
         <el-button type="primary"  plain >清空</el-button>
         </el-form-item>
           </el-form> 
  </div>

  <div class="classify_info">
   <div class="btns_box">
    <newpushsheet  btntext="新增" :plain="true" type="primary" btntype="primary" icon="el-icon-news" editType="add" btntitle="新增货主"></newpushsheet>
   </div>
   <div>
  <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        height="100%"
                        highlight-current-row
                        current-row-key
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        @current-change= "handleSelectionChange"
                        style="width: 100%">
                        <el-table-column
                        type="index"
                        label="序号"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="driverMobile"
                        label="手机号"
                        >
                        <template slot-scope="scoped">
                            <driver-newTemplate
                            :templateItem="scoped.row"
                                :btntext="scoped.row.driverMobile"
                                type="primary" 
                                btntype="text"
                                editType="view"

                                btntitle="新增车主">
                                </driver-newTemplate>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="carNumber"
                        label="车牌号">
                        </el-table-column>
                        <el-table-column
                        prop="driverName"
                        label="车主"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="registerOrigin"
                        label="注册来源">
                        </el-table-column>
                        <el-table-column prop="accountStatusName" label="账户状态"></el-table-column>
                        <el-table-column
                        prop="belongCityName"
                        label="所在地">
                        </el-table-column>
                        <el-table-column
                        prop="driverStatusName"
                        label="状态">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        label="注册日期">
                        </el-table-column>
                    </el-table>

   </div>
  </div>

  </div>
</template>

<script>
import GetCityList from '@/components/GetCityList'
import newpushsheet from './newpushsheet'
export default {
    data(){
        return{
		formAll:{
            belongCity: null,
            },
        serviceCard:[
          {
          code:null,
          name:'小货车'
          },
          {
          code:null,
          name:'大货车'
          },
          {
          code:null,
          name:'小货车'
          },
        ],
        serviceValue:null
        }
    },
    components:{
        GetCityList,
        newpushsheet
    }
}
</script>

<style lang="scss" scoped>
.shipper{
        height:100%;    
        position: relative;
        .el-tabs{
            height: 100%;
            .el-tabs__content{
                height: 93%;
                .el-tab-pane{
                    height: 100%;
                }
            }
        }
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
            padding:90px 13px 0 13px;
            .btns_box{
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
        .carNewinfo,.freezeInfo,.blackInfo{
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
                                .lessWidth{
                                    width: 80px;
                                }
                                &>.el-checkbox{
                                    margin-left: 130px;
                                }
                            }
                        }    
                        .licensePicture{
                            width: 300px;
                            line-height: 20px;
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
                      
                    }
                }
            }
        }
    }
</style>
