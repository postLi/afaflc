<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo" >
        <el-form-item  label="货主姓名：" prop="pointName">
             <el-input v-model="searchInfo.orderSerial" clearable>
            </el-input>
        </el-form-item>
        <el-form-item label="注册账号：" prop="orderSerial">
            <el-input v-model="searchInfo.orderSerial" clearable>
            </el-input>
        </el-form-item>
        <el-form-item label="所属客服：" maxlength="18"  prop="shipperName">
            <el-input v-model="searchInfo.driverName" clearable placeholder="账户/姓名/车牌号">
            </el-input>
        </el-form-item>
        <el-form-item label="所属业务员：" maxlength="18"  prop="shipperName">
            <el-input v-model="searchInfo.shipperName" clearable placeholder="账户/姓名">
            </el-input>
        </el-form-item>
                <br>
         <el-form-item label="所属片区：" prop="orderSerial">
            <vregion :ui="true" @values="regionChange" class="form-control">
                <el-input v-model="searchInfo.belongCityName" placeholder="请选择出发地"></el-input>
            </vregion>
        </el-form-item>
        <el-form-item label="活跃状态：" maxlength="18"  prop="shipperName">
            <el-input v-model="searchInfo.shipperName" clearable placeholder="账户/姓名">
            </el-input>
        </el-form-item>
        <el-form-item label="身份状态：" prop="mobile">
           <el-input v-model="searchInfo.driverName" clearable placeholder="账户/姓名/车牌号">
            </el-input>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
            <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
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
            regionChange(d) {
                console.log('data:',d)
                this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                if(d.area){
                    this.searchInfo.belongCity = d.area.code;
                }else if(d.city){
                    this.searchInfo.belongCity = d.city.code;
                }
                else{
                    this.searchInfo.belongCity = d.province.code;
                }
            },
             getValue(obj){
                return obj ? obj.value:'';
            },
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
    
</style>