
<template>
  <div class="checkboxCityList">
    <el-input placeholder="" v-model="this.fromItem.ItemDataName" @focus='open' id="inputArea"></el-input>
    <div v-if="dialog_add" class="dialog_div" id="divArea">
      <div id="divArea_close"><span @click="close">x</span></div>
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
      cityStatus:{}
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
      let datas = []
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
              if(this.$refs.treeForm.getHalfCheckedNodes()[1]){
              data2.splice(0,0,this.$refs.treeForm.getHalfCheckedNodes()[0],this.$refs.treeForm.getHalfCheckedNodes()[1])
              }
              else{
              data2.splice(0,0,this.$refs.treeForm.getHalfCheckedNodes()[0],data)  
              }
              this.fromdata = data2
      }
      }
       this.afterData()
      },
      check(i,j,k,z){
        var _this = this
        if(j.halfCheckedNodes.length<1){
          _this.$refs.treeForm.setCheckedNodes();
        }
        else if(j.halfCheckedNodes.length>1&&j.halfCheckedNodes.length<3){
        if(j.halfCheckedNodes[1].name==_this.cityStatus.name)
        {
          _this.cityStatus = _this.$refs.treeForm.getHalfCheckedNodes()[1]
        }
        else{
          _this.cityStatus = _this.$refs.treeForm.getHalfCheckedNodes()[1]
          _this.$refs.treeForm.setCheckedNodes([i]);
        }
        }
        else{
          _this.$refs.treeForm.setCheckedNodes([i]);
          _this.cityStatus = _this.$refs.treeForm.getHalfCheckedNodes()[1]
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
    }
  },
  mounted() {
    this.init()
    var _this = this
},
updated(){
  
}
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.checkboxCityList{
  position: relative;
  width: 100%;
  .dialog_div{position: absolute;top:40px;left:0px;background:#fff;z-index: 100;width: 100%;overflow-x: auto;padding-bottom: 10px;
        #divArea_close{text-align: right;margin:3px 3px;display:flex;justify-content: flex-end;
            span{display: inline-block;width: 15px;height: 15px;text-align: center;line-height: 12px;border:1px #bbb solid;border-radius: 50%;font-size: 13px;cursor: pointer;background: #eee;
            &:hover{background: #bbb}
            }
        }
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

