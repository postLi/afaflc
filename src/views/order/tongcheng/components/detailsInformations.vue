<template>
    <div>
    <!-- 详情弹窗 -->
        <div class="details commoncss">
            <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisible_details" @close="close">
                <detailsComponent  :listOrderSerial = "orderSerial" :record = "record"></detailsComponent>
                <!-- v-if="Object.keys(details).length != 0" -->
            </el-dialog>
        </div>
    </div>
</template>

<script>

import DetailsComponent from './detailsComponent'

export default {
    name: 'detailsInformations',
    components:{
        DetailsComponent,
    },
    props: {
        dialogFormVisible_details:{
            type:Boolean,
            required:true
        },
        orderSerial:{
            type:String,
            required:true
        },
        record:{
            type:Boolean,
        }
    },
    data() {
        return {
            formtitle:'订单详情',
        };
    },
    watch:{
       
    },
    mounted(){
        // this.init();
    },
    methods: {
        close(){
            this.$emit('update:dialogFormVisible_details',false)
        },
        init(){
            
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .details{
        .el-dialog__wrapper{
            .el-dialog{
                width: 70%;
            }
        }
    }
    
</style>
