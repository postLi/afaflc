<template>
 <div class="TCorderInfo clearfix">
        <!-- 照片信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>照片信息</h2>
            <div class="essentialInformationPhoto">
                <p>
                    <span>装货照片：</span>
                    <span>
                        <img src="http://cdn.hao987.cn/shophtml/hanjulejia/images/item_02.jpg">
                    </span>
                 </p>
                <p>
                    <span>回单照片：</span>
                    <span>                       
                        <img src="http://cdn.hao987.cn/shophtml/hanjulejia/images/item_02.jpg">
                        <img src="http://cdn.hao987.cn/shophtml/hanjulejia/images/item_02.jpg">
                    </span>
                 </p>
            </div>
        </div>
 
         <!-- 评价信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>评价信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>货主评价车主：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>评价内容：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>评价标签：</span>
                    <span>1</span>
                </p>                  
            </div>
            <div class="essentialInformation">
                <p>
                    <span>车主评价货主：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>评价内容：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>评价标签：</span>
                    <span>1</span>
                </p>                  
            </div>
        </div>
 
        <!-- 回单信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>回单信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>是否需要回单：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>物流公司回单时间：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>货主收到回单时间：</span>
                    <span>1</span>
                </p>                 
            </div>
        </div>

        <!-- 回款信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>回款信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>是否需要回款：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>物流公司回款时间：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>货主收到回款时间：</span>
                    <span>1</span>
                </p>                 
            </div>
        </div>

 </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.essentialInformationPhoto{
    p{
    display: inline-block;
    color: #333333;
    line-height: 30px;
    vertical-align: top;
    width: 49%;
    font-size: 14px;
    margin-right: 10px;
    span{
        display: inline-block;
        vertical-align:top;
        &:nth-of-type(2){
        width: 70%
        }        
        img{
            width: 50%
        }
    }
    }
}
</style>
