<template>
    <div class="FinancialConSole">
        <h1 class="financialtitle">财务数据中心</h1>
        <div class="financial_top">
            <div class="TransactionFlow financialCommon">
                <h4>订单类型概览</h4>
                <div class="TransactionFlow_classfy">
                    <div class="transItem">
                        <h6>现金流入</h6>
                        <p>85,000,000元</p>
                        <p>昨日全天：100,000,000</p>
                    </div>
                    <div class="transItem">
                        <h6>现金流出</h6>
                        <p>110,000,000元</p>
                        <p>昨日全天：100,000,000</p>   
                    </div>
                    <div class="transItem"> 
                        <h6>流水差</h6>
                        <p>25,000,000元</p>
                        <p>昨日全天：100,000,000</p>
                    </div>
                </div>
            </div>
            <div class="backlog financialCommon">
                <h4>待办事项</h4>
                <ul>
                    <li>
                       <span>待处理提现金额</span>
                       <p class="fr">
                            <span>{{pendingExtractCashCount.amount ? pendingExtractCashCount.amount : 0}} 元 &nbsp;</span>
                       </p>
                   </li>
                   <li>
                       <span>待处理数</span>
                       <p class="fr">
                            <span>{{pendingExtractCashCount.count}}</span><span> >> </span>
                       </p>
                   </li>
                </ul>
            </div>
        </div>
        <div class="financial_middle financialCommon">
            <h4>流水明细</h4>
            <div class="financial_stream">
                <el-row>
                    <el-col :span="4"></el-col>
                    <el-col :span="4" class="financial_stream_title">运费收入</el-col>
                    <el-col :span="4" class="financial_stream_title">支付运费</el-col>
                    <el-col :span="4" class="financial_stream_title">退款金额</el-col>
                    <el-col :span="4" class="financial_stream_title">营销支出</el-col>
                    <el-col :span="4" class="financial_stream_title">平台抽佣</el-col>
                </el-row>
                <el-row> 
                    <el-col :span="4" class="financial_stream_title">小货车</el-col>
                    <el-col :span="4">52000</el-col>
                    <el-col :span="4">52000</el-col>
                    <el-col :span="4">52000</el-col>
                    <el-col :span="4">52000</el-col>
                    <el-col :span="4">52000</el-col>
                </el-row>
                <el-row> 
                    <el-col :span="4" class="financial_stream_title">大货车</el-col>
                    <el-col :span="4">52000</el-col>
                    <el-col :span="4">52000</el-col>
                    <el-col :span="4">52000</el-col>
                    <el-col :span="4">52000</el-col>
                    <el-col :span="4">52000</el-col>
                </el-row>
                <el-row> 
                    <el-col :span="4" class="financial_stream_title">发物流</el-col>
                    <el-col :span="4">52000</el-col>
                    <el-col :span="4">52000</el-col>
                    <el-col :span="4">52000</el-col>
                    <el-col :span="4">52000</el-col>
                    <el-col :span="4">52000</el-col>
                </el-row>
            </div>
        </div>
        <!--  交易变化曲线图 -->
        <tradeLine/>
        <transacitonMap/>
    </div>
</template>

<script>

// import { pickerOptions4,geoCoordMap } from '@/utils/index'
import './FinancialConSole.scss'
import tradeLine from './line/tradeLine'
import transacitonMap from './point/transactionMap'
import { pendingExtractCashCount } from '@/api/transaction.js'
export default {
    name:'FinancialConSole',
    components:{
        tradeLine,
        transacitonMap
    },
    watch: {
        
    },
    data() {
        return {
            pendingExtractCashCount:{},//待办事项
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
        }
    },
    methods: {
        //待办事项
        ExtractCashCount(){
            pendingExtractCashCount().then(res => {
                this.pendingExtractCashCount = res.data;
            })
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
      
    },
    beforeDestroy(){

    },
    mounted() {
        // this.getNowFormatDate();
        // this.timeOutComplate = setInterval(this.getNowFormatDate,1000);
        this.ExtractCashCount();
    }

}
</script>
