<template>
    <footer class="footer footer-center p-4 bg-slate-950 text-base-content">
      <aside>
        <p>{{ copyright }}</p>
      </aside>
    </footer>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup() {
      const copyright = ref('Copyright © 2024 - All right reserved by ACME Industries Ltd')
  
      return {
        copyright
      }
    }
  }
  </script>
  