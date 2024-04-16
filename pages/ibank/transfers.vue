<template>
    <div class="flex items-center">
      <AppPageIcon iconName="mdi:credit-card-outline" :iconSize="'2em'" />
      <div class="ml-4">
        <h2 class="text-blue-300 text-2xl">Переказ</h2>
        <p class="text-blue-300 text-xs">Переказ між своїми рахунками, з/на картку VISA/MasterCard інших українських та закордонних банків.</p>
      </div>
    </div>
    <FormTransferAppTransfes/>
  </template>
  
  <script>
  import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue'
  
  export default {
    components: {
      AppPageIcon
    }
  }
  </script>
  