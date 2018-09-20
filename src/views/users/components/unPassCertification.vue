<template>
    <div class="identicalStyle">
              <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
                <el-form-item label="所在地：">
                     <vregion :ui="true"  @values="regionChange" class="form-control">
                        <el-input v-model="formInline.belongCity" placeholder="请选择"></el-input>
                    </vregion>
                </el-form-item>
                <el-form-item label="车牌号：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.carNumber" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.driverMobile" clearable></el-input>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" plain @click="getdata_search" :size="btnsize">查询</el-button>
                    <el-button type="info" plain :size="btnsize">清空</el-button>
                </el-form-item>
            </el-form>

            <div class="classify_info">
                <div class="btns_box">
                    <driver-newTemplate
                    btntext="代客认证"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    editType="valetAuth"
                    :templateItem="selectionData"
                    btntitle="车主管理"
                    @getData="getDataList"
                    :updataflag="true"
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
                        @row-click="clickDetails"
                        tooltip-effect="dark"
                        style="width: 100%">
                      <!--   <el-table-column
                      type="selection"
                      width="80">
                      </el-table-column> -->
                      <el-table-column
                        type="index"
                        label="序号"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="carNumber"
                        label="车牌号">
                     <template slot-scope="scope">
                    <driver-newTemplate         
                    btntype="text"           
                    :btntext="scope.row.carNumber"
                    editType="view"
                    :templateItem="scope.row"
                    btntitle="详情"
                    >
                    </driver-newTemplate>
                              </template>
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
                        prop="registerOriginName"
                        label="注册来源">
                        </el-table-column>
                        <el-table-column
                        prop="belongCityName"
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
                    </el-table>
                        
<div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>   
                </div>
            </div>
    </div>
</template>
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status} from '../../../api/users/carowner/total_carowner.js'
    import vregion from '@/components/vregion/Region'
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
            vregion,
            DriverNewTemplate,
            Pager
        },
        data(){
            return{
                btnsize:'mini',
                page:1,//当前页
                pagesize:20,//每页显示数
                totalCount:null,//总记录数
                formInline: {//查询条件
                    driverMobile:null,
                    belongCity:null,
                    areaCode:null,
                    driverStatus:'AF0010404',
                    carNumber:null
                },
                tableDataTree:[],//定义列表记录
                optionsService:[//状态
                     {
                    code:null,
                    name:'全部'
                    }
                ],
                selectionData:null,
                multipleSelection:[],
                ifInformation:'选中一个才可以操作',
                
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
            regionChange(d) {
                console.log('data:',d)
                this.formInline.belongCity = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                if(d.area){
                    this.formInline.areaCode = d.area.code;
                }else if(d.city){
                    this.formInline.areaCode = d.city.code;
                }
                else{
                    this.formInline.areaCode = d.province.code;
                }
            },
             getValue(obj){
                return obj ? obj.value:'';
            },
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.selectionData = row
            },

            //刷新页面
            firstblood(){
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                    this.tableDataTree.forEach(item => {
                        item.authenticationTime = parseTime(item.authenticationTime,"{y}-{m}-{d}");
                        item.authNoPassTime = parseTime(item.authNoPassTime,"{y}-{m}-{d}");
                    })
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