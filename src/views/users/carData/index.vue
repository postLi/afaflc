<template>
    <div class="carData identicalStyle">
        <!-- <img src="../../../assets/zanshi/hz.png" alt="" @click="handlerJump"> -->
        <searchInfo @change="getSearchParam"></searchInfo>
        <div class="classify_info" >
			<!-- <div class="btns_box">
			</div> -->
			<div class="info_news">
                <el-table
				ref="multipleTable"
				:data="tableDataAll"
				stripe
				border
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
                    <el-table-column label="序号" width="80px">
                        <template slot-scope="scope">
                            {{ (page - 1)*pagesize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column label="车主姓名" :show-overflow-tooltip="true" width="120" prop="driverName" sortable>
                        <template slot-scope="scope">
                            <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.driverName ? scope.row.driverName : scope.row.nickname}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column prop="driverMobile" width="120"
                        :show-overflow-tooltip="true" sortable
                        label="手机号码">
                    </el-table-column>
                    <!-- <el-table-column prop="contacts" sortable label="短信验证码">
                    </el-table-column> -->
                    <el-table-column prop="registerOriginName" sortable label="注册渠道" width="120">
                    </el-table-column>
                    <el-table-column prop="createTime" :show-overflow-tooltip="true" sortable width="160"  label="注册时间">
                        <template  slot-scope="scope">
                            <span v-if="scope.row.createTime">{{ scope.row.createTime | parseTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" :show-overflow-tooltip="true" sortable label="最后登录时间" width="160">
                    </el-table-column>
                    <el-table-column 
                        prop=""   
                        sortable
                        width="120"
                        label="启用状态">
                        <!-- <template slot-scope="scope">
                            {{scope.row.belongCityName ? scope.row.belongCityName:scope.row.belongCity}}
                        </template> -->
                    </el-table-column>  
                    <el-table-column prop="" sortable label="活跃状态" width="120">
                    </el-table-column>
                    <el-table-column  label="身份状态" sortable prop="" width="120">
                    </el-table-column>
                    <el-table-column prop="driverStatusName" sortable label="审核状态" width="120">
                    </el-table-column>
                    <el-table-column prop="" :show-overflow-tooltip="true" sortable label="审核操作人" width="120">
                    </el-table-column>
                    <el-table-column prop="belongArea" :show-overflow-tooltip="true" sortable label="所属片区" width="120">
                        <!-- <template slot-scope="scope">
                            {{scope.row.belongCityName ? scope.row.belongCityName:scope.row.belongCity}}
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="" :show-overflow-tooltip="true" sortable label="所属商圈" width="120">
                    </el-table-column>
                    <el-table-column prop="" :show-overflow-tooltip="true" sortable label="所属业务员" width="120">
                    </el-table-column>
                    <el-table-column prop="" :show-overflow-tooltip="true" sortable label="所属客服" width="120">
                    </el-table-column>
                    <el-table-column 
                        width="160"
                        prop="updateTime" 
                        :show-overflow-tooltip="true" sortable
                         label="最后修改时间">
                         <template  slot-scope="scope">
                            <span v-if="scope.row.updateTime">{{ scope.row.updateTime | parseTime}}</span>
                        </template>
                    </el-table-column>
				</el-table>
			</div>
        </div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>  
    </div>
</template>


<script type="text/javascript">
import searchInfo from './searchInfo'
import Pager from '@/components/Pagination/index'
// import { data_get_shipper_list} from '@/api/users/shipper/all_shipper.js'
import { data_get_driver_list} from '@/api/users/carowner/total_carowner.js'
    export default{
        components:{
            searchInfo,
            Pager
        },
        data(){
            return{
                loading:false,
                searchInfo:{

                },
                page:1,
                pagesize:20,
                totalCount:0,
                tableDataAll:[],
                selected:[],
            }
        },
        created(){

        },
        mounted(){
           this.firstblood();
        },  
        beforeDestroy(){
           
        },
        methods: {
            firstblood(){
                // this.loading = true;
                data_get_driver_list(this.page, this.pagesize, this.searchInfo).then(res => {
                    // console.log('shipperAll',res)
                    this.totalCount = res.data.totalCount
                    this.tableDataAll = res.data.list
                    // this.inited = false;
                    this.loading = false;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                    this.loading = false;
                })
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            // 判断选中与否
            getSelection(val){
                console.log('选中内容',val)
                this.selected = val;
            },
            pushOrderSerial(item){
                this.$router.push({name: '车主详情',query:{ driverId:item.driverId }});
            },
            handlerJump(){
                console.log('123')
                this.$router.push({name: '车主详情'});
            },
            getSearchParam(obj) {
                console.log(obj)
                this.searchInfo = Object.assign(this.searchInfo, obj)
                this.loading = false;
                this.firstblood()
            },
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .carData{
        height: 100%;
    }
</style>