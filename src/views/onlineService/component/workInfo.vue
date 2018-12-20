<template>
    <div class="workInfo onlineCommonStyle">
        <div class="onlineTitle">
            <div class="onlineTitle_left">
                工 作 概 况
                <span class="fr">{{newTime}}</span>
            </div>
        </div>
        <div class="onlineService_content">
            <div class="onlineService_content_left">
                <!-- <div class="onlineService_content_left_top onlineService_icon">
                    <img src="../../../assets/onlineService/dianhua_out.png" alt="">
                    <span>外呼总时长</span>
                    <span>00:00:00</span>
                </div> -->
                <div class="onlineService_content_left_bottom onlineService_icon">
                    <img src="../../../assets/onlineService/dianhua_in.png" alt="">
                    <span>呼入总时长</span>
                    <span>00:00:00</span>
                </div>
            </div>
            <div class="onlineService_content_right">
                <ul>
                    <li>
                        呼入接通率 | 90%
                        <div>
                            <span>接听（9）</span>
                            <span>未接（9）</span>
                        </div>
                    </li>
                    <li>
                        呼入接通率 | 90%
                        <div>
                            <span>接听（9）</span>
                            <span>未接（9）</span>
                        </div>
                    </li>
                    <li>
                        APP响应率 | 90%
                        <div>
                            <span>接听（9）</span>
                            <span>未接（9）</span>
                        </div>
                    </li>
                    <li>
                        公众号响应率 | 90%
                        <div>
                            <span>接听（9）</span>
                            <span>未接（9）</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'workInfo',
    data(){
        return {
            newTime:''
        }
    },
    mounted(){
        this.getNowFormatDate()
    },
    methods:{
         getNowFormatDate(){
           	var now = new Date();
			// 获取年份:0~11
			var year = now.getFullYear();
			// 获取月份
			var month = now.getMonth()+1;
			// 获取日
			var date = now.getDate();

			this.newTime = date + ' 日 '+ month + ' 月 ';
        },
    },
}
</script>
