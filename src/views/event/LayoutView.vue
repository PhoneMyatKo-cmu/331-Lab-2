<script setup lang="ts">
import EventService from '@/services/EventService'
import type { Event } from '@/types'
import { defineProps, onMounted, ref } from 'vue'

const event = ref<Event>(null)
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
onMounted(() => {
  //fetch event by id .set loca event data
  EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => console.log('There was an error', error))
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'event-detail-view' }">Details</router-link>
      <router-link :to="{ name: 'event-register-view' }">Register</router-link>
      <router-link :to="{ name: 'event-edit-view' }">Edit</router-link>
    </nav>
    <RouterView :event="event" />
  </div>
</template>
