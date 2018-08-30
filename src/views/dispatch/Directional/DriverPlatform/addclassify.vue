<template>
    <div>
        <!-- 新增分类信息 -->
            <div class="shipperPlatform commoncss">
                <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisible" @close="close">
                    <div class="bindLeft fl bind">
                        <div class="chooseBindTime">
                            <p><span>* </span>拦截开始时间 ：</p>
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
                                <el-input v-model="filterOptionsShipper.search" placeholder="请输入内容"></el-input>
                                <el-checkbox-group v-model="checkListShpper" >
                                    <el-checkbox v-for="obj in optionsShipper" :label="obj" :key="obj.shipperId" >{{obj.label}}</el-checkbox>
                                </el-checkbox-group>
                            </div>  
                        </div>
                    </div>
                    <div class="bindright fr bind">
                        <div class="chooseBindTime">
                            <p><span>* </span>拦截结束时间 ：</p>
                            <el-date-picker
                            v-model="forms.bindingEndDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="timestamp">
                            </el-date-picker>
                        </div>
                        <div class="chooseShipper chooseCommon">
                            <p><span>* </span>选择运营或客服人员 ：</p>
                            <div class="chooseItem">
                                <el-input v-model="filterOptionsSystemUsers.search" placeholder="请输入内容"></el-input>
                                <el-checkbox-group v-model="checkListSystemUsers">
                                    <el-checkbox v-for="obj in optionsSystem" :label="obj" :key="obj.userId" >{{obj.label}}</el-checkbox>
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

            <cue ref="cue"></cue>
    </div>
</template>

<script>

import { data_findAflcShipperList,data_findAflcSystemUserList,data_NewData } from '@/api/dispatch/PlatForm.js'

import cue from "@/components/Message/cue";


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
        cue
    },
    data() {
      return {
        forms:{
            bindingStartDate:null,//拦截开始时间
            bindingEndDate:null,//拦截结束时间
            orgId:null,//平台人员
            orgName:null,//
            orgPhone:null,//
            shipperId:null,//货主
            shipperName:null,//
            shipperPhone:null,//
            
        },
        optionsShipper:[],//选择货主
        optionsSystem:[],//选择平台人员
        optionsVisualCarType:[],
        checkListShpper:[],//货主选中内容
        checkListSystemUsers:[],//平台人员选中内容
        filterOptionsShipper:{
            search:''
        },//筛选货主
        information:null,
        filterOptionsSystemUsers:{
            search:''
        },//筛选平台人员
        informationTime:'拦截结束时间怎么能比拦截开始早呢！'
      };
    },
    computed: {
        startTimeStatus() {
    　　　　return this.forms.bindingStartDate
    　　},
        endTimeStatus() {
    　　　　return this.forms.bindingEndDate
    　　}
    },
    watch:{
        filterOptionsShipper:{
            handler(val, oldVal){
                this.getAflcShipperList();
            },
            deep:true
        },
        filterOptionsSystemUsers:{
            handler(val, oldVal){
                this.getAflcSystemUserList();
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
        //比较时间
        ifWrong(){
            if(!this.forms.bindingStartDate || !this.forms.bindingEndDate){
                return
            }else{
                if(this.forms.bindingStartDate  > this.forms.bindingEndDate){
                    this.$refs.cue.hint(this.informationTime)
                    this.forms.bindingStartDate = null;
                    this.forms.bindingEndDate = null;
                }
            }
        },
        close(){
            this.$emit('update:dialogFormVisible',false)
        },
        //初始化选择项数据
        init(){
             this.getAflcShipperList();
             this.getAflcSystemUserList();
        },
        getAflcShipperList(){
            data_findAflcShipperList(this.filterOptionsShipper).then(res=>{
                console.log(res)
                this.optionsShipper = res.data;
                this.optionsShipper.map(el=>{
                    el.label =  el.contacts +'/'+el.mobile;
                })

            })
        },
        getAflcSystemUserList(){
            data_findAflcSystemUserList(this.filterOptionsSystemUsers).then(res=>{
                console.log(res)
                this.optionsSystem = res.data;
                this.optionsSystem.map(el=>{
                    el.label =  el.name +'/'+el.mobilephone;
                })

            })
        },
        newInfoSave(){
            // console.log(this.forms)
            //货主
            console.log(this.forms)
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
            let userId = [];
            let name = [];
            let mobilephone = [];
            this.checkListSystemUsers.forEach( el => {
                userId.push(el.userId)
                name.push(el.name)
                mobilephone.push(el.mobilephone)
            })
            
            this.forms.orgId =  userId.join(',');
            this.forms.orgName =  name.join(',');
            this.forms.orgPhone =  mobilephone.join(',');
            
            if(!this.forms.bindingStartDate){
                let information = "请填写拦截开始时间";
                this.$refs.cue.hint(information)
                return
            }
            else if(!this.forms.bindingEndDate){
                let information = "请填写拦截结束时间";
                this.$refs.cue.hint(information)
                return

            }
            else if(this.checkListShpper.length == 0){
                let information = "请选择至少一个货主账号";
                this.$refs.cue.hint(information)
                return

            }
            else if(this.checkListSystemUsers.length == 0){
                let information = "请选择至少一个车主账号";
                this.$refs.cue.hint(information) 
                return
            }
            else{
                data_NewData(this.forms).then(res=>{
                    console.log(res)
                    this.$alert('操作成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$emit('renovate');
                            this.clearForms();
                        }
                    });
                }).catch( err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.text ? err.text : err
                    })
                })
            }
            console.log(this.forms)
        },
        closeAddNewInfo(){
            this.close();  
            this.clearForms()
        },

        clearForms(){
            this.forms = {
                bindingStartDate:null,//拦截开始时间
                bindingEndDate:null,//拦截结束时间
                orgId:null,//平台人员
                orgName:null,//
                orgPhone:null,//
                shipperId:null,//货主
                shipperName:null,//
                shipperPhone:null,//
            };

        }
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .shipperPlatform{
        .el-dialog{
            width: 780px;
        }
        .el-dialog__body{
            border-bottom:1px solid #ccc;   
            margin-bottom: 0; 
            overflow: hidden;
            margin: 0 20px;
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
                            margin-left: 0;
                            display: block;
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
        .bindright{
            margin-right: 40px;
       }
    }
</style>
