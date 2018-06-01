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
            label="序号">
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
            width="250">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">代客认证</el-button>
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
      </div>
    </div>
</template>
<script>
import {data_get_shipper_list} from '../../../api/users/shipper/all_shipper.js'
export default {
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
    }
}
</script>

