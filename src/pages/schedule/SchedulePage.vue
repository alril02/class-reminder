<template>
  <q-page class="q-pa-md" style="background: #f9fafb">
    <!-- HEADER -->
    <div class="text-h5 text-bold q-mb-xs">Schedule</div>

    <div class="text-grey-6 q-mb-md">{{ today }} • {{ selectedDay }}</div>

    <!-- LIST SCHEDULE -->
    <div class="q-gutter-md">
      <div v-for="item in todaySchedules" :key="item.id" style="display: flex; gap: 12px">
        <!-- JAM -->
        <div
          style="
            width: 50px;
            text-align: right;
            color: #6b7280;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 13px;
          "
        >
          <div>{{ item.start }}</div>
          <div>{{ item.end }}</div>
        </div>

        <!-- CARD -->
        <q-card
          class="text-white"
          :style="{
            borderRadius: '16px',
            background: item.color,
            flex: 1,
          }"
        >
          <q-card-section class="row items-center">
            <div class="col">
              <div class="text-subtitle1 text-bold">
                {{ item.course }}
              </div>
              <div class="text-caption">{{ item.start }} - {{ item.end }}</div>
            </div>

            <!-- DELETE -->
            <q-btn icon="delete" flat round color="white" @click="deleteSchedule(item.id)" />
          </q-card-section>
        </q-card>
      </div>

      <!-- EMPTY -->
      <div v-if="todaySchedules.length === 0" class="text-grey text-center q-mt-xl">
        Tidak ada schedule hari ini
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { inject, computed } from 'vue'

/* =====================
   INJECT DARI MAINLAYOUT
===================== */
const selectedDay = inject('selectedDay')
const schedules = inject('schedules')
const deleteSchedule = inject('deleteSchedule')

/* =====================
   FILTER HARI
===================== */
const todaySchedules = computed(() =>
  schedules.value
    .filter((s) => s.day === selectedDay.value)
    .sort((a, b) => a.start.localeCompare(b.start)),
)

/* =====================
   TANGGAL INDONESIA
===================== */
const today = new Date().toLocaleDateString('id-ID', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
})
</script>
