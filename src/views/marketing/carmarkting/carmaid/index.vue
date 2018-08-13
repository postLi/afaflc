<template>
  <div class="same_shipper clearfix">
    <el-tabs v-model="shipperName" type="border-card"  >
        <!-- 同城 -->
            <el-tab-pane label="同城" name="first">
                <SameCity ></SameCity>
            </el-tab-pane>

        <!-- 城际 -->
            <el-tab-pane label="城际" name="second">
                <InterCity ></InterCity>
            </el-tab-pane>

        <!-- 零担 -->
            <el-tab-pane label="零担" name="third">
                <IoadCity ></IoadCity>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import SameCity from './sameCity.vue'
import InterCity from './interCity.vue'
import IoadCity from './loadCity.vue'
export default {
    data(){
        return{
            shipperName:'first',
        }
    },
    components:{    
            SameCity,
            InterCity,
            IoadCity
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
       
        
    }
</style>
