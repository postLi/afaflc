<template>
        <div class="main_content ">
            <div class="head_title clearfix">
                <h4 class="fl">数据总览</h4>
                <ul class=" clearfix ">
                    <li>今天</li>
                    <li>昨天</li>
                    <li>最近七天</li>
                    <li>最近一个月</li>
                    <li>最近两个月</li>
                    <li>2018-06-4至2019-08-09</li>
                </ul>
            </div>
            <el-row class="main_forthUl">
                <!-- <el-col :span="24"></el-col> -->
                <ul>
                    <li>需求资源池 <span>({{title}})</span>
                    </li>
                    <li><span>求货需求订单:</span> <span>34755</span>单</li>
                    <li><span>求车需求订单:</span><span>5568</span>单</li>
                    <li><span>零担订单:</span><span>23888</span>单</li>
                    <li><span>小货车订单:</span><span>12352</span>单</li>
                </ul>
                <ul>
                    <li>
                        用户注册
                        <span>({{title}})</span>
                        <!-- <i class="el-icon-check"></i> -->
                    </li>
                    <li><span>货主:</span><span>7989</span>人</li>
                    <li><span>车主:</span><span>32456</span>人</li>
                    <li><span>物流公司:</span><span>3455</span>家</li>
                    <li><span>区代:</span><span>32</span>家</li>
                </ul>
                <ul>
                    <li>
                        用户认证
                        <span>({{title}})</span>
                        <!-- <i class="el-icon-check"></i> -->
                    </li>
                    <li><span>货主:</span><span>9986</span>人</li>
                    <li><span>车主:</span><span>32514</span>人</li>
                    <li><span>物流公司:</span><span>3422</span>家</li>
                    <li><span>区代:</span><span>30</span>家</li>
                </ul>
                <ul>
                    <li>
                        货主下单
                        <span>({{title}})</span>
                        <!-- <i class="el-icon-check"></i> -->
                    </li>
                    <div id="xiadan" style="width:100%;height:150px;">

                    </div>
                    <!-- <li><span>小货车:</span><span>9989单,2356元</span></li>
                    <li><span>大货车:</span><span>2312单,4564元</span></li>
                    <li><span>零担:</span><span>3455单,4564元</span></li>
                    <li><span>总计:</span><span>3212321</span>单,<span>1312323</span>元</li> -->
                </ul>
                <ul>
                    <li>
                        交易成功
                        <span>({{title}})</span>
                        <!-- <i class="el-icon-check"></i> -->
                    </li>
                    <div id="jiaoyi" style="width:100%;height:150px;">

                    </div>
                    <!-- <li><span>小货车:</span><span>20</span>单</li>
                    <li><span>大货车:</span><span>2312单,4564元</span></li>
                    <li><span>零担:</span><span>3455单,4564元</span></li>
                    <li><span>总计:</span><span>3212321</span>单,<span>1312323</span>元</li> -->
                </ul>
            </el-row>
            <div class="main_left clearfix">
                <div class="ul_left" id="main"></div>
                <div class="ul_right">
                    <div id="main_lefttop"></div>
                </div>
            </div>
        </div>
</template>

<script>
import echarts from 'echarts'

export default {
    data(){
        return {
            title:'昨天',
            tab:[],
        }
    },
    mounted() {
        var myChart = echarts.init(document.getElementById('main_lefttop'))
        // var myChart2 = echarts.init(document.getElementById('main_leftdown'))
        var myChart3 = echarts.init(document.getElementById('main'))
        var myChart4 = echarts.init(document.getElementById('xiadan'));
        var myChart5 = echarts.init(document.getElementById('jiaoyi'));

        const option = {
            title: {
                text: '用户转化比例',
                subtext: '测试数据',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['小货车', '大货车', '零担']
            },
            toolbox: {
                show: true,
                feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                    }
                },
                restore: { show: true },
                saveAsImage: { show: true }
                }
            },
            color:['#35c966', '#1b9aff','#13c9c9'],
            calculable: true,
            series: [
                {
                    name: '收入来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: '小货车' },
                        { value: 310, name: '大货车' },
                        { value: 234, name: '零担' }
                    ],
                }
            ]
        }
    
        const option2 = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['收入', '支出']
            },
            toolbox: {
                show: true,
                feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'center',
                        max: 1548
                    }
                    }
                },
                restore: { show: true },
                saveAsImage: { show: true }
                }
            },
            calculable: true,
            series: [
                {
                name: '2018收入支出比',
                type: 'pie',
                radius: ['50%', '70%'],
                itemStyle: {
                    normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                    },
                    emphasis: {
                    label: {
                        show: true,
                        position: 'center',
                        textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                        }
                    }
                    }
                },
                data: [
                    { value: 500, name: '收入' },
                    { value: 310, name: '支出' }
                ]
                }
            ]
        }
    
        const option3 = {
            title: {
                text: '交易走势图',
                subtext: '测试数据'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['小货车', '大货车','零担']
            },
            toolbox: {
                show: true,
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
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                type: 'value'
                }
            ],
            series: [
                {
                    name: '小货车',
                    type: 'line',
                    data: [30054, 46666, 33333, 45656, 32314, 46665, 48998],
                    markPoint: {
                        data: [
                                    { type: 'max', name: '最大值' },
                                    { type: 'min', name: '最小值' }
                        ]
                    },
                    itemStyle:{
                        normal: {
                            color: '#35c966'
                        }
                    }
                },
                {
                    name: '大货车',
                    type: 'line',
                    data: [20323, 35465, 22345,28945, 24545, 31456, 35456],
                    markPoint: {
                        data: [
                                    { type: 'max', name: '最大值' },
                                    { type: 'min', name: '最小值' }
                        ]
                    },
                    itemStyle:{
                        normal: {
                            color: '#1b9aff'
                        }
                    }
                } ,
                {
                    name: '零担',
                    type: 'line',
                    data: [14012, 16666, 11999, 14444,11555, 21165, 17884, 21632],
                    markPoint: {
                        data: [
                                    { type: 'max', name: '最大值' },
                                    { type: 'min', name: '最小值' }
                        ]
                    },
                    itemStyle:{
                        normal: {
                            color: '#13c9c9'
                        }
                    }
                }
            ]
        }
        
        const option4 = {
            title: {
                // text: '获取的ID分布情况',
                // subtext: '饼图：左：各层总ID数；右：各层净ID数'
            },
            tooltip: {
                trigger: 'axis',
            },
            toolbox: {
                show: false,
                feature: {
                    //dataView: {show: true, readOnly: false},
                    //restore: {show: true},
                    saveAsImage: {show: false}
                }
            },
            legend: {
                data: ['订单数', '订单金额'],
                orient: 'horizontal', // 'vertical'
                x: 'center', // 'center' | 'left' | {number},
                y: '-5px', // 'center' | 'bottom' | {number}
                backgroundColor: '#fff',
                padding: 5,    // [5, 10, 15, 20]
                itemGap: 5,
                textStyle: {color: 'ccc'},
            },
            grid: {
                left: '18%',
                right: '8%',
                top: '15%',
                shadowColor:"red",               //阴影颜色
                shadowOffsetX:0,                 //阴影水平方向上的偏移距离
                shadowOffsetY:0,                 //阴影垂直方向上的偏移距离
                shadowBlur:10,                    //阴影的模糊大小
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['小货车','大货车','零担','总计']
            },
            series: [
                {
                    name: '订单数',
                    type: 'bar',
                    data: [7999,7601,9366,21762],
                    itemStyle:{
                        normal: {
                            color: '#ff9800'
                        }
                    }
                },
                {
                    name: '订单金额',
                    type: 'bar',
                    data: [7999,5325,11246,26393],
                    itemStyle:{
                        normal: {
                            color: '#03a9f4'

                        }
                    }
                },
            ]
        };
        const option5 = {
            title: {
                // text: '获取的ID分布情况',
                // subtext: '饼图：左：各层总ID数；右：各层净ID数'
            },
            tooltip: {
                trigger: 'axis',
            },
            toolbox: {
                show: false,
                feature: {
                    //dataView: {show: true, readOnly: false},
                    //restore: {show: true},
                    saveAsImage: {show: false}
                }
            },
            legend: {
                data: ['订单数', '订单金额'],
                orient: 'horizontal', // 'vertical'
                x: 'center', // 'center' | 'left' | {number},
                y: '-5px', // 'center' | 'bottom' | {number}
                backgroundColor: '#fff',
                padding: 5,    // [5, 10, 15, 20]
                itemGap: 5,
                textStyle: {color: 'ccc'},
            },
            grid: {
                left: '18%',
                right: '8%',
                top: '15%',
                shadowColor:"red",               //阴影颜色
                shadowOffsetX:0,                 //阴影水平方向上的偏移距离
                shadowOffsetY:0,                 //阴影垂直方向上的偏移距离
                shadowBlur:10,                    //阴影的模糊大小
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['小货车','大货车','零担','总计']
            },
            series: [
                {
                    name: '订单数',
                    type: 'bar',
                    data: [12234,17601,19366,31762],
                    itemStyle:{
                        normal: {
                            color: '#ff9800'
                        }
                    }
                },
                {
                    name: '订单金额',
                    type: 'bar',
                    data: [5999,15325,21246,36393],
                    itemStyle:{
                        normal: {
                            color: '#03a9f4'

                        }
                    }
                },
            ]
        };
        // 为echarts对象加载数据
        myChart.setOption(option)
        // myChart2.setOption(option2)
        myChart3.setOption(option3)
        myChart4.setOption(option4)

        myChart5.setOption(option5)
    }

 }
</script>
<style lang="scss">
.main_content{
    padding: 15px 20px;
    height: 100%;
    min-width: 1100px;
    height: 100%;
    min-height: 666px;
    background:rgb(235,235,235);
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    .head_title{
        line-height: 30px;
        height: 50px;
        background: #ffff;
        padding: 10px 20px;
        margin-bottom: 2px;
        box-sizing: border-box;
        h4{
            color: #333;
        }
        ul{
            margin-left: 65%;
        li{
            float: left;
            padding: 0 10px;
            cursor: pointer;
            font-size: 14px;
            color: #666666;
        }
        li:hover{
            color:#3e9ff1;
            font-weight: bold;
            font-size: 14px;
            margin-top: -2px;
        }
        li:first-child{
                float: left;
        }
    }
  }
  .main_forthUl{
        background: #fff;
        padding: 15px 20px;
        margin-bottom: 10px;
        ul{
            width: 19%;
            box-sizing: border-box;
            border-radius: 2px;
            border: solid 1px #1790ff;
            float: left;
            height: 185px;
            margin-right: 20px;
            box-shadow: 2px 2px 2px 2px rgba(0,0,0,.1);
            transition: color 4s ease;
            border-radius: 5px;
        li{
            line-height: 20px;
            font-size: 14px;
            padding: 0 20px;
            margin: 5px 0 ;

            span{
                color:#333;
                padding:0 10px;
            }
            span:first-child{                                         
                color: #333;
                width: 10%;
                text-align: right;
            }
            em{
                // text-align: right;
                float:right;
            }
        }
        li:nth-child(1){
            position: relative;
            padding: 14px 20px ;
            font-size: 16px;
            font-weight: bold;
            margin: 0px;
            background:  rgb(211, 234, 253);
            margin-bottom: 10px;
            span{
                color:red;
                font-size: 14px;
            }
            .box_gg{
            position: relative;
            width:30px;
            height:30px;
            // background:red;
            top:-31px;
            left:355px;
            /*向下*/
            .triangle_border_down{
                width:0;
                height:0;
                border-width:31px 15px 2px;
                border-style:solid;
                border-color: #3e9ff1 transparent transparent;/*灰 透明 透明 */
                margin:40px auto;
                position: absolute;
                top:-40px;
                display: none;
                // left:371;
                    .el-icon-check{
                        position: absolute;
                        font-size: 20px;
                        top:-31px;
                        left:-8px;
                        color:#ffff;
                        display: none;
                    }
                }
            /*向左*/
                .triangle_border_left{
                    width:0;
                    height:0;
                    border-width:31px 15px 33px 0;
                    border-style:solid;
                    border-color:transparent #3e9ff1 transparent transparent;/*透明 灰 透明 透明 */
                    margin:40px auto;
                    position: absolute;
                    top:-41px;
                    left:15px;
                    display: none;
                }
            }
        }
        }
        ul:last-child{
            margin-right: 0;
        }

        ul:hover{
            margin-top: -2px;
            cursor: pointer;
            box-sizing: border-box;
            transition: all 0.2s ease-out; 
            box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.40); 
            overflow: hidden;
            color: red;

        }
        
    }
    .main_forthUl ul:hover {
        border:1px solid #3e9ff1;
        cursor: pointer;
    }
    .main_forthUl ul:hover .el-icon-check{
        display: block;
        font-weight: bold;
    }
    .main_forthUl ul:hover .triangle_border_down{
        display: block;
    }
        .main_left{
            flex: 1;
            .ul_left{
                float: left;
                width: 74.6%;
                background:#fff;
                height:100%;
            }
            .ul_right{
                width: 24.8%;
                float:right;
                height:100%;
                background: #fff;
                #main_lefttop{
                    height: 100%;
                    width: 100%;
                }
                #main_leftdown,#xiadan{
                    height: 100%;
                    width: 100%;

                }
                #main{
                    height: 100%;
                    width: 100%;

                }

                #xiadan{
                }
            }
        }
    }
</style>
