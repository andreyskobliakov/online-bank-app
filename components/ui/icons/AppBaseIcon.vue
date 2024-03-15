<template>
  <div>
    <Icon :name="iconName" :class="iconColor" :size="iconSize" />
  </div>
</template>

<script>
export default {
  name: 'AppBaseIcon',
  props: {
    iconName: {
      type: String,
      required: true
    },
    iconSize: {
      type: String,
      default: '1em'
    },
    iconColor: {
      type: String,
      default: 'text-blue-300'
    },
  }
}
</script>
