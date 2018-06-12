<template>
  <div>
      <div class="shipper_searchinfo">
        <label>所在地：
        <!-- <el-cascader
          :options="options"
          v-model="formAll.selectedOptions6"
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
        <el-button type="primary" plain icon="el-icon-edit" @click="handleUnfroze">解冻</el-button>
        <!-- <el-button type="primary" plain icon="el-icon-edit" @click="handleUnfroze">冻结修改</el-button> -->
        <FreezeDialog
          btntext="冻结修改"
          type="primary" 
          btntitle="冻结修改"
          :plain="true"
          editType='edit'
          btntype="primary"
          icon="el-icon-news"
          :params="selectRowData"
          @getData="getListData"
          >
        </FreezeDialog>
        <!-- <el-button type="primary" plain icon="el-icon-edit" @click="handleUnfroze">移入黑名单</el-button> -->
        <shipperBlackDialog
          btntext="移入黑名单"
          type="primary" 
          btntitle="移入黑名单"
          :plain="true"
          editType='edit'
          btntype="primary"
          icon="el-icon-news"
          :params="selectRowData"
          @getData="getListData"
        ></shipperBlackDialog>
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
            <el-table-column type="selection" width="80px">
            </el-table-column>
            <el-table-column label="手机号">
               <template slot-scope="scope">
                <!-- <div @click="handleClick(scope.row)">{{scope.row.mobile}}</div> -->
                <createdDialog :params="scope.row" btntype="text" :btntext="scope.row.mobile" editType="view" btntitle="货主详情" @getData="getDataList"></createdDialog>
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
            <el-table-column prop="freezeTime" label="冻结时间">
            </el-table-column>
            <el-table-column prop="freezeCause" label="冻结原因">
            </el-table-column>
            <el-table-column prop="unfreezeTime" label="解冻日期">
            </el-table-column>
            <!-- <el-table-column
                fixed="right"
                label="操作"
                width="250">
                <template slot-scope="scope">
                <el-button type="text" size="small">解冻</el-button>
                <el-button type="text" size="small">冻结修改</el-button>
                <el-button type="text" size="small">移入黑名单</el-button>
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


      <!-- 解冻弹框 -->
       <div class="addclassify commoncss">
        <el-dialog title="解冻" :visible.sync="unfrozeDialogFlag">
          <el-form :model="formUnFroze" ref="formUnFroze">
            <el-row>
                <el-col :span="12">
                  <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="formUnFroze.mobile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="公司名称" :label-width="formLabelWidth">
                    <el-input v-model="formUnFroze.companyName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              
               <el-row>
               <el-col :span="12">
                 <el-form-item label="联系人" :label-width="formLabelWidth">
                    <el-input v-model="formUnFroze.contacts"></el-input>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="所在地" :label-width="formLabelWidth">
                  <!-- <el-cascader
                    :options="options"
                    v-model="formFroze.belongCity"
                    @change="handleChange">
                  </el-cascader> -->
                  <GetCityList v-model="formUnFroze.belongCity" ref="area"></GetCityList>
                </el-form-item>
               </el-col>
             </el-row>

              <el-row>
               <el-col :span="12">
                 <el-form-item label="详细地址" :label-width="formLabelWidth">
                  <el-input v-model="formUnFroze.address" :maxlength="20"></el-input>
                </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="货主类型" :label-width="formLabelWidth">
                  <el-select v-model="formUnFroze.shipperType" placeholder="请选择">
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
                    <el-input v-model="formUnFroze.registerOrigin" :maxlength="20"></el-input>
                  </el-form-item>
               </el-col>
             </el-row>
             <div class="shipper_information">
                <h2>冻结原因</h2>
             </div>
             <el-row>
               <el-col :span="24">
                 <el-form-item label="冻结原因" :label-width="formLabelWidth">
                  <el-select v-model="formUnFroze.freezeCause" placeholder="请选择">
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
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
             <el-row>
               <el-col :span="24">
                  <el-form-item label="冻结原因说明:"  :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="2" v-model="formUnFroze.freezeCauseRemark"></el-input>
                  </el-form-item>
               </el-col>
             </el-row>
             <div class="shipper_information">
              <h2>解冻</h2>
             </div>
             <el-row>
               <el-col :span="24">
                 <el-form-item  label="解冻原因说明:" :label-width="formLabelWidth" required>
                  <el-input type="textarea" :rows="2" v-model="formUnFroze.freezeCauseRemark"  :maxlength="100"></el-input>
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

import {data_get_shipper_list,data_get_shipper_freezeType,data_get_shipper_type} from '../../../api/users/shipper/all_shipper.js'
import createdDialog from './createdDialog'
import FreezeDialog from './FreezeDialog'
import shipperBlackDialog from './shipperBlackDialog'
import GetCityList from '@/components/GetCityList'
export default {
  components:{
    createdDialog,
    FreezeDialog,
    shipperBlackDialog,
    GetCityList
  },
  data(){
    return{
      optionsReason:[],
      unfrozeDialogFlag:false,
      options:[],
      tableData:[],
      page:1,
      totalCount:null,
      page:1,
      pagesize:20,
      formAll:{
        belongCity:null,
        companyName:'',
        mobile:''
      },
      centerDialogVisible:false,// 提示语的弹窗控制
      information:null, // 弹框显示的信息
      multipleSelection:[],
      selectRowData:{},
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
        attestationStatus:null,
        freezeCause:'',
        freezeCauseRemark:''
      },
      formLabelWidth:'120px',
      pickerOptions:{
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
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
      this.multipleSelection = val;
      if(val[0]){
        // 对弹框的赋值处理
        this.selectRowData=val[0]
        this.formUnFroze=val[0]
      } else {
        this.selectRowData = {}
         this.formUnFroze= {}
      }
    },
    // 解冻
    handleUnfroze(){
        console.log(this.multipleSelection)
      if(this.multipleSelection.length == 0){
          //未选择任何修改内容的提示
          let information = "未选中任何修改内容";
          this.hint(information);
      }else if(this.multipleSelection.length >1){
          let information = "不可修改多个内容";
          this.hint(information);
      } else{
        this.unfrozeDialogFlag=true
      }
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
        belongCity:'',
        mobile:'',
        companyName:''
      }
    },
    handleChange(value){
      console.log(value)
    },

      // 页码
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize=val
      this.firstblood()
    },

    //页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page=val
      this.firstblood()
    },
    getDataList(){
      this.firstblood()
    },
     getMoreInformation(){
      //获取货主类型
      data_get_shipper_type().then(res=>{
        // console.log(res)
        res.data.map((item)=>{
        this.options.push(item)
        })
      }),

      // 获取冻结原因下拉
      data_get_shipper_freezeType().then(res=>{
        // console.log(res)
        res.data.map((item)=>{
          this.optionsReason.push(item)
        })
      })
    },
    onSave(){
      this.$refs['formUnFroze'].validate((valid)=>{
        if(valid){
          this.formUnFroze.belongCity = this.$refs.area.selectedOptions.pop();
          var forms= Object.assign({}, this.formUnFroze,{attestationStatus:"AF0010403"})
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
    getListData(){
      this.firstblood()
    }
  }
}
</script>

