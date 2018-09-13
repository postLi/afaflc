<template>
    <div style="height:100%;"  class="identicalStyle">
          <el-form :inline="true" :model="shipperAll" ref="ruleForm" class="classify_searchinfo">
            <el-form-item label="所在地：">
              <!-- <GetCityList v-model="shipperAll.belongCity" ref="area"></GetCityList> -->
                <!-- <vregion :ui="true" @values="regionChange" class="form-control"> -->
                    <el-input v-model="shipperAll.belongCityName" placeholder="请输入"></el-input>
                <!-- </vregion> -->
            </el-form-item>
            <el-form-item label="认证状态：">
              <el-select v-model="shipperAll.authStatus" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
			<el-form-item label="账户状态：">
              <el-select v-model="shipperAll.accountStatus" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsAuidSataus"
                  :key="item.id + 'shipperAll' "
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input v-model.trim="shipperAll.mobile"></el-input>
            </el-form-item>
            <el-form-item class="fr"> 
                <el-button type="primary" plain :size="btnsize" >查询</el-button>
                <el-button type="info" plain :size="btnsize">清空</el-button>
            </el-form-item>
          </el-form>
		<div class="classify_info" >
			<div class="btns_box">
                <el-button type="primary" plain :size="btnsize" >冻结</el-button>
                <el-button type="primary" plain :size="btnsize" >冻结修改</el-button>
                <el-button type="primary" plain :size="btnsize" >移入黑名单</el-button>
                <el-button type="primary" plain :size="btnsize" >移除黑名单</el-button>
                <el-button type="primary" plain :size="btnsize" >解冻</el-button>
			</div>
			<div class="info_news">
				<el-table
				ref="multipleTable"
				:data="tableDataAll"
                :default-sort = "{prop: 'registerTime', order: 'descending'}"
				stripe
				border
                height="100%"
				tooltip-effect="dark"
                @selection-change="getSelection"    
                @row-click="clickDetails"
				style="width: 100%">
				<!-- <el-table-column label="选择" width="60" fixed>
                    <template slot-scope="scope">
                        <el-radio class="textRadio" @change.native="getCurrentRow(scope.$index,scope.row)" :label="scope.$index" v-model="templateRadio">&nbsp;</el-radio>
                    </template>
                </el-table-column> -->
                <el-table-column
                    fixed
                    type="selection"
                    width="50">
                </el-table-column>
                <el-table-column label="序号"  width="80">
                    <template slot-scope="scope">
                        {{ (page - 1)*pagesize + scope.$index + 1 }}
                    </template>
                </el-table-column>  
				<el-table-column label="手机号(会员账号)" prop="mobile" width="180" sortable>
                    <template slot-scope="scope">
                        <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
                    </template>
				</el-table-column>
				<el-table-column prop="contactsName" sortable label="注册人姓名" width="150">
				</el-table-column>
				<el-table-column prop="companyName" sortable label="公司名称" width="300">
				</el-table-column>
				<el-table-column prop="belongCityName" sortable label="所在地" width="250">
				</el-table-column>
				<el-table-column prop="registerOriginName" sortable label="注册来源" width="120">
				</el-table-column>
				<el-table-column prop="registerTime" sortable label="注册日期" width="200">
				</el-table-column>
				<el-table-column prop="accountStatusName" sortable label="账户状态" width="120">
                    <template slot-scope="scope">
                        <span :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}">{{scope.row.accountStatusName}}</span>
                    </template>
				</el-table-column>
				<el-table-column prop="authStatusName" sortable label="认证状态" width="120">
				</el-table-column>
                <el-table-column prop="qq" label="QQ号码" sortable width="200">
				</el-table-column>
                <el-table-column prop="isOpenTms" sortable label="是否开通TMS" width="150">
                    <template slot-scope="scope">
                        <span :class="scope.row.isOpenTms == 1 ? 'isTMS' : 'noTMS'"> {{scope.row.isOpenTms == 1 ? '是' : '否'}}</span>
                    </template>
				</el-table-column>
				</el-table>
			</div>
		</div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>
    </div>

    
</template>

<script>
export default {
  components:{
  },
    props: {
		isvisible: {
			type: Boolean,
			default: false
		}
	},
  data(){
      return{
            }
    },
    created(){

    },
    watch: {
        // isvisible: {
        //     handler(newVal, oldVal) {
        //         if(newVal && !this.inited){
        //             this.inited = true;
        //             this.firstblood();
        //             this.getMoreInformation();
        //         }
        //     },

        // }
    },
    mounted(){
    },
    methods:{
    }
}
</script>
<style lang="scss">
    .removeFreeze,.removeBlcak{
        .shipper_information{
            h2{ 
                margin:10px 0 10px 20px;
            }
        }
        .el-textarea{
            width: 637px;
        }
    }

    
</style>