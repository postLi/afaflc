<template>
  <div class="detail-lll">
    <div class="detail">
      <div class="classul">
        <ul>
          <li>
            <span>平安国内货运险</span>
            <span>保险单</span>
            <span>投保日期：2018-11-14 15:23:45</span>
          </li>
          <br>
          <li>
            <span>投保单号：AFBX2018111516175896</span>
            <span>保险金额：<i style="color:red;font-style: normal">10.00</i> 元</span>
            <span>已支付</span>
            <span>支付时间：2018-11-16 15:26:59</span>
          </li>
        </ul>
      </div>
      <div class="title-class">
        <h4>投保人信息</h4>
      </div>
      <table class="detail-top">
        <tr>
          <th>类型</th>
          <th>投保人</th>
          <th>证件号</th>
        </tr>
        <tr>
          <td>个人</td>
          <td>张远</td>
          <td>430902199589522666</td>
        </tr>
      </table>
      <div class="title-class" style="margin-top: 15px;">
        <h4>被保人信息</h4>
      </div>
      <table class="detail-top">
        <tr>
          <th>类型</th>
          <th>投保人</th>
          <th>证件号</th>
        </tr>
        <tr>
          <td>个人</td>
          <td>张远</td>
          <td>430902199589522666</td>
        </tr>
      </table>
      <div class="title-class" style="margin-top: 15px;">
        <h4>货物信息</h4>
      </div>
      <table class="detail-botton">
        <tr>
          <th width="16%" style="background-color: rgb(249,249,249);text-align: right;font-weight: normal">货物类型</th>
          <th style="font-weight: normal;text-align: left">工业类、纺织服装类</th>
          <!--<th>证件号</th>-->
        </tr>
        <tr>
          <td style="background-color: rgb(249,249,249);text-align: right">货物名称</td>
          <td style="text-align: left">衣服</td>
        </tr>
        <tr>
          <td style="background-color: rgb(249,249,249);text-align: right">货物包装</td>
          <td style="text-align: left">货物包装</td>
        </tr>
        <tr>
          <td style="background-color: rgb(249,249,249);text-align: right">货物包装</td>
          <td style="text-align: left">1112</td>
        </tr>
        <tr>
          <td style="background-color: rgb(249,249,249);text-align: right">货物价值</td>
          <td style="text-align: left">20000.00元</td>
        </tr>
      </table>

      <div class="title-class" style="margin-top: 15px;">
        <h4>运输信息</h4>
      </div>
      <table class="detail-top">
        <tr>
          <th width="16%" style="background-color: rgb(249,249,249);text-align: right;font-weight: normal">起运地</th>
          <th width="34%" style="background-color: white;text-align: left;font-weight: normal">工业类、纺织服装类</th>
          <th width="16%" style="background-color: rgb(249,249,249);text-align: right;font-weight: normal">起运日期</th>
          <th width="34%" style="background-color: white;text-align: left;font-weight: normal">2018-11-15</th>
        </tr>
        <tr>
          <td style="background-color: rgb(249,249,249);text-align: right">目的地</td>
          <td style="background-color: white;text-align: left;font-weight: normal">衣服</td>
          <td style="background-color: rgb(249,249,249);text-align: right">车牌号</td>
          <td style="background-color: white;text-align: left;font-weight: normal">湘H15952</td>
        </tr>
        <tr>
          <td style="background-color: rgb(249,249,249);text-align: right">中转地</td>
          <td style="background-color: white;text-align: left;font-weight: normal"> 袋装</td>
          <td style="background-color: rgb(249,249,249);text-align: right">运单号</td>
          <td style="background-color: white;text-align: left;font-weight: normal">AFBX2018111516175896</td>
        </tr>
      </table>
    </div>
  </div>
  <!--<el-container>-->
  <!--<el-main>-->
  <!---->
  <!--</el-main>-->
  <!--</el-container>-->


</template>

<script>
  import * as apiInsu from '@/api/web/insurance'

  export default {
    name: "detail",
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    mounted() {
      this.fetchDetail()
    },
    methods: {
      fetchDetail() {
        apiInsu.getInsuranceDetail(this.$route.query.id).then(data => {
          console.log(data, data)
        })
      }
    }
  }
</script>

<style lang="scss">
  .detail-lll {
    /*background-color: green;*/
    height: 100%;
    padding: 10px;
    .detail {
      padding: 20px 50px 0px 50px;
      /*background-color: red;*/
      padding-bottom: 0;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      border: 2px solid #ccc;
      height: 100%;
      width: 100%;
      .classul {
        margin-bottom: 20px;
        ul {
          border: 1px solid #ccc;
          li:first-of-type {
            background: rgb(254, 254, 250);
            border-bottom: 1px solid #ccc;
            padding: 10px;
            span:first-of-type {
              font-weight: 600;
              font-size: 16px;
              padding-left: 10px;
            }
            span:nth-of-type(2) {
              padding-left: 10px;
            }
            span:last-of-type {
              float: right;
            }
            /*float: left;*/
          }
          li:last-of-type {
            padding: 0 0 10px 10px;
            font-size: 15px;
            margin-top: -8px;
            span:first-of-type {
              padding-left: 10px;
            }
            span:nth-of-type(2) {
              padding-left: 30px;
            }
            span:nth-of-type(3) {
              padding-left: 20px;
              color: #409eff;
            }
            span:last-of-type {
              padding-left: 30px;
              /*float: right;*/
            }
            /*float: left;*/
          }
        }
      }
      .title-class {
        border-bottom: 1px solid rgb(22, 155, 213);
        padding-bottom: 10px;
        padding-left: 15px;
      }
      table th, table td {
        font-size: 14px;
        padding: 8px;
        border: 1px solid #ccc;
      }
      /* gridtable */
      table.detail-top {
        margin-top: 15px;
        font-family: verdana, arial, sans-serif;
        color: #333333;
        border-collapse: collapse;
      }
      table.detail-top th {
        background-color: rgb(232, 235, 238);
      }
      table.detail-top td {
        background-color: #ffffff;
      }
      table.detail-botton {
        margin-top: 15px;
        font-family: verdana, arial, sans-serif;
        color: #333333;
        border-collapse: collapse;
      }
      table.detail-botton th {

        /*background-color: rgb(232, 235, 238) ;*/
      }
      table.detail-botton td {
        padding: 12px;
        background-color: #ffffff;
      }
    }
  }

</style>
