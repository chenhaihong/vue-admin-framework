<template>
  <div class="main-menu">
    <div class="main-menu-item"></div>
  </div>
</template>

<script>
import globalData from '@/helper/globalData';

let route = [];

export default {
  name: 'MainMenu',
  data() {
    return {};
  },
  created() {
    route = globalData.get('routeConfig');
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';
.main-menu /deep/ {
  margin: 0;
  padding: 8px 0;
  height: calc(100vh - @navbarHeight);
  overflow-y: auto;
}

.main-menu-item /deep/ {
  height: 9000px;
}
</style>
