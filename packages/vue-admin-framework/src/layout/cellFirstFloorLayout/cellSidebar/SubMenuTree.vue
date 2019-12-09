<template>
  <div class="sub-menu-tree">
    <div class="second-menu"></div>
  </div>
</template>

<script>
export default {
  name: 'SubMenuTree',
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';
.sub-menu-tree /deep/ {
  .second-menu {
    height: @navbarHeight;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
}
</style>
