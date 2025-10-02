<script lang="ts" setup>
import OrganizerService from '@/services/OrganizerService'
import type { Organizer } from '@/types'
import { onMounted, ref } from 'vue'

const organizers = ref<Organizer[]>([])
onMounted(() => {
  OrganizerService.getOrganizers(3, 0)
    .then((response) => {
      organizers.value = response.data
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>

<template>
  <div>
    <div v-for="organizer in organizers" :key="organizer.id">
      {{ organizer.name }}
    </div>
  </div>
</template>
