const routeConfig = [
  { path: '/', component: () => import('../pages/index.vue') },
  {
    path: '/list',
    // component 这个字段需要的Layout由vaf填充，这里会填充上FirstFloorLayout
    children: [
      {
        path: 'index',
        component: () => import('../pages/list/index.vue'),
      },
      {
        path: 'detail',
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

export default routeConfig;
