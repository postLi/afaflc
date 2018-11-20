<template>
  <div class="identicalStyle Marketing" style="height:100%">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="所在地">
        <GetCityList ref="area" v-model="searchQuery.belongCityName" @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input clearable></el-input>
      </el-form-item>
      <el-form-item label="园区名称">
        <el-input clearable placeholder="请输入物流园区名称"></el-input>
      </el-form-item>
      <el-form-item label="客户管理应用">

        <el-select v-model="searchQuery.verifyStatus" clearable>
          <el-option label="已开放" :value="0"></el-option>
          <el-option label="未开放" :value="1"></el-option>
          <el-option label="全部" value=""></el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="状  态">
        <el-select v-model="searchQuery.verifyStatus1" clearable>
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
          <el-table-column sortable prop="belongCity" label="物流园区" width="">
          </el-table-column>
          <el-table-column sortable prop="belongCity" label="联系人" width="">
          </el-table-column>
          <el-table-column sortable prop="belongCity" label="手机号" width="">
          </el-table-column>
          <el-table-column sortable prop="belongCity" label="所在地" width="">
          </el-table-column>
          <el-table-column sortable prop="belongCity" label="创建时间" width="">
          </el-table-column>
          <el-table-column sortable prop="belongCity" label="状态" width="">
          </el-table-column>
          <el-table-column sortable prop="belongCity" label="客户管理应用" width="">
          </el-table-column>
          <el-table-column sortable prop="belongCity" label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                style="color: #f56c6c"
                type="text" icon=""
                size="small"
                @click="handleDeatail(scope.row)">
                <span style="border-bottom: 1px solid #f56c6c">详情</span>
              </el-button>
              <el-button
                style="color: #f56c6c"
                type="text" icon=""
                size="small"
                @click="handleFn(scope.row)">
                <span style="border-bottom: 1px solid #f56c6c">禁用</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <AddGarden :isVisibleDialog.sync="isVisibleDialog" :isModify="isModify"></AddGarden>
      <div class="info_tab_footer">共计:{{ dataTotal }}
        <div class="show_pager">
          <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
        isVisibleDialog: false,
        isModify: false,
        sizes: [20, 50, 100],
        pagesize: 20, // 初始化加载数量
        page: 1, // 初始化页码
        totalCount: null,
        dataTotal: 0,
        dataset: [],
        selected: [],
        searchQuery: {
          belongCityName: '',
          belongCity: '',
          verifyStatus: '',
          verifyStatus1: '',
        }
      }
    },
    mounted() {

    },
    methods: {
      getStr(val) {
        this.searchQuery.belongCity = val.area.code
        this.searchQuery.belongCityName = val.area.name
        console.log('this.cityarr', val, val.area, val.area.code, val.area.name)
      },
      handleSearch(type) {
        switch (type) {
          case 'searchForm':
            break
          case 'clearForm':
            break
          case 'add':
            this.isVisibleDialog = true
            break
        }

      },
      handleDeatail(row) {
        console.log(row);
      },
      handleFn(row) {
        console.log(row);
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
    }
  }
</script>
<style lang="scss">
  .Marketing {
    .el-cascader {
      margin-top: -10px;
    }
  }
</style>
