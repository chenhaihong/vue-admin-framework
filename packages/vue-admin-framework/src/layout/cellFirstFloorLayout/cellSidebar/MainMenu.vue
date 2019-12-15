<template>
  <el-scrollbar class="main-menu-scrollbar" wrap-class="scrollbar-wrapper">
    <ul class="main-menu">
      <li
        class="main-menu-item"
        :class="{ active: selectedName === item.name }"
        v-for="item in list"
        :key="item.path"
        :title="item.label"
        @click.stop="handleClick(item)"
        @mouseenter.stop="handleMouseEnter(item)"
        @mouseleave.stop="handleMouseLeave(item)"
      >
        <i class="main-menu-icon" :class="item.icon"></i>
        <span class="main-menu-label">{{ item.label }}</span>
      </li>
    </ul>
  </el-scrollbar>
</template>

<script>
import globalData from '@/helper/globalData';

let _routes = [];

export default {
  name: 'MainMenu',
  data() {
    return {
      list: [],
      selectedName: '',
    };
  },
  watch: {
    $route(next) {
      this.selectedName = next.matched[0].name;
    },
  },
  created() {
    const routeConfig = globalData.get('routeConfig', {});
    _routes = routeConfig.routes || [];

    this.selectedName = this.$route.matched[0].name;
    this.list = _routes
      .filter(({ hidden }) => !hidden)
      .map(({ name, path, hidden, meta }) => {
        return {
          name,
          path,
          label: meta.name || meta.title,
          icon: meta.fontIcon,
        };
      });
  },
  methods: {
    handleClick(item) {
      this.$emit('click');
      this.selectedName = item.name;
      this.$router.push(item.path);
    },
    handleMouseEnter(item) {
      const { name } = item;
      if (this.selectedName !== name) {
        this.$emit('enter', name);
      }
    },
    handleMouseLeave(item) {
      const { name } = item;
      if (this.selectedName !== name) {
        this.$emit('leave', name);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';

.main-menu-scrollbar /deep/ {
  height: calc(100vh - @navbarHeight);

  // Vue style 深度作用选择器 >>> 与 /deep/（sass/less）
  // style       >>>
  // less|sass   /deep/
  /deep/ .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .main-menu {
    margin: 0;
    padding: 8px 0;
  }
}

.main-menu-item /deep/ {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 16px;
  height: 40px;
  line-height: 40px;
  font-weight: 700;
  color: rgb(102, 102, 102);

  .main-menu-icon {
    flex-shrink: 0;
    font-size: 16px;
    color: #999;
  }

  .main-menu-label {
    margin-left: 10px;
    font-size: 14px;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.main-menu-item:hover {
  background: #f3f3f3;
}

.main-menu-item {
  &.active,
  &:hover {
    .main-menu-icon {
      color: #fd5149;
    }
  }

  &.active {
    color: #fd5149;
  }
}

.hideSidebar {
  .main-menu-item {
    padding: 0;
    justify-content: center;

    .main-menu-label {
      display: none;
    }
  }
}
</style>
