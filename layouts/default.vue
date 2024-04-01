<template>
  <div class="bg-slate-900 min-h-screen flex flex-col">
    <AppHeader class="w-full p-2"/>
    <div class="p-4 lg:p-0 w-full flex-grow">
      <div class="flex flex-col lg:flex-row lg:container lg:mx-auto">
        <template v-if="showSidebar">
          <AppSidebar class="hidden lg:block w-full h-64 mt-6 lg:w-1/4 lg:mr-4" />
        </template>
        <template v-else>
  <AppAccordion class="hidden lg:block w-full h-64 mt-2 lg:w-1/3 xl:w-1/4 2xl:w-1/4 p-4 lg:mr-4" />
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
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '~/components/ui/AppHeader.vue';
import AppFooter from '~/components/ui/AppFooter.vue';
import AppSidebar from '~/components/ui/AppSidebar.vue';
import AppAccordion from '~/components/ui/AppAccordion.vue';

const showSidebar = ref(true);
const route = useRoute();

watchEffect(() => {
  showSidebar.value = route.path !== '/ibank/wallet';
});
</script>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
</style>
