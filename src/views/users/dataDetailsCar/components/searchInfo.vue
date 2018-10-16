<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm qdSearch fr" >
        <el-form-item label="手机号码：" prop="orderSerial">
            <el-input v-model="searchInfo.orderSerial" clearable>
            </el-input>
        </el-form-item>
        <!-- <el-form-item label="货主：" maxlength="18"  prop="shipperName">
            <el-input v-model="searchInfo.shipperName" clearable placeholder="账户/姓名">
            </el-input>
        </el-form-item>
        <el-form-item label="车主：" maxlength="18"  prop="shipperName">
            <el-input v-model="searchInfo.driverName" clearable placeholder="账户/姓名/车牌号">
            </el-input>
        </el-form-item> -->
        <el-form-item label="抢单时间：" prop="mobile">
            <el-date-picker
                v-model="chooseTime"
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="-"
                unlink-panels
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                :default-time="['00:00:00', '23:59:59']"
                value-format="timestamp">
            </el-date-picker>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
            <!-- <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button> -->
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import { parseTime,pickerOptions2 } from '@/utils/index.js'

    export default{
        components:{
        },
        data(){
            return{
                btnsize:'mini',
                chooseTime:[],
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                searchInfo:{
                    belongCity:'',//区域
                    belongCityName:'',
                    shipperName:'',//货主
                    startOrderDate:'',//下单起始时间
                    endOrderDate:'',//下单结束时间
                    orderSerial:'',//订单号
                    driverName:''
                },
            }
        },
        methods: {
            //模糊查询 分类名称或者code
            handleSearch(type){
                // console.log(this.chooseTime)
                let searchObj;
                switch(type){
                    case 'search':
                        searchObj = Object.assign({}, this.searchInfo);
                        break;
                    case 'clear':
                        this.searchInfo = {
                            belongCity:'',//区域
                            shipperName:'',//货主
                            startOrderDate:'',//下单起始时间
                            endOrderDate:'',//下单结束时间
                            orderSerial:'',//订单号
                        }
                        searchObj = Object.assign({}, this.searchInfo);
                        break;
                }
                this.$emit('change', searchObj)

            },
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