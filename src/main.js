import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import vueMq from "vue-mq";
import { firestorePlugin } from "vuefire";

// firestore
Vue.use(firestorePlugin);

Vue.use(vueMq, {
  breakpoints: {
    mobile: 600,
    desktop: Infinity
  }
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
