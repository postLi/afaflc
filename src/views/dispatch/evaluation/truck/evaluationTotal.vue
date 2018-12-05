<template>
    <div class="identicalStyle Marketing" style="height:100%">
          <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="区域">
                 <GetCityList ref="area"  @returnStr="getStr"></GetCityList>
            </el-form-item> 
            <el-form-item label="活动时间">
                    <el-date-picker
                        is-range
                        unlink-panels
                        :picker-options="pickerOptions2"
                        type="daterange"
                        align="center"
                        range-separator="-"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
                        @change='cTime'
                        >
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="货主">
               <el-input ></el-input>
            </el-form-item>     
            <el-form-item label="车主">
               <el-input  ></el-input>
            </el-form-item>   
            <el-form-item label="订单号">
               <el-input ></el-input>
            </el-form-item>               
            <el-form-item class="fr">       
          <el-button type="primary" plain @click="getData_query" :size="btnsize" icon="el-icon-search">搜索</el-button> 
          <el-button type="info" plain @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>
          </el-form>
          	<div class="classify_info">
            <div class="info_news">    
            <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" >
              <el-table-column
                            label="选择"
                            type="selection"
                            width="50">
              </el-table-column>
           <el-table-column label="序号" sortable  width="80">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column> 
            <el-table-column  label="订单号" prop="" sortable>
            </el-table-column>
            <el-table-column  label="所属区域" prop="" show-overflow-tooltip sortable>
            </el-table-column>                                                      -->
            <el-table-column  label="下单时间" prop="" sortable>
            </el-table-column>
            <el-table-column  label="所需车型" prop="" sortable>
            </el-table-column>        
            <el-table-column  label="综合评分" prop="" sortable>
            </el-table-column>  
            <el-table-column  label="考核项分类" prop="" sortable>
            </el-table-column>  
            <el-table-column  label="考核项" prop="" sortable>
            </el-table-column>  
            <el-table-column  label="达标" prop="" sortable>
            </el-table-column>  
            <el-table-column  label="实际" prop="" sortable>
            </el-table-column>    
            <el-table-column  label="差异值" prop="" sortable>
            </el-table-column> 
            <el-table-column  label="考核项配分" prop="" sortable>
            </el-table-column> 
            <el-table-column  label="评估值" prop="" sortable>
            </el-table-column> 
            <el-table-column  label="单项评分" prop="" sortable>
            </el-table-column> 
            <el-table-column  label="货主" prop="" sortable>
            </el-table-column>             
            <el-table-column  label="货主归属业务员" prop="" sortable>
            </el-table-column> 
            <el-table-column  label="车主" prop="" sortable>
            </el-table-column> 
            <el-table-column  label="车主归属业务员" prop="" sortable>
            </el-table-column> 
            <el-table-column  label="提货地" prop="" sortable>
            </el-table-column> 
            <el-table-column  label="目的地" prop="" sortable>
            </el-table-column>                                                 
            </el-table> 
                <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>
        	</div> 
          </div>
  </div>
</template>

<script>
import GetCityList from '@/components/GetCityList/city'
import {parseTime,pickerOptions2} from '@/utils/'
import Pager from '@/components/Pagination/index'
export default {
    data(){
        return{
            btnsize:'mini',
            pickerOptions2: {
            shortcuts: pickerOptions2
            },
            tableDataAll:[],
            dataTotal:null,
            sizes:[20,50,100],
            pagesize:20,//每页显示数
            page:1,//当前页

    }
    },
    components:{
        GetCityList,
        Pager
    },
    methods:{
    getStr(val){

    }, 
    handlePageChange(){

    },
    cTime(){

    },
    getData_query(){

    },
    clearSearch(){

    }
    },
     mounted(){
     },
}
</script>
<style lang="scss">

</style>
