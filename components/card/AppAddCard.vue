<template>
  <div class="flex items-center justify-center w-full h-full m-4 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md mt-4 px-4 sm:px-0">
      <h1 class="text-2xl font-bold mb-10 text-center text-white">Відкрити картку</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-white">Назва:</label>
          <select v-model="card.name" @change="errors.name = ''" class="w-full px-3 py-2 bg-slate-500 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-slate-800 focus:border-slate-800">
            <option value="">Оберіть картку</option>
            <option>Blue</option>
            <option>Premium</option>
            <option>Red</option>
          </select>
          <p v-if="errors.name" class="text-red-500 text-xs italic">{{ errors.name }}</p>
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-white">Тип картки:</label>
          <select v-model="card.type" @change="errors.type = ''" class="w-full px-3 py-2 bg-slate-500 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-slate-800 focus:border-slate-800">
            <option value="">Оберіть тип картки</option>
            <option>Для виплат</option>
            <option>Кредитна картка</option>
          </select>
          <p v-if="errors.type" class="text-red-500 text-xs italic">{{ errors.type }}</p>
        </div>
        <div v-if="showCreditLimit" class="mb-5">
          <label class="block mb-2 text-sm font-medium text-white">Кредитний ліміт:</label>
          <input type="number" v-model="card.creditLimit" @change="errors.creditLimit = ''" class="w-full px-3 py-2 bg-slate-500 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-slate-800 focus:border-slate-800" />
          <p v-if="errors.creditLimit" class="text-red-500 text-xs italic">{{ errors.creditLimit }}</p>
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-white">Валюта карти:</label>
          <select v-model="card.currency" @change="errors.currency = ''" class="w-full px-3 py-2 bg-slate-500 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-slate-800 focus:border-slate-800">
            <option value="">Оберіть валюту</option>
            <option>UAH</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
          <p v-if="errors.currency" class="text-red-500 text-xs italic">{{ errors.currency }}</p>
        </div>
        <div class="mx-auto flex justify-center">
          <button type="submit" class="py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-md">Активувати картку</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  setup() {
    const card = ref({
      name: '',
      type: '',
      currency: '',
      paymentSystem: '',
      creditLimit: null,
    });
    const errors = ref({});
    const showCreditLimit = ref(false);

    const validateForm = () => {
      errors.value = {};

      if (!card.value.name) {
        errors.value.name = 'Пожалуйста, выберите название.';
      }

      if (!card.value.type) {
        errors.value.type = 'Пожалуйста, выберите тип карты.';
      }

      if (showCreditLimit.value && !card.value.creditLimit) {
        errors.value.creditLimit = 'Пожалуйста, введите кредитный лимит.';
      }

      if (!card.value.currency) {
        errors.value.currency = 'Пожалуйста, выберите валюту.';
      }

      return Object.keys(errors.value).length === 0;
    };

    const selectPaymentSystem = () => {
      if (['blue', 'red'].includes(card.value.name.toLowerCase())) {
        card.value.paymentSystem = 'VISA';
      } else if (['blue premium', 'red premium'].includes(card.value.name.toLowerCase())) {
        card.value.paymentSystem = 'MASTERCARD';
      }
    };

    watch(() => card.value.name, selectPaymentSystem);
    watch(() => card.value.type, () => {
      showCreditLimit.value = card.value.type === 'Кредитна картка';
      selectPaymentSystem();
    });

    const submitForm = async () => {
      if (!validateForm()) {
        return;
      }

      card.value.number = Math.floor(1000000000000000 + Math.random() * 9000000000000000);
      let expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 3);
      card.value.expiryDate = ('0' + (expiryDate.getMonth() + 1)).slice(-2) + '/' + expiryDate.getFullYear().toString().slice(-2);
      card.value.cvv = Math.floor(Math.random() * 1000);
      card.value.balance = 0.00;

      try {
        const response = await fetch('http://localhost:3001/openCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...card.value,
            userId: localStorage.getItem('userId'),
          }),
        });

        const data = await response.json();

        if (data.message !== 'Карта успешно открыта') {
          console.log('Произошла ошибка при открытии карты');
        }
      } catch (error) {
        console.error(error);
      }
    };

    return {
      card,
      errors,
      showCreditLimit,
      submitForm,
    };
  },
};
</script>

<style scoped>
</style>
