<template>
  <div class="flex items-center justify-center mt-4 w-full">
    <div class="flex flex-col items-center">
      <div class="flex items-center mb-4">
        <span class="text-xs text-blue-500 mr-2">{{ activeForm === 'login' ? 'Вход' : 'Регистрация' }}</span>
        <div class="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
          <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" v-model="activeForm" true-value="register" false-value="login" />
          <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-blue-500 cursor-pointer"></label>
        </div>
        <span class="text-xs text-blue-500 ml-2">{{ activeForm === 'login' ? 'Регистрация' : 'Вход' }}</span>
      </div>
      <LoginForm v-if="activeForm === 'login'" />
      <RegisterForm v-else />
    </div>
  </div>
</template>

<script>
import LoginForm from '~/components/form/auth/AppLoginForm.vue'
import RegisterForm from '~/components/form/auth/AppRegisterForm.vue'

export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      activeForm: 'login'
    }
  }
}
</script>

<style scoped>
.toggle-checkbox:checked {
  right: 0;
  border-color: #ffffff;
  background-color: #ffffff;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #4576ff;
}
</style>
