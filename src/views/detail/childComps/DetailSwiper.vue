<template>
  <div>
      <swiper class="swiper-item">
          <swiper-item v-for="(item,index) in topImage" :key="index">
              <img :src="item" alt="">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>

import Swiper from 'components/common/swiper/Swiper.vue'
import SwiperItem from 'components/common/swiper/SwiperItem.vue'

export default {
    name:'DetailSwiper',
    components: { SwiperItem, Swiper },
    props:{
        topImage:{
            type:Array,
            default(){
                return[]
            }
        }
    }
}
</script>

<style>
.swiper-item{
    height: 300px;
}
</style>