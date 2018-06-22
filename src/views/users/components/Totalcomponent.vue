<template>
    <div>
         <div class="shipper_searchinfo">
            <el-form inline>
                <el-form-item label="所在地：">
                     <GetCityList v-model="formInline.belongCity" ref="area"></GetCityList>
                </el-form-item>
                <el-form-item label="认证状态：">
                    <el-select v-model="formInline.driverStatus" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in optionsService"
                            :key="item.value"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账户状态">
                    <el-select v-model="formInline.accountStatus" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in optionsAuidSataus"
                            :key="item.value"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车牌号：">
                    <el-input v-model.trim="formInline.carNumber" clearable placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.driverMobile" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="getdata_search">查询</el-button>
                    <el-button type="info" plain @click="clearSearch">清空</el-button>
                </el-form-item>
            </el-form>

            </div>
            <div class="export">
                <!-- <el-button type="primary" plain @click="handleCreate">新增</el-button> -->
                <driver-newTemplate
                 btntext="新增"
                 :plain="true"
                 type="primary" 
                 btntype="primary"
                 icon="el-icon-news"
                 editType="add"
                 btntitle="新增车主"
                 @getData="getDataList">
                </driver-newTemplate>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableDataTree"
                    stripe
                    border
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                      type="index"
                      label="序号"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="driverMobile"
                      label="手机号">
                      <template slot-scope="scoped">
                          <driver-newTemplate
                           :templateItem="scoped.row"
                            :btntext="scoped.row.driverMobile"
                            type="primary" 
                            btntype="text"
                            editType="view"
                            btntitle="新增车主">
                            </driver-newTemplate>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="carNumber"
                      label="车牌号">
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
                    <el-table-column prop="accountStatusName" label="账户状态"></el-table-column>
                    <el-table-column
                      prop="belongCityName"
                      label="所在地">
                    </el-table-column>
                    <el-table-column
                      prop="driverStatusName"
                      label="状态">
                    </el-table-column>
                    <el-table-column
                      prop="createTime"
                      label="注册日期">
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
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status,data_get_shipper_auid} from '../../../api/users/carowner/total_carowner.js'
    import DriverNewTemplate from '../carowner/driver-newTemplate'
    import { parseTime,formatTime } from '@/utils/index.js'
    import GetCityList from '@/components/GetCityList'
    export default {
        data(){
            return{
                optionsAuidSataus:[],// 账户状态列表
                page:1,//当前页
                pagesize:20,//每页显示数
                totalCount:null,//总记录数
                formInline: {//查询条件
                    driverMobile:'',
                    belongCity:null,
                    driverStatus:'',
                    carNumber:'',
                    accountStatus:''
                },
                tableDataTree:[],//定义列表记录
                optionsService:[//状态
                    {
                      code:null,
                      name:'全部'
                    }
                ],
                multipleSelection:[],
               // driverNewdailogFlag: false, // 新增弹框控制
               // templateItem:{}, //新增数据填充
            }
        },
        components:{
            GetCityList,
            DriverNewTemplate
        },
        mounted(){
            this.firstblood()
            this.getMoreInformation()
        },  
        methods:{
            clearSearch(){
                this.formInline={
                    driverMobile:'',
                    belongCity:null,
                    driverStatus:'',
                    carNumber:'',
                    accountStatus:''
                }
            },
            // 新增功能
            handleCreate(){
                console.log('新增功能')
            },

            //刷新页面
            firstblood(){
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                    this.tableDataTree.forEach(item => {
                        item.createTime = parseTime(item.createTime,"{y}-{m}-{d}");
                    })
                })
            },

            //点击查询按纽，按条件查询列表
            getdata_search(event){
                this.formInline.belongCity = this.$refs.area.selectedOptions.pop();
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
                // 账户状态获取
                data_get_shipper_auid().then(res=>{
                    console.log(res)
                    res.data.map(item=>{
                    this.optionsAuidSataus.push(item)
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
            getDataList(){
                this.firstblood()
            }
        }
        
    }
</script>
<style lang="scss">
.carOwner .shipper_searchinfo label{
    margin-right: 0;  
}
.el-form--inline .el-form-item {
    margin-right: 0px;
}
</style>
