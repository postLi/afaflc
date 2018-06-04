<template>
    <div>
        <div class="shipper_searchinfo">
            <label>手机号码：
                <el-input
                    placeholder="请输入内容"
                    v-model="formInline.mobile"
                    clearable>
                </el-input>
            </label>
            <label>公司名称：
                <el-input
                    placeholder="请输入内容"
                    v-model="formInline.companyName"
                    clearable>
                </el-input>
            </label>
            <label>联系人姓名：
                <el-input
                    placeholder="请输入内容"
                    v-model="formInline.contacts"
                    clearable>
                </el-input>
            </label>
            <label>货主类型：
                <el-select v-model="formInline.shipperType" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </label>
            <el-button type="primary" plain @click="getdata_search">查询</el-button>
           <el-button type="info" plain @click="clearSearch">清空</el-button>
        </div>
        <div class="export">
            <el-button type="info">新增</el-button>
            <el-button type="info">导出</el-button>
        </div>
        <div class="info_news">
            <el-table
                ref="multipleTable"
                :data="tableData3"
                stripe
                border
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="companyName"
                    label="公司名称">
                </el-table-column>
                <el-table-column
                    prop="contants"
                    label="联系人">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="手机号"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="zhiwu"
                    label="所属组织">
                </el-table-column>
                <el-table-column
                    prop="load"
                    label="常发货物">
                </el-table-column>
                <el-table-column
                    prop="quanxian"
                    label="认证通过时间">
                </el-table-column>
                <el-table-column
                    prop="belongCity"
                    label="所在地">
                </el-table-column>
                <el-table-column
                    prop="shipperType"
                    label="货主类型"
                    >
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="400">
                    <template slot-scope="scope">
                        <el-button type="text"
                            @click="dialogFormVisible_prove = true">详情</el-button>
                        <el-button type="text"
                            @click="dialogFormVisible = true">修改</el-button>
                        <el-button type="text"
                            @click="dialogFormVisible = true">冻结</el-button>
                        <el-button type="text"
                            @click="dialogFormVisible = true">移入黑名单</el-button>
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
        return {
            tableData3:[],
            totalCount:null,
            page:1,
            pagesize:20,
            formInline:{
             mobile:'',
             companyName:'',
             contacts:'',
             shipperType:''
            }
        }
    },
    mounted(){
      this.firstblood()
    },
    methods:{
        //刷新页面
      firstblood(){
        data_get_shipper_list(this.page,this.pagesize,this.formInline).then(res=>{
          console.log(res)
          this.totalCount = res.data.totalCount;
          this.tableData3 = res.data.list;
        })
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
          mobile:'',
          companyName:'',
          shipperType:''
        }
      },
    }
}
</script>

