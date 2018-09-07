<template>
    <div class="identicalStyle">
          <el-form :model="formAll" ref="ruleForm" class="classify_searchinfo">
            <el-form-item label="所在地：">
              <GetCityList v-model="formAll.belongCity" ref="area"></GetCityList>
            </el-form-item>
            <el-form-item label="公司名称：">
              <el-input v-model.trim="formAll.companyName"></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input v-model.trim="formAll.mobile"></el-input>
            </el-form-item>
            <el-form-item class="fr">
              <el-button type="primary" plain @click="getdata_search">查询</el-button>
              <el-button type="info" plain @click="clearSearch">清空</el-button>
            </el-form-item>
          </el-form>
      	<div class="classify_info">
		  <div class="btns_box">
        	<el-button type="primary" plain icon="el-icon-check" @click="handleEdit">认证审核</el-button>
		</div>
		<div class="info_news">
			<el-table 
			ref="multipleTable"
			:data="tableData1"
			stripe
			border
            height="100%"
            highlight-current-row
			tooltip-effect="dark"
			style="width: 100%">
			<el-table-column label="" width="65">
                <template slot-scope="scope">
                    <el-radio class="textRadio" @change.native="getCurrentRow(scope.$index,scope.row)" :label="scope.$index" v-model="templateRadio">&nbsp;</el-radio>
                </template>
            </el-table-column>
			<el-table-column label="序号" width="80px">
                <template slot-scope="scope">
                    {{ (page - 1)*pagesize + scope.$index + 1 }}
                </template>
			</el-table-column>  
			<el-table-column label="公司名称">
                <template slot-scope="scope">
                    <createdDialog :paramsView="scope.row" btntype="text" :btntext="scope.row.companyName" editType="view" btntitle="详情"></createdDialog>
                </template>
			</el-table-column>
			<el-table-column prop="mobile" label="手机号">
			</el-table-column>
			<el-table-column prop="contacts" label="联系人">
			</el-table-column>
			<el-table-column prop="registerOrigin" label="注册来源">
			</el-table-column>
			<el-table-column prop="shipperStatusName" label="认证状态">
			</el-table-column>
			<el-table-column prop="accountStatusName" label="账户状态">
			</el-table-column>
			<el-table-column prop="belongCityName" label="所在地">
			</el-table-column>
			<el-table-column prop="authenticationTime" label="提交认证时间">
			</el-table-column>
			<el-table-column prop="waitTime" label="等待时长">
			</el-table-column>
			</el-table>
		</div>
	  </div>

       <!--认证审核部分 -->
    <div class="certifed commoncss">
        <el-dialog title="认证审核" :visible.sync="RZdialogFormVisible" v-if="Object.keys(shengheform).length != 0">
          <el-form :model="shengheform" ref="shengheform" :rules="shengheformRules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机号码" :label-width="formLabelWidth" >
                  <el-input v-model="shengheform.mobile" disabled auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司名称" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.companyName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人" :label-width="formLabelWidth" prop="linkman">
                  <el-input v-model="shengheform.contacts" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所在地" :label-width="formLabelWidth" prop="address">
                 <el-input v-model="shengheform.belongCityName" @focus="changeCity" v-if="selectDiaologFlag" ></el-input>
                 <span v-else>
                   <GetCityList v-model="shengheform.belongCity" ref="area"></GetCityList>
                 </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="详细地址" :label-width="formLabelWidth" prop="xsaddress">
                  <el-input v-model="shengheform.address" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="统一社会信用代码" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.creditCode" :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="提交认证时间" :label-width="formLabelWidth">
                    <el-input v-model="shengheform.authenticationTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="等待时长:" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.waitTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册来源" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.registerOrigin" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="货主类型" :label-width="formLabelWidth" prop="shipperType">
                  <el-input v-model="demoData" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
 
            <div class="data_pic clearfix">  
                <div class="data_pic_default">
                    <img  :src= 'defaultImage ? defaultImage : defaultImg'/>
                </div>
                <div class="data_pic_yyzz data_pic_common">  
                    <img  class="picURL" :src="shengheform.businessLicenceFile ? shengheform.businessLicenceFile : defaultImg" @click="changeIMG"/>
                    <h2>营业执照</h2>
                      <el-radio-group v-model="shengheform.businessLicenceFileNoPass">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                </div>
                <div class="data_pic_company data_pic_common">   
                    <img  class="picURL" :src="shengheform.companyFacadeFile ? shengheform.companyFacadeFile : defaultImg" @click="changeIMG"/>
                    <h2>公司或档口照片</h2>
                      <el-radio-group v-model="shengheform.companyFacadeFileNoPass">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                </div>
                <div class="data_pic_callingcode data_pic_common">
                    <img  class="picURL" :src="shengheform.shipperCardFile ? shengheform.shipperCardFile : defaultImg" @click="changeIMG"/>
                    <h2>发货人名片</h2>
                      <el-radio-group v-model="shengheform.shipperCardFileNoPass">
                        <el-radio label="上传合格">上传合格</el-radio><br />
                        <el-radio label="不清晰">不清晰</el-radio><br />
                        <el-radio label="内容不符">内容不符</el-radio>
                      </el-radio-group>
                </div>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click="handlerPass">确认审核通过</el-button>
            <el-button @click="handlerOut">审核不通过</el-button>
            <el-button @click="RZdialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
     </div> 

        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>    

    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import { eventBus } from '@/eventBus'
import createdDialog from './createdDialog.vue'
import GetCityList from '@/components/GetCityList'
import {data_get_shipper_list,data_get_shipper_type,data_get_shipper_change} from '@/api/users/shipper/all_shipper.js'
// import defaultURL  from '@/assets/404_images/404.png'
import Pager from '@/components/Pagination/index'

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
        Upload,
        Pager
	},
	computed: {
		// pictureValue () {
		//     return [{name:'营业执照',result: this.radio1},{name:'公司或档口照片',result: this.radio2},{name:'发货人名片',result: this.radio3}]
		// }
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
            templateRadio:'',
            defaultImage:'',
            defaultImg:'/static/test.jpg',//默认第一张图片的url
            demoData:"企业货主",//根据项目要求写死
            selectDiaologFlag:true,
            options:[], // 货主类型列表
            tableData1:[], // 列表数据
            totalCount:0, // 总数
            page:1,
            pagesize:20,
            formAll:{
                belongCity:null,
                companyName:'',
                mobile:'',
                shipperStatus:"AF0010402",//待认证的状态码
            },
            formLabelWidth: '120px',
            RZdialogFormVisible:false, //认证审核弹框控制
            selectRowData:{},
            shengheform:{},
            multipleSelection:{},
            shengheformRules:{
                shipperType:{required: true, message:'请选择货主类型',trigger:'change'},
                radio1:{validator: radioValidator,trigger:'change'},
                radio2:{validator: radioValidator,trigger:'change'},
                radio3:{validator: radioValidator,trigger:'change'}
            }
        }
	},
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal && !this.inited){
                    this.inited = true
                    this.firstblood()
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted(){
        eventBus.$on('changeList', () => {
                this.firstblood()
        })
    },
    methods:{
        handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
        },
        getCurrentRow(index,row){       

            this.selectRowData = Object.assign({},row);

            this.templateRadio = index;
            console.log('选中内容',row)
        },
        getValue(obj){
            return obj?obj.value:'';
        },
        changeIMG(event){
            this.defaultImage = event.target.src;
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
        //认证审核
        handleEdit(){
            
            if(Object.keys(this.selectRowData).length == 0){
                return this.$message({
                    type: 'info',
                    message: '请选择需认证的货主信息' 
                })
            }else{
                this.RZdialogFormVisible = true;
                this.shengheform = Object.assign({},this.selectRowData) ;
                this.defaultImage =  this.shengheform.businessLicenceFile ?  this.shengheform.businessLicenceFile : this.defaultImg;
            }
            console.log('`````````````')
            console.log(' this.RZdialogFormVisible', this.RZdialogFormVisible)
        },
        //刷新页面
        firstblood(){
            data_get_shipper_list(this.page,this.pagesize,this.formAll).then(res=>{
                this.totalCount = res.data.totalCount;
                this.tableData1 = res.data.list;
                // this.inited = true
            })
        },
        //点击查询按纽，按条件查询列表
        getdata_search(event){
            console.log(' this.$refs.area', this.$refs.area.selectedOptions)
                this.formAll.belongCity = this.$refs.area.selectedOptions[1];
            this.firstblood()
        },
        //清空
        clearSearch(){
            this.$refs.area.selectedOptions = [];
            this.formAll = {
                belongCity:null,
                companyName:'',
                mobile:'',
                shipperStatus:"AF0010402",//待认证的状态码
            }
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
                        var forms=Object.assign({},this.shengheform,{shipperType:"AF0010202"},{currentShipperStatus:"AF0010402"},{shipperStatus:"AF0010404"});
                        data_get_shipper_change(forms).then(res=>{
                            // console.log(res)
                            this.$message({
                                type: 'success',
                                message: '该货主未通过审核',
                                duration:2000
                            })
                            this.RZdialogFormVisible = false;
                            this.changeList();
                            this.firstblood();
                        }).catch(err=>{
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
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
            let ifQualified;
            // this.pictureValue.forEach((el,idx) => {
                //     if(el.result != "上传合格"){
                    //         ifQualified = false;
            //     }
            // })
            if(this.shengheform.shipperCardFileNoPass = this.shengheform.companyFacadeFileNoPass == "上传合格" ){
                ifQualified = true ;
            }else{
                ifQualified = false ;
            }
            this.$refs['shengheform'].validate((valid)=>{
                if(valid && ifQualified){
                    this.completeData();
                    var forms=Object.assign({},this.shengheform,{shipperType:"AF0010202"},{currentShipperStatus:"AF0010402"},{shipperStatus:"AF0010403"});
                    data_get_shipper_change(forms).then(res=>{
                    // console.log(res)
                        this.RZdialogFormVisible = false;
                        this.$alert('操作成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.changeList();
                                this.firstblood()
                            }
                        });
                    }).catch(err=>{
                        this.RZdialogFormVisible = true;
                        this.$message({
                            type: 'info',
                            message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                        })
                    })
                }else{
                    this.$message.error('审核未满足通过要求')
                    return false
                }
            })
        },
  }
}
</script>
<style lang="scss">
    .certifed{
        width: 100%;
        .data_pic{
            margin: 0 15px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ccc;
            .data_pic_default{
                display: block;
                width: 100%;
                height: 410px;
                margin-bottom: 15px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .data_pic_common{
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


