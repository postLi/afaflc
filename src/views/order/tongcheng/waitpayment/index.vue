<template>
    <div>

        <el-input @focus="()=>{showMap('endAddress')}" v-model="aa"></el-input>

        <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" />
    </div>
</template>


<script>

import tmsmap from '@/components/map/index'

    export default {
        components:{
            tmsmap
        },
        data(){
            return {
                aa:'',
                  current:'',
            popVisible:false,
            }
        },
        methods:{
            getInfo(pos, name, info) {
                // info.name  info.pos
                console.log(pos, name, info)
               
            },
            showMap(name) {
                this.popVisible = true ;
                this.current = name;
            },
        }
    }
</script>
