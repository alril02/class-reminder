<template>
  <q-page
    class="flex flex-center"
    :style="{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <!-- Card -->
    <div class="signup-card shadow-3 animate__animated animate__fadeIn animate__faster">
      <!-- Header Mint Soft -->
      <div class="header-section">
        <div class="text-h5 text-white text-bold">Create Account</div>
        <div class="text-subtitle2 text-white">Join Class Reminder</div>

        <q-img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          class="header-icon animate__animated animate__zoomIn"
        />
      </div>

      <!-- Form Signup -->
      <div class="form-section animate__animated animate__fadeInUp animate__fast">
        <div class="text-h6 text-center q-mb-md text-teal-8">Sign Up</div>

        <q-input filled rounded v-model="name" label="Full Name" class="q-mb-md input-field" />

        <q-input filled rounded v-model="email" label="Email" class="q-mb-md input-field" />

        <q-input
          filled
          rounded
          v-model="password"
          label="Password"
          type="password"
          class="q-mb-md input-field"
        />

        <q-input
          filled
          rounded
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          class="q-mb-md input-field"
        />

        <!-- SIGN UP BUTTON -->
        <q-btn label="SIGN UP" class="signup-btn full-width q-mb-md" />

        <!-- Social Login -->
        <div class="column items-center q-mt-sm">
          <div class="text-caption text-grey q-mb-sm">or sign up with</div>

          <div class="row justify-center q-gutter-md">
            <q-btn round flat icon="fab fa-facebook-f" class="social-btn" />
            <q-btn round flat icon="fab fa-google" class="social-btn" />
            <q-btn round flat icon="fab fa-apple" class="social-btn" />
          </div>
        </div>

        <!-- Link ke Login -->
        <div class="text-center text-caption q-mt-md">
          Already have an account?
          <router-link to="/login" class="text-primary text-bold">Login</router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import bgImage from 'src/assets/bg-reminder.jpg'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

/* Card utama */
.signup-card {
  width: 360px;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 35px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  animation-duration: 0.45s !important;
}

/* Bagian header */
.header-section {
  background: linear-gradient(160deg, #71c9a5, #3eb489);
  height: 180px;
  border-bottom-left-radius: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header-icon {
  width: 70px;
  height: 70px;
  margin-top: 10px;
}

/* Bagian form */
.form-section {
  padding: 20px;
  margin-top: -25px;
  animation-duration: 0.7s !important;
}

.input-field {
  background: white !important;
  border-radius: 25px;
}

.q-field__control {
  min-height: 50px;
  border-radius: 25px !important;
}

.social-btn {
  background: white;
  color: black;
  width: 45px;
  height: 45px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* Tombol utama signup */
.signup-btn {
  background: linear-gradient(160deg, #71c9a5, #3eb489);
  color: white;
  height: 45px;
  border-radius: 25px;
  transition: 0.3s;
}

.signup-btn:hover {
  filter: brightness(1.1);
}

/* Responsif (HP kecil) */
@media (max-width: 420px) {
  .signup-card {
    width: 90%;
  }
}
</style>
