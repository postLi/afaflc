<template>
    <div class="TwoColumns serviceArea clearfix" v-loading ="loading">
        <div class="columnsContainer">
            <div class="side_left">
                 <el-tree
                :data="cityTree"
                :props="defaultProps"
                default-expand-all
                :highlight-current = "true"
                 @node-click="handleNodeClick"
                >
                </el-tree>
            </div>
            <div class="side_right">
                <div class="side_right_bottom clearfix">
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
                            prop="name"
                            label="区域">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>    
    </div>
</template>

<script type="text/javascript">

import {  data_GetCityInfo, data_ChangeStatus, data_Delete } from '@/api/server/areaPrice.js'
import { aflcProvinceCode,data_get_aflcCityTree_list } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/'
import '@/styles/dialog.scss'
import '@/styles/side.scss'

export default{
      data() {
          return {
            loading:true,
              cityTree:[],
              dialogAreaPrice:false,
              isModify:false,
              formtitle:'',
              reviseForm:{},
              btnsize: 'mini',
              sizes: [20, 50, 100],
              cityName: '', // 省级列表
              page: 1,
              pagesize: 20,
              dataTotal: 0,
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
        },

      mounted() {
            this.firstblood()
        },
    
      methods: {
            shuaxin(){
                this.getCommonFunction();
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
                    this.cityName = this.cityTree[0].name; 
                    this.getCommonFunction();
                })
            },
            // 查询和获取对应区域的数据
            getCommonFunction() {
                this.loading = true;
                const data = Object.assign({}, { name:this.cityName })
                data_get_aflcCityTree_list(this.page, this.pagesize, data).then(res => {
                  console.log(res.data.list)
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.loading = false;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                    this.loading = false;
                })
            },
            handleNodeClick(data, checked) {
                if (checked.level === 1) {
                    this.cityName = data.name;
                }
                if (checked.level === 2) {
                    this.cityName =  data.name ;
                }
                this.getCommonFunction()
            },
            // 点击选中当前行
            clickDetails(row, event, column) {
              this.$refs.multipleTable.toggleRowSelection(row)
            },
            // 判断是否选中
            getinfomation(selection) {
              this.checkedinformation = selection
            },
        }
    }
</script>

<style type="text/css" lang="scss">
    .serviceArea{
        height:100%;    
        position: relative;
        margin-left:7px;
        padding-bottom: 40px;
    }
</style>
