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
  
  <script setup>
  import { useHead } from '#imports';
  import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue';


  useHead({
    title: 'Платежі - SMART BANK',
    meta: [
      { name: 'description', content: 'Не витрачайте час на черги, а гроші — на зайві комісії з SMART BANK.' },
      { property: 'og:title', content: 'Платежі - SMART BANK' },
      { property: 'og:description', content: 'Здійснюйте платежі легко та без зайвих комісій з SMART BANK.' },
      { property: 'og:type', content: 'website' },
    ]
  });
  </script>
  
  <style>
  
  </style>
  