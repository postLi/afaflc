<template>
    <div class="shipperData identicalStyle">
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
                    <el-table-column label="货主姓名" :show-overflow-tooltip="true" prop="mobile" width="120" sortable>
                        <template slot-scope="scope">
                            <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.nickname ? scope.row.nickname : scope.row.mobile}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile"
                        width="120"
                        :show-overflow-tooltip="true" sortable
                        label="手机号码">
                    </el-table-column>
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
                        width="120"
                        :show-overflow-tooltip="true" sortable
                        label="启用状态">
                        <!-- <template slot-scope="scope">
                            {{scope.row.belongCityName ? scope.row.belongCityName:scope.row.belongCity}}
                        </template> -->
                    </el-table-column>  
                    <el-table-column prop="" sortable :show-overflow-tooltip="true" label="活跃状态" width="120">
                    </el-table-column>
                    <el-table-column  label="身份状态" :show-overflow-tooltip="true" sortable prop="" width="120">
                    </el-table-column>
                    <el-table-column prop="" sortable :show-overflow-tooltip="true" label="审核状态" width="120">
                    </el-table-column>
                    <el-table-column prop="" sortable :show-overflow-tooltip="true" label="审核操作人" width="120">
                    </el-table-column>
                    <el-table-column prop="belongArea" width="120" sortable label="所属片区">
                    </el-table-column>
                    <el-table-column prop="" width="120" :show-overflow-tooltip="true" sortable label="所属街道">
                    </el-table-column>
                    <el-table-column prop="" width="120" :show-overflow-tooltip="true" sortable label="所属商圈">
                    </el-table-column>
                    <el-table-column prop="" width="120" :show-overflow-tooltip="true" sortable label="所属业务员">
                    </el-table-column>
                    <el-table-column prop="" width="120" :show-overflow-tooltip="true" sortable label="所属客服">
                    </el-table-column>
                    <el-table-column prop="updateTime" 
                        width="160"
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
import { data_get_shipper_list} from '@/api/users/shipper/all_shipper.js'

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
                data_get_shipper_list(this.page, this.pagesize, this.searchInfo).then(res => {
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
                this.$router.push({name: '货主详情',query:{ userId:item.shipperId }});
            },
            handlerJump(){
                console.log('123')
                this.$router.push({name: '货主详情',query:{ userId:item.shipperId }});
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
    .shipperData{
        height: 100%;
    }
</style>