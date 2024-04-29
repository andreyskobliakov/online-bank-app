<template>
  <div class="flex items-center">
    <AppPageIcon iconName="mdi:cash" :iconSize="'2em'" />
    <div class="ml-4">
      <h2 class="text-blue-300 text-2xl">Кредит готівкою</h2>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '#imports';
import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue';

useHead({
  title: 'Кредит готівкою - SMART BANK',
  meta: [
    { name: 'description', content: 'Отримайте кредит готівкою від SMART BANK швидко та зручно.' },
    { property: 'og:title', content: 'Кредит готівкою - SMART BANK' },
    { property: 'og:description', content: 'Надійні кредитні рішення для ваших потреб від SMART BANK.' },
    { property: 'og:type', content: 'website' },
  ]
});
</script>

<style>
</style>
