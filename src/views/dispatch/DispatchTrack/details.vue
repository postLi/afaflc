<template>
    <!-- 详情 -->
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="订单基本信息" name="1">
            <div class="essentialInformation">
                <p>
                <span>订单号：</span>
                <span></span>
                </p>
                <p>
                <span>货主账号：</span>

                </p>
                <p>
                <span>货主姓名：</span>

                </p>
                <p>
                <span>订单分布区域：</span>

                </p>
                <p>
                <span>订单分类：</span>

                </p>
            </div>
            <div class="essentialInformation">
                <p>
                <span>订单类型：</span>

                </p>
                <p>
                <span>用车时间：</span>

                </p>
                <p>
                <span>货主用车类型：</span>

                </p>
                <p>
                <span>发货地址：</span>

                </p>
            </div>
            <div class="essentialInformation">
                <p>
                <span>货物名称：</span>

                </p>
                <p>
                <span>额外服务：</span>

                </p>
                <p>
                <span>收货联系人：</span>

                </p>
                <p>
                <span>收货人电话：</span>

                </p>
                <p>
                <span>我的司机 优选接单：</span>

                </p>
            </div>
            <div class="essentialInformation">
                <p>
                <span>发货地址：</span>

                </p>
                <p>
                <span>收货地址：</span>

                </p>
                <p>
                <span>给司机捎句话：</span>

                </p>
            </div>
        </el-collapse-item>
        <el-collapse-item title="运费信息" name="2">
            <div class="">
                <p>
                    <span>运费总额：</span>
                    <span></span>
                </p>
                <p>
                    <span>已优惠：</span>
                    <span></span>
                </p>
                <p>
                    <span>起步价：</span>
                    <span></span>
                </p>
                <p>
                    <span>里程数：</span>
                    <span></span>
                </p>
                <p>
                    <span>超里程价：</span>
                    <span></span>
                </p>
            </div>
            <div class="">
                <p>
                    <span>超里程数：</span>
                    <span></span>
                </p>
                <p>
                    <span>给司机小费：</span>
                    <span></span>
                </p>
                <p>
                    <span>支付方式：</span>
                    <span></span>
                </p>
                <p>
                    <span>付款状态：</span>
                    <span></span>
                </p>
            </div>
        </el-collapse-item>
        <el-collapse-item title="抢单记录" name="3" v-if="record == true">
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="操作时间"
                >
            </el-table-column>
            <el-table-column
                prop="name"
                label="操作事项"
                >
            </el-table-column>
            <el-table-column
                prop="address"
                label="抢单时间">
            </el-table-column>
            <el-table-column
                prop="address"
                label="距离">
            </el-table-column>
            <el-table-column
                prop="address"
                label="本日与该货主交易次数"
                width="110">
            </el-table-column>
            <el-table-column
                prop="address"
                label="本月与该货主交易次数"
                width="110">
            </el-table-column>
            <el-table-column
                prop="address"
                label="本月累计交易次数"
            >
            </el-table-column>
            </el-table>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
export default {
    name: 'detailsComponent',
    props: {
        record:{
            type:Boolean,
            
        }
    },
   
    components:{
    },
    data() {
      return {
        activeNames: ['1','2','3'],
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      };
    },
     // computed: {
    // 　　newValue() {
    // 　　　　return this.b.c
    // 　　}
    // },
    watch:{
      
        
    },
    mounted(){
        // this.init();
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },
        init(){

        }

    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .el-collapse{
        border-bottom:0 none ;
        padding: 0 10px;
        .el-collapse-item{
            margin-bottom:5px;
            .el-collapse-item__header{
                text-align: center;
                background-color: #e9f3fa;
                font-size:16px;
                color: #333333;
                .el-icon-arrow-right{
                    margin-right:0;
                    float: left;
                    margin-left:15px;
                }
            }
            .el-collapse-item__wrap{
                background-color: #f0f0f0;
                margin:4px 0;
                border:0 none ;
                width:100%;
                padding:20px;
                font-size: 13px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 20px;
                letter-spacing: 0px;
                color: #666666;
                p{
                    display: inline-block;
                    color:#333333;
                    span{
                        color:#666666;
                    }
                }
                .el-collapse-item__content{
                    padding-bottom:0;
                }
            }
            .el-table{
                position:static;    
                th,td{
                    border-bottom:0 none;
                    border-color:none;
                    background:#f0f0f0;
                    text-align:center;
                }
                &::before {
                    height:0px;
                    width:0px;
                }
            }
        }
    }
</style>