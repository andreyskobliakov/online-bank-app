<template>
  <div class="inline-flex rounded-lg bg-blue-200 p-2 m-2">
    <AppBaseIcon :iconName="iconName" iconColor="text-blue-500" iconSize="2em" />
  </div>
</template>

<script>
import AppBaseIcon from '~/components/ui/icons/AppBaseIcon.vue'

export default {
  name: 'PageIcon',
  components: {
    AppBaseIcon
  },
  props: {
    iconName: {
      type: String,
      required: true
    }
  }
}
</script>
