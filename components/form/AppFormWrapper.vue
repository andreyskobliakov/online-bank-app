<template>
  <div class="form-wrapper max-w-md mx-auto p-8 bg-slate-950 rounded-md shadow-2xl shadow-blue-950 flex flex-col items-center">
    <div>
      <Icon name="material-symbols-light:account-circle" class="text-blue-400" size="10em" />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'AppFormWrapper',
  setup() {
    const form = ref(null);
    return { form };
  }
}
</script>

<style scoped>

</style>