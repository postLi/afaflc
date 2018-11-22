<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm qdSearch fr" >
        <el-form-item label="" prop="mobile">
            <el-date-picker
                v-model="searchInfo.grabSingleTimeStart"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择月">
            </el-date-picker>
            <el-date-picker
                v-model="searchInfo.grabSingleTimeStart"
                type="date"
                value-format="timestamp"
                format="yyyy 年 MM 月 dd 日"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

// import { parseTime,pickerOptions2 } from '@/utils/index.js'

    export default{
        components:{
        },
        props:{
            searchType:{
                type:String,
            }
        },
        data(){
            return{
                btnsize:'mini',
                searchInfo:{
                    shipperName:'',//货主
                    grabSingleTimeStart:'',//下单起始时间
                    grabSingleTimeEnd:'',//下单结束时间
                    orderSerial:'',//订单号
                },
            }
        },
        methods: {
            
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .qdSearch{
        .el-form-item {
            margin-bottom: 0;
        }
    }
</style>