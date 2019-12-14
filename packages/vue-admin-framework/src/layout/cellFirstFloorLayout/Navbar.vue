<template>
  <div class="navbar">
    <component :is="NavBarRight"></component>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      NavBarRight: 'NavBarRight',
    };
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';
.navbar {
  z-index: @navbarZIndex;
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - @sidebarWidth);
  font-size: 0;
  height: @navbarHeight;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
