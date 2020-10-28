
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        name: 'livesSearch',
        path: '/livesSearch/:date/:category',
        component: () => import('pages/LivesSearch.vue')
      },
      {
        name: 'live',
        path: '/live/:slug',
        component: () => import('pages/Live.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
