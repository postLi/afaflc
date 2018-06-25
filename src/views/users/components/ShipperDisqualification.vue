<template>
    <div>
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
		    <div class="btns_box">
                <createdDialog btntext="代客认证"
                :params="selectRowData"
                :plain="true" type="primary" 
                btntype="primary" 
                icon="el-icon-news"
                editType="edit" 
                btntitle="代客提交"
                @getData="getDataList">
                </createdDialog>
		    </div>
            <div class="info_news">
                <el-table 
                    ref="mutipleTable"
                    :data="tableData1"
                    stripe
                    border
                    :key="theKey4"
                    @selection-change="handleSelectionChange"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column type="selection" width="80px">
                    </el-table-column>
                    <el-table-column label="公司名称">
                        <template slot-scope="scope">
                            <createdDialog :params="scope.row" btntype="text" :btntext="scope.row.companyName" editType="view" btntitle="详情"></createdDialog>
                        </template>
                    </el-table-column>
                    <el-table-column prop="contacts" label="联系人">
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号">
                    </el-table-column>
                    <el-table-column prop="registerOrigin" label="注册来源">
                    </el-table-column>
                    <el-table-column prop="belongCityName" label="所在地">
                    </el-table-column>
                    <el-table-column prop="authenticationTime" label="提交认证日期">
                    </el-table-column>
                    <el-table-column prop="phone" label="审核不通过日期">
                    </el-table-column>
                    <!-- <el-table-column
                        fixed="right"
                        label="操作"
                        width="250">
                        <template slot-scope="scope">
                        <el-button type="text" size="small">代客认证</el-button>
                        </template>
                    </el-table-column> -->
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
import GetCityList from '@/components/GetCityList'
import {data_get_shipper_list} from '../../../api/users/shipper/all_shipper.js'
export default {
    components:{
        createdDialog,
        GetCityList
    },
    data(){
        return{
            theKey4:'1',
            tableData1:[],
            totalCount:null,
            page:1,
            pagesize:20,
            options:[],
            formAll:{
              belongCity:null,
              companyName:'',
              mobile:''
            },
            selectRowData:{},
            multipleSelection:[]
        }
    },
    mounted(){
        this.firstblood()
    },
    methods:{
        getDataList(){
            this.firstblood()
        },
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
        data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
          console.log(res)
          this.totalCount = res.data.totalCount;
          this.tableData1 = res.data.list;
        })
      },
         //点击查询按纽，按条件查询列表
      getdata_search(event){
          this.formAll.belongCity = this.$refs.area.selectedOptions.pop();
          data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
            this.totalCount = res.data.totalCount;
            this.theKey4=Math.random()
            this.tableData1= res.data.list;
          })
      },
      
      //清空
      clearSearch(){
        this.formAll = {
          belongCity:'',
          attestationStatus:'',
          mobile:'',
          companyName:''
        }
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

