<template>
  <div id="app" class="bg-slate-900">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useHead } from '#imports';

useHead({
  title: 'SMART BANK',
  meta: [
    { name: 'description', content: 'SMART BANK - быстрые и безопасные банковские услуги.' },
    { name: 'keywords', content: 'банк, финансы, кредиты, вклады, платежи' },
    { property: 'og:title', content: 'SMART BANK - Ваш надежный финансовый партнер' },
    { property: 'og:description', content: 'Откройте для себя мир финансовых возможностей с SMART BANK.' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
});
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
