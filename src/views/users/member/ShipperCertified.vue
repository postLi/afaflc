<template>
    <div style="height:100%;"  class="identicalStyle">
          <el-form :inline="true" :model="formAll" ref="ruleForm" class="classify_searchinfo">
            <el-form-item label="所在地：">
                <vregion :ui="true" @values="regionChange" class="form-control">
                    <el-input v-model="formAll.belongCityName" placeholder="请输入"></el-input> 
                </vregion>
            </el-form-item>
            <el-form-item label="公司名称：">
              <el-input v-model.trim="formAll.companyName"></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input v-model.trim="formAll.mobile"></el-input>
            </el-form-item>
            <el-form-item class="fr">
              <el-button type="primary" icon="el-icon-search"  :size="btnsize" plain @click="handleSearch('search')">查询</el-button>
              <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
          </el-form>
      	<div class="classify_info">
		  <div class="btns_box">
        	<el-button type="primary" :size="btnsize" plain icon="el-icon-check" v-has:COMPANY_MANAGE_VALIDATED_AUTDIT @click="handleEdit">认证审核</el-button>
		</div>
		<div class="info_news">
			<el-table 
			ref="multipleTable"
			:data="tableData1"
			stripe
			border
            height="100%"
            @row-click="clickDetails"
            @selection-change="getSelection"    
			tooltip-effect="dark"
			style="width: 100%">
            <el-table-column
                    fixed
                    sortable
                    type="selection"
                    width="50">
            </el-table-column>
			<el-table-column label="序号" sortable  width="80">
                <template slot-scope="scope">
                    {{ (page - 1)*pagesize + scope.$index + 1 }}
                </template>
            </el-table-column>  
				<el-table-column label="手机号(会员账号)" prop="mobile" sortable width="180">
                    <template slot-scope="scope">
                        <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
                    </template>
				</el-table-column>
				<el-table-column prop="contactsName" sortable label="注册人姓名" width="150">
				</el-table-column>
				<el-table-column prop="companyName" sortable label="公司名称" :show-overflow-tooltip="true" width="250">
				</el-table-column>
				<el-table-column prop="belongCityName" sortable label="所在地" :show-overflow-tooltip="true" width="200">
				</el-table-column>
				<el-table-column prop="registerOriginName" sortable label="注册来源" width="120">
				</el-table-column>
				<el-table-column prop="registerTime" sortable label="注册日期" width="200">
				</el-table-column>
				<el-table-column prop="accountStatusName" sortable label="账户状态" width="120">
                    <template slot-scope="scope">
                        <span :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}">{{scope.row.accountStatusName}}</span>
                    </template>
				</el-table-column>
				<el-table-column prop="authStatusName" sortable label="认证状态" width="120">
				</el-table-column>
                <el-table-column prop="qq" label="QQ号码" sortable width="120">
				</el-table-column>
                <el-table-column prop="isOpenTms" sortable label="是否开通TMS" >
                    <template slot-scope="scope">
                        <span :class="scope.row.isOpenTms == 1 ? 'isTMS' : 'noTMS'"> {{scope.row.isOpenTms == 1 ? '是' : '否'}}</span>
                    </template>
				</el-table-column>
			</el-table>
		</div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>    
	</div>

    <!--认证审核部分 -->
    <div class="shenghedialog commoncss">
        <el-dialog title="认证审核" :visible.sync="dialogFormVisible" top="5vh" v-el-drag-dialog :close-on-click-modal = "false">
          <el-form :model="shengheform" ref="shengheform" :rules="shengheformRules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="会员账号" :label-width="formLabelWidth" prop="account">
                  <el-input v-model="shengheform.account" disabled auto-complete="off"></el-input>
                    <!-- <span class="onlyShow">{{shengheform.account}}</span> -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="会员手机号码" :label-width="formLabelWidth" prop="mobile">
                  <el-input v-model="shengheform.mobile" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="注册人姓名" :label-width="formLabelWidth" prop="contactsName">
                  <el-input v-model="shengheform.contactsName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经营年限" :label-width="formLabelWidth" prop="businessLife">
                  <el-input v-model="shengheform.businessLife" :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="公司名称" :label-width="formLabelWidth" prop="companyName">
                  <el-input v-model="shengheform.companyName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="所在地" :label-width="formLabelWidth" prop="belongCityName">
                    <el-input v-model="shengheform.belongCityName"  disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册来源" :label-width="formLabelWidth">
                    <el-input v-model="shengheform.registerOriginName" disabled></el-input>
                    <!-- <span class="onlyShow">{{shengheform.registerOriginName}}</span> -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="注册日期:" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.registerTime" disabled></el-input>
                    <!-- <span class="onlyShow">{{shengheform.registerTime}}</span> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="账户状态" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.accountStatusName" disabled></el-input>
                    <!-- <span class="onlyShow">{{shengheform.accountStatusName}}</span> -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="认证状态" :label-width="formLabelWidth">
                  <el-input v-model="shengheform.authStatusName" disabled></el-input>
                    <!-- <span class="onlyShow">{{shengheform.authStatusName}}</span> -->
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="法人/负责人 ：" :label-width="formLabelWidth" prop="corporation">
                        <el-input :maxlength="20" v-model="shengheform.corporation"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属品牌 ：" :label-width="formLabelWidth"  prop="belongBrandCode">
                        <el-select v-model="shengheform.belongBrandCode" placeholder="请选择" >
                            <el-option
                            v-for="item in optionsBelongBrand"
                            :key="item.id"
                            :label="item.name"
                            :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="是否开通会员 ：" :label-width="formLabelWidth" prop="isVip">
                        <el-radio-group v-model="shengheform.isVip" >
                            <el-radio  v-for="(obj,key) in optionsStatus" :label="obj.value" :key='key'>{{obj.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12" >
                    <el-form-item label="公司成立时间 ：" :label-width="formLabelWidth" prop="foundTime">
                        <!-- <span class="onlyShow"  disabled>{{shengheform.foundTime ? shengheform.foundTime :'未填写'}}</span> -->
                        <el-input  :value="shengheform.foundTime ? shengheform.foundTime :'未填写'"  disabled></el-input>
                        <!-- <el-date-picker
                            v-if="editType=='view'"
                            v-model="shengheform.foundTime"
                            type="date"
                            placeholder="选择日期"
                            value-format="timestamp">
                        </el-date-picker> -->
                    </el-form-item>
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="12" class="moreLength">
                    <el-form-item label="是否开通TMS ：" :label-width="formLabelWidth"  prop="isOpenTms">
                        <el-radio-group v-model="shengheform.isOpenTms" >
                            <el-radio  v-for="(obj,key) in optionsStatus" :label="obj.value" :key='key'>{{obj.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="保证金 ：" :label-width="formLabelWidth">
                        <el-input placeholder="请输入" v-model="shengheform.collateral" :maxlength="20" v-numberOnly>
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
             <el-row>        
                <el-col :span="24" class="moreLength">
                    <el-form-item label="服务类型 ：" :label-width="formLabelWidth" prop="optionsServerArr">
                        <el-checkbox-group v-model="optionsServerArr" >
                            <el-checkbox v-for="obj in optionsServer" :label="obj.code" :key="obj.id" >{{obj.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-row>        
                <el-col :span="24" class="moreLength">
                    <el-form-item label="产品与服务 ：" :label-width="formLabelWidth" prop="optionsProductArr">
                        <el-checkbox-group v-model="optionsProductArr" >
                            <el-checkbox v-for="obj in optionsProductService" :label="obj.code" :key="obj.id" >{{obj.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
             <el-row>    
                <el-col :span="24" class="moreLength">
                    <el-form-item label="会员服务承诺 ：" :label-width="formLabelWidth" prop="otherServiceCode">
                        <el-checkbox-group v-model="otherServiceCode" >
                            <el-checkbox v-for="obj in optionsLogisticsCompany" :label="obj.code" :key="obj.id" >{{obj.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
           
            <div class="data_pic">  
                <!-- <div class="data_pic_default">
                    <img  :src= 'defaultImg'/>
                </div> -->
                <div class="data_pic_img clearfix" v-viewer>
                    <div class="data_pic_yyzz data_pic_c">  
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top" >
                            <img  class="picURL" :src="shengheform.businessLicenceFile ? shengheform.businessLicenceFile : defaultImg"/>
                        </el-tooltip>
                        <h2>营业执照</h2>
                        <el-form-item  prop="radio1" label-width="0">
                            <el-radio-group v-model="radio1">
                                <el-radio label="上传合格">上传合格</el-radio><br />
                                <el-radio label="不清晰">不清晰</el-radio><br />
                                <el-radio label="内容不符">内容不符</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="data_pic_company data_pic_c">   
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top" >
                            <img  class="picURL" :src="shengheform.companyFacadeFile ? shengheform.companyFacadeFile : defaultImg"/>
                        </el-tooltip>
                        <h2>公司或档口照片</h2>
                        <el-form-item  prop="radio2" label-width="0">
                            <el-radio-group v-model="radio2" >
                                <el-radio label="上传合格">上传合格</el-radio><br />
                                <el-radio label="不清晰">不清晰</el-radio><br />
                                <el-radio label="内容不符">内容不符</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="data_pic_callingcode data_pic_c">
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top" >
                            <img  class="picURL" :src="shengheform.takeIdCardFile ? shengheform.takeIdCardFile : defaultImg"/>
                        </el-tooltip>
                        <h2>手持身份证</h2>
                         <el-form-item  prop="radio3" label-width="0">
                            <el-radio-group v-model="radio3">
                                <el-radio label="上传合格">上传合格</el-radio><br />
                                <el-radio label="不清晰">不清晰</el-radio><br />
                                <el-radio label="内容不符">内容不符</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </div>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click="handlerPass">确认审核通过</el-button>
            <el-button @click="handlerOut">审核不通过</el-button>
            <el-button @click="handlerCancel">取 消</el-button>
          </div>
        </el-dialog>
     </div> 

    <createdDialog :paramsView="paramsView" :editType="type"  :dialogFormVisible_add.sync = "dialogFormVisible_add"/>

    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import { eventBus } from '@/eventBus'
import createdDialog from './createdDialog.vue'
import GetCityList from '@/components/GetCityList'
import { data_LogisticsCompanyList, data_ChangeLogisticsCompany } from '@/api/users/logistics/LogisticsCompany.js'
import { data_LogisticsCompany, getDictionary } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import vregion from '@/components/vregion/Region.vue'

export default {
  props: {
  isvisible: {
          type: Boolean,
          default: false
        }
},
  components: {
  createdDialog,
  GetCityList,
  Upload,
  Pager,
  vregion
},
  computed: {
    pictureValue() {
        return [{ name: '营业执照', result: this.radio1 }, { name: '公司或档口照片', result: this.radio2 }, { name: '手持身份证', result: this.radio3 }]
    }
},
    data() {
        const radioValidator = (rule, val, cb) => {
            // console.log(val)
            if (!this.radio1) {
              cb(new Error('请选择营业执照图片质量'))
            } else{
              cb()
            }
        };
        const radioValidator2 = (rule, val, cb) => {
            // console.log(val)
            if (!this.radio2) {
              cb(new Error('请选择公司或档口照片图片质量'))
            } else{
              cb()
            }
        }
        const radioValidator3 = (rule, val, cb) => {
            // console.log(val)
            if (!this.radio3) {
              cb(new Error('请选择手持身份证图片质量'))
            } else{
              cb()
            }
        }

return {
  btnsize: 'mini',
  dialogFormVisible_add: false,
  type: '',
  paramsView: {},
defaultImg:'/static/test.jpg',//默认第一张图片的url
  demoData: '企业货主', // 根据项目要求写死
  options: [], // 货主类型列表
  tableData1: [], // 列表数据
  totalCount: 0, // 总数
  page: 1,
  pagesize: 20,
  formAll: {
              belongCity: null,
              belongCityName: '',
              companyName: '',
              mobile: '',
              authStatus: 'AF0010402', // 待认证的状态码
              isVest: '0'

            },
  formLabelWidth: '120px',
  dialogFormVisible: false, // 认证审核弹框控制
  shengheform: {

            },
  serviceType: 'AF028', // 服务类型
  belongBrand: 'AF029', // 品牌code
  productServiceCode: 'AF027', // 产品与服务code
//   otherServiceCode: 'AF025', // 增值服务code
  otherService: [], // 会员承诺服务
  serviceTypeName: [],
  productService: [],
  optionsLogisticsCompany: [], // 会员服务承诺
  optionsBelongBrand: [], // 品牌类型
  optionsProductService: [], // 产品与服务
  optionsProductArr: [],
  optionsServer: [], // 服务类型
  optionsServerArr: [], //
  otherServiceCode: [], // 选择增值服务
  multipleSelection: {},
  shengheformRules: {
        companyName: { required: true, message: '请输入公司名称', trigger: 'blur' },
        businessLife: { required: true, message: '请输入经营年限', trigger: 'blur' },
        corporation:{required: true, message: '请输入法人/负责人', trigger: 'blur'},
        radio1: { required:true,validator: radioValidator, trigger: 'change' },
        radio2: { required: true,validator: radioValidator2, trigger: 'change' },
        radio3: { required: true,validator: radioValidator3, trigger: 'change' }
    },
  radio1: null,
  radio2: null,
  radio3: null,
  optionsStatus: [
              {
                value: '1',
                name: '是'
              },
              {
                value: '0',
                name: '否'
              }
            ],
  selected: [] // 当前选中内容
}
},
  watch: {
      isvisible: {
          handler(newVal, oldVal) {
              if (newVal && !this.inited) {
                  this.inited = true
                  this.firstblood()
                    this.getMoreInformation()
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
          immediate: true
        },
      otherServiceCode: {
          handler(newVal, oldVal) {
              if (newVal) {
                  this.shengheform.otherServiceCode = JSON.stringify(newVal)
                    console.log('1111', this.shengheform.otherServiceCode)
                  const otherService = []
                    this.optionsLogisticsCompany.find((item) => {
                      this.otherServiceCode.forEach(el => {
                          if (item.code == el) {
                              otherService.push(item.name)
                            }
                        })
                    })

                  this.shengheform.otherService = JSON.stringify(otherService)
                }
            }
        }
    },
    mounted() {
        eventBus.$on('changeList', () => {
            // console.log('44444444444444444')
          this.firstblood()
        })
    },
    methods: {
        regionChange(d) {
            console.log('data:', d)
            this.formAll.belongCityName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
        },
        getValue(obj) {
            return obj ? obj.value : ''
        },
        pushOrderSerial(row) {
          this.type = 'view'
            this.paramsView = row
            this.dialogFormVisible_add = true
        },
        // 判断选中与否
        getSelection(val) {
          console.log('选中内容', val)
          this.selected = val
        },
        handlePageChange(obj) {
          this.page = obj.pageNum
          this.pagesize = obj.pageSize
          this.firstblood()
        },
        getValue(obj) {
            return obj ? obj.value:''
        },
        // changeIMG(event) {
        //     // console.log(event)
        //   this.defaultImg = event.target.src
        // },
        changeList() {
          eventBus.$emit('changeList')
        },
         // 点击选中当前行
        clickDetails(row, event, column) {
          this.$refs.multipleTable.toggleRowSelection(row)
        },
        handleEdit() {
          if (this.selected.length == 0) {
              return this.$message.info('请选择您要操作的用户')
            } else if (this.selected.length > 1) {
              this.$message({
                  message: '每次只能操作单条数据~',
                  type: 'info'
                })
            }else {
                this.shengheform = Object.assign({}, this.selected[0]);
                this.otherServiceCode = this.shengheform.otherServiceCode?  JSON.parse(this.shengheform.otherServiceCode) : [];
                this.optionsServerArr = this.shengheform.serviceType ? JSON.parse(this.shengheform.serviceType) :[];
                this.optionsProductArr = this.shengheform.productServiceCode ? JSON.parse(this.shengheform.productServiceCode) : [];
                this.shengheform.isOpenTms = '0'
                this.dialogFormVisible = true
                // this.defaultImg = this.shengheform.businessLicenceFile ? this.shengheform.businessLicenceFile : this.defaultImg
            }
             // 清除选中状态，避免影响下个操作
          this.$refs.multipleTable.clearSelection()
        },

        // 刷新页面
        firstblood() {
            data_LogisticsCompanyList(this.page, this.pagesize, this.formAll).then(res => {
                console.log(res)
                this.totalCount = res.data.totalCount;
                this.tableData1 = res.data.list;
                // this.inited = true
            })
        },
        // 点击查询按纽，按条件查询列表
        handleSearch(type){
            switch(type){
                case 'search':
                    break;
                case 'clear':
                     this.formAll = {
                        belongCity: null,
                        belongCityName: '',
                        companyName: '',
                        mobile: '',
                        authStatus: 'AF0010402', // 待认证的状态码
                        isVest: '0'
                    }
                    break;
            }
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
            }
            this.firstblood()
        },
         // 获取增值服务
        getMoreInformation() {
             data_LogisticsCompany().then(res => {
              this.optionsLogisticsCompany = res.data
                // console.log('this.options',this.optionsLogisticsCompany)
            })
            Promise.all([getDictionary(this.belongBrand), getDictionary(this.productServiceCode), getDictionary(this.serviceType)]).then(resArr => {
              console.log('resAll', resArr)
              this.optionsBelongBrand = resArr[0].data
                this.optionsProductService = resArr[1].data
                this.optionsServer = resArr[2].data
            })
        },
      completeInfo() {
            if (this.shengheform.belongBrandCode) {
                this.shengheform.belongBrand = this.optionsBelongBrand.find(item => item.code === this.shengheform.belongBrandCode)['name']
            }
            // console.log(this.shengheform.belongBrandCode, this.shengheform.belongBrand)

            const serviceTypeName = []
            let productServiceName = []
            // let otherServiceName =  [];

            this.optionsServerArr.forEach(el => {
              this.optionsServer.forEach(item => {
                  if (el == item.code) {
                      serviceTypeName.push(item.name)
                    }
                })
            })

          this.optionsProductArr.forEach(el => {
              this.optionsProductService.forEach(item => {
                  if (el == item.code) {
                      productServiceName.push(item.name)
                    }
                })
            })

            // this.otherServiceCodeArr.forEach(el=>{
            //     this.optionsOtherService.forEach(item => {
            //         if(el == item.code){
            //             otherServiceName.push(item.name)
            //         }
            //     })
            // })

            // 服务类型
            this.shengheform.serviceType = JSON.stringify(this.optionsServerArr)                         
            this.shengheform.serviceTypeName = JSON.stringify(serviceTypeName)
            //产品与服务
            this.shengheform.productServiceCode = JSON.stringify(this.optionsProductArr)                         
            this.shengheform.productService = JSON.stringify(productServiceName)
            //增值服务
            // this.shengheform.otherServiceCode = JSON.stringify(this.otherServiceCodeArr);                         
            // this.shengheform.otherService = JSON.stringify(otherServiceName);
        },
        // 审核不通过
        handlerOut() {
          this.$refs['shengheform'].validate((valid) => {
              if (valid) {
                  const item = this.shengheform.mobile;
                    this.$confirm('确定要不通过' + item + '该用户吗？', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                        this.completeInfo()
                        var forms = Object.assign({}, this.shengheform, { authStatus: 'AF0010404', authStatusName: '认证不通过' }, { authNoPassCause: JSON.stringify(this.pictureValue) })
                        data_ChangeLogisticsCompany(forms).then(res => {
                            this.$message({
                                type: 'success',
                                message: '该用户未通过审核',
                                duration: 2000
                            })
                            this.handlerCancel();
                            this.changeList();
                            this.firstblood();
                        }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + err.text ? err.text : err,
                            })
                        })
                    }).catch(() => {
                      this.$message({
                          type: 'info',
                          message: '已取消'
                        })
                    })
                } else {
                  this.$message.error('审核未通过需资料图片全部未合格！')
                  return false
                }
            })
        },
        // 审核通过
        handlerPass() {
            let ifQualified = true
            this.pictureValue.forEach((el, idx) => {
                if (el.result != '上传合格') {
                    ifQualified = false
                }
            })
            this.$refs['shengheform'].validate((valid) => {
                if (valid && ifQualified) {
                    this.completeInfo()
                    var forms = Object.assign({}, this.shengheform, { authStatus: 'AF0010403', authStatusName: '已认证' }, { authNoPassCause: JSON.stringify(this.pictureValue) })
                    // console.log(forms)
                    data_ChangeLogisticsCompany(forms).then(res => {
                        // this.$alert('操作成功', '提示', {
                        //     confirmButtonText: '确定',
                        //     callback: action => {
                                this.handlerCancel();
                                this.changeList();
                                this.firstblood();
                                  this.$message({
                            type: 'success',
                            message: '操作成功~'
                        })
                        //     }
                        // })
                    }).catch(err => {
                        this.dialogFormVisible = true
                        this.$message({
                          type: 'info',
                          message: '删除失败，原因：' + err.text ? err.text : err
                        })
                    })
                }else {
                  this.$message.error('审核未满足通过要求,资料图片未合格')
                  return false
                }
            })
        },
        handlerCancel() {
            this.dialogFormVisible = false;
            this.radio1 = '';
            this.radio2 = '';
            this.radio3 = '';
            this.$refs.shengheform.resetFields();
        }
    }
}
</script>
<style lang="scss">
    .shenghedialog{
        width: 100%;
        img{
            cursor: pointer;
        }
        .data_pic{
            margin: 0 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ccc;
            .data_pic_default{
                height: 410px;
                margin-bottom: 15px;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .data_pic_img{
                display: flex;
            }
            .data_pic_c{
                flex: 1;
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
            .data_pic_company{
                margin: 0 2%;
            }
        }

        .el-checkbox-group{
            .el-checkbox{
                margin: 0px 30px 0 0;
            }
        }

        .el-radio-group{
            margin-left: 0;
        }
    }
</style>

