<template>
  <button
    @click="$emit('handleDeleteBtnClick')"
    :class="propsClasses"
    class="transition ease-in duration-100
    flex items-center justify-center rounded-md px-2 py-2 mx-3
    font-medium text-gray-700 focus:bg-gray-100 hover:bg-gray-100
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'delete-btn',
  props: {
    propsClasses: {
      type: String,
      default: ""
    }
  }
}
</script>

<style>

</style>