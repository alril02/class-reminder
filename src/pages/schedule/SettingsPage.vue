<template>
  <q-page class="q-pa-md" style="background: #f9fafb">
    <!-- HEADER -->
    <div class="text-h5 text-bold q-mb-md">Settings</div>

    <!-- PROFILE -->
    <q-card class="q-mb-md" style="border-radius: 16px">
      <q-card-section class="row items-center q-gutter-md">
        <q-avatar size="64px">
          <img v-if="photo" :src="photo" />
          <div
            v-else
            class="flex flex-center bg-green-7 text-white"
            style="width: 100%; height: 100%"
          >
            {{ name.charAt(0) }}
          </div>
        </q-avatar>

        <div>
          <div class="text-subtitle1 text-bold">{{ name }}</div>
          <div class="text-caption text-grey">{{ email }}</div>
        </div>

        <q-btn flat icon="edit" class="q-ml-auto" @click="showEditProfile = true" />
      </q-card-section>
    </q-card>

    <!-- PREFERENCES -->
    <q-card class="q-mb-md" style="border-radius: 16px">
      <q-card-section class="text-subtitle2 text-bold"> Preferences </q-card-section>

      <q-separator />

      <q-item>
        <q-item-section avatar>
          <q-icon name="notifications" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Notifications</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="notifications" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon name="dark_mode" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dark Mode</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="darkMode" />
        </q-item-section>
      </q-item>
    </q-card>

    <!-- ACCOUNT -->
    <q-card style="border-radius: 16px">
      <q-item clickable v-ripple @click="showChangePassword = true">
        <q-item-section avatar>
          <q-icon name="lock" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Change Password</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple @click="logout">
        <q-item-section avatar>
          <q-icon name="logout" color="red" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-red">Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-card>

    <!-- EDIT PROFILE DIALOG -->
    <q-dialog v-model="showEditProfile">
      <q-card style="width: 320px; border-radius: 16px">
        <q-card-section class="text-h6">Edit Profile</q-card-section>

        <q-card-section>
          <q-input v-model="editName" label="Name" filled />
          <q-input v-model="editEmail" label="Email" filled class="q-mt-sm" />

          <q-file
            v-model="photoFile"
            label="Change Photo"
            accept="image/*"
            filled
            class="q-mt-sm"
            @update:model-value="onPhotoChange"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="green" label="Save" @click="saveProfile" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- CHANGE PASSWORD DIALOG -->
    <q-dialog v-model="showChangePassword">
      <q-card style="width: 320px; border-radius: 16px">
        <q-card-section class="text-h6">Change Password</q-card-section>

        <q-card-section>
          <q-input v-model="oldPassword" type="password" label="Old Password" filled />
          <q-input
            v-model="newPassword"
            type="password"
            label="New Password"
            filled
            class="q-mt-sm"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="green" label="Save" @click="changePassword" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* PROFILE DATA */
const name = ref('Vanisa')
const email = ref('vanisa@email.com')
const photo = ref(null)

/* EDIT PROFILE */
const showEditProfile = ref(false)
const editName = ref(name.value)
const editEmail = ref(email.value)
const photoFile = ref(null)

function onPhotoChange(file) {
  if (file) {
    photo.value = URL.createObjectURL(file)
  }
}

function saveProfile() {
  name.value = editName.value
  email.value = editEmail.value
  showEditProfile.value = false
}

/* PASSWORD */
const showChangePassword = ref(false)
const oldPassword = ref('')
const newPassword = ref('')

function changePassword() {
  oldPassword.value = ''
  newPassword.value = ''
  showChangePassword.value = false
}

/* SETTINGS */
const notifications = ref(true)
const darkMode = ref(false)

function logout() {
  router.push('/login')
}
</script>
