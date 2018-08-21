<template>
    <div style="height:100%;"  class="identicalStyle">
        <div class="shipper_searchinfo">
          <el-form :inline="true">
            <el-form-item label="所在地：">
              <GetCityList v-model="formAll.belongCity" ref="area"></GetCityList>
            </el-form-item>
            <el-form-item label="公司名称：">
              <el-input v-model.trim="formAll.companyName"></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input v-model.trim="formAll.mobile"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="getdata_search">查询</el-button>
              <el-button type="info" plain @click="clearSearch">清空</el-button>
            </el-form-item>
          </el-form>
      	</div>
      	<div class="classify_info">
		  <div class="btns_box">
        	<el-button type="primary" plain icon="el-icon-edit" @click="handleEdit">认证审核</el-button>
		</div>
		<div class="info_news">
			<el-table 
			ref="multipleTable"
			:data="tableData1"
			stripe
			border
            height="100%"
            highlight-current-row
            @current-change="handleCurrentChangeRow"
			tooltip-effect="dark"
			style="width: 100%">
			<el-table-column type='index' label="序号" width="80px">
				</el-table-column>  
				<el-table-column label="手机号(会员账号)">
                    <template slot-scope="scope">
                        <createdDialog :paramsView="scope.row" btntype="text" :btntext="scope.row.mobile" editType="view" btntitle="详情"></createdDialog>
                    </template>
				</el-table-column>
				<el-table-column prop="contactsName" label="注册人姓名">
				</el-table-column>
				<el-table-column prop="companyName" label="公司名称">
				</el-table-column>
				<el-table-column prop="belongCityName" label="所在地">
				</el-table-column>
				<el-table-column prop="registerOriginName" label="注册来源">
				</el-table-column>
				<el-table-column prop="registerTime" label="注册日期" width="200">
				</el-table-column>
				<el-table-column prop="accountStatusName" label="账户状态">
				</el-table-column>
				<el-table-column prop="authStatusName" label="认证状态">
				</el-table-column>
                <el-table-column prop="qq" label="QQ号码">
				</el-table-column>
				<el-table-column prop="serviceCommitment" label="会员服务承诺">
				</el-table-column>
                <el-table-column  label="是否开通TMS">
                    <template slot-scope="scope">
                        {{scope.row.isOpenTms  ==  1 ? '是' : '否'}}
                    </template>
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
		</div>
	  </div>

       <!--认证审核部分 -->
    <div class="shenghe commoncss">
        <el-dialog title="认证审核" :visible.sync="dialogFormVisible">
          <el-form :model="shengheform" ref="shengheform" :rules="shengheformRules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="会员账号" :label-width="formLabelWidth" >
                  <el-input v-model="shengheform.account" disabled auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="会员手机号码" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.mobile" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="注册人姓名" :label-width="formLabelWidth" prop="linkman">
                  <el-input v-model="shengheform.contactsName" auto-complete="off" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经营年限" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.businessLife" :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="公司名称" :label-width="formLabelWidth" prop="xsaddress">
                  <el-input v-model="shengheform.companyName" auto-complete="off" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="所在地" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="shengheform.belongCityName"  disabled></el-input>
                    <!-- <span v-else> -->
                    <!-- <GetCityList v-model="shengheform.belongCity" ref="area"></GetCityList> @focus="changeCity" v-if="selectDiaologFlag"-->
                    <!-- </span> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册来源" :label-width="formLabelWidth">
                    <el-input v-model="shengheform.registerOriginName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="注册日期:" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.registerTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="账户状态" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.accountStatusName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="认证状态" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.authStatusName" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
             <el-row>    
                <el-col :span="24" class="moreLength">
                    <el-form-item label="会员服务承诺 ：" :label-width="formLabelWidth" >
                        <!-- <el-input :maxlength="20" v-model="xinzengform.companyName"  v-if="editType=='view'" disabled></el-input> -->
                        <el-checkbox-group v-model="otherServiceCode" >
                            <el-checkbox v-for="obj in optionsLogisticsCompany" :label="obj.code" :key="obj.id" >{{obj.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="moreLength">
                    <el-form-item label="是否开通TMS ：" :label-width="formLabelWidth" >
                        <el-radio-group v-model="shengheform.isOpenTms" >
                            <el-radio  v-for="(obj,key) in optionsStatus" :label="obj.value" :key='key'>{{obj.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="data_pic clearfix">  
                <div class="data_pic_default">
                    <img  :src= 'defaultImg'/>
                </div>
                <div class="data_pic_yyzz data_pic_c">  
                    <img  class="picURL" :src="shengheform.businessLicenceFile ? shengheform.businessLicenceFile : defaultImg" @click="changeIMG"/>
                    <h2>营业执照</h2>
                    <!-- <el-form-item prop="radio1"> -->
                      <el-radio-group v-model="radio1" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    <!-- </el-form-item>  -->
                </div>
                <div class="data_pic_company data_pic_c">   
                    <img  class="picURL" :src="shengheform.companyFacadeFile ? shengheform.companyFacadeFile : defaultImg" @click="changeIMG"/>
                    <h2>公司或档口照片</h2>
                    <!-- <el-form-item prop="radio2"> -->
                      <el-radio-group v-model="radio2" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    <!-- </el-form-item> -->
                </div>
                <div class="data_pic_callingcode data_pic_c">
                    <!-- <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="shengheform.shipperCardFile" /> -->
                    <img  class="picURL" :src="shengheform.takeIdCardFile ? shengheform.takeIdCardFile : defaultImg" @click="changeIMG"/>
                    <h2>手持身份证</h2>
                    <!-- <el-form-item prop="radio3"> -->
                      <el-radio-group v-model="radio3" @change="pictureTypeChange">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                    <!-- </el-form-item> -->
                </div>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click="handlerPass">确认审核通过</el-button>
            <el-button @click="handlerOut">审核不通过</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
     </div> 
    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import { eventBus } from '@/eventBus'
import createdDialog from './createdDialog.vue'
import GetCityList from '@/components/GetCityList'
import { data_LogisticsCompanyList,data_ChangeLogisticsCompany } from '../../../api/users/logistics/LogisticsCompany.js'
import { data_LogisticsCompany } from '@/api/common.js'

import defaultURL  from '@/assets/404_images/404.png'
export default {
	props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
	components:{
		createdDialog,
		GetCityList,
		Upload
	},
	computed: {
		pictureValue () {
		    return [{name:'营业执照',result: this.radio1},{name:'公司或档口照片',result: this.radio2},{name:'手持身份证',result: this.radio3}]
		}
	},
	data(){
		const radioValidator = (rule,val,cb)=>{
            // console.log(val)
            if(!this.radio1){
                cb(new Error('请选择图片质量'))
            }else{
                cb()
            }
		}
		return{
            btnText: 'please select',
            defaultImg:'/static/test.jpg',//默认第一张图片的url
            demoData:"企业货主",//根据项目要求写死
            selectDiaologFlag:true,
            options:[], // 货主类型列表
            tableData1:[], // 列表数据
            totalCount:null, // 总数
            optionsLogisticsCompany:[],//会员服务承诺
            otherServiceCode:[],//选择增值服务
            page:1,
            pagesize:20,
            formAll:{
                belongCity:null,
                companyName:'',
                mobile:'',
                authStatus:"AF0010402",//待认证的状态码
            },
            formLabelWidth: '120px',
            dialogFormVisible:false, //认证审核弹框控制
            shengheform:{

            },
            centerDialogVisible:false,// 提示语的弹窗控制
            information:null, // 弹框显示的信息
            multipleSelection:{},
            shengheformRules:{
                shipperType:{required: true, message:'请选择货主类型',trigger:'change'},
                radio1:{validator: radioValidator,trigger:'change'},
                radio2:{validator: radioValidator,trigger:'change'},
                radio3:{validator: radioValidator,trigger:'change'}
            },
            radio1:null,
            radio2:null,
            radio3:null,
            optionsStatus:[
                {
                    value:'1',
                    name:"是"
                },
                    {
                    value:'0',
                    name:"否"
                }
            ],
        }
	},
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal && !this.inited){
                    this.inited = true
                    this.firstblood();
                    this.getMoreInformation();
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        },
        otherServiceCode:{
            handler(newVal,oldVal){
                if(newVal){
                    this.shengheform.otherServiceCode = newVal.join(',');
                    // console.log(this.shengheform.otherServiceCode)
                    let otherService = [];
                    this.optionsLogisticsCompany.find((item)=>{
                        this.otherServiceCode.forEach(el => {
                            if(item.code == el ){
                                otherService.push(item.name)    
                            }
                        })
                    })

                    this.shengheform.otherService = otherService.join(',');
                    // console.log(otherService)
                    // console.log(this.shengheform.otherServiceCode,this.shengheform.otherService)
                }
            }
        }
    },
    mounted(){
        eventBus.$on('changeList', () => {
            // console.log('44444444444444444')
                this.firstblood();
        })
    },
    methods:{

        regionChange(d) {
            this.btnText = (!d.province&&!d.city&&!d.area&&!d.town)?'please select': `${this.getValue(d.province)}${'/'+this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
        },
        getValue(obj){
            return obj?obj.value:'';
        },
        changeIMG(event){
            // console.log(event)
            this.defaultImg = event.target.src;
        },
        changeList(){
            eventBus.$emit('changeList')
        },

        changeCity(){
            this.selectDiaologFlag=false
        },
        formatTime(da){
            let time = (+new Date()) - da
            return parseInt(time / 1000 / (3600*24))+ '天'+ parseInt(time/1000/(3600*24*60*60)*60*60)+ '小时'
        },
        handleEdit(){
            if(!this.shengheform.mobile){
                this.$message.info('至少选择一条数据！');
            }else{
                this.dialogFormVisible = true;
            }
            this.defaultImg =  this.shengheform.businessLicenceFile ?  this.shengheform.businessLicenceFile : this.defaultImg;
        },
        handleCurrentChangeRow(val){
            console.log(val)
            if(val){
                this.shengheform = val;
                this.shengheform.isOpenTms = '0';
            }
        },
        //刷新页面
        firstblood(){
            data_LogisticsCompanyList(this.page,this.pagesize,this.formAll).then(res=>{
            console.log(res)
                this.totalCount = res.data.totalCount;
                this.tableData1 = res.data.list;
                // this.inited = true
            })
        },
        //点击查询按纽，按条件查询列表
        getdata_search(event){
                this.formAll.belongCity = this.$refs.area.selectedOptions.pop();
                this.firstblood();
        },
         //获取增值服务
        getMoreInformation(){
            data_LogisticsCompany().then(res=>{
                this.optionsLogisticsCompany = res.data;
                // console.log('this.options',this.optionsLogisticsCompany)
            })
        },
        //清空
        clearSearch(){
            this.$refs.area.selectedOptions = [];
            this.formAll = {
                belongCity:null,
                companyName:'',
                mobile:'',
                authStatus:"AF0010402",//待认证的状态码
            }
            this.firstblood()
        },
        handleChange(value){
            console.log(value);
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

        completeData(){
        //获取城市name
        if(this.$refs.area.selectedOptions.length > 1){
            let province;
            this.$refs.area.areaData.forEach((item) =>{
                if(item.code == this.$refs.area.selectedOptions[0]){
                    province = item
                }
            })
            province.children.forEach( item => {
                if(item.code == this.$refs.area.selectedOptions[1]){
                    this.shengheform.belongCity = item.code;
                    this.shengheform.belongCityName = item.name;
                }
            })
        }else{
            this.$refs.area.areaData.forEach((item) =>{
                if(item.code == this.$refs.area.selectedOptions[0]){
                    this.shengheform.belongCity = item.code;
                    this.shengheform.belongCityName = item.name;
                }
            })
        }
        },
        // 审核不通过
        handlerOut(){
            
            // this.pictureValue.forEach((el,idx) => {
                //     if(el.result == '上传合格'){
                    //         this.pictureValue.splice(idx,1)
            this.$refs['shengheform'].validate((valid)=>{
                if(valid){
                    this.completeData();
                    let item =  this.shengheform.contacts;
                    this.$confirm('确定要不通过'+ item +' 货主吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var forms=Object.assign({},this.shengheform,{authStatus:"AF0010404",authStatusName:'认证不通过'},{authNoPassCause:JSON.stringify(this.pictureValue)});
                        data_ChangeLogisticsCompany(forms).then(res=>{
                            // console.log(res)
                            this.$message({
                                type: 'success',
                                message: '该货主未通过审核',
                                duration:2000
                            })
                            this.dialogFormVisible = false;
                            this.changeList();
                            this.firstblood();
                        }).catch(err=>{
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + err.text ? err.text : err
                            })
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
                
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            })
        },

        // 审核通过
        handlerPass(){
            let ifQualified = true;
            this.pictureValue.forEach((el,idx) => {
                if(el.result != "上传合格"){
                    ifQualified = false;
                }
            })
            this.$refs['shengheform'].validate((valid)=>{
                if(valid && ifQualified){
                    this.completeData();
                    var forms=Object.assign({},this.shengheform,{authStatus:"AF0010403",authStatusName:'已认证'},{authNoPassCause:JSON.stringify(this.pictureValue)});
                    data_ChangeLogisticsCompany(forms).then(res=>{
                    // console.log(res)
                        this.dialogFormVisible = false;
                        this.$alert('操作成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.changeList();
                                this.firstblood()
                            }
                        });
                    }).catch(err=>{
                        this.dialogFormVisible = true;
                        this.$message({
                            type: 'info',
                            message: '删除失败，原因：' + err.text ? err.text : err
                        })
                    })
                }else{
                    this.$message.error('审核未满足通过要求')
                    return false
                }
            })
        },

        // 图片质量的选择拼接
        pictureTypeChange(val){
            console.log(val)
        console.log('pictureValue:', this.pictureValue)
        let authNoPassCause
        switch(val){
            case 1:

            break
            case 2:

            break
            case 3:

            break
        }
    }
  }
}
</script>
<style lang="scss">
    .shenghe{
        width: 100%;
        .data_pic{
            margin: 0 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ccc;
            .data_pic_default{
                width: 100%;
                height: 410px;
                margin-bottom: 15px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .data_pic_c{
                float: left;
                width: 32%;
                h2{
                    text-align: center;
                }
                .el-radio-group{
                    margin-left:78px;
                    margin-top: 10px;
                    .el-radio{
                        margin: 2px 0;
                    }
                }
                .picURL{
                    display: block;
                    width: 100%;
                    height: 160px;
                    margin-bottom: 10px;
                }
            }
            .data_pic_yyzz,.data_pic_company{
                margin-right: 2%;
            }
        }
    }
</style>


