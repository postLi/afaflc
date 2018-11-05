<template>
    <div class="rate clearfix" v-loading = "loading">
        <div class="ratePicture collapseInfo">
            <h2>照片信息</h2>   
            <div class="essentialInformation">
                <p>
                    <span>装货照片：</span>
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top" v-viewer>
                        <img class="showPicture" :src="listInformation.loadingUrl ? listInformation.loadingUrl: ''" alt="" >
                    </el-tooltip>
                </p>
                <p>
                    <span>回单照片：</span>
                    <el-tooltip class="item" v-for="(item,key) in listInformation.returnUrls" :key="key" effect="dark" content="双击图片查看原图" placement="top" v-viewer>
                        <img  :src="item ? item: ''" alt="">
                    </el-tooltip>
                </p>
            </div>
        </div>
        <div class="rateInfo collapseInfo">
                        <!-- <span v-if="evaluationType" class="evaluationType" v-for="el in evaluationType.split(',')"  :key="el">{{el}}</span> -->
            <h2>评价信息</h2>   
            <div class="essentialInformation" v-for="item in listInformation.aflcOrderEvaluations" :key="item.id">
                <div v-if="item.type == 1" class="rateTabs">
                    <p>
                        <span>货主评价车主：</span>
                        <span>
                            <el-rate
                                v-model="item.starLevel"
                                disabled
                                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                >
                            </el-rate>
                        </span>
                    </p>
                    <p>
                        <span>评价内容：</span>
                        <span>{{item.evaluationDes}}</span>
                    </p>
                    <p>
                        <span>评价标签：</span>
                        <span v-if="item.evaluationType" class="evaluationType" v-for="(el,key) in item.evaluationTypeName"  :key="key">{{el}}</span>
                    </p>
                </div>
                <div v-else class="rateTabs">
                    <p>
                        <span>车主评价货主：</span>
                        <span>
                            <el-rate
                                v-model="item.starLevel"
                                disabled
                                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                >
                            </el-rate>
                        </span>
                    </p>
                    <p>
                        <span>评价内容：</span>
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">{{item.evaluationDes}}</div>
                                <span>{{item.evaluationDes}}</span>
                        </el-tooltip>
                    </p>
                    <p>
                        <span>评价标签：</span>
                        <span v-if="item.evaluationType" class="evaluationType" v-for="el in item.evaluationTypeName"  :key="el">{{el}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="rateHuidan collapseInfo">
            <h2>回单信息</h2>   
            <div class="essentialInformation">
                <p>
                    <span>车主回单时间：</span>
                </p>
                <!-- <p>
                    <span>快递公司：</span>
                </p>
                <p>
                    <span>快递单号：</span>
                </p>  -->
                <p>
                    <span>货主收到回单时间：</span>
                </p>
            </div>
        </div>
        <div class="rateHuikuan collapseInfo">
            <h2>回款信息</h2>   
            <div class="essentialInformation">
                <p>
                    <span>车主回款时间：</span>
                </p>
                <p>
                    <span>货主收到回款时间：</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { orderDetailsList } from '@/api/order/ordermange'

export default {
    name: 'rate',
    components:{

    },
    props: {
       isvisible: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            evaluationType: "服务态度好,认路准确活地图,准时送达,收费合理",
            defaultImg:'/static/test.jpg',//默认加载失败图片
            loading:true,
            listInformation:{},
        };
    },
    watch:{
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal){
                    this.init();
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted(){
        // this.init();
    },
    methods: {
        init(){
            this.loading = true
            orderDetailsList(this.$route.query.orderSerial).then(res => {
                console.log('details',res)
                this.listInformation = res.data;
                this.listInformation.aflcOrderEvaluations.forEach(item => {
                    console.log(item.evaluationType )
                    item.evaluationTypeName = item.evaluationType ? item.evaluationType.split(",") : [];
                    item.starLevel = Number(item.starLevel);
                    console.log(item.evaluationTypeName)
                })
                this.loading = false;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                })
                this.loading = false;
            })
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .rate{
        .ratePicture{
            .essentialInformation{
                img{
                    vertical-align: top;
                    display: inline-block;
                    width: 208px;
                    height: 118px;
                    margin-top: 10px;
                    cursor: pointer;
                }
                p:nth-child(2){
                    width: 70%;
                }
            }
        }
        .rateInfo{
            .essentialInformation .rateTabs p:nth-child(2){
                width: 30%;
            }
            .essentialInformation .rateTabs p:last-child{
                width: 40%;
            }
            .essentialInformation .rateTabs p .evaluationType{
                padding: 0px 10px;
                margin:0 5px ;
                background: rgba(227, 233, 235, 0.479);
                color: #3e9ff1;
                font-weight: bold;
                box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
            }
        }
    }
</style>
