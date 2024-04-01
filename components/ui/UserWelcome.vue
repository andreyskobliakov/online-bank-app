<template>
  <div class="inline-block p-2 mb-2 mx-auto bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
    <h1 class="text-white text-sm font-bold tracking-wide">Вітаємо, {{ username }}!</h1>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'UserWelcome',
  setup() {
    const username = ref('');

    onMounted(() => {
      if (process.client) {
        username.value = localStorage.getItem('username');
      }
    });

    return { username };
  }
}
</script>

<style scoped>
</style>
