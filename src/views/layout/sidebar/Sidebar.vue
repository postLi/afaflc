<template>
  <div class="sidebar-container">
    <!--     <div class="sidebar-userinfo clearfix">
        <img :src="avatar" alt="">
        <span>{{ name }}</span><br><span>{{ company }}</span>
      </div> -->
      <SidebarMenuSearch :searchItem="sidebarRouters" />
      <el-menu
        class="sidebar-menu" 
        :default-active="$route.path"
        router
        unique-opened
        text-color="#fff">
        <template v-if="!item.hidden" v-for="(item,index) in sidebarRouters">
          <el-menu-item :key="index" v-if="!item.children" :index="item.path">
            <icon-svg v-if='item.icon' :icon-class="item.icon" /> 
            <span slot="title">{{!sidebar.opened ? item.meta.stitle :item.meta.title}}</span>
          </el-menu-item>
          <el-submenu v-else :key="index" :index="item.path">
            <template slot="title">
              <icon-svg v-if='item.icon' :icon-class="item.icon" /> 
              <span>{{!sidebar.opened ? item.meta.stitle :item.meta.title}}</span>
            </template>
            <template v-if="!item2.hidden" v-for="(item2,index2) in item.children">
              <el-menu-item :key="index2" v-if="!item2.children" :index="item2.path">
                <icon-svg v-if='item2.icon' :icon-class="item2.icon" /> 
                <span slot="title">{{!sidebar.opened ? item2.meta.stitle :item2.meta.title}}</span>
              </el-menu-item>
              <el-submenu v-else :key="index2" :index="item2.path">
                <template slot="title">{{!sidebar.opened ? item2.meta.stitle :item2.meta.title}}</template>
                <el-menu-item v-if="!item3.hidden" v-for="(item3,index3) in item2.children" :key="index3" :index="item3.path"><span slot="title">{{item3.meta.title}}</span></el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>
        </template>
      </el-menu>
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <!-- <sidebar-item ref="sidebaritem" :routes='sidebarRouters'></sidebar-item> -->
      <div class="nologin">
        <!-- <el-button size="large" type="primary"><a href="http://192.168.1.157:9528/?nologin=1">TMS系统</a></el-button><br>
        <el-button size="large" type="success"><a href="http://192.168.1.24:9526/?nologin=1">会员中心</a></el-button><br> -->
        <el-button size="large" type="primary"><a href="http://192.168.1.170/anfa/?nologin=1">官网后台</a></el-button>
      </div>
      <div @mouseover="showSubnav" @mouseout="hideSubnav" class="subNavWrapper"></div>
      <iframe src="http://192.168.1.170/member/autologin2.php" frameborder="0" style="width:0;height:0;"></iframe>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import SidebarMenuSearch from './SidebarMenuSearch'
import Hamburger from '@/components/Hamburger'
import './memu.scss'

export default {
  components: { SidebarItem, Hamburger, SidebarMenuSearch },
  computed: {
    ...mapGetters([
      'sidebar',
      'sidebarRouters',
      'permission_routers'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    showSubnav () {
      this.$refs.sidebaritem.clearTimer()
    },
    hideSubnav () {
      this.$refs.sidebaritem.hideSubNav()
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss">
@import "src/styles/variate.scss";
@import "src/styles/mixin.scss";
#app .sidebar-menu{
    padding-top: 10px;
  min-height: 100%;
  .router-link-exact-active{
    .el-menu-item{
      color: #20a0ff;
    }
  }
}
.sidebar-container{
  min-height: 100%;
  padding-top: 40px;
  background: #002039;
  border-radius: 0;

  .el-menu{
    border-right: 0;
    background: #002039;
  }

  .sidebar-userinfo{
    margin-top: -40px;
    margin-bottom: 15px;
    img{
      float: left;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      margin-left: 5px;
      
    }
    span{
      display: inline-block;
      width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #eee;
      line-height: 20px;
    }
  }

  .hamburger-container{
    position: absolute;
    top: 40px;
    right: 10px;
  }

   .subNavWrapper{
    display: none;
    position: absolute;
    left: 100%;
    max-height: 100%;
    overflow: auto;

  }

}
.nologin{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  margin-top: 10px;
  text-align: center;
  .el-button{
    margin-bottom: 10px;
    width: 150px;
  }
}


</style>
