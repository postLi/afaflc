<template>
    <div class="tradeAreaCarrier tabsWrap">
       <el-tabs v-model="tradeAreaCarrierName" type="card" @tab-click="handleClick" >
            <!-- 商圈承运商 -->
                <el-tab-pane label="商圈承运商" name="tradeAreaLineCarrier">
                    <tradeAreaLineCarrier :isvisible="tradeAreaCarrierName === 'tradeAreaLineCarrier'"/>
                </el-tab-pane>

            <!-- 商圈增值服务定价 -->
                <el-tab-pane label="商圈增值服务定价" name="tradeAreaServicePrice">
                    <tradeAreaServicePrice :isvisible="tradeAreaCarrierName === 'tradeAreaServicePrice'"/>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import tradeAreaLineCarrier from './tradeAreaLineCarrier/tradeAreaLineCarrier'
import tradeAreaServicePrice from './tradeAreaServicePrice/tradeAreaServicePrice'
export default {
    name: 'tradeAreaCarrier',
    components: {
        tradeAreaLineCarrier,
        tradeAreaServicePrice
    },
    data() {
        return {
            tradeAreaCarrierName: 'tradeAreaLineCarrier',
        }
    },
    computed: {

    },
    created() {
        this.tradeAreaCarrierName = sessionStorage.getItem('tradeAreaCarrierName') || 'tradeAreaLineCarrier';
    },
    beforeUpdate () {
        sessionStorage.setItem('tradeAreaCarrierName', this.tradeAreaCarrierName);
    },
    beforeDestroy () {
        sessionStorage.setItem('tradeAreaCarrierName', this.tradeAreaCarrierName);
    },
    mounted() {
        // if (this.$route.query.currentTab) {
        // this.tradeAreaCarrierName = this.$route.query.currentTab
        // }
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.tradeAreaCarrierName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .tradeAreaCarrier{
    }
</style>

