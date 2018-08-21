<template>
    <div style="height:100%;"  class="identicalStyle">
        <div class="shipper_searchinfo">
          <el-form :inline="true">
            <el-form-item label="所在地：">
              <GetCityList v-model="formInline.belongCity" ref="area"></GetCityList>
            </el-form-item>
            <el-form-item label="账户状态：">
              <el-select v-model="formInline.accountStatus" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsAuidSataus"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input
                placeholder="请输入内容"
                v-model.trim="formInline.mobile"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="getdata_search">查询</el-button>
              <el-button type="info" plain @click="clearSearch">清空</el-button>
            </el-form-item>
          </el-form>
      </div>
	  	<div class="classify_info">
            <!-- <v-region :town="true" :ui="true" @values="regionChange" class="form-control">
                <button type="button" class="btn btn-default">
                    ｛｛btnText｝｝ <i class="fa fa-fw fa-caret-down"></i>
                </button>
            </v-region> -->
		  	<div class="btns_box">
				<!-- <createdDialog 
				btntext="代客认证"
				:params="selectRowData"
				:plain="true" type="primary" 
				btntype="primary" 
				icon="el-icon-news"
				editType="identification" 
				btntitle="代客提交"
				@getData="getDataList">
				</createdDialog>
                <createdDialog 
				btntext="修改"
				:params="selectRowData"
				:plain="true" type="primary" 
				btntype="primary" 
				icon="el-icon-news"
				editType="edit" 
				btntitle="修改"
				@getData="getDataList">
				</createdDialog> -->
			</div>
			<div class="info_news">
				<el-table
				ref="multipleTable"
				:data="tableData4"
				stripe
				border
                height="100%"
				highlight-current-row
                @current-change="handleCurrentChangeRow"
				tooltip-effect="dark"
				style="width: 100%">
				<el-table-column type='index' label="序号" width="80px">
				</el-table-column>  
				<el-table-column label="手机号(会员账号)">
                    <template slot-scope="scope">
                        <createdDialog :paramsView="scope.row" btntype="text" :btntext="scope.row.mobile" editType="view" btntitle="详情"></createdDialog>
                    </template>
				</el-table-column>
				<el-table-column prop="contactsName" label="注册人姓名">
				</el-table-column>
				<el-table-column prop="companyName" label="公司名称">
				</el-table-column>
				<el-table-column prop="belongCityName" label="所在地">
				</el-table-column>
				<el-table-column prop="registerOriginName" label="注册来源">
				</el-table-column>
				<el-table-column prop="registerTime" label="注册日期">
				</el-table-column>
				<el-table-column prop="accountStatusName" label="账户状态">
				</el-table-column>
				<el-table-column prop="authStatusName" label="认证状态">
				</el-table-column>
                <el-table-column prop="qq" label="QQ号码">
				</el-table-column>
				<el-table-column prop="serviceCommitment" label="会员服务承诺">
				</el-table-column>
                <el-table-column prop="isOpenTms" label="是否开通TMS">
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
import GetCityList from '@/components/GetCityList'
import createdDialog from './createdDialog.vue'
import { eventBus } from '@/eventBus'
import FreezeDialog from './FreezeDialog.vue'
import {parseTime} from '@/utils/'
import {data_get_shipper_list,data_get_shipper_change,data_get_shipper_auid,} from '../../../api/users/shipper/all_shipper.js'
import { data_LogisticsCompanyList } from '../../../api/users/logistics/LogisticsCompany.js'

export default {
	props: {
		isvisible: {
			type: Boolean,
			default: false
		}
	},
    components:{
        createdDialog,
        FreezeDialog,
        GetCityList
    },
  data(){
    return{
        optionsStatus:[], // 状态列表
        tableData4:[],
        totalCount:null,
        page:1,
        pagesize:20,
        formInline: {
            accountStatus:null,
            belongCity:'',
            mobile:'',
            authStatus:"AF0010401",//未认证的状态码
        },
        formLabelWidth:'120px',
        information:null,
        formLabelWidth:'120px',
        changeDialogFlag: false, // 修改弹窗控制
        optionsAuidSataus:[
			{
			code:null,
			name:'全部'
			}
        ],//账户状态
      selectRowData:{},
      pickerOptions:{
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
    }
  },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal && !this.inited){
                    this.inited = true
                    this.firstblood()
                    this.getMoreInformation()
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
        
    },
    mounted(){
        eventBus.$on('changeList', () => {
            // console.log('111111111111111111')
                this.firstblood()
        })
    },
  methods:{
    regionChange(data){
        console.log(data);
    },
    handleCurrentChangeRow(val){
        console.log(val)
        this.selectRowData = val;
    },
    getMoreInformation(){
        //获取账户状态列表
        if(this.optionsAuidSataus.length > 1){
            return
        }else{
            
            data_get_shipper_auid().then(res=>{
             console.log('车主状态：',res)
               res.data.map((item)=>{
                   this.optionsAuidSataus.push(item);
               })
             })
        }
    },
      //点击查询按纽，按条件查询列表
    getdata_search(event){
        this.formInline.belongCity = this.$refs.area.selectedOptions.pop();
        this.firstblood();
    },
    
    //清空
    clearSearch(){
        this.$refs.area.selectedOptions = [];
        this.formInline = {
            accountStatus:null,
            belongCity:'',
            mobile:'',
            authStatus:"AF0010401",//未认证的状态码
        },
	    this.firstblood();
    },
      //刷新页面
    firstblood(){
      data_LogisticsCompanyList(this.page,this.pagesize,this.formInline).then(res=>{
        // console.log('未认证',res)
        this.totalCount = res.data.totalCount;
        this.tableData4 = res.data.list;
        // this.inited = false;
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
    getDataList(){
      this.firstblood()
    },
  }
}
</script>
<style lang="scss">
.export{
  .el-button{
    margin-right:20px;
    padding:10px 20px;
  }
}
.frozeclassify{
  margin-top: 10px;
  .info{
    span{
      margin-left: 60px;
      font-size: 16px;
    }
    .mc-line{
      width: 100%;
      border-bottom: 1px solid #000;
    }
    .frozerol{
      margin: 10px  0 10px 50px;
    }
  }
}
</style>


