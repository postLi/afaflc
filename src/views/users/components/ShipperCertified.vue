<template>
    <div>
        <div class="shipper_searchinfo">
          <el-form :inline="true">
            <el-form-item label="所在地：">
              <GetCityList v-model="formAll.belongCity" ref="area"></GetCityList>
            </el-form-item>
            <el-form-item label="公司名称：">
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
        	<el-button type="primary" plain icon="el-icon-edit" @click="handleEdit">认证审核</el-button>
		</div>
		<div class="info_news">
			<el-table 
			ref="mutipleTable"
			:data="tableData1"
			stripe
			border
			:key="theKey3"
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
			<el-table-column prop="authenticationTime" label="提交认证时间">
			</el-table-column>
			<el-table-column prop="" label="等待时长">
				<template slot-scope="scope">
				{{ scope.row.authenticationTime ? formatTime((+new Date(scope.row.authenticationTime))) : '' }}
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

       <!--认证审核部分 -->
    <div class="shenghe commoncss">
        <el-dialog title="认证审核" :visible.sync="dialogFormVisible">
          <el-form :model="shengheform" ref="shengheform" :rules="shengheformRules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机号码" :label-width="formLabelWidth" >
                  <el-input v-model="shengheform.mobile" disabled auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司名称" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.companyName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人" :label-width="formLabelWidth" prop="linkman">
                  <el-input v-model="shengheform.contacts" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所在地" :label-width="formLabelWidth" prop="address">
                 <el-input v-model="shengheform.belongCityName" @focus="changeCity" v-if="selectDiaologFlag" ></el-input>
                 <span v-else>
                   <GetCityList v-model="shengheform.belongCity" ref="area"></GetCityList>
                 </span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="详细地址" :label-width="formLabelWidth" prop="xsaddress">
                  <el-input v-model="shengheform.address" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="统一社会信用代码" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.creditCode" :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="提交认证时间" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="shengheform.authenticationTime"
                    type="datetime"
                    placeholder="选择日期"
                    disabled>
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="等待时长:" :label-width="formLabelWidth">
                  {{shengheform.authenticationTime? formatTime((+new Date(shengheform.authenticationTime))) : '' }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册来源" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.registerOrigin" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="货主类型" :label-width="formLabelWidth" prop="shipperType">
                  <el-select v-model="shengheform.shipperType" placeholder="请选择">
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
 
            <div class="data_pic">
                <div class="data_pic_yyzz data_pic_c">
                    <el-form-item>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="shengheform.businessLicenceFile" />
                    </el-form-item>
                    <h2>营业执照</h2>
                    <el-form-item prop="radio1">
                      <el-radio-group v-model="radio1" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item> 
                </div>
                <div class="data_pic_company data_pic_c">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="shengheform.companyFacadeFile" />
                    <h2>公司或档口照片</h2>
                    <el-form-item prop="radio2">
                      <el-radio-group v-model="radio2" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item>
                </div>
                <div class="data_pic_callingcode data_pic_c">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="shengheform.shipperCardFile" />
                    <h2>发货人名片</h2>
                    <el-form-item prop="radio3">
                      <el-radio-group v-model="radio3" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item>
                </div>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click="handlerPass">确认审核通过</el-button>
            <el-button @click="handlerOut">审核不通过</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
     </div> 
    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import createdDialog from './createdDialog.vue'
import GetCityList from '@/components/GetCityList'
import {data_get_shipper_list,data_get_shipper_type,data_get_shipper_change} from '@/api/users/shipper/all_shipper.js'
export default {
  components:{
    createdDialog,
    GetCityList,
    Upload
  },
  computed: {
    pictureValue () {
      return '营业执照:'+ this.radio1 + ',公司或档口照片:'+ this.radio2 + ',发货人名片:'+ this.radio3
    }
  },
  data(){
    const radioValidator = (rule,val,cb)=>{
      console.log(val)
      if(!this.radio1){
        cb(new Error('请选择图片质量'))
      }else{
       cb()
      }
    }
    return{
      theKey3:'1',
      selectDiaologFlag:true,
      options:[], // 货主类型列表
      tableData1:[], // 列表数据
      totalCount:null, // 总数
      page:1,
      pagesize:20,
      formAll:{
        belongCity:null,
        companyName:'',
        mobile:''
      },
      formLabelWidth: '120px',
      dialogFormVisible:false, //认证审核弹框控制
      shengheform: { // 认证审核表单
        mobile: '', // 手机号
        companyName: '', // 公司名称
        address:'', // 详细地址
        contacts:'', // 联系人
        belongCity:null, // 所在地
        authenticationTime:'',
        registerOrigin:'', // 注册来源
        creditCode:'', // 统一社会信用代码
        businessLicenceFile:'',
        companyFacadeFile:'',
        shipperCardFile:'',
        belongCityName:''
      },
      radio1:'',
      radio2:'',
      radio3:'',
      centerDialogVisible:false,// 提示语的弹窗控制
      information:null, // 弹框显示的信息
      multipleSelection:[],
      shengheformRules:{
       shipperType:{required: true, message:'请选择货主类型',trigger:'change'},
       radio1:{validator: radioValidator,trigger:'change'},
       radio2:{validator: radioValidator,trigger:'change'},
       radio3:{validator: radioValidator,trigger:'change'}
      }
    }
  },
  mounted(){
    this.firstblood()
    this.getMoreInformation()
  },
  methods:{
    changeCity(){
      this.selectDiaologFlag=false
    },
    formatTime(da){
      let time = (+new Date()) - da
      return parseInt(time / 1000 / (3600*24))+ '天'+ parseInt(time/1000/(3600*24*60*60)*60*60)+ '小时'
    },
    handleEdit(){
      console.log(this.multipleSelection)
      if(this.multipleSelection.length == 0){
          //未选择任何修改内容的提示
        let information = "未选中任何修改内容";
        this.hint(information);
      }else if(this.multipleSelection.length >1){
        let information = "不可修改多个内容";
        this.hint(information);
      } else{
        this.dialogFormVisible = true
      } 
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      if(val[0]){
         this.shengheform=val[0]
         console.log(this.shengheform)
      } else {
          this.shengheform = {}
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
      //  console.log('this.tableData1:',this.tableData1)
        data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
          // console.log('this.tableData1:',this.tableData1, res)
          this.totalCount = res.data.totalCount;
          this.theKey3=Math.random()
          this.tableData1 = res.data.list;
        })
    },
    //清空
    clearSearch(){
      this.formAll = {
        belongCity:'',
        mobile:'',
        companyName:''
      }
    },
      handleChange(value){
        console.log(value);
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
    //获取货主类型
    getMoreInformation(){
      data_get_shipper_type().then(res=>{
        // console.log(res)
        res.data.map((item)=>{
          this.options.push(item)
        })
      })
    },
    hint(val){
      this.information = val;
      this.centerDialogVisible = true;
      let timer = setTimeout(()=>{
          this.centerDialogVisible = false;
          clearTimeout(timer)
      },2000)
    },
    
     completeData(){
      //获取城市name
      if(this.$refs.area.selectedOptions.length > 1){
        let province;
        this.$refs.area.areaData.forEach((item) =>{
          if(item.code == this.$refs.area.selectedOptions[0]){
            province = item
          }
        })
        province.children.forEach( item => {
          if(item.code == this.$refs.area.selectedOptions[1]){
            this.shengheform.belongCity = item.code;
            this.shengheform.belongCityName = item.name;
          }
        })
       }else{
        this.$refs.area.areaData.forEach((item) =>{
          if(item.code == this.$refs.area.selectedOptions[0]){
            this.shengheform.belongCity = item.code;
            this.shengheform.belongCityName = item.name;
          }
        })
      }
    },
    // 审核不通过
    handlerOut(){
      this.completeData()
      this.$refs['shengheform'].validate((valid)=>{
        if(valid){
          this.shengheform.belongCity = this.$refs.area.selectedOptions.pop();
          var forms=Object.assign({},this.shengheform,{attestationStatus:"AF0010404"},{authNoPassCause:this.pictureValue})
          this.$confirm()
          data_get_shipper_change(forms).then(res=>{
            // console.log(res)
            this.$message.success('审核不通过 成功')
            this.dialogFormVisible = false;
            this.firstblood()
          }).catch(err=>{
            console.log(err)
          })
        }
      })
    },

    // 审核通过
    handlerPass(){
      this.completeData()
      this.$refs['shengheform'].validate((valid)=>{
        if(valid){
          this.shengheform.belongCity = this.$refs.area.selectedOptions.pop();
          var forms=Object.assign({},this.shengheform,{attestationStatus:"AF0010403"},{authNoPassCause:this.pictureValue})
          data_get_shipper_change(forms).then(res=>{
            // console.log(res)
            this.$message.success('审核通过成功')
            this.dialogFormVisible = false;
            this.firstblood()
          }).catch(err=>{
            console.log(err)
          })
        }
      })
    },

    // 图片质量的选择拼接
    pictureTypeChange(val){
      console.log('pictureValue:', this.pictureValue)
      let authNoPassCause
      switch(val){
        case 1:

        break
        case 2:

        break
        case 3:

        break
      }
    }
  }
}
</script>
<style lang="scss">

</style>


