<template>
  <div class="flex items-center mb-4">
    <AppPageIcon iconName="bi:credit-card-fill" :iconSize="'2em'" />
    <div class="ml-4">
      <h2 class="text-white text-2xl">Додавання картки</h2>
    </div>
  </div>
  <div class="container mx-auto flex flex-col md:flex-row">
    <div class="flex justify-center items-center w-full">
      <div class="container mx-auto">
        <div class="flex justify-center">
          <CardAppAddCard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebar from '~/components/ui/layouts/AppSidebar.vue'
import AppPageIcon from '~/components/ui/icons/AppPageIcon.vue'
import AppAddCard from '~/components/card/AppAddCard.vue'

export default {
  components: {
    AppSidebar,
    AppPageIcon,
    AppAddCard,
  }
}
</script>
