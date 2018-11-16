<template>
    <div style="height:100%;"  class="identicalStyle District" v-loading="loading">
          <el-form :inline="true" class="classify_searchinfo">
            <el-form-item label="所在地">
                <GetCityList ref="area" v-model="formAllData.areaName"  @returnStr="getStr"></GetCityList>
            </el-form-item>
            <el-form-item label="商圈名称">
                <el-input v-model="formAllData.tradeName" ></el-input>
            </el-form-item>
            <el-form-item label="商圈场主">
                <el-input v-model="formAllData.tradeOwner"></el-input>
            </el-form-item>
            <el-form-item class="fr"> 
                <el-button type="primary" plain :size="btnsize"  @click="getdata_search" icon="el-icon-search">搜索</el-button>
                <el-button type="info" plain :size="btnsize" @click="clearSearch" icon="fontFamily aflc-icon-qingkong">清空</el-button>
            </el-form-item>            
    </el-form>
		<div class="classify_info" >
			<div class="btns_box">
                 <el-button  type="primary" value="value" plain icon="el-icon-circle-plus" @click="openDialogAdd()" :size="btnsize"  v-has:BUSINESS_AREA_MANAGE_BUSINESS_ADD>新增</el-button>
                 <el-button  type="primary" value="value" plain icon="el-icon-edit" @click="openDialogEdit()" :size="btnsize"  v-has:BUSINESS_AREA_MANAGE_BUSINESS_UPDATE>修改</el-button>
                <el-button type="primary" plain :size="btnsize" @click="handleUseStates" icon="el-icon-bell" v-has:BUSINESS_AREA_MANAGE_BUSINESS_USE>启用/停用</el-button>
                <el-button type="primary" plain :size="btnsize" @click="delete_data" icon="el-icon-delete" v-has:BUSINESS_AREA_MANAGE_BUSINESS_DELETE>删除</el-button>
			</div>
            <div class="info_news">
            <el-table style="width: 100%" stripe border height="100%" :data="tableDataAll" ref="multipleTable"  @selection-change="getSelection" @row-click="clickDetails" highlight-current-row tooltip-effect="dark">
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
            <el-table-column  label="商圈名称" sortable>
                        <template slot-scope="scoped">
                        <span @click="openDialogView(scoped.row)" class="BtnInfo">{{scoped.row.tradeName}}</span>
                        </template>
            </el-table-column>
            <el-table-column  label="所在地" prop="areaName" sortable>
            </el-table-column>    
            <el-table-column  label="商圈场主" prop="tradeOwner" sortable>
            </el-table-column> 
            <el-table-column  label="场主手机号" prop="ownerPhone" sortable>
            </el-table-column>
            <el-table-column  label="商圈货主数量" prop="" sortable>
            </el-table-column>       
            <el-table-column  label="状态" sortable>
            <template  slot-scope="scope">
              {{ scope.row.usingStatus == 1 ? '启用' : '停用' }}
            </template>
            </el-table-column>                                                                                                           
            </el-table> 
        </div>
		</div>
         <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>
    

    <!-- 弹框 -->
    <div class="shoppingDialog commoncss">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" top=5vh v-dialogDrag :title="btntitle">
        <el-form ref="formAll" :model="formAll" :rules="rulesForm" :label-width="formLabelWidth">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商圈名称 ："  prop="tradeName">
                    <el-input v-model="formAll.tradeName" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                     <span v-if="editType !=='add'&&!selectFlag">
                    <el-form-item label="所在区域 ：" >
                    <el-input v-model="formAll.areaName" placeholder="请选择" :disabled="editType=='view'" @focus="changeSelect"></el-input>
                    </el-form-item>
                     </span>
                     <span v-else>
                    <el-form-item label="所在区域 ："  prop="areaName">
                      <GetCityList ref="area" v-model="formAll.areaName"  @returnStr="getStr1"></GetCityList>
                    </el-form-item>
                     </span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="详细地址 ：" >
                    <el-input v-model="formAll.address" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="商圈场主 ："  prop="tradeOwner">
                    <el-input v-model="formAll.tradeOwner" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="场主手机号 ："  prop="ownerPhone">
                    <el-input v-model="formAll.ownerPhone" :disabled="editType=='view'" maxlength="11"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>         
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商圈地理围栏（多边形） ：">
                     <ShoppingMap ref="mapblock" @returnStr = returnStr  @EditStr = 'EditStrtype'  :fromData = 'formAll' id="mapblock" :editstatusMap = 'editstatus' ></ShoppingMap>
                    </el-form-item>
                </el-col>
            </el-row>              
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="add_data" v-if="editType=='add'">确 定1</el-button>
          <el-button type="primary"  @click="edit_data" v-if="editType=='edit'">确 定2</el-button>
          <el-button @click="close()" >取 消</el-button>
        </div>
      </el-dialog> 
      </div>
    
    
    </div>
</template>

<script>
import {data_get_aflcTradeArea_list,data_Del_aflcTradeArea,data_Able_aflcTradeArea,data_get_aflcTradeArea_Id,data_get_aflcTradeArea_create,data_get_aflcTradeArea_update} from '@/api/users/district/shoppingDistrict.js'
import GetCityList from '@/components/GetCityList/city'
import ShoppingMap from '@/components/map/shoppingMap'
import shoppingCread from './shoppingCread.vue'
import shoppingDialog from './shoppingDialog.vue'
import Pager from '@/components/Pagination/index'
import { eventBus } from '@/eventBus'
export default {
    data(){
          //    选择省市校验
        const areaNameValidator = (rule, val, cb) => {
            if(val){
            if(val.length<1){
            cb(new Error('所属地区不能为空'))
            }
            else{
                cb()
            }                 
            }else{
            cb(new Error('所属地区不能为空'))
            }
        }

    //    选择商圈地区校验
        const tradeNameValidator = (rule, val, cb) => {
            var reg =/^[A-Za-z0-9\u4e00-\u9fa5]+$/
            if(!val){
            cb(new Error('商圈地区不能为空'))
            }
            if(!reg.test(val)){
            cb(new Error('请匹配字母&数字&汉字'))    
            }
            else{
                cb()
            }
        }

    //    选择商圈场主校验
        const tradeOwnerValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('商圈场主不能为空'))
            }
            else{
                cb()
            }        
        }
    //    选择场主手机号校验
        const ownerPhoneValidator = (rule, val, cb) => {
            let phoneTest = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
            !val && cb(new Error('场主手机号码不能为空'))
            if(!(phoneTest.test(val))){
                cb(new Error('请输入正确的手机号码格式'))
            } 
            else{
               cb()
            }  
        }
        return{
            oldpoints:[],
            editclear:'0',
            editstatus:'0',
            loading:true,
            templateRadio: '',
            btnsize:'mini',
            selectRowData:{},
            page:1,
            pagesize:20,
            dataTotal:0,
            tableDataAll:[],
            selectId:[],
            formAllData:{
                areaCode: null,
                tradeName:null,
                tradeOwner:null,
                areaCode:null,
                areaName:null,
            },
            btntitle:'',
            editType:'',
            selectFlag:null,
            dialogFormVisible_add: false,
            formLabelWidth:'190px',
            formAll:{
                tradeName:null,
                areaName:null,
                areaCode: null,
                province:null,
                city:null,
                area:null,
                address:null,
                tradeOwner:null,
                ownerPhone:null,
                points:[]        
            },
            rulesForm:{
                tradeName:{trigger:'change',required:true,validator: tradeNameValidator},            
                areaName:{trigger:'change',required:true,validator: areaNameValidator},         
                tradeOwner:{trigger:'change',required:true,validator: tradeOwnerValidator},            
                ownerPhone:{trigger:'change',required:true,validator: ownerPhoneValidator},                                      
                },
        }
    },
    components:{
    shoppingCread,
    shoppingDialog,
    Pager,
    GetCityList,
    ShoppingMap,
    
    },
    mounted(){
        this.firstblood();
        eventBus.$on('pushListtwo', () => {
                this.firstblood()
          })
    },
    watch:{
    dialogFormVisible_add:{
            handler: function(val, oldVal) {
                if(!val){
                    this.$refs['formAll'].resetFields();
                    this.formAll={
                        tradeName:null,
                        areaName:null,
                        areaCode: null,
                        province:null,
                        city:null,
                        area:null,
                        address:null,
                        tradeOwner:null,
                        ownerPhone:null,
                        points:[]        
                    },
                    this.selectFlag = null;
                    this.$refs.area.clearData();
                    this.$refs.mapblock.exit()
                }
                else{
                   if(this.$refs.mapblock){
                   this.$refs.mapblock.editclear='0'
                    this.$refs.mapblock.loadMap()
                   }
                }
            },
        },
    },
    methods:{
    getStr(val){
                this.formAllData.areaCode = val.area.code;
            },  

    getStr1(val){
                this.formAll.areaCode= val.area.code
                this.formAll.areaName = val.area.name
                this.formAll.province = val.province.name
                this.formAll.city = val.city.name
                this.formAll.area = val.area.name
                this.$refs.mapblock.setCity()
            },  
   change:function(){
      this.dialogFormVisible_add = false;
   },
   close:function(){
      this.dialogFormVisible_add = false;
       },
   
   //    新增打开
    openDialogAdd(){
        this.dialogFormVisible_add = true;
        this.btntitle="创建";
        this.editType="add";
        this.editstatus = '0';
        this.formAll.points =[]
    },
   //    修改打开
    openDialogEdit(){
          if(!this.selectRowData.length){
               this.$message.warning('请选择您要操作的用户');
               return
          }
          else if(this.selectRowData.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的用户');
               return false
          }else if (this.selectRowData.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.getDataList();
                return false
          }
    else{
        data_get_aflcTradeArea_Id(this.selectRowData[0].id).then(res=>{
           this.formAll.tradeName = res.data.tradeName
           this.formAll.address = res.data.address
           this.formAll.province = res.data.province
           this.formAll.city = res.data.city
           this.formAll.area = res.data.area
           this.formAll.tradeOwner = res.data.tradeOwner
           this.formAll.ownerPhone = res.data.ownerPhone
           this.formAll.areaName = res.data.areaName
           this.formAll.areaCode = res.data.areaCode
           this.formAll.points =JSON.parse(res.data.points)
           this.oldpoints = JSON.parse(res.data.points)
        })
        this.dialogFormVisible_add = true;
        this.btntitle="修改";
        this.editType="edit";
        this.editstatus = '1';
    }
    },
    openDialogView(e){
        
        data_get_aflcTradeArea_Id(e.id).then(res=>{
           this.formAll.tradeName = res.data.tradeName
           this.formAll.address = res.data.address
           this.formAll.province = res.data.province
           this.formAll.city = res.data.city
           this.formAll.area = res.data.area
           this.formAll.tradeOwner = res.data.tradeOwner
           this.formAll.ownerPhone = res.data.ownerPhone
           this.formAll.areaName = res.data.areaName
           this.formAll.areaCode = res.data.areaCode
           this.formAll.points =JSON.parse(res.data.points)
        })
        this.dialogFormVisible_add = true;
        this.btntitle="详情";
        this.editType="view";
        this.editstatus = '2';

    },
    EditStrtype(e){
     this.editclear = e
    },

   // 省市状态表
     changeSelect(){
       this.selectFlag='1'
      },    
    returnStr(e){
     this.formAll.points = []
     console.log('e',e)
     var unshiftAraay = [e[0].lng,e[0].lat]
     if(e.length>1){
         for(let i = 1;i<e.length;i++)
         {
         this.formAll.points.push(e[i])
         }
        this.formAll.points.unshift(unshiftAraay)
     }

    },   

    // 列表刷新页面  
    firstblood(){
        this.loading =true
        data_get_aflcTradeArea_list(this.page,this.pagesize,this.formAllData).then(res=>{
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                    this.loading = false
        })
    },
    // 查询
    getdata_search(){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
        this.firstblood();
    },
    // 清空查询
    clearSearch(){
                this.formAllData.areaCode = null;
                this.formAllData.areaName = null;
                this.formAllData.tradeName=null,
                this.formAllData.tradeOwner=null,
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
                this.firstblood();
                this.$refs.area.clearData();
                
    },
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
                    if(!this.selectRowData.length){
                        this.$message.warning('请选择您要操作的用户');
                        return
                    }
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
                    data_Del_aflcTradeArea(this.selectRowData[0].id).then(res=>{
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
                    if(!this.selectRowData.length){
                        this.$message.warning('请选择您要操作的用户');
                        return
                    }
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
                  data_Able_aflcTradeArea(this.selectId).then(res=>{
                     this.selectId.splice(0,1);
                     if(this.selectRowData[0].usingStatus==1)
                     {
                         this.$message.warning('已停用');
                     }
                     else{
                         this.$message.success('已启用');
                     }
                        this.firstblood();       
                        this.$refs.multipleTable.clearSelection(); 
                    })
                }
        },  
        handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
        },        
        getDataList(){
            this.firstblood()
            this.$refs.multipleTable.clearSelection();
            },
    // 新增按钮
    add_data(){
       this.$refs['formAll'].validate(valid=>{
        if(valid){
        let forms={
            areaCode:this.formAll.areaCode,
            areaName:this.formAll.areaName,
            province:this.formAll.province,
            city:this.formAll.city,
            area:this.formAll.area,
            tradeName:this.formAll.tradeName,
            address:this.formAll.address,
            tradeOwner:this.formAll.tradeOwner,
            ownerPhone:this.formAll.ownerPhone,    
            points:JSON.stringify(this.formAll.points)
        }
        console.log(forms)
        this.dialogFormVisible_add = false;
        data_get_aflcTradeArea_create(forms).then(res=>{
           this.$message.success('新增成功');
           this.getDataList();
           console.log(res);
            this.oldpoints=[];
        }).catch(err=>{
            this.$message.error(err.text)
            this.getDataList();
           console.log(res);
           this.oldpoints=[]
        })
       }
       })
    },
    // 修改按钮
    edit_data(){
        var newpoints = [];
         let forms;
         console.log('data',this.formAll.points[0].O)       
        if(this.formAll.points[0].O){
          newpoints = this.oldpoints
            forms={
            areaCode:this.formAll.areaCode,
            areaName:this.formAll.areaName,
            province:this.formAll.province,
            city:this.formAll.city,
            area:this.formAll.area,
            tradeName:this.formAll.tradeName,
            address:this.formAll.address,
            tradeOwner:this.formAll.tradeOwner,
            ownerPhone:this.formAll.ownerPhone,    
            id:this.selectRowData[0].id,
        }
        }else{
          newpoints = this.formAll.points
            forms={
            areaCode:this.formAll.areaCode,
            areaName:this.formAll.areaName,
            province:this.formAll.province,
            city:this.formAll.city,
            area:this.formAll.area,
            tradeName:this.formAll.tradeName,
            address:this.formAll.address,
            tradeOwner:this.formAll.tradeOwner,
            ownerPhone:this.formAll.ownerPhone,    
            id:this.selectRowData[0].id,
            points:JSON.stringify(newpoints)
        }
        }
        this.dialogFormVisible_add = false;
        data_get_aflcTradeArea_update(forms).then(res=>{
           this.getDataList();
            this.$message.success('修改成功');
        }).catch(err=>{
            this.getDataList();
            this.$message.error(err.text)
        })
    }     
    }
}
</script>
<style lang="scss">
.District{
.el-cascader{
        margin-top:-10px;
}
.btns_box{
    .el-button{
        font-size:12px;
    }
}
.shoppingDialog{
     display: inline-block;
        .el-dialog{
         width: 1200px!important;
     }
    .el-button{
        padding: 7px 15px 7px;
        }

}
.info_news .shoppingDialog .el-button{
        padding: 0px 15px 0px;
}
.BtnInfo{
    font-weight: bold;
    color: #3e9ff1;
    cursor: pointer;
    }   
}
</style>

