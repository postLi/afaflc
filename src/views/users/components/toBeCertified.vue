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
                <el-button type="info" plain @click="clearSearch">清空</el-button>
            </el-form-item>
        </el-form>
        </div>
        <div class="classify_info">
                <div class="btns_box">
                        <el-button type="primary" plain @click="handleAudit">认证审核</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        highlight-current-row
                        current-row-key
                        @current-change="handleSelectionChange"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                        type="index"
                        label="序号"
                        width="80">
                        </el-table-column>
                        <el-table-column prop="carNumber" label="车牌号">
                        <template slot-scope="scope">
                        <driver-newTemplate         
                          btntype="text"           
                         :btntext="scope.row.carNumber"
                          editType="view"
                         :templateItem="scope.row"
                         btntitle="详情"
                         :updataflag="true"
                         >
                        </driver-newTemplate>
                              </template>

                        </el-table-column>
                        <el-table-column prop="driverMobile" label="手机号" >
                        </el-table-column>
                        <el-table-column  prop="driverName" label="车主" width="200"></el-table-column>
                        <el-table-column prop="belongCityName" label="所在地"></el-table-column>
                        <el-table-column  prop="authenticationTime" label="提交认证时间"></el-table-column>
                        <el-table-column  prop="waitTime"  label="等待时长"></el-table-column>
                        <!-- <el-table-column  prop="driverStatus" label="操作"></el-table-column> -->
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

        <!-- 认证审核 -->
        <div class="shenghe commoncss">
        <el-dialog title="认证审核" :visible.sync="formAuidDialogFlag">
          <el-form :model="templateModel" ref="shengheform">
             <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号：" :label-width="formLabelWidth">
                        <el-input v-model="templateModel.driverMobile" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车主：" :label-width="formLabelWidth">
                        <el-input v-model="templateModel.driverName" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="身份证号码：" :label-width="formLabelWidth">
                        <el-input v-model="templateModel.driverCardid"></el-input>
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
                        <el-input v-model="templateModel.carNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车型：" :label-width="formLabelWidth">
                        <el-select v-model="templateModel.carType" placeholder="请选择">
                            <el-option
                                v-for="item in optionscarType"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="车长(米)：" :label-width="formLabelWidth"  >
                      <el-input
                            class="lessWidth"
                            placeholder="长"
                            v-model="templateModel.carLength"
                            clearable
                            ref="lengths"
                            :maxlength="30"
                            :disabled="editType=='view'"
                            >
                        </el-input>
                        <el-input
                            class="lessWidth"
                            placeholder="宽"
                            v-model="templateModel.carWidth"
                            clearable
                            ref="widths"
                            :maxlength="30"
                            :disabled="editType=='view'"
                            >
                        </el-input>
                        <el-input
                            class="lessWidth"
                            placeholder="高"
                            v-model="templateModel.carHeight"
                            clearable
                            ref="heights"
                            :maxlength="30"
                            :disabled="editType=='view'"
                            >
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车辆规格："  :label-width="formLabelWidth">
                        <el-select v-model="templateModel.carSpec" placeholder="请选择">
                            <el-option
                                v-for="item in optionscarSpec"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
            </el-row>
              <el-row>
                  <el-col :span="12">
                      <el-form-item label="中单等级：" :label-width="formLabelWidth">
                            <el-select v-model="templateModel.obtainGrade" placeholder="请选择" >
                                <el-option
                                    v-for="item in optionsLevel"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="中单等级有效期至：" :label-width="formLabelWidth" >
                        <el-date-picker
                            v-model="templateModel.obtainGradeTime"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            >
                        </el-date-picker>
                    </el-form-item>
                  </el-col>
              </el-row>

              <el-row>
                  <el-col :span="12">
                    <el-form-item :label-width="formLabelWidth" label="特权车：">
                        <el-checkbox v-model="templateModel.isVipCar" true-label="1" false-label='0' @change='isVip' label="是" border size="medium" ></el-checkbox>
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
                 <div class="data_pic_default">
                    <img  :src= 'defaultImg1'/>
                </div>
            <div class="data_pic">
                <div class="data_pic_callingcode data_pic_c">
                <div class="uploadImgBox"><img  class="picURL" :src="templateModel.carFile ? templateModel.carFile : defaultImg" @click="changeIMG"/></div>
                    <!-- <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.carFile" /> -->
              
                    <h2>车辆45°</h2>
                    <el-form-item prop="radio1">
                      <el-radio-group v-model="radio1" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    </el-form-item> 
                </div>
                <div class="data_pic_callingcode data_pic_c">
              <div class="uploadImgBox"><img  class="picURL" :src="templateModel.drivingPermitFile ? templateModel.drivingPermitFile : defaultImg" @click="changeIMG"/></div>
                    <!-- <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.drivingPermitFile" /> -->
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
                 <div class="uploadImgBox"><img  class="picURL" :src="templateModel.drivingLicenceFile ? templateModel.drivingLicenceFile : defaultImg" @click="changeIMG"/></div>
                    <!-- <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.drivingLicenceFile" /> -->
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
                  <div class="uploadImgBox"><img  class="picURL" :src="templateModel.idCardFile ? templateModel.idCardFile : defaultImg" @click="changeIMG"/></div>
                    <!-- <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.idcardFile" /> -->

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
                  <div class="uploadImgBox"> <img  class="picURL" :src="templateModel.takeIdCardFile ? templateModel.takeIdCardFile : defaultImg" @click="changeIMG"/></div>
                    <!-- <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="templateModel.takeIdCardFile" /> -->
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
     <cue ref="cue"></cue>
    </div>
</template>
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status,data_post_audit,data_Get_carType,data_CarList,data_get_driver_obStatus} from '../../../api/users/carowner/total_carowner.js'
    import DriverNewTemplate from '../carowner/driver-newTemplate'
    import Upload from '@/components/Upload/singleImage'
    import cue from '../../../components/Message/cue'
    import { eventBus } from '@/eventBus'
    import { parseTime } from '@/utils/index.js'
    import GetCityList from '@/components/GetCityList'
    export default {
        props: {
            isvisible: {
                type: Boolean,
                default: false
            }
        },
        components:{
            Upload,
            GetCityList,
            cue,
            DriverNewTemplate
        },
        data(){
            return{
                pickerOptions:{
                disabledDate(time) {
                return time.getTime() < Date.now();
                }
                },
                defaultImg:'/static/test.jpg',//默认第一张图片的url
                defaultImg1:'',//默认第一张图片的url
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
                optionscarType:[
                    {
                    code:null,
                    name:'全部'
                    }
                ],
                optionscarSpec:[
                    {
                    code:null,
                    name:'全部'
                    }
                ],
                optionsLevel:[
                     {
                    code:null,
                    name:'全部'
                    }  
                ],
                formLabelWidth:'120px',
                formAuidDialogFlag:false, // 认证审核弹框控制
                templateModel:{ // 认证审核表单
                },
                radio1:'',
                radio2:'',
                radio3:'',
                radio4:'',
                radio5:'',
                multipleSelection:[],
                ifInformation:'未选中任何修改内容',
                ifInformation2:'不可修改多个内容',
            }
        },
        computed: {
            pictureValue () {
            return {'车辆45°':this.radio1 ,'行驾证': this.radio2,'驾驶证':this.radio3 , '身份证':this.radio4 ,'手持身份证':this.radio5}
            }
        },
        watch: {
            isvisible: {
                handler(newVal, oldVal) {
                
                    if(newVal && !this.inited){
                        this.inited = true
                       this.firstblood()
                        this.getMoreInformation()
                    }
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: true
            }
        },
        mounted(){
            eventBus.$on('changeListtwo', ()=>{
                if(this.inited || this.isvisible){
                    this.firstblood()
                }
            })
        }, 
        methods:{
            formatTime(da){
                let time = (+new Date()) - da
                return parseInt(time / 1000 / (3600*24))+ '天'+ parseInt(time/1000/(3600*24*60*60)*60*60)+ '小时'
            },

            clearSearch(){
                this.formInline={//查询条件
                    driverMobile:'',
                    belongCity:'',
                    driverStatus:'',
                    carNumber:''
                }
            },
            // 判断选中值
            handleSelectionChange(val){
                console.log(val)
                this.multipleSelection=val
                if(val){
                    this.templateModel=val
                } else{
                    this.templateModel={}
                }
            },

            // 认证审核功能
            handleAudit(){
                // console.log('认证审核功能')
                if(this.multipleSelection.length == 0){
                    //未选择任何修改内容的提示
                    // let information = "未选中任何修改内容";
                    // this.hint(information);
                    this.$refs.cue.hint(this.ifInformation)
                }else if(this.multipleSelection.length >1){
                    // let information = "不可修改多个内容";
                    // this.hint(information);
                    this.$refs.cue.hint(this.ifInformation2)
                } else{
                    this.formAuidDialogFlag=true
                }
            },

            //刷新页面
            firstblood(){
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                    this.tableDataTree.forEach(item => {
                        item.authenticationTime = parseTime(item.authenticationTime,"{y}-{m}-{d}");
                    })
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

                data_CarList().then(res=>{
                    res.data.map((item)=>{
                        this.optionscarType.push(item);
                    })
                })

                data_Get_carType().then(res=>{
                    res.data.map((item)=>{
                        this.optionscarSpec.push(item);
                    })
                })
           // 中单等级的获取
            data_get_driver_obStatus().then(res =>{
                res.data.map(item=>{
                    this.optionsLevel.push(item)
                })
            }).catch(err =>{
                console.log(err)
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
            changeList(){
                eventBus.$emit('changeListtwo')
            },
            // 图片质量拼接传给后台
            pictureTypeChange(){

            },
             changeIMG(event){
            // console.log(event)
            this.defaultImg1 = event.target.src;
            },
            completeData(){
                //获取城市name
                if(!this.$refs.area){
                    return
                }  
                else if(this.$refs.area.selectedOptions.length > 1){
                    let province;
                    this.$refs.area.areaData.forEach((item) =>{
                    if(item.code == this.$refs.area.selectedOptions[0]){
                        province = item
                    }
                    })
                    province.children.forEach( item => {
                    if(item.code == this.$refs.area.selectedOptions[1]){
                        this.templateModel.belongCity = item.code;
                        this.templateModel.belongCityName = item.name;
                    }
                    })
                }else{
                    this.$refs.area.areaData.forEach((item) =>{
                    if(item.code == this.$refs.area.selectedOptions[0]){
                        this.templateModel.belongCity = item.code;
                        this.templateModel.belongCityName = item.name;
                    }
                    })
                }
                },
        isVip(val){
            if(this.templateModel.isVipCar == '1'){

                this.templateModel.isVipCar = '1'
                                            console.log(this.templateModel.isVipCar)
            }
            else{
                this.templateModel.isVipCar = '0'
                            console.log(this.templateModel.isVipCar)
            }   
        },    
            // 审核不通过
            handlerOut(){
                this.completeData()
                this.$refs['shengheform'].validate((valid)=>{
                if(valid){
                    var forms=Object.assign({},this.templateModel,{driverStatus:"AF0010404"},{authNoPassCause:JSON.stringify(this.pictureValue)})
                    data_post_audit(forms).then(res=>{
                        // console.log(res)
                        this.$message.success('审核不通过 提交')
                        this.formAuidDialogFlag = false;
                        this.firstblood()
                        this.changeList()
                    }).catch(err=>{
                        console.log(err)
                    })
                    }
                })
            },

            // 审核通过
            handlerPass(){
                this.completeData()
                this.$refs['shengheform'].validate((valid)=>{
                    if(valid){
                        var forms=Object.assign({},this.templateModel,{driverStatus:"AF0010403",authNoPassCause:JSON.stringify(this.pictureValue)})
                        data_post_audit(forms).then(res=>{
                            // console.log(res)
                            this.$message.success('审核通过成功')
                            this.formAuidDialogFlag = false;
                            this.firstblood()
                            this.changeList()
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                })
            }
        }
        
    }
</script>
<style lang="scss">
.shenghe .data_pic{
   width: 100%;
   margin:0px auto;
   display: flex;
   justify-content: space-around;
}
.data_pic_c{
    flex-basis: 130px;
    margin:0px 5px;
}
.shenghe .data_pic .data_pic_c h2
{
    line-height: 40px;
    text-align: center;
}
.shenghe .data_pic .data_pic_c .el-radio-group{
margin:0px auto;
}
.commoncss .el-dialog{
    width: 750px;
}
.commoncss .el-dialog .el-input{
    width: 250px;
}
.picURL{
    width: 100%;
    height: 100%;
}
.data_pic_default
{
   margin:20px 0px;

img{
    width: 500px;
    margin: 0px auto;
    display: block
}
.uploadImgBox{
    width: 130px;
    height: 130px;

}
} 
</style>
