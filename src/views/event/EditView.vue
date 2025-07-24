<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import type { Event } from '@/types'
import { defineProps, toRef } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps<{
  event: Event
  id: string
}>()
const event = toRef(props)
const store = useMessageStore()
const router = useRouter()
function edit() {
  store.updateMessage('The event data has been edited for ' + props.event.title)
  setTimeout(() => store.resetMessage(), 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
</script>

<template>
  <p>Edit event here</p>
  <button @click="edit">Edit</button>
</template>
