<template>
    <div class="dataChoose">
        <el-select v-model="currentkey" placeholder="请选择" v-show="isChoose">
            <el-option
            v-for="item in dataBtns"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <p>{{pickerDate[0] | parseTime('{y}-{m}-{d}')}} <span>至</span> {{pickerDate[1] | parseTime('{y}-{m}-{d}')}}</p>
        <el-date-picker
            v-model="pickerDate"
            type="daterange"
            align="right"
            value-format="timestamp"
            >                                                                                                                                                
        </el-date-picker>
    </div>
</template>

<script>

import { pickerOptions4, parseTime } from '@/utils/index'

export default {
    name:'dataChoose',
    components:{
    },
    props:{
        isChoose:{
            type:Boolean,
            default:true
        },
        keyVal:{
            type:Number,
            default:0
        },
        timeType:{
            type:String
        }
    },
    watch: {
        currentkey(newVal) {
            if (newVal !== '') {
                this.doAction(newVal)
            }
        },
        keyVal(newVal){
            // console.log('newVal',newVal)
            if(newVal){
                this.currentkey = newVal;
            }
        }
    },
    data() {
        return {
            newTime:'',
            timeOutComplate:null,
            value:'',
            currentkey:'',
            pickerDate:[],
            dataBtns: [{
                label: '今天',
                value: 0
            }, {
                label: '昨天',
                value: 1
            }, {
                label: '本周',
                value: 2
            }, {
                label: '本月',
                value: 3
            }, {
                label: '本年',
                value: 4
            },{
                label: '全部',
                value: 5
            }],
        }
    },
    methods: {
        doAction(type) {
            switch (type) {
                case 0:
                const Today = pickerOptions4.today()
                // console.log(this.dataset)
                // picker.$emit('pick', Today)
                this.pickerDate = Today
                // this.searchQuery.vo.buttonKey = 0
                this.currentkey = 0
                // this.title = '今天'
                console.log('今天')
                break
                case 1:
                const YesterDay = pickerOptions4.yesterDay()
                this.pickerDate = YesterDay
                // this.title = '昨天'
                console.log('昨天')
                // this.searchQuery.vo.buttonKey = 1
                this.currentkey = 1
                break
                case 2:
                // 最近的星期天的日期，到今天的日期
                const CurrentWeek = pickerOptions4.currentWeek()
                // 上上周星期天的日前，到上周六的日期
                const lastWeek = pickerOptions4.lastWeek()
                this.pickerDate = CurrentWeek
                // this.searchQuery.vo.buttonKey = 2
                this.currentkey = 2
                // this.title = '本周'
                console.log('本周')
                break
                case 3:
                // 本月1日到今天的日前
                const CurrentMonth = pickerOptions4.currentMonth()
                // 上月1日到上月的结束时间
                const LastMonth = pickerOptions4.lastMonth()
                this.pickerDate = CurrentMonth
                // this.searchQuery.vo.buttonKey = 3
                this.currentkey = 3
                // this.title = '本月'
                console.log('本月')
                break
                case 4:
                const CurrentYear = pickerOptions4.currentYear()
                const LastYear = pickerOptions4.lastYear()
                this.pickerDate = CurrentYear
                // this.searchQuery.vo.buttonKey = 4
                this.currentkey = 4
                // this.title = '本年'
                break
            }
            this.getData()
        },
        getData(){
            this.$emit('getValue',this.pickerDate,this.timeType)
        }
    },
    beforeDestroy(){
    },
    mounted() {
        this.currentkey = 0
    }

}
</script>

<style lang="scss" scoped>
    .dataChoose{
        height: 30px;
        line-height: 30px;
        p{
            display: inline-block;
            font-size: 16px;
        }
        .el-date-editor{
            display: none;
        }
        .el-select{
            width: 100px;
            margin-right: 10px;
             .el-input__inner{
                height: 30px;
                line-height: 30px;
            }
        }
    }
</style>

<style lang="scss">
    .dataChoose{
        .el-select .el-input .el-input__inner{
            height: 30px;
            line-height: 30px;
            // background:rgba(255,255,255,.5)
        }
    }
</style>