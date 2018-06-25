<template>
	<div class="carOwner">
		<el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
			<el-tab-pane label="全部" name="first">
				<Total></Total>   
			</el-tab-pane>
			<el-tab-pane label="未认证">
				<Unauthorized></Unauthorized>
			</el-tab-pane>
			<el-tab-pane label="待认证">
                <toBeCertified></toBeCertified>
			</el-tab-pane>
			<el-tab-pane label="已认证">
                <authenticatedcomponent></authenticatedcomponent>
			</el-tab-pane>
			<el-tab-pane label="认证不通过">
                <unPassCertification></unPassCertification>
			</el-tab-pane>
			<!-- <el-tab-pane label="冻结中">
                <freezing></freezing>
			</el-tab-pane>
			<el-tab-pane label="黑名单">
                <blackList></blackList>
			</el-tab-pane> -->
		</el-tabs>
	</div>
</template>
<script type="text/javascript">
    import totalComponent from "../components/Totalcomponent.vue"
    import unauthorizedComponent from "../components/Unauthorizedcomponent.vue"
    import authEnticatedComponent from "../components/authEnticatedComponent.vue"
    import toBeCertified from "../components/toBeCertified.vue"
    import unPassCertification from "../components/unPassCertification.vue"
    // import freezing from "../components/freezing.vue"
    // import blackList from "../components/blackList.vue"
    export default {
        data:function(){
            return{
            	activeName2: 'first',
            }
        },
        components:{
			Total:totalComponent,
            Unauthorized:unauthorizedComponent,
            authenticatedcomponent:authEnticatedComponent,
            toBeCertified:toBeCertified,
            unPassCertification:unPassCertification,
            // freezing:freezing,
            // blackList:blackList
        },
        methods:{
			handleClick(tab, event) {
                // console.log(tab, event);
            },
		}
    }
</script>


<style type="text/css" lang="scss">
    .carOwner{
        height:100%;    
        position: relative;
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
    }
</style>