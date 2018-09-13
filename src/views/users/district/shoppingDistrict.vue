<template>
    <div style="height:100%;"  class="identicalStyle">
          <el-form :inline="true" class="classify_searchinfo">
            <el-form-item label="所在地：">
                   <el-cascader
                    size="large"
                    :options="options"
                    v-model="formAllData.areaName"
                    @change="handleChange">
                    </el-cascader>
            </el-form-item>
            <el-form-item label="商圈名称：">
                <el-input v-model="formAllData.tradeName"></el-input>
            </el-form-item>
            <el-form-item label="商圈场主：">
                <el-input v-model="formAllData.tradeOwner"></el-input>
            </el-form-item>
            <el-form-item class="fr"> 
                <el-button type="primary" plain :size="btnsize"  >查询</el-button>
                <el-button type="info" plain :size="btnsize" >清空</el-button>
            </el-form-item>            
    </el-form>
		<div class="classify_info" >
			<div class="btns_box">
                   <shoppingDialog
                    btntext="新增"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    editType="add"
                    btntitle="创建">
                    </shoppingDialog>
                <el-button type="primary" plain :size="btnsize">修改</el-button>
                <el-button type="primary" plain :size="btnsize">启用/停用</el-button>
			</div>
            <div class="info_news">
            <el-table style="width: 100%" stripe border height="100%" >
            <el-table-column  label="商圈名称" prop="">
            </el-table-column>
            <el-table-column  label="所在地" prop="">
            </el-table-column>    
            <el-table-column  label="商圈场主" prop="">
            </el-table-column> 
            <el-table-column  label="满减/折扣" prop="">
            </el-table-column> 
            <el-table-column  label="场主手机号" prop="">
            </el-table-column>
            <el-table-column  label="商圈货主数量" prop="">
            </el-table-column>       
            <el-table-column  label="状态" prop="">
            </el-table-column>                                                                                                           
            </el-table> 
        </div>
		</div>
    </div>
</template>

<script>
import {data_get_aflcTradeArea_list} from '@/api/users/district/shoppingDistrict.js'
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import shoppingDialog from './shoppingDialog.vue'
export default {
    data(){
        return{
            options:regionDataPlus,
            btnsize:'mini',
            selectRowData:{},
            page:1,
            pagesize:20,
            totalCount:0,
            selected:[],//选中的数据集
            tableDataAll:[],
            formAllData:{
                areaCode: null,
                tradeName:null,
                tradeOwner:null,
            }
        }
    },
    components:{
    shoppingDialog
    },
    mounted(){
        this.firstblood();
    },
    methods:{
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
    // 列表刷新页面  
        firstblood(){
                let FromData = {}
                if(this.formAllData.area) {
                    FromData = {
                     area:this.formAllData.area,
                     city:null,
                     tradeName:this.formAllData.tradeName,
                     tradeOwner:this.formAllData.tradeOwner,               
                    }
                }
                else if(this.formAllData.city){
                    FromData = {
                     area:null,
                     city:this.formAllData.city,
                     tradeName:this.formAllData.tradeName,
                     tradeOwner:this.formAllData.tradeOwner,                 
                    }                    
                }   
                else{
                    FromData = {
                     area:null,
                     city:null,
                     tradeName:this.formAllData.tradeName,
                     tradeOwner:this.formAllData.tradeOwner,                 
                    }  
                }             
        data_get_aflcTradeArea_list(this.page,this.pagesize,FromData).then(res=>{
            console.log(res)
        })
    } 
    }
}
</script>

<style lang="scss">
.identicalStyle{
.el-cascader{
    line-height: 30px;
}
}
</style>

