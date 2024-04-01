<template>
  <div class="flex flex-col justify-center p-4 lg:p-0">
    <div v-for="card in cards" :key="card.number" class="m-2 p-4 max-w-full h-auto rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl" :class="cardClass(card)" @click="toggleCard(card.number)">
      <div class="flex items-center justify-between">
        <p class="text-xs sm:text-sm md:text-lg text-white font-semibold truncate">{{ card.type }}</p>
        <img src="/assets/icons/visa.svg" v-if="isVisaCard(card)" class="w-8 h-8" />
        <img src="/assets/icons/mastercard.svg" v-if="isPremiumCard(card)" class="w-8 h-8" />
      </div>
      <div class="flex justify-between w-full mt-2">
        <h1 class="text-xs sm:text-sm md:text-lg text-white font-bold truncate">{{ isCardExpanded(card.number) ? getMaskedCardNumber(card.number) : '**** **** **** ' + String(card.number).slice(-4) }}</h1>
        <span class="text-xs sm:text-sm md:text-lg text-white">{{ card.expiryDate }}</span>
      </div>
      <div class="flex justify-between w-full mt-4">
        <div class="flex flex-col space-y-1">
          <p class="text-xs sm:text-sm md:text-lg text-white">Доступні кошти</p>
          <p class="text-sm sm:text-lg md:text-xl text-white font-bold">{{ card.balance }} {{ card.currency }}</p>
        </div>
        <div class="flex flex-col space-y-1" v-if="card.type === 'Кредитна картка'">
          <p class="text-xs sm:text-sm md:text-lg text-white">Кредитний ліміт</p>
          <p class="text-sm sm:text-lg md:text-xl text-white font-bold">{{ card.creditLimit }} {{ card.currency }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import AppBaseIcon from '../../components/ui/icons/AppBaseIcon.vue';
import useCards from '~/composables/useCards';
import useCardType from '~/composables/useCardType';

export default {
  components: {
    AppBaseIcon,
  },
  setup() {
    const { cards, expandedCard, toggleCard, isCardExpanded, getMaskedCardNumber } = useCards();
    const { cardClass, isVisaCard, isPremiumCard } = useCardType();

    return { cards, expandedCard, toggleCard, isCardExpanded, getMaskedCardNumber, cardClass, isVisaCard, isPremiumCard };
  },
};
</script>
