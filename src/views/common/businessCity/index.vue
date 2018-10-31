<template>
    <div class="TwoColumns businessCity clearfix">
        <div class="columnsContainer">
            <div class="side_left">
                <div class="side_left_top">
                 <el-tree
                 ref="treeForm"
                 show-checkbox
                :data="cityTree"
                check-strictly
                 node-key="code"
                :props="defaultProps"
                :default-expand-all='treestatus'
                :highlight-current = "true"
                @check="nodeClick"
                @check-change="handleClick" 
                >
                </el-tree>
                </div>
                <div class="side_left_bottom">
                    <el-button type="primary" plain @click="Add_getData" :size="btnsize" icon="el-icon-circle-plus">新增</el-button>
                </div>
            </div>
            <div class="side_right">
                <div class="side_right_bottom clearfix">
                    <div class="info_news">
                        <el-table
                            ref="multipleTable"
                            :data="tableDataTree"
                            stripe
                            border
                            height="100%"
                            :default-sort = "{prop: 'areaName', order: 'descending'}"
                            tooltip-effect="dark"
                            style="width: 100%"> 
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
                            prop="code"
                            label="城市Code">
                            </el-table-column>
                            <el-table-column
                            sortable
                            prop="createTime"
                            label="创建时间">
                            </el-table-column>                            
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 页码 -->
         <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>     
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
              pagesize:20,//每页显示数
              page:1,//当前页
              totalCount:null,
              dataTotal:null,
              tableDataTree: [],
              defaultProps: {
                  children: 'children',
                  label: 'name'
              },
              fromData:{
              cityCode:null,
              cityName:null,
              provinceCode:null,
              provinceName:null,
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
                    }]
                }
                if(item.name=='天津市'){
                    item.children = [{
                        name:'天津城区',
                        code:'120100',
                    }]
                }
                if(item.name=='上海市'){
                    item.children = [{
                        name:'上海城区',
                        code:'310100',
                    }]
                }
                if(item.name=='重庆市'){
                    item.children = [{
                        name:'重庆城区',
                        code:'500100',
                    }]
                }
                if(item.name=='台湾省'){
                    item.children = [{
                        name:'台湾',
                        code:'710000',
                    }]
                }
                if(item.name=='香港特别行政区'){
                    item.children = [{
                        name:'香港特别行政区',
                        code:'810000',
                    }]
                }
                if(item.name=='澳门特别行政区'){
                    item.children = [{
                        name:'澳门特别行政区',
                        code:'820000',
                    }]
                }                                

                else{
                data_GetCityList(item.code).then(res=>{
                    if(res.data.list.length>0)
                    {
                    item.children = res.data.list;
                    }
                })
                }
     
            })
       },
      methods: {
            // 刷新页面
            firstblood() {
                console.log('11')
                data_CityList(this.page,this.pagesize,{}).then(res=>{
                    console.log('data1',res)
                    this.dataTotal = res.data.length
                    this.tableDataTree = res.data;
                    this.loading = false;
                    this.tableDataTree.forEach(item => {
                        item.createTime = parseTime(item.createTime,"{y}-{m}-{d}");
                    })
                })                
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
                     this.$refs.treeForm.setCheckedNodes([data]);
                 }
            },
            nodeClick(data,checked,node,gg){
                this.fromData={
                    cityCode:this.$refs.treeForm.getNode(data.code).data.code,
                    cityName:this.$refs.treeForm.getNode(data.code).data.name,
                    provinceCode:this.$refs.treeForm.getNode(data.code).parent.data.code,
                    provinceName:this.$refs.treeForm.getNode(data.code).parent.data.name,
                }
                this.$refs.treeForm.setCheckedNodes([data])
                
                
            },
            // 新增
            Add_getData(){
                data_AddCity(this.fromData).then(res=>{
                       this.$message.success('新增成功')
                            this.firstblood()
                        }).catch(res=>{
                            this.$message.error('新增失败')
                            this.firstblood()
                        })
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
        height: 100%;
        position: relative;
            .side_left_top{
             height:90%;
             overflow-x: auto;
             }
            .side_left_bottom{
             position: absolute;
             bottom: 10px;
             right: 10px;
             vertical-align: bottom
             }
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
