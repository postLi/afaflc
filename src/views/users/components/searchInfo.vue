<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo" >
        <el-form-item  label="所在地" prop="pointName">
            <vregion :ui="true"  @values="regionChange" class="form-control">
                <el-input v-model="belongCityName" placeholder="请选择"></el-input>
            </vregion>
        </el-form-item>
        <el-form-item label="认证状态" v-if="showType == 'All'">
            <el-select v-model="searchInfo.shipperStatus" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsStatus"
                :key="item.id"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="账户状态">
            <el-select v-model="searchInfo.accountStatus" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsAuidSataus"
                :key="item.id"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="公司名称:" v-if="showType != 'unauthorized'">
            <el-input v-model.trim="searchInfo.companyName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
            <el-input v-model.trim="searchInfo.mobile" v-numberOnly></el-input>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" :size="btnsize" icon="el-icon-search" plain @click="handleSearch('search')">搜索</el-button>
            <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import { parseTime,pickerOptions2 } from '@/utils/index.js'
import vregion from '@/components/vregion/Region'
import { getDictionary } from '@/api/common.js'
    export default{
        components:{
            vregion
        },
        props:{
            showType:{
                type:String,
                default:'All'
            }
        },
        data(){
            return{
                btnsize:'mini',
                chooseTime:[],
                auditingStatus:'AF00104',//认证状态
                accountStatus:'AF00105',//账户状态
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                belongCityName:'',
                searchInfo:{
                    belongCity: '',
                    shipperStatus: '',
                    accountStatus: '',
                    companyName: '',
                    mobile: '',
                    provinceCode:"",
                    cityCode:'',
                    areaCode:""
                },
                optionsStatus: [
                    {
                    code: '',
                    name: '全部'
                    }
                ],
                // 账户状态
                optionsAuidSataus: [
                    {
                    code: '',
                    name: '全部'
                    }
                ], 
            }
        },
        watch:{
         
        },
        mounted(){
            this.init();
        },
        methods: {
            regionChange(d) {
                console.log('data:',d)
                this.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                if(d.area){
                    this.searchInfo.areaCode = d.area.code;
                }else if(d.city){
                    this.searchInfo.belongCity = d.city.code;
                    this.searchInfo.cityCode = d.city.code;
                }
                else{
                    this.searchInfo.belongCity = d.province.code;
                    this.searchInfo.provinceCode = d.province.code;

                }
            },
             getValue(obj){
                return obj ? obj.value:'';
            },
            // 获取状态列表
            init() {
                // 获取状态列表
                Promise.all([getDictionary(this.auditingStatus),getDictionary(this.accountStatus)]).then(resArr => {
                    console.log('resArr',resArr)
                    resArr[0].data.map((item) => {
                        this.optionsStatus.push(item);
                    });
                    resArr[1].data.map((item) => {
                        this.optionsAuidSataus.push(item);
                    })
                })
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
                            belongCity: '',
                            shipperStatus: '',
                            accountStatus: '',
                            companyName: '',
                            mobile: '',
                            provinceCode:"",
                            cityCode:'',
                            areaCode:""
                        }
                        this.belongCityName = '',
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