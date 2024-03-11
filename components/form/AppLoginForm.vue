<template>
  <AppFormWrapper class="flex flex-col space-y-4">
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





<script>
import { ref } from 'vue';
import { validateLoginForm } from '~/composables/Form';
import AppFormWrapper from '~/components/form/AppFormWrapper';
import AppFieldWrapper from '~/components/form/AppFieldWrapper';

export default {
  name: 'LoginForm',
  components: {
    AppFormWrapper,
    AppFieldWrapper
  },
  setup() {
    const login = ref('');
    const password = ref('');
    const errors = ref({});

    const validateForm = () => {
      errors.value = validateLoginForm({ login: login.value, password: password.value });
    };

    const submit = () => {
      errors.value = validateLoginForm({ login: login.value, password: password.value });
    };

    return { login, password, errors, validateForm, submit }; // Экспорт функции validateForm
  }
}
</script>
