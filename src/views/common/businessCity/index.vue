<template>
    <div class="TwoColumns businessCity clearfix">
        <div class="columnsContainer">
            <div class="side_left">
                 <el-tree
                 ref="treeForm"
                 show-checkbox
                :data="cityTree"
                check-strictly
                 node-key="code"
                :props="defaultProps"
                :default-expand-all='treestatus'
                :highlight-current = "true"
                @node-click="nodeClick"
                @check-change="handleClick" 
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
                            label="城市">
                            </el-table-column>
                            <el-table-column
                            sortable
                            prop="name"
                            label="城市Code">
                            </el-table-column>
                            <el-table-column
                            sortable
                            prop="name"
                            label="创建时间">
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
import { data_getProvinceList,data_GetCityList } from '@/api/common.js'
import { data_CityList,data_AddCity } from '@/api/company/businessCity.js'
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/'
import '@/styles/dialog.scss'
import '@/styles/side.scss'

export default{
      data() {
          return {
              treestatus:false,
              cityTree:[],
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
            this.getMoreInformation()
        },
      updated(){
            this.cityTree.forEach(item=>{
                if(item.name=='北京市'){
                    item.children = [{
                        name:'北京城区',
                        code:'110100',
                        parentCode:'110100'
                    }]
                }
                if(item.name=='天津市'){
                    item.children = [{
                        name:'天津城区',
                        code:'120100',
                        parentCode:'120100'
                    }]
                }
                if(item.name=='上海市'){
                    item.children = [{
                        name:'上海城区',
                        code:'310100',
                        parentCode:'310100'
                    }]
                }
                if(item.name=='重庆市'){
                    item.children = [{
                        name:'重庆城区',
                        code:'500100',
                        parentCode:'500100'
                    }]
                }
                else{
                data_GetCityList(item.code).then(res=>{
                     item.children = res.data.list;
                })
                }
     
            })
        
           console.log('this.cityTree',this.cityTree)
       },
      methods: {
            // 刷新页面
            firstblood() {
            },
            getMoreInformation(){
           data_getProvinceList().then(res=>{
            if(res.text == '请求成功' && res.data.list.length >0 ){
                this.cityTree = res.data.list.map(el => {
                    el.children = []
                    return el
                });
            }else{
                this.cityTree = null;
            }
            })

            },
            handleClick(data, checked, node){
                 if(checked == true){
                     this.checkedId = data.id;
                     this.$refs.treeForm.setCheckedNodes([data]);
                 }
            },
            nodeClick(data,checked,node){
                this.checkedId = data.id
                this.$refs.treeForm.setCheckedNodes([data]);
                
            },

            // 点击选中当前行
            clickDetails(row, event, column) {
              this.$refs.multipleTable.toggleRowSelection(row)
            },
            // 判断是否选中
            getinfomation(selection) {
              this.checkedinformation = selection
            },
            // 每页显示数据量变更
            handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
            },
        }
    }
</script>

<style type="text/css" lang="scss">
    .businessCity{
        height:100%;    
        position: relative;
        margin-left:7px;
        padding-bottom: 40px;
        .side_left{
        height: 90%
        }
        .el-tree-node__content{
        .el-checkbox{
            display: none;
        }
        }
        .el-tree-node__children{
            .el-checkbox{
                display: block
            }
        }
    }
</style>
