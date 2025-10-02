<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiAccountPlus, mdiLogin, mdiLogout } from '@mdi/js'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useMessageStore } from './stores/message'
//import HelloWorld from './components/HelloWorld.vue'
const store = useMessageStore()
const authStore = useAuthStore()
const router = useRouter()
const { message } = storeToRefs(store)
function logout() {
  authStore.logout()
  console.log('Logout')
  router.push({ name: 'login' })
}

const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')
if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}
</script>

<template>
  <SpeedInsights />
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with vercel</h1>
      <div class="wrapper">
        <nav class="py-6">
          <nav class="flex">
            <ul class="flex navbar-nav ml-auto" v-if="!authStore.currentUserName">
              <li class="nav-item px-2">
                <RouterLink to="/register" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccountPlus" /> <span>Sign Up</span>
                  </div>
                </RouterLink>
              </li>
              <li class="nav-item px-2">
                <RouterLink to="/login" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogin" /> <span>Login</span>
                  </div>
                </RouterLink>
              </li>
            </ul>
            <ul class="flex navbar-nav ml-auto" v-if="authStore.currentUserName">
              <li class="nav-item px-2">
                <RouterLink to="/profile" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccount" />
                    <span class="ml-3">{{ authStore.currentUserName }}</span>
                  </div>
                </RouterLink>
              </li>
              <li class="nav-item px-2">
                <a class="nav-link hover:cursor-pointer" @click="logout">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogout" /> <span>LogOut</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'event-list-view' }"
            >Event</RouterLink
          >
          |
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'about' }"
            >About</RouterLink
          >
          |
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'student' }"
            >Student</RouterLink
          >
          |
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'add-event' }"
            >New Event</RouterLink
          >
          |
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'add-organizer' }"
            >New Organizer</RouterLink
          >
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
/* #layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

/* h2 {
  font-size: 20px;
} */

/* @keyframes yellowfade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#flashMessage {
  animation: yellowfade 3s ease-in-out;
} */
</style>
