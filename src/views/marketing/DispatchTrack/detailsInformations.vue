<template>
    <div>
        
    <!-- 新增分类信息 -->
        <div class="details commoncss">
            <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisibleDetails" @close="close">
                <detailsComponent v-if="Object.keys(listInformationMore).length != 0" :listInformation = "listInformationMore" :record = "record"></detailsComponent>
            </el-dialog>
        </div>
    </div>
        
</template>

<script>
import detailsComponent from './details'

export default {
    name: 'detailsInformations',
    props: {
        dialogFormVisibleDetails:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true
        },
        listInformationMore:{
            type:Object,
            required:true
        },
        record:{
            type:Boolean,
            required:true
        }
    },
    data() {
      return {
            
      };
    },
    components:{
        detailsComponent
    },
    watch:{
       
    },
    mounted(){
        // this.init();
    },
    methods: {
        close(){
            this.$emit('update:dialogFormVisibleDetails',false)
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
                width: 1380px;
            }
        }
    }
    
</style>
