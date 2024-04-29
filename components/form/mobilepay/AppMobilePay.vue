<template>
  <div class="flex items-center justify-center w-full h-full m-4 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md mt-4 px-4 sm:px-0">
      <h1 class="text-2xl font-bold mb-10 text-center text-white">Поповнення мобільного</h1>
    <form @submit.prevent="submitForm" class="w-full max-w-md mt-16">
      <div class="mb-4">
        <label class="block text-white text-sm font-bold mb-2" for="phoneNumber">
          Ваш номер:
        </label>
        <input
          class="w-full px-3 py-2 bg-slate-500 placeholder-black border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-slate-800 focus:border-slate-800"
          id="phoneNumber" type="tel" v-model="phoneNumber" placeholder="(000) 000 00 00" required>
      </div>
      <div class="mb-4">
        <label class="block text-white text-sm font-bold mb-2" for="amount">
          Сума поповнення:
        </label>
        <input
          class="w-full px-3 py-2 bg-slate-500 placeholder-gray-300 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-slate-800 focus:border-slate-800"
          id="amount" type="number" v-model="amount" required>
      </div>
      <div class="mb-6">
        <label class="block text-white text-sm font-bold mb-2" for="selectedCard">
          Оберіть картку:
        </label>
        <select
          class="w-full px-3 py-2 bg-slate-500 placeholder-gray-300 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-slate-800 focus:border-slate-800"
          id="selectedCard" v-model="selectedCard">
          <option value="">Оберіть картку</option>
          <option v-for="card in cards" :key="card.number" :value="card.number">
            *{{ String(card.number).slice(-4) }} {{ card.type }} - {{ card.balance }} {{ card.currency }}
          </option>
        </select>
      </div>
      <div class="mx-auto flex justify-center">
        <button :disabled="isLoading"
          class="py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-md"
          type="submit">
          Поповнити
        </button>
      </div>
    </form>

    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-slate-600">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-green-600">Успішне поповнення</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-black">Сума: <strong>{{ amount }} {{ currency }}</strong></p>
            <p class="text-sm text-black">Номер телефона: <strong>{{ phoneNumber }}</strong></p>
            <p class="text-sm text-black">
              Карта оплати: <strong>{{ selectedCardDetails.type }} *{{ String(selectedCardDetails.number).slice(-4)
                }}</strong>
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button @click="closeModal"
              class="px-4 py-2 bg-green-700 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { computed } from 'vue';
import useCards from '~/composables/useCards';
import usePayment from '~/composables/usePayment';

const { cards, fetchCardData } = useCards();
const { phoneNumber, amount, selectedCard, showModal, isLoading, closeModal, submitForm } = usePayment();

const currency = ref('UAH');

const selectedCardDetails = computed(() => {
  return cards.value.find(card => card.number === selectedCard.value);
});
</script>
