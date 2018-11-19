<template>
<div class="shoppingMapBox">
     <div id="clear" @click="clear">清除所有地理围栏</div>
     <div id="backBtn" @click="back">返回上一步</div>
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
            this.Mapstatus = val
         }
     },
     methods:{
		loadMap:function(){
            this.$nextTick(()=>{
                loadJs('https://webapi.amap.com/maps?v=1.4.10&key=73bdb8428fbfe511ed6c5f3328b5734b&plugin=AMap.Geocoder').then(() => {
                this.init();
                })
        })},
    	init:function(){
        var _this = this
		// 地图加载

		map = new AMap.Map('shoppingMap', {
			resizeEnable: true,
			zoom:12
        })
        map.plugin(["AMap.ToolBar"], function() {
            map.addControl(new AMap.ToolBar());
        });
        map.on("complete", function(){
                var center = []
                if(_this.fromData.points.length>0){
                    center = _this.fromData.points[0]
                }
                else{
                    center = [113.257416,23.149586]
                }
                _this.path = _this.fromData.points
                polygon = new AMap.Polygon({
                path: _this.path,
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
        //创建右键菜单
            var contextMenu = new AMap.ContextMenu();
            var lng,lat;
            contextMenu.addItem("添加标记", function (e) {
               if(_this.editstatusMap=='1'){
                _this.$message({
                    message: '修改围栏需要清除之前的围栏~',
                    type: 'warning'
                })
               }
               else if(_this.editstatusMap=='2'){
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
                fillOpacity: 0.2,
                fillColor: '#1791fc',
            })
        polygon.setMap((map))          
        },
        clear:function(){
            var _this = this
              if(_this.editstatusMap=='2'){
                _this.$message({
                    message: '详情不能进行修改~',
                    type: 'warning'
                })
               }
               else{
                map.clearMap();
                this.path = [];
                this.editstatusMap='0'
               }

        },
        back:function(){
            var _this =this
        if(_this.editstatusMap=='1'){
                _this.$message({
                    message: '修改围栏需要清除之前的围栏~',
                    type: 'warning'
                })
               }
        else if(_this.editstatusMap=='2'){
                _this.$message({
                    message: '详情不能进行修改~',
                    type: 'warning'
                })
        }
        else{
        this.path.pop()
        console.log(this.path)
        _this.$emit('returnStr', _this.dataAraay)
        map.clearMap(polygon)
        this.ToolBar()      
        }

        },
        exit:function(){
        this.path = [];
        map.clearMap();
        map.destroy();
        },
        setCity:function(){
            var _this = this
            let getLocationMap = [];
            var geocoder
             geocoder = new AMap.Geocoder({
            });
             geocoder.getLocation(_this.fromData.city+_this.fromData.area, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
            // result中对应详细地理坐标信息
                map.setCenter([result.geocodes[0].location.lng,result.geocodes[0].location.lat]); 
            }
        })
        }

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
   right:10px;
   top:10px;
   z-index: 2;
   border: 2px solid red;
   color: red;
   font-weight: bold;
   padding: 0px 5px;
   cursor: pointer;
   line-height:30px;
}
#backBtn{
   position: absolute;
   right:10px;
   top:50px;
   z-index: 2;
   border: 2px solid red;
   color: red;
   font-weight: bold;
   padding: 0px 10px;
   cursor: pointer;    
   line-height:30px;
}
}
</style>
