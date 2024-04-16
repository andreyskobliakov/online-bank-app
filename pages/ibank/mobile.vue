<template>
    <div class="flex items-center">
      <AppPageIcon iconName="material-symbols:smartphone" :iconSize="'2em'" />
      <div class="ml-4">
        <h2 class="text-blue-300 text-2xl">Поповнення</h2>
        <p class="text-blue-300 text-xs">Поповнити мобільний онлайн.</p>
      </div>
    </div>
    <FormMobilepayAppMobilePay/>
</template>

<script>
  import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue'
  
  export default {
    components: {
      AppPageIcon,
    }
  }
  </script>

<style>

</style>