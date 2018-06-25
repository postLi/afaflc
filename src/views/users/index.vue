<template>
  <div class="shipper">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!-- 全部 -->
      <el-tab-pane label="全部" name="first">
				 <ShipperAll></ShipperAll>
			</el-tab-pane>

      <!-- 未认证 -->
    <el-tab-pane label="未认证" name="second">
      <ShipperUnauthorized></ShipperUnauthorized>
    </el-tab-pane>

    <!-- 待认证 -->
    <el-tab-pane label="待认证" name="third">
      <ShipperCertified></ShipperCertified>
    </el-tab-pane>

        <!-- 审核部分 -->
        <!-- <el-tab-pane label="待审核" name="second">
            <div class="shipper_searchinfo">
                <label>手机号码：
                    <el-input
                      placeholder="请输入内容"
                      v-model="formInline.phone"
                      clearable>
                    </el-input>
                </label>
                <label>公司名称：
                    <el-input
                      placeholder="请输入内容"
                      v-model="formInline.company"
                      clearable>
                    </el-input>
                </label>
                <label>联系人姓名：
                    <el-input
                      placeholder="请输入内容"
                      v-model="formInline.contacts"
                      clearable>
                    </el-input>
                </label>
                <label>所在地：
                    <el-cascader
                      :options="options1"
                      v-model="formInline.selectedOptions1"
                      @change="handleChange">
                    </el-cascader>
                </label>
                <el-button type="info" plain @click="getdata_search">查询</el-button>
                <el-button type="info" plain @click="getdata_clear">清空</el-button>
            </div>
            <div class="export">
                <el-button type="primary" @click="addClassfy">新增</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    stripe
                    border
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                      prop="id"
                      label="序号">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="公司名称">
                    </el-table-column>
                    <el-table-column
                      prop="side"
                      label="联系人">
                    </el-table-column>
                    <el-table-column
                      prop="bumen"
                      label="手机号"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="zhiwu"
                      label="提交认证时间">
                    </el-table-column>
                    <el-table-column
                      prop="load"
                      label="等待时长">
                    </el-table-column>
                    <el-table-column
                      prop="quanxian"
                      label="长发货物">
                    </el-table-column>
                    <el-table-column
                      prop="sex"
                      label="所在地">
                    </el-table-column>
                    <el-table-column
                      prop="phone"
                      label="货主类型"
                      >
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                          <el-button
                                @click="dialogFormVisible = true">审核</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                    
                <el-pagination
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage4"
                       :page-sizes="[100, 200, 300, 400]"
                       :page-size="100"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="400">
                </el-pagination>
            </div> 
        </el-tab-pane> -->

        <!-- 未提交认证部分 -->
        <!-- <el-tab-pane label="未提交认证" name="third">
            <div class="shipper_searchinfo">
                <label>手机号码：
                    <el-input
                      placeholder="请输入内容"
                      v-model="formInline.phone"
                      clearable>
                    </el-input>
                </label>
                <label>所在地：
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </label>
                <el-button type="info" plain>查询</el-button>
                <el-button type="info" plain>清空</el-button>
            </div>
            <div class="export">
                <el-button type="info">导出</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData4"
                    stripe
                    border
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                      prop="id"
                      label="序号">
                    </el-table-column>
                    <el-table-column
                      prop="phone"
                      label="手机号"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="所在地">
                    </el-table-column>
                    <el-table-column
                      prop="registertime"
                      label="注册时间"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="registertime"
                      label="已注册时间">
                    </el-table-column>
                    <el-table-column
                      prop="load"
                      label="最近跟进人">
                    </el-table-column>
                    <el-table-column
                      prop="loadtime"
                      label="最近跟进时间">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="300">
                      <template slot-scope="scope">
                            <el-button
                                @click="dialogFormVisible_follow = true">跟进登记</el-button>
                            <el-button
                                @click="dialogFormVisible_uncommitted = true">代客提交认证</el-button>
                      </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage4"
                       :page-sizes="[100, 200, 300, 400]"
                       :page-size="100"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="400">
                </el-pagination>
            </div>
        </el-tab-pane> -->
        
    <!-- 已认证部分 -->
    <el-tab-pane label="已认证" name="fourth">
      <ShipperHasCertified></ShipperHasCertified>
    </el-tab-pane>

    <!-- 认证不通过 -->
    <el-tab-pane label="认证不通过" name="fifth">
      <ShipperDisqualification></ShipperDisqualification>
    </el-tab-pane>

    <!-- 冻结部分 -->
    <!-- <el-tab-pane label="冻结中" name="six">
      <ShipperFreezing></ShipperFreezing>
    </el-tab-pane> -->

    <!-- 黑名单部分 -->
    <!-- <el-tab-pane label="黑名单" name="seven">
      <ShipperBlacklist></ShipperBlacklist>
    </el-tab-pane> -->

    </el-tabs>

    
  </div>
</template>


<script type="text/javascript">
import '@/styles/dialog.scss'
    import ShipperAll from './components/ShipperAll.vue'
    import ShipperUnauthorized from './components/ShipperUnauthorized.vue' 
    import ShipperCertified from './components/ShipperCertified.vue'
    import ShipperHasCertified from './components/ShipperHasCertified.vue'
    import ShipperDisqualification from './components/ShipperDisqualification.vue'
    import ShipperFreezing from './components/ShipperFreezing.vue'
    import ShipperBlacklist from './components/ShipperBlacklist.vue'
    
    export default {
      name:'shipper',
      components:{
          ShipperAll,
          ShipperUnauthorized,
          ShipperCertified,
          ShipperHasCertified,
          ShipperDisqualification,
          ShipperFreezing,
          ShipperBlacklist
        },
        data() {
          return {
            options2:null,
            options:[],
            fileList1: [
                {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
           fileList2: [
                {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
           
           fileList3: [
                {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],radio1:'上传合格',
            
            fileList4: [
                {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],radio2:'3',
            radio3:'3',
            currentPage4: 4,
            tableData3:[
            {
                id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            }
            ],
            tableData4:[
            {
                id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            }
            ],
            tableData5:[
            {
                id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            }
            ],
            activeName2: 'first',
            formInline: {
                phone:'',
                company:'',
                contacts:'',
                region:''
            },
            followform:{
                textarea:'',
            },
            
            dialogFormVisible: false,
            dialogFormVisible_uncommitted:false,
            dialogFormVisible_follow:false,
            dialogFormVisible_prove:false,
            dialogFormVisible_add:false, //待审核-新增

            options:[{
              value: '选项1',
              label: '企业货主'
              },
              {
              value: '选项2',
              label: '普通货主'
            }],

            shengheform: {
                phone: '',
                companyname: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '150px',
            shengherules: {
              phone: [
                { required: true, message: '请输入手机号码', trigger: 'blur' },
              ],
              linkman: [
                { required: true, message: '联系人不可为空', trigger: 'change' }
              ],
              address: [
                { required: true, message: '地址不可为空', trigger: 'change' }
              ],
              xsaddress: [
                {  required: true, message: '请选择时间', trigger: 'change' }
              ],
              hzclassify: [
                {  required: true, message: '请至少选择一个活动性质', trigger: 'change' }
              ],
              resource: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
              ],
              desc: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
              ]
            }
          };
        },
        
        methods: {
            handleChange(value){
              console.log(value);
            },
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            handleCheck(index, row) {
                console.log(index, row);
            },
            handleRZ(index, row) {
                console.log(index, row);
            },
            handleGJRZ(index, row) {
                console.log(index, row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            change(){
                console.log(this.radio1)
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    .completeinfo{
      .detailinfo{
        margin-left: 26px;
        p{
            width:160px;
            height: 40px;
            line-height: 40px;
            text-align: left;
            display: inline-block;
            vertical-align: top;
            span{
                color:red;
            }
        }
        .upload-demo{
          display: inline-block ;
        }
      }
    }
    .shipper{
        height:100%;
        .shipper_searchinfo{
            padding:0 30px 15px 30px;
            border-bottom:1px solid #ccc;
            label{
                margin-right:50px;
                .el-input{
                    width:230px;
                }
            }
        }
        .export{
            padding:10px 30px;
            .el-button{

            }
        }
        .info_news{
            padding:10px 30px;
            .el-table{
                table{
                    width: 100% !important;
                    th,td{
                        text-align:center;
                    }
                }
            }
        }
        .el-pagination{
            margin-top:20px;
            text-align:right;
        }
        .commoncss{
            .el-dialog{
                margin-top: 10vh !important;
                max-height:80%;
                overflow:auto;
                .el-dialog__header{
                    border-bottom:1px solid #ccc;
                    text-align:center;
                    background:#ddd;
                    font-weight:bold;
                }
                .el-input{
                    width:300px;
                }
                .el-dialog__body{
                    padding: 30px 0;
                    .el-form{
                        .el-form-item{
                            display:inline-block;
                            .el-input{

                            }
                            
                        }
                    }
                }
                .dialog-footer{
                    text-align:center;
                }
            }
            .data_pic{
                padding-left:20px;
                text-align:center;
                .data_pic_c{
                    display:inline-block;
                    width:300px;
                    .el-radio-group{
                        text-align:left;
                        .el-radio{
                            margin:10px 0;
                        }
                    }
                }
            }
            .shipper_information{
                h2{
                    margin:20px 50px;
                    padding:10px 0; 
                    border-bottom:1px solid #ccc;
                }
            }
        }
        .uncommitted{
            .data_pic{
                .el-form-item{
                    display:block !important;
                }
                .el-form-item__label{
                    float:left;
                }
                .el-form-item__content{
                    float:left;
                    margin-left: 0 !important;
                    .upload-demo{
                        overflow:hidden;
                        .el-upload{
                            float:right;
                            margin:0 20px;
                        }
                        .el-upload-list {
                            float:right;
                        }
                    }
                }
            }
        }
        .follow{
            .textarea_info{
                display:block !important;
                margin-right:55px;
            }
            
        }
    }


</style>