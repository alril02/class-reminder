<template>
  <q-page class="container">
    <h2>Login</h2>
  <input type="text" v-model="nim" id="loginNIM" placeholder="Nomor Induk Mahasiswa" />
  <input type="password" v-model="password" id="loginPassword" placeholder="Password" />
  <button @click="login">Masuk</button>
  <p style="text-align:center;">Belum punya akun? <a  @click="showRegister()">Register</a></p>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const nim = ref('');
const password = ref('');
const $q = useQuasar();
const router = useRouter();

function login() {
  api.post('/login', {
    nim: nim.value,
    password: password.value
  }).then(resp => {
    const data = resp.data;
    localStorage.setItem('user', data.token);
    router.push('/dashboard');
  }).catch(err => {
    console.error(err);
    $q.notify({
      message: 'Login gagal, silakan periksa NIM dan password Anda',
      color: 'red',
      position: 'top',
    });
  });
}

function showRegister() {
  router.push('/');
}
</script>

<style scoped>

</style>
