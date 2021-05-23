<template>
  <div class="cart">
      <nav-bar class="cart-navbar">
        <div slot="center">购物车({{$store.state.cartList.length}})</div>
      </nav-bar>
      <cart-list></cart-list>
      <cart-bottom-bar class="cart-bottom"></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
export default {
    components: { 
      NavBar,
      CartList,
      CartBottomBar,
      },
    name:'Cart'
}
</script>

<style>
.cart-navbar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: var(--color-tint);
  color: #fff;
}
.cart-bottom{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
}
</style>