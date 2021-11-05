<template>
  <button :type="btnType"
    class="bg-purple-600 hover:bg-purple-700 text-white font-medium 
    shadow-md transition ease-in duration-200 text-center text-base rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-purple-200 focus:ring-offset-2
    py-2 px-4"
    :class="additionalClasses"
    @click.prevent="clickHandler"
  >
    {{text}}
  </button>
</template>

<script>
export default {
  props: {
    btnType: String,
    text: String,
    additionalClasses: String,
    clickHandler: Function
  }
}
</script>

<style>

</style>