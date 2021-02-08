<template>
  <blank-layout>
    <slot></slot>
  </blank-layout>
</template>

<script>
import BlankLayout from './BlankLayout.vue';
console.log('#3 Layout.vue');

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
