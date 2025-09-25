<script setup lang="ts">
import { ref } from 'vue'
import Uploader from 'vue-media-upload'

interface Props {
  modelValue?: string[] | string
  multiple?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  multiple: true,
})
const convertStringToMedia = (str: string[] | string) => {
  if (Array.isArray(str)) {
    return str.map((element: string) => {
      return { name: element }
    })
  } else if (typeof str === 'string' && str.length > 0) {
    return [{ name: str }]
  } else {
    return []
  }
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
  if (props.multiple) {
    emit('update:modelValue', convertMediaToString(files))
  } else {
    emit('update:modelValue', files[0].name || '')
  }
}
</script>

<template>
  <Uploader
    :server="uploadUrl"
    @change="onChanged"
    :media="media"
    :max="!props.multiple ? 1 : null"
  ></Uploader>
</template>
