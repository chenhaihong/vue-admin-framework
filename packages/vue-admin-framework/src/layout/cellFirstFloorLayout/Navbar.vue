<template>
  <div class="navbar"></div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {};
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
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
