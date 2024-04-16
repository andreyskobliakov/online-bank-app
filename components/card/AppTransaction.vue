<template>
  <div class="flex flex-col m-4">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="flex justify-end gap-2 m-2">
          <div v-if="totalIncome > 0" class="text-green-600">
            Доходи: {{ totalIncome }} {{ currency }}
          </div>
          <div v-if="totalExpenses < 0" class="text-red-700">
            Витрати: {{ -totalExpenses }} {{ currency }}
          </div>
        </div>
        <div v-if="filteredTransactions.length === 0" class="text-center py-4">
          <span class="text-white">На жаль, немає даних за обраний період.</span>
        </div>
        <div v-else class="shadow overflow-hidden border-b border-slate-700 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-slate-600">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Час
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Опис
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Сума
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Дата
                </th>
              </tr>
            </thead>
            <tbody class="bg-slate-700 divide-y divide-slate-900">
              <tr v-for="transaction in filteredTransactions" :key="transaction._id">
                <td class="px-6 py-4 whitespace-nowrap text-white">
                  {{ new Date(transaction.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-white">
                  {{ transaction.type }} *{{ transaction.cardNumber.toString().slice(-4) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap"
                  :class="{ 'text-red-600': transaction.amount < 0, 'text-green-600': transaction.amount >= 0 }">
                  {{ transaction.amount }} {{ transaction.currency }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-white">
                  {{ new Date(transaction.date).toLocaleDateString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <label for="monthFilter" class="text-white">Виберіть місяць:</label>
      <input type="month" id="monthFilter" v-model="monthFilter" @change="filterByMonth">
    </div>
    <button class="mt-5 px-4 py-2 bg-blue-600 text-white rounded" @click="loadPreviousMonth">
      Завантажити за попередній місяць
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const transactions = ref([]);
const loaded = ref(5);
const monthFilter = ref('');
const currency = ref('UAH');

// Встановлення поточного місяця за замовчуванням
const setCurrentMonth = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  monthFilter.value = `${currentYear}-${currentMonth}`;
};

const filteredTransactions = computed(() => {
  if (!monthFilter.value) {
    setCurrentMonth(); // Встановити поточний місяць, якщо monthFilter порожній
    return transactions.value.slice(0, loaded.value);
  }
  const [year, month] = monthFilter.value.split('-');
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  return transactions.value.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  }).slice(0, loaded.value);
});

const totalIncome = computed(() => {
  return transactions.value
    .filter(transaction => transaction.amount >= 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
});

const totalExpenses = computed(() => {
  return transactions.value
    .filter(transaction => transaction.amount < 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
});

onMounted(async () => {
  setCurrentMonth(); // Встановити поточний місяць при монтуванні компонента
  await loadTransactions();
});

const loadTransactions = async () => {
  const userId = localStorage.getItem('userId');
  const response = await fetch(`http://localhost:3001/getTransactions?userId=${userId}`);
  if (response.ok) {
    transactions.value = await response.json();
  } else {
    console.error('Сталася помилка при отриманні інформації про транзакції');
  }
};

const loadMore = () => {
  loaded.value += 5;
};

const loadPreviousMonth = () => {
  const currentDate = monthFilter.value ? new Date(monthFilter.value) : new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  monthFilter.value = currentDate.toISOString().slice(0, 7);
  filterByMonth();
};
</script>
