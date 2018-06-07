<template>
    <!-- 新增分类信息 -->
        <div class="addclassify commoncss">
            <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisibleChange" @close="close">
                <h1>修改</h1>
                <!-- <div class="chooseinfo-item"> 
                    <p><span>* </span>服务一级分类 ：</p>
                    <el-radio-group v-model="classfyradio" >
                        <el-radio   v-for="(obj,key) in formclassfy" :label="obj.code" :key='key' @change="chooseradio">{{obj.name}}</el-radio>
                    </el-radio-group>
                </div>
                <div class="extrainfo"  v-for="(form,keys) in forms" :key='keys'>
                    <p><span>* </span>额外服务名称</p>
                    <el-input
                        placeholder="请输入内容"
                        v-model="form.extraName"
                        clearable>
                    </el-input>
                    <el-checkbox v-model="form.isFree" true-label="1" false-label="0" @change="changeformprice">收费</el-checkbox>
                    <p class="ifprice" v-if = "form.isFree === '1'">
                        <el-input
                            @blur="valuerules"
                            placeholder="请输入价格"
                            maxlength="4"
                            v-model="form.extraPrice"
                            ref="pricefocus"
                            clearable>
                        </el-input>
                        <span> 元</span>
                    </p>
                    <div class="nomore">
                        <p>描述</p>
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="5-300间的字符"
                            maxlength="200"
                            ref="infofocus"
                            v-model="form.extraDes"
                            clearable>
                        </el-input>
                    </div>
                    <span  @click="addItem" class="addItem" v-if="keys == 0">
                    </span>
                    <span  @click="reduceItem(keys)" class="reduceItem" v-else>
                    </span>
                </div>
                <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="newInfoSave">保 存</el-button>
                <el-button @click="closeAddNewInfo">取 消</el-button>
                </div> -->
            </el-dialog>
        </div>
</template>

<script>
export default {
    name: 'getCityList',
    props: {
        dialogFormVisibleChange:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true
        }
    },
    data() {
      return {
          forms:{
              areaCode:null,//地区code
              firstRecommendKm:null,//第一次推送公里
              firstRecommendTime:null,//第一次推送时间
              secondRecommendKm:null,//第二次
              secondRecommendTime:null,//第二次
              serivceCode:null,//服务类型
              shipperCarType:null,//货主用车类型
              visualCarType:null,//可见车主类型
          }
      };
    },
    watch:{
        
    },
    methods: {
        close(){
            this.$emit('update:dialogFormVisibleChange',false)
        }
    },
    mounted(){

    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    
</style>
