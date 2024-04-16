<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-slate-800">
    <form @submit.prevent="submitForm" class="w-full max-w-md mt-16">
      <div class="mb-4">
        <label class="block text-white text-sm font-bold mb-2" for="phoneNumber">
          Ваш номер:
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phoneNumber" type="tel" v-model="phoneNumber" placeholder="(000) 000 00 00" required>
      </div>
      <div class="mb-4">
        <label class="block text-white text-sm font-bold mb-2" for="amount">
          Сума поповнення:
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="amount" type="number" v-model="amount" required>
      </div>
      <div class="mb-6">
        <label class="block text-white text-sm font-bold mb-2" for="selectedCard">
          Оберіть картку:
        </label>
        <select
          class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="selectedCard" v-model="selectedCard">
          <option enabled value="">Оберіть картку</option>
          <option v-for="card in cards" :key="card.number" :value="card.number">
            *{{ String(card.number).slice(-4) }} {{ card.type }} - {{ card.balance }} {{ card.currency }}
          </option>
        </select>
      </div>
      <div class="flex items-center justify-between">
        <button :disabled="isLoading"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
            <p class="text-sm text-black">Номер телефона: <strong>{{ phoneNumber }}</strong></p>
            <p class="text-sm text-black">Сума: <strong>{{ amount }} {{ currency }}</strong></p>
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
</template>

<script setup>
import { ref, computed } from 'vue';
import useCards from '../../../composables/useCards';

const { cards, fetchCardData } = useCards();
const phoneNumber = ref('');
const amount = ref(null);
const selectedCard = ref('');
const showModal = ref(false);
const isLoading = ref(false);
const currency = ref('UAH');

const selectedCardDetails = computed(() => {
  return cards.value.find(card => card.number === selectedCard.value);
});

const closeModal = () => {
  showModal.value = false;
  phoneNumber.value = '';
  amount.value = null;
  selectedCard.value = '';
};

const submitForm = async () => {
  isLoading.value = true;

  try {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const response = await fetch('http://localhost:3001/topUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        cardNumber: selectedCard.value,
        amount: amount.value
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    showModal.value = true;
  } catch (error) {
    console.error('Помилка при відправці платежу', error);
  } finally {
    isLoading.value = false;
  }
};
</script>