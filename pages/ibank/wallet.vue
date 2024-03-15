<template>
  <div class="flex items-center">
    <AppPageIcon iconName="material-symbols:account-balance-wallet" />
    <div class="ml-4">
      <h2 class="text-blue-300 text-2xl">Гаманець</h2>
      <p class="text-blue-300 text-xs">Переглял рахунків та інформациії</p>
    </div>
  </div>
</template>

<script>
import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue'

export default {
  components: {
    AppPageIcon
  }
}
</script>
