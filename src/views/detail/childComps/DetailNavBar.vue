<template>
  <div class="detail-navbar">
      <nav-bar>
          <div slot="left" class="left" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="center">
            <div v-for="(item,index) in title" 
                 :key="index" 
                 class="title"
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
    data(){
        return{
            title:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    components: { NavBar },
    methods:{
        itemClick(index){
            this.currentIndex=index
        },
        backClick(){
            // this.$router.go(-1)
            this.$router.back()
        }
    }
}
</script>

<style>
.center{
    display: flex;
    font-size: 13px;
}
.title{
    flex: 1;
}
.left{
    margin-top: 3px;
}
.active{
    color: red;
}
</style>