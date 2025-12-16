<template>
  <q-page
    class="flex flex-center"
    style="background: linear-gradient(160deg, #a7f3d0, #f0abfc); min-height: 100vh"
  >
    <!-- PHONE FRAME -->
    <div
      style="
        width: 100%;
        max-width: 400px;
        background: white;
        border-radius: 32px;
        overflow: hidden;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        margin: 0 16px;
      "
    >
      <!-- HEADER -->
      <div
        style="
          background: #166534;
          padding: 32px 24px;
          color: white;
          border-bottom-right-radius: 80px;
        "
      >
        <router-link to="/login" class="text-white text-caption" style="text-decoration: underline">
          ‹ Back to login
        </router-link>

        <div style="font-size: 26px; font-weight: 700; margin-top: 10px">Sign Up</div>
      </div>

      <!-- FORM -->
      <div style="padding: 32px 28px 48px">
        <q-input filled rounded label="Username" class="q-mb-lg" v-model="username" />
        <q-input filled rounded label="Email" class="q-mb-lg" v-model="email" />
        <q-input
          filled
          rounded
          type="password"
          label="Password"
          class="q-mb-lg"
          v-model="password"
        />
        <q-input
          filled
          rounded
          type="password"
          label="Confirm Password"
          class="q-mb-xl"
          v-model="confirmPassword"
        />

        <q-btn
          label="Sign Up"
          class="full-width"
          style="
            background: #166534;
            color: white;
            border-radius: 25px;
            height: 48px;
            font-size: 16px;
          "
          @click="signup"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const username = ref('')

function signup() {
  if (!email.value || !password.value || !confirmPassword.value || !username.value) {
    alert('Semua field wajib diisi')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Password dan Confirm Password tidak sama')
    return
  }

  // ✅ Simpan data ke localStorage (permanen)
  localStorage.setItem('username', username.value)
  localStorage.setItem('email', email.value)
  localStorage.setItem('password', password.value)

  // ✅ Redirect ke halaman utama
  router.push('/schedule')
}
</script>
