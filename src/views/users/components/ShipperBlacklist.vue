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
  <div class="export">
    <el-button type="primary" plain icon="el-icon-edit" @click="handleBlackout">移出黑名单</el-button>
  </div>
    <div class="info_news">
        <el-table 
          ref="mutipleTable"
          :data="tableData"
          stripe
          border
          @selection-change="handleSelectionChange"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column type="selection"  width="80px">
          </el-table-column>
          <el-table-column label="手机号">
              <template slot-scope="scope">
              <!-- <div @click="handleClick(scope.row)">{{scope.row.mobile}}</div> -->
              <createdDialog
                :params="scope.row"
                btntype="text"
                :btntext="scope.row.mobile"
                editType="view"
                btntitle="货主详情"
              >
              </createdDialog>
            </template>
          </el-table-column>
          <el-table-column prop="companyName" label="公司名称">
          </el-table-column>
          <el-table-column prop="contacts" label="联系人">
          </el-table-column>
          <el-table-column prop="belongCity" label="所在地">
          </el-table-column>
          <el-table-column prop="shipperTypeName" label="货主类型">
          </el-table-column>
          <el-table-column prop="putBlackTime" label="移入黑名单时间">
          </el-table-column>
          <el-table-column prop="shipperType" label="移入原因">
          </el-table-column>
            <!-- <el-table-column
              fixed="right"
              label="操作"
              width="250">
              <template slot-scope="scope">
              <el-button type="text" size="small">移出黑名单</el-button>
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
                  <!-- <el-cascader
                    :options="options"
                    v-model="formFroze.belongCity"
                    @change="handleChange">
                  </el-cascader> -->
                  <GetCityList v-model="formBlack.belongCity" disabled ref="area"></GetCityList>
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
            <el-button type="primary" @click="onSubmit">确 定</el-button>
            <el-button @click="BlackDialogFlag = false">取 消</el-button>
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
import createdDialog from './createdDialog.vue'
import GetCityList from '@/components/GetCityList'
import {data_get_shipper_list,data_get_shipper_type,data_get_shipper_BlackType,data_get_shipper_change } from '../../../api/users/shipper/all_shipper.js'
export default {
  components:{
    createdDialog,
    GetCityList
  },
  data(){
    return{
      optionsFormBlack:[],
      options:[],
      formLabelWidth: '120px',
      tableData:[],
      totalCount:null,
      page:1,
      pagesize:20,
      formAll:{
        belongCity:null,
        companyName:'',
        mobile:''
      },
      BlackDialogFlag:false, // 移出黑名单弹框控制
      centerDialogVisible:false,// 提示语的弹窗控制
      information:null, // 弹框显示的信息
      multipleSelection:[],
      formBlack:{
        mobile:'',
        contacts:'',
        companyName:'',
        belongCity:null,
        shipperType:null,
        address:'',
        registerOrigin:'',
        putBlackCause:'',
        popBlackRemark:'',
        putBlackCauseRemark:''
      }
    }
  }, 
  mounted(){
    this.firstblood()
    this.getMoreInformation()
  },
  methods:{
     // 判断选中值
    handleSelectionChange(val){
      this.multipleSelection =val;
      if(val[0]){
        // 对解冻弹框的赋值处理
        this.formBlack=val[0]
      } else {
        this.selectRowData = {}
        this.formBlack={}
      }
    },
    //移出黑名单
    handleBlackout(){
      console.log(this.multipleSelection)
      if(this.multipleSelection.length == 0){
        //未选择任何修改内容的提示
        let information = "未选中任何修改内容";
        this.hint(information);
      }else if(this.multipleSelection.length >1){
        let information = "不可修改多个内容";
        this.hint(information);
      } else{
        this.BlackDialogFlag = true
      }
    },
     
    getMoreInformation(){
      //获取货主类型
      data_get_shipper_type().then(res=>{
        // console.log(res)
        res.data.map((item)=>{
          this.options.push(item)
        })
      }),
      // 获取移入黑名单的列表
      data_get_shipper_BlackType().then(res=>{
        res.data.map(item=>{
          this.optionsFormBlack.push(item)
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
    //刷新页面
    firstblood(){
      data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
        console.log(res)
        this.totalCount = res.data.totalCount;
        this.tableData = res.data.list;
      })
    },
      //点击查询按纽，按条件查询列表
    getdata_search(event){
       this.formAll.belongCity = this.$refs.area.selectedOptions.pop();
        data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
          this.totalCount = res.data.totalCount;
          this.tableData = res.data.list;
        })
    },
    
    //清空
    clearSearch(){
      this.formAll = {
        belongCity:null,
        mobile:'',
        companyName:''
      }
    },
    handleChange(value){
      console.log(value)
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
     
    // 移出黑名单- 提交
    onSubmit(){
      this.$refs['formBlack'].validate((valid)=>{
        if(valid){
          this.formBlack.belongCity = this.$refs.area.selectedOptions.pop();
          var forms= Object.assign({}, this.formBlack,{attestationStatus:"AF0010403"})
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
    }
  }
}
</script>
<style lang="scss">
.el-textarea{
  width: 400px;
}
.shipper_searchinfo{
  label{
    display: inline-block;
    margin-left: 10px;
  }
  .chooseCityList{
    display: inline-block;
  }
}
.shipper .shipper_searchinfo label {
  margin-right: 0px;
}
</style>


