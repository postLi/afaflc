<template>
    <div class="identicalStyle" v-loading="loading">
        <searchInfo @change="getSearchParam" :showType = 'tabType'></searchInfo>
        
        <div class="classify_info">
		    <div class="btns_box">
        	    <el-button type="primary" plain icon="el-icon-check" :size="btnsize" @click="handleClick">代客提交</el-button>
		    </div>
            <div class="info_news">
                <el-table 
                    ref="multipleTable"
                    :data="tableData1"
                    stripe
                    border
                    height="100%"
                    tooltip-effect="dark"
                    @selection-change="getSelection" 
                    @row-click="clickDetails"
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
                    <el-table-column label="公司名称" 
                    :show-overflow-tooltip="true"
                     sortable prop="companyName">
                        <template slot-scope="scope">
                            <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.companyName}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号" sortable>
                    </el-table-column>
                    <el-table-column prop="contacts" label="联系人" sortable>
                    </el-table-column>
                    <el-table-column prop="registerOriginName" label="注册来源" sortable>
                    </el-table-column>
                    <el-table-column prop="shipperStatusName" label="认证状态" sortable>
                    </el-table-column>
                    <el-table-column prop="accountStatusName" label="账户状态" sortable>
                        <template slot-scope="scope">
                            <span :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}">{{scope.row.accountStatusName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="belongCityName" 
                    :show-overflow-tooltip="true"
                    label="所在地" sortable>
                    </el-table-column>
                    <el-table-column prop="authenticationTime" label="提交认证日期" sortable>
                        <template  slot-scope="scope">
                            <span v-if="scope.row.authenticationTime">{{ scope.row.authenticationTime | parseTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="authNoPassTime" label="审核不通过日期" sortable>
                        <template  slot-scope="scope">
                            <span v-if="scope.row.authNoPassTime">{{ scope.row.authNoPassTime | parseTime}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
	     </div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    

        <createdDialog :paramsView="paramsView" :typetitle="typetitle" :editType="type"  :dialogFormVisible_add.sync = "dialogFormVisible_add" @getData="getDataList"/>

    </div>
</template>
<script>
import createdDialog from './createdDialog.vue'
import searchInfo from './searchInfo'
import { eventBus } from '@/eventBus'
import { objectMerge2, parseTime } from '@/utils/'

import Pager from '@/components/Pagination/index'
import {data_get_shipper_list} from '@/api/users/shipper/all_shipper.js'
export default {
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components:{
        createdDialog,
        searchInfo,
        Pager
    },
    data(){
        return{
            loading:true,
            dialogFormVisible_add: false,
            type: '',
            paramsView: {},
            typetitle:'',
            btnsize:'mini',
            tabType:'disCertified',
            tableData1:[],
            totalCount:0,
            page:1,
            pagesize:20,
            options:[],
            searchInfo:{
                companyName:'',
                belongCity:'',
                mobile:'',
                shipperStatus:"AF0010404",//未认证的状态码
            },
            selectRowData:{},
            selected:[],//暂存数据
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
            // console.log('6666666666666666')
            this.firstblood()
        })
    },
    methods:{
        //点击选中当前行
        clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row);
        },
         // 判断选中与否
        getSelection(val){
            console.log('选中内容',val)
            this.selected = val;
        },
        pushOrderSerial(row){
            this.type = 'view';
            this.typetitle = '货主详情';
            this.paramsView = objectMerge2({},row);;
            this.dialogFormVisible_add =true;
        },
        handleClick(){
            this.type = "identification";
            this.typetitle = "代客认证";
            this.paramsView = objectMerge2({},this.selected[0]);
            this.dialogFormVisible_add = true;
        },
        getSearchParam(obj) {
            console.log(obj)
            this.searchInfo = objectMerge2({},obj,{shipperStatus:'AF0010404'});
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
            }
            this.firstblood();
        },
        handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
        },
        getDataList(){
            this.firstblood();
        },
        //刷新页面
        firstblood() {
            this.loading = true;
            data_get_shipper_list(this.page, this.pagesize, this.searchInfo).then(res => {
                // console.log('shipperAll',res)
                this.totalCount = res.data.totalCount
                this.tableData1 = res.data.list
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
    }
}
</script>

