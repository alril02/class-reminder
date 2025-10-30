const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: '/signup', component: () => import('pages/SignUpPage.vue') },
    ],
  },
]

export default routes
