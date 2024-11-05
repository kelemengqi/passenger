import { createRouter, createWebHistory } from 'vue-router';
import PassengerListView from '@/views/PassengerListView.vue';
import PassengerDetailView from '@/views/PassengerDetailView.vue';
import AirlineDetailView from '@/views/AirlineDetailView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import nProgress from 'nprogress';  

const routes = [
  {
    path: '/',
    name: 'passenger-list',
    component: PassengerListView,
  },
  {
    path: '/passenger/:id',
    name: 'passenger-detail',
    component: PassengerDetailView,
    props: true,
  },
  {
    path: '/airline/:id',
    name: 'airline-detail',
    component: AirlineDetailView,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  nProgress.start(); // 在路由切换之前启动进度条
});

router.afterEach(() => {
  nProgress.done(); // 在路由切换之后结束进度条
});

export default router;
