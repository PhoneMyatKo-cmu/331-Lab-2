<script setup lang="ts">
const props = withDefaults(defineProps<{ resource: string }>(), { resource: 'page' })
const resource = props.resource
</script>
<template>
  <h1>Oops</h1>
  <h3>{{ resource }} you are looking for is not here.</h3>
  <RouterLink :to="{ name: 'event-list-view' }">Back To The Home Page</RouterLink>
</template>
