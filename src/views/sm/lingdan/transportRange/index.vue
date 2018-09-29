<template>
    <div class="TransportRange identicalStyle"  v-loading="loading">
        <el-form :inline="true" :model="logisticsForm" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <div class="searchInformation information">
                <el-form-item label="出发地：" prop="startLocation">
                    <el-input v-model="logisticsForm.startLocation">
                    </el-input>
                </el-form-item>
                <el-form-item label="到达地：" prop="endLocation">
                    <el-input v-model="logisticsForm.endLocation">
                    </el-input>
                </el-form-item>
                <el-form-item class="btnChoose fr" style="margin-left:20px;">
                    <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch">搜索</el-button>
                    <el-button type="info" icon="fontFamily aflc-icon-qingkong" plain :size="btnsize" @click="clearSearch">清空</el-button>
                </el-form-item>
            </div>
        </el-form>
            <div class="classify_info">
                <!-- <div class="btns_box">
                    <el-button type="primary" @click="handleNew">发布专线</el-button>  
                </div> -->
                <div class="info_news">
                    <el-table
                    :data="tableData"
                    ref="multipleTable"
                    stripe
                    border
                    :default-sort = "{prop: 'startLocation', order: 'descending'}"
                    height="100%"
                    style="width: 100%">
                        <el-table-column
                            label="序号"
                            type="index"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            sortable
                            :show-overflow-tooltip="true"
                            prop="startLocation"
                            label="出发地"
                            width="200">
                            <template slot-scope="scope">
                               <span class="moreInfo" @click="handleInfo(scope.row)">{{scope.row.startLocation}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            :show-overflow-tooltip="true"
                            prop="endLocation"
                            label="到达地"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="transportAging"
                            label="运输时效"
                            width="150">
                             <template slot-scope="scope">
                                <span v-if="scope.row.transportAging">{{scope.row.transportAging}} {{scope.row.transportAgingUnit}}</span>
                                <span v-else>暂未填写</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="departureHzData"
                            label="发车频率"
                            width="150">
                            <template slot-scope="scope">
                               <span v-if="scope.row.departureHzData">{{scope.row.departureHzData}}天/{{scope.row.departureHzTime}}次</span> 
                               <span v-else>暂未填写</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="weightcargo"
                            :show-overflow-tooltip="true"
                            label="重货价格" 
                            width="220">
                            <template slot-scope="scope">
                                <p v-if="scope.row.weightcargo.length == 0">
                                    <span class="interview">面谈</span>
                                </p>
                                <p class="cargo" v-for="(item,idx) in scope.row.weightcargo" :key="item.id" v-else>
                                    <span v-if="idx == 0">{{item.endVolume}}公斤以下,{{item.discountPrice ? item.discountPrice :item.primeryPrice}}元/公斤</span>
                                    <span v-else-if="idx == scope.row.weightcargo.length-1 &&  item.endVolume == ''">{{item.startVolume}}公斤以上,{{item.discountPrice ? item.discountPrice :item.primeryPrice}}元/公斤</span>
                                    <span v-else>{{item.startVolume}}-{{item.endVolume}}公斤,{{item.discountPrice ? item.discountPrice :item.primeryPrice}}元/公斤</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="lightcargo"
                            :show-overflow-tooltip="true"
                            label="轻货价格"
                            width="220">
                            <template slot-scope="scope">
                                <p v-if="scope.row.lightcargo.length == 0">
                                    <span class="interview">面谈</span>
                                </p>
                                <p class="cargo" v-for="(item,idx) in scope.row.lightcargo" :key="idx"  v-else>
                                    <span v-if="idx == 0">{{item.endVolume}}立方以下,{{item.discountPrice ? item.discountPrice :item.primeryPrice}}元/立方</span>
                                    <span v-else-if="idx == scope.row.lightcargo.length-1 && item.endVolume == ''">{{item.startVolume}}立方以上,{{item.discountPrice ? item.discountPrice :item.primeryPrice}}元/立方</span>
                                    <span v-else>{{item.startVolume}}-{{item.endVolume}}立方,{{item.discountPrice ? item.discountPrice :item.primeryPrice}}元/立方</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="lowerPrice"
                            label="最低一票价格(元)" 
                            width="180">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="publishName"
                            label="创建人" 
                            width="180">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="createTime"
                            label="创建时间" 
                            width="220">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="rangeTypeName"
                            label="专线类型" 
                            width="120">
                            <template slot-scope="scope">
                               <span class="rangeTypeName">{{scope.row.rangeTypeName}}</span> 
                            </template>
                        </el-table-column>
                        <!-- <el-table-column
                            prop="address"
                            label="操作"
                            width="250"
                            >
                                <template slot-scope="scope"> -->
                                    <!-- <el-button-group> -->
                                        <!-- <el-button @click="handleEdit(scope.row)" type="primary" size="mini">修改</el-button> -->
                                        <!-- <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button> -->
                                        <!-- <el-button @click="handleStatus(scope.row)" :type="scope.row.rangeStatus == 0 ? 'primary' : 'info'" size="mini">{{scope.row.rangeStatus == 0 ? '启用' : '禁用'}}</el-button> -->
                                    <!-- </el-button-group> -->
                                <!-- </template> -->
                        <!-- </el-table-column> -->
                    </el-table>
                </div>
            </div>  
            <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>    
    </div>
</template>

<script>

import { getTransportRangeList, TransportRangeStatus, deleteTransportRange } from '@/api/server/lingdan/TransportRange.js'
import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'

export default {
  components: {
    Pager
  },
  data() {
    return {
      btnsize: 'mini',
      loading: true,
      defaultImg: '/static/default.png', // 默认加载失败图片
      totalCount: 0,
      page: 1,
      pagesize: 20,
      logisticsForm: {
        startLocation: '', // 出发地
        endLocation: '' // 到达地
      },
      tableData: []
    }
  },
  watch: {

  },
  mounted() {
    this.firstblood()
  },
  methods: {
    firstblood() {
      getTransportRangeList(this.page, this.pagesize, this.logisticsForm).then(res => {
        this.tableData = res.data.list
        this.totalCount = res.data.totalCount
        this.tableData.forEach(el => {
          el.weightcargo = []
          el.lightcargo = []
          el.rangePrices.forEach(item => {
            switch (item.type) {
              case '0':
                el.lightcargo.push(item)
                break
              case '1':
                el.weightcargo.push(item)
                break
            }
          })
          el.lightcargo.sort(function(a, b) {
            return a.startVolume - b.startVolume
          })
          el.weightcargo.sort(function(a, b) {
            return a.startVolume - b.startVolume
          })
        })
        this.loading = false
        console.log(this.tableData)
      })
    },
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
    },
    clearSearch() {
      this.$refs.ruleForm.resetFields()
      this.firstblood()
    },
        // 搜索
    handleSearch() {
      this.firstblood()
    },
        // 查看详情
    handleInfo(row) {
      this.$router.push({ name: '发布物流专线', query: { data: row, ifrevise: '2' }})
    },
        // 新增网点
    handleNew() {
      this.$router.push({ name: '发布物流专线' })
    },
        // 修改
    handleEdit(row) {
      this.$router.push({ name: '发布物流专线', query: { data: row, ifrevise: '1' }})
    },
        // 删除网点
    handleDelete(row) {
      this.$confirm('确定要删除 ' + row.startLocation + '-' + row.endLocation + ' 该条专线吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTransportRange(row.id).then(res => {
          this.firstblood()
        }).catch(err => {
          this.$message({
              type: 'warning',
              message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
            })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
        // 更改状态
    handleStatus(row) {
      TransportRangeStatus(row.id).then(res => {
        this.firstblood()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
        })
      })
    }
  }

}
</script>

<style type="text/css" lang="scss">
    .TransportRange{
        .info_news{
            .el-table{
                td{
                    .cell{
                        .cargo{
                            display: inline;
                        }
                    }
                }
            }
        }
    }
</style>
