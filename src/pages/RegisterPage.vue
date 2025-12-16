<template>
  <q-page class="auth-wrapper">
    <div class="auth-container" :class="{ 'show-login': showLogin }">
      <!-- LEFT PANEL -->
      <div class="auth-panel left-panel">
        <div v-if="showLogin">
          <div class="text-h4 text-bold q-mb-sm">Welcome Back!</div>
          <div class="text-subtitle2 text-center q-mb-xl" style="max-width: 280px">
            To keep connected with us please login with your personal info
          </div>
          <q-btn
            label="SIGN IN"
            color="white"
            text-color="teal"
            class="q-px-xl q-py-sm"
            style="border-radius: 25px"
            @click="showLogin = false"
          />
        </div>
        <div v-else>
          <div class="text-h4 text-bold q-mb-sm">Hello, Friend!</div>
          <div class="text-subtitle2 text-center q-mb-xl" style="max-width: 280px">
            Enter your personal details and start journey with us
          </div>
          <q-btn
            label="SIGN UP"
            color="white"
            text-color="teal"
            class="q-px-xl q-py-sm"
            style="border-radius: 25px"
            @click="showLogin = true"
          />
        </div>
      </div>

      <!-- RIGHT PANEL -->
      <div class="auth-panel right-panel">
        <transition name="fade">
          <div v-if="showLogin" key="login" style="width: 100%">
            <div class="text-h5 text-bold q-mb-md">Diprella</div>
            <div class="text-h4 text-bold q-mb-sm">Sign in to Diprella</div>

            <div class="row q-gutter-md q-mb-md">
              <q-btn round flat icon="fa-brands fa-facebook-f" />
              <q-btn round flat icon="fa-brands fa-google-plus-g" />
              <q-btn round flat icon="fa-brands fa-linkedin-in" />
            </div>

            <div class="text-caption text-grey q-mb-md">or use your email account:</div>

            <q-input filled rounded label="Email" class="q-mb-md" />
            <q-input filled rounded type="password" label="Password" class="q-mb-sm" />

            <div class="text-caption text-right text-teal-10 q-mb-md">Forgot your password?</div>

            <q-btn
              label="SIGN IN"
              class="full-width"
              color="teal"
              style="border-radius: 25px; height: 45px"
            />
          </div>

          <div v-else key="register" style="width: 100%">
            <div class="text-h4 text-bold text-teal-10 q-mb-md">Create Account</div>

            <div class="row q-gutter-md q-mb-md">
              <q-btn round flat icon="fa-brands fa-facebook-f" style="background: #f0f0f0" />
              <q-btn round flat icon="fa-brands fa-google-plus-g" style="background: #f0f0f0" />
              <q-btn round flat icon="fa-brands fa-linkedin-in" style="background: #f0f0f0" />
            </div>

            <div class="text-caption text-grey q-mb-md">or use your email for registration:</div>

            <q-input filled rounded label="Name" class="q-mb-md" />
            <q-input filled rounded label="Email" class="q-mb-md" />
            <q-input filled rounded type="password" label="Password" class="q-mb-lg" />

            <q-btn
              label="SIGN UP"
              class="full-width"
              style="background: #0f766e; color: white; border-radius: 25px; height: 45px"
            />
          </div>
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const showLogin = ref(true)
</script>

<style scoped>
.auth-wrapper {
  background: linear-gradient(160deg, #a7f3d0, #f0abfc);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.auth-container {
  width: 720px;
  height: 480px;
  background: white;
  border-radius: 32px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  display: flex;
  overflow: hidden;
  position: relative;
  transition: transform 0.5s ease;
}
.auth-panel {
  width: 50%;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.left-panel {
  background: #0f766e;
  color: white;
}
.right-panel {
  background: white;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
