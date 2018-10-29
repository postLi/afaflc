<template>
    <div class="identicalStyle" v-loading="loading">
        <searchInfo @change="getSearchParam" :showType = 'tabType'></searchInfo>
        
        <div class="classify_info">
		    <div class="btns_box">
                <el-button type="primary" icon="el-icon-edit-outline" plain :size="btnsize" @click="handleClick('edit')">修改</el-button>
		    </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    stripe
                    border
                    height="100%"
                    @selection-change="getSelection" 
                    @row-click="clickDetails"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>
                    <el-table-column label="序号" width="80px">
                        <template slot-scope="scope">
                            {{ (page - 1)*pagesize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column  label="公司名称" 
                    :show-overflow-tooltip="true" sortable
                     prop="companyName">
                        <template slot-scope="scope">
                            <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.companyName}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        sortable
                        label="手机号"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="contacts"
                        sortable
                        label="联系人">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="registerOriginName"
                        label="注册来源">
                    </el-table-column>
                    <el-table-column prop="shipperStatusName" sortable label="认证状态">
                    </el-table-column>
                    <el-table-column prop="accountStatusName" sortable label="账户状态">
                        <template slot-scope="scope">
                            <span :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}">{{scope.row.accountStatusName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        :show-overflow-tooltip="true" 
                        prop="belongCityName"
                        label="所在地">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="shipperTypeName"
                        label="货主类型">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="authPassTime"
                        label="认证通过日期">
                        <template  slot-scope="scope">
                            <span v-if="scope.row.authPassTime">{{ scope.row.authPassTime | parseTime}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
	    </div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    
        <createdDialog :paramsView="paramsView" :typetitle="typetitle" :editType="type"  :dialogFormVisible_add.sync = "dialogFormVisible_add"/>

    </div>
</template>
<script>
import createdDialog from './createdDialog.vue'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import {data_get_shipper_list,data_get_shipper_type} from '@/api/users/shipper/all_shipper.js'
import searchInfo from './searchInfo'
import { objectMerge2, parseTime } from '@/utils/'

export default {
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components:{
      createdDialog,
      Pager,
      searchInfo

    },
    data(){
        return {
            loading:true,
            tabType:'hasCertified',
            btnsize: 'mini',
            dialogFormVisible_add: false,
            type: '',
            paramsView: {},
            typetitle:'',
            options:[],
            tableData3:[],
            totalCount:0,
            selected:[],//暂存数据
            page:1,
            pagesize:20,
            searchInfo: {
                companyName:'',
                belongCity:'',
                mobile:'',
                shipperStatus:"AF0010403",//已认证的状态码
            },
        }
    },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal && !this.inited){
                    this.inited = true
                    this.firstblood()
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted(){
        eventBus.$on('changeList', () => {
            // console.log('55555555555555')
                this.firstblood()
        })
    },
    methods:{
        pushOrderSerial(row){
            this.type = 'view';
            this.typetitle = '货主详情';
            this.paramsView = objectMerge2({},row);;
            this.dialogFormVisible_add =true;
        },
        getSearchParam(obj) {
            console.log(obj)
            this.searchInfo = objectMerge2({},obj,{shipperStatus:'AF0010403'});
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
            }
            this.firstblood();
        },
        //点击选中当前行
        clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row);
        },
        // 判断选中与否
        getSelection(val){
            console.log('选中内容',val)
            this.selected = val;
        },
        handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
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
            }else{
                switch(type){
                    case 'edit' :
                        this.type = "edit";
                        this.typetitle = "修改货主";
                        this.paramsView = objectMerge2({},this.selected[0]);
                        this.dialogFormVisible_add = true;
                        break;
                }
                this.clearTableSelection();
            }
        },
        //刷新页面
        firstblood() {
            this.loading = true;
            data_get_shipper_list(this.page, this.pagesize, this.searchInfo).then(res => {
                // console.log('shipperAll',res)
                this.totalCount = res.data.totalCount
                this.tableData3 = res.data.list
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

        getDataList(){
            this.firstblood()
        }
    }
}
</script>
<style>

</style>


