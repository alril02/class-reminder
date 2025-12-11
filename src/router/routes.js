const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'login', //
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'signup',
        component: () => import('pages/SignUpPage.vue'),
      },
      {
        path: 'debug',
        component: () => import('pages/DebugPage.vue'),
      },
      {
        path: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
      },
    ],
  },

  {
    path: '/register',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/RegisterPage.vue') }],
  },
<<<<<<< Updated upstream
=======
{
  path: '/login',
  componen: () =>import('layouts/LoginLayout.vue'),
  children: [
    { path: '', component: () => import('pages/login/LoginPage.vue')}
  ]

},
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
>>>>>>> Stashed changes
]

export default routes
