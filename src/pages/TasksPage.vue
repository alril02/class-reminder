<template>
  <q-page
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ffffff; /* PUTIH */
      min-height: 100vh;
    "
  >
    <div
      style="
        width: 390px;
        height: 780px;
        background: #fff;
        border-radius: 32px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
      "
    >
      <!-- SIDEBAR -->
      <div
        :style="{
          position: 'absolute',
          top: 0,
          left: sidebarOpen ? '0' : '-64px',
          width: '64px',
          height: '100%',
          background: '#0f0f0f',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: '0.3s ease',
          zIndex: 5,
          paddingTop: '50px',
        }"
      >
        <div
          @click="router.push('/schedule')"
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
            @click="router.push('/settings')"
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

      <!-- SIDEBAR TOGGLE -->
      <div
        @click="sidebarOpen = !sidebarOpen"
        style="
          position: absolute;
          top: 480px;
          left: 64px;
          width: 22px;
          height: 48px;
          background: #111;
          color: white;
          border-radius: 0 10px 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          font-size: 18px;
        "
      >
        {{ sidebarOpen ? '‹' : '›' }}
      </div>

      <!-- HEADER -->
      <div
        :style="{
          marginLeft: sidebarOpen ? '80px' : '20px',
          padding: '22px 20px 14px',
          transition: '0.3s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }"
      >
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px">
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px">
            <div style="font-size: 14px; color: #999">{{ selectedDayLabel }}</div>
            <div style="font-size: 14px; color: #aaa">{{ selectedDate }}</div>
          </div>
          <div style="font-size: 48px; font-weight: 800; color: #000">
            {{ selectedDate.split('-')[2] }}
          </div>
        </div>

        <div style="font-size: 26px; font-weight: 700">Tasks</div>
      </div>

      <!-- DATE SELECTOR -->
      <div
        :style="{
          marginLeft: sidebarOpen ? '80px' : '20px',
          marginRight: '20px',
          marginBottom: '24px',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '6px',
        }"
      >
        <button
          v-for="d in dateBar"
          :key="d.date"
          @click="selectedDate = d.date"
          :style="{
            minWidth: '36px',
            height: '36px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: '600',
            background: selectedDate === d.date ? '#f97316' : '#eee',
            color: selectedDate === d.date ? '#fff' : '#333',
            cursor: 'pointer',
            flexShrink: 0,
          }"
        >
          {{ d.label }}
        </button>
      </div>

      <!-- ADD TASK -->
      <div
        @click="addTask"
        :style="{
          marginLeft: sidebarOpen ? '80px' : '20px',
          marginRight: '20px',
          marginBottom: '20px',
          background: '#f97316',
          color: 'white',
          padding: '12px',
          borderRadius: '14px',
          textAlign: 'center',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
        }"
      >
        + Add Task
      </div>

      <!-- CONTENT -->
      <div
        :style="{
          marginLeft: sidebarOpen ? '80px' : '20px',
          padding: '14px 20px',
          height: '480px',
          overflowY: 'auto',
          transition: '0.3s',
        }"
      >
        <div
          v-for="(t, i) in filteredTasks"
          :key="i"
          :style="{
            background: t.color,
            padding: '16px',
            borderRadius: '20px',
            marginBottom: '18px',
            color: '#000',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }"
        >
          <strong style="font-size: 15px">{{ t.subject }}</strong>
          <div style="font-size: 13px; margin-top: 4px">Hari: {{ t.day }}</div>
          <div style="font-size: 13px; margin-top: 4px">Tanggal: {{ t.date }}</div>
          <div style="font-size: 13px; margin-top: 4px">Jam: {{ t.time }}</div>

          <span
            @click="deleteTask(i)"
            style="
              font-size: 18px;
              cursor: pointer;
              color: #b91c1c;
              font-weight: bold;
              margin-top: 10px;
              display: inline-block;
            "
          >
            🗑
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'
import { useScheduleStore } from '../stores/scheduleStore'

const router = useRouter()
const taskStore = useTaskStore()
const scheduleStore = useScheduleStore()

const sidebarOpen = ref(true)

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
const selectedDate = ref('2025-08-18')

const selectedDayLabel = computed(() => {
  const map = {
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
  }
  return map[selectedDay.value] || 'Day'
})

const dateBar = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1
  return {
    label: String(day),
    date: `2025-08-${day.toString().padStart(2, '0')}`,
  }
})

const filteredTasks = computed(() => taskStore.getTasksByDate(selectedDate.value))

watch(selectedDate, () => {
  const task = taskStore.getTasksByDate(selectedDate.value)[0]
  if (task && task.day) {
    selectedDay.value = task.day.toLowerCase().slice(0, 3)
  }
})

function addTask() {
  const subject = prompt('Nama Mata Kuliah:')
  if (!subject) return

  const day = prompt('Hari (mon/tue/wed/thu/fri/sat/sun):')
  if (!day) return

  const date = prompt('Tanggal (format: 2025-08-18):')
  if (!date) return

  const time = prompt('Jam (contoh: 09:30):')
  if (!time) return

  taskStore.addTask({
    subject,
    day,
    date,
    time,
    color: '#FFD29D',
  })

  scheduleStore.addSchedule({
    time: `${time}\n${Number(time.split(':')[0]) + 1}:${time.split(':')[1]}`,
    title: subject,
    sub: day,
    color: '#5BC0F8',
    participants: [],
  })
}

function deleteTask(index) {
  const task = filteredTasks.value[index]
  if (!task) return

  if (confirm('Hapus tugas ini?')) {
    taskStore.deleteTask(index)
    scheduleStore.deleteScheduleByTitle(task.subject)
  }
}
</script>
