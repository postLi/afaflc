<template>
    <div class="identicalStyle Marketing" style="height:100%" v-loading="loading">
          <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="活动名称：">
               <el-input v-model="formAllData.activityName" class="activeCss"></el-input>
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
            <GetCityList ref="area" v-model="formAllData.areaName"  @returnStr="getStr"></GetCityList>
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
            <el-form-item class="fr">       
          <el-button type="primary" plain @click="getData_query" :size="btnsize" icon="el-icon-search">搜索</el-button> 
          <el-button type="info" plain @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>
          </el-form>
          	<div class="classify_info">
            	<div class="btns_box">
              <newautocoupon
                    btntext="新增"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-circle-plus"
                    btntitle="创建"
                    :editType="types"
                    @getData="getDataList"
                    v-has:MARKETING_SHIPPER_MANAGE_COUPON_ACTIVITY_ADD
                   >
              </newautocoupon>
              <modautocoupon
                    btntext="修改"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-edit"
                    btntitle="修改"
                    :editType="types"
                    :params = 'selectRowData'
                    @getData="getDataList"
                    v-has:MARKETING_SHIPPER_MANAGE_COUPON_ACTIVITY_UPDATE
                    >
              </modautocoupon>
                <span  v-if="types=='two'" class="sw">
              <couponGive
                    btntext="发放"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    editType="Give"
                    btntitle="优惠卷发放"
                    :params = 'selectRowData'
                    @getData="getDataList"
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
                    @getData="getDataList"
                    >
              </couponGive>
                </span>
                 <el-button  type="primary" value="value" plain icon="el-icon-bell" @click="handleUseStates"  v-if="types=='one'">启用/停用</el-button>
                <el-button type="primary" plain icon="el-icon-delete" @click="delete_data" :size="btnsize">删除</el-button>
            	</div>
            <div class="info_news">    
            <el-table ref="multipleTable" style="width: 100%" stripe border height="100%"   :data="tableDataAll"  @selection-change="getSelection" @row-click="clickDetails" highlight-current-row>
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
            <el-table-column  label="创建" prop="createTime" sortable>
            </el-table-column>
            <el-table-column  label="活动类型" prop="activityType" sortable>
            </el-table-column>
            <el-table-column  label="活动名称" prop="activityName" sortable>
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
            <el-table-column  label="所属区域" prop="areaName" show-overflow-tooltip sortable>
            </el-table-column>
            <!-- <el-table-column  label="已派发优惠券金额" prop="distribution" sortable>
            </el-table-column>       
            <el-table-column  label="已使用优惠券金额" prop="alreadyuse" sortable>
            </el-table-column>                                                        -->
            <el-table-column  label="开始时间" prop="startTime" sortable>
            </el-table-column>
            <el-table-column  label="结束时间" prop="endTime" sortable>
            </el-table-column>            
            <el-table-column  label="启用状态" sortable>
            <template  slot-scope="scope">
              {{ scope.row.usingStatus == 1 ? '启用' : '停用' }}
            </template>
            </el-table-column>          
            </el-table> 
                <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>
        	</div> 
          </div>
  </div>
</template>

<script>
import {data_CarList,data_MaidLevel,data_ServerClassList} from '@/api/server/areaPrice.js'
import {data_get_couponActivehand_list,data_Del_couponActive,data_Able_couponActive,data_automationActive,data_couponActive,data_couponActiveTime,data_couponStatus} from '@/api/marketing/shippermarkting/couponActive.js'
import GetCityList from '@/components/GetCityList/city'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import {parseTime,pickerOptions2} from '@/utils/'
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
            loading:true,
           pickerOptions2: {
             shortcuts: pickerOptions2
            },
            btnsize:'mini',
            selectRowData:[],
            selectId:[],
            createTime:null,
            tableDataAll:[],
            dataTotal:null,
            sizes:[20,50,100],
            pagesize:20,//每页显示数
            page:1,//当前页
            formAllData:{
            activityName:null,
            activityType:null,
            usingStatus:null,
            areaCode: null,
            startTime:null,
            endTime:null,
            areaName:null,
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
        Pager,
        newautocoupon,
        automationcheck,
        modautocoupon,
        couponGive,
        GetCityList
    },
    methods:{
             // 列表刷新页面  
            firstblood(){
                this.loading = true
                data_get_couponActivehand_list(this.page,this.pagesize,this.formAllData).then(res => {
                  console.log(res)
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                    this.loading = false
                })
            },
            getStr(val){
                console.log('this.cityarr',val,name)
                this.formAllData.areaCode = val.area.name
            }, 
            //每页显示数据量变更
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
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
            // 清空
            clearSearch(){
            this.createTime = null;
            this.formAllData =  {
                activityName:null,
                activityType:null,
                usingStatus:null,
                startTime:null,
                endTime:null,
                areaCode: null,
                province:null,
                city:null,
                area:null,
                areaName:null,
            }
            this.$refs.area.clearData();
                this.firstblood()    
            },

            // 判断选中与否
            getSelection(val){
            console.log('选中内容',val)
            this.selectRowData = val;
            },
            //点击选中当前行
            clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row);
            },
       // 选择删除
        delete_data(){
          if(this.selectRowData.length == 0){
               this.$message.warning('请选择您要操作的用户');
               return
          }else if (this.selectRowData.length > 1) {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
               this.$refs.multipleTable.clearSelection();
          }
        else {
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
                    data_Del_couponActive(this.selectRowData[0].id).then(res=>{
                        this.$message.success('删除成功');
                        this.firstblood();       
                        this.$refs.multipleTable.clearSelection();
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + err.text ? err.text : err
                        })
                        this.$refs.multipleTable.clearSelection();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                    this.$refs.multipleTable.clearSelection();
                })   
            },
        // 启用禁用
        handleUseStates(){
                if(this.selectRowData.length == 0){
                    this.$message.warning('请选择您要操作的用户');
                    return
                }else if (this.selectRowData.length > 1) {
                        this.$message({
                            message: '每次只能操作单条数据~',
                            type: 'warning'
                        })
                    this.$refs.multipleTable.clearSelection();
                }
                else {
                    this.selectId.push(this.selectRowData[0].id)
                    
                  data_Able_couponActive(this.selectId).then(res=>{
                     this.selectId.splice(0,1);
                     if(this.selectRowData[0].usingStatus==1)
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
                    let activeListType = []
                    res.data.map((item)=>{
                       activeListType.push(item);
                    })
                    this.activeList.push(activeListType[0])
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
        },
                   getDataList(){
                this.firstblood()
                this.$refs.multipleTable.clearSelection();
    }
    },
     mounted(){
         if(this.types=='two')
         this.formAllData.usingStatus = "1";
         this.getMoreInformation();
         eventBus.$on('changeListtwo', () => {
                this.firstblood()
          })
         this.firstblood();
     },
}
</script>
<style lang="scss">
.Marketing{
  .el-cascader{
    margin-top:-10px;
  }
  .sw{
      display: inline-block
  }
}
</style>
