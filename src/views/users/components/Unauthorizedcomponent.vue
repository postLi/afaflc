<template>
    <div class="identicalStyle" v-loading="loading">
         <div class="shipper_searchinfo">
            <el-form inline  class="demo-ruleForm classify_searchinfo">
                <el-form-item label="所在地：">
                <vregion :ui="true"  @values="regionChange" class="form-control">
                    <el-input v-model="belongCityName" placeholder="请选择"></el-input>
                </vregion>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.driverMobile" clearable v-numberOnly></el-input>
                </el-form-item>
                <el-form-item class="fr"> 
                    <el-button type="primary" plain @click="getdata_search" :size="btnsize" icon="el-icon-search">搜索</el-button>
                    <el-button type="info" plain @click="clearSearch" :size="btnsize"  icon="fontFamily aflc-icon-qingkong">清空</el-button>
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
                    icon="el-icon-check"
                    editType="valetAuth"
                    :templateItem="selectionData"
                    btntitle="代客认证"
                    @getData="getDataList"
                    :updataflag="true"
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
                        height="100%"
                        highlight-current-row
                        current-row-key
                        tooltip-effect="dark"
                        @selection-change="getSelection"
                        @row-click="clickDetails"
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
                        label="手机号"
                        sortable
                        >
                        <template slot-scope="scoped">
                            <driver-newTemplate
                            :paramsView="scoped.row"
                                :btntext="scoped.row.driverMobile"
                                type="primary" 
                                btntype="text"
                                editType="view"
                                btntitle="车主详情">
                                </driver-newTemplate>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="carNumber"
                        label="车牌号"
                        sortable
                        >
                        </el-table-column>
                        <el-table-column
                        prop="driverName"
                        label="车主"
                        width="200"
                        sortable
                        >
                        </el-table-column>
                        <el-table-column
                        prop="registerOriginName"
                        label="注册来源"
                        sortable
                        >
                        </el-table-column>
                        <el-table-column prop="accountStatusName" label="账户状态" sortable>
                      <template slot-scope="scope">
                        <span :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}">{{scope.row.accountStatusName}}</span>
                      </template>
                        </el-table-column>
                        <el-table-column
                        prop="belongCityName"
                        label="所在地" sortable>
                        </el-table-column>
                        <el-table-column
                        prop="driverStatusName"
                        label="状态" sortable>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        label="注册日期" sortable>
                     <template  slot-scope="scope">
                        <span v-if="scope.row.createTime">{{ scope.row.createTime | parseTime}}</span>
                    </template>
                        </el-table-column>
                    </el-table>
    <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>   
                </div>
            </div>
    </div>
</template>
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status} from '@/api/users/carowner/total_carowner.js'
    import vregion from '@/components/vregion/Region'
    import { eventBus } from '@/eventBus'
    import { parseTime,formatTime } from '@/utils/index.js'
    import Pager from '@/components/Pagination/index'
    import DriverNewTemplate from '../carowner/driver-newTemplate.vue'
    export default {
        props: {
            isvisible: {
                type: Boolean,
                default: false
            }
        },
        components:{
            DriverNewTemplate,
            vregion,
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
                    driverStatus:'AF0010401',
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
                selectionData:[],
            }
        },
        created() {
          
        },
        watch: {
        },
        mounted(){
            this.firstblood()
          eventBus.$on('changeListtwo', ()=>{
              if(this.inited || this.isvisible){
                this.firstblood()
              }
          })
        },
         
        methods:{
            regionChange(d) {
                console.log('data:',d)
                this.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                if(d.area){
                    this.formInline.areaCode = d.area.name;
                }else if(d.city){
                    this.formInline.cityCode = d.city.name;
                }
                else{
                    this.formInline.provinceCode = d.province.name;
                }
            },
             getValue(obj){
                return obj ? obj.value:'';
            },
            clearSearch(){
                this.formInline={//查询条件
                    driverMobile:null,
                    driverStatus:'AF0010401',
                    carNumber:null,
                    belongCity:null,
                    belongCityName:null,
                }
                this.belongCityName=null
                if(this.page!= 1){
                    this.page = 1;
                }
                this.firstblood();
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
                    //  this.tableDataTree.forEach(item => {
                    //     item.registerTime = parseTime(item.registerTime,"{y}-{m}-{d}");
                    // })
                    this.loading = false;
                })
            },
            //点击查询按纽，按条件查询列表
            getdata_search(event){
                this.page = 1;              
                this.firstblood();
            },
            //获取车主状态列表
            getMoreInformation(){
                data_get_driver_status().then(res=>{
                    res.data.map((item)=>{
                        this.optionsService.push(item);
                    })
                })
            },
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },

            getDataList(){
                 this.firstblood()
                 this.$refs.multipleTable.clearSelection();
            } 
        } 
    }
</script>