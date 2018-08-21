<template>
 <div class="coupon_shipper clearfix">
    <div class="clearfix" style="height:100%">
        <div class="shipper_coupon1 ">
          <el-form :inline="true">
            <el-form-item label="活动名称：">
               <el-input v-model="formAllData.activityName"></el-input>
            </el-form-item>     
            <el-form-item label="活动类型：">
                 <el-select v-model="formAllData.activityType" clearable placeholder="请选择" >
                          <el-option
                              v-for="item in activeList"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="活动状态：">
                 <el-select v-model="formAllData.usingStatus" clearable placeholder="请选择" >
                          <el-option
                             v-for="item in activeStatus"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
            </el-form-item>  
            <br>
            <el-form-item label="所属区域：">
             <vregion :ui="true" @values="regionChange" class="form-control">
                <el-input v-model="formAllData.areaCode" placeholder="请选择出发地"></el-input>
            </vregion>
            </el-form-item> 
            <el-form-item label="活动时间：">
                    <el-date-picker
                        is-range
                        type="daterange"
                        v-model="createTime"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        value-format="timestamp"
                        @change='cTime'
                        >
                    </el-date-picker>
            </el-form-item>        
            <el-form-item>       
          <el-button type="primary"  plain @click="getData_query">查询</el-button> 
          </el-form-item>
          </el-form>
         </div>
          	<div class="classify_couponinfo">
            	<div class="btns_box">
              <newautocoupon
                    btntext="新增"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    editType="add"
                    btntitle="创建"
                   >
              </newautocoupon>
                <el-button  type="primary" value="value" plain icon="el-icon-bell" >启用/停用</el-button>
                <el-button type="primary" plain icon="el-icon-delete" >删除</el-button>
            	</div>
            <div class="info_city">    
            <el-table style="width: 100%" stripe border height="100%"   :data="tableDataAll">
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="创建" prop="createTime">
            </el-table-column>
            <el-table-column  label="活动类型" prop="activityType">
            </el-table-column>
            <el-table-column  label="活动名称" prop="activityName">
            </el-table-column>
            <el-table-column  label="所属区域" prop="areaCode">
            </el-table-column>
            <el-table-column  label="已派发优惠券金额" prop="distribution">
            </el-table-column>       
            <el-table-column  label="已使用优惠券金额" prop="alreadyuse">
            </el-table-column>                                                       
            <el-table-column  label="开始时间" prop="startTime">
            </el-table-column>
            <el-table-column  label="结束时间" prop="endTime">
            </el-table-column>            
            <el-table-column  label="启用状态" >
            <template  slot-scope="scope">
              {{ scope.row.usingStatus == 0 ? '启用' : '停用' }}
            </template>
            </el-table-column>          
            </el-table> 
                <!-- 页码 -->
        <div class="info1_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>
        	</div> 
          </div>
      </div>
  </div>
</template>

<script>
import {data_get_couponActive_list} from '@/api/marketing/shippermarkting/couponActive.js'
import vregion from '@/components/vregion/Region'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import {parseTime} from '@/utils/'
import newautocoupon from './newautocoupon'
export default {
    data(){
        return{
            createTime:null,
            tableDataAll:[],
            dataTotal:null,
            sizes:[30,50,100],
            pagesize:20,//每页显示数
            page:1,//当前页
            formAllData:{
            activityName:null,
            activityType:null,
            usingStatus:null,
            areaCode: null,
            startTime:null,
            endTime:null,
         },
          activeList:[
           { code:null,name:'全部'},
           { code:'新用户注册',name:'新用户注册'},
           { code:'认证通过',name:'认证通过'},
          ],
          activeStatus:[
           { code:null,name:'不限'},
           { code:'启用',name:'启用'},
           { code:'禁用',name:'禁用'},
          ],
        }
    },
    components:{
        vregion,
        Pager,
        newautocoupon
    },
    methods:{
             // 列表刷新页面  
            firstblood(){
                data_get_couponActive_list(this.page,this.pagesize,this.formAllData).then(res => {
                  console.log(res)
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                })
            },
             regionChange(d) {
                console.log('data:',d)
                this.formAllData.areaCode = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            },
             getValue(obj){
                return obj ? obj.value:'';
            },
            //每页显示数据量变更
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
        },
            cTime(i){
                this.formAllData.startTime = i[0]
                this.formAllData.endTime = i[1]
            },
         //  查询
         getData_query(){
          this.firstblood();
          },
    },
     mounted(){
         this.firstblood();
     },
}
</script>
<style lang="scss">
.coupon_shipper{
        height:100%;    
        position: relative;
.shipper_coupon1{
    position: absolute;
    left: 0;
    top: 0;
    padding: 15px 16px;
    height: 140px;
    width: 100%;
    line-height: 35px;
    .el-input__inner{
      height: 30px;
      line-height: 30px;
    }
    .v-dropdown-container{
        top:35px!important;
        left:0px!important;
    }
    .el-button{
      margin-right: 20px;
      padding: 8px 20px!important;
    }
    .el-range-editor{
        margin-left:0px;
        margin-top:5px;
        .el-range__icon{
            line-height: 24px;
        }
        .el-range-separator{
             line-height: 24px;
             width:7%;
        }
         .el-range__close-icon{
             line-height: 24px;
         }
    }
}
.classify_couponinfo{
    height: 100%;
    padding: 140px 15px 0 15px;
    .commoncss{
      display: inline-block!important;
    }
    .btns_box{
    margin-bottom: 10px;
    }
    .info_city{
      height:100%
    }
    .el-button{
      margin-right: 20px;
      padding: 8px 20px!important;
    }
}
.info1_tab_footer{
    padding-left: 20px;
    background: #eee;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .show_pager{float: right}
    .page-select{top:5px;
    .el-input__inner{
      height: 30px;
      line-height: 30px; 
    }
    }
}
}

</style>
