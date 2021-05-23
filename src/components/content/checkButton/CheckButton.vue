<template>
  <div class="check-button">
    <div
      class="icon-selector"
      :class="{ 'selector-active': checked }"
      @click="selectItem"
    >
      <img src="~assets/img/cart/yes.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      checked: this.value,
    };
  },
  methods: {
    selectItem() {
      this.$emit("checkBtnClick");
    },
  },
  watch: {
    value(newValue) {
      this.checked = newValue;
    },
  },
};
</script>

<style>
.icon-selector img {
  width: 100%;
  height: 100%;
}
.icon-selector {
  position: relative;
  margin: 0;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 0px solid rgb(169, 169, 169);
  cursor: pointer;
  
}

.selector-active {
  /* background-color: #ff8198; */
  background-color: red;
  border-color: #ff8198;
}
</style>