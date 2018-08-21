<template>
    <div class="carData">
        <img src="../../../assets/zanshi/shipper.png" alt="" @click="handlerJump">

    </div>
</template>


<script type="text/javascript">

    export default{
        components:{

        },
        data(){
            return{
                
            }
        },
        created(){

        },
        mounted(){
           
        },  
        beforeDestroy(){
           
        },
        methods: {
            handlerJump(){
                console.log('123')
                this.$router.push({name: '车主详情'});
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .carData{
        height: 100%;
    }
</style>