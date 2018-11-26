<template>
    <!-- 初始化检查 -->
    <div class="checkout commoncss">
        <el-dialog title='初始化检查' :close-on-click-modal="false" top="10vh"  :visible="dialogFormVisible" @close="close">
            1323231
        </el-dialog>
    </div>
</template>

<script>

import { getDictionary } from '@/api/common.js'
import { appointDriverList,nearDriverList } from '@/api/order/ordermange.js'

export default {
    name: 'appointDriver',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true,
        },
    },
    components:{
    },
    data() {
        return {
            btnsize:'mini',

        };
    },
    computed: {
    　
    },
    watch:{
        dialogFormVisible(newValue,oldValue){
            if(newValue){
                this.init()
            }
        }
    },
    mounted(){
    },
    methods: {
        //初始化选择项数据
        init(point){
          
            // if(!point){
            //     getDictionary(this.carType).then(res => {
            //         this.optionsCarType = res.data;
            //     }).catch(err => {
            //         this.$message({
            //             type: 'info',
            //             message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
            //         })
            //     });
            // }

            // nearDriverList(this.searchInfo).then(res => {
            //     this.dataTotal = res.data.length;
            //     if(res.data != []){
            //         let pageStart =  (this.page - 1) * this.pagesize;
            //         let pageEnd = this.page * this.pagesize;
            //         this.tableData_point = res.data.slice(pageStart,pageEnd);
            //     }else{
            //         this.$message({
            //             type: 'info',
            //             message: '无符合条件的司机'
            //         })
            //     }
            // }).catch(err => {
            //     // this.$message({
            //     //     type: 'info',
            //     //     message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
            //     // })
            // })

        },
        close(){
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .checkout{
        .el-dialog__body{
            position: relative;
        }

    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .checkout{
        .el-dialog{
            width: 1200px;
            // .el-dialog__body{
            //     padding:20px 2px;
            //     border-bottom:0 none;
            //     position: relative;
            //     .el-form-item__content{
            //         width:200px;
            //         .el-select{
            //             width: 100%;
            //         }
            //     }
            // }
        }
        // .el-dialog .el-dialog__body .el-form .el-form-item .el-form-item__content .el-input .el-input__inner{
        //     height: 30px;
        //     line-height:30px;
        // }

    }
</style>

