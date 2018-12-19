<template>
    <div class="regionalCarrier tabsWrap">
       <el-tabs v-model="regionalCarrierName" type="card" @tab-click="handleClick" >
            <!-- 线路承运商 -->
                <el-tab-pane label="线路承运商" name="lineCarrier">
                    <lineCarrier :isvisible="regionalCarrierName === 'lineCarrier'"/>
                </el-tab-pane>

            <!-- 线路增值服务定价 -->
                <el-tab-pane label="线路增值服务定价" name="lineServicePrice">
                    <lineServicePrice :isvisible="regionalCarrierName === 'lineServicePrice'"/>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import lineCarrier from './lineCarrier'
import lineServicePrice from './lineServicePrice'
export default {
    name: 'regionalCarrier',
    components: {
        lineCarrier,
        lineServicePrice
    },
    data() {
        return {
            regionalCarrierName: 'lineCarrier',
        }
    },
    computed: {

    },
    // created() {
    //     this.routeQuery = sessionStorage.getItem('orderSerial');
    //     console.log('created',this.routeQuery)
    // },

    // beforeUpdate () {
    //     sessionStorage.setItem('orderSerial', this.routeQuery);
    //     console.log('beforeUpdate',this.routeQuery)
    // },

    // beforeDestroy () {
    //     sessionStorage.setItem('orderSerial', this.routeQuery);
    //     console.log('beforeDestroy',this.routeQuery)
    // },

    mounted() {
        // if (this.$route.query.currentTab) {
        // this.regionalCarrierName = this.$route.query.currentTab
        // }
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.regionalCarrierName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .regionalCarrier{
    }
</style>

