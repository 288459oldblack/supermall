<template>
  <div class="cart-bottom">
    <div class="cart-bottom-left">
      <check-button class="check-button" v-model="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="cart-bottom-center">合计:{{ totalPrice }}</div>
    <div class="cart-bottom-right">去结算({{$store.getters.cartCount}})</div>
  </div>
</template>

<script>

import CheckButton from "components/content/checkButton/CheckButton.vue";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      const cartList = this.$store.getters.cartList;
      return cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.newPrice;
        }, 0)
        .toFixed(2);
    },
    isSelectAll(){
        return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
    }
  },
  methods:{
    checkClick(){
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.$store.getters.cartList.find(item => item.checked);

        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = false; 
          });
        } else {//2.有未选中的内容, 则全部选中
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        }
    }
  }
}
</script>

<style>
.cart-bottom {
  display: flex;
  background-color: #eee;
  font-size: 13px;
}
.cart-bottom-left {
  position: relative;
  display: flex;

  height: 40px;
  text-align: center;
  width: 80px;
}
.cart-bottom-left .check-button {
  margin-top: 8px;
  margin-left: 8px;
  margin-right: 8px;
}
.cart-bottom-left span {
  margin-top: 15px;
}
.cart-bottom-center {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
}
.cart-bottom-right {
  background-color: #f00;
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: center;
}
</style>