<template>
  <div class="tabsWrap clearfix">
    <el-tabs v-model="cashAuditingName" type="card"  @tab-click='handleClick'>
        <!-- 全部提现 -->
            <el-tab-pane label="全部提现" name="first">
                <cashAuditing ></cashAuditing>
            </el-tab-pane>

        <!-- 待处理/审核中 -->
            <el-tab-pane label='待处理' name="second">
                <cashAuditingStatus ></cashAuditingStatus>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cashAuditing from './cashAuditing.vue'
import cashAuditingStatus from './cashAuditingStatus.vue'
export default {
    data(){
        return{
            cashAuditingName:'first',
        }
    },
    components:{
            cashAuditing,
            cashAuditingStatus,
    },
    watch: {
        cashAuditingName(newVal, oldVal) {
          if (newVal) {
            this.cashAuditingName = newVal
          } else {
            this.cashAuditingName = oldVal
          }
        }
      },
      created() {
        this.cashAuditingName = sessionStorage.getItem('cashAuditingName') || 'first'

      },

      beforeUpdate() {
        sessionStorage.setItem('cashAuditingName', this.cashAuditingName)
      },

      beforeDestroy() {
        sessionStorage.setItem('cashAuditingName', 'first')
      },
     methods: {
     handleClick(tab, event) {
      this.cashAuditingName = tab.name;
       },
     }
     
}
</script>
<style lang="scss" >
</style>
