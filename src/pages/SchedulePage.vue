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
          @click="router.push('/tasks')"
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
            <div style="font-size: 14px; color: #999">Tues</div>
            <div style="font-size: 14px; color: #aaa">Aug 20</div>
          </div>
          <div style="font-size: 48px; font-weight: 800; color: #000">18</div>
        </div>

        <div style="font-size: 26px; font-weight: 700">Schedule</div>
      </div>

      <!-- CONTENT -->
      <div
        :style="{
          marginLeft: sidebarOpen ? '80px' : '20px',
          padding: '14px 20px',
          height: '600px',
          overflowY: 'auto',
          transition: '0.3s',
        }"
      >
        <div
          v-for="(s, i) in schedules"
          :key="i"
          style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px"
        >
          <div style="height: 1px; background: #ddd"></div>

          <div style="display: flex; gap: 14px">
            <div
              style="
                width: 50px;
                font-size: 12px;
                color: #777;
                white-space: pre-line;
                line-height: 1.45;
                padding-top: 6px;
              "
            >
              {{ s.time }}
            </div>

            <div
              :style="{
                flex: 1,
                background: s.color,
                padding: '16px',
                borderRadius: '20px',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }"
            >
              <div style="display: flex; justify-content: space-between; align-items: center">
                <strong style="font-size: 15px">{{ s.title }}</strong>

                <span
                  @click="deleteSchedule(i)"
                  style="font-size: 18px; cursor: pointer; color: #ff4d4d; font-weight: bold"
                >
                  🗑
                </span>
              </div>

              <div style="font-size: 12px; opacity: 0.9; margin-top: 6px">
                {{ s.sub }}
              </div>

              <div
                v-if="s.participants.length"
                style="font-size: 11px; opacity: 0.8; margin-top: 4px"
              >
                {{ s.participants.join(', ') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useScheduleStore } from '../stores/scheduleStore'

const router = useRouter()
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

const scheduleStore = useScheduleStore()
const schedules = computed(() => scheduleStore.schedules)

function deleteSchedule(index) {
  if (confirm('Hapus jadwal ini?')) {
    scheduleStore.schedules.splice(index, 1)
  }
}
</script>
