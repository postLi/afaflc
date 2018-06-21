<template>
    <div>
        <div class="shipper_searchinfo">
            <el-form :inline="true">
                <el-form-item label="手机号：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.mobile" clearable></el-input>
                </el-form-item>
                <el-form-item label="公司名称：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.companyName" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系人姓名：">
                    <el-input placeholder="请输入内容" v-model.trim="formInline.contacts" clearable></el-input>
                </el-form-item>
                <el-form-item label="货主类型：">
                    <el-select v-model="formInline.shipperType" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" plain @click="getdata_search">查询</el-button>
                    <el-button type="info" plain @click="clearSearch">清空</el-button>
                </el-form-item>
            </el-form>
            <!-- <label>手机号码：
                <el-input
                    placeholder="请输入内容"
                    v-model.trim="formInline.mobile"
                    clearable>
                </el-input>
            </label>
            <label>公司名称：
                <el-input
                    placeholder="请输入内容"
                    v-model.trim="formInline.companyName"
                    clearable>
                </el-input>
            </label>
            <label>联系人姓名：
                <el-input
                    placeholder="请输入内容"
                    v-model.trim="formInline.contacts"
                    clearable>
                </el-input>
            </label>
            <label>货主类型：
                <el-select v-model="formInline.shipperType" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.code"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
            </label>
            <el-button type="primary" plain @click="getdata_search">查询</el-button>
           <el-button type="info" plain @click="clearSearch">清空</el-button> -->
        </div>
        <div class="export">
            <!-- <el-button type="info">新增</el-button> -->
            <createdDialog 
            btntext="修改"
            :plain="true"
            type="primary" 
            btntype="primary"
            icon="el-icon-news"
            editType="edit"
            btntitle="修改"
            :params="selectRowData"
            @getData="getDataList"></createdDialog>
            <!-- <el-button type="info">导出</el-button> -->
            <!-- <el-button type="primary" plain icon="el-icon-edit" @click="handleFroze">冻结</el-button> -->
            <!-- <FreezeDialog
              btntext="冻结"
              type="primary" 
              btntitle="冻结"
              :plain="true"
              editType='edit'
              btntype="primary"
              icon="el-icon-news"
              :params="selectRowData"
              @getData="getDataList"
            >
            </FreezeDialog>
            <shipperBlackDialog
              btntext="移入黑名单"
              type="primary" 
              btntitle="移入黑名单"
              :plain="true"
              editType='edit'
              btntype="primary"
              icon="el-icon-news"
              :params="selectRowData"
              @getData="getDataList"
            ></shipperBlackDialog> -->
             <!-- <el-button type="primary" plain icon="el-icon-edit" @click="handleBlack">移入黑名单</el-button> -->
        </div>
        <div class="info_news">
            <el-table
                ref="multipleTable"
                :data="tableData3"
                :key="thekey"
                stripe
                border
                @selection-change="handleSelectionChange"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="80px">
                </el-table-column>
                <el-table-column label="公司名称">
                    <template slot-scope="scope">
                      <createdDialog :params="scope.row" btntype="text" :btntext="scope.row.companyName" editType="view" btntitle="详情"></createdDialog>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="contacts"
                    label="联系人">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="手机号"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="registerOriginName"
                    label="注册来源">
                </el-table-column>
                <el-table-column
                    prop="belongCityName"
                    label="所在地">
                </el-table-column>
                <el-table-column
                    prop="shipperTypeName"
                    label="货主类型">
                    <template slot-scope="scope">
                        {{scope.row.shipperType==='AF0010202'? '企业货主':'普通货主'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="authPassTime"
                    label="认证通过日期">
                </el-table-column>
                <!-- <el-table-column
                    label="操作"
                    width="400">
                    <template slot-scope="scope">
                        <el-button type="text"
                            @click="dialogFormVisible_prove = true">详情</el-button>
                        <el-button type="text"
                            @click="dialogFormVisible = true">修改</el-button>
                        <el-button type="text"
                            @click="dialogFormVisible = true">冻结</el-button>
                        <el-button type="text"
                            @click="dialogFormVisible = true">移入黑名单</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
                
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20, 50, 200, 400]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import createdDialog from './createdDialog.vue'
// import FreezeDialog from './FreezeDialog.vue'
// import shipperBlackDialog from './shipperBlackDialog'
import {data_get_shipper_list,data_get_shipper_type} from '../../../api/users/shipper/all_shipper.js'
export default {
    components:{
      createdDialog
    //   FreezeDialog,
    //   shipperBlackDialog
    },
    data(){
        return {
            options:[],
            tableData3:[],
            thekey: '1',
            totalCount:null,
            page:1,
            pagesize:20,
            formInline:{
                mobile:'',
                companyName:'',
                contacts:'',
                shipperType:''
            },
            multipleSelection:[],
            selectRowData:{}
        }
    },
    mounted(){
      this.firstblood()
    },
    methods:{
        // // 冻结
        // handleFroze(){
        //     console.log(11111)
        // },
        // // 黑名单
        // handleBlack(){
        //     console.log(2222)
        // },

        // 选中值判断
        handleSelectionChange(val){
            this.multipleSelection = val;
            if(val[0]){
                this.selectRowData = val[0]
            } else {
                this.selectRowData = {}
            }
        },

        //获取货主类型
        getMoreInformation(){
            data_get_shipper_type().then(res=>{
                // console.log(res)
                res.data.map((item)=>{
                this.options.push(item)
                })
            })
        },
        //刷新页面
      firstblood(){
        data_get_shipper_list(this.page,this.pagesize,this.formInline).then(res=>{
          console.log(res)
          this.totalCount = res.data.totalCount;
          this.tableData3 = res.data.list;
        })
      },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize=val
        this.firstblood()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page=val
        this.firstblood()
      },
       //点击查询按纽，按条件查询列表
      getdata_search(event){
          data_get_shipper_list(this.page,this.pagesize,this.formInline).then(res=>{
            
            this.totalCount = res.data.totalCount;
            this.tableData3 = res.data.list;
            this.thekey = Math.random()
            console.log(this.tableData3,res)
          })
      },
      
      //清空
      clearSearch(){
        this.formInline = {
          belongCity:'',
          mobile:'',
          companyName:'',
          shipperType:''
        }
      },
      getDataList(){
        this.firstblood()
      }
    }
}
</script>
<style>
.shipper .shipper_searchinfo{
    padding: 0 0px 10px 20px;
    margin-right: 30px;
}
</style>


