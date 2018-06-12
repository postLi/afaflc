<template>
    <div>
        <div class="shipper_searchinfo">
        <label>所在地：
          <!-- <el-cascader
            :options="options"
            v-model="formAll.belongCity"
            @change="handleChange">
          </el-cascader> -->
          <GetCityList v-model="formAll.belongCity" ref="area"></GetCityList>
        </label>
         <label>公司名称:
             <el-input v-model="formAll.companyName"></el-input>
           </label>
           <label>手机号码：
             <el-input v-model="formAll.mobile"></el-input>
           </label>
           <el-button type="primary" plain @click="getdata_search">查询</el-button>
           <el-button type="info" plain @click="clearSearch">清空</el-button>
      </div>
      <div class="export">
        <el-button type="primary" plain icon="el-icon-edit" @click="handleEdit">认证审核</el-button>
      </div>
      <div class="info_news">
        <el-table 
           ref="mutipleTable"
           :data="tableData1"
           stripe
           border
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
           <el-table-column prop="belongCity" label="所在地">
           </el-table-column>
           <el-table-column prop="authenticationTime" label="提交认证时间">
           </el-table-column>
           <el-table-column prop="phone" label="等待时长">
           </el-table-column>
           <!-- <el-table-column
            fixed="right"
            label="操作"
            width="250">
            <template slot-scope="scope">
              <el-button type="text" size="small">认证审核</el-button>
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

       <!--认证审核部分 -->
    <div class="shenghe commoncss">
        <el-dialog title="认证审核" :visible.sync="dialogFormVisible">
          <el-form :model="shengheform" ref="shengheform">
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机号码" :label-width="formLabelWidth" >
                  <el-input v-model="shengheform.mobile" auto-complete="off"></el-input>
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
                  <!-- <el-select v-model="shengheform.belongCity" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select> -->
                  <GetCityList v-model="shengheform.belongCity" ref="area"></GetCityList>
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
                  <el-input v-model="shengheform.creditCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="提交认证时间" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="shengheform.authenticationTime"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="等待时长" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.companyname" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="注册来源" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.registerOrigin"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="货主类型" :label-width="formLabelWidth" prop="hzclassify">
                  <!-- <el-select v-model="shengheform.shipperType" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select> -->
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
 
            <!-- <el-form-item label="长发货物" :label-width="formLabelWidth">
              <el-input v-model="shengheform.companyname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="提交认证时间" :label-width="formLabelWidth">
              <el-input v-model="shengheform.companyname" auto-complete="off"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="是否二次提交申请" :label-width="formLabelWidth">
              <el-input v-model="shengheform.companyname" auto-complete="off"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="注册时经纬度" :label-width="formLabelWidth">
              <el-input v-model="shengheform.companyname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="首次提交认证时间" :label-width="formLabelWidth">
              <el-input v-model="shengheform.companyname" auto-complete="off"></el-input>
            </el-form-item> --> 
            <div class="data_pic">
                <!-- <img src="" alt="" /><br /> -->
                <div class="liceseBigPicture">
                  <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="shengheform.businessLicenceFile" />
                </div>
                <div class="data_pic_yyzz data_pic_c">
                    <!-- <img src="" alt="" /> -->
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="shengheform.businessLicenceFile" />
                    <h2>营业执照</h2>
                    <el-radio-group v-model="radio1"  @change="pictureTypeChange">
                        <el-radio label="1">上传合格</el-radio><br />
                        <el-radio label="2">不清晰</el-radio><br />
                        <el-radio label="3">内容不符</el-radio>
                    </el-radio-group>
                </div>
                <div class="data_pic_company data_pic_c">
                    <!-- <img src="" alt="" /> -->
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="shengheform.companyFacadeFile" />
                    <h2>公司或档口照片</h2>
                    <el-radio-group v-model="radio2"  @change="pictureTypeChange">
                        <el-radio :label="1">上传合格</el-radio><br />
                        <el-radio :label="2">不清晰</el-radio><br />
                        <el-radio :label="3">内容不符</el-radio>
                    </el-radio-group>
                </div>
                <div class="data_pic_callingcode data_pic_c">
                    <!-- <img src="" alt="" /> -->
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="shengheform.shipperCardFile" />
                    <h2>发货人名片</h2>
                    <el-radio-group v-model="radio3" @change="pictureTypeChange">
                        <el-radio :label="1">上传合格</el-radio><br />
                        <el-radio :label="2">不清晰</el-radio><br />
                        <el-radio :label="3">内容不符</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <!-- <div class="shipper_information">
                <h2>货主归属信息</h2>
                <el-form-item label="所属组织" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.companyname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="归属片区" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="shengheform.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="绑定合伙人" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="shengheform.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="业务员" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="shengheform.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
            </div> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click="handlerPass">确认审核通过</el-button>
            <el-button @click="handlerOut">审核不通过</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
     </div> 
     
      <!-- 提示语的弹框 -->
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
import Upload from '@/components/Upload/singleImage'
import createdDialog from './createdDialog.vue'
import GetCityList from '@/components/GetCityList'
import {data_get_shipper_list,data_get_shipper_type,data_get_shipper_change} from '../../../api/users/shipper/all_shipper.js'
export default {
  components:{
    createdDialog,
    GetCityList,
    Upload
  },
  data(){
    return{
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
        shipperCardFile:''
      },
      radio1:'',
      radio2:'',
      radio3:'',
      centerDialogVisible:false,// 提示语的弹窗控制
      information:null, // 弹框显示的信息
      multipleSelection:[],
      // shengherules: { // 表单校验
      //   mobile: [
      //     { required: true, message: '请输入手机号码', trigger: 'blur' },
      //   ],
      //   contacts: [
      //     { required: true, message: '联系人不可为空', trigger: 'change' }
      //   ],
      //   address: [
      //     { required: true, message: '地址不可为空', trigger: 'change' }
      //   ],
      //   xsaddress: [
      //     {  required: true, message: '请选择时间', trigger: 'change' }
      //   ],
      //   hzclassify: [
      //     {  required: true, message: '请至少选择一个活动性质', trigger: 'change' }
      //   ],
      //   resource: [
      //     { required: true, message: '请选择活动资源', trigger: 'change' }
      //   ],
      //   desc: [
      //     { required: true, message: '请填写活动形式', trigger: 'blur' }
      //   ]
      // }
    }
  },
  mounted(){
    this.firstblood()
    this.getMoreInformation()
  },
  methods:{
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
        this.dialogFormVisible= true
      }
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      if(val[0]){
         this.shengheform=val[0]
      } else {
          this.selectRowData = {}
      }
    },
    //刷新页面
    firstblood(){
      data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
        console.log(res)
        this.totalCount = res.data.totalCount;
        //this.tableData1 = res.data.list;
      })
    },
    //点击查询按纽，按条件查询列表
    getdata_search(event){
       this.formAll.belongCity = this.$refs.area.selectedOptions.pop();
       console.log('this.tableData1:',this.tableData1)
        data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
          console.log('this.tableData1:',this.tableData1, res)
          this.totalCount = res.data.totalCount;
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
    
    // 审核不通过
    handlerOut(){
      this.$refs['shengheform'].validate((valid)=>{
        if(valid){
          this.shengheform.belongCity = this.$refs.area.selectedOptions.pop();
          var forms=Object.assign({},this.shengheform,{attestationStatus:"AF0010404"})
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
      this.$refs['shengheform'].validate((valid)=>{
        if(valid){
           this.shengheform.belongCity = this.$refs.area.selectedOptions.pop();
          var forms=Object.assign({},this.shengheform,{attestationStatus:"AF0010403"})
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

.data_pic{
  .liceseBigPicture{
    display: block;
    width:200px;
    height: 200px;
    margin: 0 auto;
  }
}
</style>


