import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import "./plugins/axios";
Vue.config.productionTip = false;
Vue.prototype.$store = store;
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor );


new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
