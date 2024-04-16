<template>
  <div class="inline-flex rounded-lg bg-blue-200 p-2 m-2">
    <AppBaseIcon :iconName="iconName" :iconSize="iconSize" iconColor="text-blue-500" />
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
    },
    iconSize: {
      type: String,
      default: '1em'
    }
  }
}
</script>
