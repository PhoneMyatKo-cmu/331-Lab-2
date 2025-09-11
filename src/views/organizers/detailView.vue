<script lang="ts" setup>
import { useOrganizerStore } from '@/stores/organizer'
import { storeToRefs } from 'pinia'
const orgStore = useOrganizerStore()
const { organizer } = storeToRefs(orgStore)
</script>

<template>
  <div>
    <h1>{{ organizer?.name }}</h1>
    <p>{{ organizer?.address }}</p>
  </div>
</template>
