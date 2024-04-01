<template>
  <div class="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
    <NuxtLayout name="auth" class="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto bg-slate-900 rounded-lg">
      <AppAuthForm/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import  AppAuthForm  from '~/components/AppAuthForm.vue';

definePageMeta({
  layout: false,
})

</script>

<style scoped>

</style>
