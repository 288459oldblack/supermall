<template>
  <div id="home">
      <nav-bar class="home-nav"><div slot='center'>购物街</div></nav-bar>
      <better-scroll class="content" 
                     ref="scroll" 
                     :probe-type="3" 
                     @scroll="scrollBackTop"
                     :pullUpLoad="true"
                     @pullingUp="loadmore">
        <home-swiper :banners="banners"/>
        <recommend-show :recommends="recommends"/>
        <popular-show/>
        <tab-control :titles="['流行','新款','推荐']" 
                    class="home-tab-control" 
                    @tabClick="tabClick"/>
        <goods-list :goods="goods[currentType].list"/>
      </better-scroll>
      <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BetterScroll from 'components/common/betterScroll/BetterScroll.vue'
import BackTop from 'components/content/backTop/backTop.vue'

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendShow from './childComps/RecommendShow.vue'
import PopularShow from './childComps/PopularShow.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home.js'





// import Swiper from 'components/common/swiper/Swiper.vue'
// import SwiperItem from 'components/common/swiper/SwiperItem.vue'
// import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
    name:'Home',
    components:{
      NavBar,
      TabControl,
      GoodsList,
      BetterScroll,
      BackTop,
      HomeSwiper,
      RecommendShow,
      PopularShow,
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        isShowBackTop:false
      }
    },
    created(){
      //调用对应的methods
        this.getHomeMultidata()

        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      },
      mounted(){
        this.$bus.$on('imageLoad',()=>{
          this.$refs.scroll.refresh()
        })
      },
    methods:{
      //监听事件方法
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType='pop'
            break;
          case 1:
            this.currentType='new'
            break;
          case 2:
            this.currentType='sell'
            break;
        }
      },
      //回到顶部监听事件  监听组件@click.native=""
      backTopClick(){
        //获取ref为scroll的组件,调用里面的backTop方法
        this.$refs.scroll.backTop()
      },
      scrollBackTop(position){
        //当滚动的y>1000时 v-show为true 显示出回顶部按钮
        this.isShowBackTop=(-position.y)>1000
      },
      //上拉加载更多
      loadmore(){
        this.getHomeGoods(this.currentType)
      },
      //网络请求相关的方法
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
        })
      },
      getHomeGoods(type){
         const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
        })
      }
    }
}
</script>

<style>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  /* 原生滚动的时候在顶部时候固定tabcontrol */
  .home-tab-control{
    background-color: #fff;
    position: sticky;
    top: 44px;
    z-index: 8;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content{
    height: calc(100%-93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>