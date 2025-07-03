<script setup lang="ts">
import type { Student } from '@/types'
defineProps<{
  student: Student
}>()
// const event = ref({
//   id: 5928101,
//   category: 'animal welfare',
//   title: 'Cat Adoption Day',
//   description: 'Find your feline friend at this event.',
//   location: 'Meow town',
//   date: 'January 28,2022',
//   time: '12:00',
//   petsAllowed: true,
//   organizer: 'Kat Laydee',
// })
</script>

<template>
  <div class="event-class">
    <div class="student-card">
      <p>Name:{{ student.name }}</p>
      <p>Surname:{{ student.surname }}</p>
      <p>GPA:{{ student.gpa }}</p>
    </div>
  </div>
</template>

<style scoped>
.student-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.student-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
