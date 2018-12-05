<template>
    <div class="onlineService">
        <div class="onlineService_top onlineCommon">
            <workInfo/>
            <workOrder/>
        </div>
        <div class="onlineService_bottom onlineCommon">
            <accountAudit/>
            <orderManage/>
        </div>
    </div>
</template>

<script>
    import './onlineCommonStyle.scss'
    import workInfo from './component/workInfo.vue'
    import workOrder from './component/workOrder.vue'
    import accountAudit from './component/accountAudit.vue'
    import orderManage from './component/orderManage.vue'
    
    export default {
        name:'onlineService',
        components:{
            workInfo,
            workOrder,
            accountAudit,
            orderManage
        },
        data(){
            return {
              
            }
        },
        methods:{

        },
        mounted(){

        },

    }
</script>


<style lang="scss" scoped>

</style>
