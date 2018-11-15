<template>
<div class="shoppingMapBox">
     <div id="clear" @click="clear">清楚所有地理围栏</div>
     <div class="add" @click="add1">add</div>
 <div id="shoppingMap"></div>
</div>
</template>
<script>
import { loadJs } from '@/utils/'
 var map={}
 var polygon;
 var marker;
 var contextMenuPositon = {}
export default {
      props:{
      fromData:{
        type:[Object,String,Array,Number],
      }
    },
     data(){
         return{
             dataAraay:[],
             path:[],
         }
     },
     methods:{
		loadMap:function(){
            this.$nextTick(()=>{
			if (window.AMap) {
                this.init();
            } else {
                loadJs('https://webapi.amap.com/maps?v=1.4.10&key=f167f450303ea43b1c9ccc459156f867').then(() => {
                this.init();
                })
            }
        })},
    	init:function(){
        var _this = this
		// 地图加载
        var lnglat = new AMap.LngLat(116.397, 39.918);
		map = new AMap.Map('shoppingMap', {
			resizeEnable: true,
			center: [113.257416,23.149586],
			zoom:11
        })


        //创建右键菜单
            var contextMenu = new AMap.ContextMenu();
            var lng,lat;
            contextMenu.addItem("添加标记", function (e) {
                marker = new AMap.Marker({
                    map:map,
                    position: contextMenuPositon //基点位置
                });
                lng = contextMenuPositon.lng
                lat = contextMenuPositon.lat
                _this.path.push([lng,lat])
                _this.dataAraay = _this.path;
                if(_this.path.length>2){
                 map.clearMap(polygon)
                }
                _this.$emit('returnStr', _this.dataAraay)
                _this.ToolBar()
            }, 3);

            map.on('rightclick', function (e) {
                contextMenu.open(map, e.lnglat);
                contextMenuPositon = e.lnglat;
            });
            contextMenu.open(map, lnglat);
        },
        ToolBar:function(){
        var _this = this
         polygon = new AMap.Polygon({
                path: _this.path,
                isOutline: true,
                strokeOpacity:1,
                lineJoin: 'round',
                strokeWeight:3,
                strokeStyle:"solid",
                strokeColor: "#3366FF", 
                strokeDasharray:[10,5],
                fillOpacity: 0,
                fillColor: '#FF0000',
            })
        polygon.setMap((map))          
        },
        clear:function(){
              var _this =this;
             map.clearMap();
             _this.path = [];
        },
        exit:function(){
        map.destroy();
        },
        add1:function(){
          console.log('this.fromData.points')
                   polygon = new AMap.Polygon({
                path: this.fromData.points,
                isOutline: true,
                strokeOpacity:1,
                lineJoin: 'round',
                strokeWeight:3,
                strokeStyle:"solid",
                strokeColor: "#3366FF", 
                strokeDasharray:[10,5],
                fillOpacity: 0,
                fillColor: '#FF0000',
            })
        polygon.setMap((map))          
        }
     },
     mounted(){
         this.loadMap();
        // if(this.fromData.points.length>0){
        //  path = this.fromData.points
        // }

     },
     beforeUpdate(){
              
     }
}
</script>
<style lang="scss">
#shoppingMap{
    width: 915px;
    height: 500px;
}
</style>
