<template>
<div class="commoncss">
<el-dialog custom-class="aflcmap-pop-wrapper" title="地图" @close="close" :visible.sync="dialogTableVisible">
<div class="shoppingMapBox ">
 <div id="CityMap"></div>
</div>
</el-dialog>
</div>
</template>
<script>
import { loadJs } from '@/utils/'
 var map={}
 var polygon;
export default {
  props: {
    fromData:{
        type:[Object,String,Array,Number],
      },
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    popVisible(newVal) {
      this.open()
    },
    name() {
      this.thename = this.name
    },
    pos() {
      this.thepos = this.pos
    }
  },
  mounted() {
    
  },
  created() {

  },
  // 关闭时清空地图数据
  destoryed() {
    this.exit()
  },
  data() {
    return {
      dialogTableVisible: false,
    }
  },
  methods: {
    close(done) {
      map.clearMap();
      map.destroy();
      this.$emit('update:popVisible', false)
    },
    open() {
      this.dialogTableVisible = this.popVisible
       this.loadMap();
    },
    loadMap:function(){
            this.$nextTick(()=>{
                loadJs('https://webapi.amap.com/maps?v=1.4.10&key=f167f450303ea43b1c9ccc459156f867').then(() => {
                this.init();
                })
    })},
    init:function(){
        var _this = this
        var center = []
        console.log('fromData',this.fromData.length)
        if(_this.fromData.length>0){
           center = _this.fromData[0][0]
            }
        else{
           center = [113.257416,23.149586]
        }
      // 地图加载
        map = new AMap.Map('CityMap', {
        resizeEnable: true,
        zoom:10
          })
        map.plugin(["AMap.ToolBar"], function() {
            map.addControl(new AMap.ToolBar());
        });

        map.setCenter(center);
         polygon = new AMap.Polygon({
                path: this.fromData,
                isOutline: true,
                strokeOpacity:1,
                lineJoin: 'round',
                strokeWeight:3,
                strokeStyle:"solid",
                strokeColor: "#3366FF", 
                strokeDasharray:[10,5],
                fillOpacity: 0.2,
                fillColor: '#1791fc',
            })
        polygon.setMap((map))   
        }
  }
}
</script>
<style lang="scss">
#CityMap{
    width: 915px;
    height: 500px;
}
</style>
