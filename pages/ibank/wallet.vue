
<template>
  <div class="flex items-center mb-4 justify-start lg:justify-start">
   <AppPageIcon iconName="bi:credit-card-fill" :iconSize="'2em'" />
   <div class="ml-4">
     <h2 class="text-white text-2xl">Гаманець</h2>
     <p class="text-blue-300 text-xs">Перегляд виписок та інформації за рахунками</p>
   </div>
   </div>
   <div class="container mx-auto flex flex-col md:flex-row min-h-screen">
       <div class="container mx-auto">
         <div>
         <CardAppUserCard/>
       </div>
         <div class="flex justify-center">
           <div>
             <div>
             </div>
     </div>
     <CardAppTransaction/>
         </div>
 
       </div>
     </div>
 </template>
 
 <script setup>
 import { useHead } from '#imports';
 import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue';
 
 useHead({
   title: 'Гаманець - SMART BANK',
   meta: [
     { name: 'description', content: 'Перегляд виписок та інформації за рахунками у SMART BANK.' },
     { property: 'og:title', content: 'Гаманець - SMART BANK' },
     { property: 'og:description', content: 'Управління вашими фінансами стало ще зручнішим з SMART BANK.' },
     { property: 'og:type', content: 'website' },
   ]
 });
 
 </script>
 
 <style>
 
 </style>
 
 