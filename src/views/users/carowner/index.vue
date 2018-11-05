<template>
	<div class="carOwner tabsWrap">
		<el-tabs v-model="CarActiveName" type="card" @tab-click="handleClick">
			<el-tab-pane label="全部" name="first" v-if="$_has_permission('DRIVER_MANAGE_LIST_ALL')">
				<Total :isvisible="CarActiveName === 'first'" ref="ref1"></Total>   
			</el-tab-pane>
			<el-tab-pane label="未认证"  name="second" v-if="$_has_permission('DRIVER_MANAGE_LIST_UNVALIDAT')">
				<Unauthorized :isvisible="CarActiveName === 'second'" ref="ref2"></Unauthorized>
			</el-tab-pane>
			<el-tab-pane label="待认证" name="third" v-if="$_has_permission('DRIVER_MANAGE_LIST_VALIDATING')">
                <toBeCertified :isvisible="CarActiveName === 'third'" ref="ref3"></toBeCertified>
			</el-tab-pane>
			<el-tab-pane label="已认证" name="fourth" v-if="$_has_permission('DRIVER_MANAGE_LIST_VALIDATED')">
                <authenticatedcomponent  :isvisible="CarActiveName === 'fourth'" ref="ref4"></authenticatedcomponent>
			</el-tab-pane>
			<el-tab-pane label="认证不通过" name="fifth" v-if="$_has_permission('DRIVER_MANAGE_LIST_VALIDATFAIL')">
                <unPassCertification :isvisible="CarActiveName === 'fifth'" ref="ref5"></unPassCertification>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script type="text/javascript">
    import totalComponent from "../components/Totalcomponent.vue"
    import unauthorizedComponent from "../components/Unauthorizedcomponent.vue"
    import authEnticatedComponent from "../components/authEnticatedComponent.vue"
    import toBeCertified from "../components/toBeCertified.vue"
    import unPassCertification from "../components/unPassCertification.vue"

    export default {
        data(){
            return{
            	CarActiveName: 'first',
            }
        },
        components:{
			Total:totalComponent,
            Unauthorized:unauthorizedComponent,
            authenticatedcomponent:authEnticatedComponent,
            toBeCertified:toBeCertified,
            unPassCertification:unPassCertification,
        },
        watch:{
            CarActiveName(newVal,oldVal){
                if(newVal){
                    this.CarActiveName = newVal;
                }else{
                    this.CarActiveName = oldVal;
                }
            }
        },
        created() {
            this.CarActiveName = localStorage.getItem('CarActiveName') || 'first';
        },

        beforeUpdate () {
            localStorage.setItem('CarActiveName', this.CarActiveName);
        },

        beforeDestroy () {
            localStorage.setItem('CarActiveName', 'first');
        },
        methods:{
			handleClick(tab, event) {
                if(tab.name=='first'){
                this.$refs.ref1.getDataList()
                }
                if(tab.name=='second'){
                this.$refs.ref2.getDataList()
                }
                if(tab.name=='third'){
                this.$refs.ref3.getDataList()
                }
                if(tab.name=='fourth'){
                this.$refs.ref4.getDataList()
                }
                if(tab.name=='fifth'){
                this.$refs.ref5.getDataList()
                }                                                                
                this.CarActiveName = tab.name;
            },
		}
    }
</script>


<style type="text/css" lang="scss">
    .carOwner{
        height:100%;    
        position: relative;
        .el-tabs{
            height: 100%;
            .el-tabs__content{
                height: 93%;
                .el-tab-pane{
                    height: 100%;
                }
            }
        }
        .el-cascader{
            margin-top:-5px;
        }
        .classify_info{
            height:100%;
            .btns_box{
                margin-bottom:10px;
                .el-button{
                    margin-right:0px;
                    padding: 7px 15px 7px;
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
        .carNewinfo,.freezeInfo,.blackInfo{
            display: inline-block;
            .el-dialog{
                width:1100px;
                border-radius: 4px;
                .el-dialog__body{
                    .el-form{
                        .shipper_information{
                            h2{ 
                                margin:10px 20px;
                                padding-bottom: 10px;
                                border-bottom: 2px solid #ccc;
                            }
                        }
                        .el-form-item{
                            .el-form-item__content{
                                .el-input{
                                    width: 250px;
                                }
                                .lessWidth{
                                    width: 80px;
                                    display: inline-block;
                                }
                                &>.el-checkbox{
                                    margin-left:0px;
                                }
                            }
                        }    
                        .licensePicture{
                            width: 300px;
                            line-height: 20px;
                        }
                        .moreLength{
                            .el-form-item__content{
                                .el-input{
                                    width: 637px;
                                }
                            }
                        }
                        .el-textarea{
                            width: 637px;
                            vertical-align: top;
                            font-size: 12px;
                            padding-top: 5px;
                        }
                      
                    }
                }
            }
        }
    }
</style>