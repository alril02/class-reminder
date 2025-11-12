<template>
  <q-page class="flex flex-center bg-light-green-1">
    <div
      class="column items-center shadow-2"
      style="width: 350px; background: #f7fdf8; border-radius: 35px; overflow: hidden"
    >
      <!-- Header hijau -->
      <div
        class="full-width flex flex-center column"
        style="
          background: linear-gradient(160deg, #2e7d32, #388e3c);
          height: 180px;
          border-bottom-left-radius: 80px;
        "
      >
        <div class="text-h5 text-white text-bold q-mb-xs">Hello!</div>
        <div class="text-subtitle2 text-white">Welcome to Class Reminder</div>
        <q-img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          style="width: 70px; height: 70px; margin-top: 10px"
        />
      </div>

      <!-- Form login -->
      <div class="q-pa-md full-width" style="margin-top: -20px">
        <div class="text-h6 text-center q-mb-md">Login</div>

        <q-input filled dense label="Email" class="q-mb-md" rounded bg-color="white" />
        <q-input
          filled
          dense
          type="password"
          label="Password"
          class="q-mb-sm"
          rounded
          bg-color="white"
        />

        <div class="text-right text-caption text-green q-mb-md cursor-pointer">
          Forgot Password?
        </div>

        <q-btn
          label="Login"
          color="green"
          class="full-width text-white q-mb-md"
          style="border-radius: 25px; height: 40px"
        />

        <!-- 🔹 Tambahan: Login dengan akun sosial -->
        <div class="column items-center q-mt-sm">
          <div class="text-caption text-grey q-mb-sm">or login with</div>
          <div class="row justify-center q-gutter-md">
            <q-btn
              round
              flat
              icon="fab fa-facebook-f"
              color="blue"
              class="bg-white shadow-1"
              size="md"
            />
            <q-btn
              round
              flat
              icon="fab fa-google"
              color="red"
              class="bg-white shadow-1"
              size="md"
            />
            <q-btn
              round
              flat
              icon="fab fa-apple"
              color="black"
              class="bg-white shadow-1"
              size="md"
            />
          </div>
        </div>

        <div class="text-center text-caption q-mt-md">
          Don’t have an account?
          <router-link to="/signup" class="text-green text-bold">Sign Up</router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup></script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
