<template>
    <div>
        <div class="shipper_searchinfo">
          <el-form :inline="true">
            <el-form-item label="所在地：">
              <GetCityList v-model="formAll.belongCity" ref="area"></GetCityList>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="formAll.shipperStatus" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
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
          <el-form-item>
            <el-button type="primary" plain @click="getdata_search">查询</el-button>
            <el-button type="info" plain @click="clearSearch">清空</el-button>
          </el-form-item>
          </el-form>
        </div>
		<div class="classify_info">
			<div class="btns_box">
				<createdDialog btntext="新增" :plain="true" type="primary" btntype="primary" icon="el-icon-news" editType="add" btntitle="新增货主" @getData="getDataList"></createdDialog>
				<FreezeDialog
				btntext="冻结"
				type="primary" 
				btntitle="冻结"
				:plain="true"
				editType='edit'
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
				editType='edit'
				btntype="primary"
				icon="el-icon-news"
				:params="selectRowData"
				@getData="getDataList"
				></shipperBlackDialog>
				<el-button type="primary" plain icon="el-icon-edit" @click="handleBlackout">移出黑名单</el-button>
				<el-button type="primary" plain icon="el-icon-edit" @click="handleUnfroze">解冻</el-button>
			</div>
			<div class="info_news">
			<el-table
			ref="mutipleTable"
			:data="tableDataAll"
			stripe
			border
			:key="thekey2"
			@selection-change="handleSelectionChange"
			tooltip-effect="dark"
			style="width: 100%">
			<el-table-column type='selection' width="80px">
			</el-table-column>  
			<el-table-column label="手机号">
				<template slot-scope="scoped">
					<!-- <div @click="handleClick(scope.row)">{{scope.row.mobile}}</div> -->
					<createdDialog :params="scoped.row" btntype="text" :btntext="scoped.row.mobile" editType="view" btntitle="货主详情" @getData="getDataList"></createdDialog>
				</template>
			</el-table-column>
			<el-table-column prop="companyName" label="公司名称">
			</el-table-column>
			<el-table-column prop="contacts" label="联系人">
			</el-table-column>
			<el-table-column prop="registerOrigin" label="注册来源">
			</el-table-column>
			<el-table-column prop="shipperStatus" label="认证状态">
				<template slot-scope="scope">
				{{getAttestationStatus(scope.row.shipperStatus)}}
				</template>
			</el-table-column>
			<el-table-column prop="accountStatus" label="账户状态">
				<template slot-scope="scope">
				{{getAccountStatus(scope.row.accountStatus)}}
				</template>
			</el-table-column>
			<el-table-column prop="belongCityName" label="所在地">
			</el-table-column>
			<el-table-column prop="shipperTypeName" label="货主类型">
				<template slot-scope="scope">
				{{scope.row.shipperType==='AF0010202'? '企业货主':'普通货主'}}
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="注册日期">
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
         
      <!-- 移出黑名单 -->
    <div class="addclassify commoncss">
        <el-dialog title="移出黑名单" :visible.sync="BlackDialogFlag">
          <el-form :model="formBlack" ref="formBlack">
            <el-row>
                <el-col :span="12">
                  <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.mobile" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="公司名称" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.companyName" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              
               <el-row>
               <el-col :span="12">
                 <el-form-item label="联系人" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.contacts" disabled></el-input>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="所在地" :label-width="formLabelWidth">
                  <el-input v-model="formBlack.belongCityName" disabled></el-input>
                </el-form-item>
               </el-col>
             </el-row>

              <el-row>
               <el-col :span="12">
                 <el-form-item label="详细地址" :label-width="formLabelWidth">
                  <el-input v-model="formBlack.address" disabled :maxlength="20"></el-input>
                </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="货主类型" :label-width="formLabelWidth">
                  <!-- <el-cascader
                    :options="options"
                    v-model="formFroze.shipperType"
                    @change="handleChange">
                  </el-cascader> -->
                  <el-select v-model="formBlack.shipperType" disabled placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.code"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
                </el-form-item>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="12">
                  <el-form-item label="注册来源" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.registerOrigin" disabled :maxlength="20"></el-input>
                  </el-form-item>
               </el-col>
             </el-row>
             <div class="shipper_information">
                <h2>移入黑名单信息</h2>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="移入原因:" :label-width="formLabelWidth">
                      <el-select v-model="formBlack.putBlackCause" disabled placeholder="请选择">
                        <el-option
                          v-for="item in optionsFormBlack"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="移入黑名单原因说明:" :label-width="formLabelWidth">
                      <el-input v-model="formBlack.putBlackCauseRemark" disabled :rows="2" :maxlength="100" placeholder="请输入内容" type="textarea"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
             </div>
             <div class="shipper_information">
                <h2>移出黑名单信息</h2>
                <el-form-item label="移出黑名单原因说明" :label-width="formLabelWidth">
                  <el-input v-model="formBlack.popBlackRemark" :maxlength="100" :rows="2" placeholder="请输入内容" type="textarea"></el-input>
                </el-form-item>
             </div>
          </el-form>
          
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSubmitBlack">确 定</el-button>
            <el-button @click="BlackDialogFlag = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>

    <!-- 解冻弹框 -->
       <div class="addclassify commoncss">
        <el-dialog title="解冻" :visible.sync="unfrozeDialogFlag">
          <el-form :model="formUnFroze" ref="formUnFroze" :rules="rules">
            <el-row>
                <el-col :span="12">
                  <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="formUnFroze.mobile" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="公司名称" :label-width="formLabelWidth">
                    <el-input v-model="formUnFroze.companyName" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              
               <el-row>
               <el-col :span="12">
                 <el-form-item label="联系人" :label-width="formLabelWidth">
                    <el-input v-model="formUnFroze.contacts" disabled></el-input>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="所在地" :label-width="formLabelWidth">
                  <!-- <el-cascader
                    :options="options"
                    v-model="formFroze.belongCity"
                    @change="handleChange">
                  </el-cascader> -->
                  <!-- <GetCityList v-model="formUnFroze.belongCity" disabled ref="area"></GetCityList> -->
                  <el-input v-model="formUnFroze.belongCityName" disabled></el-input>
                </el-form-item>
               </el-col>
             </el-row>

              <el-row>
               <el-col :span="12">
                 <el-form-item label="详细地址" :label-width="formLabelWidth">
                  <el-input v-model="formUnFroze.address" disabled :maxlength="20"></el-input>
                </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="货主类型" :label-width="formLabelWidth">
                  <el-select v-model="formUnFroze.shipperType" disabled placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.code"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
                </el-form-item>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="12">
                  <el-form-item label="注册来源" :label-width="formLabelWidth">
                    <el-input v-model="formUnFroze.registerOrigin" disabled :maxlength="20"></el-input>
                  </el-form-item>
               </el-col>
             </el-row>
             <div class="shipper_information">
                <h2>冻结原因</h2>
             </div>
             <el-row>
               <el-col :span="24">
                 <el-form-item label="冻结原因" :label-width="formLabelWidth">
                  <el-select v-model="formUnFroze.freezeCause" disabled placeholder="请选择">
                    <el-option
                      v-for="item in optionsReason"
                      :key="item.value"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
               </el-col>
             </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="解冻日期" :label-width="formLabelWidth">
                    <el-date-picker
                      v-model="formUnFroze.unfreezeTime"
                      type="datetime"
                      placeholder="选择日期"
                      format="yyyy-MM-dd"
                      :picker-options="pickerOptions"
                      disabled>
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
             <el-row>
               <el-col :span="24">
                  <el-form-item label="冻结原因说明:"  :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="2" disabled v-model="formUnFroze.freezeCauseRemark"></el-input>
                  </el-form-item>
               </el-col>
             </el-row>
             <div class="shipper_information">
              <h2>解冻</h2>
             </div>
             <el-row>
               <el-col :span="24">
                 <el-form-item  label="解冻原因说明:" :label-width="formLabelWidth" prop="unfreezeRemark" required>
                  <el-input type="textarea" :rows="2" v-model="formUnFroze.unfreezeRemark" :maxlength="100"></el-input>
                 </el-form-item>
               </el-col>
             </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSave">确 定</el-button>
            <el-button @click="unfrozeDialogFlag = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>


    </div>
</template>

<script>
import {data_get_shipper_freezeType,data_get_shipper_BlackType,data_get_shipper_list,data_get_shipper_status,data_get_shipper_auid} from '@/api/users/shipper/all_shipper.js'
import createdDialog from './createdDialog.vue'
import GetCityList from '@/components/GetCityList'
import FreezeDialog from './FreezeDialog'
import shipperBlackDialog from './shipperBlackDialog'
export default {
  components:{
    createdDialog,
    GetCityList,
    FreezeDialog,
    shipperBlackDialog,
  },
  data(){
      return{
      thekey2:'1',
      options:[],
      optionsAuidSataus: [],
      optionsStatus:[
        {
        code:null,
        name:'全部'
        }
      ],
      pickerOptions:{
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      optionsReason:[],
      optionsFormBlack:[],
      formUnFroze: { // 解冻弹框表单
        mobile: '', // 手机号
        companyName: '', // 公司名称
        shipperType:null,
        address:'', // 详细地址
        contacts:'', // 联系人
        belongCity:null, // 所在地
        registerOrigin:'', // 注册来源
        creditCode:'', // 统一社会信用代码
        unfreezeTime:'',
        shipperStatus:null,
        freezeCause:'',
        freezeCauseRemark:'',
        unfreezeRemark:'',
        belongCityName:''
      },
      // information:null,
      // centerDialogVisible: false,
      formLabelWidth:'120px',
      BlackDialogFlag: false, // 移出黑名单的弹框控制
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
        companyName:'',
        mobile:''
      },
      selectRowData:{},
      page:1,
      pagesize:20,
      totalCount:null,
      tableDataAll:[],
      unfrozeDialogFlag: false,
      rules:{
        unfreezeRemark:{required: true, message:'请输入解冻原因',trigger:'change'}
      },
      multipleSelection:[]
    }
  },
  created(){

  },
  mounted(){
    this.firstblood()
    this.getMoreInformation()
    this.getdata_search()
    // this.formAll.belongCity = this.$refs.area.selectedOptions.pop();
  },
  methods:{
    getAttestationStatus(code){
      let find = this.optionsStatus.filter(el => {
        return el.code === code
      })[0]
      return find ? find.name : '未知：'+code
    },

    // 判断选中与否
    handleSelectionChange(val){
      this.multipleSelection = val;
      if(val[0]) {
        this.formUnFroze=val[0]
        this.selectRowData=val[0]
        this.formBlack=val[0]
      } else {
        this.formUnFroze={}
        this.selectRowData={}
        this.formBlack={}
      }
    },

    // 移出黑名单点击
    handleBlackout(){
       if(this.multipleSelection.length == 0){
        //未选择任何修改内容的提示
        // let information = "未选中任何修改内容";
        // this.hint(information);
        this.$message.error('未选中任何修改内容')
      }else if(this.multipleSelection.length >1){
        // let information = "不可修改多个内容";
        // this.hint(information);
        this.$message.error('不可修改多个内容')
      } else{
        this.BlackDialogFlag = true
      }
    },
    // 解冻
    handleUnfroze(){
        console.log(this.multipleSelection)
      if(this.multipleSelection.length == 0){
          //未选择任何修改内容的提示
          // let information = "未选中任何修改内容";
          // this.hint(information);
          this.$message.error('未选中任何修改内容')
      }else if(this.multipleSelection.length >1){
          // let information = "不可修改多个内容";
          // this.hint(information);
          this.$message.error('不可修改多个内容')
      } else{
        this.unfrozeDialogFlag=true
      }
    },
    //刷新页面
    firstblood(){
      data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
        console.log(res)
        this.totalCount = res.data.totalCount;
        this.tableDataAll = res.data.list;
      }).catch(err=>{
        console.log(err)
      })
    },
    //获取状态列表
    getMoreInformation(){
      var optionsAuidSataus=[]
      data_get_shipper_status().then(res=>{
        res.data.map((item)=>{
			// console.log('item:',item)
          this.optionsStatus.push(item);
        })
      })
      // 获取移入黑名单的列表
      data_get_shipper_BlackType().then(res=>{
          this.optionsFormBlack = res.data;
      })
      // 获取冻结原因下拉
      data_get_shipper_freezeType().then(res=>{
          this.optionsReason = res.data;
      })
      data_get_shipper_auid().then(res=>{
		  console.log('车主状态：',res)
          this.optionsAuidSataus = res.data;
      })
	},
	//
    getAccountStatus(code){
		// console.log('this.optionsAuidSataus:',this.optionsAuidSataus)
		let findAuid=this.optionsAuidSataus.filter(el => {
			return el.code === code
		})[0]
		return findAuid ? findAuid.name : '正常'
    },
      //点击查询按纽，按条件查询列表
    getdata_search(event) {
        this.formAll.belongCity = this.$refs.area.selectedOptions.pop();
        data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
          this.totalCount = res.data.totalCount;
          this.thekey2 = Math.random()
          this.tableDataAll = res.data.list;
        })
    },
    //清空
    clearSearch(){
      this.formAll = {
        belongCity:null,
        mobile:'',
        shipperStatus:'',
        companyName:''
      }
    },
    handleChange(value){
      console.log(value)
    },

    handleClick (row) {
      console.log('row:',row)
    },

    // 移出黑名单- 提交
    onSubmitBlack(){
      this.$refs['formBlack'].validate((valid)=>{
        if(valid){
          this.formBlack.belongCity = this.$refs.area.selectedOptions.pop();
          var forms= Object.assign({}, this.formBlack,{shipperStatus:"AF0010403"})
          data_get_shipper_change(forms).then(res=>{
            // console.log(res)
            this.$message.success('移出黑名单成功')
            this.BlackDialogFlag = false;
            this.firstblood();
          }).catch(err=>{
            console.log(err)
          })
        }
      })
    },

    // 解冻
    onSave(){
      this.$refs['formUnFroze'].validate((valid)=>{
        if(valid){
          this.formUnFroze.belongCity = this.$refs.area.selectedOptions.pop();
          var forms= Object.assign({}, this.formUnFroze,{shipperStatus:"AF0010403"})
          data_get_shipper_change(forms).then(res=>{
            // console.log(res)
            this.$message.success('解冻成功')
            this.unfrozeDialogFlag = false;
            this.firstblood();
          }).catch(err=>{
            console.log(err)
          })
        }
      })
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

</style>