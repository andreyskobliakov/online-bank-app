<template>
  <div class="flex flex-col items-center p-2 lg:p-0">
    <div v-for="card in cards" :key="card.number"
      class="card m-2 p-2 w-72 h-48 rounded-xl shadow-lg transition duration-300 ease-in-out"
      :class="cardClass(card)"
      @click="selectCard(card)">
      <div class="card-front flex flex-col w-full h-full">
        <div class="flex justify-between items-center">
          <p class="text-sm text-white">{{ card.type }}</p>
          <AppBaseIcon iconName="mdi:information-variant-circle" iconSize="25px" iconColor="text-white" />
        </div>
        <div class="flex flex-col items-center justify-center flex-grow">
          <div class="flex justify-between flex-col" v-if="card.type === 'Кредитна картка'">
            <p class="text-lg text-white">Кредитний ліміт</p>
            <p class="text-sm text-white font-bold">{{ card.creditLimit }} {{ card.currency }}</p>
          </div>
          <p class="text-lg text-white">Доступні кошти</p>
          <p class="text-lg text-white font-bold">{{ card.balance }} {{ card.currency }}</p>
        </div>
        <div class="flex justify-between mx-2">
          <img src="/assets/icons/visa.svg" v-if="isVisaCard(card)" class="w-9 h-9" />
          <img src="/assets/icons/mastercard.svg" v-if="isPremiumCard(card)" class="w-9 h-9" />
          <h1 class="text-sm text-white">* {{ String(card.number).slice(-4) }}</h1>
          <span class="text-sm text-white">{{ card.expiryDate }}</span>
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
    const { cards } = useCards();
    const { cardClass, isVisaCard, isPremiumCard } = useCardType();
    const selectedCard = ref(null);

    const selectCard = (card) => {
      selectedCard.value = card;
    };

    return { cards, cardClass, isVisaCard, isPremiumCard, selectedCard, selectCard };
  },
};
</script>

<style scoped>
.card {
  cursor: pointer;
}
.card-details {
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  background-color: white;
}
</style>
