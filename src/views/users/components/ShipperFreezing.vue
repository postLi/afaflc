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
        <el-button type="primary" plain>查询</el-button>
        <el-button type="info" plain>清空</el-button>
      </div>
      <div class="info_news">
           <el-table 
            ref="mutipleTable"
            :data="tableData"
            stripe
            border
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column prop="id" label="序号">
            </el-table-column>
            <el-table-column prop="companyName" label="公司名称">
            </el-table-column>
            <el-table-column prop="linkMan" label="联系人">
            </el-table-column>
            <el-table-column prop="home" label="所在地">
            </el-table-column>
            <el-table-column prop="shipperType" label="货主类型">
            </el-table-column>
            <el-table-column prop="freezingDate" label="冻结时间">
            </el-table-column>
            <el-table-column prop="freezingReason" label="冻结原因">
            </el-table-column>
            <el-table-column prop="freezingDate" label="解冻日期">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="250">
                <template slot-scope="scope">
                <el-button type="text" size="small">解冻</el-button>
                <el-button type="text" size="small">冻结修改</el-button>
                <el-button type="text" size="small">移入黑名单</el-button>
                </template>
           </el-table-column>
          </el-table>
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
  </div>    
</template>
<script>
export default {
    data(){
      return{
        options:[],
        tableData:[],
        currentPage4:1,
        total:null,
        page:1,
        pagesize:20,
        formAll:{
          selectedOptions6:null,
          companyName:'',
          phone:''
        }
      }
    },
    methods:{
        handleChange(value){
          console.log(value)
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
    }
}
</script>

