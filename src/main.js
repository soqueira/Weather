import * as vueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.use(vueGoogleMaps, {
  load: {
    key: 'AIzaSyCuatQwat9DCXtc3bH7I3Caj5jtIpXhWZk',
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
