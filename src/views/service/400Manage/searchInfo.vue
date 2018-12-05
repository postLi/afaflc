<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo" >
        <el-form-item label="通话分类" prop="pointName">
            <el-select v-model="searchInfo.complainType" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsPlantService"
                :key="item.id"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="通话类型" prop="pointName">
            <el-select v-model="searchInfo.complainType" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsPlantService"
                :key="item.id"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="workSerial">
            <el-input v-model="searchInfo.workSerial" clearable>
            </el-input>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" icon="el-icon-search" plain :size = "btnsize" @click="handleSearch('search')">搜索</el-button>
            <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size = "btnsize" plain @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import { parseTime, pickerOptions2 } from '@/utils/index.js'
import { getDictionary } from '@/api/common.js'
// import vregion from '@/components/vregion/Region'

export default{
  props: {
      
  },
  components: {
            // vregion
  },
  data() {
    return {
      btnsize: 'mini',
      chooseTime: [],
      dataType: 'AF041',
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      searchInfo: {
        complainType: '', // 类型
        workSerial: '' // 工单号
      },
      optionsCouseService: [
        {
          id: '3',
          name: '全部',
          code: ''
        }
      ],
      optionsPlantService: [
        {
          id: '0',
          name: '全部',
          code: ''
        },
        {
          id: '1',
          name: '投诉',
          code: '投诉'
        },
        {
          id: '2',
          name: '建议',
          code: '建议'
        }
      ]

    }
  },
  mounted() {
    this.getInformation()

    console.log(this.optionsCouseService)
  },
  methods: {
    getInformation() {
      if (this.serviceType !== 'plant') {
        getDictionary(this.dataType).then(res => {
          res.data.forEach(el => {
            this.optionsCouseService.push(el)
          })
        })
      }
    },
            // 模糊查询 分类名称或者code
    handleSearch(type) {
      switch (type) {
        case 'search':
          const searchObj = Object.assign({}, this.searchInfo)
          this.$emit('change', searchObj)
          break
        case 'clear':
          this.searchInfo = {
            complainType: '', // 类型
            workSerial: '' // 工单号
          }

          this.$emit('change', this.searchInfo)
          break
      }
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
    
</style>
