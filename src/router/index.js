import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Gmap from '../views/Gmap.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/weather/:cityName/:lon/:lat',
    name: 'Gmap',
    component: Gmap,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
