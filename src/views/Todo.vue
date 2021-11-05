<template>
    <div class="bg-gray-100 overflow-hidden relative h-screen lg:h-full">
        <nav class="bg-purple-500 shadow">
            <div
                class="
                    max-w-full
                    mx-3
                    px-3
                    flex
                    items-center
                    justify-between
                    h-14
                "
            ></div>
        </nav>

        <main
            class="flex flex-col md:flex-row items-start justify-between z-50"
        >
            <!-- todo lists -->
            <div
                class="
                    relative
                    top-0
                    right-0
                    pb-12
                    h-screen
                    shadow-2xl
                    w-full
                    md:block md:ml-4 md:mt-6 md:w-1/5 md:min-w-16
                    lg:static lg:pb-0
                "
                :class="[isSidebarOpen ? 'block' : 'hidden']"
            >
                <!-- Card for todo list -->
                <div
                    class="
                        bg-white
                        h-full
                        md:rounded-2xl
                        flex flex-col
                        justify-between
                        pb-6
                        md:pb-12
                        lg:pb-24
                    "
                >
                    <nav class="pt-2 md:pt-6 max-h-4/5 h-4/5 overflow-y-auto">
                        <!-- filter -->
                        <div class="px-6 py-3 mb-3">
                            <FilterSelect
                                :filterOptions="filterTodoOptions"
                                :initOption="filterTodoOptions[0]"
                            />
                        </div>

                        <div
                            v-if="loading"
                            class="flex item-center justify-center w-full"
                        >
                            <Loader />
                        </div>

                        <p
                            v-if="allTodos.length === 0"
                            class="text-center p-6 font-light text-xl mb-3"
                        >
                            Список пуст...
                        </p>

                        <div
                            v-else
                            v-for="item in allFilteredTodos"
                            :key="item.id"
                        >
                            <TodoItem
                                :item="item"
                                @onToggleSidebar="toggleSidebar"
                                @populateModal="
                                    (e) => $emit('populateModal', e)
                                "
                            />
                        </div>
                    </nav>

                    <AddForm
                        propsClasses="max-w-sm md:max-w-md"
                        placeholderText="Название списка"
                        @addNewItem="addTodoList"
                    />
                </div>
            </div>

            <!-- tasks -->
            <router-view
                name="tasks"
                :key="$route.fullPath"
                @populateModal="(e) => $emit('populateModal', e)"
            ></router-view>
        </main>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TodoItem from "../components/TodoItem";
import AddForm from "../components/AddForm";

import FilterSelect from "../components/widgets/FilterSelect";
import Loader from "../components/widgets/Loader";

export default {
    name: "Todo",
    components: {
        TodoItem,
        AddForm,
        FilterSelect,
        Loader,
    },
    computed: {
        ...mapGetters(["allTodos", "allFilteredTodos", "todosError"]),
    },

    data() {
        return {
            loading: false,
            isSidebarOpen: true,
            filterValue: "",
            filterTodoOptions: [
                {
                    name: "not_completed",
                    value: "Неисполненные",
                },
                {
                    name: "completed",
                    value: "Исполненные",
                },
                {
                    name: "all",
                    value: "Все",
                },
            ],
        };
    },

    async created() {
        this.loading = true;
        await this.fetchTodos();
        this.loading = false;
    },

    methods: {
        ...mapActions(["addTodo", "fetchTodos", "fetchTasks", "deleteTodo"]),

        addTodoList(name) {
            let newTodoObj = {
                name,
                count_tasks: 0,
                is_completed: false,
                created_at: Date.now(),
                is_closed: false,
            };

            if (name) {
                let modalObject = {
                    header: "Список добавлен",
                    body: `Список дел '${name}' добавлен`,
                    footerButtons: [
                        {
                            title: "ОК",
                            type: "OK",
                            method: () => this.addTodo(newTodoObj),
                        },
                    ],
                };

                this.$emit("populateModal", modalObject);
            }
        },

        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
    },
};
</script>

<style></style>
