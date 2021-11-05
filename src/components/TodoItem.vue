<template>
  <div
    class="flex items-center w-full relative link-wrapper list-item"
    :class="routerLinkStyle"
    >
    <router-link
      :to="{ name: 'tasks', params: { id: item.id }}"
      class="w-full text-md flex items-center p-4 justify-start transition ease-in duration-100 block"
      
    >
      <p @click="$emit('onToggleSidebar')" class="px-4 pr-10 w-full text-md break-words">
        {{item.name}}
      </p>
    </router-link>

    <div class="flex items-center absolute inset-y-0 right-0 ">
      <DeleteButton
        @handleDeleteBtnClick="handleDeleteTodo(item)"
        propsClasses="bg-transparent text-gray-600 hover:text-purple-700"
      />
    </div>
   
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DeleteButton from '../components/widgets/DeleteButton'

export default {
  name: "todoitem",
  props: {
    item: Object,
  },
  components: {
    DeleteButton
  },
  computed: {
    routerLinkStyle() {
      return this.item.count_tasks === 0 ? 'empty' : this.item.is_completed ? 'list-complete' : 'list-incomplete'
    }
  },
  methods: {
    ...mapActions(['deleteTodo']),

    handleDeleteTodo(todoItem) {
      let modalObject = {
        header: 'Удалить список дел',
        body: `Удалить список дел '${todoItem.name}'?`,
        footerButtons: [
          {
            title: 'Отмена',
            type: 'Cancel'
          },
          {
            title: 'Удалить',
            type: 'OK',
            method: () => {
              this.deleteTodo(todoItem.id)
              if (this.$route.params.id === todoItem.id) {
                this.$router.push('/')
              }
            }
          }
        ],
      }

      this.$emit('populateModal', modalObject)
    },
  }
}
</script>

<style>
.router-link-exact-active.router-link-active {
  border-left: 4px solid #6D28D9;
}

.list-item.empty {
  background-color: white;
}
.list-item.list-complete {
  background-color: #b2b2b2;
}
.list-item.list-incomplete {
  background-color: #63ff63;
}
</style>