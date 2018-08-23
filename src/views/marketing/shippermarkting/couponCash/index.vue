<template>
  <div class="same_shipper clearfix">
    <div class="clearfix" style="height:100%">
        <div class="shipper_Owner ">
          <el-form :inline="true">
            <el-form-item label="所属区域：">
             <vregion :ui="true" @values="regionChange" class="form-control">
                <el-input v-model="formAllData.areaCode2" placeholder="请选择出发地"></el-input>
            </vregion>
            </el-form-item>
            <el-form-item label="服务类型：">
                 <el-select v-model="formAllData.serivceCode" clearable placeholder="请选择" >
                          <el-option
                              v-for="item in serviceCardList"
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
                   <newshipperorder
                    btntext="新增"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    editType="add"
                    btntitle="创建">
                    </newshipperorder>
                   <modshipperorder
                    btntext="修改"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-news"
                    editType="edit"
                    btntitle="修改"
                    :params="selectRowData">
                    </modshipperorder>
                <el-button  type="primary" value="value" plain icon="el-icon-bell" @click="handleUseStates">启用/停用</el-button>
                <el-button type="primary" plain icon="el-icon-delete" @click="delete_data">删除</el-button>
            	</div>

            <div class="info_city">    
               <el-table style="width: 100%" stripe border height="100%" @row-click="clickDetails" highlight-current-row :data="tableDataAll"  >
            <el-table-column  label="序号" width="80px" type="index">
            </el-table-column>
            <el-table-column  label="所属区域" prop="areaCode2" show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="奖励额度限制" prop="rewardMax">
            </el-table-column>
            <el-table-column  label="服务分类" prop="serivceCode">
            </el-table-column>
            <el-table-column  label="车辆类型" prop="carType">
            </el-table-column>                          
            <el-table-column  label="启用状态" >
            <template  slot-scope="scope">
              {{ scope.row.usingStatus == 0 ? '启用' : '禁用' }}
            </template>
            </el-table-column>         
            <el-table-column  label="创建时间" prop="createTime">
            </el-table-column>
            <el-table-column  label="创建人" prop="creater">
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
import { data_Commission ,data_CarList,data_MaidLevel,data_ServerClassList} from '@/api/server/areaPrice.js'
import { data_get_shipperOwnerFrom_list,data_Able_shipperOwnerFrom,data_Del_shipperOwnerFrom} from '@/api/marketing/shippermarkting/shipperOwner.js'
import vregion from '@/components/vregion/Region'
import newshipperorder from '../../components/newshipperorder.vue'
import modshipperorder from '../../components/modshipperorder.vue'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import {parseTime} from '@/utils/'
export default {
  data(){
    return{
      selectRowData:{},
      selectId:[],
      sizes:[30,50,100],
      information:'操作不正确',
      pagesize:30,//每页显示数
      page:1,//当前页
      totalCount:null,
      dataTotal:null,
      tableDataAll:[],
      radio: 1,
       optionsCar:[
       {
          code:null,
          name:'全部'
      }
      ],
      serviceCardList:[
      {    
          code:null,
          name:'全部'
        }
      ],
		formAllData:{
            areaCode2: null,
            carType:null,
            serivceCode:null,
            commissionGrade:null,
         },
    }
  },
    components:{
        newshipperorder,
        vregion,
        Pager,
        modshipperorder
    },
    methods:{
            regionChange(d) {
                console.log('data:',d)
                this.formAllData.areaCode2 = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            },
             getValue(obj){
                return obj ? obj.value:'';
            },
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
                data_ServerClassList().then(res=>{
                      res.data.map((item)=>{
                       this.serviceCardList.push(item);
                    })     
                }).catch(res=>{
                    console.log(res)
                });                    
          },
          // 列表刷新页面  
            firstblood(){
                data_get_shipperOwnerFrom_list(this.page,this.pagesize,this.formAllData).then(res => {
                  console.log('res',res)
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                })
            },
         //  查询
         getData_query(){
          this.firstblood();
          },
         // 选择行
         clickDetails(i){
           this.selectRowData = i;

           console.log('selectRowData',this.selectRowData)
         },
        //每页显示数据量变更
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood();
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
                    data_Del_shipperOwnerFrom(this.selectRowData.id).then(res=>{
                        this.$message.success('删除成功');
                        this.firstblood();       
                        this.selectRowData=''; 
                    }).catch(err => {
                      console.log('rr',res)
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
                    console.log('fdf',this.selectRowData.id);
                  data_Able_shipperOwnerFrom(this.selectId).then(res=>{
                     this.selectId.splice(0,1);
                     if(this.selectRowData.usingStatus==0)
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
        }
   },

   
  mounted(){
     eventBus.$on('pushListtwo', () => {
       this.firstblood()
        })
    this.getMoreInformation();
    this.firstblood();
    },
}
</script>
<style lang="scss" >
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
.same_shipper{
        height:100%;    
        position: relative;
.shipper_Owner{
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
}
.classify_cityinfo{
    height: 100%;
    padding: 70px 15px 0 15px;
    .commoncss{
      display: inline-block!important;
    }
    .btns_box{
    margin-bottom: 10px;
    }
    .info_city{
      height:89%
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


