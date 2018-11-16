
<template>
      <el-autocomplete
        class="inline-input CustomerSearch"
        v-model="customerName"
        :fetch-suggestions="querySearch"
        placeholder=""
        @select="handleSelect"
        :disabled="disabled"
        >
        <template slot-scope="{ item }">
            <span class="addr">{{ item.name }}</span>
            <!-- <span v-if="item.mobilephone">{{ '/ ' +  item.mobilephone}}</span> -->
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
        // customerName:{
        //     type:String
        // },
        value: [String, Array],
        timeoutSearch:null
    },
    data() {
        return {
            restaurants: [],
            customerName:'',
            filterOptionsSystemUsers:{
                search:''
            },//筛选平台人员
        };
    }, 
    methods: {
        init(queryString){
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
            // console.log('queryString',queryString,this.restaurants)
            var results = [];
            this.filterOptionsSystemUsers.search = queryString;
            data_findAflcSystemUserList(this.filterOptionsSystemUsers).then(res=>{
                results = res.data;
                cb(results);
            }).catch(err =>{
                this.$message({
                    type: 'warning',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
            // clearTimeout(this.timeoutSearch);

            // this.timeoutSearch = setTimeout(() => {
            //     cb(results);
            // }, 3000 * Math.random());
        },
        handleSelect(item) {
            // this.customerName = item.name + (item.mobilephone ? '/' + item.mobilephone :'');
            this.customerName = item.name;
            console.log(item,this.customerName);
            this.$emit('returnCustomer',item)
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


