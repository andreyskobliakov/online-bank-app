<template>
  <div class="logo-component text-4xl font-extrabold text-center sm:text-left">
    <slot name="logo-text">
      <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
        SMART BANK
      </span>
    </slot>
    <slot name="logo-version">
      <p class="text-blue-500 text-lg">
        Version 1.0.0
      </p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'AppLogo',
};
</script>

<style scoped>

</style>
