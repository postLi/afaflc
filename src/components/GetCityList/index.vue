<template>
  <div class="chooseCityList">
        <el-cascader
        v-model="selectedOptions"
        :options="areaData"
        @active-item-change="handleItemMore"
        :props="props">
        </el-cascader>
  </div>
</template>
<script>

    import { data_getProvinceList,data_GetCityList } from '@/api/common.js'

export default {
    name: 'getCityList',
    props: {
        
    },
    data() {
      return {
        selectedOptions: [],
        areaList:null,
        areaData:[],
        props: {
            label: 'name',
            value: 'code',
            children: 'children'
        },
      };
    },
    methods: {
        handleItemMore(val){
            data_GetCityList(val[0]).then(res=>{
                if(res.errorInfo){
                    this.areaData.forEach(item=>{
                        if(item.code == val[0]){
                            item.children = null;
                        }
                    })
                }else{
                    this.areaData.forEach(item=>{
                        if(item.code == val[0]){
                            setTimeout(function(){
                                item.children = res.data.list;
                            },500)
                        }
                    })
                }
            }).catch(res=>{
            })
        },
        // handleItemChange(val) {
        // console.log('active item:', val);
        // },
        getMoreInformation(){
           data_getProvinceList().then(res=>{
            //    console.log(res)
            if(res.text == '请求成功' && res.data.list.length >0 ){
                this.areaData = res.data.list.map(el => {
                    el.children = []
                    return el
                });
            }else{
                this.areaData = null;
            }
           })
        },
    },
    mounted(){
        this.getMoreInformation()
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" >

    .chooseCityList{
        .el-cascader{   
            .el-input{
                width: 100%;
            }
            .el-cascader__label{
                top: 10px;
                height: 24px;
                line-height: 24px;
                font-size: 12px;
                color: #3e9ff1;
                padding: 0 25px 0 6px;
                span{
                    color: #3e9ff1;
                }
            }

        }
    }
    
</style>
