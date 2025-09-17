<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventCategory from '@/components/EventCategory.vue'
import EventService from '@/services/EventService'
import type { Event } from '@/types'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
const events = ref<Event[] | null>()
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 1)
  return page.value < totalPages - 1
})
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
})
const page = computed(() => props.page)
const perPage = ref(2)
onMounted(() => {
  watchEffect(() => {
    //   EventService.getEvents(perPage.value, page.value)
    //     .then((response) => {
    //       events.value = response.data
    //       totalEvents.value = response.headers['x-total-count']
    //     })
    //     .catch((error) => {
    //       console.error('There was an error!', error)
    //     })
    updateKeyword(keyword.value)
  })
})
const keyword = ref('')
const router = useRouter()
function updateKeyword(value: string) {
  let queryFunction
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(1, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 1, page.value)
  }
  queryFunction
    .then((response) => {
      events.value = response.data
      console.log('events', events.value)
      totalEvents.value = response.headers['x-total-count']
      console.log('totalEvents', totalEvents.value)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element-->

  <div class="flex flex-col items-center">
    <div class="w-64">
      <input
        v-model="keyword"
        placeholder="Search events..."
        label="Search events"
        @input="updateKeyword(keyword)"
      />
    </div>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>

  <div class="flex w-[290px] m-auto">
    <RouterLink
      id="page-prev"
      class="text-left"
      :to="{ name: 'event-list-view', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 0"
      >&#60; Prev Page</RouterLink
    >
    <RouterLink
      id="page-next"
      class="text-right"
      :to="{ name: 'event-list-view', query: { page: page + 1 } }"
      rel="next"
      v-if="hasNextPage"
      >Next Page &#62;</RouterLink
    >
  </div>
  <div class="per-page-control">
    <label for="page_limit">Page Limit</label
    ><input type="number" name="page_limit" id="" v-model="perPage" min="0" :max="totalEvents" />
  </div>
  <div class="flex flex-col items-end">
    <EventCategory v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
/* .events {
  display: flex;
  flex-direction: column;
  align-items: center;
} */

/* .pagination {
  display: flex;
  width: 290px;
  margin: auto;
} */
/* .pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
} */
/* .page-prev {
  text-align: left;
}
.page-next {
  text-align: right;
} */
/* .event-cats {
  display: flex;
  flex-direction: column;
  align-items: end;
} */
</style>
