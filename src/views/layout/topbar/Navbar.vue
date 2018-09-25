<template>
  <div class="navbar">
    <div class="logo-panel">
      <router-link to="/"><img src="../../../assets/logo1.png" alt=""></router-link>
    </div>
    <TopNavMenu />
<!--     <router-link tag="div" class="pickClip" to="/order/pickClip"><icon-svg icon-class="tiaodanjia" />挑单夹</router-link> -->
    <TopNavUser />
    <!-- <TopNavCreateOrder /> -->
    <!-- <TopNavSearch /> -->
  </div>
  
</template>

<script>
import TopNavMenu from './TopNavMenu'
import TopNavUser from './TopNavUser'
import TopNavSearch from './TopNavSearch'
import TopNavCreateOrder from './TopNavCreateOrder'

export default {
  components: {
    TopNavMenu,
    TopNavUser,
    TopNavSearch,
    TopNavCreateOrder
  },
  data() {
    return {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variate.scss";
    .navbar {
        // background: #003863;
        // border-radius: 0;

    background: #373d41;
      border-radius: 0;
      float: left;
      /* height: 32%; */
      max-width: 32%;
      /* background: red; */
      min-width: 100%;
      // background: yellow;
      position: relative;
      display: flex;

        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .page-top-nav{
          // height: $topNavHeight;
          // float: left;
          // margin-left: 5px;

          height: 50px;
          float: left;
          /* margin-left: 5px; */
          flex: 12 !important;
          /* min-width: 1156px; */
          display: flex;
          // ul{
          //   border-bottom: none;
          //   display: flex !important;
          //   /* flex: 1; */
          //   min-width: 88%;
          //   li{
          //     height: 50px;
          //     line-height: 50px;
          //     color: #fff;
          //     font-size: 16px;
          //     text-align: center !important;
          //   }
          // }
        }
    }

    .logo-panel{
      // padding-left: 32px;
      // padding-right: 53px;
      // height: auto;
      // float: left;
      // height: $topNavHeight;


      padding-left: 32px;
      padding-right: 53px;
      height: auto;
      float: left;
      height: 50px;
      // background: blue;
      flex: 1;
      

      a{
        line-height: $topNavHeight;
        display: block;
      }
      
      img{
        height: 37px;
        width: 112px;
        vertical-align: middle;
      }
    }
    

    .pickClip{
      width: 110px;
      position: absolute;
      top: 0;
      right: 344px;
      height: $topNavHeight;
      color: #fff;
      text-align: center;
      cursor: pointer;
      &:hover{
        background-color: rgba(0, 0, 0, .2);
      }
      .svg-icon{
        margin-right: 0px;
        font-size: 1.5em;
        vertical-align: middle;
      }
    }
</style>

