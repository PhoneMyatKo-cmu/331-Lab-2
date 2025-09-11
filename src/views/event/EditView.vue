<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import type { Event } from '@/types'
import { defineProps, toRefs } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps<{
  event: Event
  id: string
}>()
const { event } = toRefs(props)
const store = useMessageStore()
const router = useRouter()
function edit() {
  store.updateMessage('The event data has been edited for ' + event.value.title)
  setTimeout(() => store.resetMessage(), 3000)
  router.push({ name: 'event-detail-view', params: { id: event.value.id } })
}
</script>

<template>
  <p>Edit event here</p>
  <button @click="edit">Edit</button>
</template>
