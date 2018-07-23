<template>
    <div style="height:100%;">
        <div class="shipper_searchinfo" >
          <el-form :inline="true">
            <el-form-item label="所在地：">
              <GetCityList v-model="formAll.belongCity" ref="area"></GetCityList>
            </el-form-item>
            <el-form-item label="认证状态：">
              <el-select v-model="formAll.authStatus" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
			<el-form-item label="账户状态：">
              <el-select v-model="formAll.accountStatus" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsAuidSataus"
                  :key="item.code + 'shipperAll' "
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input v-model.trim="formAll.mobile"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="getdata_search">查询</el-button>
                <el-button type="info" plain @click="clearSearch">清空</el-button>
            </el-form-item>
          </el-form>
        </div>
		<div class="classify_info">
            <!-- <v-region  class="form-control" :text = false  :ui = false  ></v-region> -->
			<div class="btns_box">
				<FreezeDialog
				btntext="冻结"
				type="primary" 
				btntitle="冻结"
				:plain="true"
				editType='add'
				freeze = 'freeze'
				btntype="primary"
				icon="el-icon-news"
				:params="selectRowData"
				@getData="getDataList"
				>
				</FreezeDialog>
				<FreezeDialog
				btntext="冻结修改"
				type="primary" 
				btntitle="冻结修改"
				freeze = 'freeze'
				:plain="true"
				editType='edit'
				btntype="primary"
				icon="el-icon-news"
				:params="selectRowData"
				@getData="getDataList"
				>
				</FreezeDialog>
				<shipperBlackDialog
				btntext="移入黑名单"
				type="primary" 
				btntitle="移入黑名单"
				:plain="true"
				editType='add'
				btntype="primary"
				icon="el-icon-news"
				:params="selectRowData"
				@getData="getDataList"
				></shipperBlackDialog>
                <shipperBlackDialog
				btntext="移出黑名单"
				type="primary" 
				btntitle="移出黑名单"
				:plain="true"
				editType='edit'
				btntype="primary"
				icon="el-icon-news"
				:params="selectRowData"
				@getData="getDataList"
				></shipperBlackDialog>
				<FreezeDialog
				btntext="解冻"
				type="primary" 
				btntitle="解冻"
				freeze = 'freeze'
				:plain="true"
				editType='remove'
				btntype="primary"
				icon="el-icon-news"
				:params="selectRowData"
				@getData="getDataList"
				>
				</FreezeDialog>
			</div>
			<div class="info_news">
				<el-table
				ref="multipleTable"
				:data="tableDataAll"
				stripe
				border
                height="100%"
                highlight-current-row
                @current-change="handleCurrentChangeRow"
				tooltip-effect="dark"
				style="width: 100%">
				<el-table-column type='index' label="序号" width="80px">
				</el-table-column>  
				<el-table-column label="手机号(会员账号)" width="250">
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
				<el-table-column prop="registerOriginName" label="注册来源" width="100">
				</el-table-column>
				<el-table-column prop="registerTime" label="注册日期" width="200">
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
                    <template slot-scope="scope">
                        {{scope.row.isOpenTms == 1 ? '是' : '否'}}
                    </template>
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
import {data_get_shipper_freezeType,data_get_shipper_BlackType,data_get_shipper_change,data_get_shipper_status,data_get_shipper_auid} from '@/api/users/shipper/all_shipper.js'
import { data_LogisticsCompanyList } from '../../../api/users/logistics/LogisticsCompany.js'
import createdDialog from './createdDialog.vue'
import GetCityList from '@/components/GetCityList'
import FreezeDialog from './FreezeDialog'
import shipperBlackDialog from './shipperBlackDialog'
import { eventBus } from '@/eventBus'

export default {
  components:{
    createdDialog,
    GetCityList,
    FreezeDialog,
    shipperBlackDialog,
  },
    props: {
		isvisible: {
			type: Boolean,
			default: false
		}
	},
  data(){
      return{
        ul:true,
		freeze:true,//是否冻结
		options:[],
		optionsStatus:[
			{
			code:null,
			name:'全部'
			}
		],
		optionsAuidSataus:[
			{
			code:null,
			name:'全部'
			}
		],
		formAll:{
			belongCity: null,
			authStatus:null,
			accountStatus:null,
			accountName:null,
			mobile:null
		},
		selectRowData:{},
		page:1,
		pagesize:20,
		totalCount:null,
		tableDataAll:[],
		
		}
    },
    created(){

    },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal && !this.inited){
                    this.inited = true;
                    this.firstblood();
                    this.getMoreInformation();
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted(){
        eventBus.$on('changeList', () => {
            console.log('22222222222222222222')
                this.firstblood()
        })
    },
    methods:{
	changeList(){
		eventBus.$emit('changeList')
	},
    // 判断选中与否
    handleCurrentChangeRow(val){
        console.log('选中内容',val)
        this.selectRowData = val;
    },
    
    //刷新页面
    firstblood(){
        data_LogisticsCompanyList(this.page,this.pagesize,this.formAll).then(res=>{
            console.log('shipperAll',res)
            this.totalCount = res.data.totalCount;
            this.tableDataAll = res.data.list;
        }).catch(err=>{
            console.log(err)
        })
    },
    //获取状态列表
    getMoreInformation(){
		//获取状态列表
		data_get_shipper_status().then(res=>{
			console.log('optionsStatus',res)
			res.data.map((item)=>{
				this.optionsStatus.push(item);
			})
		})
		//获取账户状态列表
     	data_get_shipper_auid().then(res=>{
		//   console.log('车主状态：',res)
			res.data.map((item)=>{
				this.optionsAuidSataus.push(item);
			})
      	})
	},
    //点击查询按纽，按条件查询列表
    getdata_search(event) {
        this.formAll.belongCity = this.$refs.area.selectedOptions.pop();

        console.log(this.formAll)
        this.firstblood();
    },
    //清空
    clearSearch(){
        this.$refs.area.selectedOptions = [];
        this.formAll = {
            belongCity: null,
			authStatus:null,
			accountStatus:null,
			accountName:null,
			mobile:null
        },
        this.firstblood();
    },
    handleChange(value){
      console.log(value)
    },

    handleClick (row) {
      console.log('row:',row)
    },

    // 码数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize=val
      this.firstblood()
    },

    // 页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page=val
      this.firstblood()
    },
    getDataList(){
      this.firstblood()
    }
  }
}
</script>
<style lang="scss">
    .removeFreeze,.removeBlcak{
        .shipper_information{
            h2{ 
                margin:10px 0 10px 20px;
            }
        }
        .el-textarea{
            width: 637px;
        }
    }
</style>