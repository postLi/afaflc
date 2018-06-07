<template>
     <div class="addclassify commoncss">
      <!-- <el-button :type="type"  @click="openDialog()" :value="value">{{text}}</el-button>    -->

      <el-button :type="type" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{text}}</el-button>
      <el-dialog :title="title" :visible="dialogFormVisible_add" :before-close="change" :modal=false>
        <el-form :model="xinzengform" ref="xinzengform">
          <el-row>
            <el-col :span="12">
              <el-form-item label="货主类型:" :label-width="formLabelWidth" required>
                <el-select v-model="xinzengform.shipperType" placeholder="请选择">
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
            <el-col :span="12">
              <el-form-item label="手机号码:" :label-width="formLabelWidth" required>
                <el-input v-model="xinzengform.mobile" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人:" :label-width="formLabelWidth">
                <el-input v-model="xinzengform.contacts" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在地:" :label-width="formLabelWidth" required>
                <el-cascader
                  :options="areadata"
                  :props="props"
                  v-model="belongCity"
                  @active-item-change="handleChange">
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="详细地址:" :label-width="formLabelWidth">
                <el-input :maxlength="20" v-model="xinzengform.address" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司名称:" :label-width="formLabelWidth" v-show="companyFlag">
                <el-input :maxlength="20" v-model="xinzengform.companyName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
            <el-form-item label="统一社会信用代码:" :label-width="formLabelWidth" v-show="companyFlag">
              <el-input :maxlength="20" v-model="xinzengform.creditCode"></el-input>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="上传营业执照照片:" :label-width="formLabelWidth" v-show="companyFlag">
                <!-- <div class="completeinfo">
                  <div class="detailinfo">
                    <p>上传营业执照照片 ：</p> -->
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="xinzengform.businessLicenceFile" />
                  <!-- </div>
                </div> -->
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="9">
              <el-form-item label="上传公司或者档口照片:" :label-width="formLabelWidth" v-show="companyFlag">
                <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="xinzengform.companyFacadeFile" />
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="9">
              <el-form-item label="上传发货人名片照片:" :label-width="formLabelWidth" v-show="companyFlag">
                <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="xinzengform.shipperCardFile" />
              </el-form-item>
            </el-col>
          </el-row>
          
        </el-form>
        <!-- <div class="completeinfo" v-show="companyFlag">
            <div class="detailinfo">
                <p>上传营业执照照片:</p>
                <el-upload
                  class="upload-demo"
                  action="#"
                  accept="image/JPG,image/JPEG,image/PNG"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList2"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传JPG/PNG/JPEGp的一种格式，且不超过5M</div>
                </el-upload>
            </div>
        </div> -->
        

        <!-- <div class="completeinfo" v-show="companyFlag">
            <div class="detailinfo">
                <p><span>* </span>上传公司或者档口照片:</p> -->
                <!-- <el-upload
                  class="upload-demo"
                  action="#"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList3"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload> -->
                 <!-- <upload class="licensePicture" tip="（必须为jpg/png并且小于1M）" v-model="xinzengform.servicePic1" /> -->
            <!-- </div>
        </div>
          <div class="completeinfo" v-show="companyFlag">
            <div class="detailinfo">
                <p><span>* </span>上传发货人名片照片:</p> -->
                <!-- <el-upload
                  class="upload-demo"
                  action="#"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList4"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传JPG/PNG/JPEGp的一种格式，且不超过5M</div>
                </el-upload> -->
                 <!-- <upload class="licensePicture" tip="（必须为jpg/png并且小于1M）" v-model="xinzengform.servicePic2"> -->
            <!-- </div>
        </div> -->
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit" v-show="editType!='view'">确 定</el-button>
          <el-button @click="dialogFormVisible_add = false" v-show="editType!='view'">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import {data_get_shipper_type,data_get_shipper_create,data_Area,data_get_shipper_change,data_get_shipper_view,data_GetCityList} from '../../../api/users/shipper/all_shipper.js'
export default {
  components:{
    Upload
  },
  props:{
    params:{
      type:Object
    },
    value:{
      type: String,
      default:''
    },
    btntype: {
      type: String,
      default: ''
    },
    btntext: {
      type: String,
      default: ''
    },
    btntitle: {
    type: String,
    default: ''
    },
    icon:{
      type: String,
      default: ''
    },
    plain:{
      type: Boolean,
      default: false
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
      default: ''
    }
  },
  data(){
    return{
      // fileList4:[],
      // fileList3:[],
      // fileList2:[],
      dialogFormVisible_add: false,
      type:'primary',
      title:'',
      text:'',
      citylist:[],
      options:[],
      belongCity: [],
      areadata:[],  
      formLabelWidth:'120px',
      companyFlag:false,
      xinzengform:{
        shipperType:null,
        belongCity:null,
        mobile:null,
        contacts:null,
        address:null,
        companyName:null,
        creditCode:null,
        businessLicenceFile:'',
        shipperCardFile:'',
        companyFacadeFile:'',
        shipperId:''
      },
      currentRow: null,
      props: {
        label: 'name',
        children: 'children',
        value:'code'
      },
    }
  },
  watch:{
    'xinzengform.shipperType': {
     handler: function(val, oldVal) {
       console.log(val)
      if(val==='AF0010202'){
        this.companyFlag= true
      }else{
        this.companyFlag=false
      }
     },
     deep:true
    },
    belongCity(newVal){
      this.xinzengform.belongCity = newVal.join(',')
    }
  },
  mounted(){
    //按钮类型text,primary...
    this.type = this.btntype;
    //按钮文本内容
    this.text = this.btntext;
    //弹出框标题
    this.title = this.btntitle;
    this.getMoreInformation()
    this.getArea()
  },
  methods:{
    setCurrent(row) {
			this.$refs.singleTable.setCurrentRow(row);
		},
    // 获取省份数据
    getArea(){
      data_Area().then(res=>{
        this.areadata = res.data.list.map(el => {
          el.children = []
          return el
        })
        // console.log(res)
        this.provinceId = this.areadata[0].code;
      })
    },

    openDialog(){
      if(this.editType==='add'||this.editType==='view'){
        this.dialogFormVisible_add=true
      } else if(this.editType==="edit"){
          // console.log(this.params)
          if(this.params.address){
            this.dialogFormVisible_add=true
          } else{
            this.$message.error('必须选中一个才可操作')
          }
        // this.dialogFormVisible_add=true 
      }
      
      if(this.params){
       var obj = JSON.parse(JSON.stringify(this.params));
        this.xinzengform.shipperType=obj.shipperType
        //this.xinzengform.shipperType= "AF0010202"
        //this.xinzengform.shipperTypeName=obj.shipperTypeName
        this.xinzengform.belongCity=obj.belongCity
        this.xinzengform.mobile=obj.mobile
        this.xinzengform.contacts=obj.contacts
        this.xinzengform.address=obj.address
        this.xinzengform.companyName=obj.companyName
        this.xinzengform.creditCode=obj.creditCode
        this.xinzengform.businessLicenceFile=obj.businessLicenceFile
        this.xinzengform.companyFacadeFile=obj.companyFacadeFile
        this.xinzengform.shipperCardFile=obj.shipperCardFile
        this.xinzengform.shipperId=obj.shipperId
      }else{
        this.xinzengform.shipperType=null
        this.xinzengform.belongCity=null
        this.xinzengform.mobile=null
        this.xinzengform.contacts=null
        this.xinzengform.address=null
        this.xinzengform.companyName=null
        this.xinzengform.creditCode=null
        this.xinzengform.businessLicenceFile=null
        this.xinzengform.companyFacadeFile=null
        this.xinzengform.shipperCardFile=null
        this.xinzengform.shipperId=null     
      }
    },
    change() {
      this.dialogFormVisible_add = !this.dialogFormVisible_add;
    },
    //获取货主类型
    getMoreInformation(){
      data_get_shipper_type().then(res=>{
        // console.log(res)
        res.data.map((item)=>{
          this.options.push(item)
        })
      })
    },
    
    // 保存
    onSubmit(){
      this.$refs['xinzengform'].validate((valid)=>{
        if(valid){
          var form={
            xinzengform: this.xinzengform
          }
          console.log('onSubmit',form)
          if(this.editType === 'add'){
            // 新增
            data_get_shipper_create(this.xinzengform).then(res=>{
              // console.log(res)
              this.dialogFormVisible_add = !this.dialogFormVisible_add;
              this.$message.success('保存成功')
              this.$emit('getData')
            }).catch(err=>{
              console.log(err)
            })
          }else if(this.editType === 'edit'){
            // 修改
            data_get_shipper_change(this.xinzengform).then(res=>{
              // console.log(res)
              this.dialogFormVisible_add = !this.dialogFormVisible_add;
              this.$message.success('修改成功')
              this.$emit('getData')
            }).catch((err)=>{
              console.log(err)
           })
          } 
        }
      })
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },

    // 所在地
    handleChange(value){
      console.log(value)
      data_GetCityList(value[0]).then(res=>{
        this.areadata = this.areadata.map(el => {
          if(el.code === value[0]){
            el.children = res.data.list
          }
          return el
        })
        this.citylist = res.data.list;
      })
      return []
    }
  }
}
</script>
<style lang="scss">
.addclassify{
  display: inline-block;
}
  .el-dialog{
    .el-dialog__body{
      .licensePicture{
        width: 180px;
        height: 116px;
        line-height: 1.2;
        display: inline-block;
        .el-upload-dragger{
          width: 180px;
          height: 116px;
          .el-icon-upload{
            margin: 15px 0 16px;
          }
          .el-upload__text{
            font-size: 12px;
          }
        }
      }
    }
  }
</style>



