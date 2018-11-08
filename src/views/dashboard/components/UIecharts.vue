<template>
    <div class="UIecharts">
        <h1 class="UItitle">运营数据中心</h1>
        <div class="UIorderTotal">
            <h2>订单量</h2>
            <div class="orderTotal_change">
                <ul>
                    <li class="orderTotalNumber">2</li>
                    <li>,</li>
                    <li class="orderTotalNumber">5</li>
                    <li class="orderTotalNumber">3</li>
                    <li class="orderTotalNumber">5</li>
                    <li>,</li>
                    <li class="orderTotalNumber">1</li>
                    <li class="orderTotalNumber">5</li>
                    <li class="orderTotalNumber">7</li>
                </ul>
                <div class="orderTotalTime">
                    <span>{{newTime}}</span>
                    <ul>
                        <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,item.label)">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="orderType">
            <div class="orderTypeNum orderTypeCommon">
                <h4>订单类型概览</h4>
                <div class="orderTypeTab">
                    <h6>小货车订单数</h6>
                    <p><span>12000单</span><span class="fr">占比80.00%</span></p>
                </div>
                <div class="orderTypeTab">
                    <h6>发物流订单数</h6>
                    <p><span>12000单</span><span class="fr">占比80.00%</span></p>
                </div>
                <div class="orderTypeTab" style="margin-bottom:0;">
                    <h6>大货车订单数</h6>
                    <p><span>12000单</span><span class="fr">占比80.00%</span></p>
                </div>
            </div>
            <div id="orderTypeHot">
                
            </div>
            <div class="orderTypeXHC orderTypeCommon">
               <h4>小货车待指派订单</h4>
               <ul>
                   <li>
                       <span>平台定向</span>
                       <p class="fr">
                            <span>18</span><span> >> </span>
                       </p>
                   </li>
                    <li>
                       <span>超时无人接单</span>
                       <p class="fr">
                            <span>18</span><span> >> </span> 
                       </p>
                   </li>
                    <li>
                       <span>提货地无司机</span>
                       <p class="fr">
                        <span>18</span><span> >> </span>
                       </p>
                   </li>
                    <li>
                       <span>车主改派</span>
                       <p class="fr">
                            <span>18</span><span> >> </span>
                       </p>
                   </li>
                    <li>
                       <span>中单后联系货主超时</span>
                       <p class="fr">
                            <span>18</span><span> >> </span>
                       </p>
                   </li>
                </ul> 
            </div>
        </div>

        <div class="orderType_Area">
            <div class="orderType_AreaTop">
                <h4>区域订单TOP5</h4>
                <ul class="orderType_AreaTop_time">
                    <li v-for="(item,index) in dataType2" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur2(index,item.label)">{{item.name}}</li>
                </ul>
                <ul class="orderType_AreaTop_List">
                    <li>
                    <span>广州市天河区</span>
                        <span>120000单</span>
                    </li>
                    <li>
                        <span>广州市天河区</span>
                        <span>120000单</span>
                    </li>
                    <li>
                        <span>广州市天河区</span>
                        <span>120000单</span>
                    </li>
                        <li>
                        <span>广州市天河区</span>
                        <span>120000单</span>
                    </li>
                    <li>
                        <span>广州市天河区</span>
                        <span>120000单</span>
                    </li>
                </ul>
            </div>
            <div id="orderType_AreaLine">
                
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import './uiEcharts.scss'
import { pickerOptions4,geoCoordMap } from '@/utils/index'
export default {
    created() {
        this._getCityData()
    },
    watch: {
        
    },
    data() {
        return {
            newTime:'',
            timeOutComplate:null,
            dataType:[
                {name:'今天',iscur:true},
                {name:'昨天',iscur:false},
                {name:'本周',iscur:false},
                {name:'本月',iscur:false},
                {name:'今年',iscur:false},
                {name:'全部',iscur:false},
            ],
            dataType2:[
                {name:'今天',iscur:true},
                {name:'昨天',iscur:false},
                {name:'本周',iscur:false},
                {name:'本月',iscur:false},
                {name:'今年',iscur:false},
                {name:'全部',iscur:false},
            ],
            legendArr: [],
            color: this.$store.state.color,
            myChart: {},
            myChartLine:{},
            geoCoordMap: {},
            name: '热力图',
            myData:[
                {name: '海门', value: [121.15, 31.89, 90]},
                {name: '鄂尔多斯', value: [109.781327, 39.608266, 120]},
                {name: '招远', value: [120.38, 37.35, 142]},
                {name: '舟山', value: [122.207216, 29.985295, 123]},
            ],
        }
    },
    methods: {
        getNowFormatDate(){
           	var now = new Date();
		
			// 获取年份:0~11
			var year = now.getFullYear();

			// 获取月份
			var month = now.getMonth()+1;

			// 获取日
			var date = now.getDate();

			// 获取星期：0-6（星期日-星期6）
			// var week = now.getDay();

			// 获取时分秒
			var h = now.getHours();
			var m = now.getMinutes();
			var s = now.getSeconds();

			// 补0操作
			h = h<10 ? '0'+h : h;
			m = m<10 ? '0'+m : m;
			s = s<10 ? '0'+s : s;
            // var arr = '日一二三四五六'
            
            // this.newTime = year + '年' + month + '月' + date + '日 '+ h + ':' + m + ':' + s + ' 星期' + arr[week];
			this.newTime = year + '年' + month + '月' + date + '日 '+ h + ':' + m + ':' + s;
        },
        setCur(index,label){
            console.log(index,label)
            this.dataType.forEach((el,idx)=>{
                idx == index ? el.iscur = true : el.iscur = false;
            })
        },
        setCur2(index,label){
            console.log(index,label)
            this.dataType2.forEach((el,idx)=>{
                idx == index ? el.iscur = true : el.iscur = false;
            })
        },
        mapInit(options) {
            this.myChart = echarts.init(document.querySelector('#orderTypeHot'));
            this.myChart.setOption(options)
        },
        mapInitLine(options) {
            this.myChartLine = echarts.init(document.querySelector('#orderType_AreaLine'));
            this.myChartLine.setOption(options)
        },
        
        _getCityData() {
            axios.get('static/data/cityData.json').then((res) => {
                this.geoCoordMap = res.data
            })
        },
        convertData(data) {
            let res = [];
            for (let i = 0; i < data.length; i++) {
                let geoCoord = this.geoCoordMap[data[i].name];
                if (geoCoord) {
                res.push(geoCoord.concat(data[i].value));
                }
            }
            return res;
        }
    },
    beforeDestroy(){
        clearInterval(this.timeOutComplate);
    },
    mounted() {
        this.getNowFormatDate();
        this.timeOutComplate = setInterval(this.getNowFormatDate,1000);
      
        // axios.get('static/data/heat/testData.json').then((res) => {
            let options = {
                title: {
                    text: '',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                backgroundColor: '',//背景颜色
                // visualMap: {
                // // min: 0, // 值域最小值，必须参数
                // // max: 500, // 值域最大值，必须参数
                // // splitNumber: 5,
                // // inRange: {
                // //     color: ['#fff', '#fff', '#fff'].reverse()   // 指定数值从低到高时的颜色变化
                // // },
                //     textStyle: {
                //         color: '#fff' // 值域控件的文本颜色
                //     }
                // },
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                        show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: { // 普通状态下的样式
                            areaColor: 'rgba(0,40,127,1)',//地图颜色
                            borderColor: 'rgba(27,120,207, 1)',//边线颜色
                            shadowColor: 'rgba(0,62,193, 1)',//阴影颜色
                            shadowBlur: 100 //阴影范围
                        },
                        emphasis: { //高亮状态下的样式
                            areaColor: 'rgba(0,62,186,0.5)' 
                        }
                    }
                },
                series: [
                    // {
                    //     name: '销量', // series名称
                    //     type: 'scatter', // series图表类型
                    //     coordinateSystem: 'geo', // series坐标系类型
                    //     data:this.myData,
                    // },
                    {
                        name: 'Top 5',
                        type: 'effectScatter',
                        // coordinateSystem: 'bmap',
                        coordinateSystem: 'geo',
                        data: this.myData,
                        symbol:'circle',//标记的图形
                        // symbol:'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',//标记的图形
                        symbolSize: function (val) {
                            return val[2] / 10;
                            // return 30;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position:[10,-20],
                                show: true,
                                color: '#fff',
                                fontSize:'14',
                            }
                        },
                        itemStyle: {
                            normal: {
                                // color: 'rgba(0,255,255,0)',
                                color:{
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(0,255,255,1)' // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.25, color: 'rgba(0,255,255,0)' // 100% 处的颜色
                                    },
                                    {
                                        offset: 0.5, color: 'rgba(0,255,255,0)' // 100% 处的颜色
                                    },
                                    {
                                        offset: 0.75, color: 'rgba(0,255,255,0)' // 100% 处的颜色
                                    },
                                     {
                                        offset: 1, color: 'rgba(0,255,255,1)' // 100% 处的颜色
                                    }],
                                    globalCoord: false, // 缺省为 false
                                },
                                shadowBlur: 10,
                                shadowColor: 'rgba(0,255,255,1)'
                                
                            }
                        },
                        zlevel: 1
                    }
                ]
            };
            // window.onresize = this.myChart.resize;
            //散点全国地图
            this.mapInit(options);
        // });

        let options2 = {
            title: {
                text: '单量变化曲线图',
                x:'17',
                y:'20',
                textStyle:{
                    color:'#fff',
                    fontSize:'18',
                }
            },
            //提示框，鼠标悬浮交互时的信息提示
            tooltip: {
                trigger: 'axis',
                // axisPointer: { 
                //     type: 'cross',
                //     label: {
                //         backgroundColor: '#6a7985'
                //     }
                // }
                label:{
                    
                }
            },
            legend: {
                data: [
                    {
                        name:'小货车',
                        textStyle:{
                            color:'#00ccff'
                        },
                        icon:'none'
                    },
                    {
                        name:'发物流',
                        textStyle:{
                            color:'#03f71a'
                        },
                        icon:'none'
                    },
                    {
                        name:'大货车',
                        textStyle:{
                            color:'#e9d000'
                        },
                        icon:'none'
                    }
                ],
                show:true,
                left:'15%',
                top:'5%',
                itemGap:50,
                textStyle:{
                    fontSize:'16',
                    fontWeight:'bold'
                }
            },
            toolbox: {
                show: false,
                feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap : false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    splitLine:{show: false},//去除网格线
                    splitArea : {show : false},//保留网格区域
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.69)'
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        },
                        padding:[10,0,0,0]

                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    min:"dataMin",
                    // splitLine:{show: true},//去除网格线
                    splitArea : {show : false},//保留网格区域
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color:'#00ffff',
                            width:'0'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    nameLocation: 'end',
                    nameGap: 20,
                    nameRotate: 0,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['rgba(0, 255, 255, 0.2)']
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'white',
                            fontSize: 14
                        },
                        padding:[0,20,0,0]
                    },
                }
            ],
            series: [
                {
                    name: '小货车',
                    type: 'line',
                    // symbol:'circle',
                    symbolSize:[8,8],
                    // smooth: true,
                    data: [30054, 46666, 13333, 45656, 32314, 46665, 48998],
                    itemStyle: {
                        normal: {
                            // color:{
                            //     type: 'radial',
                            //     x: 0.5,
                            //     y: 0.5,
                            //     r: 0.5,
                            //     colorStops: [{
                            //         offset: 0, color: '#00ccff' // 0% 处的颜色
                            //     }, {
                            //         offset: 1, color: '#59ffea' // 100% 处的颜色
                            //     }],
                            //     globalCoord: false // 缺省为 false
                            // },
                            color:'#00ccff'
                        }
                    },
                    lineStyle:{//线条颜色
                        normal:{
                            color: '#00ccff',
                        }
                    },
                    areaStyle:{
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(0,204,255,0.7)' // 0% 处的颜色
                            }, {
                                offset: 0.6, color: 'rgba(0,204,255,0)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    }
                },
                {
                    name: '大货车',
                    type: 'line',
                    // smooth: true,
                    symbolSize:[8,8],
                    data: [20323, 35465, 22345, 28945, 24545, 31456, 35456],
                    itemStyle: {
                        normal: {
                            color:'#e9d000'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: ' #e9d000',
                        }
                    },
                    areaStyle:{
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(233,208,0,0.7)' // 0% 处的颜色
                            }, {
                                offset: 0.6, color: 'rgba(233,208,0,0)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    }
                },
                {
                    name: '发物流',
                    type: 'line',
                    // smooth: true,
                    symbolSize:[8,8],
                    data: [14012, 16666, 31999, 14444, 11555, 21165, 17884],
                    // markPoint: {
                    //     data: [
                    //         { type: 'max', name: '最大值' },
                    //         { type: 'min', name: '最小值' }
                    //     ]
                    // },
                    itemStyle: {
                        normal: {
                            color:'#03f71a'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#03f71a'
                        }
                    },
                    areaStyle:{
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(3,247,26,0.7)' // 0% 处的颜色
                            }, {
                                offset: 0.6, color: 'rgba(3,247,26,0)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    }
                }
            ]

        }

        this.mapInitLine(options2);

        window.onresize = () => {
            this.myChart.resize({
                width: 'auto',
                height: 'auto'
            })
        //   myChart3.resize({
        //     width: 'auto',
        //     height: 'auto'
        //   })
        //   myChart4.resize({
        //     width: 'auto',
        //     height: 'auto'
        //   })
        //   myChart5.resize({
        //     width: 'auto',
        //     height: 'auto'
        //   })
        }
    }

}
</script>
