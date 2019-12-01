const routes = [
  { path: '/', redirect: '/list/index' },
  { path: '/home', component: () => import('../pages/index.vue') },
  { path: '/login', component: () => import('../pages/login.vue') },
  {
    path: '/list',
    redirect: '/list/index',
    // component 这里会填充上FirstFloorLayout
    children: [
      {
        path: 'index',
        component: () => import('../pages/list/index.vue'),
      },
      {
        path: 'detail',
        redirect: '/list/detail/1',
        // component 这里会填充上SecondFloorLayout
        children: [
          {
            path: '1',
            component: () => import('../pages/list/detail.vue'),
          },
          {
            path: '2',
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
