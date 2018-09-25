<template>
    <div class="TwoColumns serviceArea clearfix">
        <div class="columnsContainer">
            <div class="side_left">
                 <el-tree
                :data="cityTree"
                :props="defaultProps"
                default-expand-all
                :highlight-current = "true"
                @node-expand="handleNodeClick"
                >
                </el-tree>
            </div>
            <div class="side_right">
                <searchInfo @change="getSearchParam"></searchInfo>
                <div class="side_right_bottom clearfix">
                    <div class="btns_box clearfix">
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="handleClick('add')">新增</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')">修改</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-delete" @click="handleClick('delet')">删除</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status')">启用/禁用</el-button>
                    </div>
                    <div class="info_news">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            stripe
                            border
                            height="100%"
                            :default-sort = "{prop: 'areaName', order: 'descending'}"
                            @row-click="clickDetails"
                            @selection-change = "getinfomation"
                            tooltip-effect="dark"
                            style="width: 100%"> 
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column label="序号" width="80px">
                                <template slot-scope="scope">
                                    {{ (page - 1)*pagesize + scope.$index + 1 }}
                                </template>
                            </el-table-column>  
                            <el-table-column
                            sortable
                            prop="areaName"
                            label="区域">
                            </el-table-column>
                            <el-table-column
                            prop="serviceName"
                            sortable
                            label="服务分类">
                            </el-table-column>
                            <el-table-column
                            prop="carTypeName"
                            sortable
                            label="车辆类型">
                            </el-table-column>
                            <el-table-column
                            prop="standardPriceM"
                            sortable
                            label="标准起步价">
                            </el-table-column>
                            <el-table-column
                            prop="outstripPriceM"
                            sortable
                            label="标准超里程费   ">
                            </el-table-column>
                            <el-table-column
                            prop="areaPriceM"
                            sortable
                            label="区域起步价">
                            </el-table-column>
                            <el-table-column
                            prop="areaOutstripPriceM"
                            sortable
                            label="区域超里程费">
                            </el-table-column>
                            <el-table-column
                            prop="usingStatus"
                            sortable
                            width="110"
                            label="状态">
                            <template  slot-scope="scope">
                                    {{ scope.row.usingStatus === '1' ? '启用' : '禁用' }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>

                <!-- 页码 -->
                <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>    

                    <!-- 修改分类信息 -->
                    <div class="changeclassify commoncss">
                        <el-dialog title='修改分类信息'  :visible.sync="dialogFormVisible_change">
                            <div class="changeInforMation">
                                <div class="nowCity">
                                    <h4><span>* </span>当前城市</h4>
                                    <el-input
                                        v-model="changeforms.areaName"
                                        disabled
                                        clearable>
                                    </el-input>
                                </div>
                                <div class="chose">
                                    <p><span>* </span>当前服务分类 ：</p>
                                    <el-input
                                        v-model="changeforms.serviceName"
                                        :disabled="true">
                                    </el-input>
                                </div>
                                    <div class="chose">
                                    <p><span>* </span>当前车辆类型 ：</p>
                                    <el-input
                                        v-model="changeforms.carTypeName"
                                        :disabled="true">
                                    </el-input>
                                </div>
                                <div class="chose">
                                    <p><span>* </span>车长 ：</p>
                                    <el-input
                                    
                                        v-model="changeforms.carTypeStyle"
                                        :disabled="true">
                                    </el-input>
                                </div>
                                <div class="reference">
                                    <div class="referenceM">
                                            <span class="control">标准起步价</span>
                                            <el-input
                                                disabled
                                                v-model="changeforms.standardPrice"
                                                clearable>
                                            </el-input>
                                            <span>元</span>
                                            <el-input
                                                disabled
                                                v-model="changeforms.standardKm"
                                                clearable>
                                            </el-input>
                                            <span>公里</span>
                                        </div>
                                        <div class="referenceM">
                                            <span class="control">超里程费</span>         
                                            <el-input
                                                disabled
                                                v-model="changeforms.outstripPrice"
                                                clearable>
                                            </el-input>
                                            <span>元 / 公里</span>
                                        </div>       
                                </div>
                                <div class="nowChange">
                                    <span class="control">区域起步价</span>
                                    <el-input
                                        v-numberOnly
                                        placeholder="请输入内容"
                                        v-model="changeforms.areaPrice"
                                        ref="newPrice"
                                        clearable>
                                    </el-input>
                                    <span>元</span>
                                    <el-input
                                        v-numberOnly                                   
                                        placeholder="请输入内容"
                                        v-model="changeforms.areaKm"
                                        ref="newInfoKm"
                                        clearable>
                                    </el-input>
                                    <span>公里</span>
                                </div>
                                <div class="nowChange nowChangeInfo">
                                    <span class="control">区域超里程费</span>         
                                    <el-input
                                        v-numberOnly                                    
                                        placeholder="请输入内容"
                                        v-model="changeforms.areaOutstripPrice"
                                        ref="newMorePrice"
                                        clearable>
                                    </el-input>
                                    <span>元 / 公里</span>
                                </div>       
                            </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="changeInfoSave">保 存</el-button>
                                <el-button  @click="dialogFormVisible_change = false">取 消</el-button>
                            </div>
                        </el-dialog>
                    </div>
            </div>
            <AreaPrice :dialogAreaPrice.sync="dialogAreaPrice" :reviseForm = 'reviseForm' :formtitle = 'formtitle' :isModify = "isModify"   @close = "shuaxin"/>
        </div>
    </div>
</template>

<script type="text/javascript">

import { data_GetCityList, data_GetCityInfo, data_CarList, data_ServerClassList, data_ChangeStatus, data_Delete, data_GetCarStyle, data_NewOrChange, data_OnlyChange } from '@/api/server/areaPrice.js'
import { aflcProvinceCode } from '@/api/common.js'
import AreaPrice from './AreaPrice'
import Pager from '@/components/Pagination/index'
import searchInfo from '../component/searchInfo'

import '@/styles/dialog.scss'
import '@/styles/side.scss'

export default{
      data() {
          return {
              cityTree:[],
              dialogAreaPrice:false,
              isModify:false,
              formtitle:'',
              reviseForm:{},
              btnsize: 'mini',
              sizes: [20, 50, 100],
              provinceId: '', // 省级列表
              searchInfo: {
                  valueService: '', // 服务分类
                  valueCarlist: '',
                  valueStatus: ''
                },
              page: 1,
              pagesize: 20,
              dialogFormVisible_change: false,
              dataTotal: 0,
              changeforms: {
                  areaKm: '',
                  areaName: '',
                  areaOutstripPrice: '',
                  areaPid: '',
                  areaPrice: '',
                  carType: '',
                  cityId: '',
                  outstripPrice: '',
                  serivceCode: '',
                  standardKm: '',
                  standardPrice: '',
                  standardPriceId: ''
                },
              checkedinformation: [],
              tableData: [],
              defaultProps: {
                  children: 'children',
                  label: 'name'
                }
            }
        },
      components: {
          Pager,
          searchInfo,
          AreaPrice
        },

      mounted() {
            this.firstblood()
        },
    
      methods: {
            shuaxin(){
                this.getCommonFunction();
            },
            getSearchParam(obj) {
              console.log(obj)
              this.searchInfo = Object.assign(this.searchInfo, obj)
              this.getCommonFunction()
            },
            handlePageChange(obj) {
              this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.getCommonFunction()
            },
            // 刷新页面
            firstblood() {
                aflcProvinceCode().then(res => {
                    console.log('aflcProvinceCode',res)
                    this.cityTree = res.data;
                    this.provinceId = this.cityTree[0].code; 
                    this.getCommonFunction();
                })
            },
            handleClick(type){
                if (this.checkedinformation.length == 0 && type != 'add') {
                    // 未选择任何修改内容的提示
                   return this.$message({
                        message: '请选择要操作的数据~',
                        type: 'warning'
                    })
                } else if (this.checkedinformation.length > 1  && type == 'revise') {
                    return this.$message({
                        message: '不可同时修改多条数据~',
                        type: 'warning'
                    })
                }
                switch(type){
                    case 'add':
                        // this.dialogFormVisible = true;
                        this.isModify = false;
                        this.dialogAreaPrice = true;
                        break;
                    case 'revise':
                        this.dialogFormVisible_change = true
                        this.changeforms = this.checkedinformation[0];
                        // this.isModify = true;
                        // this.dialogAreaPrice = true;

                        // if (this.checkedinformation[0].cityId) {
                        // this.changeforms.cityId = this.checkedinformation[0].cityId
                        // }else {
                        // this.changeforms.cityId = this.checkedinformation[0].provinceId
                        // }
                        // this.changeforms.carTypeStyle = this.checkedinformation[0].carLength + '*' + this.checkedinformation[0].carWidth + '*' + this.checkedinformation[0].carHeight + 'M'
                        break;
                    case 'delet':
                        const delID = []
                        this.checkedinformation.map((item) => {
                            return delID.push(item.areaPid)
                        })
                        let config = delID.length>1 ?  delID.length + '条' : this.checkedinformation[0].areaName+'这条';
                        this.$confirm('确定要删除'+config+'数据吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                            data_Delete(delID).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.getCommonFunction();
                            }).catch(err=>{
                                this.$message({
                                    type: 'info',
                                    message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                                })
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                    case 'status':
                        const statusID = []
                        this.checkedinformation.map((item) => {
                            return statusID.push(item.areaPid)
                        })
                        data_ChangeStatus(statusID).then(res=>{
                            this.getCommonFunction();
                        }).catch(err=>{
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                            })
                        })
                        break;
                }
            },
            // 查询和获取对应区域的数据
            getCommonFunction() {
              const data = Object.assign({}, { cityId: this.cityId, provinceId: this.provinceId }, this.searchInfo)
                // console.log(data);
              data_GetCityInfo(this.page, this.pagesize, data).then(res => {
                  console.log(res.data.list)
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;
                     this.tableData.map((item) => {
                        item.capacityTonM = item.capacityTon + '吨,' + ' ' + item.capacitySquare + '方'
                        item.standardPriceM = item.standardPrice + '元 ' + ' ' + '(' + item.standardKm + '公里)'
                        item.outstripPriceM = item.outstripPrice + '元/公里'
                        item.areaPriceM = item.areaPrice + '元' + '' + '(' + item.areaKm + '公里)'
                        item.areaOutstripPriceM = item.areaOutstripPrice + '元/公里'
                    })
                }).catch(res => {
                  console.log(res)
                  const information = res.text
                    this.hint(information)
                })
            },
            handleNodeClick(data, checked) {
              console.log(data)
                if (checked.level === 1) {
                    this.provinceId = data.code;
                    this.cityId = '' ;
                }
                if (checked.level === 2) {
                    this.cityId = data.code;
                    this.provinceId = '' ;
                }
                this.getCommonFunction()
            },
             // 弹窗Tree节点
            handleNodeClickMore(data, checked) {
               
            },
            // 点击选中当前行
            clickDetails(row, event, column) {
              this.$refs.multipleTable.toggleRowSelection(row)
            },
            // 判断是否选中
            getinfomation(selection) {
              this.checkedinformation = selection
            },
            // 修改保存
            changeInfoSave() {
                data_OnlyChange(this.changeforms).then(res => {
                    console.log(res)
                    this.dialogFormVisible_change = false
                    this.getCommonFunction()
                }).catch(err=>{
                    this.$message.error('操作失败，失败原因：',err.errorInfo)
                })
            },
        }
    }
</script>

<style type="text/css" lang="scss">
    .serviceArea{
        height:100%;    
        position: relative;
        margin-left:7px;
        .addclassify{
            .el-dialog{
                position: relative;
                width: 820px;
                .el-dialog__headerbtn{
                    z-index: 99;
                }
            }
            .infoinner{
                height:350px;
                .slot_info{
                    position:absolute;
                    top:0;
                    left:0;
                    width:100%;
                    border-bottom: 1px solid #d0d7e5;
                    .newarea{
                        float:left;
                        width:50%;
                        padding:0 0 0 33px;
                        .slot_head{
                            display: inline-block;
                            text-align: center;
                            width:100%;
                            height: 40px;
                            font-family: MicrosoftYaHei;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 40px;
                            letter-spacing: 0px;
                            color: #ffffff;
                        }
                        .area_server{
                            padding-top:17px;
                            padding-bottom: 14px;
                            h4{
                                span{
                                    color:red;
                                }
                                font-family: MicrosoftYaHei;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #666;
                                margin-bottom: 13px;
                            }
                            .eltree_search{
                                width: 250px;
                                height: 256px;
                                margin-bottom: 12px;
                                overflow: auto;
                                border: 1px solid #ccc;
                                p{
                                    margin:9px 0 0 33px;
                                    font-size: 12px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    line-height: 20px;
                                    letter-spacing: 0px;
                                    color: #333333;
                                }
                                .el-radio-group{
                                    margin-left:34px;
                                    font-size: 12px;
                                    line-height: 20px;
                                    color:#333;
                                    .el-radio{
                                        margin:6px 0 0 0;
                                    }
                                }
                                .el_search{
                                    width: 100%;
                                    padding:6px 5px;
                                    .el-input__inner{
                                        height: 26px;
                                        line-height: 26px;
                                    }

                                }
                                .el-tree{
                                    .el-checkbox{
                                        margin-top:0;
                                        .el-checkbox__inner{
                                            width: 12px;
                                            height: 12px;
                                        }
                                    }
                                }
                            }
                            .chooseclassfy{
                                width: 250px;
                                .chose{
                                    p{
                                        margin-left: 10px; 
                                        span{
                                            color:red;
                                        }
                                    }
                                    .el-select{
                                        margin:5px 0;
                                        padding-left: 80px;
                                        .el-input{
                                            width: 150px;
                                            .el-input__inner{
                                                padding: 5px;
                                                height: 24px;
                                                line-height: 24px;
                                                font-size: 12px;
                                                color:#3e9ff1;
                                            }
                                        }
                                    }
                                }
                            }
                            label{
                                display: block;
                                margin-top:12px;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #666666;
                                .control{
                                    display: inline-block;
                                    text-align: right;
                                    width: 75px;
                                }
                                .el-input{
                                    width: 96px;
                                    height:24px;
                                    margin:0 6px;
                                    .el-input__inner{
                                        display: inline-block;
                                        width: 96px;
                                        height: 24px;
                                        font-size: 12px;
                                        border-radius: 2px;
                                        border: solid 1px #d4d4d4;
                                        padding:8px;
                                        color: #3e9ff1;
                                    }
                                }
                            }
                        }
                    }
                    .area_left{
                        .slot_head{
                            border-right:1px solid #fff;
                        }
                        .area_left_server{
                            border-right:1px solid #d0d7e5;
                        }
                    }

                    .area_right{
                        .area_right_server{
                            .el-tree{
                                overflow:auto;
                            }
                        }
                    }
                    
                }
            }
            .el-dialog__footer{
                padding:10px 20px;
            }
        }
        .changeclassify{
            .el-dialog{
                width: 40%;
            }
            .el-dialog__body{
                .changeInforMation{
                    padding: 0 20px;
                    .el-input{
                        width: 110px;
                        .el-input__inner{
                            height: 24px;
                            line-height: 24px;
                            font-size: 12px;
                            color: #3e9ff1;
                        }
                    }
                    .nowCity{
                        h4{
                            display: inline-block;
                            width: 111px;
                            span{
                                color: red;
                            }
                        }
                    }
                    .chose{
                        display: inline-block;
                        margin:10px 30px 10px 0; 
                        p{
                            display: inline-block;
                            height: 24px;
                            line-height: 24px;
                            span{
                                color: red;
                            }
                        }
                        
                    }
                    .reference{
                        border: 1px dashed #ccc;
                        margin:10px; 
                        padding: 10px;
                        font-size: 12px;
                        .referenceM{
                            display: inline-block;
                            padding: 5px; 
                            margin-left: 65px;
                        }
                        .el-input {
                            width: 90px;
                        }
                    }
                    .nowChange{
                        display: inline-block;
                        margin-left: 80px;
                        .el-input{
                            width: 90px;
                        }
                    }
                    .nowChangeInfo{
                        margin-left: 32px;
                    }
                    
                }
            }
        }
    }
</style>
