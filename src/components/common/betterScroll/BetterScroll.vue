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
        },
        pullUpLoad:{
            type:Boolean,
            defaule:false
        }
    },
    data(){
        return{
            scroll:null,
        }
    },
    methods:{
        //回到顶部 调用scroll.scrollTO(x,y,time)
        backTop(){
            // this.scroll && this.scroll.scrollTo(0,0,500)
            this.scroll.scrollTo(0,0,500)
        },
        //刷新
        refresh(){
            // this.scroll && this.scroll.refresh()
            this.scroll.refresh()
        }
    },
    //生命周期函数
    mounted(){
        //1.创建scroll对象 挂载el 通过ref挂载,this.$refs.ref名
        this.scroll=new BScroll(this.$refs.wrapper,{
        //1.click默认为false 包裹的其他组件不能点击 必须设置对click应值为true
        //2.probeType是获取滚动位置参数0 1(不获取) 2(滚动获取,惯性不获取) 3(实时获取)
        //3.pullUpLoad上拉加载更多
        click:true,
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad
        })
        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
        })
        this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
            this.scroll.finishPullUp()
        })
    }
}
</script>

<style>

</style>