<template>
  <div class="main-menu">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="main-menu-item"></div>
    </el-scrollbar>
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
}

.main-menu-item /deep/ {
}
</style>
