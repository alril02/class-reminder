<template>
  <q-page class="min-h-screen flex justify-center items-center bg-[#f0f4f5] p-8">
    <q-card class="flex max-w-[900px] w-full rounded-xl shadow-xl overflow-hidden">
      <!-- LEFT PANEL -->
      <div
        class="w-1/2 bg-[#3CA89E] text-white flex flex-col justify-center p-12 relative rounded-l-xl"
      >
        <!-- Logo / Brand -->
        <div class="flex items-center justify-center mb-10 space-x-3">
          <q-icon
            name="dashboard"
            size="36px"
            color="white"
            class="bg-white/10 p-2 rounded-full shadow-sm"
          />
          <span class="text-xl tracking-wide font-semibold">Diprella</span>
        </div>

        <!-- Welcome Section -->
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p class="mb-10 opacity-80 text-sm leading-relaxed">
            To keep connected with us please<br />
            login with your personal info
          </p>

          <q-btn
            flat
            label="SIGN IN"
            rounded
            class="border border-white w-32 text-sm font-semibold hover:bg-white hover:text-[#3CA89E] transition"
            @click="goToLogin"
          />
        </div>
      </div>

      <!-- RIGHT PANEL -->
      <div class="w-1/2 bg-white p-12 flex flex-col items-center text-center rounded-r-xl">
        <h2 class="text-[#3CA89E] text-2xl font-semibold mb-6">Create Account</h2>

        <!-- Social Buttons -->
        <div class="flex gap-3 mb-6">
          <q-btn
            flat
            rounded
            icon="mdi-facebook"
            class="border border-gray-300 text-gray-700 w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
          />
          <q-btn
            flat
            rounded
            icon="mdi-google"
            class="border border-gray-300 text-gray-700 w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
          />
          <q-btn
            flat
            rounded
            icon="mdi-linkedin"
            class="border border-gray-300 text-gray-700 w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
          />
        </div>

        <p class="text-gray-400 text-xs mb-6 max-w-[260px]">or use your email for registration:</p>

        <!-- FORM -->
        <q-form @submit.prevent="onRegister" class="w-full max-w-[320px]">
          <q-input
            filled
            rounded
            dense
            v-model="form.name"
            type="text"
            placeholder="Name"
            class="mb-4 bg-[#f9fafb]"
            :before="[{ icon: 'person', class: 'text-gray-400 text-xs' }]"
          />
          <q-input
            filled
            rounded
            dense
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="mb-4 bg-[#f9fafb]"
            :before="[{ icon: 'email', class: 'text-gray-400 text-xs' }]"
          />
          <q-input
            filled
            rounded
            dense
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="mb-8 bg-[#f9fafb]"
            :before="[{ icon: 'lock', class: 'text-gray-400 text-xs' }]"
          />

          <q-btn
            type="submit"
            label="SIGN UP"
            rounded
            class="bg-[#3CA89E] text-white w-full text-sm font-semibold hover:bg-[#329785] transition"
          />
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  name: '',
  email: '',
  password: '',
})

const goToLogin = () => {
  router.push('/login')
}

const onRegister = () => {
  console.log('Form submitted:', form.value)
  // TODO: panggil API registrasi di sini
}
</script>
