<template>
  <div class="page-top-nav">
    <el-menu 
      mode="horizontal" 
      :default-active="current"
      :router="true">
      <el-menu-item key="/dashboard" index="/">
        <icon-svg icon-class="shouye" /> 首页
      </el-menu-item>
      <template v-for="(menu, index) in permission_routers">
         <el-menu-item :key="index" :index="menu.path" v-if="!menu.hidden">
          <icon-svg v-if="menu.icon" :icon-class="menu.icon" /> {{menu.name}}
        </el-menu-item>
      </template>
      </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TopNavMenu',
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  },
  data() {
    return {
      current: '',
      prevPath: ''
    }
  },
  watch: {
    $route() {
      this.setNavHightlight()
    }
  },
  mounted() {
    this.setNavHightlight()
  },
  methods: {
    /**
     * 设置与当前页匹配的菜单高亮
     */
    setNavHightlight() {
      // 只过滤第一层，判断二级大菜单路径去匹配
      const find = this.permission_routers.filter(route => {
        // 针对首页子链接特殊处理
        if (route.name === 'dashboard') {
          return this.$route.meta.proute === route.name
        } else {
          return route.path !== '/' && this.$route.path.indexOf(route.path) === 0
        }
      })
      const current = find[0] || this.$route
      this.current = current.path
      if (this.prevPath !== this.current) {
        this.prevPath = this.current
        this.$store.dispatch('GenerateSidebarRoutes', current.name)
      }
    }
  }
}
</script>


<style lang="scss">
@import "src/styles/variate.scss";
  #app .page-top-nav{
    .el-menu--horizontal{
      border-bottom: none;
    }
    .el-menu{
      background: #373d41;
    }
  }
  #app .page-top-nav .el-menu-item{
    height: $topNavHeight;
    line-height: $topNavHeight;
    color: #fff;
    font-size: $topNavFontSize;

    &.is-active{
      background: #2a2f32;
      border-bottom: none;
    }

    .svg-icon{
      margin-right: 0;
      vertical-align: -4px;
      font-size: 1.2em;
    }

    &:hover{
      background: #2a2f32;
    }
  }
  #app .page-top-nav .el-submenu>.el-menu{
    top: $topNavHeight + 2px;
  }
</style>
