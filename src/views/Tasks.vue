<template>
    <article
        class="flex flex-col h-screen w-full px-0 md:px-4 md:py-6 md:w-4/5"
    >
        <section
            class="
                overflow-auto
                flex flex-col
                justify-between
                pb-20
                h-full
                md:pb-12
                lg:pb-10
                pt-6
                md:pt-0
                px-0
                md:px-2 md:px-0
            "
        >
            <main class="w-full mb-4 md:mb-8 max-h-full overflow-auto">
                <!-- Card for tasks -->
                <div class="shadow-md rounded-2xl bg-white w-full mb-4 mx-0">
                    <header class="font-bold text-lg p-4 text-black">
                        My Tasks
                        <span class="text-sm text-gray-500 ml-2">
                            ( {{ doneTasksLength }} /
                            {{ allCurrentTasksLength }} )
                        </span>
                    </header>

                    <!-- Card content -->
                    <div
                        v-if="loading"
                        class="flex item-center justify-center w-full pb-5"
                    >
                        <Loader loaderClasses="bg-purple-600" />
                    </div>

                    <p
                        v-else-if="
                            allCurrentTodoTasks &&
                            allCurrentTodoTasks.length === 0
                        "
                        class="text-center p-3 pb-5 font-light text-xl"
                    >
                        Список пуст...
                    </p>

                    <ul v-else class="pb-4">
                        <li
                            v-for="(task, idx) in allCurrentTodoTasks"
                            :key="task.id"
                            class="
                                py-3
                                border-t-4
                                md:border-t-2
                                border-gray-100
                                first:border-0
                            "
                        >
                            <TaskItem
                                :task="task"
                                :index="idx + 1"
                                @populateModal="
                                    (e) => $emit('populateModal', e)
                                "
                            />
                        </li>
                    </ul>
                </div>
            </main>

            <div class="lg:py-2 lg:px-4">
                <AddForm propsClasses="lg:flex-row" @addNewItem="addTaskItem">
                    <!-- additional checkbox input -->
                    <div class="flex justify-center items-center mx-4">
                        <div
                            class="
                                relative
                                inline-block
                                w-10
                                mr-2
                                items-center
                                select-none
                            "
                        >
                            <input
                                @click="isUrgent = !isUrgent"
                                type="checkbox"
                                name="toggle"
                                v-model="isUrgent"
                                value=""
                                id="Urgent"
                                class="
                                    checked:bg-purple-500 checked:right-0
                                    outline-none
                                    right-4
                                    duration-200
                                    ease-in
                                    absolute
                                    block
                                    w-6
                                    h-6
                                    rounded-full
                                    bg-white
                                    border-4
                                    appearance-none
                                    cursor-pointer
                                    focus:outline-none
                                "
                            />
                            <label
                                for="Urgent"
                                class="
                                    block
                                    overflow-hidden
                                    h-6
                                    rounded-full
                                    bg-gray-300
                                    cursor-pointer
                                "
                            ></label>
                        </div>

                        <span
                            :class="{ 'text-purple-500': isUrgent }"
                            class="text-gray-500 font-medium"
                        >
                            Срочное
                        </span>
                    </div>
                </AddForm>
            </div>
        </section>
    </article>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TaskItem from "../components/TaskItem";
import AddForm from "../components/AddForm";
import Loader from "../components/widgets/Loader";

export default {
    name: "Tasks",
    components: {
        TaskItem,
        AddForm,
        Loader,
    },

    computed: {
        ...mapGetters([
            "allCurrentTodoTasks",
            "allCurrentTasksLength",
            "doneTasks",
            "doneTasksLength",
            "currentTodo",
            "checkIfTasksCompleted",
            "tasksError",
        ]),
    },

    data() {
        return {
            isUrgent: false,
            loading: false,
        };
    },

    async created() {
        this.loading = true;
        await this.fetchCurrentTodo(Number(this.$route.params.id));
        await this.fetchTasks(Number(this.$route.params.id));
        this.loading = false;
    },

    methods: {
        ...mapActions([
            "fetchTasks",
            "fetchCurrentTodo",
            "addTask",
            "deleteTask",
            "toggleTaskCompletion",
            "changeTodoData",
        ]),

        addTaskItem(name) {
            if (name) {
                let newTaskObj = {
                    name,
                    lists_id: Number(this.currentTodo.id),
                    is_completed: false,
                    urgency: this.isUrgent ? 5 : 1,
                };

                let modalObject = {
                    header: "Дело добавлено",
                    body: `Дело '${name}' добавлено в '${this.currentTodo.name}'`,
                    footerButtons: [
                        {
                            title: "OK",
                            type: "OK",
                            method: async () => {
                                await this.addTask(newTaskObj);

                                if (!this.tasksError) {
                                    await this.changeTodoData({
                                        todo: this.currentTodo,
                                        countTasks:
                                            this.currentTodo.count_tasks + 1,
                                        completedSetTo:
                                            this.checkIfTasksCompleted,
                                    });
                                }
                            },
                        },
                    ],
                };

                this.$emit("populateModal", modalObject);
                this.isUrgent = false;
            }
        },
    },
};
</script>
