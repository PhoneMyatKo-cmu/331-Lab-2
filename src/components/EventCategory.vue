<script setup lang="ts">
import type { Event } from '@/types'
defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="event-cat-class">
    <div class="event-cat">
      <p>Category:{{ event.category }}</p>
      <span>Organizer: {{ event.organizer }}</span>
    </div>
  </div>
</template>

<style scoped>
.event-cat {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.event-cat:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
