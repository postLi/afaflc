
<template>
  <div class="chooseCityList">
        <el-cascader
        v-model="selectedOptions"
        :options="cityTree"
        ref="cityTree"
        change-on-select
        @change="handleItemMore"
        :disabled="disabled"
        :props="props">
        </el-cascader>
  </div>
</template>
<script>

import { aflcAreaCode } from '@/api/common.js'

export default {
  name: 'getCityList',
  props: {
    disabled: {
      type: Boolean
    },
    value: [String, Array]
  },
  data() {
    return {
      selectedOptions: [],
      areaList: null,
      cityTree: [],
      props: {
        label: 'name',
        value: 'code',
        children: 'children'
      }
    }
  },
  methods: {
    handleItemMore(val) {
      console.log(this.$refs.cityTree.currentValue)
      console.log(this.$refs.cityTree.currentLabels)
      this.returnArr()
    },
    init() {
      aflcAreaCode().then(res => {
        this.cityTree = res.data
      })
    },
    returnArr() {
      this.$emit('returnStr', this.selectedOptions.join(','), this.$refs.cityTree.currentLabels.join(','))
      // console.log(this.selectedOptions, this.selectedOptions.join(','), this.$refs.cityTree.currentLabels)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    // .chooseCityList{
    //     .el-cascader{   
    //         .el-cascader__label{
    //             top: 5px;
    //             height: 30px;
    //             line-height: 30px;
    //             font-size: 14px;
    //             color: #3e9ff1;
    //             padding: 0 25px 0 6px;
    //             span{
    //                 color: #3e9ff1;
    //             }
    //         }

    //     }
    // }
    
</style>

