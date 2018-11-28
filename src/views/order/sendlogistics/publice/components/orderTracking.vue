<template>
<div style="height:100%">
<el-table :data="tableData" border height="100%" style="width: 100%">
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
             <el-table-column prop="" label="时间"></el-table-column>
             <el-table-column prop="" label="操作人"></el-table-column>
             <el-table-column prop="" label="用户类型"></el-table-column>
             <el-table-column prop="" label="操作内容"></el-table-column>
             <el-table-column prop="" label="标准值"></el-table-column>
             <el-table-column prop="" label="实际值"></el-table-column>
             <el-table-column prop="" label="评估值"></el-table-column>
             <el-table-column prop="" label="备注"></el-table-column>
</el-table>
  <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>    
</div>
</template>

<script>
import Pager from '@/components/Pagination/index'
export default {
    data(){
        return{
            totalCount:0,
            page:1,
            pagesize:20,
            sizes:[20,30,50],
            tableData: [],
        }
    },
    components:{
        Pager
    },
    methods:{
        handlePageChange(val){
            
        }
    }
}
</script>

<style lang="scss">

</style>
