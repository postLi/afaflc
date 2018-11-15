<template>
<div class="shoppingMapBox">
     <div id="clear" @click="clear">清除所有地理围栏</div>
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
      },
      editstatusMap:{
        type:[String],
        default:''
      }
    },
     data(){
         return{
             dataAraay:[],
             path:[],
             Mapstatus:this.editstatusMap
         }
     },
     watch:{
         editstatusMap(val){
             console.log('2222',this.editstatusMap)
            this.Mapstatus = val
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
        map.on("complete", function(){
                _this.path = _this.fromData.points
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
                });
        //创建右键菜单
            var contextMenu = new AMap.ContextMenu();
            var lng,lat;
            contextMenu.addItem("添加标记", function (e) {
                console.log('111',_this.Mapstatus)
               if(_this.Mapstatus=='1'){
                _this.$message({
                    message: '修改围栏需要清除之前的围栏~',
                    type: 'warning'
                })
               }
               else if(_this.Mapstatus=='2'){
                _this.$message({
                    message: '详情不能进行修改~',
                    type: 'warning'
                })
               }
                else{
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
                }
            }, 3);

            map.on('rightclick', function (e) {
                contextMenu.open(map, e.lnglat);
                contextMenuPositon = e.lnglat;
            });
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
             map.clearMap();
             this.path = [];
             this.Mapstatus='0'
        },
        exit:function(){
        this.path = [];
        map.clearMap();
        map.destroy();
        },
     },
     mounted(){
         this.loadMap();
     },
     beforeUpdate(){
              
     }
}
</script>
<style lang="scss">
.shoppingMapBox{
    position: relative;
#shoppingMap{
    width: 915px;
    height: 500px;
}
#clear{
   position: absolute;
   left:20px;
   top:20px;
   z-index: 2;
   border: 2px solid red;
   color: red;
   font-weight: bold;
   padding: 0px 10px;
   cursor: pointer;
}
}
</style>
