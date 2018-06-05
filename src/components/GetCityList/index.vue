<template>
  <div>
        <h1>test</h1>
        <el-cascader
        :options="areaData"
        @active-item-change="handleItemMore"
        :props="props">
        </el-cascader>

        <el-cascader
        :options="options2"
        @active-item-change="handleItemChange"
        :props="props1"
        ></el-cascader>
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
        areaData:[],
        props: {
            label: 'name',
            value: 'code',
            children: 'children'
        },
         options2: [{
          label: '江苏',
          cities: []
        }, {
          label: '浙江',
          cities: []
        }],
        props1: {
          value: 'label',
          children: 'cities'
        }
      };
    },
    methods: {
        handleItemMore(val){
            console.log(val)
            data_GetCityList(val[0]).then(res=>{
                console.log(res)
                this.areaData.forEach(item=>{
                    if(item.code == val[0]){
                        item.children = res.data.list;
                    }
                })
            }).catch(res=>{
                console.log(res)
            })
            console.log(this.area)
        },
        handleItemChange(val) {
        console.log('active item:', val);
        // setTimeout(_ => {
        //   if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
        //     this.options2[0].cities = [{
        //       label: '南京'
        //     }];
        //   } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
        //     this.options2[1].cities = [{
        //       label: '杭州'
        //     }];
        //   }
        // }, 300);
        },
        getMoreInformation(){
           data_getProvinceList().then(res=>{
            //    console.log(res)
               if(res.text == '请求成功')
               this.areaData = res.data.list.map(el => {
                   el.children = []
                   return el
               });
               console.log(this.areaData)
           })
        },
    },
    mounted(){
        this.getMoreInformation()
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    
</style>
