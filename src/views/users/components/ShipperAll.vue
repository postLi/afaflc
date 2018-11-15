<template>
    <div style="height:100%;" class="identicalStyle" v-loading="loading">
        <searchInfo @change="getSearchParam" :showType = 'tabType'></searchInfo>
		<div class="classify_info">
			<div class="btns_box">
                <el-button type="primary" icon="el-icon-circle-plus" plain :size="btnsize" @click="handleClick('add')" v-has:SHIPPER_MANAGE_ADD>新增</el-button>
                <el-button type="primary" icon="fontFamily aflc-icon-dongjie1" plain :size="btnsize" @click="handleClick('pushFreeze')" v-has:SHIPPER_MANAGE_FREEZE>冻结</el-button>
                <el-button type="primary" icon="el-icon-edit" plain :size="btnsize" @click="handleClick('editFreeze')" v-has:SHIPPER_MANAGE_FREEZE_UPDATE>冻结修改</el-button>
                <el-button type="primary" icon="fontFamily aflc-icon-heimingdan" plain :size="btnsize" @click="handleClick('pushBlack')" v-has:SHIPPER_MANAGE_PUT_BLACK>移入黑名单</el-button>
                <el-button type="primary" icon="fontFamily aflc-icon-yichuheimingdan" plain :size="btnsize" @click="handleClick('removeBlack')" v-has:SHIPPER_MANAGE_OUT_BLACK>移出黑名单</el-button>
                <el-button type="primary" icon="fontFamily aflc-icon-jiedong1" plain :size="btnsize" @click="handleClick('removeFreeze')" v-has:SHIPPER_MANAGE_UNFREEZE>解冻</el-button>
			</div>
			<div class="info_news">
				<el-table
				ref="multipleTable"
				:data="tableDataAll"
				stripe
				border
                height="100%"
                @selection-change="getSelection" 
                @row-click="clickDetails"
				tooltip-effect="dark"
				style="width: 100%">
                <el-table-column
                    label="选择"
                    type="selection"
                    width="50">
                </el-table-column>
				<el-table-column label="序号" width="80px">
                    <template slot-scope="scope">
                        {{ (page - 1)*pagesize + scope.$index + 1 }}
                    </template>
				</el-table-column>  
				<el-table-column label="手机号" prop="mobile" sortable>
                    <template slot-scope="scope">
                        <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
                    </template>
				</el-table-column>
				<el-table-column prop="companyName"
                    :show-overflow-tooltip="true" sortable
                    label="公司名称">
				</el-table-column>
				<el-table-column prop="contacts" :show-overflow-tooltip="true" sortable label="联系人">
				</el-table-column>
				<el-table-column prop="registerOriginName" sortable label="注册来源">
				</el-table-column>
				<el-table-column prop="shipperStatusName" sortable label="认证状态">
				</el-table-column>
				<el-table-column prop="accountStatusName" sortable label="账户状态" width="120">
                     <template slot-scope="scope">
                        <span :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}">{{scope.row.accountStatusName}}</span>
                    </template>
				</el-table-column>
				<el-table-column prop="belongCity" 
                    :show-overflow-tooltip="true" sortable
                    label="所在地">
                     <template slot-scope="scope">
                        {{scope.row.belongCityName ? scope.row.belongCityName:scope.row.belongCity}}
                    </template>
				</el-table-column>  
                <el-table-column prop="belongSalesmanName" sortable label="所属业务员">
				</el-table-column>
				<el-table-column prop="shipperTypeName" sortable label="货主类型">
				</el-table-column>
				<el-table-column  label="注册日期" sortable prop="registerTime">
                    <template  slot-scope="scope">
                        <span v-if="scope.row.registerTime">{{ scope.row.registerTime | parseTime}}</span>
                    </template>
				</el-table-column>
				</el-table>
			</div>
		</div>

        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    
        <createdDialog :paramsView="paramsView" :editType="type"  :typetitle="typetitle" :dialogFormVisible_add.sync = "dialogFormVisible_add" @getData="getDataList"/>
        <FreezeDialog :paramsView="selectRowData" :editType="freezetype" :freezetitle="freezetitle"  :freezeDialogFlag.sync = "freezeDialogFlag" @getData="getDataList"/>
        <shipperBlackDialog :paramsView="selectRowData" :editType="blacktype" :blacktitle="blacktitle" :BlackDialogFlag.sync = "BlackDialogFlag" @getData="getDataList"/>
    </div>
</template>

<script>
import { data_get_shipper_list} from '@/api/users/shipper/all_shipper.js'
import createdDialog from './createdDialog.vue'
import FreezeDialog from './FreezeDialog'
import shipperBlackDialog from './shipperBlackDialog'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import searchInfo from './searchInfo'
import { objectMerge2, parseTime } from '@/utils/'

export default {
  components: {
    createdDialog,
    FreezeDialog,
    shipperBlackDialog,
    Pager,
    searchInfo
  },
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
    return {
        loading:true,
        tabType:'All',
        btnsize: 'mini',
        dialogFormVisible_add: false,
        freezeDialogFlag: false,
        BlackDialogFlag: false,
        freezetype: '',//冻结类型
        blacktype: '',//黑名单类型
        type: '',//新增或者修改或者详情
        typetitle:'',//新增或者详情title
        freezetitle:'',//冻结title
        blacktitle:"",//黑名单titl
        paramsView: {},
        searchInfo: {
            belongCity: '',
            shipperStatus: '',
            accountStatus: '',
            companyName: '',
            mobile: '',
        },
        selectRowData: {},//传递的数据
        page: 1,
        pagesize: 20,
        totalCount: 0,
        tableDataAll: [],
        selected:[],//暂存的数据
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
        }
      },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  mounted() {
    eventBus.$on('changeList', () => {
        this.firstblood();
    })
  },
  methods: {
        //点击选中当前行
        clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row);
        },
        // 判断选中与否
        getSelection(val){
            console.log('选中内容',val)
            this.selected = val;
        },
        getSearchParam(obj) {
            console.log(obj)
            this.searchInfo = objectMerge2(this.searchInfo, obj);
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
            }
            this.firstblood();
        },
        pushOrderSerial(row){
            this.type = 'view';
            this.typetitle = '货主详情';
            this.paramsView = objectMerge2({},row);;
            this.dialogFormVisible_add =true;
            this.clearTableSelection();
        },
        handlePageChange(obj) {
            this.page = obj.pageNum;
            this.pagesize = obj.pageSize;
            this.firstblood();
        },
        changeList() {
            eventBus.$emit('changeList')
        },
        clearTableSelection(){
            //清除选中状态，避免影响下个操作
            this.$refs.multipleTable.clearSelection();
        },
        handleClick(type){
            if(this.selected.length == 0 && type != 'add'){
                return this.$message.warning('请选择您要操作的用户');
            }else if (this.selected.length > 1 && type != 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.clearTableSelection();
            }
            else{
                this.selectRowData = this.selected[0];
                switch(type){
                    case 'add' :
                        this.type = "add";
                        this.typetitle = '新增货主';
                        this.paramsView = {};
                        this.dialogFormVisible_add = true;
                        break;
                    case 'pushFreeze':
                        this.freezetype = 'add';
                        if(this.selectRowData.accountStatusName == '冻结中' && this.freezetype == 'add'){
                            return this.$message.warning('您选中的货主已被冻结，不需多次冻结！');
                        }else{
                            this.freezetitle = '冻结';
                            this.freezeDialogFlag = true;
                        }
                        break;
                    case 'editFreeze':
                        this.freezetype = 'edit';
                        if(this.selectRowData.accountStatusName != '冻结中' && this.freezetype == 'edit'){
                            return this.$message.warning('您选中的货主未被冻结，不可做此操作！');
                        }else{
                            this.freezetitle = '冻结修改';
                            this.freezeDialogFlag = true;
                        }
                        break;
                    case 'removeFreeze':
                        this.freezetype = 'remove';
                        if(this.selectRowData.accountStatusName != '冻结中' && this.freezetype == 'remove'){
                            return this.$message.warning('您选中的货主未被冻结，无需移除！');
                        }else{
                            this.freezetitle = '移除冻结';
                            this.freezeDialogFlag = true;
                        }
                        break;
                    case 'pushBlack':
                        this.blacktype = 'add';
                        if(this.selectRowData.accountStatusName == '黑名单' && this.blacktype == 'add'){
                            return this.$message.warning('您选中的货主已被移入黑名单，不需多次拉黑！');
                        }else{
                            this.blacktitle = "移入黑名单";
                            this.BlackDialogFlag = true;
                        }
                        break;
                    case 'removeBlack':
                        this.blacktype = 'edit' ;
                        if(this.selectRowData.accountStatusName != '黑名单' && this.blacktype == 'edit'){
                            return this.$message.warning('您选中的货主未被移入黑名单，不可做此操作！');
                        }else{
                            this.blacktitle = "移出黑名单";
                            this.BlackDialogFlag = true;
                        }
                        break;
                }
                this.clearTableSelection();
            }
        },
        // 刷新页面
        firstblood() {
            this.loading = true;
            data_get_shipper_list(this.page, this.pagesize, this.searchInfo).then(res => {
                // console.log('shipperAll',res)
                this.totalCount = res.data.totalCount
                this.tableDataAll = res.data.list
                // this.inited = false;
                this.loading = false;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                })
                this.loading = false;
            })
        },
        getDataList() {
            this.firstblood();
        }
    }
    }
</script>
<style lang="scss" scoped>
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
