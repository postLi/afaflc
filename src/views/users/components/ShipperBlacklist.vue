<template>
  <div>
      <div class="shipper_searchinfo">
      <label>所在地：
      <el-cascader
        :options="options"
        v-model="formAll.selectedOptions6"
        @change="handleChange">
      </el-cascader>
      </label>
      <label>公司名称:
        <el-input v-model="formAll.companyName"></el-input>
      </label>
      <label>手机号码：
        <el-input v-model="formAll.phone"></el-input>
      </label>
        <el-button type="primary" plain @click="getdata_search">查询</el-button>
          <el-button type="info" plain @click="clearSearch">清空</el-button>
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
          @selection-chang="handleSelectionChange"
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
          <el-table-column prop="shipperType" label="货主类型">
          </el-table-column>
          <el-table-column prop="shipperType" label="移入黑名单时间">
          </el-table-column>
          <el-table-column prop="shipperType" label="移入时间">
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
import {data_get_shipper_list} from '../../../api/users/shipper/all_shipper.js'
export default {
  components:{
    createdDialog
  },
  data(){
    return{
      options:[],
      tableData:[],
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
      multipleSelection:[]
    }
  }, 
  mounted(){
    this.firstblood()
  },
  methods:{
    //移除黑名单
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

      }
    },
    // 判断选中值
    handleSelectionChange(val){
      this.multipleSelection = val;
      if(val[0]){
        // 对解冻弹框的赋值处理

      } else {
          this.selectRowData = {}
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize=val
      this.firstblood()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page=val
      this.firstblood()
    }
  }
}
</script>

