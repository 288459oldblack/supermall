<template>
    <div id="detail">
        <detail-nav-bar class="detail-navbar"></detail-nav-bar>
        <better-scroll class="content"
                       :pullUpLoad="true"
                       ref="scroll">
            <detail-swiper :topImage="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad1"/>
            <detail-param-info :paramInfo="paramInfo"></detail-param-info>
            <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
            <goods-list :goods="recommendInfo"></goods-list>
        </better-scroll>
    </div>
</template>

<script>
import BetterScroll from 'components/common/betterScroll/BetterScroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

//网络请求,请求数据
import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail.js'



export default {
    name:'Detail',
    components: { 
        BetterScroll,
        GoodsList,

        DetailNavBar, 
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
       
        },
    data(){
        return{
            iid:null,
            topImages:[],
            goods: {},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommendInfo:[]
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
            //4.获取商品介绍图片等信息
            this.detailInfo = data.detailInfo
            // 5.获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            //6.取出商品信息
            if(data.rate.cRate!==0){
                this.commentInfo=data.rate.list[0]
                console.log(this.commentInfo);
            }
            
        })
        //得到推荐商品信息
        getRecommend().then(res=>{
            this.recommendInfo=res.data.list
        })
    },
    methods:{
        imageLoad1(){
            this.$refs.scroll.refresh()
        }
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