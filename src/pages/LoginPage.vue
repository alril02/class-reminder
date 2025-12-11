<template>
  <q-page
    class="reminder flex flex-center"
    :style="{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <!-- CARD -->
    <div class="login-card shadow-3 animate__animated animate__fadeIn animate__faster">
      <!-- HEADER -->
      <div class="header-section">
        <div class="text-h5 text-white text-bold">Hello!</div>
        <div class="text-subtitle2 text-white">Welcome to Class Reminder</div>

        <q-img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          class="header-icon animate__animated animate__zoomIn"
        />
      </div>

      <!-- FORM -->
      <div class="form-section animate__animated animate__fadeInUp animate__fast">
        <div class="text-h6 text-center q-mb-md text-teal-8">Login</div>

        <q-input filled rounded label="Email" class="q-mb-md input-field" />
        <q-input filled rounded type="password" label="Password" class="q-mb-sm input-field" />

        <div class="text-right text-caption text-primary q-mb-md cursor-pointer">
          Forgot Password?
        </div>

        <!-- LOGIN BUTTON -->
        <q-btn label="LOGIN" class="login-btn full-width q-mb-md" />

        <!-- Social Login -->
        <div class="column items-center q-mt-sm">
          <div class="text-caption text-grey q-mb-sm">or login with</div>

          <div class="row justify-center q-gutter-md">
            <q-btn round flat icon="fab fa-facebook-f" class="social-btn" />
            <q-btn round flat icon="fab fa-google" class="social-btn" />
            <q-btn round flat icon="fab fa-apple" class="social-btn" />
          </div>
        </div>

        <div class="text-center text-caption q-mt-md">
          Don’t have an account?
          <router-link to="/signup" class="text-primary text-bold">Sign Up</router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import bgImage from 'src/assets/bg-reminder.jpg'
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

/* CARD */
.login-card {
  width: 360px;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 35px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  animation-duration: 0.45s !important;
}

/* HEADER */
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

/* FORM */
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

/* BUTTON LOGIN */
.login-btn {
  background: linear-gradient(160deg, #71c9a5, #3eb489);
  color: white;
  height: 45px;
  border-radius: 25px;
  transition: 0.3s;
}
.login-btn:hover {
  filter: brightness(1.1);
}

/* Social buttons */
.social-btn {
  background: white;
  color: black;
  width: 45px;
  height: 45px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* Responsif */
@media (max-width: 420px) {
  .login-card {
    width: 90%;
  }
}
</style>
