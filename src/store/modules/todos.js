import axios from "axios";
import Vue from "vue";
const api = process.env.BASE_URL;

const state = () => ({
    todos: [],
    currentTodo: {},
    todoError: "",
    filterName: "all",
});

const getters = {
    allTodos: (state) =>
        state.todos.sort((a, b) => {
            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        }),
    currentTodo: (state) => state.currentTodo,
    allFilteredTodos: (state, getters) => {
        switch (state.filterName) {
            case "all":
                return getters.allTodos;
            case "completed":
                return getters.allTodos.filter((todo) => todo.is_completed);
            default:
                return getters.allTodos.filter((todo) => !todo.is_completed);
        }
    },
    todosError: (state) => state.todoError,
};

const actions = {
    async fetchTodos({ commit }) {
        try {
            const token = process.env.VUE_APP_TOKEN;

            if (token) {
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + token;
            }

            commit("setError", "");
            const response = await axios.get(`${api}/Lists/get-items`);

            commit("setTodos", response.data.data.items);
        } catch (e) {
            commit("setError", e.message);
            Vue.$vToastify.error(e.message, "Что-то пошло не так");
        }
    },

    async fetchCurrentTodo({ commit }, id) {
        try {
            commit("setError", "");
            const response = await axios.get(`${api}/Lists/${id}`);

            commit("setCurrentTodo", response.data.data.attributes);
        } catch (e) {
            commit("setError", e.message);
            Vue.$vToastify.error(e.message, "Что-то пошло не так");
            commit("setCurrentTodo", "");
        }
    },

    async addTodo({ commit }, newTodoObj) {
        try {
            commit("setError", "");
            const response = await axios.post(`${api}/Lists/create`, {
                attributes: newTodoObj,
            });
            commit("addNewTodo", response.data.data.attributes);
        } catch (e) {
            commit("setError", e.message);
            Vue.$vToastify.error(e.message, "Что-то пошло не так");
        }
    },

    filterTodos({ commit }, optionName) {
        commit("setFilteredTodos", optionName);
    },

    async deleteTodo({ commit }, todoId) {
        try {
            commit("setError", "");
            await axios.delete(`${api}/Lists/delete/${todoId}`);
            commit("deleteOneTodo", todoId);
        } catch (e) {
            commit("setError", e.message);
            Vue.$vToastify.error(e.message, "Что-то пошло не так");
        }
    },

    async todoListCompleted({ commit }, { todo, setTo }) {
        try {
            commit("setError", "");
            await axios.put(`${api}/Lists/update/${todo.id}`, {
                attributes: { ...todo, is_completed: setTo },
            });

            commit("setTodoListCompleted", { todoId: todo.id, setTo });
        } catch (e) {
            commit("setError", e.message);
            Vue.$vToastify.error(e.message, "Что-то пошло не так");
        }
    },

    // изменить список когда задача добавлена/удалена
    async changeTodoData({ commit }, { todo, countTasks, completedSetTo }) {
        try {
            commit("setError", "");

            await axios.put(`${api}/Lists/update/${todo.id}`, {
                attributes: {
                    ...todo,
                    is_completed: completedSetTo,
                    count_tasks: countTasks,
                },
            });

            commit("changeAmountOfTasksinList", {
                todoId: todo.id,
                countTasks,
            });
            commit("setTodoListCompleted", {
                todoId: todo.id,
                setTo: completedSetTo,
            });
        } catch (e) {
            commit("setError", e.message);
            Vue.$vToastify.error(e.message, "Что-то пошло не так");
        }
    },
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    setCurrentTodo: (state, todo) => (state.currentTodo = todo),
    setFilteredTodos: (state, optionName) => (state.filterName = optionName),
    setError: (state, error) => (state.todoError = error),
    addNewTodo: (state, todo) => state.todos.push(todo),
    deleteOneTodo: (state, todoId) =>
        (state.todos = state.todos.filter((todo) => todo.id !== todoId)),
    setTodoListCompleted: (state, { todoId, setTo }) => {
        state.todos.filter((todo) => todo.id === todoId)[0].is_completed =
            setTo;
    },
    changeAmountOfTasksinList: (state, { todoId, countTasks }) => {
        state.todos.filter((item) => item.id === todoId)[0].count_tasks =
            countTasks;
    },
};

export default {
    actions,
    state,
    getters,
    mutations,
};
