<template>
  <div id="home">
      <nav-bar class="home-nav">
        <div slot='center'>购物街</div>
      </nav-bar>
      <home-swiper :banners="banners"></home-swiper>
      <recommend-show :recommends="recommends"></recommend-show>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendShow from './childComps/RecommendShow.vue'

import {getHomeMultidata} from 'network/home.js'
// import Swiper from 'components/common/swiper/Swiper.vue'
// import SwiperItem from 'components/common/swiper/SwiperItem.vue'
// import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      RecommendShow
    },
    data(){
      return{
        banners:[],
        recommends:[]
        // result:null
      }
    },
    created(){
        getHomeMultidata().then(res=>{
          // console.log(res);
          // this.result=res
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
        })
      }
}
</script>

<style>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>