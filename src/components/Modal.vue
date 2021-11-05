<template>
  <section class="h-auto w-full z-10 inset-0 overflow-y-auto absolute top-0 left-0 w-full">
    <!-- bg -->
    <div class="absolute w-full h-full inset-0 bg-gray-500 opacity-30" @click="$emit('close')">
    </div>

    <article class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
      <!-- Modal Card -->
      <section
        class="rounded-lg bg-white shadow text-center p-4 inline-block relative overflow-hidden 
        transform transition-all min-w-sm w-96  sm:align-middle sm:max-w-lg"
        role="dialog"
        aria-modal="true"
      >
        <header class="p-4 pt-0 flex justify-between border-b-2 border-gray-200 text-gray-800 text-lg font-medium mb-4 min-h-12">
          <slot name="header">
            <!-- default header -->
          </slot>

          <button
            class="bg-transparent border border-transparent absolute right-4 top-4 focus:outline-none"
            @click="$emit('close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </header>

        <main class="p-4 text-center text-xl text-gray-800 font-medium ">
          <slot name="body">
            <!-- default body -->
          </slot>
        </main>

        <footer class="p-4 flex item-center justify-between flex items-center justify-between gap-4 w-full mt-4">
          <slot name="footer">
            <!-- default footer -->
          </slot>
        </footer>
      </section>
    </article>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'modal',
  props: {},
  data() {
    return {}
  },
  computed: 
    mapGetters([
      'isModalOpen'
    ]),
  methods: {
    ...mapActions(['openModal', 'closeModal']),
  }
}
</script>

<style>

</style>