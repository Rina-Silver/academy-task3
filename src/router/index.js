import Vue from "vue";
import VueRouter from "vue-router";
import Todo from "../views/Todo";
const Tasks = () => import("../views/Tasks");

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Todo,
        children: [
            {
                path: "todo/:id",
                components: { tasks: Tasks },
                name: "tasks",
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
