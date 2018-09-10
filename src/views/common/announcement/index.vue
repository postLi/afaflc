<template>
    <div class="identicalStyle clearfix waitpayment" v-loading="loading">
            <searchInfo @change="getSearchParam"></searchInfo>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" class="el-icon-tickets" plain @click="handleSearch('publish')" size="mini">发布公告</el-button>
                </div>
                <div class="info_news" style="height:89%;">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        :key="tablekey"
                        border
                        @row-click="clickDetails"
                        @selection-change="getSelection"
                        height="100%"
                        tooltip-effect="dark"
                        :default-sort = "{prop: 'id', order: 'ascending'}"
                        style="width: 100%">
                        <el-table-column
                            fixed
                            sortable
                            type="selection"
                            width="50">
                        </el-table-column>
                        <template v-for="column in tableColumn">
                            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column>
                            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width || ''">
                            <template slot-scope="scope">
                                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                                <span v-else v-html="column.slot(scope)"></span>
                            </template>
                            </el-table-column>
                        </template>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                @click="handleClick(scope.$index, scope.row)">置顶</el-button>
                                <el-button
                                size="mini"
                                @click="handleClick(scope.$index, scope.row)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>  
            <announcement :dialogFormVisible.sync = "dialogFormVisible"  @close = "shuaxin" />

    </div>
</template>

<script type="text/javascript">

// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
import '@/styles/dialog.scss'
import { CommonNoticeList } from '@/api/company/announcement.js'
import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import vregion from '@/components/vregion/Region'
import searchInfo from './components/searchInfo'
import announcement from './components/newAnnounce'
import editor from '@/components/tinymac/index'


    export default{
        components:{
            Pager,
            searchInfo,
            vregion,
            announcement,
            editor
        },
        data(){
            return{
                dialogFormVisible:false,
                tablekey: '',
                timeOutWaitPay:null,
                loading: false,//加载
                sizes:[20,50,100],
                pagesize:20,//初始化加载数量
                page:1,//初始化页码
                dataTotal:0,
                searchInfo:{
                    city: "",//区域
                    title:'',//标题
                   
                },
                tableData:[],
                tableColumn: [{
                    label: '序号',
                    prop: 'id',
                    width: '80',
                    fixed: true,
                    slot: (scope) => {
                    return ((this.page - 1) * this.pagesize) + scope.$index + 1
                    }
                }, {
                    label: '区域',
                    prop: 'city',
                    width: '150',
                    fixed: false
                }, {
                    label: '标题',
                    prop: 'title',
                    width: '400',
                    fixed: false
                }, {
                    label: '有效期',
                    prop: 'endTime',
                    width: '250',
                    fixed: false,
                    slot: (scope) => {
                        return parseTime(scope.row.endTime, '{y}-{m}-{d} {h}:{i}:{s}')
                    }
                }, {
                    label: '操作人',
                    prop: 'creater',
                    width: '150',
                    fixed: false
                }, {
                    label: '操作时间',
                    prop: 'startTime',
                    width: '250',
                    fixed: false,
                    slot: (scope) => {
                        return parseTime(scope.row.startTime, '{y}-{m}-{d} {h}:{i}:{s}')
                    }
                },
                //  {
                //     label: '操作',
                //     fixed: false,
                //     // click:true,
                //     slot: (scope) => {
                //         // <el-button type="text" size="small">编辑</el-button>;
                     
                //         return  '<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>';
                //     }
                // }
                ]
            }
        },
        watch:{

        },
        created(){

        },
        mounted(){
            this.firstblood();

            // console.log('```````````',process.env.NODE_ENV)
        },  
        beforeDestroy(){
            clearInterval(this.timeOutWaitPay);
        },
        methods: {
             editors(content) { // editor组件传过来的值赋给content
                console.log(content)
                this.content = content
            },
            onEditorReady(ins, ina) { // 上传失败的函数
                console.log('ins')
                console.log(ins)
                console.log(ina)
            },
            onEditorUploadComplete(json) { // 处理上传图片后返回数据，添加img标签到编辑框内
                console.log('json')
                console.log(json)
                console.log(json[0].data.filePath)
                this.content = this.content + '<img src=' + json[0].data.filePath + '>'
            },

            exportExcel () {
                /* generate workbook object from table */
                var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                console.log(wb)
                console.log(wbout)
                // try {
                //     FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
                // } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                // return wbout
            },
            regionChange(d) {
                console.log('data:',d)
                this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                // if(d.city){
                //     this.searchInfo.belongCity = d.city.code;
                // }else{
                //     this.searchInfo.belongCity = d.province.code;
                // }
            },
             getValue(obj){
                return obj ? obj.value:'';
            },
            handlePageChange(obj) {
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.firstblood();
            },
            //刷新页面  
            firstblood(){
                this.loading = true;
                CommonNoticeList(this.page,this.pagesize,this.searchInfo).then(res => {
                    console.log('公告',res)
                    this.dataTotal = res.data.totalCount;
                    this.tableData = res.data.list;
                    this.loading = false;
                })
            },
            shuaxin(){
                this.firstblood();
            },
             handleClick(row) {
                console.log(row);
            },
            getSearchParam(obj) {
                console.log(obj)
                this.searchInfo = Object.assign(this.searchInfo, obj);
                this.firstblood();
            },
            getSelection(){

            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                switch(type){
                    case 'publish':
                        this.dialogFormVisible = true;
                        break;
                }
                // 清除选中状态，避免影响下个操作
                this.$refs.multipleTable.clearSelection()
            },
                 //判断是否选中
            getinfomation(selection){
                this.checkedinformation = selection;
            },
             //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .waitpayment{
       
    }
</style>