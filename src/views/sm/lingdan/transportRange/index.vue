<template>
    <div class="TransportRange identicalStyle"  v-loading="loading">
        <el-form :inline="true" :model="logisticsForm" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <div class="searchInformation information">
                <el-form-item label="出发地：" prop="startLocation">
                    <el-input v-model="logisticsForm.startLocation" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="到达地：" prop="endLocation">
                    <el-input v-model="logisticsForm.endLocation" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item class="btnChoose fr" style="margin-left:20px;">
                    <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch">搜索</el-button>
                    <el-button type="info" icon="fontFamily aflc-icon-qingkong" plain :size="btnsize" @click="clearSearch">清空</el-button>
                </el-form-item>
            </div>
        </el-form>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain icon="el-icon-circle-plus" :size="btnsize" @click="handleClick('new')">发布专线</el-button>  
                    <el-button type="primary" plain icon="el-icon-edit" :size="btnsize" @click="handleClick('revise')">修改专线</el-button>  
                    <el-button type="primary" plain icon="el-icon-delete" :size="btnsize" @click="handleClick('delet')">删除专线</el-button>  
                    <el-button type="primary" plain icon="el-icon-bell" :size="btnsize" @click="handleClick('status')">启用/禁用</el-button>  
                </div>
                <div class="info_news">
                    <el-table
                    :data="tableData"
                    ref="multipleTable"                
                    @selection-change="getSelection" 
                    @row-click="clickDetails"
                    stripe
                    border
                    height="100%"
                    style="width: 100%">
                    <el-table-column
                        label="选择"
                        type="selection"
                        width="50">
                    </el-table-column>
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
                               <h4 class="moreInfo" @click="handleInfo(scope.row)">{{scope.row.startLocation}}</h4>
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
                                    <span v-if="idx == 0">{{item.endVolume}}公斤以下,{{item.primeryPrice}}元/公斤</span>
                                    <span v-else-if="idx == scope.row.weightcargo.length-1 &&  item.endVolume == ''">{{item.startVolume}}公斤以上,{{item.primeryPrice}}元/公斤</span>
                                    <span v-else>{{item.startVolume}}-{{item.endVolume}}公斤,{{item.primeryPrice}}元/公斤</span>
                                </p>
                            </template>
                        </el-table-column>
                         <el-table-column
                            sortable
                            prop="weightcargoDotted"
                            :show-overflow-tooltip="true"
                            label="重泡货（重货）" 
                            width="220">
                            <template slot-scope="scope">
                                <p v-if="scope.row.weightcargoDotted.length == 0">
                                    <span class="interview">面谈</span>
                                </p>
                                <p class="cargo" v-for="(item,idx) in scope.row.weightcargoDotted" :key="item.id" v-else>
                                    <span v-if="idx == 0">{{item.endVolume}}公斤以下,{{item.primeryPrice}}元/公斤</span>
                                    <span v-else-if="idx == scope.row.weightcargoDotted.length-1 &&  item.endVolume == ''">{{item.startVolume}}公斤以上,{{item.primeryPrice}}元/公斤</span>
                                    <span v-else>{{item.startVolume}}-{{item.endVolume}}公斤,{{item.primeryPrice}}元/公斤</span>
                                </p>
                            </template>
                        </el-table-column>
                         <el-table-column
                            sortable
                            prop="lightcargoDotted"
                            :show-overflow-tooltip="true"
                            label="重泡货（轻货）" 
                            width="220">
                            <template slot-scope="scope">
                                <p v-if="scope.row.lightcargoDotted.length == 0">
                                    <span class="interview">面谈</span>
                                </p>
                                <p class="cargo" v-for="(item,idx) in scope.row.lightcargoDotted" :key="item.id" v-else>
                                    <span v-if="idx == 0">{{item.endVolume}}公斤以下,{{item.primeryPrice}}元/公斤</span>
                                    <span v-else-if="idx == scope.row.lightcargoDotted.length-1 &&  item.endVolume == ''">{{item.startVolume}}公斤以上,{{item.primeryPrice}}元/公斤</span>
                                    <span v-else>{{item.startVolume}}-{{item.endVolume}}公斤,{{item.primeryPrice}}元/公斤</span>
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
                                    <span v-if="idx == 0">{{item.endVolume}}立方以下,{{item.primeryPrice}}元/立方</span>
                                    <span v-else-if="idx == scope.row.lightcargo.length-1 && item.endVolume == ''">{{item.startVolume}}立方以上,{{item.primeryPrice}}元/立方</span>
                                    <span v-else>{{item.startVolume}}-{{item.endVolume}}立方,{{item.primeryPrice}}元/立方</span>
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
                            width="210"
                            >
                                <template slot-scope="scope">
                                    <el-button-group>
                                        <el-button @click="handleEdit(scope.row)" type="primary" plain size="mini">修改</el-button>
                                        <el-button @click="handleDelete(scope.row)" type="primary" plain size="mini">删除</el-button>
                                        <el-button @click="handleStatus(scope.row)" plain :type="scope.row.rangeStatus == 0 ? 'primary' : 'info'" size="mini">{{scope.row.rangeStatus == 0 ? '启用' : '禁用'}}</el-button>
                                    </el-button-group>
                                </template>
                        </el-table-column> -->
                    </el-table>
                </div>
            </div>  
            <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange"  ref="pager"/></div> </div>    
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
      tableData: [],
      selected:[],
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
          el.weightcargoDotted = []
          el.lightcargoDotted = []
          el.rangePrices.forEach(item => {
            switch (item.type) {
              case '0':
                el.lightcargo.push(item)
                break
              case '1':
                el.weightcargo.push(item)
                break
            case '2':
                el.lightcargoDotted.push(item)
                break
            case '3':
                el.weightcargoDotted.push(item)
                break
            }
          })
          el.lightcargo.sort(function(a, b) {
            return a.startVolume - b.startVolume
          })
          el.weightcargo.sort(function(a, b) {
            return a.startVolume - b.startVolume
          })
           el.lightcargoDotted.sort(function(a, b) {
            return a.startVolume - b.startVolume
          })
           el.weightcargoDotted.sort(function(a, b) {
            return a.startVolume - b.startVolume
          })
        })
        this.loading = false
        console.log(this.tableData)
      })
    },
    // 判断选中与否
    getSelection(val){
        console.log('选中内容',val)
        this.selected = val;
    },
    //点击选中当前行
    clickDetails(row, event, column){
        this.$refs.multipleTable.toggleRowSelection(row);
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      console.log('this.page',this.$refs.pager.inputval)
      this.firstblood();
    },
    clearSearch() {
      this.$refs.ruleForm.resetFields();
      if(this.page!= 1){
          this.page = 1;
          this.$refs.pager.inputval = this.page;
      }
      this.firstblood()
    },
        // 搜索
    handleSearch() {
        this.firstblood()
    },
    handleClick(type){
        if(this.selected.length == 0 && type != 'new'){
            return this.$message.warning('请选择您要操作的专线');
        }else if (this.selected.length > 1 && type != 'new') {
            this.$message({
                message: '为防止您操作出错，限制只能操作一条专线~',
                type: 'warning'
            })
            this.clearTableSelection();
        }else{
            let row = this.selected[0];
            switch(type){
                case 'new':
                    this.$router.push({ name: '发布专线' })
                    break;
                case 'revise':
                    this.$router.push({ name: '发布物流专线', query: { data: row, ifrevise: '1' }})
                    break;
                case 'delet':
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
                    break;
                case 'status':
                        TransportRangeStatus(row.id).then(res => {
                            this.firstblood()
                        }).catch(err => {
                            this.$message({
                            type: 'warning',
                            message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                            })
                        })
                    break;
            }
            this.clearTableSelection();
        }
    },
    clearTableSelection(){
        //清除选中状态，避免影响下个操作
        this.$refs.multipleTable.clearSelection();
    },
        // 查看详情
    handleInfo(row) {
      this.$router.push({ name: '发布物流专线', query: { data: row, ifrevise: '2' }})
    },
        // 新增专线
    handleNew() {
      this.$router.push({ name: '发布专线' })
    },
        // 修改
    handleEdit(row) {
      this.$router.push({ name: '发布物流专线', query: { data: row, ifrevise: '1' }})
    },
        // 删除专线
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
                            margin-right: 10px;
                        }
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
