<template>
    <div class="flex items-center">
      <AppPageIcon iconName="mdi:cash" :iconSize="'2em'" />
      <div class="ml-4">
        <h2 class="text-blue-300 text-2xl">Кредит готівкою</h2>
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
  