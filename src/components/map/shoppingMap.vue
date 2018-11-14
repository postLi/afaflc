<template>
<div class="shoppingMapBox">
     <div id="clear" @click="clear">清楚所有地理围栏</div>
 <div id="shoppingMap"></div>
</div>
</template>
<script>
import { loadJs } from '@/utils/'
 var map={}
 var polygon;
 var marker;
 var path = [];
 var contextMenuPositon = {}
export default {
     data(){
         return{
             dataAraay:[],
         }
     },
     methods:{
		loadMap:function(){
			if (window.AMap) {
                this.init();
            } else {
                loadJs('https://webapi.amap.com/maps?v=1.4.10&key=f167f450303ea43b1c9ccc459156f867').then(() => {
                    this.init();
                })
            }
        },
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
                console.log('111');
                marker = new AMap.Marker({
                    map:map,
                    position: contextMenuPositon //基点位置
                });
                lng = contextMenuPositon.lng
                lat = contextMenuPositon.lat
                path.push([lng,lat])
                _this.dataAraay = path;
                if(path.length>2){
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
                path: path,
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
             map.clearMap();
             path = [];
        },
        exit:function(){
        map.destroy();
        }
     },
     mounted(){
         this.loadMap();
     }
}
</script>
<style lang="scss">
#shoppingMap{
    width: 915px;
    height: 500px;
}
</style>
