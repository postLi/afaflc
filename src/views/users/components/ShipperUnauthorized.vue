<template>
    <div class="identicalStyle">
        <searchInfo @change="getSearchParam" :showType = 'tabType'></searchInfo>
        
	  	<div class="classify_info">
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
				icon="el-icon-edit"
				editType="edit" 
				btntitle="修改"
				@getData="getDataList">
				</createdDialog> -->
                <el-button type="primary" icon="el-icon-document" plain :size="btnsize" @click="handleClick('identification')">代客认证</el-button>
                <el-button type="primary" icon="el-icon-edit-outline" plain :size="btnsize" @click="handleClick('edit')">修改</el-button>
			</div>
			<div class="info_news">
				<el-table
				ref="multipleTable"
				:data="tableData4"
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
				<el-table-column
					prop="mobile"
					label="手机号">
                    <template slot-scope="scope">
                        <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
                    </template>
				</el-table-column>
				<el-table-column prop="contacts" label="联系人">
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
					label="注册日期">
                    <template  slot-scope="scope">
                        <span v-if="scope.row.registerTime">{{ scope.row.registerTime | parseTime}}</span>
                    </template>
				</el-table-column>
				</el-table>
			</div>	
		</div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>    
        <createdDialog :paramsView="paramsView" :typetitle="typetitle" :editType="type"  :dialogFormVisible_add.sync = "dialogFormVisible_add" @getData="getDataList"/>

    </div>
</template>
<script>
import createdDialog from './createdDialog.vue'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import searchInfo from './searchInfo'
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
        Pager,
        searchInfo
    },
  data(){
    return{
        tabType:'unauthorized',
        btnsize: 'mini',
        dialogFormVisible_add: false,
        type: '',
        paramsView: {},
        typetitle:'',
        templateRadio:'',
        optionsStatus:[], // 状态列表
        tableData4:[],
        totalCount:0,
        page:1,
        pagesize:20,
        searchInfo: {
            accountStatus:'',
            belongCity:'',
            mobile:'',
            shipperStatus:"AF0010401",//未认证的状态码
        },
        formLabelWidth:'120px',
        formLabelWidth:'120px',
        changeDialogFlag: false, // 修改弹窗控制
        optionsAuidSataus:[
			{
			code:'',
			name:'全部'
			}
        ],//账户状态
        selectRowData:{},
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
            // console.log('111111111111111111')
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
            this.searchInfo = Object.assign({},obj,{shipperStatus:'AF0010401'})
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
        handleCurrentChangeRow(val){
            console.log(val)
            this.selectRowData = val;
        },
        handleClick(type){
            switch(type){
                case 'edit' :
                    this.type = "edit";
                    this.typetitle = "修改货主";
                    this.paramsView = this.selectRowData;
                    this.dialogFormVisible_add = true;
                    break;
                case 'identification':
                    this.type = "identification";
                    this.typetitle = "代客认证";
                    this.paramsView = this.selectRowData;
                    this.dialogFormVisible_add = true;
                    break;
            }
        },
        //刷新页面
        firstblood(){
            data_get_shipper_list(this.page,this.pagesize,this.searchInfo).then(res=>{
                // console.log('未认证',res)
                this.totalCount = res.data.totalCount;
                this.tableData4 = res.data.list;
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


