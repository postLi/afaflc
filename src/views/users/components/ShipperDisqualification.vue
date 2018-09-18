<template>
    <div class="identicalStyle">
        <searchInfo @change="getSearchParam" :showType = 'tabType'></searchInfo>
        
        <div class="classify_info">
		    <div class="btns_box">
                <createdDialog btntext="代客认证"
                :params="selectRowData"
                :plain="true" type="primary" 
                btntype="primary" 
                icon="el-icon-news"
                editType="identification" 
                btntitle="代客提交"
                @getData="getDataList">
                </createdDialog>
		    </div>
            <div class="info_news">
                <el-table 
                    ref="multipleTable"
                    :data="tableData1"
                    stripe
                    border
                    height="100%"
                    highlight-current-row
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column label="" width="65">
                        <template slot-scope="scope">
                            <el-radio class="textRadio" @change.native="getCurrentRow(scope.$index,scope.row)" :label="scope.$index" v-model="templateRadio">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="公司名称" >
                        <template slot-scope="scope">
                            <createdDialog :paramsView="scope.row" btntype="text" :btntext="scope.row.companyName" editType="view" btntitle="详情"></createdDialog>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号">
                    </el-table-column>
                    <el-table-column prop="contacts" label="联系人">
                    </el-table-column>
                    <el-table-column prop="registerOrigin" label="注册来源">
                    </el-table-column>
                    <el-table-column prop="shipperStatusName" label="认证状态">
                    </el-table-column>
                    <el-table-column prop="accountStatusName" label="账户状态">
                    </el-table-column>
                    <el-table-column prop="belongCityName" label="所在地">
                    </el-table-column>
                    <el-table-column prop="authenticationTime" label="提交认证日期">
                        <template  slot-scope="scope">
                            <span v-if="scope.row.authenticationTime">{{ scope.row.authenticationTime | parseTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="authNoPassTime" label="审核不通过日期">
                        <template  slot-scope="scope">
                            <span v-if="scope.row.authNoPassTime">{{ scope.row.authNoPassTime | parseTime}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
	     </div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>    
    </div>
</template>
<script>
import createdDialog from './createdDialog.vue'
import searchInfo from './searchInfo'

import { eventBus } from '@/eventBus'
import { parseTime } from '@/utils/index.js'
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
            tabType:'disCertified',
            templateRadio:'',
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
            multipleSelection:[]
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
        getSearchParam(obj) {
            console.log(obj)
            this.searchInfo = Object.assign({},obj,{shipperStatus:'AF0010404'})
            this.loading = false;
            this.firstblood()
        },
        handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
        },
        getCurrentRow(index,row){       
            this.selectRowData = Object.assign({},row);
            this.templateRadio = index;
            console.log('选中内容',row)
        },
        getDataList(){
            this.firstblood();
        },
        handleCurrentChangeRow(val){
            console.log(val)
            this.selectRowData = val
        },
        //刷新页面
        firstblood(){
            data_get_shipper_list(this.page,this.pagesize,this.searchInfo).then(res=>{
                this.totalCount = res.data.totalCount;
                this.tableData1 = res.data.list;
                // this.inited = true
            })
        }
     
    }
}
</script>

