const routes = [
  // redirect utama
  {
    path: '/',
    redirect: '/login',
  },

  // LOGIN
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/login/LoginPage.vue'),
      },
    ],
  },

  // SIGN UP
  {
    path: '/signup',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/login/SignUpPage.vue'),
      },
    ],
  },

  // MAIN APP
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/schedule/DashboardPage.vue'),
      },
      {
        path: 'tasks',
        component: () => import('pages/schedule/TasksPage.vue'),
      },
      {
        path: 'schedule',
        component: () => import('pages/schedule/SchedulePage.vue'),
      },
      {
        path: 'settings',
        component: () => import('pages/schedule/SettingsPage.vue'),
      },
    ],
  },

  // 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
