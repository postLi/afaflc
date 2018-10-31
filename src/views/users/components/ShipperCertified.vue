<template>
    <div class="identicalStyle" v-loading="loading">
        <searchInfo @change="getSearchParam" :showType = 'tabType'></searchInfo>
      	<div class="classify_info">
		  <div class="btns_box">
        	<el-button type="primary" plain icon="el-icon-check" :size="btnsize" @click="handleEdit">认证审核</el-button>
		</div>
		<div class="info_news">
			<el-table 
			ref="multipleTable"
			:data="tableData1"
			stripe
			border
            height="100%"
            @selection-change="getSelection" 
            @row-click="clickDetails"
			tooltip-effect="dark"
			style="width: 100%">
            <el-table-column
                type="selection"
                width="50">
            </el-table-column>
			<el-table-column label="序号" width="80px">
                <template slot-scope="scope">
                    {{ (page - 1)*pagesize + scope.$index + 1 }}
                </template>
			</el-table-column>  
			<el-table-column label="公司名称" 
                :show-overflow-tooltip="true" sortable
                 prop="companyName">
                <template slot-scope="scope">
                    <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.companyName}}</h4>
                </template>
			</el-table-column>
			<el-table-column prop="mobile" sortable label="手机号">
			</el-table-column>
			<el-table-column prop="contacts" sortable label="联系人">
			</el-table-column>
			<el-table-column prop="registerOriginName" sortable label="注册来源">
			</el-table-column>
			<el-table-column prop="shipperStatusName" sortable label="认证状态">
			</el-table-column>
			<el-table-column prop="accountStatusName" sortable label="账户状态">
                 <template slot-scope="scope">
                    <span :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}">{{scope.row.accountStatusName}}</span>
                </template>
			</el-table-column>
			<el-table-column prop="belongCityName" 
                :show-overflow-tooltip="true" sortable
                label="所在地">
			</el-table-column>
			<el-table-column prop="authenticationTime" sortable label="提交认证时间">
                 <template slot-scope="scope">
                     {{scope.row.authenticationTime | parseTime}}
                </template>
			</el-table-column>
			<el-table-column prop="waitTime" sortable label="等待时长">
			</el-table-column>
			</el-table>
		</div>
	  </div>

       <!--认证审核部分 -->
    <div class="shippercertifed commoncss">
        <el-dialog title="认证审核" :visible.sync="RZdialogFormVisible" :close-on-click-modal="false" top="5vh" v-if="Object.keys(shengheform).length != 0">
          <el-form :model="shengheform" ref="shengheform" :rules="shengheformRules"  label-position="right" :label-width="formLabelWidth">
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机号码：" required  prop="mobile">
                    <!-- <span class="onlyShow">{{shengheform.mobile}}</span> -->
                    <el-input v-model="shengheform.mobile" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司名称：" prop="companyName">
                  <el-input v-model="shengheform.companyName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="所在地：" prop="belongCityName">
                    <vregion :ui="true"  @values="regionChange" class="form-control">
                        <el-input v-model="shengheform.belongCityName" placeholder="请选择" ></el-input>
                    </vregion>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人：" prop="contacts">
                  <el-input v-model="shengheform.contacts" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="详细地址：" prop="address">
                  <el-input v-model="shengheform.address" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="信用代码：" prop="creditCode">
                  <el-input v-model="shengheform.creditCode" :maxlength="20" placeholder="统一社会信用代码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="提交认证时间：" prop="authenticationTime">
                    <!-- <span class="onlyShow">{{shengheform.authenticationTime | parseTime}}</span> -->
                    <el-input :value="shengheform.authenticationTime | parseTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="等待时长：" prop="waitTime">
                    <!-- <span class="onlyShow">{{shengheform.waitTime}}</span> -->
                    <el-input v-model="shengheform.waitTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册来源：" prop="registerOriginName">
                    <!-- <span class="onlyShow">{{shengheform.registerOriginName}}</span> -->
                    <el-input v-model="shengheform.registerOriginName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="货主类型："  required prop="shipperType">
                    <!-- <span class="onlyShow">{{shengheform.shipperTypeName}}</span> -->
                     <el-select v-model="shengheform.shipperType" placeholder="请选择">
                        <el-option
                        v-for="item in optionsShipperType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
 
            <div class="data_pic clearfix" v-viewer>  
                <!-- <div class="data_pic_default">
                    <img  :src= 'defaultImage ? defaultImage : defaultImg'/>
                </div> -->
                <div class="data_pic_yyzz data_pic_common">  
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img  class="picURL" :src="shengheform.businessLicenceFile ? shengheform.businessLicenceFile : defaultImg"/>
                    </el-tooltip>
                    <h2>营业执照</h2>
                    <el-form-item  prop="businessLicenceFileNoPass">
                        <el-radio-group v-model="shengheform.businessLicenceFileNoPass">
                            <el-radio label="上传合格">上传合格</el-radio><br />
                            <el-radio label="不清晰">不清晰</el-radio><br />
                            <el-radio label="内容不符">内容不符</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div class="data_pic_company data_pic_common">   
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img  class="picURL" :src="shengheform.companyFacadeFile ? shengheform.companyFacadeFile : defaultImg"/>
                    </el-tooltip>
                    <h2>公司或档口照片</h2>
                    <el-form-item  prop="companyFacadeFileNoPass">
                        <el-radio-group v-model="shengheform.companyFacadeFileNoPass">
                            <el-radio label="上传合格">上传合格</el-radio><br />
                            <el-radio label="不清晰">不清晰</el-radio><br />
                            <el-radio label="内容不符">内容不符</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div class="data_pic_callingcode data_pic_common">
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img  class="picURL" :src="shengheform.shipperCardFile ? shengheform.shipperCardFile : defaultImg"/>
                    </el-tooltip>
                    <h2>发货人名片</h2>
                    <el-form-item  prop="shipperCardFileNoPass" >
                        <el-radio-group v-model="shengheform.shipperCardFileNoPass">
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
            <el-button @click="closeMe">取 消</el-button>
          </div>
        </el-dialog>
     </div> 
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    
        <createdDialog :paramsView="paramsView" :typetitle="typetitle" :editType="type"  :dialogFormVisible_add.sync = "dialogFormVisible_add"/>
    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import { eventBus } from '@/eventBus'
import createdDialog from './createdDialog.vue'
import searchInfo from './searchInfo'
import {data_get_shipper_list,data_get_shipper_change} from '@/api/users/shipper/all_shipper.js'
// import defaultURL  from '@/assets/404_images/404.png'
import Pager from '@/components/Pagination/index'
import vregion from '@/components/vregion/Region'
import { objectMerge2, parseTime } from '@/utils/'
import { DicShippertype } from '@/api/common.js'

export default {
	props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
	components:{
		createdDialog,
		searchInfo,
        Upload,
        Pager,
        vregion
	},
	computed: {
		
	},
	data(){
		return{
            loading:true,
            dialogFormVisible_add: false,
            type: '',
            paramsView: {},
            optionsShipperType:[],
            typetitle:'',
            btnsize:'mini',
            tabType:'certified',
            defaultImage:'',
            defaultImg:'/static/test.jpg',//默认第一张图片的url
            demoData:"企业货主",//根据项目要求写死
            options:[], // 货主类型列表
            tableData1:[], // 列表数据
            totalCount:0, // 总数
            page:1,
            pagesize:20,
            searchInfo:{
                belongCity:null,
                companyName:'',
                mobile:'',
                shipperStatus:"AF0010402",//待认证的状态码
            },
            formLabelWidth: '120px',
            RZdialogFormVisible:false, //认证审核弹框控制
            shengheform:{},
            shengheformRules:{
                belongCityName:[
                    {required: true, message: '请选择所在地', trigger: 'change'}
                ],
                companyName:[
                    {required: true, message: '请输入公司名称', trigger: 'change'}
                ],
                contacts:{required: true, message: '请输入联系人信息', trigger: 'change'},
                shipperCardFileNoPass:[
                    {required: true, message: '请选择发货人名片是否合格', trigger: 'change'}
                ],
                businessLicenceFileNoPass:[
                    {required: true, message: '请选择营业执照是否合格', trigger: 'change'}
                ],
                companyFacadeFileNoPass:[
                    {required: true, message: '请选择公司或档口照片是否合格', trigger: 'change'}
                ],
            },
            selected:[],//暂存数据
        }
	},
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal && !this.inited){
                    this.inited = true
                    this.firstblood();
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
        regionChange(d) {
            console.log('data:',d)
            this.shengheform.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            if(d.area){
                this.shengheform.areaCode = d.area.code;
                this.shengheform.belongCity = d.area.name;
            }else if(d.city){
                this.shengheform.belongCity = d.city.code;
                this.shengheform.cityCode = d.city.name;
            }
            else{
                this.shengheform.belongCity = d.province.code;
                this.shengheform.provinceCode = d.province.name;
            }
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
         //获取货主类型
        getMoreInformation(){
            DicShippertype().then(res=>{
                // console.log('货主类型',res)
                this.optionsShipperType = res.data;
                this.optionsShipperType = this.optionsShipperType.filter(el => {
                    return el.code != 'AF0010101';
                })
            })
        },
        pushOrderSerial(row){
            this.type = 'view';
            this.typetitle = '货主详情';
            this.paramsView = objectMerge2({},row);;
            this.dialogFormVisible_add =true;
        },
        getSearchParam(obj) {
            console.log(obj)
            this.searchInfo = objectMerge2({},obj,{shipperStatus:'AF0010402'});
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
            }
            this.firstblood();
        },
        handlePageChange(obj) {
            this.page = obj.pageNum;
            this.pagesize = obj.pageSize;
            this.firstblood();
        },
          //点击选中当前行
        clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row);
        },
         // 判断选中与否
        getSelection(val){
            console.log('选中内容',val)
            this.selected = val;
        },
        changeIMG(event){
            this.defaultImage = event.target.src;
        },
        changeList(){
            eventBus.$emit('changeList')
        },
        //认证审核
        handleEdit(){
            if(this.selected.length == 0){
                return this.$message.warning('请选择您要操作的用户');
            }else if (this.selected.length > 1) {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.clearTableSelection();
            }else{
                this.getMoreInformation();
                this.RZdialogFormVisible = true;
                this.shengheform = objectMerge2({},this.selected[0]) ;
                this.shengheform.shipperType = 'AF0010102';
                this.defaultImage =  this.shengheform.businessLicenceFile ?  this.shengheform.businessLicenceFile : this.defaultImg;
                this.clearTableSelection();
            }
        },
        clearTableSelection(){
            //清除选中状态，避免影响下个操作
            this.$refs.multipleTable.clearSelection();
        },
        //刷新页面
        firstblood(){
            this.loading = true;
            data_get_shipper_list(this.page,this.pagesize,this.searchInfo).then(res=>{
                // console.log('未认证',res)
                this.totalCount = res.data.totalCount;
                this.tableData1 = res.data.list;
                this.loading = false;
            }).catch(err => {
                 this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                })
                this.loading = false;
            })
        },
        closeMe(){
            this.RZdialogFormVisible = false;
            this.changeList();
            this.firstblood();
            this.$refs.shengheform.resetFields();
        },
        // 审核不通过
        handlerOut(){
            let ifQualified;
            if(this.shengheform.shipperCardFileNoPass =="上传合格" && this.shengheform.companyFacadeFileNoPass == "上传合格" ){
                ifQualified = true ;
            }else{
                ifQualified = false ;
            }
            this.$refs['shengheform'].validate((valid)=>{
                if(valid ){
                    if(ifQualified){
                        this.$message({
                            type: 'info',
                            message: '请确认用户提交认证图片信息，如都上传合格，则不能操作审核不通过，货主基本信息可根据上传图片进行修改!'
                        });
                    }else{
                        let item =  this.shengheform.mobile;
                        this.$confirm('确定要不通过'+ item +' 货主吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            var forms=objectMerge2({},this.shengheform,{currentShipperStatus:"AF0010402"},{shipperStatus:"AF0010404",shipperStatusName:'认证不通过'});
                            
                            data_get_shipper_change(forms).then(res=>{
                                // console.log(res)
                                this.$message({
                                    type: 'success',
                                    message: '该货主未通过审核',
                                    duration:2000
                                })
                                this.closeMe();
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
                    }
                } else {
                    this.$message({
                        type: 'info',
                        message: '审核未满足未通过要求，请填写完整数据!'
                    });
                }
            })
        },

        // 审核通过
        handlerPass(){
            let ifQualified = true;
            if(this.shengheform.shipperCardFileNoPass =="上传合格" && this.shengheform.companyFacadeFileNoPass == "上传合格" &&this.shengheform.businessLicenceFileNoPass =="上传合格"){
                ifQualified = true ;
            }else{
                ifQualified = false ;
            }
            this.$refs.shengheform.validate((valid)=>{
                if(valid && ifQualified){
                    var forms=objectMerge2({},this.shengheform,{currentShipperStatus:"AF0010402"},{shipperStatus:"AF0010403",shipperStatusName:'已认证'});
                    console.log('this.forms',forms)
                    data_get_shipper_change(forms).then(res=>{
                        this.$alert('操作成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                               this.closeMe();
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
                    return this.$message({
                        type: 'info',
                        message: '审核未满足通过要求，请填写完整数据!'
                    });
                }
            })
        },
  }
}
</script>
<style lang="scss">
    .shippercertifed{
        width: 100%;
        .data_pic{
            padding-bottom: 20px;
            border-bottom: 1px solid #ccc;
            .data_pic_default{
                display: block;
                width: 100%;
                height: 410px;
                margin-bottom: 15px;
                img{
                    width: 100%;
                    // height: 100%;
                    height: 300px;
                }
            }
            .data_pic_common{
                float: left;
                width: 32%;
                h2{
                    text-align: center;
                }
                .el-radio-group{
                    margin-left:0;
                    margin-top: 10px;
                    .el-radio{
                        margin: 2px 0;
                    }
                }
                .picURL{
                    display: block;
                    width: 100%;
                    height: 255px;
                    margin-bottom: 10px;
                    cursor: pointer;
                }
            }
            .data_pic_yyzz,.data_pic_company{
                margin-right: 2%;
            }
        }
    }
</style>


