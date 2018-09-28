<template>
    <div class="identicalStyle Marketing" style="height:100%">
          <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
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
                   <el-cascader
                    size="large"
                    :options="options"
                    v-model="formAllData.areaName"
                    @change="handleChange">
                    </el-cascader>
            </el-form-item> 
            <el-form-item label="活动时间：">
                    <el-date-picker
                        is-range
                        unlink-panels
                        :picker-options="pickerOptions2"
                        type="daterange"
                        align="right"
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
          <el-button type="primary"  plain @click="getData_query" :size="btnsize">查询</el-button> 
          </el-form-item>
          </el-form>
          	<div class="classify_info">
            	<div class="btns_box">
              <newautocoupon
                    btntext="新增"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    btntitle="创建"
                    :editType="types"
                    @getData="getDataList"
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
                    @getData="getDataList"
                    >
              </modautocoupon>
                <el-button  type="primary" value="value" plain icon="el-icon-bell" @click="handleUseStates"  v-if="types=='one'" :size="btnsize">启用/停用</el-button>
                <el-button type="primary" plain icon="el-icon-delete" @click="delete_data" :size="btnsize">删除</el-button>
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
            	</div>
            <div class="info_news">    
            <el-table ref="multipleTable" style="width: 100%" stripe border height="100%"   :data="tableDataAll" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row>
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
            <el-table-column  label="已派发优惠券金额" prop="distribution" sortable>
            </el-table-column>       
            <el-table-column  label="已使用优惠券金额" prop="alreadyuse" sortable>
            </el-table-column>                                                       
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
import {data_get_couponActiveauto_list,data_Del_couponActive,data_Able_couponActive,data_automationActive,data_couponActive,data_couponActiveTime,data_couponStatus} from '@/api/marketing/shippermarkting/couponActive.js'
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
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
           btnsize:'mini',
           pickerOptions2: {
           shortcuts: pickerOptions2
            },
            options:regionDataPlus,
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
        couponGive
    },
    methods:{
             // 列表刷新页面  
            firstblood(){
                let FromData = {}
                if(this.formAllData.area) {
                    FromData = {
                     area:this.formAllData.area,
                     city:null,
                     activityName:this.formAllData.activityName,
                     activityType:this.formAllData.activityType,  
                     usingStatus:this.formAllData.usingStatus,
                     activityType:this.formAllData.activityType, 
                     startTime:this.formAllData.startTime, 
                     endTime:this.formAllData.endTime,                              
                    }
                }
                else if(this.formAllData.city){
                    FromData = {
                     area:null,
                     city:this.formAllData.city,
                     activityName:this.formAllData.activityName,
                     activityType:this.formAllData.activityType,  
                     usingStatus:this.formAllData.usingStatus,
                     activityType:this.formAllData.activityType, 
                     startTime:this.formAllData.startTime, 
                     endTime:this.formAllData.endTime,          
                    }                    
                }
                else{
                    FromData = {
                     area:null,
                     city:this.formAllData.city,
                     activityName:this.formAllData.activityName,
                     activityType:this.formAllData.activityType,  
                     usingStatus:this.formAllData.usingStatus,
                     activityType:this.formAllData.activityType, 
                     startTime:this.formAllData.startTime, 
                     endTime:this.formAllData.endTime,           
                    }  
                }

                data_get_couponActiveauto_list(this.page,this.pagesize,FromData).then(res => {
                  console.log(res)
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                })
            },
            handleChange(d){
            console.log('d',d)
            if(d.length<3){
                    if(d.length==2){
                    this.$message.error('请选择具体的城市');
                    }
                    this.formAllData.areaCode = null;
                    this.formAllData.province = null,
                    this.formAllData.city = null,
                    this.formAllData.area = null,
                    this.formAllData.areaName = [];
            }
            else{
                    this.formAllData.areaCode = d
                    this.formAllData.province = CodeToText[d[0]]
                    this.formAllData.city =  CodeToText[d[1]]
                    if(d[2]==''){
                    this.formAllData.area = ''
                    }
                    else{
                    this.formAllData.area = CodeToText[d[2]]
                    }
            }
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
                     if(this.selectRowData.usingStatus==1)
                     {
                         this.$message.warning('已禁用');
                     }
                     else{
                         this.$message.success('已启用');
                     }
                        this.firstblood();       
                        this.$refs.multipleTable.clearSelection(); 
                    })
                }
        },
        getMoreInformation(){
            data_automationActive().then(res=>{
                   res.data.map((item)=>{
                        this.activeList.push(item);
                    })
                    this.activeList.splice(0,1)
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
         this.formAllData.usingStatus = null;
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
}
</style>
