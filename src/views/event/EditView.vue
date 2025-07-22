<script setup lang="ts">
import type { Event } from '@/types'
import { defineProps, toRef } from 'vue'
const props = defineProps<{
  event: Event
  id: string
}>()
const event = toRef(props)
</script>

<template>
  <p>Edit event here</p>
</template>
