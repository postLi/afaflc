<template>
<!-- 新增分类信息 -->
    <div class="orderObtain commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false"  :visible="dialogFormVisible" @close="close">
            <div class="chooseArea">
                <p><span>* </span>选择区域 ：</p>
                <getCityList class="chooseItem" v-model="forms.areaCode" ref="area"></getCityList>
            </div>
            <div class="chooseServer chooseStyle">
                <p><span>* </span>选择服务类型 ：</p>
                <el-select v-model="forms.serivceCode" clearable placeholder="请选择">
                    <el-option
                        v-for="item in optionsService"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                    </el-option>
                </el-select>
            </div>
            <div class="chooseCarType chooseStyle">
                <p><span>* </span>选择用车类型 ：</p>
                <el-select v-model="forms.carType" clearable placeholder="请选择">
                    <el-option
                        v-for="item in optionsCarType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                    </el-option>
                </el-select>
            </div>
            <div class="ifBang"  v-for="(form,keys) in ifMoreForms" :key='keys'>
                <p class="needMoreWidth"><span>* </span>第{{keys+1}}轮中单公布时间及距离</p>
                <div class="publishSet">
                    <div class="chooseTime publishStyle">
                        <span>公布中单时间 ：</span>
                        <el-input v-model="form.time" placeholder="请输入" maxlength="4" clearable ref="times" v-number-only:point></el-input>
                        <span> / 秒</span>
                    </div>
                    <div class="chooseKM publishStyle">
                        <span>公布中单距离 ：</span>
                        <el-input v-model="form.km" placeholder="请输入" maxlength="4" v-number-only:point clearable></el-input>
                        <span>  / 公里</span>
                    </div>
                </div>
                <span  @click="addItem" class="addItem" v-if="keys == 0">
                </span>
                <span  @click="reduceItem(keys)" class="reduceItem" v-else>
                </span>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="newInfoSave">保 存</el-button>
                <el-button @click="closeAddNewInfo">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import getCityList from '@/components/GetCityList/index'
import { data_CarList,data_ServerClassList } from '@/api/common.js'
import { data_NewData } from '@/api/dispatch/OrderObtain.js'


export default {
    name: 'addClassfy',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true
        }
    },
    components:{
        getCityList,
    },
    data() {
      return {
        ifMoreForms:[
          {
              time:null,
              km:null
          }  
        ],
        forms:{
            areaCode:null,//地区code
            areaCodeName:null,
            serivceCode:null,//服务类型
            serivceCodeName:null,
            carType:null,//货主用车类型
            carTypeName:null,
            obtainKmList:null,//中单时间
            obtainTimeList:null,//中单距离
        },
        optionsService:null,//服务选项
        optionsCarType:null,//车辆类型选项
        information:null,
    //可见车主类型
        optionsStatus:[
            {
                value:'1',
                name:"启用"
            },
                {
                value:'0',
                name:"禁用"
            }
        ]
      };
    },
    watch:{
        
    },
    mounted(){
        this.init();
    },
    methods: {
        
        close(){
            this.$emit('update:dialogFormVisible',false)
        },
        //初始化选择项数据
        init(){
             return Promise.all([data_CarList(), data_ServerClassList()]).then(resArr => {
                 console.log(resArr)
                 this.optionsCarType = resArr[0].data;
                 this.optionsService =resArr[1].data;
            }).catch(err => {
                
            })
        },
        //保存
        newInfoSave(){
            this.completeData();

            // this.forms.areaCode = this.$refs.area.selectedOptions.pop();
            if(!this.forms.areaCode){
                return this.$message({
                    type: 'warning',
                    message: '请选择地区~'
                })
            }
            else if(!this.forms.serivceCode){
                return this.$message({
                    type: 'warning',
                    message: '请选择服务类型~'
                })
            }
            else if(!this.forms.carType){
                return this.$message({
                    type: 'warning',
                    message: '请选择车辆类型~'
                })
            }
            else if(!this.forms.obtainKmList){
                return this.$message({
                    type: 'warning',
                    message: '公布中单时间必填且为数字整数~'
                })
            }
            else if(!this.forms.obtainTimeList){
                return this.$message({
                    type: 'warning',
                    message: '公布距离必填且为数字整数~'
                })
            }
            else{
                data_NewData(this.forms).then(res=>{
                    console.log(res)
                    this.$alert('操作成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$emit('renovate');
                            this.closeAddNewInfo();
                        }
                    });
                }).catch( err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.text ? err.text : err
                    })
                })
            }
            // console.log(this.forms)
        },
        //关闭清空
        closeAddNewInfo(){
            this.close();  
            this.clearForms();
        },
        clearForms(){
            this.forms = {
                areaCode:null,//地区code
                areaCodeName:null,
                serivceCode:null,//服务类型
                serivceCodeName:null,
                carType:null,//货主用车类型
                carTypeName:null,
                obtainKmList:null,//中单时间
                obtainTimeList:null,//中单距离
            };
            
            if(this.$refs.area.selectedOptions){
                this.$refs.area.selectedOptions = [];
            }
        },
         //添加子节点新增
        addItem(){
            this.ifMoreForms.push({
                time:null,
                km:null
            }); 
        },
        //删除子节点新增
        reduceItem(idx){
            console.log(idx)
            this.ifMoreForms.splice(idx,1);
        },
        //完善数据
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
                        this.forms.areaCode = item.code;
                        this.forms.areaCodeName = item.name;
                    }
                })
            }else{
                this.$refs.area.areaData.forEach((item) =>{
                    if(item.code == this.$refs.area.selectedOptions[0]){
                        this.forms.areaCode = item.code;
                        this.forms.areaCodeName = item.name;
                    }
                })
            }
            //筛选获取服务和车类型name
            if(this.forms.serivceCode){
                this.forms.serivceCodeName = this.optionsService.find(item => item.code === this.forms.serivceCode)['name'];
            }
            if(this.forms.carType){
                this.forms.carTypeName = this.optionsCarType.find(item => item.code === this.forms.carType)['name'];
            }

            console.log(this.ifMoreForms)
            
            let TimeList = [];
            let KmList = [];
            
            this.ifMoreForms.forEach( el => {
                TimeList.push(el.time);
                KmList.push(el.km)
            })

            this.forms.obtainTimeList = TimeList.join(',');
            this.forms.obtainKmList = KmList.join(',');
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .orderObtain{
        .el-dialog__wrapper{
            .el-dialog{
                width: 810px;
                .el-dialog__body{
                    border-bottom:1px solid #ccc;   
                    margin-bottom: 0; 
                    margin: 0 25px;
                    p{
                        display: inline-block;
                        font-size: 12px;
                        line-height: 20px;
                        color: #666666;
                        width: 100px;
                        text-align: right;
                        span{
                            color: red;
                        }
                    }
                    .chooseArea{
                        .chooseItem{
                            display: inline-block;
                            .el-input{
                                width: 200px;
                            }
                        }
                    }
                    .chooseStyle{
                        display: inline-block;
                        margin: 5px 0;
                        margin-right: 70px;
                        .el-select{
                            .el-input{
                                width: 200px;
                            }
                        }
                    }
                    .ifBang{
                        position: relative;
                        .needMoreWidth{
                            display: block;
                            width: 150px;
                            margin: 10px 0;
                        }
                        .publishSet{
                            border: 1px solid #ccc;
                            margin: 5px 50px;
                            padding: 10px;
                            .publishStyle{
                                display: inline-block;
                                width: 47%;
                                .el-input{
                                    width: 38%;
                                    .el-input__inner{
                                        height: 30px;
                                        line-height: 30px;
                                    }
                                }
                                span{
                                    font-size: 12px;
                                    line-height: 20px;
                                    color: #666666;
                                    text-align: right;
                                }
                            }
                            .chooseTime{
                                margin-left: 30px; 
                            }
                        }
                        .addItem,.reduceItem{
                            top: 30px;
                            left: 96%;
                        }
                    }
                }
            }
        }
    }
</style>
