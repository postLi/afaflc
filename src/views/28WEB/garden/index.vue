<template>
  <div class="identicalStyle Marketing garden" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="所在地">
        <GetCityList ref="area" v-model="searchQuery.locationProvince" @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input clearable v-model="searchQuery.parkMobile"></el-input>
      </el-form-item>
      <el-form-item label="园区名称">
        <el-input v-model="searchQuery.parkName" clearable placeholder="请输入物流园区名称"></el-input>
      </el-form-item>
      <el-form-item label="客户管理应用">

        <el-select v-model="searchQuery.openStatus" clearable>
          <el-option label="已开放" :value="1"></el-option>
          <el-option label="未开放" :value="0"></el-option>
          <el-option label="全部" value=""></el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="状  态">
        <el-select v-model="searchQuery.disableStatus" clearable>
          <el-option label="启用" :value="0"></el-option>
          <el-option label="禁用" :value="1"></el-option>
          <el-option label="全部" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="btnChoose fr">
        <el-button type="primary" size="mini" plain @click="handleSearch('searchForm')" icon="el-icon-search">搜索
        </el-button>
        <el-button type="info" size="mini" plain @click="handleSearch('clearForm')"
                   icon="fontFamily aflc-icon-qingkong">清空
        </el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box">
        <el-button type="primary" size="mini" class="el-icon-circle-plus" plain @click="handleSearch('add')">新增
        </el-button>
      </div>
      <div class="info_news">
        <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection"
                  @row-click="clickDetails" highlight-current-row :data="dataset" tooltip-effect="dark">
          <el-table-column fixed label="序号" sortable width="80">
            <template slot-scope="scope">
              {{ (page - 1)*pagesize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column sortable prop="parkName" label="物流园区" width="">
          </el-table-column>
          <el-table-column sortable prop="parkContact" label="联系人" width="">
          </el-table-column>
          <el-table-column sortable prop="parkMobile" label="手机号" width="">
          </el-table-column>
          <el-table-column sortable prop="" label="所在地" width="">
            <template slot-scope="scope">
              <span>{{scope.row.locationProvince+scope.row.locationCity+scope.row.locationArea}}</span>
            </template>
          </el-table-column>
          <el-table-column sortable prop="createTime" label="创建时间" width="">
          </el-table-column>
          <el-table-column sortable prop="belongCity" label="状态" width="">
            <template slot-scope="scope">
              <span>{{scope.row.openStatus ===1?'已开放':'未开放'}}</span>
            </template>
          </el-table-column>
          <el-table-column sortable prop="belongCity" label="客户管理应用" width="">
            <template slot-scope="scope">
              <span>{{scope.row.disableStatus ===1?'禁用':'启用'}}</span>
            </template>
          </el-table-column>
          <el-table-column sortable prop="belongCity" label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                type="text" icon=""
                size="small"
                @click="handleDeatail(scope.row)">
                <span>详情</span>
              </el-button>
              <el-button
                type="text" icon=""
                size="small"
                @click="handleFn(scope.row)">
                <span >{{scope.row.disableStatus ===1?'启用':'禁用'}}</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <AddGarden :isVisibleDialog.sync="isVisibleDialog" :isModify="isModify" :info="selectedInfo" @success='fetchInfo'
                 @close="closeVisibleDialog"></AddGarden>
      <div class="info_tab_footer">共计:{{ dataTotal }}
        <div class="show_pager">
          <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {postList, putUpdateDisableStatus} from '@/api/web/garden'
  import GetCityList from '@/components/GetCityList/city'
  import Pager from '@/components/Pagination/index'
  import AddGarden from './addGarden'

  export default {
    components: {
      GetCityList,
      AddGarden,
      Pager
    },
    data() {
      return {
        loading: true,
        isVisibleDialog: false,
        isModify: false,
        sizes: [20, 50, 100],
        pagesize: 20, // 初始化加载数量
        page: 1, // 初始化页码
        totalCount: null,
        dataTotal: 0,
        dataset: [],
        selected: [],
        selectedInfo: {},
        searchQuery: {
          locationProvince: '',
          locationCity: '',
          locationArea: '',
          parkName: '',
          openStatus: '',
          parkMobile: '',
          disableStatus: '',
        }
      }
    },
    mounted() {
      this.fetchList()
    },
    methods: {
      fetchList() {
        this.loading = true
        postList(this.page, this.pagesize, this.searchQuery).then(res => {
          this.dataset = res.data.list
          this.dataTotal = res.data.total;
          this.loading = false
          // console.log(res)
        }).catch(err => {
          this.$message.warning(err.text || err.errorInfo || '无法获取服务端数据~')
          this.loading = false;
        })
      },
      fetchInfo() {
        this.fetchList()
      },
      getStr(val) {
        this.searchQuery.locationProvince = val.province.name
        this.searchQuery.locationCity = val.city.name
        this.searchQuery.locationArea = val.area.name
        // console.log('this.cityarr', val, val.area, val.area.code, val.area.name)
      },
      handleSearch(type) {
        switch (type) {
          case 'searchForm':
            this.fetchInfo()
            break
          case 'clearForm':
            this.searchQuery = {
              locationProvince: '',
              locationCity: '',
              locationArea: '',
              parkName: '',
              openStatus: '',
              parkMobile: '',
              disableStatus: '',
            }
            this.$refs.area.clearData()
            this.fetchInfo()
            break
          case 'add':
            this.isVisibleDialog = true
            this.isModify = false
            this.selectedInfo = {}
            break
        }

      },
      handleDeatail(row) {
        this.isVisibleDialog = true
        this.isModify = true
        this.selectedInfo = row
        console.log(row);
      },
      handleFn(row) {
        putUpdateDisableStatus(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功~'
          });
          this.fetchInfo()
          this.loading = false
        }).catch(err => {
          this.$message.warning(err.text || err.errorInfo || '无法获取服务端数据~')
          this.loading = false;
        })
      },
      getSelection(selected) {
        this.selected = selected
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      handlePageChange(obj) {
        this.page = obj.pageNum
        this.pagesize = obj.pageSize
        // this.firstblood()
      },
      closeVisibleDialog() {
        this.isVisibleDialog = false
      }
    }
  }
</script>
<style lang="scss">
  .garden {
    .el-cascader {
      margin-top: -10px;
    }
  }
</style>
