<template>
    <el-form :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo" >
        <el-form :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                <el-form-item label="区域" prop="pointName">
                    <vregion :ui="true" @values="regionChange" class="form-control">
                        <el-input v-model="searchInfo.city" placeholder="请选择出发地" clearable></el-input>
                    </vregion>
                </el-form-item>
                <el-form-item label="标题" prop="orderSerial">
                    <el-input v-model="searchInfo.title" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item class="btnChoose fr"  style="margin-left:0;">
                    <el-button type="primary" plain @click="handleSearch('search')">搜索</el-button>
                    <el-button type="info" plain @click="handleSearch('clear')">清空</el-button>
                </el-form-item>
        </el-form>
    </el-form>
</template>

<script type="text/javascript">

import { parseTime,pickerOptions2 } from '@/utils/index.js'
import vregion from '@/components/vregion/Region'

    export default{
        components:{
            vregion
        },
        data(){
            return{
                chooseTime:[],
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                searchInfo:{
                    city: "",//区域
                    title:'',//标题
                   
                },
            }
        },
        methods: {
            regionChange(d) {
                console.log('data:',d)
                this.searchInfo.belongCity = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            },
            getValue(obj){
                return obj ? obj.value:'';
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                let searchObj; 
                switch(type){
                    case 'search':
                        searchObj = Object.assign({}, this.searchInfo);
                        break;
                    case 'clear':
                        this.searchInfo = {
                            city: "",//区域
                            title:'',//标题
                        }
                        searchObj = this.searchInfo ;
                        break;
                }
                this.$emit('change', searchObj)
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    
</style>