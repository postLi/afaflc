<template>
    <div>
         <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="客服"
                width="200"
                >
            </el-table-column>
            <el-table-column
                prop="name"
                label="备注时间"
                width="300"
                >
            </el-table-column>
            <el-table-column
                prop="address"
                label="备注内容">
            </el-table-column>
            </el-table>
    </div>
</template>

<script>


export default {
    name: 'robbingList',
    components:{
    },
    props: {
       
    },
    data() {
        return {
             tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03', 
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        };
    },
    watch:{
       
    },
    mounted(){
        // this.init();
    },
    methods: {
      
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss">
  
    
</style>
