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
        <div class="text-h5 text-white text-bold q-mb-xs">Create Account</div>
        <div class="text-subtitle2 text-white">Join Class Reminder</div>
        <q-img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          style="width: 70px; height: 70px; margin-top: 10px"
        />
      </div>

      <!-- Form signup -->
      <div class="q-pa-md full-width" style="margin-top: -20px">
        <div class="text-h6 text-center q-mb-md">Sign Up</div>

        <!-- ✅ Kolom Nama -->
        <q-input
          filled
          rounded
          v-model="name"
          label="Full Name"
          class="q-mb-md input-field"
          bg-color="white"
        />

        <!-- ✅ Kolom Email -->
        <q-input
          filled
          rounded
          v-model="email"
          label="Email"
          class="q-mb-md input-field"
          bg-color="white"
        />

        <!-- ✅ Kolom Password -->
        <q-input
          filled
          rounded
          v-model="password"
          label="Password"
          type="password"
          class="q-mb-md input-field"
          bg-color="white"
        />

        <!-- ✅ Konfirmasi Password -->
        <q-input
          filled
          rounded
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          class="q-mb-md input-field"
          bg-color="white"
        />

        <!-- Tombol Signup -->
        <q-btn
          label="SIGN UP"
          color="green"
          class="full-width text-white q-mb-md"
          style="border-radius: 25px; height: 45px"
        />

        <!-- 🔹 Tambahan: Login dengan akun sosial -->
        <div class="column items-center q-mt-sm">
          <div class="text-caption text-grey q-mb-sm">or sign up with</div>
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

        <!-- 🔹 Link ke Login -->
        <div class="text-center text-caption q-mt-md">
          Already have an account?
          <router-link to="/login" class="text-green text-bold">Login</router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
</script>

<style scoped>
.full-width {
  width: 100%;
}

.input-field {
  font-size: 16px;
  color: black; /* ✅ Huruf terlihat jelas */
}

.q-field__native {
  padding-left: 10px;
}

.q-field__control {
  min-height: 50px; /* ✅ Tinggi input pas */
  border-radius: 25px !important;
}
</style>
