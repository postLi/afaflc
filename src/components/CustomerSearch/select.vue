
<template>
        <el-select v-model="customer" @change="handleSelect" filterable placeholder="请选择">
            <el-option
            v-for="item in restaurants"
            :key="item.userId"
            :label="item.name"
            :value="item.userId">
            </el-option>
        </el-select>
</template>
<script>

import { data_findAflcSystemUserList } from '@/api/dispatch/PlatForm.js'

export default {
    name: 'CustomerSearch',
    props: {
        disabled:{
            type: Boolean
        },
        customerName:{
            type:String
        },
        value: [String, Array],
        timeoutSearch:null
    },
    data() {
        return {
            restaurants: [],
            customer:'',
            filterOptionsSystemUsers:{
                search:''
            },//筛选平台人员
        };
    }, 
    watch:{
        customerName(newVal,oldVal){
            console.log('customerName',newVal,oldVal)
            if(newVal){
                this.customer = newVal;
            }else{
                this.customer = '';
            }
        }
    },
    methods: {
        init(){
            data_findAflcSystemUserList(this.filterOptionsSystemUsers).then(res=>{
                // console.log(res)
                this.restaurants = res.data;
            }).catch(err =>{
                this.$message({
                    type: 'warning',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        handleSelect(value){
            console.log(value)
            let item =this.restaurants.filter(el => {
                return el.userId == value
            })
            
            this.$emit('returnCustomer',item[0])
            console.log(item)
        }
    },
    mounted(){
        // console.log('customerNamecustomerNamecustomerName',this.customerName)
        this.customer = this.customerName ? this.customerName : '';
        this.init();
        // this.restaurants = this.init();
    },
    beforeDestroy(){
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" >

    
</style>


