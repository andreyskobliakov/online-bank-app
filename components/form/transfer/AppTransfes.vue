<template>
  <div class="flex items-center justify-center w-full h-full m-4 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md mt-4 px-4 sm:px-0">
      <h1 class="text-2xl font-bold mb-10 text-center text-white">Переказ між картками</h1>
      <form @submit.prevent="submitTransfer" class="w-full max-w-md mt-16">
        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="fromCard">
            З картки:
          </label>
          <select v-model="fromCard" id="fromCard" required class=" w-full px-3 py-2 bg-slate-500 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-slate-800 focus:border-slate-800">
            <option value="">Оберіть картку</option>
            <option v-for="card in cards" :key="card.number" :value="card.number">
              *{{ String(card.number).slice(-4) }} {{ card.type }} - {{ card.balance }} {{ card.currency }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="toCard">
            На картку:
          </label>
          <select v-model="toCard" id="toCard" required class="w-full px-3 py-2 bg-slate-500 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-slate-800 focus:border-slate-800">
            <option value="">Оберіть картку</option>
            <option v-for="card in cards" :key="card.number" :value="card.number">
              *{{ String(card.number).slice(-4) }} {{ card.type }} - {{ card.balance }} {{ card.currency }}
            </option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block text-white text-sm font-bold mb-2" for="amount">
            Сумма:
          </label>
          <input v-model.number="amount" id="amount" type="number" required class="w-full px-3 py-2 bg-slate-500 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-slate-800 focus:border-slate-800">
        </div>
        <div class="mx-auto flex justify-center">
          <button type="submit" class="py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-md">
            Перевести
          </button>
        </div>
      </form>

    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="transfer-modal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-slate-600">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-green-600">Переказ успішний</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-black">Переказ з картки <strong>{{ fromCardDetails.type }} *{{ String(fromCardDetails.number).slice(-4) }}</strong></p>
            <p class="text-sm text-black">Переказ на картку:<strong>*{{ String(toCardDetails.number).slice(-4) }}</strong></p>
            <p class="text-sm text-black">Сумма: <strong>{{ amount }} {{ currency }}</strong></p>
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
import { ref, computed, onMounted } from 'vue';
import useCards from '~/composables/useCards';
import useTransfer from '~/composables/useTransfer';

const { cards, fetchCardData } = useCards();
const { fromCard, toCard, amount, showModal, closeModal, submitTransfer } = useTransfer();
const currency = ref('UAH');

onMounted(async () => {
  if (cards.value.length > 0) {
    fromCard.value = cards.value[0].number;
    toCard.value = cards.value.length > 1 ? cards.value[1].number : cards.value[0].number;
  }
});

const fromCardDetails = computed(() => {
  return cards.value.find(card => card.number === fromCard.value);
});
const toCardDetails = computed(() => {
  return cards.value.find(card => card.number === toCard.value);
});
</script>

