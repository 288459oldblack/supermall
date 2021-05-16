<template>
  <div class="tab-control" >
      <div class="tab-control-item" 
           v-for="(item,index) in titles" :key="index"
           :class="{active: index===currentItem}"
           @click="itemClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'TabControl',
    data(){
        return{
            currentItem:0
        }
    },
    methods:{
        itemClick(index){
            this.currentItem=index
            this.$emit('tabClick',index)
        }
    },
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
    .tab-control{
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        /* background-color: #fff; */
    }
    .tab-control-item{
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }
    .active span{
        border-bottom:2px solid
    }
    .tab-control-item span{
        padding: 4px;
    }
</style>