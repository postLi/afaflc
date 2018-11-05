
<template>
  <div id="checkboxCityList">
    <div  v-if="dialog_add"  class="dialog_div" id="divArea" :style="{top:positiondata.top +'px'}">
         <el-tree
                 ref="treeForm"        
                 show-checkbox
                :data="cityTree"
                 node-key="code"
                :props="defaultProps"
                :check-strictly="treestatus"
                :default-expand-all='treestatus'
                :highlight-current = "true"
                @check-change="handleClick" 
                @check="check"
                 accordion
                >
         </el-tree>
    </div>
  </div>
</template>
<script>

import { aflcAreaCode } from '@/api/common.js'
export default {
  name: 'getCityList',
  props: {
    disabled: {
      type: Boolean
    },
    positiondata:[String, Array,Object],
    value: [String, Array]
  },
  data() {
    return {
      selectedOptions: [],
      dialog_add:false,
      treestatus:false,
      cityTree: [],
      fromdata:[],
      props: {
        label: 'name',
        value: 'code',
        children: 'children'
      },
       defaultProps: {
                  children: 'children',
                  label: 'name'
       },
      fromItem:{
      ItemDataProvince:'',
      ItemDataCity:'',
      ItemDataName:'',
      ItemDataCode:'',
      },
      cityStatus:{
        name:null,
      }
    }
  },
  methods: {
    open(){
    this.dialog_add = true;
    },
    close(){
    this.dialog_add = false;
    },
    init() {
      aflcAreaCode().then(res => {
        this.cityTree = res.data
      })
    },
    handleClick(data,val,dom){
      var val_v = val
      if(!val_v){
      this.fromdata = []
      }
      if(data.children){
              if(val == true&&data.children.length>0){
                this.$refs.treeForm.setCheckedNodes([data]);
              }
              }
      if(this.$refs.treeForm.getCheckedNodes().length>0){
      if(this.$refs.treeForm.getCheckedNodes()[0].pid =='-1')
      {
              if(val_v)
              {
              let data1 =  this.$refs.treeForm.getCheckedNodes()
              this.fromdata = data1
              }
      }
      else{
              let data2 =  this.$refs.treeForm.getCheckedNodes()
              if(this.$refs.treeForm.getHalfCheckedNodes().length>1){
              data2.splice(0,0,this.$refs.treeForm.getHalfCheckedNodes()[0],this.$refs.treeForm.getHalfCheckedNodes()[1])
              }
              else{
              data2.splice(0,0,this.$refs.treeForm.getHalfCheckedNodes()[0])
              }
              this.fromdata = data2
      }
      }
       this.afterData()
      },
      check(i,j,k,z){
        var _this = this
        console.log('0',i,j,k,z)
        if(i.pname==_this.cityStatus.name){
          _this.cityStatus.name = i.pname
        }
        else{
        _this.cityStatus.name = i.pname
        _this.$refs.treeForm.setCheckedNodes([i]);
        }
      },
      afterData(){
      if(this.fromdata.length>0){
      let Name = []
      let Code = []
      for(var i = 2;i<this.fromdata.length;i++)
      {
        Name.push(this.fromdata[i].name)
      }
      for(var i = 2;i<this.fromdata.length;i++)
      {
        Code.push(this.fromdata[i].code)
      }
      this.fromItem={
      ItemDataProvince:this.fromdata[0].name,
      ItemDataCity:this.fromdata[1].name,
      ItemDataName: Name.join(','),
      ItemDataCode: Code.join(','),
      }
      }
      else{
      this.fromItem={
      ItemDataProvince:'',
      ItemDataCity:'',
      ItemDataName:'',
      ItemDataCode: '',
      }        
      }
      this.returnArr()
    },
    returnArr() {
      this.$emit('returnStr', this.fromItem)
    },
    clearData(){
      this.fromItem={
      ItemDataProvince:'',
      ItemDataCity:'',
      ItemDataName:'',
      ItemDataCode: '',
      }     
    },
  },
  updated(){
  },
  mounted() {
    this.init()
    
},
updated(){
  
}
}
</script>

<style rel="stylesheet/scss" lang="scss" >
#checkboxCityList{
  .dialog_div{position: absolute;left:0px;background:#fff;z-index: 1000000;width: 200px;overflow-x: auto;padding: 10px 0px;
      border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .add_box{
    text-align: right
  }
        .el-tree-node__content{
        .el-checkbox{
            display: none;
        }
        }
        .el-tree-node__children{
            .el-checkbox{
                display: block
            }
        }
}

</style>

