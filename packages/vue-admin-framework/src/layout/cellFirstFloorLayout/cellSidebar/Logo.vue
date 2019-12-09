<script>
import globalData from '@/helper/globalData';

export default {
  name: 'Logo',
  data() {
    return {};
  },
  created() {},
  render(h) {
    return <div class='logo'>Logo</div>;
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';
.logo {
  height: @navbarHeight;
  line-height: @navbarHeight;
  font-size: 20px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
