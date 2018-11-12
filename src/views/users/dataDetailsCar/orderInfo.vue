<template>
    <div class="ordersInfo detailsArrange" v-loading="loading">
        <!-- 信息概要 -->
        <div class="xxgy-collapse collapseInfo">
            <h2>信息概要</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">总抢单数：</el-col>
                    <el-col :span="3">{{orderPriceInfo.grabTotal ? orderPriceInfo.grabTotal : '0'}}</el-col>
                    <el-col :span="3">总中单数：</el-col>
                    <el-col :span="3">{{orderPriceInfo.singularTotal ? orderPriceInfo.singularTotal :'0'}}</el-col>
                    <el-col :span="3">订单交易总额：</el-col>
                    <el-col :span="3">{{orderPriceInfo.orderTransTotal ? orderPriceInfo.orderTransTotal : '0'}}</el-col>
                    <el-col :span="3">取消订单：</el-col>
                    <el-col :span="3">{{orderPriceInfo.cancelOrder ? orderPriceInfo.cancelOrder : '0'}}</el-col>

                    <!-- 第二行 -->
                    <el-col :span="3">同城订单数：</el-col>
                    <el-col :span="3">{{orderPriceInfo.sameCityOrderNum ? orderPriceInfo.sameCityOrderNum : '0'}}</el-col>
                    <el-col :span="3">城际订单数：</el-col>
                    <el-col :span="3">{{orderPriceInfo.interCityOrderNum ? orderPriceInfo.interCityOrderNum : '0'}}</el-col>
                    <el-col :span="3">零担订单数：</el-col>
                    <el-col :span="9">{{orderPriceInfo.ltlOrderNum ? orderPriceInfo.ltlOrderNum : '0'}}</el-col>
                </el-row>
            </div>
        </div>
        <!-- 抢单信息 -->
        <div class="qd-collapse collapseInfo">
            <h2>抢单信息</h2>
            <div class="qd-collapse_title clearfix">
                <ul class="classfyTitle fl">
                   <li v-for="(item,index) in grapListDataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,'grap',item.label)">{{item.name}}</li>
                </ul>
                <searchInfo  searchType = "grap" @change = "getSearchParam"/>
            </div>
            <div class="authority_legal">
                <ul class="lengandInfo">
                    <li>抢单数量：<span>{{grapListData.grabTotal ? grapListData.grabTotal : '0'}}</span></li>
                    <li>中单数量：<span>{{grapListData.singularTotal ? grapListData.singularTotal : '0'}}</span></li>
                    <li>小货车：<span>{{grapListData.grabsameCityOrderNum ? grapListData.grabsameCityOrderNum : '0'}}</span></li>
                    <li>大货车：<span>{{grapListData.grabinterCityOrderNum ? grapListData.grabinterCityOrderNum : '0'}}</span></li>
                    <li>发物流：<span>{{grapListData.grabltlOrderNum ? grapListData.grabltlOrderNum : '0'}}</span></li>
                </ul>
            </div>
            <div class="essentialInformation_table" style="padding-top:0;">
                <el-table
                    :data="grapListData.aflcOrderGrabListDtoList"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="80">
                        <template slot-scope="scope">
                            {{ (grapListObj.currentPage - 1) * grapListObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="shipperName"
                    label="货主姓名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="shipperMobile"
                    label="货主账号"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="publishTime"
                    width="160"
                    label="发布时间">
                    </el-table-column>
                    <el-table-column
                    width="160"
                    prop="grabSingleTime"
                    label="抢单时间">
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="grabSpeed"
                    label="抢入速度">
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="driverDistance"
                    label="距离提货地(米)">
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="isCollectDriver"
                    label="是否收藏司机">
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="isDirectDriver"
                    label="是否定向司机">
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="serviceType"
                    label="服务类型">
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="isDriverSingle"
                    label="是否已有司机中单">
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="isGrab"
                    label="是否中单">
                    </el-table-column>
                    <el-table-column
                    width="160"
                    prop="singleTime"
                    label="中单时间">
                    </el-table-column>
                    <el-table-column
                    width="200"
                    :show-overflow-tooltip="true"
                    prop="startAddress"
                    label="始发地">
                    </el-table-column>
                    <el-table-column
                    width="200"
                    :show-overflow-tooltip="true"
                    prop="endAddress"
                    label="目的地">
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeGrap"
                    layout="total, prev, pager, next, jumper"
                    :total="grapListTotalCount">
                </el-pagination>
            </div>
        </div>

          <!-- 交易订单 -->
        <div class="qd-collapse collapseInfo">
            <h2>交易订单</h2>
            <div class="qd-collapse_title clearfix">
                <ul class="classfyTitle fl">
                   <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index)">{{item.name}}</li>
                </ul>
                <searchInfo searchType = "transaction"/>
            </div>
            <div class="authority_legal">
                <ul class="lengandInfo">
                    <li>交易订单数：<span>135</span></li>
                    <li>订单金额：<span>33</span></li>
                    <li>同城：<span>150</span></li>
                    <li>同城交易：<span>150</span></li>
                    <li>城际：<span>150</span></li>
                    <li>城际交易：<span>150</span></li>
                    <li>零担：<span>150</span></li>
                    <li>零担交易：<span>150</span></li>
                </ul>
            </div>
            <div class="essentialInformation_table" style="padding-top:0;">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="序号"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="订单号">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="货主名称">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="货主账号">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="承运时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="服务类型">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="货物名称">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="始发地">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="目的地">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="联系人">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="联系人电话">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="付款方式">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="付款状态">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="交易时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="订单金额">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="订单状态">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="完成时间">
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>

         <!-- 取消订单 -->
        <div class="qd-collapse collapseInfo">
            <h2>取消订单</h2>
            <div class="qd-collapse_title clearfix">
                <ul class="classfyTitle fl">
                   <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index)">{{item.name}}</li>
                </ul>
                <searchInfo />
            </div>
            <div class="authority_legal">
                <ul class="lengandInfo">
                    <li>取消订单：<span>135</span></li>
                    <li>同城：<span>150</span></li>
                    <li>城际：<span>150</span></li>
                    <li>零担：<span>150</span></li>
                </ul>
            </div>
            <div class="essentialInformation_table" style="padding-top:0;">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="序号"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="订单号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="货主名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="货主账号">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="服务类型">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="中单时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="取消时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="始发地">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="目的地">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="取消原因">
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="total,prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination> 
            </div>
        </div>

    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
// import Pager from '@/components/Pagination/index'
import searchInfo from './components/searchInfo'
import { orderPriceInfo,grapList } from '@/api/users/carDetails/index.js'

export default {
  name: 'ordersInfo',
  components: { 
    //   Pager
    searchInfo,
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }
  }, 
  data() {
    return {
        btnsize:'mini',
        size:[20,30,50],
        orderPriceInfo:{},//订单信息概要
        grapListObj:{//订单抢单记录表查询条件
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "driverId": "",
                "grabSingleTimeEnd": "",
                "grabSingleTimeStart": "",
                "shipperName": "",
                "timeDay": "",
            }
        },
        grapListData:{},//订单抢单记录表数据
        grapListTotalCount:0,//订单抢单记录表初始数量
        dataType:[
            {name:'全部',label:'',iscur:true},
            {name:'近7天',label:'-7',iscur:false},
            {name:'近30天',label:'-30',iscur:false},
            {name:'近90天',label:'-90',iscur:false},
        ],
        grapListDataType:[
            {name:'全部',label:'',iscur:true},
            {name:'近7天',label:'-7',iscur:false},
            {name:'近30天',label:'-30',iscur:false},
            {name:'近90天',label:'-90',iscur:false},
        ],
        page:1,
        pagesize:20,
        totalCount:100,
        loading: false,
        dialogVisible: false,
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
        }],
      }
  },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.init()
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        },
    },
     mounted() {
        // console.log(this.$route)
    },
    methods: {
        init() {
            let driverId = this.$route.query.driverId;
            this.grapListObj.vo.driverId = driverId;
            this.PriceInfo(driverId);
            this.GrapList();
        },
        //订单信息概要
        PriceInfo(driverId){
            orderPriceInfo(driverId).then(res => {
                this.orderPriceInfo = res.data;
            })
        },
        //订单抢单列表
        GrapList(){
            grapList(this.grapListObj).then(res => {
                this.grapListData = res.data.list[0];
                this.grapListTotalCount = res.data.totalCount;
            })
        },
        handleCurrentChangeGrap(val){
            this.grapListObj.currentPage = val;
            this.GrapList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        setCur(index,classfy,label){
            switch(classfy){
                case 'grap':
                    this.grapListDataType.forEach((el,idx)=>{
                        idx == index ? el.iscur = true : el.iscur = false;
                    })
                    this.grapListObj.vo.timeDay = label;
                    this.GrapList();
                    break;
                case '':
                    break;
            }
            // console.log(index)
            // this.dataType.forEach((el,idx)=>{
            //     console.log(idx)
            //     idx == index ? el.iscur = true : el.iscur = false;
            // })
        },
        getSearchParam(obj,searchType) {
            console.log(obj,searchType)
            switch(searchType){
                case 'grap':
                    this.grapListObj.vo = Object.assign({},this.grapListObj.vo, obj)
                    console.log(this.grapListObj.vo)
                    this.GrapList();
                    break;
                case '':
                    break;
            }
            // this.searchInfo = Object.assign(this.searchInfo, obj)
            // this.loading = false;
            // if(this.page!= 1){
            //     this.page = 1;
            //     this.$refs.pager.inputval = this.page;
            // }
            // this.firstblood()
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ordersInfo{
        .collapseInfo{
            .qd-collapse_title{
                padding: 10px 0;
            }
           
        }
    }
</style>
