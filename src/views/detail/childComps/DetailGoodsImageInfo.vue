<template>
  <div class="detail-goods">
      <div v-for="(item,index) in detailImage" :key="index" class="detail-goods-item">
          <img :src="item" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name:'DetailGoodsImageInfo',
    props:{
        detailImage:{
            type:Array,
            default(){
                return[]
            }
        }
    }
}
</script>

<style>
.detail-goods-item img{
    width: 100%;
    height: 100%;
}
</style>