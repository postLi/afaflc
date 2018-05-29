<template>
    <div>
         <div class="shipper_searchinfo">
                <label>手机号码：
                    <el-input
                      placeholder="请输入内容"
                      v-model="formInline.phone"
                      clearable>
                    </el-input>
                </label>
                <label>公司名称：
                    <el-input
                      placeholder="请输入内容"
                      v-model="formInline.company"
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
                <label>所在地：
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </label>
                <el-button type="info" plain>查询</el-button>
                <el-button type="info" plain>清空</el-button>
            </div>
            <div class="export">
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
                      prop="id"
                      label="序号">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="公司名称">
                    </el-table-column>
                    <el-table-column
                      prop="side"
                      label="联系人">
                    </el-table-column>
                    <el-table-column
                      prop="bumen"
                      label="手机号"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="zhiwu"
                      label="提交认证时间">
                    </el-table-column>
                    <el-table-column
                      prop="load"
                      label="等待时长">
                    </el-table-column>
                    <el-table-column
                      prop="quanxian"
                      label="长发货物">
                    </el-table-column>
                    <el-table-column
                      prop="sex"
                      label="所在地">
                    </el-table-column>
                    <el-table-column
                      prop="phone"
                      label="货主类型"
                      >
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                          <el-button
                                @click="dialogFormVisible = true">审核</el-button>
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
<script type="text/javascript">
    
    export default {
        data:function(){
            return{
                page:1,
                pagesize:20,
                total:null,
                tableData3:[],
                currentPage4:1,
                formInline: {
                    phone:'',
                    company:'',
                    contacts:'',
                    region:''
                },

            }
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

        }
        
    }
</script>