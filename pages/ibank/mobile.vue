<template>
  <div class="flex items-center">
    <AppPageIcon iconName="material-symbols:smartphone" :iconSize="'2em'" />
    <div class="ml-4">
      <h2 class="text-blue-300 text-2xl">Поповнення</h2>
      <p class="text-blue-300 text-xs">Поповнити мобільний онлайн.</p>
    </div>
  </div>
  <FormMobilepayAppMobilePay/>
</template>

<script setup>
import { useHead } from '#imports';
import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue';
import AppMobilePay from '~/components/form/mobilepay/AppMobilePay.vue';

useHead({
  title: 'Поповнення - SMART BANK',
  meta: [
    { name: 'description', content: 'Поповніть свій мобільний онлайн з SMART BANK.' },
    { property: 'og:title', content: 'Поповнення - SMART BANK' },
    { property: 'og:description', content: 'Швидке та зручне поповнення мобільного рахунку онлайн з SMART BANK.' },
    { property: 'og:type', content: 'website' },
  ]
});
</script>

<style>

</style>
