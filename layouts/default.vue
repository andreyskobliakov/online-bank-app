<template>
  <div class="bg-slate-900 min-h-screen flex flex-col">
    <AppHeader class="w-full p-2"/>
    <div class="p-4 lg:p-0 w-full flex-grow">
      <div class="flex flex-col lg:flex-row lg:container lg:mx-auto">
        <template v-if="showSidebar">
          <AppSidebar class="hidden lg:block w-18 mt-6 mb-4 lg:w-1/5 lg:mr-4" />
        </template>
        <main class="flex-grow p-4 lg:p-0 mt-4">
          <NuxtPage />
        </main>
      </div>
    </div>
    <AppFooter class="w-full text-slate-400 p-4 mt-4" />
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '~/components/ui/layouts/AppHeader.vue';
import AppFooter from '~/components/ui/layouts/AppFooter.vue';
import AppSidebar from '~/components/ui/layouts/AppSidebar.vue';

const showSidebar = ref(true);
const route = useRoute();

</script>

<style>

</style>
