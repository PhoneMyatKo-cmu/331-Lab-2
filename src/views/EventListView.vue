<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventCategory from '@/components/EventCategory.vue'
import type { Event } from '@/types'
import axios from 'axios'
import { onMounted, ref } from 'vue'
const events = ref<Event[]>(null)
onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/PhoneMyatKo-cmu/331-db-repo/db')
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element-->

  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
  <div class="event-cats">
    <EventCategory v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.event-cats {
  display: flex;
  flex-direction: column;
  align-items: end;
}
</style>
