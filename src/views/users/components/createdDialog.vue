<template>
     <div class="addclassify commoncss">
      <el-button :type="type" @click="openDialog()" :value="value">{{text}}</el-button>   
      <el-dialog :title="title" :visible="dialogFormVisible_add" :before-close="change">
        <el-form :model="xinzengform" ref="xinzengform">
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
          <el-form-item label="手机号码:" :label-width="formLabelWidth" required>
            <el-input v-model="xinzengform.mobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人:" :label-width="formLabelWidth">
            <el-input v-model="xinzengform.contacts" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所在地:" :label-width="formLabelWidth" required>
            <el-cascader
              :options="options2"
              v-model="xinzengform.belongCity"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址:" :label-width="formLabelWidth">
            <el-input :maxlength="20" v-model="xinzengform.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="公司名称:" :label-width="formLabelWidth" v-show="companyFlag">
            <el-input :maxlength="20" v-model="xinzengform.companyname"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码:" :label-width="formLabelWidth" v-show="companyFlag">
            <el-input :maxlength="20" v-model="xinzengform.creditCOde"></el-input>
          </el-form-item>
        </el-form>

        <div class="completeinfo" v-show="companyFlag">
            <div class="detailinfo">
                <p>上传营业执照照片:</p>
                <el-upload
                  class="upload-demo"
                  action="#"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList2"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </div>
        </div>

        <div class="completeinfo" v-show="companyFlag">
            <div class="detailinfo">
                <p><span>* </span>上传公司或者档口照片:</p>
                <el-upload
                  class="upload-demo"
                  action="#"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList3"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </div>
        </div>
          <div class="completeinfo" v-show="companyFlag">
            <div class="detailinfo">
                <p><span>* </span>上传发货人名片照片:</p>
                <el-upload
                  class="upload-demo"
                  action="#"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList4"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit">确 定</el-button>
          <el-button @click="dialogFormVisible_add = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import {data_get_shipper_type,data_get_shipper_create} from '../../../api/users/shipper/all_shipper.js'
export default {
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
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
      default: ''
    }
  },
  data(){
      return{
        fileList4:[],
        fileList3:[],
        fileList2:[],
        dialogFormVisible_add: false,
        type:'primary',
        title:'',
        text:'',
        options:[],
        options2:[],  
        formLabelWidth:'150px',
        companyFlag:false,
        xinzengform:{
          shipperType:null,
          belongCity:null,
          mobile:'',
          contacts:'',
          address:'',
          companyname:'',
          creditCOde:''
        }  
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
  },
  methods:{
    openDialog(){
      this.dialogFormVisible_add=true
    },
    change() {
      this.dialogFormVisible_add = !this.dialogFormVisible_add;
    },
    //获取货主类型
    getMoreInformation(){
      data_get_shipper_type().then(res=>{
        console.log(res)
        res.data.map((item)=>{
          this.options.push(item)
        })
      })
    },
    onSubmit(){
      this.$refs['xinzengform'].validate((valid)=>{
        if(valid){
          var form={
            xinzengform: this.xinzengform
          }
          console.log('onSubmit',form)
          data_get_shipper_create(this.xinzengform).then(res=>{
            console.log(res)
            this.dialogFormVisible_add = !this.dialogFormVisible_add;
            if(res.data.status== '200'){
              this.$message.success('保存成功')
            }
          })
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange(value){
      console.log(value)
    }
  }
}
</script>

