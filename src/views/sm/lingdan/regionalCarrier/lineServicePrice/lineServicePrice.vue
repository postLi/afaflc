<template>
    <div class="identicalStyle lineServicePrice" v-loading="loading">
            <el-form  :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                <el-form-item label="区域" prop="areaName">
                    <el-input v-model="searchInfo.areaName" clearable>
                    </el-input>            
                </el-form-item>
                <el-form-item class="btnChoose fr"  style="margin-left:0;">
                    <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                    <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
                </el-form-item>
            </el-form>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize">新增</el-button>
                    <el-button type="primary" icon="el-icon-bell" plain @click="handleClick('status')" :size="btnsize">启用/禁用</el-button>
                </div>
                <div class="info_news" style="height:89%">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        border
                        align = "center"
                        height="100%"
                        @selection-change = "getinfomation"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column label="序号" sortable width="80">
                            <template slot-scope="scope">
                                {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            sortable
                            prop="areaName"
                            label="区域"
                            >
                            <template slot-scope="scope">
                               <h4 class="moreInfo" @click="handleInfo(scope.row)">{{scope.row.areaName}}</h4>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="updater"
                            :show-overflow-tooltip="true"
                            sortable
                            label="操作人"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="updateTime"
                            :show-overflow-tooltip="true"
                            sortable
                            label="操作时间"
                            >
                            <template slot-scope="scope">
                                {{ scope.row.updateTime | parseTime }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="160"
                            prop="usingStatus"
                            :show-overflow-tooltip="true"
                            sortable
                            label="状态"
                            >
                            <template slot-scope="scope">
                                {{ scope.row.usingStatus == '0' ? '禁用' : '启用'}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>   
                <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"    ref="pager"/></div> </div>    

    </div>
</template>

<script type="text/javascript">

import { TradeAreaLineCarrierList,TradeAreaLineCarrierStatus } from '@/api/server/lingdan/TradeAreaLineCarrier.js'
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'

export default{
      props: {
          isvisible: {
              type: Boolean,
              default: false
            }
        },
      components: {
            Pager,
        },
      data() {
          return {
              btnsize: 'mini',
              loading: false, // 加载
              sizes: [20, 50, 100],
              pagesize: 20, // 初始化加载数量
              page: 1, // 初始化页码
              dataTotal: 0,
              searchInfo: {
                 areaName:''
                },
              tableData: [],
              checkedinformation: [],
              dialogFormVisible: false,
            }
        },
      watch: {
          isvisible: {
              handler(newVal, oldVal) {
                  if (newVal) {
                        this.firstblood()
                    } 
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
              immediate: true
            }
        },
      created() {

        },
      mounted() {
            // this.firstblood();

        },
      beforeDestroy() {
        },
      methods: {
          handlePageChange(obj) {
              this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            // 刷新页面
          firstblood() {
                this.loading = true
                TradeAreaLineCarrierList(this.page, this.pagesize, this.searchInfo).then(res => {
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                })
            },
            handleInfo(row){
                this.$router.push({ name: '发物流新增线路增值服务定价', query: { areaCode: row.areaCode }})
            },
            // 模糊查询 分类名称或者code
          handleSearch(type) {
                switch (type) {
                    case 'search':
                        if(this.page!= 1){
                            this.page = 1;
                            this.$refs.pager.inputval = this.page;
                        }
                        this.firstblood()
                        break
                    case 'clear':
                        if(this.page!= 1){
                            this.page = 1;
                            this.$refs.pager.inputval = this.page;
                        }
                        this. searchInfo ={
                            name:'',
                            topic:'',
                            channalName:'',
                        }
                        this.firstblood()
                        break
                }
            },
            handleClick(type){
                switch (type) {
                    case 'new':
                        this.$router.push({ name: '发物流新增线路增值服务定价'})
                        break
                    case 'status':
                        console.log(this.checkedinformation)
                        if(this.checkedinformation.length == 0 ){
                            this.$message({
                                type: 'warning',
                                message: '请选择要操作的数据！' 
                            })
                        }else {
                            let ids = [];
                            this.checkedinformation.forEach(el =>{
                                ids.push(el.areaCode)
                            })
                            TradeAreaLineCarrierStatus(ids).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功！' 
                                })
                                this.firstblood()
                            })
                        }
                        break;
                }
            },
             // 判断是否选中
            getinfomation(selection) {
              this.checkedinformation = selection
            },
             // 点击选中当前行
            clickDetails(row, event, column) {
              this.$refs.multipleTable.toggleRowSelection(row)
            },
            // 详情弹窗
            pushOrderSerial(item) {
              this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
            },
            shuaxin() {
              this.firstblood();
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .lineServicePrice{
        .info_news{
            .el-table{
                td{
                    .cell{
                        .moreInfo{
                            cursor: pointer;
                            color: #3e9ff1;
                        }
                    }
                }
            }
        }
    }
</style>
