<template>
    <div>
        <div class="shipper_searchinfo">
        <label>所在地：
          <el-cascader
            :options="options"
            v-model="formInline.belongCity"
            @change="handleChange">
          </el-cascader>
        </label>
        <label>手机号码：
          <el-input
            placeholder="请输入内容"
            v-model="formInline.mobile"
            clearable>
          </el-input>
        </label>
        <el-button type="primary" plain @click="getdata_search">查询</el-button>
        <el-button type="info" plain @click="clearSearch">清空</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData4"
          stripe
          border
          tooltip-effect="dark"
          style="width: 100%" >
          <el-table-column
            type="index"
            label="序号"
            width="80px">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="registerOrigin"
            label="注册来源">
          </el-table-column>
          <el-table-column
            prop="attestationStatus"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="belongCity"
            label="所在地">
          </el-table-column>
          <el-table-column
            prop="shipperType"
            label="货主类型">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="注册日期">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="300">
            <template slot-scope="scope">
              <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">代客认证</el-button> -->
               <createdDialog :params="scope.row" btntype="text" btntext="代客认证" editType="edit" btntitle="代客提交" @getData="getDataList"></createdDialog>
              <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">冻结</el-button>
              <el-button type="text" size="small">移入黑名单</el-button>
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

      <!-- 修改 -->
       <div class="addclassify commoncss">
          <el-dialog title="修改" :visible.sync="changeDialogFlag">
            <el-form :model="forms" ref="forms">
              <el-form-item label="手机号码" :label-width="formLabelWidth" required>
                <el-input v-model="forms.mobile"></el-input>
              </el-form-item>
              <el-form-item label="联系人" :label-width="formLabelWidth">
                <el-input v-model="forms.contacts"></el-input>
              </el-form-item>
              <el-form-item label="所在地" :label-width="formLabelWidth" required>
                <el-input v-model="forms.belongCity"></el-input>
              </el-form-item>
              <el-form-item label="详细地址" :label-width="formLabelWidth">
                <el-input v-model="forms.address" :maxlength="20"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="onSubmit">确 定</el-button>
              <el-button @click="changeDialogFlag = false">取 消</el-button>
            </div>
          </el-dialog>
       </div>
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
      tableData4:[],
      totalCount:null,
      page:1,
      pagesize:20,
      formInline: {
        belongCity:null,
        mobile:''
      },
      formLabelWidth:'120px',
      changeDialogFlag: false,
      forms:{
        mobile:'',
        contacts:'',
        belongCity:null,
        address:''
      }
    }
  },
  mounted(){
    this.firstblood()
  },
  methods:{
      //点击查询按纽，按条件查询列表
    getdata_search(event){
      data_get_shipper_list(this.page,this.pagesize,this.formInline).then(res=>{
        this.totalCount = res.data.totalCount;
        this.tableDataAll = res.data.list;
      })
    },
    
    //清空
    clearSearch(){
      this.formInline = {
        belongCity:'',
        mobile:''
      }
    },
      //刷新页面
    firstblood(){
      data_get_shipper_list(this.page,this.pagesize,this.formInline).then(res=>{
        console.log(res)
        this.totalCount = res.data.totalCount;
        this.tableData4 = res.data.list;
      })
    },
    handleChange(value){
      console.log(value)
    },
    handleClick(){
      this.changeDialogFlag= true
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
    //提交
    onSubmit(){
    console.log(this.forms)
    }
  }
}
</script>

