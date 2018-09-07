<template>
    <div style="height:100%;" class="identicalStyle">
          <el-form :model="formAll" ref="ruleForm" class="classify_searchinfo">
            <el-form-item label="所在地：">
                <GetCityList v-model="formAll.belongCity" ref="area"></GetCityList>
            </el-form-item>
            <el-form-item label="认证状态：">
                <el-select v-model="formAll.shipperStatus" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsStatus"
                    :key="item.id"
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
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                    :disabled="item.disabled">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公司名称:">
                <el-input v-model.trim="formAll.companyName"></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input v-model.trim="formAll.mobile"></el-input>
            </el-form-item>
            <el-form-item class="fr">
                <el-button type="primary" plain @click="getdata_search">查询</el-button>
                <el-button type="info" plain @click="clearSearch">清空</el-button>
            </el-form-item>
        </el-form>
		<div class="classify_info">
			<div class="btns_box">
				<createdDialog btntext="新增" :plain="true" type="primary" btntype="primary" icon="el-icon-circle-plus" editType="add" btntitle="新增货主" @getData="getDataList"></createdDialog>
				<FreezeDialog
				btntext="冻结"
				type="primary" 
				btntitle="冻结"
				:plain="true"
				editType='add'
				freeze = 'freeze'
				btntype="warning"
				icon="el-icon-info"
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
				btntype="warning"
				icon="el-icon-edit"
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
				btntype="info"
				icon="el-icon-warning"
				:params="selectRowData"
				@getData="getDataList"
				></shipperBlackDialog>
                <shipperBlackDialog
				btntext="移出黑名单"
				type="primary" 
				btntitle="移出黑名单"
				:plain="true"
				editType='edit'
				btntype="info"
				icon="el-icon-success"
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
				btntype="success"
				icon="el-icon-success"
				:params="selectRowData"
				@getData="getDataList"
				>
				</FreezeDialog>
			</div>
			<div class="info_news" >
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
				<el-table-column label="手机号">
                    <template slot-scope="scope">
                        <createdDialog :paramsView="scope.row" btntype="text" :btntext="scope.row.mobile" editType="view" btntitle="详情"></createdDialog>
                            <!-- <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4> -->
                    </template>
				</el-table-column>
				<el-table-column prop="companyName" label="公司名称">
					
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
				<el-table-column prop="shipperTypeName" label="货主类型">
				</el-table-column>
				<el-table-column  label="注册日期">
                    <template  slot-scope="scope">
                       <span v-if="scope.row.registerTime">{{ scope.row.registerTime | parseTime}}</span>
                    </template>
				</el-table-column>
				</el-table>
			</div>
		</div>

        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>    
        <!-- <createdDialog :paramsView="paramsView" :editType="type"  :dialogFormVisible_add.sync = "dialogFormVisible_add" @getData="getDataList"/>
        <FreezeDialog :params="selectRowData" :editType="freezetype"  :freezeDialogFlag.sync = "freezeDialogFlag" @getData="getDataList"/>
        <shipperBlackDialog :params="selectRowData" :editType="blacktype"  :BlackDialogFlag.sync = "BlackDialogFlag" @getData="getDataList"/> -->

    </div>
</template>

<script>
import {data_get_shipper_freezeType,data_get_shipper_BlackType,data_get_shipper_change,data_get_shipper_list,data_get_shipper_status,data_get_shipper_auid} from '@/api/users/shipper/all_shipper.js'
import createdDialog from './createdDialog.vue'
import GetCityList from '@/components/GetCityList'
import FreezeDialog from './FreezeDialog'
import shipperBlackDialog from './shipperBlackDialog'
import { eventBus } from '@/eventBus'
import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'



export default {
  components:{
    createdDialog,
    GetCityList,
    FreezeDialog,
    shipperBlackDialog,
    Pager
  },
    props: {
		isvisible: {
			type: Boolean,
			default: false
		}
	},
  data(){
    return{
        templateRadio:'',
        dialogFormVisible_add:false,
        freezeDialogFlag:false,
        BlackDialogFlag:false,
        freezetype:'',
        blacktype:'',
        type:'',
        paramsView:{},
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
        ],//账户状态
        pickerOptions:{
            disabledDate(time) {
            return time.getTime() < Date.now();
            },
        },
        optionsReason:[],
        optionsFormBlack:[],
        // information:null,
        // centerDialogVisible: false,
        formBlack:{ // 移除黑名单的表单
            mobile:'',
            contacts:'',
            companyName:'',
            belongCity:null,
            shipperType:null,
            address:'',
            registerOrigin:'',
            putBlackCause:'',
            popBlackRemark:'',
            putBlackCauseRemark:'',
            belongCityName:''
        },
        formAll:{
            belongCity: null,
            shipperStatus:null,
            accountStatus:null,
            companyName:null,
            mobile:null
        },
        selectRowData:{},
        page:1,
        pagesize:20,
        totalCount:0,
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
        // pushOrderSerial(row){
        //     this.type = 'view';
        //     this.paramsView = Object.assign({},row);;
        //     this.dialogFormVisible_add =true;
        // },
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
        changeList(){
            eventBus.$emit('changeList')
        },
        // 判断选中与否
        handleCurrentChangeRow(val){ 
            // console.log('选中内容',val)
            this.selectRowData = val;
        },
    
    //刷新页面
    firstblood(){
      data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
        // console.log('shipperAll',res)
        this.totalCount = res.data.totalCount;
        this.tableDataAll = res.data.list;
        // this.inited = false;
      }).catch(err=>{
        console.log(err)
      })
    },
    //获取状态列表
    getMoreInformation(){
		// 获取移入黑名单的列表
		data_get_shipper_BlackType().then(res=>{
			this.optionsFormBlack = res.data;
		})
		// 获取冻结原因下拉
		data_get_shipper_freezeType().then(res=>{
			this.optionsReason = res.data;
		})
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
        // this.formAll.belongCity = this.$refs.area.selectedOptions[1];
        this.formAll.belongCity = this.$refs.area.selectedOptions.pop();
        this.firstblood();
    },
    //清空
    clearSearch(){
        this.$refs.area.selectedOptions = [];
        this.formAll = {
            belongCity:null,
            mobile:'',
            shipperStatus:'',
            companyName:''
        },
        this.firstblood();
    },
    getDataList(){
      this.firstblood()
    }
  }
}
</script>
<style lang="scss" scoped>
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