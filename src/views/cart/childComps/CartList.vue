<template>
   <div class="cart-list">
       <better-scroll class="cart-list-scroll">
        <cart-list-item v-for="(item,index) in cartList" 
                        :key="index" 
                        :item-info="item"
                        class="cart-list-item"/>
        </better-scroll>
   </div>
</template>

<script>

import {mapGetters} from "vuex"
import BetterScroll from 'components/common/betterScroll/BetterScroll.vue'
import CartListItem from './CartListItem.vue'

export default {
    name:'CartList',
    components: { 
        CartListItem,
        BetterScroll,
        },
    computed:{
        ...mapGetters(['cartList'])
    }
}
</script>

<style>
.cart-list{
    height: 100vh;
    position: relative;
}
.cart-list-scroll{
    /* overflow: hidden;
    position: absolute;
    bottom: 89px;
    top: 44px;
    left: 0;
    right: 0; */
    height: calc(100%-44px-49px-40px);
    margin-top: 44px;
}
</style>