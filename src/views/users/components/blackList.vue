<template>
    <div>
        <div class="shipper_searchinfo">
            <el-form inline>
            <el-form-item label="所在地：">
                <GetCityList v-model="formInline.belongCity" ref="area"></GetCityList>
            </el-form-item>
            <el-form-item label="车牌号：">
                <el-input placeholder="请输入内容" v-model.trim="formInline.carNumber" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input placeholder="请输入内容" v-model.trim="formInline.driverMobile" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="getdata_search">查询</el-button>
                <el-button type="info" plain>清空</el-button>
            </el-form-item>
        </el-form>
        </div>
        <div class="export">
            <!-- <el-button type="info">新增</el-button> -->
            <el-button type="primary" plain @click="handleRemoveBlack">移出黑名单</el-button>
        </div>
        <div class="info_news">
            <el-table
                ref="multipleTable"
                :data="tableDataTree"
                stripe
                border
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="80">
                </el-table-column>
                    <el-table-column
                    prop="carNumber"
                    label="车牌号">
                </el-table-column>
                <el-table-column
                    prop="driverMobile"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    prop="driverName"
                    label="车主"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="belongCity"
                    label="所在地">
                </el-table-column>
                <el-table-column
                    prop="putBlackTime"
                    label="移入黑名单时间">
                </el-table-column>
                <el-table-column
                    prop="putBlackCause"
                    label="移入原因">
                </el-table-column>
                <!-- <el-table-column
                    prop=""
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" plain>移出黑名单</el-button>
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

        <!-- 弹框提示语 -->
        <div class="cue">
          <el-dialog
          :visible.sync="centerDialogVisible"
          center>
          <span>{{information}}</span>
          </el-dialog>
        </div>

        <!-- 移出黑名单弹框 -->
        <div class="addclassify commoncss">
            <el-dialog title="移出黑名单" :visible.sync="driverBlackDialogFlag">
                <el-form :model="formBlack" ref="formBlack">
                <el-row>
                    <el-col :span="12">
                    <el-form-item label="手机号码" :label-width="formLabelWidth">
                        <el-input v-model="formBlack.driverMobile" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="formBlack.driverName" disabled></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row>
                <el-col :span="12">
                    <el-form-item label="身份证号码" :label-width="formLabelWidth">
                        <el-input v-model="formBlack.Idcard" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所在城市" :label-width="formLabelWidth">
                    <!-- <el-cascader
                        :options="options"
                        v-model="formFroze.belongCity"
                        @change="handleChange">
                    </el-cascader> -->
                    <GetCityList v-model="formBlack.belongCity" disabled ref="area"></GetCityList>
                    </el-form-item>
                </el-col>
                </el-row>

                <el-row>
                <el-col :span="12">
                    <el-form-item label="车牌号" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.address" disabled :maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车型" :label-width="formLabelWidth">
                    <!-- <el-cascader
                        :options="options"
                        v-model="formFroze.shipperType"
                        @change="handleChange">
                    </el-cascader> -->
                    <el-select v-model="formBlack.shipperType" disabled placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                    </el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="车型" :label-width="formLabelWidth">
                            <el-input v-model="formBlack.shipperType"></el-input>
                        </el-form-item>
                    </el-col>
                <el-col :span="12">
                    <el-form-item label="注册来源" :label-width="formLabelWidth">
                        <el-input v-model="formBlack.registerOrigin" disabled :maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <div class="shipper_information">
                    <h2>移入黑名单信息</h2>
                    <el-row>
                    <el-col :span="24">
                        <el-form-item label="移入原因:" :label-width="formLabelWidth">
                        <el-select v-model="formBlack.putBlackCause" disabled placeholder="请选择">
                            <el-option
                            v-for="item in optionsFormBlack"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="24">
                        <el-form-item label="移入黑名单原因说明:" :label-width="formLabelWidth">
                        <el-input v-model="formBlack.putBlackCauseRemark" disabled :rows="2" :maxlength="100" placeholder="请输入内容" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                </div>
                <div class="shipper_information">
                    <h2>移出黑名单信息</h2>
                    <el-form-item label="移出黑名单原因说明" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.popBlackRemark" :maxlength="100" :rows="2" placeholder="请输入内容" type="textarea"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit">确 定</el-button>
                <el-button @click="driverBlackDialogFlag = false">取 消</el-button>
            </div>
            </el-dialog>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status} from '../../../api/users/carowner/total_carowner.js'
    import GetCityList from '@/components/GetCityList'
    export default {
        components:{
            GetCityList
        },
        data(){
            return{
                options:[],// 车型下拉列表
                optionsFormBlack:[],// 移入原因下拉列表
                page:1,//当前页
                pagesize:20,//每页显示数
                totalCount:null,//总记录数
                formInline: {//查询条件
                    driverMobile:'',
                    belongCity:'',
                    driverStatus:'AF0010406',
                    carNumber:''
                },
                tableDataTree:[],//定义列表记录
                optionsService:[//状态
                     {
                    code:null,
                    name:'全部'
                    }
                ],
                formLabelWidth:'120',
                centerDialogVisible:false,// 弹框提示语控制
                information:'', // 提示语内容,
                driverBlackDialogFlag:false,//移出黑名单弹框控制
                multipleSelection:[],
                formBlack:{ //移出黑名单表单
                    driverMobile:'',
                    driverName:'',
                    shipperType:'',
                    registerOrigin:'',//注册来源
                    putBlackCause:'',
                    putBlackCauseRemark:'',
                    popBlackRemark:'',
                }
            }
        },
        mounted(){
            this.firstblood()
            this.getMoreInformation()
        },  
        methods:{
            // 判断选中与否
            handleSelectionChange(val){
                this.multipleSelection = val;
                if(val[0]){
                    this.formBlack=val[0]
                } else{
                    this.formBlack={}
                }
            },

            //移出黑名单功能
            handleRemoveBlack(){
                // console.log('移出黑名单功能')
                if(this.multipleSelection.length == 0){
                    //未选择任何修改内容的提示
                    let information = "未选中任何修改内容";
                    this.hint(information);
                }else if(this.multipleSelection.length >1){
                    let information = "不可修改多个内容";
                    this.hint(information);
                } else{
                   this.driverBlackDialogFlag=true
                }
            },

            //刷新页面
            firstblood(){
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                })
            },

            //点击查询按纽，按条件查询列表
            getdata_search(event){
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.dataTotal = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                })
            },

            //获取车主状态列表
            getMoreInformation(){
                data_get_driver_status().then(res=>{
                    res.data.map((item)=>{
                        this.optionsService.push(item);
                    })
                })
            },
            
             //每页显示数据量变更
            handleSizeChange(val) {
                this.pagesize = val;
                this.firstblood()
            },

            //页码变更
            handleCurrentChange(val) {
                this.page = val;
                this.firstblood()
            },
            hint(val){
                this.information = val;
                this.centerDialogVisible = true;
                let timer = setTimeout(()=>{
                    this.centerDialogVisible = false;
                    clearTimeout(timer)
                },2000)
            },
            // 移出黑名单- 提交
            onSubmit(){
                this.$refs['formBlack'].validate((valid)=>{
                    if(valid){
                        this.formBlack.belongCity = this.$refs.area.selectedOptions.pop();
                        var forms= Object.assign({}, this.formBlack)
                        // data_get_shipper_change(forms).then(res=>{
                        //     // console.log(res)
                        //     this.$message.success('移出黑名单成功')
                        //     this.driverBlackDialogFlag = false;
                        //     this.firstblood();
                        // }).catch(err=>{
                        //     console.log(err)
                        // })
                    }
                })
            }
        }
        
    }
</script>