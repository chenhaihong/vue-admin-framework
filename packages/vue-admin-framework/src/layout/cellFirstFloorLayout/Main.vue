<template>
  <div class="main">
    <router-view class="main-content" />
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';
.main {
  padding-top: @navbarHeight;
  min-height: 100vh;

  .main-content {
    position: relative;
    padding: 24px;
  }
}
</style>
