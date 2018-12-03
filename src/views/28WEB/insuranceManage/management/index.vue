<template>
  <div class="tabsWrap clearfix">
    <el-tabs v-model="shipperName" type="card" @tab-click='tabClik'>
      <el-tab-pane label='全部投保单(8)' name="first" ref="first">
        <all ref="all" :tabsNameFn="tabsNameFn"></all>
      </el-tab-pane>
      <el-tab-pane label='待支付投保单(8)' name="second" ref="second">
        <payFor ref="payFor" :tabsNameFn="tabsNameFn"></payFor>
      </el-tab-pane>
      <el-tab-pane label='全部投保单(8)' name="three" ref="three">
        <isPayfor ref="isPayfor" :tabsNameFn="tabsNameFn"></isPayfor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // import cashAuditing from './cashAuditing.vue'
  import all from './administration.vue'
  import payFor from './administration.vue'
  import isPayfor from './administration.vue'
  // import cashAuditingStatus from './cashAuditingStatus.vue'
  export default {
    data() {
      return {
        tabsNameFn: {
        },
        shipperName: 'first',
        labelTab: '全部投保单'
      }
    },
    components: {
      all,
      payFor,
      isPayfor,
    },
    watch: {
      shipperName(newVal, oldVal) {
        if (newVal) {
          this.shipperName = newVal;
        } else {
          this.shipperName = oldVal;
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        this.shipperName = tab.name;
      },
      tabClik(i) {
        if (i.name === 'first') {
          this.$set(this.tabsNameFn,'firstName',i.name)
          // console.log(this.tabsNameFn,'firstName');
        }
        else if (i.name === 'second') {
          this.$set(this.tabsNameFn,'secondName',i.name)
          // console.log(this.tabsNameFn,'secondName');
        }
        else if (i.name === 'three') {
          this.$set(this.tabsNameFn,'threeName',i.name)
          // console.log(this.tabsNameFn,'threeName');
        }
        // tabsNameFn: {
        //   firstName: '',
        //     secondName: '',
        //     threeName: '',
        // },


        // console.log(i.name, 'iiiiiiii')
      },
    }
  }
</script>
<style lang="scss">
</style>

