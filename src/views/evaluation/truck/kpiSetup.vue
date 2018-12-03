<template>
    <div class="TwoColumns kpiSetup clearfix">
        <div class="columnsContainer">
            <div class="side_left">
                 <el-tree
                 ref="treeForm"
                 show-checkbox
                :data="cityTree"
                 node-key="code"
                :props="defaultProps"
                :check-strictly="treestatus"
                :default-expand-all='treestatus'
                :highlight-current = "true"
                @check="nodeClick"
                >
                </el-tree>
            </div>
            <div class="side_right">
            <table class="tree-table">
            <tbody>
                <tr>
                    <th width="5%">序号</th>
                    <th  width="10%">考核项分类</th>
                    <th  width="10%">考核项</th>
                    <th  width="10%">考核权重配分</th>
                    <th  width="10%">评估值</th>
                    <th  width="15%" colspan="2">评估区间</th>
                    <th  width="8%">得分</th>
                    <th  width="32%">考核项说明</th>
                </tr>
                <tr>
                    <td rowspan="3">1</td>
                    <td rowspan="18">时效考核</td>
                    <td rowspan="3">撮合时效</td>
                    <td rowspan="3"><el-input type="text" placeholder="权重配分"></el-input></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                    <td rowspan="3">从客户下单时间开始计算，到首次确认中单司机所用时间；<br>单位：<span class="td_red">秒</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td>∞</td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>       

                <tr>
                    <td rowspan="3">2</td>
                    <td rowspan="3">中单后联系货主时效</td>
                    <td rowspan="3"><el-input type="text" placeholder="权重配分"></el-input></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                    <td rowspan="3">从确认中单司机开始计算，到车主联系货主或前往提货地所用时间；<br>单位：<span class="td_red">秒</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td>∞</td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>  

                <tr>
                    <td rowspan="3">3</td>
                    <td rowspan="3">到车时效</td>
                    <td rowspan="3"><el-input type="text" placeholder="权重配分"></el-input></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                    <td rowspan="3">实际到达提货地时间与预计到达提货地时间（即时订单：车主中单时间加上地图预估用时；预约订单：预约用车时间）差异值；<br>单位：<span class="td_red">分钟</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td>∞</td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>                     

                <tr>
                    <td rowspan="3">4</td>
                    <td rowspan="3">到货时效</td>
                    <td rowspan="3"><el-input type="text" placeholder="权重配分"></el-input></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                    <td rowspan="3">实际到达目的地时间与预计到达目的地时间差异值；<br>单位：<span class="td_red">秒</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td>∞</td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>     

                <tr>
                    <td rowspan="3">5</td>
                    <td rowspan="3">回单时效</td>
                    <td rowspan="3"><el-input type="text" placeholder="权重配分"></el-input></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                    <td rowspan="3">从完成卸货时间开始计算，到车主回单所用时间；<br>单位：<span class="td_red">小时</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td>∞</td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>     

                <tr>
                    <td rowspan="3">6</td>
                    <td rowspan="3">回款时效</td>
                    <td rowspan="3"><el-input type="text" placeholder="权重配分"></el-input></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                    <td rowspan="3">从完成卸货时间开始计算，到车主回款所用时间；<br>单位：<span class="td_red">小时</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-input type="text" placeholder="时效区间"></el-input></td>
                    <td>∞</td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>    

                <tr>
                    <td rowspan="3">7</td>
                    <td rowspan="3">交付考核</td>
                    <td rowspan="3">货损货差</td>
                    <td rowspan="3"><el-input type="text" placeholder="权重配分"></el-input></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-input type="text" placeholder="次数区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                    <td rowspan="3">订单货损货差次数<br>单位：<span class="td_red">次</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-input type="text" placeholder="次数区间"></el-input></td>
                    <td><el-input type="text" placeholder="次数区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-input type="text" placeholder="次数区间"></el-input></td>
                    <td>∞</td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>     

                <tr>
                    <td rowspan="3">8</td>
                    <td rowspan="6">管理考核</td>
                    <td rowspan="3">投诉</td>
                    <td rowspan="3"><el-input type="text" placeholder="权重配分"></el-input></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-input type="text" placeholder="次数区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                    <td rowspan="3">订单货主投诉次数；<br>单位：<span class="td_red">次</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-input type="text" placeholder="次数区间"></el-input></td>
                    <td><el-input type="text" placeholder="次数区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-input type="text" placeholder="次数区间"></el-input></td>
                    <td>∞</td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>                     

                <tr>
                    <td rowspan="3">9</td>
                    <td rowspan="3">到车距离异常</td>
                    <td rowspan="3"><el-input type="text" placeholder="权重配分"></el-input></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-input type="text" placeholder="次数区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                    <td rowspan="3">车主点击到达提货地或目的地时，距离客户下单地址异常次数；<br>单位：<span class="td_red">次</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-input type="text" placeholder="次数区间"></el-input></td>
                    <td><el-input type="text" placeholder="次数区间"></el-input></td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-input type="text" placeholder="次数区间"></el-input></td>
                    <td>∞</td>
                    <td><el-input type="text" placeholder="计分"></el-input></td>
                </tr>     
            </tbody>    
            </table>
            <div class="btn_footer">
                <el-button type="primary" plain @click="Addsave">保存</el-button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { aflcProvinceCode } from '@/api/common.js'
import { aflcAssessmentSettings } from '@/api/evaluation/kpiSetup.js'
export default {
    name:'kpiSetup',
    data(){   
        return{
        cityTree:[],
        treestatus:false,
        defaultProps: {
                  children: 'children',
                  label: 'name'
        },
        formdata:[
            {classAssessItem:'1',appraItems:'1',assessWeightPoint:'1',evakuaValue:'达标',evaluaIntervalStart:'0',evaluaIntervalEnd:'10',score:'100',assessDescrip:'从客户下单时间开始计算，到首次确认中单司机所用时间；'},
            {classAssessItem:'2',appraItems:'2',assessWeightPoint:'2',evakuaValue:'达标',evaluaIntervalStart:'10',evaluaIntervalEnd:'20',score:'100',assessDescrip:'从客户下单时间开始计算，到首次确认中单司机所用时间；'}
        ]
        }
    },
    mounted() {
            this.firstblood()
            this.getMoreInformation()
        },
    methods:{
        firstblood(){

        },
        getMoreInformation(){
            aflcProvinceCode().then(res=>{
                this.cityTree = res.data;
           })
        },
        nodeClick(){
  
        },
        Addsave(){
            console.log('fdfdf',this.formdata);
            aflcAssessmentSettings(this.formdata).then(res=>{
                console.log('成功')
            }).catch(res=>{
                console.log('失败')
            })
        }

    }    
}
</script>

<style lang="scss">
    .kpiSetup{
        height:100%;    
        position: relative;
        margin-left:7px;
        padding-bottom: 0px;
        .side_left{
        height: 100%;
        position: relative;
            .side_left_top{
             height:100%;
             overflow-y: auto;
             overflow-x: hidden;
             }
            .side_left_bottom{
             position: absolute;
             bottom: 10px;
             right: 10px;
             vertical-align: bottom
             }
        }
        .btn_footer{
                 text-align: center;
                 margin:20px 0px;
        }
        .el-tree-node__content{
        .el-checkbox{
            display: none;
        }
        }
        .el-tree-node__children{
            .el-checkbox{
                display: block
            }
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
                padding: 0px 10px;
                box-sizing: border-box;
                text-overflow: ellipsis;
                vertical-align: middle;
                .td_red{
                    color:red
                }
                .el-input__inner{
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                }
                }
            }
        }
        
        }
</style>

