<template>
  <div class="relative">
    <!-- select filter btn -->
    <button
      @click="toggleFilterSelect"
      @blur="selectOption(currentOption)"
      type="button"
      class="relative w-full bg-white rounded-md pl-3 pr-10 py-3 text-left cursor-pointer border-2 border-gray-400 
      focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
    >
      <span class="flex items-center ml-3 block truncate">
          {{ currentOption ? currentOption : initOption.value }}
      </span>

      <!-- arrows -->
      <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd">
          </path>
        </svg>
      </span>
    </button>

    <!-- filters list -->
    <div v-show="isFilterSelectOpen" class="absolute mt-1 w-full z-10 rounded-md bg-white shadow-dropdown">
      <ul
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 
        overflow-auto focus:outline-none sm:text-sm"
      >
        <li
          v-for="option in filterOptions"
          :key="option.name"
          @mousedown="selectOption(option)"
          role="option" 
          class="text-gray-900 cursor-pointer hover:bg-purple-500 
          hover:text-white select-none relative py-2 pl-3 pr-9"
        >
          <!-- filter name + icon -->
          <div class="flex items-center">
            <span class="ml-3 block font-normal truncate">
              {{option.value}}
            </span>
          </div>
          <span v-if="option.value === currentOption" class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-800">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
              </path>
            </svg>
          </span>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'filterSelect',
  props: {
    filterOptions: Array,
    initOption: Object
  },
  data() {
    return {
      isFilterSelectOpen: false,
      currentOption: ''
    }
  },

  methods: {
    ...mapActions(['filterTodos']),

    toggleFilterSelect() {
      this.isFilterSelectOpen = !this.isFilterSelectOpen
    },

    selectOption(option) {
      if (this.currentOption !== option) {
        this.currentOption = option.value
        this.filterTodos(option.name)
      }
      
      this.isFilterSelectOpen = false
    },
  }
}
</script>

<style>

</style>