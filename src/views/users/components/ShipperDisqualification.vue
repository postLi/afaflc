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
            <label>公司名称：
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
                :data="tableData1"
                stripe
                border
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column prop="id" label="序号">
                </el-table-column>
                <el-table-column prop="company" label="公司名称">
                </el-table-column>
                <el-table-column prop="phone" label="联系人">
                </el-table-column>
                <el-table-column prop="phone" label="手机号">
                </el-table-column>
                <el-table-column prop="phone" label="注册来源">
                </el-table-column>
                <el-table-column prop="phone" label="所在地">
                </el-table-column>
                <el-table-column prop="phone" label="提交认证时间">
                </el-table-column>
                <el-table-column prop="phone" label="审核不通过时间">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="250">
                    <template slot-scope="scope">
                    <el-button type="text" size="small">代客认证</el-button>
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
            tableData1:[],
            total:null,
            currentPage4:1,
            options:[],
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

