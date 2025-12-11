<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <!-- CENTERED CARD -->
    <div class="max-w-4xl w-full bg-white rounded-2xl shadow-2xl flex overflow-hidden relative">
      <!-- LEFT PANEL (TEAL) -->
      <div class="w-2/5 bg-gradient-to-br from-emerald-400 to-emerald-500 text-white p-10 relative">
        <!-- small logo top-left -->
        <div class="absolute top-6 left-6 flex items-center gap-3">
          <div class="w-10 h-10 rounded border border-white p-1 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span class="font-semibold">Diprella</span>
        </div>

        <div class="h-full flex flex-col justify-center items-start pl-10 pr-6">
          <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-4">Welcome Back!</h1>
          <p class="text-sm md:text-base opacity-90 mb-8 max-w-xs">
            To keep connected with us please login with your personal info
          </p>

          <button
            class="border border-white rounded-full px-8 py-2 text-sm font-semibold hover:bg-white hover:text-emerald-600 transition"
          >
            SIGN IN
          </button>
        </div>

        <!-- decorative circle -->
        <div
          class="absolute -left-24 -bottom-24 w-44 h-44 bg-yellow-300 rounded-full opacity-30"
        ></div>
      </div>

      <!-- RIGHT PANEL (FORM) -->
      <div class="w-3/5 p-12 flex flex-col items-center justify-center">
        <h2 class="text-2xl md:text-3xl font-semibold text-emerald-500 mb-4">Create Account</h2>

        <!-- social buttons -->
        <div class="flex items-center gap-4 mb-4">
          <button
            class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-700 hover:bg-gray-100"
          >
            f
          </button>
          <button
            class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-700 hover:bg-gray-100"
          >
            G+
          </button>
          <button
            class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-700 hover:bg-gray-100"
          >
            in
          </button>
        </div>

        <p class="text-xs text-gray-400 mb-6">or use your email for registration:</p>

        <form class="w-full max-w-sm space-y-4">
          <!-- Name -->
          <div class="relative">
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Name"
              class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <!-- Email -->
          <div class="relative">
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 12H8m8 0a4 4 0 00-8 0m8 0v4m0 0H8"
                />
              </svg>
            </div>
            <input
              type="email"
              placeholder="Email"
              class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <!-- Password -->
          <div class="relative">
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 11c1.657 0 3 .895 3 2v2H9v-2c0-1.105 1.343-2 3-2z"
                />
              </svg>
            </div>
            <input
              type="password"
              placeholder="Password"
              class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div class="pt-6 flex justify-center">
            <button
              type="submit"
              class="px-8 py-2 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition"
            >
              SIGN UP
            </button>
          </div>
        </form>
      </div>

      <!-- small shadow decoration under card -->
      <div
        class="absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-11/12 h-6 bg-white/0 shadow-2xl rounded-2xl pointer-events-none"
      ></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
</style>
