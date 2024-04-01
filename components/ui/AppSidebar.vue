<template>
  <aside class="sidebar">
   <h1>Сайдбар</h1>
    <slot></slot>
  </aside>
</template>

<style scoped>
.sidebar {
  /* Стили для боковой панели */
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
}
</style>
