<template>
  <div class="bg-slate-900 min-h-screen flex flex-col">
    <AppHeader class="w-full p-2"/>
    <div class="p-4 lg:p-0 flex-grow justify-center">
      <div class="flex flex-col mx-24 lg:container lg:mx-auto">
        <main class="flex-grow p-4 lg:p-0 mt-4">
          <NuxtPage />
        </main>
      </div>
    </div>
    <AppFooter class="w-full text-slate-400 p-4 mt-4" />
  </div>
</template>

<script setup>

import AppHeader from '~/components/ui/layouts/AppHeader.vue';
import AppFooter from '~/components/ui/layouts/AppFooter.vue';

</script>

<style scoped>

</style>
