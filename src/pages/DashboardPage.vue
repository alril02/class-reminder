<template>
  <q-page class="dashboard-mobile">
    <!-- HEADER (KANAN ATAS) -->
    <div class="header-mobile">
      <div class="header-day">{{ currentDayName }}</div>
      <div class="header-date">{{ currentDate }}</div>
    </div>

    <!-- SIDEBAR HARI (KIRI) -->
    <div class="day-sidebar" :class="{ collapsed: sidebarCollapsed }">
      <!-- BAGIAN ATAS: GRID 4 KOTAK -->
      <div class="sidebar-top">
        <button class="grid-btn">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </button>
      </div>

      <!-- BAGIAN TENGAH: HARI + TOMBOL COLLAPSE -->
      <div class="sidebar-middle">
        <!-- Tombol collapse -->
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          <span v-if="!sidebarCollapsed">❮</span>
          <span v-else>❯</span>
        </button>

        <!-- Tombol hari -->
        <div class="day-selector">
          <button
            v-for="(d, i) in days"
            :key="i"
            class="day-btn"
            :class="{ active: selectedDay === d.value }"
            @click="selectDay(d.value)"
          >
            {{ d.label }}
          </button>
        </div>
      </div>

      <!-- BAGIAN BAWAH: TOMBOL PENGATURAN -->
      <div class="sidebar-bottom">
        <button class="settings-btn">⚙</button>
      </div>
    </div>

    <!-- ISI UTAMA -->
    <div class="content-section" :class="{ expand: sidebarCollapsed }">
      <!-- SCHEDULE -->
      <div class="section-header">
        <span class="title">Schedule</span>
        <q-btn icon="add" round dense color="primary" @click="openAddSchedule()" />
      </div>

      <div v-if="dailySchedule.length === 0" class="empty-note">
        Tidak ada jadwal untuk hari ini.
      </div>

      <div v-for="(item, i) in dailySchedule" :key="i" class="schedule-item">
        <div class="time">{{ item.time }}</div>

        <q-card class="schedule-card" :style="{ background: item.color }" square>
          <div class="card-top">
            <div class="schedule-title">{{ item.title }}</div>
            <div class="card-actions">
              <q-btn dense flat round icon="edit" @click="editSchedule(item, i)" />
              <q-btn dense flat round icon="delete" color="negative" @click="deleteSchedule(i)" />
            </div>
          </div>
          <div class="schedule-sub">{{ item.sub }}</div>
        </q-card>
      </div>

      <!-- TASKS -->
      <div class="section-header q-mt-lg">
        <span class="title">Tasks</span>
        <q-btn icon="add" round dense color="primary" @click="openAddTask()" />
      </div>

      <div v-if="dailyTasks.length === 0" class="empty-note">Tidak ada tugas untuk hari ini.</div>

      <div v-for="(t, i) in dailyTasks" :key="i" class="task-item">
        <q-card class="task-card" :style="{ background: t.color }" square>
          <div class="card-top">
            <div class="task-title">{{ t.title }}</div>
            <div class="card-actions">
              <q-btn dense flat round icon="check" color="white" @click="toggleTask(t)" />
              <q-btn dense flat round icon="edit" @click="editTask(t, i)" />
              <q-btn dense flat round icon="delete" color="negative" @click="deleteTask(i)" />
            </div>
          </div>
          <div class="task-sub">{{ t.sub }}</div>
        </q-card>
      </div>
    </div>

    <!-- DIALOG ADD/EDIT SCHEDULE -->
    <q-dialog v-model="showScheduleDialog">
      <q-card class="q-pa-md" style="min-width: 280px; max-width: 420px">
        <div class="text-h6">
          {{ scheduleEditingIndex === null ? 'Tambah Jadwal' : 'Edit Jadwal' }}
        </div>

        <q-input filled v-model="formSchedule.title" label="Judul" />
        <q-input filled v-model="formSchedule.sub" label="Keterangan" />
        <q-input filled v-model="formSchedule.time" label="Jam (hh:mm)" />
        <q-input filled v-model="formSchedule.color" label="Warna (#HEX)" />

        <div class="dialog-actions row justify-end q-mt-sm">
          <q-btn flat label="Batal" @click="closeScheduleDialog" />
          <q-btn color="primary" label="Simpan" @click="saveSchedule" />
        </div>
      </q-card>
    </q-dialog>

    <!-- DIALOG ADD/EDIT TASK -->
    <q-dialog v-model="showTaskDialog">
      <q-card class="q-pa-md" style="min-width: 280px; max-width: 420px">
        <div class="text-h6">
          {{ taskEditingIndex === null ? 'Tambah Tugas' : 'Edit Tugas' }}
        </div>

        <q-input filled v-model="formTask.title" label="Judul Tugas" />
        <q-input filled v-model="formTask.sub" label="Deskripsi / Deadline" />
        <q-input filled v-model="formTask.color" label="Warna (#HEX)" />

        <div class="dialog-actions row justify-end q-mt-sm">
          <q-btn flat label="Batal" @click="closeTaskDialog" />
          <q-btn color="primary" label="Simpan" @click="saveTask" />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

/* SIDEBAR COLLAPSE */
const sidebarCollapsed = ref(false)

/* HARI */
const days = [
  { label: 'M', value: 'minggu' },
  { label: 'S', value: 'senin' },
  { label: 'S', value: 'selasa' },
  { label: 'R', value: 'rabu' },
  { label: 'K', value: 'kamus' },
  { label: 'J', value: 'jumat' },
  { label: 'S', value: 'sabtu' },
]

const selectedDay = ref('tue')
const selectDay = (d) => (selectedDay.value = d)
const currentDayName = computed(() => selectedDay.value.toUpperCase())
const currentDate = new Date().toLocaleDateString('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

/* SCHEDULE */
const scheduleData = ref({
  tue: [
    { title: 'Project setup', sub: 'Zoom meeting', time: '09:30', color: '#5BC0F8' },
    { title: 'App design', sub: 'Conference call', time: '13:30', color: '#FF9F45' },
    { title: 'Launch details', sub: 'Zoom Meeting', time: '14:00', color: '#A06BFF' },
  ],
})
const dailySchedule = computed(() => scheduleData.value[selectedDay.value] || [])

const showScheduleDialog = ref(false)
const scheduleEditingIndex = ref(null)
const formSchedule = ref({ title: '', sub: '', time: '', color: '#5BC0F8' })

function openAddSchedule() {
  scheduleEditingIndex.value = null
  formSchedule.value = { title: '', sub: '', time: '', color: '#5BC0F8' }
  showScheduleDialog.value = true
}
function editSchedule(item, idx) {
  scheduleEditingIndex.value = idx
  formSchedule.value = { ...item }
  showScheduleDialog.value = true
}
function saveSchedule() {
  const list = scheduleData.value[selectedDay.value] || []
  if (scheduleEditingIndex.value === null) list.push({ ...formSchedule.value })
  else list[scheduleEditingIndex.value] = { ...formSchedule.value }
  scheduleData.value[selectedDay.value] = list
  closeScheduleDialog()
}
function deleteSchedule(i) {
  const list = [...(scheduleData.value[selectedDay.value] || [])]
  list.splice(i, 1)
  scheduleData.value[selectedDay.value] = list
}
function closeScheduleDialog() {
  showScheduleDialog.value = false
  scheduleEditingIndex.value = null
}

/* TASKS */
const taskData = ref({
  tue: [
    { title: 'Complete user testing', sub: 'Deadline 20 Aug', color: '#FFD6A5' },
    { title: 'Plan for meeting', sub: 'Deadline 20 Aug', color: '#F9E2AE' },
  ],
})
const dailyTasks = computed(() => taskData.value[selectedDay.value] || [])

const showTaskDialog = ref(false)
const taskEditingIndex = ref(null)
const formTask = ref({ title: '', sub: '', color: '#FFD6A5' })

function openAddTask() {
  taskEditingIndex.value = null
  formTask.value = { title: '', sub: '', color: '#FFD6A5' }
  showTaskDialog.value = true
}
function editTask(item, idx) {
  taskEditingIndex.value = idx
  formTask.value = { ...item }
  showTaskDialog.value = true
}
function saveTask() {
  const list = taskData.value[selectedDay.value] || []
  if (taskEditingIndex.value === null) list.push({ ...formTask.value })
  else list[taskEditingIndex.value] = { ...formTask.value }
  taskData.value[selectedDay.value] = list
  closeTaskDialog()
}
function deleteTask(i) {
  const list = [...(taskData.value[selectedDay.value] || [])]
  list.splice(i, 1)
  taskData.value[selectedDay.value] = list
}
function toggleTask(t) {
  t.color = t.color === '#7FDB7F' ? '#FFD6A5' : '#7FDB7F'
}
function closeTaskDialog() {
  showTaskDialog.value = false
  taskEditingIndex.value = null
}
</script>

<style scoped>
/* ORIGINAL BACKGROUND */
.dashboard-mobile {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff7e5f, #6a11cb);
  padding: 18px;
  overflow-x: hidden;
  position: relative;
}

/* HEADER KANAN */
.header-mobile {
  position: fixed;
  top: 12px;
  right: 16px;
  color: white;
  z-index: 40;
}
.header-day {
  font-size: 13px;
  opacity: 0.9;
}
.header-date {
  font-size: 28px;
  font-weight: 700;
  margin-top: -4px;
}

/* ===== SIDEBAR KIRI ===== */
.day-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 60px;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
}

/* GRID BUTTON */
.grid-btn {
  width: 40px;
  height: 40px;
  background: #333;
  border: none;
  border-radius: 8px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  padding: 6px;
}

.grid-btn .dot {
  width: 100%;
  height: 100%;
  background: #777;
  border-radius: 4px;
}

/* MIDDLE SECTION */
.sidebar-middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

/* COLLAPSE BUTTON */
.collapse-btn {
  width: 40px;
  height: 40px;
  background: #222;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

/* HARI */
.day-selector {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.day-btn {
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.day-btn.active {
  background: #ffcc00;
  color: #000;
}

/* SETTINGS BUTTON (BOTTOM) */
.settings-btn {
  width: 40px;
  height: 40px;
  background: #333;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  color: white;
  cursor: pointer;
}

/* CONTENT */
.content-section {
  margin-left: 90px;
  margin-top: 100px;
  padding-bottom: 120px;
  transition: margin-left 0.25s ease;
}

.content-section.expand {
  margin-left: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
}

.empty-note {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
}

.schedule-item,
.task-item {
  margin-bottom: 12px;
}

.schedule-card,
.task-card {
  padding: 12px;
  border-radius: 14px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.schedule-title,
.task-title {
  font-weight: bold;
  color: #111;
}
.schedule-sub,
.task-sub {
  font-size: 13px;
  color: #222;
}

@media (max-width: 420px) {
  .content-section {
    margin-left: 70px;
  }
  .content-section.expand {
    margin-left: 30px;
  }
}
</style>
