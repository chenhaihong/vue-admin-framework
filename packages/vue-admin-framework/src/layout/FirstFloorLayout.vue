<template>
  <div class="first-floor-layout">
    <Sidebar />
    <div class="main-container">
      <Navbar />
      <Main />
    </div>
  </div>
</template>

<script>
import Sidebar from './cellFirstFloorLayout/Sidebar';
import Navbar from './cellFirstFloorLayout/Navbar';
import Main from './cellFirstFloorLayout/Main';

export default {
  name: 'FirstFloorLayout',
  components: { Sidebar, Navbar, Main },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';

.first-floor-layout {
  position: relative;
  height: 100%;
  .main-container {
    position: relative;
    margin-left: @sidebarWidth;
    min-height: 100%;
  }
}
</style>
