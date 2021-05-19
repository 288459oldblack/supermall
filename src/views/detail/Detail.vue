<template>
    <div id="detail">
        <detail-nav-bar class="detail-navbar"></detail-nav-bar>
        <better-scroll class="content"
                       :pullUpLoad="true"
                       ref="scroll">
            <detail-swiper :topImage="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-image-info :detailImage="detailImage"/>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </better-scroll>
    </div>
</template>

<script>
import BetterScroll from 'components/common/betterScroll/BetterScroll.vue'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsImageInfo from './childComps/DetailGoodsImageInfo.vue'

//网络请求,请求数据
import {getDetail,Goods,Shop} from 'network/detail.js'


export default {
    name:'Detail',
    components: { 
        BetterScroll,
        DetailNavBar, 
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsImageInfo,
         
        },
    data(){
        return{
            iid:null,
            topImages:[],
            goods: {},
            shop:{},
            detailImage:[]

        }
    },
    created(){
        // 1.保存传入的iid
        this.iid=this.$route.params.iid
        
        //2.根据iid请求详情数据
        getDetail(this.iid).then(res=>{
            // 1.获取顶部的图片轮播数据
            console.log(res);
            const data=res.result
            this.topImages=data.itemInfo.topImages
            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            //3.获取商家信息
            this.shop=new Shop(data.shopInfo)
            //4.获取商品介绍图片
            console.log(data.detailInfo.detailImage[0].list);
            this.detailImage=data.detailInfo.detailImage[0].list

        })
    }

}
</script>

<style>
#detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
     height: 100vh;
}
.detail-navbar{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.content{
    height: calc(100%-44px);
}
  /* .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
  } */
</style>