<template>
<div class="shoppingMapBox">
 <div id="shoppingMap"></div>
 <div id="marker" @click="new1">新增</div>
</div>
</template>
<script>
import { loadJs } from '@/utils/'
 var map={}
 var polygon;
 var marker;
 var path = [];
export default {
     data(){
         return{
         }
     },
     methods:{
		loadMap:function(){
			if (window.AMap) {
                this.init();
                return Promise.resolve('')
            } else {
                return new Promise((resolve, reject) => {
                loadJs('https://webapi.amap.com/maps?v=1.4.10&key=f167f450303ea43b1c9ccc459156f867').then(() => {
                    this.init();
                }).catch(() => {
                    reject()
                })
                })
            }
        },
    	init:function(){
        var _this = this
		// 地图加载
        var contextMenuPositon = []
        var lnglat = new AMap.LngLat(116.397, 39.918);
		map = new AMap.Map('shoppingMap', {
			resizeEnable: true,
			center: [116.400274, 39.905812],
			zoom:11
        })


        //创建右键菜单
            var contextMenu = new AMap.ContextMenu();
            contextMenu.addItem("添加标记", function (e) {
                marker = new AMap.Marker({
                    map:map,
                    position: contextMenuPositon //基点位置
                });
                path.push([contextMenuPositon.lng,contextMenuPositon.lat])
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
                strokeOpacity:0,
                strokeWeight:1,
                strokeStyle:"dashed",
                strokeDasharray:[10,5],
            })
        polygon.setMap((map))          
        },
        new1:function(){
            // var markers = []; 
            // map.clearOerelay(marker)
            //  path = [];
            //  map.remove(markers);
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
