<template>
  <div class="recommend" >
      <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
      </a>
      </div>
  </div>
</template>

<script>
export default {
    name:'RecommendShow',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }

}
</script>

<style>
    .recommend{
        display: flex;
        text-align: center;
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 14px;
        border-bottom: 10px solid #eee;
        
    } 
    .recommend-item{
        flex: 1;
    }
    .recommend img{
        width: 70px;
        height: 70px;
        margin-bottom: 8px;
    }
</style>