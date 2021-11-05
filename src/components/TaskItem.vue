<template>
  <div class="flex flex-col-reverse lg:flex-row items-center mx-6 relative">
    <!-- task title -->
    <label class="flex items-start lg:items-center justify-start w-full mb-4 pr-6 lg:mb-0 lg:w-9/12">
      <input
        type="checkbox"
        name="Urgent"
        v-model="task.is_completed"
        @change="toggleTaskComplete(task)"
        class="form-checkbox mt-1 mr-4 lg:mt-0 cursor-pointer appearance-none bg-white bg-check 
        h-5 w-5 min-w-5 border border-gray-300 rounded-md 
        checked:bg-purple-500 checked:border-transparent focus:outline-none focus:ring-transparent"
      />

      <p
        class="break-all w-full max-w-90 cursor-pointer"
        :class="[task.is_completed ? 'line-through text-gray-500' : 'text-gray-800' ]" 
      >
        {{task.name}}
      </p>
    </label>

    <!-- task time, urgency, delete btn -->
    <div class="flex w-full items-center justify-between px-0 mb-4 mt-2 md:w-auto lg:px-4 lg:my-0 lg:px-0 xl:w-3/12">
      <span class="mx-2" :class="{'hidden md:block md:invisible': task.urgency === 1}">
        <svg class="text-red-500 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </span>

      <div class="flex flex-col md:flex-row items-center justify-center text-center mx-2 cursor-default w-36 min-w-36">
        <p class="text-sm lg:text-base text-gray-500 mb-2 md:mb-0 md:mx-1">
          {{ getTaskDate }}
        </p>
        <p class="text-sm lg:text-base text-gray-500 mb-2 md:mb-0 md:mx-1">
          {{ getTaskTime }}
        </p>
      </div>

      <DeleteButton @handleDeleteBtnClick="handleDeleteTask(task)" propsClasses="mx-2 text-gray-600 hover:text-purple-700" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DeleteButton from '../components/widgets/DeleteButton'

export default {
  name: 'taskitem',

  props: {
    task: Object,
    index: Number
  },

  components: {
    DeleteButton
  },

  computed: {
    ...mapGetters([
      'currentTodo',
      'checkIfTasksCompleted',
      'tasksError'
    ]),

    getTaskDate() {
      let date = new Date(this.task.created_at)
      return date.toLocaleDateString('ru-RU')
    },

    getTaskTime() {
      let time = new Date(this.task.created_at)
      return time.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
  methods: {
    ...mapActions(['deleteTask', 
    'toggleTaskCompletion', 'todoListCompleted', 
    'changeTodoData'
    ]),

    handleDeleteTask(taskItem) {
       let modalObject = {
        header: 'Удалить дело',
        body: `Удалить дело '${taskItem.name}' из списка '${this.currentTodo.name}'?`,
        footerButtons: [
          {
            title: 'Отмена',
            type: 'Cancel'
          },
          {
            title: 'OK',
            type: 'OK',
            method: async () => {
              await this.deleteTask(taskItem.id)

              if(!this.tasksError) {
                  await this.changeTodoData({
                  todo: this.currentTodo,
                  countTasks: this.currentTodo.count_tasks - 1,
                  completedSetTo: this.checkIfTasksCompleted
                })
              }
              
            }
          }
        ]
      }

      this.$emit('populateModal', modalObject)
    },

    toggleTaskComplete(task) {
      this.toggleTaskCompletion(task)
      this.todoListCompleted({todo: this.currentTodo, setTo: this.checkIfTasksCompleted})
    }
  }
}
</script>

<style>

</style>