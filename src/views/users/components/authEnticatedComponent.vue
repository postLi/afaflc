<template>
    <div class="identicalStyle" v-loading="loading">
              <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
                <el-form-item label="所在地">
                <GetCityList ref="area" v-model="belongCityName"  @returnStr="getStr"></GetCityList>    
                <!-- <vregion :ui="true"  @values="regionChange" class="form-control">
                    <el-input v-model="belongCityName" placeholder="请选择"></el-input>
                </vregion> -->
                </el-form-item>
                <el-form-item label="车牌号">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.carNumber" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.driverMobile" clearable v-numberOnly  maxlength="11"></el-input>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" plain @click="getdata_search" :size="btnsize" icon="el-icon-search">搜索</el-button>
                    <el-button type="info" plain   @click="clearSearch" :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
                </el-form-item>
            </el-form>       
            <div class="classify_info">
                <div class="btns_box">
                    <driver-newTemplate
                    btntext="修改"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-edit-outline"
                    editType="edit"
                    :templateItem="selectionData"
                    btntitle="修改"
                    @getData="getDataList"
                    v-has:DRIVER_MANAGE_UPDATE
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
                        height="100%"
                        @selection-change="getSelection" 
                        @row-click="clickDetails"
                        current-row-key
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
                        prop="driverMobile"
                        sortable
                        label="手机号">
                        <template slot-scope="scope">
                        <driver-newTemplate         
                        btntype="text"           
                        :btntext="scope.row.driverMobile"
                        editType="view"
                        :paramsView="scope.row"
                        btntitle="详情">
                        </driver-newTemplate>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="carNumber"
                        sortable
                        label="车牌号">
                        </el-table-column>
                        <el-table-column
                        prop="driverName"
                        sortable
                        label="车主"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="registerOriginName"
                        sortable
                        label="注册来源">
                        </el-table-column>
                        <el-table-column
                        width="160"
                        prop="belongCityName"
                        sortable
                        label="所在地">
                        </el-table-column>
                        <el-table-column
                        prop="belongSalesmanName"
                        label="所属业务员" sortable>
                        </el-table-column>
                        <el-table-column
                        prop="authPassTime"
                        sortable
                        label="认证通过日期">
                        <template  slot-scope="scope">
                            <span v-if="scope.row.authPassTime">{{ scope.row.authPassTime | parseTime}}</span>
                        </template>
                        </el-table-column>
                    </el-table>
                        
<div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange"  pager/></div> </div>   
                </div>
            </div>
    </div>
</template>
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status} from '../../../api/users/carowner/total_carowner.js'
    import { eventBus } from '@/eventBus'
    import { parseTime,formatTime } from '@/utils/index.js'
    import vregion from '@/components/vregion/Region'
    import Pager from '@/components/Pagination/index'
    import DriverNewTemplate from '../carowner/driver-newTemplate'
    import GetCityList from '@/components/GetCityList/city'    
    export default {
        props: {
            isvisible: {
                type: Boolean,
                default: false
            }
        },
        components:{
            vregion,
            Pager,
            DriverNewTemplate,
            GetCityList
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
                    driverStatus:'AF0010403',
                    carNumber:null,
                    belongCity:null,
                    belongCityName:null,
                },
                 belongCityName:null,
                tableDataTree:[],//定义列表记录
                optionsService:[//状态
                     {
                    code:null,
                    name:'全部'
                    }
                ],
                selectionData:null,
                multipleSelection:[],
            }
        },
        watch: {
        },
        mounted(){
            this.firstblood()
          eventBus.$on('changeListtwo', ()=>{
                if(this.inited || this.isvisible){
                    this.firstblood()
                    this.selectionData = null
                }
          })
        },
 
        methods:{
            // regionChange(d) {
            //     console.log('data:',d)
            //     this.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            //     if(d.area){
            //         this.formInline.areaCode = d.area.name;
            //     }else if(d.city){
            //         this.formInline.cityCode = d.city.name;
            //     }
            //     else{
            //         this.formInline.provinceCode = d.province.name;
            //     }
            // },
            //  getValue(obj){
            //     return obj ? obj.value:'';
            // },
        getStr(val){
                    console.log('this.cityarr',val,name)
                    this.belongCityName = val.province.name+val.city.name+val.area.name
                    this.formInline.areaCode = val.area.name;
                }, 

            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },                 
            clearSearch(){
                this.formInline={//查询条件
                    driverMobile:null,
                    driverStatus:'AF0010403',
                    carNumber:null,
                    belongCity:null,
                    belongCityName:null,                    
                }
                this.belongCityName=null
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
            }
            this.$refs.area.clearData();
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
                this.loading = true;
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                    this.loading = false;
                })
            },
            //点击查询按纽，按条件查询列表
            getdata_search(event){
                this.page = 1;
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
                 this.$refs.multipleTable.clearSelection();
            } 
        }
        
    }
</script>
<style lang="scss">

</style>
