<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-2">
    <NuxtLink v-for="item in items" :key="item.id" :to="item.link" class="no-underline">
      <div class="bg-slate-800 h-32 rounded shadow-lg p-4 flex flex-col justify-center items-center">
        <AppPageIcon :iconName="item.iconName" :iconSize="item.iconSize" />
        <p class="text-white text-center">{{ item.title }}</p>
        <p class="text-white text-sm">{{ item.linkText }}</p>
      </div>
    </NuxtLink>
  </div>
</template>



<script>
import { ref } from 'vue';
import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue';

export default {
  name: 'AppPaymentsList',
  components: {
    AppPageIcon,
  },
  setup() {
    const items = ref([
  { id: 1, content: 'Контент для блока 1', link: '/ibank/mobile', linkText: 'Поповнення мобільного', iconName: 'material-symbols:smartphone', iconSize: '2em' },
  { id: 2, content: 'Контент для блока 2', link: '#', linkText: 'Інтернет та ТБ', iconName: 'ri:wifi-fill', iconSize: '2em' },
  { id: 2, content: 'Контент для блока 1', link: '#', linkText: 'Комунальні платежі', iconName: 'lucide:home', iconSize: '2em' },
  { id: 3, content: 'Контент для блока 2', link: '#', linkText: 'Податки та збори', iconName: 'arcticons:ukraine-alarm', iconSize: '2em' },
  { id: 4, content: 'Контент для блока 1', link: '#', linkText: 'Штрафи та порушення', iconName: 'mdi:clipboard-account', iconSize: '2em' },
  { id: 5, content: 'Контент для блока 2', link: '#', linkText: 'Погашення кредитів', iconName: 'streamline:money-cash-bag-dollar-bag-payment-cash-money-finance', iconSize: '2em' },
  { id: 6, content: 'Контент для блока 1', link: '#', linkText: 'Освіта та дитячі садки', iconName: 'nimbus:university', iconSize: '2em' },
  { id: 7, content: 'Контент для блока 2', link: '#', linkText: 'Туристичні компанії', iconName: 'lucide:tree-palm', iconSize: '2em' },
  { id: 8, content: 'Контент для блока 2', link: '#', linkText: 'Страхові компанії', iconName: 'fluent:umbrella-20-filled', iconSize: '2em' },
]);

    return {
      items
    };
  },
};
</script>

<style scoped>

</style>
