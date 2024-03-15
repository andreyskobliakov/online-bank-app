<template>
  <div data-theme="night">
    <AppHeader/>
    <div class="container mx-auto p-4 h-screen">
      <slot />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/ui/AppHeader.vue'

export default {
  components: {
    AppHeader
  }
}
</script>

<style scoped>
/* Ваши стили */
</style>
