<template>
     <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
        
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')">搜索</el-button>
            <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import { getDictionary } from '@/api/common.js'

    export default{
        components:{

        },
        data(){
            return{
                btnsize:'mini',
               
            }
        },
        mounted(){
            this.init();
        },
        methods: {
                //获取  服务和车辆 类型列表
            init(){
               
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    
</style>