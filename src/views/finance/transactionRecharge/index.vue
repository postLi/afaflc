<template>
 <div class="finance clearfix">
             <div class="classify_searchinfo">
   <el-form :inline="true">
            <el-form-item label="用户姓名：">
            <el-input v-model="fromData.a1" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="电话号码：">
                  <el-input v-model="fromData.a2" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="充值渠道：">
                  <el-input v-model="fromData.a3" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="充值方式：">
                  <el-input v-model="fromData.a4" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="充值时间：">
                    <el-date-picker
                        is-range
                        type="daterange"
                        v-model="fromData.a5"
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
          <el-button type="primary"  plain>查询</el-button> 
          </el-form-item>
          </el-form>
            </div>
            <div class="classify_info">
                <div class="info_news">
                      <!-- 页码 -->
                    
                </div>
                
                
            </div>
     
        
    </div>
</template>

<script type="text/javascript">
import '@/styles/dialog.scss'
import {data_financeList,data_GetServerType,data_GetServerType2,data_GetServerType3} from '@/api/finance/financeServer.js'
 export default{
        data(){
            return{
              fromData:{
               a1:null,
               a2:null,
               a3:null,
               a4:null,
               a5:null,
              }
            }
        },
        components:{
            

        },
        mounted(){
            
        },  
        methods: {
           
           
        }
    }
</script>

<style lang="scss">
.finance{
        height:100%;    
        position: relative;
.classify_searchinfo{
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
    .el-date-editor{
        width: 280px;
    }
    .v-dropdown-container{
        top:35px!important;
        left:0px!important;
    }
    .el-form-item__content{}
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