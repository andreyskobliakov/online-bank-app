<template>
  <header class="bg-slate-950 shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
  <button @click="toggleMenu" class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
    <template v-if="isMobileMenuOpen">
      <AppBaseIcon :iconName="'mingcute:close-line'" :iconColor="'text-gray-400'" :iconSize="'1em'" />
    </template>
    <template v-if="!isMobileMenuOpen">
      <AppBaseIcon :iconName="'radix-icons:hamburger-menu'" :iconColor="'text-gray-400'" :iconSize="'1em'" />
    </template>
  </button>
</div>
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/ibank">
    <slot name="logo-text">
      <span class="2xl:text-2xl sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
        SMART BANK
      </span>
    </slot>
  </NuxtLink>
          </div>
        </div>
        <nav class="hidden md:flex space-x-10 items-center">
          <nuxt-link to="/ibank/payments" @click="closeMenu" class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">Платежі</nuxt-link>
          <nuxt-link to="/ibank/transfers" @click="closeMenu" class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">Перекази</nuxt-link>
          <nuxt-link to="/ibank/contact" @click="closeMenu" class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">Зв'язок</nuxt-link>
          <nuxt-link to="/ibank/cards" @click="closeMenu" class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">Картки</nuxt-link>
          <nuxt-link to="/ibank/credits" @click="closeMenu" class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">Кредити</nuxt-link>
          <nuxt-link to="/ibank/deposits" @click="closeMenu" class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">Заощадження</nuxt-link>
        </nav>
      </div>
    </div>
    <div v-if="isMobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <nuxt-link to="/ibank/payments" @click="closeMenu" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">Платежі</nuxt-link>
        <nuxt-link to="/ibank/transfers" @click="closeMenu" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">Перекази</nuxt-link>
        <nuxt-link to="/ibank/contact" @click="closeMenu" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">Зв'язок</nuxt-link>
        <nuxt-link to="/ibank/cards" @click="closeMenu" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">Картки</nuxt-link>
        <nuxt-link to="/ibank/credits" @click="closeMenu" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">Кредити</nuxt-link>
        <nuxt-link to="/ibank/deposits" @click="closeMenu" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">Заощадження</nuxt-link>
      </div>
      <div class="sm:mx-auto p-4">
        <UiUserWelcome/>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AppBaseIcon from '~/components/ui/icons/AppBaseIcon.vue';

const isMobileMenuOpen = ref(false);

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};

const clickHandler = (e) => {
  if (!document.querySelector('header').contains(e.target) && e.target !== document.querySelector('button')) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', clickHandler);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', clickHandler);
});
</script>




