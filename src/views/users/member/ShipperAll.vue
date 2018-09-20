<template>
    <div style="height:100%;"  class="identicalStyle">
          <el-form :inline="true" :model="shipperAll" ref="ruleForm" class="classify_searchinfo">
            <el-form-item label="所在地：">
              <!-- <GetCityList v-model="shipperAll.belongCity" ref="area"></GetCityList> -->
                <!-- <vregion :ui="true" @values="regionChange" class="form-control"> -->
                    <el-input v-model="shipperAll.belongCityName" placeholder="请输入"></el-input>
                <!-- </vregion> -->
            </el-form-item>
            <el-form-item label="认证状态：">
              <el-select v-model="shipperAll.authStatus" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
			<el-form-item label="账户状态：">
              <el-select v-model="shipperAll.accountStatus" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsAuidSataus"
                  :key="item.id + 'shipperAll' "
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input v-model.trim="shipperAll.mobile"></el-input>
            </el-form-item>
            <el-form-item class="fr"> 
                <el-button type="primary" plain :size="btnsize"  @click="getdata_search">查询</el-button>
                <el-button type="info" plain :size="btnsize" @click="clearSearch">清空</el-button>
            </el-form-item>
          </el-form>
		<div class="classify_info" >
			<div class="btns_box">
                <el-button type="primary" plain :size="btnsize" @click="handleClick('pushFreeze')">冻结</el-button>
                <el-button type="primary" plain :size="btnsize" @click="handleClick('editFreeze')">冻结修改</el-button>
                <el-button type="primary" plain :size="btnsize" @click="handleClick('pushBlack')">移入黑名单</el-button>
                <el-button type="primary" plain :size="btnsize" @click="handleClick('removeBlack')">移除黑名单</el-button>
                <el-button type="primary" plain :size="btnsize" @click="handleClick('removeFreeze')">解冻</el-button>
			</div>
			<div class="info_news">
				<el-table
				ref="multipleTable"
				:data="tableDataAll"
                :default-sort = "{prop: 'registerTime', order: 'descending'}"
				stripe
				border
                height="100%"
				tooltip-effect="dark"
                @selection-change="getSelection"    
                @row-click="clickDetails"
				style="width: 100%">
                <el-table-column
                    fixed
                    type="selection"
                    width="50">
                </el-table-column>
                <el-table-column label="序号" sortable  width="80">
                    <template slot-scope="scope">
                        {{ (page - 1)*pagesize + scope.$index + 1 }}
                    </template>
                </el-table-column>  
				<el-table-column label="手机号(会员账号)" prop="mobile" width="180" sortable>
                    <template slot-scope="scope">
                        <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
                    </template>
				</el-table-column>
				<el-table-column prop="contactsName" sortable label="注册人姓名" width="150">
				</el-table-column>
				<el-table-column prop="companyName" sortable label="公司名称" :show-overflow-tooltip="true" width="250">
				</el-table-column>
				<el-table-column prop="belongCityName" sortable label="所在地" :show-overflow-tooltip="true" width="200">
				</el-table-column>
				<el-table-column prop="registerOriginName" sortable label="注册来源" width="120">
				</el-table-column>
				<el-table-column prop="registerTime" sortable label="注册日期" width="200">
				</el-table-column>
				<el-table-column prop="accountStatusName" sortable label="账户状态" width="120">
                    <template slot-scope="scope">
                        <span :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}">{{scope.row.accountStatusName}}</span>
                    </template>
				</el-table-column>
				<el-table-column prop="authStatusName" sortable label="认证状态" width="120">
				</el-table-column>
                <el-table-column prop="qq" label="QQ号码" sortable width="120">
				</el-table-column>
                <el-table-column prop="isOpenTms" sortable label="是否开通TMS" >
                    <template slot-scope="scope">
                        <span :class="scope.row.isOpenTms == 1 ? 'isTMS' : 'noTMS'"> {{scope.row.isOpenTms == 1 ? '是' : '否'}}</span>
                    </template>
				</el-table-column>
				</el-table>
			</div>
		</div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>

        <createdDialog :paramsView="paramsView" :editType="type"  :dialogFormVisible_add.sync = "dialogFormVisible_add" @getData="getDataList"/>
        <FreezeDialog :params="selectRowData" :editType="freezetype"  :freezeDialogFlag.sync = "freezeDialogFlag" @getData="getDataList"/>
        <shipperBlackDialog :params="selectRowData" :editType="blacktype"  :BlackDialogFlag.sync = "BlackDialogFlag" @getData="getDataList"/>
    </div>

    
</template>

<script>
import { data_get_shipper_status, data_get_shipper_auid } from '@/api/users/shipper/all_shipper.js'
import { data_LogisticsCompanyList } from '@/api/users/logistics/LogisticsCompany.js'
import createdDialog from './createdDialog.vue'
import GetCityList from '@/components/GetCityList'
import FreezeDialog from './FreezeDialog'
import shipperBlackDialog from './shipperBlackDialog'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import vregion from '@/components/vregion/Region.vue'

export default {
  components: {
    createdDialog,
    GetCityList,
    FreezeDialog,
    shipperBlackDialog,
    Pager,
    vregion
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }
  },
  data() {
    return {
      btnsize: 'mini',
      dialogFormVisible_add: false,
      freezeDialogFlag: false,
      BlackDialogFlag: false,
      freezetype: '',
      blacktype: '',
      type: '',
      paramsView: {},
      templateRadio: '',
      optionsStatus: [
          {
            code: '',
            name: '全部'
          }
        ],
      optionsAuidSataus: [
          {
            code: '',
            name: '全部'
          }
        ],
      shipperAll: {
          belongCity: '',
          belongCityName: '',
          authStatus: '',
          accountStatus: '',
          accountName: '',
          mobile: '',
          isVest: '0'
        },
      selectRowData: {},
      page: 1,
      pagesize: 20,
      totalCount: 0,
      selected: [], // 选中的数据集
      tableDataAll: []

    }
  },
  created() {

  },
  watch: {
    isvisible: {
        handler(newVal, oldVal) {
            if (newVal && !this.inited) {
                this.inited = true
                this.firstblood()
                this.getMoreInformation()
              }
          },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        immediate: true
      }
  },
  mounted() {
    eventBus.$on('changeList', () => {
        console.log('22222222222222222222')
        this.firstblood()
      })
  },
  methods: {
    regionChange(d) {
        console.log('data:', d)
        this.shipperAll.belongCityName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      },
    getValue(obj) {
        return obj ? obj.value : ''
      },
    pushOrderSerial(row) {
        this.type = 'view'
        this.paramsView = Object.assign({}, row)
          this.dialogFormVisible_add = true
            // 清除选中状态，避免影响下个操作
        this.$refs.multipleTable.clearSelection()
      },
    getCurrentRow(index, row) {
        this.selectRowData = Object.assign({}, row)
        this.templateRadio = index
        console.log('选中内容', row)
      },
    changeList() {
        eventBus.$emit('changeList')
      },
        // 判断选中与否
    getSelection(val) {
        console.log('选中内容', val)
        this.selected = val
      },
        // 点击选中当前行
    clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
        // 刷新页面
    firstblood() {
        data_LogisticsCompanyList(this.page, this.pagesize, this.shipperAll).then(res => {
            console.log('shipperAll', res)
            this.totalCount = res.data.totalCount
            this.tableDataAll = res.data.list
          }).catch(err => {
              console.log(err)
            })
      },
        // 获取状态列表
    getMoreInformation() {
            // 获取状态列表
        data_get_shipper_status().then(res => {
            console.log('optionsStatus', res)
            res.data.map((item) => {
                this.optionsStatus.push(item)
              })
          })
            // 获取账户状态列表
        data_get_shipper_auid().then(res => {
            //   console.log('车主状态：',res)
            res.data.map((item) => {
                this.optionsAuidSataus.push(item)
              })
          })
      },
        // 点击查询按纽，按条件查询列表
    getdata_search(event) {
            // this.shipperAll.belongCity = this.$refs.area.selectedOptions.pop();

        console.log(this.shipperAll)
        this.firstblood()
      },
        // 清空
    clearSearch() {
            // this.$refs.area.selectedOptions = [];
        this.shipperAll = {
            belongCity: '',
            belongCityName: '',
            authStatus: '',
            accountStatus: '',
            accountName: '',
            mobile: '',
            isVest: '0'
          },
            this.firstblood()
      },

    handlePageChange(obj) {
        this.page = obj.pageNum
        this.pagesize = obj.pageSize
        this.firstblood()
      },
    getDataList() {
        this.firstblood()
      },
    handleClick(type) {
            // console.log(this.chooseTime)
        if (this.selected.length == 0) {
            return this.$message.info('请选择您要操作的用户')
          } else if (this.selected.length > 1) {
              this.$message({
                message: '每次只能操作单条数据~',
                type: 'warning'
              })
            } else {
              this.selectRowData = this.selected[0]
              switch (type) {
                  case 'pushFreeze':
                    this.freezetype = 'add'
                    if (this.selectRowData.accountStatusName == '冻结中' && this.freezetype == 'add') {
                          return this.$message.info('您选中的货主已被冻结，不需多次冻结！')
                        } else {
                          this.freezeDialogFlag = true
                        }
                    break
                  case 'editFreeze':
                    this.freezetype = 'edit'
                    if (this.selectRowData.accountStatusName != '冻结中' && this.freezetype == 'edit') {
                          return this.$message.info('您选中的货主未被冻结，不可做此操作！')
                        } else {
                          this.freezeDialogFlag = true
                        }
                    break
                  case 'removeFreeze':
                    this.freezetype = 'remove'
                    if (this.selectRowData.accountStatusName != '冻结中' && this.freezetype == 'remove') {
                          return this.$message.info('您选中的货主未被冻结，无需移除！')
                        } else {
                          this.freezeDialogFlag = true
                        }
                    break
                  case 'pushBlack':
                    this.blacktype = 'add'
                    if (this.selectRowData.accountStatusName == '黑名单' && this.blacktype == 'add') {
                          return this.$message.info('您选中的货主已被移入黑名单，不需多次拉黑！')
                        } else {
                          this.BlackDialogFlag = true
                        }
                    break
                  case 'removeBlack':
                    this.blacktype = 'edit'
                    if (this.selectRowData.accountStatusName != '黑名单' && this.blacktype == 'edit') {
                          return this.$message.info('您选中的货主未被移入黑名单，不可做此操作！')
                        } else {
                          this.BlackDialogFlag = true
                        }
                    break
                }
                 // 清除选中状态，避免影响下个操作
              this.$refs.multipleTable.clearSelection()
            }
      }
  }
}
</script>
<style lang="scss">
    .removeFreeze,.removeBlcak{
        .shipper_information{
            h2{ 
                margin:10px 0 10px 20px;
            }
        }
        .el-textarea{
            width: 637px;
        }
    }

    
</style>
