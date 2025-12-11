<template>
  <q-page class="dashboard-mobile">
    <!-- HEADER (KANAN ATAS) -->
    <div class="header-mobile">
      <div class="header-day">{{ currentDayName }}</div>
      <div class="header-date">{{ currentDate }}</div>
    </div>

    <!-- SIDEBAR HARI (KIRI) -->
    <div class="day-sidebar" :class="{ collapsed: sidebarCollapsed }">
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
  { label: 'M', value: 'mon' },
  { label: 'T', value: 'tue' },
  { label: 'W', value: 'wed' },
  { label: 'T', value: 'thu' },
  { label: 'F', value: 'fri' },
  { label: 'S', value: 'sat' },
  { label: 'S', value: 'sun' },
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
  top: 70px;
  left: 12px;
  width: 60px;
  background: rgba(0, 0, 0, 0.45);
  padding: 10px;
  border-radius: 16px;
  z-index: 40;
  transition: width 0.25s ease;
}

.day-sidebar.collapsed {
  width: 24px;
  padding: 6px;
}

/* Tombol collapse */
.collapse-btn {
  width: 100%;
  height: 26px;
  background: #222;
  color: #fff;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;
}

.day-selector {
  display: grid;
  gap: 8px;
}

.day-sidebar.collapsed .day-btn {
  opacity: 0;
  pointer-events: none;
}

.day-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #333;
  color: #ddd;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}

.day-btn.active {
  background: #ffb703;
  color: black;
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
