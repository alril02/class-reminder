const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // ✅ Default halaman pertama → Login
      {
        path: '',
        component: () => import('pages/LoginPage.vue'),
      },

      // ✅ Login → setelah login pindah ke /signup
      {
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
      },

      // ✅ Signup → setelah signup pindah ke /schedule
      {
        path: 'signup',
        component: () => import('pages/SignUpPage.vue'),
      },

      // ✅ Debug (opsional)
      {
        path: 'debug',
        component: () => import('pages/DebugPage.vue'),
      },

      // ✅ Halaman Schedule
      {
        path: 'schedule',
        component: () => import('pages/SchedulePage.vue'),
      },

      // ✅ Halaman Tasks
      {
        path: 'tasks',
        component: () => import('pages/TasksPage.vue'),
      },

      // ✅ Settings
      {
        path: 'settings',
        component: () => import('pages/SettingsPage.vue'),
      },
    ],
  },

  // ✅ Register (kalau kamu masih pakai)
  {
    path: '/register',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/RegisterPage.vue') }],
  },
]

export default routes
