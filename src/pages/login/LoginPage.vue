<template>
  <q-page
    class="flex flex-center"
    style="background: linear-gradient(160deg, #a7f3d0, #f0abfc); min-height: 100vh"
  >
    <!-- PHONE FRAME -->
    <div
      style="
        width: 360px;
        background: white;
        border-radius: 32px;
        overflow: hidden;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
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
        <div style="font-size: 28px; font-weight: 700">Hello!</div>
        <div style="font-size: 16px; margin-top: 4px">Welcome to Class Reminder</div>
      </div>

      <!-- FORM -->
      <div style="padding: 28px 24px 40px">
        <div style="font-size: 20px; font-weight: 600; color: #166534; margin-bottom: 20px">
          Login
        </div>

        <q-input filled rounded label="Email" class="q-mb-lg" v-model="email" />

        <q-input
          filled
          rounded
          type="password"
          label="Password"
          class="q-mb-lg"
          v-model="password"
        />

        <div class="text-right text-caption text-green-10 q-mb-lg cursor-pointer">
          Forgot Password?
        </div>

        <q-btn
          label="Login"
          class="full-width q-mb-xl"
          style="
            background: #166534;
            color: white;
            border-radius: 25px;
            height: 48px;
            font-size: 16px;
          "
          @click="login"
        />

        <!-- Social Login -->
        <div class="column items-center q-mt-sm">
          <div class="text-caption text-grey q-mb-sm">or login with</div>

          <div class="row justify-center q-gutter-md">
            <q-btn
              round
              flat
              icon="fa-brands fa-facebook-f"
              style="background: white; color: #1877f2"
              @click="loginWithFacebook"
            />

            <q-btn round flat style="background: white" @click="loginWithGoogle">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                style="width: 20px; height: 20px"
              />
            </q-btn>

            <q-btn
              round
              flat
              icon="fa-brands fa-apple"
              style="background: white; color: #000"
              @click="loginWithApple"
            />
          </div>
        </div>

        <div class="text-center text-caption q-mt-xl">
          Don’t have an account?
          <router-link to="/signup" class="text-green-10 text-bold"> Sign Up </router-link>
        </div>
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

// 🔐 LOGIN MANUAL → DASHBOARD
function login() {
  if (!email.value || !password.value) {
    return
  }

  // simulasi login berhasil
  router.push('/app')
}

// 🔐 LOGIN GOOGLE
function loginWithGoogle() {
  router.push('/app')
}

// 🔐 LOGIN FACEBOOK
function loginWithFacebook() {
  router.push('/app')
}

// 🔐 LOGIN APPLE
function loginWithApple() {
  router.push('/app')
}
</script>
