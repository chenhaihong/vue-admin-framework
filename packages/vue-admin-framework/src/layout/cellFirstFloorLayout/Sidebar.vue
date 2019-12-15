<template>
  <div class="sidebar">
    <div class="sidebar__left">
      <Logo />
      <MainMenu />
    </div>
    <div class="sidebar__right">
      <SubMenuTree />
    </div>
  </div>
</template>

<script>
import Logo from './cellSidebar/Logo'
import MainMenu from './cellSidebar/MainMenu'
import SubMenuTree from './cellSidebar/SubMenuTree'

export default {
  components: { Logo, MainMenu, SubMenuTree },
  name: 'SideBar',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/variables';
.sidebar {
  z-index: @sidebarZIndex;
  position: fixed;
  width: @sidebarWidth;
  height: 100%;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  transition: width 0.28s;

  &__left {
    float: left;
    width: @mainMenuWidth;
    height: 100%;
    background-color: @mainMenuBgColor;
    border-right: 1px solid @sideBarBorderColor;
    box-sizing: border-box;
  }
  &__right {
    position: absolute;
    left: @mainMenuWidth;
    top: 0;
    width: @subMenuWidth;
    height: 100%;
    background-color: @subMenuBgColor;
    box-sizing: border-box;

    .submenu-tree-wrapper--hover {
      z-index: 1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: @subMenuBgColor;
      display: inherit;
    }
  }
}
</style>
