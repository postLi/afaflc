<template>
  <div class="create-range">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <div class="searchInformation rangeCommon">
            <h2>基本信息</h2>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="区域：" prop="areaName" class="location_line">
                        <el-input v-model="ruleForm.areaName" v-if="unable" :disabled="unable"></el-input>
                        <vregion :ui="true" @values="regionChangeStart"  class="form-control" v-else>
                            <el-input v-model="ruleForm.areaName" ></el-input>
                        </vregion>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <div class=" priceTime rangeCommon">
            <h2>价格时效</h2>
            <el-form-item label="提货费定价：" class="jieti" prop="">
                <div class="goodsPriceChoose">
                    <el-row class="goodsPriceChoose_title">
                        <el-col :span="8">重量区间（公斤）</el-col>
                        <el-col :span="8">体积区间（立方）</el-col>
                        <el-col :span="8">提货费（元）</el-col>
                    </el-row>
                    <el-row v-for="(form,keys) in takeGoods" :key="keys">
                        <el-col :span="8" class="intervalNum blackBook">
                            <el-input v-model.number="form.weightInterval1" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <el-input v-model.number="form.weightInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(takeGoods,keys)"></el-input>
                        </el-col>
                        <el-col :span="8" class="intervalNum blackBook">
                            <el-input v-model.number="form.volumeInterval1" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <el-input v-model.number="form.volumeInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(takeGoods,keys)"></el-input>
                        </el-col>
                        <el-col :span="8" class="fixPrice blackBook">
                            <el-input v-model="form.cost" :disabled="unable" v-number-only:point maxlength="7"></el-input>
                            <div class="iconItem">
                                <span  @click="addItem('takeGoods',keys,form)" class="addItem" v-if="keys == takeGoods.length-1 && keys != 4">
                                </span>
                                <span  @click="reduceItem(keys,'takeGoods')" class="reduceItem" v-if="keys == takeGoods.length-1 && takeGoods.length !=1">
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>

            <el-form-item label="送货费定价：" class="jieti" prop="">
                <div class="goodsPriceChoose">
                    <el-row class="goodsPriceChoose_title">
                        <el-col :span="6">重量区间（公斤）</el-col>
                        <el-col :span="6">体积区间（立方）</el-col>
                        <el-col :span="6">送货范围（公里）</el-col>
                        <el-col :span="6">提货费（元）</el-col>
                    </el-row>
                     <div v-for="(form,keys) in deliverGoods" :key="keys"  class="deliverGoods">
                        <div :span="6" class="intervalNum blackBook">
                            <el-input v-model.number="form.weightInterval1" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <el-input v-model.number="form.weightInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(deliverGoods,keys)"></el-input>
                        </div>
                        <div :span="6" class="intervalNum blackBook">
                            <el-input v-model.number="form.volumeInterval1" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <el-input v-model.number="form.volumeInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(deliverGoods,keys)"></el-input>
                            <div class="iconItem">
                                <span  @click="addItem('deliverGoods',keys,form)" class="addItem" v-if="keys == deliverGoods.length-1 && keys != 4">
                                </span>
                                <span  @click="reduceItem(keys,'deliverGoods')" class="reduceItem" v-if="keys == deliverGoods.length-1 && deliverGoods.length !=1">
                                </span>
                            </div>
                        </div>
                        <div :span="12" class="intervalNum otherStyle">
                            <div v-for="(item,keys) in form.deliverIntervalList" :key="keys" class="otherStyleBox">
                                <div :span="12" class="intervalNum">
                                    <el-input v-model.number="item.deliverInterval1" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                                    <span>----</span>
                                    <el-input v-model.number="item.deliverInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(deliverGoods,keys)"></el-input>
                                    <div class="iconItem">
                                        <span  @click="addItem('deliverGoodsRange',keys,form.deliverIntervalList)" class="addItem" v-if="keys == form.deliverIntervalList.length-1 && keys != 4">
                                        </span>
                                        <span  @click="reduceItem(keys,'deliverGoodsRange',form.deliverIntervalList)" class="reduceItem" v-if="keys == form.deliverIntervalList.length-1 && form.deliverIntervalList.length !=1">
                                        </span>
                                    </div>
                                </div>
                                <div :span="12" class="fixPrice">
                                    <el-input v-model="item.cost" :disabled="unable" v-number-only:point maxlength="7"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </el-form-item>

            <el-form-item label="保价费定价：" class="jieti" prop="">
                <div class="goodsPriceChoose">
                    <el-row class="goodsPriceChoose_title">
                        <el-col :span="8">干线费区间（元）</el-col>
                        <el-col :span="8">赠送保额（元）</el-col>
                        <el-col :span="8">超出赠送保额保费费率（千分之）</el-col>
                    </el-row>
                    <el-row v-for="(form,keys) in supportGoods" :key="keys">
                        <el-col :span="8" class="intervalNum blackBook">
                            <el-input v-model.number="form.costInterval1" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <el-input v-model.number="form.costInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(supportGoods,keys)"></el-input>
                        </el-col>
                        <el-col :span="8" class="blackBook fixPrice">
                            <el-input v-model="form.cost" :disabled="unable" v-number-only:point maxlength="7"></el-input>
                        </el-col>
                        <el-col :span="8" class="fixPrice blackBook">
                            <el-input v-model="form.rate" :disabled="unable" v-number-only:point maxlength="7"></el-input>
                            <div class="iconItem">
                                <span  @click="addItem('supportGoods',keys,form)" class="addItem" v-if="keys == supportGoods.length-1 && keys != 4">
                                </span>
                                <span  @click="reduceItem(keys,'supportGoods')" class="reduceItem" v-if="keys == supportGoods.length-1 && supportGoods.length !=1">
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>

            <el-form-item label="最低一票收费：" prop="lowestCost" class="inlineForm inlineForm_odd">
                <el-input v-model="supportGoods[0].lowestCost" placeholder="报价" :disabled="unable" v-number-only:point>
                     <template slot="append">元</template>
                </el-input> 
            </el-form-item>

            <el-form-item label="最高一票收费：" prop="highestCost" class="inlineForm">
                <el-input v-model="supportGoods[0].highestCost" placeholder="报价" :disabled="unable" v-number-only:point>
                     <template slot="append">元</template>
                </el-input> 
            </el-form-item>

            <el-form-item label="代收货款手续费定价：" class="jieti" prop="">
                <div class="goodsPriceChoose">
                    <el-row class="goodsPriceChoose_title">
                        <el-col :span="12">干线费区间（元）</el-col>
                        <el-col :span="12">代收货款手续费计算</el-col>
                    </el-row>
                    <el-row v-for="(form,keys) in FeePricing" :key="keys">
                        <el-col :span="12" class="intervalNum blackBook">
                            <el-input v-model.number="form.costInterval1" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <el-input v-model.number="form.costInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(FeePricing,keys)"></el-input>
                        </el-col>
                        <el-col :span="12" class="fixPrice blackBook">
                            <el-radio v-model="form.radio" label="1">固定收费
                                <el-input v-model="form.cost" :disabled="unable || form.radio != '1'" v-numberOnly maxlength="7"></el-input>
                            </el-radio>
                            <el-radio v-model="form.radio" label="2">按代收货款百分比
                                <el-input v-model="form.rate" :disabled="unable || form.radio != '2'" v-numberOnly maxlength="7"></el-input>
                            </el-radio>
                            <div class="iconItem">
                                <span  @click="addItem('FeePricing',keys,form)" class="addItem" v-if="keys == FeePricing.length-1 && keys != 4">
                                </span>
                                <span  @click="reduceItem(keys,'FeePricing')" class="reduceItem" v-if="keys == FeePricing.length-1 && FeePricing.length !=1">
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>

            <el-form-item label="最低一票收费：" prop="lowerPrice" class="inlineForm inlineForm_odd">
                <el-input v-model="FeePricing[0].lowestCost" placeholder="报价" :disabled="unable" v-number-only:point>
                     <template slot="append">元</template>
                </el-input> 
            </el-form-item>

            <el-form-item label="最高一票收费：" prop="lowerPrice" class="inlineForm">
                <el-input v-model="FeePricing[0].highestCost" placeholder="报价" :disabled="unable" v-number-only:point>
                     <template slot="append">元</template>
                </el-input> 
            </el-form-item>

            <el-form-item label="时效保障费定价：" class="jieti" prop="">
                <div class="goodsPriceChoose">
                    <el-row class="goodsPriceChoose_title">
                        <el-col :span="12">干线费区间（元）</el-col>
                        <el-col :span="12">时效保障费计算</el-col>
                    </el-row>
                    <el-row v-for="(form,keys) in timeValue" :key="keys">
                        <el-col :span="12" class="intervalNum blackBook">
                            <el-input v-model.number="form.costInterval1" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <el-input v-model.number="form.costInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(timeValue,keys)"></el-input>
                        </el-col>
                        <el-col :span="12" class="fixPrice blackBook">
                            <el-radio v-model="form.radio" label="1">固定收费
                                <el-input v-model="form.cost" :disabled="unable || form.radio != '1'" v-numberOnly maxlength="7"></el-input>
                            </el-radio>
                            <el-radio v-model="form.radio" label="2">按代收货款百分比
                                <el-input v-model="form.rate" :disabled="unable || form.radio != '2'" v-numberOnly maxlength="7"></el-input>
                            </el-radio>
                            <div class="iconItem">
                                <span  @click="addItem('timeValue',keys,form)" class="addItem" v-if="keys == timeValue.length-1 && keys != 4">
                                </span>
                                <span  @click="reduceItem(keys,'timeValue')" class="reduceItem" v-if="keys == timeValue.length-1 && timeValue.length !=1">
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>

            <el-form-item label="最低一票收费：" prop="lowerPrice" class="inlineForm inlineForm_odd">
                <el-input v-model="timeValue[0].lowestCost" placeholder="报价" :disabled="unable" v-number-only:point>
                     <template slot="append">元</template>
                </el-input> 
            </el-form-item>

            <el-form-item label="最高一票收费：" prop="lowerPrice" class="inlineForm">
                <el-input v-model="timeValue[0].highestCost" placeholder="报价" :disabled="unable" v-number-only:point>
                     <template slot="append">元</template>
                </el-input> 
            </el-form-item>
        </div>
        <el-form-item class="fromfooter" v-show="ifShowRangeType != '2'">
            <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')">{{ifShowRangeType == '1' ? '修改' : '立即发布'}}</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>

  </div>
</template>
<script>
// import { getDictionary } from '@/api/common.js'
import { createWebTransport,getWebAflcTransportRange,updateWebAflcTransportRange } from '@/api/server/lingdan/TransportRange.js'
import { newTradeAreaLineCarrier } from '@/api/server/lingdan/TradeAreaLineCarrier.js'

// import { getUserInfo } from '@/utils/auth.js'
// import { REGEX } from '@/utils/validate.js'
// import upload from '@/components/Upload/singleImage2'
import vregion from '@/components/vregion/Region.vue'
export default {
    components:{
        vregion
    },
    data() {
        var checkWeigthPriceForms = (rule,value,callback) => {
            if(this.weigthPriceForms[0].endVolume == ''){
                callback(new Error('请补充重货运量范围'));
            }else{
                this.weigthPriceForms.forEach(el => {
                    if(el.primeryPrice === ''){
                        callback(new Error('请补充重货推荐价格'));
                    }
                    else{
                        callback();
                    }
                })
            }
        };

        var checkWeigthPriceDottedForms = (rule,value,callback) => {
            if(this.weigthPriceDottedForms[0].endVolume == ''){
                callback(new Error('请补充重泡货（重货）运量范围'));
            }else{
                this.weigthPriceDottedForms.forEach(el => {
                    if(el.primeryPrice === ''){
                        callback(new Error('请补充重泡货（重货）推荐价格'));
                    }
                    else{
                        callback();
                    }
                })
            }
        };

        var checkLigthPriceDottedForms = (rule,value,callback) => {
            if(this.ligthPriceDottedForms[0].endVolume == ''){
                callback(new Error('请补充重泡货（轻货）运量范围'));
            }else{
                this.ligthPriceDottedForms.forEach(el => {
                    if(el.primeryPrice === ''){
                        callback(new Error('请补充重泡货（轻货）推荐价格'));
                    }
                    else{
                        callback();
                    }
                })
            }
        };

        var checkLightPriceForms = (rule,value,callback) => {
            if(this.ligthPriceForms[0].endVolume == ''){
                callback(new Error('请补充轻货运量范围'));
            }else{
                this.ligthPriceForms.forEach(el => {
                    if(el.primeryPrice === ''){
                        callback(new Error('请补充轻货推荐价格'));
                    }
                    else{
                        callback();
                    }
                })
            }
        };

        var checkStartLocation = (rule,value,callback) => {
            // console.log('this.ruleForm.startCity',this.ruleForm.startProvince)
            if (value == '') {
                callback(new Error('请选择区域'));
            } else if(this.ruleForm.startCity == '' && this.ruleForm.startProvince !=  '北京市' && this.ruleForm.startProvince !=  '天津市' && this.ruleForm.startProvince !=  '重庆市' && this.ruleForm.startProvince !=  '上海市' ){
                callback(new Error('至少选择到市级范围'));
            }else{
                callback();
            }
        };
        return {
            unable:false,
            ifShowRangeType:'0',
            ruleForm: {
                areaName:'',//出发地
                province:'',//省
                city:'',//市
                area:'',//区
                areaCode:'',//区域code
                //增值服务定价实体表
                aflcIncrementPriceExtendList:[],
                //增值服务定价实体表
                aflcIncrementPriceList:[]
            },
            ligthPriceForms:[
                {
                    startVolume:'0',
                    endVolume:'',
                    primeryPrice:'',//标准价
                    type:'0'
                } 
            ],
            //提货费定价
            takeGoods:[
                {
                    costType:'0',//费用类型(提货费:0 ; 送货费:1)
                    cost:'',//费用
                    volumeInterval1:0,//体积区间1
                    volumeInterval2:'',//体积区间2
                    weightInterval1:0,//重量区间1
                    weightInterval2:'',//重量区间2
                }
            ],
            //送货费定价
            deliverGoods:[{
                costType:'1',//费用类型(提货费:0 ; 送货费:1)
                deliverIntervalList:[{
                    cost:'',
                    costType:'1',
                    deliverInterval1:0,//送货范围1
                    deliverInterval2:'',//送货范围2
                }],
                volumeInterval1:0,//体积区间1
                volumeInterval2:'',//体积区间2
                weightInterval1:0,//重量区间1
                weightInterval2:'',//重量区间2
            }],
            //保价费定价
            supportGoods:[{
                costType:'0',//费用类型(保价费定价:0 ;代收货款手续费定价:1 ; 时效保障费定价:2)
                costInterval1:0,//干线费区间1
                costInterval2:'',//干线费区间2
                lowestCost:'',//最低一票收费
                highestCost:'',//最高一票收费
                cost:'',//费用
                rate:'',//费率
            }],
            //代收货款手续费定价
            FeePricing:[{
                costType:'1',//费用类型(保价费定价:0 ;代收货款手续费定价:1 ; 时效保障费定价:2)
                costInterval1:0,//干线费区间1
                costInterval2:'',//干线费区间2
                lowestCost:'',//最低一票收费
                highestCost:'',//最高一票收费
                cost:'',//费用
                rate:'',//费率
                radio:'1',//单选判断点
            }],
            //时效保障费定价
            timeValue:[{
                costType:'2',//费用类型(保价费定价:0 ;代收货款手续费定价:1 ; 时效保障费定价:2)
                costInterval1:0,//干线费区间1
                costInterval2:'',//干线费区间2
                lowestCost:'',//最低一票收费
                highestCost:'',//最高一票收费
                cost:'',//费用
                rate:'',//费率
                radio:'1',//单选判断点
            }],
            rules: {
                areaName:[
                    { required: true, validator: checkStartLocation, trigger: 'change' },
                ],
                weigthPriceForms:[
                    { required:true,validator: checkWeigthPriceForms, trigger: 'blur'},
                ],
                weigthPriceDottedForms:[
                    { required:true,validator: checkWeigthPriceDottedForms, trigger: 'blur'},
                ],
                ligthPriceDottedForms:[
                    { required:true,validator: checkLigthPriceDottedForms, trigger: 'blur'},
                ],
                ligthPriceForms:[
                    { required:true,validator: checkLightPriceForms, trigger: 'blur'},
                ],
                primeryPrice:[
                    {required:true,message: '请填写价格', trigger: 'blur' },
                ],
            }
        }
    },
    watch:{
       
    },
    mounted(){
        this.getParams();
    },
    methods:{
        ifWrong(item,idx){
            let flag = item[idx].endVolume <= item[idx].startVolume ? true : false;
            if(flag){
                this.$message({
                    type: 'info',
                    message: '终止运量应不小于起始运量' 
                })
                return item[idx].endVolume = ''
            }
            else if(item.length > (idx+1)){
                item[idx+1].startVolume = item[idx].endVolume ;
                if(item[idx+1].endVolume){
                    if(item[idx+1].endVolume <= item[idx+1].startVolume){
                        this.$message({
                            type: 'info',
                            message: '终止运量应不小于起始运量' 
                        })
                        return item.splice(idx+1);
                    }
                }
            }
        },
        regionChangeStart(d) {
            // console.log('data:',d)
            this.ruleForm.areaName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            // console.log(this.ruleForm.areaName)
            this.ruleForm.province = d.province ? d.province.name : '';
            this.ruleForm.city = d.city ? d.city.name : '';
            this.ruleForm.area = d.area ? d.area.name : '';
            if(d.area){
                this.ruleForm.areaCode = d.area.code;
            }else if(d.city){
                this.ruleForm.areaCode = d.city.code;
            }else{
                this.ruleForm.areaCode = d.province ? d.province.code :'';
            }
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        getParams(){
            if(this.$route.params.rangeId){
                this.ifShowRangeType = this.$route.params.ifrevise;//1是修改，2是详情
                let rangeId = this.$route.params.rangeId;//接收数据
                // console.log('```',rangeId,this.ifShowRangeType)
                getWebAflcTransportRange(rangeId).then(res=>{
                    this.ruleForm = res.data;
                    this.ligthPriceForms = [];
                    this.weigthPriceForms = [];
                    this.ligthPriceDottedForms = [];
                    this.weigthPriceDottedForms = [];

                    this.ruleForm.rangePrices.forEach(item => {
                        switch (item.type) {
                            case '0':
                                this.ligthPriceForms.push(item)
                                break
                            case '1':
                                this.weigthPriceForms.push(item)
                                break
                            case '2':
                                this.ligthPriceDottedForms.push(item)
                                break
                            case '3':
                                this.weigthPriceDottedForms.push(item)
                                break
                        }
                    })
                    this.ligthPriceForms.sort(function(a, b) {
                        return a.startVolume - b.startVolume
                    })
                    this.weigthPriceForms.sort(function(a, b) {
                        return a.startVolume - b.startVolume
                    })
                    this.ligthPriceDottedForms.sort(function(a, b) {
                        return a.startVolume - b.startVolume
                    })
                    this.weigthPriceDottedForms.sort(function(a, b) {
                        return a.startVolume - b.startVolume
                    })
                })
                if(this.ifShowRangeType == 2){
                    this.unable = true;
                }
            }
        },
        //添加子节点新增
        addItem(type,idx,item){
            // console.log(type)
            switch(type){
                case 'takeGoods':
                // console.log(item.primeryPrice)
                    // if(idx == 0 && item.endVolume == ''){
                    //     return this.$message({
                    //         type: 'info',
                    //         message: '请补充重货运量' 
                    //     })
                    // }
                    // else if(item.primeryPrice == ''){
                    //     return this.$message({
                    //         type: 'info',
                    //         message: '请补充重货推荐价格（元 / m3）' 
                    //     })
                    // }else{
                        this.takeGoods.push({
                            weightInterval1:this.takeGoods[idx].weightInterval2,//重量区间1
                            weightInterval2:'',//重量区间2
                            costType:'0',//费用类型(提货费:0 ; 送货费:1)
                            cost:'',//费用
                            volumeInterval1:this.takeGoods[idx].volumeInterval2,//体积区间1
                            volumeInterval2:'',//体积区间2
                        }); 
                    // }
                    break;
                case 'deliverGoods':
                    // if(idx == 0 && item.endVolume == ''){
                    //     return this.$message({
                    //         type: 'info',
                    //         message: '请补充重泡货（重货）运量' 
                    //     })
                    // }
                    // else if(item.primeryPrice == ''){
                    //     return this.$message({
                    //         type: 'info',
                    //         message: '请补充重泡货（重货）推荐价格（元 / m3）' 
                    //     })
                    // }else{
                        this.deliverGoods.push({
                            weightInterval1:this.deliverGoods[idx].weightInterval2,//重量区间1
                            weightInterval2:'',//重量区间2
                            costType:'1',//费用类型(提货费:0 ; 送货费:1)
                            deliverIntervalList:[{
                                cost:'',
                                costType:'1',
                                deliverInterval1:0,//送货范围1
                                deliverInterval2:'',//送货范围2
                            }],
                            volumeInterval1:this.deliverGoods[idx].volumeInterval2,//体积区间1
                            volumeInterval2:'',//体积区间2
                        }); 
                    // }
                    break;
                case 'deliverGoodsRange':
                    // console.log(type,idx,item)
                    item.push({
                        cost:'',
                        costType:'1',
                        deliverInterval1:item[idx].deliverInterval2,//送货范围1
                        deliverInterval2:'',//送货范围2
                    })
                    break;
                case 'supportGoods':
                    // if(idx == 0 && item.endVolume == ''){
                    //     return this.$message({
                    //         type: 'info',
                    //         message: '请补充轻货运量' 
                    //     })
                    // }
                    // else if(item.primeryPrice == ''){
                    //     return this.$message({
                    //         type: 'info',
                    //         message: '请补充轻货推荐价格' 
                    //     })
                    // }else{
                        this.supportGoods.push({
                            costType:'0',//费用类型(保价费定价:0 ;代收货款手续费定价:1 ; 时效保障费定价:2)
                            costInterval1:this.supportGoods[idx].costInterval2,//干线费区间1
                            costInterval2:'',//干线费区间2
                            lowestCost:'',//最低一票收费
                            highestCost:'',//最高一票收费
                            cost:'',//费用
                            rate:'',//费率
                        }); 
                    // }
                    break;

                case 'FeePricing':
                        this.FeePricing.push({
                            costType:'1',//费用类型(保价费定价:0 ;代收货款手续费定价:1 ; 时效保障费定价:2)
                            costInterval1:this.FeePricing[idx].costInterval2,//干线费区间1
                            costInterval2:'',//干线费区间2
                            lowestCost:'',//最低一票收费
                            highestCost:'',//最高一票收费
                            cost:'',//费用
                            rate:'',//费率
                            radio:'1',//单选判断点
                        })
                    break;
                case 'timeValue':
                         this.timeValue.push({
                            costType:'2',//费用类型(保价费定价:0 ;代收货款手续费定价:1 ; 时效保障费定价:2)
                            costInterval1:this.timeValue[idx].costInterval2,//干线费区间1
                            costInterval2:'',//干线费区间2
                            lowestCost:'',//最低一票收费
                            highestCost:'',//最高一票收费
                            cost:'',//费用
                            rate:'',//费率
                            radio:'1',//单选判断点
                        })
                    break;
            }
        },
        //删除子节点新增
        reduceItem(idx,type,item){
            // console.log(idx,type)
            switch(type){
                case 'takeGoods':
                    this.takeGoods.splice(idx,1);
                    break;
                case 'deliverGoods':
                    this.deliverGoods.splice(idx,1);
                    break;
                case 'deliverGoodsRange':
                    item.splice(idx,1);
                    break;
                case 'supportGoods':
                    this.supportGoods.splice(idx,1);
                    break;
                case 'FeePricing':
                    this.FeePricing.splice(idx,1);
                    break;
                case 'timeValue':
                    this.timeValue.splice(idx,1);
                    break;
            }
        },  
        completeName(){
            let aflcIncrementPriceExtendList = [];
            let aflcIncrementPriceList = [];

            //增值服务定价扩展表
            this.takeGoods.forEach(el => {
                aflcIncrementPriceExtendList.push(el)
            })

            this.deliverGoods.forEach(el => {
                aflcIncrementPriceExtendList.push(el)
            })

            this.supportGoods.forEach((el,idx,item) => {
                el.lowestCost = item[0].lowestCost;
                el.highestCost = item[0].highestCost;
            })

            this.FeePricing.forEach((el,idx,item) => {
                el.lowestCost = item[0].lowestCost;
                el.highestCost = item[0].highestCost;
            })

            this.timeValue.forEach((el,idx,item) => {
                el.lowestCost = item[0].lowestCost;
                el.highestCost = item[0].highestCost;
            })

            //增值服务定价实体表
            this.supportGoods.forEach(el => {
                aflcIncrementPriceList.push(el)
            })

            this.FeePricing.forEach(el => {
                aflcIncrementPriceList.push(el)
            })

            this.timeValue.forEach(el => {
                aflcIncrementPriceList.push(el)
            })

            this.ruleForm.aflcIncrementPriceExtendList = aflcIncrementPriceExtendList;
            this.ruleForm.aflcIncrementPriceList = aflcIncrementPriceList;
        },
        //提交按钮
        submitForm(formName) {
            let ifNull = true;
            let messageInfo;
            // this.ligthPriceForms.forEach(item => {
            //     if(item.primeryPrice == ''){
            //         messageInfo= '请补充轻货推荐价格' 
            //         ifNull = false;
            //     }
            // })
            
            if(ifNull){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.completeName();
                       
                        console.log(this.ruleForm)
                        let commitFunction = newTradeAreaLineCarrier(this.ruleForm);
                        // if(this.ifShowRangeType == '1'){
                        //     commitFunction = updateWebAflcTransportRange(this.ruleForm);
                        // }else{
                        //     commitFunction = createWebTransport(this.ruleForm)
                        // }
                        commitFunction.then(res => {
                            console.log('res',res) 
                            if(res.status == 200){
                                this.$alert('操作成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        // this.$router.push({name:'物流专线'})
                                    }
                                });
                            }else{
                                this.$message({
                                    type: 'info',
                                    message: '操作失败，原因：' + res.errorInfo ? res.errorInfo : res.text
                                })
                            }
                        }).catch(err=>{
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                            })
                        })
                    } else {
                        this.$message({
                            type: 'info',
                            message: '请填写完整信息' 
                        })
                        return false;
                    }
                });
            }else{
                this.$message({
                    type: 'info',
                    message: messageInfo
                })
            }
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" >
    .create-range{
        background: #f2f2f2;
        .el-form{
            overflow: hidden;
            >.searchInformation{
                .el-form-item{
                    margin-bottom: 40px;
                    .el-form-item__content{
                        .v-region{
                            width: 100%;
                            .caller-container{
                                width: 100%;
                            }
                            .v-dropdown-container{
                                top: 40px !important;
                                left: 0px !important;
                            }
                        }
                    }
                }
            }

            .rangeCommon{
                background: #ffffff;
                margin-top: 18px;
                padding: 0 20px;
                box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
                h2{
                    border-bottom: solid 2px #e0e0e0;
                    line-height: 25px;
                    font-size: 18px;
                    padding: 36px 0 18px 0;
                    color: #333333;
                    font-weight: bold;
                    font-stretch: normal;
                    margin-bottom: 20px;
                }
                .location_line{
                    .el-form-item__content{
                        line-height: 28px;
                    }
                }
            }
            .priceTime{
                margin-bottom: 18px;
                .el-input{
                    width: 264px;
                }
                .el-form-item{
                    .el-form-item__content{
                        position: relative;
                        width: 100%;
                        .supplement{
                            font-size: 12px;
                            color: #ccc;
                        }
                    }
                }
                .inlineForm{
                    display: inline-block;
                    margin-bottom: 40px;
                }

                .inlineForm_odd{
                    margin-left: 8%;
                }
                .jieti{
                    .el-form-item__content{
                        width: 86%;
                        .el-input{
                            width: 50px;
                        }
                        p{
                            font-size: 12px;
                            color:red;
                        }
                        .goodsPriceChoose{  
                            border: 1px solid #ccc;
                            border-bottom: 0 none;

                            .fixPrice{
                                    .el-input{
                                        width:40%;
                                    }
                                    .el-radio{
                                        width: 35%;
                                    }
                                }

                            .el-row{
                                text-align: center;
                                .el-col{
                                    border-right: 1px solid #ccc;
                                    position: relative;
                                   
                                }
                                .el-col:last-child{
                                    border: 0 none;
                                }
                                .intervalNum{
                                    .el-input{
                                        width: 24%;
                                        min-width: 105px;
                                    }
                                }
                                
                                .blackBook{
                                    padding: 10px 0;
                                }
                                .otherStyle{
                                    .el-row{
                                        .el-col{
                                            padding: 10px 0;
                                        }
                                    }
                                }
                            }
                            
                            .deliverGoods{
                                font-size: 0;
                                display: flex;
                                border-bottom: 1px solid #ccc;
                                .intervalNum{
                                    display: inline-block;
                                    box-sizing: border-box;
                                    padding: 10px 0;
                                    text-align: center;
                                    vertical-align: middle;
                                    span{
                                        font-size: 14px;
                                    }
                                    .el-input{
                                        width: 24%;
                                        min-width: 105px;
                                    }
                                }
                                .blackBook{
                                    width: 25%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    border-right: 1px solid #ccc;
                                    .iconItem{
                                        margin-left: 10px;
                                        margin-right: 0;
                                    }
                                }
                                .otherStyle{
                                    width: 50%;
                                    vertical-align: middle;
                                    .otherStyleBox{
                                        font-size: 0;
                                        div{
                                            display: inline-block;
                                            box-sizing: border-box;
                                        }
                                        .intervalNum{
                                            border-right: 1px solid #ccc;
                                        }
                                    }
                                    .intervalNum,.fixPrice{
                                        width: 50%;
                                    }
                                    .fixPrice{
                                        .el-input{
                                            width:40%;
                                        }
                                    }
                                }
                            }
                            .el-row + .el-row{
                                border-bottom: 1px solid #ccc;
                            }

                            .iconItem{
                                min-width: 56px;
                                float: right;
                                padding-top:6px; 
                                margin-right: 10px;
                                height: 40px;
                                text-align: left;
                                .addItem{
                                    display:inline-block;
                                    height: 26px;
                                    width:26px;
                                    line-height: 26px;
                                    cursor: pointer;
                                    background:url('../../../../../assets/icom/23zengjia.png') no-repeat center;
                                    // position: absolute;
                                    // top:15px;
                                    // right: 80px;
                                    &:hover{
                                        background:url('../../../../../assets/icom/24zengjia-b.png') no-repeat center;
                                    }
                                }
                                .reduceItem{
                                    display:inline-block;
                                    height: 26px;
                                    width:26px;
                                    line-height: 26px;
                                    cursor: pointer;
                                    background:url('../../../../../assets/icom/21shanchu.png') no-repeat center;
                                    // position: absolute;
                                    // top:15px;
                                    // right:40px;
                                    &:hover{
                                        background:url('../../../../../assets/icom/22shanchu-b.png') no-repeat center;
                                    }
                                }
                            }
                            .goodsPriceChoose_title{
                                background: #eaefff;
                                font-size: 14px;
                                color: #333333;
                            }
                            p{
                                padding: 6px 50px;                     
                                background: #eaefff;
                                font-size: 14px;
                                line-height: 17px;
                                color: #333333;
                                span{
                                    strong{
                                        color: red;
                                        font-size: 12px;
                                    }
                                }
                                span:first-child{
                                    margin:0 21%;
                                }
                                span:nth-child(2){
                                    margin:0 13%;
                                }
                                 span:nth-child(3){
                                    margin:0 122px;
                                }
                            }
                            ul{
                                padding: 8px 110px 8px 50px;
                                font-size: 12px;
                                position: relative;
                                overflow: hidden;
                                li{
                                    .el-input{
                                        width: 41%;
                                    }
                                    float: left;
                                }
                                li:first-child{
                                    margin-left: 9%;
                                }
                                li:nth-child(2){
                                    margin-left: 15%;
                                    .el-input{
                                        width: 86%;
                                    }
                                }
                                li:nth-child(3){
                                    margin-left: 21%; 
                                }
                                .buttons{
                                    position: absolute;
                                    right: 0;
                                    top: 0;
                                }
                                .addItem{
                                    display:inline-block;
                                    height: 26px;
                                    width:26px;
                                    line-height: 26px;
                                    cursor: pointer;
                                    background:url('../../../../../assets/icom/23zengjia.png') no-repeat center;
                                    // position: absolute;
                                    // top:15px;
                                    // right: 80px;
                                    &:hover{
                                        background:url('../../../../../assets/icom/24zengjia-b.png') no-repeat center;
                                    }
                                }
                                .reduceItem{
                                    display:inline-block;
                                    height: 26px;
                                    width:26px;
                                    line-height: 26px;
                                    cursor: pointer;
                                    background:url('../../../../../assets/icom/21shanchu.png') no-repeat center;
                                    // position: absolute;
                                    // top:15px;
                                    // right:40px;
                                    &:hover{
                                        background:url('../../../../../assets/icom/22shanchu-b.png') no-repeat center;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
