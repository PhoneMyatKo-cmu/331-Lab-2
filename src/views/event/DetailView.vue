<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import type { Event } from '@/types'
import { storeToRefs } from 'pinia'
import { defineProps, toRefs } from 'vue'
const props = defineProps<{
  event: Event
  id: string
}>()
const store = useMessageStore()
const { message } = storeToRefs(store)
const { event } = toRefs(props)
</script>

<template>
  <div id="flashMessage" class="animate-fade" v-if="message && message.includes('edited')">
    <h3>{{ message }}</h3>
  </div>
  <p>{{ event.title }} at {{ event.location }}</p>
  <p>{{ event.description }}</p>
  <div class="flex flex-row flex-wrap justify-center">
    <img
      v-for="image in event.images"
      :key="image"
      :src="image"
      alt="event images"
      class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
    />
  </div>
</template>
