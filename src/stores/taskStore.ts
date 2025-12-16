import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Array<{
      subject: string
      day: string
      date: string
      time: string
      color: string
    }>,
  }),

  actions: {
    addTask(task) {
      this.tasks.push(task)
    },

    deleteTask(index: number) {
      this.tasks.splice(index, 1)
    },
  },

  getters: {
    getTasksByDate: (state) => {
      return (date: string) => state.tasks.filter((t) => t.date === date)
    },
  },
})
