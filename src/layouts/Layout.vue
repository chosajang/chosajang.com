<template>
  <blank-layout>
    <transition name="page" mode="out-in">
      <slot></slot>
    </transition>
  </blank-layout>
</template>

<script>
// import { computed } from '@vue/composition-api';
import BlankLayout from './BlankLayout.vue';
// import ServiceLayout from './ServiceLayout.vue';

export default {
  name: 'Layout',
  components: {
    BlankLayout,
    // ServiceLayout
  },
  setup() {
    console.log('layout.setup');
    // const layout = computed(() => 'BlankLayout');
    // return { layout };
  },
  metaInfo: {
    title: 'chosajang.com',
    titleTemplate: '%s - chosajang.com',
    meta: [
      {
        'http-equiv': 'Content-Security-Policy',
        content: 'upgrade-insecure-requests'
      }
    ]
  }
};
</script>

<style>

</style>
