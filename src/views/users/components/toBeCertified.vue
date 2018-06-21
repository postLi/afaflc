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
            <!-- <label>所在地：
                <el-input
                    placeholder="请输入内容"
                    v-model="formInline.belongCity"
                    clearable>
                </el-input>
            </label>
            <label>车牌号：
                <el-input
                    placeholder="请输入内容"
                    v-model="formInline.carNumber"
                    clearable>
                </el-input>
            </label>
            <label>手机号：
                <el-input
                    placeholder="请输入内容"
                    v-model="formInline.driverMobile"
                    clearable>
                </el-input>
            </label>
            <el-button type="primary" plain @click="getdata_search">查询</el-button>
            <el-button type="info" plain>清空</el-button> -->
        </div>
        <div class="export">
            <!-- <el-button type="info">新增</el-button> -->
            <el-button type="primary" plain @click="handleAudit">认证审核</el-button>
        </div>
        <div class="info_news">
            <el-table
                ref="multipleTable"
                :data="tableDataTree"
                stripe
                border
                @selection-change="handleSelectionChange"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column type="selection"  width="80"> </el-table-column>
                <el-table-column prop="carNumber" label="车牌号"></el-table-column>
                <el-table-column prop="driverMobile" label="手机号"></el-table-column>
                <el-table-column  prop="driverName" label="车主" width="200"></el-table-column>
                <el-table-column prop="belongCity" label="所在地"></el-table-column>
                <el-table-column  prop="authenticationTime" label="提交认证时间"></el-table-column>
                <el-table-column  prop="waitTime"  label="等待时长"></el-table-column>
                <el-table-column  prop="driverStatus" label="操作"></el-table-column>
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

        <!-- 认证审核 -->
        <div class="shenghe commoncss">
        <el-dialog title="认证审核" :visible.sync="formAuidDialogFlag">
          <el-form :model="templateModel" ref="shengheform">
             <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号：" :label-width="formLabelWidth">
                        <el-input v-model="templateModel.driverMobile"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车主：" :label-width="formLabelWidth">
                        <el-input v-model="templateModel.driverName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="身份证号码：" :label-width="formLabelWidth">
                        <el-input v-model="templateModel.driverMobile"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所在地：" :label-width="formLabelWidth">
                        <GetCityList v-model="templateModel.belongCity" ref="area"></GetCityList>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="车牌号：" :label-width="formLabelWidth">
                        <el-input v-model="templateModel.driverMobile"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车型：" :label-width="formLabelWidth">
                        <el-select v-model="templateModel.carType" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="车长(米)：" :label-width="formLabelWidth">
                      <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车辆规格："  :label-width="formLabelWidth">
                        <el-select v-model="templateModel.carType" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="提交认证时间" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="templateModel.authenticationTime"
                    type="datetime"
                    placeholder="选择日期"
                    disabled>
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="等待时长:" :label-width="formLabelWidth">
                  <!-- <el-input auto-complete="off"></el-input> -->
                  {{templateModel.authenticationTime? formatTime((+new Date(templateModel.authenticationTime))) : '' }}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="注册来源" :label-width="formLabelWidth">
                  <el-input v-model="templateModel.registerOrigin" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
 
            <div class="data_pic">
                <div class="data_pic_yyzz data_pic_c">
                    <el-form-item>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.businessLicenceFile" />
                    </el-form-item>
                    <h2>车辆45°</h2>
                    <el-form-item prop="radio1">
                      <el-radio-group v-model="radio1" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item> 
                </div>
                <div class="data_pic_company data_pic_c">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.businessLicenceFile" />
                    <h2>行驾证</h2>
                    <el-form-item prop="radio2">
                      <el-radio-group v-model="radio2" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item>
                </div>
                <div class="data_pic_callingcode data_pic_c">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.businessLicenceFile" />
                    <h2>驾驶证</h2>
                    <el-form-item prop="radio3">
                      <el-radio-group v-model="radio3" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item>
                </div>
                <div class="data_pic_callingcode data_pic_c">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.businessLicenceFile" />
                    <h2>身份证</h2>
                    <el-form-item prop="radio3">
                      <el-radio-group v-model="radio4" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item>
                </div>
                <div class="data_pic_callingcode data_pic_c">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.businessLicenceFile" />
                    <h2>手持身份证</h2>
                    <el-form-item prop="radio3">
                      <el-radio-group v-model="radio5" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item>
                </div>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click="handlerPass">确认审核通过</el-button>
            <el-button @click="handlerOut">审核不通过</el-button>
            <el-button @click="formAuidDialogFlag = false">取 消</el-button>
          </div>
        </el-dialog>
     </div> 
     
    </div>
</template>
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status} from '../../../api/users/carowner/total_carowner.js'
    import Upload from '@/components/Upload/singleImage'
    import GetCityList from '@/components/GetCityList'
    export default {
        components:{
            Upload,
            GetCityList
        },
        data(){
            return{
                options:[], //车辆规格下拉列表
                page:1,//当前页
                pagesize:20,//每页显示数
                totalCount:null,//总记录数
                formInline: {//查询条件
                    driverMobile:'',
                    belongCity:'',
                    driverStatus:'AF0010402',
                    carNumber:''
                },
                tableDataTree:[],//定义列表记录
                optionsService:[//状态
                     {
                    code:null,
                    name:'全部'
                    }
                ],
                formLabelWidth:'130px',
                formAuidDialogFlag:false, // 认证审核弹框控制
                templateModel:{ // 认证审核表单
                    driverMobile:'',
                    driverName:'',
                    carType:'',
                    belongCity:'',
                    authenticationTime:'',
                    registerOrigin:'',
                    businessLicenceFile:''
                },
                radio1:'',
                radio2:'',
                radio3:'',
                radio4:'',
                radio5:'',
            }
        },
        mounted(){
            this.firstblood()
            this.getMoreInformation()
        },  
        methods:{
            // 判断选中值
            handleSelectionChange(val){
                this.multipleSelection=val
            },

            // 认证审核功能
            handleAudit(){
                console.log('认证审核功能')
                this.formAuidDialogFlag=true
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
                this.formInline.belongCity = this.$refs.area.selectedOptions.pop();
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
            handleSizeChange: function(val) {
                this.pagesize = val;
                this.firstblood()
            },

            //页码变更
            handleCurrentChange: function(val) {
                this.page = val;
                this.firstblood()
            },  
            // 图片质量拼接传给后台
            pictureTypeChange(){

            },

            // 审核通过
            handlerPass(){

            },
            // 审核不通过
            handlerOut(){

            }
        }
        
    }
</script>
<style lang="scss">
.carOwner .commoncss .data_pic .data_pic_c{
        display: inline-block;
    width:150px;
}

</style>
