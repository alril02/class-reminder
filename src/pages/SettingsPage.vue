<template>
  <q-page>
    <div class="settings-wrapper">
      <!-- PROFILE -->
      <div class="profile-header">
        <img :src="profile.avatarUrl" class="profile-avatar" />
        <div>
          <div class="profile-name">{{ profile.name }}</div>
          <div class="profile-subtext">Edit personal details</div>
        </div>
      </div>

      <!-- APPEARANCE -->
      <div class="section">
        <div class="section-title">Appearance</div>
        <div class="section-item">
          <span>Dark Mode</span>
          <q-toggle v-model="darkMode" color="primary" />
        </div>
      </div>

      <!-- PROFILE SETTINGS -->
      <div class="section">
        <div class="section-title">Profile</div>

        <div class="section-item" @click="openEditProfile">Edit Profile</div>
        <div class="section-item" @click="showChangePassword = true">Change Password</div>
        <div class="section-item" @click="showChangeEmail = true">Change Email</div>
      </div>

      <!-- NOTIFICATIONS -->
      <div class="section">
        <div class="section-title">Notifications</div>
        <div class="section-item">
          <span>Notifications</span>
          <q-toggle v-model="notifications" color="primary" />
        </div>
      </div>

      <!-- REGIONAL -->
      <div class="section">
        <div class="section-title">Regional</div>

        <div class="section-item" @click="goTo('language')">Language</div>
        <div class="section-item logout" @click="logout">Logout</div>
      </div>

      <!-- PRODUCTIVITY -->
      <div class="section">
        <div class="section-title">Productivity</div>

        <div class="section-item" @click="router.push('/schedule')">
          <span>Schedule</span>
          <span class="arrow">›</span>
        </div>

        <div class="section-item" @click="router.push('/tasks')">
          <span>Tasks</span>
          <span class="arrow">›</span>
        </div>
      </div>

      <!-- VERSION -->
      <div class="version-text">App ver 2.0.1</div>

      <!-- EDIT PROFILE DIALOG -->
      <q-dialog v-model="showEditProfile">
        <q-card style="width: 360px; max-width: 90vw">
          <q-card-section>
            <div class="text-h6">Edit Profile</div>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <div class="column items-center q-mb-md">
              <q-avatar size="72px">
                <img :src="previewAvatar || profile.avatarUrl" />
              </q-avatar>

              <q-btn flat color="primary" label="Ganti Foto" class="q-mt-sm" @click="pickAvatar" />

              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="onAvatarSelected"
              />
            </div>

            <q-input filled label="Nama Lengkap" v-model="editName" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Batal" color="grey" v-close-popup />
            <q-btn unelevated label="Simpan" color="primary" @click="saveProfile" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- CHANGE PASSWORD -->
      <q-dialog v-model="showChangePassword">
        <q-card style="width: 360px; max-width: 90vw">
          <q-card-section>
            <div class="text-h6">Change Password</div>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input filled type="password" label="Current Password" v-model="currentPassword" />
            <q-input filled type="password" label="New Password" v-model="newPassword" />
            <q-input
              filled
              type="password"
              label="Confirm New Password"
              v-model="confirmPassword"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Batal" color="grey" v-close-popup />
            <q-btn unelevated label="Simpan" color="primary" @click="saveNewPassword" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- CHANGE EMAIL -->
      <q-dialog v-model="showChangeEmail">
        <q-card style="width: 360px; max-width: 90vw">
          <q-card-section>
            <div class="text-h6">Change Email</div>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input filled label="Current Email" v-model="currentEmail" />
            <q-input filled label="New Email" v-model="newEmail" />
            <q-input filled label="Confirm New Email" v-model="confirmEmail" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Batal" color="grey" v-close-popup />
            <q-btn unelevated label="Simpan" color="primary" @click="saveNewEmail" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* === BACKGROUND SAMA SEPERTI TASKS === */
const style = document.createElement('style')
style.innerHTML = `
  .q-page {
    background: linear-gradient(to bottom right, #ffdde1, #fcb69f);
    min-height: 100vh;
    padding: 0 !important;
    display: flex;
    justify-content: center;
  }

  .settings-wrapper {
    width: 100%;
    max-width: 480px;
    background: #ffffff;
    padding: 20px;
    margin-top: 20px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }

  .profile-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .profile-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
  }

  .profile-name {
    font-size: 18px;
    font-weight: 600;
  }

  .profile-subtext {
    font-size: 13px;
    color: #666;
  }

  .section {
    margin-bottom: 24px;
  }

  .section-title {
    font-size: 14px;
    font-weight: bold;
    color: #555;
    margin-bottom: 12px;
  }

  .section-item {
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .arrow {
    font-size: 18px;
    color: #999;
  }

  .logout {
    color: #b91c1c;
  }

  .version-text {
    text-align: center;
    font-size: 12px;
    color: #aaa;
    margin-top: 40px;
  }
`
document.head.appendChild(style)

/* === DATA === */
const darkMode = ref(false)
const notifications = ref(true)

const profile = ref({
  name: 'Kapil Mohan',
  avatarUrl: 'https://i.pravatar.cc/80?u=kapil',
})

onMounted(() => {
  const saved = localStorage.getItem('profile')
  if (saved) profile.value = JSON.parse(saved)
})

/* === EDIT PROFILE === */
const showEditProfile = ref(false)
const editName = ref('')
const previewAvatar = ref('')
const avatarInput = ref(null)

function openEditProfile() {
  editName.value = profile.value.name
  previewAvatar.value = ''
  showEditProfile.value = true
}

function pickAvatar() {
  avatarInput.value?.click()
}

function onAvatarSelected(event) {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    previewAvatar.value = e.target?.result
  }
  reader.readAsDataURL(file)
}

function saveProfile() {
  if (!editName.value) {
    alert('Nama tidak boleh kosong')
    return
  }

  profile.value.name = editName.value
  if (previewAvatar.value) profile.value.avatarUrl = previewAvatar.value

  localStorage.setItem('profile', JSON.stringify(profile.value))
  showEditProfile.value = false
  alert('Profil berhasil diperbarui')
}

/* === CHANGE PASSWORD === */
const showChangePassword = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

function saveNewPassword() {
  const savedPassword = localStorage.getItem('password')

  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    alert('Semua field wajib diisi')
    return
  }

  if (currentPassword.value !== savedPassword) {
    alert('Password lama salah')
    return
  }

  if (newPassword.value.length < 6) {
    alert('Password baru minimal 6 karakter')
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    alert('Password baru dan konfirmasi tidak sama')
    return
  }

  localStorage.setItem('password', newPassword.value)
  showChangePassword.value = false
  alert('Password berhasil diganti')
}

/* === CHANGE EMAIL === */
const showChangeEmail = ref(false)
const currentEmail = ref('')
const newEmail = ref('')
const confirmEmail = ref('')

function saveNewEmail() {
  const savedEmail = localStorage.getItem('email')

  if (!currentEmail.value || !newEmail.value || !confirmEmail.value) {
    alert('Semua field wajib diisi')
    return
  }

  if (currentEmail.value !== savedEmail) {
    alert('Email lama salah')
    return
  }

  if (!newEmail.value.includes('@') || !newEmail.value.includes('.')) {
    alert('Format email tidak valid')
    return
  }

  if (newEmail.value !== confirmEmail.value) {
    alert('Email baru dan konfirmasi tidak sama')
    return
  }

  localStorage.setItem('email', newEmail.value)
  showChangeEmail.value = false
  alert('Email berhasil diganti')
}

/* === NAVIGASI === */
function goTo(page) {
  router.push(`/${page}`)
}

/* === LOGOUT === */
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    router.push('/login')
  }
}
</script>
