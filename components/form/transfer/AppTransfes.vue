<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form @submit.prevent="submitTransfer" class="w-full max-w-md mt-16">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="fromCard">
            С карты:
          </label>
          <select v-model="fromCard" id="fromCard" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option disabled value="">Выберите карту</option>
            <option v-for="card in cards" :key="card.number" :value="card.number">
                *{{ String(card.number).slice(-4) }} {{ card.type }} - {{ card.balance }} {{ card.currency }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="toCard">
            На карту:
          </label>
          <select v-model="toCard" id="toCard" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option disabled value="">Выберите карту</option>
            <option v-for="card in cards" :key="card.number" :value="card.number">
                *{{ String(card.number).slice(-4) }} {{ card.type }} - {{ card.balance }} {{ card.currency }}
            </option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">
            Сумма:
          </label>
          <input v-model.number="amount" id="amount" type="number" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Перевести
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import useCards from '../composables/useCards';
  
  const { cards } = useCards();
  const fromCard = ref(cards[0]?.number);
  const toCard = ref(cards[1]?.number);
  const amount = ref(0);
  
  const submitTransfer = async () => {
    const userId = localStorage.getItem('userId'); // получить userId из localStorage
  
    try {
      const response = await fetch('http://localhost:3001/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          fromCardNumber: fromCard.value,
          toCardNumber: toCard.value,
          amount: amount.value
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log(data.message);
    } catch (error) {
      console.error('Произошла ошибка при переводе средств', error);
    }
  };
  </script>
  