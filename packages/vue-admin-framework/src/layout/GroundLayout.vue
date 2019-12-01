<template>
  <div id="vaf-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'GroundLayout',
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
</style>

<style lang="less" scoped>
#vaf-app {
  height: 100%;
}
</style>
