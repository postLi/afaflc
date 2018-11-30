<template>
    <div class="dataChoose">

    </div>
</template>

<script>

// import { pickerOptions4,geoCoordMap } from '@/utils/index'

export default {
    name:'dataChoose',
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


<style lang="scss" scoped>
    .dataChoose{
        
    }
</style>