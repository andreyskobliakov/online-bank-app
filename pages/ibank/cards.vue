<template>
  <div class="flex items-center justify-start lg:justify-start">
    <AppPageIcon iconName="bi:credit-card-fill" :iconSize="'2em'" />
    <div class="ml-4">
      <h2 class="text-white text-2xl">Додавання картки</h2>
      <p class="text-blue-300 text-xs">Додайте свою картку для зручного управління фінансами</p>
    </div>
  </div>
  <div class="container mx-auto flex flex-col md:flex-row min-h-screen">
    <div class="flex justify-center items-center w-full">
      <div class="container mx-auto">
        <div class="flex justify-center">
          <AppAddCard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '#imports';
import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue';
import AppAddCard from '~/components/card/AppAddCard.vue';

useHead({
  title: 'Додавання картки - SMART BANK',
  meta: [
    { name: 'description', content: 'Додайте свою картку для зручного управління фінансами у SMART BANK.' },
    { property: 'og:title', content: 'Додавання картки - SMART BANK' },
    { property: 'og:description', content: 'Зробіть керування вашими картками простим і безпечним з SMART BANK.' },
    { property: 'og:type', content: 'website' },
  ]
});
</script>

<style>

</style>
