<template>
  <div class="driverTrack" v-loading="loading" >
    <div id="track"></div>
    <div class="input-card">
        <h4>轨迹回放控制</h4>
        <div class="input-item">
            <input type="button" class="btn" value="开始动画" id="start" @click="startAnimation()"/>
            <input type="button" class="btn" value="暂停动画" id="pause" @click="pauseAnimation()"/>
        </div>
        <div class="input-item">
            <input type="button" class="btn" value="继续动画" id="resume" @click="resumeAnimation()"/>
            <input type="button" class="btn" value="停止动画" id="stop" @click="stopAnimation()"/>
        </div>
    </div>
  </div>
</template>
<script>
// 请求接口
import { loadJs } from '@/utils/'

export default {
  name: 'driverTrack',
  props: {
    orderid: [String, Number]
  },
  data() {
    return {
      loading: false,
      marker:[],
      lineArr:[],
    }
  },
  watch: {

  },
  mounted() {
      this.init()
  },
    // 关闭时清空地图数据
  destoryed() {
    this.exit()
  },
  methods: {
    exit() {
      if (this.map && this.map.destroy) {
        this.map.destroy()
        console.log('destroy,destroy',this.map)

      }
    },
    initMap() {
        const _this = this;
        const AMap = window.AMap;
        if (AMap) {
            // 地图加载
            _this.map = new AMap.Map('track', {
                resizeEnable: true, //是否监控地图容器尺寸变化
                zoom: 11, //初始地图级别
            })
            // this.logMapinfo();
        } else {
            console.error('=========加载地图失败=======')
        }
        console.log('map,map',this.map)
        
        const map = this.map;
        this.marker = new AMap.Marker({
            map: map,
            position: [116.397428, 39.90923],
            icon: "https://webapi.amap.com/images/car.png",
            offset: new AMap.Pixel(-26, -13),
            autoRotation: true
        });
        console.log('ifcome')
        var lngX = 116.397428, latY = 39.90923;
        this.lineArr.push(new AMap.LngLat(lngX, latY));

        for (var i = 1; i < 4; i++) {
            lngX = lngX + Math.random() * 0.05;

            if (i % 2) {
                latY = latY + Math.random() * 0.0001;
            } else {
                latY = latY + Math.random() * 0.06;
            }
            this.lineArr.push(new AMap.LngLat(lngX, latY));
        }

        // 绘制轨迹
        var polyline = new AMap.Polyline({
            map: map,
            path: this.lineArr,
            strokeColor: "#00A",  //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 3,      //线宽
            // strokeStyle: "solid"  //线样式
        });

        var passedPolyline = new AMap.Polyline({
            map: map,
            // path: lineArr,
            strokeColor: "#F00",  //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 3,      //线宽
            // strokeStyle: "solid"  //线样式
        });
        this.marker.on('moving', function (e) {
            passedPolyline.setPath(e.passedPath);
        });
        map.setFitView();
    },
     startAnimation () {
        this.marker.moveAlong(this.lineArr, 2E3);
    },

    pauseAnimation () {
        this.marker.pauseMove();
    },

    resumeAnimation () {
       this.marker.resumeMove();
    },

    stopAnimation () {
        this.marker.stopMove();
    },
    loadMap() {
    //   console.log('111', window.AMap, window.initialize)
      if (window.AMap) {
        return Promise.resolve('')
      } else {
        return new Promise((resolve, reject) => {
          loadJs('https://webapi.amap.com/maps?v=1.4.10&key=f167f450303ea43b1c9ccc459156f867').then(() => {
            this.initMap()
          }).catch(() => {
            reject()
          })
        })
      }
    },
    init() {
      return Promise.all([this.loadMap()]).then(() => {
        this.initMap()
      })
    }
  }
}
</script>
<style lang="scss">
.driverTrack{
    height: 100%;

    #track{
        height:100%;
        width:100%;
    }
    .input-card .btn{
        margin-right: 1.2rem;
        width: 9rem;
    }

    .input-card .btn:last-child{
        margin-right: 0;
    }

    .input-card {
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border-radius: .25rem;
        width: 22rem;
        border-width: 0;
        border-radius: 0.4rem;
        box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        padding: 0.75rem 1.25rem;
    }
    h4 {
        font-family: inherit;
        line-height: 1.8;
        font-weight: 300;
        color: inherit;
        font-size: 1.1rem;
        margin-top: 0;
        margin-bottom: .5rem;
    }
    .input-item {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        height: 3rem;
    }
    .btn {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        background-color: transparent;
        background-image: none;
        color: #25A5F7;
        border-color: #25A5F7;
        padding: .25rem .5rem;
        line-height: 1.5;
        border-radius: 1rem;
        -webkit-appearance: button;
        cursor: pointer;
    }
    .btn:hover {
        color: #fff;
        background-color: #25A5F7;
        border-color: #25A5F7;
        text-decoration: none;
    }
}
</style>
