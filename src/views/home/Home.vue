<template>
  <div id="home">
      <nav-bar class="home-nav"><div slot='center'>购物街</div></nav-bar>
      <tab-control :titles="['流行','新款','推荐']" 
                    class="home-tab-control" 
                    @tabClick="tabClick"
                    ref="tabcontrol1"
                    v-show="isShowTabControl"
                    :class="{fixed:isShowTabControl}"/>
      <better-scroll class="content" 
                     ref="scroll" 
                     :probe-type="3" 
                     @scroll="scrollBackTop"
                     :pullUpLoad="true"
                     @pullingUp="loadmore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-show :recommends="recommends"/>
        <popular-show/>
        <tab-control :titles="['流行','新款','推荐']" 
                    class="home-tab-control" 
                    @tabClick="tabClick"
                    ref="tabcontrol2"/>
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
import {debounce} from 'common/utils.js'





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
        currentIndex:0,
        isShowBackTop:false,
        isShowTabControl:false,
        offsetTop:0,
        saveY:0
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
        const refresh=debounce(this.$refs.scroll.refresh,50)
        this.$bus.$on('imageLoad',()=>{
          // this.$refs.scroll.refresh()
            refresh()
        })
        // console.log(this.$refs.tabcontrol.$el.offsetTop);
      },
      //Home界面离开时保存位置,回到Home界面定位到对应的地方
      activated(){
        this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
      },
      deactivated(){
        this.saveY=this.$refs.scroll.getScrollY()
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
        //让两个index保持一致
        this.$refs.tabcontrol1.currentIndex=index
        this.$refs.tabcontrol2.currentIndex=index
      },
      //回到顶部监听事件  监听组件@click.native=""
      backTopClick(){
        //获取ref为scroll的组件,调用里面的backTop方法
        this.$refs.scroll.backTop()
      },
      //监听BetterScroll组件发出的scroll方法,通过位置判断是否显示backtop按钮
      scrollBackTop(position){
        //当滚动的y>1000时 v-show为true 显示出回顶部按钮
        this.isShowBackTop=(-position.y)>1200
        this.isShowTabControl=(-position.y)>this.offsetTop
      },
      //上拉加载更多
      loadmore(){
        this.getHomeGoods(this.currentType)
      },
      //判断轮播图图片加载完成,得到tab-control的offsetTop值
      swiperImageLoad(){
        this.offsetTop=this.$refs.tabcontrol2.$el.offsetTop
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
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
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
  .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
  /* .content{
    height: calc(100%-93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>