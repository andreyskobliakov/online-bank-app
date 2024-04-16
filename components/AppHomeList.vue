<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
    <div class="bg-slate-800 max-h-screen overflow-y-auto p-4 rounded-lg shadow-lg">
      <NuxtLink to="/ibank/wallet">
      <div class="flex items-center">
        <AppBaseIcon iconName="bi:credit-card-fill" iconSize="1em" />
  <h1 class="text-white ml-2">Гаманець</h1>
</div>
</NuxtLink>
   
<div v-for="card in cards" :key="card.number" class="bg-slate-700 h-18 p-4 my-2 rounded-lg shadow-md">
        <p class="text-white text-sm md:text-base">* {{ String(card.number).slice(-4) }} {{ card.type }}</p>
        <p class="text-white text-sm md:text-base">{{ card.balance }} {{ card.currency }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import useCards from '~/composables/useCards';
import AppBaseIcon from './ui/icons/AppBaseIcon.vue';


export default {
  components: {
    AppBaseIcon,

  },

  setup() {
    const { cards, expandedCard, toggleCard, isCardExpanded, getMaskedCardNumber } = useCards();
    return { cards, expandedCard, toggleCard, isCardExpanded, getMaskedCardNumber };
  }
}
</script>

<style scoped>

</style>
