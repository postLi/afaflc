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
		  	<!-- <div class="btns_box"> -->
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
			<!-- </div> -->
			<div class="info_news" style="height:93.9%">
				<el-table
				ref="multipleTable"
				:data="tableData4"
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
                        <div class="otherServiceTD" v-if="scope.row.otherService != ''">
                            <span class="otherService" v-for="(item,key) in JSON.parse(scope.row.otherService) " :key="key">
                                {{item}}
                            </span>
                        </div>
                        <div v-else>
                            未填写
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
        <createdDialog :paramsView="paramsView" :editType="type"  :dialogFormVisible_add.sync = "dialogFormVisible_add" @getData="getDataList"/>

    </div>
</template>
<script>
import GetCityList from '@/components/GetCityList'
import createdDialog from './createdDialog.vue'
import { eventBus } from '@/eventBus'
import FreezeDialog from './FreezeDialog.vue'
import {data_get_shipper_list,data_get_shipper_change,data_get_shipper_auid,} from '@/api/users/shipper/all_shipper.js'
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
        FreezeDialog,
        GetCityList,
        Pager
    },
  data(){
    return{
        dialogFormVisible_add:false,
        type:'',
        paramsView:{},
        templateRadio:'',
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
        pushOrderSerial(row){
            this.type = 'view';
            this.paramsView = row;
            this.dialogFormVisible_add =true;
        },
        getCurrentRow(index,row){       
            this.selectRowData = Object.assign({},row);
            this.templateRadio = index;
            console.log('选中内容',row)
        },
        handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
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


