<template>
  <q-page class="container">
    <div id="registerPage" >
  <h2>Register</h2>
  <input type="text" v-model="nama" id="regNama" placeholder="Nama Lengkap" />
  <input type="text" v-model="nim" id="regNIM" placeholder="Nomor Induk Mahasiswa" />
  <input type="password" v-model="password" id="regPassword" @change="checkPasswrod" placeholder="Password" />
  <button v-if="!passwordValid" class="bg-grey">Daftar</button>
  <button @click="register" v-if="passwordValid">Daftar</button>
  <p style="text-align:center;">Sudah punya akun? <a @click="showLogin()">Login</a></p>
</div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar()
const router = useRouter();

const nama = ref('')
const nim = ref('')
const password = ref('')

const passwordValid = ref(false)

function checkPasswrod() {
  if (password.value.length < 6) {
    passwordValid.value = false
  } else {
    passwordValid.value = true
  }
}

function register() {
  api.post('/register', {
    nama_lengkap: nama.value,
    nim: nim.value,
    password: password.value
  }).then(resp => {
    console.log(resp)
    $q.notify({
      message: 'Registrasi berhasil, silakan login',
      color: 'green',
      position: 'top',
    })
    router.push('/login')
  }).catch(err => {
    console.error(err)
    $q.notify({
      message: 'registrasi gagal, silakan coba lagi',
      color: 'red',
      position: 'top',
    })
  })
}
function showLogin() {
  router.push('/login')
}
</script>



<style scoped>

</style>
