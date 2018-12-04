<template>
  <div class="tabsWrap clearfix">
    <el-tabs v-model="shipperName" type="card" @tab-click='tabClik' lazy=true>
      <el-tab-pane label='全部投保单(8)' name="first" ref="first" >
          <all ref="all" :tabsNameFn="tabsNameFn" :isvisible="shipperName === 'all'"></all>
      </el-tab-pane>
      <el-tab-pane label='待支付投保单(8)' name="second" ref="second">
          <payFor ref="payFor" :tabsNameFn="tabsNameFn" :isvisible="shipperName === 'payFor'"></payFor>
      </el-tab-pane>
      <el-tab-pane label='已支付投保单(8)' name="three" ref="three">
          <isPayfor ref="isPayfor" :tabsNameFn="tabsNameFn" :isvisible="shipperName === 'isPayfor'"></isPayfor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // import cashAuditing from './cashAuditing.vue'
  import all from './administration'
  import payFor from './administration'
  import isPayfor from './administration'
  // import cashAuditingStatus from './cashAuditingStatus.vue'
  export default {
    data() {
      return {
        tabsNameFn: 'first',
        shipperName: 'first',
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
    mounted() {
      console.log(this.$refs.first);
      if(this.$refs.first.$children[0].tabsNameFn === 'first'){
        this.tabsNameFn = 'first'
        console.log(this.$refs.first.$children[0].tabsNameFn === 'first','this.$refs.first.$children[0].tabsNameFn===\'first\'');
      }
    },
    methods: {
      handleClick(tab, event) {
        this.shipperName = tab.name;
      },
      tabClik(i,e) {

        // console.log(i,'iiiiiiiii')
        // if (i.name === 'first') {
        //   this.tabsNameFn = 'first'
        // }
        // if (i.name === 'second') {
        //   this.tabsNameFn = 'second'
        // }
        // if (i.name === 'three') {
        //   this.tabsNameFn = 'three'
        // }

      },
    }
  }
</script>
<style lang="scss">
</style>

