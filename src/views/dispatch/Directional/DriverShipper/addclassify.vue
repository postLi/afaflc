<template>
    <div>
        <!-- 新增分类信息 -->
            <div class="shipperOfdispatch commoncss">
                <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisible" @close="close">
                    
                    <div class="bindLeft  bind">
                        <div class="chooseBindTime">
                            <p><span>* </span>绑定开始时间 ：</p>
                            <el-date-picker
                            v-model="forms.bindingStartDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="timestamp">
                            </el-date-picker>
                        </div>
                        <div class="chooseShipper chooseCommon">
                            <p><span>* </span>选择货主账号 ：</p>
                            <div class="chooseItem">
                                <el-input v-model="filterOptionsShipper.search" placeholder="请输入内容" ref="filterOptionsShipper"></el-input>
                                <el-checkbox-group v-model="checkListShpper" >
                                    <el-checkbox v-for="obj in optionsShipper" :label="obj" :key="obj.shipperId" >{{obj.label}}</el-checkbox>
                                </el-checkbox-group>
                            </div>  
                        </div>
                    </div>
                    <div class="bindright  bind">
                        <div class="chooseBindTime">
                            <p><span>* </span>绑定结束时间 ：</p>
                            <el-date-picker
                            v-model="forms.bindingEndDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="timestamp">
                            </el-date-picker>
                        </div>
                        <div class="chooseShipper chooseCommon">
                            <p><span>* </span>选择车主账号 ：</p>
                            <div class="chooseItem">
                                <el-input v-model="filterOptionsCar.search" placeholder="请输入内容" ref="filterOptionsCar"></el-input>
                                <el-checkbox-group v-model="checkListCar">
                                    <el-checkbox v-for="obj in optionsCar" :label="obj" :key="obj.driverId" >{{obj.label}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="newInfoSave">保 存</el-button>
                    <el-button @click="closeAddNewInfo">取 消</el-button>
                    </div> 
                </el-dialog>
            </div>

    </div>
</template>

<script>

import { data_findAflcDriverList,data_findAflcShipperList,data_NewData } from '@/api/dispatch/Directional.js'


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
    },
    data() {
      return {
        forms:{
            bindingStartDate:'',//绑定开始时间
            bindingEndDate:'',//绑定结束时间
            driverId:'',//车主
            driverName:'',//
            driverPhone:'',//
            shipperId:'',//货主
            shipperName:'',//
            shipperPhone:'',//
        },
        searchInfo:'暂无此内容查看',
        optionsShipper:[],//选择货主
        optionsCar:[],//选择车主
        optionsVisualCarType:[],
        checkListShpper:[],//货主选中内容
        checkListCar:[],//车主选中内容
        filterOptionsShipper:{
            search:''
        },//筛选货主
        information:'',
        filterOptionsCar:{
            search:''
        },//筛选车主
      };
    },
    computed: {
        startTimeStatus() {
    　　　　return this.forms.bindingStartDate
    　　},
        endTimeStatus() {
    　　　　return this.forms.bindingEndDate
    　　},

    },
    watch:{
        filterOptionsShipper:{
            handler(val, oldVal){
                this.getAflcShipperList();
            },
            deep:true
        },
        filterOptionsCar:{
            handler(val, oldVal){
                this.getAflcDriverList();
            },
            deep:true
        },
        startTimeStatus(newValue, oldValue) {
            this.ifWrong();
    　　},
        endTimeStatus(newValue, oldValue) {
            this.ifWrong();
    　　},
    },
    mounted(){
        this.init();
    },
    methods: {
        //验证time
        ifWrong(){
            if(!this.forms.bindingStartDate || !this.forms.bindingEndDate){
                return
            }else{
                if(this.forms.bindingStartDate  > this.forms.bindingEndDate){
                    
                    this.$message({
                        type: 'warning',
                        message: '绑定结束时间怎么能比绑定开始早呢！~'
                    })
                    this.forms.bindingStartDate = '';
                    this.forms.bindingEndDate = '';
                }
            }
        },
        close(){
            this.$emit('update:dialogFormVisible',false)
        },
        //初始化选择项数据
        init(){
             this.getAflcDriverList();
             this.getAflcShipperList();
        },
        getAflcDriverList(){
            data_findAflcDriverList(this.filterOptionsCar).then(res=>{
                this.optionsCar = res.data;
                if(res.data.length == 0){
                    this.$message({
                        type: 'warning',
                        message: '操作错误：' + this.searchInfo
                    })
                    this.filterOptionsCar.search = '';
                    this.$refs.filterOptionsCar.focus();
                }else{
                    this.optionsCar.map(el=>{
                        el.label =  el.driverName +'/'+el.driverMobile;
                    })
                }
            })
        },
        getAflcShipperList(){
            data_findAflcShipperList(this.filterOptionsShipper).then(res=>{
                this.optionsShipper = res.data;
                if(res.data.length == 0){
                    this.$message({
                        type: 'warning',
                        message: '操作错误：' + this.searchInfo
                    })
                    this.filterOptionsShipper.search = '';
                    this.$refs.filterOptionsShipper.focus();
                }else{
                    this.optionsShipper.map(el=>{
                        el.label =  el.contacts +'/'+el.mobile;
                    })
                }

            }).catch(err => {
                 this.$message({
                        type: 'warning',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
            })
        },
        newInfoSave(){
            // console.log(this.forms)
            //货主
            let shipperId = [];
            let shipperName = [];
            let shipperPhone = [];
            this.checkListShpper.forEach( el => {
                shipperId.push(el.shipperId)
                shipperName.push(el.contacts)
                shipperPhone.push(el.mobile)
            })
            this.forms.shipperId =  shipperId.join(',');
            this.forms.shipperName =  shipperName.join(',');
            this.forms.shipperPhone =  shipperPhone.join(',');

            //车主
            let driverId = [];
            let driverName = [];
            let driverMobile = [];
            this.checkListCar.forEach( el => {
                driverId.push(el.driverId)
                driverName.push(el.driverName)
                driverMobile.push(el.driverMobile)
            })
            
            this.forms.driverId =  driverId.join(',');
            this.forms.driverName =  driverName.join(',');
            this.forms.driverPhone =  driverMobile.join(',');

            if(!this.forms.bindingStartDate){
                return this.$message({
                    type: 'warning',
                    message: '请填写绑定开始时间~'
                })
            }
            else if(!this.forms.bindingEndDate){
                return this.$message({
                    type: 'warning',
                    message: '请填写绑定结束时间~'
                })
               
            }
            else if(this.checkListShpper.length == 0){
                return this.$message({
                    type: 'warning',
                    message: '请选择至少一个货主账号~'
                })
            }
            else if(this.checkListCar.length == 0){
                return this.$message({
                    type: 'warning',
                    message: '请选择至少一个车主账号~'
                })
                
            }
            else{
                data_NewData(this.forms).then(res=>{
                     this.$alert('操作成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$emit('renovate');
                            this.clearForms();
                        }
                    });
                }).catch( err => {
                    this.$message({
                        type: 'warning',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                })
            }
        },
        closeAddNewInfo(){
            this.close();  
            this.clearForms();
        },
        clearForms(){
            this.forms = {
                bindingStartDate:'',//绑定开始时间
                bindingEndDate:'',//绑定结束时间
                driverId:'',//车主
                driverName:'',//
                driverPhone:'',//
                shipperId:'',//货主
                shipperName:'',//
                shipperPhone:'',//
            };
            this.checkListShpper  = [];
            this.checkListCar = [];
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .shipperOfdispatch{
        .el-dialog{
            width: 780px;
        }
        .el-dialog__body{
            border-bottom:1px solid #ccc;   
            margin-bottom: 0; 
            overflow: hidden;
            margin: 0 20px;
            display: flex;
        }
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
       .bind{
           flex:1;
           .el-date-editor{
               width: 200px;
               .el-input__inner{
                   padding-left: 25px;
                   text-indent:20px;
               }
               .el-input__prefix{
                   left: 0px;
                   top:1px;
               }
               .el-input__suffix{
                   top: 1px;
               }
           }
            .chooseCommon{
                margin-top: 20px;
                .chooseItem{
                    vertical-align: top;
                    display: inline-block;
                    border:1px solid #ccc;
                    width: 200px;
                    height: 400px;
                    overflow-x:hidden;
                    padding: 5px;
                    position: relative;
                    .el-input{
                        padding: 5px;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    .el-checkbox-group{
                        padding-top: 40px;
                        .el-checkbox{
                            display: block; 
                            margin-left: 0;
                            .el-checkbox__input{
                                .el-checkbox__inner{
                                    width: 12px;
                                    height: 12px;
                                }
                            }
                            .el-checkbox__label{
                                font-size: 12px;
                                color: #666;

                            }
                        }
                    }
                }
            }
       }
    }
</style>
