<template>
 <div class="TCorderInfo clearfix orderKPI" >
        <!-- KPI雷达 -->
        <div class="orderInfo-collapse collapseInfo">
            <div class="essentialInformation">   
         <div class="orderEchart">
          <div class="orderKPI_fl">
              综合评分：<span class="Colorred">62</span>分
          </div>
          <div class="orderKPI_fr">
              <div id="KPI_echarts"></div>
          </div>
         </div>
        </div>
        </div>

        <div class="address-collapse collapseInfo">
            <h2>时效考核</h2>
        <div class="essentialInformation">            
         <table class="tree-table">
            <tbody>
                <tr>
                    <th  width="12%">考核项目</th>
                    <th  width="7%">达标时效</th>
                    <th  width="7%">实际时效</th>
                    <th  width="8%">差异值</th>
                    <th  width="8%">考核项权限配分</th>
                    <th  width="10%">评估值</th>
                    <th  width="8%">评分</th>
                    <th  width="48%">考核项说明</th>
                </tr>
                <tr>
                    <td>撮合时效（秒）</td>
                    <td>30</td>
                    <td>45</td>
                    <td>32</td>
                    <td>22</td>
                    <td><span class="Colorred">不达标</span></td>
                    <td><span class="Colorred">12</span></td>
                    <td>从客户下单时间开始计算，到首次确认中单司机所用时间<br>单位：<span class="Colorred">秒</span></td>
                </tr>
                <tr>
                    <td>中单后联系货主时效（秒）</td>
                    <td>30</td>
                    <td>45</td>
                    <td>32</td>
                    <td>22</td>
                    <td><span class="Colorred">不达标</span></td>
                    <td><span class="Colorred">12</span></td>
                    <td>从确认中单司机开始计算，到车主联系货主或前往提货地所用时间<br>单位：<span class="Colorred">秒</span></td>
                </tr>        
                <tr>
                    <td>到车时效（分钟）</td>
                    <td>30</td>
                    <td>45</td>
                    <td>32</td>
                    <td>22</td>
                    <td><span class="Colorred">不达标</span></td>
                    <td><span class="Colorred">12</span></td>
                    <td>实际到达提货地时间与预计到达提货地时间（即时订单：车主中单时间加上地图预估用时；预约订单：预约用车时间）差异值<br>单位：<span class="Colorred">分钟</span></td>
                </tr>  
                <tr>
                    <td>到货时效（分钟）</td>
                    <td>30</td>
                    <td>45</td>
                    <td>32</td>
                    <td>22</td>
                    <td><span class="Colorred">不达标</span></td>
                    <td><span class="Colorred">12</span></td>
                    <td>实际到达目的地时间与预计到达目的地时间差异值<br>单位：<span class="Colorred">分钟</span></td>
                </tr>    
                <tr>
                    <td>回单时效（小时）</td>
                    <td>30</td>
                    <td>45</td>
                    <td>32</td>
                    <td>22</td>
                    <td><span class="Colorred">不达标</span></td>
                    <td><span class="Colorred">12</span></td>
                    <td>从完成卸货时间开始计算，到车主回单所用时间<br>单位：<span class="Colorred">小时</span></td>
                </tr>   
                <tr>
                    <td>回款时效（小时）</td>
                    <td>30</td>
                    <td>45</td>
                    <td>32</td>
                    <td>22</td>
                    <td><span class="Colorred">不达标</span></td>
                    <td><span class="Colorred">12</span></td>
                    <td>从完成卸货时间开始计算，到车主回款所用时间<br>单位：<span class="Colorred">小时</span></td>
                </tr>                                                                  
            </tbody>
         </table>
        </div>
        </div>

        <div class="address-collapse collapseInfo">
            <h2>交付考核</h2>
        <div class="essentialInformation">            
         <table class="tree-table">
            <tbody>
                <tr>
                    <th  width="12%">考核项目</th>
                    <th  width="7%">达标时效</th>
                    <th  width="7%">实际时效</th>
                    <th  width="8%">差异值</th>
                    <th  width="8%">考核项权限配分</th>
                    <th  width="10%">评估值</th>
                    <th  width="8%">评分</th>
                    <th  width="48%">考核项说明</th>
                </tr>
                <tr>
                    <td>货损货差（次）</td>
                    <td>30</td>
                    <td>45</td>
                    <td>32</td>
                    <td>22</td>
                    <td><span class="Colorred">不达标</span></td>
                    <td><span class="Colorred">12</span></td>
                    <td>订单货损货差次数<br>单位：<span class="Colorred">次</span></td>
                </tr>
            </tbody>
         </table>
        </div>
        </div>

        <div class="address-collapse collapseInfo">
            <h2>管理考核</h2>
        <div class="essentialInformation">            
         <table class="tree-table">
            <tbody>
                <tr>
                    <th  width="12%">考核项目</th>
                    <th  width="7%">达标时效</th>
                    <th  width="7%">实际时效</th>
                    <th  width="8%">差异值</th>
                    <th  width="8%">考核项权限配分</th>
                    <th  width="10%">评估值</th>
                    <th  width="8%">评分</th>
                    <th  width="48%">考核项说明</th>
                </tr>
                <tr>
                    <td>投诉（次）</td>
                    <td>30</td>
                    <td>45</td>
                    <td>32</td>
                    <td>22</td>
                    <td><span class="Colorred">不达标</span></td>
                    <td><span class="Colorred">12</span></td>
                    <td>订单货主投诉次数<br>单位：<span class="Colorred">次</span></td>
                </tr>
                <tr>
                    <td>到车距离异常（次）</td>
                    <td>30</td>
                    <td>45</td>
                    <td>32</td>
                    <td>22</td>
                    <td><span class="Colorred">不达标</span></td>
                    <td><span class="Colorred">12</span></td>
                    <td>车主点击到达提货地或目的地时，距离客户下单地址异常次数<br>单位：<span class="Colorred">次</span></td>
                </tr>                
            </tbody>
         </table>
        </div>
        </div>

 </div>
</template>

<script>
import echarts from 'echarts'
export default {
    data(){
        return{
        option:{
            polar : [
            {
                indicator : [
                    { text: '撮合时效', max: 100},
                    { text: '中单后联系货主时效', max: 100},
                    { text: '到车时效', max: 100},
                    { text: '到货时效', max: 100},
                    { text: '回单时效', max: 100},
                    { text: '回款时效', max: 100},
                    { text: '货损货差', max: 100},
                    { text: '投诉', max: 100},
                    { text: '到车距离异常', max: 100},               
                    ]
                },  
            ],
          tooltip:{
          show:true,
          position:function(p){
            return [p[0] + 10, p[1] - 10];
          }
          },
           series : [
                {
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                type: 'radar',
                    data : [
                        {
                            value : [10, 20, 30, 40, 50, 60,70,80,90],
                            name: '评分',
                                            itemStyle: {
                    normal: {
                           color: '#a9d3ff',
                            lineStyle: {
                            color: '#a9d3ff',}}}}
                    ]
                }
            ]

        }
        }
    },
    methods:{
        firstBlood(){
            var myChart = echarts.init(document.getElementById('KPI_echarts')); 
             myChart.setOption(this.option); 
        }
    },
    mounted(){
        this.firstBlood()
    }
}
</script>

<style lang="scss" scoped>
.orderKPI{
    .orderEchart{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .orderKPI_fl{
        flex: 1;
        text-align: center;
        font-size:35px;
    }
    .orderKPI_fr{
        flex: 1
    }
    #KPI_echarts{
        width: 500px;
        height: 300px;
    }
    .Colorred{
        color: red;
    }
    .tree-table{
                width: 100%;
                border-left: 1px solid #d0d7e5;
                border-top: 1px solid #d0d7e5;
                font-size: 14px;
                color: #333;
                tr{
                    th{
                    border-right: 1px solid #d0d7e5;
                    border-bottom: 1px solid #d0d7e5; 
                    padding: 10px 10px;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                    background: #eaf0ff;
                    }
                    td{
                    border-right: 1px solid #d0d7e5;
                    border-bottom: 1px solid #d0d7e5; 
                    padding: 10px;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                    }
                }
            }
}        
</style>

