<template>
  <q-layout view="hHh Lpr fFf" class="row justify-between">
    <!-- ================= SIDEBAR ================= -->
    <div
      v-show="leftDrawerOpen"
      style="
        width: 64px;
        background-color: #0f0f0f;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <!-- TOGGLE -->
      <div
        @click="leftDrawerOpen = !leftDrawerOpen"
        style="
          width: 34px;
          height: 36px;
          background: #1d1d1d;
          border-radius: 10px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          padding: 6px;
          margin-bottom: 42px;
          cursor: pointer;
        "
      >
        <div v-for="i in 4" :key="i" style="background: #777; border-radius: 4px" />
      </div>

      <!-- DAYS -->
      <div
        style="
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 18px;
        "
      >
        <button
          v-for="d in days"
          :key="d.value"
          @click="selectedDay = d.value"
          :style="{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: '600',
            background: selectedDay === d.value ? '#facc15' : '#2a2a2a',
            color: selectedDay === d.value ? '#000' : '#fff',
            cursor: 'pointer',
            fontSize: '14px',
          }"
        >
          {{ d.label }}
        </button>
      </div>

      <!-- SETTINGS -->
      <div style="margin-bottom: 70px">
        <div
          @click="router.push('/app/settings')"
          style="
            width: 40px;
            height: 36px;
            background: #2a2a2a;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            cursor: pointer;
            font-size: 18px;
          "
        >
          ⚙
        </div>
      </div>
    </div>

    <!-- COLLAPSE BUTTON -->
    <div
      @click="leftDrawerOpen = !leftDrawerOpen"
      :style="{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: leftDrawerOpen ? '64px' : '0',
        width: '22px',
        height: '48px',
        background: '#111',
        color: 'white',
        borderRadius: '0 10px 10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        fontSize: '18px',
      }"
    >
      {{ leftDrawerOpen ? '‹' : '›' }}
    </div>

    <!-- ================= PAGE ================= -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const leftDrawerOpen = ref(true)

/* ================= HARI AKTIF ================= */
const selectedDay = ref('Senin')

const days = [
  { label: 'S', value: 'Senin' },
  { label: 'S', value: 'Selasa' },
  { label: 'R', value: 'Rabu' },
  { label: 'K', value: 'Kamis' },
  { label: 'J', value: 'Jumat' },
  { label: 'S', value: 'Sabtu' },
  { label: 'M', value: 'Minggu' },
]

/* ================= DATA GLOBAL ================= */
const schedules = ref([])
const tasks = ref([])

/* ================= ACTIONS ================= */
const addSchedule = (data) => {
  schedules.value.push({
    id: Date.now(),
    day: selectedDay.value,
    course: data.course,
    start: data.start,
    end: data.end,
    color: '#60a5fa', // WARNA SCHEDULE
  })
}

const addTask = (data) => {
  tasks.value.push({
    id: Date.now(),
    day: selectedDay.value,
    course: data.course,
    type: data.type,
    deadline: data.deadline,
    done: false,
    color: '#fde68a', // WARNA TASK
  })
}

const deleteSchedule = (id) => {
  schedules.value = schedules.value.filter((s) => s.id !== id)
}

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id)
}

/* ================= PROVIDE ================= */
provide('selectedDay', selectedDay)
provide('schedules', schedules)
provide('tasks', tasks)
provide('addSchedule', addSchedule)
provide('addTask', addTask)
provide('deleteSchedule', deleteSchedule)
provide('deleteTask', deleteTask)
</script>
