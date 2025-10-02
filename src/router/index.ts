import EventService from '@/services/EventService'
import OrganizerService from '@/services/OrganizerService'
import { useEventStore } from '@/stores/event'
import { useOrganizerStore } from '@/stores/organizer'
import AboutView from '@/views/AboutView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventEditView from '@/views/event/EditView.vue'
import AddEventView from '@/views/event/FormView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventListView from '@/views/EventListView.vue'
import LoginView from '@/views/LoginView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import DetailView from '@/views/organizers/detailView.vue'
import FormView from '@/views/organizers/formView.vue'
import ListView from '@/views/organizers/ListView.vue'
import StudentView from '@/views/StudentView.vue'
import RegisterView from '@/views/User/RegisterView.vue'
import nProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') }),
    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        //API call
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
          .then((response) => {
            eventStore.setEvent(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              router.push({
                name: '404-resource-view',
                params: { resource: 'event' },
              })
            } else {
              router.push({
                name: 'network-error-view',
              })
            }
          })
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true,
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
          props: true,
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
          props: true,
        },
      ],
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
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventView,
    },
    {
      path: '/organizers',
      name: 'organizer-list-view',
      component: ListView,
    },
    {
      path: '/organizers/:id',
      name: 'organizer-detail-view',
      component: DetailView,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const orgStore = useOrganizerStore()
        OrganizerService.getOrganizer(id)
          .then((response) => {
            orgStore.setOrganizer(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              router.push({
                name: '404-resource-view',
                params: { resource: 'event' },
              })
            } else {
              router.push({
                name: 'network-error-view',
              })
            }
          })
      },
    },
    {
      path: '/add-organizer',
      name: 'add-organizer',
      component: FormView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true,
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
router.beforeEach(() => {
  nProgress.start()
})
router.afterEach(() => {
  nProgress.done()
})

export default router
