
<template>
      <el-autocomplete
        class="inline-input CustomerSearch"
        v-model="customerName"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect"
        >
        <template slot-scope="{ item }">
            <!-- <div class="name">{{ item.value }}</div> -->
            <span class="addr">{{ item.name }}/ {{ item.mobilephone}}</span>
        </template>
        </el-autocomplete>
</template>
<script>

import { data_findAflcSystemUserList } from '@/api/dispatch/PlatForm.js'

export default {
    name: 'CustomerSearch',
    props: {
        disabled:{
            type: Boolean
        },
        value: [String, Array],
    },
    data() {
        return {
            customerName:'',
            restaurants: [],
            filterOptionsSystemUsers:{
                search:''
            },//筛选平台人员
        };
    },
    methods: {
        init(){
            console.log('123123123')
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
        querySearch(queryString, cb) {
            console.log('queryString',queryString,this.restaurants)
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            console.log(item);
        },
    },
    mounted(){
        this.init();
        // this.restaurants = this.init();
    },
    beforeDestroy(){
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" >

    
</style>


