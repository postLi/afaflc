<template>
<!-- <<<<<<< HEAD -->
  <div class="same_shipper tabsWrap">
    <el-tabs v-model="shipperName" type="card"  @tab-click='handleClick'>

        <!-- 自动化 -->
            <el-tab-pane label="自动化设置" name="first">
                <automation types='one' ref="one"></automation>
            </el-tab-pane>

        <!-- 手动化 -->
            <el-tab-pane label="手动化设置"  name="second">
                <handmation types='two'  ref="two"></handmation> 
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
         if(tab.name == 'first'){
           this.$refs.one.getDataList()
         }
         else{ 
           this.$refs.two.getDataList()
         }
       }
     },
}
</script>

<style lang="scss" >
</style>

