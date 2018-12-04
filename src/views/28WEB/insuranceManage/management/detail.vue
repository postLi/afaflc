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
            <span>保险金额：10.00 元</span>
            <span>已支付</span>
            <span>支付时间：2018-11-16 15:26:59</span>
          </li>
        </ul>
      </div>
       <table class="detail-top">
           <tr>
               <th>平安国内货运险 </th>
               <th>保险单</th>
               <th>投保日期：2018-11-14 15:23:45 </th>
           </tr>
           <tr>
               <td>Text 1A</td><td>Text 1B</td><td>Text 1C</td>
           </tr>
           <tr>
               <td>Text 2A</td><td>Text 2B</td><td>Text 2C</td>
           </tr>
       </table>

      <!--<el-table-->
        <!--:data="tableData"-->
        <!--border-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--prop="date"-->
          <!--label="日期"-->
          <!--width="180">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="name"-->
          <!--label="姓名"-->
          <!--width="180">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="address"-->
          <!--label="地址">-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    </div>
    <!--<el-container>-->
    <!--<el-main>-->
    <!---->
    <!--</el-main>-->
    <!--</el-container>-->

  </div>
</template>

<script>
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
    }
  }
</script>

<style lang="scss">
  .detail-lll {
    /*background-color: green;*/
    height: 100%;
    padding: 10px;
    .detail{
      padding: 50px;
      /*background-color: red;*/
      padding-bottom: 0;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      border: 2px solid #ccc;
      height: 100%;
      width: 100%;
      .classul{
        margin-bottom: 20px;
        ul{
          border:1px solid #ccc;
          li:first-of-type{
            background: rgb(254,254,250);
            border-bottom: 1px solid #ccc;
            padding: 10px;
            span:first-of-type{
              font-weight: 600;
              font-size: 16px;
              padding-left: 10px;
            }
            span:nth-of-type(2){
              padding-left: 10px;
            }
            span:last-of-type{
              float: right;
            }
              /*float: left;*/
          }
          li:last-of-type{
            padding: 10px;
            span:first-of-type{
              font-weight: 600;
              font-size: 16px;
              padding-left: 10px;
            }
            span:nth-of-type(2){
              padding-left: 10px;
            }
            span:last-of-type{
              float: right;
            }
            /*float: left;*/
          }
        }
      }
      /* gridtable */
          table.detail-top {
              font-family: verdana,arial,sans-serif;
               font-size:11px;
               color:#333333;
               border-width: 1px;
               border-color: #666666;
               border-collapse: collapse;
           }
           table.detail-top th {
               border-width: 1px;
               padding: 8px;
               border-style: solid;
               border-color: #666666;
               background-color: rgb(254,254,250);
           }
           table.detail-top td {
               border-width: 1px;
               padding: 8px;
               border-style: solid;
               border-color: #666666;
               background-color: #ffffff;
           }

    }
  }

</style>
