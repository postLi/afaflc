<template>
    <el-form :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
        <el-form-item label="区域" prop="pointName">
            <vregion :ui="true" @values="regionChange" class="form-control">
                <el-input v-model="searchInfo.belongCity" placeholder="请选择出发地"></el-input>
            </vregion>
        </el-form-item>
        <el-form-item label="订单号" prop="orderSerial">
            <el-input v-model="searchInfo.orderSerial" clearable>
            </el-input>
        </el-form-item>
        <el-form-item label="货主" maxlength="18"  prop="shipperName">
            <el-input v-model="searchInfo.shipperName" clearable placeholder="账户/姓名">
            </el-input>
        </el-form-item>
        <el-form-item label="下单时间" prop="mobile">
            <el-date-picker
                v-model="chooseTime"
                type="datetimerange"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                :default-time="['00:00:00', '23:59:59']"
                value-format="timestamp">
            </el-date-picker>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" @click="handleSearch('search')">搜索</el-button>
            <el-button type="primary" @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
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
                    belongCity:'',//区域
                    shipperName:'',//货主
                    startOrderDate:'',//下单起始时间
                    endOrderDate:'',//下单结束时间
                    orderSerial:'',//订单号
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
                // console.log(this.chooseTime)
                switch(type){
                    case 'search':
                        const searchObj = Object.assign({}, this.searchInfo);
                        this.$emit('change', searchObj)
                        break;
                    case 'clear':
                        this.searchInfo = {
                            belongCity:'',//区域
                            shipperName:'',//货主
                            startOrderDate:'',//下单起始时间
                            endOrderDate:'',//下单结束时间
                            orderSerial:'',//订单号
                        }
                        break;
                }
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    
</style>