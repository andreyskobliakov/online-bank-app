
<template>
 <div class="flex items-center mb-4 justify-start lg:justify-start">
  <AppPageIcon iconName="bi:credit-card-fill" />
  <div class="ml-4">
    <h2 class="text-white text-2xl">Гаманець</h2>
    <p class="text-blue-300 text-xs">Перегляд виписок та інформації за рахунками</p>
  </div>
  </div>
  <div class="container mx-auto flex flex-col md:flex-row min-h-screen">
      <div class="container mx-auto">
        <div class="flex justify-center">
          <div>
           <h2 class="text-white">Информация о карте</h2>
           <AppUserCard @card-details="handleCardSelected" />
  <AppDetailsCard v-if="selectedCard" :card="selectedCard" />
    </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue';

export default {
  components: {
    AppPageIcon,
  },

};
</script>

