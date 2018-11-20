<template>
<div class="commoncss businessCityMap">
 <div id="CityMap"></div>
</div>
</template>
<script>
import {data_CityCode } from '@/api/company/businessCity.js'
import { loadJs } from '@/utils/'
 var map={}
 var polygon;
export default {
  props: {},
  watch: {
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
      MapAraay:[]
    }
  },
  mounted(){
         data_CityCode(this.$route.query.code).then(res=>{
          res.data.map(data=>{
          this.MapAraay.push(JSON.parse(data))
          })
          })
          this.loadMap();
  },
  methods: {
    loadMap:function(){
            this.$nextTick(()=>{
                loadJs('https://webapi.amap.com/maps?v=1.4.10&key=f167f450303ea43b1c9ccc459156f867').then(() => {
                this.init();
                })
    })},
    init:function(){
        var _this = this
        var center = []
        var NewMaparaay = this.MapAraay
      // 地图加载
        map = new AMap.Map('CityMap', {
        resizeEnable: true,
        zoom:10
          })
        map.plugin(["AMap.ToolBar"], function() {
            map.addControl(new AMap.ToolBar());
        });
        map.on("complete", function(){
                var center = []
                if(NewMaparaay.length>0){
                    center = NewMaparaay[0][0]
                }
                else{
                    center = [113.257416,23.149586]
                }
                polygon = new AMap.Polygon({
                path: NewMaparaay,
                isOutline: true,
                strokeOpacity:1,
                lineJoin: 'round',
                strokeWeight:2,
                strokeStyle:"solid",
                strokeColor: "#3366FF", 
                strokeDasharray:[10,5],
                fillOpacity: 0.2,
                fillColor: '#1791fc',
            })
                map.setCenter(center);
                polygon.setMap((map))    
                });  
        }
  }
}
</script>
<style lang="scss">
.businessCityMap{
  height: 100%;
  #CityMap{
    width: 100%;
    height: 100%;
  }

}

</style>
