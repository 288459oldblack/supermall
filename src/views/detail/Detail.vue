<template>
    <div id="detail">
        <detail-nav-bar class="detail-navbar" 
                        @itemClick="titleClick" 
                        :current-index="currentIndex"
                        />
        <better-scroll class="content"
                       :pullUpLoad="true"
                       ref="scroll"
                       @scroll="getDetailScrollY"
                       :probe-type="3" >
            <detail-swiper ref="base" :topImage="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad1"/>
            <detail-param-info ref="param" :paramInfo="paramInfo"/>
            <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
            <goods-list ref="recommend" :goods="recommendInfo"/>
        </better-scroll>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="backTopClick" v-show="isShow"></back-top>
        <toast></toast>
    </div>
</template>

<script>
import BetterScroll from 'components/common/betterScroll/BetterScroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/backTop.vue'
import Toast from "components/common/toast/Toast.vue";

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

//网络请求,请求数据
import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail.js'



export default {
    name:'Detail',
    components: { 
        BetterScroll,
        GoodsList,
        BackTop,
        Toast,

        DetailNavBar, 
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
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
            recommendInfo:[],
            currentIndex:0,
            distanceTop:[],
            scrollY:0,
            isShow:false,
        }
    },
    updated(){
        // this.distanceTop=[]
        // this.distanceTop.push(this.$refs.base.$el.offsetTop)
        // this.distanceTop.push(this.$refs.param.$el.offsetTop)
        // this.distanceTop.push(this.$refs.comment.$el.offsetTop)
        // this.distanceTop.push(this.$refs.recommend.$el.offsetTop)
        // this.distanceTop.push(Number.MAX_VALUE)
        // console.log(this.distanceTop);
        // this._getOffsetTops() 
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
            }
            //第一次:值不对原因
            //this.$refs.param.$el没渲染
            // this.distanceTop=[]
            // this.distanceTop.push(this.$refs.base.$el.offsetTop)
            // this.distanceTop.push(this.$refs.param.$el.offsetTop)
            // this.distanceTop.push(this.$refs.comment.$el.offsetTop)
            // this.distanceTop.push(this.$refs.recommend.$el.offsetTop)

            // this.$nextTick(()=>{
            //     //根据最新的数据,DOM已经渲染完出来了
            //     //但是图片依然没有加载完,获取的offsetTop不包含图片
            //     //一般情况offsetTop不对的时候都是图片没有渲染完
            //     this.distanceTop=[]
            //     this.distanceTop.push(this.$refs.base.$el.offsetTop)
            //     this.distanceTop.push(this.$refs.param.$el.offsetTop)
            //     this.distanceTop.push(this.$refs.comment.$el.offsetTop)
            //     this.distanceTop.push(this.$refs.recommend.$el.offsetTop)
            //     console.log(this.distanceTop);
            //})
        })
        //得到推荐商品信息
        getRecommend().then(res=>{
            this.recommendInfo=res.data.list
        })
    },
    methods:{
        imageLoad1(){
            this.$refs.scroll.refresh()
            this.distanceTop=[]
            this.distanceTop.push(this.$refs.base.$el.offsetTop)
            this.distanceTop.push(this.$refs.param.$el.offsetTop)
            this.distanceTop.push(this.$refs.comment.$el.offsetTop)
            this.distanceTop.push(this.$refs.recommend.$el.offsetTop)
            this.distanceTop.push(Number.MAX_VALUE)
            // console.log(this.distanceTop);
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.distanceTop[index],100)
        },
        getDetailScrollY(position){
            this.scrollY=-position.y
            this.isShow=this.scrollY>2000
            let length=this.distanceTop.length
            for(let i=0;i<length-1;i++){
                if(this.currentIndex !== i&&(this.scrollY >= this.distanceTop[i]&&this.scrollY < this.distanceTop[i+1]))
                {   
                    this.currentIndex=i
                }
            }
        },
        backTopClick(){
            this.$refs.scroll.backTop()
        },
        addToCart(){
            // 1.创建对象
            const produce = {}
            // 2.对象信息
            produce.iid = this.iid;
            produce.imgURL = this.topImages[0]
            produce.title = this.goods.title
            produce.desc = this.goods.desc;
            produce.newPrice = this.goods.nowPrice;
            // console.log(produce);
            // 3.添加到Store中
            this.$store.commit('addCart', produce)
            this.$store
        .dispatch("ChangeCart", produce)
        .then(() => {
          this.$toast.show("加入购物车");
        })
        .catch(() => {
          this.$toast.show("购买数量+1");
        });
        }
        // _getOffsetTops(){
        //     this.distanceTop=[]
        //     this.distanceTop.push(this.$refs.base.$el.offsetTop)
        //     this.distanceTop.push(this.$refs.param.$el.offsetTop)
        //     this.distanceTop.push(this.$refs.comment.$el.offsetTop)
        //     this.distanceTop.push(this.$refs.recommend.$el.offsetTop)
        //     this.distanceTop.push(Number.MAX_VALUE)
        //     console.log(this.distanceTop);
        // }
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