const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/pages/login'),
    meta: {
      name: '登录',
      title: '登录'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/index',
    hidden: false,
    subMenu: false,
    meta: {
      name: '总览',
      title: '总览',
      keepAlive: false,
      fontIcon: 'el-icon-s-home'
    },
    children: [
      {
        path: 'index',
        name: 'DashboardIndex',
        component: () => import('@/pages/dashbord'),
        meta: {
          name: '总览',
          title: '总览'
        }
      }
    ]
  },
  {
    // component 这里会填充上FirstFloorLayout
    path: '/list',
    name: 'List',
    hidden: false,
    subMenu: true,
    redirect: '/list/index',
    meta: {
      name: '列表',
      title: '列表',
      keepAlive: false,
      fontIcon: 'el-icon-menu'
    },
    children: [
      {
        path: 'index',
        name: 'ListIndex',
        hidden: false,
        component: () => import('@/pages/list/index'),
        meta: {
          name: '未定义未定义未定义',
          title: '未定义未定义未定义',
          keepAlive: false,
          fontIcon: 'el-icon-menu'
        }
      },
      {
        // component 这里会填充上SecondFloorLayout
        path: 'detail',
        name: 'ListDetail',
        hidden: false,
        redirect: '/list/detail/1',
        children: [
          {
            path: ':id',
            component: () => import('@/pages/list/detail')
          }
        ]
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/login', hidden: true }
]

const beforeEach = (to, from, next) => {
  next()
}

const afterEach = (to, from) => {}

export default { routes, beforeEach, afterEach }
