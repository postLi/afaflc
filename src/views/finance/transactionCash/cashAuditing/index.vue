<template>
  <div class="same_shipper clearfix">
    <el-tabs v-model="shipperName" type="border-card"  @tab-click='tabClik'>
        <!-- 全部提现 -->
            <el-tab-pane label="全部提现" name="first">
                <cashAuditing></cashAuditing>
            </el-tab-pane>

        <!-- 待处理/审核中 -->
            <el-tab-pane :label='labelTab' name="second" ref="second">
                <cashAuditingStatus></cashAuditingStatus>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cashAuditing from './cashAuditing.vue'
import cashAuditingStatus from './cashAuditingStatus.vue'
export default {
    data(){
        return{
            shipperName:'first',
            labelTab:'待处理'
        }
    },
    components:{    
            cashAuditing,
            cashAuditingStatus,
    },
    watch:{
     shipperName(newVal,oldVal){
        if(newVal){
            this.shipperName = newVal;
          }else{
        this.shipperName = oldVal;
          }
        }
        },
     methods: {
     handleClick(tab, event) {
      this.shipperName = tab.name;
       },
     tabClik(i){
        if(i.name=='second'){
          this.labelTab = '审核中'
        }
        else{
        this.labelTab = '处理中'
        }            
     },
     }
}
</script>
<style lang="scss" >
    @import "../../../../styles/tab.scss";
    .completeinfo{
      .detailinfo{
        margin-left: 26px;
        p{
            width:160px;
            height: 40px;
            line-height: 40px;
            text-align: left;
            display: inline-block;
            vertical-align: top;
            span{
                color:red;
            }
        }
        .upload-demo{
          display: inline-block ;
        }
      }
    }
    .same_shipper{
        height:100%;    
        position: relative;
         .el-tabs__content{
           padding:0px 0px;
       }     
        
    }
</style>
