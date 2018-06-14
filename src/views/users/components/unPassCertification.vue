<template>
    <div>
         <div class="shipper_searchinfo">
              <el-form inline>
                <el-form-item label="所在地：">
                     <GetCityList v-model="formInline.belongCity" ref="area"></GetCityList>
                </el-form-item>
                <el-form-item label="车牌号：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.carNumber" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.driverMobile" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="getdata_search">查询</el-button>
                    <el-button type="info" plain>清空</el-button>
                </el-form-item>
            </el-form>
                <!-- <label>所在地：
                    <el-input
                      placeholder="请输入内容"
                      v-model="formInline.belongCity"
                      clearable>
                    </el-input>
                </label>
                <label>车牌号：
                    <el-input
                      placeholder="请输入内容"
                      v-model="formInline.carNumber"
                      clearable>
                    </el-input>
                </label>
                <label>手机号：
                    <el-input
                      placeholder="请输入内容"
                      v-model="formInline.driverMobile"
                      clearable>
                    </el-input>
                </label>
                <el-button type="primary" plain @click="getdata_search">查询</el-button>
                <el-button type="info" plain>清空</el-button> -->
            </div>
            <div class="export">
                <!-- <el-button type="info">新增</el-button> -->
                <el-button type="primary" plain @click="handleEnsure">代客认证</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableDataTree"
                    stripe
                    border
                    @selcection-change="handleSelectionChange"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                      type="selection"
                      width="80">
                    </el-table-column>
                     <el-table-column
                      prop="carNumber"
                      label="车牌号">
                    </el-table-column>
                    <el-table-column
                      prop="driverMobile"
                      label="手机号">
                    </el-table-column>
                    <el-table-column
                      prop="driverName"
                      label="车主"
                      width="200">
                    </el-table-column>
                      <el-table-column
                      prop="registerOrigin"
                      label="注册来源">
                    </el-table-column>
                    <el-table-column
                      prop="belongCity"
                      label="所在地">
                    </el-table-column>
                    <el-table-column
                      prop="authenticationTime"
                      label="提交认证时间">
                    </el-table-column>
                    <el-table-column
                      prop="authNoPassTime"
                      label="认证不通过时间">
                    </el-table-column>
                    <!-- <el-table-column
                      prop="driverStatus"
                      label="操作">
                      <template slot-scope="scope">
                          <el-button type="text">代客认证</el-button>
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
    </div>
</template>
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status} from '../../../api/users/carowner/total_carowner.js'
    import GetCityList from '@/components/GetCityList'
    export default {
        components:{
            GetCityList
        },
        data(){
            return{
                page:1,//当前页
                pagesize:20,//每页显示数
                totalCount:null,//总记录数
                formInline: {//查询条件
                    driverMobile:'',
                    belongCity:'',
                    driverStatus:'AF0010404',
                    carNumber:''
                },
                tableDataTree:[],//定义列表记录
                optionsService:[//状态
                     {
                    code:null,
                    name:'全部'
                    }
                ],
                multipleSelection:[],
            }
        },
        mounted(){
            this.firstblood()
            this.getMoreInformation()
        },  
        methods:{
            // 判断选中与否
            handleSelectionChange(val){
                this.multipleSelection = val;
            },

            // 代客认证功能
            handleEnsure(){
                console.log('代客认证功能')
            },

            //刷新页面
            firstblood(){
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                })
            },

            //点击查询按纽，按条件查询列表
            getdata_search(event){
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.dataTotal = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                })
            },

            //获取车主状态列表
            getMoreInformation(){
                data_get_driver_status().then(res=>{
                    res.data.map((item)=>{
                        this.optionsService.push(item);
                    })
                })
            },

             //每页显示数据量变更
            handleSizeChange: function(val) {
                this.pagesize = val;
                this.firstblood()
            },

            //页码变更
            handleCurrentChange: function(val) {
                this.page = val;
                this.firstblood()
            },  
        }
        
    }
</script>