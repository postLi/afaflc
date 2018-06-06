<template>
	<div class="carOwner">
		<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
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
			<el-tab-pane label="冻结中">
                <freezing></freezing>
			</el-tab-pane>
			<el-tab-pane label="黑名单">
                <blackList></blackList>
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
    import freezing from "../components/freezing.vue"
    import blackList from "../components/blackList.vue"
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
            freezing:freezing,
            blackList:blackList
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
        .shipper_searchinfo{
            padding:0 30px 15px 30px;
            border-bottom:1px solid #ccc;
            label{
                margin-right:50px;
                .el-input{
                    width:230px;
                }
            }
        }
        .export{
            padding:10px 30px;
            .el-button{

            }
        }
        .info_news{
            padding:10px 30px;
            .el-table{
                table{
                    width: 100% !important;
                    th,td{
                        text-align:center;
                    }
                }
            }
        }
        .el-pagination{
            margin-top:20px;
            text-align:right;
        }
        .commoncss{
            .el-dialog{
                margin-top: 10vh !important;
                max-height:80%;
                overflow:auto;
                .el-dialog__header{
                    border-bottom:1px solid #ccc;
                    text-align:center;
                    background:#ddd;
                    font-weight:bold;
                }
                .el-input{
                    width:300px;
                }
                .el-dialog__body{
                    padding: 30px 0;
                    .el-form{
                        .el-form-item{
                            display:inline-block;
                            .el-input{

                            }
                            
                        }
                    }
                }
                .dialog-footer{
                    text-align:center;
                }
            }
            .data_pic{
                padding-left:20px;
                text-align:center;
                .data_pic_c{
                    display:inline-block;
                    width:300px;
                    .el-radio-group{
                        text-align:left;
                        .el-radio{
                            margin:10px 0;
                        }
                    }
                }
            }
            .shipper_information{
                h2{
                    margin:20px 50px;
                    padding:10px 0; 
                    border-bottom:1px solid #ccc;
                }
            }
        }
        .uncommitted{
            .data_pic{
                .el-form-item{
                    display:block !important;
                }
                .el-form-item__label{
                    float:left;
                }
                .el-form-item__content{
                    float:left;
                    margin-left: 0 !important;
                    .upload-demo{
                        overflow:hidden;
                        .el-upload{
                            float:right;
                            margin:0 20px;
                        }
                        .el-upload-list {
                            float:right;
                        }
                    }
                }
            }
        }
        .follow{
            .textarea_info{
                display:block !important;
                margin-right:55px;
            }
            
        }
    }


</style>