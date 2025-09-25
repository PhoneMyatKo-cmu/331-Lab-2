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
    <div class="flex flex-row flex-wrap justify-center">
      <img
        :src="organizer?.imageUrl"
        alt="event images"
        class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
      />
    </div>
  </div>
</template>
