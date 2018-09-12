<template>
<!-- <<<<<<< HEAD -->
  <div class="same_shipper clearfix">
    <el-tabs v-model="shipperName" type="border-card"  >

        <!-- 自动化 -->
            <el-tab-pane label="自动化设置" name="first">
                <automation types='one'></automation>
            </el-tab-pane>

        <!-- 手动化 -->
            <el-tab-pane label="手动化设置"  name="second">
                <handmation types='two'></handmation>
            </el-tab-pane>            
    </el-tabs>
  </div>
</template>


<script>
import automation from './automation.vue'
import handmation from './handmation.vue'
export default {
    data(){
        return{
            shipperName:'first',
        }
    },
    components:{    
            automation,
            handmation,
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
       }
     },
}
</script>

<style lang="scss" >
    // @import "../../../../styles/tab.scss";
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
            padding:0px;
        }
    }
</style>

