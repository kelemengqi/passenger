/*
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-10-31 08:26:38
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-10-31 08:30:31
 * @FilePath: /passenger/passenger-vue/passenger-app/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from 'vue-router';
import PassengerListView from '@/views/PassengerListView.vue';
import PassengerDetailView from '@/views/PassengerDetailView.vue';
import AirlineDetailView from '@/views/AirlineDetailView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

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

export default router;
