<template>
    <div class="FinancialConSole">
        <h1 class="financialtitle">财务数据中心</h1>
        <div class="financial_top">
            <div class="TransactionFlow">
                12312323
            </div>
            <div class="backlog">
                123123
            </div>
        </div>
    </div>
</template>

<script>

// import { pickerOptions4,geoCoordMap } from '@/utils/index'
import './FinancialConSole.scss'

export default {
    name:'FinancialConSole',
    components:{
     
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
        }
    },
    methods: {
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
    }

}
</script>
