<template>
    <div style="height:100%;" class="identicalStyle">
            <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
                <el-form-item label="所在地：">
                    <vregion :ui="true"  @values="regionChange" class="form-control">
                        <el-input v-model="formInline.belongCityName" placeholder="请选择"></el-input>
                    </vregion>
                </el-form-item>
                <el-form-item label="认证状态：">
                    <el-select v-model="formInline.driverStatus" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in optionsService"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账户状态：">
                    <el-select v-model="formInline.accountStatus" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in optionsAuidSataus"
                            :key="item.id"
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
                    <el-input placeholder="请输入内容" v-model.trim="formInline.driverMobile" clearable ></el-input>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" plain @click="getdata_search"  :size="btnsize" icon="el-icon-search">搜索</el-button>
                    <el-button type="info" plain  @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
                </el-form-item>
            </el-form>
            <div class="classify_info">
                <div class="btns_box">
                    <driver-newTemplate
                    btntext="新增"
                    v-has:DRIVER_MANAGE_ADD
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-circle-plus"
                    editType="add"
                    btntitle="新增车主"
                    @getData="getDataList">
                    </driver-newTemplate>
                    <freeze-change-template
                    btntext="冻结"
                    type="primary" 
                    v-has:DRIVER_MANAGE_FREEZE
                    btntitle="冻结"
                    :plain="true"
                    editType='edit'
                    btntype="primary"
                    icon="fontFamily aflc-icon-dongjie1"
                    :params="selectRowData"
                    @getData="getDataList" 
                    >
                    </freeze-change-template>
                    <freeze-change-template
                    btntext="冻结修改"
                    type="primary" 
                    v-has:DRIVER_MANAGE_FREEZE_UPDATE
                    btntitle="冻结修改"
                    :plain="true"
                    editType='edit-two'
                    btntype="primary"
                    icon="el-icon-edit"
                    :params="selectRowData"
                    @getData="getDataList"
                    >
                    </freeze-change-template>
                    <freeze-change-template
                    btntext="解冻"
                    v-has:DRIVER_MANAGE_UNFREEZE
                    type="primary" 
                    btntitle="解冻"
                    :plain="true"
                    editType='edit-three'
                    btntype="primary"
                    icon="fontFamily aflc-icon-jiedong1"
                    :params="selectRowData"
                    @getData="getDataList"
                    >
                    </freeze-change-template>
                    <blacklist
                    btntext="移入黑名单"
                    v-has:DRIVER_MANAGE_PUT_BLACK
                    type="primary" 
                    btntitle="移入黑名单"
                    :plain="true"
                    editType='edit-four'
                    btntype="primary"
                    icon="fontFamily aflc-icon-heimingdan"
                    :params="selectRowData"
                    @getData="getDataList"
                    >
                    </blacklist>
                     <blacklist
                    btntext="移除黑名单"
                    v-has:DRIVER_MANAGE_OUT_BLACK
                    type="primary" 
                    btntitle="移除黑名单"
                    :plain="true"
                    editType='edit-five'
                    btntype="primary"
                    icon="fontFamily aflc-icon-yichuheimingdan"
                    :params="selectRowData"
                    @getData="getDataList"
                    >
                    </blacklist>
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
                            :templateItem="scoped.row"
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
                        
<div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>   
                </div>
            </div>
    </div>
</template>
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status,data_get_shipper_auid} from '../../../api/users/carowner/total_carowner.js'
    import DriverNewTemplate from '../carowner/driver-newTemplate'
    import { parseTime,formatTime } from '@/utils/index.js'
    import vregion from '@/components/vregion/Region'
    import { eventBus } from '@/eventBus'
    import Pager from '@/components/Pagination/index'
    import FreezeChangeTemplate from '../carowner/freeze-change-template'
 
    import blacklist from '../carowner/blacklist'

    export default {
        data(){
            return{
                btnsize:'mini',
                optionsAuidSataus:[],// 账户状态列表
                page:1,//当前页
                pagesize:20,//每页显示数
                totalCount:null,//总记录数
                formInline: {//查询条件
                    driverMobile:'',
                    driverStatus:'',
                    carNumber:'',
                    accountStatus:'',
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
                selectRowData:[],
                selected:[],//暂存的数据
            }
        },
        props: {
            isvisible: {
                type: Boolean,
                default: false
            }
        },
        components:{
            vregion,
            DriverNewTemplate,
            FreezeChangeTemplate,
            Pager,
            blacklist
        },
        created() {
           
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
              if(this.inited){
                this.firstblood()
              }
          })
        },
 
        methods:{
            regionChange(d) {
                console.log('data:',d)
                this.formInline.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                if(d.area){
                    this.formInline.belongCity = d.area.code;
                }else if(d.city){
                    this.formInline.belongCity = d.city.code;
                }
                else{
                    this.formInline.belongCity = d.province.code;
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
            clearSearch(){
                this.formInline={
                    driverMobile:null,
                    belongCity:null,
                    belongCityName:null,
                    driverStatus:null,
                    carNumber:null,
                    accountStatus:null
                }
                this.firstblood()
            },
            // 判断选中与否
            getSelection(val){
                console.log('选中内容',val)
                this.selectRowData = val;
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },

            //刷新页面
            firstblood(){
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                    // this.tableDataTree.forEach(item => {
                    //     item.createTime = parseTime(item.createTime,"{y}-{m}-{d}");
                    // })
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
                // 账户状态获取
                data_get_shipper_auid().then(res=>{
                    // console.log(res)
                    this.optionsAuidSataus = res.data;
                })
            },

            getDataList(){
                this.firstblood()
                this.$refs.multipleTable.clearSelection();
            }
        }
        
    }
</script>
<style lang="scss">
.el-form-item{
    border:none;
}
.carOwner .shipper_searchinfo label{
    margin-right: 0;  
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #bcd6f5;
}
.el-form--inline .el-form-item {
    margin-right: 0px;
}
.addclassify.commoncss{
    display:inline-block;
}
.btns_box{
    .el-button{
        font-size:12px;
    }
}
</style>
