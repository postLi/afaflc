<template>
    <div style="height:100%;"  class="identicalStyle">
        <div class="shipper_searchinfo">
            <el-form :inline="true">
                <el-form-item label="手机号：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.mobile" clearable></el-input>
                </el-form-item>
                <el-form-item label="公司名称：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.companyName" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系人姓名：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.contacts" clearable></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" plain @click="getdata_search">查询</el-button>
                    <el-button type="info" plain @click="clearSearch">清空</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="classify_info">
		    <div class="btns_box">
                <el-button type="primary" plain @click="handleChange">修改</el-button>
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
                <el-table-column label="" width="60" fixed>
                    <template slot-scope="scope">
                        <el-radio class="textRadio" @change.native="getCurrentRow(scope.$index,scope.row)" :label="scope.$index" v-model="templateRadio">&nbsp;</el-radio>
                    </template>
                </el-table-column>
               <el-table-column label="序号" width="80">
                    <template slot-scope="scope">
                        {{ (page - 1)*pagesize + scope.$index + 1 }}
                    </template>
                </el-table-column>   
				<el-table-column label="手机号(会员账号)" width="150">
                    <template slot-scope="scope">
                        <!-- <createdDialog :paramsView="scope.row" btntype="text" :btntext="scope.row.mobile" editType="view" btntitle="详情"></createdDialog> -->
                        <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
                    </template>
				</el-table-column>
				<el-table-column prop="contactsName" label="注册人姓名" width="150">
				</el-table-column>
				<el-table-column prop="companyName" label="公司名称"  width="300">
				</el-table-column>
				<el-table-column prop="belongCityName" label="所在地"  width="250">
				</el-table-column>
				<el-table-column prop="registerOriginName" label="注册来源"  width="120">
				</el-table-column>
				<el-table-column prop="registerTime" label="注册日期" width="200">
				</el-table-column>
				<el-table-column prop="accountStatusName" label="账户状态" width="120">
                     <template slot-scope="scope">
                        <span :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}">{{scope.row.accountStatusName}}</span>
                    </template>
				</el-table-column>
				<el-table-column prop="authStatusName" label="认证状态" width="120">
				</el-table-column>
                <el-table-column prop="qq" label="QQ号码" width="200">
				</el-table-column>
                <el-table-column prop="otherService" label="会员服务承诺" width="225"  align="left">
                    <template slot-scope="scope" >
                        <div class="otherServiceTD">
                            <span class="otherService" v-for="(item,key) in JSON.parse(scope.row.otherService) " :key="key">
                                {{item}}
                            </span>
                        </div>
                    </template>
				</el-table-column>
                <el-table-column prop="isOpenTms" label="是否开通TMS" width="120">
                    <template slot-scope="scope">
                        <span :class="scope.row.isOpenTms == 1 ? 'isTMS' : 'noTMS'"> {{scope.row.isOpenTms == 1 ? '是' : '否'}}</span>
                    </template>
				</el-table-column>

                </el-table>
            </div>
            <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>    

            <createdDialog :paramsView="paramsView" :editType="type"  :dialogFormVisible_add.sync = "dialogFormVisible_add" @getData="getDataList"/>
	    </div>
    </div>
</template>
<script>
import createdDialog from './createdDialog.vue'
import { eventBus } from '@/eventBus'
import {data_get_shipper_type} from '@/api/users/shipper/all_shipper.js'
import { data_LogisticsCompanyList } from '@/api/users/logistics/LogisticsCompany.js'
import Pager from '@/components/Pagination/index'

export default {
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components:{
        createdDialog,
        Pager
    },
    data(){
        return {
            paramsView:{},
            templateRadio:'',
            options:[],
            tableData3:[],
            totalCount:null,
            page:1,
            pagesize:20,
            formInline: {
                companyName:'',
                belongCity:'',
                mobile:'',
                authStatus:"AF0010403",//已认证的状态码
            },
            selectRowData:{},
            dialogFormVisible_add:false,
            type:'',
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
        handleChange(){
            if(Object.keys(this.selectRowData).length == 0){
                return this.$message({
                    type: 'info',
                    message: '请选择一条记录进行操作'
                })
            }else{
                this.type = 'edit';
                this.paramsView = this.selectRowData;
                this.dialogFormVisible_add =true;
            }
        },
        // 选中值判断
        handleCurrentChangeRow(val){
            console.log(val)
            this.selectRowData = val
        },
        //刷新页面
        firstblood(){
            data_LogisticsCompanyList(this.page,this.pagesize,this.formInline).then(res=>{
                this.totalCount = res.data.totalCount;
                this.tableData3 = res.data.list;
                // this.inited = false;

            })
        },
        pushOrderSerial(row){
            this.type = 'view';
            this.paramsView = row;
            this.dialogFormVisible_add =true;
        },
       //点击查询按纽，按条件查询列表
        getdata_search(event){
            this.firstblood()
        },
      
        //清空
        clearSearch(){
            this.formInline = {
                companyName:'',
                belongCity:'',
                mobile:'',
                authStatus:"AF0010403",//已认证的状态码
            }
            this.firstblood()
        },
      getDataList(){
        this.firstblood()
      }
    }
}
</script>
<style>

</style>


