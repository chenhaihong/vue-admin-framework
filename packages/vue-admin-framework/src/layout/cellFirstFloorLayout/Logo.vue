<script>
export default {
  name: 'Logo',
  data() {
    return {};
  },
  render() {
    return <div>Logo</div>;
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
