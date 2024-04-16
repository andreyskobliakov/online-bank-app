<template>
  <div class="bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-10">
    <UiAppLogo class="mb-8"/>
    <slot />
  </div>
</template>

<script>
import UiAppLogo from '~/components/ui/layouts/AppLogo.vue'

export default {
  components: {
    UiAppLogo,
  }
}
</script>

<style scoped>

</style>
