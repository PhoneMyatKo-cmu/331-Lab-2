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
  <p>{{ event.time }} on {{ event.date }} at {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>
