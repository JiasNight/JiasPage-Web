import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index.vue'),
    // component: () => import('@/App.vue')
    // redirect: '/home'
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  // {
  //   path: '/three',
  //   name: 'Three',
  //   meta: {
  //     title: '首页'
  //   },
  //   component: () => import('@/views/three/index.vue')
  // },
  {
    path: '/article',
    name: 'Markdown',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/markdown/index.vue')
  },
  {
    path: '/markdown',
    name: 'Markdown',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/markdown/markdown.vue')
  },
  {
    path: '/word',
    name: 'Word',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/markdown/word.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/login/index.vue')
  }
  // {
  //   path: '/dataView',
  //   name: 'DataView',
  //   meta: {
  //     title: '数据可视化'
  //   },
  //   component: () => import('@/views/bigScreen/index.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(), // History 路由
  // history: createWebHashHistory(), // Hash 路由
  routes: [...commonRoutes]
});

router.beforeEach((to, from, next) => {
  // window.$loadingBar.start();
  const isLogin = localStorage.TOKEN ? true : false;
  if (to.path === '/login') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
});

router.afterEach(() => {
  // window.$loadingBar.finish();
});

export default router;
