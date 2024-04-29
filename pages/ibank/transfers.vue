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

<script setup>
import { useHead } from '#imports';
import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue';
import AppTransfes from '~/components/form/transfer/AppTransfes.vue';

useHead({
  title: 'Переказ - SMART BANK',
  meta: [
    { name: 'description', content: 'Здійснюйте перекази між своїми рахунками та на картки інших банків з SMART BANK.' },
    { property: 'og:title', content: 'Переказ - SMART BANK' },
    { property: 'og:description', content: 'Безпечні та зручні перекази з SMART BANK.' },
    { property: 'og:type', content: 'website' },
  ]
});
</script>

<style>

</style>
