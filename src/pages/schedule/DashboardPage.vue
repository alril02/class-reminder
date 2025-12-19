<template>
  <q-page padding>
    <!-- HEADER -->
    <div class="text-h6 text-bold q-mb-md">Dashboard – {{ selectedDay }}</div>

    <!-- BUTTON NAV -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-6">
        <q-card class="bg-teal-5 text-white" clickable @click="router.push('/app/schedule')">
          <q-card-section class="text-center">Schedule</q-card-section>
        </q-card>
      </div>

      <div class="col-6">
        <q-card class="bg-amber-5 text-dark" clickable @click="router.push('/app/tasks')">
          <q-card-section class="text-center">Tasks</q-card-section>
        </q-card>
      </div>
    </div>

    <!-- ================= GRID 2 KOLOM ================= -->
    <div class="row q-col-gutter-md">
      <!-- KIRI -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section class="text-bold"> Tambah Schedule </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input v-model="scheduleForm.course" label="Mata Kuliah" dense />

            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-input v-model="scheduleForm.start" type="time" label="Jam Mulai" dense />
              </div>
              <div class="col-6">
                <q-input v-model="scheduleForm.end" type="time" label="Jam Selesai" dense />
              </div>
            </div>

            <q-btn label="Tambah Schedule" color="primary" @click="submitSchedule" />
          </q-card-section>
        </q-card>
      </div>

      <!-- KANAN -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section class="text-bold"> Tambah Task </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input v-model="taskForm.course" label="Mata Kuliah" dense />
            <q-input v-model="taskForm.type" label="Jenis Tugas" dense />
            <q-input v-model="taskForm.deadline" type="date" label="Deadline" dense />

            <q-btn label="Tambah Task" color="secondary" @click="submitTask" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- ================= DATA HARI ================= -->
    <q-card class="q-mt-lg">
      <q-card-section class="text-bold"> Data Hari {{ selectedDay }} </q-card-section>

      <!-- SCHEDULE -->
      <q-card-section>
        <div class="text-subtitle2 q-mb-sm">Schedule</div>
        <div v-if="todaySchedules.length === 0" class="text-grey">Belum ada schedule</div>

        <q-list bordered v-else>
          <q-item v-for="s in todaySchedules" :key="s.id">
            <q-item-section>
              <div class="text-bold">{{ s.course }}</div>
              <div class="text-caption">{{ s.start }} - {{ s.end }}</div>
            </q-item-section>
            <q-item-section side>
              <q-btn icon="delete" flat round color="red" @click="deleteSchedule(s.id)" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- TASK -->
      <q-card-section>
        <div class="text-subtitle2 q-mb-sm">Tasks</div>
        <div v-if="todayTasks.length === 0" class="text-grey">Belum ada task</div>

        <q-list bordered v-else>
          <q-item v-for="t in todayTasks" :key="t.id">
            <q-item-section>
              <div class="text-bold">{{ t.course }}</div>
              <div class="text-caption">{{ t.type }} • {{ t.deadline }}</div>
            </q-item-section>
            <q-item-section side>
              <q-btn icon="delete" flat round color="red" @click="deleteTask(t.id)" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* =====================
   INJECT DARI MAINLAYOUT
===================== */
const selectedDay = inject('selectedDay')
const schedules = inject('schedules')
const tasks = inject('tasks')
const addSchedule = inject('addSchedule')
const addTask = inject('addTask')
const deleteSchedule = inject('deleteSchedule')
const deleteTask = inject('deleteTask')

/* =====================
   FORM STATE
===================== */
const scheduleForm = ref({
  course: '',
  start: '',
  end: '',
})

const taskForm = ref({
  course: '',
  type: '',
  deadline: '',
})

/* =====================
   ACTIONS
===================== */
const submitSchedule = () => {
  if (!scheduleForm.value.course) return

  addSchedule({ ...scheduleForm.value })
  scheduleForm.value = { course: '', start: '', end: '' }
}

const submitTask = () => {
  if (!taskForm.value.course) return

  addTask({ ...taskForm.value })
  taskForm.value = { course: '', type: '', deadline: '' }
}

/* =====================
   FILTER PER HARI
===================== */
const todaySchedules = computed(() => schedules.value.filter((s) => s.day === selectedDay.value))

const todayTasks = computed(() => tasks.value.filter((t) => t.day === selectedDay.value))
</script>
