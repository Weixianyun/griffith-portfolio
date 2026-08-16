import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: { title: '项目展示' }
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../views/PostsView.vue'),
    meta: { title: '推文' }
  },
  {
    path: '/posts/:id',
    name: 'post-detail',
    component: () => import('../views/PostDetailView.vue'),
    meta: { title: '推文详情' }
  },
  // 兼容旧链接 /diary → /posts
  {
    path: '/diary',
    redirect: '/posts'
  },
  {
    path: '/album',
    name: 'album',
    component: () => import('../views/AlbumView.vue'),
    meta: { title: '相册' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: '关于' }
  },
  // 兜底：未匹配路径跳首页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = `${to.meta.title || '鷹の団'} · 鷹の団`
})

export default router
