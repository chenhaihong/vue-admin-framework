<script>
export default {
  name: 'Logo',
  data() {
    return {};
  },
  render(h) {
    return <div class='logo'>Logo</div>;
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';
.logo {
  height: @navbarHeight;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
