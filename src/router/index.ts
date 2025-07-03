import AboutView from '@/views/AboutView.vue'
import EventListView from '@/views/EventListView.vue'
import StudentView from '@/views/StudentView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView,
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView,
    },
  ],
})

export default router
