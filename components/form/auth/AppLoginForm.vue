<template>
  <AppFormWrapper class="w-full flex flex-col space-y-4">
    <AppFieldWrapper v-model="login" label="Ім'я" :helper-text="'Введіть ваше ім`я'" :error="errors.login" @input="validateForm" class="flex flex-col space-y-1">
      <template #icon>
        <Icon name="material-symbols:person-2" color="black" class="absolute left-3 top-3" size="1em" />
      </template>
    </AppFieldWrapper>
    <AppFieldWrapper v-model="password" label="Пароль" type="password" :helper-text="'Введіть ваш пароль'" :error="errors.password" @input="validateForm" class="flex flex-col space-y-1">
      <template #icon>
        <Icon name="ion:md-lock" color="black" class="absolute left-3 top-3" size="1em" />
      </template>
    </AppFieldWrapper>
    <button @click="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Вхід</button>
  </AppFormWrapper>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { validateLoginForm } from '~/composables/Form';
import AppFormWrapper from '~/components/form/auth/AppFormWrapper.vue';
import AppFieldWrapper from '~/components/form/auth/AppFieldWrapper.vue';

const login = ref('');
const password = ref('');
const errors = ref({});

const router = useRouter();

const validateForm = () => {
  errors.value = validateLoginForm({ login: login.value, password: password.value });
};

const submit = async () => {
  validateForm();

  if (Object.keys(errors.value).length === 0) {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: login.value, password: password.value })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('username', login.value); 
        localStorage.setItem('userId', data.userId);
        console.log('Пользователь успешно авторизован');
        router.push({ name: 'ibank' });
      } else if (data.message) {
        console.log(data.message);
      };

    } catch (error) {
      console.log('Ошибка при входе в систему:', error);
      login.value = '';
      password.value = '';
    }
  }
};
</script>

<style scoped>
/* Ваши стили */
</style>
