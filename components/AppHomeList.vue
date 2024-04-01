<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full ьфчh-auto">
    <div class="bg-slate-800 max-h-screen overflow-y-auto p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
      <h2 class="text-white">Гаманець</h2>
      <div v-for="card in cards" :key="card.number" class="bg-slate-700 h-18 p-4 my-2 rounded-lg shadow-md">
        <p class="text-white text-sm md:text-base">* {{ String(card.number).slice(-4) }} {{ card.type }}</p>
        <p class="text-white text-sm md:text-base">{{ card.balance }} {{ card.currency }}</p>
      </div>
    </div>
    <div class="bg-slate-800 h-40">Поповнення</div>
    <div class="bg-slate-800 h-40">Поповнення</div>
    <div class="bg-slate-800 h-40">Поповнення</div>
  </div>
</template>

<script>
import useCards from '~/composables/useCards';

export default {
  setup() {
    const { cards, expandedCard, toggleCard, isCardExpanded, getMaskedCardNumber } = useCards();
    return { cards, expandedCard, toggleCard, isCardExpanded, getMaskedCardNumber };
  }
}
</script>

<style scoped>

</style>
