<template>
    <div>
        <div class="shipper_searchinfo">
          <el-form :inline="true">
            <el-form-item label="所在地：">
              <GetCityList v-model="formInline.belongCity" ref="area"></GetCityList>
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
				<el-button type="primary" plain icon="el-icon-edit" @click="handleEdit">修改</el-button>
			</div>
			<div class="info_news">
				<el-table
				ref="multipleTable"
				@row-click="clickDetails"
				:data="tableData4"
				stripe
				:key="theKey1"
				border
				@selection-change="handleSelectionChange"
				tooltip-effect="dark"
				style="width: 100%">
				<el-table-column
					type="selection"
					width="80px">
				</el-table-column>
				<el-table-column
					prop="mobile"
					label="手机号">
				</el-table-column>
				<el-table-column prop="contacts" label="联系人">
				</el-table-column>
				<el-table-column
					prop="registerOrigin"
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
					<!-- <template slot-scope="scope">
					{{scope.row.shipperType==='AF0010202'? '企业货主':'普通货主'}}
					</template> -->
				</el-table-column>
				<el-table-column
					prop="createTime"
					label="注册日期">
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
      <!-- 修改 -->
       <div class="addclassify commoncss">
          <el-dialog title="修改" :visible.sync="changeDialogFlag">
            <el-form :model="forms" ref="forms" :rules="formsRules">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="手机号码" prop="mobile" :label-width="formLabelWidth" required>
                    <el-input v-model="forms.mobile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系人" :label-width="formLabelWidth">
                    <el-input v-model="forms.contacts"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
             <el-row>
               <el-col :span="12">
                 <el-form-item label="所在地" prop="belongCity" :label-width="formLabelWidth" required>
                  <!-- <el-cascader
                    :options="options"
                    v-model="forms.belongCity"
                    @change="handleChange">
                  </el-cascader> -->
                  <GetCityList v-model="forms.belongCity" ref="area"></GetCityList>
                </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="详细地址" :label-width="formLabelWidth">
                  <el-input v-model="forms.address" :maxlength="20"></el-input>
                </el-form-item>
               </el-col>
             </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="onSubmit">确 定</el-button>
              <el-button @click="changeDialogFlag = false">取 消</el-button>
            </div>
          </el-dialog>
       </div>


        <!-- 新增分类提示不可为空 -->
		<div class="cue">
			<el-dialog
			:visible.sync="centerDialogVisible"
			center>
			<span>{{information}}</span>
			</el-dialog>
		</div>
    </div>
</template>
<script>
import GetCityList from '@/components/GetCityList'
import createdDialog from './createdDialog.vue'
import { eventBus } from '@/eventBus'

import FreezeDialog from './FreezeDialog.vue'
import {parseTime} from '@/utils/'
import {data_get_shipper_list,data_get_shipper_change,data_get_shipper_freezeType,data_get_shipper_type,data_get_shipper_status} from '../../../api/users/shipper/all_shipper.js'
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
    // 手机号校验
    const mobileValidator=(rule,val,cb)=>{
      let phoneTest = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      !val && cb(new Error('手机号码不能为空'))
      setTimeout(function () {
        !(phoneTest.test(val)) ? cb(new Error('请输入正确的手机号码格式')) : cb()
      }, 0)
    }
    //  所在地校验
    const belongCityValidator =(rule,val,cb)=>{
      if (!this.forms.belongCity){
        cb(new Error('请选择所在地'))
      } else {
        cb()
      }
    }
  
    return{
      theKey1:'1',
      optionsStatus:[], // 状态列表
      optionsFormBlack:[], // 黑名单的移入原因
      // optionsReason:[], // 冻结移入原因的
      // options:[],// 货主类型
      tableData4:[],
      totalCount:null,
      page:1,
      pagesize:20,
      formInline: {
        belongCity:'',
		mobile:'',
		shipperStatus:"AF0010401",//未认证的状态码
      },
      formLabelWidth:'120px',
      multipleSelection:[],
      information:null,
      formLabelWidth:'120px',
      // BlackDialogFlag: false, //  移入黑名单弹框控制
      // frozeDialogFlag: false, // 冻结弹框控制
      changeDialogFlag: false, // 修改弹窗控制
      centerDialogVisible:false, // 提示语弹窗控制
      forms:{
        mobile:'',
        contacts:'',
        belongCity:null,
        address:'',
        shipperId:''
      },
      formBlack:{
        mobile:'',
        contacts:'',
        companyName:'',
        belongCity:null,
        shipperType:null,
        address:'',
        registerOrigin:'',
        shipperId:'',
        putBlackCause:'',
        putBlackCauseRemark:''
      },
	  radio:'',
	  
      selectRowData:{},
      pickerOptions:{
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      //移入黑名单校验
      formBlackRules:{
        putBlackCause:{required:true,message:'请选择移入原因',trigger:'blur'}
      },

      // 修改校验
      formsRules:{
        mobile:{validator: mobileValidator, trigger: 'change'},
        belongCity:{required:true,validator:belongCityValidator,trigger:'change'}
      },

      //冻结校验
      formFrozeRules:{
        freezeCause:{required:true,message:'请选择冻结原因',trigger:'change'},
        freezeTime:{required:true, message:'请选择解冻日期',trigger:'change'}
      }


    }
  },
     watch: {
        isvisible(newVal){
            if(newVal && !this.inited){
                this.inited = true
                this.firstblood()
            }
        }
    },
    mounted(){
      eventBus.$on('changeList', function(){
          if(this.inited){
			  alert("jkfd")
			this.firstblood()
    		this.getMoreInformation()
          }
      })
    },
//   mounted(){
//     this.firstblood()
//     this.getMoreInformation()
//   },
  methods:{
    //点击选中当前行
    clickDetails(row, event, column){
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    timeChange(val){
      let currentTime = this.formFroze.freezeTime || new Date()
      let oneDay = 1* 24 * 60 * 60 * 1000
      let time = +new Date()
      switch(val){
        case 1:
          time += 1 * oneDay
          break
        case 3:
          time += 3 * oneDay
          break
        case 7:
          time += 7 * oneDay
          break
        case 9:
          time += 30 * oneDay
          break
        case 10:
          time += 100000 * oneDay
          break
      }
      this.formFroze.freezeTime = time
    },
    hint(val){
      this.information = val;
      this.centerDialogVisible = true;
      let timer = setTimeout(()=>{
          this.centerDialogVisible = false;
          clearTimeout(timer)
      },2000)
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      if(val[0]){
         this.selectRowData = val[0]
         this.forms = val[0]
         this.formFroze= val[0]
         this.formBlack= val[0]
      } else {
        this.selectRowData = {}
        this.forms ={}
        this.formFroze= {}
        this.formBlack= {}
      }
      
    },
    getMoreInformation(){
     var optionsStatus=[]
      data_get_shipper_status().then(res=>{
        res.data.map((item)=>{
          this.optionsStatus.push(item);
        })
      })
    },
    getAttestationStatus(code){
      let find = this.optionsStatus.filter(el => {
        return el.code === code
      })[0]
      return find ? find.name : '未知：'+code
    },
      //点击查询按纽，按条件查询列表
    getdata_search(event){
      this.formInline.belongCity = this.$refs.area.selectedOptions.pop();
      data_get_shipper_list(this.page,this.pagesize,this.formInline).then(res=>{
        this.totalCount = res.data.totalCount;
        this.theKey1=Math.random()
        this.tableData4 = res.data.list;
      })
    },
    
    //清空
    clearSearch(){
      this.formInline = {
        belongCity:null,
        mobile:''
      }
    },
      //刷新页面
    firstblood(){
      data_get_shipper_list(this.page,this.pagesize,this.formInline).then(res=>{
        console.log('未认证',res)
        this.totalCount = res.data.totalCount;
        this.tableData4 = res.data.list;
      })
    },
    handleChange(value){
      console.log(value)
    },
    // 修改
    handleEdit(){
    
      if(this.multipleSelection.length == 0){
          //未选择任何修改内容的提示
          let information = "未选中任何修改内容";
          this.hint(information);
      }else if(this.multipleSelection.length >1){
          let information = "不可修改多个内容";
          this.hint(information);
      } else{
        this.changeDialogFlag= true
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
    getDataList(){
      this.firstblood()
    },
    
    //修改-提交
    onSubmit(){
      this.forms.belongCity = this.$refs.area.selectedOptions.pop();
      this.$refs['forms'].validate((valid)=>{
        if(valid){
          var forms=Object.assign({},this.forms)
          data_get_shipper_change(forms).then(res=>{
            // console.log(res)
            this.$message.success('修改成功')
            this.changeDialogFlag = false;
            this.firstblood();
          }).catch(err=>{
            console.log(err)
          })
        }
      })
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


