<template>
<div class="shoppingMapBox">
 <div id="shoppingMap"></div>
</div>
</template>
<script>
import { loadJs } from '@/utils/'
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
        let lnglat = new AMap.LngLat(116.397, 39.918);
        let contextMenuPositon = []

		// 地图加载
		var map = new AMap.Map('shoppingMap', {
			resizeEnable: true,
			center: [116.400274, 39.905812],
			zoom:11
        })

        //创建右键菜单
        var contextMenu = new AMap.ContextMenu();
            contextMenu.addItem("添加标记", function (e) {
                var marker = new AMap.Marker({
                    map: map,
                    position: contextMenuPositon //基点位置
                });
            }, 3);
        //地图绑定鼠标右击事件——弹出右键菜单
        map.on('rightclick', function (e) {
            contextMenu.open(map, e.lnglat);
            contextMenuPositon = e.lnglat;
            console.log('e',e)
        });
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
