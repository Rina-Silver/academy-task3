import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

const token = process.env.VUE_APP_SECRET_CODE;

if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
