<template>
    <div style="height:100%;"  class="identicalStyle">
        <div class="shipper_searchinfo">
            <el-form inline>
                <el-form-item label="所在地">
                    <GetCityList v-model="formAll.belongCity" ref="area"></GetCityList>
                </el-form-item>
                <el-form-item label="公司名称">
                    <el-input v-model.trim="formAll.companyName"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input v-model.trim="formAll.mobile"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" plain @click="getdata_search">查询</el-button>
                    <el-button type="info" plain @click="clearSearch">清空</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="classify_info">
		    <!-- <div class="btns_box"> -->
                <!-- <createdDialog btntext="代客认证"
                :params="selectRowData"
                :plain="true" type="primary" 
                btntype="primary" 
                icon="el-icon-news"
                editType="identification" 
                btntitle="代客提交"
                @getData="getDataList">
                </createdDialog> -->
		    <!-- </div> -->
            <div class="info_news" style="height:93.9%">
                <el-table 
                    ref="multipleTable"
                    :data="tableData1"
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
                    <el-table-column label="手机号(会员账号)"  width="150">
                        <template slot-scope="scope">
                            <!-- <createdDialog :paramsView="scope.row" btntype="text" :btntext="scope.row.mobile" editType="view" btntitle="详情"></createdDialog> -->
                            <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column prop="contactsName" label="注册人姓名" width="150">
                    </el-table-column>
                    <el-table-column prop="companyName" label="公司名称" width="300">
                    </el-table-column>
                    <el-table-column prop="belongCityName" label="所在地" width="250">
                    </el-table-column>
                    <el-table-column prop="registerOriginName" label="注册来源" width="120">
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
	     </div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div> 
        <createdDialog :paramsView="paramsView" :editType="type"  :dialogFormVisible_add.sync = "dialogFormVisible_add"/>

    </div>
</template>
<script>
import createdDialog from './createdDialog.vue'
import GetCityList from '@/components/GetCityList'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'

import { data_LogisticsCompanyList } from '@/api/users/logistics/LogisticsCompany.js'

export default {
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components:{
        createdDialog,
        GetCityList,
        Pager
    },
    data(){
        return{
            dialogFormVisible_add:false,
            type:'',
            paramsView:{},
            templateRadio:'',
            tableData1:[],
            totalCount:null,
            page:1,
            pagesize:20,
            options:[],
            formAll:{
                companyName:'',
                belongCity:'',
                mobile:'',
                authStatus:"AF0010404",//未认证的状态码
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
        pushOrderSerial(row){
            this.type = 'view';
            this.paramsView = row;
            this.dialogFormVisible_add =true;
        },
        handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
        },
        // 选中值判断
        getCurrentRow(index,row){       
            this.selectRowData = Object.assign({},row);
            this.templateRadio = index;
            console.log('选中内容',row)
        },
        getDataList(){
            this.firstblood()
        },
        handleCurrentChangeRow(val){
            console.log(val)
            this.selectRowData = val
    },
        //刷新页面
      firstblood(){
        data_LogisticsCompanyList(this.page,this.pagesize,this.formAll).then(res=>{
            this.totalCount = res.data.totalCount;
            this.tableData1 = res.data.list;
            // this.inited = true
        })
      },
         //点击查询按纽，按条件查询列表
      getdata_search(event){
            this.formAll.belongCity = this.$refs.area.selectedOptions.pop();
            this.firstblood()
      },
      
      //清空
      clearSearch(){
        this.formAll = {
            companyName:'',
            belongCity:'',
            mobile:'',
            authStatus:"AF0010404",//未认证的状态码
        },
        this.firstblood()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize=val
        this.firstblood()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page=val
        this.firstblood()
      },
        handleChange(value){
            console.log(value)
        }
    }
}
</script>

