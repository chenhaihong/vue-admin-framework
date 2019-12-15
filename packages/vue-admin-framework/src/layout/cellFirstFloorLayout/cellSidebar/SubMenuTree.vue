<template>
  <div v-show="show" class="submenu-tree-wrapper" @mousemove="mousemove" @mouseleave.stop="mouseleave">
    <div class="first-nav" v-if="firstNav">
      <div class="first-nav-name" :title="firstNav.meta.title || firstNav.meta.name" @click.prevent="firstNavClick(firstNav)">
        {{ firstNav.meta.title || firstNav.meta.name }}
      </div>
    </div>
    <div class="submenu-tree-scrollbar-wrapper" v-if="menu">
      <el-scrollbar class="submenu-tree-scrollbar">
        <el-tree
          ref="subMenuTree"
          :data="menu"
          :props="{ children: 'children', label: 'label' }"
          node-key="id"
          default-expand-all
          :highlight-current="true"
          :indent="8"
          :current-node-key="currentNodeKey"
          icon-class="el-icon-arrow-right"
          @node-click="treeClick"
        >
          <div class="custom-label" slot-scope="{ node }">
            <div class="custom-label__text" :title="node.label">{{ node.label }}</div>
          </div>
        </el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { join } from 'path'
import globalData from '@/helper/globalData'

let _routes = []

export default {
  name: 'SubMenuTree',
  data() {
    return {
      show: false,
      firstNav: null,
      menu: null,
      currentNodeKey: ''
    }
  },
  props: {
    // 如果有这个值，表示是移入移出场景使用的副菜单
    hoverMenu: {
      type: Boolean,
      default: false
    },
    mousemove: {
      type: Function,
      default: function() {}
    },
    mouseleave: {
      type: Function,
      default: function() {}
    },
    hoverMainMenuName: {
      type: String,
      default: null
    }
  },
  watch: {
    $route(next) {
      if (!this.hoverMenu) {
        const firstNav = next.matched[0]
        const route = getRoute(next.matched[0].name)

        this.currentNodeKey = next.name
        this.firstNav = firstNav
        this.show = true

        if (route) {
          this.menu = transformRoute(route)
          this.$nextTick(() => {
            this.$refs['subMenuTree'].setCurrentKey(next.name)
          })
        } else {
          this.menu = []
        }
        this.$store.dispatch('VafLayout/toggleSubMenu', { show: !!route })
      }
    }
  },
  created() {
    const routeConfig = globalData.get('routeConfig', {})
    _routes = routeConfig.routes || []

    if (!this.hoverMenu) {
      // 使用当前路由对应的菜单
      this.$_setMenuOfRoute()
    }
  },
  methods: {
    treeClick(item) {
      // (1) 如果item包含children，则直接展开
      // (2) 否则，进入下个路由
      if (!item.children) {
        this.$router.push(item.path)
      }
    },
    firstNavClick(item) {
      const { redirect, path } = item
      if (redirect) {
        return this.$router.push(redirect)
      }
      this.$router.push(path)
    },
    // 使用当前路由对应的菜单
    $_setMenuOfRoute() {
      const firstNav = this.$route.matched[0]
      const route = getRoute(firstNav.name)

      this.currentNodeKey = this.$route.name
      this.firstNav = firstNav
      this.show = true

      if (route) {
        this.menu = transformRoute(route)
      } else {
        this.menu = []
      }
      this.$store.dispatch('VafLayout/toggleSubMenu', { show: !!route })
    }
  }
}

// 通过第一层路由的name字段拿到对应的路由列表
function getRoute(firstNavName) {
  for (const current of _routes) {
    if (current.name === firstNavName) {
      if (current.children && current.subMenu !== false) {
        return current
      }
      break
    }
  }
  return null
}

// 取出二三层路由的数据，同时，把格式转换成树组件需要的格式
function transformRoute(route, pre) {
  if (!route || !route.children) {
    return null
  }
  if (!pre) {
    pre = route.path
  }
  const menu = []
  route.children.forEach((item) => {
    if (item.hidden !== true) {
      const path = join(pre, item.path)
      menu.push({
        id: item.name,
        label: item.meta ? item.meta.title || item.meta.name : '未定义',
        path,
        children: transformRoute(item, path)
      })
    }
  })
  return menu
}
</script>

<style lang="less" scoped>
@import '~@/style/variables';

.submenu-tree-wrapper {
  width: @subMenuWidth;
  height: 100%;
  overflow: hidden;

  border-right: 1px solid @sideBarBorderColor;
  box-sizing: border-box;
}

.first-nav {
  z-index: 1;
  position: relative;
  padding: 0 @firstNavPadding;
  height: @navbarHeight;
  line-height: @navbarHeight;
  overflow: hidden;
  word-wrap: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .first-nav-name {
    font-size: @firstNavFontSize;
    font-weight: 400 !important;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
      cursor: pointer;
      color: @firstNavColorHover;
    }
  }
}

.submenu-tree-scrollbar-wrapper {
  width: @subMenuWidth;
  height: calc(100vh - @navbarHeight);
  overflow: hidden;
}

.submenu-tree-scrollbar {
  height: 100% !important;

  /deep/ .el-scrollbar__wrap {
    overflow: auto;
  }

  /deep/ .is-vertical {
    right: 0;
  }
}

.el-tree /deep/ {
  & {
    padding: @subMenuPadding;
    width: @subMenuWidth;
    font-size: @subMenuFontSize;
    box-sizing: border-box;
  }

  /deep/ .el-tree-node__expand-icon {
    margin-right: @subMenuIconMarginRight;
    padding: 0 @subMenuIconPadding;
    width: @subMenuIconWidth;
    text-align: center;
  }

  /deep/ .el-tree-node__content {
    margin: @subMenuContentMargin 0;
    width: @subMenuContentWidth;
    height: @subMenuContentHeight;
    color: @subMenuContentColor;
    border-radius: 3px;
    box-sizing: border-box;

    &:hover {
      color: @subMenuContentColorHover;
      background-color: transparent;

      .custom-label {
        color: @subMenuContentColorHover;
      }
    }

    .custom-label {
      padding-right: 8px;
      overflow: hidden;
      word-wrap: normal;
      white-space: nowrap;
      text-overflow: ellipsis;

      & > .custom-label__text {
        z-index: 1;
        display: inline;
      }
    }
  }

  /deep/ .is-current > .el-tree-node__content {
    background: @subMenuContentBgColorActive;

    .custom-label > .custom-label__text {
      color: @subMenuContentColorActive;
    }
  }
}
</style>
