<template>
  <div class="detail-navbar">
      <nav-bar>
          <div slot="left" class="left" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="center">
            <div v-for="(item,index) in title" 
                 :key="index" 
                 class="title-item"
                 @click="itemClick(index)"
                 :class="{active:index===currentIndex}">
                {{item}}
            </div>
          </div>
      </nav-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar.vue'

export default {
    name:'DetailNavBar',
    props:{
        title:{
            type:Array,
            default:()=>{
                return ['商品','参数','评论','推荐']
            }
        },
        currentIndex:{
            type:Number,
            default:0
        }
    },
    components: { NavBar },
    methods:{
        itemClick(index){
            this.$emit('itemClick', index)
        },
        backClick(){
            this.$router.go(-1)
            // this.$router.back()
        }
    }
}
</script>

<style>
.detail-navbar {
    background-color: #fff;
    font-weight: normal;
  }
.center{
    display: flex;
    font-size: 13px;
}
.title-item{
    flex: 1;
}
.left{
    margin-top: 3px;
}
.title-item.active{
    color: var(--color-high-text);
}
</style>