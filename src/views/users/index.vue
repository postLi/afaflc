<template>
  <div class="shipper">
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
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
        position: relative;
        .shipper_searchinfo{
            position: absolute;
            left:0;
            top:0;
            padding:15px 16px;
            border-bottom:2px dashed #ccc;
            height:70px;
            width:100%;
            line-height: 35px;
            .el-form-item{
                .el-form-item__content{
                    .el-input{
                        .el-input__inner{
                            color:#3e9ff1;
                            height:30px;
                            line-height: 30px;
                        }
                    }
                    .el-button{
                        padding:8px 20px;
                    }
                }
            }
        }
        .classify_info{
            height:100%;
            padding:90px 13px 0 0;
            .btns_box{
                margin-bottom:10px;
                .el-button{
                    margin-right:20px;
                    padding:10px 20px;
                }
            }
            .info_news{
                height:90%;
            }
            .el-pagination{
                margin-top:13px;
                text-align:right;
            }
        }

        .el-table{
            th,td{
                text-align: center;
            }
        }
    }


</style>