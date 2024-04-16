<template>
    <div class="flex items-center">
      <AppPageIcon iconName="mdi:currency-uah" :iconSize="'2em'" />
      <div class="ml-4">
        <h2 class="text-blue-300 text-2xl">Платежі</h2>
        <p class="text-blue-300 text-xs">Не витрачайте час на черги, а гроші — на зайві комісії</p>
      </div>
    </div>
    <UiAppPaymentsList/>
  </template>
  
  <script>
  import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue'
  
  export default {
    components: {
      AppPageIcon
    }
  }
  </script>
  