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
                    <el-button type="info" plain   @click="clearSearch">清空</el-button>
                </el-form-item>
            </el-form>
            </div>
            <div class="export">
                <!-- <el-button type="primary" plain @click="handleEdit">修改</el-button> -->
                <driver-newTemplate
                 btntext="修改"
                 :plain="true"
                 type="primary" 
                 btntype="primary"
                 icon="el-icon-news"
                 editType="edit"
                 :templateItem="selectionData1"
                 btntitle="修改">
                </driver-newTemplate>

                <!-- <freeze-change-template
                 btntext="冻结"
                 :plain="true"
                 type="primary" 
                 btntype="primary"
                 icon="el-icon-news"
                 editType="edit"
                 btntitle="冻结">

                </freeze-change-template> -->

                <!-- <driver-blackDialog-template
                 btntext="移入黑名单"
                 :plain="true"
                 type="primary" 
                 btntype="primary"
                 icon="el-icon-news"
                 editType="edit"
                 btntitle="移入黑名单">
                </driver-blackDialog-template> -->
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableDataTree"
                    stripe
                    border
                    @selection-change="handleSelectionChange"
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
                      prop="belongCityName"
                      label="所在地">
                    </el-table-column>
                    <el-table-column
                      prop="authPassTime"
                      label="认证通过日期">
                    </el-table-column>
                    <!-- <el-table-column
                      prop=""
                      label="操作">
                      <template slot-scope="scope">
                          <el-button type="text">修改</el-button>
                          <el-button type="text">冻结修改</el-button>
                          <el-button type="text">移入黑名单</el-button>
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
    import { parseTime,formatTime } from '@/utils/index.js'
    import GetCityList from '@/components/GetCityList'
    import DriverNewTemplate from '../carowner/driver-newTemplate'
    // import FreezeChangeTemplate from '../carowner/freeze-change-template'
    // import DriverBlackDialogTemplate from '../carowner/driver-blackDialog-template'
    export default {
        components:{
            GetCityList,
            DriverNewTemplate,
            // FreezeChangeTemplate,
            // DriverBlackDialogTemplate
        },
        data(){
            return{
                page:1,//当前页
                pagesize:20,//每页显示数
                totalCount:null,//总记录数
                formInline: {//查询条件
                    driverMobile:'',
                    belongCity:'',
                    driverStatus:'AF0010403',
                    carNumber:''
                },
                tableDataTree:[],//定义列表记录
                optionsService:[//状态
                     {
                    code:null,
                    name:'全部'
                    }
                ],
                selectionData1:{},
                multipleSelection:[],
            }
        },
        mounted(){
            this.firstblood()
            this.getMoreInformation()
        },  
        methods:{
            clearSearch(){
                this.formInline={//查询条件
                    driverMobile:'',
                    belongCity:'',
                    driverStatus:'',
                    carNumber:''
                }
            },
            // 判断选中与否
            handleSelectionChange(val){
                this.multipleSelection = val;
                if(val[0]){
                    this.selectionData1=val[0]
                } else{
                    this.selectionData1={}
                }
            },

            // 修改功能
            // handleEdit(){
            //     console.log('修改功能')
            // },

            // 修改冻结功能
            // handleFreezeEdit(){
            //     console.log('修改冻结功能') 
            // },

            // 移入黑名单功能
            // handleBlick(){
            //     console.log('移入黑名单功能')
            // },

            //刷新页面
            firstblood(){
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                    this.tableDataTree.forEach(item => {
                        item.authPassTime = parseTime(item.authPassTime,"{y}-{m}-{d}");
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
<style lang="scss">

</style>
