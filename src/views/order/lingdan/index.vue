<template>
    <div class="orderTrack">
        <el-tabs v-model="orderName" type="border-card" @tab-click="handleClick" >
            <el-tab-pane  
            v-for="item in visibleTabs"
            :key="item.name"
            :label="item.label"
            :name="item.name">
                <OrderTotalComponent :isvisible="orderName === item.name"></OrderTotalComponent>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/javascript">
    import '@/styles/dialog.scss'
    import OrderTotalComponent from './OrderTotalComponent.vue'

    export default {
      name:'orderTrack',
      components:{
          OrderTotalComponent
        },
        data() {
          return {
            orderName:'all',
            visibleTabs:[
                {label:"全部",name:"all"},
                {label:"新建中",name:"new"},
                {label:"派单中",name:"send"},
                {label:"待到车",name:"waitCar"},
                {label:"待装货",name:"waitShipper"},
                {label:"完成装货",name:"completeShipper"},
                {label:"运输中",name:"transport"},
                {label:"待卸货",name:"waitUnloading"},
                {label:"完成卸货",name:"unloading"},
                {label:"已完成",name:"compolete"},
                {label:"已取消",name:"cancel"},
            ]
          };
        },
        watch:{
            orderName(newVal,oldVal){
                // console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.orderName = newVal;
                }else{
                    this.orderName = oldVal;
                }
            }
        },
        created() {
            this.orderName = localStorage.getItem('orderName') || 'all';
        },

        beforeUpdate () {
            localStorage.setItem('orderName', this.orderName);
        },

        beforeDestroy () {
            localStorage.setItem('orderName', 'all');
        },
        methods: {

            handleClick(tab, event) {
                // console.log(tab, event);
                this.orderName = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    .orderTrack{
        height:100%;    
        position: relative;
        .el-tabs{
            border-top: 2px solid #ccc;
        }
        .shipper_searchinfo{
            position: absolute;
            left:0;
            top:0;
            padding:15px 16px;
            border-bottom:2px dashed #ccc;
            height:70px;
            width:100%;
            line-height: 35px;
            .el-form-item{
                .el-form-item__content{
                    .el-input{
                        .el-input__inner{
                            color:#3e9ff1;
                            height:30px;
                            line-height: 30px;
                        }
                    }
                    .el-button{
                        padding:8px 20px;
                    }
                }
            }
        }
        .classify_info{
            height:100%;
            padding:90px 13px 0 0;
            .btns_box{
                margin-bottom:10px;
                .el-button{
                    margin-right:20px;
                    padding:10px 20px;
                }
            }
            .info_news{
                height:90%;
            }
            .el-pagination{
                margin-top:13px;
                text-align:right;
            }
        }

        .el-table{
            th,td{
                text-align: center;
            }
        }
    }
    

    
</style>