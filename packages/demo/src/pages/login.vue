<template>
  <div class="wrapper">
    <h1 class="title">Login Page</h1>
    <p class="desc">This is page login</p>
    <el-button type="primary" size="mini" icon="el-icon-s-promotion" @click="$router.push('/dashboard')">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'DemoIndex',
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  padding-top: 80px;
  text-align: center;

  .title {
    margin-bottom: 24px;
    font-size: 24px;
  }
  .desc {
    margin-bottom: 24px;
    font-size: 14px;
  }
}
</style>
