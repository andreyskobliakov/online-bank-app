<!-- UserWelcome.vue -->
<template>
    <div class="text-blue-500 p-3">
      <h1 class="text-blue-300">Вітаємо, {{ username }}</h1>
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
  