
<template>
  <div class="member tabsWrap">
    <el-tabs v-model="operaName" type="card" @tab-click="handleClick" >
        <!-- 抽拥 -->
            <el-tab-pane label="抽拥" name="smoke">
                <smoke :isvisible="operaName === 'smoke'"></smoke>
            </el-tab-pane>

        <!-- 优惠卷 -->
            <el-tab-pane label="优惠卷" name="coupon">
                <coupon :isvisible="operaName === 'coupon'"></coupon>
            </el-tab-pane>

        <!-- 优惠金 -->
            <el-tab-pane label="优惠金" name="gold">
                <gold :isvisible="operaName === 'gold'"></gold>
            </el-tab-pane>
            
        <!-- 奖励金 -->
            <el-tab-pane label="奖励金" name="bounty">
                <bounty :isvisible="operaName === 'bounty'"></bounty>
            </el-tab-pane>

        <!-- 达量奖励 -->
            <el-tab-pane label="达量奖励" name="amount">
                <amount :isvisible="operaName === 'amount'"></amount>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import '@/styles/dialog.scss'
import '@/styles/tab.scss'
import smoke from './smoke.vue'
import coupon from './coupon.vue'
import gold from './gold.vue'
import bounty from './bounty.vue'
import amount from './amount.vue'
export default {
  data() {
    return {
      operaName: 'smoke'
    }
  },
  name: 'operating',
  components: {
    smoke,
    coupon,
    gold,
    bounty,
    amount
  },
  watch: {
    operaName(newVal, oldVal) {
      if (newVal) {
        this.operaName = newVal
      } else {
        this.operaName = oldVal
      }
    }
  },
  created() {
    this.operaName = sessionStorage.getItem('operaName') || 'smoke'
  },

  beforeUpdate() {
    sessionStorage.setItem('operaName', this.operaName)
  },

  beforeDestroy() {
    sessionStorage.setItem('operaName', 'smoke')
  },
  methods: {
    handleClick(tab, event) {
      this.operaName = tab.name
    }
  }
}
</script>
