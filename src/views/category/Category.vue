<template>
  <div class="wrapper">
  分类
  </div>
</template>

<script>

// import BScroll from 'better-scroll'

export default {
    name:'Category',
    data(){
      return{
        scroll
      }
    },
    created(){
      //生命周期函数,创建以后就会销毁
      // console.log(document.querySelector('.wrapper'));
      // this.scroll = new BScroll(document.querySelector('.wrapper'))
    },
    mounted(){
      // this.scroll = new BScroll(document.querySelector('.wrapper'))
    }

}
</script>

<style>
  /* .wrapper{
    height: 400px;
    overflow: hidden;
  } */
</style>