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
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
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
                    btntitle="创建"
                    :editType="types"
                   >
              </newautocoupon>
              <modautocoupon
                    btntext="修改"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    btntitle="修改"
                    :editType="types"
                    :params = 'selectRowData'
                    >
              </modautocoupon>
                <el-button  type="primary" value="value" plain icon="el-icon-bell" @click="handleUseStates"  v-if="types=='one'">启用/停用</el-button>
                <el-button type="primary" plain icon="el-icon-delete" @click="delete_data">删除</el-button>
                <span  v-if="types=='two'">
              <couponGive
                    btntext="发放"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    editType="Give"
                    btntitle="优惠卷发放"
                    :params = 'selectRowData'
                    >
              </couponGive>
             <couponGive
                    btntext="生成"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    editType="Build"
                    btntitle="优惠卷生成"
                    :params = 'selectRowData'
                    >
              </couponGive>
                </span>
            	</div>
            <div class="info_city">    
            <el-table style="width: 100%" stripe border height="100%"   :data="tableDataAll"  @row-click="clickDetails" highlight-current-row>
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="创建" prop="createTime">
            </el-table-column>
            <el-table-column  label="活动类型" prop="activityType">
            </el-table-column>
            <el-table-column  label="活动名称" prop="activityName">
                <template slot-scope="scope">
                    <automationcheck
                          btntype="text"           
                         :btntext="scope.row.activityName"
                         :editType="types"
                         :templateItem="scope.row"
                          btntitle="详情"
                         :updataflag="true"
                         :optionsCarList='optionsCarList'
                         :MaidLevelList="MaidLevelList"
                         :serviceCardList="serviceCardList"
                         :couponLists="couponLists"
                         :couponTimeLists="couponTimeLists"
                         :couponStatusLists="couponStatusList"
                    ></automationcheck>
                </template>
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
              {{ scope.row.usingStatus == 1 ? '启用' : '停用' }}
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
import {data_CarList,data_MaidLevel,data_ServerClassList} from '@/api/server/areaPrice.js'
import {data_get_couponActive_list,data_Del_couponActive,data_Able_couponActive,data_automationActive,data_couponActive,data_couponActiveTime,data_couponStatus} from '@/api/marketing/shippermarkting/couponActive.js'
import vregion from '@/components/vregion/Region'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import {parseTime} from '@/utils/'
import newautocoupon from './newautocoupon'
import automationcheck from './automationcheck'
import modautocoupon from './modautocoupon'
import couponGive from './couponGive'
export default {
    props:{
      types:{
        type:[Object,String],
        default:''
      }
    },
    data(){
        return{
            selectRowData:[],
            selectId:[],
            createTime:null,
            tableDataAll:[],
            dataTotal:null,
            sizes:[30,50,100],
            pagesize:30,//每页显示数
            page:1,//当前页
            formAllData:{
            activityName:null,
            activityType:null,
            usingStatus:null,
            areaCode: null,
            startTime:null,
            endTime:null,
         },
          activeList:[],
          activeStatus:[
           { code:null,name:'不限'},
           { code:'1',name:'启用'},
           { code:'0',name:'停用'},
          ],
        optionsCarList:[],
        MaidLevelList:[],
        serviceCardList:[],
        couponLists:[],
        couponTimeLists:[],
        couponStatusList:[],    
        }
    },
    components:{
        vregion,
        Pager,
        newautocoupon,
        automationcheck,
        modautocoupon,
        couponGive
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
                if(i!==null){
                this.formAllData.startTime = i[0]
                this.formAllData.endTime = i[1]
                }
                else{
                this.formAllData.startTime = null
                this.formAllData.endTime = null
                }
            },
         //  查询
         getData_query(){
          this.firstblood();
          },

        // 选择行
         clickDetails(i){
             console.log(i)
           this.selectRowData = i
         },
       // 选择删除
        delete_data(){
              if(!this.selectRowData.id){
                this.$message.info('未选中任何删除内容');
                }else{
                this.delDataInformation()
            }
        },
       //确认删除
            delDataInformation(){         
                   this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    data_Del_couponActive(this.selectRowData.id).then(res=>{
                        this.$message.success('删除成功');
                        this.firstblood();       
                        this.selectRowData=''; 
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
        handleUseStates(){
                if(!this.selectRowData.id){
                    //未选择任何修改内容的提示
                        this.$message.info('未选中内容');
                        return
                }else{
                    this.selectId.push(this.selectRowData.id)
                    
                  data_Able_couponActive(this.selectId).then(res=>{
                     this.selectId.splice(0,1);
                     if(this.selectRowData.usingStatus==1)
                     {
                         this.$message.warning('已禁用');
                     }
                     else{
                         this.$message.success('已启用');
                     }
                        this.firstblood();       
                        this.selectRowData='';         
                    })
                }
        },
        getMoreInformation(){
            data_automationActive().then(res=>{
                   res.data.map((item)=>{
                        this.activeList.push(item);
                    })    
                })
                data_CarList().then(res=>{
                    // console.log(res.data)
                    res.data.map((item)=>{
                        this.optionsCarList.push(item);
                    })
                    })
                data_MaidLevel().then(res=>{
                      res.data.map((item)=>{
                        this.MaidLevelList.push(item);
                    })
                }).catch(res=>{
                    console.log(res)
                });    
                data_ServerClassList().then(res=>{
                      res.data.map((item)=>{
                       this.serviceCardList.push(item);
                    })     
                }).catch(res=>{
                    console.log(res)
                });
                data_couponActive().then((res)=>{
                     res.data.map((item)=>{
                       this.couponLists.push(item);
                    })   
                })
                 data_couponActiveTime().then((res)=>{
                     res.data.map((item)=>{
                       this.couponTimeLists.push(item);
                    })   
                })        
                data_couponStatus().then(res=>{
                res.data.map((item)=>{
                       this.couponStatusList.push(item);
                    })   
                })            
        }
    },
     mounted(){
           if(this.types=='two'){
                 this.formAllData.usingStatus = "1";
           }
           else{
                 this.formAllData.usingStatus = null;
           }
         this.getMoreInformation();
         eventBus.$on('changeListtwo', () => {
                this.firstblood()
          })
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
    height: 70px;
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
         width: 280px;
    }
    .el-form-item{
        margin-bottom:0px;
    }
}
.classify_couponinfo{
    height: 100%;
    padding: 70px 15px 0 15px;
    .commoncss{
      display: inline-block!important;
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
