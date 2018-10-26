<template>
    <div class="identicalStyle" v-loading="loading">
              <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
                <el-form-item label="所在地：">
                <GetCityList ref="area" v-model="formInline.belongCityName"  @returnStr="getStr"></GetCityList>
                </el-form-item>
                <el-form-item label="车牌号：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.carNumber" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.driverMobile" clearable v-numberOnly></el-input>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" plain @click="getdata_search" :size="btnsize" icon="el-icon-search">搜索</el-button>
                    <el-button type="info" plain :size="btnsize" @click="clearSearch"  icon="fontFamily aflc-icon-qingkong">清空</el-button>
                </el-form-item>
            </el-form>

            <div class="classify_info">
                <div class="btns_box">
                    <driver-newTemplate
                    btntext="代客认证"
                    :plain="true"
                    type="primary"
                    btntype="primary"
                    icon="el-icon-check"
                    editType="valetAuth"
                    :templateItem="selectionData"
                    btntitle="代客认证"
                    @getData="getDataList"
                    v-has:DRIVER_MANAGE_VALET_VALIDATED
                    >
                    </driver-newTemplate>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        highlight-current-row
                        current-row-key
                        @selection-change="getSelection" 
                        @row-click="clickDetails"
                        tooltip-effect="dark"
                        style="width: 100%">
                         <el-table-column
                            label="选择"
                            type="selection"
                            width="50">
                        </el-table-column>
                        <el-table-column label="序号" sortable  width="80">
                            <template slot-scope="scope">
                                {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
                        </el-table-column> 
                        <el-table-column
                        prop="carNumber"
                        sortable
                        label="车牌号">
                     <template slot-scope="scope">
                    <driver-newTemplate         
                    btntype="text"           
                    :btntext="scope.row.carNumber"
                    editType="view"
                    :paramsView="scope.row"
                    btntitle="详情"
                    @getData="getDataList"
                    >
                    </driver-newTemplate>
                              </template>
                        </el-table-column>
                        <el-table-column
                        prop="driverMobile"
                        sortable
                        label="手机号">
                        </el-table-column>
                        <el-table-column
                        prop="driverName"
                        label="车主"
                        sortable
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="registerOriginName"
                        sortable
                        label="注册来源">
                        </el-table-column>
                        <el-table-column
                        prop="belongCityName"
                        sortable
                        label="所在地">
                        </el-table-column>
                        <el-table-column
                        prop="authenticationTime"
                        sortable
                        label="提交认证时间">
                        <template  slot-scope="scope">
                            <span v-if="scope.row.authenticationTime">{{ scope.row.authenticationTime | parseTime}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="authNoPassTime"
                        sortable
                        label="认证不通过时间">
                        <template  slot-scope="scope">
                            <span v-if="scope.row.authNoPassTime">{{ scope.row.authNoPassTime | parseTime}}</span>
                        </template>
                        </el-table-column>
                    </el-table>
                        
<div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>   
                </div>
            </div>
    </div>
</template>
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status} from '../../../api/users/carowner/total_carowner.js'
    import GetCityList from '@/components/GetCityList/city'
    import { eventBus } from '@/eventBus'
    import { parseTime,formatTime } from '@/utils/index.js'
    import DriverNewTemplate from '../carowner/driver-newTemplate'
    import Pager from '@/components/Pagination/index'
    export default {
        props: {
            isvisible: {
                type: Boolean,
                default: false
            }
        },
        components:{
            GetCityList,
            DriverNewTemplate,
            Pager
        },
        data(){
            return{
                loading:true,
                btnsize:'mini',
                page:1,//当前页
                pagesize:20,//每页显示数
                totalCount:null,//总记录数
                formInline: {//查询条件
                    driverMobile:null,
                    driverStatus:'AF0010404',
                    carNumber:null,
                    belongCity:null,
                    belongCityName:null,

                },
                tableDataTree:[],//定义列表记录
                optionsService:[//状态
                     {
                    code:null,
                    name:'全部'
                    }
                ],
                selectionData:null,
            }
        },
        watch: {
            isvisible: {
                handler(newVal, oldVal) {
                    
                    if(newVal && !this.inited){
                        this.inited = true
                        this.firstblood()
                        this.getMoreInformation()
                    }
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: true
            }
        },
        created() {
            
        },
        mounted(){
            eventBus.$on('changeListtwo', ()=>{
                if(this.inited || this.isvisible){
                    this.firstblood()
                    this.getMoreInformation()
                }
            })

        },
  
        methods:{
            getStr(val){
                this.formInline.belongCity = val.area.code;
            },
            clearSearch(){
                this.formInline={//查询条件
                    driverMobile:null,
                    driverStatus:'AF0010404',
                    carNumber:null,
                    belongCity:null,
                    belongCityName:null,
                }
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
             this.$refs.area.clearData()   
             this.firstblood()    
            },
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            // 判断选中与否
            getSelection(val){
                console.log('选中内容',val)
                this.selectionData = val;
            },

            //刷新页面
            firstblood(){
                this.loading = true
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                    this.loading = false
                })
            },
            //点击查询按纽，按条件查询列表
            getdata_search(event){
            this.firstblood()
            },

            //获取车主状态列表
            getMoreInformation(){
                data_get_driver_status().then(res=>{
                    res.data.map((item)=>{
                        this.optionsService.push(item);
                    })
                })
            },

            getDataList(){
                this.firstblood()
            } 
        }
        
    }
</script>