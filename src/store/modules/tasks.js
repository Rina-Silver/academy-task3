import axios from "axios";
import Vue from "vue";
const api = process.env.VUE_APP_BASE_URL;

const state = () => ({
    tasks: [],
    taskError: "",
});

const getters = {
    allCurrentTodoTasks: (state) =>
        state.tasks.sort((a, b) => {
            return a.created_at > b.created_at ? -1 : 1;
        }),
    allCurrentTasksLength: (state) => state.tasks.length,
    doneTasks: (state, getters) =>
        getters.allCurrentTodoTasks.filter((task) => task.is_completed),
    doneTasksLength: (state, getters) => getters.doneTasks.length,
    tasksError: (state) => state.taskError,
    checkIfTasksCompleted: (state, getters) => {
        if (getters.allCurrentTasksLength === getters.doneTasksLength) {
            return true;
        } else {
            return false;
        }
    },
};

const actions = {
    async fetchTasks({ commit }, id) {
        try {
            commit("setTaskError", "");
            // ?filter[0][]=executor_user_id&filter[0][]==&filter[0][]=1
            const response = await axios.get(`${api}/Task/get-items`);

            let currTasks = response.data.data.items.filter(
                (task) => task.lists_id === id
            );
            commit("setTasks", currTasks);
        } catch (e) {
            commit("setTaskError", e.message);
            Vue.$vToastify.error(e.message, "Что-то пошло не так");
        }
    },

    async addTask({ commit }, newTask) {
        try {
            commit("setTaskError", "");
            let attributes = {
                ...newTask,
                // executor_user_id: 1,
            };
            const response = await axios.post(`${api}/Task/create`, {
                attributes: attributes,
            });

            commit("addNewTask", response.data.data.attributes);
        } catch (e) {
            commit("setTaskError", e.message);
            Vue.$vToastify.error(e.message, "Что-то пошло не так");
        }
    },

    async deleteTask({ commit }, taskId) {
        try {
            commit("setTaskError", "");
            await axios.delete(`${api}/Task/delete/${taskId}`);
            commit("deleteOneTask", taskId);
        } catch (e) {
            commit("setTaskError", e.message);
            Vue.$vToastify.error(e.message, "Что-то пошло не так");
        }
    },

    async toggleTaskCompletion({ commit }, task) {
        try {
            commit("setTaskError", "");
            let attributes = {
                ...task,
                // executor_user_id: 1,
            };
            await axios.put(`${api}/Task/update/${task.id}`, {
                attributes: attributes,
            });
        } catch (e) {
            commit("setTaskError", e.message);
            Vue.$vToastify.error(e.message, "Что-то пошло не так");
        }
    },
};

const mutations = {
    setTaskError: (state, error) => (state.taskError = error),
    setTasks: (state, tasks) => (state.tasks = tasks),
    addNewTask: (state, task) => state.tasks.unshift(task),
    deleteOneTask: (state, taskId) =>
        (state.tasks = state.tasks.filter((task) => task.id !== taskId)),
};
export default {
    actions,
    state,
    getters,
    mutations,
};
