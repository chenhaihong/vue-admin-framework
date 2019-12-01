<template>
  <div class="sidebar">
    <div class="sidebar__left"></div>
    <div class="sidebar__right"></div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';
.sidebar {
  z-index: @sidebarZIndex;
  position: fixed;
  width: 224px;
  height: 100%;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  transition: width 0.28s;

  &__left {
    float: left;
    width: @sidebarLeftWidth;
    height: 100%;
    background-color: #f8f8f8;
    border-right: 1px solid #e8e8e8;
  }
  &__right {
    position: absolute;
    left: 96px;
    top: 0;
    width: @sidebarRightWidth;
    height: 100%;
    background-color: white;
    border-right: 1px solid #e8e8e8;
  }
}
</style>
