<template>
  <AppFormWrapper class="w-full flex flex-col space-y-4 max-w-md mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
    <AppFieldWrapper v-model="name" label="Ім'я" :helper-text="'Введіть ваше ім`я'" :error="errors.name" @input="validateField('name')" class="flex flex-col space-y-1">
      <template #icon>
        <Icon name="material-symbols:person-2" color="black" class="absolute left-3 top-3" size="1em" />
      </template>
    </AppFieldWrapper>
    <AppFieldWrapper v-model="email" label="Електронна пошта" :helper-text="'Введіть вашу електронну пошту'" :error="errors.email" @input="validateField('email')" class="flex flex-col space-y-1">
      <template #icon>
        <Icon name="material-symbols:mail" color="black" class="absolute left-3 top-3" size="1em" />
      </template>
    </AppFieldWrapper>
    <AppFieldWrapper v-model="phone" label="Телефон" :helper-text="'Введіть ваш номер телефону'" :error="errors.phone" @input="validateField('phone')" class="flex flex-col space-y-1">
      <template #icon>
        <Icon name="mdi:cellphone-android" color="black" class="absolute left-3 top-3" size="1em" />
      </template>
    </AppFieldWrapper>
    <AppFieldWrapper v-model="password" label="Пароль" type="password" :helper-text="'Введіть ваш пароль'" :error="errors.password" @input="validateField('password')" class="flex flex-col space-y-1">
      <template #icon>
        <Icon name="ion:md-lock" color="black" class="absolute left-3 top-3" size="1em" />
      </template>
    </AppFieldWrapper>
    <button @click="submit" class="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">Реєстрація</button>
  </AppFormWrapper>
</template>


<script>
import { ref } from 'vue';
import { validateRegisterForm } from '~/composables/Form';
import AppFormWrapper from '~/components/form/auth/AppFormWrapper.vue';
import AppFieldWrapper from '~/components/form/auth/AppFieldWrapper.vue';

export default {
  name: 'RegisterForm',
  components: {
    AppFormWrapper,
    AppFieldWrapper
  },
  setup() {
    const name = ref('');
    const email = ref('');
    const phone = ref('');
    const password = ref('');
    const errors = ref({});

    const validateField = () => {
      errors.value = validateRegisterForm({ name: name.value, email: email.value, phone: phone.value, password: password.value });
    };

    const submit = async () => {
  
  errors.value = validateRegisterForm({ name: name.value, email: email.value, phone: phone.value, password: password.value });

  
  if (Object.keys(errors.value).length === 0) {
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: name.value, phone: phone.value, email: email.value, password: password.value })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      
      if (data.token) {
        
        localStorage.setItem('jwt', data.token);
        console.log('Пользователь успешно зарегистрирован');
      } else if (data.message) {
        console.log(data.message);
      }
    } catch (error) {
      console.log('Ошибка при регистрации:', error);
    }
  }
};


    return { name, email, phone, password, errors, validateField, submit };
  }
}
</script>

<style scoped>

</style>
