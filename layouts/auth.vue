<template>
  <div data-theme="night" class=" bg-blue-950 flex flex-col items-center justify-center p-10 h-screen">
      <UiAppLogo/>
      <div class="auth-form">
        <AppAuthForm/>
      </div>
      <slot />
  </div>
</template>

<script>
import UiAppLogo from '@/components/ui/AppLogo.vue' // Путь до вашего компонента UiAppLogo
import AppAuthForm from '@/components/AppAuthForm.vue' // Путь до вашего компонента AppAuthForm

export default {
  components: {
    UiAppLogo,
    AppAuthForm
  }
}
</script>

<style scoped>
/* Ваши стили */
</style>
