<template>
    <div>
         <div class="shipper_searchinfo">
            <el-form inline>
                <el-form-item label="所在地：">
                     <GetCityList v-model="formInline.belongCity" ref="area"></GetCityList>
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
            <div class="classify_info">
                <div class="btns_box">
                    <driver-newTemplate
                    btntext="代客认证"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    editType="valetAuth"
                   
                    v-on:click.native="freezeClick"
                    :templateItem="selectionData"
                    btntitle="车主管理"
                    @getData="getDataList">
                    </driver-newTemplate>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        :key="theKeys"
                        border
                        @selection-change="handleSelectionChange"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                        type="selection"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="driverMobile"
                        label="手机号">
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
                        prop="driverStatusName"
                        label="状态">
                        </el-table-column>
                        <el-table-column
                        prop="registerTime"
                        label="注册日期">
                        </el-table-column>
                        <!-- <el-table-column
                        prop=""
                        label="操作">
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
            
    </div>
</template>
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status} from '@/api/users/carowner/total_carowner.js'
    import GetCityList from '@/components/GetCityList'
    import { parseTime,formatTime } from '@/utils/index.js'
    import DriverNewTemplate from '../carowner/driver-newTemplate.vue'
    export default {
        components:{
            GetCityList,
            DriverNewTemplate
        },
        data(){
            return{
                theKeys:'11',
                page:1,//当前页
                pagesize:20,//每页显示数
                totalCount:null,//总记录数
                formInline: {//查询条件
                    driverMobile:'',
                    belongCity:'',
                    driverStatus:'AF0010401',
                    carNumber:''
                },
                tableDataTree:[],//定义列表记录
                optionsService:[//状态
                     {
                    code:null,
                    name:'全部'
                    }
                ],
                selectionData:{},
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
           
            // 判断选中值
            handleSelectionChange(val){
                this.multipleSelection=val
                // console.log(this.multipleSelection.length)
                if(val[0]){
                    this.selectionData=val[0]
                } else{
                   this.selectionData={}
                }
            },

            //代客认证功能
            handleCertification(){
                console.log('代客认证功能')
            },
            freezeClick(){
                
            },
            //刷新页面
            firstblood(){
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.totalCount = res.data.totalCount;
                    this.theKeys=Math.random()
                    this.tableDataTree = res.data.list;
                     this.tableDataTree.forEach(item => {
                        item.registerTime = parseTime(item.registerTime,"{y}-{m}-{d}");
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
            getDataList(){
                 this.firstblood()
            } 
        } 
    }
</script>