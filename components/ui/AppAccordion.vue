<template>
  <div class="divide-y divide-slate-900 h-full bg-slate-900">
    <div v-for="(item, index) in items" :key="index">
      <button
        @click="toggleAccordion(index)"
        class="w-full h-full p-4 text-left text-white bg-slate-800 hover:bg-slate-700 focus:outline-none transition duration-300 ease-in-out"
        :class="{ 'bg-slate-600 border-b-0': activeIndex === index }"
      >
        {{ item.title }}
      </button>
      <div
        v-if="activeIndex === index"
        class="accordion-content overflow-auto max-h-100 p-2 bg-slate-700 border-t border-slate-500 rounded-b-lg"
      >
        <AppUserCard v-if="index === 0" :card="item.cardData" />
        <div v-else>
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import AppUserCard from '~/components/card/AppUserCard.vue';

const items = ref([
  { title: 'Картки', content: 'Content 1', cardData: {} },
  { title: 'Депозити', content: 'Content 2' },
  { title: 'Кредити', content: 'Content 3' },
]);

const activeIndex = ref(null);

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style scoped>
.accordion-content {
  transition: max-height 0.35s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
