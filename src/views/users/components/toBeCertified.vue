<template>
    <div class="identicalStyle" v-loading="loading">
        <div class="shipper_searchinfo">
            <el-form inline  class="demo-ruleForm classify_searchinfo">
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
                <el-button type="primary" plain @click="getdata_search"  :size="btnsize" icon="el-icon-search">搜索</el-button>
                <el-button type="info" plain @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
            </el-form-item>
        </el-form>
        </div>
        <div class="classify_info">
                <div class="btns_box">
                     <driverCertifyTemplate
                    btntext="认证审核"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-check"
                    :params="selectionData"
                    editType="edit"
                    btntitle="认证审核"
                    v-has:DRIVER_MANAGE_VALIDATED_AUTDIT
                    @getData="getDataList">
                    </driverCertifyTemplate>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        highlight-current-row
                        current-row-key
                        height="100%"
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
                        <el-table-column prop="driverMobile" label="手机号" sortable>
                        <template slot-scope="scoped" >
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
                        <el-table-column label="车牌号" sortable prop="carNumber">
                        </el-table-column>
                        <el-table-column  prop="driverName" label="车主" width="200" sortable></el-table-column>
                        <el-table-column prop="belongCityName" label="所在地" sortable width="160"></el-table-column>
                        <el-table-column
                        prop="belongSalesmanName"
                        label="所属业务员" sortable>
                        </el-table-column>
                        <el-table-column  prop="authenticationTime" label="提交认证时间" sortable>
                        <template  slot-scope="scope">
                            <span v-if="scope.row.authenticationTime">{{ scope.row.authenticationTime | parseTime}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column  prop="waitTime"  label="等待时长" sortable></el-table-column>
                    </el-table>
<div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>                         
                </div>
            </div>
    </div>
</template>
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status,data_post_audit,data_Get_carType,data_CarList,data_get_driver_obStatus} from '../../../api/users/carowner/total_carowner.js'
    import { eventBus } from '@/eventBus'
    import { parseTime } from '@/utils/index.js'
    import Pager from '@/components/Pagination/index'
    import vregion from '@/components/vregion/Region'
    import DriverNewTemplate from '../carowner/driver-newTemplate.vue'
    import driverCertifyTemplate from '../carowner/driver_certifyTemplate.vue'
    import GetCityList from '@/components/GetCityList/city'
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
            Pager,
            driverCertifyTemplate,
            GetCityList
        },
        data(){
            return{
                loading:true,
                pickerOptions:{
                disabledDate(time) {
                return time.getTime() < Date.now();
                }
                },
                btnsize:'mini',
                options:[], //车辆规格下拉列表
                page:1,//当前页
                pagesize:20,//每页显示数
                totalCount:null,//总记录数
                belongCityName:null,
                formInline: {//查询条件
                    driverMobile:null,
                    driverStatus:'AF0010402',
                    carNumber:null,
                    belongCity:null,
                    belongCityName:null,
                },
                selectionData:null,
                tableDataTree:[],//定义列表记录
                optionsService:[//状态
                     {
                    code:null,
                    name:'全部'
                    }
                ],
                optionscarType:[
                    {
                    code:null,
                    name:'全部'
                    }
                ],
                optionscarSpec:[
                    {
                    code:null,
                    name:'全部'
                    }
                ],
                optionsLevel:[
                     {
                    code:null,
                    name:'全部'
                    }  
                ],
            }
        },
        computed: {
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
        mounted(){
         eventBus.$on('changeListtwo', () => {
                this.firstblood()
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
                    driverStatus:'AF0010402',
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


            //刷新页面
            firstblood(){
                this.loading = true
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                this.loading = false
                })
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

                data_CarList().then(res=>{
                    res.data.map((item)=>{
                        this.optionscarType.push(item);
                    })
                })

                data_Get_carType().then(res=>{
                    res.data.map((item)=>{
                        this.optionscarSpec.push(item);
                    })
                })
           // 中单等级的获取
            data_get_driver_obStatus().then(res =>{
                res.data.map(item=>{
                    this.optionsLevel.push(item)
                })
            }).catch(err =>{
                console.log(err)
            })
            },
            changeList(){
                eventBus.$emit('changeListtwo')
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
