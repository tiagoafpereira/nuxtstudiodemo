<template>
  <Avatar :image="avatar.image" class="mr-2" size="large" shape="circle" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  name: String
})
const avatar = computed(() => {
  return {
    name: 'S',
    image: `/img/members/profile-${props.name}.jpg`
  }
  // switch (props.name) {
  //   case 'luis-sarmento':
  //     return {
  //       name: 'S',
  //       image: `/img/members/profile-${props.name}.jpg`
  //     }
  //   default:
  //     return {
  //       name: '0',
  //       image: ''
  //     }
  // }
})
</script>
