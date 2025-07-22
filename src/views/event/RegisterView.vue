<script setup lang="ts">
import type { Event } from '@/types'
import { defineProps, toRefs } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps<{
  event: Event
  id: string
}>()
const { event } = toRefs(props)
const router = useRouter()
const register = () => {
  router.push({ name: 'event-detail-view' })
}
</script>

<template>
  <p>Register event here</p>
  <button @click="register">Register</button>
</template>
