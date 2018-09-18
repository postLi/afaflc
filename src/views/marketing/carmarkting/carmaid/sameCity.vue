<template>
    <div class=" identicalStyle clearfix" style="height:100%">
      <div class="shipper_city">
          <el-form :inline="true">
            <el-form-item label="所属区域：">
                   <el-cascader
                    size="large"
                    :options="options"
                    v-model="formAllData.areaName"
                    @change="handleChange">
                    </el-cascader>
            </el-form-item>
            <el-form-item label="车主抽佣等级：">
                 <el-select v-model="formAllData.commissionGrade" clearable placeholder="请选择" >
                          <el-option
                             v-for="item in MaidLevel"
                              :key="item.code"
                             :label="item.name"
                              :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="车辆类型：">
                 <el-select v-model="formAllData.carType" clearable placeholder="请选择" >
                          <el-option
                            v-for="item in optionsCar"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled">
                         </el-option>
                 </el-select>
            </el-form-item>          
            <el-form-item>       
          <el-button type="primary"  plain @click="getData_query">查询</el-button> 
          </el-form-item>              
          </el-form>
         </div>
          	<div class="classify_cityinfo">
            		<div class="btns_box">
                   <newCity
                    btntext="新增"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    editType="add"
                    btntitle="创建"
                   >
                    </newCity>
                   <newCity
                    btntext="修改"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    editType="edit"
                    btntitle="修改"
                    :params="selectRowData"
                   >
                    </newCity>
                <el-button  type="primary" value="value" plain icon="el-icon-bell" @click="handleUseStates">启用/停用</el-button>
                <el-button type="primary" plain icon="el-icon-delete" @click="delete_data">删除</el-button>
            		</div>
            <div class="info_city">    
            <el-table style="width: 100%" stripe border height="100%" @row-click="clickDetails" highlight-current-row :data="tableDataAll"  tooltip-effect="dark">
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="所属区域">
                <template slot-scope="scope">
                    {{scope.row.province+scope.row.city+scope.row.area}}
                </template>
            </el-table-column>
            <el-table-column  label="车辆类型" prop="carType">
            </el-table-column>
            <el-table-column  label="车主抽佣等级" prop="commissionGrade">
            </el-table-column>
            <el-table-column  label="开始抽佣单数" prop="startNum">
            </el-table-column>
            <el-table-column  label="结束抽佣单数" prop="endNum">
            </el-table-column>       
            <el-table-column  label="每单抽佣（%）" prop="commissionPer">
            </el-table-column>                                                       
            <el-table-column  label="最低抽佣(元)" prop="commissionLowest">
            </el-table-column>
            <el-table-column  label="启用状态" >
            <template  slot-scope="scope">
              {{ scope.row.usingStatus == 1 ? '启用' : '停用' }}
            </template>
            </el-table-column>          
            </el-table> 
        	</div> 
         <!-- 页码 -->
        <div class="info1_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
        </div>
      </div>
</template>
<script>
import { data_Commission, data_CarList, data_MaidLevel } from '@/api/server/areaPrice.js'
import { data_get_Marketingsame_list, data_Del_Marketingsame, data_Able_Marketingsame } from '@/api/marketing/carmarkting/carmarkting.js'
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import newCity from '../../components/newCity.vue'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/'
export default {
  data() {
    return {
      options: regionDataPlus,
      selectRowData: {},
      selectId: [],
      sizes: [30, 50, 100],
      information: '操作不正确',
      pagesize: 30, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      radio: 1,
      optionsCar: [{ code: null, name: '全部' }],
      MaidLevel: [{ code: null, name: '全部' }],
      formAllData: {
        areaCode: null,
        areaName: null,
        carType: null,
        commissionGrade: null
      }
    }
  },
  components: {
    newCity,
    Pager
  },
  methods: {
    handleChange(d) {
      console.log('d', d)
      if (d.length < 3) {
        if (d.length == 2) {
          this.$message.error('请选择具体的城市')
        }
        this.formAllData.areaCode = null
        this.formAllData.province = null,
                this.formAllData.city = null,
                this.formAllData.area = null,
                this.formAllData.areaName = []
      } else {
        this.formAllData.areaCode = d
        this.formAllData.province = CodeToText[d[0]]
        this.formAllData.city = CodeToText[d[1]]
        if (d[2] == '') {
          this.formAllData.area = ''
        } else {
          this.formAllData.area = CodeToText[d[2]]
        }
      }
    },
            // 获取  服务和车辆 类型列表
    getMoreInformation() {
      data_CarList().then(res => {
                    // console.log(res.data)
        res.data.map((item) => {
          this.optionsCar.push(item)
        })
      })
      data_MaidLevel().then(res => {
        res.data.map((item) => {
          this.MaidLevel.push(item)
        })
      }).catch(res => {
        console.log(res)
      })
    },
          // 列表刷新页面
    firstblood() {
      let FromData = {}
      if (this.formAllData.area) {
        FromData = {
          area: this.formAllData.area,
          city: null,
          carType: this.formAllData.carType,
          commissionGrade: this.formAllData.commissionGrade
        }
      } else if (this.formAllData.city) {
        FromData = {
          area: null,
          city: this.formAllData.city,
          carType: this.formAllData.carType,
          commissionGrade: this.formAllData.commissionGrade
        }
      } else {
        FromData = {
          area: null,
          city: this.formAllData.city,
          carType: this.formAllData.carType,
          commissionGrade: this.formAllData.commissionGrade
        }
      }
      data_get_Marketingsame_list(this.page, this.pagesize, FromData).then(res => {
        console.log(res)
        this.dataTotal = res.data.totalCount
        this.tableDataAll = res.data.list
      })
    },
         //  查询
    getData_query() {
      this.firstblood()
    },

         // 选择行
    clickDetails(i) {
      this.selectRowData = i
      console.log('selectRowData', this.selectRowData)
    },
        // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },
        // 选择删除
    delete_data() {
      if (!this.selectRowData.id) {
        this.$message.info('未选中任何删除内容')
      } else {
        this.delDataInformation()
      }
    },
       // 确认删除
    delDataInformation() {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        data_Del_Marketingsame(this.selectRowData.id).then(res => {
          this.$message.success('删除成功')
          this.firstblood()
          this.selectRowData = ''
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '操作失败，原因：' + err.text ? err.text : err
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
      // 启用禁用
    handleUseStates() {
      if (!this.selectRowData.id) {
                    // 未选择任何修改内容的提示
        this.$message.info('未选中内容')
        return
      } else {
        this.selectId.push(this.selectRowData.id)

        data_Able_Marketingsame(this.selectId).then(res => {
          this.selectId.splice(0, 1)
          if (this.selectRowData.usingStatus == 1) {
            this.$message.warning('已禁用')
          } else {
            this.$message.success('已启用')
          }
          this.firstblood()
          this.selectRowData = ''
        })
      }
    }
  },

  mounted() {
    eventBus.$on('pushListtwo', () => {
      this.firstblood()
    })
    this.getMoreInformation()
    this.firstblood()
  }
}
</script>
<style lang="scss" scoped>  
.export{
  .el-button{
    margin-right:20px;
    padding:10px 20px;
  }
}
.frozeclassify{
  margin-top: 10px;
  .info{
    span{
      margin-left: 60px;
      font-size: 16px;
    }
    .mc-line{
      width: 100%;
      border-bottom: 1px solid #000;
    }
    .frozerol{
      margin: 10px  0 10px 50px;
    }
  }
} 
.shipper_city{
    position: absolute;
    left: 0;
    top: 0;
    padding: 15px 16px;
    height: 70px;
    width: 100%;
    line-height: 35px;
    .el-input__inner{
      height: 30px;
      line-height: 30px;
    }
    .el-button{
      padding: 10px 20px;
    }
}
.classify_cityinfo{
    height: 100%;
    padding: 70px 15px 0 0px;
    .commoncss{
      display: inline-block;
    }
    .btns_box{
    margin-bottom: 10px;
    }
    .info_city{
      height:88%;
      .cell{
      color: #333;
      font-size: 14px;
      }
    }
    .el-button{
      margin-right: 20px;
      padding: 10px 20px;
    }
}
</style>

