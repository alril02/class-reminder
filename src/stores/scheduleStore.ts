import { defineStore } from 'pinia'

export const useScheduleStore = defineStore('scheduleStore', {
  state: () => ({
    schedules: [] as Array<{
      time: string
      title: string
      sub: string
      color: string
      participants: string[]
    }>,
  }),

  actions: {
    addSchedule(item) {
      this.schedules.push(item)
    },
    deleteScheduleByTitle(title: string) {
      this.schedules = this.schedules.filter((s) => s.title !== title)
    },
  },
})
