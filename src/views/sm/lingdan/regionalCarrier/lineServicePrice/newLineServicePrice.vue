<template>
  <div class="newLineServicePrice carrierCommonStyle">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <div class="searchInformation rangeCommon">
            <h2>基本信息</h2>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="区域：" prop="areaName" class="location_line">
                        <!-- <el-input v-model="ruleForm.areaName" v-if="unable" :disabled="unable"></el-input> -->
                        <vregion :ui="true" @values="regionChangeStart"  class="form-control" ref="vregion" >
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
                            <el-input v-model.number="form.weightInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(takeGoods,keys,form,'weightInterval','takeGoods')"></el-input>
                        </el-col>
                        <el-col :span="8" class="intervalNum blackBook">
                            <el-input v-model.number="form.volumeInterval1" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <el-input v-model.number="form.volumeInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(takeGoods,keys,form,'volumeInterval','takeGoods')"></el-input>
                        </el-col>
                        <el-col :span="8" class="fixPrice blackBook">
                            <el-input v-model="form.cost" :disabled="unable" v-numberOnly maxlength="7"></el-input>
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
                            <el-input v-model.number="form.weightInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(deliverGoods,keys,form,'weightInterval','deliverGoods')"></el-input>
                        </div>
                        <div :span="6" class="intervalNum blackBook">
                            <el-input v-model.number="form.volumeInterval1" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <el-input v-model.number="form.volumeInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(deliverGoods,keys,form,'volumeInterval','deliverGoods')"></el-input>
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
                                    <el-input v-model.number="item.deliverInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(form.deliverIntervalList,keys,item,'deliverInterval','deliverGoodsRange')"></el-input>
                                    <div class="iconItem">
                                        <span  @click="addItem('deliverGoodsRange',keys,form.deliverIntervalList)" class="addItem" v-if="keys == form.deliverIntervalList.length-1 && keys != 4">
                                        </span>
                                        <span  @click="reduceItem(keys,'deliverGoodsRange',form.deliverIntervalList)" class="reduceItem" v-if="keys == form.deliverIntervalList.length-1 && form.deliverIntervalList.length !=1">
                                        </span>
                                    </div>
                                </div>
                                <div :span="12" class="fixPrice">
                                    <el-input v-model="item.cost" :disabled="unable" v-numberOnly maxlength="7"></el-input>
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
                            <el-input v-model.number="form.costInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(supportGoods,keys,form,'costInterval','supportGoods')"></el-input>
                        </el-col>
                        <el-col :span="8" class="blackBook fixPrice">
                            <el-input v-model="form.cost" :disabled="unable" v-numberOnly maxlength="7"></el-input>
                        </el-col>
                        <el-col :span="8" class="fixPrice blackBook">
                            <el-input v-model="form.rate" :disabled="unable" v-numberOnly maxlength="7"></el-input>
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

            <el-form-item label="最低一票收费：" prop="supportGoodslowestCost" class="inlineForm inlineForm_odd">
                <el-input v-model="supportGoods[0].lowestCost" placeholder="报价" :disabled="unable" v-numberOnly>
                     <template slot="append">元</template>
                </el-input> 
            </el-form-item>

            <el-form-item label="最高一票收费：" prop="supportGoodshighestCost" class="inlineForm">
                <el-input v-model="supportGoods[0].highestCost" placeholder="报价" :disabled="unable" v-numberOnly>
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
                            <el-input v-model.number="form.costInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(FeePricing,keys,form,'costInterval','FeePricing')"></el-input>
                        </el-col>
                        <el-col :span="12" class="fixPrice blackBook">
                            <el-radio v-model="form.radio" label="1" @change="radioChange(keys,'FeePricing')">固定收费
                                <el-input v-model="form.cost" :disabled="unable || form.radio != '1'" v-numberOnly maxlength="7"></el-input>
                            </el-radio>
                            <el-radio v-model="form.radio" label="2" @change="radioChange(keys,'FeePricing')">按代收货款百分比
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

            <el-form-item 
                label="最低一票收费：" 
                class="inlineForm inlineForm_odd"
                prop="FeePricinglowestCost"
                >
                <el-input v-model="FeePricing[0].lowestCost" placeholder="报价" :disabled="unable" v-numberOnly>
                     <template slot="append">元</template>
                </el-input> 
            </el-form-item>

            <el-form-item label="最高一票收费：" prop="FeePricinghighestCost" class="inlineForm">
                <el-input v-model="FeePricing[0].highestCost" placeholder="报价" :disabled="unable" v-numberOnly>
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
                            <el-input v-model.number="form.costInterval2" :disabled="unable" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(timeValue,keys,form,'costInterval','timeValue')"></el-input>
                        </el-col>
                        <el-col :span="12" class="fixPrice blackBook">
                            {{form.radio}}
                            <el-radio v-model="form.radio" label="1" @change="radioChange(keys,'timeValue')">固定收费
                                <el-input v-model="form.cost" :disabled="unable || form.radio != '1'" v-numberOnly maxlength="7"></el-input>
                            </el-radio>
                            {{form.radio}}
                            <el-radio v-model="form.radio" label="2" @change="radioChange(keys,'timeValue')">按代收货款百分比
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

            <el-form-item label="最低一票收费：" prop="timeValuelowestCost" class="inlineForm inlineForm_odd">
                <el-input v-model="timeValue[0].lowestCost" placeholder="报价" :disabled="unable" v-numberOnly>
                     <template slot="append">元</template>
                </el-input> 
            </el-form-item>

            <el-form-item label="最高一票收费：" prop="timeValuehighestCost" class="inlineForm">
                <el-input v-model="timeValue[0].highestCost" placeholder="报价" :disabled="unable" v-numberOnly>
                     <template slot="append">元</template>
                </el-input> 
            </el-form-item>
        </div>
        <el-form-item class="fromfooter">
            <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')">保存</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>

  </div>
</template>
<script>
import '../../carrierCommon.scss'
import { newTradeAreaLineCarrier,TradeAreaLineCarrierDetails } from '@/api/server/lingdan/TradeAreaLineCarrier.js'
import vregion from '@/components/vregion/Region.vue'
export default {
    components:{
        vregion
    },
    data() {

        //保价费定价
         var checksupportGoodslowestCost = (rule,value,callback) => {
            if(this.supportGoods[0].lowestCost == ''){
                callback(new Error('请补充保价费最低一票收费'));
            }else if(Number(this.supportGoods[0].highestCost) < Number(this.supportGoods[0].lowestCost && this.supportGoods[0].highestCost != '')){
                callback(new Error('最高一票收费应大于最低一票收费'));
            }else{
                callback();
            }
        };

        var checksupportGoodshighestCost = (rule,value,callback) => {
            if(this.supportGoods[0].highestCost == ''){
                callback(new Error('请补充保价费最高一票收费'));
            }else if(Number(this.supportGoods[0].highestCost) < Number(this.supportGoods[0].lowestCost)){
                callback(new Error('最高一票收费应大于最低一票收费'));
            }else{
                callback();
            }
        };
        
        //代收货款手续费定价
        var checkFeePricinglowestCost = (rule,value,callback) => {
            if(this.FeePricing[0].lowestCost == ''){
                callback(new Error('请补充代收货款手续费最低一票收费'));
            }else if(Number(this.FeePricing[0].highestCost) < Number(this.FeePricing[0].lowestCost) && this.FeePricing[0].highestCost != ''){
                callback(new Error('最高一票收费应大于最低一票收费'));
            }else{
                callback();
            }
        };

        var checkFeePricinghighestCost = (rule,value,callback) => {
            if(this.FeePricing[0].highestCost == ''){
                callback(new Error('请补充代收货款手续费最高一票收费'));
            }else if(Number(this.FeePricing[0].highestCost) < Number(this.FeePricing[0].lowestCost)){
                callback(new Error('最高一票收费应大于最低一票收费'));
            }else{
                callback();
            }
        };

        //时效保障费定价
        var checktimeValuelowestCost = (rule,value,callback) => {
            if(this.timeValue[0].lowestCost == ''){
                callback(new Error('请补充时效保障费最低一票收费'));
            }else if(Number(this.timeValue[0].highestCost) < Number(this.timeValue[0].lowestCost) && this.timeValue[0].highestCost != ''){
                callback(new Error('最高一票收费应大于最低一票收费'));
            }else{
                callback();
            }
        };

        var checktimeValuehighestCost = (rule,value,callback) => {
            if(this.timeValue[0].highestCost == ''){
                callback(new Error('请补充时效保障费最高一票收费'));
            }else if(Number(this.timeValue[0].highestCost) < Number(this.timeValue[0].lowestCost)){
                callback(new Error('最高一票收费应大于最低一票收费'));
            }else{
                callback();
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
            // ifShowRangeType:'0',
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
            //提货费定价
            takeGoods:[
                {
                    costType:'0',//费用类型(提货费:0 ; 送货费:1)
                    cost:'',//费用
                    volumeInterval1:'0',//体积区间1
                    volumeInterval2:'',//体积区间2
                    weightInterval1:'0',//重量区间1
                    weightInterval2:'',//重量区间2
                }
            ],
            //送货费定价
            deliverGoods:[{
                costType:'1',//费用类型(提货费:0 ; 送货费:1)
                deliverIntervalList:[{
                    cost:'',
                    costType:'1',
                    deliverInterval1:'0',//送货范围1
                    deliverInterval2:'',//送货范围2
                }],
                volumeInterval1:'0',//体积区间1
                volumeInterval2:'',//体积区间2
                weightInterval1:'0',//重量区间1
                weightInterval2:'',//重量区间2
            }],
            //保价费定价
            supportGoods:[{
                costType:'0',//费用类型(保价费定价:0 ;代收货款手续费定价:1 ; 时效保障费定价:2)
                costInterval1:'0',//干线费区间1
                costInterval2:'',//干线费区间2
                lowestCost:'',//最低一票收费
                highestCost:'',//最高一票收费
                cost:'',//费用
                rate:'',//费率
            }],
            //代收货款手续费定价
            FeePricing:[{
                costType:'1',//费用类型(保价费定价:0 ;代收货款手续费定价:1 ; 时效保障费定价:2)
                costInterval1:'0',//干线费区间1
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
                costInterval1:'0',//干线费区间1
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
                FeePricinglowestCost:[
                    { required:true,validator: checkFeePricinglowestCost, trigger: 'change'},
                ],
                FeePricinghighestCost:[
                    { required:true,validator: checkFeePricinghighestCost, trigger: 'change'},
                ],
                supportGoodslowestCost:[
                    { required:true,validator: checksupportGoodslowestCost, trigger: 'change'},
                ],
                supportGoodshighestCost:[
                    { required:true,validator: checksupportGoodshighestCost, trigger: 'change'},
                ],
                timeValuelowestCost:[
                    { required:true,validator: checktimeValuelowestCost, trigger: 'change'},
                ],
                timeValuehighestCost:[
                    { required:true,validator: checktimeValuehighestCost, trigger: 'change'},
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
        ifWrong(item,idx,obj,label,classfy){
            console.log(item,idx,obj,label,classfy)
            if(item[idx][label+'2'] != ''){
                let flag = item[idx][label+'2'] <= item[idx][[label+'1']] ? true : false;

                if(item[idx][label+'2'] && (item.length == (idx+1)) && !flag){
                    this.addItem(classfy,idx,item)
                }
                if(flag){
                    this.$message({
                        type: 'info',
                        message: '终止运量应不小于起始运量' 
                    })
                    return item[idx][label+'2'] = ''
                }
                else if(item.length > (idx+1)){
                    item[idx+1][[label+'1']] = item[idx][label+'2'] ;
                    if(item[idx+1][label+'2']){
                        if(item[idx+1][label+'2'] <= item[idx+1][[label+'1']]){
                            this.$message({
                                type: 'info',
                                message: '终止运量应不小于起始运量' 
                            })
                            item.splice(idx+1);
                            return this.addItem(classfy,idx,item)
                        }
                    }
                }
            }else{
                if(item.length == (idx+1)){

                }else{
                    item.splice(idx+1);
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
        radioChange(value,type){
            if(this[type][value].radio == '1'){
                this[type][value].rate = '';
            }else{
                this[type][value].cost = '';
            }
            this.$forceUpdate()
        },
        getParams(){
            if(this.$route.query.areaCode){
                // this.ifShowRangeType = this.$route.params.ifrevise;//1是修改，2是详情
                let areaCode = this.$route.query.areaCode;//接收数据
                // console.log('```',areaCode,this.ifShowRangeType)
                TradeAreaLineCarrierDetails(areaCode).then(res=>{
                    this.ruleForm = res.data;

                    this.takeGoods = [];
                    this.deliverGoods = [];
                    this.supportGoods = [];
                    this.FeePricing = [];
                    this.timeValue = [];

                    this.ruleForm.aflcIncrementPriceExtendList.forEach(el => {
                        switch(el.costType){
                            case '0':
                                this.takeGoods.push(el);
                                break;
                            case '1':
                                this.deliverGoods.push(el);
                                break;
                        }
                    })

                    this.ruleForm.aflcIncrementPriceList.forEach(el => {
                        switch(el.costType){
                            case '0':
                                this.supportGoods.push(el);
                                break;
                            case '1':
                                this.FeePricing.push(el);
                                break;
                            case '2':
                                this.timeValue.push(el);
                                break;
                        }
                    })

                    this.takeGoods.sort(function(a, b) {
                        return a.weightInterval1 - b.weightInterval1
                    })

                    this.deliverGoods.sort(function(a, b) {
                        return a.weightInterval1 - b.weightInterval1
                    })

                    this.deliverGoods.forEach(el => {
                        el.deliverIntervalList.sort(function(a, b) {
                            return a.deliverInterval1 - b.deliverInterval1
                        })             
                    })

                    this.supportGoods.sort(function(a, b) {
                        return a.costInterval1 - b.costInterval1
                    })             

                    this.FeePricing.sort(function(a, b) {
                        return a.costInterval1 - b.costInterval1
                    })         

                    this.timeValue.sort(function(a, b) {
                        return a.costInterval1 - b.costInterval1
                    })

                    this.FeePricing.forEach(el => {
                        if(el.cost == null ){
                            el.radio = '2';
                        }else{
                            el.radio = '1';
                        }
                    })

                    this.timeValue.forEach(el => {
                        if(el.cost == null ){
                            el.radio = '2';
                        }else{
                            el.radio = '1';
                        }
                    })
                })
            }
        },
        //添加子节点新增
        addItem(type,idx,item){
            // console.log(type)
            switch(type){
                case 'takeGoods':
                        this.takeGoods.push({
                            weightInterval1:this.takeGoods[idx].weightInterval2,//重量区间1
                            weightInterval2:'',//重量区间2
                            costType:'0',//费用类型(提货费:0 ; 送货费:1)
                            cost:'',//费用
                            volumeInterval1:this.takeGoods[idx].volumeInterval2,//体积区间1
                            volumeInterval2:'',//体积区间2
                        }); 
                    break;
                case 'deliverGoods':
                        this.deliverGoods.push({
                            weightInterval1:this.deliverGoods[idx].weightInterval2,//重量区间1
                            weightInterval2:'',//重量区间2
                            costType:'1',//费用类型(提货费:0 ; 送货费:1)
                            deliverIntervalList:[{
                                cost:'',
                                costType:'1',
                                deliverInterval1:'0',//送货范围1
                                deliverInterval2:'',//送货范围2
                            }],
                            volumeInterval1:this.deliverGoods[idx].volumeInterval2,//体积区间1
                            volumeInterval2:'',//体积区间2
                        }); 
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
                        this.supportGoods.push({
                            costType:'0',//费用类型(保价费定价:0 ;代收货款手续费定价:1 ; 时效保障费定价:2)
                            costInterval1:this.supportGoods[idx].costInterval2,//干线费区间1
                            costInterval2:'',//干线费区间2
                            lowestCost:'',//最低一票收费
                            highestCost:'',//最高一票收费
                            cost:'',//费用
                            rate:'',//费率
                        }); 
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
                    this.takeGoods[idx-1].weightInterval2 = '';
                    this.takeGoods[idx-1].volumeInterval2 = '';
                    break;
                case 'deliverGoods':
                    this.deliverGoods.splice(idx,1);
                    this.deliverGoods[idx-1].weightInterval2 = '';
                    this.deliverGoods[idx-1].volumeInterval2 = '';
                    break;
                case 'deliverGoodsRange':
                    item.splice(idx,1);
                    item[idx-1].deliverInterval2 = '';
                    break;
                case 'supportGoods':
                    this.supportGoods.splice(idx,1);
                    this.supportGoods[idx-1].costInterval2 = '';
                    break;
                case 'FeePricing':
                    this.FeePricing.splice(idx,1);
                    this.FeePricing[idx-1].costInterval2 = '';
                    break;
                case 'timeValue':
                    this.timeValue.splice(idx,1);
                    this.timeValue[idx-1].costInterval2 = '';
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
            this.takeGoods.forEach(item => {
                if(item.volumeInterval1 == '' || item.weightInterval1 == ''){
                    messageInfo= '提货费区间最小值不可为空' 
                    ifNull = false;
                }
                // console.log('volumeInterval1',item.weightInterval1,item.volumeInterval1)
            })

            this.deliverGoods.forEach(item => {
                if(item.volumeInterval1 == '' || item.weightInterval1 == ''){
                    messageInfo= '送货费区间最小值不可为空' 
                    ifNull = false;
                }else{
                    item.deliverIntervalList.forEach(el => {
                        if(el.deliverInterval1 == ''){
                            messageInfo= '送货费送货范围区间最小值不可为空' 
                            ifNull = false;
                        }
                    })
                }
            })
            
            this.supportGoods.forEach(item => {
                if(item.costInterval1 == ''){
                    messageInfo= '保价费区间最小值不可为空' 
                    ifNull = false;
                }
            })

            this.FeePricing.forEach(item => {
                if(item.costInterval1 == ''){
                    messageInfo= '代收货款手续费区间最小值不可为空' 
                    ifNull = false;
                }
            })

            this.timeValue.forEach(item => {
                console.log('item.costInterval1',item.costInterval1)
                if(item.costInterval1 == ''){
                    messageInfo= '时效保障费区间最小值不可为空' 
                    ifNull = false;
                }
            })

            if(ifNull){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.completeName();
                        let commitFunction = newTradeAreaLineCarrier(this.ruleForm);
                        commitFunction.then(res => {
                            if(res.status == 200){
                                this.$alert('操作成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        sessionStorage.setItem('regionalCarrierName','lineServicePrice');
                                        this.$router.push({name:'发物流线路承运商'});
                                    }
                                });
                            }else{
                                this.$message({
                                    type: 'info',
                                    message: '操作失败，原因：' + (res.errorInfo ? res.errorInfo : res.text)
                                })
                            }
                        }).catch(err=>{
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
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
            this.$refs.vregion.clear();
            this.takeGoods=[
                {
                    costType:'0',//费用类型(提货费:0 ; 送货费:1)
                    cost:'',//费用
                    volumeInterval1:'0',//体积区间1
                    volumeInterval2:'',//体积区间2
                    weightInterval1:'0',//重量区间1
                    weightInterval2:'',//重量区间2
                }
            ]
            //送货费定价
            this.deliverGoods=[{
                costType:'1',//费用类型(提货费:0 ; 送货费:1)
                deliverIntervalList:[{
                    cost:'',
                    costType:'1',
                    deliverInterval1:'0',//送货范围1
                    deliverInterval2:'',//送货范围2
                }],
                volumeInterval1:'0',//体积区间1
                volumeInterval2:'',//体积区间2
                weightInterval1:'0',//重量区间1
                weightInterval2:'',//重量区间2
            }]
            //保价费定价
            this.supportGoods=[{
                costType:'0',//费用类型(保价费定价:0 ;代收货款手续费定价:1 ; 时效保障费定价:2)
                costInterval1:'0',//干线费区间1
                costInterval2:'',//干线费区间2
                lowestCost:'',//最低一票收费
                highestCost:'',//最高一票收费
                cost:'',//费用
                rate:'',//费率
            }]
            //代收货款手续费定价
            this.FeePricing=[{
                costType:'1',//费用类型(保价费定价:0 ;代收货款手续费定价:1 ; 时效保障费定价:2)
                costInterval1:'0',//干线费区间1
                costInterval2:'',//干线费区间2
                lowestCost:'',//最低一票收费
                highestCost:'',//最高一票收费
                cost:'',//费用
                rate:'',//费率
                radio:'1',//单选判断点
            }]
            //时效保障费定价
            this.timeValue=[{
                costType:'2',//费用类型(保价费定价:0 ;代收货款手续费定价:1 ; 时效保障费定价:2)
                costInterval1:'0',//干线费区间1
                costInterval2:'',//干线费区间2
                lowestCost:'',//最低一票收费
                highestCost:'',//最高一票收费
                cost:'',//费用
                rate:'',//费率
                radio:'1',//单选判断点
            }]
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" >
    
</style>
