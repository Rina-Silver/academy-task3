// import Vue from "vue";
import axios from "axios";
const url = process.env.BASE_URL;

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
    todosError: (state) => state.todoError,
};

const actions = {
    async fetchTodos({ commit }) {
        try {
            const token = process.env.VUE_APP_SECRET_CODE;

            if (token) {
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + token;
            }

            commit("setError", "");
            const response = await axios.get(`${url}/Lists/`);

            commit("setTodos", response.data.data.items);
        } catch (e) {
            commit("setError", e.message);
        }
    },
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    setError: (state, error) => (state.todoError = error),
};

export default {
    actions,
    state,
    getters,
    mutations,
};
