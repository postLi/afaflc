<template>
    <div>
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
                <!-- <el-form-item label="货主类型：">
                    <el-select v-model="formInline.shipperType" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="">
                    <el-button type="primary" plain @click="getdata_search">查询</el-button>
                    <el-button type="info" plain @click="clearSearch">清空</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="classify_info">
		    <div class="btns_box">
                <createdDialog 
                btntext="修改"
                :plain="true"
                type="primary" 
                btntype="primary"
                icon="el-icon-news"
                editType="edit"
                btntitle="修改"
                :params="selectRowData"
                @getData="getDataList"></createdDialog>
		    </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
				    @row-click="clickDetails"
                    stripe
                    border
                    @selection-change="handleSelectionChange"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="80px">
                    </el-table-column>
                    <el-table-column label="公司名称">
                        <template slot-scope="scope">
                        <createdDialog :params="scope.row" btntype="text" :btntext="scope.row.companyName" editType="view" btntitle="详情"></createdDialog>
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
                        prop="registerOriginName"
                        label="注册来源">
                    </el-table-column>
                    <el-table-column prop="shipperStatusName" label="认证状态">
                        <!-- <template slot-scope="scope">
                        {{getAttestationStatus(scope.row.shipperStatus)}}
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="accountStatusName" label="账户状态">
                        <!-- <template slot-scope="scope">
                        {{getAccountStatus(scope.row.accountStatus)}}
                        </template> -->
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
                        prop="authPassTime"
                        label="认证通过日期">
                    </el-table-column>
                </el-table>
                    
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[20, 50, 200, 400]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
	    </div>
    </div>
</template>
<script>
import createdDialog from './createdDialog.vue'
import { eventBus } from '@/eventBus'
// import FreezeDialog from './FreezeDialog.vue'
// import shipperBlackDialog from './shipperBlackDialog'
import {data_get_shipper_list,data_get_shipper_type} from '../../../api/users/shipper/all_shipper.js'
export default {
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components:{
      createdDialog
    //   FreezeDialog,
    //   shipperBlackDialog
    },
    data(){
        return {
            options:[],
            tableData3:[],
            totalCount:null,
            page:1,
            pagesize:20,
            formInline: {
                companyName:'',
                belongCity:'',
                mobile:'',
                shipperStatus:"AF0010403",//已认证的状态码
            },
            multipleSelection:[],
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
        eventBus.$on('changeListtwo', () => {
            if(this.inited || this.isvisible){
                
            this.firstblood()
            }
        })
    },
    methods:{
         //点击选中当前行
        clickDetails(row, event, column){
        this.$refs.multipleTable.toggleRowSelection(row);
        },
        // 选中值判断
        handleSelectionChange(val){
            this.multipleSelection = val;
            if(val[0]){
                this.selectRowData = val[0]
            } else {
                this.selectRowData = {}
            }
        },
        //刷新页面
      firstblood(){
        data_get_shipper_list(this.page,this.pagesize,this.formInline).then(res=>{
          this.totalCount = res.data.totalCount;
          this.tableData3 = res.data.list;
        })
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
       //点击查询按纽，按条件查询列表
      getdata_search(event){
          data_get_shipper_list(this.page,this.pagesize,this.formInline).then(res=>{
            
            this.totalCount = res.data.totalCount;
            this.tableData3 = res.data.list;
            console.log(this.tableData3,res)
          })
      },
      
        //清空
        clearSearch(){
            this.formInline = {
                companyName:'',
                belongCity:'',
                mobile:'',
                shipperStatus:"AF0010403",//已认证的状态码
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


