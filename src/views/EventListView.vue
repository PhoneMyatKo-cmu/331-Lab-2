<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventCategory from '@/components/EventCategory.vue'
import EventService from '@/services/EventService'
import type { Event } from '@/types'
import { computed, onMounted, ref } from 'vue'
const events = ref<Event[]>()
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
})
const page = computed(() => props.page)
onMounted(() => {
  EventService.getEvents(2, page.value)
    .then((response) => {
      events.value = response.data
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

  <RouterLink
    :to="{ name: 'event-list-view', query: { page: page - 1 } }"
    rel="prev"
    v-if="page != 1"
    >Prev Page</RouterLink
  >
  <RouterLink :to="{ name: 'event-list-view', query: { page: page + 1 } }" rel="next"
    >Next Page</RouterLink
  >
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
