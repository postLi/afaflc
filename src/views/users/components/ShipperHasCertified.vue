<template>
    <div class="identicalStyle">
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
                    highlight-current-row
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column label="" width="65">
                        <template slot-scope="scope">
                            <el-radio class="textRadio" @change.native="getCurrentRow(scope.$index,scope.row)" :label="scope.$index" v-model="templateRadio">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" width="80px">
                        <template slot-scope="scope">
                            {{ (page - 1)*pagesize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column  label="公司名称" prop="companyName">
                        <template slot-scope="scope">
                            <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.companyName}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="手机号"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="contacts"
                        label="联系人">
                    </el-table-column>
                    <el-table-column
                        prop="registerOrigin"
                        label="注册来源">
                    </el-table-column>
                    <el-table-column prop="shipperStatusName" label="认证状态">
                    </el-table-column>
                    <el-table-column prop="accountStatusName" label="账户状态">
                    </el-table-column>
                    <el-table-column
                        prop="belongCityName"
                        label="所在地">
                    </el-table-column>
                    <el-table-column
                        prop="shipperTypeName"
                        label="货主类型">
                    </el-table-column>
                    <el-table-column
                        label="认证通过日期">
                        <template  slot-scope="scope">
                            <span v-if="scope.row.authPassTime">{{ scope.row.authPassTime | parseTime}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
	    </div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>    
        <createdDialog :paramsView="paramsView" :typetitle="typetitle" :editType="type"  :dialogFormVisible_add.sync = "dialogFormVisible_add"/>

    </div>
</template>
<script>
import createdDialog from './createdDialog.vue'
import { eventBus } from '@/eventBus'
import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import {data_get_shipper_list,data_get_shipper_type} from '@/api/users/shipper/all_shipper.js'
import searchInfo from './searchInfo'

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
            tabType:'hasCertified',
            btnsize: 'mini',
            dialogFormVisible_add: false,
            type: '',
            paramsView: {},
            typetitle:'',
            templateRadio:'',
            options:[],
            tableData3:[],
            totalCount:0,
            page:1,
            pagesize:20,
            searchInfo: {
                companyName:'',
                belongCity:'',
                mobile:'',
                shipperStatus:"AF0010403",//已认证的状态码
            },
            selectRowData:{}
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
            this.paramsView = Object.assign({},row);;
            this.dialogFormVisible_add =true;
        },
        getSearchParam(obj) {
            console.log(obj)
            this.searchInfo = Object.assign({},obj,{shipperStatus:'AF0010403'})
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
        handleClick(type){
            switch(type){
                case 'edit' :
                    this.type = "edit";
                    this.typetitle = "修改货主";
                    this.paramsView = this.selectRowData;
                    this.dialogFormVisible_add = true;
                    break;
            }
        },
        // 选中值判断
        handleCurrentChangeRow(val){
            console.log(val)
            this.selectRowData = val
        },
        //刷新页面
        firstblood(){
            data_get_shipper_list(this.page,this.pagesize,this.searchInfo).then(res=>{
                this.totalCount = res.data.totalCount;
                this.tableData3 = res.data.list;
                // this.inited = false;

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


