<template>
    <div class='carOwner_shipper'>
        <div class="shipper_searchinfo">
          <el-form :inline="true" >
            <el-form-item label="所属区域：">
              <GetCityList  ref="area"></GetCityList>
            </el-form-item>
            <el-form-item label="车主抽佣等级：">
                 <el-select v-model="MaidLevelValueCar" clearable placeholder="请选择" >
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
                 <el-select v-model="newValueCar" clearable placeholder="请选择" >
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
          <el-button type="primary"  plain >查询</el-button> 
          </el-form-item>              
          
          </el-form>
         </div>
          	<div class="classify_info">
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
                   >
                    </newCity>
                <el-button  type="primary" value="value" plain icon="el-icon-bell" >启用/禁用</el-button>
                <el-button  type="primary" value="value" plain icon="el-icon-news" >停用</el-button>
                <el-button type="primary" plain icon="el-icon-delete">删除</el-button>
            		</div>
                 <el-table style="width: 100%" stripe border height="87%" >
               <el-table-column label="" width="65">
                     <template slot-scope="scope">
                <el-radio >&nbsp;</el-radio>

              </template>
                </el-table-column>
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="省市" >
                
            </el-table-column>

            <el-table-column  label="服务类型" >
                
            </el-table-column>
            <el-table-column  label="价格上浮(倍)">
            </el-table-column>
            <el-table-column  label="状态" >
            </el-table-column>
            <el-table-column  label="操作人"  >
                
            </el-table-column>   
            <el-table-column  label="操作时间">
                
            </el-table-column>               
            </el-table> 
                <!-- 页码 -->
              <div class="Pagination ">
                    <div class="block">
                    <el-pagination >
                    </el-pagination>
                    </div>
              </div>
      		</div>
      </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel} from '../../../../api/server/areaPrice.js'
import GetCityList from '@/components/GetCityList'
import Region from '@/components/vregion/Region.vue' 
import newCity from '../../components/newCity.vue'
import { eventBus } from '@/eventBus'
import {parseTime} from '@/utils/'
export default {
  data(){
    return{
      radio: 1,
       optionsCar:[
       {
          code:null,
          name:'全部'
      }
      ],
      newValueCar:'',
      MaidLevelValueCar:'',
      MaidLevel:[
      {    
          code:null,
          name:'全部'
        }
      ],
    }
  },
    components:{
        GetCityList,
        newCity,
        Region
    },
    methods:{
            //获取  服务和车辆 类型列表
            getMoreInformation(){
                data_CarList().then(res=>{
                    // console.log(res.data)
                    res.data.map((item)=>{
                        this.optionsCar.push(item);
                    })
                    })
                data_MaidLevel().then(res=>{
                      res.data.map((item)=>{
                        this.MaidLevel.push(item);
                    })
                
                      
                }).catch(res=>{
                    console.log(res)
                });    
                
          }
   },
  mounted(){
    this.getMoreInformation();
    },
}
</script>
<style lang="scss"  scoped>
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
.carOwner_shipper{
    height: 100%;
    position: relative;
    .el-tabs__content{
            padding: 15px
    }
    .shipper_searchinfo{
     position: absolute;
    left: 0;
    top: 0;
    padding: 15px 16px;
    border-bottom: 2px dashed #ccc;
    height: 70px;
    width: 100%;
    line-height: 35px;
   }
   .classify_info{
    height: 100%;
    padding: 90px 13px 0 0;
   }
    .creatDialog {
        display: inline-block;
    }
}
</style>


