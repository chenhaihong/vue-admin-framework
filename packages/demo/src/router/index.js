const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/list/index',
    hidden: true,
  },
  {
    path: '/home',
    name: 'home',
    hidden: false,
    subMenu: false,
    component: () => import('../pages/index.vue'),
    meta: {
      name: '首页',
      title: '首页',
      keepAlive: false,
      fontIcon: 'el-icon-s-home',
    },
  },
  {
    // component 这里会填充上FirstFloorLayout
    path: '/list',
    name: 'list',
    hidden: false,
    subMenu: true,
    redirect: '/list/index',
    meta: {
      name: '列表',
      title: '列表',
      keepAlive: false,
      fontIcon: 'el-icon-menu',
    },
    children: [
      {
        path: 'index',
        hidden: false,
        component: () => import('../pages/list/index.vue'),
      },
      {
        // component 这里会填充上SecondFloorLayout
        path: 'detail',
        hidden: false,
        redirect: '/list/detail/1',
        children: [
          {
            path: ':id',
            component: () => import('../pages/list/detail.vue'),
          },
        ],
      },
    ],
  },
];

const beforeEach = (to, from, next) => {
  next();
};

const afterEach = (to, from) => {};

export default { routes, beforeEach, afterEach };
