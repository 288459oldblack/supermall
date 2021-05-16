<template>
  <div class="wrapper" ref="wrapper">
      <div class="contents">
          <slot></slot>
      </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
    name:'BetterScroll',
    props:{
        probeType:{
            type:Number,
            defaule:0
        }
    },
    data(){
        return{
            scroll:null,
        }
    },
    methods:{
        // 回到顶部 调用scroll.scrollTO(x,y,time)
        backTop(){
            this.scroll.scrollTo(0,0,500)
        }
    },
    //生命周期函数
    mounted(){
        this.scroll=new BScroll(this.$refs.wrapper,{
        //click默认为false 包裹的其他组件不能点击 必须设置对click应值为true
        click:true,
        probeType:this.probeType
        // pullUpload:true
    })
        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
        })
    }
}
</script>

<style>

</style>