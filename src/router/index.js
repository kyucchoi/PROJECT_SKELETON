import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Category from '@/pages/Category.vue';
import Profile from '@/pages/Profile.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
  ],
});

export default router;
