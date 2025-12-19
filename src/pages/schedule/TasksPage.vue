<template>
  <q-page class="q-pa-md" style="background: #f9fafb">
    <!-- HEADER -->
    <div class="row items-center justify-between q-mb-sm">
      <div class="text-h5 text-bold">Tasks</div>
      <div class="text-grey-6">{{ todayText }} • {{ selectedDay }}</div>
    </div>

    <!-- MINI CALENDAR -->
    <div class="row q-gutter-sm q-mb-md">
      <div
        v-for="day in calendarDays"
        :key="day.date"
        class="column items-center"
        :style="{
          width: '42px',
          padding: '6px 0',
          borderRadius: '12px',
          background: day.isToday ? '#facc15' : 'transparent',
          color: day.isToday ? '#000' : '#6b7280',
          fontWeight: day.isToday ? '600' : '400',
        }"
      >
        <div style="font-size: 11px">{{ day.label }}</div>
        <div style="font-size: 14px">{{ day.date }}</div>
      </div>
    </div>

    <!-- TASK LIST -->
    <div class="q-gutter-md">
      <q-card
        v-for="task in todayTasks"
        :key="task.id"
        :style="{
          borderRadius: '16px',
          background: task.color,
        }"
      >
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="text-subtitle2 text-bold">
              {{ task.course }}
            </div>
            <div class="text-caption text-grey-8">
              {{ task.type }} • Deadline: {{ task.deadline }}
            </div>
          </div>

          <div class="row items-center q-gutter-sm">
            <q-checkbox v-model="task.done" />
            <q-btn icon="delete" flat round color="black" @click="deleteTask(task.id)" />
          </div>
        </q-card-section>
      </q-card>

      <!-- EMPTY -->
      <div v-if="todayTasks.length === 0" class="text-grey text-center q-mt-xl">
        Tidak ada task hari ini
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { inject, computed } from 'vue'

/* ===== INJECT DARI MAINLAYOUT ===== */
const selectedDay = inject('selectedDay')
const tasks = inject('tasks')
const deleteTask = inject('deleteTask')

/* ===== FILTER TASK BERDASARKAN HARI ===== */
const todayTasks = computed(() => tasks.value.filter((t) => t.day === selectedDay.value))

/* ===== TANGGAL ===== */
const today = new Date()

const todayText = today.toLocaleDateString('id-ID', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
})

/* ===== MINI KALENDER ===== */
const dayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

const calendarDays = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(today)
  d.setDate(today.getDate() - today.getDay() + i)

  return {
    label: dayLabels[d.getDay()],
    date: d.getDate(),
    isToday: d.toDateString() === today.toDateString(),
  }
})
</script>
