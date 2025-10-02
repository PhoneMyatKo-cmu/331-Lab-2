<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
const validationSchema = yup.object({
  firstname: yup.string(),
  lastname: yup.string(),
  username: yup.string().required('Username is required'),
  email: yup.string().required('The email is required'),
  password: yup.string().required('The password is required.'),
})
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  },
})
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: username } = useField<string>('username')
const authStore = useAuthStore()
const messageStore = useMessageStore()
const onSubmit = handleSubmit((value) => {
  authStore
    .signUp(value.firstname, value.lastname, value.username, value.email, value.password)
    .then(() => {
      console.log('Sign Up Success')
      router.push({ name: 'event-list-view' })
    })
    .catch((error) => {
      console.log('Error', error)
      messageStore.updateMessage('Could not sign up!')
      setTimeout(() => messageStore.resetMessage(), 3000)
    })
})
</script>
<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        class="mx-auto h-10 w-auto"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign Up
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">
            First Name</label
          >
          <InputText
            type="text"
            v-model="firstname"
            placeholder="First Name"
            :error="errors['firstname']"
          />
        </div>
        <div>
          <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">
            Last Name</label
          >
          <InputText
            type="text"
            v-model="lastname"
            placeholder="Last Name"
            :error="errors['lastname']"
          />
        </div>
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">
            Username</label
          >
          <InputText
            type="text"
            v-model="username"
            placeholder="Username"
            :error="errors['username']"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
            Email Address</label
          >
          <InputText
            type="text"
            v-model="email"
            placeholder="Email Address"
            :error="errors['email']"
          />
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>

          <InputText
            type="password"
            v-model="password"
            placeholder="Password"
            :error="errors['password']"
          />
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo600"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
