<template>
    <div>
    <!-- 新增分类信息 -->
        <div class="shipperOfdispatch commoncss">
            <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisibleChange" @close="close">
                <div class="bindLeft fl bind">
                        <div class="chooseShipper chooseCommon">
                            <p><span>* </span>当前货主账号 ：</p>
                            <div class="nowData">
                                <el-input v-model="changeforms.carInfo" placeholder="请输入内容" disabled></el-input>
                            </div>
                        </div>
                        <div class="chooseBindTime">
                            <p><span>* </span>绑定开始时间 ：</p>
                            <el-date-picker
                            v-model="changeforms.bindingStartDate"
                            type="date"
                            placeholder="选择日期"
                            :clearable = "false"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="bindright fr bind">
                        <div class="chooseShipper chooseCommon">
                            <p><span>* </span>当前车主账号 ：</p>
                            <div class="nowData">
                                <el-input v-model="changeforms.shipperInfo" placeholder="请输入内容" disabled></el-input>
                            </div>
                        </div>
                        <div class="chooseBindTime">
                            <p><span>* </span>绑定结束时间 ：</p>
                            <el-date-picker
                            v-model="changeforms.bindingEndDate"
                            type="date"
                            placeholder="选择日期"
                            :clearable = "false"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                            </el-date-picker>
                        </div>
                    </div>
                <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changeInfoSave">保 存</el-button>
                <el-button @click="closeChangeInfo">取 消</el-button>
                </div> 
            </el-dialog>
        </div>
        <cue ref="cue"></cue>
    </div>
        
</template>

<script>
import { data_ChangeData } from '@/api/dispatch/Directional.js'
import cue from "@/components/Message/cue";


export default {
    name: 'changeCarShipper',
    props: {
        dialogFormVisibleChange:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true   
        },
        changeforms:{
            type:Object,
            required:true
        }
    },
    data() {
      return {
        informationTime:'绑定结束时间怎么能比绑定开始早呢！',
        startTime:null,
        endTime:null,
        changeforms_now:null,
      };
    },
    components:{
        cue
    },
    computed: {
        startTimeStatus() {
    　　　　return this.changeforms.bindingStartDate
    　　},
        endTimeStatus() {
    　　　　return this.changeforms.bindingEndDate
    　　},
    },
    watch:{
        startTimeStatus(newValue, oldValue) {
            if(oldValue){
                this.startTime = oldValue
            }else{
                this.startTime = newValue

            }
            this.ifWrong();
            
    　　},
        endTimeStatus(newValue, oldValue) {
            if(oldValue){
                this.endTime = oldValue
            }else{
                this.endTime = newValue

            }
            this.ifWrong();
    　　},
        
    },
    mounted(){
        // this.init();
    },
    methods: {
        //验证time
        ifWrong(){
            if(!this.changeforms.bindingStartDate || !this.changeforms.bindingEndDate){
                return
            }else{
                if(this.changeforms.bindingStartDate  > this.changeforms.bindingEndDate){
                    this.$refs.cue.hint(this.informationTime)
                    this.changeforms.bindingStartDate  = this.startTime ;
                    this.changeforms.bindingEndDate = this.endTime ;
                }
            }
        },
        close(){
            this.$emit('update:dialogFormVisibleChange',false)
        },
        init(){

        },
        //修改保存
        changeInfoSave(){
                // console.log(this.changeforms)
                // console.log('结束:',this.changeforms.bindingStartDate,this.changeforms.bindingEndDate)
                
           if(!this.changeforms.bindingStartDate){
                let information = "请填写绑定开始时间";
                this.$refs.cue.hint(information) 
            }
            else if(!this.changeforms.bindingEndDate ){
                let information = "请填写绑定结束时间";
                this.$refs.cue.hint(information)
            }
            else{

                data_ChangeData(this.changeforms).then(res=>{
                    // console.log(res)
                    this.$emit('renovate')
                    this.close()
                }).catch(res=>{
                    this.$emit('ifError', res.text)
                })  
            }
        },
        //修改关闭s
        closeChangeInfo(){
            this.close();
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .shipperOfdispatch{
        .nowData{
            display: inline-block;
            margin-bottom: 20px;
            .el-input{
                width: 200px;
                .el-input__inner{
                    text-align: center;
                }
            }
        }
    }
    
</style>
