<template>
    <div>
        <div class="shipper_searchinfo">
           <label>所在地：
             <el-cascader
                :options="options"
                v-model="formAll.belongCity"
                @change="handleChange">
              </el-cascader>
           </label>
           <label>状态：
             <el-select v-model="formAll.attestationStatus" placeholder="请选择">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
           </label>
           <label>公司名称:
             <el-input v-model="formAll.companyName"></el-input>
           </label>
           <label>手机号码：
             <el-input v-model="formAll.mobile"></el-input>
           </label>
           <el-button type="primary" plain @click="getdata_search">查询</el-button>
           <el-button type="info" plain @click="clearSearch">清空</el-button>
         </div>
         <div class="export">
            <!-- <el-button type="primary" @click="addClassfy">新增</el-button> -->
            <createdDialog btntext="新增" btnType="primary" editType="add" btntitle="新增货主" @getData="getDataList"></createdDialog>
         </div>
         <div class="info_news">
           <el-table
           ref="mutipleTable"
           :data="tableDataAll"
           stripe
           border
           tooltip-effect="dark"
           style="width: 100%">
           <el-table-column type='index' label="序号">
           </el-table-column>  
           <el-table-column label="手机号">
             <template slot-scope="scope">
                <!-- <div @click="handleClick(scope.row)">{{scope.row.mobile}}</div> -->
                <createdDialog :params="scope.row" btntype="text" :btntext="scope.row.mobile" editType="view" btntitle="货主详情" @getData="getDataList"></createdDialog>
              </template>
           </el-table-column>
           <el-table-column prop="companyName" label="公司名称">
           </el-table-column>
           <el-table-column prop="contacts" label="联系人">
           </el-table-column>
           <el-table-column prop="registerOrigin" label="注册来源">
           </el-table-column>
           <el-table-column prop="attestationStatus" label="状态">
           </el-table-column>
           <el-table-column prop="belongCity" label="所在地">
           </el-table-column>
           <el-table-column prop="shipperType" label="货主类型">
           </el-table-column>
           <el-table-column prop="createTime" label="注册日期">
           </el-table-column>
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


           <!-- 修改 -->
           <!-- <div class="changeclassify commoncss">
             <el-dialog title="修改" :visible.sync="changeDialogflag">

             </el-dialog>
           </div> -->
        </div>
    </div>
</template>

<script>
import {data_get_shipper_list,data_get_shipper_status} from '../../../api/users/shipper/all_shipper.js'
import createdDialog from './createdDialog.vue'
export default {
    components:{
      createdDialog
    },
    data(){
        return{
            options:[],
            optionsStatus:[
              {
              code:null,
              name:'全部'
              }
            ],
            // changeDialogflag: false, // 修改弹框显示控制
            formAll:{
              belongCity: null,
              attestationStatus:null,
              companyname:'',
              mobile:''
            },
            page:1,
            pagesize:20,
            totalCount:null,
            tableDataAll:[],
        }
    },
    mounted(){
      this.firstblood()
      this.getMoreInformation()
    },
    methods:{
      //刷新页面
      firstblood(){
        data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
          console.log(res)
          this.totalCount = res.data.totalCount;
          this.tableDataAll = res.data.list;
        })
      },
      //获取状态列表
      getMoreInformation(){
          data_get_shipper_status().then(res=>{
              res.data.map((item)=>{
                this.optionsStatus.push(item);
              })
          })
      },
       //点击查询按纽，按条件查询列表
      getdata_search(event){
          data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
            this.totalCount = res.data.totalCount;
            this.tableDataAll = res.data.list;
          })
      },
      
      //清空
      clearSearch(){
        this.formAll = {
          belongCity:null,
          mobile:'',
          companyName:''
        }
      },
      handleChange(value){
        console.log(value)
      },
      handleClick (row) {
        console.log('row:',row)
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
      getDataList(){
        this.firstblood()
      }
    }
}
</script>
<style>

</style>


