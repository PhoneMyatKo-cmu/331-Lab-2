<script setup lang="ts">
import { ref } from 'vue'
import Uploader from 'vue-media-upload'

interface Props {
  modelValue?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
})
const convertStringToMedia = (str: string[]) => {
  return str.map((element: string) => {
    return { name: element }
  })
}

const emit = defineEmits(['update:modelValue'])
const convertMediaToString = (media: any): string[] => {
  const output: string[] = []
  media.forEach((element: any) => {
    output.push(element.name)
  })
  return output
}

const media = ref(convertStringToMedia(props.modelValue))
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL)
const onChanged = (files: any) => {
  console.log('On change Uploader:', files)
  emit('update:modelValue', convertMediaToString(files))
}
</script>

<template>
  <Uploader :server="uploadUrl" @change="onChanged" :media="media" field></Uploader>
</template>
