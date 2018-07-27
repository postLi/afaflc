<template>
    <div class="carNewinfo commoncss">
    <el-button  :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
            <el-dialog :title="title" :visible="driverTemplateDialogFlag" :before-close="change">
             <el-form>
              <el-row>
                   <el-col :span="12">
                    <el-form-item label="手机号：" :label-width="formLabelWidth">
                   <GetCityList v-model="formAll.belongCity" ref="area"></GetCityList>
                    </el-form-item>
                   </el-col>
              </el-row>
             </el-form>
            </el-dialog>
    </div>
</template>
<script>
import  { data_post_createDriver,data_put_changeDriver,data_CarList,data_Get_carType,data_get_driver_obStatus,data_post_driverAudit} from '@/api/users/carowner/total_carowner.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
import { eventBus } from '@/eventBus'
export default {
data(){
    return{
    		formAll:{
            belongCity: null,
            },
    }
},
props:{
        value:{
            type: String,
            default:''
        },
        btntype: {
            type: String,
            default: ''
        },
        btntext: {
            type: String,
            default: ''
        },
        btntitle: {
            type: String,
            default: ''
        },
        icon:{
            type: String,
            default: ''
        },
        plain:{
            type: Boolean,
            default: false
        },
},
components:{
    GetCityList
},
methods:{
    
}
}
</script>
<style  lang="scss">

</style>


