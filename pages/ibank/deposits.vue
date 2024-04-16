<template>
    <div class="flex items-center">
      <AppPageIcon iconName="bi:cash-coin" :iconSize="'2em'" />
      <div class="ml-4">
        <h2 class="text-blue-300 text-2xl">Депозити</h2>
        <p class="text-blue-300 text-xs">Керуйте своїми депозитами онлайн.</p>
      </div>
    </div>
  </template>
  
  <script>
  import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue'
  
  export default {
    components: {
      AppPageIcon
    }
  }
  </script>
  