<template>
    <div id="app" class="font-Rubik">
        <router-view @populateModal="populateModal"></router-view>

        <Modal v-if="isModalOpen" @close="closeModal">
            <p slot="header" class="break-words">{{ modalContent.header }}</p>
            <p slot="body" class="break-words">{{ modalContent.body }}</p>
            <button
                slot="footer"
                type="button"
                v-for="button in modalContent.footerButtons"
                :key="button.title"
                @click="handleBtnClick(button.method)"
                :class="[button.type === 'OK' ? 'btn_ok' : 'btn_action']"
                class="
                    text-white
                    py-2
                    px-4
                    w-full
                    text-center text-base
                    font-semibold
                    transition
                    ease-in
                    duration-200
                    shadow-md
                    focus:ring-indigo-500
                    focus:ring-offset-indigo-200
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    rounded-lg
                "
            >
                {{ button.title }}
            </button>
        </Modal>
    </div>
</template>

<script>
import Modal from "./components/Modal";

export default {
    name: "App",
    components: {
        Modal,
    },
    data() {
        return {
            isModalOpen: false,
            modalContent: {},
        };
    },
    methods: {
        populateModal(data) {
            this.modalContent = data;
            this.isModalOpen = true;
        },

        closeModal() {
            this.isModalOpen = false;
            this.modalContent = {};
        },

        handleBtnClick(actionFromBtn) {
            actionFromBtn ? actionFromBtn() : "";
            this.closeModal();
        },
    },
};
</script>

<style>
/* scroll */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: #dccdf5;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2) inset;
    border-radius: 8px;
}

::-webkit-scrollbar-thumb {
    background: #d07ee4;
    border-radius: 8px;
    border: 2px solid #cecdf5;
}

::-webkit-scrollbar-thumb:hover {
    background: #8b5cf6;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #c471f5 0%, #7f71fa 100%);
    background-size: contain;
    border-radius: 8px;
    border: 2px solid #d9cdf5;
}

/* buttons */

.btn_ok {
    background-color: #7c3aed;
}
.btn_ok:hover {
    background-color: #6d28d9;
}

.btn_action {
    background-color: #ef4444;
}
.btn_action:hover {
    background-color: #dc2626;
}
</style>
