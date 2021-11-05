import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import "tailwindcss/tailwind.css";
import VueToastify from "vue-toastify";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);
Vue.use(VueToastify);
Vue.config.productionTip = false;

const token = process.env.VUE_APP_TOKEN;

if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
